// ==========================================
// PHYSICS.JS
// ==========================================

import { ball } from './ball.js';


// ==========================================
// GRAVITY
// ==========================================

export let gravityX = 0;
export let gravityY = 0;

const gravityStrength = 0.5;


// ==========================================
// BOUNCE SOUND
// ==========================================

const bounceSound =
  new Audio('sounds/bounce.ogg');

bounceSound.preload = 'auto';


function playBounceSound() {

  bounceSound.currentTime = 0;

  bounceSound.play().catch(() => {});

}


// ==========================================
// GRAVITY UPDATE
// ==========================================

function updateGravityValues(x, y, angle) {

  let screenX;
  let screenY;


  switch (angle) {

    case 0:

      screenX = -x;
      screenY = y;

      break;


    case 90:

      screenX = -y;
      screenY = -x;

      break;


    case 180:

      screenX = x;
      screenY = -y;

      break;


    case 270:

      screenX = y;
      screenY = x;

      break;


    default: {

      const radians =
        angle * Math.PI / 180;


      screenX =
        -x * Math.cos(radians) +
        y * Math.sin(radians);


      screenY =
        -x * Math.sin(radians) -
        y * Math.cos(radians);

      break;

    }

  }


  const scale =
    gravityStrength / 9.8;


  gravityX =
    screenX * scale;

  gravityY =
    screenY * scale;

}


// ==========================================
// WORLD
// ==========================================

let originalWidth = 0;
let originalHeight = 0;

let worldScale = 1;


// ==========================================
// SHRINK SETTINGS
// ==========================================

// Amount the world shrinks AFTER a collision.
// 0.997 = 0.3% smaller per collision.

const shrinkFactor = 0.997;


// World will never mathematically reach zero.

const minimumScale = 0.01;


// ==========================================
// INITIALISE WORLD
// ==========================================

export function initialiseWorld(canvas) {

  originalWidth =
    canvas.width;

  originalHeight =
    canvas.height;

  worldScale = 1;

}


// ==========================================
// RESET WORLD
// ==========================================

export function resetWorld(canvas) {

  worldScale = 1;


  canvas.width =
    originalWidth;

  canvas.height =
    originalHeight;

}


// ==========================================
// NORMAL MODE
// ==========================================

export function updateNormalPhysics(canvas) {

  // ========================================
  // GRAVITY
  // ========================================

  ball.dx += gravityX;
  ball.dy += gravityY;


  // ========================================
  // MOVEMENT
  // ========================================

  ball.x += ball.dx;
  ball.y += ball.dy;


  // ========================================
  // BOTTOM
  // ========================================

  if (
    ball.y + ball.radius >=
    canvas.height
  ) {

    ball.y =
      canvas.height - ball.radius;


    ball.dy =
      -Math.abs(ball.dy) *
      ball.bounceFactor;


    playBounceSound();

  }


  // ========================================
  // TOP
  // ========================================

  if (
    ball.y - ball.radius <= 0
  ) {

    ball.y =
      ball.radius;


    ball.dy =
      Math.abs(ball.dy) *
      ball.bounceFactor;


    playBounceSound();

  }


  // ========================================
  // RIGHT
  // ========================================

  if (
    ball.x + ball.radius >=
    canvas.width
  ) {

    ball.x =
      canvas.width - ball.radius;


    ball.dx =
      -Math.abs(ball.dx) *
      ball.bounceFactor;


    playBounceSound();

  }


  // ========================================
  // LEFT
  // ========================================

  if (
    ball.x - ball.radius <= 0
  ) {

    ball.x =
      ball.radius;


    ball.dx =
      Math.abs(ball.dx) *
      ball.bounceFactor;


    playBounceSound();

  }

}


// ==========================================
// SHRINKING WORLD
// ==========================================

export function updateShrinkingWorld(canvas) {

  // ========================================
  // GRAVITY
  // ========================================

  ball.dx += gravityX;
  ball.dy += gravityY;


  // ========================================
  // MOVE BALL
  // ========================================

  ball.x += ball.dx;
  ball.y += ball.dy;


  // ========================================
  // CURRENT WORLD SIZE
  // ========================================

  const worldWidth =
    originalWidth * worldScale;


  const worldHeight =
    originalHeight * worldScale;


  // ========================================
  // COLLISION
  // ========================================

  let collided = false;


  // ========================================
  // BOTTOM
  // ========================================

  if (
    ball.y + ball.radius >=
    worldHeight
  ) {

    ball.y =
      worldHeight - ball.radius;


    ball.dy =
      -Math.abs(ball.dy) *
      ball.bounceFactor;


    playBounceSound();


    collided = true;

  }


  // ========================================
  // TOP
  // ========================================

  if (
    ball.y - ball.radius <= 0
  ) {

    ball.y =
      ball.radius;


    ball.dy =
      Math.abs(ball.dy) *
      ball.bounceFactor;


    playBounceSound();


    collided = true;

  }


  // ========================================
  // RIGHT
  // ========================================

  if (
    ball.x + ball.radius >=
    worldWidth
  ) {

    ball.x =
      worldWidth - ball.radius;


    ball.dx =
      -Math.abs(ball.dx) *
      ball.bounceFactor;


    playBounceSound();


    collided = true;

  }


  // ========================================
  // LEFT
  // ========================================

  if (
    ball.x - ball.radius <= 0
  ) {

    ball.x =
      ball.radius;


    ball.dx =
      Math.abs(ball.dx) *
      ball.bounceFactor;


    playBounceSound();


    collided = true;

  }


  // ========================================
  // SHRINK ONLY ON COLLISION
  // ========================================

  if (collided) {

    const oldScale =
      worldScale;


    // --------------------------------------
    // SHRINK WORLD ONCE
    // --------------------------------------

    worldScale *=
      shrinkFactor;


    worldScale =
      Math.max(
        minimumScale,
        worldScale
      );


    // --------------------------------------
    // SCALE RATIO
    // --------------------------------------

    const scaleRatio =
      worldScale / oldScale;


    // --------------------------------------
    // SCALE BALL POSITION
    // --------------------------------------

    ball.x *=
      scaleRatio;

    ball.y *=
      scaleRatio;


    // --------------------------------------
    // SCALE BALL SIZE
    // --------------------------------------

    ball.radius *=
      scaleRatio;


    // --------------------------------------
    // UPDATE CANVAS
    // --------------------------------------

    canvas.width =
      Math.max(
        1,
        Math.round(
          originalWidth *
          worldScale
        )
      );


    canvas.height =
      Math.max(
        1,
        Math.round(
          originalHeight *
          worldScale
        )
      );


    // --------------------------------------
    // KEEP BALL INSIDE NEW WORLD
    // --------------------------------------

    ball.x =
      Math.max(
        ball.radius,
        Math.min(
          canvas.width - ball.radius,
          ball.x
        )
      );


    ball.y =
      Math.max(
        ball.radius,
        Math.min(
          canvas.height - ball.radius,
          ball.y
        )
      );

  }

}


// ==========================================
// GRAVITY EXPORTS
// ==========================================
//
// motion.js currently uses three slightly
// different names:
//
// updateGravityValues()
// updateGravity()
// updateGravityValue()
//
// They all point to the SAME function so
// the existing motion.js keeps working.
//

export {
  updateGravityValues,
  updateGravityValues as updateGravity,
  updateGravityValues as updateGravityValue
};