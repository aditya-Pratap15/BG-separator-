/**
 * Main Application Logic
 * Integrates File Uploads, Web Audio Decoding, Demucs / DSP Engine, Studio Mixer & Exports
 */
import { decodeAudioFromFile, fastDspVocalSeparator, encodeWav, downloadBlob, downloadAllStemsAsZip } from './audioUtils.js';
import { checkDeviceCapabilities, loadDemucsModel, separateAudioWithDemucs } from './demucs.js';

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

const progressBox = document.getElementById('progressBox');
const progressTitle = document.getElementById('progressTitle');
const progressPct = document.getElementById('progressPct');
const progressBar = document.getElementById('progressBar');
const progressStatus = document.getElementById('progressStatus');

const studioWorkspace = document.getElementById('studioWorkspace');
const btnPlayMaster = document.getElementById('btnPlayMaster');
const timelineSlider = document.getElementById('timelineSlider');
const currentTimeLabel = document.getElementById('currentTimeLabel');
const totalTimeLabel = document.getElementById('totalTimeLabel');
const canvasVisualizer = document.getElementById('canvasVisualizer');

const btnDlVocals = document.getElementById('btnDlVocals');
const btnDlBgm = document.getElementById('btnDlBgm');
const btnDlDrums = document.getElementById('btnDlDrums');
const btnDlBass = document.getElementById('btnDlBass');
const btnDlOther = document.getElementById('btnDlOther');
const btnDlZip = document.getElementById('btnDlZip');
const btnReset = document.getElementById('btnReset');

const openGuideBtn = document.getElementById('openGuideBtn');
const closeGuideBtn = document.getElementById('closeGuideBtn');
const guideModal = document.getElementById('guideModal');

// State
let selectedFile = null;
let decodedAudio = null;
let currentEngine = 'demucs';
let separatedStems = null; // { vocals, no_vocals, drums, bass, other }
let stemBlobs = {};        // { vocals: Blob, no_vocals: Blob, ... }

// Audio Player State
let audioCtx = null;
let stemNodes = {};        // { [stem]: { source, gainNode, isMuted, isSolo, volume } }
let isPlaying = false;
let playbackStartTime = 0;
let playbackPauseOffset = 0;
let animationFrameId = null;
let analyserNode = null;

// Initialize Hardware Acceleration Badge
async function initCapabilities() {
  try {
    const caps = await checkDeviceCapabilities();
    if (caps.hasWebGPU) {
      deviceBadge.textContent = `⚡ WebGPU Hardware Accelerated (${caps.threads} cores)`;
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

// Engine Selection Switcher
optDemucs.addEventListener('click', () => {
  currentEngine = 'demucs';
  optDemucs.classList.add('selected');
  optDsp.classList.remove('selected');
  optDemucs.querySelector('input').checked = true;
});

optDsp.addEventListener('click', () => {
  currentEngine = 'dsp';
  optDsp.classList.add('selected');
  optDemucs.classList.remove('selected');
  optDsp.querySelector('input').checked = true;
});

// File Drag & Drop Handling
dropZone.addEventListener('click', () => fileInput.click());
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('drag-over');
});
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('drag-over');
  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    handleFileSelected(e.dataTransfer.files[0]);
  }
});
fileInput.addEventListener('change', (e) => {
  if (e.target.files && e.target.files[0]) {
    handleFileSelected(e.target.files[0]);
  }
});

function handleFileSelected(file) {
  selectedFile = file;
  uploadTitle.textContent = `Selected: ${file.name}`;
  uploadDesc.textContent = `File size: ${(file.size / (1024 * 1024)).toFixed(2)} MB &bull; Ready to separate`;
  btnProcess.disabled = false;
  btnProcess.innerHTML = `<span>🚀 Separate Audio with ${currentEngine === 'demucs' ? 'Meta Demucs AI' : 'Instant DSP'}</span>`;
}

// Built-in Demo Audio Generator (Music + Vocal synth)
btnLoadDemo.addEventListener('click', (e) => {
  e.stopPropagation();
  uploadTitle.textContent = 'Demo Track Selected: Synthwave Pop (Vocals & BGM)';
  uploadDesc.textContent = 'Synthetic 44.1kHz demo song with lead vocal melody and background drums/bass.';
  
  // Generate demo audio buffer in-memory
  const sampleRate = 44100;
  const duration = 12; // 12 seconds
  const numSamples = sampleRate * duration;
  const left = new Float32Array(numSamples);
  const right = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    // Drums (Kick every 0.5s)
    const kick = Math.sin(2 * Math.PI * 60 * Math.exp(-t % 0.5 * 15)) * Math.exp(-t % 0.5 * 10) * 0.4;
    // Chords / Synth background (Stereo panned L & R)
    const chordL = Math.sin(2 * Math.PI * 220 * t) * 0.15 + Math.sin(2 * Math.PI * 330 * t) * 0.1;
    const chordR = Math.sin(2 * Math.PI * 261.6 * t) * 0.15 + Math.sin(2 * Math.PI * 392 * t) * 0.1;
    // Lead Center Vocal (L == R)
    const vocalNote = (Math.floor(t * 2) % 4 === 0 ? 440 : Math.floor(t * 2) % 4 === 1 ? 493.88 : Math.floor(t * 2) % 4 === 2 ? 523.25 : 392);
    const vocal = (Math.sin(2 * Math.PI * vocalNote * t) + 0.3 * Math.sin(2 * Math.PI * vocalNote * 2 * t)) * 0.35;

    left[i] = kick + chordL + vocal;
    right[i] = kick + chordR + vocal;
  }

  const demoWavBlob = encodeWav(left, right, sampleRate);
  selectedFile = new File([demoWavBlob], 'Demo_Synthwave_Vocals_and_BGM.wav', { type: 'audio/wav' });
  btnProcess.disabled = false;
  btnProcess.innerHTML = `<span>🚀 Separate Demo Audio with ${currentEngine === 'demucs' ? 'Meta Demucs AI' : 'Instant DSP'}</span>`;
});

// Separation Process Execution
btnProcess.addEventListener('click', async () => {
  if (!selectedFile) return;

  btnProcess.disabled = true;
  progressBox.style.display = 'block';
  studioWorkspace.style.display = 'none';
  stopPlayback();

  updateProgress(0, 'Decoding input file audio stream...');

  try {
    decodedAudio = await decodeAudioFromFile(selectedFile, (msg) => updateProgress(5, msg));

    if (currentEngine === 'dsp') {
      updateProgress(40, 'Running Center Channel DSP Vocal Extractor...');
      await new Promise(r => setTimeout(r, 200));
      separatedStems = fastDspVocalSeparator(decodedAudio.left, decodedAudio.right, 44100);
      updateProgress(90, 'Encoding stem WAV buffers...');
    } else {
      // Demucs AI
      updateProgress(10, 'Checking / Loading Meta HTDemucs AI Model (~172MB)...');
      await loadDemucsModel({
        onDownloadProgress: (loaded, total) => {
          const pct = Math.min(45, 10 + Math.round((loaded / total) * 35));
          const mbLoaded = (loaded / (1024 * 1024)).toFixed(1);
          const mbTotal = (total / (1024 * 1024)).toFixed(1);
          updateProgress(pct, `Downloading Neural Weights: ${mbLoaded}MB / ${mbTotal}MB (${pct}%)`);
        },
        onStatus: (msg) => updateProgress(null, msg)
      });

      updateProgress(50, 'Demucs AI Engine is separating stems...');
      separatedStems = await separateAudioWithDemucs(decodedAudio.left, decodedAudio.right, {
        onProgress: (prog) => {
          const pct = Math.min(95, 50 + Math.round(prog * 45));
          updateProgress(pct, `Neural Inference: ${(prog * 100).toFixed(1)}% complete`);
        },
        onStatus: (msg) => updateProgress(null, msg)
      });
    }

    // Encode Stems to WAV Blobs
    updateProgress(96, 'Creating high-fidelity 16-bit WAV audio files...');
    stemBlobs = {
      vocals: encodeWav(separatedStems.vocals.left, separatedStems.vocals.right, 44100),
      no_vocals: encodeWav(separatedStems.no_vocals.left, separatedStems.no_vocals.right, 44100),
      drums: encodeWav(separatedStems.drums.left, separatedStems.drums.right, 44100),
      bass: encodeWav(separatedStems.bass.left, separatedStems.bass.right, 44100),
      other: encodeWav(separatedStems.other.left, separatedStems.other.right, 44100)
    };

    updateProgress(100, 'Audio Separation Complete! Initializing Studio Mixer...');
    await new Promise(r => setTimeout(r, 400));
    progressBox.style.display = 'none';

    // Show Studio Mixer Workspace
    setupStudioMixer();
  } catch (err) {
    console.error('Separation error:', err);
    progressStatus.textContent = `❌ Error: ${err.message}`;
    progressTitle.textContent = 'Processing Failed';
    btnProcess.disabled = false;
  }
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

// Studio Multi-Track Mixer Setup
async function setupStudioMixer() {
  studioWorkspace.style.display = 'block';
  studioWorkspace.scrollIntoView({ behavior: 'smooth' });

  // Toggle 4-stem cards visibility if DSP mode was used
  const demucsCards = document.querySelectorAll('.demucs-only');
  demucsCards.forEach(c => c.style.display = currentEngine === 'demucs' ? 'flex' : 'none');

  // Format Duration
  const dur = decodedAudio.duration;
  totalTimeLabel.textContent = formatTime(dur);
  currentTimeLabel.textContent = '0:00';
  timelineSlider.value = 0;
  timelineSlider.max = dur;

  // Initialize Web Audio Context for synchronous playback
  if (!audioCtx || audioCtx.state === 'closed') {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  } else if (audioCtx.state === 'suspended') {
    await audioCtx.resume();
  }

  // Master Analyser Node
  analyserNode = audioCtx.createAnalyser();
  analyserNode.fftSize = 256;
  analyserNode.connect(audioCtx.destination);

  // Initialize stem volume and states
  const stemNames = ['vocals', 'no_vocals', 'drums', 'bass', 'other'];
  stemNodes = {};

  for (const name of stemNames) {
    const slider = document.getElementById(`vol_${name}`);
    stemNodes[name] = {
      volume: slider ? parseFloat(slider.value) : 1.0,
      isMuted: false,
      isSolo: false,
      gainNode: null,
      source: null,
      audioBuffer: await createAudioBufferFromPCM(separatedStems[name])
    };
  }

  // Setup Download Buttons
  btnDlVocals.onclick = () => downloadBlob(stemBlobs.vocals, `${getCleanName()}_VOCALS_ONLY.wav`);
  btnDlBgm.onclick = () => downloadBlob(stemBlobs.no_vocals, `${getCleanName()}_BACKGROUND_MUSIC_ONLY.wav`);
  btnDlDrums.onclick = () => downloadBlob(stemBlobs.drums, `${getCleanName()}_DRUMS.wav`);
  btnDlBass.onclick = () => downloadBlob(stemBlobs.bass, `${getCleanName()}_BASS.wav`);
  btnDlOther.onclick = () => downloadBlob(stemBlobs.other, `${getCleanName()}_INSTRUMENTS.wav`);
  btnDlZip.onclick = () => downloadAllStemsAsZip(stemBlobs, getCleanName());

  // Setup Sliders & Solo/Mute
  setupFadersAndMutes();

  // Draw Initial Visualizer
  drawVisualizer();
}

function getCleanName() {
  return selectedFile.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_\-]/g, '_');
}

async function createAudioBufferFromPCM(pcm) {
  const len = pcm.left.length;
  const buf = audioCtx.createBuffer(2, len, 44100);
  buf.copyToChannel(pcm.left, 0);
  buf.copyToChannel(pcm.right, 1);
  return buf;
}

function setupFadersAndMutes() {
  const stemNames = ['vocals', 'no_vocals', 'drums', 'bass', 'other'];

  for (const name of stemNames) {
    const slider = document.getElementById(`vol_${name}`);
    if (slider) {
      slider.oninput = (e) => {
        const val = parseFloat(e.target.value);
        stemNodes[name].volume = val;
        updateGain(name);
      };
    }

    const muteBtn = document.querySelector(`.btn-mute[data-stem="${name}"]`);
    if (muteBtn) {
      muteBtn.onclick = () => {
        stemNodes[name].isMuted = !stemNodes[name].isMuted;
        muteBtn.classList.toggle('active', stemNodes[name].isMuted);
        applySoloMuteLogic();
      };
    }

    const soloBtn = document.querySelector(`.btn-solo[data-stem="${name}"]`);
    if (soloBtn) {
      soloBtn.onclick = () => {
        stemNodes[name].isSolo = !stemNodes[name].isSolo;
        soloBtn.classList.toggle('active', stemNodes[name].isSolo);
        applySoloMuteLogic();
      };
    }
  }
}

function applySoloMuteLogic() {
  const anySolo = Object.values(stemNodes).some(s => s.isSolo);
  for (const name of Object.keys(stemNodes)) {
    updateGain(name, anySolo);
  }
}

function updateGain(name, anySolo = null) {
  if (anySolo === null) {
    anySolo = Object.values(stemNodes).some(s => s.isSolo);
  }
  const s = stemNodes[name];
  if (!s || !s.gainNode) return;

  if (s.isMuted) {
    s.gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  } else if (anySolo) {
    s.gainNode.gain.setValueAtTime(s.isSolo ? s.volume : 0, audioCtx.currentTime);
  } else {
    s.gainNode.gain.setValueAtTime(s.volume, audioCtx.currentTime);
  }
}

// Master Transport Controls
btnPlayMaster.addEventListener('click', () => {
  if (isPlaying) {
    pausePlayback();
  } else {
    startPlayback(playbackPauseOffset);
  }
});

timelineSlider.addEventListener('input', (e) => {
  const targetTime = parseFloat(e.target.value);
  currentTimeLabel.textContent = formatTime(targetTime);
  if (isPlaying) {
    stopPlayback(false);
    startPlayback(targetTime);
  } else {
    playbackPauseOffset = targetTime;
  }
});

function startPlayback(offset = 0) {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  stopPlayback(false);

  playbackStartTime = audioCtx.currentTime - offset;
  playbackPauseOffset = offset;
  isPlaying = true;
  btnPlayMaster.innerHTML = '⏸';

  const anySolo = Object.values(stemNodes).some(s => s.isSolo);

  for (const [name, s] of Object.entries(stemNodes)) {
    s.source = audioCtx.createBufferSource();
    s.source.buffer = s.audioBuffer;

    s.gainNode = audioCtx.createGain();
    updateGain(name, anySolo);

    s.source.connect(s.gainNode);
    s.gainNode.connect(analyserNode);

    s.source.start(0, offset);
  }

  animatePlayback();
}

function pausePlayback() {
  if (!isPlaying) return;
  playbackPauseOffset = audioCtx.currentTime - playbackStartTime;
  stopPlayback(false);
}

function stopPlayback(resetOffset = true) {
  isPlaying = false;
  btnPlayMaster.innerHTML = '▶';
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  for (const s of Object.values(stemNodes)) {
    if (s.source) {
      try { s.source.stop(); } catch {}
      try { s.source.disconnect(); } catch {}
      s.source = null;
    }
    if (s.gainNode) {
      try { s.gainNode.disconnect(); } catch {}
      s.gainNode = null;
    }
  }

  if (resetOffset) {
    playbackPauseOffset = 0;
    timelineSlider.value = 0;
    currentTimeLabel.textContent = '0:00';
  }
}

function animatePlayback() {
  if (!isPlaying) return;

  const current = audioCtx.currentTime - playbackStartTime;
  const dur = decodedAudio.duration;

  if (current >= dur) {
    stopPlayback(true);
    return;
  }

  timelineSlider.value = current;
  currentTimeLabel.textContent = formatTime(current);

  drawVisualizer();
  animationFrameId = requestAnimationFrame(animatePlayback);
}

// Waveform Canvas Visualizer
function drawVisualizer() {
  const canvas = canvasVisualizer;
  const ctx = canvas.getContext('2d');
  const width = canvas.width = canvas.clientWidth * window.devicePixelRatio;
  const height = canvas.height = canvas.clientHeight * window.devicePixelRatio;

  if (!analyserNode || !isPlaying) {
    // Draw resting wave
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    return;
  }

  const bufferLength = analyserNode.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  analyserNode.getByteTimeDomainData(dataArray);

  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = 3;

  const grad = ctx.createLinearGradient(0, 0, width, 0);
  grad.addColorStop(0, '#38bdf8');
  grad.addColorStop(0.5, '#a855f7');
  grad.addColorStop(1, '#f43f5e');
  ctx.strokeStyle = grad;

  ctx.beginPath();
  const sliceWidth = width / bufferLength;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0;
    const y = (v * height) / 2;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
    x += sliceWidth;
  }

  ctx.lineTo(width, height / 2);
  ctx.stroke();
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

btnReset.addEventListener('click', () => {
  stopPlayback(true);
  studioWorkspace.style.display = 'none';
  selectedFile = null;
  decodedAudio = null;
  separatedStems = null;
  stemBlobs = {};
  uploadTitle.textContent = 'Drop your Audio or Video file here';
  uploadDesc.textContent = 'Click to browse or drag and drop any file';
  btnProcess.disabled = true;
  btnProcess.innerHTML = '<span>🚀 Select Audio or Video to Start</span>';
});

// Guide Modal Controls
openGuideBtn.addEventListener('click', () => guideModal.style.display = 'flex');
closeGuideBtn.addEventListener('click', () => guideModal.style.display = 'none');
guideModal.addEventListener('click', (e) => {
  if (e.target === guideModal) guideModal.style.display = 'none';
});
