/* TCM.ch home — interactivity ported from the SPA (faithful). */

"use strict";

var _reviewsOpen=false;

function nav(page, id){
  var direct={home:'/',beschwerden:'/beschwerden',therapien:'/therapien',standorte:'/standorte',wissen:'/wissen',kkhub:'/krankenkassen',krankenkassen:'/krankenkassen',partnerpraxen:'/partnerpraxen',kontakt:'/kontakt'};
  var sub={therapie:'/therapien/',symptom:'/beschwerden/',standort:'/standorte/',wissen:'/wissen/'};
  window.location.href = (id && sub[page]) ? sub[page]+id : (direct[page] || '/'+page);
}

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
data.quelle = location.pathname || '/';
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
const okHTML = '<div style="text-align:center;padding:32px 16px"><div style="font-size:44px;margin-bottom:14px"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2D9B6F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle"><circle cx="12" cy="12" r="10"/><polyline points="7.5 12.5 10.5 15.5 16.5 9.5"/></svg></div><h3 style="font-family:var(--font-sans);font-size:20px;color:var(--black);margin-bottom:8px">Anfrage gesendet!</h3><p style="font-size:14px;color:var(--mid);line-height:1.6;margin-bottom:20px">Wir melden uns innert 24h mit passenden Praxisempfehlungen.</p><a href="https://wa.me/41775236122" class="btn-primary" style="display:inline-flex;justify-content:center" target="_blank">Trotzdem per WhatsApp</a></div>';
if(btn){ btn.disabled = true; btn.dataset.label = btn.innerHTML; btn.innerHTML = 'Wird gesendet…'; }
fetch('/api/anfrage', {
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body: JSON.stringify(data)
}).then(function(r){ if(!r.ok) throw new Error('bad status'); return r.json().catch(function(){return {};}); })
.then(function(){ if(card) card.innerHTML = okHTML; })
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
      if(!token){ token = (document.querySelector('[name="cf-turnstile-response"]') || {}).value || ''; }
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
})();

/* ── SPA header drawer + Kräutertherapie modal (ported verbatim) ── */
// drawerOpen
function drawerOpen(){
var _d=document.getElementById('siteDrawer'); if(_d) _d.classList.add('open');
var _o=document.getElementById('drawerOverlay'); if(_o) _o.classList.add('open');
window.__drawerScrollY=window.scrollY||window.pageYOffset||0;
document.body.style.position='fixed';
document.body.style.top='-'+window.__drawerScrollY+'px';
document.body.style.left='0';
document.body.style.right='0';
document.body.style.width='100%';
document.body.style.overflow='hidden';
var btn=document.getElementById('navMenuBtn');
if(btn) btn.setAttribute('aria-expanded','true');
// focus trap
setTimeout(function(){
var first=document.querySelector('#siteDrawer .drw-close');
if(first) first.focus();
},340);
}

// drawerClose
function drawerClose(){
var _d=document.getElementById('siteDrawer'); if(_d) _d.classList.remove('open');
var _o=document.getElementById('drawerOverlay'); if(_o) _o.classList.remove('open');
document.body.style.position='';
document.body.style.top='';
document.body.style.left='';
document.body.style.right='';
document.body.style.width='';
document.body.style.overflow='';
if(typeof window.__drawerScrollY==='number'){window.scrollTo(0,window.__drawerScrollY);window.__drawerScrollY=null;}
var btn=document.getElementById('navMenuBtn');
if(btn) btn.setAttribute('aria-expanded','false');
}

// openDrawer
function openDrawer(page, id)   { nav(page, id); }

// closeDrawer
function closeDrawer()          { history.back(); }

// drawerToggle
function drawerToggle(btn){
var section=btn.closest('.drw-section');
var body=btn.nextElementSibling;
var isOpen=btn.classList.contains('open');
var drawerBody=document.querySelector('.drw-body');
// Close all others
document.querySelectorAll('#siteDrawer .drw-acc-btn.open').forEach(function(b){
b.classList.remove('open');
b.setAttribute('aria-expanded','false');
b.nextElementSibling.classList.remove('open');
b.closest('.drw-section').classList.remove('is-open');
});
if(!isOpen){
btn.classList.add('open');
btn.setAttribute('aria-expanded','true');
body.classList.add('open');
section.classList.add('is-open');
drawerBody.classList.add('has-open');
} else {
drawerBody.classList.remove('has-open');
}
}

// drawerNav
function drawerNav(page,id){
drawerClose();
// small delay so drawer animates out first
setTimeout(function(){
if(typeof nav==='function'){
if(id) nav(page,id);
else nav(page);
}
},80);
}

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
