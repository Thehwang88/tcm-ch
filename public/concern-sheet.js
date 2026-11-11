/* Short concerns use /api/anfrage with the same production Turnstile gate as
   the shared contact forms. No health content is added to analytics events. */
(function(){
  'use strict';
  var modal=document.getElementById('tcm-concern-sheet');
  var form=document.getElementById('tcm-concern-form');
  if(!modal||!form||typeof modal.showModal!=='function')return;
  var textarea=document.getElementById('tcm-concern-text');
  var locationInput=document.getElementById('tcm-concern-location');
  var error=form.querySelector('[data-concern-error]');
  var submit=form.querySelector('[type="submit"]');
  var success=modal.querySelector('[data-concern-success]');
  var widget=null,restore=null,sending=false;
  var initial=textarea.defaultValue.trim();
  var push=function(event,additional){
    try{window.dataLayer=window.dataLayer||[];window.dataLayer.push(Object.assign({event:event,placement:'hero_concern_sheet'},additional||{}));}catch(e){}
  };
  function setError(msg){error.textContent=msg||'';error.hidden=!msg;}
  function renderCaptcha(){
    if(widget!==null||!window.turnstile||typeof window.turnstile.render!=='function')return;
    var el=document.getElementById('tcm-concern-turnstile');
    try{widget=window.turnstile.render(el,{sitekey:el.dataset.sitekey,appearance:'interaction-only'});}catch(e){setError('Sicherheitsprüfung gerade nicht verfügbar. Bitte versuch es erneut.');}
  }
  function open(trigger){
    restore=trigger;
    locationInput.value=trigger.getAttribute('data-concern-location')||'';
    setError('');
    success.hidden=true;form.hidden=false;submit.disabled=false;
    modal.showModal();
    renderCaptcha();
    if(widget===null){
      var tries=0,t=setInterval(function(){
        if(!modal.open||widget!==null||++tries>30){clearInterval(t);return;}
        renderCaptcha();
      },250);
    }
    push('concern_sheet_open',{source_page:location.pathname,location_slug:trigger.getAttribute('data-concern-location-slug')||''});
    setTimeout(function(){textarea.focus({preventScroll:true});},70);
  }
  document.addEventListener('click',function(e){
    var el=e.target.closest('[data-open-concern]');
    if(el){e.preventDefault();open(el);return;}
    if(e.target.closest('[data-concern-close]')&&modal.open){modal.close();}
  });
  modal.addEventListener('click',function(e){if(e.target===modal)modal.close();});
  modal.addEventListener('close',function(){setError('');if(restore&&restore.isConnected)restore.focus({preventScroll:true});});
  form.addEventListener('submit',function(e){
    e.preventDefault();if(sending)return;
    var concern=textarea.value.trim();
    if(!concern||concern===initial||concern.length<12){setError('Bitte ergänze kurz dein persönliches Anliegen.');textarea.focus();return;}
    var phone=form.elements.telefon.value.trim(),email=form.elements.email.value.trim();
    if(!phone&&!email){setError('Bitte gib eine Telefonnummer oder E-Mail-Adresse an.');form.elements.telefon.focus();return;}
    if(phone&&!/^\+?[0-9 ()/.\-]{7,24}$/.test(phone)){setError('Bitte prüfe die Telefonnummer.');return;}
    if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){setError('Bitte prüfe die E-Mail-Adresse.');return;}
    var token=widget!==null&&window.turnstile?window.turnstile.getResponse(widget):'';
    if(!token){setError('Bitte bestätige kurz die Sicherheitsprüfung.');renderCaptcha();return;}
    setError('');sending=true;submit.disabled=true;submit.textContent='Wird gesendet…';
    var data={anfrage_typ:'kurzanliegen',quelle:'kurzanliegen-hero',formular:'Anliegen kostenlos schildern',seite:location.pathname,
      anliegen:concern,telefon:phone,email:email,standort:locationInput.value,website:form.elements.website.value,
      turnstileToken:token,zeit:new Date().toISOString()};
    fetch('/api/anfrage',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})
      .then(function(r){return r.json().catch(function(){return null;}).then(function(j){return {ok:r.ok&&j&&j.ok};});})
      .then(function(out){
        if(!out.ok)throw Error('send_failed');
        form.hidden=true;success.hidden=false;
        push('concern_sheet_submit_success',{source_page:location.pathname});
        success.focus({preventScroll:true});
      })
      .catch(function(){setError('Senden fehlgeschlagen. Bitte versuch es erneut oder ruf uns an.');if(widget!==null&&window.turnstile)window.turnstile.reset(widget);})
      .finally(function(){sending=false;submit.disabled=false;submit.innerHTML='Anliegen kostenlos senden <span aria-hidden="true">→</span>';});
  });
})();