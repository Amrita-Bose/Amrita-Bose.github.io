// src/scripts/logo-decrypt.js

document.addEventListener('DOMContentLoaded', () => {
  function initLogoDecrypt() {
    const logo = document.querySelector('[data-logo-decrypt]');
    if (!logo) return;

    const targetText = "AB.";
    const matrixChars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*?/+-=";
    let isAnimating = false;

    function runDecrypt() {
      if (isAnimating) return;
      isAnimating = true;

      let frame = 0;
      const totalFrames = 10;
      const intervalMs = 30; // ~300ms total animation length

      const timer = setInterval(() => {
        let result = "";

        for (let i = 0; i < targetText.length; i++) {
          // Progressively lock target characters from left to right
          // Char 0 locks at frame >= 3, Char 1 locks at frame >= 6, Char 2 locks at frame >= 9
          const lockFrame = (i + 1) * 3;

          if (frame >= lockFrame) {
            result += targetText[i];
          } else {
            // Pick a random matrix styling character
            result += matrixChars[Math.floor(Math.random() * matrixChars.length)];
          }
        }

        logo.textContent = result;
        frame++;

        if (frame > totalFrames) {
          clearInterval(timer);
          logo.textContent = targetText; // Hard reset to target
          isAnimating = false;
        }
      }, intervalMs);
    }

    // Hover listener
    logo.addEventListener('mouseenter', runDecrypt);

    // Initial page load trigger (with a slight entrance delay)
    setTimeout(runDecrypt, 600);
  }

  // Bind initial execution
  initLogoDecrypt();

  // Support Astro router page transitions
  document.addEventListener('astro:page-load', initLogoDecrypt);
});
