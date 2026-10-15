/* TCM.ch · Gemeinsames Kontaktformular (15.10.2026). Initialisiert JEDE Instanz [data-kf] einzeln (eigene IDs,
   eigener Zustand: SG-Hero und SG unten beeinflussen sich nicht). Markup: src/lib/kontakt-form.ts.
   Tracking (keine Personendaten, keine Freitexte):
   - Conversion GENAU EINMAL nach Server-Bestätigung (res.ok && data.ok), nie bei Validierungs-/Versandfehler:
       data-kf-conv="formular_senden" → {event:'formular_senden', form_type, quelle, terminart, standort}   (home.js-Vertrag)
       data-kf-conv="form_submit"     → {event:'form_submit', form_id:'terminform', herkunft, terminart, standort} (TerminForm-Vertrag)
   - {event:'onedoc_click', quelle:'kontaktformular', form_instance, standort} beim OneDoc-Button
   - {event:'phone_click', quelle:'kontaktformular', form_instance, standort} beim Anruf-Button (bestehender Event-Name) */
(function () {
  'use strict';
  if (window.__kfLoaded) return; window.__kfLoaded = true;

  var SUBMIT = { '': 'Anfrage senden', checkin: 'TCM-Check-in anfragen', behandlung: 'Ersttermin anfragen' };
  var ANGEBOT = { checkin: 'TCM_CHECKIN', behandlung: 'ERSTTERMIN_BEHANDLUNG' };
  var phoneOk = function (s) { var t = String(s || '').trim(); var d = t.replace(/\D/g, ''); return /^\+?[0-9 ()\/.\-]{7,24}$/.test(t) && d.length >= 7 && d.length <= 15; };
  var emailOk = function (s) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(s || '').trim()); };
  var push = function (o) { try { window.dataLayer = window.dataLayer || []; window.dataLayer.push(o); } catch (e) {} };
  var qs = function () { try { return new URLSearchParams(location.search); } catch (e) { return { get: function () { return null; } }; } };
  var titleCase = function (slug) { return slug.split('-').map(function (p) { p = p.replace(/ue/g, 'ü').replace(/oe/g, 'ö').replace(/ae/g, 'ä'); return p.charAt(0).toUpperCase() + p.slice(1); }).join(' '); };

  function init(card) {
    if (card.dataset.kfInit) return; card.dataset.kfInit = '1';
    var form = card.querySelector('[data-kf-form]'); if (!form) return;
    var inst = card.getAttribute('data-kf-instance') || 'kf';
    var conv = card.getAttribute('data-kf-conv') || 'formular_senden';
    var fixedName = card.getAttribute('data-kf-standort') || '';
    var fixedCheckin = card.getAttribute('data-kf-checkin') === '1';
    var scopeNames = card.getAttribute('data-kf-scope-names') || 'St. Gallen';
    var sel = form.querySelector('select[name="standort"]');
    var radios = [].slice.call(form.querySelectorAll('input[name="terminart"]'));
    var rCheckin = form.querySelector('input[name="terminart"][value="checkin"]');
    var submitBtn = form.querySelector('[data-kf-submit]');
    var panel = form.querySelector('[data-kf-onedoc-panel]');
    var odBtn = form.querySelector('[data-kf-onedoc]');
    var scopeNote = form.querySelector('[data-kf-scope-note]');
    var errBox = form.querySelector('[data-kf-err]');
    var telBtn = card.querySelector('[data-kf-tel]'); var telText = card.querySelector('[data-kf-tel-text]');
    var sending = false, sent = false;

    var chosen = function () { var r = radios.filter(function (x) { return x.checked; })[0]; return r ? r.value : ''; };
    var opt = function () { return sel && sel.selectedIndex > 0 ? sel.options[sel.selectedIndex] : null; };
    var standortLabel = function () { if (fixedName) return fixedName; var o = opt(); return o ? o.text.trim() : ''; };
    var checkinAllowed = function () { if (fixedName) return fixedCheckin; var o = opt(); return !o || o.getAttribute('data-checkin') === '1'; };

    function fieldErr(name, msg) {
      var el = name === 'terminart' ? form.querySelector('.kf-opts') : form.querySelector('[name="' + name + '"]');
      var id = name === 'terminart' ? 'ta' : name === 'telefon' ? 'tel' : name;
      var box = document.getElementById('kf-' + inst + '-' + id + '-err');
      if (el && name !== 'terminart') { if (msg) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid'); }
      if (box) { box.textContent = msg || ''; box.hidden = !msg; }
    }
    function clearErrs() { ['terminart', 'standort', 'telefon', 'email'].forEach(function (n) { fieldErr(n, ''); }); if (errBox) errBox.hidden = true; }

    function sync() {
      var t = chosen();
      card.classList.toggle('kf--checkin', t === 'checkin'); card.classList.toggle('kf--behandlung', t === 'behandlung');
      radios.forEach(function (r) { var l = r.closest('.kf-opt'); if (l) l.classList.toggle('is-checked', r.checked); });
      if (submitBtn) submitBtn.innerHTML = SUBMIT[t] + ' <span aria-hidden="true">→</span>';
      // Check-in nur für freigegebene Standorte (globale Formulare: abhängig von der Auswahl).
      if (rCheckin && !fixedName) {
        var ok = checkinAllowed(); var o = opt();
        rCheckin.disabled = !ok; var tile = rCheckin.closest('.kf-opt'); if (tile) tile.classList.toggle('is-disabled', !ok);
        if (scopeNote) scopeNote.hidden = ok || !o;
        if (!ok && rCheckin.checked) { rCheckin.checked = false; return sync(); }
      }
      // OneDoc nur bei «Ersttermin mit Behandlung» UND passendem, verifiziertem Kalender (global: erst nach Standortwahl).
      if (panel && odBtn) {
        var href = '';
        if (t === 'behandlung') {
          if (fixedName) href = odBtn.getAttribute('href');
          else { var oo = opt(); href = oo ? oo.getAttribute('data-onedoc') || '' : ''; }
        }
        var anchor = odBtn.getAttribute('data-kf-onedoc-anchor');
        if (href && anchor && document.getElementById(anchor)) href = '#' + anchor; // gleiche Seite: eingebettetes Widget
        if (href) odBtn.setAttribute('href', href);
        panel.hidden = !href;
      }
      // Anrufen: Nummer des gewählten Standorts (global), sonst zentrale Terminkoordination.
      if (sel && telBtn && telText) {
        var to = opt(); var tel = (to && to.getAttribute('data-tel')) || telBtn.getAttribute('data-kf-tel-default') || telText.textContent;
        if (!telBtn.getAttribute('data-kf-tel-default')) telBtn.setAttribute('data-kf-tel-default', telText.textContent);
        telText.textContent = tel; telBtn.setAttribute('href', 'tel:' + tel.replace(/[^\d+]/g, ''));
      }
    }
    radios.forEach(function (r) { r.addEventListener('change', function () { fieldErr('terminart', ''); sync(); }); });
    if (sel) sel.addEventListener('change', function () { fieldErr('standort', ''); sync(); });

    // ── Prefill (einmalig beim Laden; spätere Kachelwechsel überschreiben keine Eingaben) ──
    var q = qs();
    var setStandort = function (v) {
      if (!sel || !v) return false;
      for (var i = 0; i < sel.options.length; i++) { var o = sel.options[i]; if (o.value === v || o.text.trim() === v || o.getAttribute('data-id') === v) { sel.selectedIndex = i; return true; } }
      return false;
    };
    if (sel && !opt()) setStandort(q.get('standort'));
    var explicit = q.get('terminart');
    var legacyFirst30 = q.get('first30') === '1' || /^#first30(-kontakt)?$/.test(location.hash);
    if (legacyFirst30) {
      // Alte FIRST-30-Links: Angebot beendet. Übergang sichtbar machen, Nachfolger nur wo freigegeben vorwählen.
      var ft = (location.hash === '#first30-kontakt') ? inst === 'sg-unten' : (inst === 'sg-hero' || !document.querySelector('[data-kf-instance="sg-hero"]'));
      if (ft) {
        var n = document.createElement('p'); n.className = 'kf-transition'; n.setAttribute('role', 'status');
        n.textContent = 'Das FIRST-30-Angebot ist beendet. Neu für dich: der kostenlose TCM-Check-in.';
        form.insertBefore(n, form.querySelector('.kf-intro').nextSibling);
        if (!explicit) explicit = 'checkin';
      }
    }
    if (explicit === 'checkin' || explicit === 'behandlung') {
      var r0 = form.querySelector('input[name="terminart"][value="' + explicit + '"]');
      if (r0 && !radios.some(function (x) { return x.checked; })) { r0.checked = true; }
    }
    if (card.getAttribute('data-kf-autoprefill') === 'terminform') {
      // Port aus TerminForm.astro: 1. data-prefill (Anliegen), 2. ?von=, 3. same-origin Referrer.
      var ta = form.querySelector('textarea[name="anliegen"]'); var qh = form.querySelector('input[name="quelle"]');
      // Prop-Prefill steht bereits (build-time) im Feld → Herkunft = aktuelle Seite (wie bisher).
      var hasPf = !!(ta && ta.defaultValue);
      var herkunft = location.pathname, von = hasPf ? null : q.get('von');
      if (!hasPf && !von && document.referrer) { try { var rr = new URL(document.referrer); if (rr.origin === location.origin && rr.pathname !== location.pathname) von = rr.pathname; } catch (e) {} }
      if (von) herkunft = von;
      var ortName = function (slug) { return setStandort(slug) && opt() ? opt().text.trim() : titleCase(slug); };
      var m, txt = '';
      if (von) {
        if ((m = von.match(/^\/standorte\/([a-z-]+)\/?/))) { txt = 'Ich möchte gerne einen Termin in ' + ortName(m[1]) + ' anfragen.'; }
        else if ((m = von.match(/^\/beschwerden\/([a-z-]+)\/?/))) txt = 'Ich habe Beschwerden im Bereich ' + titleCase(m[1]) + ' und möchte gerne einen Termin anfragen.';
        else if ((m = von.match(/^\/therapien\/(?:[a-z-]+\/)*([a-z-]+)\/?$/))) txt = 'Ich interessiere mich für ' + titleCase(m[1]) + ' und möchte gerne einen Termin anfragen.';
        else if ((m = von.match(/^\/massage-([a-z-]+)\/?/))) { txt = 'Ich möchte gerne einen Massage-Termin in ' + ortName(m[1]) + ' anfragen.'; }
        else if ((m = von.match(/^\/akupunktur-(?:tcm-)?([a-z-]+?)(?:-kosten)?\/?$/))) { txt = 'Ich möchte gerne einen Akupunktur-Termin in ' + ortName(m[1]) + ' anfragen.'; }
      }
      if (!txt && !hasPf) txt = 'Ich möchte gerne einen Termin anfragen.';
      if (ta && txt && !ta.value) ta.value = txt;
      if (!qh) { qh = document.createElement('input'); qh.type = 'hidden'; qh.name = 'quelle'; form.appendChild(qh); }
      if (!qh.value) qh.value = herkunft;
    }
    // CARE: über welchen CTA das Formular erreicht wurde (nur vordefinierte Positions-Strings, nie Nutzertext).
    document.addEventListener('click', function (e) {
      var el = e.target && e.target.closest ? e.target.closest('[data-care-cta]') : null;
      var cp = form.querySelector('input[name="cta_pos"]'); if (el && cp) cp.value = el.getAttribute('data-care-cta') || '';
    });
    sync();

    var toFields = form.querySelector('[data-kf-to-fields]');
    if (toFields) toFields.addEventListener('click', function (e) {
      e.preventDefault(); var f = document.getElementById('kf-' + inst + '-fields'); var tel = form.querySelector('[name="telefon"]');
      if (f) f.scrollIntoView({ behavior: 'smooth', block: 'start' }); if (tel) setTimeout(function () { tel.focus({ preventScroll: true }); }, 350);
    });
    if (odBtn) odBtn.addEventListener('click', function () { push({ event: 'onedoc_click', quelle: 'kontaktformular', form_instance: inst, standort: standortLabel() }); });
    if (telBtn) telBtn.addEventListener('click', function () { push({ event: 'phone_click', quelle: 'kontaktformular', form_instance: inst, standort: standortLabel() }); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (sending || sent) return;
      clearErrs();
      var hp = form.querySelector('[name="website"]'); if (hp && hp.value.trim() !== '') return; // Honeypot: still, kein Versand, kein Event
      var t = chosen(); var first = null; var fail = function (n, msg) { fieldErr(n, msg); if (!first) first = n; };
      if (sel && !opt()) fail('standort', 'Bitte wähle einen Standort.');
      if (!t) fail('terminart', 'Bitte wähle aus, wie wir dir helfen können.');
      else if (t === 'checkin' && !checkinAllowed()) fail('terminart', 'Der kostenlose TCM-Check-in ist derzeit nur in ' + scopeNames + ' verfügbar.');
      var tel = form.querySelector('[name="telefon"]').value.trim();
      if (!tel) fail('telefon', 'Bitte gib deine Telefonnummer an.');
      else if (!phoneOk(tel)) fail('telefon', 'Bitte prüfe deine Telefonnummer (z. B. +41 79 123 45 67).');
      var em = form.querySelector('[name="email"]').value.trim();
      if (em && !emailOk(em)) fail('email', 'Bitte prüfe deine E-Mail-Adresse.');
      if (first) {
        var fe = first === 'terminart' ? (radios.filter(function (r) { return !r.disabled; })[0]) : form.querySelector('[name="' + first + '"]');
        if (fe) fe.focus();
        return;
      }
      var tsEl = form.querySelector('.cf-turnstile'); var tsIn = form.querySelector('[name="cf-turnstile-response"]'); var token = tsIn ? tsIn.value : '';
      if (tsEl && !token) { if (errBox) { errBox.textContent = 'Kurz bestätigen, dass du kein Roboter bist, dann nochmal senden.'; errBox.hidden = false; } return; }
      var data = {};
      [].forEach.call(form.querySelectorAll('input,textarea,select'), function (el) {
        if (!el.name || el.type === 'radio' || el.name === 'website' || el.name === 'cf-turnstile-response') return;
        var v = (el.value || '').trim(); if (v) data[el.name] = v;
      });
      data.standort = standortLabel();
      data.angebot_id = ANGEBOT[t];
      if (!data.quelle) data.quelle = location.pathname || '/';
      if (!data.seite) data.seite = location.pathname;
      if (data.cta_pos && data.quelle_detail) data.quelle_detail += ' · CTA: ' + data.cta_pos;
      delete data.cta_pos;
      data.zeit = new Date().toISOString();
      data.turnstileToken = token;
      sending = true; form.classList.add('is-sending');
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Wird gesendet…'; }
      fetch('/api/anfrage', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then(function (r) { return r.json().catch(function () { return null; }).then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) {
          if (!(res.ok && res.j && res.j.ok)) throw new Error((res.j && res.j.error) || 'bad_status');
          sent = true;
          if (conv === 'form_submit') {
            push({ event: 'form_submit', form_id: 'terminform', herkunft: data.quelle, terminart: t, standort: data.standort });
            if (typeof window.gtag === 'function') { try { window.gtag('event', 'form_submit', { form_id: 'terminform', herkunft: data.quelle }); } catch (e2) {} }
          } else {
            push({ event: 'formular_senden', form_type: data.anfrage_typ || 'allgemein', quelle: data.quelle, terminart: t, standort: data.standort });
          }
          var ok = document.createElement('div'); ok.className = 'kf-success'; ok.setAttribute('role', 'status'); ok.tabIndex = -1;
          ok.innerHTML = '<div class="kf-success-ic" aria-hidden="true">✓</div><p class="kf-success-h">Danke, deine Anfrage ist bei uns.</p>' +
            '<p data-kf-ok-text></p><p class="kf-note">Mit deiner Anfrage ist noch kein Termin gebucht.</p>';
          var ort = data.standort && data.standort.indexOf('Andere') !== 0 ? ' in ' + data.standort : '';
          ok.querySelector('[data-kf-ok-text]').textContent = 'Deine Anfrage: ' + (t === 'checkin' ? 'Kostenloser TCM-Check-in' : 'Ersttermin mit Behandlung') + ort + '. Wir rufen dich zur Terminvereinbarung zurück.';
          form.replaceWith(ok); ok.focus({ preventScroll: true });
        })
        .catch(function (err) {
          sending = false; form.classList.remove('is-sending');
          if (submitBtn) { submitBtn.disabled = false; sync(); }
          if (window.turnstile && tsEl) { try { window.turnstile.reset(tsEl); } catch (e3) {} }
          var code = String(err && err.message || '');
          if (errBox) {
            errBox.textContent = code === 'invalid_phone' ? 'Bitte prüfe deine Telefonnummer.' : code === 'invalid_email' ? 'Bitte prüfe deine E-Mail-Adresse.'
              : code === 'invalid_offer_scope' ? 'Der kostenlose TCM-Check-in ist für diesen Standort nicht verfügbar.'
              : 'Das hat gerade nicht geklappt. Bitte versuch es nochmals oder ruf uns an.';
            errBox.hidden = false;
          }
        });
    });
  }

  function boot() { [].forEach.call(document.querySelectorAll('[data-kf]'), init); }
  window.kfInit = boot;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
