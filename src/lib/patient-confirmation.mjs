// Transactional acknowledgement for TCM.ch patient enquiries.
// Deliberately no patient symptoms, health information, appointment dates or booking promises.
export const PATIENT_REPLY_TO = 'termine@tcm.ch';
export const PATIENT_PHONE = '+41 77 523 61 22';
export const PATIENT_PHONE_E164 = '+41775236122';
export const PATIENT_WHATSAPP = '41775236122';
// An existing public PNG is used rather than an SVG: Outlook and Gmail support varies for SVGs.
// The accompanying live text wordmark remains legible even if remote images are disabled.
export const PATIENT_FOOTER_LOGO = 'https://tcm.ch/images/logo/tcm-ch-email-logo.png';

const clean = (s) => String(s == null ? '' : s).replace(/\s+/g, ' ').trim();
const esc = (s) => clean(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export function patientConfirmation({ name = '', standort = '', kind = 'inquiry', lang = 'de', hasPhone = true } = {}) {
  const en = lang === 'en';
  const first = clean(name).split(/\s+/)[0].slice(0, 60);
  const clinic = clean(standort).slice(0, 110);
  const locationPart = clinic ? (en ? ' at TCM.ch ' : ' bei TCM.ch ') + clinic : (en ? ' at TCM.ch' : ' bei TCM.ch');
  const subject = en ? 'We received your enquiry' + locationPart : 'Ihre Anfrage' + locationPart + ' ist eingegangen';
  const salutation = en ? (first ? 'Hello ' + first + ',' : 'Hello,') : (first ? 'Guten Tag ' + first + ',' : 'Guten Tag,');
  const isWaitlist = kind === 'waitlist';
  const title = en ? 'Thank you for your enquiry.' : 'Vielen Dank für Ihre Anfrage.';
  const received = en
    ? 'Your enquiry' + (clinic ? ' for ' + clinic : '') + ' has reached our patient service team.'
    : 'Ihre Anfrage' + (clinic ? ' für ' + clinic : '') + ' ist bei unserem Patientenservice eingegangen.';
  let typeNote = '';
  if (kind === 'treatment') typeNote = en
    ? 'You enquired about an initial appointment with treatment (90 minutes).'
    : 'Sie haben einen Ersttermin mit Behandlung (90 Minuten) angefragt.';
  if (kind === 'checkin') typeNote = en
    ? 'You enquired about the free 30-minute TCM check-in (without treatment).'
    : 'Sie haben den kostenlosen 30-minütigen TCM-Check-in (ohne Behandlung) angefragt.';
  if (kind === 'routing') typeNote = en
    ? 'We will check which clinic is suitable for your request.'
    : 'Wir prüfen, welche Praxis am besten zu Ihrer Anfrage passt.';
  let next;
  if (isWaitlist) {
    next = en
      ? 'Your registration of interest has been received. We will get in touch when there is news about this location. No appointment has been arranged.'
      : 'Ihre Vormerkung ist eingegangen. Wir informieren Sie, sobald es Neuigkeiten zu diesem Standort gibt. Es ist noch kein Termin vereinbart.';
  } else if (kind === 'routing') {
    next = en
      ? 'Our team will contact you personally as soon as possible with the next steps. This is not yet a confirmed booking.'
      : 'Unser Team meldet sich schnellstmöglich persönlich bei Ihnen, um das weitere Vorgehen zu besprechen. Ein Termin ist damit noch nicht gebucht.';
  } else {
    next = en
      ? (hasPhone ? 'Carlos or Emily from our patient service & concierge team will call you as soon as possible to find a suitable appointment.' : 'Our patient service team will reply to you as soon as possible.')
      : (hasPhone ? 'Carlos oder Emily aus unserem Patientenservice werden sich schnellstmöglich telefonisch bei Ihnen melden, um gemeinsam einen passenden Termin zu finden.' : 'Unser Patientenservice wird sich schnellstmöglich bei Ihnen melden.');
    next += en ? ' Your appointment is not confirmed yet.' : ' Ein Termin ist damit noch nicht verbindlich gebucht.';
  }
  const numberNote = en
    ? 'You can also reach our patient service team directly on ' + PATIENT_PHONE + '.'
    : 'Für Rückfragen erreichen Sie unseren Patientenservice unter ' + PATIENT_PHONE + '.';
  const preference = en
    ? 'Would you like to speed up scheduling? Simply reply to this email with 2–3 suitable days or times. This is entirely optional.'
    : 'Möchten Sie die Terminvereinbarung erleichtern? Antworten Sie einfach auf diese E-Mail mit 2–3 passenden Tagen oder Uhrzeiten. Das ist selbstverständlich freiwillig.';
  const waitlistPreference = en
    ? 'If you have any questions, simply reply to this email.'
    : 'Falls Sie Fragen haben, antworten Sie einfach auf diese E-Mail.';
  const whatsappLabel = en ? 'Write on WhatsApp' : 'Per WhatsApp schreiben';
  const callLabel = en ? 'Call us' : 'Jetzt anrufen';
  const waText = en ? 'Hello, I sent an enquiry via TCM.ch and would like to get in touch.' : 'Guten Tag, ich habe über TCM.ch eine Anfrage geschickt und möchte Kontakt aufnehmen.';
  const wa = 'https://wa.me/' + PATIENT_WHATSAPP + '?text=' + encodeURIComponent(waText);
  const intro = en ? 'Prefer to contact us directly?' : 'Lieber direkt Kontakt aufnehmen?';
  const signoff = en ? 'Kind regards' : 'Herzliche Grüsse';
  const role = en ? 'Patient Service & Concierge' : 'Patientenservice & Concierge';
  const contactLine = isWaitlist ? waitlistPreference : preference;
  const paragraphs = [
    '<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#273540;">' + esc(salutation) + '</p>',
    '<h1 style="margin:0 0 14px;font-size:23px;line-height:1.25;color:#172b3c;font-weight:700;">' + esc(title) + '</h1>',
    '<p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:#273540;">' + esc(received) + '</p>',
    typeNote ? '<p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:#273540;">' + esc(typeNote) + '</p>' : '',
    '<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#273540;">' + esc(next) + '</p>',
    !isWaitlist && hasPhone ? '<p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#425466;">' + esc(numberNote) + '</p>' : '',
    '<div style="margin:20px 0;padding:16px 18px;background-color:#eff6fc;border-left:3px solid #2870a8;border-radius:4px;"><p style="margin:0;font-size:15px;line-height:1.55;color:#172b3c;">' + esc(contactLine) + '</p></div>',
    '<p style="margin:18px 0 8px;font-size:14px;line-height:1.5;color:#425466;">' + esc(intro) + '</p>',
    '<p style="margin:0 0 24px;font-size:14px;line-height:1.7;"><a href="' + wa + '" style="color:#17618f;text-decoration:underline;">' + esc(whatsappLabel) + '</a><span style="color:#a1aab1;"> &nbsp;·&nbsp; </span><a href="tel:' + PATIENT_PHONE_E164 + '" style="color:#17618f;text-decoration:underline;">' + esc(callLabel) + '</a></p>',
    '<p style="margin:0;font-size:14px;line-height:1.5;color:#273540;">' + esc(signoff) + '<br><strong>Carlos &amp; Emily</strong><br>' + esc(role) + '</p>'
  ].join('\n');
  const html = '<!doctype html><html lang="' + (en ? 'en' : 'de-CH') + '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>' +
    '<body style="margin:0;padding:24px 12px;background:#f5f7f9;font-family:Arial,Helvetica,sans-serif;">' +
    '<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:0 auto;border-collapse:collapse;background:#fff;border:1px solid #e4e9ee;border-radius:8px;">' +
    '<tr><td style="padding:30px 30px 22px;">' + paragraphs + '</td></tr>' +
    '<tr><td style="padding:18px 30px;background:#fafbfd;border-top:1px solid #e4e9ee;">' +
    '<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;"><tr>' +
    '<td style="vertical-align:middle;padding-right:16px;"><img src="' + PATIENT_FOOTER_LOGO + '" width="130" height="44" alt="TCM.ch Kliniken" style="display:block;border:0;width:130px;max-width:130px;height:auto;"></td>' +
    '<td style="vertical-align:middle;font-size:13px;line-height:1.4;color:#526372;"><strong style="color:#1c3549;font-size:15px;">TCM.ch Kliniken</strong><br>' +
    '<a href="https://tcm.ch/" style="color:#526372;text-decoration:none;">tcm.ch</a> &nbsp;·&nbsp; ' +
    '<a href="mailto:' + PATIENT_REPLY_TO + '" style="color:#526372;text-decoration:none;">' + PATIENT_REPLY_TO + '</a></td>' +
    '</tr></table></td></tr></table></body></html>';
  const textBody = [
    salutation, '', title, '', received, typeNote, next, hasPhone && !isWaitlist ? numberNote : '',
    '', contactLine, '', intro, whatsappLabel + ': ' + wa, callLabel + ': ' + PATIENT_PHONE, '',
    signoff, 'Carlos & Emily', role, 'TCM.ch Kliniken', PATIENT_REPLY_TO, 'https://tcm.ch/'
  ].filter((s) => s !== null && s !== undefined).join('\n');
  return { subject, html, text: textBody };
}
