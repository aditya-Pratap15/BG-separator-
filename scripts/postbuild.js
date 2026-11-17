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
