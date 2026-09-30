// POST /api/einreichung → Moderations-Queue für Fachpersonen-Einreichungen (Phase 1: E-Mail).
// Nichts wird veröffentlicht: jede Einreichung landet mit status "submitted" im Postfach und
// wird manuell geprüft (Moderationszustände: src/data/pro/taxonomy.ts).
// Schema der Formulare: src/data/pro/submissions.ts. Migration zu D1/Accounts: seo/professional-architecture.md.
// Env: RESEND_API_KEY, TURNSTILE_SECRET.
const TO = 'termine@tcm.ch';
const FROM = 'TCM.ch Fachpersonen <anfrage@tcm.ch>';
// Muss den IDs in submissions.ts entsprechen. 'benchmark' ist bewusst NICHT offen.
const TYPES = new Set(['profil', 'stelle', 'praxisverkauf', 'praxisraum', 'praxisgesuch', 'praxispartner', 'vertretung', 'weiterbildung', 'mentor', 'expertise']);
const MAX_FIELD = 5000;
const MAX_FIELDS = 40;

function J(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json' } });
}
function esc(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function onRequestPost({ request, env }) {
  try {
    let d = {};
    try { d = await request.json(); } catch (e) { return J({ error: 'bad_json' }, 400); }
    if (d.website) return J({ ok: true }); // honeypot

    const type = String(d.typ || '');
    if (!TYPES.has(type)) return J({ error: 'bad_type' }, 422);
    const f = d.felder && typeof d.felder === 'object' ? d.felder : {};
    const keys = Object.keys(f);
    if (keys.length > MAX_FIELDS) return J({ error: 'too_many_fields' }, 422);
    for (const k of keys) {
      if (!/^[a-z_]{1,40}$/.test(k)) return J({ error: 'bad_field' }, 422);
      if (String(f[k]).length > MAX_FIELD) return J({ error: 'too_long', field: k }, 422);
    }
    if (!f.name || !f.email || !String(f.email).includes('@')) return J({ error: 'missing_fields' }, 422);
    if (d.consent_publikation !== true || d.consent_datenschutz !== true) return J({ error: 'missing_consent' }, 422);
    if (!env || !env.RESEND_API_KEY) return J({ error: 'no_api_key' }, 500);

    const host = (() => { try { return new URL(request.url).hostname; } catch (_) { return ''; } })();
    const secret = host.endsWith('.pages.dev') ? '1x0000000000000000000000000000000AA' : env.TURNSTILE_SECRET;
    const ts = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: d.turnstileToken, remoteip: request.headers.get('CF-Connecting-IP') }),
    });
    const tsr = await ts.json().catch(() => ({}));
    if (!tsr.success) return J({ error: 'turnstile_failed' }, 403);

    const record = {
      id: 'sub_' + crypto.randomUUID(),
      type,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      source: 'submission',
      page: String(d.seite || '').slice(0, 200),
      consent: { publication: true, privacyNotice: true, at: new Date().toISOString() },
      fields: f,
    };
    const rows = keys.map((k) => '<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top"><strong>' + esc(k) + '</strong></td><td style="padding:4px 0">' + esc(f[k]).replace(/\n/g, '<br>') + '</td></tr>').join('');
    const html =
      '<h2 style="font-family:sans-serif;margin:0 0 6px">Neue Einreichung: ' + esc(type) + '</h2>' +
      '<p style="font-family:sans-serif;font-size:13px;color:#666;margin:0 0 12px">Status: <b>submitted</b> · NICHT veröffentlicht · Moderation erforderlich · ' + esc(record.id) + '</p>' +
      '<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">' + rows + '</table>' +
      '<pre style="font-size:11px;color:#888;white-space:pre-wrap">' + esc(JSON.stringify(record)) + '</pre>';

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + env.RESEND_API_KEY, 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ from: FROM, to: [TO], subject: '[Moderation] ' + type + ' – ' + String(f.name).slice(0, 60), html, reply_to: f.email }),
    });
    if (!res.ok) return J({ error: 'resend_failed', status: res.status }, 500);
    return J({ ok: true, id: record.id, status: 'submitted' });
  } catch (err) {
    return J({ error: 'exception' }, 500);
  }
}
