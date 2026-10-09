const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = 'c:\\Users\\91887\\OneDrive\\Desktop\\protfolio';
const port = 5128;

const server = http.createServer((req, res) => {
  let p = path.join(root, decodeURIComponent(req.url.split('?')[0]));
  if (p === root || p === root + path.sep) p = path.join(root, 'index.html');
  if (!fs.existsSync(p)) { res.writeHead(404); res.end('Not found'); return; }
  const ext = path.extname(p);
  const types = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
  };
  res.writeHead(200, { 'Content-Type': types[ext] || 'text/plain' });
  fs.createReadStream(p).pipe(res);
});

server.listen(port, '127.0.0.1', async () => {
  try {
    const browser = await chromium.launch({
      executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
      headless: true
    });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);

    // Initial state
    const initial = await page.evaluate(() => {
      const p = document.querySelector('.planet-frontend');
      const o = document.querySelector('.orbit-frontend');
      return {
        planetPlayState: window.getComputedStyle(p).animationPlayState,
        orbitPlayState: window.getComputedStyle(o).animationPlayState
      };
    });
    console.log('1. Initial play states:', initial);

    // Get current position of FRONTEND planet and move mouse there directly
    const coords = await page.evaluate(() => {
      const p = document.querySelector('.planet-frontend');
      const r = p.getBoundingClientRect();
      return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    });
    
    await page.mouse.move(coords.x, coords.y);
    await page.waitForTimeout(150);

    const hovered = await page.evaluate(() => {
      const p = document.querySelector('.planet-frontend');
      const o = document.querySelector('.orbit-frontend');
      const tooltip = p.querySelector('.planet-tooltip');
      const ts = window.getComputedStyle(tooltip);
      return {
        planetPlayState: window.getComputedStyle(p).animationPlayState,
        orbitPlayState: window.getComputedStyle(o).animationPlayState,
        tooltipOpacity: ts.opacity,
        tooltipVisibility: ts.visibility,
        tooltipTransform: ts.transform
      };
    });
    console.log('2. After mouse move over planet:', hovered);

    // Move mouse away
    await page.mouse.move(10, 10);
    await page.waitForTimeout(150);

    const resumed = await page.evaluate(() => {
      const p = document.querySelector('.planet-frontend');
      const o = document.querySelector('.orbit-frontend');
      return {
        planetPlayState: window.getComputedStyle(p).animationPlayState,
        orbitPlayState: window.getComputedStyle(o).animationPlayState
      };
    });
    console.log('3. After mouse move away:', resumed);

    await browser.close();
  } catch (err) {
    console.error('Hover test error:', err);
  } finally {
    server.close();
  }
});
