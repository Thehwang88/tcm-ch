// Cloudflare Pages Function — POST /api/anfrage  → Resend email to termine@tcm.ch
// Env var required: RESEND_API_KEY
const TO = 'termine@tcm.ch';
const FROM = 'TCM.ch Anfrage <onboarding@resend.dev>'; // test mode; switch to anfrage@tcm.ch after domain verify

function J(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
function esc(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function onRequestPost({ request, env }) {
  try {
    let d = {};
    try { d = await request.json(); } catch (e) {}

    if (d.website) return J({ ok: true });               // honeypot
    if (!d.vorname || !d.telefon) return J({ error: 'missing_fields' }, 422);
    if (!env.RESEND_API_KEY) return J({ error: 'no_api_key' }, 500);

    const rows = [
      ['Anliegen', d.anliegen], ['Beschwerden', d.beschwerden], ['Ort', d.ort],
      ['Wie schnell', d.timing], ['Zusatzversicherung', d.versicherung],
      ['Vorname', d.vorname], ['Telefon', d.telefon], ['Bevorzugter Kontakt', d.kontakt],
      ['Quelle', d.quelle], ['Zeit', d.zeit],
    ];
    const html =
      '<h2 style="font-family:sans-serif;margin:0 0 12px">Neue TCM.ch Anfrage</h2>' +
      '<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">' +
      rows.filter(([, v]) => v != null && String(v).trim() !== '')
        .map(([k, v]) => '<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top"><strong>' +
          esc(k) + '</strong></td><td style="padding:4px 0">' + esc(v).replace(/\n/g, '<br>') + '</td></tr>')
        .join('') +
      '</table>';

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + env.RESEND_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        subject: 'Neue Anfrage — ' + (d.ort || 'Standort offen') + ' (' + d.vorname + ')',
        html,
      }),
    });

    const text = await res.text();
    if (!res.ok) return J({ error: 'resend_failed', status: res.status, detail: text }, 502);
    return J({ ok: true });
  } catch (err) {
    return J({ error: 'exception', detail: String((err && err.stack) || err) }, 502);
  }
}
