/**
 * Demucs AI Engine Wrapper
 * Manages ONNX Runtime Web, WebGPU/WASM execution, Model Caching, and Stem Generation
 */
import * as ort from 'onnxruntime-web';
import { DemucsProcessor, CONSTANTS } from 'demucs-web';
import { combineStems } from './audioUtils.js';

// Configure ONNX Runtime Web WASM paths (matching installed onnxruntime-web version)
const ortVersion = ort.env?.versions?.web || '1.31.1';
const WASM_PATH = `https://cdn.jsdelivr.net/npm/onnxruntime-web@${ortVersion}/dist/`;
ort.env.wasm.wasmPaths = WASM_PATH;
ort.env.wasm.numThreads = Math.min(4, navigator.hardwareConcurrency || 2);

const CACHE_NAME = 'demucs-onnx-model-cache-v1';
const MODEL_URL = CONSTANTS.DEFAULT_MODEL_URL || 'https://huggingface.co/timcsy/demucs-web-onnx/resolve/main/htdemucs_embedded.onnx';

let globalProcessor = null;
let isModelLoaded = false;

/**
 * Check whether WebGPU is supported on this browser/hardware
 */
export async function checkDeviceCapabilities() {
  const hasWebGPU = Boolean(navigator.gpu);
  let adapterName = 'Not Available (Falling back to WASM Multi-threading)';
  
  if (hasWebGPU) {
    try {
      const adapter = await navigator.gpu.requestAdapter();
      if (adapter) {
        adapterName = adapter.info?.description || 'Hardware WebGPU Accelerated';
      }
    } catch {
      // Ignore
    }
  }

  return {
    hasWebGPU,
    adapterName,
    threads: navigator.hardwareConcurrency || 4
  };
}

/**
 * Load and Cache the Demucs ONNX model in browser Cache API
 */
export async function loadDemucsModel({ onDownloadProgress = () => {}, onStatus = () => {} }) {
  if (globalProcessor && isModelLoaded) {
    onStatus('Model is already loaded in memory.');
    return globalProcessor;
  }

  onStatus('Checking local model cache in browser storage...');
  let modelBuffer = null;

  // Try retrieving from Cache API
  try {
    if ('caches' in window) {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(MODEL_URL);
      if (cachedResponse) {
        onStatus('Found model in browser cache! Loading instantly into memory...');
        modelBuffer = await cachedResponse.arrayBuffer();
      }
    }
  } catch (err) {
    console.warn('Cache API lookup failed:', err);
  }

  // If not cached, fetch with progress tracking
  if (!modelBuffer) {
    onStatus('Downloading Meta HTDemucs AI Model (~172 MB)... (This happens only once)');
    const response = await fetch(MODEL_URL);
    if (!response.ok) {
      throw new Error(`Failed to download model from Hugging Face: HTTP ${response.status} ${response.statusText}`);
    }

    const contentLength = response.headers.get('Content-Length');
    const totalSize = contentLength ? parseInt(contentLength, 10) : 172 * 1024 * 1024;
    const reader = response.body.getReader();
    const chunks = [];
    let loadedSize = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      loadedSize += value.length;
      onDownloadProgress(loadedSize, totalSize);
    }

    // Combine chunks
    const totalLoaded = new Uint8Array(loadedSize);
    let offset = 0;
    for (const chunk of chunks) {
      totalLoaded.set(chunk, offset);
      offset += chunk.length;
    }
    modelBuffer = totalLoaded.buffer;

    // Save to Cache API for next visit
    try {
      if ('caches' in window) {
        const cache = await caches.open(CACHE_NAME);
        const headers = new Headers({
          'Content-Type': 'application/octet-stream',
          'Content-Length': String(modelBuffer.byteLength),
        });
        await cache.put(MODEL_URL, new Response(modelBuffer.slice(0), { headers }));
        console.log('[Cache] Stored Demucs ONNX model in browser cache for future instant offline runs.');
      }
    } catch (err) {
      console.warn('Failed to store model in browser cache:', err);
    }
  }

  onStatus('Initializing ONNX Inference Session with WebGPU / WASM...');
  
  // Try WebGPU first if supported, with automatic fallback to high-performance WASM
  const providersToTry = navigator.gpu ? [['webgpu', 'wasm'], ['wasm']] : [['wasm']];
  let sessionCreated = false;
  let lastError = null;

  for (const providers of providersToTry) {
    try {
      console.log(`[Demucs] Attempting session creation with providers: ${providers.join(', ')}`);
      globalProcessor = new DemucsProcessor({
        ort,
        sessionOptions: {
          executionProviders: providers,
          graphOptimizationLevel: 'basic'
        },
        onLog: (phase, msg) => {
          console.log(`[Demucs:${phase}]`, msg);
          onStatus(`[${phase}] ${msg}`);
        }
      });

      await globalProcessor.loadModel(modelBuffer);
      sessionCreated = true;
      console.log(`[Demucs] Successfully created session with: ${providers.join(', ')}`);
      break;
    } catch (err) {
      console.warn(`[Demucs] Session creation failed with providers [${providers.join(', ')}]:`, err);
      lastError = err;
    }
  }

  if (!sessionCreated) {
    throw new Error(`Failed to initialize AI model engine: ${lastError?.message || lastError}`);
  }

  isModelLoaded = true;
  onStatus('Demucs AI Model ready for separation!');
  return globalProcessor;
}

/**
 * Run Demucs AI Audio Separation
 */
export async function separateAudioWithDemucs(left, right, { onProgress = () => {}, onStatus = () => {} }) {
  if (!globalProcessor || !isModelLoaded) {
    throw new Error('Demucs model is not loaded. Call loadDemucsModel first.');
  }

  const durationSec = (left.length / 44100).toFixed(1);
  onStatus(`Processing audio with Meta HTDemucs AI (${durationSec}s total)...`);

  globalProcessor.onProgress = (progInfo) => {
    const p = typeof progInfo === 'object' && progInfo !== null ? progInfo.progress : progInfo;
    const cur = typeof progInfo === 'object' && progInfo !== null ? progInfo.currentSegment : null;
    const tot = typeof progInfo === 'object' && progInfo !== null ? progInfo.totalSegments : null;
    onProgress(p);
    if (cur && tot) {
      onStatus(`Demucs AI separating stems: segment ${cur}/${tot} (${Math.round(p * 100)}%)...`);
    } else {
      onStatus(`Demucs AI separating stems: ${(p * 100).toFixed(1)}% complete...`);
    }
  };

  // Run separation through ONNX model
  const rawStems = await globalProcessor.separate(left, right);
  
  // rawStems contains: { drums, bass, other, vocals }
  // Calculate Background Music (No Vocals) = drums + bass + other
  onStatus('Assembling clean Background Music and Vocal stems...');
  const noVocals = combineStems([rawStems.drums, rawStems.bass, rawStems.other], left.length);

  return {
    vocals: rawStems.vocals,
    no_vocals: noVocals,
    drums: rawStems.drums,
    bass: rawStems.bass,
    other: rawStems.other
  };
}
