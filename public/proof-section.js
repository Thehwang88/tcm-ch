/* Homepage proof counters: visible final values in HTML for no-JS / crawlers;
   animate once on entry, never loop, respect reduced-motion, no analytics events. */
(function(){
  'use strict';
  var section=document.querySelector('#home-content #s-offer.proof-section');
  if(!section)return;
  if(!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var counters=Array.prototype.slice.call(section.querySelectorAll('[data-proof-count]'));
  if(!counters.length)return;
  var started=false;
  function swissNumber(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g,"'");}
  function animate(el){
    var target=Number(el.getAttribute('data-proof-count'));
    if(!Number.isInteger(target)||target<1)return; // zero remains static
    var grouped=el.hasAttribute('data-proof-grouped');
    var duration=target>=1000?1500:1050;
    var startedAt=null;
    function frame(time){
      if(startedAt===null)startedAt=time;
      var progress=Math.min((time-startedAt)/duration,1);
      var eased=1-Math.pow(1-progress,3);
      var value=Math.round(target*eased);
      el.textContent=grouped?swissNumber(value):String(value);
      if(progress<1)window.requestAnimationFrame(frame);
      else el.textContent=grouped?swissNumber(target):String(target);
    }
    el.textContent='0';
    window.requestAnimationFrame(frame);
  }
  var observer=new IntersectionObserver(function(entries){
    for(var i=0;i<entries.length;i++){
      if(entries[i].isIntersecting&&!started){
        started=true;observer.disconnect();
        counters.forEach(animate);
        break;
      }
    }
  },{threshold:0.15});
  observer.observe(section);
})();
