/**
 * Video Utilities for Browser-Side Audio/Video Remuxing via FFmpeg WASM
 * Combines original video frames losslessly (-c:v copy) with new isolated audio stems
 */
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

let ffmpegInstance = null;
let isFFmpegLoading = false;

export async function getFFmpeg(onStatus = () => {}) {
  if (ffmpegInstance && ffmpegInstance.loaded) {
    return ffmpegInstance;
  }

  if (isFFmpegLoading) {
    while (isFFmpegLoading) {
      await new Promise(r => setTimeout(r, 100));
    }
    return ffmpegInstance;
  }

  isFFmpegLoading = true;
  try {
    onStatus('Loading high-speed MP4 video engine...');
    ffmpegInstance = new FFmpeg();
    
    ffmpegInstance.on('log', ({ message }) => {
      console.log('[FFmpeg]', message);
    });

    const baseURL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm';
    await ffmpegInstance.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });
    
    onStatus('Video engine ready!');
    return ffmpegInstance;
  } finally {
    isFFmpegLoading = false;
  }
}

/**
 * Losslessly remux original video stream with new audio stem
 * -c:v copy copies video frames without re-encoding (instant + 100% original quality)
 */
export async function muxVideoWithAudio(videoFile, audioWavBlob, { onStatus = () => {} } = {}) {
  const ff = await getFFmpeg(onStatus);

  onStatus('Loading video stream into memory buffer...');
  const ext = pathExtension(videoFile.name);
  const videoName = `input_video${ext}`;
  
  await ff.writeFile(videoName, await fetchFile(videoFile));
  await ff.writeFile('input_stem.wav', await fetchFile(audioWavBlob));

  onStatus('Merging video with new isolated audio track (lossless copy)...');
  const exitCode = await ff.exec([
    '-i', videoName,
    '-i', 'input_stem.wav',
    '-c:v', 'copy',
    '-c:a', 'aac',
    '-b:a', '192k',
    '-map', '0:v:0',
    '-map', '1:a:0',
    '-shortest',
    '-movflags', '+faststart',
    'output.mp4'
  ]);

  if (exitCode !== 0) {
    // Fallback: re-encode video track if container flags mismatch
    onStatus('Re-encoding video stream for universal compatibility...');
    await ff.exec([
      '-i', videoName,
      '-i', 'input_stem.wav',
      '-c:v', 'libx264',
      '-preset', 'ultrafast',
      '-crf', '22',
      '-c:a', 'aac',
      '-b:a', '192k',
      '-map', '0:v:0',
      '-map', '1:a:0',
      '-shortest',
      'output.mp4'
    ]);
  }

  onStatus('Finalizing MP4 video...');
  const data = await ff.readFile('output.mp4');

  // Clean virtual FS
  try {
    await ff.deleteFile(videoName);
    await ff.deleteFile('input_stem.wav');
    await ff.deleteFile('output.mp4');
  } catch {}

  return new Blob([data.buffer], { type: 'video/mp4' });
}

function pathExtension(filename) {
  const match = filename.match(/\.[0-9a-z]+$/i);
  return match ? match[0] : '.mp4';
}
