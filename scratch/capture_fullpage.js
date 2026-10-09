const { chromium } = require('playwright');
const path = require('path');

async function capture() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox']
  });

  const outDir = 'C:\\Users\\91887\\.gemini\\antigravity-ide\\brain\\2d7ab922-feee-4142-9aa8-aa235a14ea1e\\.tempmediaStorage';
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:8000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  // Capture section screenshots
  const sections = ['capabilities', 'services', 'layers', 'work', 'lab', 'hire', 'about', 'skills', 'contact'];
  for (const s of sections) {
    const el = await page.$(`#${s}`);
    if (el) {
      const p = path.join(outDir, `section_${s}.png`);
      await el.screenshot({ path: p });
      console.log(`Saved: ${p}`);
    }
  }

  await browser.close();
}

capture().catch(console.error);
