// ==========================================
// MAIN.JS
// ==========================================

import {
  ball,
  drawBall
} from './ball.js';


import {
  initialiseWorld,
  resetWorld,
  updateNormalPhysics,
  updateShrinkingWorld
} from './physics.js';


import {
  requestMotionPermission
} from './motion.js';


import {
  initialiseModes,
  getCurrentMode
} from './modes.js';


import {
  initialiseSettings
} from './settings.js';


import {
  initialiseUI
} from './ui.js';


import {
  initialiseEscapeMode,
  updateEscapeMode,
  drawEscapeBalls,
  resetEscapeMode
} from './escape.js';


// ==========================================
// CANVAS
// ==========================================

const canvas =
  document.getElementById(
    'ballCanvas'
  );


const ctx =
  canvas.getContext(
    '2d'
  );


// ==========================================
// BUTTONS
// ==========================================

const resetBtn =
  document.getElementById(
    'resetBtn'
  );


const modesBtn =
  document.getElementById(
    'modesBtn'
  );


const modeOverlay =
  document.getElementById(
    'modeOverlay'
  );


// ==========================================
// SETTINGS ELEMENTS
// ==========================================

const settingsBtn =
  document.getElementById(
    'settingsBtn'
  );


const settingsPopup =
  document.getElementById(
    'settingsPopup'
  );


const closeSettingsBtn =
  document.getElementById(
    'closeSettingsBtn'
  );


const settingsOverlay =
  document.getElementById(
    'settingsOverlay'
  );


const lightModeBtn =
  document.getElementById(
    'lightModeBtn'
  );


const darkModeBtn =
  document.getElementById(
    'darkModeBtn'
  );


const ballSizeSlider =
  document.getElementById(
    'ballSizeSlider'
  );


const ballSizeValue =
  document.getElementById(
    'ballSizeValue'
  );


// ==========================================
// MODE TRACKING
// ==========================================

let previousMode = -1;


// ==========================================
// NORMAL CANVAS SIZE
// ==========================================

function resizeNormalCanvas() {

  canvas.width =
    window.innerWidth * 0.8;

  canvas.height =
    window.innerHeight * 0.8;


  // Keep normal ball inside canvas

  ball.x =
    Math.max(
      ball.radius,
      Math.min(
        canvas.width -
          ball.radius,
        ball.x
      )
    );


  ball.y =
    Math.max(
      ball.radius,
      Math.min(
        canvas.height -
          ball.radius,
        ball.y
      )
    );

}


// ==========================================
// ESCAPE LOOP CANVAS SIZE
// ==========================================

function resizeEscapeCanvas() {

  const size =
    window.innerWidth * 0.96;

  canvas.width = size;
  canvas.height = size;

}


// ==========================================
// APPLY CURRENT MODE
// ==========================================

function applyMode() {

  const mode =
    getCurrentMode();


  // Nothing changed

  if (
    mode === previousMode
  ) {

    return;

  }


  previousMode =
    mode;


  // ========================================
  // ESCAPE LOOP
  // ========================================

  if (mode === 2) {

    // Make the actual canvas invisible.

    document.body.classList.add(
      'escape-loop'
    );


    // Give Escape Loop a larger canvas.

    resizeEscapeCanvas();


    // Start with exactly one ball.

    initialiseEscapeMode(
      canvas
    );


    return;

  }


  // ========================================
  // NORMAL / SHRINKING WORLD
  // ========================================

  document.body.classList.remove(
    'escape-loop'
  );


  resizeNormalCanvas();


  initialiseWorld(
    canvas
  );

}


// ==========================================
// RESET GAME
// ==========================================

function resetGame() {

  const mode =
    getCurrentMode();


  // ========================================
  // ESCAPE LOOP
  // ========================================

  if (mode === 2) {

    resetEscapeMode(
      canvas
    );

    return;

  }


  // ========================================
  // NORMAL / SHRINKING WORLD
  // ========================================

  resetWorld(
    canvas
  );


  ball.x =
    canvas.width / 2;


  ball.y =
    canvas.height / 4;


  ball.dx = 3;
  ball.dy = 2;

}


// ==========================================
// UPDATE PHYSICS
// ==========================================

function updateGameMode() {

  switch (
    getCurrentMode()
  ) {


    // ======================================
    // NORMAL
    // ======================================

    case 0:

      updateNormalPhysics(
        canvas
      );

      break;


    // ======================================
    // SHRINKING WORLD
    // ======================================

    case 1:

      updateShrinkingWorld(
        canvas
      );

      break;


    // ======================================
    // ESCAPE LOOP
    // ======================================

    case 2:

      updateEscapeMode(
        canvas
      );

      break;

  }

}


// ==========================================
// DRAW GAME
// ==========================================

function drawGame() {

  const mode =
    getCurrentMode();


  // ========================================
  // ESCAPE LOOP
  // ========================================

  if (mode === 2) {

    drawEscapeBalls(
      ctx,
      canvas
    );

    return;

  }


  // ========================================
  // NORMAL / SHRINKING WORLD
  // ========================================

  drawBall(
    ctx
  );

}


// ==========================================
// GAME LOOP
// ==========================================

function gameLoop() {

  // Detect mode changes

  applyMode();


  // Clear canvas

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  // Update physics

  updateGameMode();


  // Draw

  drawGame();


  requestAnimationFrame(
    gameLoop
  );

}


// ==========================================
// RESET BUTTON
// ==========================================

resetBtn.onclick =
  function () {

    resetGame();

  };


// ==========================================
// RESIZE
// ==========================================

window.addEventListener(
  'resize',
  () => {

    if (
      getCurrentMode() === 2
    ) {

      resizeEscapeCanvas();

    }

    else {

      resizeNormalCanvas();

    }

  }
);


// ==========================================
// INITIALISE CANVAS
// ==========================================

resizeNormalCanvas();


initialiseWorld(
  canvas
);


// ==========================================
// INITIALISE MODES
// ==========================================

initialiseModes({

  modesBtn,

  modeOverlay,

  resetGame

});


// ==========================================
// INITIALISE SETTINGS
// ==========================================

initialiseSettings({

  settingsBtn,

  settingsPopup,

  settingsOverlay,

  closeSettingsBtn,

  lightModeBtn,

  darkModeBtn,

  ballSizeSlider,

  ballSizeValue

});


// ==========================================
// INITIALISE UI
// ==========================================

initialiseUI();


// ==========================================
// START MOTION SENSOR
// ==========================================

requestMotionPermission();


// ==========================================
// START GAME
// ==========================================

gameLoop();