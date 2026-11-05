// Tests: nächster freier Check-in (src/lib/sg-next-slot.mjs + functions/api/sg-next-slot.js) mit gemocktem OneDoc.
//   node scripts/test-sg-next-slot.mjs            (Mocks; mit --live zusätzlich ein echter Abruf, nur informativ)
import { findNextSlot, formatSlot, earliestFutureSlot, nowInZurich, gueltigBis } from '../src/lib/sg-next-slot.mjs';
import { onRequestGet } from '../functions/api/sg-next-slot.js';

let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.error('  ✗ ' + m); } else console.log('  ✓ ' + m); };
const resp = (data, status = 200) => ({ ok: status === 200, status, json: async () => ({ data, relations: {} }) });
const now = new Date('2026-11-05T12:00:00Z'); // 13:00 Europe/Zurich

console.log('1. Formatierung');
ok(formatSlot('2026-11-11T14:30:00') === 'Mi 11.11., 14:30', 'de: Mi 11.11., 14:30 (11.11.2026 ist ein Mittwoch)');
ok(formatSlot('2026-11-10T14:30:00') === 'Di 10.11., 14:30', 'de: Di 10.11., 14:30');
ok(formatSlot('2026-12-07T09:00:00') === 'Mo 07.12., 09:00', 'de: Mo 07.12., 09:00');
ok(formatSlot('2026-11-08T08:05:00') === 'So 08.11., 08:05', 'de: Sonntag + führende Null');
ok(formatSlot('2026-11-11T14:30:00', 'en') === 'Wed 11.11., 14:30', 'en: Wed 11.11., 14:30 (Mittwoch korrekt)');
ok(formatSlot('kaputt') === '', 'ungültig → leer');
ok(/^2026-11-05T1[34]:00:00$/.test(nowInZurich(now)), 'nowInZurich: 12:00Z → 13:00 lokal (CET)');

console.log('1b. Angebot gültig bis (Monatsende, Europe/Zurich)');
ok(gueltigBis(new Date('2026-11-05T12:00:00Z')) === '30.11.', '05.11. → 30.11.');
ok(gueltigBis(new Date('2026-11-30T22:30:00Z')) === '30.11.', '30.11. 23:30 Zürich → 30.11.');
ok(gueltigBis(new Date('2026-11-30T23:30:00Z')) === '31.12.', '30.11. 23:30Z = 01.12. 00:30 Zürich → 31.12.');
ok(gueltigBis(new Date('2028-02-10T12:00:00Z')) === '29.02.', 'Schaltjahr Februar → 29.02.');
ok(gueltigBis(new Date('2026-12-31T12:00:00Z')) === '31.12.', '31.12. → 31.12.');

console.log('2. Slot-Auswahl');
const nowLocal = nowInZurich(now);
ok(earliestFutureSlot({ timeSlots: { '2026-11-05': [{ dateTime: '2026-11-05T09:00:00' }, { dateTime: '2026-11-05T15:30:00' }], '2026-11-06': [{ dateTime: '2026-11-06T08:00:00' }] } }, nowLocal) === '2026-11-05T15:30:00', 'Slots in der Vergangenheit (09:00) übersprungen, 15:30 heute gewählt');
ok(earliestFutureSlot({ timeSlots: { '2026-11-05': [{ dateTime: '2026-11-05T09:00:00' }] } }, nowLocal) === '', 'nur vergangene Slots → leer');
ok(earliestFutureSlot({}, nowLocal) === '', 'keine Daten → leer');

console.log('3. findNextSlot (zweistufig wie das Widget)');
{ const calls = [];
  const fetchMock = async (url) => { calls.push(url); const u = new URL(url); const start = u.searchParams.get('startDate');
    if (start === '2026-11-05') return resp({ timeSlots: { '2026-11-05': [], '2026-11-06': [] }, nextTimeSlotOn: '2026-12-07' });
    if (start === '2026-12-07') return resp({ timeSlots: { '2026-12-07': [{ dateTime: '2026-12-07T10:30:00' }, { dateTime: '2026-12-07T09:00:00' }] }, nextTimeSlotOn: null });
    return resp({ timeSlots: {} }); };
  const r = await findNextSlot(fetchMock, now);
  ok(r.slot === '2026-12-07T09:00:00' && r.label === 'Mo 07.12., 09:00', `erstes Fenster leer → nextTimeSlotOn → frühester Slot (${r.label})`);
  ok(r.daysAhead === 32 && r.show === false && r.gueltigBis === '30.11.', 'Slot in 32 Tagen → show false, Fallback «gültig bis 30.11.»');
  ok(calls.length === 2 && /appointmentTypeId=208764/.test(calls[0]) && /professionalId=3227433/.test(calls[0]) && /acceptedClientType=new/.test(calls[0]) && /startDate=2026-11-05&endDate=2026-11-12/.test(calls[0]), 'zwei Abrufe, Parameter wie das Widget (Check-in 208764, Corinna, 8-Tage-Fenster)');
}
{ const r = await findNextSlot(async () => resp({ timeSlots: { '2026-11-05': [] }, nextTimeSlotOn: null }), now); ok(r.slot === null && r.show === false && r.gueltigBis === '30.11.', 'leer ohne nextTimeSlotOn → slot null, Fallback-Datum'); }
{ const r = await findNextSlot(async () => resp({ timeSlots: { '2026-11-12': [{ dateTime: '2026-11-12T14:30:00' }] }, nextTimeSlotOn: null }), now); ok(r.show === true && r.daysAhead === 7 && r.label === 'Do 12.11., 14:30', 'Slot in 7 Tagen → show true'); }
{ const r = await findNextSlot(async () => resp({ timeSlots: {}, nextTimeSlotOn: '2027-06-01' }), now); ok(r.slot === null, 'nextTimeSlotOn > 90 Tage → slot null (kein Sprung)'); }
{ let threw = false; try { await findNextSlot(async () => resp(null, 500), now); } catch (e) { threw = true; } ok(threw, 'HTTP 500 → Fehler (Endpoint antwortet dann slot null)'); }

console.log('4. Endpoint /api/sg-next-slot (fetch gemockt, Cache-API fehlt in Node)');
const realFetch = globalThis.fetch;
globalThis.fetch = async (url) => { const start = new URL(url).searchParams.get('startDate'); return new Response(JSON.stringify({ data: start === new Date().toISOString().slice(0, 10) || true ? { timeSlots: { [start]: [{ dateTime: start + 'T23:59:00' }] }, nextTimeSlotOn: null } : {} }), { status: 200 }); };
{ const res = await onRequestGet({ request: new Request('https://tcm.ch/api/sg-next-slot') }); const j = await res.json();
  ok(res.status === 200 && /max-age=600/.test(res.headers.get('Cache-Control')) && typeof j.slot === 'string' && /^\w{2} \d{2}\.\d{2}\., 23:59$/.test(j.label) && j.fetchedAt, `200, Cache 10 Min, Slot + Label (${j.label}), keine weiteren Felder`);
  ok(!('calendars' in j) && Object.keys(j).sort().join() === 'daysAhead,fetchedAt,gueltigBis,label,labelEn,show,slot', 'nur Datum/Uhrzeit + show/gueltigBis, keine OneDoc-Rohdaten'); }
globalThis.fetch = async () => { throw new Error('netz'); };
{ const res = await onRequestGet({ request: new Request('https://tcm.ch/api/sg-next-slot') }); const j = await res.json();
  ok(res.status === 200 && j.slot === null && j.show === false && /^\d{2}\.\d{2}\.$/.test(j.gueltigBis) && /max-age=60\b/.test(res.headers.get('Cache-Control')), 'Fehler → 200 mit slot null + gueltigBis, kurzer Cache (nie ein erfundener Slot)'); }
globalThis.fetch = realFetch;

if (process.argv.includes('--live')) {
  console.log('5. Live-Abruf OneDoc (informativ)');
  try { const r = await findNextSlot(fetch, new Date()); console.log('  →', JSON.stringify(r)); } catch (e) { console.log('  → Fehler', e.message); }
}
console.log(fails ? `\n${fails} Fehler` : '\nsg-next-slot: 0 Fehler');
process.exit(fails ? 1 : 0);
