const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          margin: 0;
          background: #080914;
          color: white;
          font-family: sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }

        .solar-stage {
          position: relative;
          width: 840px;
          height: 840px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Concentric Orbital Rings */
        .orbit-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px dashed rgba(255, 255, 255, 0.12);
          pointer-events: none;
        }
        .ring-1 { width: 380px; height: 380px; border-color: rgba(0, 243, 255, 0.2); }
        .ring-2 { width: 570px; height: 570px; border-color: rgba(168, 85, 247, 0.2); }
        .ring-3 { width: 760px; height: 760px; border-color: rgba(233, 30, 99, 0.2); }

        /* The Sun (Center Profile) */
        .sun-center {
          position: relative;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: #15182e;
          border: 2px solid rgba(0, 243, 255, 0.5);
          box-shadow: 0 0 35px rgba(0, 243, 255, 0.3), inset 0 0 20px rgba(233, 30, 99, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }
        .sun-corona {
          position: absolute;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 243, 255, 0.25) 0%, rgba(233, 30, 99, 0.15) 50%, transparent 70%);
          filter: blur(25px);
          pointer-events: none;
          z-index: -1;
        }

        /* Orbit Tracks */
        .orbit-track {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
        }
        .track-1 { animation: rotateCW 24s linear infinite; }
        .track-2 { animation: rotateCW 34s linear infinite; }
        .track-3 { animation: rotateCW 46s linear infinite; }

        @keyframes rotateCW {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes counterRotateCCW-24 {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes counterRotateCCW-34 {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes counterRotateCCW-46 {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        /* Planet Positioning */
        .planet-anchor {
          position: absolute;
          transform-origin: 0 0;
        }

        /* Track 1: R=190px */
        .p-frontend {
          transform: rotate(0deg) translateY(-190px);
        }
        .p-frontend .planet-body {
          animation: counterRotateCCW-24 24s linear infinite;
        }

        .p-integrations {
          transform: rotate(180deg) translateY(-190px) rotate(180deg);
        }
        .p-integrations .planet-body {
          animation: counterRotateCCW-24 24s linear infinite;
        }

        /* Track 2: R=285px */
        .p-backend {
          transform: rotate(60deg) translateY(-285px) rotate(-60deg);
        }
        .p-backend .planet-body {
          animation: counterRotateCCW-34 34s linear infinite;
        }

        .p-database {
          transform: rotate(240deg) translateY(-285px) rotate(-240deg);
        }
        .p-database .planet-body {
          animation: counterRotateCCW-34 34s linear infinite;
        }

        /* Track 3: R=380px */
        .p-tools {
          transform: rotate(300deg) translateY(-380px) rotate(-300deg);
        }
        .p-tools .planet-body {
          animation: counterRotateCCW-46 46s linear infinite;
        }

        .p-restapi {
          transform: rotate(120deg) translateY(-380px) rotate(-120deg);
        }
        .p-restapi .planet-body {
          animation: counterRotateCCW-46 46s linear infinite;
        }

        .planet-body {
          position: absolute;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(18, 22, 38, 0.92);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 30px;
          padding: 6px 14px 6px 8px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
          white-space: nowrap;
          cursor: pointer;
        }

        .planet-orb {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #00f3ff;
          box-shadow: 0 0 10px #00f3ff;
        }
      </style>
    </head>
    <body>
      <div class="solar-stage">
        <div class="orbit-ring ring-1"></div>
        <div class="orbit-ring ring-2"></div>
        <div class="orbit-ring ring-3"></div>

        <div class="sun-center">
          <div class="sun-corona"></div>
          <strong>SUN</strong>
        </div>

        <div class="orbit-track track-1">
          <div class="planet-anchor p-frontend">
            <div class="planet-body"><div class="planet-orb"></div> FRONTEND</div>
          </div>
          <div class="planet-anchor p-integrations">
            <div class="planet-body"><div class="planet-orb" style="background:#a855f7;box-shadow:0 0 10px #a855f7;"></div> INTEGRATIONS</div>
          </div>
        </div>

        <div class="orbit-track track-2">
          <div class="planet-anchor p-backend">
            <div class="planet-body"><div class="planet-orb" style="background:#10b981;box-shadow:0 0 10px #10b981;"></div> BACKEND</div>
          </div>
          <div class="planet-anchor p-database">
            <div class="planet-body"><div class="planet-orb" style="background:#f59e0b;box-shadow:0 0 10px #f59e0b;"></div> DATABASE</div>
          </div>
        </div>

        <div class="orbit-track track-3">
          <div class="planet-anchor p-tools">
            <div class="planet-body"><div class="planet-orb" style="background:#e91e63;box-shadow:0 0 10px #e91e63;"></div> TOOLS</div>
          </div>
          <div class="planet-anchor p-restapi">
            <div class="planet-body"><div class="planet-orb" style="background:#38bdf8;box-shadow:0 0 10px #38bdf8;"></div> REST APIs</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);

  await page.waitForTimeout(500);
  const rects = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.planet-body')).map(p => ({
      text: p.innerText.trim(),
      rect: p.getBoundingClientRect()
    }));
  });
  console.log('Planet positions at t=0:', rects);

  await page.screenshot({ path: 'scratch/test_solar_system.png' });
  await browser.close();
})();
