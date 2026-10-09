const { chromium } = require('playwright');
const path = require('path');

async function capture() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox']
  });

  const outDir = 'C:\\Users\\91887\\.gemini\\antigravity-ide\\brain\\2d7ab922-feee-4142-9aa8-aa235a14ea1e\\.tempmediaStorage';

  const viewports = [
    { name: 'studio_desktop_1920', width: 1920, height: 1080 },
    { name: 'studio_tablet_768', width: 768, height: 1024 },
    { name: 'studio_mobile_375', width: 375, height: 812 }
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto('http://localhost:8000', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);
    const filePath = path.join(outDir, `${vp.name}.png`);
    await page.screenshot({ path: filePath, fullPage: false });
    console.log(`Saved screenshot: ${filePath}`);
    await page.close();
  }

  await browser.close();
}

capture().catch(console.error);
