const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = 'c:\\Users\\91887\\OneDrive\\Desktop\\protfolio';
const port = 5124;

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
    await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'load' });
    await page.waitForTimeout(500);

    const getPlanetPositions = async () => {
      return await page.evaluate(() => {
        const planets = Array.from(document.querySelectorAll('.planet-item')).map(el => {
          const r = el.getBoundingClientRect();
          const name = el.querySelector('.planet-name')?.textContent || '';
          return { name, x: Math.round(r.x), y: Math.round(r.y) };
        });
        const sun = document.querySelector('.sun-center');
        const sr = sun ? sun.getBoundingClientRect() : null;
        return {
          planets,
          sun: sr ? { x: Math.round(sr.x), y: Math.round(sr.y) } : null
        };
      });
    };

    const p0 = await getPlanetPositions();
    const hero = await page.locator('#About');
    await hero.screenshot({ path: path.join(root, 'scratch', 'rotation_t0.png') });
    console.log('Frame 0 (t = 0s):', JSON.stringify(p0));

    await page.waitForTimeout(2000);
    const p2 = await getPlanetPositions();
    await hero.screenshot({ path: path.join(root, 'scratch', 'rotation_t2.png') });
    console.log('Frame 1 (t = 2s):', JSON.stringify(p2));

    await page.waitForTimeout(2000);
    const p4 = await getPlanetPositions();
    await hero.screenshot({ path: path.join(root, 'scratch', 'rotation_t4.png') });
    console.log('Frame 2 (t = 4s):', JSON.stringify(p4));

    console.log('\n--- VERIFICATION OF MOVEMENT ---');
    p0.planets.forEach((p, idx) => {
      const moved2s = Math.hypot(p2.planets[idx].x - p.x, p2.planets[idx].y - p.y);
      const moved4s = Math.hypot(p4.planets[idx].x - p.x, p4.planets[idx].y - p.y);
      console.log(`${p.name}: moved ${moved2s.toFixed(1)}px in 2s, ${moved4s.toFixed(1)}px in 4s`);
    });

    const sunMoved = Math.hypot(p4.sun.x - p0.sun.x, p4.sun.y - p0.sun.y);
    console.log(`Sun center moved: ${sunMoved.toFixed(1)}px (Expected: 0px)`);

    await browser.close();
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    server.close();
  }
});
