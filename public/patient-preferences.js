/* Patient-friendly post-enquiry contact preferences.
 * Added progressively to existing patient forms. No required fields.
 * SMS opt-in is only shown for the Zurich pilot; SMS delivery is separately
 * gated server-side (TWILIO_* secrets + TCM_SMS_ENABLED).
 * Do not send any of these fields to analytics.
 */
(function () {
  'use strict';
  function isZurich(form) {
    var field = form.querySelector('[name="standort"]');
    var selected = field ? (field.value || '') : '';
    var fixed = form.closest('[data-kf-standort]');
    if (fixed) selected += ' ' + (fixed.getAttribute('data-kf-standort') || '');
    var page = location.pathname || '';
    return /(zuerich|zürich|zurich|oerlikon|höngg|hoengg)/i.test(selected) ||
      /^\/(?:en\/)?(?:akupunktur-tcm-zuerich|acupuncture-zurich)(?:\/|$)/i.test(page) ||
      /^\/(?:en\/locations|standorte)\/zuerich-/i.test(page);
  }
  function createField(tag, attrs) {
    var el = document.createElement(tag);
    Object.keys(attrs).forEach(function (k) { if (k === 'text') el.textContent = attrs[k]; else el.setAttribute(k, attrs[k]); });
    return el;
  }
  function enhance(form, index) {
    if (form.dataset.patientPreferencesReady) return;
    var submit = form.querySelector('button[type="submit"], [data-kf-submit]');
    var email = form.querySelector('[name="email"]');
    var phone = form.querySelector('[name="telefon"]');
    if (!submit || (!email && !phone)) return;
    form.dataset.patientPreferencesReady = '1';
    var en = /^en/i.test(document.documentElement.lang || '');
    var id = 'tcm-prefs-' + index;
    var panel = createField('div', {'class':'tcm-prefs'});
    var heading = createField('p', {'class':'tcm-prefs-heading',text:en?'Your preferences (optional)':'Deine Wünsche (optional)'});
    panel.appendChild(heading);
    var fields = createField('div',{'class':'tcm-prefs-grid'});
    if (!form.querySelector('[name="kontaktweg"]')) {
      var contactWrap = createField('div',{'class':'tcm-prefs-field'});
      var contactLabel = createField('label',{'for':id+'-contact',text:en?'How should we contact you?':'Wie erreichen wir dich am besten?'});
      var contact = createField('select',{'name':'kontaktweg','id':id+'-contact','class':'tcm-prefs-control'});
      [
        ['',en?'No preference':'Egal – wie bisher'],
        ['telefon',en?'Phone call':'Telefon'],
        ['email',en?'Email':'E-Mail'],
        ['whatsapp','WhatsApp']
      ].forEach(function (o) {
        var option = createField('option',{'value':o[0],text:o[1]});
        contact.appendChild(option);
      });
      contactWrap.appendChild(contactLabel);contactWrap.appendChild(contact);fields.appendChild(contactWrap);
    }
    if (!form.querySelector('[name="wunschzeit"]')) {
      var timeWrap = createField('div',{'class':'tcm-prefs-field'});
      timeWrap.appendChild(createField('label',{'for':id+'-time',text:en?'Preferred days / times':'Passende Tage oder Uhrzeiten'}));
      timeWrap.appendChild(createField('input',{'type':'text','id':id+'-time','class':'tcm-prefs-control','name':'wunschzeit','maxlength':'160','autocomplete':'off',
        'placeholder':en?'e.g. Tue after 4 pm, Fri morning':'z. B. Di nach 16 Uhr, Fr Vormittag'}));
      fields.appendChild(timeWrap);
    }
    if (fields.children.length) panel.appendChild(fields);

    // Only Zurich users with a phone number can opt in to one service SMS.
    // No prechecked consent and no impact on form submission if declined.
    var sms = createField('label',{'class':'tcm-prefs-sms','hidden':''});
    var cb = createField('input',{'type':'checkbox','name':'sms_einwilligung','value':'ja'});
    var caption = createField('span',{text:en
      ? 'Yes, send me one SMS confirming this enquiry (no marketing).'
      : 'Ja, ich möchte eine einmalige SMS-Bestätigung erhalten (keine Werbung).'});
    sms.appendChild(cb);sms.appendChild(caption);panel.appendChild(sms);
    var note = createField('p',{'class':'tcm-prefs-note',text:en
      ? 'Optional, only for arranging this enquiry. For WhatsApp please avoid medical details.'
      : 'Freiwillig, nur zur Koordination dieser Anfrage. Bitte über WhatsApp keine medizinischen Details senden.'});
    panel.appendChild(note);
    function sync() {
      var zh = isZurich(form);
      sms.hidden = !zh;
      if (!zh) cb.checked = false;
    }
    if (!fields.children.length) heading.hidden = true;
    var target = submit.closest('.kf-submit-wrap, .kf-actions, .form-actions, .ev-actions') || submit;
    target.parentNode.insertBefore(panel,target);
    form.addEventListener('change',sync);
    sync();
  }
  function boot() {
    var forms = document.querySelectorAll('form[data-kf-form],form[data-contact-form],form.ev-form');
    Array.prototype.forEach.call(forms,enhance);
  }
  window.tcmPatientPreferencesInit = boot;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',boot);
  else boot();
})();
