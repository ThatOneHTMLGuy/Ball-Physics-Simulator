// ==========================================
// SETTINGS
// ==========================================

import {
  setBallSize
} from './ball.js';


// ==========================================
// INITIALISE SETTINGS
// ==========================================

export function initialiseSettings({

  settingsBtn,

  settingsOverlay,

  closeSettingsBtn,

  lightModeBtn,

  darkModeBtn,

  ballSizeSlider,

  ballSizeValue

}) {


  // ========================================
  // OPEN SETTINGS
  // ========================================

  settingsBtn.onclick = function () {

    settingsOverlay.classList.add(
      'active'
    );

  };


  // ========================================
  // CLOSE SETTINGS
  // ========================================

  closeSettingsBtn.onclick = function () {

    settingsOverlay.classList.remove(
      'active'
    );

  };


  // ========================================
  // CLICK OUTSIDE TO CLOSE
  // ========================================

  settingsOverlay.addEventListener(
    'click',
    function (event) {

      if (
        event.target ===
        settingsOverlay
      ) {

        settingsOverlay.classList.remove(
          'active'
        );

      }

    }
  );


  // ========================================
  // UPDATE THEME BUTTONS
  // ========================================

  function updateThemeButtons() {

    if (
      document.body.classList.contains(
        'dark-mode'
      )
    ) {

      darkModeBtn.classList.add(
        'selected'
      );

      lightModeBtn.classList.remove(
        'selected'
      );

    } else {

      lightModeBtn.classList.add(
        'selected'
      );

      darkModeBtn.classList.remove(
        'selected'
      );

    }

  }


  // ========================================
  // LIGHT MODE
  // ========================================

  lightModeBtn.onclick = function () {

    document.body.classList.remove(
      'dark-mode'
    );

    localStorage.setItem(
      'theme',
      'light'
    );

    updateThemeButtons();

  };


  // ========================================
  // DARK MODE
  // ========================================

  darkModeBtn.onclick = function () {

    document.body.classList.add(
      'dark-mode'
    );

    localStorage.setItem(
      'theme',
      'dark'
    );

    updateThemeButtons();

  };


  // ========================================
  // LOAD SAVED THEME
  // ========================================

  const savedTheme =
    localStorage.getItem(
      'theme'
    );


  if (
    savedTheme === 'dark'
  ) {

    document.body.classList.add(
      'dark-mode'
    );

  } else {

    document.body.classList.remove(
      'dark-mode'
    );

  }


  updateThemeButtons();


  // ========================================
  // BALL SIZE SLIDER
  // ========================================

  ballSizeSlider.oninput =
    function () {

      const newRadius =
        Number(
          ballSizeSlider.value
        );


      setBallSize(
        newRadius
      );


      ballSizeValue.textContent =
        `${newRadius} px`;

    };


  // ========================================
  // INITIAL BALL SIZE
  // ========================================

  const initialRadius =
    Number(
      ballSizeSlider.value
    );


  setBallSize(
    initialRadius
  );


  ballSizeValue.textContent =
    `${initialRadius} px`;

}