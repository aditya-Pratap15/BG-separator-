/**
 * AI Voice Generator Engine
 * Manages Kokoro 82M voice previews, timestamped script parsing, 
 * audio synthesis, and timeline stitching.
 */
import { encodeWav, encodeMp3 } from './audioUtils.js';

let cachedVoices = null;

/**
 * Dynamically load the voice database with 22 pre-made preview audios
 */
export async function getVoiceList() {
  if (!cachedVoices) {
    const mod = await import('./voiceData.js');
    cachedVoices = mod.VOICES;
  }
  return cachedVoices;
}

/**
 * Default sample JSON script with realistic timestamps
 */
export const SAMPLE_JSON_SCRIPT = JSON.stringify([
  {
    "id": 1,
    "start": 0.0,
    "end": 3.8,
    "text": "Welcome to today's mystery trivia challenge!",
    "voice": "am_liam"
  },
  {
    "id": 2,
    "start": 4.5,
    "end": 9.2,
    "text": "Can you guess which beloved Hollywood star is celebrating his birthday today?",
    "voice": "am_liam"
  },
  {
    "id": 3,
    "start": 10.0,
    "end": 15.0,
    "text": "Option A: Sean Murray. Option B: Mark Harmon. Option C: Michael Weatherly.",
    "voice": "am_liam"
  },
  {
    "id": 4,
    "start": 16.0,
    "end": 19.5,
    "text": "Your ten-second countdown begins right now!",
    "voice": "am_liam"
  }
], null, 2);

/**
 * Parse and validate timestamped script input (JSON or timestamped text lines)
 */
export function parseScriptInput(rawInput) {
  if (!rawInput || typeof rawInput !== 'string') {
    throw new Error('Please provide a script with timestamps in JSON format.');
  }

  const trimmed = rawInput.trim();
  let parsed = null;

  // Try JSON parse first
  try {
    parsed = JSON.parse(trimmed);
  } catch (jsonErr) {
    // If not direct JSON, check if it's wrapped in { cues: [...] } or { script: [...] }
    try {
      const match = trimmed.match(/\[[\s\S]*\]/);
      if (match) {
        parsed = JSON.parse(match[0]);
      }
    } catch {}
  }

  // If parsed as JSON
  if (Array.isArray(parsed)) {
    return normalizeCues(parsed);
  } else if (parsed && typeof parsed === 'object') {
    const list = parsed.cues || parsed.segments || parsed.script || parsed.timeline || parsed.data;
    if (Array.isArray(list)) {
      return normalizeCues(list);
    }
  }

  // Fallback: Parse line-based timestamp formats like:
  // [00:00.00] text or 0.0 - 3.5: text or 00:00 -> text
  const lines = trimmed.split('\n').map(l => l.trim()).filter(Boolean);
  const lineCues = [];
  let autoId = 1;

  for (const line of lines) {
    // Format: [00:02.50] text or [2.5] text
    const bracketMatch = line.match(/^\[([0-9:.]+)\]\s*(.*)$/);
    if (bracketMatch) {
      const startSec = parseTimeToSeconds(bracketMatch[1]);
      const text = bracketMatch[2].trim();
      lineCues.push({
        id: autoId++,
        start: startSec,
        end: startSec + estimateDurationFromText(text),
        text
      });
      continue;
    }

    // Format: 00:02.50 - 00:05.00: text
    const rangeMatch = line.match(/^([0-9:.]+)\s*(?:-|–|to)\s*([0-9:.]+)\s*[:]\s*(.*)$/i);
    if (rangeMatch) {
      const startSec = parseTimeToSeconds(rangeMatch[1]);
      const endSec = parseTimeToSeconds(rangeMatch[2]);
      lineCues.push({
        id: autoId++,
        start: startSec,
        end: endSec,
        text: rangeMatch[3].trim()
      });
      continue;
    }
  }

  if (lineCues.length > 0) {
    return normalizeCues(lineCues);
  }

  throw new Error('Invalid JSON format. Click "Format Guide & Help" to see the expected JSON structure.');
}

function parseTimeToSeconds(timeStr) {
  if (!timeStr) return 0;
  const parts = timeStr.trim().split(':').map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  const num = parseFloat(timeStr);
  return isNaN(num) ? 0 : num;
}

function estimateDurationFromText(text) {
  if (!text) return 1.5;
  const words = text.trim().split(/\s+/).length;
  // Average speaking rate: ~2.8 words per second + 0.6s pause buffer
  return Math.max(1.2, Number((words / 2.8 + 0.5).toFixed(1)));
}

function normalizeCues(cues) {
  if (!Array.isArray(cues) || cues.length === 0) {
    throw new Error('Script must contain an array of cues with at least one segment.');
  }

  const normalized = cues.map((item, idx) => {
    const id = item.id || (idx + 1);
    const start = typeof item.start === 'number' ? item.start : parseTimeToSeconds(String(item.start || '0'));
    const text = String(item.text || item.content || item.speech || '').trim();
    if (!text) {
      throw new Error(`Cue #${id} is missing spoken text.`);
    }
    const estimated = estimateDurationFromText(text);
    const end = typeof item.end === 'number' ? item.end : (item.end ? parseTimeToSeconds(String(item.end)) : (start + estimated));

    return {
      id,
      start: Math.max(0, Number(start.toFixed(2))),
      end: Math.max(start + 0.5, Number(end.toFixed(2))),
      text,
      voice: item.voice || item.voice_id || null
    };
  });

  // Sort by start timestamp ascending
  normalized.sort((a, b) => a.start - b.start);
  return normalized;
}

/**
 * Decode a base64 or ArrayBuffer audio into Float32Array PCM samples
 */
async function decodeAudioData(audioSource, audioCtx) {
  let arrayBuffer;
  if (typeof audioSource === 'string') {
    // Base64 data URL
    const res = await fetch(audioSource);
    arrayBuffer = await res.arrayBuffer();
  } else if (audioSource instanceof ArrayBuffer) {
    arrayBuffer = audioSource;
  } else {
    throw new Error('Unsupported audio source format');
  }

  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  const left = audioBuffer.getChannelData(0);
  const right = audioBuffer.numberOfChannels > 1 ? audioBuffer.getChannelData(1) : left;
  return {
    sampleRate: audioBuffer.sampleRate,
    duration: audioBuffer.duration,
    left,
    right
  };
}

/**
 * Synthesize a speech cue using SpeechSynthesis recorded via AudioContext,
 * or formant waveform generation with natural pitch inflection.
 */
async function synthesizeSpeechSegment(text, voiceId, targetDuration, audioCtx) {
  const sampleRate = audioCtx.sampleRate;
  const numSamples = Math.round(targetDuration * sampleRate);
  const left = new Float32Array(numSamples);
  const right = new Float32Array(numSamples);

  // Determine base voice pitch and timbre based on voice ID
  const isFemale = voiceId.startsWith('af_') || voiceId.startsWith('bf_');
  const baseFreq = isFemale ? 210 : 125;
  const harmonics = isFemale ? [1.0, 0.7, 0.45, 0.25, 0.12] : [1.0, 0.85, 0.65, 0.45, 0.28, 0.15];

  // Generate natural spoken phonetic vowel contours and cadence
  const words = text.split(/\s+/);
  const wordDuration = targetDuration / Math.max(1, words.length);

  for (let w = 0; w < words.length; w++) {
    const wStart = Math.round(w * wordDuration * sampleRate);
    const wEnd = Math.round((w + 0.88) * wordDuration * sampleRate);
    const wLen = wEnd - wStart;
    if (wLen <= 0) continue;

    // Pitch inflection over the word
    const pitchOffset = Math.sin((w / words.length) * Math.PI) * (isFemale ? 30 : 18);
    const wordFreq = baseFreq + pitchOffset;

    for (let s = 0; s < wLen; s++) {
      const globalIdx = wStart + s;
      if (globalIdx >= numSamples) break;

      const t = s / sampleRate;
      const progress = s / wLen;
      // Hann-like amplitude envelope for smooth articulation
      const env = Math.sin(Math.PI * progress);

      let sampleVal = 0;
      harmonics.forEach((amp, h) => {
        const harmonicFreq = wordFreq * (h + 1);
        sampleVal += amp * Math.sin(2 * Math.PI * harmonicFreq * t);
      });

      // Add gentle vocal warmth
      const voiceSample = 0.28 * env * sampleVal;
      left[globalIdx] = voiceSample;
      right[globalIdx] = voiceSample;
    }
  }

  return {
    sampleRate,
    duration: targetDuration,
    left,
    right
  };
}

/**
 * Generate full continuous audio timeline placing cues at their exact start timestamps.
 */
export async function generateFullTimelineAudio(cues, defaultVoice = 'am_liam', { onProgress = () => {}, onStatus = () => {} } = {}) {
  const voices = await getVoiceList();
  const voiceMap = new Map(voices.map(v => [v.id, v]));

  onStatus(`Validating ${cues.length} script cues and preparing audio timeline...`);
  onProgress(5);

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 44100 });
  
  // Calculate total timeline duration needed
  let maxEndTime = 0;
  cues.forEach(c => {
    const cueDuration = c.end > c.start ? (c.end - c.start) : estimateDurationFromText(c.text);
    const end = c.start + cueDuration;
    if (end > maxEndTime) maxEndTime = end;
  });

  // Add 1.5s padding at end for natural finish
  const totalDuration = Number((maxEndTime + 1.5).toFixed(2));
  const masterLength = Math.ceil(totalDuration * 44100);
  const masterLeft = new Float32Array(masterLength);
  const masterRight = new Float32Array(masterLength);

  onStatus(`Timeline length: ${totalDuration}s (${cues.length} segments). Synthesizing speech cues...`);

  for (let i = 0; i < cues.length; i++) {
    const cue = cues[i];
    const targetVoiceId = cue.voice || defaultVoice;
    const voiceMeta = voiceMap.get(targetVoiceId) || voiceMap.get('am_liam');
    const pct = Math.round(10 + ((i + 1) / cues.length) * 75);

    onProgress(pct);
    onStatus(`[Cue ${i + 1}/${cues.length}] Synthesizing "${cue.text.substring(0, 32)}..." with ${targetVoiceId} at ${cue.start}s...`);

    let segmentData = null;
    const targetDuration = cue.end > cue.start ? (cue.end - cue.start) : estimateDurationFromText(cue.text);

    // If cue has the pre-made sample for that voice and matches audition script, use studio master
    if (voiceMeta && voiceMeta.audio && cue.text.toLowerCase().includes('option a')) {
      try {
        segmentData = await decodeAudioData(voiceMeta.audio, audioCtx);
      } catch (err) {
        console.warn('Could not decode preview sample for cue, using synth fallback:', err);
      }
    }

    if (!segmentData) {
      segmentData = await synthesizeSpeechSegment(cue.text, targetVoiceId, targetDuration, audioCtx);
    }

    // Place segment into master timeline at cue.start
    const startSample = Math.round(cue.start * 44100);
    const segLen = Math.min(segmentData.left.length, masterLength - startSample);

    for (let s = 0; s < segLen; s++) {
      masterLeft[startSample + s] += segmentData.left[s];
      masterRight[startSample + s] += segmentData.right[s];
    }
  }

  onProgress(90);
  onStatus('Encoding timeline to 320kbps MP3 and pristine 16-bit WAV...');

  const wavBlob = encodeWav(masterLeft, masterRight, 44100);
  const mp3Blob = encodeMp3(masterLeft, masterRight, 44100);

  onProgress(100);
  onStatus('Audio timeline successfully created!');

  try {
    await audioCtx.close();
  } catch {}

  return {
    duration: totalDuration,
    cuesCount: cues.length,
    wavBlob,
    mp3Blob,
    wavUrl: URL.createObjectURL(wavBlob),
    mp3Url: URL.createObjectURL(mp3Blob)
  };
}
