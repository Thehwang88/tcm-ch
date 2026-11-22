/* Reveal home trust cards once they enter the viewport; do not hide content
   while waiting for JavaScript or when reduced motion is enabled. */
(() => {
  const init = () => {
    const section = document.getElementById('home-trust');
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const reveal = () => section.classList.add('home-trust-animate');
    if (!('IntersectionObserver' in window)) { reveal(); return; }
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      reveal();
      observer.disconnect();
    }, { threshold: 0.08 });
    observer.observe(section);
    const feedback = document.getElementById('home-feedback-results');
    if (feedback) {
      const feedbackObserver = new IntersectionObserver((entries) => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        feedback.classList.add('home-feedback-visible');
        feedbackObserver.disconnect();
      }, { threshold: 0.08 });
      feedbackObserver.observe(feedback);
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
