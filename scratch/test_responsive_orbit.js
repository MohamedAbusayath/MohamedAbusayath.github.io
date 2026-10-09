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

server.listen(5695, '127.0.0.1', async () => {
  try {
    const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
    console.log('Testing viewports...');
    
    // Check 1920px, 1440px, 1024px, 768px, 430px, 390px, 375px, 320px
    const viewports = [
      { name: '1920', w: 1920, h: 1080 },
      { name: '1440', w: 1440, h: 900 },
      { name: '1024', w: 1024, h: 800 },
      { name: '768', w: 768, h: 1024 },
      { name: '430', w: 430, h: 932 },
      { name: '390', w: 390, h: 844 },
      { name: '375', w: 375, h: 667 },
      { name: '320', w: 320, h: 568 }
    ];

    for (const vp of viewports) {
      const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
      await page.goto('http://127.0.0.1:5695/scratch/hero_prototype.html', { waitUntil: 'load' });
      await page.waitForTimeout(400);
      const fits = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
      console.log(`Viewport ${vp.name}px fits without horizontal scroll: ${fits}`);
      await page.close();
    }

    await browser.close();
  } finally {
    server.close();
  }
});
