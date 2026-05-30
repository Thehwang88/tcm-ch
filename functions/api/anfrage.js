// v4 — proven-working structure, real send from verified domain, always returns JSON.
const TO = 'termine@tcm.ch';
const FROM = 'TCM.ch Anfrage <anfrage@tcm.ch>';

function J(obj) {
  return new Response(JSON.stringify(obj), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
function esc(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function onRequestPost({ request, env }) {
  let d = {};
  try { d = await request.json(); } catch (e) {}
  if (!env || !env.RESEND_API_KEY) return J({ stage: 'no_key' });
  if (!d.vorname || !d.telefon) return J({ stage: 'missing_fields' });

  const lines = [
    ['Anliegen', d.anliegen], ['Beschwerden', d.beschwerden], ['Ort', d.ort],
    ['Wie schnell', d.timing], ['Zusatzversicherung', d.versicherung],
    ['Vorname', d.vorname], ['Telefon', d.telefon], ['Kontakt', d.kontakt],
    ['Quelle', d.quelle], ['Zeit', d.zeit],
  ].filter(([, v]) => v != null && String(v).trim() !== '')
   .map(([k, v]) => '<b>' + esc(k) + ':</b> ' + esc(v)).join('<br>');

  let stage = 'before_fetch';
  try {
    stage = 'fetching';
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + env.RESEND_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        subject: 'Neue Anfrage — ' + (d.ort || 'Standort offen') + ' (' + d.vorname + ')',
        html: '<h2>Neue TCM.ch Anfrage</h2>' + lines,
      }),
    });
    stage = 'reading';
    const text = await res.text();
    return J({ stage: 'done', status: res.status, body: text });
  } catch (err) {
    return J({ stage, name: String(err && err.name), message: String((err && err.message) || err) });
  }
}
