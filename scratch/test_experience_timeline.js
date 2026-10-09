const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = 'c:\\Users\\91887\\OneDrive\\Desktop\\protfolio';
const port = 5134;

const server = http.createServer((req, res) => {
  let p = path.join(root, decodeURIComponent(req.url.split('?')[0]));
  if (p === root || p === root + path.sep) p = path.join(root, 'index.html');
  if (!fs.existsSync(p)) { res.writeHead(404); res.end('Not found'); return; }
  const ext = path.extname(p);
  const types = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
  };
  res.writeHead(200, { 'Content-Type': types[ext] || 'text/plain' });
  fs.createReadStream(p).pipe(res);
});

server.listen(port, '127.0.0.1', async () => {
  console.log(`Test server running at http://127.0.0.1:${port}`);
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true
  });

  try {
    const viewports = [
      { name: 'desktop_1440', w: 1440, h: 900 },
      { name: 'tablet_768', w: 768, h: 1024 },
      { name: 'mobile_375', w: 375, h: 812 }
    ];

    for (const vp of viewports) {
      const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
      await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'domcontentloaded' });
      
      // Scroll to Experience section
      const expSection = await page.locator('#Experience');
      await expSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);

      // Verify DOM content
      const data = await page.evaluate(() => {
        const doc = document.documentElement;
        const noHScroll = doc.scrollWidth <= window.innerWidth;
        const cards = Array.from(document.querySelectorAll('.experience-card')).map(card => {
          return {
            date: card.querySelector('.timeline-date')?.textContent.trim(),
            badge: card.querySelector('.experience-badge')?.textContent.trim(),
            role: card.querySelector('.experience-role')?.textContent.trim(),
            company: card.querySelector('.experience-company')?.textContent.trim(),
            cyanAccentsCount: card.querySelectorAll('.cyan-accent').length,
            responsibilitiesCount: card.querySelectorAll('.experience-responsibilities li').length
          };
        });

        const eduCards = Array.from(document.querySelectorAll('.education-card')).length;

        return {
          noHScroll,
          scrollWidth: doc.scrollWidth,
          innerWidth: window.innerWidth,
          cards,
          eduCardsCount: eduCards
        };
      });

      console.log(`\n[Viewport: ${vp.name}]`);
      console.log(`  - No H-Scroll: ${data.noHScroll} (${data.scrollWidth}px <= ${data.innerWidth}px)`);
      console.log(`  - Experience Cards Found: ${data.cards.length}`);
      console.log(`  - Education Cards Preserved: ${data.eduCardsCount}`);
      data.cards.forEach((c, i) => {
        console.log(`    * Card ${i + 1}: ${c.role} @ ${c.company} | ${c.date} | Responsibilities: ${c.responsibilitiesCount} | Cyan Accents: ${c.cyanAccentsCount}`);
      });

      // Capture screenshot
      await expSection.screenshot({ path: path.join(root, 'scratch', `experience_${vp.name}.png`) });
      await page.close();
    }

    // Verify anchor navigation for both #Experience and #Internships
    const navPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await navPage.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'domcontentloaded' });
    
    // Click #Experience navbar link
    await navPage.click('#navbar a[href="#Experience"]');
    await navPage.waitForTimeout(400);
    const expScrolled = await navPage.evaluate(() => {
      const exp = document.getElementById('Experience');
      const r = exp.getBoundingClientRect();
      return Math.abs(r.top) < 150;
    });
    console.log(`\nNavbar #Experience scroll target reached: ${expScrolled}`);

    await navPage.close();
    await browser.close();
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    server.close();
  }
});
