/**
 * Main Application Logic
 * Integrates File Uploads, Batch Queue, Meta Demucs AI & Fast DSP, Side-by-Side Video Players & MP4/MP3 Exports
 */
import JSZip from 'jszip';
import { decodeAudioFromFile, fastDspVocalSeparator, encodeWav, encodeMp3, downloadBlob } from './audioUtils.js';
import { checkDeviceCapabilities, loadDemucsModel, separateAudioWithDemucs } from './demucs.js';
import { muxVideoWithAudio } from './videoUtils.js';

// DOM Elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const uploadTitle = document.getElementById('uploadTitle');
const uploadDesc = document.getElementById('uploadDesc');
const btnLoadDemo = document.getElementById('btnLoadDemo');

const optDemucs = document.getElementById('optDemucs');
const optDsp = document.getElementById('optDsp');
const btnProcess = document.getElementById('btnProcess');
const deviceBadge = document.getElementById('deviceBadge');

// Batch Queue Elements
const batchQueueCard = document.getElementById('batchQueueCard');
const batchCountBadge = document.getElementById('batchCountBadge');
const batchItemsList = document.getElementById('batchItemsList');
const btnBatchClear = document.getElementById('btnBatchClear');

// Progress Elements
const progressBox = document.getElementById('progressBox');
const progressTitle = document.getElementById('progressTitle');
const progressPct = document.getElementById('progressPct');
const progressBar = document.getElementById('progressBar');
const progressStatus = document.getElementById('progressStatus');

// Studio Workspace Elements (Side-by-Side Outputs)
const studioWorkspace = document.getElementById('studioWorkspace');
const studioFileTitle = document.getElementById('studioFileTitle');
const studioFileSubtitle = document.getElementById('studioFileSubtitle');
const btnSyncBoth = document.getElementById('btnSyncBoth');

const videoVocals = document.getElementById('videoVocals');
const videoBgm = document.getElementById('videoBgm');
const audioFallbackVocals = document.getElementById('audioFallbackVocals');
const audioFallbackBgm = document.getElementById('audioFallbackBgm');
const audioVocals = document.getElementById('audioVocals');
const audioBgm = document.getElementById('audioBgm');
const canvasVocals = document.getElementById('canvasVocals');
const canvasBgm = document.getElementById('canvasBgm');

const btnDlVocalsMp4 = document.getElementById('btnDlVocalsMp4');
const btnDlVocalsMp3 = document.getElementById('btnDlVocalsMp3');
const btnDlBgmMp4 = document.getElementById('btnDlBgmMp4');
const btnDlBgmMp3 = document.getElementById('btnDlBgmMp3');
const btnDlZip = document.getElementById('btnDlZip');
const btnReset = document.getElementById('btnReset');

const openGuideBtn = document.getElementById('openGuideBtn');
const closeGuideBtn = document.getElementById('closeGuideBtn');
const guideModal = document.getElementById('guideModal');

// Application State
let currentEngine = 'demucs';
let batchQueue = []; // Array of { id, file, status, progress, statusText, stems, blobs, error }
let activeItemIndex = -1;
let isProcessingBatch = false;
let isSyncPlaying = false;

// Audio context & node references for playback
let hiddenAudioVocals = new Audio();
let hiddenAudioBgm = new Audio();

// Initialize Hardware Acceleration Badge
async function initCapabilities() {
  try {
    const caps = await checkDeviceCapabilities();
    if (caps.hasWebGPU) {
      deviceBadge.textContent = `⚡ WebGPU Accelerated (${caps.threads} cores)`;
      deviceBadge.className = 'badge green';
    } else {
      deviceBadge.textContent = `⚡ WASM Multi-Threaded (${caps.threads} cores)`;
      deviceBadge.className = 'badge purple';
    }
  } catch {
    deviceBadge.textContent = '⚡ WebAssembly Enabled';
  }
}
initCapabilities();

// Engine Switcher
optDemucs.addEventListener('click', () => {
  currentEngine = 'demucs';
  optDemucs.classList.add('selected');
  optDsp.classList.remove('selected');
  optDemucs.querySelector('input').checked = true;
  updateProcessButtonLabel();
});

optDsp.addEventListener('click', () => {
  currentEngine = 'dsp';
  optDsp.classList.add('selected');
  optDemucs.classList.remove('selected');
  optDsp.querySelector('input').checked = true;
  updateProcessButtonLabel();
});

// File Upload & Drag-and-Drop Handling
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('drag-over');
});
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('drag-over');
  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
    handleFilesSelected(Array.from(e.dataTransfer.files));
  }
});

fileInput.addEventListener('change', (e) => {
  if (e.target.files && e.target.files.length > 0) {
    handleFilesSelected(Array.from(e.target.files));
  }
});

// Demo Audio Generator
btnLoadDemo.addEventListener('click', () => {
  const sampleRate = 44100;
  const duration = 6;
  const numSamples = sampleRate * duration;
  const left = new Float32Array(numSamples);
  const right = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    // Chords (Background)
    const bgm = 0.25 * (Math.sin(2 * Math.PI * 220 * t) + Math.sin(2 * Math.PI * 330 * t) + Math.sin(2 * Math.PI * 440 * t));
    // Voice harmonic melody (Vocals)
    const voice = 0.45 * Math.sin(2 * Math.PI * (440 + 20 * Math.sin(2 * Math.PI * 3 * t)) * t);
    left[i] = bgm + voice;
    right[i] = -bgm + voice;
  }

  const demoBlob = encodeWav(left, right, sampleRate);
  const demoFile = new File([demoBlob], 'Studio_Demo_Vocal_BGM_Sample.wav', { type: 'audio/wav' });
  handleFilesSelected([demoFile]);
});

function handleFilesSelected(files) {
  if (!files || files.length === 0) return;

  for (const file of files) {
    // Avoid duplicate names in same batch
    const exists = batchQueue.some(item => item.file.name === file.name && item.file.size === file.size);
    if (!exists) {
      batchQueue.push({
        id: 'file_' + Math.random().toString(36).substring(2, 9),
        file,
        status: 'pending', // 'pending' | 'processing' | 'ready' | 'error'
        progress: 0,
        statusText: 'Queued',
        stems: null,
        blobs: null,
        error: null
      });
    }
  }

  renderBatchQueue();
  updateProcessButtonLabel();

  // If this is the first file added and queue length is 1, set title
  if (batchQueue.length === 1) {
    const single = batchQueue[0].file;
    uploadTitle.textContent = `Selected: ${single.name}`;
    uploadDesc.textContent = `${(single.size / (1024 * 1024)).toFixed(1)} MB • Click Start Separation below`;
  } else {
    uploadTitle.textContent = `Batch Ready: ${batchQueue.length} files queued`;
    uploadDesc.textContent = `Click "Start Batch Separation" below to process all files`;
  }
}

function updateProcessButtonLabel() {
  const pendingCount = batchQueue.filter(item => item.status === 'pending').length;
  if (batchQueue.length === 0) {
    btnProcess.disabled = true;
    btnProcess.innerHTML = `<span>🚀 Select Audio or Video to Start</span>`;
    return;
  }

  btnProcess.disabled = false;
  const engineName = currentEngine === 'demucs' ? 'Meta Demucs AI' : 'Instant DSP';
  if (batchQueue.length === 1) {
    btnProcess.innerHTML = `<span>🚀 Separate Audio with ${engineName}</span>`;
  } else {
    btnProcess.innerHTML = `<span>🚀 Separate All ${pendingCount > 0 ? pendingCount : batchQueue.length} Files with ${engineName}</span>`;
  }
}

function renderBatchQueue() {
  if (batchQueue.length <= 1) {
    batchQueueCard.style.display = 'none';
    return;
  }

  batchQueueCard.style.display = 'block';
  batchCountBadge.textContent = `${batchQueue.length} Files`;
  batchItemsList.innerHTML = '';

  batchQueue.forEach((item, idx) => {
    const isVideo = isVideoFile(item.file);
    const row = document.createElement('div');
    row.className = `batch-item-row ${idx === activeItemIndex ? 'active' : ''}`;

    let statusClass = 'pending';
    let statusLabel = '⏳ Queued';
    if (item.status === 'processing') {
      statusClass = 'processing';
      statusLabel = `🔄 ${item.progress}%`;
    } else if (item.status === 'ready') {
      statusClass = 'ready';
      statusLabel = '✅ Ready';
    } else if (item.status === 'error') {
      statusClass = 'error';
      statusLabel = '❌ Error';
    }

    row.innerHTML = `
      <div class="batch-item-info">
        <span style="font-size: 20px;">${isVideo ? '🎬' : '🎵'}</span>
        <div style="min-width: 0; flex: 1;">
          <div class="batch-item-name" title="${item.file.name}">${item.file.name}</div>
          <div class="batch-item-meta">${(item.file.size / (1024 * 1024)).toFixed(1)} MB • ${isVideo ? 'Video' : 'Audio'}</div>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span class="batch-item-status ${statusClass}">${statusLabel}</span>
        ${item.status === 'ready' ? `<button class="btn-item-preview" data-idx="${idx}">👁️ Preview</button>` : ''}
        <button class="btn-item-remove" data-idx="${idx}" style="background:none; border:none; color:#94a3b8; cursor:pointer; font-size:16px;">&times;</button>
      </div>
    `;

    row.querySelector('.btn-item-remove')?.addEventListener('click', (e) => {
      e.stopPropagation();
      batchQueue.splice(idx, 1);
      if (activeItemIndex === idx) activeItemIndex = -1;
      renderBatchQueue();
      updateProcessButtonLabel();
    });

    row.querySelector('.btn-item-preview')?.addEventListener('click', (e) => {
      e.stopPropagation();
      displayItemInStudio(idx);
    });

    batchItemsList.appendChild(row);
  });
}

btnBatchClear.addEventListener('click', () => {
  batchQueue = [];
  activeItemIndex = -1;
  fileInput.value = '';
  renderBatchQueue();
  updateProcessButtonLabel();
  uploadTitle.textContent = 'Drop your Audio or Video files here';
  uploadDesc.textContent = 'Click anywhere to browse • Single file or Multi-file Batch Upload';
});

// Process All Files in Batch or Single File
btnProcess.addEventListener('click', async () => {
  if (batchQueue.length === 0 || isProcessingBatch) return;

  isProcessingBatch = true;
  btnProcess.disabled = true;
  progressBox.style.display = 'block';

  // Find all items that need processing
  const pendingIndices = batchQueue
    .map((item, idx) => ({ item, idx }))
    .filter(({ item }) => item.status !== 'ready');

  const itemsToProcess = pendingIndices.length > 0 
    ? pendingIndices 
    : batchQueue.map((item, idx) => ({ item, idx })); // re-process if all already ready

  for (let step = 0; step < itemsToProcess.length; step++) {
    const { item, idx } = itemsToProcess[step];
    activeItemIndex = idx;
    item.status = 'processing';
    renderBatchQueue();

    const batchPrefix = itemsToProcess.length > 1 ? `[File ${step + 1}/${itemsToProcess.length}] ` : '';
    progressTitle.textContent = `${batchPrefix}Processing ${item.file.name}...`;

    try {
      await processSingleItem(item, (pct, status) => {
        item.progress = pct || item.progress;
        item.statusText = status;
        updateProgress(pct, `${batchPrefix}${status}`);
        renderBatchQueue();
      });

      item.status = 'ready';
      item.progress = 100;
      renderBatchQueue();
    } catch (err) {
      console.error(`Error processing ${item.file.name}:`, err);
      item.status = 'error';
      item.error = err.message;
      updateProgress(null, `❌ Error on ${item.file.name}: ${err.message}`);
      renderBatchQueue();
    }
  }

  isProcessingBatch = false;
  btnProcess.disabled = false;
  updateProcessButtonLabel();
  updateProgress(100, 'All separations finished! Launching Studio Preview...');

  await new Promise(r => setTimeout(r, 400));
  progressBox.style.display = 'none';

  // Display the active or first successfully processed item
  const targetIdx = (activeItemIndex !== -1 && batchQueue[activeItemIndex]?.status === 'ready')
    ? activeItemIndex
    : batchQueue.findIndex(item => item.status === 'ready');

  if (targetIdx !== -1) {
    displayItemInStudio(targetIdx);
  }
});

// Core Separation for a single file item
async function processSingleItem(item, onProgressUpdate) {
  onProgressUpdate(5, `Decoding audio track from "${item.file.name}"...`);
  const decoded = await decodeAudioFromFile(item.file, (msg) => onProgressUpdate(10, msg));

  let rawStems;
  if (currentEngine === 'dsp') {
    onProgressUpdate(40, 'Running zero-wait Center-Channel DSP Vocal Isolator...');
    await new Promise(r => setTimeout(r, 150));
    rawStems = fastDspVocalSeparator(decoded.left, decoded.right, 44100);
    onProgressUpdate(85, 'Encoding stems...');
  } else {
    // Demucs AI
    onProgressUpdate(15, 'Preparing Meta HTDemucs AI Model...');
    await loadDemucsModel({
      onDownloadProgress: (loaded, total) => {
        const pct = Math.min(45, 15 + Math.round((loaded / total) * 30));
        const mb = (loaded / (1024 * 1024)).toFixed(1);
        onProgressUpdate(pct, `Downloading Neural Weights: ${mb}MB (${pct}%)`);
      },
      onStatus: (msg) => onProgressUpdate(null, msg)
    });

    onProgressUpdate(48, 'Separating Vocals and Background Music...');
    rawStems = await separateAudioWithDemucs(decoded.left, decoded.right, {
      onProgress: (prog) => {
        const p = typeof prog === 'object' && prog !== null ? prog.progress : prog;
        const pct = Math.min(92, 48 + Math.round((p || 0) * 44));
        onProgressUpdate(pct, `Neural Inference: ${((p || 0) * 100).toFixed(0)}% complete`);
      },
      onStatus: (msg) => onProgressUpdate(null, msg)
    });
  }

  onProgressUpdate(94, 'Generating 16-bit WAV & MP3 audio buffers...');

  // Create WAV Blobs
  const vocalsWav = encodeWav(rawStems.vocals.left, rawStems.vocals.right, 44100);
  const bgmWav = encodeWav(rawStems.no_vocals.left, rawStems.no_vocals.right, 44100);

  // Create MP3 Blobs
  const vocalsMp3 = encodeMp3(rawStems.vocals.left, rawStems.vocals.right, 44100);
  const bgmMp3 = encodeMp3(rawStems.no_vocals.left, rawStems.no_vocals.right, 44100);

  item.stems = rawStems;
  item.blobs = {
    vocalsWav,
    bgmWav,
    vocalsMp3,
    bgmMp3
  };
  item.decoded = decoded;
}

window.displayItemInStudio = displayItemInStudio;

// Side-by-Side Video & Audio Studio Display
function displayItemInStudio(index) {
  const item = batchQueue[index];
  if (!item || !item.blobs) {
    console.warn('[displayItemInStudio] Item or blobs not found for index:', index);
    return;
  }

  const isVideo = isVideoFile(item.file);
  console.log('[displayItemInStudio] Displaying index:', index, 'Name:', item.file.name, 'isVideo:', isVideo);
  
  activeItemIndex = index;
  renderBatchQueue();

  studioWorkspace.style.display = 'block';
  studioFileTitle.textContent = `🎬 ${item.file.name}`;
  if (studioFileSubtitle) {
    studioFileSubtitle.textContent = `Side-by-side synchronized comparison • ${(item.file.size / (1024 * 1024)).toFixed(1)} MB (${item.decoded.duration.toFixed(1)}s)`;
  }

  const baseName = sanitizeBaseName(item.file.name);

  // Stop any ongoing playback
  pauseAllMedia();

  if (isVideo) {
    // Show Video Elements, Hide Fallback Canvas
    videoVocals.style.display = 'block';
    videoBgm.style.display = 'block';
    audioFallbackVocals.style.display = 'none';
    audioFallbackBgm.style.display = 'none';

    const videoObjUrl = URL.createObjectURL(item.file);
    videoVocals.src = videoObjUrl;
    videoVocals.muted = true; // Mute native mixed audio

    videoBgm.src = videoObjUrl;
    videoBgm.muted = true; // Mute native mixed audio

    // Attach stem audio tracks
    hiddenAudioVocals.src = URL.createObjectURL(item.blobs.vocalsWav);
    hiddenAudioBgm.src = URL.createObjectURL(item.blobs.bgmWav);

    // Synchronize Video 1 (Vocals)
    videoVocals.onplay = () => {
      if (!isSyncPlaying) {
        videoBgm.pause();
        hiddenAudioBgm.pause();
      }
      hiddenAudioVocals.currentTime = videoVocals.currentTime;
      hiddenAudioVocals.play();
    };
    videoVocals.onpause = () => {
      hiddenAudioVocals.pause();
      if (isSyncPlaying) {
        videoBgm.pause();
        hiddenAudioBgm.pause();
        btnSyncBoth.classList.remove('active');
        isSyncPlaying = false;
      }
    };
    videoVocals.onseeking = () => {
      hiddenAudioVocals.currentTime = videoVocals.currentTime;
      if (isSyncPlaying) videoBgm.currentTime = videoVocals.currentTime;
    };
    videoVocals.onseeked = () => {
      hiddenAudioVocals.currentTime = videoVocals.currentTime;
      if (isSyncPlaying) videoBgm.currentTime = videoVocals.currentTime;
    };
    videoVocals.onvolumechange = () => {
      hiddenAudioVocals.volume = videoVocals.volume;
    };

    // Synchronize Video 2 (Background Music)
    videoBgm.onplay = () => {
      if (!isSyncPlaying) {
        videoVocals.pause();
        hiddenAudioVocals.pause();
      }
      hiddenAudioBgm.currentTime = videoBgm.currentTime;
      hiddenAudioBgm.play();
    };
    videoBgm.onpause = () => {
      hiddenAudioBgm.pause();
      if (isSyncPlaying) {
        videoVocals.pause();
        hiddenAudioVocals.pause();
        btnSyncBoth.classList.remove('active');
        isSyncPlaying = false;
      }
    };
    videoBgm.onseeking = () => {
      hiddenAudioBgm.currentTime = videoBgm.currentTime;
      if (isSyncPlaying) videoVocals.currentTime = videoBgm.currentTime;
    };
    videoBgm.onseeked = () => {
      hiddenAudioBgm.currentTime = videoBgm.currentTime;
      if (isSyncPlaying) videoVocals.currentTime = videoBgm.currentTime;
    };
    videoBgm.onvolumechange = () => {
      hiddenAudioBgm.volume = videoBgm.volume;
    };
  } else {
    // Audio Only File
    videoVocals.style.display = 'none';
    videoBgm.style.display = 'none';
    audioFallbackVocals.style.display = 'flex';
    audioFallbackBgm.style.display = 'flex';

    audioVocals.src = URL.createObjectURL(item.blobs.vocalsWav);
    audioBgm.src = URL.createObjectURL(item.blobs.bgmWav);

    drawStaticWaveform(canvasVocals, item.stems.vocals.left, '#f43f5e');
    drawStaticWaveform(canvasBgm, item.stems.no_vocals.left, '#10b981');
  }

  // --- DOWNLOAD OPTION 1: VOCALS ONLY ---
  // Download MP4
  btnDlVocalsMp4.onclick = async () => {
    if (!isVideo) {
      alert('This file is audio-only. Use Download MP3 below!');
      return;
    }
    await triggerMuxDownload(item.file, item.blobs.vocalsWav, `${baseName}_VOCALS_ONLY.mp4`, btnDlVocalsMp4);
  };
  // Download MP3
  btnDlVocalsMp3.onclick = () => {
    downloadBlob(item.blobs.vocalsMp3, `${baseName}_VOCALS_ONLY.mp3`);
  };

  // --- DOWNLOAD OPTION 2: BACKGROUND MUSIC ONLY ---
  // Download MP4
  btnDlBgmMp4.onclick = async () => {
    if (!isVideo) {
      alert('This file is audio-only. Use Download MP3 below!');
      return;
    }
    await triggerMuxDownload(item.file, item.blobs.bgmWav, `${baseName}_BACKGROUND_MUSIC_ONLY.mp4`, btnDlBgmMp4);
  };
  // Download MP3
  btnDlBgmMp3.onclick = () => {
    downloadBlob(item.blobs.bgmMp3, `${baseName}_BACKGROUND_MUSIC_ONLY.mp3`);
  };

  // Bulk ZIP for this item
  btnDlZip.onclick = async () => {
    const zip = new JSZip();
    zip.file(`${baseName}_VOCALS_ONLY.mp3`, item.blobs.vocalsMp3);
    zip.file(`${baseName}_BACKGROUND_MUSIC_ONLY.mp3`, item.blobs.bgmMp3);
    zip.file(`${baseName}_VOCALS_ONLY.wav`, item.blobs.vocalsWav);
    zip.file(`${baseName}_BACKGROUND_MUSIC_ONLY.wav`, item.blobs.bgmWav);

    const content = await zip.generateAsync({ type: 'blob' });
    downloadBlob(content, `${baseName}_SEPARATED_AUDIO_OUTPUTS.zip`);
  };
}

// Mux Video with Audio via FFmpeg WASM
async function triggerMuxDownload(videoFile, audioWavBlob, outputFilename, btnElement) {
  const originalText = btnElement.innerHTML;
  btnElement.disabled = true;
  btnElement.innerHTML = `<span>⏳ Merging MP4 Video...</span>`;

  try {
    const mp4Blob = await muxVideoWithAudio(videoFile, audioWavBlob, {
      onStatus: (msg) => {
        btnElement.innerHTML = `<span>⏳ ${msg.substring(0, 24)}...</span>`;
      }
    });
    downloadBlob(mp4Blob, outputFilename);
  } catch (err) {
    console.error('MP4 Muxing failed:', err);
    alert(`Could not remux MP4: ${err.message}. You can download the MP3 track directly!`);
  } finally {
    btnElement.disabled = false;
    btnElement.innerHTML = originalText;
  }
}

// Sync Play Both Videos Button
btnSyncBoth.addEventListener('click', () => {
  if (isSyncPlaying) {
    pauseAllMedia();
    btnSyncBoth.classList.remove('active');
    isSyncPlaying = false;
  } else {
    isSyncPlaying = true;
    btnSyncBoth.classList.add('active');

    const item = batchQueue[activeItemIndex];
    if (item && isVideoFile(item.file)) {
      videoBgm.currentTime = videoVocals.currentTime;
      hiddenAudioVocals.currentTime = videoVocals.currentTime;
      hiddenAudioBgm.currentTime = videoVocals.currentTime;

      videoVocals.play();
      videoBgm.play();
      hiddenAudioVocals.play();
      hiddenAudioBgm.play();
    } else {
      audioBgm.currentTime = audioVocals.currentTime;
      audioVocals.play();
      audioBgm.play();
    }
  }
});

function pauseAllMedia() {
  videoVocals.pause();
  videoBgm.pause();
  hiddenAudioVocals.pause();
  hiddenAudioBgm.pause();
  audioVocals.pause();
  audioBgm.pause();
  btnSyncBoth.classList.remove('active');
  isSyncPlaying = false;
}

btnReset.addEventListener('click', () => {
  pauseAllMedia();
  studioWorkspace.style.display = 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

function updateProgress(pct, statusText) {
  if (pct !== null) {
    progressPct.textContent = `${pct}%`;
    progressBar.style.width = `${pct}%`;
  }
  if (statusText) {
    progressStatus.textContent = statusText;
  }
}

function isVideoFile(file) {
  if (!file) return false;
  return file.type.startsWith('video/') || /\.(mp4|webm|mov|mkv|avi|m4v)$/i.test(file.name);
}

function sanitizeBaseName(filename) {
  return filename.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_\-]/g, '_');
}

// Waveform Canvas Drawing
function drawStaticWaveform(canvas, channelData, color) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.width = canvas.clientWidth * dpr;
  const height = canvas.height = canvas.clientHeight * dpr;

  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = 2;
  ctx.strokeStyle = color;
  ctx.beginPath();

  const step = Math.ceil(channelData.length / width);
  const midY = height / 2;

  for (let i = 0; i < width; i++) {
    let min = 1.0;
    let max = -1.0;
    for (let j = 0; j < step; j++) {
      const datum = channelData[(i * step) + j];
      if (datum < min) min = datum;
      if (datum > max) max = datum;
    }
    ctx.moveTo(i, midY + (min * midY * 0.9));
    ctx.lineTo(i, midY + (max * midY * 0.9));
  }
  ctx.stroke();
}

// Hosting Guide Modal
openGuideBtn.addEventListener('click', () => guideModal.style.display = 'flex');
closeGuideBtn.addEventListener('click', () => guideModal.style.display = 'none');
guideModal.addEventListener('click', (e) => {
  if (e.target === guideModal) guideModal.style.display = 'none';
});
