/* TCM.ch location team carousel: native touch swipe, visible teaser, and one-time cue.
 * No autoplay, no third-party carousel dependency, and no analytics events. */
(function () {
  'use strict';
  function init() {
    var sections = document.querySelectorAll('.tc-team-section');
    if (!sections.length) return;
    var mobile = window.matchMedia('(max-width: 767px)');
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    sections.forEach(function (section) {
      if (section.dataset.teamCarouselReady === '1') return;
      var track = section.querySelector('.tc-team-track');
      var slides = track && track.querySelectorAll('.tc-team-slide');
      var prev = section.querySelector('.tc-team-prev');
      var next = section.querySelector('.tc-team-next');
      var count = section.querySelector('.tc-team-count');
      var current = section.querySelector('.tc-team-current');
      var progress = section.querySelector('.tc-team-progress');
      var fill = section.querySelector('.tc-team-progress-fill');
      if (!track || !slides || !slides.length || !prev || !next) return;
      section.dataset.teamCarouselReady = '1';
      var total = slides.length, frame = 0, cueTimer = 0, seenCue = false, interacted = false;
      function step() {
        return slides[0].getBoundingClientRect().width +
          (parseFloat(getComputedStyle(track).columnGap) || 12);
      }
      function currentIndex() {
        return Math.max(0, Math.min(total - 1, Math.round(track.scrollLeft / Math.max(1, step()))));
      }
      function refresh() {
        frame = 0;
        var i = currentIndex();
        if (current) current.textContent = String(i + 1).padStart(2, '0');
        if (count) count.setAttribute('aria-label', 'Teamkarte ' + (i + 1) + ' von ' + total);
        if (progress) progress.setAttribute('aria-valuenow', String(i + 1));
        if (fill) fill.style.width = ((i + 1) * 100 / total) + '%';
        prev.disabled = i === 0;
        next.disabled = i === total - 1;
      }
      function schedule() {
        if (!frame) frame = window.requestAnimationFrame(refresh);
      }
      function cancelCue() {
        interacted = true;
        if (cueTimer) window.clearTimeout(cueTimer);
        track.classList.remove('tc-team-cue');
      }
      function move(direction) {
        cancelCue();
        var to = Math.max(0, Math.min(total - 1, currentIndex() + direction));
        track.scrollTo({
          left: to * step(),
          behavior: reduced.matches ? 'instant' : 'smooth'
        });
      }
      prev.addEventListener('click', function () { move(-1); });
      next.addEventListener('click', function () { move(1); });
      track.addEventListener('scroll', schedule, { passive: true });
      track.addEventListener('pointerdown', cancelCue, { passive: true });
      track.addEventListener('touchstart', cancelCue, { passive: true });
      track.addEventListener('wheel', cancelCue, { passive: true });
      track.addEventListener('keydown', cancelCue);
      window.addEventListener('resize', schedule, { passive: true });
      if (mobile.addEventListener) mobile.addEventListener('change', function () {
        cancelCue();
        schedule();
      });

      function showCue() {
        if (seenCue || interacted || !mobile.matches || reduced.matches) return;
        seenCue = true;
        // One short visual nudge after the cards become visible: not autoplay.
        cueTimer = window.setTimeout(function () {
          if (interacted || !mobile.matches || reduced.matches) return;
          track.classList.add('tc-team-cue');
          cueTimer = window.setTimeout(function () {
            track.classList.remove('tc-team-cue');
          }, 1050);
        }, 350);
      }
      if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
          if (entries.some(function (entry) { return entry.isIntersecting; })) {
            observer.disconnect();
            showCue();
          }
        }, { threshold: 0.35 });
        observer.observe(track);
      }
      refresh();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
