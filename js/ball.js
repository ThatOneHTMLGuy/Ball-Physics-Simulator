// ==========================================
// BALL
// ==========================================

export const ball = {
  radius: 30,

  x: 0,
  y: 0,

  dx: 3,
  dy: 2,

  color: 'orange',

  bounceFactor: 1
};


// ==========================================
// BALL SIZE
// ==========================================

export let originalBallRadius = 30;


// ==========================================
// INITIALISE BALL
// ==========================================

export function initialiseBall(canvas) {

  ball.x = canvas.width / 2;
  ball.y = canvas.height / 4;

  ball.dx = 3;
  ball.dy = 2;

}


// ==========================================
// RESET BALL POSITION
// ==========================================

export function resetBallPosition(canvas) {

  ball.radius = originalBallRadius;

  ball.x = canvas.width / 2;
  ball.y = canvas.height / 4;

  ball.dx = 3;
  ball.dy = 2;

}


// ==========================================
// SET BALL SIZE
// ==========================================

export function setBallSize(size) {

  ball.radius = Number(size);

  originalBallRadius = Number(size);

}


// ==========================================
// DRAW BALL
// ==========================================

export function drawBall(ctx) {
  ctx.imageSmoothingEnabled = false;
  
  ctx.beginPath();

  ctx.arc(
    ball.x,
    ball.y,
    ball.radius,
    0,
    Math.PI * 2
  );

  ctx.fillStyle = ball.color;

  ctx.fill();

  ctx.closePath();

}