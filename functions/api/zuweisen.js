// PRODUCTION — POST /api/zuweisen → Resend email to termine@tcm.ch with referral
// document attachments, plus an auto-confirmation to the referring professional.
// multipart/form-data (fields + files). Env: RESEND_API_KEY, TURNSTILE_SECRET.
const TO = 'termine@tcm.ch';
const FROM = 'TCM.ch Zuweisung <anfrage@tcm.ch>';

const ALLOWED = { 'application/pdf': '.pdf', 'image/jpeg': '.jpg', 'image/jpg': '.jpg', 'image/png': '.png' };
const MAX_TOTAL = 10 * 1024 * 1024; // 10 MB total
const MAX_FILES = 8;

function J(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json' } });
}
function esc(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function abToBase64(buf) {
  const bytes = new Uint8Array(buf);
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

export async function onRequestPost({ request, env }) {
  try {
    let form;
    try { form = await request.formData(); } catch (e) { return J({ error: 'bad_form' }, 400); }
    const f = (k) => { const v = form.get(k); return v == null ? '' : String(v).trim(); };

    if (f('website')) return J({ ok: true });                 // honeypot
    // Required: referrer name + email, patient name, reason.
    if (!f('zuName') || !f('zuEmail') || !f('patName') || !f('grund')) {
      return J({ error: 'missing_fields' }, 422);
    }
    if (!env || !env.RESEND_API_KEY) return J({ error: 'no_api_key' }, 500);

    // ── Turnstile (server-side) ──
    const tsVerify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: env.TURNSTILE_SECRET,
        response: f('turnstileToken'),
        remoteip: request.headers.get('CF-Connecting-IP'),
      }),
    });
    const tsResult = await tsVerify.json().catch(() => ({}));
    if (!tsResult.success) return J({ error: 'turnstile_failed' }, 403);

    // ── Files → validate type + total size, base64-encode for Resend ──
    const rawFiles = form.getAll('files').filter((x) => x && typeof x.arrayBuffer === 'function' && x.size > 0);
    if (rawFiles.length > MAX_FILES) return J({ error: 'too_many_files' }, 422);
    let total = 0;
    const attachments = [];
    for (const file of rawFiles) {
      const type = (file.type || '').toLowerCase();
      const name = file.name || 'dokument';
      const okType = ALLOWED[type] || /\.(pdf|jpe?g|png)$/i.test(name);
      if (!okType) return J({ error: 'bad_file_type', file: name }, 422);
      total += file.size;
      if (total > MAX_TOTAL) return J({ error: 'too_large' }, 422);
      const buf = await file.arrayBuffer();
      attachments.push({ filename: name, content: abToBase64(buf) });
    }

    // ── Build the internal email ──
    const rows = [
      ['Dringlichkeit', f('dringlichkeit') || 'normal'],
      ['— Zuweiser:in —', ''],
      ['Name', f('zuName')], ['Praxis', f('zuPraxis')],
      ['E-Mail', f('zuEmail')], ['Telefon', f('zuTel')], ['ZSR / GLN', f('zsr')],
      ['— Patient:in —', ''],
      ['Name', f('patName')], ['Geburtsdatum', f('patDob')],
      ['— Zuweisung —', ''],
      ['Grund / Diagnose', f('grund')],
      ['Wunsch-Standort', f('standort')],
      ['Bemerkungen', f('bemerkungen')],
      ['Dokumente', rawFiles.length ? rawFiles.map((x) => x.name).join(', ') : 'keine'],
    ];
    const html =
      '<h2 style="font-family:sans-serif;margin:0 0 12px">Neue Online-Zuweisung</h2>' +
      '<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">' +
      rows.filter(([, v], i) => String(rows[i][0]).startsWith('—') || (v != null && String(v).trim() !== ''))
        .map(([k, v]) =>
          String(k).startsWith('—')
            ? '<tr><td colspan="2" style="padding:12px 0 2px;color:#2D9B6F;font-weight:700;font-family:sans-serif">' + esc(k.replace(/—/g, '').trim()) + '</td></tr>'
            : '<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top"><strong>' + esc(k) + '</strong></td><td style="padding:4px 0">' + esc(v).replace(/\n/g, '<br>') + '</td></tr>')
        .join('') +
      '</table>';

    const dringend = (f('dringlichkeit') || '').toLowerCase() === 'dringend';
    const subject = (dringend ? '[DRINGEND] ' : '') + 'Online-Zuweisung – ' + f('patName') +
      (f('standort') ? ' (' + f('standort') + ')' : '');

    const body = {
      from: FROM, to: [TO], subject, html,
      reply_to: f('zuEmail').includes('@') ? f('zuEmail') : undefined,
    };
    if (attachments.length) body.attachments = attachments;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + env.RESEND_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    if (!res.ok) return J({ error: 'resend_failed', status: res.status, detail: text }, 500);

    // ── Auto-confirmation to the referring professional (best-effort) ──
    try {
      const confHtml =
        '<div style="font-family:sans-serif;font-size:15px;line-height:1.6;color:#1a1a1a">' +
        '<p>Guten Tag ' + esc(f('zuName')) + '</p>' +
        '<p>Ihre Zuweisung ist bei uns eingegangen. Wir melden uns mit einer kurzen Rückmeldung zum Behandlungsverlauf.</p>' +
        '<p style="color:#666">Patient:in: <strong>' + esc(f('patName')) + '</strong>' +
        (f('standort') ? ' · Wunsch-Standort: ' + esc(f('standort')) : '') + '</p>' +
        '<p style="margin-top:18px">Freundliche Grüsse<br>TCM.ch Kliniken</p>' +
        '<p style="font-size:12px;color:#999">Diese Bestätigung wurde automatisch versendet. Bei Fragen: termine@tcm.ch</p></div>';
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + env.RESEND_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: FROM, to: [f('zuEmail')],
          subject: 'Ihre Zuweisung ist eingegangen – TCM.ch',
          html: confHtml,
        }),
      });
    } catch (_) { /* confirmation is non-critical */ }

    return J({ ok: true });
  } catch (err) {
    return J({ error: 'exception', detail: String((err && err.stack) || err) }, 500);
  }
}
