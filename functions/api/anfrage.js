// DIAGNOSTIC v2 — test the Resend fetch in isolation, always return readable JSON.
const TO = 'termine@tcm.ch';
const FROM = 'TCM.ch Anfrage <onboarding@resend.dev>';

function J(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function onRequestPost({ request, env }) {
  let d = {};
  try { d = await request.json(); } catch (e) {}
  if (!env || !env.RESEND_API_KEY) return J({ stage: 'no_key' });

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  let stage = 'before_fetch';
  try {
    stage = 'fetching';
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + env.RESEND_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        subject: 'TCM.ch Test',
        html: '<p>Test ' + (d.vorname || '') + '</p>',
      }),
      signal: ctrl.signal,
    });
    stage = 'reading_body';
    const text = await res.text();
    clearTimeout(timer);
    return J({ stage: 'done', status: res.status, body: text });
  } catch (err) {
    clearTimeout(timer);
    return J({ stage, name: String(err && err.name), message: String((err && err.message) || err) });
  }
}
