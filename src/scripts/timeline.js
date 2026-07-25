// src/scripts/timeline.js

document.addEventListener('DOMContentLoaded', () => {
  function initTimeline() {
    const container = document.querySelector('[data-timeline-container]');
    const progressLine = document.querySelector('[data-timeline-progress]');
    const dots = document.querySelectorAll('[data-timeline-dot]');

    if (!container || !progressLine) return;

    function handleScroll() {
      const rect = container.getBoundingClientRect();
      const containerHeight = rect.height;
      const containerTop = rect.top;

      // The eye-level center threshold of the screen
      const viewportCenter = window.innerHeight * 0.55;

      // Calculate scroll progress percentage (0 to 1) through the container
      let percentage = (viewportCenter - containerTop) / containerHeight;
      percentage = Math.max(0, Math.min(1, percentage));

      // Update progress line transform scale and ensure correct pixel height bounds
      progressLine.style.height = `${containerHeight}px`;
      progressLine.style.transform = `scaleY(${percentage})`;

      // Light up timeline nodes as progress passes them
      dots.forEach(dot => {
        const dotRect = dot.getBoundingClientRect();
        if (dotRect.top <= viewportCenter) {
          dot.classList.add('active-dot');
        } else {
          dot.classList.remove('active-dot');
        }
      });
    }

    // Bind scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Run initial alignment calculation
    handleScroll();
  }

  // Bind initial execution
  initTimeline();

  // Support Astro router page transitions
  document.addEventListener('astro:page-load', initTimeline);
});
