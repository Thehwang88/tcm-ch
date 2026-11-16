/* Shared, accessible success dialog for confirmed TCM.ch patient enquiries.
 * Presentation only: no submit handler, no conversion tracking, no redirects.
 * Call only after POST /api/anfrage returns HTTP 2xx + {ok:true}.
 */
(function () {
  'use strict';
  if (window.tcmPatientSuccess) return;
  var dialog = null;
  var lastFocus = null;

  function create() {
    if (dialog) return dialog;
    dialog = document.createElement('dialog');
    dialog.id = 'tcm-patient-success';
    dialog.className = 'tcm-patient-success';
    dialog.setAttribute('aria-labelledby', 'tcm-success-title');
    dialog.setAttribute('aria-describedby', 'tcm-success-summary');
    dialog.innerHTML =
      '<div class="tps-panel">' +
        '<button class="tps-close" type="button" data-tps-close aria-label="Schliessen">×</button>' +
        '<img class="tps-logo" src="/images/logo/tcm-ch-logo-kliniken-black.svg" alt="TCM.ch Kliniken" width="150" height="52">' +
        '<div class="tps-check" aria-hidden="true"><svg viewBox="0 0 24 24" width="25" height="25" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5 10 17l9-10"/></svg></div>' +
        '<h2 id="tcm-success-title" class="tps-title" tabindex="-1" data-tps-title></h2>' +
        '<p id="tcm-success-summary" class="tps-summary" data-tps-summary></p>' +
        '<div class="tps-next"><span class="tps-next-label" data-tps-next-label></span><p data-tps-email hidden></p><p data-tps-followup></p></div>' +
        '<p class="tps-prompt" data-tps-prompt></p>' +
        '<div class="tps-contact">' +
          '<a data-tps-wa href="https://wa.me/41775236122" target="_blank" rel="noopener noreferrer"></a>' +
          '<a data-tps-tel href="tel:+41775236122"></a>' +
        '</div>' +
        '<button class="tps-done" type="button" data-tps-close data-tps-done></button>' +
      '</div>';
    document.body.appendChild(dialog);
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog || (event.target.closest && event.target.closest('[data-tps-close]'))) {
        dialog.close();
      }
    });
    dialog.addEventListener('close', function () {
      if (lastFocus && lastFocus.isConnected) {
        try { lastFocus.focus({ preventScroll: true }); } catch (_) {}
      }
      lastFocus = null;
    });
    return dialog;
  }

  function show(opts) {
    if (!document.body) return false;
    opts = opts || {};
    var d = create();
    var en = opts.lang === 'en' || (!opts.lang && /^en/i.test(document.documentElement.lang || ''));
    var waitlist = opts.kind === 'waitlist';
    var hasPhone = opts.hasPhone !== false;
    var emailSent = opts.emailSent === true;
    lastFocus = document.activeElement;
    var set = function (selector, value) {
      var el = d.querySelector(selector);
      if (el) el.textContent = value;
    };
    set('[data-tps-title]', en ? (waitlist ? 'Thank you. You are on the list.' : 'Thank you. We received your enquiry.') :
      (waitlist ? 'Danke! Deine Vormerkung ist eingegangen.' : 'Danke! Deine Anfrage ist eingegangen.'));
    set('[data-tps-summary]', en ? (waitlist
      ? 'We will contact you when appointments become available at this location.'
      : 'Our patient service team will contact you as soon as possible. Your appointment is not confirmed yet.')
      : (waitlist
      ? 'Wir melden uns, sobald an diesem Standort Termine verfügbar werden.'
      : 'Unser Patientenservice meldet sich schnellstmöglich persönlich bei dir. Ein Termin ist noch nicht verbindlich gebucht.'));

    var email = d.querySelector('[data-tps-email]');
    email.hidden = !emailSent;
    if (emailSent) email.textContent = en
      ? 'We sent a confirmation email. Please check your inbox (and spam folder).'
      : 'Wir haben dir eine Bestätigung per E-Mail geschickt. Bitte prüfe auch deinen Spam-Ordner.';
    set('[data-tps-followup]', en
      ? (waitlist ? 'There is nothing else you need to do.' : hasPhone
        ? 'Carlos will try to reach you by phone at +41 77 523 61 22.'
        : 'You can reply directly to the confirmation email.')
      : (waitlist ? 'Du musst vorerst nichts weiter unternehmen.' : hasPhone
        ? 'Carlos versucht, dich unter +41 77 523 61 22 telefonisch zu erreichen.'
        : 'Du kannst uns auch direkt per E-Mail oder WhatsApp schreiben.'));
    set('[data-tps-prompt]', en
      ? (waitlist ? 'Any questions? We are happy to help.' : emailSent
        ? 'Want to speed things up? Simply reply to the email with 2–3 suitable days or times.'
        : 'To speed things up, you can send us 2–3 suitable days or times on WhatsApp.')
      : (waitlist ? 'Fragen? Wir helfen dir gerne weiter.' : emailSent
        ? 'Du möchtest es beschleunigen? Antworte auf die E-Mail mit 2–3 passenden Tagen oder Uhrzeiten.'
        : 'Du möchtest es beschleunigen? Schicke uns gerne 2–3 passende Tage oder Uhrzeiten per WhatsApp.'));
    set('[data-tps-wa]', en ? 'Write on WhatsApp' : 'Per WhatsApp schreiben');
    set('[data-tps-tel]', en ? 'Call us' : 'Direkt anrufen');
    set('[data-tps-done]', en ? 'Got it' : 'Alles klar');
    set('[data-tps-next-label]', en ? 'Next steps' : 'Nächste Schritte');
    var close = d.querySelector('.tps-close');
    if (close) close.setAttribute('aria-label', en ? 'Close' : 'Schliessen');

    // A form can be hosted in the booking or concern dialog. Close it first,
    // restoring the original form DOM, then present the receipt in the top layer.
    var booking = document.getElementById('tcm-booking-sheet');
    var concern = document.getElementById('tcm-concern-sheet');
    if (booking && booking.open) booking.close();
    if (concern && concern.open) concern.close();
    var reveal = function () {
      if (d.open) return;
      try { d.showModal(); }
      catch (_) { d.setAttribute('open', ''); }
      var title = d.querySelector('[data-tps-title]');
      if (title) { try { title.focus({ preventScroll: true }); } catch (_) {} }
    };
    if (window.requestAnimationFrame) window.requestAnimationFrame(reveal);
    else reveal();
    return true;
  }

  window.tcmPatientSuccess = { show: show };
})();
