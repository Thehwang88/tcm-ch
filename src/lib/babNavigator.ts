// BAB-Navigator: Schritte, Branching und Rule Engine (reine Funktionen, keine UI).
// Daten ausschliesslich aus src/data/regulatorik/ (Kantone, Quellen, Fakten). Keine eigene Regelsammlung.
// Grundsatz: lieber «direkt beim Kanton prüfen» als eine kantonale Aussage erfinden.
import { SOURCES, F, type SourceId } from '../data/regulatorik/sources';
import { KANTONE, isPublishable, type CantonCode, type BabMethodKey, type Claim } from '../data/regulatorik/kantone';
import { CANTONS } from './recognitionNavigator';

export { CANTONS };
export type BabMethod = 'akupunktur' | 'tuina' | 'arznei' | 'akupressur' | 'moxa' | 'schroepfen' | 'andere';
export type BabQualification = 'diplom' | 'zertifikat' | 'ausbildung' | 'ausland' | 'andere';
export type BabEmployment = 'selbststaendig' | 'angestellt' | 'beides' | 'offen';
export type BabStatus = 'ja' | 'nein' | 'antrag' | 'unbekannt';
export type Dispense = 'ja' | 'nein' | 'nicht_geplant' | 'unbekannt';

export interface BabNavigatorAnswers {
  canton?: CantonCode;
  methods?: BabMethod[];
  qualification?: BabQualification;
  employment?: BabEmployment;
  babStatus?: BabStatus;
  dispensesMedicine?: Dispense;
}

export type BabStepId = 'canton' | 'methods' | 'qualification' | 'employment' | 'babStatus' | 'dispensesMedicine';
export const BAB_STEP_LABELS: Record<BabStepId, string> = {
  canton: 'Kanton', methods: 'Tätigkeit', qualification: 'Qualifikation', employment: 'Arbeitsform', babStatus: 'BAB-Status', dispensesMedicine: 'Arzneimittel',
};
export const BAB_METHOD_LABELS: Record<BabMethod, string> = {
  akupunktur: 'Akupunktur', tuina: 'Tuina', arznei: 'Chinesische Arzneitherapie', akupressur: 'Akupressur', moxa: 'Moxibustion', schroepfen: 'Schröpfen', andere: 'Andere Methode',
};
export const BAB_QUAL_LABELS: Record<BabQualification, string> = {
  diplom: 'Eidg. Diplom', zertifikat: 'Zertifikat OdA AM', ausbildung: 'In Ausbildung', ausland: 'Ausländischer Abschluss', andere: 'Andere Qualifikation',
};
export const BAB_EMPLOYMENT_LABELS: Record<BabEmployment, string> = {
  selbststaendig: 'selbstständig', angestellt: 'angestellt', beides: 'selbstständig und angestellt', offen: 'Arbeitsform offen',
};
/** Zuordnung der Tool-Methoden zu den Feldern des Kantonsmodells. Methoden werden rechtlich NICHT gleichgesetzt. */
const METHOD_KEY: Record<BabMethod, BabMethodKey> = {
  akupunktur: 'acupuncture', tuina: 'tuina', arznei: 'herbalMedicine', akupressur: 'otherTcm', moxa: 'otherTcm', schroepfen: 'otherTcm', andere: 'otherTcm',
};

const record = (c?: CantonCode) => KANTONE.find((k) => k.cantonCode === c);

/** Sichtbare Schritte (Branching). Arbeitsform nur, wenn der Kanton dafür eine verifizierte Regel hat. */
export function getBabSteps(a: BabNavigatorAnswers): BabStepId[] {
  const s: BabStepId[] = ['canton', 'methods', 'qualification'];
  const rec = record(a.canton);
  if (rec?.employmentRule && a.qualification !== 'ausbildung') s.push('employment');
  if (a.qualification !== 'ausbildung') s.push('babStatus');
  if (a.methods?.includes('arznei')) s.push('dispensesMedicine');
  return s;
}
export const isBabAnswered = (a: BabNavigatorAnswers, st: BabStepId) => (st === 'methods' ? !!a.methods?.length : a[st] !== undefined);

export interface BabSource { label: string; url: string; checked: string | null; stale: boolean }
export interface BabItem { id: string; title: string; text: string; cta?: { label: string; href: string; external?: boolean }; secondary?: { label: string; href: string }; source?: BabSource }
export interface BabSummaryRow { label: string; value: string; state: 'done' | 'todo' | 'info' }
export interface BabNavigatorResult {
  headline: string;
  sub: string;
  summary: BabSummaryRow[];
  primaryActions: BabItem[];
  requirements: BabItem[];
  methodSpecific: BabItem[];
  medicine: BabItem[];
  completed: BabItem[];
  warnings: BabItem[];
  checklist: string[];
  sources: BabSource[];
}

/** Schwelle, ab der eine Quelle als «bitte aktuell gegenprüfen» markiert wird. */
export const FRESH_DAYS = 90;
const isStale = (d: string | null, now = new Date()) => !d || (now.getTime() - new Date(d).getTime()) / 864e5 > FRESH_DAYS;
const toSource = (id: SourceId, now?: Date): BabSource => {
  const s = SOURCES[id];
  return { label: `${s.org}: ${s.title}`, url: s.url, checked: s.checked, stale: isStale(s.checked, now) };
};
/** Nur geprüfte, präzise Quellen werden als «offizielle Stelle» angeboten. */
const usable = (ids?: SourceId[]) => (ids ?? []).filter((id) => SOURCES[id]?.checked && SOURCES[id]?.precise);
const claimSource = (c: NonNullable<Claim>, checked: string | null, now?: Date): BabSource => ({ label: 'Offizielle Quelle', url: c.sourceUrl, checked, stale: isStale(checked, now) });
const joinDe = (xs: string[]) => (xs.length <= 1 ? xs.join('') : `${xs.slice(0, -1).join(', ')} und ${xs[xs.length - 1]}`);

export function getBabPlan(a: BabNavigatorAnswers, now = new Date()): BabNavigatorResult {
  const rec = record(a.canton);
  const kt = rec?.cantonName ?? 'deinem Kanton';
  const methods = a.methods?.length ? a.methods : (['andere'] as BabMethod[]);
  const methodLabels = methods.map((m) => BAB_METHOD_LABELS[m]);
  const qual = a.qualification ?? 'andere';
  const verified = !!rec && isPublishable(rec);
  const officialIds = usable(rec?.officialSourceIds);
  const official = officialIds[0] ? toSource(officialIds[0], now) : undefined;
  const authorityUrl = rec?.officialUrl ?? official?.url;
  const primaryActions: BabItem[] = [], requirements: BabItem[] = [], methodSpecific: BabItem[] = [], medicine: BabItem[] = [], completed: BabItem[] = [], warnings: BabItem[] = [];
  const openCta = authorityUrl ? { label: 'Offizielle Stelle öffnen →', href: authorityUrl, external: true } : undefined;

  // 1. Berufsweg vor BAB
  if (qual === 'ausbildung') {
    primaryActions.push({ id: 'path', title: 'Berufsweg und erlaubten Tätigkeitsumfang zuerst klären',
      text: `Solange dein Berufsweg nicht abgeschlossen ist, klärst du zuerst, welche Tätigkeit du ${rec ? `im Kanton ${kt}` : 'in deinem Kanton'} in welcher Form ausüben darfst, zum Beispiel während der Berufspraxis unter Mentorat.`,
      cta: openCta ?? { label: 'OdA AM verstehen', href: '/regulatorik/oda-am/' }, secondary: { label: 'OdA AM & M7', href: '/regulatorik/oda-am/' }, source: official });
  }
  if (qual === 'ausland') {
    primaryActions.push({ id: 'foreign', title: 'Qualifikation zuerst einordnen',
      text: 'Ob und wie dein ausländischer Abschluss für den Schweizer Berufsweg berücksichtigt wird, klärt die zuständige offizielle Stelle anhand deines konkreten Abschlusses. Eine Anerkennung können wir nicht vorhersagen.',
      cta: { label: 'Aus dem Ausland in die Schweiz', href: '/branche/tcm-international-schweiz/' }, secondary: { label: 'OdA AM verstehen', href: '/regulatorik/oda-am/' } });
  }
  if (qual === 'andere') {
    primaryActions.push({ id: 'other', title: 'Qualifikation einordnen',
      text: 'Kläre, welchem Schweizer Berufsweg deine Qualifikation entspricht. Davon hängen die kantonalen Voraussetzungen ab.',
      cta: { label: 'Wer macht was?', href: '/branche/organisationen/' }, secondary: { label: 'OdA AM verstehen', href: '/regulatorik/oda-am/' } });
  }

  // 2. BAB selbst (nie eine Rechtsentscheidung)
  if (qual !== 'ausbildung') {
    const status = a.babStatus ?? 'unbekannt';
    if (status === 'ja') {
      completed.push({ id: 'bab', title: `BAB bereits vorhanden${rec ? ` (${kt})` : ''}`, text: 'Prüfe bei Änderungen von Kanton, Tätigkeit oder Praxisform, ob eine Anpassung oder neue Meldung nötig ist.', source: official });
    } else if (status === 'antrag') {
      primaryActions.push({ id: 'bab', title: 'BAB-Antrag abschliessen', text: 'Dein Antrag läuft. Plane Mietvertrag und Praxisstart erst, wenn die Bewilligung vorliegt.', cta: openCta, source: official });
    } else {
      primaryActions.push(official || verified
        ? { id: 'bab', title: `BAB beim Kanton ${kt} prüfen`,
            text: `Für deine Kombination aus Kanton, Methode und Qualifikation solltest du die kantonalen Voraussetzungen für die Berufsausübung prüfen.${qual === 'ausland' ? ' Zusätzlich muss geklärt werden, wie dein Abschluss für den Schweizer Berufsweg eingeordnet wird.' : ''}`,
            cta: openCta, secondary: { label: 'BAB verstehen', href: '/regulatorik/berufsausuebungsbewilligung/' }, source: official }
        : { id: 'bab', title: 'Direkt beim Kanton prüfen',
            text: `Für diese Kombination haben wir derzeit keine ausreichend verifizierte Detailregel hinterlegt. Wende dich an die kantonale Gesundheitsbehörde${rec ? ` des Kantons ${kt}` : ''}.${qual === 'ausland' ? ' Zusätzlich muss geklärt werden, wie dein Abschluss für den Schweizer Berufsweg eingeordnet wird.' : ''}`,
            cta: openCta, secondary: { label: 'BAB verstehen', href: '/regulatorik/berufsausuebungsbewilligung/' } });
    }
  }

  // 3. Unterlagen: nur verifizierte, kantonsspezifische Einträge
  if (verified && rec?.documents?.length) {
    for (const d of rec.documents) requirements.push({ id: `doc-${d.text}`, title: d.text, text: '', source: claimSource(d, rec.lastVerified, now) });
  }

  // 4. Methodenspezifisch (dedupliziert nach Modellfeld)
  const byKey = new Map<BabMethodKey, BabMethod[]>();
  for (const m of methods) { const k = METHOD_KEY[m]; byKey.set(k, [...(byKey.get(k) ?? []), m]); }
  const unverified: string[] = [];
  for (const [key, ms] of byKey) {
    const label = joinDe(ms.map((m) => BAB_METHOD_LABELS[m]));
    const claim = verified ? (rec![key] as Claim) : null;
    const mIds = usable(rec?.methodSourceIds?.[key]);
    if (claim) {
      methodSpecific.push({ id: `m-${key}`, title: label, text: claim.text, source: claimSource(claim, rec!.lastVerified, now) });
    } else if (mIds.length) {
      const src = toSource(mIds[0], now);
      methodSpecific.push({ id: `m-${key}`, title: `${label}: eigene kantonale Unterlage`, text: `Der Kanton ${kt} führt dafür eine eigene offizielle Unterlage (${SOURCES[mIds[0]].title}). Prüfe die dort genannten Voraussetzungen. Eine Zusammenfassung davon haben wir nicht hinterlegt.`, cta: { label: 'Unterlage öffnen →', href: src.url, external: true }, source: src });
    } else if (key !== 'herbalMedicine') unverified.push(...ms.map((m) => BAB_METHOD_LABELS[m]));
  }
  if (unverified.length) methodSpecific.push({ id: 'm-open', title: joinDe(unverified), text: 'Für diese Methode haben wir derzeit keine zusätzliche verifizierte kantonale Detailregel hinterlegt.' });

  // 5. Arzneimittel: separat von der BAB
  if (methods.includes('arznei')) {
    const d = a.dispensesMedicine;
    medicine.push({ id: 'med', title: 'Chinesische Arzneimittel separat prüfen',
      text: 'Berufsausübungsbewilligung und Arzneimittelabgabe sind nicht automatisch dieselbe regulatorische Frage.' + (d === 'ja' || d === 'unbekannt' ? ` ${F.retailPermit} Separat mit dem Kanton prüfen.` : ' Wenn du später Arzneimittel abgeben willst, prüfe das vorher separat.'),
      cta: { label: 'Arzneimittelabgabe verstehen', href: '/regulatorik/chinesische-arzneimittel-abgabe/' },
      source: usable(['swissmedicKomplementaer'])[0] ? toSource('swissmedicKomplementaer', now) : undefined });
  }

  // 6. Hinweise
  const allSources = [official, ...methodSpecific.map((i) => i.source), ...medicine.map((i) => i.source)].filter(Boolean) as BabSource[];
  if (allSources.some((s) => s.stale)) warnings.push({ id: 'stale', title: 'Bitte aktuell gegenprüfen', text: `Mindestens eine Quelle wurde vor mehr als ${FRESH_DAYS} Tagen zuletzt geprüft.` });
  if (!verified) warnings.push({ id: 'unverified', title: 'Noch nicht ausreichend verifiziert', text: `Für ${rec ? `den Kanton ${kt}` : 'diesen Kanton'} haben wir die Regeln noch nicht vollständig gegen die kantonale Primärquelle geprüft. Wir zeigen deshalb nur, was belegt ist.` });

  const babRow: BabSummaryRow = qual === 'ausbildung' ? { label: 'BAB', value: 'nach Berufsweg klären', state: 'todo' }
    : a.babStatus === 'ja' ? { label: 'BAB', value: 'vorhanden', state: 'done' }
    : a.babStatus === 'antrag' ? { label: 'BAB', value: 'Antrag läuft', state: 'todo' }
    : { label: 'BAB', value: 'prüfen', state: 'todo' };
  const summary: BabSummaryRow[] = [
    { label: 'Kanton', value: rec?.cantonName ?? 'offen', state: 'info' },
    { label: 'Tätigkeit', value: joinDe(methodLabels), state: 'info' },
    { label: 'Qualifikation', value: BAB_QUAL_LABELS[qual], state: qual === 'diplom' || qual === 'zertifikat' ? 'done' : 'todo' },
    babRow,
    { label: 'Behörde', value: authorityUrl ? 'Quelle verlinkt' : 'direkt beim Kanton klären', state: authorityUrl ? 'done' : 'todo' },
    { label: 'Unterlagen', value: requirements.length ? 'Checkliste verfügbar' : 'bei der Behörde erfragen', state: requirements.length ? 'done' : 'todo' },
    { label: 'Arzneimittel', value: methods.includes('arznei') ? 'separat prüfen' : 'nicht relevant', state: methods.includes('arznei') ? 'todo' : 'info' },
  ];

  const checklist = [
    ...primaryActions.map((i) => i.title),
    ...(authorityUrl && babRow.state === 'todo' && qual !== 'ausbildung' ? ['Offizielle Seite des Kantons öffnen'] : []),
    ...requirements.map((i) => `${i.title} bereithalten`),
    ...methodSpecific.filter((i) => i.cta).map((i) => `Kantonale Unterlage zu ${i.title.split(':')[0]} prüfen`),
    ...medicine.map(() => 'Arzneimittelabgabe separat prüfen'),
  ];

  const headline = qual === 'ausbildung' ? 'Kläre zuerst deinen Berufsweg.'
    : rec ? `Für ${rec.cantonName} solltest du diese Punkte prüfen.` : 'Diese Punkte solltest du prüfen.';
  const sub = [joinDe(methodLabels), BAB_QUAL_LABELS[qual], a.employment && getBabSteps(a).includes('employment') ? BAB_EMPLOYMENT_LABELS[a.employment] : ''].filter(Boolean).join(' · ');
  const sources = [...new Map(allSources.map((s) => [s.url, s])).values()];
  return { headline, sub, summary, primaryActions, requirements, methodSpecific, medicine, completed, warnings, checklist, sources };
}

export function babPlanAsText(a: BabNavigatorAnswers, p: BabNavigatorResult): string {
  const kt = KANTONE.find((k) => k.cantonCode === a.canton)?.cantonName;
  return [
    'Mein TCM.ch BAB-Check', '',
    kt ? `Kanton: ${kt}` : '', `Tätigkeit: ${p.summary[1].value}`, '',
    'Nächste Schritte:', ...p.checklist.map((c) => `□ ${c}`), '',
    ...(p.sources.length ? ['Quelle:', ...new Set(p.sources.map((s) => s.label.split(':')[0]))] : ['Quelle: direkt beim Kanton erfragen']), '',
    'Hinweis:', 'Der Check dient der Orientierung. Verbindlich sind die aktuellen kantonalen Vorgaben.',
  ].filter((l, i, arr) => !(l === '' && arr[i - 1] === '')).join('\n');
}

export const BAB_STORAGE_KEY = 'tcmch-bab-navigator-v1';
