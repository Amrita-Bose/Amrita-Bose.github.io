// src/scripts/scrollbar.js

document.addEventListener('DOMContentLoaded', () => {
  function initCustomScrollbar() {
    const track = document.querySelector('[data-custom-scrollbar-track]');
    const thumb = document.querySelector('[data-custom-scrollbar-thumb]');

    if (!track || !thumb) return;

    let isDragging = false;
    let isHovering = false;
    let startY = 0;
    let startScrollTop = 0;
    let fadeTimeout = null;

    function updateScrollbar() {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const trackHeight = track.offsetHeight;

      // Hide custom scrollbar if the page content fits in a single viewport
      if (scrollHeight <= clientHeight) {
        track.classList.add('hidden');
        return;
      } else {
        track.classList.remove('hidden');
      }

      // Calculate dynamic thumb height (proportional to page length, clamped to standard bounds)
      const thumbHeight = Math.max(45, Math.min(80, (clientHeight / scrollHeight) * trackHeight));
      thumb.style.height = `${thumbHeight}px`;

      // Calculate scroll position progress
      const scrollTop = window.scrollY;
      const maxScroll = scrollHeight - clientHeight;
      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;

      // Translate the thumb relative to slide range within the track padding
      const maxTranslate = trackHeight - thumbHeight - 8; // 8px for top/bottom margins
      thumb.style.transform = `translateY(${progress * maxTranslate}px)`;
    }

    function showScrollbar() {
      clearTimeout(fadeTimeout);
      track.classList.remove('opacity-0');
      track.classList.add('opacity-100');

      if (!isHovering && !isDragging) {
        fadeTimeout = setTimeout(() => {
          track.classList.remove('opacity-100');
          track.classList.add('opacity-0');
        }, 1500);
      }
    }

    // Bind scroll actions
    window.addEventListener('scroll', () => {
      updateScrollbar();
      showScrollbar();
    }, { passive: true });

    window.addEventListener('resize', updateScrollbar, { passive: true });

    // Hover mouse states
    track.addEventListener('mouseenter', () => {
      isHovering = true;
      clearTimeout(fadeTimeout);
      track.classList.remove('opacity-0');
      track.classList.add('opacity-100');
    });

    track.addEventListener('mouseleave', () => {
      isHovering = false;
      showScrollbar();
    });

    // Drag-to-scroll mouse state machine
    thumb.addEventListener('mousedown', (e) => {
      isDragging = true;
      startY = e.clientY;
      startScrollTop = window.scrollY;
      document.body.classList.add('select-none');
      document.documentElement.classList.add('select-none');
      e.preventDefault();
      clearTimeout(fadeTimeout);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;

      const deltaY = e.clientY - startY;
      const trackHeight = track.offsetHeight;
      const thumbHeight = thumb.offsetHeight;
      const slideRange = trackHeight - thumbHeight - 8;

      if (slideRange <= 0) return;

      const scrollRatio = deltaY / slideRange;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      window.scrollTo({
        top: startScrollTop + (scrollRatio * docHeight),
        behavior: 'auto'
      });
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        document.body.classList.remove('select-none');
        document.documentElement.classList.remove('select-none');
        showScrollbar();
      }
    });

    // Run initial positioning updates
    updateScrollbar();
    showScrollbar();
  }

  // Bind initial execution
  initCustomScrollbar();

  // Support Astro router page transitions
  document.addEventListener('astro:page-load', initCustomScrollbar);
});
