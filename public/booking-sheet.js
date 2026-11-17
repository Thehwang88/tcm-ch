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
  // Move only the actual live FORM CARD. Moving its entire parent section
  // also moves unrelated content and strips page-scoped layout CSS, producing
  // a broken booking modal after the homepage and Zürich layout redesigns.
  function liveCard(root){
    if(!root)return null;
    if(root.matches && root.matches('[data-kf],.inline-form-card') && root.querySelector('form'))return root;
    var kf=root.querySelector && root.querySelector('[data-kf]');
    if(kf && kf.querySelector('form'))return kf;
    var form=root.querySelector && root.querySelector('form');
    return form && form.closest('.inline-form-card');
  }
  function firstForm(selectors){
    for(var i=0;i<selectors.length;i++){
      var root=document.querySelector(selectors[i]);
      var card=liveCard(root);
      if(card)return card;
    }
    return null;
  }
  function pick(type){
    if(type==='home')return firstForm(['#home-contact-form [data-kf]','#home-contact-form']);
    if(type==='zh')return firstForm(['#zh-funnel [data-kf]','#zh-funnel']);
    if(type==='sg')return firstForm(['#offer-form','#termin-formular [data-kf]','[data-kf-instance="sg-hero"]','[data-kf-instance="sg-unten"]','#kontakt [data-kf]']);
    if(type==='clinic')return firstForm(['#anfrage-box','#termin [data-kf]','#kontakt [data-kf]','[data-kf-instance="standort"]']);
    return null;
  }
  function formOf(el){return el&&el.querySelector('form');}
  function setWish(el,wish){
    if(!wish)return;
    var form=formOf(el);
    if(!form)return;
    // Home's new human-readable service select drives the canonical radios.
    var service=form.querySelector('[data-kf-service]');
    if(service && (wish==='checkin'||wish==='behandlung')){
      service.value=wish;
      service.dispatchEvent(new Event('change',{bubbles:true}));
      return;
    }
    var radio=form.querySelector('input[name="terminart"][value="'+wish+'"]');
    if(radio&&!radio.disabled){
      radio.checked=true;
      radio.dispatchEvent(new Event('change',{bubbles:true}));
    }
  }
  // Homepage clinic-card CTA: preselect the requested operational location before
  // moving the EXISTING form into the sheet. If a location cannot be resolved,
  // leave its native href fallback (?standort=<id>) intact instead.
  function setLocation(node,id){
    if(!id)return true;
    var form=formOf(node),sel=form&&form.querySelector('select[name="standort"]');
    if(!sel)return false;
    var index=typeof window.kfPickOption==='function'?window.kfPickOption(sel,id):-1;
    if(index<1){
      for(var i=1;i<sel.options.length;i++){
        var opt=sel.options[i];
        if(opt.value===id||(opt.getAttribute('data-id')===id&&opt.getAttribute('data-default')==='1')){
          index=i;break;
        }
      }
    }
    if(index<1)return false;
    sel.selectedIndex=index;
    sel.dispatchEvent(new Event('change',{bubbles:true}));
    return true;
  }
  function show(btn){
    if(current||pending)return false;
    var type=btn.getAttribute('data-booking-sheet');
    var node=pick(type);
    if(!node||!formOf(node)||!node.parentNode)return false;
    // Required handlers belong to the REAL node and remain attached when moved.
    // Cards that have not initialised yet still use their normal in-page fallback.
    if(node.hasAttribute('data-kf')&&!node.__kfGoto)return false;
    if(!setLocation(node,btn.getAttribute('data-booking-location')||''))return false;
    pending=true;
    var marker=document.createComment('booking-sheet-origin');
    node.parentNode.insertBefore(marker,node);
    origin=marker;current=node;trigger=btn;
    slot.className='tcm-booking-content tcm-booking-content--'+type;
    if(type==='zh'){
      var host=document.createElement('div');
      host.className='akz akz-funnel-section tcm-booking-zh-host';
      host.appendChild(node);
      slot.appendChild(host);
    } else {
      slot.appendChild(node);
    }
    var title=btn.textContent.trim();
    heading.textContent=/Passende Praxis|Anfrage stellen|Vormerk/.test(title)?'Deine Anfrage.':'Dein Termin.';
    sub.textContent=type==='zh'?'Wir finden die passende Zürcher Praxis und melden uns persönlich.':
      type==='sg'?'Wähle Ersttermin oder Gratis Check-in – die Kosten werden vor dem Senden angezeigt.':
      'Schreib uns kurz dein Anliegen – wir melden uns persönlich.';
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
