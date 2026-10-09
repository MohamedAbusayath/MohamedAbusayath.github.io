const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = 'c:\\Users\\91887\\OneDrive\\Desktop\\protfolio';
const server = http.createServer((req, res) => {
  let filePath = path.join(root, decodeURIComponent(req.url.split('?')[0]));
  if (!fs.existsSync(filePath)) { res.writeHead(404); res.end('Not found'); return; }
  const ext = path.extname(filePath);
  const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };
  res.writeHead(200, { 'Content-Type': types[ext] || 'text/plain' });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(5710, '127.0.0.1', async () => {
  try {
    const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
    const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });

    await page.setContent(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
        <style>
          *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
          html, body {
            background: #050510;
            color: #ffffff;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            overflow-x: hidden;
            width: 100%;
          }

          /* HERO FRAME */
          .hero-section-frame {
            position: relative;
            max-width: 1200px;
            margin: 30px auto;
            padding: 35px 25px 50px 25px;
            background: radial-gradient(120% 100% at 50% 0%, rgba(22, 28, 52, 0.8) 0%, rgba(10, 12, 22, 0.98) 100%);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 28px;
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1);
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow: hidden;
          }

          /* Header Bar */
          .hero-frame-header {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
            z-index: 2;
          }
          .hero-frame-tag {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-family: monospace;
            font-size: 0.82rem;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.65);
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 6px 14px;
            border-radius: 20px;
          }
          .tag-dot { width: 6px; height: 6px; border-radius: 50%; background: #00f3ff; box-shadow: 0 0 8px #00f3ff; }
          .hero-status-pill {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 0.82rem;
            color: #34d399;
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.3);
            padding: 6px 14px;
            border-radius: 20px;
            font-weight: 500;
          }
          .status-pulse {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #10b981;
            box-shadow: 0 0 8px #10b981;
          }

          /* Name Title */
          .hero-name-capsule {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            padding: 8px 28px;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 40px;
            margin-bottom: 12px;
            z-index: 2;
          }
          .hero-name-title {
            font-size: clamp(1.8rem, 4vw, 2.7rem);
            font-weight: 800;
            letter-spacing: -0.5px;
            margin: 0;
          }
          .name-highlight {
            background: linear-gradient(90deg, #ffffff 10%, #e91e63 55%, #00f3ff 95%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
          .name-spark { color: #00f3ff; }

          /* Role Tag */
          .hero-solar-subtitle {
            font-size: 0.95rem;
            color: rgba(255, 255, 255, 0.7);
            letter-spacing: 2px;
            text-transform: uppercase;
            font-weight: 600;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
            z-index: 2;
          }
          .solar-dot { width: 6px; height: 6px; border-radius: 50%; background: #e91e63; box-shadow: 0 0 8px #e91e63; }

          /* ==========================================================
             SOLAR SYSTEM STAGE
             ========================================================== */
          .solar-stage {
            position: relative;
            width: 800px;
            height: 780px;
            max-width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 10px 0 25px 0;
            z-index: 1;
          }

          /* Ambient Star Dust Background */
          .solar-backdrop-dust {
            position: absolute;
            width: 760px;
            height: 760px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 243, 255, 0.05) 0%, rgba(233, 30, 99, 0.04) 40%, transparent 70%);
            pointer-events: none;
            z-index: 0;
          }

          /* Concentric Orbital Rings */
          .orbit-ring {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            border: 1.5px dashed;
            pointer-events: none;
            z-index: 1;
            transition: all 0.3s ease;
          }
          .ring-1 {
            width: 370px;
            height: 370px;
            border-color: rgba(0, 243, 255, 0.22);
            box-shadow: 0 0 20px rgba(0, 243, 255, 0.04), inset 0 0 20px rgba(0, 243, 255, 0.03);
          }
          .ring-2 {
            width: 550px;
            height: 550px;
            border-color: rgba(168, 85, 247, 0.20);
            box-shadow: 0 0 25px rgba(168, 85, 247, 0.04), inset 0 0 25px rgba(168, 85, 247, 0.03);
          }
          .ring-3 {
            width: 730px;
            height: 730px;
            border-color: rgba(233, 30, 99, 0.18);
            box-shadow: 0 0 30px rgba(233, 30, 99, 0.04), inset 0 0 30px rgba(233, 30, 99, 0.03);
          }

          /* ==========================================================
             THE SUN: Fixed Center Profile Photo
             ========================================================== */
          .sun-center {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 154px;
            height: 154px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
          }

          /* Radiant Solar Halo / Corona */
          .sun-corona {
            position: absolute;
            width: 210px;
            height: 210px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 243, 255, 0.28) 0%, rgba(233, 30, 99, 0.22) 45%, transparent 72%);
            filter: blur(24px);
            pointer-events: none;
            z-index: 1;
            animation: sunCoronaPulse 5s ease-in-out infinite alternate;
          }
          @keyframes sunCoronaPulse {
            0% { transform: scale(0.95); opacity: 0.75; }
            100% { transform: scale(1.08); opacity: 1; }
          }

          /* Clean Circular Solar Frame */
          .sun-frame {
            position: relative;
            width: 146px;
            height: 146px;
            border-radius: 50%;
            background: radial-gradient(circle at 50% 30%, rgba(32, 40, 75, 0.95) 0%, rgba(13, 16, 30, 0.98) 100%);
            border: 2px solid rgba(0, 243, 255, 0.5);
            box-shadow: 0 0 30px rgba(0, 243, 255, 0.35), inset 0 0 20px rgba(233, 30, 99, 0.25);
            overflow: hidden;
            z-index: 2;
            display: flex;
            align-items: flex-end;
            justify-content: center;
          }

          .sun-photo {
            width: 138px;
            height: 160px;
            object-fit: cover;
            object-position: center 10%;
            user-select: none;
            -webkit-user-drag: none;
            filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.6));
            transition: transform 0.3s ease;
          }
          .sun-frame:hover .sun-photo {
            transform: scale(1.06);
          }

          /* Solar Core Pill / Center Identifier */
          .sun-badge {
            position: absolute;
            bottom: -10px;
            background: linear-gradient(135deg, rgba(233, 30, 99, 0.9) 0%, rgba(13, 16, 30, 0.95) 100%);
            border: 1px solid rgba(255, 255, 255, 0.25);
            padding: 3px 12px;
            border-radius: 20px;
            font-size: 0.68rem;
            font-weight: 700;
            letter-spacing: 1.5px;
            color: #ffffff;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.6);
            z-index: 3;
            text-transform: uppercase;
            white-space: nowrap;
          }

          /* ==========================================================
             ORBIT TRACKS & PLANETS (COUNTER-ROTATION SYSTEM)
             ========================================================== */
          .orbit-track {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            z-index: 5;
          }

          /* Orbital Rotations */
          .track-1 { animation: solarOrbitCW 24s linear infinite; }
          .track-2 { animation: solarOrbitCW 34s linear infinite; }
          .track-3 { animation: solarOrbitCW 46s linear infinite; }

          @keyframes solarOrbitCW {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }

          /* Counter-Rotations */
          @keyframes solarCounterRotate-24 {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to   { transform: translate(-50%, -50%) rotate(-360deg); }
          }
          @keyframes solarCounterRotate-34 {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to   { transform: translate(-50%, -50%) rotate(-360deg); }
          }
          @keyframes solarCounterRotate-46 {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to   { transform: translate(-50%, -50%) rotate(-360deg); }
          }

          /* Pause Orbit On Hover/Focus */
          .solar-stage:hover .orbit-track,
          .solar-stage:hover .planet-body {
            animation-play-state: paused !important;
          }

          /* Planet Anchors (Positioned radially on orbit ring) */
          .planet-anchor {
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            height: 0;
          }

          /* TRACK 1 (R = 185px) */
          .anchor-frontend {
            transform: rotate(0deg) translateY(-185px);
          }
          .anchor-frontend .planet-body {
            animation: solarCounterRotate-24 24s linear infinite;
          }

          .anchor-integrations {
            transform: rotate(180deg) translateY(-185px);
          }
          .anchor-integrations .planet-body {
            animation: solarCounterRotate-24 24s linear infinite;
          }

          /* TRACK 2 (R = 275px) */
          .anchor-backend {
            transform: rotate(60deg) translateY(-275px);
          }
          .anchor-backend .planet-body {
            animation: solarCounterRotate-34 34s linear infinite;
          }

          .anchor-database {
            transform: rotate(240deg) translateY(-275px);
          }
          .anchor-database .planet-body {
            animation: solarCounterRotate-34 34s linear infinite;
          }

          /* TRACK 3 (R = 365px) */
          .anchor-tools {
            transform: rotate(300deg) translateY(-365px);
          }
          .anchor-tools .planet-body {
            animation: solarCounterRotate-46 46s linear infinite;
          }

          .anchor-restapi {
            transform: rotate(120deg) translateY(-365px);
          }
          .anchor-restapi .planet-body {
            animation: solarCounterRotate-46 46s linear infinite;
          }

          /* ==========================================================
             PLANET BODY & INTERACTIVE TOOLTIP
             ========================================================== */
          .planet-body {
            position: absolute;
            transform: translate(-50%, -50%);
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: rgba(14, 18, 34, 0.92);
            border: 1px solid rgba(255, 255, 255, 0.18);
            border-radius: 40px;
            padding: 7px 16px 7px 8px;
            box-shadow: 0 10px 26px rgba(0, 0, 0, 0.55), 0 0 12px rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            white-space: nowrap;
            cursor: pointer;
            user-select: none;
            transition: all 0.25s ease;
            z-index: 5;
          }

          .planet-body:hover,
          .planet-body.active {
            z-index: 25;
            transform: translate(-50%, -50%) scale(1.08);
            border-color: rgba(255, 255, 255, 0.45);
          }

          /* Planetary Glowing Orb with Tech Symbol */
          .planet-orb {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 0 0 12px currentColor;
          }
          .planet-orb svg {
            width: 15px;
            height: 15px;
          }

          /* Planet Labels */
          .planet-name {
            font-size: 0.82rem;
            font-weight: 700;
            letter-spacing: 0.6px;
            color: #ffffff;
            line-height: 1;
          }

          /* Specific Planet Accents */
          .planet-frontend .planet-orb { background: rgba(0, 243, 255, 0.2); color: #00f3ff; }
          .planet-frontend:hover { border-color: #00f3ff; box-shadow: 0 12px 30px rgba(0, 243, 255, 0.35); }

          .planet-backend .planet-orb { background: rgba(16, 185, 129, 0.2); color: #34d399; }
          .planet-backend:hover { border-color: #34d399; box-shadow: 0 12px 30px rgba(16, 185, 129, 0.35); }

          .planet-database .planet-orb { background: rgba(245, 158, 11, 0.2); color: #fbbf24; }
          .planet-database:hover { border-color: #fbbf24; box-shadow: 0 12px 30px rgba(245, 158, 11, 0.35); }

          .planet-restapi .planet-orb { background: rgba(56, 189, 248, 0.2); color: #38bdf8; }
          .planet-restapi:hover { border-color: #38bdf8; box-shadow: 0 12px 30px rgba(56, 189, 248, 0.35); }

          .planet-integrations .planet-orb { background: rgba(192, 132, 252, 0.2); color: #c084fc; }
          .planet-integrations:hover { border-color: #c084fc; box-shadow: 0 12px 30px rgba(192, 132, 252, 0.35); }

          .planet-tools .planet-orb { background: rgba(233, 30, 99, 0.2); color: #ff4081; }
          .planet-tools:hover { border-color: #ff4081; box-shadow: 0 12px 30px rgba(233, 30, 99, 0.35); }

          /* Interactive Flyout Tooltip */
          .planet-tooltip {
            position: absolute;
            bottom: calc(100% + 10px);
            left: 50%;
            transform: translateX(-50%) translateY(6px);
            opacity: 0;
            pointer-events: none;
            background: rgba(10, 13, 25, 0.96);
            border: 1px solid rgba(255, 255, 255, 0.22);
            border-radius: 12px;
            padding: 8px 14px;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.7);
            transition: all 0.25s ease;
            white-space: nowrap;
            z-index: 30;
          }
          .planet-tooltip::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border: 5px solid transparent;
            border-top-color: rgba(10, 13, 25, 0.96);
          }
          .planet-body:hover .planet-tooltip,
          .planet-body.active .planet-tooltip {
            opacity: 1;
            pointer-events: auto;
            transform: translateX(-50%) translateY(0);
          }
          .tooltip-cat {
            font-size: 0.68rem;
            font-weight: 700;
            letter-spacing: 1px;
            color: rgba(255, 255, 255, 0.6);
            text-transform: uppercase;
            margin-bottom: 2px;
          }
          .tooltip-techs {
            font-size: 0.78rem;
            color: #ffffff;
            font-weight: 600;
          }

          /* ==========================================================
             HERO ROLE & CTA SECTION (BELOW SOLAR SYSTEM)
             ========================================================== */
          .hero-role-banner {
            position: relative;
            z-index: 4;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 14px 34px 16px 34px;
            background: linear-gradient(180deg, rgba(28, 32, 54, 0.95) 0%, rgba(17, 19, 33, 0.98) 100%);
            border: 1px solid rgba(255, 255, 255, 0.18);
            border-radius: 18px;
            box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.12);
            max-width: 540px;
            width: calc(100% - 40px);
            margin-bottom: 20px;
          }
          .role-main-title {
            font-size: clamp(1.15rem, 2.5vw, 1.45rem);
            font-weight: 800;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #ffffff;
            margin: 0 0 4px 0;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .role-dot { width: 7px; height: 7px; background: #e91e63; border-radius: 50%; box-shadow: 0 0 8px #e91e63; }
          .role-support-text {
            font-size: clamp(0.75rem, 1.6vw, 0.88rem);
            color: rgba(255, 255, 255, 0.68);
            font-weight: 500;
            letter-spacing: 0.5px;
            margin: 0;
          }
          .role-support-text span { color: #00f3ff; margin: 0 4px; }

          /* CTA BLOCK */
          .hero-cta-block {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            max-width: 680px;
            z-index: 2;
          }
          .hero-intro-text {
            font-size: clamp(0.96rem, 1.8vw, 1.12rem);
            color: #e2e8f0;
            line-height: 1.6;
            margin: 0 0 20px 0;
            font-weight: 400;
            max-width: 580px;
          }
          .hero-buttons-row {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 16px;
            flex-wrap: wrap;
            margin-bottom: 20px;
          }
          .hero-btn-primary {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: linear-gradient(135deg, #e91e63 0%, #d81b60 100%);
            color: #ffffff;
            font-size: 0.95rem;
            font-weight: 700;
            letter-spacing: 0.8px;
            padding: 13px 28px;
            border-radius: 50px;
            text-decoration: none;
            box-shadow: 0 10px 24px rgba(233, 30, 99, 0.35);
            border: 1px solid rgba(255, 255, 255, 0.15);
          }
          .hero-btn-secondary {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: rgba(255, 255, 255, 0.05);
            color: #ffffff;
            font-size: 0.95rem;
            font-weight: 700;
            letter-spacing: 0.8px;
            padding: 13px 28px;
            border-radius: 50px;
            text-decoration: none;
            border: 1px solid rgba(255, 255, 255, 0.18);
          }
          .hero-socials-row {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
            justify-content: center;
          }
          .hero-social-pill {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            font-size: 0.82rem;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.75);
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 7px 14px;
            border-radius: 20px;
            text-decoration: none;
          }

          /* Mobile Planets Grid (For small viewports) */
          .mobile-planets-grid {
            display: none;
          }

          /* ==========================================================
             RESPONSIVE MEDIA QUERIES
             ========================================================== */
          @media (max-width: 1024px) {
            .solar-stage {
              width: 660px;
              height: 640px;
            }
            .ring-1 { width: 320px; height: 320px; }
            .ring-2 { width: 470px; height: 470px; }
            .ring-3 { width: 620px; height: 620px; }
            .sun-center { width: 135px; height: 135px; }
            .sun-frame { width: 130px; height: 130px; }
            .sun-photo { width: 122px; height: 142px; }

            .anchor-frontend { transform: rotate(0deg) translateY(-160px); }
            .anchor-integrations { transform: rotate(180deg) translateY(-160px); }
            .anchor-backend { transform: rotate(60deg) translateY(-235px); }
            .anchor-database { transform: rotate(240deg) translateY(-235px); }
            .anchor-tools { transform: rotate(300deg) translateY(-310px); }
            .anchor-restapi { transform: rotate(120deg) translateY(-310px); }

            .planet-body {
              padding: 6px 12px 6px 7px;
              gap: 8px;
            }
            .planet-name { font-size: 0.76rem; }
            .planet-orb { width: 26px; height: 26px; }
          }

          @media (max-width: 768px) {
            .solar-stage {
              width: 540px;
              height: 520px;
            }
            .ring-1 { width: 260px; height: 260px; }
            .ring-2 { width: 380px; height: 380px; }
            .ring-3 { width: 500px; height: 500px; }
            .sun-center { width: 115px; height: 115px; }
            .sun-frame { width: 110px; height: 110px; }
            .sun-photo { width: 102px; height: 120px; }
            .sun-badge { font-size: 0.6rem; padding: 2px 9px; }

            .anchor-frontend { transform: rotate(0deg) translateY(-130px); }
            .anchor-integrations { transform: rotate(180deg) translateY(-130px); }
            .anchor-backend { transform: rotate(60deg) translateY(-190px); }
            .anchor-database { transform: rotate(240deg) translateY(-190px); }
            .anchor-tools { transform: rotate(300deg) translateY(-250px); }
            .anchor-restapi { transform: rotate(120deg) translateY(-250px); }

            .planet-body {
              padding: 5px 10px 5px 6px;
              gap: 6px;
            }
            .planet-name { font-size: 0.70rem; }
            .planet-orb { width: 22px; height: 22px; }
            .planet-orb svg { width: 12px; height: 12px; }
          }

          /* Mobile Screen Adaptation (<= 640px) */
          @media (max-width: 640px) {
            .hero-section-frame {
              padding: 24px 14px 36px 14px;
              margin: 15px auto 40px auto;
              border-radius: 20px;
            }
            .hero-frame-header {
              flex-direction: column;
              gap: 8px;
              align-items: center;
              margin-bottom: 14px;
            }
            .hero-name-capsule {
              padding: 6px 20px;
              margin-bottom: 10px;
            }

            /* Compact Solar Stage on mobile */
            .solar-stage {
              width: 320px;
              height: 310px;
              margin: 10px auto 16px auto;
            }
            .ring-1 { width: 190px; height: 190px; }
            .ring-2 { width: 270px; height: 270px; }
            .ring-3 { display: none; } /* On mobile, 2 rings with glowing nodes */

            .sun-center { width: 95px; height: 95px; }
            .sun-frame { width: 90px; height: 90px; }
            .sun-photo { width: 84px; height: 98px; }
            .sun-corona { width: 140px; height: 140px; }

            .anchor-frontend { transform: rotate(0deg) translateY(-95px); }
            .anchor-integrations { transform: rotate(180deg) translateY(-95px); }
            .anchor-backend { transform: rotate(90deg) translateY(-135px); }
            .anchor-database { transform: rotate(270deg) translateY(-135px); }
            .anchor-tools, .anchor-restapi { display: none; }

            .planet-body {
              padding: 4px 8px 4px 5px;
              gap: 5px;
            }
            .planet-name { font-size: 0.65rem; }
            .planet-orb { width: 18px; height: 18px; }
            .planet-orb svg { width: 10px; height: 10px; }

            /* Mobile Planetary Skill Chips Grid directly below stage */
            .mobile-planets-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 8px;
              width: 100%;
              max-width: 440px;
              margin: 6px auto 16px auto;
            }
            .mobile-planet-chip {
              display: flex;
              align-items: center;
              gap: 8px;
              background: rgba(14, 18, 34, 0.92);
              border: 1px solid rgba(255, 255, 255, 0.14);
              border-radius: 12px;
              padding: 8px 10px;
              text-align: left;
            }
            .mobile-chip-orb {
              width: 24px;
              height: 24px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
            }
            .mobile-chip-orb svg { width: 13px; height: 13px; }
            .mobile-chip-text { display: flex; flex-direction: column; overflow: hidden; }
            .mobile-chip-name { font-size: 0.74rem; font-weight: 700; color: #fff; }
            .mobile-chip-techs { font-size: 0.62rem; color: rgba(255, 255, 255, 0.55); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

            .hero-buttons-row {
              flex-direction: column;
              width: 100%;
            }
            .hero-btn-primary, .hero-btn-secondary {
              width: 100%;
              justify-content: center;
            }
          }

          @media (max-width: 380px) {
            .mobile-planets-grid {
              grid-template-columns: 1fr;
            }
            .solar-stage {
              width: 290px;
              height: 280px;
            }
            .ring-1 { width: 170px; height: 170px; }
            .ring-2 { width: 245px; height: 245px; }
            .anchor-frontend { transform: rotate(0deg) translateY(-85px); }
            .anchor-integrations { transform: rotate(180deg) translateY(-85px); }
            .anchor-backend { transform: rotate(90deg) translateY(-122px); }
            .anchor-database { transform: rotate(270deg) translateY(-122px); }
          }
        </style>
      </head>
      <body>
        <section id="About" class="hero-section-frame">
          <div class="hero-frame-header">
            <div class="hero-frame-tag">
              <span class="tag-dot"></span>
              Portfolio // 2026
            </div>
            <div class="hero-status-pill">
              <span class="status-pulse"></span>
              Available for Freelance Projects
            </div>
          </div>

          <div class="hero-name-capsule">
            <span class="name-spark">✦</span>
            <h1 class="hero-name-title">Mohamed <span class="name-highlight">Abusayath</span></h1>
            <span class="name-spark">✦</span>
          </div>

          <div class="hero-solar-subtitle">
            <span class="solar-dot"></span>
            Technical Solar System
            <span class="solar-dot"></span>
          </div>

          <!-- SOLAR STAGE -->
          <div class="solar-stage">
            <div class="solar-backdrop-dust" aria-hidden="true"></div>

            <!-- Concentric Orbital Rings -->
            <div class="orbit-ring ring-1" aria-hidden="true"></div>
            <div class="orbit-ring ring-2" aria-hidden="true"></div>
            <div class="orbit-ring ring-3" aria-hidden="true"></div>

            <!-- THE SUN -->
            <div class="sun-center">
              <div class="sun-corona" aria-hidden="true"></div>
              <div class="sun-frame">
                <img src="http://127.0.0.1:5710/img/mohamed-abusayath.png" alt="Mohamed Abusayath" class="sun-photo">
              </div>
              <div class="sun-badge">MOHAMED</div>
            </div>

            <!-- ORBIT 1 (INNER) -->
            <div class="orbit-track track-1">
              <!-- Planet 1: FRONTEND -->
              <div class="planet-anchor anchor-frontend">
                <div class="planet-body planet-frontend">
                  <div class="planet-orb">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                  </div>
                  <span class="planet-name">FRONTEND</span>
                  <div class="planet-tooltip">
                    <div class="tooltip-cat">PLANET 1 — FRONTEND</div>
                    <div class="tooltip-techs">HTML, CSS, JavaScript, React</div>
                  </div>
                </div>
              </div>

              <!-- Planet 5: INTEGRATIONS -->
              <div class="planet-anchor anchor-integrations">
                <div class="planet-body planet-integrations">
                  <div class="planet-orb">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M19.439 7.85c0-1.571-.944-2.85-2.112-2.85s-2.112 1.279-2.112 2.85V9H10.78v-1.15c0-1.571-.945-2.85-2.112-2.85S6.557 6.279 6.557 7.85V9H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-2.561v-1.15z"></path>
                    </svg>
                  </div>
                  <span class="planet-name">INTEGRATIONS</span>
                  <div class="planet-tooltip">
                    <div class="tooltip-cat">PLANET 5 — INTEGRATIONS</div>
                    <div class="tooltip-techs">Third-party APIs, Webhooks, Payment Integration</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- ORBIT 2 (MIDDLE) -->
            <div class="orbit-track track-2">
              <!-- Planet 2: BACKEND -->
              <div class="planet-anchor anchor-backend">
                <div class="planet-body planet-backend">
                  <div class="planet-orb">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                      <line x1="6" y1="6" x2="6.01" y2="6"></line>
                      <line x1="6" y1="18" x2="6.01" y2="18"></line>
                    </svg>
                  </div>
                  <span class="planet-name">BACKEND</span>
                  <div class="planet-tooltip">
                    <div class="tooltip-cat">PLANET 2 — BACKEND</div>
                    <div class="tooltip-techs">Node.js, Express.js, TypeScript</div>
                  </div>
                </div>
              </div>

              <!-- Planet 3: DATABASE -->
              <div class="planet-anchor anchor-database">
                <div class="planet-body planet-database">
                  <div class="planet-orb">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                    </svg>
                  </div>
                  <span class="planet-name">DATABASE</span>
                  <div class="planet-tooltip">
                    <div class="tooltip-cat">PLANET 3 — DATABASE</div>
                    <div class="tooltip-techs">MongoDB, MySQL, Mongoose, Sequelize</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- ORBIT 3 (OUTER) -->
            <div class="orbit-track track-3">
              <!-- Planet 6: TOOLS -->
              <div class="planet-anchor anchor-tools">
                <div class="planet-body planet-tools">
                  <div class="planet-orb">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                    </svg>
                  </div>
                  <span class="planet-name">TOOLS</span>
                  <div class="planet-tooltip">
                    <div class="tooltip-cat">PLANET 6 — TOOLS</div>
                    <div class="tooltip-techs">Git, GitHub, Postman, Docker</div>
                  </div>
                </div>
              </div>

              <!-- Planet 4: REST APIs -->
              <div class="planet-anchor anchor-restapi">
                <div class="planet-body planet-restapi">
                  <div class="planet-orb">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="2" width="6" height="6" rx="1"></rect>
                      <rect x="16" y="2" width="6" height="6" rx="1"></rect>
                      <rect x="9" y="16" width="6" height="6" rx="1"></rect>
                      <path d="M5 8v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8"></path>
                      <line x1="12" y1="13" x2="12" y2="16"></line>
                    </svg>
                  </div>
                  <span class="planet-name">REST APIs</span>
                  <div class="planet-tooltip">
                    <div class="tooltip-cat">PLANET 4 — REST APIs</div>
                    <div class="tooltip-techs">CRUD, Authentication, Authorization</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- MOBILE PLANETS GRID -->
          <div class="mobile-planets-grid">
            <div class="mobile-planet-chip">
              <div class="mobile-chip-orb" style="background:rgba(0,243,255,0.18); color:#00f3ff;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              </div>
              <div class="mobile-chip-text">
                <span class="mobile-chip-name">FRONTEND</span>
                <span class="mobile-chip-techs">HTML, CSS, JS, React</span>
              </div>
            </div>
            <div class="mobile-planet-chip">
              <div class="mobile-chip-orb" style="background:rgba(16,185,129,0.18); color:#34d399;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
              </div>
              <div class="mobile-chip-text">
                <span class="mobile-chip-name">BACKEND</span>
                <span class="mobile-chip-techs">Node.js, Express, TS</span>
              </div>
            </div>
            <div class="mobile-planet-chip">
              <div class="mobile-chip-orb" style="background:rgba(245,158,11,0.18); color:#fbbf24;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
              </div>
              <div class="mobile-chip-text">
                <span class="mobile-chip-name">DATABASE</span>
                <span class="mobile-chip-techs">MongoDB, MySQL, ORMs</span>
              </div>
            </div>
            <div class="mobile-planet-chip">
              <div class="mobile-chip-orb" style="background:rgba(56,189,248,0.18); color:#38bdf8;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="6" height="6" rx="1"></rect><rect x="16" y="2" width="6" height="6" rx="1"></rect><rect x="9" y="16" width="6" height="6" rx="1"></rect><path d="M5 8v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8"></path><line x1="12" y1="13" x2="12" y2="16"></line></svg>
              </div>
              <div class="mobile-chip-text">
                <span class="mobile-chip-name">REST APIs</span>
                <span class="mobile-chip-techs">CRUD, Auth, JWT</span>
              </div>
            </div>
            <div class="mobile-planet-chip">
              <div class="mobile-chip-orb" style="background:rgba(192,132,252,0.18); color:#c084fc;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19.439 7.85c0-1.571-.944-2.85-2.112-2.85s-2.112 1.279-2.112 2.85V9H10.78v-1.15c0-1.571-.945-2.85-2.112-2.85S6.557 6.279 6.557 7.85V9H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-2.561v-1.15z"></path></svg>
              </div>
              <div class="mobile-chip-text">
                <span class="mobile-chip-name">INTEGRATIONS</span>
                <span class="mobile-chip-techs">APIs, Webhooks, Payments</span>
              </div>
            </div>
            <div class="mobile-planet-chip">
              <div class="mobile-chip-orb" style="background:rgba(233,30,99,0.18); color:#ff4081;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
              </div>
              <div class="mobile-chip-text">
                <span class="mobile-chip-name">TOOLS</span>
                <span class="mobile-chip-techs">Git, GitHub, Docker, Postman</span>
              </div>
            </div>
          </div>

          <!-- ROLE BANNER -->
          <div class="hero-role-banner">
            <div class="role-main-title">
              <span class="role-dot"></span>
              FULL-STACK DEVELOPER
              <span class="role-dot"></span>
            </div>
            <p class="role-support-text">
              Frontend <span>•</span> Backend <span>•</span> APIs <span>•</span> Databases <span>•</span> Integrations
            </p>
          </div>

          <!-- CTA BLOCK -->
          <div class="hero-cta-block">
            <p class="hero-intro-text">
              I build websites, web applications, REST APIs, and backend systems for businesses and startups.
            </p>
            <div class="hero-buttons-row">
              <a href="#Contact" class="hero-btn-primary">
                <i class="fa-solid fa-paper-plane"></i>
                START A PROJECT
              </a>
              <a href="#Projects" class="hero-btn-secondary">
                <i class="fa-solid fa-folder-open"></i>
                EXPLORE MY WORK
              </a>
            </div>
            <div class="hero-socials-row">
              <a href="https://github.com/MohamedAbusayath" target="_blank" rel="noopener noreferrer" class="hero-social-pill social-github">
                <i class="fa-brands fa-github"></i> GitHub
              </a>
              <a href="https://www.linkedin.com/in/mohamed-abusayath-s-3028602a0/" target="_blank" rel="noopener noreferrer" class="hero-social-pill social-linkedin">
                <i class="fa-brands fa-linkedin"></i> LinkedIn
              </a>
              <a href="https://www.fiverr.com/md_abusayath" target="_blank" rel="noopener noreferrer" class="hero-social-pill social-fiverr">
                <i class="fa-solid fa-bolt"></i> Fiverr (Verified)
              </a>
              <a href="mailto:mohamedabusayaths@gmail.com" class="hero-social-pill social-email">
                <i class="fa-solid fa-envelope"></i> Email Me
              </a>
            </div>
          </div>
        </section>
      </body>
      </html>
    `);

    await page.waitForTimeout(1000);
    const hero = await page.$('.hero-section-frame');
    await hero.screenshot({ path: 'scratch/solar_full_prototype.png' });
    console.log('Saved prototype screenshot: scratch/solar_full_prototype.png');

    await browser.close();
  } finally {
    server.close();
    process.exit(0);
  }
});
