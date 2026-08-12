// ==========================================
// UI
// ==========================================


// ==========================================
// BUTTON ANIMATION
// ==========================================

function addButtonAnimation(button) {

  if (!button) {
    return;
  }

  button.addEventListener('click', () => {

    button.classList.remove('button-click');

    // Force the animation to restart
    void button.offsetWidth;

    button.classList.add('button-click');

  });

}


// ==========================================
// INITIALISE UI
// ==========================================

export function initialiseUI() {

  const buttons =
    document.querySelectorAll('button');


  buttons.forEach(button => {

    addButtonAnimation(button);

  });

}

// ==========================================
// MODE POPUP
// ==========================================

const modesButton =
  document.getElementById('modesBtn');

const modeOverlay =
  document.getElementById('modeOverlay');

const closeModePopup =
  document.getElementById('closeModePopup');

const modeOptions =
  document.querySelectorAll('.mode-option');


// ==========================================
// OPEN
// ==========================================

if (modesButton) {

  modesButton.addEventListener(
    'click',
    () => {

      modeOverlay.classList.add('active');

    }
  );

}


// ==========================================
// CLOSE
// ==========================================

if (closeModePopup) {

  closeModePopup.addEventListener(
    'click',
    () => {

      modeOverlay.classList.remove('active');

    }
  );

}


// ==========================================
// CLICK OUTSIDE
// ==========================================

if (modeOverlay) {

  modeOverlay.addEventListener(
    'click',
    event => {

      if (event.target === modeOverlay) {

        modeOverlay.classList.remove('active');

      }

    }
  );

}


// ==========================================
// MODE SELECTION
// ==========================================

modeOptions.forEach(option => {

  option.addEventListener(
    'click',
    () => {

      const selectedMode =
        option.dataset.mode;


      // Remove previous selection

      modeOptions.forEach(item => {

        item.classList.remove('selected');

      });


      // Select this mode

      option.classList.add('selected');


      // Tell main.js about the selection

      window.dispatchEvent(
        new CustomEvent(
          'modeSelected',
          {
            detail: {
              mode: selectedMode
            }
          }
        )
      );


      // Close popup

      modeOverlay.classList.remove('active');

    }
  );

});


// ==========================================
// MARK CURRENT MODE
// ==========================================

export function setSelectedMode(mode) {

  modeOptions.forEach(option => {

    option.classList.toggle(
      'selected',
      option.dataset.mode === mode
    );

  });

}