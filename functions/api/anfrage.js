// Cloudflare Pages Function — POST /api/anfrage
// Receives the TCM.ch intake form and emails it to termine@tcm.ch via Resend.
// Env var required (Cloudflare Pages → Settings → Environment variables): RESEND_API_KEY

const TO = 'termine@tcm.ch';
const FROM = 'TCM.ch Anfrage <onboarding@resend.dev>'; // domain must be verified in Resend

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function onRequestPost({ request, env }) {
  let d;
  try {
    d = await request.json();
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  // Honeypot (optional) + minimal validation
  if (d.website) return json({ ok: true }); // bot trap
  if (!d.vorname || !d.telefon) {
    return json({ error: 'missing_fields' }, 422);
  }

  const rows = [
    ['Anliegen', d.anliegen],
    ['Beschwerden', d.beschwerden],
    ['Ort', d.ort],
    ['Wie schnell', d.timing],
    ['Zusatzversicherung', d.versicherung],
    ['Vorname', d.vorname],
    ['Telefon', d.telefon],
    ['Bevorzugter Kontakt', d.kontakt],
    ['Quelle', d.quelle],
    ['Zeit', d.zeit],
  ];

  const html =
    '<h2 style="font-family:sans-serif;margin:0 0 12px">Neue TCM.ch Anfrage</h2>' +
    '<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">' +
    rows
      .filter(([, v]) => v != null && String(v).trim() !== '')
      .map(
        ([k, v]) =>
          `<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top"><strong>${esc(
            k
          )}</strong></td><td style="padding:4px 0">${esc(v).replace(/\n/g, '<br>')}</td></tr>`
      )
      .join('') +
    '</table>';

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: d.telefon ? undefined : undefined, // phone-only lead; no email to reply to
      subject: `Neue Anfrage — ${d.ort || 'Standort offen'} (${d.vorname})`,
      html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    return json({ error: 'resend_failed', detail }, 502);
  }
  return json({ ok: true });
}

// Optional: respond to non-POST politely
export async function onRequest({ request }) {
  if (request.method === 'POST') return; // handled by onRequestPost
  return json({ error: 'method_not_allowed' }, 405);
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
