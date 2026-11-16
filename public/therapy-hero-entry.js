/* Fresh therapy navigation starts at the therapy hero, not a restored
   location/booking section. Respect explicit anchors and Back navigation. */
(function () {
  'use strict';
  if (!/^\/therapien\/[^/]+\/?$/.test(window.location.pathname)) return;
  if (window.location.hash) return; // Explicit deep links (e.g. booking) win.

  var entries = window.performance && window.performance.getEntriesByType &&
    window.performance.getEntriesByType('navigation');
  var navigation = entries && entries[0];
  if (navigation && navigation.type && navigation.type !== 'navigate') return;

  var userInteracted = false;
  function stopReset() { userInteracted = true; }
  ['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach(function (name) {
    window.addEventListener(name, stopReset, { once: true, passive: true });
  });

  function restoreHero() {
    if (userInteracted || window.location.hash) return;
    var hero = document.querySelector('#page-therapie .tsr-hero, #page-therapie #therapie-premium-hero, #therapie-premium-hero');
    if (!hero) return;
    if (window.scrollY > 8) window.scrollTo(0, 0);
  }
  function onReady() {
    restoreHero();
    window.requestAnimationFrame(restoreHero);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady, { once: true });
  } else {
    onReady();
  }
  window.addEventListener('pageshow', function (event) {
    if (!event.persisted) window.requestAnimationFrame(restoreHero);
  }, { once: true });
  window.addEventListener('load', function () {
    window.requestAnimationFrame(restoreHero);
  }, { once: true });
  // Some browser restorations and legacy form scripts run after DOMContentLoaded.
  window.setTimeout(restoreHero, 350);
})();
