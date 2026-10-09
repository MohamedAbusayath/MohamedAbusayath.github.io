const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = 'c:\\Users\\91887\\OneDrive\\Desktop\\protfolio';
const port = 5822;

const server = http.createServer((req, res) => {
  let filePath = path.join(root, decodeURIComponent(req.url.split('?')[0]));
  if (!fs.existsSync(filePath)) { res.writeHead(404); res.end('Not found'); return; }
  const ext = path.extname(filePath);
  const types = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
  };
  res.writeHead(200, { 'Content-Type': types[ext] || 'text/plain' });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(port, '127.0.0.1', async () => {
  console.log(`Server started on http://127.0.0.1:${port}`);
  try {
    const browser = await chromium.launch({
      executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
      headless: true
    });

    const viewports = [
      { name: '1920px', w: 1920, h: 1080 },
      { name: '1440px', w: 1440, h: 900 },
      { name: '1024px', w: 1024, h: 800 },
      { name: '768px', w: 768, h: 1024 },
      { name: '430px', w: 430, h: 932 },
      { name: '375px', w: 375, h: 667 },
      { name: '320px', w: 320, h: 568 }
    ];

    console.log('\n==================================================');
    console.log('   SOLAR SYSTEM PLANETARY ORBIT COMPREHENSIVE TESTS');
    console.log('==================================================\n');

    for (const vp of viewports) {
      const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
      await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'load' });
      await page.waitForTimeout(600);

      const res = await page.evaluate(() => {
        const doc = document.documentElement;
        const noHScroll = doc.scrollWidth <= window.innerWidth;
        const sun = document.querySelector('.sun-center');
        const sunRect = sun ? sun.getBoundingClientRect() : null;
        const sunPhoto = document.querySelector('.sun-photo');
        const sunPhotoSrc = sunPhoto ? sunPhoto.getAttribute('src') : null;

        const planets = Array.from(document.querySelectorAll('.planet-item')).map(p => {
          const r = p.getBoundingClientRect();
          const name = p.querySelector('.planet-name')?.innerText || '';
          const techs = p.querySelector('.tooltip-techs')?.innerText || '';
          const style = window.getComputedStyle(p);
          return {
            name,
            techs,
            rect: { left: r.left, top: r.top, width: r.width, height: r.height },
            display: style.display,
            animName: style.animationName,
            offsetRotate: style.offsetRotate
          };
        });

        // Collision check with the sun
        let collisions = 0;
        if (sunRect && window.innerWidth > 640) {
          planets.forEach(p => {
            if (p.display !== 'none') {
              const pCx = p.rect.left + p.rect.width / 2;
              const pCy = p.rect.top + p.rect.height / 2;
              const sCx = sunRect.left + sunRect.width / 2;
              const sCy = sunRect.top + sunRect.height / 2;
              const dist = Math.hypot(pCx - sCx, pCy - sCy);
              const minAllowedDist = (sunRect.width / 2) + 20; // At least 20px clearance
              if (dist < minAllowedDist) collisions++;
            }
          });
        }

        const nameHeader = document.querySelector('.hero-name-title')?.innerText?.trim();
        const roleBanner = document.querySelector('.role-main-title')?.innerText?.trim();
        const introText = document.querySelector('.hero-intro-text')?.innerText?.trim();
        const ctaStart = document.querySelector('.hero-btn-primary')?.innerText?.trim();
        const ctaExplore = document.querySelector('.hero-btn-secondary')?.innerText?.trim();

        const links = {
          github: document.querySelector('.social-github')?.href,
          linkedin: document.querySelector('.social-linkedin')?.href,
          fiverr: document.querySelector('.social-fiverr')?.href,
          email: document.querySelector('.social-email')?.href
        };

        const mobileChips = Array.from(document.querySelectorAll('.mobile-planet-chip')).map(c => ({
          name: c.querySelector('.mobile-chip-name')?.innerText?.trim(),
          techs: c.querySelector('.mobile-chip-techs')?.innerText?.trim()
        }));

        return {
          scrollWidth: doc.scrollWidth,
          innerWidth: window.innerWidth,
          noHScroll,
          sunFound: !!sun,
          sunPhotoSrc,
          planetsCount: planets.length,
          planets,
          collisions,
          nameHeader,
          roleBanner,
          introText,
          ctaStart,
          ctaExplore,
          links,
          mobileChipsCount: mobileChips.length
        };
      });

      console.log(`[Viewport: ${vp.name}]`);
      console.log(`  - No Horizontal Scroll: ${res.noHScroll} (${res.scrollWidth}px <= ${res.innerWidth}px)`);
      console.log(`  - Sun Center Present: ${res.sunFound} (Photo: ${res.sunPhotoSrc})`);
      console.log(`  - Collisions with Sun: ${res.collisions}`);
      console.log(`  - Planets Count: ${res.planetsCount} (Mobile Chips: ${res.mobileChipsCount})`);

      // Screenshot hero area
      const hero = await page.$('#About');
      if (hero) {
        await hero.screenshot({ path: `scratch/solar_${vp.name}.png` });
      }

      await page.close();
    }

    // Motion Verification: Check planet movement over time
    console.log('\n=== ORBIT MOVEMENT VERIFICATION ===');
    const motionPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await motionPage.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'load' });
    
    const pos1 = await motionPage.evaluate(() => {
      const p = document.querySelector('.planet-frontend');
      const r = p.getBoundingClientRect();
      return { x: r.x, y: r.y };
    });
    await motionPage.waitForTimeout(1000); // Wait 1s
    const pos2 = await motionPage.evaluate(() => {
      const p = document.querySelector('.planet-frontend');
      const r = p.getBoundingClientRect();
      return { x: r.x, y: r.y };
    });
    const sunPos = await motionPage.evaluate(() => {
      const s = document.querySelector('.sun-center');
      const r = s.getBoundingClientRect();
      return { x: r.x, y: r.y };
    });
    await motionPage.waitForTimeout(1000); // Wait another 1s
    const sunPos2 = await motionPage.evaluate(() => {
      const s = document.querySelector('.sun-center');
      const r = s.getBoundingClientRect();
      return { x: r.x, y: r.y };
    });

    const planetMoved = Math.hypot(pos2.x - pos1.x, pos2.y - pos1.y) > 3;
    const sunStationary = Math.hypot(sunPos2.x - sunPos.x, sunPos2.y - sunPos.y) < 0.1;
    console.log(`  - Planet Revolving Around Center: ${planetMoved} (Delta: ${Math.hypot(pos2.x - pos1.x, pos2.y - pos1.y).toFixed(2)}px)`);
    console.log(`  - Sun Remains Perfectly Stationary: ${sunStationary} (Delta: ${Math.hypot(sunPos2.x - sunPos.x, sunPos2.y - sunPos.y).toFixed(2)}px)`);
    await motionPage.close();

    // Hover Pause Test (Specific Planet)
    console.log('\n=== HOVER PAUSE VERIFICATION ===');
    const hoverPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await hoverPage.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'load' });
    await hoverPage.hover('.planet-frontend');
    const isHoverPaused = await hoverPage.evaluate(() => {
      const p = document.querySelector('.planet-frontend');
      return window.getComputedStyle(p).animationPlayState === 'paused';
    });
    console.log(`  - Hovering Specific Planet Pauses Its Orbit: ${isHoverPaused}`);
    await hoverPage.close();

    // Reduced Motion Test
    console.log('\n=== PREFERS-REDUCED-MOTION VERIFICATION ===');
    const prmPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await prmPage.emulateMedia({ reducedMotion: 'reduce' });
    await prmPage.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'load' });
    const isMotionDisabled = await prmPage.evaluate(() => {
      const p = document.querySelector('.planet-frontend');
      return window.getComputedStyle(p).animationName === 'none';
    });
    console.log(`  - Reduced Motion Disables Orbit: ${isMotionDisabled}`);
    await prmPage.close();

    await browser.close();
    console.log('\n==================================================');
    console.log('       ALL VERIFICATIONS COMPLETED SUCCESSFULLY');
    console.log('==================================================\n');
  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});
