const { chromium } = require('playwright');

async function testInteractions() {
  console.log('Testing Digital Studio interactions...');
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  const pageErrors = [];
  page.on('pageerror', err => pageErrors.push(err.message));
  page.on('console', msg => {
    if (msg.type() === 'error') pageErrors.push(msg.text());
  });

  await page.goto('http://localhost:8000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  let testsPassed = 0;
  let testsFailed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`  [PASS] ${testName}`);
      testsPassed++;
    } else {
      console.error(`  [FAIL] ${testName}`);
      testsFailed++;
    }
  }

  // 1. Verify Page Title and Meta
  const title = await page.title();
  assert(title.includes('Mohamed Abusayath | Full-Stack Developer & Freelancer'), 'Page Title matches specification');

  // 2. Verify Hero Headline
  const heroTitle = await page.locator('.editorial-hero-title').textContent();
  assert(heroTitle.includes('BUILDING DIGITAL PRODUCTS') && heroTitle.includes('FROM PIXEL TO PRODUCTION'), 'Hero headline matches');

  // 3. Verify Fiverr Links
  const fiverrLinks = await page.$$eval('a[href*="fiverr.com"]', links => links.map(l => l.href));
  assert(fiverrLinks.length >= 3, `Found ${fiverrLinks.length} Fiverr links across header, studio, footer`);
  assert(fiverrLinks.every(url => url.includes('fiverr.com/md_abusayath')), 'All Fiverr links point to verified profile md_abusayath');

  // 4. Test System Flow Diagram Interactivity
  const apiNode = page.locator('.flow-node-card[data-node="api"]');
  await apiNode.click();
  await page.waitForTimeout(100);
  const telemetryTitleText = await page.locator('#telemetry-title').textContent();
  assert(telemetryTitleText.includes('API Routing & Gateway Tier'), 'System flow node API updates telemetry');

  const dbNode = page.locator('.flow-node-card[data-node="database"]');
  await dbNode.click();
  await page.waitForTimeout(100);
  const telemetryTitleDb = await page.locator('#telemetry-title').textContent();
  assert(telemetryTitleDb.includes('Data Persistence & Storage Tier'), 'System flow node DATABASE updates telemetry');

  // 5. Test What I Actually Build (10 Categories)
  const categoryCards = await page.$$('.product-category-card');
  assert(categoryCards.length === 10, '10 product categories rendered in What I Actually Build');

  // 6. Test Services Journey (6 steps)
  const journeySteps = await page.$$('.journey-step-box');
  assert(journeySteps.length === 6, '6 steps in From Idea to Working Product journey');

  // 7. Test Full-Stack Capability Layers (4 layers)
  const layers = await page.$$('.layer-card-block');
  assert(layers.length === 4, '4 layers in One Developer Multiple Layers architecture');

  // 8. Test Terminal Inspector Tab Switching
  const authTab = page.locator('.terminal-tab[data-tab="auth"]');
  await authTab.click();
  await page.waitForTimeout(150);
  const authPaneVis = await page.locator('#pane-auth').isVisible();
  assert(authPaneVis, 'Terminal tab switches to POST /auth/login and displays payload');

  const cacheTab = page.locator('.terminal-tab[data-tab="cache"]');
  await cacheTab.click();
  await page.waitForTimeout(150);
  const cachePaneVis = await page.locator('#pane-cache').isVisible();
  assert(cachePaneVis, 'Terminal tab switches to GET /cache and displays Redis HIT response');

  // 9. Test Freelance Requirement Chips Interaction
  const chip = page.locator('.requirement-chip-btn[data-subject="I need a web application"]');
  await chip.click();
  await page.waitForTimeout(200);
  const projectTypeValue = await page.locator('#project-type').inputValue();
  const subjectValue = await page.locator('#contact-subject').inputValue();
  assert(projectTypeValue === 'Full-Stack Web Application', 'Requirement chip updates project-type dropdown');
  assert(subjectValue.includes('I need a web application'), 'Requirement chip prefills subject input');

  // 10. Test Editorial Case Studies
  const caseStudies = await page.$$('.editorial-project-card');
  assert(caseStudies.length === 4, '4 editorial-style case studies rendered');

  // Check Event Booking features
  const ebCard = await page.locator('#project-01').textContent();
  assert(ebCard.includes('30 km Location Discovery') && ebCard.includes('8-Hour Cutoff Restriction'), 'Event Booking case study includes verified CV features');

  // Check Order Management features
  const omCard = await page.locator('#project-02').textContent();
  assert(omCard.includes('Max 5 Purchases/Day') && omCard.includes('Streaming CSV Reports'), 'Order Management case study includes verified CV features');

  // 11. Test Technical Constellation (No progress bars)
  const progressBars = await page.$$('.progress-bar, .skill-bar, [class*="progress"]');
  assert(progressBars.length === 0, 'Zero progress bars present (No arbitrary percentage bars)');
  const clusters = await page.$$('.constellation-cluster');
  assert(clusters.length === 4, '4 technical constellation clusters rendered (BUILD, DATA, TOOLS, INTEGRATE)');

  // 12. Test About / Internship Verified Grounding
  const aboutText = await page.locator('#about').textContent();
  assert(aboutText.includes('Backend Developer Intern') && aboutText.includes('Doodleblue Innovations'), 'About section prominently features Doodleblue Innovations internship');
  assert(aboutText.includes('St. Michael College of Engineering and Technology') && aboutText.includes('7.5'), 'About section has verified education credentials');

  // 13. Test Theme Toggle
  const htmlThemeBefore = await page.getAttribute('html', 'data-theme');
  await page.locator('#theme-toggle').click();
  await page.waitForTimeout(100);
  const htmlThemeAfter = await page.getAttribute('html', 'data-theme');
  assert(htmlThemeBefore !== htmlThemeAfter, `Theme toggle works (switched from ${htmlThemeBefore} to ${htmlThemeAfter})`);

  // 14. Test Mobile Menu Drawer
  await page.setViewportSize({ width: 375, height: 812 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  const menuToggle = page.locator('#menu-toggle');
  await menuToggle.click();
  await page.waitForTimeout(300);
  const isDrawerOpen = await page.locator('#mobile-drawer').evaluate(el => el.classList.contains('open'));
  assert(isDrawerOpen, 'Mobile full-screen studio drawer opens smoothly on tap');

  // Check errors
  assert(pageErrors.length === 0, `Zero page runtime errors detected (errors count: ${pageErrors.length})`);
  if (pageErrors.length > 0) {
    console.error('Console errors:', pageErrors);
  }

  await browser.close();

  console.log(`\nResults: ${testsPassed} passed, ${testsFailed} failed.`);
  if (testsFailed > 0) {
    process.exit(1);
  }
}

testInteractions().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
