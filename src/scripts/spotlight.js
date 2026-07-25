// src/scripts/spotlight.js

document.addEventListener('DOMContentLoaded', () => {
  const interactiveBg = document.querySelector('.bg-grid-interactive');
  if (!interactiveBg) return;

  // Track mouse coordinates in CSS variables for spotlight rendering
  window.addEventListener('mousemove', (e) => {
    interactiveBg.style.setProperty('--mouse-x', `${e.clientX}px`);
    interactiveBg.style.setProperty('--mouse-y', `${e.clientY}px`);
  });
});
