const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; background: #050510; height: 100vh; display: flex; align-items: center; justify-content: center; font-family: sans-serif; }
        .stage { position: relative; width: 700px; height: 640px; }
        .ring { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); border-radius: 50%; border: 1.5px dashed; pointer-events: none; }
        .ring-1 { width: 310px; height: 310px; border-color: rgba(0, 243, 255, 0.3); }
        .ring-2 { width: 450px; height: 450px; border-color: rgba(168, 85, 247, 0.3); }
        .ring-3 { width: 590px; height: 590px; border-color: rgba(233, 30, 99, 0.3); }
        .sun { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 130px; height: 130px; background: #ff4081; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: bold; }

        .planet-orbit {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
        }

        .planet-item {
          position: absolute;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(14, 18, 34, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 30px;
          padding: 6px 14px;
          color: #fff;
          font-size: 0.82rem;
          font-weight: bold;
          white-space: nowrap;
          cursor: pointer;
        }

        /* Hover pauses this planet and its arm */
        .planet-orbit:hover,
        .planet-orbit:hover .planet-item {
          animation-play-state: paused !important;
        }

        /* Track 1: R=155px, 24s */
        .orbit-frontend {
          animation: spin-0 24s linear infinite;
        }
        .planet-frontend {
          animation: counter-t1-0 24s linear infinite;
        }
        .orbit-integrations {
          animation: spin-180 24s linear infinite;
        }
        .planet-integrations {
          animation: counter-t1-180 24s linear infinite;
        }

        /* Track 2: R=225px, 34s */
        .orbit-backend {
          animation: spin-60 34s linear infinite;
        }
        .planet-backend {
          animation: counter-t2-60 34s linear infinite;
        }
        .orbit-database {
          animation: spin-240 34s linear infinite;
        }
        .planet-database {
          animation: counter-t2-240 34s linear infinite;
        }

        /* Track 3: R=295px, 46s */
        .orbit-tools {
          animation: spin-300 46s linear infinite;
        }
        .planet-tools {
          animation: counter-t3-300 46s linear infinite;
        }
        .orbit-restapi {
          animation: spin-120 46s linear infinite;
        }
        .planet-restapi {
          animation: counter-t3-120 46s linear infinite;
        }

        /* Keyframes */
        @keyframes spin-0   { from { transform: rotate(0deg); }   to { transform: rotate(360deg); } }
        @keyframes spin-60  { from { transform: rotate(60deg); }  to { transform: rotate(420deg); } }
        @keyframes spin-120 { from { transform: rotate(120deg); } to { transform: rotate(480deg); } }
        @keyframes spin-180 { from { transform: rotate(180deg); } to { transform: rotate(540deg); } }
        @keyframes spin-240 { from { transform: rotate(240deg); } to { transform: rotate(600deg); } }
        @keyframes spin-300 { from { transform: rotate(300deg); } to { transform: rotate(660deg); } }

        /* Track 1 Counter (R = 155px) */
        @keyframes counter-t1-0 {
          from { transform: translate(-50%, -50%) translateY(-155px) rotate(0deg); }
          to   { transform: translate(-50%, -50%) translateY(-155px) rotate(-360deg); }
        }
        @keyframes counter-t1-180 {
          from { transform: translate(-50%, -50%) translateY(-155px) rotate(-180deg); }
          to   { transform: translate(-50%, -50%) translateY(-155px) rotate(-540deg); }
        }

        /* Track 2 Counter (R = 225px) */
        @keyframes counter-t2-60 {
          from { transform: translate(-50%, -50%) translateY(-225px) rotate(-60deg); }
          to   { transform: translate(-50%, -50%) translateY(-225px) rotate(-420deg); }
        }
        @keyframes counter-t2-240 {
          from { transform: translate(-50%, -50%) translateY(-225px) rotate(-240deg); }
          to   { transform: translate(-50%, -50%) translateY(-225px) rotate(-600deg); }
        }

        /* Track 3 Counter (R = 295px) */
        @keyframes counter-t3-300 {
          from { transform: translate(-50%, -50%) translateY(-295px) rotate(-300deg); }
          to   { transform: translate(-50%, -50%) translateY(-295px) rotate(-660deg); }
        }
        @keyframes counter-t3-120 {
          from { transform: translate(-50%, -50%) translateY(-295px) rotate(-120deg); }
          to   { transform: translate(-50%, -50%) translateY(-295px) rotate(-480deg); }
        }
      </style>
    </head>
    <body>
      <div class="stage">
        <div class="ring ring-1"></div>
        <div class="ring ring-2"></div>
        <div class="ring ring-3"></div>
        <div class="sun">MOHAMED</div>

        <div class="planet-orbit orbit-frontend"><div class="planet-item planet-frontend">FRONTEND</div></div>
        <div class="planet-orbit orbit-backend"><div class="planet-item planet-backend">BACKEND</div></div>
        <div class="planet-orbit orbit-database"><div class="planet-item planet-database">DATABASE</div></div>
        <div class="planet-orbit orbit-restapi"><div class="planet-item planet-restapi">REST APIs</div></div>
        <div class="planet-orbit orbit-integrations"><div class="planet-item planet-integrations">INTEGRATIONS</div></div>
        <div class="planet-orbit orbit-tools"><div class="planet-item planet-tools">TOOLS</div></div>
      </div>
    </body>
    </html>
  `);

  await page.screenshot({ path: 'scratch/test_wrapper_orbit_full.png' });

  // Test motion over 1 second
  const p1 = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.planet-item')).map(p => {
      const r = p.getBoundingClientRect();
      return { name: p.innerText, x: r.x, y: r.y };
    });
  });

  await page.waitForTimeout(1000);

  const p2 = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.planet-item')).map(p => {
      const r = p.getBoundingClientRect();
      return { name: p.innerText, x: r.x, y: r.y };
    });
  });

  console.log('--- MOVEMENT TEST ---');
  p1.forEach((pt1, i) => {
    const pt2 = p2[i];
    const dist = Math.hypot(pt2.x - pt1.x, pt2.y - pt1.y);
    console.log(`${pt1.name}: moved ${dist.toFixed(2)}px in 1s`);
  });

  await browser.close();
})();
