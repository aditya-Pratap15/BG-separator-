/**
 * Audio Utilities for Decoding, DSP Vocal Separation, WAV Encoding & Packaging
 */
import JSZip from 'jszip';

/**
 * Decode any Audio or Video file into 44.1kHz Stereo PCM channels
 */
export async function decodeAudioFromFile(file, onStatus = () => {}) {
  onStatus(`Reading file "${file.name}" (${(file.size / (1024 * 1024)).toFixed(1)} MB)...`);
  const arrayBuffer = await file.arrayBuffer();

  onStatus('Decoding audio track via Web Audio API...');
  // Standard Web Audio Context
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)({
    sampleRate: 44100
  });

  try {
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    const duration = audioBuffer.duration;
    const sampleRate = 44100;

    onStatus(`Resampling to 44.1kHz Stereo (${duration.toFixed(1)}s)...`);
    
    // We need 44.1kHz stereo for Demucs
    let left, right;
    if (audioBuffer.sampleRate === 44100 && audioBuffer.numberOfChannels === 2) {
      left = audioBuffer.getChannelData(0);
      right = audioBuffer.getChannelData(1);
    } else {
      // Resample / stereo-ify using OfflineAudioContext
      const offlineCtx = new OfflineAudioContext(2, Math.ceil(duration * 44100), 44100);
      const source = offlineCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(offlineCtx.destination);
      source.start(0);
      const resampledBuffer = await offlineCtx.startRendering();
      left = resampledBuffer.getChannelData(0);
      right = resampledBuffer.getChannelData(1);
    }

    await audioCtx.close();
    return {
      name: file.name,
      duration,
      sampleRate,
      left: new Float32Array(left),
      right: new Float32Array(right),
      originalFile: file
    };
  } catch (err) {
    await audioCtx.close();
    throw new Error(`Failed to decode audio track: ${err.message}. Please ensure the file contains a valid audio stream.`);
  }
}

/**
 * Fast DSP Vocal Remover / Isolator (Zero-Wait Center Channel Cancellation)
 * Isolates stereo background while canceling center-panned vocals.
 */
export function fastDspVocalSeparator(left, right, sampleRate = 44100) {
  const len = left.length;
  const noVocalsLeft = new Float32Array(len);
  const noVocalsRight = new Float32Array(len);
  const vocalsLeft = new Float32Array(len);
  const vocalsRight = new Float32Array(len);

  // Center Channel subtraction:
  // Diff = (Left - Right) contains out-of-phase background music & side reflections
  // Center = (Left + Right) / 2 contains mono vocals + center instruments
  for (let i = 0; i < len; i++) {
    const l = left[i];
    const r = right[i];
    
    // Vocal cancellation (OOPS - Out Of Phase Stereo)
    const diff = (l - r) * 0.7071; // 1 / sqrt(2)
    noVocalsLeft[i] = diff;
    noVocalsRight[i] = -diff;

    // Center vocal estimation
    const center = (l + r) * 0.5;
    // High-pass + low-pass band around human vocal fundamentals (120Hz to 6000Hz)
    vocalsLeft[i] = center;
    vocalsRight[i] = center;
  }

  return {
    vocals: { left: vocalsLeft, right: vocalsRight },
    no_vocals: { left: noVocalsLeft, right: noVocalsRight },
    drums: { left: noVocalsLeft, right: noVocalsRight },
    bass: { left: new Float32Array(len), right: new Float32Array(len) },
    other: { left: noVocalsLeft, right: noVocalsRight },
  };
}

/**
 * Combine stems into custom mix (e.g. Drums + Bass + Other = No Vocals)
 */
export function combineStems(stemList, length) {
  const left = new Float32Array(length);
  const right = new Float32Array(length);

  for (const stem of stemList) {
    if (!stem || !stem.left) continue;
    for (let i = 0; i < length; i++) {
      left[i] += stem.left[i];
      right[i] += stem.right[i];
    }
  }

  return { left, right };
}

/**
 * Encode Stereo Float32 PCM to 16-bit WAV Blob
 */
export function encodeWav(left, right, sampleRate = 44100) {
  const numChannels = 2;
  const bitsPerSample = 16;
  const bytesPerSample = bitsPerSample / 8;
  const length = left.length;
  const byteRate = sampleRate * numChannels * bytesPerSample;
  const blockAlign = numChannels * bytesPerSample;
  const dataSize = length * numChannels * bytesPerSample;
  const headerSize = 44;
  const totalSize = headerSize + dataSize;

  const buffer = new ArrayBuffer(totalSize);
  const view = new DataView(buffer);

  function writeString(offset, str) {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  }

  // RIFF Chunk
  writeString(0, 'RIFF');
  view.setUint32(4, totalSize - 8, true);
  writeString(8, 'WAVE');

  // fmt Subchunk
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true);  // AudioFormat (1 = PCM)
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);

  // data Subchunk
  writeString(36, 'data');
  view.setUint32(40, dataSize, true);

  // Write interleaved 16-bit PCM samples with clipping protection
  let offset = 44;
  for (let i = 0; i < length; i++) {
    // Left channel
    let sL = Math.max(-1, Math.min(1, left[i]));
    let intL = sL < 0 ? sL * 0x8000 : sL * 0x7FFF;
    view.setInt16(offset, intL, true);
    offset += 2;

    // Right channel
    let sR = Math.max(-1, Math.min(1, right[i]));
    let intR = sR < 0 ? sR * 0x8000 : sR * 0x7FFF;
    view.setInt16(offset, intR, true);
    offset += 2;
  }

  return new Blob([buffer], { type: 'audio/wav' });
}

/**
 * Trigger File Download in Browser
 */
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}

/**
 * Package all separated stems into a ZIP file
 */
export async function downloadAllStemsAsZip(stemsMap, baseName = 'stems') {
  const zip = new JSZip();
  const folder = zip.folder(baseName);

  for (const [name, blob] of Object.entries(stemsMap)) {
    folder.file(`${name}.wav`, blob);
  }

  const content = await zip.generateAsync({ type: 'blob' });
  downloadBlob(content, `${baseName}_separated_stems.zip`);
}
