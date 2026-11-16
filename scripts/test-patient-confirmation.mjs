import assert from 'node:assert/strict';
import {
  patientConfirmation, PATIENT_PHONE, PATIENT_REPLY_TO, PATIENT_FOOTER_LOGO,
} from '../src/lib/patient-confirmation.mjs';

const treatment = patientConfirmation({ name: 'Anna Muster', standort: 'Zürich Oerlikon', kind: 'treatment', hasPhone: true });
assert.equal(treatment.subject, 'Ihre Anfrage bei TCM.ch Zürich Oerlikon ist eingegangen');
assert.match(treatment.text, /90 Minuten/);
assert.match(treatment.text, /2–3 passenden Tagen/);
assert.ok(treatment.html.includes('https://wa.me/41775236122'));
assert.ok(treatment.html.includes('tel:+41775236122'));
assert.ok(treatment.html.includes(PATIENT_FOOTER_LOGO));
assert.ok(treatment.html.includes(PATIENT_REPLY_TO));
assert.ok(treatment.text.includes(PATIENT_PHONE));
assert.ok(!treatment.text.includes('Ihre Behandlung ist gebucht'));

const checkin = patientConfirmation({ name: 'Eva', standort: 'St. Gallen', kind: 'checkin' });
assert.match(checkin.text, /30-minütigen TCM-Check-in/);
assert.match(checkin.text, /ohne Behandlung/);
assert.ok(!checkin.text.includes('90 Minuten'));

const english = patientConfirmation({ name: 'Mary Smith', standort: 'Zürich Höngg', kind: 'inquiry', lang: 'en' });
assert.match(english.subject, /We received your enquiry/);
assert.match(english.text, /2–3 suitable days/);
assert.ok(!english.text.includes('Vielen Dank'));

const waitlist = patientConfirmation({ standort: 'Basel', kind: 'waitlist', hasPhone: false });
assert.match(waitlist.text, /Vormerkung/);
assert.match(waitlist.text, /noch kein Termin vereinbart/);
assert.ok(!waitlist.text.includes('2–3 passenden Tagen'));

const escaped = patientConfirmation({ name: '<script>alert(1)</script>', standort: 'Zürich <img src=x onerror=alert(1)>', kind: 'routing' });
assert.ok(!escaped.html.includes('<script>'));
assert.ok(!escaped.html.includes('<img src=x onerror=alert(1)>'));
assert.ok(escaped.html.includes('&lt;script&gt;'));

console.log('TCM.ch patient confirmation tests passed (DE/EN, booking type, waitlist, links, XSS).');
