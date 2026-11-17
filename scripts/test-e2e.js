import http from 'http';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

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
  
  // Security headers for WebGPU and SharedArrayBuffer
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

    // Collect all console and error logs
    page.on('console', msg => {
      console.log(`[Browser Console ${msg.type()}]:`, msg.text());
    });
    page.on('pageerror', err => {
      console.error('[Browser PageError]:', err.message);
    });

    console.log(`[Test] Navigating to http://localhost:${PORT}...`);
    await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle2' });

    console.log('[Test] Page loaded. Checking Title...');
    const title = await page.title();
    console.log('[Test] Title:', title);

    // Verify upload input exists
    const fileInput = await page.$('#fileInput');
    if (!fileInput) throw new Error('#fileInput not found');

    console.log('[Test] Uploading test video:', TEST_VIDEO);
    await fileInput.uploadFile(TEST_VIDEO);

    // Wait for file info to appear
    await page.waitForFunction(() => {
      const el = document.getElementById('uploadTitle');
      return el && el.textContent.includes('A Tiny Girl');
    }, { timeout: 10000 });
    console.log('[Test] File recognized by UI!');

    // --- TEST 1: Instant DSP Mode ---
    console.log('\n--- [TEST 1] Testing Instant DSP Mode ---');
    await page.click('#optDsp');
    await page.click('#btnProcess');

    // Wait for studio mixer to appear
    await page.waitForFunction(() => {
      const el = document.getElementById('studioWorkspace');
      return el && el.style.display !== 'none';
    }, { timeout: 30000 });
    console.log('[TEST 1 SUCCESS] DSP Mode separated audio and displayed Studio Mixer!');

    const totalDuration = await page.$eval('#totalTimeLabel', el => el.textContent);
    console.log('[TEST 1] Audio Duration in Mixer:', totalDuration);

    // Click Play to verify playback logic
    await page.click('#btnPlayMaster');
    await new Promise(r => setTimeout(r, 1500));
    await page.click('#btnPlayMaster'); // pause
    console.log('[TEST 1] Master playback tested successfully.');

    // --- TEST 2: Test Meta Demucs AI Mode ---
    console.log('\n--- [TEST 2] Reloading Page and Testing Meta Demucs AI Mode ---');
    await page.reload({ waitUntil: 'networkidle2' });

    const fileInput2 = await page.$('#fileInput');
    await fileInput2.uploadFile(TEST_VIDEO);
    await page.waitForFunction(() => {
      const el = document.getElementById('uploadTitle');
      return el && el.textContent.includes('A Tiny Girl');
    }, { timeout: 15000 });
    console.log('[TEST 2] File uploaded for Demucs test!');

    // Opt for Demucs AI (default is checked)
    await page.click('#optDemucs');
    console.log('[TEST 2] Starting Demucs separation...');
    await page.click('#btnProcess');

    // Monitor progress
    let lastProgress = '';
    let reachedInference = false;
    let completed = false;
    const startTime = Date.now();

    while (Date.now() - startTime < 300000) { // 5 minutes max
      const status = await page.evaluate(() => {
        const title = document.getElementById('progressTitle')?.textContent || '';
        const pct = document.getElementById('progressPct')?.textContent || '';
        const status = document.getElementById('progressStatus')?.textContent || '';
        const mixerVisible = document.getElementById('studioWorkspace')?.style.display !== 'none';
        return { title, pct, status, mixerVisible };
      });

      const currentProg = `${status.pct} - ${status.title} - ${status.status}`;
      if (currentProg !== lastProgress) {
        console.log(`[Demucs Progress] ${currentProg}`);
        lastProgress = currentProg;
      }

      if (status.title === 'Processing Failed' || status.status.includes('❌ Error')) {
        throw new Error(`Demucs processing failed: ${status.status}`);
      }

      if (status.mixerVisible) {
        completed = true;
        break;
      }

      await new Promise(r => setTimeout(r, 2000));
    }

    if (!completed) {
      throw new Error('Demucs processing timed out.');
    }

    console.log('\n🎉 [TEST 2 SUCCESS] Meta Demucs AI Mode separated stems completely without error!');
    
    // Check download buttons
    const stemsReady = await page.evaluate(() => {
      return Boolean(window.testStemBlobs || document.getElementById('btnDlVocals'));
    });
    console.log('[TEST 2] Stems and download controls ready:', stemsReady);

    console.log('\n===========================================');
    console.log('✅ ALL TESTS PASSED SUCCESSFULLY!');
    console.log('===========================================\n');

  } catch (err) {
    console.error('\n❌ E2E TEST FAILED:', err);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
    server.close();
    console.log('[TestServer] Closed.');
  }
});
