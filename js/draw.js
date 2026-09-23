// brush trail on home section
const BRUSH_SIZE = 24;
const SPACING = 8;      
const LIFETIME = 1200; 

const PAD = 96;

let homeContainer;
let brush;
let cnv;
let stamps = []; // { x, y, rot, born }

function setup() {
  homeContainer = document.querySelector('.home-container');

  brush = new Image();
  brush.src = 'images/mouse.svg';

  cnv = createCanvas(homeContainer.clientWidth + PAD * 2, homeContainer.clientHeight + PAD * 2);
  cnv.parent(homeContainer);
  cnv.style('left', -PAD + 'px');
  cnv.style('top', -PAD + 'px');
//   noLoop(); // only animate while there is a trail to fade
}

function inside(x, y) {
  return x >= 0 && x <= width && y >= 0 && y <= height;
}

function mouseMoved() {
  if (!inside(mouseX, mouseY)) return;

  // Add stamps between the last and current mouse position
  const from = inside(pmouseX, pmouseY) ? { x: pmouseX, y: pmouseY } : { x: mouseX, y: mouseY };
  const steps = Math.max(1, Math.floor(dist(from.x, from.y, mouseX, mouseY) / SPACING));
  for (let i = 1; i <= steps; i++) {
    stamps.push({
      x: lerp(from.x, mouseX, i / steps),
      y: lerp(from.y, mouseY, i / steps),
      rot: random(-0.5, 0.5),
      born: millis(),
    });
  }
  loop();
}

function draw() {
  clear();
  const now = millis();
  stamps = stamps.filter((s) => now - s.born < LIFETIME);

  if (brush.complete && brush.naturalWidth) {
    for (const s of stamps) {
      const life = 1 - (now - s.born) / LIFETIME;
      const size = BRUSH_SIZE * (0.6 + 0.4 * life);
      push();
      translate(s.x, s.y);
      rotate(s.rot);
      drawingContext.globalAlpha = life * life;
      drawingContext.drawImage(brush, -size / 2, -size / 2, size, size);
      pop();
    }
    drawingContext.globalAlpha = 1;
  }

  if (stamps.length === 0) noLoop();
}

function windowResized() {
  resizeCanvas(homeContainer.clientWidth + PAD * 2, homeContainer.clientHeight + PAD * 2);
}