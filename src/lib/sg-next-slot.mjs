// Nächster freier «Kostenloser TCM-Check-in» in St. Gallen aus OneDoc (05.11.2026). Plain ESM, damit Worker-Endpoint
// (functions/api/sg-next-slot.js) und Tests (scripts/test-sg-next-slot.mjs) dieselbe Logik nutzen.
//
// Quelle (verifiziert 05.11.2026, Netzwerk-Mitschnitt des OneDoc-Widgets «TCM.ch St Gallen», öffentlich, ohne Token):
//   GET https://www.onedoc.ch/widgets/api/v1/locations/53749/availabilities
//       ?professionalId=3227433&professionId=136&appointmentTypeId=208764&acceptedClientType=new
//       &field=availabilities:timeSlots,nextTimeSlotOn&startDate=YYYY-MM-DD&endDate=YYYY-MM-DD   (Header X-API-Version: 1.2.0)
//   → { data: { timeSlots: { "YYYY-MM-DD": [ { dateTime: "YYYY-MM-DDTHH:MM:SS" (lokale Zeit Europe/Zurich, ohne Offset) } ] },
//              nextTimeSlotOn: "YYYY-MM-DD" | null } }
//   Das Widget fragt zuerst 8 Tage ab und springt bei leerem Fenster auf nextTimeSlotOn. Gleiche Strategie hier.
// IDs: Location 53749 (TCM.ch St Gallen), Professional 3227433 (Corinna Reinhart), Profession 136 (Naturheilkunde TCM),
// Terminart 208764 «Kostenloser TCM-Check-in» (30 Min). Keine Patientendaten, kein Token.

export const ONEDOC_SG = {
  base: 'https://www.onedoc.ch/widgets/api/v1/locations/53749/availabilities',
  params: { professionalId: '3227433', professionId: '136', appointmentTypeId: '208764', acceptedClientType: 'new', field: 'availabilities:timeSlots,nextTimeSlotOn' },
  apiVersion: '1.2.0',
  windowDays: 8,
  /** Nie weiter als 90 Tage suchen (nextTimeSlotOn jenseits davon = kein Slot). */
  maxDays: 90,
  /** Banner zeigt den Slot nur, wenn er innerhalb dieser Tage liegt; sonst Fallback «Angebot gültig bis <Monatsende>». */
  showWithinDays: 14,
};

const TZ = 'Europe/Zurich';
const WD = { de: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'], en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] };
const pad = (n) => String(n).padStart(2, '0');

/** Aktuelle Zeit in Europe/Zurich als naive Komponenten (vergleichbar mit OneDoc-dateTime ohne Offset). */
export function nowInZurich(now = new Date()) {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).formatToParts(now).filter((x) => x.type !== 'literal').map((x) => [x.type, x.value]));
  return `${p.year}-${p.month}-${p.day}T${p.hour === '24' ? '00' : p.hour}:${p.minute}:${p.second}`;
}

/** Naive OneDoc-Zeit (YYYY-MM-DDTHH:MM[:SS]) → Label «Di 11.11., 14:30» (de) / «Tue 11.11., 14:30» (en). */
export function formatSlot(dateTime, lang = 'de') {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(String(dateTime || ''));
  if (!m) return '';
  const [, y, mo, d, h, mi] = m;
  const wd = WD[lang === 'en' ? 'en' : 'de'][new Date(Date.UTC(+y, +mo - 1, +d)).getUTCDay()];
  return `${wd} ${d}.${mo}., ${h}:${mi}`;
}

/** Letzter Tag des laufenden Monats (Europe/Zurich) als «30.11.» – nie hart kodiert; am 1.12. automatisch «31.12.». */
export function gueltigBis(now = new Date()) {
  const ymd = nowInZurich(now).slice(0, 10); const y = +ymd.slice(0, 4), m = +ymd.slice(5, 7);
  const last = new Date(Date.UTC(y, m, 0)).getUTCDate();
  return `${pad(last)}.${pad(m)}.`;
}

const addDays = (ymd, n) => { const t = new Date(ymd + 'T00:00:00Z'); t.setUTCDate(t.getUTCDate() + n); return t.toISOString().slice(0, 10); };
const buildUrl = (startDate, endDate) => { const u = new URL(ONEDOC_SG.base); for (const [k, v] of Object.entries(ONEDOC_SG.params)) u.searchParams.set(k, v); u.searchParams.set('startDate', startDate); u.searchParams.set('endDate', endDate); return u.toString(); };

/** Frühester Slot (naiv, Europe/Zurich) nach `nowLocal` aus einer Availabilities-Antwort; '' wenn keiner. */
export function earliestFutureSlot(data, nowLocal) {
  const ts = (data && data.timeSlots) || {};
  const all = Object.values(ts).flat().map((s) => String((s && s.dateTime) || '')).filter((s) => /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(s)).sort();
  return all.find((s) => s > nowLocal) || '';
}

/**
 * Nächster freier Check-in: { slot, label, source } · slot = naive lokale Zeit oder null. fetchFn: (url, init) => Response.
 * Nie ein erfundener Slot: bei Fehler/leer → slot null.
 */
export async function findNextSlot(fetchFn = globalThis.fetch, now = new Date()) {
  const nowLocal = nowInZurich(now);
  const today = nowLocal.slice(0, 10);
  const get = async (start) => {
    const res = await fetchFn(buildUrl(start, addDays(start, ONEDOC_SG.windowDays - 1)), { headers: { 'X-API-Version': ONEDOC_SG.apiVersion, Accept: 'application/json' } });
    if (!res || !res.ok) throw new Error('onedoc ' + (res && res.status));
    const j = await res.json();
    return (j && j.data) || {};
  };
  let data = await get(today);
  let slot = earliestFutureSlot(data, nowLocal);
  // Leeres Fenster: Sprung auf nextTimeSlotOn (max. zweimal, innerhalb maxDays)
  for (let hop = 0; !slot && hop < 2; hop++) {
    const next = String(data.nextTimeSlotOn || '');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(next) || next < today || next > addDays(today, ONEDOC_SG.maxDays)) break;
    data = await get(next);
    slot = earliestFutureSlot(data, nowLocal);
  }
  if (!slot) return { slot: null, show: false, gueltigBis: gueltigBis(now) };
  const daysAhead = Math.round((Date.UTC(+slot.slice(0, 4), +slot.slice(5, 7) - 1, +slot.slice(8, 10)) - Date.UTC(+today.slice(0, 4), +today.slice(5, 7) - 1, +today.slice(8, 10))) / 86400000);
  return { slot, label: formatSlot(slot, 'de'), labelEn: formatSlot(slot, 'en'), daysAhead, show: daysAhead <= ONEDOC_SG.showWithinDays, gueltigBis: gueltigBis(now) };
}
