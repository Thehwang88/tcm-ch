/* TCM.ch shared DE header — nav routing + burger drawer. Loaded on every DE page. */

"use strict";

function nav(page, id){
  var direct={home:'/',beschwerden:'/beschwerden',therapien:'/therapien',standorte:'/standorte',wissen:'/wissen',kkhub:'/krankenkassen',krankenkassen:'/krankenkassen',kontakt:'/kontakt'};
  var sub={therapie:'/therapien/',symptom:'/beschwerden/',standort:'/standorte/',wissen:'/wissen/'};
  var url = (id && sub[page]) ? sub[page]+id : (direct[page] || '/'+page);
  if(url.indexOf('/')===0 && !url.endsWith('/')) url += '/'; // canonical trailing-slash form
  window.location.href = url;
}

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

function openDrawer(page, id)   { nav(page, id); }

function closeDrawer()          { history.back(); }


/* "Mehr"-Dropdown (Desktop): Toggle mit aria-expanded, schliesst bei Escape und Klick ausserhalb. */
function navMoreToggle(){
  var btn=document.getElementById('navMoreBtn');
  var panel=document.getElementById('navMorePanel');
  if(!btn||!panel) return;
  var open=btn.getAttribute('aria-expanded')==='true';
  btn.setAttribute('aria-expanded', open?'false':'true');
  panel.classList.toggle('open', !open);
}
(function(){
  function closeMore(){
    var btn=document.getElementById('navMoreBtn');
    var panel=document.getElementById('navMorePanel');
    if(btn&&btn.getAttribute('aria-expanded')==='true'){btn.setAttribute('aria-expanded','false');panel.classList.remove('open');}
  }
  document.addEventListener('click',function(e){
    var li=e.target.closest&&e.target.closest('.nav-more-li');
    if(!li) closeMore();
  });
  document.addEventListener('keydown',function(e){
    if(e.key!=='Escape') return;
    closeMore();
    var d=document.getElementById('siteDrawer');
    if(d&&d.classList.contains('open')&&typeof drawerClose==='function') drawerClose();
  });
})();

/* Audience-Switch (Patient:innen | Therapeut:innen).
   EIN Zustand: audience = 'patient' | 'therapist'. Optik (Indikator, aktive
   Labels) und Hero-Panels leiten sich beide daraus ab. Auf der Startseite
   (Hero-Panels vorhanden) schaltet der Klick in-page ohne Reload und die
   Controls bekommen Tab-Semantik; auf allen anderen Seiten bleiben die
   Optionen normale Links (/ bzw. /partner/). */
(function(){
  var pPanel=document.querySelector('[data-audience-panel="patient"]');
  var tPanel=document.querySelector('[data-audience-panel="therapist"]');
  var interactive=!!(pPanel&&tPanel);
  var groups=document.querySelectorAll('.nav-audience,.drw-aud');
  if(!groups.length) return;

  function setAudience(aud){
    groups.forEach(function(g){
      g.setAttribute('data-audience',aud);
      g.querySelectorAll('[data-aud]').forEach(function(o){
        var active=o.getAttribute('data-aud')===aud;
        if(interactive){o.setAttribute('aria-selected',active?'true':'false');o.setAttribute('tabindex',active?'0':'-1');}
        if(active) o.setAttribute('aria-current','true'); else o.removeAttribute('aria-current');
      });
    });
    if(interactive){
      // hidden-Attribut + inline display MIT priority 'important':
      // home.css setzt #home-content .hero-bg{display:block !important}
      // (DE-Home-Hero-Block), das schlägt sowohl [hidden] als auch normale
      // Inline-Styles. Inline-!important gewinnt zuverlässig.
      pPanel.hidden = aud!=='patient';
      tPanel.hidden = aud!=='therapist';
      if(aud==='patient') pPanel.style.removeProperty('display'); else pPanel.style.setProperty('display','none','important');
      if(aud==='therapist') tPanel.style.removeProperty('display'); else tPanel.style.setProperty('display','none','important');
    }
  }

  if(interactive){
    groups.forEach(function(g){g.setAttribute('role','tablist');});
    document.querySelectorAll('.nav-audience [data-aud],.drw-aud [data-aud]').forEach(function(o){o.setAttribute('role','tab');});
    pPanel.setAttribute('role','tabpanel');
    tPanel.setAttribute('role','tabpanel');
  }

  document.addEventListener('click',function(e){
    var opt=e.target.closest&&e.target.closest('.nav-aud-opt,.drw-aud-opt');
    if(!opt||!interactive) return; // Subseiten: normaler Link
    e.preventDefault();
    setAudience(opt.getAttribute('data-aud'));
    if(opt.classList.contains('drw-aud-opt')&&typeof drawerClose==='function') drawerClose();
  });
  document.addEventListener('keydown',function(e){
    if(!interactive) return;
    var opt=e.target.closest&&e.target.closest('.nav-aud-opt,.drw-aud-opt');
    if(!opt) return;
    if(e.key===' '){e.preventDefault();opt.click();}
    if(e.key==='ArrowLeft'||e.key==='ArrowRight'){
      e.preventDefault();
      var aud=e.key==='ArrowLeft'?'patient':'therapist';
      setAudience(aud);
      var next=opt.parentElement.querySelector('[data-aud="'+aud+'"]');
      if(next) next.focus();
    }
  });

  setAudience('patient'); // Default, hält Optik und Panels konsistent
})();

/* "Jetzt Hilfe erhalten" CTA: open the home contact form if present, else go to /kontakt. */
(function(){
  var cta = document.getElementById('navCtaBtn');
  if (cta) cta.addEventListener('click', function(){
    if (document.getElementById('home-contact-form') && typeof openContactForm === 'function') { openContactForm(); }
    else { window.location.href = '/kontakt'; }
  });
})();
/* Mobile audit B2: flag wide tables that actually overflow so CSS can show a
   horizontal-scroll hint (fade + chevron). Toggles on load and resize. */
(function(){
  function update(){
    document.querySelectorAll('.kk-table-wrap, .table-wrap').forEach(function(w){
      w.classList.toggle('is-scrollx', w.scrollWidth - w.clientWidth > 2);
    });
  }
  if (document.readyState !== 'loading') update();
  else document.addEventListener('DOMContentLoaded', update);
  window.addEventListener('load', update);
  window.addEventListener('resize', update);
})();
