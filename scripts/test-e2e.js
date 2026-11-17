import http from 'http';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer-core';

const PORT = 4173;
const TEST_VIDEO = "C:/Users/prata/Downloads/A Tiny Girl With a Big Girl's Morning Routine! 💅🏻🥰.mp4";
const ROOT_DIR = path.resolve('.');

// MIME types dictionary
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.wasm': 'application/wasm',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.wav': 'audio/wav',
};

// Start local static server with Cross-Origin Isolation headers
const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
  
  const filePath = path.join(ROOT_DIR, reqPath);
  
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.statusCode = 404;
    res.end('Not Found: ' + reqPath);
  }
});

server.listen(PORT, async () => {
  console.log(`[TestServer] Running at http://localhost:${PORT}`);

  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--enable-features=SharedArrayBuffer',
        '--enable-unsafe-webgpu',
        '--use-angle=default'
      ]
    });

    const page = await browser.newPage();

    page.on('console', msg => {
      console.log(`[Browser Console ${msg.type()}]:`, msg.text());
    });
    page.on('pageerror', err => {
      console.error('[Browser PageError]:', err.message);
    });

    console.log(`[Test] Navigating to http://localhost:${PORT}...`);
    await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle2' });

    const title = await page.title();
    console.log('[Test] Page Title:', title);

    const fileInput = await page.$('#fileInput');
    if (!fileInput) throw new Error('#fileInput not found');

    // --- TEST 1: Batch Upload Test ---
    console.log('\n--- [TEST 1] Testing Batch Queue Capability ---');
    // Upload demo audio first
    await page.click('#btnLoadDemo');
    await new Promise(r => setTimeout(r, 600));

    // Upload test video as second file to trigger batch queue
    await fileInput.uploadFile(TEST_VIDEO);
    await new Promise(r => setTimeout(r, 600));

    const batchCount = await page.$eval('#batchCountBadge', el => el.textContent);
    console.log('[TEST 1] Batch Queue Count:', batchCount);
    if (!batchCount.includes('2')) throw new Error('Batch queue did not register 2 items');

    // --- TEST 2: Process Test Video with Side-by-Side Verification ---
    console.log('\n--- [TEST 2] Processing Video & Verifying Side-by-Side Outputs ---');
    // Select DSP mode for immediate verification of DOM & layout
    await page.click('#optDsp');
    await page.click('#btnProcess');

    // Wait for all batch items to finish processing and progress box to close
    await page.waitForFunction(() => {
      const pBox = document.getElementById('progressBox');
      const previewBtn = document.querySelector('.btn-item-preview[data-idx="1"]');
      return Boolean(previewBtn) && pBox && pBox.style.display === 'none';
    }, { timeout: 45000 });
    console.log('[TEST 2] Both batch items completed!');

    // Call displayItemInStudio on item index 1 (the video file)
    await page.evaluate(() => {
      window.displayItemInStudio(1);
    });
    await new Promise(r => setTimeout(r, 600));

    // Verify Side-by-Side Video Players
    const videoDetails = await page.evaluate(() => {
      const vVocals = document.getElementById('videoVocals');
      const vBgm = document.getElementById('videoBgm');
      const btnVocalsMp4 = document.getElementById('btnDlVocalsMp4');
      const btnVocalsMp3 = document.getElementById('btnDlVocalsMp3');
      const btnBgmMp4 = document.getElementById('btnDlBgmMp4');
      const btnBgmMp3 = document.getElementById('btnDlBgmMp3');

      return {
        vVocalsVisible: vVocals && vVocals.style.display !== 'none',
        vVocalsHasSrc: Boolean(vVocals && vVocals.src),
        vBgmVisible: vBgm && vBgm.style.display !== 'none',
        vBgmHasSrc: Boolean(vBgm && vBgm.src),
        vocalsOptionsCount: [btnVocalsMp4, btnVocalsMp3].filter(Boolean).length,
        bgmOptionsCount: [btnBgmMp4, btnBgmMp3].filter(Boolean).length,
        vocalsMp4Text: btnVocalsMp4?.innerText?.trim() || '',
        vocalsMp3Text: btnVocalsMp3?.innerText?.trim() || '',
        bgmMp4Text: btnBgmMp4?.innerText?.trim() || '',
        bgmMp3Text: btnBgmMp3?.innerText?.trim() || ''
      };
    });

    console.log('[TEST 2] Video Elements State:', videoDetails);
    if (!videoDetails.vVocalsVisible || !videoDetails.vBgmVisible || !videoDetails.vVocalsHasSrc || !videoDetails.vBgmHasSrc) {
      throw new Error('Both video players must be visible side by side with sources attached');
    }
    if (videoDetails.vocalsOptionsCount !== 2 || videoDetails.bgmOptionsCount !== 2) {
      throw new Error(`Expected exactly 2 download options per card, got Vocals: ${videoDetails.vocalsOptionsCount}, BGM: ${videoDetails.bgmOptionsCount}`);
    }

    console.log('✅ Vocals Card has exactly 2 options:', videoDetails.vocalsMp4Text, '&', videoDetails.vocalsMp3Text);
    console.log('✅ Background Card has exactly 2 options:', videoDetails.bgmMp4Text, '&', videoDetails.bgmMp3Text);

    // Test MP3 Download trigger via DOM click
    console.log('\n--- [TEST 3] Testing MP3 Download Trigger ---');
    await page.evaluate(() => {
      document.getElementById('btnDlVocalsMp3').click();
      document.getElementById('btnDlBgmMp3').click();
    });
    console.log('[TEST 3] MP3 download triggers executed cleanly!');

    // Test Sync Play Both
    console.log('\n--- [TEST 4] Testing Sync Play Both Feature ---');
    await page.evaluate(() => document.getElementById('btnSyncBoth').click());
    await new Promise(r => setTimeout(r, 1200));
    await page.evaluate(() => document.getElementById('btnSyncBoth').click()); // pause
    console.log('[TEST 4] Sync Play Both toggled cleanly!');

    console.log('\n===========================================');
    console.log('🎉 ALL TESTS PASSED SUCCESSFULLY!');
    console.log('===========================================\n');

  } catch (err) {
    console.error('\n❌ TEST FAILED:', err);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
    server.close();
    console.log('[TestServer] Closed.');
  }
});
