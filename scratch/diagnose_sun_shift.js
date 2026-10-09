const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = 'c:\\Users\\91887\\OneDrive\\Desktop\\protfolio';
const port = 5126;

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

    for (let t = 0; t <= 3000; t += 500) {
      const info = await page.evaluate(() => {
        const header = document.querySelector('header')?.getBoundingClientRect();
        const about = document.querySelector('#About')?.getBoundingClientRect();
        const stage = document.querySelector('.solar-stage')?.getBoundingClientRect();
        const sun = document.querySelector('.sun-center')?.getBoundingClientRect();
        return {
          headerH: header ? Math.round(header.height) : 0,
          aboutTop: about ? Math.round(about.top) : 0,
          aboutH: about ? Math.round(about.height) : 0,
          stageTop: stage ? Math.round(stage.top) : 0,
          sunY: sun ? Math.round(sun.top) : 0
        };
      });
      console.log(`t = ${t}ms:`, JSON.stringify(info));
      await page.waitForTimeout(500);
    }

    await browser.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    server.close();
  }
});
