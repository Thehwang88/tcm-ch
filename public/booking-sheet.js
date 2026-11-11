/* Presentation-only booking portal. The original form (including its event
 * listeners, selectors, Turnstile widget and tracking) is MOVED, never cloned.
 * On close it is restored to exactly its original DOM position.
 * Strict opt-in: only marked primary HERO CTA triggers this experience.
 */
(function(){
  'use strict';
  var dialog=document.getElementById('tcm-booking-sheet');
  var slot=dialog&&dialog.querySelector('[data-booking-content]');
  if(!dialog||!slot||!dialog.showModal)return;
  var scroller=dialog.querySelector('.tcm-booking-scroll');
  var heading=dialog.querySelector('#tcm-booking-sheet-title');
  var sub=dialog.querySelector('.tcm-booking-heading p');
  var current=null,origin=null,trigger=null,pending=false;
  var push=function(name,other){
    try{window.dataLayer=window.dataLayer||[];window.dataLayer.push(Object.assign({event:name,placement:'hero_booking_sheet'},other||{}));}catch(e){}
  };
  function pick(type){
    if(type==='home')return document.getElementById('home-contact-form');
    if(type==='zh')return document.getElementById('zh-funnel');
    if(type==='sg')return document.getElementById('offer-form');
    if(type==='clinic')return document.getElementById('anfrage-box');
    return null;
  }
  function formOf(el){return el&&el.querySelector('form');}
  function setWish(el,wish){
    if(!wish)return;
    var form=formOf(el);
    if(!form)return;
    var radio=form.querySelector('input[name="terminart"][value="'+wish+'"]');
    if(radio&&!radio.disabled){
      radio.checked=true;
      radio.dispatchEvent(new Event('change',{bubbles:true}));
    }
  }
  function show(btn){
    if(current||pending)return false;
    var type=btn.getAttribute('data-booking-sheet');
    var node=pick(type);
    if(!node||!formOf(node)||!node.parentNode)return false;
    // Required handlers belong to the REAL node and remain attached when moved.
    // Cards that have not initialised yet still use their normal in-page fallback.
    if(type!=='zh'&&type!=='home'&&node.hasAttribute('data-kf')&&!node.__kfGoto)return false;
    pending=true;
    var marker=document.createComment('booking-sheet-origin');
    node.parentNode.insertBefore(marker,node);
    origin=marker;current=node;trigger=btn;
    slot.className='tcm-booking-content tcm-booking-content--'+type;
    if(type==='zh'){
      var host=document.createElement('div');
      host.className='akz tcm-booking-zh-host';
      host.appendChild(node);
      slot.appendChild(host);
    } else {
      slot.appendChild(node);
    }
    var title=btn.textContent.trim();
    heading.textContent=/Passende Praxis|Anfrage stellen|Vormerk/.test(title)?'Deine Anfrage.':'Dein Termin.';
    sub.textContent=type==='zh'?'Wir finden die passende Zürcher Praxis und melden uns persönlich.':
      type==='sg'?'Wähle Ersttermin oder Gratis Check-in – die Kosten werden vor dem Senden angezeigt.':
      'Wähle einen Standort und Terminart. Wir melden uns persönlich.';
    var card=node.matches('[data-kf]')?node:node.querySelector('[data-kf]');
    if(card){
      var position=card.querySelector('input[name="cta_pos"]');
      if(position)position.value=btn.getAttribute('data-care-cta')||'hero-booking-sheet';
    }
    setWish(node,btn.getAttribute('data-booking-wish')||'');
    try{dialog.showModal();}
    catch(err){
      restore();
      pending=false;
      return false;
    }
    if(scroller)scroller.scrollTop=0;
    var close=dialog.querySelector('[data-booking-close]');
    if(close)close.focus({preventScroll:true});
    push('booking_sheet_open',{source_page:location.pathname,form_variant:type});
    if(type==='zh')push('zh_hub_cta_click',{placement:'hero'});
    pending=false;
    return true;
  }
  function restore(){
    if(!current)return;
    var node=current;
    // Remove the custom Zürich wrapper after extracting the native section.
    if(origin&&origin.parentNode)origin.replaceWith(node);
    else document.body.appendChild(node);
    slot.textContent='';
    slot.className='tcm-booking-content';
    origin=null;current=null;
  }
  document.addEventListener('click',function(e){
    var btn=e.target&&e.target.closest?e.target.closest('[data-booking-sheet]'):null;
    if(!btn||e.defaultPrevented||e.button||e.ctrlKey||e.metaKey||e.altKey||e.shiftKey)return;
    // If the form doesn't exist/hasn't initialised, preserve all native fallbacks.
    if(!show(btn))return;
    e.preventDefault();
    e.stopImmediatePropagation();
  },true);
  dialog.addEventListener('click',function(e){
    if(e.target===dialog||e.target.closest('[data-booking-close]'))dialog.close();
  });
  dialog.addEventListener('close',function(){
    restore();
    if(trigger&&trigger.isConnected)trigger.focus({preventScroll:true});
    trigger=null;
  });
  // Existing submission events and Turnstile callbacks remain inside the
  // original form. We never intercept submits or count attempts as conversions.
})();
