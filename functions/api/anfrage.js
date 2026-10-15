// PRODUCTION — POST /api/anfrage → Resend email to termine@tcm.ch
// Env var: RESEND_API_KEY (must be in the same Resend workspace as the verified tcm.ch domain)
// Gemeinsames Kontaktformular (15.10.2026): Terminarten + Check-in-Freigaben aus src/data/kontakt-angebote.mjs.
import { OFFER_BY_ID, ZIELART_FUER, zielFuer } from '../../src/data/kontakt-angebote.mjs';
const TO = 'termine@tcm.ch';
const FROM = 'TCM.ch Anfrage <anfrage@tcm.ch>';

function J(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json' } });
}
function esc(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function onRequestPost({ request, env }) {
  try {
    let d = {};
    try { d = await request.json(); } catch (e) {}

    if (d.website) return J({ ok: true });                 // honeypot
    // Email is required for every source EXCEPT the St. Gallen launch hero
    // (quelle=launch-hero-sg), which captures only name + phone. Name, telefon
    // and a valid Turnstile token are always required.
    // Wartelisten (quelle=warteliste-*, z. B. Luzern) erfassen nur eine E-Mail.
    const _launchSG = d.quelle === 'launch-hero-sg';
    const _warteliste = typeof d.quelle === 'string' && d.quelle.indexOf('warteliste-') === 0;
    // Akademie-Leads (quelle=akademie) und QI CLUB Joins (quelle=qi-club):
    // Telefon optional, Name + E-Mail Pflicht.
    // Praxisnachfolge (quelle=praxisnachfolge, /partner/praxisnachfolge/): Telefon optional.
    const _akademie = d.quelle === 'akademie' || d.quelle === 'qi-club' || d.quelle === 'praxisnachfolge';
    // Zürich-Routing-Funnel: Name + Telefon ODER E-Mail genügt (eines von beidem).
    const _zhRouting = d.anfrage_typ === 'zuerich-routing';
    // Angebots-/Terminart (FIRST 30 Pre-Christmas Edition 2026, St. Gallen): der Code aus dem Formular wird
    // ausschliesslich gegen diese Whitelist aufgelöst; Preis-, Umfang- und Berechtigungstexte kommen NIE vom
    // Client (d.angebot wird überschrieben). Unbekannter Code → 422. Quelle der Codes: src/data/first30.ts.
    const OFFERS = {
      FIRST30_WINTER_2026_SG: { art: 'FIRST 30 PRE-CHRISTMAS EDITION', terminart: 'Kostenloser 30-Minuten-Termin (neue Patient:innen, einmal pro Person, Termin nach persönlicher Bestätigung)', angebot: 'FIRST 30 Pre-Christmas Edition 2026 – kostenloser 30-Minuten-Termin – St. Gallen', betreff: ' · FIRST 30' },
      FIRST30_WINTER_2026_SG_WARTELISTE: { art: 'FIRST 30 WARTELISTE', terminart: 'Warteliste für das FIRST 30 Vorweihnachtsgeschenk (alle Geschenke vergeben)', angebot: 'FIRST 30 Pre-Christmas Edition 2026 – Warteliste – St. Gallen', betreff: ' · FIRST 30 Warteliste' },
      ERSTTERMIN_REGULAER_SG: { art: 'REGULÄRER ERSTTERMIN', terminart: 'Reguläre kostenpflichtige Erstanfrage', angebot: 'Regulärer Ersttermin – St. Gallen', betreff: '' },
    };
    // Alle Angebots-IDs sind an St. Gallen gebunden: nur mit standort 'St. Gallen' UND einer St.-Galler Quelle
    // (Hero launch-hero-sg, unteres Formular sg-kontakt-bottom) gültig; jede andere Kombination → 422 invalid_offer_scope.
    const OFFER_SOURCES = ['launch-hero-sg', 'sg-kontakt-bottom'];
    const _phoneOk = (s) => { const t = String(s || '').trim(); const digits = t.replace(/\D/g, ''); return /^\+?[0-9 ()\/.\-]{7,24}$/.test(t) && digits.length >= 7 && digits.length <= 15; };
    const _emailOk = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(s || '').trim());
    let offer = null;
    const offerId = d.angebot_id != null ? String(d.angebot_id).trim() : '';
    // Gemeinsames Kontaktformular (TCM_CHECKIN, ERSTTERMIN_BEHANDLUNG, VORMERKUNG, STANDORT_ANFRAGE, ROUTING_ANFRAGE).
    // Pflicht ist NUR eine gültige Telefonnummer plus ein kanonisches Standort-Ziel (kontaktZiele, aus locations.ts);
    // die Angebots-ID muss zur Zielart passen (Vormerkung/Anfrage/Routing nie als Behandlung, Check-in nur für das
    // freigegebene reguläre Ziel). Name, E-Mail, Anliegen optional; eine angegebene E-Mail wird validiert.
    const neu = offerId ? OFFER_BY_ID[offerId] : null;
    if (neu) {
      const ort = String(d.standort || '').trim();
      if (!ort) return J({ error: 'missing_standort' }, 422);
      const ziel = zielFuer(ort);
      if (!ziel) return J({ error: 'invalid_standort' }, 422);
      if (d.standort_id != null && String(d.standort_id).trim() !== ziel.id) return J({ error: 'invalid_standort' }, 422);
      if (ZIELART_FUER[neu.terminart] !== ziel.art || (neu.terminart === 'checkin' && !ziel.checkin)) return J({ error: 'invalid_offer_scope' }, 422);
      d.standort_id = ziel.id;
      if (!_phoneOk(d.telefon)) return J({ error: 'invalid_phone' }, 422);
      if (d.email && String(d.email).trim() && !_emailOk(d.email)) return J({ error: 'invalid_email' }, 422);
      offer = { art: neu.art, terminart: neu.beschreibung, angebot: neu.label + ' – ' + ort, betreff: neu.betreff };
      d.angebot = offer.angebot;
    } else if (offerId) {
      // Historische IDs (FIRST 30 / regulär SG): unverändert, damit offene Browser-Tabs weiter zugestellt werden.
      offer = OFFERS[offerId];
      if (!offer) return J({ error: 'invalid_offer' }, 422);
      if (String(d.standort || '').trim() !== 'St. Gallen' || OFFER_SOURCES.indexOf(String(d.quelle || '').trim()) < 0) return J({ error: 'invalid_offer_scope' }, 422);
      d.angebot = offer.angebot;
    }
    // Phone-only FIRST 30 (ausschliesslich Hero-Formular launch-hero-sg mit FIRST-30-ID): nur eine gültige
    // Telefonnummer ist Pflicht, kein Name wird erfunden. Alle anderen Formulare/Standorte: Regeln unverändert.
    const _first30Phone = _launchSG && offer && !neu && offerId.indexOf('FIRST30_WINTER_2026_SG') === 0;
    if (_first30Phone && !_phoneOk(d.telefon)) return J({ error: 'invalid_phone' }, 422);
    if (neu) {
      // Telefon, Standort und ggf. E-Mail bereits oben validiert.
    } else if (_first30Phone) {
      // Telefon bereits oben validiert.
    } else if (_zhRouting) {
      if (!d.name || (!d.telefon && !d.email)) return J({ error: 'missing_fields' }, 422);
    } else if (_warteliste) {
      if (!d.email) return J({ error: 'missing_fields' }, 422);
    } else if (_akademie) {
      if (!d.name || !d.email) return J({ error: 'missing_fields' }, 422);
    } else if (!d.name || !d.telefon || (!_launchSG && !d.email)) {
      return J({ error: 'missing_fields' }, 422);
    }
    if (!env || !env.RESEND_API_KEY) return J({ error: 'no_api_key' }, 500);

    // Turnstile secret: production (tcm.ch) uses the real secret; previews (*.pages.dev)
    // use Cloudflare's always-pass TEST secret so the full pipeline can be verified there.
    // Fail-safe: only an explicit *.pages.dev host switches to the test secret.
    const _host = (() => { try { return new URL(request.url).hostname; } catch (_) { return ''; } })();
    const _isPreview = _host.endsWith('.pages.dev');
    const turnstileSecret = _isPreview ? '1x0000000000000000000000000000000AA' : env.TURNSTILE_SECRET;

    const tsVerify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: turnstileSecret,
        response: d.turnstileToken,
        remoteip: request.headers.get('CF-Connecting-IP'),
      }),
    });
    const tsResult = await tsVerify.json().catch(() => ({}));
    if (!tsResult.success) return J({ error: 'turnstile_failed' }, 403);

    const rows = [
      // Angebotsklassifikation zuoberst, damit das Praxisteam FIRST 30 und reguläre Anfragen sofort unterscheidet.
      ['Anfrageart', offer ? offer.art : undefined], ['Terminart', offer ? offer.terminart : undefined],
      ['Angebots-ID', offer ? offerId : undefined],
      ['Name', d.name], ['E-Mail', d.email], ['Telefon', d.telefon],
      ['Standort', d.standort], ['Standort-ID', d.standort_id],
      ['Aktuelle Situation', d.situation], ['Nachricht', d.nachricht],
      ['Interessen', d.interessen], ['Einwilligung Updates', d.consent],
      ['Behandlung / Anliegen', d.behandlung || d.anliegen], ['Wunschzeit', d.wunschzeit],
      ['Angebot', d.angebot], ['Seite', d.seite],
      // Partner-B2B (quelle=partner-b2b, /partner/): Qualifikationsfelder. Nur gesetzt, wenn vorhanden.
      ['Praxis-Website', d.praxis_url], ['Klinische Erfahrung (Jahre)', d.erfahrung],
      ['Anerkennung', d.anerkennung], ['Räume / Team', d.raeume_team],
      ['Patientenaktivität', d.patienten_aktivitaet], ['Wunschstadt', d.wunschstadt],
      ['Warum Partnerschaft', d.motivation],
      // Praxisnachfolge (quelle=praxisnachfolge): kein Umsatzfeld.
      ['Praxis aktiv seit', d.aktiv_seit], ['Gewünschter Zeitraum', d.zeitraum], ['Gewünschter Übergang', d.uebergang],
      ['Quelle', d.quelle], ['Quelle (Detail)', d.quelle_detail],
      ['Formular', d.formular], ['Zeit', d.zeit],
    ];
    const html =
      '<!doctype html><html lang="de"><head><meta charset="utf-8"></head><body>' +
      '<h2 style="font-family:sans-serif;margin:0 0 12px">Neue TCM.ch Anfrage' + (offer ? ' — ' + esc(offer.art) : '') + '</h2>' +
      (offer ? '<p style="font-family:sans-serif;font-size:14px;margin:0 0 12px;padding:8px 12px;border-left:4px solid ' + (offer.betreff ? '#813548' : '#2D9B6F') + ';background:#f6f6f6"><strong>' + esc(offer.art) + '</strong> · ' + esc(d.standort || 'St. Gallen') + ' · ' + esc(offer.terminart) + '</p>' : '') +
      '<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">' +
      rows.filter(([, v]) => v != null && String(v).trim() !== '')
        .map(([k, v]) => '<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top"><strong>' +
          esc(k) + '</strong></td><td style="padding:4px 0">' + esc(v).replace(/\n/g, '<br>') + '</td></tr>')
        .join('') +
      '</table></body></html>';

    let subject = d.quelle === 'partner-b2b'
      ? 'Partner-Anfrage – ' + (d.situation || 'Situation offen') + ' (' + d.name + (d.wunschstadt ? ', ' + d.wunschstadt : '') + ')'
      : d.quelle === 'praxisnachfolge'
      ? 'Praxisnachfolge – ' + (d.uebergang || 'Übergang offen') + ' (' + d.name + (d.standort ? ', ' + d.standort : '') + ')'
      : d.quelle === 'qi-club'
      ? 'QI CLUB Join – ' + d.name + (d.standort ? ' (' + d.standort + ')' : '')
      : _akademie
      ? 'Akademie – ' + (d.situation || 'Interesse') + ' (' + d.name + ')'
      : _warteliste
      ? 'Warteliste – ' + (d.standort || 'Standort offen') + ' (' + d.email + ')'
      : d.typ === 'termin'
        ? 'Terminanfrage – ' + (d.standort || 'Standort offen')
        : 'Neue Anfrage — ' + (d.standort || 'Standort offen') + ' (' + (d.name || d.telefon || 'ohne Name') + ')';
    // Massage-Anfragen (anfrage_typ==='massage') im Betreff markieren; quelle steht bereits
    // als eigene Zeile im HTML-Body (rows oben).
    if (d.anfrage_typ === 'massage') subject = '[Massage] ' + subject;
    // Formularname (z. B. Hero-Gratis-30min-StGallen) vorne im Betreff, damit im
    // Postfach sofort sichtbar ist, welches Formular gefeuert hat.
    if (d.formular) subject = '[' + String(d.formular).replace(/[\r\n]+/g, ' ').slice(0, 60) + '] ' + subject;
    // FIRST 30: Suffix am Ende des Betreffs (bestehender Formular-Präfix und Betreffaufbau bleiben unverändert).
    if (offer && offer.betreff) subject += offer.betreff;
    const body = {
      from: FROM,
      to: [TO],
      subject,
      html,
    };
    if (d.email && String(d.email).includes('@')) body.reply_to = d.email;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + env.RESEND_API_KEY, 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    if (!res.ok) return J({ error: 'resend_failed', status: res.status, detail: text }, 500);
    return J({ ok: true });
  } catch (err) {
    return J({ error: 'exception', detail: String((err && err.stack) || err) }, 500);
  }
}
