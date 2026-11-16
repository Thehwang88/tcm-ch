import assert from 'node:assert/strict';
import { swissMobileE164, isZurichSmsPilot, wantsSms, smsEligible, smsMessage, sendSmsConfirmation } from '../src/lib/sms-confirmation.mjs';
import { patientConfirmation } from '../src/lib/patient-confirmation.mjs';
import { readFileSync } from 'node:fs';

assert.equal(swissMobileE164('077 523 61 22'), '+41775236122');
assert.equal(swissMobileE164('0041 79 123 45 67'), '+41791234567');
assert.equal(swissMobileE164('+41 77 523 61 22'), '+41775236122');
assert.equal(swissMobileE164('052 123 45 67'), null);
assert.equal(swissMobileE164('+44 7700 900 123'), null);

const zurich = { telefon: '077 523 61 22', sms_einwilligung: true, standort: 'Zürich Oerlikon' };
assert.equal(isZurichSmsPilot(zurich), true);
assert.equal(isZurichSmsPilot({standort:'St. Gallen',quelle:'/standorte/st-gallen/'}), false);
assert.equal(isZurichSmsPilot({anfrage_typ:'zuerich-routing'}), true);
assert.equal(wantsSms(zurich), true);
assert.equal(smsEligible(zurich, true, false, false), true);
assert.equal(smsEligible({ ...zurich, sms_einwilligung:false }, true, false, false), false);
assert.equal(smsEligible(zurich, true, true, false), false);
assert.equal(smsEligible(zurich, false, false, false), false);
assert.equal(smsEligible(zurich, true, false, true), false);

assert.ok(smsMessage().length <= 160, 'SMS must fit into one segment');
assert.match(smsMessage(), /^[\x20-\x7e]*$/);
assert.match(smsMessage(), /Carlos oder Emily/);
assert.ok(!smsMessage().includes('Schmerzen'));

let calls = [];
const fakeFetch = async (url, opts) => {
  calls.push({ url, opts });
  return { ok:true, status:201 };
};
const cred = { TCM_SMS_ENABLED: 'true', TWILIO_ACCOUNT_SID:'AC'+'a'.repeat(32), TWILIO_AUTH_TOKEN:'fake-key' };
assert.equal(await sendSmsConfirmation({env:{...cred,TCM_SMS_ENABLED:'false'},d:zurich,fetchFn:fakeFetch}),false);
assert.equal(await sendSmsConfirmation({env:cred,d:{...zurich,sms_einwilligung:false},fetchFn:fakeFetch}),false);
assert.equal(await sendSmsConfirmation({env:cred,d:{...zurich,standort:'St. Gallen'},fetchFn:fakeFetch}),false);
assert.equal(calls.length,0,'No network calls before explicit consent + enabled pilot');
assert.equal(await sendSmsConfirmation({env:cred,d:zurich,fetchFn:fakeFetch}),true);
assert.equal(calls.length,1,'one SMS attempt per eligible enquiry');
const payload = new URLSearchParams(calls[0].opts.body);
assert.equal(payload.get('To'),'+41775236122');
assert.equal(payload.get('From'),'TCMch');
assert.equal(payload.get('Body'),smsMessage());
assert.ok(calls[0].url.includes('/Messages.json'));

const deEmail = patientConfirmation({name:'Anna Muster',standort:'Zürich Oerlikon',kind:'treatment',contactWay:'email'});
assert.match(deEmail.text,/per E-Mail/);
assert.ok(!deEmail.text.includes('Rückrufe von Carlos'));
const waEmail = patientConfirmation({name:'Anna',standort:'Zürich Oerlikon',contactWay:'whatsapp'});
assert.match(waEmail.text,/per WhatsApp/);
const defaultEmail = patientConfirmation({name:'Anna',standort:'Zürich Oerlikon',hasPhone:true});
assert.match(defaultEmail.text,/telefonisch/);

for (const layout of ['src/pages/index.astro','src/layouts/SpaPage.astro','src/layouts/LayoutDe.astro','src/layouts/Layout.astro']) {
  const html=readFileSync(layout,'utf8');
  assert.ok(html.includes('/patient-preferences.js'),layout+' missing preference script');
  assert.ok(html.includes('/patient-preferences.css'),layout+' missing preference styles');
}
for (const p of ['public/kontakt-form.js','public/home.js','src/components/en/AppointmentForm.astro']) {
  assert.ok(readFileSync(p,'utf8').includes('kontaktweg'),p+' missing contact preferences payload');
}
console.log('PASS: contact preference + timing; Swiss SMS validation, consent gate, provider request, 4 layout entrypoints and languages.');
