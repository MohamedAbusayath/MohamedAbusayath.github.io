const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const page = await browser.newPage();
  
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; background: #000; height: 100vh; display: flex; align-items: center; justify-content: center; }
        .stage { position: relative; width: 600px; height: 600px; border: 1px solid red; }
        .center-sun { position: absolute; top: 50%; left: 50%; width: 100px; height: 100px; margin: -50px 0 0 -50px; background: yellow; border-radius: 50%; }
        
        .planet {
          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: -50px;
          margin-top: -20px;
          width: 100px;
          height: 40px;
          background: cyan;
          color: black;
          font-weight: bold;
          text-align: center;
          line-height: 40px;
          border-radius: 20px;
          animation: orbit-test 6s linear infinite;
        }

        @keyframes orbit-test {
          from {
            transform: rotate(0deg) translateY(-200px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateY(-200px) rotate(-360deg);
          }
        }
      </style>
    </head>
    <body>
      <div class="stage">
        <div class="center-sun">SUN</div>
        <div class="planet">PLANET</div>
      </div>
    </body>
    </html>
  `);

  for (let i = 0; i < 4; i++) {
    const data = await page.evaluate(() => {
      const p = document.querySelector('.planet');
      const r = p.getBoundingClientRect();
      const style = window.getComputedStyle(p);
      return { x: r.x, y: r.y, transform: style.transform };
    });
    console.log(`Step ${i}:`, data);
    await page.waitForTimeout(500);
  }

  await browser.close();
})();
