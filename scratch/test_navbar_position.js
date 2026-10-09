const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true
  });

  const page = await browser.newPage();
  const fileUrl = 'file://' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');
  console.log('Navigating to:', fileUrl);

  const results = {
    desktop: {},
    tablet: {},
    mobile: {},
    anchors: {},
    overflow: {}
  };

  // --- 1. DESKTOP TEST (1440x900) ---
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(fileUrl, { waitUntil: 'networkidle' });

  const desktopHeaderInfo = await page.evaluate(() => {
    const header = document.querySelector('header');
    const logo = document.querySelector('.logo');
    const navbar = document.querySelector('#navbar');
    const hStyle = window.getComputedStyle(header);
    const hRect = header.getBoundingClientRect();
    const lRect = logo.getBoundingClientRect();
    const nRect = navbar.getBoundingClientRect();

    return {
      position: hStyle.position,
      top: hStyle.top,
      height: hRect.height,
      headerRect: { top: hRect.top, left: hRect.left, right: hRect.right, bottom: hRect.bottom, width: hRect.width },
      logoRect: { left: lRect.left, right: lRect.right },
      navRect: { left: nRect.left, right: nRect.right },
      bg: hStyle.backgroundColor,
      backdropFilter: hStyle.backdropFilter || hStyle.webkitBackdropFilter,
      boxShadow: hStyle.boxShadow,
      borderBottom: hStyle.borderBottom,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth
    };
  });
  results.desktop.initial = desktopHeaderInfo;

  // Test sticky/fixed on desktop scroll
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(200);

  const desktopScrolledHeader = await page.evaluate(() => {
    const header = document.querySelector('header');
    const rect = header.getBoundingClientRect();
    return {
      top: rect.top,
      bottom: rect.bottom,
      isFixedAtTop: rect.top === 0
    };
  });
  results.desktop.scrolled = desktopScrolledHeader;

  // Desktop screenshot scrolled
  await page.screenshot({ path: path.resolve(__dirname, 'navbar_desktop_scrolled.png') });

  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(100);
  await page.screenshot({ path: path.resolve(__dirname, 'navbar_desktop_top.png') });

  // --- 2. ANCHOR NAVIGATION TEST (DESKTOP) ---
  const anchorIds = ['About', 'Projects', 'Certificates', 'Skills', 'Education', 'Experience', 'Contact'];
  for (const id of anchorIds) {
    // Click anchor link
    await page.click(`#navbar a[href="#${id}"]`);
    await page.waitForTimeout(300);

    const check = await page.evaluate((secId) => {
      const sec = document.getElementById(secId);
      if (!sec) return { exists: false };
      const heading = sec.querySelector('h1, h2, .heading, .hero-frame-header') || sec;
      const hRect = heading.getBoundingClientRect();
      const header = document.querySelector('header');
      const headerRect = header.getBoundingClientRect();

      return {
        exists: true,
        headingTag: heading.tagName,
        headingTop: hRect.top,
        headingBottom: hRect.bottom,
        headerBottom: headerRect.bottom,
        isNotOverlapped: hRect.top >= headerRect.bottom - 5 // slight margin of tolerance
      };
    }, id);
    results.anchors[id] = check;
  }

  // --- 3. TABLET TEST (768x1024) ---
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(200);

  const tabletInfo = await page.evaluate(() => {
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('#navbar');
    const tStyle = window.getComputedStyle(menuToggle);
    const nStyle = window.getComputedStyle(navbar);
    return {
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      menuToggleDisplay: tStyle.display,
      navbarOpacity: nStyle.opacity,
      navbarPointerEvents: nStyle.pointerEvents
    };
  });
  results.tablet = tabletInfo;
  await page.screenshot({ path: path.resolve(__dirname, 'navbar_tablet.png') });

  // Open tablet menu
  await page.click('.menu-toggle');
  await page.waitForTimeout(350);
  const tabletOpen = await page.evaluate(() => {
    const navbar = document.querySelector('#navbar');
    const nStyle = window.getComputedStyle(navbar);
    const nRect = navbar.getBoundingClientRect();
    return {
      active: navbar.classList.contains('active'),
      opacity: nStyle.opacity,
      rect: { top: nRect.top, height: nRect.height, width: nRect.width }
    };
  });
  results.tablet.menuOpen = tabletOpen;
  await page.screenshot({ path: path.resolve(__dirname, 'navbar_tablet_menu_open.png') });

  // --- 4. MOBILE TEST (375x667) ---
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(200);

  const mobileInitial = await page.evaluate(() => {
    const header = document.querySelector('header');
    const logo = document.querySelector('.logo');
    const menuToggle = document.querySelector('.menu-toggle');
    const hRect = header.getBoundingClientRect();
    const lRect = logo.getBoundingClientRect();
    const mRect = menuToggle.getBoundingClientRect();

    return {
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      headerTop: hRect.top,
      headerHeight: hRect.height,
      logoVisible: lRect.width > 0 && lRect.left >= 0,
      menuToggleVisible: mRect.width > 0 && mRect.right <= window.innerWidth
    };
  });
  results.mobile.initial = mobileInitial;
  await page.screenshot({ path: path.resolve(__dirname, 'navbar_mobile_top.png') });

  // Open mobile menu
  await page.click('.menu-toggle');
  await page.waitForTimeout(350);
  const mobileOpen = await page.evaluate(() => {
    const navbar = document.querySelector('#navbar');
    const nStyle = window.getComputedStyle(navbar);
    const nRect = navbar.getBoundingClientRect();
    const header = document.querySelector('header');
    const hRect = header.getBoundingClientRect();
    return {
      active: navbar.classList.contains('active'),
      opacity: nStyle.opacity,
      topMatchesHeaderBottom: Math.abs(nRect.top - hRect.bottom) <= 2,
      rect: { top: nRect.top, bottom: nRect.bottom, width: nRect.width },
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth
    };
  });
  results.mobile.menuOpen = mobileOpen;
  await page.screenshot({ path: path.resolve(__dirname, 'navbar_mobile_menu_open.png') });

  // Click nav item on mobile to ensure menu closes and scrolls
  await page.click('#navbar a[href="#Experience"]');
  await page.waitForTimeout(400);

  const mobileAfterNav = await page.evaluate(() => {
    const navbar = document.querySelector('#navbar');
    const exp = document.getElementById('Experience');
    const heading = exp.querySelector('h1, h2, .heading') || exp;
    const header = document.querySelector('header');
    const hRect = header.getBoundingClientRect();
    return {
      menuClosed: !navbar.classList.contains('active'),
      headerTop: hRect.top,
      experienceHeadingTop: heading.getBoundingClientRect().top,
      headerBottom: hRect.bottom,
      isHeadingVisible: heading.getBoundingClientRect().top >= hRect.bottom - 5
    };
  });
  results.mobile.afterNav = mobileAfterNav;
  await page.screenshot({ path: path.resolve(__dirname, 'navbar_mobile_scrolled_exp.png') });

  // --- 5. OVERFLOW CHECK ACROSS COMMON RESOLUTIONS ---
  const resolutions = [320, 375, 430, 768, 1024, 1440, 1920];
  for (const w of resolutions) {
    await page.setViewportSize({ width: w, height: 800 });
    await page.waitForTimeout(100);
    const overflowCheck = await page.evaluate((width) => {
      return {
        viewportWidth: width,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
      };
    }, w);
    results.overflow[w] = overflowCheck;
  }

  console.log('RESULTS:', JSON.stringify(results, null, 2));

  await browser.close();
})();
