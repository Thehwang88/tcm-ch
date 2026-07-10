/* TCM.ch home — interactivity ported from the SPA (faithful). */

"use strict";

var _reviewsOpen=false;



function openContactForm(prefillBeschwerde, prefillStandort){
  var t = document.getElementById('home-contact-form') || document.querySelector('.inline-form-card');
  if(!t) return;
  if(prefillStandort){
    var sel = t.querySelector('select[name="standort"]');
    if(sel){ for(var i=0;i<sel.options.length;i++){ if(sel.options[i].value===prefillStandort){ sel.selectedIndex=i; break; } } }
  }
  t.scrollIntoView({behavior:'smooth',block:'start'});
}

function submitInlineFormGeneric(e, form){
e.preventDefault();
const card = form.closest('.inline-form-card');
const btn = form.querySelector('.form-submit');
const data = {};
form.querySelectorAll('input,textarea,select').forEach(function(el){
  if(el.type==='checkbox'){ data[el.name||'consent'] = el.checked; return; }
  if(el.name) data[el.name] = (el.value||'').trim();
});
if(!data.quelle) data.quelle = location.pathname || '/';
data.zeit = new Date().toISOString();
var _ss=form.querySelector('select[name="standort"]'); if(_ss && _ss.selectedIndex>0){ data.standort=_ss.options[_ss.selectedIndex].text; }
var _ts = window.tcmTsToken(form); var tsEl = _ts.el, tsToken = _ts.token;
if(tsEl && !tsToken){
  var te = form.querySelector('.form-send-err');
  if(!te){ te = document.createElement('p'); te.className='form-send-err'; te.style.cssText='font-size:13px;color:#c0392b;margin-top:10px;line-height:1.5'; form.appendChild(te); }
  te.textContent = 'Bitte bestätige kurz, dass du kein Roboter bist.';
  return;
}
data.turnstileToken = tsToken;
const okHTML = '<div style="text-align:center;padding:32px 16px"><div style="font-size:44px;margin-bottom:14px"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2D9B6F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle"><circle cx="12" cy="12" r="10"/><polyline points="7.5 12.5 10.5 15.5 16.5 9.5"/></svg></div><h3 style="font-family:var(--font-sans);font-size:20px;color:var(--black);margin-bottom:8px">Anfrage gesendet!</h3><p style="font-size:14px;color:var(--mid);line-height:1.6;margin-bottom:20px">Wir melden uns innert 24h mit passenden Terminvorschlägen.</p><a href="https://wa.me/41775236122" class="btn-primary" style="display:inline-flex;justify-content:center" target="_blank">Trotzdem per WhatsApp</a></div>';
if(btn){ btn.disabled = true; btn.dataset.label = btn.innerHTML; btn.innerHTML = 'Wird gesendet…'; }
fetch('/api/anfrage', {
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body: JSON.stringify(data)
}).then(function(r){ if(!r.ok) throw new Error('bad status'); return r.json().catch(function(){return {};}); })
.then(function(){ if(card){ card.innerHTML = okHTML; card.scrollIntoView({behavior:'smooth',block:'start'}); } })
.catch(function(){
  if(btn){ btn.disabled = false; btn.innerHTML = btn.dataset.label || 'Anfrage senden'; }
  if(window.turnstile && tsEl){ try{ window.turnstile.reset(tsEl); }catch(_){} }
  var err = form.querySelector('.form-send-err');
  if(!err){ err = document.createElement('p'); err.className='form-send-err'; err.style.cssText='font-size:13px;color:#c0392b;margin-top:10px;line-height:1.5'; form.appendChild(err); }
  err.innerHTML = 'Senden fehlgeschlagen. Bitte versuche es erneut oder schreib uns direkt per <a href="https://wa.me/41775236122" target="_blank" style="color:var(--blue)">WhatsApp</a>.';
});
}

window.tcmTsToken=function(form){
      var el = form && form.querySelector('.cf-turnstile');
      var token = '';
      if(el && window.turnstile){
        try { if(el.dataset.tsWidgetId) token = window.turnstile.getResponse(el.dataset.tsWidgetId) || ''; } catch(_){}
        if(!token){ try { token = window.turnstile.getResponse(el) || ''; } catch(_){} }
      }
      if(!token && el){ token = (el.querySelector('[name="cf-turnstile-response"]') || {}).value || ''; }
      // Global fallback ONLY on single-widget pages. With >1 .cf-turnstile (e.g. the SG
      // launch page: hero + bottom form), grabbing document-wide would return the first
      // widget's token for every form, so keep each form scoped to its own widget above.
      if(!token && document.querySelectorAll('.cf-turnstile').length <= 1){ token = (document.querySelector('[name="cf-turnstile-response"]') || {}).value || ''; }
      return { el: el, token: token };
    }

function animateCountUp(el){
var target = parseFloat(el.dataset.target);
var decimals = parseInt(el.dataset.decimals)||0;
var duration = 1600;
var start = null;
function step(ts){
if(!start) start = ts;
var p = Math.min((ts - start)/duration, 1);
// ease out cubic
p = 1 - Math.pow(1 - p, 3);
var val = p * target;
el.textContent = val.toFixed(decimals);
if(p < 1) requestAnimationFrame(step);
else el.textContent = target.toFixed(decimals);
}
requestAnimationFrame(step);
}

function faqTab(btn,tab){var sec=btn.closest("section");sec.querySelectorAll(".faq-tab").forEach(function(b){b.classList.remove("faq-tab-active");b.style.background="transparent";b.style.color="var(--mid)";b.style.boxShadow="none"});btn.classList.add("faq-tab-active");btn.style.background="#fff";btn.style.color="var(--black)";btn.style.boxShadow="0 1px 3px rgba(0,0,0,.06)";sec.querySelectorAll(".faq-panel").forEach(function(p){p.style.display=p.dataset.panel===tab?"block":"none"})}

function toggleReviews() {
_reviewsOpen = !_reviewsOpen;
var el = document.getElementById('reviewsExpanded');
var lbl = document.getElementById('reviewsLabel');
var icon = document.getElementById('reviewsIcon');
var cards = document.querySelectorAll('#extraReviewsGrid .review-card');
if (_reviewsOpen) {
el.style.maxHeight = el.scrollHeight + 200 + 'px';
el.style.opacity = '1';
el.style.marginTop = '0';
lbl.textContent = 'Weniger anzeigen';
icon.style.transform = 'rotate(45deg)';
cards.forEach(function(c, i) {
setTimeout(function() {
c.style.opacity = '1';
c.style.transform = 'translateY(0)';
}, 80 + i * 60);
});
} else {
cards.forEach(function(c) {
c.style.opacity = '0';
c.style.transform = 'translateY(14px)';
});
setTimeout(function() {
el.style.maxHeight = '0';
el.style.opacity = '0';
}, 150);
lbl.textContent = '12 weitere 5-Sterne Erfahrungen ansehen';
icon.style.transform = 'rotate(0deg)';
}
}

function hciPrefill(text){
var ta=document.getElementById('heroComplaintField');
if(!ta)return;
ta.value=text+', ';
ta.focus();
ta.setSelectionRange(ta.value.length,ta.value.length);
}

function handleComplaintInput(){
var field = document.getElementById('heroComplaintField');
var val = field ? field.value.trim() : '';
// Zürich flagship routing: recommend Zürich City when no specific location given
var hasLocation = val.length > 0 && /zürich|winterthur|kreuzlingen|frauenfeld|basel|st\.gallen|oerlikon|höngg|volketswil|wil\b/i.test(val);
var zuerichHint = '';
var msg = val.length > 0
? 'Hoi, ich habe aktuell ' + val + ' und bin mir nicht sicher, welche Behandlung oder Praxis für mich am besten ist. Könnt ihr mir kurz weiterhelfen?' + zuerichHint
: 'Hoi, ich möchte gerne wissen, welche Behandlung oder Praxis für mich am besten passt. Könnt ihr mir kurz weiterhelfen?';
window._heroComplaint = val;
window.open('https://wa.me/41775236122?text=' + encodeURIComponent(msg), '_blank', 'noopener');
}

function kkToggle(btn){
var a=btn.nextElementSibling;
var isOpen=a.classList.contains('open');
/* close all in same faq */
var faq=btn.closest('.kk-faq');
faq.querySelectorAll('.kk-a.open').forEach(function(el){el.classList.remove('open');});
faq.querySelectorAll('.kk-q.open').forEach(function(el){el.classList.remove('open');el.setAttribute('aria-expanded','false');});
if(!isOpen){a.classList.add('open');btn.classList.add('open');btn.setAttribute('aria-expanded','true');}
}

function gfToggle(btn){
var a=btn.nextElementSibling;
var isOpen=a.classList.contains('open');
var faq=btn.closest('.kk-faq');
faq.querySelectorAll('.kk-a.open').forEach(function(el){el.classList.remove('open');});
faq.querySelectorAll('.kk-q.open').forEach(function(el){el.classList.remove('open');el.setAttribute('aria-expanded','false');});
if(!isOpen){a.classList.add('open');btn.classList.add('open');btn.setAttribute('aria-expanded','true');}
}


/* observers + prefill bridge (home.js is deferred -> runs after DOM parse) */
(function(){
  if('IntersectionObserver' in window){
    var ro=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');ro.unobserve(e.target);}});},{threshold:.05,rootMargin:'0px 0px 100px 0px'});
    document.querySelectorAll('.reveal').forEach(function(el){ro.observe(el);});
    // Fallback: never leave content hidden if the observer doesn't fire.
    setTimeout(function(){ document.querySelectorAll('.reveal:not(.visible)').forEach(function(el){el.classList.add('visible');}); }, 1400);
  } else { document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('visible');}); }
  var sb=document.getElementById('stats-bar');
  if(sb && 'IntersectionObserver' in window){
    var done=false;
    var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&!done){done=true;e.target.querySelectorAll('.count-up').forEach(animateCountUp);so.unobserve(e.target);}});},{threshold:.3});
    so.observe(sb);
  }
  try{ var sp=new URLSearchParams(location.search).get('standort'); if(sp){ setTimeout(function(){openContactForm(null,sp);},250); } }catch(e){}
  // Prefill handoff (e.g. from /selbsttest/): ?anliegen=...&quelle=... fills the Anliegen
  // textarea + sets the hidden quelle field, then scrolls to the form. Same quelle path as submit.
  try{
    var _qp=new URLSearchParams(location.search);
    var _anl=_qp.get('anliegen'); var _qz=_qp.get('quelle');
    if(_anl||_qz){
      var _form=document.querySelector('#home-contact-form form');
      if(_form){
        if(_anl){ var _ta=_form.querySelector('textarea[name="anliegen"]'); if(_ta){ _ta.value=_anl; } }
        if(_qz){ var _h=_form.querySelector('input[name="quelle"]'); if(!_h){ _h=document.createElement('input'); _h.type='hidden'; _h.name='quelle'; _form.appendChild(_h); } _h.value=_qz; }
        setTimeout(function(){ openContactForm(); },300);
      }
    }
  }catch(e){}
})();

/* ── Kräutertherapie modal (ported) ── */
// drawerOpen


// drawerClose


// openDrawer


// closeDrawer


// drawerToggle


// drawerNav


// karOpen
function karOpen(){
var el = document.getElementById('kar-overlay');
if(!el) return;
el.classList.add('open');
el.scrollTop = 0;
document.body._karSY = window.scrollY;
document.body.style.overflow = 'hidden';
setTimeout(initKarReveal, 140);
el.addEventListener('scroll', initKarReveal, {passive:true});
}

// karClose
function karClose(){
var el = document.getElementById('kar-overlay');
if(!el) return;
el.classList.remove('open');
document.body.style.overflow = '';
setTimeout(function(){ window.scrollTo(0, document.body._karSY || 0); }, 460);
}


/* therapie-leaf hero CTA -> scroll to the inline contact form */
function therapieScrollToForm(){ var el = document.querySelector("#page-therapie .contact-section-inline .inline-form-card") || document.querySelector("#page-therapie .contact-section-inline") || document.querySelector(".inline-form-card"); if(el) el.scrollIntoView({behavior:"smooth", block:"center"}); }

/* "Tag der offenen Tür" event modal (St. Gallen RSVP banner). Modal markup lives on the page; no-ops elsewhere. */
function sgEventOpen(){ var m = document.getElementById('sg-event-modal'); if(!m) return; m.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
function sgEventClose(){ var m = document.getElementById('sg-event-modal'); if(!m) return; m.style.display = 'none'; document.body.style.overflow = ''; }
document.addEventListener('keydown', function(e){ if(e.key === 'Escape') sgEventClose(); });

/* Compact trust checklist directly above the contact form — non-home pages only.
   Single source: every SPA leaf/hub form inherits it (home keeps the full offer section). */
(function(){
  if (document.getElementById('home-content')) return;            // skip the home
  var card = document.querySelector('.contact-section-inline .inline-form-card') || document.querySelector('.inline-form-card');
  if (!card || document.querySelector('.form-trust-checklist')) return;
  var items = ['Kassendeckung vorab geprüft', 'Termin in 24–48h', 'Ärztlich begleitet', 'Ehrlichkeits-Garantie'];
  var chk = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2D9B6F" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
  var wrap = document.createElement('div');
  wrap.className = 'form-trust-checklist';
  wrap.innerHTML = items.map(function(t){ return '<span class="ftc-item">' + chk + t + '</span>'; }).join('');
  var scar = document.createElement('div');
  scar.className = 'form-trust-scarcity';
  scar.textContent = 'Ersttermin-Slots pro Woche und Standort sind begrenzt. Anfragen werden in der Reihenfolge des Eingangs vergeben.';
  card.parentNode.insertBefore(wrap, card);
  card.parentNode.insertBefore(scar, card);
})();

/* Contact forms (home + standorte): bind ONE AJAX submit handler by attribute, so every
   form[data-contact-form] submits via fetch + inline confirmation instead of a native reload. */
document.querySelectorAll('form[data-contact-form]').forEach(function(f){
  f.addEventListener('submit', function(e){ submitInlineFormGeneric(e, f); });
});
