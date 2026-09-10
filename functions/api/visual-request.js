// PRODUCTION — POST /api/visual-request → Resend email to admin@tcm.ch
// Visual-Anfrage aus der Visual Library (/visuals/): Therapeut:in findet ein
// Visual nicht und wünscht ein neues. Empfänger ist FIX serverseitig.
// Anti-Spam: Honeypot + Längen-Limits + leichtes per-IP-Rate-Limit (in-memory,
// best effort pro Isolate — für dieses interne Low-Volume-Formular ausreichend).
// Env var: RESEND_API_KEY (wie functions/api/anfrage.js).
const TO = 'admin@tcm.ch';
const FROM = 'TCM.ch Visual Library <anfrage@tcm.ch>';

function J(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json' } });
}
function esc(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
// Steuerzeichen raus, trimmen, hart kappen.
function clean(s, max) {
  return String(s == null ? '' : s).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, max);
}

const hits = new Map(); // ip -> timestamps (best effort, pro Isolate)
function rateLimited(ip) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const list = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  if (list.length >= 5) return true;
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 500) hits.clear(); // Speicher begrenzen
  return false;
}

export async function onRequestPost({ request, env }) {
  try {
    let d = {};
    try { d = await request.json(); } catch (e) {}

    if (d.website) return J({ ok: true }); // honeypot

    const topic = clean(d.topic, 200);
    const note = clean(d.note, 1000);
    const query = clean(d.query, 200);
    const category = clean(d.category, 60);
    const page = clean(d.page, 300);

    if (topic.length < 2) return J({ error: 'missing_fields' }, 422);
    if (!env || !env.RESEND_API_KEY) return J({ error: 'no_api_key' }, 500);

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (rateLimited(ip)) return J({ error: 'rate_limited' }, 429);

    const rows = [
      ['Requested visual', topic],
      ['Original search query', query],
      ['Optional explanation', note],
      ['Category', category],
      ['Source', 'TCM.ch Visual Library'],
      ['Current page', page],
      ['Timestamp', new Date().toISOString()],
    ];
    const html =
      '<!doctype html><html lang="de"><head><meta charset="utf-8"></head><body>' +
      '<h2 style="font-family:sans-serif;margin:0 0 12px">Visual-Anfrage — Visual Library</h2>' +
      '<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">' +
      rows.filter(([, v]) => v !== '')
        .map(([k, v]) => '<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top"><strong>' +
          esc(k) + '</strong></td><td style="padding:4px 0">' + esc(v).replace(/\n/g, '<br>') + '</td></tr>')
        .join('') +
      '</table></body></html>';

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + env.RESEND_API_KEY, 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        subject: 'Visual Request: ' + topic.replace(/[\r\n]+/g, ' ').slice(0, 120),
        html,
      }),
    });

    if (!res.ok) return J({ error: 'resend_failed', status: res.status }, 500);
    return J({ ok: true });
  } catch (err) {
    return J({ error: 'exception' }, 500);
  }
}
