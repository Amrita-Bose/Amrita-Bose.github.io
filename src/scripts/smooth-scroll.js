// src/scripts/smooth-scroll.js

document.addEventListener('DOMContentLoaded', () => {
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    function easeOutBackSoft(t) {
      const c1 = 0.45; // Soft overshoot factor (smaller = gentler bounce)
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    }

    function smoothScrollTo(targetY, duration = 850) {
      const startY = window.pageYOffset || document.documentElement.scrollTop;
      const difference = targetY - startY;
      const startTime = performance.now();

      function animateScroll(currentTime) {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        const ease = easeOutBackSoft(progress);
        window.scrollTo(0, startY + difference * ease);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          window.scrollTo(0, targetY); // Hard lock at target destination
        }
      }

      requestAnimationFrame(animateScroll);
    }

    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const hash = link.getAttribute('href');
        if (!hash) return;

        let targetY = 0;

        if (hash === '#') {
          targetY = 0;
        } else {
          let target;
          try {
            target = document.querySelector(hash);
          } catch (err) {
            return;
          }
          if (!target) return;

          const startY = window.pageYOffset || document.documentElement.scrollTop;
          const rect = target.getBoundingClientRect();
          const targetOffset = rect.top + startY;

          // Subtract header height offsets for sticky header alignment
          const header = document.querySelector('header');
          const headerHeight = header ? header.offsetHeight : 0;
          targetY = Math.max(0, targetOffset - headerHeight - 16);
        }

        e.preventDefault();
        smoothScrollTo(targetY);

        // Update URL cleanly without triggering default layout jumps
        if (hash !== '#') {
          history.pushState(null, null, hash);
        } else {
          history.pushState(null, null, ' ');
        }
      });
    });
  }

  // Bind initial execution
  initSmoothScroll();

  // Reset scroll position to top on page load/refresh
  if (typeof window !== 'undefined') {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }

  // Support Astro router page transitions
  document.addEventListener('astro:page-load', () => {
    initSmoothScroll();
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  });
});
