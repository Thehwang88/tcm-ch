/* Homepage-only experiment: Hwang-like form layout with canonical TCM.ch submission.
   No new endpoint, no duplicate dataLayer events or separate validation/submission. */
(function () {
  'use strict';
  function init() {
    var card = document.querySelector('[data-kf-instance="home"]');
    if (!card || card.hasAttribute('data-home-friendly-ready')) return;
    var form = card.querySelector('[data-kf-form]');
    if (!form) return;
    var locationSelect = form.querySelector('select[name="standort"]');
    var name = form.querySelector('input[name="name"]');
    var email = form.querySelector('input[name="email"]');
    var phone = form.querySelector('input[name="telefon"]');
    var concern = form.querySelector('textarea[name="anliegen"]');
    var opts = form.querySelector('.kf-opts');
    var radios = form.querySelectorAll('input[name="terminart"]');
    if (!locationSelect || !name || !email || !phone || !concern || !opts || radios.length < 2) return;
    var fields = form.querySelector('.kf-fields');
    var emailField = email.closest('.kf-field');
    var locationField = locationSelect.closest('.kf-field');
    if (!fields || !emailField || !locationField) return;

    // Move the EXACT native clinic selector. Existing event handlers, prefills,
    // operational/partner status and data-* metadata all remain on the same node.
    emailField.insertAdjacentElement('afterend', locationField);
    var service = document.createElement('div');
    service.className = 'kf-field kf-home-service';
    service.innerHTML =
      '<label class="kf-label" for="kf-home-service">Dienstleistung <span class="kf-star" aria-hidden="true">*</span></label>' +
      '<select class="kf-input kf-select" id="kf-home-service" data-kf-service required aria-describedby="kf-home-service-err">' +
      '<option value="">Dienstleistung auswählen</option>' +
      '<option value="checkin">Gratis 30 Min. Kennenlernen</option>' +
      '<option value="behandlung">Akupunktur / TCM-Behandlung</option>' +
      '<option value="massage">Massage</option>' +
      '<option value="beratung">Ich bin unsicher – bitte beraten</option>' +
      '</select><p class="kf-ferr" id="kf-home-service-err" role="alert" hidden></p>';
    locationField.insertAdjacentElement('afterend', service);
    var serviceSelect = service.querySelector('select');
    var err = service.querySelector('.kf-ferr');
    var concernField = concern.closest('.kf-field');
    var callback = document.createElement('label');
    callback.className = 'kf-home-callback';
    callback.innerHTML =
      '<input type="checkbox" data-kf-callback>' +
      '<span>Rückruf gewünscht</span>' +
      '<small>Wir melden uns während unserer Kontaktzeiten.</small>';
    if (concernField) concernField.insertAdjacentElement('afterend', callback);

    function checkinAllowed() {
      var current = locationSelect.options[locationSelect.selectedIndex];
      // Allow the user to choose the free consultation BEFORE selecting a location.
      // After choosing a concrete clinic, its existing check-in eligibility still applies.
      return !locationSelect.value || !!(current && current.getAttribute('data-art') === 'behandlung' && current.getAttribute('data-checkin') === '1');
    }
    function updateAvailability() {
      var current = locationSelect.options[locationSelect.selectedIndex];
      var nonTreatment = !!(current && current.getAttribute('data-art') && current.getAttribute('data-art') !== 'behandlung');
      service.hidden = nonTreatment;
      var checkinOption = serviceSelect.querySelector('option[value="checkin"]');
      // Never render the offer as a disabled dropdown row. If a chosen clinic
      // does not offer check-in, show a clear inline message instead.
      checkinOption.disabled = false;
      // Gratis-Termin (Check-in) vorgewählt, gewählter Standort bietet ihn nicht an (z. B. Partnerpraxis Bottighofen):
      // auf «Ersttermin mit Behandlung» wechseln und das klar sagen; bei Wechsel zu einem Standort mit Angebot Hinweis löschen.
      if (serviceSelect.value === 'checkin' && !checkinAllowed()) {
        serviceSelect.value = 'behandlung';
        setRadio('behandlung');
        err.textContent = NA_SWITCHED;
        err.hidden = false;
      } else if (!err.hidden && err.textContent === NA_SWITCHED && checkinAllowed()) {
        err.hidden = true;
      }
    }
    var NA_SWITCHED = 'Der Gratis-Termin (30 Min.) wird an diesem Standort nicht angeboten. Wir haben «Akupunktur / TCM-Behandlung» für dich gewählt.';
    function setRadio(value) {
      radios.forEach(function (r) { r.checked = r.value === value; });
      var selected = form.querySelector('input[name="terminart"]:checked');
      // Tell the original controller to recompute its availability, offer ID and CTA.
      if (selected) selected.dispatchEvent(new Event('change', { bubbles: true }));
    }
    serviceSelect.addEventListener('change', function () {
      err.hidden = true; serviceSelect.removeAttribute('aria-invalid');
      if (serviceSelect.value === 'checkin' && !checkinAllowed()) {
        err.textContent = 'Der Gratis-Termin (30 Min.) wird an diesem Standort nicht angeboten. Bitte wähle «Akupunktur / TCM-Behandlung» oder eine andere Praxis.';
        err.hidden = false; serviceSelect.setAttribute('aria-invalid','true');
        serviceSelect.value = ''; radios.forEach(function (r) { r.checked = false; });
        return;
      }
      if (serviceSelect.value) setRadio(serviceSelect.value === 'checkin' ? 'checkin' : 'behandlung');
      else radios.forEach(function (r) { r.checked = false; });
    });
    locationSelect.addEventListener('change', function () {
      updateAvailability();
      if (!serviceSelect.value) radios.forEach(function (r) { r.checked = false; });
    });

    // Preserve marketing links that explicitly request the free check-in.
    var params = new URLSearchParams(window.location.search);
    var pref = params.get('terminart');
    if (pref === 'checkin' || pref === 'behandlung') serviceSelect.value = pref;
    else if (form.querySelector('input[name="terminart"][value="checkin"]:checked')) serviceSelect.value = 'checkin';
    else radios.forEach(function (r) { r.checked = false; });
    updateAvailability();

    // The original primary submit listener retains name/tel/email, token and
    // canonical destination validation. Here we only guard the visible select.
    form.addEventListener('submit', function (e) {
      if (service.hidden) return; // e.g. waitlist or general-routing destination
      if (serviceSelect.value) return;
      e.preventDefault(); e.stopImmediatePropagation();
      serviceSelect.setAttribute('aria-invalid', 'true');
      err.textContent = 'Bitte wähle eine Dienstleistung – auch „Ich bin unsicher“ ist möglich.';
      err.hidden = false; serviceSelect.focus();
    }, true);
    var intro = form.querySelector('.kf-kopf-sub');
    if (intro) intro.textContent = 'Wir hören zu und melden uns persönlich.';
    var heading = form.querySelector('.kf-h');
    if (heading) heading.textContent = 'Schreib uns eine Nachricht.';
    // Keep navigation via the shared controller even when a CTA preselects a service.
    new MutationObserver(function () {
      var checked = form.querySelector('input[name="terminart"]:checked');
      if (checked && serviceSelect.value !== 'massage' && serviceSelect.value !== 'beratung') {
        serviceSelect.value = checked.value;
      }
      updateAvailability();
    }).observe(card, { attributes: true, attributeFilter: ['data-kf-nav'] });
    opts.setAttribute('aria-hidden', 'true');
    radios.forEach(function (r) { r.tabIndex = -1; });
    card.setAttribute('data-kf-submit-checkin', 'Absenden');
    card.setAttribute('data-kf-submit-behandlung', 'Absenden');
    card.setAttribute('data-kf-submit-leer', 'Absenden');
    var submit = form.querySelector('[data-kf-submit]');
    if (submit) submit.innerHTML = 'Absenden <span aria-hidden="true">→</span>';
    card.setAttribute('data-home-friendly-ready', '1');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
