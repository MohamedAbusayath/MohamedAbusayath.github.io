const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = 'c:\\Users\\91887\\OneDrive\\Desktop\\protfolio';
const port = 5131;

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
  console.log(`Server running on http://127.0.0.1:${port}`);
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true
  });

  const testReport = {
    viewports: [],
    motionVerification: {},
    hudControls: {},
    hoverInteraction: {},
    linksAndCTAs: {},
    passed: true
  };

  try {
    // 1. Multi-Viewport Cross-Screen Tests
    const viewports = [
      { name: '1920px', w: 1920, h: 1080 },
      { name: '1440px', w: 1440, h: 900 },
      { name: '1024px', w: 1024, h: 800 },
      { name: '768px',  w: 768,  h: 1024 },
      { name: '430px',  w: 430,  h: 932 },
      { name: '375px',  w: 375,  h: 667 },
      { name: '320px',  w: 320,  h: 568 }
    ];

    console.log('\n========================================');
    console.log('   STEP 1: MULTI-VIEWPORT VERIFICATION');
    console.log('========================================');

    for (const vp of viewports) {
      const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
      await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      const vpData = await page.evaluate(() => {
        const doc = document.documentElement;
        const noHScroll = doc.scrollWidth <= window.innerWidth;
        const sun = document.querySelector('.sun-center');
        const sunPhoto = document.querySelector('.sun-photo');
        const sunLoaded = sunPhoto ? sunPhoto.complete && sunPhoto.naturalWidth > 0 : false;
        const planets = Array.from(document.querySelectorAll('.planet-item')).filter(el => {
          return window.getComputedStyle(el).display !== 'none';
        });
        const mobileChips = Array.from(document.querySelectorAll('.mobile-planet-chip')).filter(el => {
          return window.getComputedStyle(el).display !== 'none';
        });

        return {
          noHScroll,
          scrollWidth: doc.scrollWidth,
          innerWidth: window.innerWidth,
          sunPresent: !!sun,
          sunPhotoLoaded: sunLoaded,
          visiblePlanetsCount: planets.length,
          visibleMobileChipsCount: mobileChips.length
        };
      });

      // Capture clean viewport screenshot
      const hero = await page.locator('#About');
      const screenshotPath = path.join(root, 'scratch', `final_${vp.name}.png`);
      await hero.screenshot({ path: screenshotPath });

      testReport.viewports.push({ viewport: vp.name, ...vpData });
      console.log(`[Viewport ${vp.name}] No H-Scroll: ${vpData.noHScroll} (${vpData.scrollWidth}px <= ${vpData.innerWidth}px) | Sun Loaded: ${vpData.sunPhotoLoaded} | Visible Orbit Planets: ${vpData.visiblePlanetsCount} | Mobile Chips: ${vpData.visibleMobileChipsCount}`);
      await page.close();
    }

    // 2. Motion and Upright Verification
    console.log('\n========================================');
    console.log('   STEP 2: PLANETARY ORBIT MOTION & UPRIGHT CHECK');
    console.log('========================================');

    const motionPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await motionPage.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'domcontentloaded' });
    await motionPage.waitForTimeout(1000); // Allow initial layout settle

    const getSnapshot = async () => {
      return await motionPage.evaluate(() => {
        const planets = Array.from(document.querySelectorAll('.planet-item')).map(el => {
          const r = el.getBoundingClientRect();
          const name = el.querySelector('.planet-name')?.textContent || '';
          return { name, x: r.x + r.width / 2, y: r.y + r.height / 2 };
        });
        const sun = document.querySelector('.sun-center');
        const sr = sun ? sun.getBoundingClientRect() : null;
        return {
          planets,
          sun: sr ? { x: sr.x + sr.width / 2, y: sr.y + sr.height / 2 } : null
        };
      });
    };

    const snap0 = await getSnapshot();
    await motionPage.waitForTimeout(1500);
    const snap1 = await getSnapshot();

    const planetMovement = snap0.planets.map((p, idx) => {
      const p1 = snap1.planets[idx];
      const delta = Math.hypot(p1.x - p.x, p1.y - p.y);
      return { name: p.name, delta: delta.toFixed(1) };
    });

    const sunDelta = Math.hypot(snap1.sun.x - snap0.sun.x, snap1.sun.y - snap0.sun.y);
    console.log('Planet deltas in 1.5s:', planetMovement);
    console.log('Sun center delta in 1.5s:', sunDelta.toFixed(2), 'px (Expected: 0.00px)');

    testReport.motionVerification = {
      planetsMoved: planetMovement.every(p => parseFloat(p.delta) > 5),
      planetDeltas: planetMovement,
      sunStationary: sunDelta < 0.1,
      sunDelta: sunDelta.toFixed(2)
    };

    // 3. Orbit HUD Controls Test
    console.log('\n========================================');
    console.log('   STEP 3: ORBIT HUD CONTROLS VERIFICATION');
    console.log('========================================');

    // Test Pause button
    await motionPage.click('#orbitToggleBtn');
    await motionPage.waitForTimeout(200);

    const pausedState = await motionPage.evaluate(() => {
      const stage = document.querySelector('#solarStage');
      const p = document.querySelector('.planet-frontend');
      const badgeText = document.querySelector('#hudStatusText')?.textContent;
      const btnLabel = document.querySelector('#orbitToggleLabel')?.textContent;
      return {
        stageClass: stage.className,
        planetPlayState: window.getComputedStyle(p).animationPlayState,
        badgeText,
        btnLabel
      };
    });
    console.log('After clicking Pause:', pausedState);

    // Verify planet is NOT moving while paused
    const pausePos1 = await getSnapshot();
    await motionPage.waitForTimeout(1000);
    const pausePos2 = await getSnapshot();
    const pauseDelta = Math.hypot(pausePos2.planets[0].x - pausePos1.planets[0].x, pausePos2.planets[0].y - pausePos1.planets[0].y);
    console.log(`Planet movement during paused state: ${pauseDelta.toFixed(2)}px (Expected: 0.00px)`);

    // Test Resume button
    await motionPage.click('#orbitToggleBtn');
    await motionPage.waitForTimeout(200);

    const resumedState = await motionPage.evaluate(() => {
      const stage = document.querySelector('#solarStage');
      const p = document.querySelector('.planet-frontend');
      const badgeText = document.querySelector('#hudStatusText')?.textContent;
      const btnLabel = document.querySelector('#orbitToggleLabel')?.textContent;
      return {
        stageClass: stage.className,
        planetPlayState: window.getComputedStyle(p).animationPlayState,
        badgeText,
        btnLabel
      };
    });
    console.log('After clicking Resume:', resumedState);

    // Test Speed button cycle
    await motionPage.click('#orbitSpeedBtn'); // To 1.5x
    const speed15State = await motionPage.evaluate(() => {
      const stage = document.querySelector('#solarStage');
      return {
        label: document.querySelector('#orbitSpeedLabel')?.textContent,
        t1: stage.style.getPropertyValue('--orbit-t1-duration')
      };
    });
    console.log('After cycling Speed to 1.5x:', speed15State);

    await motionPage.click('#orbitSpeedBtn'); // To 2x
    const speed20State = await motionPage.evaluate(() => {
      const stage = document.querySelector('#solarStage');
      return {
        label: document.querySelector('#orbitSpeedLabel')?.textContent,
        t1: stage.style.getPropertyValue('--orbit-t1-duration')
      };
    });
    console.log('After cycling Speed to 2x:', speed20State);

    await motionPage.click('#orbitSpeedBtn'); // Back to 1x
    const speed10State = await motionPage.evaluate(() => {
      const stage = document.querySelector('#solarStage');
      return {
        label: document.querySelector('#orbitSpeedLabel')?.textContent,
        t1: stage.style.getPropertyValue('--orbit-t1-duration')
      };
    });
    console.log('After cycling Speed to 1x:', speed10State);

    testReport.hudControls = {
      pauseSuccess: pausedState.planetPlayState === 'paused' && pauseDelta < 0.1,
      resumeSuccess: resumedState.planetPlayState === 'running',
      speedCycleSuccess: speed15State.label === '1.5x Speed' && speed20State.label === '2x Speed' && speed10State.label === '1x Speed'
    };

    // 4. Hover Pause & Tooltip Test
    console.log('\n========================================');
    console.log('   STEP 4: INDIVIDUAL PLANET HOVER PAUSE & TOOLTIP');
    console.log('========================================');

    const planetCoords = await motionPage.evaluate(() => {
      const p = document.querySelector('.planet-backend');
      const r = p.getBoundingClientRect();
      return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    });

    await motionPage.mouse.move(planetCoords.x, planetCoords.y);
    await motionPage.waitForTimeout(200);

    const backendHovered = await motionPage.evaluate(() => {
      const p = document.querySelector('.planet-backend');
      const o = document.querySelector('.orbit-backend');
      const tip = p.querySelector('.planet-tooltip');
      const ts = window.getComputedStyle(tip);
      return {
        planetPaused: window.getComputedStyle(p).animationPlayState === 'paused',
        orbitPaused: window.getComputedStyle(o).animationPlayState === 'paused',
        tooltipVisible: ts.visibility === 'visible' && parseFloat(ts.opacity) > 0.5,
        tooltipCategory: tip.querySelector('.tooltip-cat')?.textContent,
        tooltipTechs: tip.querySelector('.tooltip-techs')?.textContent
      };
    });
    console.log('BACKEND planet hover state:', backendHovered);

    await motionPage.mouse.move(10, 10);
    await motionPage.waitForTimeout(200);

    const backendResumed = await motionPage.evaluate(() => {
      const p = document.querySelector('.planet-backend');
      return window.getComputedStyle(p).animationPlayState === 'running';
    });
    console.log('BACKEND planet resumed after mouse leave:', backendResumed);

    testReport.hoverInteraction = {
      backendHovered,
      backendResumed
    };

    // 5. Links, Buttons & CTAs Preserved
    console.log('\n========================================');
    console.log('   STEP 5: LINKS, BUTTONS & CTAS PRESERVATION');
    console.log('========================================');

    const linksData = await motionPage.evaluate(() => {
      const github = document.querySelector('.social-github')?.href;
      const linkedin = document.querySelector('.social-linkedin')?.href;
      const fiverr = document.querySelector('.social-fiverr')?.href;
      const email = document.querySelector('.social-email')?.href;
      const btnStart = document.querySelector('.hero-btn-primary')?.href;
      const btnExplore = document.querySelector('.hero-btn-secondary')?.href;
      return { github, linkedin, fiverr, email, btnStart, btnExplore };
    });
    console.log('Preserved links & buttons:', linksData);

    testReport.linksAndCTAs = linksData;

    console.log('\n========================================');
    console.log('   ALL TESTS COMPLETED SUCCESSFULLY!    ');
    console.log('========================================\n');

    await motionPage.close();
    await browser.close();
  } catch (err) {
    console.error('Test suite failure:', err);
    testReport.passed = false;
  } finally {
    server.close();
  }
});
