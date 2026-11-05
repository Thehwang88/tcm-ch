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

  var monatsende = function () {
    var p = {}; try { new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Zurich', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; }); } catch (e) { var d = new Date(); p = { year: d.getFullYear(), month: ('0' + (d.getMonth() + 1)).slice(-2) }; }
    var last = new Date(Date.UTC(+p.year, +p.month, 0)).getUTCDate();
    return ('0' + last).slice(-2) + '.' + p.month + '.';
  };
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
    // Ruhig global (Homepage): Überschrift «Terminart wählen» und Alternativen-Block unter dem Anfragebutton.
    var taH = form.querySelector('[data-kf-ta-h]'); var altWrap = form.querySelector('[data-kf-alt-wrap]');
    var ruhig = card.classList.contains('kf--ruhig');
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
    function clearErrs() { ['terminart', 'standort', 'name', 'telefon', 'email'].forEach(function (n) { fieldErr(n, ''); }); if (errBox) errBox.hidden = true; }

    function sync() {
      var tg = target(); var nonTreat = !!(tg && tg.art !== 'behandlung');
      // Vormerkung / Standort in Prüfung / Routing: keine Check-in- oder Behandlungskacheln, Bedeutung sichtbar benannt.
      if (opts) opts.hidden = nonTreat;
      if (taH) taH.hidden = nonTreat;
      if (zielBox) {
        zielBox.hidden = !nonTreat;
        if (nonTreat) { var zt = ZIEL[tg.art] || ZIEL.anfrage; zielBox.querySelector('[data-kf-ziel-h]').textContent = zt[0] + (tg.art === 'routing' ? '' : ': ' + tg.label); zielBox.querySelector('[data-kf-ziel-t]').textContent = zt[1]; }
      }
      // Zielhinweis der gewählten Option (data-hinweis, z. B. Partnerpraxis Hwang).
      var zh = form.querySelector('[data-kf-ziel-hinweis]'); if (zh) { var zo = opt(); var zt = zo ? zo.getAttribute('data-hinweis') || '' : ''; zh.textContent = zt; zh.hidden = !zt; }
      var t = effType();
      card.classList.toggle('kf--checkin', t === 'checkin'); card.classList.toggle('kf--behandlung', t === 'behandlung');
      radios.forEach(function (r) { var l = r.closest('.kf-opt'); if (l) l.classList.toggle('is-checked', r.checked); });
      // Kampagnen-Sheet (data-kf-submit-<terminart>): eigener Button-Text je Terminart; sonst Standardtexte.
      if (submitBtn) submitBtn.innerHTML = (t ? card.getAttribute('data-kf-submit-' + t) || SUBMIT[t] : card.getAttribute('data-kf-submit-leer') || SUBMIT['']) + ' <span aria-hidden="true">→</span>';
      // Check-in zuerst: «Buchung bis <Monatsende>» (Europe/Zurich, rollierend), nur solange das Ziel den Check-in anbietet.
      var gh = form.querySelector('[data-kf-gueltig]');
      if (gh) { var gb = gh.querySelector('[data-kf-gueltig-bis]'); if (gb && !gb.textContent) gb.textContent = monatsende(); gh.hidden = nonTreat || !checkinAllowed(); }
      // Check-in nur für freigegebene Standorte (globale Formulare: abhängig von der Auswahl).
      if (rCheckin && !fixedName) {
        var ok = checkinAllowed(); var o = opt();
        rCheckin.disabled = !ok; var tile = rCheckin.closest('.kf-opt'); if (tile) tile.classList.toggle('is-disabled', !ok);
        // Ruhig: nicht freigegebene Ziele zeigen die Check-in-Kachel gar nicht (keine Gratis-Diagnostik suggerieren).
        if (tile && ruhig) tile.hidden = !ok;
        // Freigegebener Standort gewählt (data-checkin="1") → 360°-Wortlaut (TCM 360°-Check-in); sonst bisheriger Wortlaut. Klassifikation unverändert.
        if (tile && tile.hasAttribute('data-kf-360-t')) {
          var sel360 = !!(o && o.getAttribute('data-checkin') === '1');
          ['t', 'dur', 'd', 'note'].forEach(function (k) {
            var el = tile.querySelector('.kf-opt-' + k); if (!el) return;
            if (!el.hasAttribute('data-kf-std')) el.setAttribute('data-kf-std', el.textContent);
            var want = sel360 ? tile.getAttribute('data-kf-360-' + k) : el.getAttribute('data-kf-std');
            if (el.textContent !== want) el.textContent = want;
          });
        }
        if (scopeNote) scopeNote.hidden = ok || !o || nonTreat;
        // Gewählter Check-in am neuen Ziel nicht verfügbar: Auswahl lösen, Hinweis zeigen, NIE still durch den Ersttermin ersetzen.
        if (!ok && rCheckin.checked) { rCheckin.checked = false; if (byDefault && rBeh && usable(rBeh)) rBeh.checked = true; else noDefault = true; return sync(); }
      }
      // SG-Seite (data-kf-od-mode="sg"): beide Terminarten über OneDoc; EIN Element: ohne Auswahl sekundärer Link,
      // mit Auswahl Hauptbutton. Spezifische Beschriftung nur mit verifiziertem Direktlink, sonst neutral + gemeinsame Auswahl.
      if (panel && odBtn && panel.getAttribute('data-kf-od-mode') === 'sg') {
        var direct = t ? panel.getAttribute('data-kf-od-' + t) : null;
        var odHref = direct || panel.getAttribute('data-kf-od-default');
        var anc = odBtn.getAttribute('data-kf-onedoc-anchor');
        if (!direct && anc && document.getElementById(anc)) odHref = '#' + anc; // gleiche Seite: eingebettete SG-Auswahl
        odBtn.setAttribute('href', odHref);
        // Kompakter SG-Hero: OneDoc immer sekundär (Anfrage-Button ist die einzige gefüllte Hauptaktion).
        odBtn.className = panel.hasAttribute('data-kf-od-sekundaer') ? 'kf-btn kf-btn--outline' : t ? 'kf-btn kf-btn--primary' : 'kf-link kf-od-link';
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
      // Ruhig: Alternativen (global erst mit gewähltem Ziel); Anrufen = kanonische Nummer des Ziels bzw. festen Standorts,
      // WhatsApp nur bei identischer Nummer; Block nur, wenn OneDoc oder Anrufen verfügbar ist.
      if (altWrap) {
        var ao = opt(), at = fixedName ? altWrap.getAttribute('data-kf-alt-tel') || '' : ao ? ao.getAttribute('data-tel') || '' : '', altRow = altWrap.querySelector('[data-kf-kontakt-alt]');
        if (telBtn && at) telBtn.setAttribute('href', 'tel:' + at.replace(/[^\d+]/g, ''));
        var waA = altWrap.querySelector('[data-kf-wa]'), waOk = !!(waA && at && waA.getAttribute('data-kf-wa') === at.replace(/\D/g, ''));
        if (waA) { waA.hidden = !waOk; var wsep = altWrap.querySelector('[data-kf-wa-sep]'); if (wsep) wsep.hidden = !waOk; }
        if (altRow) altRow.hidden = !at;
        altWrap.hidden = !at && (!panel || panel.hidden);
      }
      // Anrufen: Nummer des gewählten Standorts (global), sonst zentrale Terminkoordination.
      if (sel && telBtn && telText) {
        var to = opt(); var tel = (to && to.getAttribute('data-tel')) || telBtn.getAttribute('data-kf-tel-default') || telText.textContent;
        if (!telBtn.getAttribute('data-kf-tel-default')) telBtn.setAttribute('data-kf-tel-default', telText.textContent);
        telText.textContent = tel; telBtn.setAttribute('href', 'tel:' + tel.replace(/[^\d+]/g, ''));
      }
    }
    // Vorauswahl (05.11.2026): frisches Formular → «Ersttermin mit Behandlung», sofern angeboten. Rein visuell/inhaltlich:
    // kein change-Event, kein dataLayer-Event. noDefault: ein nicht mehr verfügbarer Check-in wird nicht ersetzt.
    var rBeh = form.querySelector('input[name="terminart"][value="behandlung"]');
    // Angebotsseiten (data-kf-default="checkin", SG): kostenloser Check-in als Standard; sonst Ersttermin mit Behandlung.
    var rDef = form.querySelector('input[name="terminart"][value="' + (card.getAttribute('data-kf-default') || 'behandlung') + '"]') || rBeh;
    var noDefault = false;
    var usable = function (r) { var l = r && r.closest('.kf-opt'); return !!(r && !r.disabled && !(l && l.hidden)); };
    // byDefault: aktuelle Auswahl stammt aus der Vorauswahl (keine Nutzerwahl, kein ?terminart=); nur dann darf sie beim
    // Zielwechsel still auf den Ersttermin wechseln bzw. zurück auf den Check-in (globale Check-in-zuerst-Formulare, /kontakt/).
    var byDefault = false;
    var applyDefault = function () {
      if (noDefault || !usable(rDef)) return;
      if (!radios.some(function (x) { return x.checked; })) { rDef.checked = true; byDefault = true; }
      else if (byDefault && !rDef.checked) { radios.forEach(function (x) { x.checked = false; }); rDef.checked = true; }
    };
    // Expliziter Check-in-Wunsch, der hier nicht verfügbar ist: KEINE (kostenpflichtige) Auswahl als scheinbare Erfüllung
    // stehen lassen. Auswahl lösen, Standard sperren (noDefault), Hinweis zeigen; Eingaben bleiben. Hinweis: globale Formulare
    // zeigen den bestehenden Standort-Hinweis (scopeNote), Formulare mit festem Standort den Hinweis an der Auswahl.
    var checkinNA = 'Der kostenlose TCM-Check-in ist derzeit nur in ' + scopeNames + ' verfügbar. Bitte wähle eine Terminart.';
    var blockWish = function () {
      radios.forEach(function (x) { x.checked = false; }); noDefault = true; sync();
      if (!(scopeNote && !scopeNote.hidden)) fieldErr('terminart', checkinNA);
    };
    radios.forEach(function (r) { r.addEventListener('change', function () { noDefault = false; byDefault = false; fieldErr('terminart', ''); sync(); }); });
    if (sel) sel.addEventListener('change', function () { fieldErr('standort', ''); sync(); applyDefault(); sync(); });

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
    // Expliziter Check-in-Wunsch, den dieses Formular nicht anbietet: kein stiller Ersatz durch den Ersttermin.
    var blockedOnLoad = explicit === 'checkin' && !rCheckin;
    if (blockedOnLoad) { radios.forEach(function (x) { x.checked = false; }); noDefault = true; }
    applyDefault();
    if (!explicit && rDef && rDef.checked) byDefault = true;
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
      var generisch = !txt && !hasPf;
      if (generisch) txt = 'Ich möchte gerne einen Termin anfragen.';
      // Generischer Fülltext (ohne Herkunft) wird unverändert gesendet, öffnet aber die eingeklappten Angaben nicht.
      if (ta && txt && !ta.value) { ta.value = txt; if (generisch) ta.setAttribute('data-kf-generisch', txt); }
      if (!qh) { qh = document.createElement('input'); qh.type = 'hidden'; qh.name = 'quelle'; form.appendChild(qh); }
      if (!qh.value) qh.value = herkunft;
    }
    // CARE: über welchen CTA das Formular erreicht wurde (nur vordefinierte Positions-Strings, nie Nutzertext).
    document.addEventListener('click', function (e) {
      var el = e.target && e.target.closest ? e.target.closest('[data-care-cta]') : null;
      var cp = form.querySelector('input[name="cta_pos"]'); if (el && cp) cp.value = el.getAttribute('data-care-cta') || '';
    });
    sync();
    // Direktlink mit Check-in-Wunsch an einem Formular ohne Check-in-Angebot: Hinweis an der (gelösten) Auswahl.
    if (blockedOnLoad) fieldErr('terminart', checkinNA);

    // ── Kompakter SG-Hero: Rückruf-Bereich und optionale Angaben als Disclosures (ohne JS: alles offen) ──
    var rrBtn = form.querySelector('[data-kf-rr]'), rrBox = rrBtn && document.getElementById(rrBtn.getAttribute('aria-controls'));
    var optBtn = form.querySelector('[data-kf-opt]'), optBox = optBtn && document.getElementById(optBtn.getAttribute('aria-controls'));
    // Nur bei echter Zustandsänderung schreiben (kein Attribut-Rauschen/Layoutsprung beim Laden).
    var setOpen = function (btn, box, open) { if (!btn || !box) return; if (btn.getAttribute('aria-expanded') !== String(open)) btn.setAttribute('aria-expanded', String(open)); if (box.hidden !== !open) box.hidden = !open; };
    // Rückruf-Bereich öffnet nur (bleibt für diesen Seitenbesuch offen); der dann überflüssige Öffnungsbutton verschwindet.
    // Ruhiges Einblenden (nur Opazität/Versatz, keine Höhenbegrenzung); nie beim initialen Laden; reduced motion: per CSS aus.
    var animIn = function (box) { box.classList.remove('kf-anim'); void box.offsetWidth; box.classList.add('kf-anim'); };
    var showRr = function (anim) { if (!rrBtn || !rrBox) return; var was = rrBox.hidden; setOpen(rrBtn, rrBox, true); rrBtn.hidden = true; if (anim === true && was) animIn(rrBox); };
    var openFor = function (el) { if (!el) return; if (rrBox && rrBox.contains(el)) showRr(true); if (optBox && optBox.contains(el)) setOpen(optBtn, optBox, true); };
    // Vorausgefüllte optionale Angaben nie unsichtbar verstecken: dann optionale Angaben (und ggf. Rückruf) offen.
    var prefilled = optBox && [].some.call(optBox.querySelectorAll('input,textarea'), function (x) { var v = (x.value || '').trim(); return v !== '' && v !== x.getAttribute('data-kf-generisch'); });
    if (optBtn && optBox) {
      optBtn.hidden = false; setOpen(optBtn, optBox, !!prefilled);
      optBtn.addEventListener('click', function () { var o = optBtn.getAttribute('aria-expanded') !== 'true'; setOpen(optBtn, optBox, o); if (o) animIn(optBox); });
      optBox.addEventListener('animationend', function () { optBox.classList.remove('kf-anim'); });
      // Späterer Prefill (z. B. home.js ?anliegen=, meldet sich per input-Event): Angaben sichtbar machen.
      form.addEventListener('input', function (e) { if (optBox.hidden && optBox.contains(e.target) && (e.target.value || '').trim()) setOpen(optBtn, optBox, true); });
    }
    if (rrBtn && rrBox) {
      rrBtn.hidden = false; setOpen(rrBtn, rrBox, false);
      // Prefill oder gültige Terminart-Vorauswahl öffnen ohne Fokus/Scroll; Kachelwahl ebenso (Wechsel lässt offen).
      if (prefilled || radios.some(function (x) { return x.checked; })) showRr();
      radios.forEach(function (r) { r.addEventListener('change', function () { showRr(true); }); });
      // Explizit öffnen: keine Terminart wählen; Fokus auf den Bereich (nicht Telefon → keine Tastatur), damit er nicht verloren geht.
      rrBtn.addEventListener('click', function () { showRr(true); rrBox.focus({ preventScroll: true }); });
      rrBox.addEventListener('animationend', function () { rrBox.classList.remove('kf-anim'); });
    }
    // ── CTA-Navigation (05.11.2026): Anker dieses Formulars, openContactForm() und Sticky-Leiste führen über goTo().
    // Erst Auswahl nach Regel (explizit: behandlung/checkin, sofern hier verfügbar; generisch: gültige Wahl behalten,
    // sonst Ersttermin), dann EIN Scroll zum Beginn des relevanten Bereichs unter dem fixen Header: Standort fehlt →
    // Standortwahl; Behandlungsziel → «Terminart wählen» + Anfang der gewählten Kachel; sonst Zielhinweis. Kein Fokus auf
    // Eingabefelder (keine Tastatur); Fokus auf Gruppe/Überschrift mit preventScroll. Keine Events, kein Versand.
    var fieldsBox = form.querySelector('.kf-fields');
    var shown = function (el) { return !!(el && !el.hidden && el.getClientRects().length); };
    var reduce = function () { try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (x) { return false; } };
    // Volle Höhe des fixen Headers, auch wenn er gerade weggeblendet ist (mobil: blendet beim Runterscrollen aus, beim
    // Hochscrollen wieder ein) → das Ziel landet nie unter dem Header, unabhängig von der Scrollrichtung.
    var headerBottom = function () {
      var b = 0;
      [].forEach.call(document.querySelectorAll('#mainNav, header, .site-header'), function (h) {
        var p = getComputedStyle(h).position; if (p !== 'fixed' && p !== 'sticky') return;
        var r = h.getBoundingClientRect(); if (r.height > 0 && r.top <= 1 && r.height < innerHeight / 2 && r.height > b) b = r.height;
      });
      return b;
    };
    var navTarget = function () {
      var head = card.querySelector('.kf-h');
      if (sel && !opt()) return { el: sel.closest('.kf-field') || sel, focus: head || sel.closest('.kf-field') };
      if (opts && shown(opts)) {
        var cur = radios.filter(function (x) { return x.checked; })[0];
        return { el: [taH, form.querySelector('.kf-intro')].filter(shown)[0] || opts, focus: opts, tile: cur && cur.closest('.kf-opt') };
      }
      if (zielBox && shown(zielBox)) return { el: zielBox, focus: zielBox };
      return { el: form, focus: head };
    };
    var desiredY = function (t) {
      var top = headerBottom() + 12, er = t.el.getBoundingClientRect(), y = scrollY + er.top - top;
      // Sehr niedrige Viewports: Anfang der gewählten Kachel muss sichtbar sein (über unteren Sticky-Leisten).
      if (t.tile) { var tr = t.tile.getBoundingClientRect(); if (tr.top - er.top + top + 48 > innerHeight - 96) y = scrollY + tr.top - top; }
      return Math.max(0, Math.min(Math.round(y), document.documentElement.scrollHeight - innerHeight));
    };
    var navSeq = 0;
    var goTo = function (smooth) {
      var my = ++navSeq, t = navTarget();
      if (t.focus) { if (!t.focus.hasAttribute('tabindex')) t.focus.setAttribute('tabindex', '-1'); try { t.focus.focus({ preventScroll: true }); } catch (x) {} }
      var beh = smooth && !reduce() ? 'smooth' : 'instant';
      var go = function (b) { try { window.scrollTo({ top: desiredY(t), behavior: b }); } catch (x) { window.scrollTo(0, desiredY(t)); } };
      // Nachkorrektur, falls nachladende Inhalte das Ziel während des Scrollens verschoben haben (sofort, kein zweiter Smooth-Sprung).
      var fix = function () { if (my === navSeq && Math.abs(desiredY(t) - scrollY) > 2) go('instant'); };
      go(beh);
      if (beh === 'smooth') {
        var fin = function () { window.removeEventListener('scrollend', fin); clearTimeout(tm); if (my === navSeq) { fix(); card.setAttribute('data-kf-nav', String(my)); } };
        var tm = setTimeout(fin, 1500); window.addEventListener('scrollend', fin);
      } else requestAnimationFrame(function () { fix(); card.setAttribute('data-kf-nav', String(my)); });
    };
    var applyWish = function (wish) {
      var tg = target();
      if (tg && tg.art !== 'behandlung') { sync(); return; } // Vormerkung/Routing/Prüfung: eigener Ablauf, keine Kachel aktivieren
      if (wish === 'behandlung' || wish === 'checkin') {
        var r = form.querySelector('input[name="terminart"][value="' + wish + '"]');
        if (usable(r)) { r.checked = true; noDefault = false; fieldErr('terminart', ''); }
        // Check-in hier nicht verfügbar: keine Ersttermin-Auswahl als scheinbare Erfüllung stehen lassen.
        else if (wish === 'checkin') { blockWish(); return; }
      } else applyDefault();
      sync(); if (radios.some(function (x) { return x.checked; })) showRr();
    };
    // Eigene Anker: Karte, Felder, alte Kampagnenanker davor und umschliessende Elemente bis zur eigenen <section>,
    // solange sie nur dieses Formular enthalten (z. B. #kontakt, #home-contact-form). Mehrere Formulare bleiben getrennt.
    var anchors = [card.id, fieldsBox && fieldsBox.id];
    for (var pv = card.previousElementSibling; pv && pv.classList.contains('kf-compat-anchor'); pv = pv.previousElementSibling) anchors.push(pv.id);
    for (var up = card.parentElement; up && up !== document.body; up = up.parentElement) {
      if (up.querySelectorAll('[data-kf]').length !== 1) break;
      if (up.id) anchors.push(up.id);
      if (up.tagName === 'SECTION') break;
    }
    anchors = anchors.filter(Boolean).map(function (x) { return '#' + x; });
    var isOurs = function (h) { return !!h && anchors.indexOf(h) >= 0; };
    var hashWish = function (h) { return /^#first30/.test(h || '') ? 'checkin' : ''; };
    card.__kfGoto = function (wish, smooth) { applyWish(wish || ''); goTo(smooth !== false); };
    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target && e.target.closest ? e.target.closest('a[href*="#"]') : null; if (!a) return;
      var u; try { u = new URL(a.getAttribute('href'), location.href); } catch (x) { return; }
      if (u.origin !== location.origin || u.pathname !== location.pathname || !isOurs(u.hash)) return;
      e.preventDefault();
      if (location.hash !== u.hash) { try { history.pushState(null, '', u.pathname + u.search + u.hash); } catch (x) {} }
      var wish = a.getAttribute('data-kf-terminart') || (a.getAttribute('data-offer') === 'first30' ? 'checkin' : '') || u.searchParams.get('terminart') || hashWish(u.hash);
      card.__kfGoto(wish, true);
    });
    window.addEventListener('hashchange', function () { if (isOurs(location.hash)) card.__kfGoto(hashWish(location.hash), true); });
    // Direkteinstieg/Reload mit eigenem Anker: Auswahl steht (Prefill oben), nach dem Laden einmal ohne Animation ausrichten.
    if (isOurs(location.hash)) {
      var initGo = function () { requestAnimationFrame(function () { goTo(false); }); };
      if (document.readyState === 'complete') initGo(); else window.addEventListener('load', initGo, { once: true });
    }

    var toFields = form.querySelector('[data-kf-to-fields]');
    if (toFields) toFields.addEventListener('click', function (e) { e.preventDefault(); card.__kfGoto('', true); });
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
      // Name Pflicht (ein Feld, nach Trimmen nicht leer; keine Wortanzahl-Regel). Fehlerreihenfolge = sichtbare Reihenfolge.
      var nmEl = form.querySelector('[name="name"]');
      if (nmEl && nmEl.required && !nmEl.value.trim()) fail('name', 'Bitte gib deinen Namen an.');
      var tel = form.querySelector('[name="telefon"]').value.trim();
      if (!tel) fail('telefon', 'Bitte gib deine Telefonnummer an.');
      else if (!phoneOk(tel)) fail('telefon', 'Bitte prüfe deine Telefonnummer (z. B. +41 79 123 45 67).');
      var em = form.querySelector('[name="email"]').value.trim();
      // E-Mail Pflicht (05.11.2026) im gemeinsamen Formular (Feld required); Format wie bisher geprüft.
      var emReq = form.querySelector('[name="email"]').required;
      if (!em && emReq) fail('email', 'Bitte gib deine E-Mail-Adresse an.');
      else if (em && !emailOk(em)) fail('email', 'Bitte prüfe deine E-Mail-Adresse.');
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
      // Kampagnen-Metadaten für die Conversion (nur feste Kennungen: Kampagnen-ID, CTA-Position; keine Personendaten).
      var meta = {}; if (data.kampagne) meta.kampagne = data.kampagne; if (data.cta_pos) meta.cta_position = data.cta_pos; if (data.kampagne && data.runde) meta.buchungsrunde = data.runde;
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
          if (conv === 'form_submit') push(Object.assign({ event: 'form_submit', form_id: 'terminform', herkunft: data.quelle, terminart: t, standort: tg.id }, meta));
          else push(Object.assign({ event: 'formular_senden', form_type: data.anfrage_typ || 'allgemein', quelle: data.quelle, terminart: t, standort: tg.id }, meta));
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
          // Kampagnen-Sheet: eigene, zutreffende Bestätigung für den 360°-Check (data-kf-ok-checkin); sonst Standardtexte.
          ok.querySelector('[data-kf-ok-text]').textContent = (t === 'checkin' && card.getAttribute('data-kf-ok-checkin')) || OK[t];
          form.replaceWith(ok); ok.focus({ preventScroll: true });
        })
        .catch(function (err) {
          sending = false; form.classList.remove('is-sending');
          if (submitBtn) { submitBtn.disabled = false; sync(); }
          if (window.turnstile && tsEl) { try { window.turnstile.reset(tsEl); } catch (e3) {} }
          var code = String(err && err.message || '');
          if (errBox) {
            errBox.textContent = code === 'missing_name' ? 'Bitte gib deinen Namen an.' : code === 'missing_email' ? 'Bitte gib deine E-Mail-Adresse an.' : code === 'invalid_phone' ? 'Bitte prüfe deine Telefonnummer.' : code === 'invalid_email' ? 'Bitte prüfe deine E-Mail-Adresse.'
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
  /** CTA-Navigation von aussen (openContactForm, Sticky-Leiste): Element = Karte [data-kf] oder ein Container mit genau
   *  dieser Karte. o.terminart: 'behandlung' | 'checkin' (explizit) oder leer (generisch). true, wenn behandelt. */
  window.kfGoto = function (el, o) {
    var c = el && el.matches && el.matches('[data-kf]') ? el : el && el.querySelector ? el.querySelector('[data-kf]') : null;
    if (!c || !c.__kfGoto) return false; o = o || {}; c.__kfGoto(o.terminart || '', o.smooth !== false); return true;
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
