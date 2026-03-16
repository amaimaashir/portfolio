// ================================
//  STARFIELD ANIMATION
// ================================
const canvas = document.getElementById("starfield");
const ctx    = canvas.getContext("2d");

let stars  = [];
let width  = window.innerWidth;
let height = window.innerHeight;

// ================================
//  STAR SETTINGS
// ================================
const CONFIG = {
  count:        160,    // number of stars
  minSize:      0.3,    // smallest star size
  maxSize:      2.2,    // largest star size
  speed:        0.4,    // how fast they drift
  twinkleSpeed: 0.012,  // how fast they twinkle
  colors: [
    "rgba(179, 191, 255,",   // lavender  — your primary
    "rgba(221, 123, 223,",   // purple    — your secondary
    "rgba(255, 187, 225,",   // pink      — your third
    "rgba(255, 255, 255,",   // white     — classic stars
    "rgba(255, 245, 138,",   // yellow    — your fourth
  ],
};


// ================================
//  RESIZE CANVAS
// ================================
function resizeCanvas() {
  width          = window.innerWidth;
  height         = window.innerHeight;
  canvas.width   = width;
  canvas.height  = height;
}


// ================================
//  CREATE STARS
// ================================
function createStars() {
  stars = [];

  for (let i = 0; i < CONFIG.count; i++) {
    stars.push({
      x:            Math.random() * width,
      y:            Math.random() * height,
      size:         Math.random() * (CONFIG.maxSize - CONFIG.minSize) + CONFIG.minSize,
      color:        CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)],
      opacity:      Math.random(),
      opacityDelta: (Math.random() * CONFIG.twinkleSpeed) * (Math.random() < 0.5 ? 1 : -1),
      speedX:       (Math.random() - 0.5) * CONFIG.speed,
      speedY:       (Math.random() - 0.5) * CONFIG.speed,
    });
  }
}


// ================================
//  DRAW A SINGLE STAR
// ================================
function drawStar(star) {
  ctx.beginPath();
  ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
  ctx.fillStyle = `${star.color}${star.opacity})`;
  ctx.fill();

  // glow effect for bigger stars
  if (star.size > 1.4) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = `${star.color}${star.opacity * 0.15})`;
    ctx.fill();
  }
}


// ================================
//  UPDATE STAR POSITION
// ================================
function updateStar(star) {
  // move
  star.x += star.speedX;
  star.y += star.speedY;

  // twinkle
  star.opacity += star.opacityDelta;

  if (star.opacity >= 1) {
    star.opacity      = 1;
    star.opacityDelta = -Math.abs(star.opacityDelta);
  } else if (star.opacity <= 0.1) {
    star.opacity      = 0.1;
    star.opacityDelta = Math.abs(star.opacityDelta);
  }

  // wrap around edges
  if (star.x < 0)      star.x = width;
  if (star.x > width)  star.x = 0;
  if (star.y < 0)      star.y = height;
  if (star.y > height) star.y = 0;
}


// ================================
//  SHOOTING STAR
// ================================
let shootingStars = [];

function createShootingStar() {
  if (Math.random() > 0.006) return;

  shootingStars.push({
    x:       Math.random() * width,
    y:       Math.random() * height * 0.5,
    length:  Math.random() * 120 + 60,
    speed:   Math.random() * 8 + 6,
    opacity: 1,
  });
}

function drawShootingStars() {
  shootingStars = shootingStars.filter((s) => s.opacity > 0);

  shootingStars.forEach((s) => {
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.length, s.y - s.length * 0.4);

    const grad = ctx.createLinearGradient(
      s.x, s.y,
      s.x - s.length, s.y - s.length * 0.4
    );
    grad.addColorStop(0, `rgba(179, 191, 255, ${s.opacity})`);
    grad.addColorStop(1, `rgba(179, 191, 255, 0)`);

    ctx.strokeStyle = grad;
    ctx.lineWidth   = 1.5;
    ctx.stroke();

    s.x       -= s.speed;
    s.y       -= s.speed * 0.4;
    s.opacity -= 0.022;
  });
}


// ================================
//  MAIN ANIMATION LOOP
// ================================
function animate() {
  ctx.clearRect(0, 0, width, height);

  createShootingStar();
  drawShootingStars();

  stars.forEach((star) => {
    updateStar(star);
    drawStar(star);
  });

  requestAnimationFrame(animate);
}


// ================================
//  INIT
// ================================
resizeCanvas();
createStars();
animate();

window.addEventListener("resize", () => {
  resizeCanvas();
  createStars();
});