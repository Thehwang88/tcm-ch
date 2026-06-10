/* TCM.ch shared DE header — nav routing + burger drawer. Loaded on every DE page. */

"use strict";

function nav(page, id){
  var direct={home:'/',beschwerden:'/beschwerden',therapien:'/therapien',standorte:'/standorte',wissen:'/wissen',kkhub:'/krankenkassen',krankenkassen:'/krankenkassen',partnerpraxen:'/partnerpraxen',kontakt:'/kontakt'};
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


/* "Jetzt Hilfe erhalten" CTA: open the home contact form if present, else go to /kontakt. */
(function(){
  var cta = document.getElementById('navCtaBtn');
  if (cta) cta.addEventListener('click', function(){
    if (document.getElementById('home-contact-form') && typeof openContactForm === 'function') { openContactForm(); }
    else { window.location.href = '/kontakt'; }
  });
})();