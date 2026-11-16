// TCM.ch transactional SMS acknowledgement (Zurich pilot).
// Explicit patient opt-in + Turnstile-protected inquiry + account-level kill switch.
// Never put medical conditions, symptoms, names or appointment details into the SMS.
// Twilio alphanumeric senders are one-way: include the real callback telephone number.
export const SMS_CALLBACK_PHONE = '+41 77 523 61 22';
export const SMS_FROM = 'TCMch';

export function swissMobileE164(value) {
  let n = String(value == null ? '' : value).trim().replace(/[()\s.\-]/g, '');
  if (n.startsWith('0041')) n = '+41' + n.slice(4);
  if (/^07[5-9]\d{7}$/.test(n)) n = '+41' + n.slice(1);
  return /^\+417[5-9]\d{7}$/.test(n) ? n : null;
}
export function isZurichSmsPilot(d) {
  const loc = String(d.standort || '') + ' ' + String(d.standort_id || '');
  const page = String(d.quelle || d.seite || '');
  return /(zürich|zuerich|zurich|oerlikon|höngg|hoengg)/i.test(loc) ||
    d.anfrage_typ === 'zuerich-routing' ||
    /^\/(?:en\/)?(?:akupunktur-tcm-zuerich|acupuncture-zurich)(?:\/|$)/i.test(page);
}
export function wantsSms(d) {
  return d.sms_einwilligung === true || d.sms_einwilligung === 'ja';
}
export function smsEligible(d, isPatient, isWaitlist, isHwang) {
  return !!isPatient && !isWaitlist && !isHwang &&
    wantsSms(d) && isZurichSmsPilot(d) && !!swissMobileE164(d.telefon);
}
export function smsMessage() {
  // GSM-7 basic characters, 139 chars max => one billable SMS segment.
  return 'TCM.ch: Danke fuer deine Anfrage! Carlos oder Emily melden sich. Rueckfragen: +41 77 523 61 22. Auf diese SMS kann man nicht antworten.';
}
export async function sendSmsConfirmation({ env, d, fetchFn = fetch }) {
  if (!env || env.TCM_SMS_ENABLED !== 'true' || !wantsSms(d) || !isZurichSmsPilot(d)) return false; // off by default; no charges
  const sid = String(env.TWILIO_ACCOUNT_SID || '');
  const token = String(env.TWILIO_AUTH_TOKEN || '');
  const sender = String(env.TWILIO_SMS_FROM || SMS_FROM);
  const to = swissMobileE164(d.telefon);
  if (!/^AC[0-9a-f]{32}$/i.test(sid) || !token || !to || !/^[a-zA-Z0-9 ]{1,11}$/.test(sender)) return false;
  try {
    const endpoint = 'https://api.twilio.com/2010-04-01/Accounts/' + sid + '/Messages.json';
    const body = new URLSearchParams({ From: sender, To: to, Body: smsMessage() });
    const res = await fetchFn(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(sid + ':' + token),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) console.error('patient_sms_dispatch_failed', res.status); // do not log PII/provider response
    return res.ok; // queued/accepted by provider, NOT confirmed handset delivery
  } catch (_) {
    console.error('patient_sms_dispatch_exception');
    return false;
  }
}
