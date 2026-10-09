const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const PORT = 5055;
const ROOT_DIR = path.resolve(__dirname, '..');

// Basic MIME types
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
};

// Start simple static file server
const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(ROOT_DIR, reqPath);

  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
});

async function runVerification() {
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`Server listening on http://localhost:${PORT}`);

  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });

  const results = {
    viewportsTested: [],
    overflowIssues: [],
    styleChecks: [],
    consoleErrors: []
  };

  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') {
      const text = msg.text();
      // Filter out third-party analytics/network errors in test
      if (!text.includes('ipapi') && !text.includes('firebase') && !text.includes('firestore')) {
        results.consoleErrors.push(text);
      }
    }
  });

  await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);

  // 1. Check Root Theme Colors & Computed Values
  const themeComputed = await page.evaluate(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    const bodyStyle = getComputedStyle(document.body);
    const heroH1 = document.querySelector('.hero-name-title');
    const heroH1Style = heroH1 ? getComputedStyle(heroH1) : null;
    const heroFrame = document.querySelector('#About');
    const heroFrameStyle = heroFrame ? getComputedStyle(heroFrame) : null;
    const centralSun = document.querySelector('.central-sun');
    const sunCorona = document.querySelector('.sun-corona');
    const sunBadge = document.querySelector('.sun-badge');
    const primaryBtn = document.querySelector('.hero-btn-primary');
    const secondaryBtn = document.querySelector('.hero-btn-secondary');
    const expRole = document.querySelector('.experience-role');
    const expDate = document.querySelector('.experience-card-header .timeline-date');
    const expDot = document.querySelector('.experience-timeline .timeline-dot');
    const eduDot = document.querySelector('.timeline-item .timeline-dot');
    const eduDate = document.querySelector('.timeline-content .timeline-date');

    const planets = Array.from(document.querySelectorAll('.planet-item')).map(p => {
      const s = getComputedStyle(p);
      return {
        text: p.querySelector('.planet-name') ? p.querySelector('.planet-name').innerText.trim() : p.innerText.trim(),
        bgColor: s.backgroundColor,
        color: s.color,
        border: s.border
      };
    });

    return {
      bodyBg: bodyStyle.backgroundColor,
      bodyColor: bodyStyle.color,
      heroH1Color: heroH1Style ? heroH1Style.color : null,
      heroH1Font: heroH1Style ? heroH1Style.fontFamily : null,
      heroFrameBg: heroFrameStyle ? heroFrameStyle.backgroundColor : null,
      heroFrameBorder: heroFrameStyle ? heroFrameStyle.borderColor : null,
      sunCoronaBg: sunCorona ? getComputedStyle(sunCorona).backgroundColor : null,
      sunBadgeBg: sunBadge ? getComputedStyle(sunBadge).backgroundColor : null,
      sunBadgeColor: sunBadge ? getComputedStyle(sunBadge).color : null,
      primaryBtnBg: primaryBtn ? getComputedStyle(primaryBtn).backgroundColor : null,
      primaryBtnColor: primaryBtn ? getComputedStyle(primaryBtn).color : null,
      secondaryBtnBg: secondaryBtn ? getComputedStyle(secondaryBtn).backgroundColor : null,
      secondaryBtnColor: secondaryBtn ? getComputedStyle(secondaryBtn).color : null,
      expRoleColor: expRole ? getComputedStyle(expRole).color : null,
      expDateBg: expDate ? getComputedStyle(expDate).backgroundColor : null,
      expDateColor: expDate ? getComputedStyle(expDate).color : null,
      expDotBg: expDot ? getComputedStyle(expDot).backgroundColor : null,
      eduDotBg: eduDot ? getComputedStyle(eduDot).backgroundColor : null,
      eduDateBg: eduDate ? getComputedStyle(eduDate).backgroundColor : null,
      eduDateColor: eduDate ? getComputedStyle(eduDate).color : null,
      planets
    };
  });

  results.styleChecks.push(themeComputed);
  console.log('--- THEME STYLES COMPUTED ---');
  console.log('Body Background:', themeComputed.bodyBg);
  console.log('H1 Color:', themeComputed.heroH1Color, 'Font:', themeComputed.heroH1Font);
  console.log('Hero Frame Background:', themeComputed.heroFrameBg);
  console.log('Primary Button:', themeComputed.primaryBtnBg, 'text:', themeComputed.primaryBtnColor);
  console.log('Secondary Button:', themeComputed.secondaryBtnBg, 'text:', themeComputed.secondaryBtnColor);
  console.log('Experience Dot:', themeComputed.expDotBg, 'Date Badge:', themeComputed.expDateBg);
  console.log('Planets count:', themeComputed.planets.length);
  themeComputed.planets.forEach(p => {
    console.log(`  Planet [${p.text}]: bg=${p.bgColor}, color=${p.color}`);
  });

  // 2. Check Doodleblue Internship in Experience section
  const doodleblueCheck = await page.evaluate(() => {
    const expSection = document.getElementById('Experience');
    if (!expSection) return false;
    return expSection.innerText.includes('Doodleblue Innovations Pvt. Ltd.');
  });
  console.log('Doodleblue internship present:', doodleblueCheck);

  // 3. Test Viewports and Check for Overflow
  const viewports = [
    { width: 320, height: 600, name: '320px_mobile' },
    { width: 375, height: 667, name: '375px_mobile' },
    { width: 430, height: 932, name: '430px_mobile_large' },
    { width: 768, height: 1024, name: '768px_tablet' },
    { width: 1024, height: 768, name: '1024px_laptop' },
    { width: 1440, height: 900, name: '1440px_desktop' },
    { width: 1920, height: 1080, name: '1920px_wide' }
  ];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.waitForTimeout(300);

    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    results.viewportsTested.push({ width: vp.width, hasOverflow: overflow });
    if (overflow) {
      results.overflowIssues.push(vp.width);
      console.warn(`WARNING: Horizontal overflow detected at ${vp.width}px!`);
    } else {
      console.log(`Viewport ${vp.width}px: OK (No horizontal overflow)`);
    }
  }

  // 4. Capture high-quality screenshots for inspection
  // Desktop 1440px
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  // Trigger scroll reveal for all items
  await page.evaluate(() => {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
  });

  await page.screenshot({ path: path.join(__dirname, 'theme_hero_desktop.png') });

  // Scroll to Projects
  const projectsEl = await page.$('#Projects');
  if (projectsEl) {
    await projectsEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(__dirname, 'theme_projects_desktop.png') });
  }

  // Scroll to Experience
  const expEl = await page.$('#Experience');
  if (expEl) {
    await expEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(__dirname, 'theme_experience_desktop.png') });
  }

  // Scroll to Education
  const eduEl = await page.$('#Education');
  if (eduEl) {
    await eduEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(__dirname, 'theme_education_desktop.png') });
  }

  // Scroll to Contact
  const contactEl = await page.$('#Contact');
  if (contactEl) {
    await contactEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(__dirname, 'theme_contact_desktop.png') });
  }

  // Mobile 375px
  await page.setViewportSize({ width: 375, height: 812 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(__dirname, 'theme_hero_mobile_375.png') });

  if (expEl) {
    await expEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(__dirname, 'theme_experience_mobile_375.png') });
  }

  // Full page desktop
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.screenshot({ path: path.join(__dirname, 'theme_fullpage_desktop.png'), fullPage: true });

  console.log('Screenshots captured successfully!');
  console.log('Console errors:', results.consoleErrors);

  await browser.close();
  server.close();
  console.log('Verification finished.');
}

runVerification().catch(err => {
  console.error('Verification failed:', err);
  server.close();
  process.exit(1);
});
