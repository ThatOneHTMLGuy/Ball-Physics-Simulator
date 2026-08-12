// ==========================================
// MODES.JS
// ==========================================


// ==========================================
// CURRENT MODE
// ==========================================

let currentMode = 0;


// ==========================================
// GAME MODES
// ==========================================

const gameModes = [
  'Normal',
  'Shrinking World',
  'Escape Loop'
];


// ==========================================
// GET CURRENT MODE
// ==========================================

export function getCurrentMode() {

  return currentMode;

}


// ==========================================
// GET MODE NAME
// ==========================================

export function getCurrentModeName() {

  return gameModes[currentMode];

}


// ==========================================
// INITIALISE MODES
// ==========================================

export function initialiseModes({
  modesBtn,
  modeOverlay,
  resetGame
}) {


  // ========================================
  // INITIAL BUTTON TEXT
  // ========================================

  modesBtn.textContent =
    `Mode: ${gameModes[currentMode]}`;


  // ========================================
  // MODE OPTIONS
  // ========================================

  const modeOptions =
    document.querySelectorAll(
      '.mode-option'
    );


  // ========================================
  // OPEN POPUP
  // ========================================

  modesBtn.addEventListener(
    'click',
    () => {

      modeOverlay.classList.add(
        'active'
      );

    }
  );


  // ========================================
  // SELECT MODE
  // ========================================

  modeOptions.forEach(option => {

    option.addEventListener(
      'click',
      () => {

        const selectedMode =
          option.dataset.mode;


        // ------------------------------------
        // CONVERT MODE NAME TO NUMBER
        // ------------------------------------

        let newMode;


        switch (selectedMode) {

          case 'normal':

            newMode = 0;

            break;


          case 'shrinking':

            newMode = 1;

            break;


          case 'escape':

            newMode = 2;

            break;


          default:

            return;

        }


        // ------------------------------------
        // ALREADY SELECTED
        // ------------------------------------

        if (
          newMode === currentMode
        ) {

          modeOverlay.classList.remove(
            'active'
          );

          return;

        }


        // ------------------------------------
        // CHANGE MODE
        // ------------------------------------

        currentMode =
          newMode;


        // ------------------------------------
        // UPDATE BUTTON
        // ------------------------------------

        modesBtn.textContent =
          `Mode: ${gameModes[currentMode]}`;


        // ------------------------------------
        // UPDATE SELECTION
        // ------------------------------------

        modeOptions.forEach(item => {

          item.classList.toggle(
            'selected',
            item.dataset.mode ===
              selectedMode
          );

        });


        // ------------------------------------
        // RESET SIMULATION
        // ------------------------------------

        resetGame();


        // ------------------------------------
        // CLOSE POPUP
        // ------------------------------------

        modeOverlay.classList.remove(
          'active'
        );

      }
    );

  });


  // ========================================
  // CLOSE BUTTON
  // ========================================

  const closeModePopup =
    document.getElementById(
      'closeModePopup'
    );


  if (closeModePopup) {

    closeModePopup.addEventListener(
      'click',
      () => {

        modeOverlay.classList.remove(
          'active'
        );

      }
    );

  }


  // ========================================
  // CLICK OUTSIDE
  // ========================================

  modeOverlay.addEventListener(
    'click',
    event => {

      if (
        event.target === modeOverlay
      ) {

        modeOverlay.classList.remove(
          'active'
        );

      }

    }
  );


  // ========================================
  // INITIAL SELECTION
  // ========================================

  modeOptions.forEach(option => {

    option.classList.toggle(
      'selected',
      option.dataset.mode === 'normal'
    );

  });

}