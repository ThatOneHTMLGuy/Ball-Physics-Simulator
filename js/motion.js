// ==========================================
// MOTION SENSOR
// ==========================================

import { ball } from './ball.js';

import {
  updateGravityValues
} from './physics.js';


// ==========================================
// MOTION VARIABLES
// ==========================================

let lastAcceleration = {
  x: 0,
  y: 0,
  z: 0
};

let hasInitialAcceleration = false;


// ==========================================
// SHAKE SETTINGS
// ==========================================

const shakeStrength = 0.25;
const shakeThreshold = 1.5;
const maxShakeVelocity = 15;


// ==========================================
// GET SCREEN ORIENTATION
// ==========================================

function getScreenAngle() {

  /*
    screen.orientation.angle is normally:

    Portrait             = 0
    Landscape clockwise  = 90
    Upside-down           = 180
    Landscape other side  = 270

    Some older browsers use window.orientation.
  */

  if (
    screen.orientation &&
    typeof screen.orientation.angle === 'number'
  ) {

    return screen.orientation.angle;

  }


  if (
    typeof window.orientation === 'number'
  ) {

    return window.orientation;

  }


  return 0;

}


// ==========================================
// DEVICE MOTION
// ==========================================

function handleMotion(event) {

  const acceleration =
    event.accelerationIncludingGravity;


  if (!acceleration) {
    return;
  }


  const x =
    acceleration.x || 0;

  const y =
    acceleration.y || 0;

  const z =
    acceleration.z || 0;


  // ========================================
  // CURRENT ORIENTATION
  // ========================================

  const angle =
    getScreenAngle();


  // ========================================
  // FIRST READING
  // ========================================

  if (!hasInitialAcceleration) {

    lastAcceleration.x = x;
    lastAcceleration.y = y;
    lastAcceleration.z = z;

    hasInitialAcceleration = true;


    // Set initial gravity

    updateGravityValues(
      x,
      y,
      angle
    );


    return;

  }


  // ========================================
  // GRAVITY
  // ========================================

  updateGravityValues(
    x,
    y,
    angle
  );


  // ========================================
  // DEVICE MOVEMENT
  // ========================================

  const deltaX =
    x - lastAcceleration.x;

  const deltaY =
    y - lastAcceleration.y;

  const deltaZ =
    z - lastAcceleration.z;


  /*
    Convert the device's movement into
    screen coordinates.

    This keeps directional shaking
    consistent with screen orientation.
  */

  let movementX;
  let movementY;


  switch (angle) {

    // ======================================
    // PORTRAIT
    // ======================================

    case 0:

      movementX =
        -deltaX;

      movementY =
        deltaY;

      break;


    // ======================================
    // LANDSCAPE 90°
    // ======================================

    case 90:

      movementX =
        -deltaY;

      movementY =
        -deltaX;

      break;


    // ======================================
    // UPSIDE-DOWN
    // ======================================

    case 180:

      movementX =
        deltaX;

      movementY =
        -deltaY;

      break;


    // ======================================
    // LANDSCAPE 270°
    // ======================================

    case 270:

      movementX =
        deltaY;

      movementY =
        deltaX;

      break;


    // ======================================
    // OTHER ANGLES
    // ======================================

    default: {

      const radians =
        angle * Math.PI / 180;


      movementX =
        -deltaX * Math.cos(radians) +
        deltaY * Math.sin(radians);


      movementY =
        -deltaX * Math.sin(radians) -
        deltaY * Math.cos(radians);


      break;

    }

  }


  // ========================================
  // SHAKE STRENGTH
  // ========================================

  const movement =
    Math.sqrt(
      deltaX * deltaX +
      deltaY * deltaY +
      deltaZ * deltaZ
    );


  /*
    Ignore tiny sensor noise.
  */

  if (
    movement > shakeThreshold
  ) {

    /*
      Apply the movement directly as
      an impulse to the ball.
    */

    ball.dx +=
      movementX * shakeStrength;


    ball.dy +=
      movementY * shakeStrength;


    /*
      Prevent the ball from becoming
      impossibly fast.
    */

    ball.dx =
      Math.max(
        -maxShakeVelocity,
        Math.min(
          maxShakeVelocity,
          ball.dx
        )
      );


    ball.dy =
      Math.max(
        -maxShakeVelocity,
        Math.min(
          maxShakeVelocity,
          ball.dy
        )
      );

  }


  // ========================================
  // SAVE CURRENT ACCELERATION
  // ========================================

  lastAcceleration.x = x;
  lastAcceleration.y = y;
  lastAcceleration.z = z;

}


// ==========================================
// DEVICE MOTION PERMISSION
// ==========================================

export async function requestMotionPermission() {

  /*
    iOS requires permission to access
    motion sensors.

    Android normally doesn't require this.
  */

  if (
    typeof DeviceMotionEvent !== 'undefined' &&
    typeof DeviceMotionEvent.requestPermission ===
      'function'
  ) {

    try {

      const permission =
        await DeviceMotionEvent.requestPermission();


      if (
        permission === 'granted'
      ) {

        window.addEventListener(
          'devicemotion',
          handleMotion,
          true
        );

      }

    } catch (error) {

      console.error(
        'Motion permission error:',
        error
      );

    }

  } else {

    window.addEventListener(
      'devicemotion',
      handleMotion,
      true
    );

  }

}