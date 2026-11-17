import fs from 'fs';
import path from 'path';

const distHtml = path.resolve('dist', 'dev.html');
const targetHtml = path.resolve('index.html');
const distAssets = path.resolve('dist', 'assets');
const targetAssets = path.resolve('assets');

if (fs.existsSync(distHtml)) {
  fs.copyFileSync(distHtml, targetHtml);
  console.log('[Postbuild] Copied dist/dev.html -> index.html');
}

if (fs.existsSync(distAssets)) {
  fs.cpSync(distAssets, targetAssets, { recursive: true });
  console.log('[Postbuild] Copied dist/assets -> assets');
}

// Copy unhashed WASM files from onnxruntime-web to assets for direct local loading
const ortDist = path.resolve('node_modules', 'onnxruntime-web', 'dist');
if (fs.existsSync(ortDist)) {
  const wasmFiles = fs.readdirSync(ortDist).filter(f => f.endsWith('.wasm') || f.endsWith('.mjs'));
  for (const f of wasmFiles) {
    const src = path.join(ortDist, f);
    const dst1 = path.join(targetAssets, f);
    const dst2 = path.join(distAssets, f);
    fs.copyFileSync(src, dst1);
    if (fs.existsSync(distAssets)) fs.copyFileSync(src, dst2);
  }
  console.log(`[Postbuild] Copied ${wasmFiles.length} ONNX wasm/mjs files to assets`);
}
