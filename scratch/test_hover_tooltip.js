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

server.listen(5712, '127.0.0.1', async () => {
  try {
    const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
    const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });

    // Load the same HTML content as test_solar_motionpath.js
    const content = fs.readFileSync('scratch/test_solar_motionpath.js', 'utf8');
    const htmlMatch = content.match(/await page\.setContent\(`([\s\S]*?)`\);/);
    if (htmlMatch) {
      await page.setContent(htmlMatch[1].replace('5711', '5712'));
    }

    await page.waitForTimeout(600);
    // Hover on FRONTEND planet
    await page.hover('.planet-frontend');
    await page.waitForTimeout(300);

    const tooltipVisible = await page.evaluate(() => {
      const tip = document.querySelector('.planet-frontend .planet-tooltip');
      const style = window.getComputedStyle(tip);
      return style.opacity === '1';
    });
    console.log('FRONTEND Tooltip visible on hover:', tooltipVisible);

    const hero = await page.$('.hero-section-frame');
    await hero.screenshot({ path: 'scratch/solar_hover_tooltip.png' });
    console.log('Saved hover screenshot: scratch/solar_hover_tooltip.png');

    await browser.close();
  } finally {
    server.close();
    process.exit(0);
  }
});
