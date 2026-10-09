const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = 'c:\\Users\\91887\\OneDrive\\Desktop\\protfolio';
const server = http.createServer((req, res) => {
  let filePath = path.join(root, decodeURIComponent(req.url.split('?')[0]));
  if (!fs.existsSync(filePath)) { res.writeHead(404); res.end('Not found'); return; }
  const ext = path.extname(filePath);
  const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };
  res.writeHead(200, { 'Content-Type': types[ext] || 'text/plain' });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(5702, '127.0.0.1', async () => {
  try {
    const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto('http://127.0.0.1:5702/index.html', { waitUntil: 'load' });

    console.log('Testing animation over time...');
    const samples = [];
    for (let i = 0; i < 4; i++) {
      await page.waitForTimeout(1500);
      const cardPos = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.tech-label-card')).map(c => {
          const r = c.getBoundingClientRect();
          const tr = window.getComputedStyle(c).transform;
          return {
            title: c.querySelector('.tech-title').innerText,
            x: Math.round(r.left),
            y: Math.round(r.top),
            transform: tr
          };
        });
      });
      samples.push(cardPos);
    }

    console.log('Sample 0 (t=1.5s):', samples[0].map(c => `${c.title} (${c.x}, ${c.y})`));
    console.log('Sample 1 (t=3.0s):', samples[1].map(c => `${c.title} (${c.x}, ${c.y})`));
    console.log('Sample 2 (t=4.5s):', samples[2].map(c => `${c.title} (${c.x}, ${c.y})`));

    // Verify delta movement between consecutive samples for all 6 cards
    const moved = samples[0].every((c, idx) => {
      const next = samples[1][idx];
      const dist = Math.hypot(next.x - c.x, next.y - c.y);
      return dist > 5; // moved more than 5px
    });

    console.log('All 6 cards are continuously orbiting:', moved);

    // Verify cards are upright (rotation matrix in computed transform should have upright scale/translation)
    const upright = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.tech-label-card')).every(c => {
        const offsetRotate = window.getComputedStyle(c).offsetRotate;
        return offsetRotate.includes('0deg') || offsetRotate === '0deg';
      });
    });
    console.log('All cards upright (offset-rotate: 0deg):', upright);

    // Take screenshot of hero section
    const hero = await page.$('#About');
    if (hero) {
      await hero.screenshot({ path: 'scratch/hero_orbit_live.png' });
      console.log('Hero screenshot saved: scratch/hero_orbit_live.png');
    }

    await browser.close();
  } finally {
    server.close();
    process.exit(0);
  }
});
