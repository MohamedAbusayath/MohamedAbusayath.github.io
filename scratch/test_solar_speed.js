const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true
  });

  const page = await browser.newPage();
  const fileUrl = 'file://' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');

  // Test 1: Standard viewport
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(fileUrl, { waitUntil: 'networkidle' });

  const statusNormal = await page.evaluate(() => {
    const hud = document.getElementById('orbitHud');
    const toggleBtn = document.getElementById('orbitToggleBtn');
    const speedBtn = document.getElementById('orbitSpeedBtn');

    const stage = document.querySelector('.solar-stage');
    const stageStyle = window.getComputedStyle(stage);

    const orbitFrontend = document.querySelector('.orbit-frontend');
    const orbitBackend = document.querySelector('.orbit-backend');
    const orbitTools = document.querySelector('.orbit-tools');

    const fStyle = window.getComputedStyle(orbitFrontend);
    const bStyle = window.getComputedStyle(orbitBackend);
    const tStyle = window.getComputedStyle(orbitTools);

    return {
      hudExists: !!hud,
      toggleBtnExists: !!toggleBtn,
      speedBtnExists: !!speedBtn,
      cssVarT1: stageStyle.getPropertyValue('--orbit-t1-duration').trim(),
      cssVarT2: stageStyle.getPropertyValue('--orbit-t2-duration').trim(),
      cssVarT3: stageStyle.getPropertyValue('--orbit-t3-duration').trim(),
      orbitFrontendDuration: fStyle.animationDuration,
      orbitFrontendPlayState: fStyle.animationPlayState,
      orbitBackendDuration: bStyle.animationDuration,
      orbitBackendPlayState: bStyle.animationPlayState,
      orbitToolsDuration: tStyle.animationDuration,
      orbitToolsPlayState: tStyle.animationPlayState
    };
  });

  console.log('STANDARD RESULTS:', JSON.stringify(statusNormal, null, 2));
  await page.screenshot({ path: path.resolve(__dirname, 'hero_no_hud_desktop.png') });

  // Test 2: Reduced Motion emulation (verifying it ALWAYS runs)
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload({ waitUntil: 'networkidle' });

  const statusReducedMotion = await page.evaluate(() => {
    const orbitFrontend = document.querySelector('.orbit-frontend');
    const fStyle = window.getComputedStyle(orbitFrontend);
    return {
      orbitFrontendPlayState: fStyle.animationPlayState,
      isAlwaysRunning: fStyle.animationPlayState === 'running'
    };
  });
  console.log('REDUCED MOTION RESULTS:', JSON.stringify(statusReducedMotion, null, 2));

  // Test 3: Mobile screenshot
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 375, height: 667 });
  await page.reload({ waitUntil: 'networkidle' });
  await page.screenshot({ path: path.resolve(__dirname, 'hero_no_hud_mobile.png') });

  await browser.close();
})();
