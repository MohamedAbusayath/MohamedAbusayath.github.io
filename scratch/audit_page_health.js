const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = 'c:\\Users\\91887\\OneDrive\\Desktop\\protfolio';
const port = 5129;

const server = http.createServer((req, res) => {
  let p = path.join(root, decodeURIComponent(req.url.split('?')[0]));
  if (p === root || p === root + path.sep) p = path.join(root, 'index.html');
  if (!fs.existsSync(p)) { res.writeHead(404); res.end('Not found: ' + p); return; }
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
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  
  const consoleMessages = [];
  const pageErrors = [];
  const failedRequests = [];

  page.on('console', msg => consoleMessages.push({ type: msg.type(), text: msg.text() }));
  page.on('pageerror', err => pageErrors.push(err.toString()));
  page.on('requestfailed', req => failedRequests.push({ url: req.url(), failure: req.failure() }));

  await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  // Check section anchors
  const navLinks = await page.$$eval('#navbar a', els => els.map(a => a.getAttribute('href')));
  const sectionChecks = [];
  for (const href of navLinks) {
    if (href.startsWith('#')) {
      const exists = await page.$(href) !== null;
      sectionChecks.push({ href, exists });
    }
  }

  // Check solar stage elements
  const solarCheck = await page.evaluate(() => {
    const sun = document.querySelector('.sun-center');
    const photo = document.querySelector('.sun-photo');
    const orbits = document.querySelectorAll('.planet-orbit');
    const items = document.querySelectorAll('.planet-item');
    return {
      sunExists: !!sun,
      photoSrc: photo ? photo.getAttribute('src') : null,
      photoLoaded: photo ? photo.complete && photo.naturalHeight > 0 : false,
      orbitCount: orbits.length,
      itemCount: items.length
    };
  });

  console.log('=== PAGE HEALTH AUDIT ===');
  console.log('Console messages:', consoleMessages);
  console.log('Page errors:', pageErrors);
  console.log('Failed requests:', failedRequests);
  console.log('Nav target checks:', sectionChecks);
  console.log('Solar system check:', solarCheck);

  await browser.close();
  server.close();
});
