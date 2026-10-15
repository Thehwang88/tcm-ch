/* TCM.ch · Gemeinsames Kontaktformular (15.10.2026). Initialisiert JEDE Instanz [data-kf] einzeln (eigene IDs,
   eigener Zustand: SG-Hero und SG unten beeinflussen sich nicht). Markup: src/lib/kontakt-form.ts.
   Standort-Ziele (src/data/kontakt-angebote.mjs): jede Option trägt value (kanonisch, geht unverändert an Server/Mail),
   data-id (Standort-ID) und data-art (behandlung | vormerkung | anfrage | routing). Nicht-Behandlungsziele blenden die
   Kacheln aus und senden ihre eigene Anfrageart; Button, Bestätigung und Mail tragen dieselbe Bedeutung.
   Tracking (keine Personendaten, keine Freitexte), EIN Versandweg: window.dataLayer.push (GTM). Kein gtag-Aufruf.
   - Conversion GENAU EINMAL nach Server-Bestätigung (res.ok && data.ok), nie bei Validierungs-/Versandfehler:
       data-kf-conv="formular_senden" → {event:'formular_senden', form_type, quelle, terminart, standort}   (home.js-Vertrag)
       data-kf-conv="form_submit"     → {event:'form_submit', form_id:'terminform', herkunft, terminart, standort} (TerminForm-Vertrag)
     terminart ∈ checkin | behandlung | vormerkung | anfrage | routing; standort = Standort-ID (z. B. 'st-gallen', 'andere').
   - {event:'onedoc_click', quelle:'kontaktformular', form_instance, standort} beim OneDoc-Button
   - {event:'phone_click', quelle:'kontaktformular', form_instance, standort} beim Anruf-Button (bestehender Event-Name) */
(function () {
  'use strict';
  if (window.__kfLoaded) return; window.__kfLoaded = true;

  var SUBMIT = { '': 'Anfrage senden', checkin: 'TCM-Check-in anfragen', behandlung: 'Ersttermin anfragen', vormerkung: 'Vormerkung senden', anfrage: 'Anfrage senden', routing: 'Passende Praxis anfragen' };
  var ANGEBOT = { checkin: 'TCM_CHECKIN', behandlung: 'ERSTTERMIN_BEHANDLUNG', vormerkung: 'VORMERKUNG', anfrage: 'STANDORT_ANFRAGE', routing: 'ROUTING_ANFRAGE' };
  var ZIEL = {
    vormerkung: ['Vormerkung', 'Dieser Standort ist noch nicht eröffnet. Wir merken dich vor und melden uns, sobald dort Termine möglich sind. Eine Behandlung oder Diagnostik vor der Eröffnung ist damit nicht verbunden.'],
    anfrage: ['Anfrage', 'Der Betrieb an diesem Standort ist noch nicht bestätigt. Wir melden uns und schlagen dir eine passende Praxis in der Nähe vor.'],
    routing: ['Passende Praxis finden', 'Wir schlagen dir eine passende Praxis in deiner Nähe vor und melden uns bei dir.'],
  };
  /** Option für einen Prefill-Wert: exakter value > Label > Standort-ID (Standardziel data-default) > Altwert «<id>-<n>».
   *  Eine explizite Vorab-/Partnerpraxis-Auswahl springt so nie auf eine andere Option desselben Standorts. */
  var pickOption = function (sel, v) {
    if (!sel || !v) return -1; v = String(v).trim(); var o = sel.options, i, m;
    for (i = 1; i < o.length; i++) if (o[i].value === v) return i;
    for (i = 1; i < o.length; i++) if (o[i].text.trim() === v) return i;
    for (i = 1; i < o.length; i++) if (o[i].getAttribute('data-id') === v && o[i].getAttribute('data-default') === '1') return i;
    if ((m = v.match(/^(.+)-(\d+)$/))) { var same = [], n = +m[2]; for (i = 1; i < o.length; i++) if (o[i].getAttribute('data-id') === m[1]) same.push(i); if (same[n] != null) return same[n]; }
    return -1;
  };
  window.kfPickOption = pickOption;
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
    var fixedId = card.getAttribute('data-kf-standort-id') || '';
    var zielBox = form.querySelector('[data-kf-ziel]'); var opts = form.querySelector('.kf-opts');
    /** Gewähltes Ziel: {value (kanonisch), id, art, label}; fest = operativer Standort der Seite. */
    var target = function () {
      if (fixedName) return { value: fixedName, id: fixedId, art: 'behandlung', label: fixedName };
      var o = opt(); return o ? { value: o.value, id: o.getAttribute('data-id') || '', art: o.getAttribute('data-art') || 'behandlung', label: o.text.trim() } : null;
    };
    /** Effektive Anfrageart: Behandlungsziele → gewählte Kachel; sonst die Zielart selbst. */
    var effType = function () { var tg = target(); return tg && tg.art !== 'behandlung' ? tg.art : chosen(); };
    var standortId = function () { var tg = target(); return tg ? tg.id : ''; };
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
      var tg = target(); var nonTreat = !!(tg && tg.art !== 'behandlung');
      // Vormerkung / Standort in Prüfung / Routing: keine Check-in- oder Behandlungskacheln, Bedeutung sichtbar benannt.
      if (opts) opts.hidden = nonTreat;
      if (zielBox) {
        zielBox.hidden = !nonTreat;
        if (nonTreat) { var zt = ZIEL[tg.art] || ZIEL.anfrage; zielBox.querySelector('[data-kf-ziel-h]').textContent = zt[0] + (tg.art === 'routing' ? '' : ': ' + tg.label); zielBox.querySelector('[data-kf-ziel-t]').textContent = zt[1]; }
      }
      var t = effType();
      card.classList.toggle('kf--checkin', t === 'checkin'); card.classList.toggle('kf--behandlung', t === 'behandlung');
      radios.forEach(function (r) { var l = r.closest('.kf-opt'); if (l) l.classList.toggle('is-checked', r.checked); });
      if (submitBtn) submitBtn.innerHTML = SUBMIT[t] + ' <span aria-hidden="true">→</span>';
      // Check-in nur für freigegebene Standorte (globale Formulare: abhängig von der Auswahl).
      if (rCheckin && !fixedName) {
        var ok = checkinAllowed(); var o = opt();
        rCheckin.disabled = !ok; var tile = rCheckin.closest('.kf-opt'); if (tile) tile.classList.toggle('is-disabled', !ok);
        if (scopeNote) scopeNote.hidden = ok || !o || nonTreat;
        if (!ok && rCheckin.checked) { rCheckin.checked = false; return sync(); }
      }
      // SG-Seite (data-kf-od-mode="sg"): beide Terminarten über OneDoc; EIN Element: ohne Auswahl sekundärer Link,
      // mit Auswahl Hauptbutton. Spezifische Beschriftung nur mit verifiziertem Direktlink, sonst neutral + gemeinsame Auswahl.
      if (panel && odBtn && panel.getAttribute('data-kf-od-mode') === 'sg') {
        var direct = t ? panel.getAttribute('data-kf-od-' + t) : null;
        var odHref = direct || panel.getAttribute('data-kf-od-default');
        var anc = odBtn.getAttribute('data-kf-onedoc-anchor');
        if (!direct && anc && document.getElementById(anc)) odHref = '#' + anc; // gleiche Seite: eingebettete SG-Auswahl
        odBtn.setAttribute('href', odHref);
        odBtn.className = t ? 'kf-btn kf-btn--primary' : 'kf-link kf-od-link';
        odBtn.querySelector('[data-kf-od-label]').textContent = direct ? (t === 'checkin' ? 'Kostenlosen TCM-Check-in online buchen' : 'Ersttermin online buchen') : 'Termin online buchen';
        panel.hidden = false;
      } else
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
    var setStandort = function (v) { var i = pickOption(sel, v); if (i > 0) { sel.selectedIndex = i; return true; } return false; };
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

    // ── Kompakter SG-Hero: Rückruf-Bereich und optionale Angaben als Disclosures (ohne JS: alles offen) ──
    var rrBtn = form.querySelector('[data-kf-rr]'), rrBox = rrBtn && document.getElementById(rrBtn.getAttribute('aria-controls'));
    var optBtn = form.querySelector('[data-kf-opt]'), optBox = optBtn && document.getElementById(optBtn.getAttribute('aria-controls'));
    var setOpen = function (btn, box, open) { if (!btn || !box) return; btn.setAttribute('aria-expanded', String(open)); box.hidden = !open; };
    var openFor = function (el) { if (!el) return; if (rrBox && rrBox.contains(el)) setOpen(rrBtn, rrBox, true); if (optBox && optBox.contains(el)) setOpen(optBtn, optBox, true); };
    var telIn = form.querySelector('[name="telefon"]');
    var openRr = function (focusTel) { setOpen(rrBtn, rrBox, true); if (focusTel && telIn) setTimeout(function () { telIn.focus({ preventScroll: true }); }, 60); };
    if (rrBtn && rrBox) {
      // Vorausgefüllte optionale Angaben nie unsichtbar verstecken: dann Rückruf + optionale Angaben offen.
      var prefilled = optBox && [].some.call(optBox.querySelectorAll('input,textarea'), function (x) { return (x.value || '').trim() !== ''; });
      rrBtn.hidden = false; setOpen(rrBtn, rrBox, !!prefilled);
      if (optBtn) { optBtn.hidden = false; setOpen(optBtn, optBox, !!prefilled); }
      rrBtn.addEventListener('click', function () { setOpen(rrBtn, rrBox, rrBtn.getAttribute('aria-expanded') !== 'true'); });
      if (optBtn) optBtn.addEventListener('click', function () { setOpen(optBtn, optBox, optBtn.getAttribute('aria-expanded') !== 'true'); });
      // Anfrage-Anker dieser Karte (#offer-form, alte Kampagnenanker davor) öffnen den Rückruf-Bereich und fokussieren Telefon.
      var anchors = ['#' + card.id]; var prev = card.previousElementSibling;
      while (prev && prev.classList.contains('kf-compat-anchor')) { anchors.push('#' + prev.id); prev = prev.previousElementSibling; }
      var isOurs = function (h) { return anchors.indexOf(h) >= 0; };
      document.addEventListener('click', function (e) {
        var a = e.target && e.target.closest ? e.target.closest('a[href*="#"]') : null; if (!a) return;
        var u; try { u = new URL(a.getAttribute('href'), location.href); } catch (x) { return; }
        if (u.pathname === location.pathname && isOurs(u.hash)) openRr(true);
      });
      window.addEventListener('hashchange', function () { if (isOurs(location.hash)) openRr(true); });
      if (isOurs(location.hash) || (legacyFirst30 && ft && location.hash !== '#first30-kontakt')) openRr(isOurs(location.hash));
    }

    var toFields = form.querySelector('[data-kf-to-fields]');
    if (toFields) toFields.addEventListener('click', function (e) {
      e.preventDefault(); var f = document.getElementById('kf-' + inst + '-fields'); var tel = form.querySelector('[name="telefon"]');
      if (f) f.scrollIntoView({ behavior: 'smooth', block: 'start' }); if (tel) setTimeout(function () { tel.focus({ preventScroll: true }); }, 350);
    });
    if (odBtn) odBtn.addEventListener('click', function () { push({ event: 'onedoc_click', quelle: 'kontaktformular', form_instance: inst, standort: standortId(), terminart: effType() || 'keine' }); });
    if (telBtn) telBtn.addEventListener('click', function () { push({ event: 'phone_click', quelle: 'kontaktformular', form_instance: inst, standort: standortId() }); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (sending || sent) return;
      clearErrs();
      var hp = form.querySelector('[name="website"]'); if (hp && hp.value.trim() !== '') return; // Honeypot: still, kein Versand, kein Event
      var tg = target(); var t = effType(); var first = null; var fail = function (n, msg) { fieldErr(n, msg); if (!first) first = n; };
      if (sel && !opt()) fail('standort', 'Bitte wähle einen Standort.');
      if (!t && tg) fail('terminart', 'Bitte wähle aus, wie wir dir helfen können.');
      else if (!t) { /* Standort fehlt: Kacheln erst nach Standortwahl relevant */ }
      else if (t === 'checkin' && !checkinAllowed()) fail('terminart', 'Der kostenlose TCM-Check-in ist derzeit nur in ' + scopeNames + ' verfügbar.');
      var tel = form.querySelector('[name="telefon"]').value.trim();
      if (!tel) fail('telefon', 'Bitte gib deine Telefonnummer an.');
      else if (!phoneOk(tel)) fail('telefon', 'Bitte prüfe deine Telefonnummer (z. B. +41 79 123 45 67).');
      var em = form.querySelector('[name="email"]').value.trim();
      if (em && !emailOk(em)) fail('email', 'Bitte prüfe deine E-Mail-Adresse.');
      if (first) {
        var fe = first === 'terminart' ? (radios.filter(function (r) { return !r.disabled; })[0]) : form.querySelector('[name="' + first + '"]');
        if (fe) { openFor(fe); fe.focus(); }
        return;
      }
      var tsEl = form.querySelector('.cf-turnstile'); var tsIn = form.querySelector('[name="cf-turnstile-response"]'); var token = tsIn ? tsIn.value : '';
      if (tsEl && !token) { if (errBox) { errBox.textContent = 'Kurz bestätigen, dass du kein Roboter bist, dann nochmal senden.'; errBox.hidden = false; } return; }
      var data = {};
      [].forEach.call(form.querySelectorAll('input,textarea,select'), function (el) {
        if (!el.name || el.type === 'radio' || el.name === 'website' || el.name === 'cf-turnstile-response') return;
        var v = (el.value || '').trim(); if (v) data[el.name] = v;
      });
      // Kanonischer Zielwert (bisheriger option.value) für Server, Routing und Mail; ID separat.
      data.standort = tg.value; data.standort_id = tg.id;
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
          // EIN Versandweg (dataLayer → GTM). Bewusst kein zusätzlicher gtag('event', …): das wäre ein zweiter Versand.
          if (conv === 'form_submit') push({ event: 'form_submit', form_id: 'terminform', herkunft: data.quelle, terminart: t, standort: tg.id });
          else push({ event: 'formular_senden', form_type: data.anfrage_typ || 'allgemein', quelle: data.quelle, terminart: t, standort: tg.id });
          var ok = document.createElement('div'); ok.className = 'kf-success'; ok.setAttribute('role', 'status'); ok.tabIndex = -1;
          ok.innerHTML = '<div class="kf-success-ic" aria-hidden="true">✓</div><p class="kf-success-h">Danke, deine Anfrage ist bei uns.</p>' +
            '<p data-kf-ok-text></p><p class="kf-note">Mit deiner Anfrage ist noch kein Termin gebucht.</p>';
          var OK = {
            checkin: 'Deine Anfrage: Kostenloser TCM-Check-in in ' + tg.label + '. Wir rufen dich zur Terminvereinbarung zurück.',
            behandlung: 'Deine Anfrage: Ersttermin mit Behandlung in ' + tg.label + '. Wir rufen dich zur Terminvereinbarung zurück.',
            vormerkung: 'Deine Vormerkung: ' + tg.label + '. Wir melden uns, sobald dort Termine möglich sind.',
            anfrage: 'Deine Anfrage zu ' + tg.label + '. Wir melden uns und schlagen dir eine passende Praxis vor.',
            routing: 'Deine Anfrage für eine passende Praxis in deiner Nähe. Wir melden uns mit einem Vorschlag.',
          };
          ok.querySelector('[data-kf-ok-text]').textContent = OK[t];
          form.replaceWith(ok); ok.focus({ preventScroll: true });
        })
        .catch(function (err) {
          sending = false; form.classList.remove('is-sending');
          if (submitBtn) { submitBtn.disabled = false; sync(); }
          if (window.turnstile && tsEl) { try { window.turnstile.reset(tsEl); } catch (e3) {} }
          var code = String(err && err.message || '');
          if (errBox) {
            errBox.textContent = code === 'invalid_phone' ? 'Bitte prüfe deine Telefonnummer.' : code === 'invalid_email' ? 'Bitte prüfe deine E-Mail-Adresse.'
              : code === 'invalid_offer_scope' ? 'Diese Anfrageart ist für den gewählten Standort nicht verfügbar.'
              : code === 'invalid_standort' || code === 'missing_standort' ? 'Bitte wähle einen Standort aus der Liste.'
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
