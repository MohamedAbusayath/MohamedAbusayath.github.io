const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const page = await browser.newPage();
  
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; background: #050510; height: 100vh; display: flex; align-items: center; justify-content: center; }
        .stage { position: relative; width: 600px; height: 600px; border: 1px solid rgba(255,255,255,0.1); border-radius: 50%; }
        .ring { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 310px; height: 310px; border: 1px dashed cyan; border-radius: 50%; }
        .center-sun { position: absolute; top: 50%; left: 50%; width: 100px; height: 100px; transform: translate(-50%, -50%); background: gold; border-radius: 50%; }
        
        .planet-wrap {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
        }

        .planet-arm-1 {
          animation: spin 10s linear infinite;
        }

        .planet-item {
          position: absolute;
          transform: translate(-50%, -50%) translateY(-155px);
          background: #111;
          color: #fff;
          border: 1px solid cyan;
          padding: 6px 14px;
          border-radius: 20px;
          white-space: nowrap;
          animation: counter-spin 10s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        @keyframes counter-spin {
          from { transform: translate(-50%, -50%) translateY(-155px) rotate(0deg); }
          to   { transform: translate(-50%, -50%) translateY(-155px) rotate(-360deg); }
        }
      </style>
    </head>
    <body>
      <div class="stage">
        <div class="ring"></div>
        <div class="center-sun"></div>
        <div class="planet-wrap planet-arm-1">
          <div class="planet-item">FRONTEND</div>
        </div>
      </div>
    </body>
    </html>
  `);

  await page.screenshot({ path: 'scratch/test_arm_orbit.png' });
  const check = await page.evaluate(() => {
    const p = document.querySelector('.planet-item');
    const r = p.getBoundingClientRect();
    const stage = document.querySelector('.stage').getBoundingClientRect();
    const sCx = stage.left + stage.width / 2;
    const sCy = stage.top + stage.height / 2;
    const pCx = r.left + r.width / 2;
    const pCy = r.top + r.height / 2;
    return {
      dist: Math.hypot(pCx - sCx, pCy - sCy),
      expected: 155,
      pCenter: { pCx, pCy },
      sunCenter: { sCx, sCy }
    };
  });
  console.log('Distance from Sun center to planet center:', check);
  await browser.close();
})();
