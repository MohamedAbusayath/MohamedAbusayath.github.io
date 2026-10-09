const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });
  await page.setContent(`
    <style>
      .stage {
        width: 900px;
        height: 500px;
        position: relative;
        margin: 50px auto;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .center-photo {
        width: 200px;
        height: 250px;
        background: green;
        border-radius: 20px;
        position: relative;
        z-index: 2;
      }
      .orbit-path-visual {
        position: absolute;
        width: 720px;
        height: 420px;
        border: 1px dashed rgba(0, 243, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
      }
      .card {
        position: absolute;
        width: 140px;
        height: 48px;
        background: #181c2f;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3;
        offset-path: ellipse(360px 210px at center);
        offset-rotate: 0deg;
        animation: orbitMotion 24s linear infinite;
      }
      .c1 { animation-delay: calc(24s * 0 / 6); }
      .c2 { animation-delay: calc(24s * -1 / 6); }
      .c3 { animation-delay: calc(24s * -2 / 6); }
      .c4 { animation-delay: calc(24s * -3 / 6); }
      .c5 { animation-delay: calc(24s * -4 / 6); }
      .c6 { animation-delay: calc(24s * -5 / 6); }

      @keyframes orbitMotion {
        from { offset-distance: 0%; }
        to { offset-distance: 100%; }
      }
    </style>
    <div class="stage">
      <div class="orbit-path-visual"></div>
      <div class="center-photo"></div>
      <div class="card c1">FRONTEND</div>
      <div class="card c2">BACKEND</div>
      <div class="card c3">INTEGRATIONS</div>
      <div class="card c4">DATABASE</div>
      <div class="card c5">REST APIs</div>
      <div class="card c6">FULL-STACK</div>
    </div>
  `);
  
  await page.waitForTimeout(500);
  const rects0 = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.card')).map(c => ({ text: c.innerText, ...c.getBoundingClientRect().toJSON() }));
  });
  console.log('Initial positions (t=0):', rects0);
  
  await page.screenshot({ path: 'scratch/test_orbit_capture.png' });
  await browser.close();
})();
