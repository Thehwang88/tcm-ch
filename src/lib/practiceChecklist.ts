// Praxis-Checkliste: reine Priorisierungs-Logik, UI rendert nur das Ergebnis.
// KEINE zweite Regulatorik-Wahrheit: BAB, OdA AM, EMR, ASCA, ZSR, Tarif 590 und Versicherer werden hier nur als
// Status des Users geführt und an die bestehenden Tools / Regulatorik-Seiten weitergeleitet. Keine Regeln, keine Fristen.
import { CANTONS } from './recognitionNavigator';

export const PC_STORAGE_KEY = 'tcmch-practice-checklist-v1';
export { CANTONS };

export type Stage = 'training' | 'graduated' | 'zertifikat' | 'diplom' | 'ausland' | 'open';
export type Method = 'acupuncture' | 'tuina' | 'herbal' | 'acupressure' | 'moxa' | 'cupping' | 'other';
export type Bab = 'yes' | 'pending' | 'not_needed' | 'unchecked' | 'unknown';
export type RegKey = 'emr' | 'asca' | 'egk' | 'visana';
export type RegState = 'done' | 'pending' | 'open' | 'na' | 'unknown';
export type BillKey = 'zsr' | 'tarif' | 'invoicing';
export type BillState = 'yes' | 'wip' | 'no';
export type OpsKey = 'raum' | 'versicherung' | 'termine' | 'abrechnung' | 'datenschutz' | 'telefon' | 'zahlung' | 'buchhaltung';
export type OpsState = 'done' | 'wip' | 'open';
export type MktKey = 'website' | 'gbp' | 'tracking' | 'booking' | 'phone' | 'source' | 'network';
export type Goal = 'open' | 'professionalize' | 'grow' | 'team';

export interface ChecklistAnswers {
  stage?: Stage; canton?: string; methods?: Method[]; bab?: Bab;
  regs?: Partial<Record<RegKey, RegState>>; regsSeen?: boolean;
  billing?: Partial<Record<BillKey, BillState>>; billingSeen?: boolean;
  ops?: Partial<Record<OpsKey, OpsState>>; opsSeen?: boolean;
  mkt?: Partial<Record<MktKey, boolean>>; mktSeen?: boolean;
  goal?: Goal;
}

export type PcStepId = 'stage' | 'canton' | 'methods' | 'bab' | 'regs' | 'billing' | 'ops' | 'mkt' | 'goal';
export const PC_STEP_LABELS: Record<PcStepId, string> = {
  stage: 'Stand', canton: 'Kanton', methods: 'Tätigkeit', bab: 'Berufsausübung', regs: 'Registrierungen',
  billing: 'Abrechnung', ops: 'Praxisbetrieb', mkt: 'Patientengewinnung', goal: 'Ziel',
};
export const METHOD_LABELS: Record<Method, string> = { acupuncture: 'Akupunktur', tuina: 'Tuina', herbal: 'Chinesische Arzneitherapie', acupressure: 'Akupressur', moxa: 'Moxibustion', cupping: 'Schröpfen', other: 'Andere' };
export const REG_LABELS: Record<RegKey, string> = { emr: 'EMR', asca: 'ASCA', egk: 'EGK', visana: 'Visana' };
export const BILL_LABELS: Record<BillKey, string> = { zsr: 'ZSR geklärt?', tarif: 'Tarif 590 eingerichtet?', invoicing: 'Rechnungssystem vorhanden?' };
export const OPS_LABELS: Record<OpsKey, string> = { raum: 'Praxisraum', versicherung: 'Berufshaftpflicht / Versicherungen', termine: 'Terminmanagement', abrechnung: 'Abrechnung', datenschutz: 'Datenschutz / Dokumentation', telefon: 'Telefon / Kontakt', zahlung: 'Zahlung', buchhaltung: 'Buchhaltung' };
export const MKT_LABELS: Record<MktKey, string> = { website: 'Website', gbp: 'Google Business Profile', tracking: 'Tracking', booking: 'Terminbuchung', phone: 'Telefonnummer', source: 'Erste Marketingquelle', network: 'Empfehlungsnetzwerk' };

/** Berufsweg noch nicht abgeschlossen: keine Praxisbetriebs- oder Marketing-Fragen. */
const earlyPath = (a: ChecklistAnswers) => a.stage === 'training' || a.stage === 'ausland';

export function getPcSteps(a: ChecklistAnswers): PcStepId[] {
  if (a.stage === 'training') return ['stage', 'canton', 'methods', 'goal'];
  if (a.stage === 'ausland') return ['stage', 'canton', 'methods', 'bab', 'regs', 'goal'];
  return ['stage', 'canton', 'methods', 'bab', 'regs', 'billing', 'ops', 'mkt', 'goal'];
}
export function isPcAnswered(a: ChecklistAnswers, s: PcStepId): boolean {
  if (s === 'methods') return !!a.methods?.length;
  if (s === 'regs') return !!a.regsSeen;
  if (s === 'billing') return !!a.billingSeen;
  if (s === 'ops') return !!a.opsSeen;
  if (s === 'mkt') return !!a.mktSeen;
  return a[s] !== undefined;
}

export type Group = 'now' | 'next' | 'ops' | 'growth';
export const GROUP_LABELS: Record<Group, string> = { now: 'Jetzt zuerst', next: 'Danach', ops: 'Für einen sauberen Praxisbetrieb', growth: 'Wachstum' };
export interface CheckItem { id: string; group: Group; title: string; text: string; cta?: { label: string; href: string }; done: boolean }
export interface ChecklistResult { items: CheckItem[]; growthBlocked: boolean; end: { title: string; text: string; primary: { label: string; href: string }; secondary: { label: string; href: string }[] } }

const T = {
  anerkennung: { label: 'Anerkennungs-Navigator öffnen', href: '/tools/anerkennungs-navigator/' },
  bab: { label: 'BAB prüfen', href: '/tools/bab-navigator/' },
  odaam: { label: 'OdA AM verstehen', href: '/regulatorik/oda-am/' },
  ausland: { label: 'Aus dem Ausland in die Schweiz', href: '/branche/tcm-international-schweiz/' },
  zsr: { label: 'ZSR verstehen', href: '/regulatorik/zsr/' },
  tarif: { label: 'Tarif 590 verstehen', href: '/regulatorik/tarif-590/' },
  rechner: { label: 'Praxisrechner öffnen', href: '/praxiswissen/praxisrechner/' },
  standort: { label: 'Standort prüfen', href: '/praxiswissen/standortwahl-tcm-praxis/' },
  admin: { label: 'Administration aufsetzen', href: '/praxiswissen/tcm-praxis-administration/' },
  patienten: { label: 'Patienten gewinnen', href: '/praxiswissen/patienten-gewinnen-tcm-praxis/' },
  kpi: { label: 'Kennzahlen der Praxis', href: '/praxiswissen/tcm-praxis-kennzahlen/' },
  team: { label: 'Team aufbauen', href: '/praxiswissen/tcm-praxis-team-aufbauen/' },
  praxiswert: { label: 'Praxiswert-Check', href: '/tools/praxiswert-rechner/' },
  eroeffnen: { label: 'Praxis eröffnen', href: '/praxiswissen/tcm-praxis-eroeffnen/' },
  tools: { label: 'Alle Tools', href: '/tools/' },
};

const list = (xs: string[]) => xs.length > 1 ? `${xs.slice(0, -1).join(', ')} und ${xs[xs.length - 1]}` : xs[0] ?? '';

export function getChecklistResult(a: ChecklistAnswers): ChecklistResult {
  const items: CheckItem[] = [];
  const add = (group: Group, id: string, title: string, text: string, done = false, cta?: { label: string; href: string }) => items.push({ id, group, title, text, cta, done });
  const canton = CANTONS.find((c) => c.code === a.canton)?.name ?? 'deinem Kanton';
  const cantonIn = a.canton ? `im Kanton ${canton}` : 'in deinem Kanton';
  const methods = (a.methods ?? []).filter((m) => m !== 'other').map((m) => METHOD_LABELS[m]);
  const taetigkeit = methods.length ? list(methods) : 'deine Tätigkeit';
  const isOpen = a.stage === 'open';
  const asked = new Set(getPcSteps(a));
  const goal = a.goal ?? (isOpen ? 'professionalize' : 'open');

  // 1) Berufsweg
  if (a.stage === 'training') {
    add('now', 'path', 'Berufsweg klären', 'Kläre, welcher Abschluss dein Ziel ist und welche Schritte bis dahin noch fehlen. Die Praxis kommt danach.', false, T.odaam);
    add('next', 'recognition', 'Anerkennungen verstehen', 'Verschaffe dir einen Überblick, welche Anerkennungen für Versicherer und Abrechnung später relevant werden.', false, T.anerkennung);
    add('next', 'bab', 'Kanton vormerken', `Schau dir an, wie ${cantonIn} die Berufsausübung für ${taetigkeit} geregelt ist, damit du früh planen kannst.`, false, T.bab);
    add('next', 'numbers', 'Praxiszahlen grob durchrechnen', 'Ein erster Blick auf Kosten und Auslastung hilft dir zu entscheiden, ob und wann eine eigene Praxis passt.', false, T.rechner);
  } else if (a.stage === 'ausland') {
    add('now', 'foreign', 'Ausländischen Abschluss einordnen', 'Kläre zuerst, wie dein Abschluss in der Schweiz eingeordnet wird. Davon hängen Berufsausübung, Anerkennungen und Abrechnung ab.', false, T.anerkennung);
    add('next', 'foreign-info', 'Weg in die Schweiz verstehen', 'Die wichtigsten Stationen für Fachpersonen mit ausländischem Abschluss im Überblick.', false, T.ausland);
  } else if (a.stage === 'graduated') {
    add('now', 'path', 'Abschluss für Anerkennung klären', 'Kläre, welcher Abschluss für Anerkennungen und Abrechnung bei dir noch fehlt.', false, T.anerkennung);
  }

  // 2) Kantonale Berufsausübung: nur Status, Details im BAB-Navigator
  if (asked.has('bab') && a.bab) {
    if (a.bab === 'yes' || a.bab === 'not_needed') add('now', 'bab', 'Kantonale Berufsausübung geklärt', a.bab === 'yes' ? `BAB ${cantonIn} vorhanden.` : 'Geprüft: laut deiner Abklärung keine BAB nötig.', true);
    else if (a.bab === 'pending') add('next', 'bab', 'BAB-Antrag nachverfolgen', `Dein Antrag ${cantonIn} läuft. Prüfe, ob alle Unterlagen vollständig sind.`, false, T.bab);
    else add(a.stage === 'ausland' ? 'next' : 'now', 'bab', 'BAB prüfen', `Kläre die kantonale Berufsausübung für ${taetigkeit} ${cantonIn}.`, false, T.bab);
  }

  // 3) Registrierungen: nur Status, Details im Anerkennungs-Navigator
  if (asked.has('regs') && a.regsSeen) {
    const r = a.regs ?? {};
    const keys = Object.keys(REG_LABELS) as RegKey[];
    const open = keys.filter((k) => r[k] === 'open' || r[k] === 'unknown').map((k) => REG_LABELS[k]);
    const pending = keys.filter((k) => r[k] === 'pending').map((k) => REG_LABELS[k]);
    const done = keys.filter((k) => r[k] === 'done').map((k) => REG_LABELS[k]);
    if (open.length) add(isOpen ? 'next' : 'now', 'regs', 'Anerkennungen prüfen', `Noch offen oder unklar: ${list(open)}. Prüfe, was für deinen Weg nötig ist.`, false, T.anerkennung);
    if (pending.length) add('next', 'regs-pending', 'Laufende Registrierungen nachverfolgen', `In Bearbeitung: ${list(pending)}.`, false, T.anerkennung);
    if (done.length) add('next', 'regs-done', 'Registrierungen erledigt', `${list(done)}.`, true);
  }

  // 4) Abrechnung
  if (asked.has('billing') && a.billingSeen) {
    const b = a.billing ?? {};
    const zsr = b.zsr ?? 'no', tarif = b.tarif ?? 'no', inv = b.invoicing ?? 'no';
    if (zsr === 'yes') add('next', 'zsr', 'ZSR geklärt', 'Erledigt.', true);
    else add(zsr === 'no' && !isOpen ? 'now' : 'next', 'zsr', 'ZSR klären', 'Kläre, ob und wie du eine ZSR-Nummer für die Abrechnung brauchst.', false, T.zsr);
    if (tarif === 'yes') add('next', 'tarif', 'Tarif 590 eingerichtet', 'Erledigt.', true);
    else add('next', 'tarif', 'Tarif 590 einrichten', 'Richte deine Rechnungsstellung so ein, dass sie zum Tarif 590 passt.', false, T.tarif);
    if (inv === 'yes') add('ops', 'invoicing', 'Rechnungssystem vorhanden', 'Erledigt.', true);
    else add('next', 'invoicing', 'Rechnungssystem aufsetzen', 'Wähle ein System, mit dem du Rechnungen erstellst und offene Beträge im Blick behältst.', false, T.admin);
  }

  // 5) Praxiszahlen / Standort (nur Gründung)
  if (!earlyPath(a) && a.stage) {
    if (isOpen) add('ops', 'kpi', 'Praxiszahlen regelmässig auswerten', 'Auslastung, Neupatient:innen und Kosten einmal im Monat anschauen.', false, T.kpi);
    else add('next', 'numbers', 'Praxiszahlen planen', 'Rechne Kosten, Auslastung und Einkommen durch, bevor du Verträge unterschreibst.', false, T.rechner);
  }

  // 6) Praxisbetrieb
  if (asked.has('ops') && a.opsSeen) {
    const o = a.ops ?? {};
    const OPS_TEXT: Record<OpsKey, [string, { label: string; href: string } | undefined]> = {
      raum: ['Finde Räume, die zu Lage, Grösse und Budget passen.', T.standort],
      versicherung: ['Kläre Berufshaftpflicht und weitere Versicherungen, zum Beispiel über deinen Berufsverband.', undefined],
      termine: ['Leg fest, wie Patient:innen Termine buchen, verschieben und erinnert werden.', T.admin],
      abrechnung: ['Leg den Ablauf von der Behandlung bis zur bezahlten Rechnung fest.', T.admin],
      datenschutz: ['Kläre, wie du Patientendaten sicher dokumentierst und aufbewahrst.', T.admin],
      telefon: ['Sorge für eine Nummer und eine Adresse, unter der dich Patient:innen zuverlässig erreichen.', undefined],
      zahlung: ['Leg fest, wie Patient:innen bezahlen: Rechnung, Karte oder Twint.', undefined],
      buchhaltung: ['Trenne Praxis- und Privatfinanzen und kläre, wer die Buchhaltung macht.', T.admin],
    };
    (Object.keys(OPS_LABELS) as OpsKey[]).forEach((k) => {
      const st = o[k] ?? 'open';
      const title = st === 'done' ? OPS_LABELS[k] : k === 'raum' && !isOpen ? 'Standort prüfen' : OPS_LABELS[k];
      add(k === 'raum' && st !== 'done' && !isOpen ? 'next' : 'ops', 'ops-' + k, title, st === 'done' ? 'Erledigt.' : (st === 'wip' ? 'In Arbeit. ' : '') + OPS_TEXT[k][0], st === 'done', st === 'done' ? undefined : OPS_TEXT[k][1]);
    });
  }

  // 7) Patientengewinnung: nur fehlende Grundlagen, max. 4
  if (asked.has('mkt') && a.mktSeen) {
    const m = a.mkt ?? {};
    const MKT_TEXT: Record<MktKey, string> = {
      phone: 'Eine Nummer, die in den Sprechzeiten erreichbar ist.', gbp: 'Damit du in Google Maps und der lokalen Suche erscheinst.',
      website: 'Eine einfache Seite mit Angebot, Kosten, Standort und Kontakt.', booking: 'Patient:innen sollen ohne Umweg einen Termin anfragen können.',
      network: 'Ärzt:innen, Therapeut:innen und Patient:innen, die dich weiterempfehlen.', source: 'Ein Kanal, über den du die ersten Patient:innen gezielt erreichst.',
      tracking: 'Damit du siehst, woher Anfragen kommen.',
    };
    const order: MktKey[] = ['phone', 'gbp', 'website', 'booking', 'network', 'source', 'tracking'];
    const missing = order.filter((k) => !m[k]);
    missing.slice(0, 4).forEach((k, i) => add('growth', 'mkt-' + k, MKT_LABELS[k] + (k === 'tracking' ? ' einrichten' : ''), MKT_TEXT[k], false, i === 0 ? T.patienten : undefined));
    order.filter((k) => m[k]).forEach((k) => add('growth', 'mkt-' + k, MKT_LABELS[k], 'Vorhanden.', true));
  }
  if (isOpen && (goal === 'grow' || goal === 'team')) add('growth', 'team', goal === 'team' ? 'Team aufbauen' : 'Nächsten Wachstumsschritt planen', goal === 'team' ? 'Kläre Rollen, Auslastung und Einarbeitung, bevor du die erste Person einstellst.' : 'Prüfe, was deine Praxis heute trägt und wo der grösste Hebel liegt.', false, goal === 'team' ? T.team : T.praxiswert);

  const growthBlocked = items.some((i) => i.group === 'now' && !i.done) && goal !== 'grow';

  // Abschluss: 1 primärer CTA + max. 2 Links
  const firstNow = items.find((i) => i.group === 'now' && !i.done && i.cta);
  const end = earlyPath(a)
    ? { title: 'Zuerst der Berufsweg', text: 'Die eigene Praxis planst du am besten, wenn Abschluss und Anerkennung geklärt sind.', primary: T.anerkennung, secondary: [T.eroeffnen] }
    : firstNow
    ? { title: 'Dein nächster Schritt', text: 'Beginne mit dem ersten offenen Punkt unter «Jetzt zuerst». Die Details prüfst du im passenden Tool.', primary: firstNow.cta!, secondary: [T.rechner, T.tools].filter((x) => x.href !== firstNow.cta!.href).slice(0, 2) }
    : isOpen
    ? { title: 'Praxis weiterentwickeln', text: 'Wenn die Grundlagen stehen, lohnt sich der Blick darauf, wie unabhängig deine Praxis von dir ist.', primary: T.praxiswert, secondary: [T.kpi] }
    : { title: 'Praxis eröffnen', text: 'Die Grundlagen stehen. Jetzt geht es um Zahlen, Standort und die ersten Patient:innen.', primary: T.rechner, secondary: [T.eroeffnen] };

  return { items, growthBlocked, end };
}

export function checklistAsText(r: ChecklistResult, checked: Record<string, boolean>): string {
  const out = ['Mein TCM.ch Praxis-Check', ''];
  const heads: Record<Group, string> = { now: 'Jetzt:', next: 'Danach:', ops: 'Praxisbetrieb:', growth: 'Wachstum:' };
  (['now', 'next', 'ops', 'growth'] as Group[]).forEach((g) => {
    const xs = r.items.filter((i) => i.group === g);
    if (xs.length) out.push(heads[g], ...xs.map((i) => `${i.done || checked[i.id] ? '✓' : '□'} ${i.title}`), '');
  });
  out.push('Hinweis:', 'Die Checkliste dient der Orientierung. Verbindlich sind die Vorgaben der zuständigen Behörden, Register und Versicherer.');
  return out.join('\n');
}
