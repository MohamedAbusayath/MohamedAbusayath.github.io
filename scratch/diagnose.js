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

server.listen(5699, '127.0.0.1', async () => {
  try {
    const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto('http://127.0.0.1:5699/index.html');
    await page.waitForTimeout(500);

    const photoRect = await page.evaluate(() => {
      const p = document.querySelector('.hero-photo-box');
      return p.getBoundingClientRect().toJSON();
    });
    console.log('Photo Rect at 1440px:', photoRect);

    const cardRects = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.tech-label-card')).map(c => ({
        title: c.querySelector('.tech-title').innerText,
        rect: c.getBoundingClientRect().toJSON()
      }));
    });
    console.log('Card Rects at 1440px:');
    cardRects.forEach(c => {
      const p = photoRect;
      const r = c.rect;
      const overlap = !(r.right < p.left || r.left > p.right || r.bottom < p.top || r.top > p.bottom);
      console.log(`- ${c.title}: left=${r.left.toFixed(1)}, right=${r.right.toFixed(1)}, top=${r.top.toFixed(1)}, bottom=${r.bottom.toFixed(1)}, overlap=${overlap}`);
    });

    // Check 375px overflow
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(400);
    const overflowElements = await page.evaluate(() => {
      const docWidth = window.innerWidth;
      const overflowing = [];
      document.querySelectorAll('*').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.right > docWidth + 0.5) {
          overflowing.push({ tag: el.tagName, id: el.id, class: el.className, right: rect.right, width: rect.width });
        }
      });
      return overflowing.slice(0, 10);
    });
    console.log('Overflow elements at 375px:', overflowElements);

    await browser.close();
  } finally {
    server.close();
    process.exit(0);
  }
});
