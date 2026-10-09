const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const page = await browser.newPage();
  await page.goto('file:///c:/Users/91887/OneDrive/Desktop/protfolio/index.html');
  const support = await page.evaluate(() => {
    const el = document.querySelector('.planet-frontend');
    const style = window.getComputedStyle(el);
    return {
      offsetPath: style.offsetPath,
      animation: style.animation,
      animationPlayState: style.animationPlayState,
      supportsCircle: CSS.supports('offset-path', 'circle(155px at center)'),
      supportsPath: CSS.supports('offset-path', 'path("M 0 0")'),
      prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    };
  });
  console.log(JSON.stringify(support, null, 2));
  await browser.close();
})();
