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

server.listen(5698, '127.0.0.1', async () => {
  try {
    const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
    const viewports = [
      { name: '1920px', w: 1920, h: 1080 },
      { name: '1440px', w: 1440, h: 900 },
      { name: '1024px', w: 1024, h: 800 },
      { name: '768px', w: 768, h: 1024 },
      { name: '430px', w: 430, h: 932 },
      { name: '375px', w: 375, h: 667 },
      { name: '320px', w: 320, h: 568 }
    ];

    for (const vp of viewports) {
      const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
      await page.goto('http://127.0.0.1:5698/index.html', { waitUntil: 'load' });
      await page.waitForTimeout(600);

      const data = await page.evaluate(() => {
        const doc = document.documentElement;
        const noHScroll = doc.scrollWidth <= window.innerWidth;
        const hero = document.getElementById('About');
        const heroRect = hero ? hero.getBoundingClientRect() : null;
        const photo = document.querySelector('.hero-photo-box');
        const photoRect = photo ? photo.getBoundingClientRect() : null;
        const cards = Array.from(document.querySelectorAll('.tech-label-card')).map(c => {
          const r = c.getBoundingClientRect();
          const title = c.querySelector('.tech-title')?.innerText || '';
          const subtitle = c.querySelector('.tech-subtitle')?.innerText || '';
          return {
            title,
            subtitle,
            left: Math.round(r.left),
            top: Math.round(r.top),
            width: Math.round(r.width),
            height: Math.round(r.height),
            right: Math.round(r.right),
            bottom: Math.round(r.bottom)
          };
        });

        // Check collision between any card and photo
        let collisions = 0;
        if (photoRect) {
          cards.forEach(c => {
            const overlap = !(c.right < photoRect.left || c.left > photoRect.right || c.bottom < photoRect.top || c.top > photoRect.bottom);
            if (overlap) collisions++;
          });
        }

        return {
          scrollWidth: doc.scrollWidth,
          innerWidth: window.innerWidth,
          noHScroll,
          cardsCount: cards.length,
          photoExists: !!photo,
          collisions,
          cards: cards.map(c => `${c.title} (${c.left},${c.top})`)
        };
      });

      console.log(`[${vp.name}] Fits: ${data.noHScroll} (sw:${data.scrollWidth} iw:${data.innerWidth}), Cards: ${data.cardsCount}, Collisions: ${data.collisions}`);
      await page.screenshot({ path: `scratch/viewport_${vp.w}.png` });
      await page.close();
    }

    await browser.close();
  } catch (err) {
    console.error(err);
  } finally {
    server.close();
  }
});
