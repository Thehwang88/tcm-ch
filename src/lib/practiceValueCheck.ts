// Praxiswert-Check: reine Regel-Logik, UI rendert nur das Ergebnis.
// Interne Gewichtung ist eine Orientierungslogik, kein validiertes Bewertungsmodell. Nie CHF-Werte, Multiples oder %-Effekte ausgeben.

export const PV_STORAGE_KEY = 'tcmch-practice-value-check-v1';

export type Org = 'solo' | 'therapists' | 'team_admin' | 'autonomous';
export type Revenue = 'lt10' | '10_20' | '20_35' | '35_50' | '50_75' | '75plus' | 'na';
export type Stability = 'stable' | 'seasonal' | 'volatile' | 'unknown';
export type Source = 'seo' | 'ads' | 'referrals' | 'existing' | 'doctors' | 'platforms' | 'social' | 'owner' | 'other';
export type OwnerDemand = 'low' | 'partial' | 'high' | 'full';
export type Absence = 'runs' | 'drops_team' | 'mostly_lost' | 'stops';
export type ProcessArea = 'termine' | 'abrechnung' | 'rechnung' | 'kasse' | 'kommunikation' | 'marketing' | 'onboarding' | 'qualitaet' | 'einkauf';
export type ProcessState = 'doc' | 'partial' | 'head';
export type KeyPerson = 'low' | 'some' | 'high';
export type Tri = 'yes' | 'partial' | 'no';
export type Lease = 'long' | 'stable' | 'short' | 'unsure' | 'owned' | 'na';
export type DemandData = 'crm' | 'partial' | 'feeling' | 'none';
export type Goal = 'sell' | 'successor' | 'less' | 'team' | 'location' | 'know';

export interface PracticeAnswers {
  org?: Org; revenue?: Revenue; stability?: Stability; sources?: Source[]; ownerDemand?: OwnerDemand; absence?: Absence;
  processes?: Partial<Record<ProcessArea, ProcessState>>; processesSeen?: boolean;
  keyPerson?: KeyPerson; manager?: Tri; lease?: Lease; demandData?: DemandData; knowsNewPatients?: Tri; goal?: Goal;
}

export type PvStepId = 'org' | 'revenue' | 'stability' | 'sources' | 'ownerDemand' | 'absence' | 'processes' | 'team' | 'lease' | 'demandData' | 'goal';
export const PV_STEP_LABELS: Record<PvStepId, string> = {
  org: 'Organisation', revenue: 'Umsatz', stability: 'Stabilität', sources: 'Neupatient:innen', ownerDemand: 'Nachfrage und du',
  absence: 'Vier Wochen ohne dich', processes: 'Abläufe', team: 'Team', lease: 'Räume', demandData: 'Zahlen', goal: 'Ziel',
};
export const PROCESS_LABELS: Record<ProcessArea, string> = {
  termine: 'Terminmanagement', abrechnung: 'Abrechnung', rechnung: 'Rechnungsstellung', kasse: 'Krankenkassen / Tarif', kommunikation: 'Patientenkommunikation',
  marketing: 'Marketing', onboarding: 'Team-Onboarding', qualitaet: 'Qualitätsprozesse', einkauf: 'Lieferanten / Einkauf',
};
export const REVENUE_LABELS: Record<Exclude<Revenue, 'na'>, string> = {
  lt10: "unter CHF 10'000", '10_20': "CHF 10'000–20'000", '20_35': "CHF 20'000–35'000", '35_50': "CHF 35'000–50'000", '50_75': "CHF 50'000–75'000", '75plus': "über CHF 75'000",
};

export function getPvSteps(a: PracticeAnswers): PvStepId[] {
  const s: PvStepId[] = ['org', 'revenue', 'stability', 'sources', 'ownerDemand', 'absence', 'processes'];
  if (a.org && a.org !== 'solo') s.push('team');
  return [...s, 'lease', 'demandData', 'goal'];
}
export function isPvAnswered(a: PracticeAnswers, s: PvStepId): boolean {
  if (s === 'sources') return !!a.sources?.length;
  if (s === 'processes') return !!a.processesSeen;
  if (s === 'team') return !!a.keyPerson;
  return a[s] !== undefined;
}

export type Status = 'Stark' | 'Gut' | 'Ausbaufähig' | 'Kritisch prüfen';
export interface Dimension { label: string; status: Status; level: 'strong' | 'good' | 'fair' | 'critical'; note: string }
export interface ActionItem { id: string; title: string; text: string; action?: string; link?: { label: string; href: string } }
export interface PracticeResult {
  dimensions: { transferability: Dimension; ownerDependency: Dimension; operatingStability: Dimension; documentation: Dimension };
  strengths: ActionItem[]; risks: ActionItem[]; priorities: ActionItem[]; nextSteps: ActionItem[];
  summary: string; sub: string; revenueLine?: string;
}

const L = {
  wert: { label: 'Mehr über Praxiswert', href: '/praxiswissen/tcm-praxis-wert/' },
  verkaufen: { label: 'Praxis verkaufen vorbereiten', href: '/praxiswissen/tcm-praxis-verkaufen/' },
  team: { label: 'Team aufbauen', href: '/praxiswissen/tcm-praxis-team-aufbauen/' },
  admin: { label: 'Administration organisieren', href: '/praxiswissen/tcm-praxis-administration/' },
  kpi: { label: 'Kennzahlen der Praxis', href: '/praxiswissen/tcm-praxis-kennzahlen/' },
  auslastung: { label: 'Auslastung verstehen', href: '/praxiswissen/tcm-praxis-auslastung/' },
  nachfolge: { label: 'Praxisnachfolge besprechen', href: '/partner/praxisnachfolge/' },
  erweitern: { label: 'Praxis erweitern', href: '/praxiswissen/tcm-praxis-erweitern/' },
};

const clamp = (n: number) => Math.max(0, Math.min(100, n));
const REV_ORDER: Revenue[] = ['lt10', '10_20', '20_35', '35_50', '50_75', '75plus'];

/** Interne Faktor-Werte 0–100 (höher = besser übertragbar). Nie öffentlich anzeigen. */
function factors(a: PracticeAnswers) {
  const od = { low: 100, partial: 65, high: 30, full: 10 }[a.ownerDemand ?? 'high'];
  const ab = { runs: 100, drops_team: 65, mostly_lost: 25, stops: 5 }[a.absence ?? 'mostly_lost'];
  const owner = 0.4 * od + 0.6 * ab;
  const stability = { stable: 100, seasonal: 70, volatile: 30, unknown: 45 }[a.stability ?? 'unknown'];
  const src = a.sources ?? [];
  const channels = src.filter((s) => s !== 'owner' && s !== 'other').length;
  let sources = [30, 45, 65, 80, 90][Math.min(channels, 4)];
  if (src.includes('owner')) sources -= 15;
  sources = clamp(sources);
  let team = { solo: 25, therapists: 60, team_admin: 75, autonomous: 95 }[a.org ?? 'solo'];
  if (a.org && a.org !== 'solo') {
    team += { low: 10, some: 0, high: -20 }[a.keyPerson ?? 'some'];
    if (a.manager) team += { yes: 10, partial: 3, no: -5 }[a.manager];
  }
  team = clamp(team);
  const ps = Object.values(a.processes ?? {}) as ProcessState[];
  const pv = { doc: 100, partial: 55, head: 10 };
  const psum = ps.reduce((s, x) => s + pv[x], 0);
  const processes = ps.length >= 3 ? psum / ps.length : (psum + 35 * (3 - ps.length)) / 3;
  const lease = { long: 100, owned: 100, stable: 75, short: 25, unsure: 35, na: 50 }[a.lease ?? 'na'];
  let data = { crm: 100, partial: 65, feeling: 30, none: 10 }[a.demandData ?? 'none'];
  if (a.knowsNewPatients) data += { yes: 10, partial: 0, no: -10 }[a.knowsNewPatients];
  if (a.stability === 'unknown') data -= 10;
  data = clamp(data);
  return { owner, stability, sources, team, processes, lease, data };
}
type F = ReturnType<typeof factors>;
const WEIGHTS: Record<keyof F, number> = { owner: 0.25, stability: 0.15, sources: 0.15, team: 0.15, processes: 0.15, lease: 0.05, data: 0.10 };

function dim(label: string, score: number, notes: [string, string, string, string]): Dimension {
  const i = score >= 75 ? 0 : score >= 55 ? 1 : score >= 35 ? 2 : 3;
  return { label, status: (['Stark', 'Gut', 'Ausbaufähig', 'Kritisch prüfen'] as const)[i], level: (['strong', 'good', 'fair', 'critical'] as const)[i], note: notes[i] };
}

export function getPracticeTransferabilityResult(a: PracticeAnswers): PracticeResult {
  const f = factors(a);
  const total = (Object.keys(WEIGHTS) as (keyof F)[]).reduce((s, k) => s + f[k] * WEIGHTS[k], 0);
  const ownerDim = 0.75 * f.owner + 0.25 * f.team;
  const opDim = 0.4 * f.stability + 0.35 * f.sources + 0.25 * f.lease;
  const docDim = 0.55 * f.processes + 0.45 * f.data;
  const dimensions = {
    transferability: dim('Übertragbarkeit', total, ['Die Praxis lässt sich gut übergeben.', 'Solide Basis für eine Übergabe.', 'Einiges hängt noch an wenigen Punkten.', 'Heute schwer ohne dich weiterzuführen.']),
    ownerDependency: dim('Inhaber\u00ADabhängigkeit', ownerDim, ['Gering: der Betrieb trägt sich.', 'Mittel: vieles läuft ohne dich.', 'Hoch: vieles hängt an dir.', 'Sehr hoch: fast alles hängt an dir.']),
    operatingStability: dim('Betriebs\u00ADstabilität', opDim, ['Nachfrage, Umsatz und Räume sind stabil.', 'Überwiegend stabil.', 'Einzelne Unsicherheiten.', 'Mehrere Unsicherheiten gleichzeitig.']),
    documentation: dim('Nachweisbarkeit', docDim, ['Abläufe und Zahlen sind belegbar.', 'Vieles ist festgehalten.', 'Teilweise nur im Kopf.', 'Kaum etwas ist festgehalten.']),
  };

  const src = a.sources ?? [];
  const procs = a.processes ?? {};
  const docCount = Object.values(procs).filter((x) => x === 'doc').length;
  const headAreas = (Object.keys(procs) as ProcessArea[]).filter((k) => procs[k] === 'head').map((k) => PROCESS_LABELS[k]);
  const revIdx = a.revenue && a.revenue !== 'na' ? REV_ORDER.indexOf(a.revenue) : -1;

  // 1) Stärken: nur aus Antworten
  const strengths: ActionItem[] = [];
  const S = (id: string, title: string, text: string) => strengths.push({ id, title, text });
  if (a.absence === 'runs') S('absence', 'Die Praxis läuft auch ohne dich', 'Wenn du vier Wochen fehlst, läuft der Betrieb weitgehend weiter.');
  else if (a.absence === 'drops_team') S('absence', 'Das Team trägt einen Teil', 'Wenn du fehlst, arbeitet das Team weiter. Die Praxis steht nicht still.');
  if (a.org === 'team_admin' || a.org === 'autonomous') S('team', 'Team mit Administration', 'Behandlung und Organisation liegen nicht nur bei dir.');
  else if (a.org === 'therapists') S('team', 'Weitere Therapeut:innen', 'Du behandelst nicht allein. Das verteilt die Nachfrage auf mehrere Personen.');
  if (a.manager === 'yes') S('manager', 'Jemand könnte den Betrieb führen', 'Es gibt eine Person, die den Alltag der Praxis leiten könnte.');
  if (a.stability === 'stable') S('stability', 'Stabile Nachfrage', 'Dein Umsatz verläuft über das Jahr gleichmässig.');
  if (revIdx >= 3) S('revenue', 'Wirtschaftlich substanziell', 'Deine Praxis erzielt einen Umsatz, der sie für eine Übergabe interessant machen kann.');
  const chan = src.filter((s) => s !== 'owner' && s !== 'other').length;
  if (chan >= 3) S('sources', 'Mehrere Akquisitionskanäle', 'Neue Patient:innen finden über verschiedene Wege zu dir.');
  if (src.includes('referrals') || src.includes('existing')) S('recurring', 'Empfehlungen und wiederkehrende Patient:innen', 'Ein Teil der Nachfrage entsteht aus bestehenden Beziehungen zur Praxis.');
  if (src.includes('doctors')) S('doctors', 'Zuweisungen von Ärzt:innen', 'Zuweisende Stellen sind eine Nachfragequelle, die nicht nur an dir hängt, wenn die Beziehung zur Praxis gepflegt wird.');
  if (docCount >= 4) S('processes', 'Dokumentierte Prozesse', `${docCount} Bereiche sind klar dokumentiert.`);
  if (a.lease === 'long' || a.lease === 'owned') S('lease', 'Langfristige Räume', a.lease === 'owned' ? 'Die Räume gehören dir. Das gibt Planungssicherheit.' : 'Dein Standort ist langfristig gesichert.');
  if (a.demandData === 'crm') S('data', 'Nachfrage belegbar', 'Leads, Neupatient:innen und Termine sind in einem System sichtbar.');

  // 2) Was einen Käufer oder Nachfolger beschäftigen würde
  const risks: ActionItem[] = [];
  const R = (id: string, title: string, text: string) => risks.push({ id, title, text });
  if (f.owner < 55) R('owner', 'Hohe Inhaberabhängigkeit', 'Wenn der Grossteil der Nachfrage und des Umsatzes direkt an deiner Person hängt, ist die Praxis schwerer zu übertragen.');
  if (f.processes < 55) R('processes', 'Wenig dokumentierte Prozesse', 'Ein Nachfolger muss Abläufe erst rekonstruieren. Klare Prozesse reduzieren dieses Risiko.');
  if (f.data < 55) R('data', 'Nachfrage nicht messbar', 'Wenn Neupatient:innen und Leadquellen nicht dokumentiert sind, lässt sich die zukünftige Nachfrage schlechter einschätzen.');
  if (f.sources < 50) R('sources', 'Wenige Nachfragequellen', 'Wenn neue Patient:innen fast nur über einen Weg oder über dich persönlich kommen, ist die Nachfrage nach einer Übergabe schwerer planbar.');
  if (a.stability === 'volatile') R('stability', 'Schwankender Umsatz', 'Starke Schwankungen machen es schwerer, den nachhaltigen Ertrag einer Praxis einzuschätzen.');
  if (a.org === 'solo') R('team', 'Kein Team', 'Ohne weitere Behandelnde muss ein Nachfolger die Praxis zuerst selbst tragen.');
  else if (a.keyPerson === 'high') R('keyPerson', 'Abhängigkeit von einzelnen Personen', 'Wenn einzelne Mitarbeitende schwer ersetzbar sind, wird eine Übergabe schwerer planbar.');
  if (a.lease === 'short' || a.lease === 'unsure') R('lease', a.lease === 'short' ? 'Kurzer Mietvertrag' : 'Unsicherer Standort', 'Ein unsicherer Standort kann die Planbarkeit einer Übergabe reduzieren.');

  // 3) Prioritäten: Lücke × Gewicht × Ziel, max. 3
  const goal = a.goal ?? 'know';
  const boost: Partial<Record<keyof F, number>> = {
    sell: { owner: 1.2, processes: 1.2, data: 1.2, lease: 1.5 }, successor: { owner: 1.2, processes: 1.2, data: 1.2, lease: 1.5 },
    less: { owner: 1.3, team: 1.3 }, team: { team: 1.4, processes: 1.3 },
    location: { processes: 1.4, team: 1.3, data: 1.2, lease: 0.5 }, know: {},
  }[goal];
  const P: Record<keyof F, ActionItem> = {
    owner: { id: 'owner', title: 'Praxis weniger abhängig von dir machen', text: 'Nachfrage und Umsatz hängen heute stark an dir. Das ist der wichtigste Hebel für die Übertragbarkeit.', action: 'Leg fest, welche Patientengruppen und Aufgaben du zuerst an andere Therapeut:innen oder das Team übergeben kannst.', link: L.team },
    data: { id: 'data', title: 'Neupatient:innen und Nachfrage sauber dokumentieren', text: 'Ohne Zahlen lässt sich die künftige Nachfrage nur schwer zeigen.', action: 'Erfasse jeden Monat Anfragen, Neupatient:innen und ihre Quelle an einem Ort.', link: L.kpi },
    processes: { id: 'processes', title: 'Betriebsprozesse schriftlich festhalten', text: 'Was nur in deinem Kopf ist, muss ein Nachfolger oder ein neues Teammitglied erst rekonstruieren.', action: headAreas.length ? `Beginne mit den Bereichen, die heute nur in deinem Kopf sind: ${headAreas.slice(0, 3).join(', ')}.` : 'Schreib die wichtigsten Abläufe als kurze Checklisten auf, beginnend mit Termin und Abrechnung.', link: L.admin },
    sources: { id: 'sources', title: 'Nachfrage auf mehrere Wege verteilen', text: 'Wenn neue Patient:innen über wenige Wege kommen, ist die Nachfrage anfällig.', action: 'Baue einen zweiten verlässlichen Kanal auf, der nicht an deine Person gebunden ist, zum Beispiel Zuweiser:innen oder die Sichtbarkeit bei Google.', link: L.auslastung },
    stability: a.stability === 'unknown'
      ? { id: 'stability', title: 'Umsatzverlauf sichtbar machen', text: 'Wie stabil dein Umsatz ist, lässt sich heute nicht klar sagen.', action: 'Stell Umsatz und Termine der letzten zwölf Monate nebeneinander.', link: L.kpi }
      : { id: 'stability', title: 'Umsatzschwankungen verstehen', text: 'Schwankungen machen den nachhaltigen Ertrag schwerer einschätzbar.', action: 'Vergleiche Termine und Umsatz Monat für Monat und markiere die schwachen Phasen.', link: L.auslastung },
    team: a.org === 'solo'
      ? { id: 'team', title: 'Eine zweite Behandlungskraft aufbauen', text: 'Solange nur du behandelst, trägt die Praxis ohne dich nicht.', action: 'Prüfe, ob eine Teilzeit-Therapeutin oder ein Teilzeit-Therapeut einen Teil deiner Termine übernehmen kann.', link: L.team }
      : { id: 'team', title: 'Führung im Team klären', text: 'Ein Team trägt eine Übergabe besser, wenn Verantwortung verteilt ist.', action: 'Leg fest, wer Aufgaben wie Dienstplan, Abrechnung und Einarbeitung verantwortet, wenn du nicht da bist.', link: L.team },
    lease: { id: 'lease', title: 'Standort absichern', text: 'Ein unsicherer Mietvertrag reduziert die Planbarkeit einer Übergabe.', action: 'Kläre mit deiner Vermietung die Laufzeit und ob der Vertrag bei einer Übergabe übertragen werden kann.', link: L.verkaufen },
  };
  const priorities = (Object.keys(P) as (keyof F)[])
    .filter((k) => f[k] < 70)
    .map((k) => ({ k, gap: (100 - f[k]) * WEIGHTS[k] * (boost[k] ?? 1) }))
    .sort((x, y) => y.gap - x.gap).slice(0, 3).map((x) => P[x.k]);

  // CTA nach Ziel
  const CTA: Record<Goal, ActionItem[]> = {
    sell: [{ id: 'cta', title: 'Praxisnachfolge besprechen', text: 'Wenn du über eine Übergabe nachdenkst, kannst du deine Situation vertraulich mit TCM.ch besprechen.', link: L.nachfolge }, { id: 'cta2', title: 'Übergabe vorbereiten', text: '', link: L.verkaufen }],
    successor: [{ id: 'cta', title: 'Praxisnachfolge besprechen', text: 'Wenn du über eine Übergabe nachdenkst, kannst du deine Situation vertraulich mit TCM.ch besprechen.', link: L.nachfolge }, { id: 'cta2', title: 'Übergabe vorbereiten', text: '', link: L.verkaufen }],
    less: [{ id: 'cta', title: 'Team aufbauen', text: 'Weniger selbst behandeln heisst: andere tragen einen Teil der Nachfrage. So baust du das Team dafür auf.', link: L.team }, { id: 'cta2', title: 'Praxiswert verstehen', text: '', link: L.wert }],
    team: [{ id: 'cta', title: 'Team aufbauen', text: 'Ein zweites Team braucht klare Abläufe und Verantwortungen. So gehst du es an.', link: L.team }, { id: 'cta2', title: 'Administration organisieren', text: '', link: L.admin }],
    location: [{ id: 'cta', title: 'Praxis erweitern', text: 'Ein zweiter Standort funktioniert, wenn Team, Prozesse und Nachfrage auch ohne deine ständige Anwesenheit tragen.', link: L.erweitern }, { id: 'cta2', title: 'Team aufbauen', text: '', link: L.team }],
    know: [{ id: 'cta', title: 'Mehr über Praxiswert', text: 'Was den Wert einer TCM-Praxis ausmacht und wie du ihn Schritt für Schritt stärkst.', link: L.wert }, { id: 'cta2', title: 'Kennzahlen der Praxis', text: '', link: L.kpi }],
  };
  const nextSteps = CTA[goal];

  // Hero
  const ownerWeak = ownerDim < 55, docWeak = docDim < 55;
  const basis = revIdx >= 3 || a.stability === 'stable' || opDim >= 60;
  const summary = total >= 75 ? 'Deine Praxis ist bereits relativ gut übertragbar.'
    : ownerWeak && basis ? 'Deine Praxis hat eine gute Basis, hängt aber noch stark von dir persönlich ab.'
    : ownerWeak && docWeak ? 'Die grösste Chance liegt nicht im Umsatz, sondern in besseren Prozessen und geringerer Inhaberabhängigkeit.'
    : total >= 55 ? 'Deine Praxis hat eine solide Basis. Mit gezielten Schritten wird sie noch besser übertragbar.'
    : 'In deiner Praxis gibt es mehrere Stellen, an denen du die Übertragbarkeit gezielt stärken kannst.';
  const sub = {
    sell: 'Für eine Übergabe zählt, was auch ohne dich weiterläuft. Die Schritte unten setzen genau dort an.',
    successor: 'Für eine Nachfolge zählt, was auch ohne dich weiterläuft. Die Schritte unten setzen genau dort an.',
    less: 'Wer weniger selbst behandeln will, braucht ein Team und Abläufe, die auch ohne dich tragen.',
    team: 'Für ein zweites Team zählen vor allem klare Abläufe und verteilte Verantwortung.',
    location: 'Für einen zweiten Standort zählen vor allem Team, Prozesse und messbare Nachfrage.',
    know: 'So steht deine Praxis heute. Die Schritte unten zeigen, wo du am meisten bewegen kannst.',
  }[goal];
  const revenueLine = revIdx >= 0 ? `Deine Praxis liegt aktuell in der Umsatzklasse ${REVENUE_LABELS[a.revenue as Exclude<Revenue, 'na'>]} pro Monat. Daraus lässt sich kein Kaufpreis ableiten: entscheidend ist, wie viel davon auch ohne dich bleibt.` : undefined;

  return { dimensions, strengths: strengths.slice(0, 6), risks, priorities, nextSteps, summary, sub, revenueLine };
}

export function practiceResultAsText(r: PracticeResult): string {
  return [
    'Mein TCM.ch Praxis-Check', '',
    ...(r.strengths.length ? ['Stärken:', ...r.strengths.map((s) => `✓ ${s.title}`), ''] : []),
    ...(r.priorities.length ? ['Prioritäten:', ...r.priorities.map((p) => `□ ${p.title}`), ''] : []),
    'Hinweis:', 'Der Check ist eine Orientierung und keine Unternehmensbewertung.',
  ].join('\n');
}
