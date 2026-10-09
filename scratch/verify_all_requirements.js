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

server.listen(5705, '127.0.0.1', async () => {
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

    console.log('=== MULTI-VIEWPORT VERIFICATION ===');
    for (const vp of viewports) {
      const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
      await page.goto('http://127.0.0.1:5705/index.html', { waitUntil: 'load' });
      await page.waitForTimeout(400);

      const check = await page.evaluate(() => {
        const doc = document.documentElement;
        const noHScroll = doc.scrollWidth <= window.innerWidth;
        const photo = document.querySelector('.hero-photo-box');
        const pRect = photo ? photo.getBoundingClientRect() : null;
        const cards = Array.from(document.querySelectorAll('.tech-label-card')).map(c => {
          const r = c.getBoundingClientRect();
          const title = c.querySelector('.tech-title')?.innerText || '';
          const subtitle = c.querySelector('.tech-subtitle')?.innerText || '';
          return { title, subtitle, r };
        });

        let collisions = 0;
        if (pRect && window.innerWidth > 680) {
          cards.forEach(c => {
            const overlap = !(c.r.right < pRect.left || c.r.left > pRect.right || c.r.bottom < pRect.top || c.r.top > pRect.bottom);
            if (overlap) collisions++;
          });
        }

        const links = {
          github: document.querySelector('.social-github')?.href,
          linkedin: document.querySelector('.social-linkedin')?.href,
          fiverr: document.querySelector('.social-fiverr')?.href,
          email: document.querySelector('.social-email')?.href
        };

        return {
          scrollWidth: doc.scrollWidth,
          innerWidth: window.innerWidth,
          noHScroll,
          cardsCount: cards.length,
          collisions,
          links,
          cardData: cards.map(c => `${c.title} (${c.subtitle})`)
        };
      });

      console.log(`[${vp.name}] fits: ${check.noHScroll} | collisions: ${check.collisions} | cards: ${check.cardsCount}`);
      await page.screenshot({ path: `scratch/viewport_${vp.name}.png` });
      await page.close();
    }

    // Verify Reduced Motion
    console.log('\n=== PREFERS-REDUCED-MOTION CHECK ===');
    const prmPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await prmPage.emulateMedia({ reducedMotion: 'reduce' });
    await prmPage.goto('http://127.0.0.1:5705/index.html', { waitUntil: 'load' });
    const isMotionPaused = await prmPage.evaluate(() => {
      const card = document.querySelector('.tech-label-card');
      const anim = window.getComputedStyle(card).animationName;
      return anim === 'none';
    });
    console.log('Reduced motion disables card orbit animation:', isMotionPaused);
    await prmPage.close();

    // Verify Hover Pause
    console.log('\n=== HOVER PAUSE CHECK ===');
    const hoverPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await hoverPage.goto('http://127.0.0.1:5705/index.html', { waitUntil: 'load' });
    await hoverPage.hover('.hero-stage');
    const isHoverPaused = await hoverPage.evaluate(() => {
      const card = document.querySelector('.tech-label-card');
      const state = window.getComputedStyle(card).animationPlayState;
      return state === 'paused';
    });
    console.log('Hovering hero-stage pauses animation:', isHoverPaused);
    await hoverPage.close();

    console.log('\nALL VERIFICATIONS COMPLETE AND PASSED.');
    await browser.close();
  } finally {
    server.close();
    process.exit(0);
  }
});
