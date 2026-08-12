// ==========================================
// ESCAPE.JS
// ==========================================

import {
  gravityX,
  gravityY
} from './physics.js';


// ==========================================
// SETTINGS
// ==========================================

const ESCAPE_BALL_RADIUS = 10;

const BORDER_WIDTH = 4;


// ==========================================
// BALL COLOURS
// ==========================================

const BALL_COLORS = [
  'orange',
  'red',
  'blue',
  'lime',
  'purple',
  'cyan',
  'yellow',
  'pink'
];


// ==========================================
// OPENING SETTINGS
// ==========================================

const openingAngle =
  34 * Math.PI / 180;


// Slightly to the right of bottom centre.

const openingOffset =
  12 * Math.PI / 180;


// ==========================================
// CIRCLE ROTATION
// ==========================================

let circleRotation = 0;

const CIRCLE_ROTATION_SPEED = 0.01;



// ==========================================
// SOUND
// ==========================================

const bounceSound =
  new Audio('sounds/bounce.ogg');

bounceSound.preload = 'auto';


function playBounceSound() {

  bounceSound.currentTime = 0;

  bounceSound
    .play()
    .catch(() => {});

}


// ==========================================
// BALL STORAGE
// ==========================================

let escapeBalls = [];


// ==========================================
// CIRCLE RADIUS
// ==========================================

function getCircleRadius(canvas) {

  return (
    canvas.width / 2
  ) -
  (BORDER_WIDTH / 2) -
  2;

}


// ==========================================
// GET NEXT BALL COLOUR
// ==========================================

function getRandomBallColor() {
  return BALL_COLORS[
    Math.floor(
      Math.random() * BALL_COLORS.length
    )
  ];
}


// ==========================================
// INITIALISE ESCAPE MODE
// ==========================================

export function initialiseEscapeMode(canvas) {

  escapeBalls = [];

  circleRotation = 0;


  const centerX =
    canvas.width / 2;

  const centerY =
    canvas.height / 2;


  // ========================================
  // ORIGINAL BALL
  // ========================================

  escapeBalls.push({

    x:
      centerX,

    y:
      centerY - 80,

    dx:
      3,

    dy:
      2,

    radius:
      ESCAPE_BALL_RADIUS,

    bounceFactor:
      1,

    color:
      BALL_COLORS[0]

  });

}


// ==========================================
// NORMALISE ANGLE
// ==========================================

function normaliseAngle(angle) {

  while (
    angle > Math.PI
  ) {

    angle -=
      Math.PI * 2;

  }


  while (
    angle < -Math.PI
  ) {

    angle +=
      Math.PI * 2;

  }


  return angle;

}


// ==========================================
// GET ROTATING OPENING ANGLE
// ==========================================

function getOpeningAngle() {

  return (
    Math.PI / 2 +
    openingOffset +
    circleRotation
  );

}


// ==========================================
// CHECK OPENING
// ==========================================

function isOpening(angle) {

  const currentOpeningAngle =
    getOpeningAngle();


  const difference =
    normaliseAngle(
      angle -
      currentOpeningAngle
    );


  return (
    Math.abs(difference) <=
    openingAngle / 2
  );

}


// ==========================================
// UPDATE ESCAPE MODE
// ==========================================

export function updateEscapeMode(canvas) {

  const centerX =
    canvas.width / 2;

  const centerY =
    canvas.height / 2;


  const circleRadius =
    getCircleRadius(canvas);


  // ========================================
  // ROTATE CIRCLE
  // ========================================

  circleRotation +=
    CIRCLE_ROTATION_SPEED;


  if (
    circleRotation >=
    Math.PI * 2
  ) {

    circleRotation -=
      Math.PI * 2;

  }


  // ========================================
  // UPDATE BALLS
  // ========================================

  const survivingBalls = [];

  let escapedCount = 0;


  for (
    const currentBall of escapeBalls
  ) {

    // --------------------------------------
    // GRAVITY
    // --------------------------------------

    currentBall.dx +=
      gravityX;

    currentBall.dy +=
      gravityY;


    // --------------------------------------
    // NEXT POSITION
    // --------------------------------------

    const nextX =
      currentBall.x +
      currentBall.dx;

    const nextY =
      currentBall.y +
      currentBall.dy;


    const dx =
      nextX -
      centerX;

    const dy =
      nextY -
      centerY;


    const distance =
      Math.sqrt(
        dx * dx +
        dy * dy
      );


    // ======================================
    // COMPLETELY OUTSIDE CIRCLE
    // ======================================

    if (
      distance >
      circleRadius +
      currentBall.radius
    ) {

      escapedCount++;

      continue;

    }


    // ======================================
    // BORDER
    // ======================================

    if (
      distance +
      currentBall.radius >=
      circleRadius
    ) {

      const angle =
        Math.atan2(
          dy,
          dx
        );


      // ====================================
      // OPENING
      // ====================================

      if (
        isOpening(angle)
      ) {

        currentBall.x =
          nextX;

        currentBall.y =
          nextY;


        const outsideDX =
          currentBall.x -
          centerX;

        const outsideDY =
          currentBall.y -
          centerY;


        const outsideDistance =
          Math.sqrt(
            outsideDX * outsideDX +
            outsideDY * outsideDY
          );


        // Ball escaped completely.

        if (
          outsideDistance >
          circleRadius +
          currentBall.radius
        ) {

          escapedCount++;

          continue;

        }


        survivingBalls.push(
          currentBall
        );

        continue;

      }


      // ====================================
      // NORMAL BORDER COLLISION
      // ====================================

      if (
        distance > 0
      ) {

        const nx =
          dx / distance;

        const ny =
          dy / distance;


        // Keep ball inside circle.

        currentBall.x =
          centerX +
          nx *
          (
            circleRadius -
            currentBall.radius
          );


        currentBall.y =
          centerY +
          ny *
          (
            circleRadius -
            currentBall.radius
          );


        // ----------------------------------
        // REFLECT VELOCITY
        // ----------------------------------

        const velocityDotNormal =
          currentBall.dx * nx +
          currentBall.dy * ny;


        if (
          velocityDotNormal > 0
        ) {

          currentBall.dx -=
            2 *
            velocityDotNormal *
            nx;


          currentBall.dy -=
            2 *
            velocityDotNormal *
            ny;


          currentBall.dx *=
            currentBall.bounceFactor;


          currentBall.dy *=
            currentBall.bounceFactor;


          playBounceSound();

        }

      }


      survivingBalls.push(
        currentBall
      );

      continue;

    }


    // ======================================
    // NORMAL MOVEMENT
    // ======================================

    currentBall.x =
      nextX;

    currentBall.y =
      nextY;


    survivingBalls.push(
      currentBall
    );

  }


  // ========================================
  // BALL-TO-BALL COLLISIONS
  // ========================================

  for (
    let i = 0;
    i < survivingBalls.length;
    i++
  ) {

    for (
      let j = i + 1;
      j < survivingBalls.length;
      j++
    ) {

      const a =
        survivingBalls[i];

      const b =
        survivingBalls[j];


      const dx =
        b.x - a.x;

      const dy =
        b.y - a.y;


      const distance =
        Math.sqrt(
          dx * dx +
          dy * dy
        );


      const minimumDistance =
        a.radius +
        b.radius;


      // No collision.

      if (
        distance >=
        minimumDistance
      ) {

        continue;

      }


      // Prevent division by zero.

      if (
        distance === 0
      ) {

        b.x += 0.01;

        continue;

      }


      // ====================================
      // COLLISION NORMAL
      // ====================================

      const nx =
        dx / distance;

      const ny =
        dy / distance;


      // ====================================
      // SEPARATE BALLS
      // ====================================

      const overlap =
        minimumDistance -
        distance;


      a.x -=
        nx *
        overlap /
        2;

      a.y -=
        ny *
        overlap /
        2;


      b.x +=
        nx *
        overlap /
        2;

      b.y +=
        ny *
        overlap /
        2;


      // ====================================
      // RELATIVE VELOCITY
      // ====================================

      const relativeVelocityX =
        b.dx -
        a.dx;

      const relativeVelocityY =
        b.dy -
        a.dy;


      const velocityAlongNormal =
        relativeVelocityX * nx +
        relativeVelocityY * ny;


      // Already moving apart.

      if (
        velocityAlongNormal >= 0
      ) {

        continue;

      }


      // ====================================
      // ELASTIC COLLISION
      // ====================================

      const impulse =
        -velocityAlongNormal;


      a.dx -=
        impulse *
        nx;

      a.dy -=
        impulse *
        ny;


      b.dx +=
        impulse *
        nx;

      b.dy +=
        impulse *
        ny;


      // ====================================
      // SOUND
      // ====================================

      playBounceSound();

    }

  }


  // ========================================
  // SPAWN REPLACEMENT BALLS
  // ========================================

  for (
    let i = 0;
    i < escapedCount;
    i++
  ) {

    const spawnX =
      centerX;

    const spawnY =
      centerY - 75;


    // ======================================
    // FIRST DUPLICATE
    // ======================================

    survivingBalls.push({

      x:
        spawnX,

      y:
        spawnY,

      dx:
        -3,

      dy:
        -1,

      radius:
        ESCAPE_BALL_RADIUS,

      bounceFactor:
        1,

      color: getRandomBallColor()

    });


    // ======================================
    // SECOND DUPLICATE
    // ======================================

    survivingBalls.push({

      x:
        spawnX,

      y:
        spawnY,

      dx:
        3,

      dy:
        -1,

      radius:
        ESCAPE_BALL_RADIUS,

      bounceFactor:
        1,

      color: getRandomBallColor()

    });

  }


  // ========================================
  // SAVE BALLS
  // ========================================

  escapeBalls =
    survivingBalls;

}


// ==========================================
// DRAW ESCAPE MODE
// ==========================================

export function drawEscapeBalls(
  ctx,
  canvas
) {

  const centerX =
    canvas.width / 2;

  const centerY =
    canvas.height / 2;


  const circleRadius =
    getCircleRadius(canvas);


  // ========================================
  // THEME
  // ========================================

  const isLight =
    document.body.classList.contains(
      'light-theme'
    );


  const borderColor =
    isLight
      ? '#000000'
      : '#ffffff';


  ctx.save();


  // ========================================
  // CIRCULAR BORDER
  // ========================================

  ctx.lineWidth =
    BORDER_WIDTH;

  ctx.strokeStyle =
    borderColor;


  const currentOpeningAngle =
    getOpeningAngle();


  const startAngle =
    currentOpeningAngle +
    openingAngle / 2;


  const endAngle =
    currentOpeningAngle -
    openingAngle / 2 +
    Math.PI * 2;


  ctx.beginPath();


  ctx.arc(
    centerX,
    centerY,
    circleRadius,
    startAngle,
    endAngle
  );


  ctx.stroke();


  // ========================================
  // DRAW BALLS
  // ========================================

  for (
    const currentBall of escapeBalls
  ) {

    ctx.beginPath();


    ctx.arc(
      currentBall.x,
      currentBall.y,
      currentBall.radius,
      0,
      Math.PI * 2
    );


    ctx.fillStyle =
      currentBall.color;


    ctx.fill();


    ctx.closePath();

  }


  ctx.restore();

}


// ==========================================
// GET BALL COUNT
// ==========================================

export function getEscapeBallCount() {

  return escapeBalls.length;

}


// ==========================================
// RESET
// ==========================================

export function resetEscapeMode(canvas) {

  circleRotation = 0;

  initialiseEscapeMode(
    canvas
  );

}