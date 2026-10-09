// Mathematical verification of clearance between orbit cards and photo across 360 degrees

function checkClearance(cfg) {
  const { rx, ry, photoW, photoH, cardW, cardH } = cfg;
  const photoHalfW = photoW / 2;
  const photoHalfH = photoH / 2;
  const cardHalfW = cardW / 2;
  const cardHalfH = cardH / 2;

  let minDistance = Infinity;
  let collisions = 0;

  for (let deg = 0; deg < 360; deg += 2) {
    const rad = (deg * Math.PI) / 180;
    // In CSS Motion path ellipse(rx ry at center):
    // 0% is at right (cos=1, sin=0), progressing clockwise:
    // x = rx * cos(rad), y = ry * sin(rad)
    const cx = rx * Math.cos(rad);
    const cy = ry * Math.sin(rad);

    const cardL = cx - cardHalfW;
    const cardR = cx + cardHalfW;
    const cardT = cy - cardHalfH;
    const cardB = cy + cardHalfH;

    const photoL = -photoHalfW;
    const photoR = photoHalfW;
    const photoT = -photoHalfH;
    const photoB = photoHalfH;

    // Overlap condition
    const overlapX = cardR > photoL && cardL < photoR;
    const overlapY = cardB > photoT && cardT < photoB;

    if (overlapX && overlapY) {
      collisions++;
    }

    // Distance between AABB boxes
    const dx = Math.max(0, Math.max(photoL - cardR, cardL - photoR));
    const dy = Math.max(0, Math.max(photoT - cardB, cardT - photoB));
    const dist = Math.hypot(dx, dy);
    if (!overlapX || !overlapY) {
      minDistance = Math.min(minDistance, dist);
    }
  }

  return { collisions, minDistance };
}

const desktop1920 = { name: '1920px', rx: 470, ry: 250, photoW: 260, photoH: 310, cardW: 175, cardH: 52 };
const desktop1440 = { name: '1440px', rx: 450, ry: 245, photoW: 250, photoH: 300, cardW: 170, cardH: 50 };
const desktop1024 = { name: '1024px', rx: 370, ry: 220, photoW: 220, photoH: 270, cardW: 155, cardH: 48 };
const tablet768 = { name: '768px', rx: 275, ry: 185, photoW: 180, photoH: 225, cardW: 125, cardH: 42 };

[desktop1920, desktop1440, desktop1024, tablet768].forEach(cfg => {
  const res = checkClearance(cfg);
  console.log(`${cfg.name}: Collisions: ${res.collisions}, Min Clearance: ${res.minDistance.toFixed(1)}px`);
});
