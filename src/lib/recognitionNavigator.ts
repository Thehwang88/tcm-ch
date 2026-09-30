// Anerkennungs-Navigator: Schritte, Branching und Rule Engine (reine Funktionen, keine UI).
// Regulatorische Quellen und Kantonsdaten kommen aus src/data/regulatorik/ (Single Source).
// Der Navigator trifft KEINE Rechtsentscheidung: er priorisiert, was zu prüfen ist, und verlinkt die Quelle.
import { SOURCES, type SourceId } from '../data/regulatorik/sources';
import { KANTONE, isPublishable, type CantonCode } from '../data/regulatorik/kantone';

export type Qualification = 'ausbildung' | 'zertifikat' | 'diplom' | 'ausland' | 'andere';
export type YesNoUnknown = 'ja' | 'nein' | 'antrag' | 'unbekannt';
export type BabAnswer = YesNoUnknown | 'nicht_noetig';
export type RegStatus = 'ja' | 'antrag' | 'nein' | 'unbekannt';
export type Method = 'akupunktur' | 'tuina' | 'arznei' | 'moxa' | 'akupressur' | 'andere';

export interface NavigatorAnswers {
  qualification?: Qualification;
  international?: YesNoUnknown;
  methods?: Method[];
  canton?: CantonCode;
  bab?: BabAnswer;
  emr?: RegStatus;
  asca?: RegStatus;
  egk?: RegStatus;
  visana?: RegStatus;
  zsr?: YesNoUnknown;
  tariff590?: YesNoUnknown | 'nochnicht';
}

export type StepId = 'qualification' | 'international' | 'methods' | 'canton' | 'bab' | 'regs' | 'zsr' | 'tariff590';

export const STEP_LABELS: Record<StepId, string> = {
  qualification: 'Berufsweg',
  international: 'Abschluss geprüft',
  methods: 'Methoden',
  canton: 'Kanton',
  bab: 'Bewilligung',
  regs: 'Registrierungen',
  zsr: 'ZSR',
  tariff590: 'Abrechnung',
};

/** Sichtbare Schritte abhängig von bisherigen Antworten (Branching). */
export function getSteps(a: NavigatorAnswers): StepId[] {
  const s: StepId[] = ['qualification'];
  if (a.qualification === 'ausland') s.push('international');
  s.push('methods', 'canton');
  // In Ausbildung: Registrierung und Abrechnung sind noch nicht der nächste Schritt.
  if (a.qualification === 'ausbildung') return s;
  s.push('bab', 'regs', 'zsr');
  if (a.zsr === 'ja' || a.zsr === 'antrag') s.push('tariff590');
  return s;
}

export const isAnswered = (a: NavigatorAnswers, step: StepId): boolean => {
  switch (step) {
    case 'methods': return !!a.methods?.length;
    case 'regs': return !!(a.emr && a.asca && a.egk && a.visana);
    default: return a[step] !== undefined;
  }
};

export const METHOD_LABELS: Record<Method, string> = {
  akupunktur: 'Akupunktur', tuina: 'Tuina', arznei: 'Chinesische Arzneitherapie', moxa: 'Moxibustion', akupressur: 'Akupressur', andere: 'Andere TCM-Methode',
};
export const QUAL_LABELS: Record<Qualification, string> = {
  ausbildung: 'In Ausbildung', zertifikat: 'Zertifikat OdA AM', diplom: 'Eidgenössisches Diplom', ausland: 'Ausländischer Abschluss', andere: 'Andere Qualifikation',
};
export const CANTONS = [...KANTONE].map((k) => ({ code: k.cantonCode, name: k.cantonName })).sort((x, y) => x.name.localeCompare(y.name, 'de'));
const cantonName = (c?: CantonCode) => CANTONS.find((k) => k.code === c)?.name;

export interface ActionItem {
  id: string;
  icon: 'path' | 'canton' | 'reg' | 'insurer' | 'bill' | 'meds' | 'info';
  title: string;
  text: string;
  cta?: { label: string; href: string };
  secondary?: { label: string; href: string };
  source?: { label: string; url: string };
}
export interface RecognitionPlan {
  headline: string;
  intro: string;
  now: ActionItem[];
  next: ActionItem[];
  optional: ActionItem[];
  done: ActionItem[];
  summary: { label: string; state: 'done' | 'todo' | 'optional' }[];
}

const src = (id: SourceId) => ({ label: 'Offizielle Quelle', url: SOURCES[id].url });
const joinDe = (xs: string[]) => (xs.length <= 1 ? xs.join('') : `${xs.slice(0, -1).join(', ')} und ${xs[xs.length - 1]}`);
const NUM = ['Kein', 'Ein', 'Zwei', 'Drei', 'Vier', 'Fünf', 'Sechs', 'Sieben'];

/** Kantonale Quelle nur, wenn im zentralen Modell eine geprüfte kantonale Quelle existiert. */
function cantonSource(c?: CantonCode): ActionItem['source'] | undefined {
  const rec = KANTONE.find((k) => k.cantonCode === c);
  if (rec && isPublishable(rec) && rec.officialUrl) return { label: 'Offizielle Quelle', url: rec.officialUrl };
  if (c === 'ZH' && SOURCES.zhKomplementaer.checked) return src('zhKomplementaer');
  return undefined;
}

export function getRecognitionPlan(a: NavigatorAnswers): RecognitionPlan {
  const now: ActionItem[] = [], next: ActionItem[] = [], optional: ActionItem[] = [], done: ActionItem[] = [];
  const kt = cantonName(a.canton);
  const ktLabel = kt ? `im Kanton ${kt}` : 'in deinem Kanton';
  const methods = (a.methods ?? []).map((m) => (m === 'andere' ? 'eine andere TCM-Methode' : METHOD_LABELS[m]));
  const methodPhrase = methods.length ? joinDe(methods) : 'TCM';
  const qual = a.qualification ?? 'andere';
  const trainee = qual === 'ausbildung';
  const foreignOpen = qual === 'ausland' && a.international !== 'ja';
  const babDone = a.bab === 'ja';
  const has = (s?: RegStatus) => s === 'ja';
  // Solange Berufsweg/Bewilligung offen sind, gehören Registrierungen in «Danach».
  const regBucket = babDone && !foreignOpen ? now : next;
  const kantoneHref = a.canton ? `/regulatorik/kantone/?k=${a.canton.toLowerCase()}` : '/regulatorik/kantone/';

  // 1. Berufsweg
  if (trainee) {
    now.push({ id: 'oda', icon: 'path', title: 'Deinen Berufsweg abschliessen',
      text: 'Wenn du den Schweizer Weg über OdA AM gehst, führen M1 bis M6 zum Zertifikat OdA AM. Danach folgt je nach Weg die Berufspraxis unter Mentorat und später die Höhere Fachprüfung.',
      cta: { label: 'OdA AM verstehen', href: '/regulatorik/oda-am/' }, secondary: { label: 'M7 & Mentoring bei TCM.ch', href: '/akademie/' }, source: src('odaAmModule') });
    next.push({ id: 'canton-m7', icon: 'canton', title: `Regeln ${ktLabel} für die Zeit im M7 prüfen`,
      text: 'Ob und wie du während der Berufspraxis unter Mentorat behandeln darfst, regelt der Kanton.',
      cta: { label: kt ? `${kt} prüfen` : 'Kantone ansehen', href: kantoneHref }, source: cantonSource(a.canton) });
    optional.push({ id: 'later', icon: 'info', title: 'Später: Registrierung und Abrechnung',
      text: 'EMR, ASCA, ZSR und Tarif 590 werden relevant, sobald dein Abschluss steht. Du musst das heute noch nicht lösen.',
      cta: { label: 'Regulatorik ansehen', href: '/regulatorik/' } });
  } else if (qual === 'ausland') {
    if (foreignOpen) {
      now.push({ id: 'intl', icon: 'path', title: 'Anerkennung des Abschlusses zuerst klären',
        text: a.international === 'antrag'
          ? 'Dein Verfahren läuft. Bis es abgeschlossen ist, sind Bewilligung, Registrierungen und Abrechnung nur vorläufig planbar.'
          : 'Ob und wie dein ausländischer Abschluss für den Schweizer Berufsweg berücksichtigt wird, prüft die zuständige offizielle Stelle anhand deines konkreten Abschlusses.',
        cta: { label: 'Aus dem Ausland in die Schweiz', href: '/branche/tcm-international-schweiz/' }, secondary: { label: 'OdA AM verstehen', href: '/regulatorik/oda-am/' } });
    } else done.push({ id: 'intl', icon: 'path', title: 'Abschluss für den Schweizer Berufsweg geprüft', text: 'Laut deiner Angabe.' });
  } else if (qual === 'zertifikat') {
    done.push({ id: 'oda', icon: 'path', title: 'Zertifikat OdA AM', text: 'Laut deiner Angabe.' });
    optional.push({ id: 'hfp', icon: 'path', title: 'Weg zum eidgenössischen Diplom',
      text: 'Nach dem Zertifikat folgen je nach Weg die Berufspraxis unter Mentorat (M7) und die Höhere Fachprüfung.',
      cta: { label: 'OdA AM verstehen', href: '/regulatorik/oda-am/' }, secondary: { label: 'M7 & Mentoring bei TCM.ch', href: '/akademie/' }, source: src('odaAmM7') });
  } else if (qual === 'diplom') {
    done.push({ id: 'oda', icon: 'path', title: 'Eidgenössisches Diplom', text: 'Laut deiner Angabe.' });
  } else {
    now.push({ id: 'path-other', icon: 'path', title: 'Deinen Berufsweg einordnen',
      text: 'Kläre zuerst, welchem Schweizer Berufsweg deine Qualifikation entspricht. Davon hängen Bewilligung und Registrierungen ab.',
      cta: { label: 'OdA AM verstehen', href: '/regulatorik/oda-am/' }, secondary: { label: 'Wer macht was?', href: '/branche/organisationen/' } });
  }

  if (!trainee) {
    // 2. Berufsausübungsbewilligung (nie eine Rechtsentscheidung)
    const babBucket = foreignOpen ? next : now;
    const cs = cantonSource(a.canton);
    const babText = `Ob du für ${methodPhrase} ${ktLabel} eine BAB brauchst, richtet sich nach den kantonalen Vorgaben und deiner Qualifikation.` +
      (cs ? '' : ' Für diesen Kanton haben wir die Regel noch nicht selbst verifiziert: Kantonale Regel bitte direkt bei der kantonalen Gesundheitsbehörde prüfen.');
    if (a.bab === 'ja') done.push({ id: 'bab', icon: 'canton', title: `Berufsausübungsbewilligung${kt ? ` ${kt}` : ''}`, text: 'Laut deiner Angabe vorhanden.' });
    else if (a.bab === 'antrag') next.push({ id: 'bab', icon: 'canton', title: 'BAB-Antrag abschliessen', text: 'Dein Antrag läuft. Plane Mietvertrag und Praxisstart erst, wenn die Bewilligung vorliegt.', cta: { label: kt ? `${kt} prüfen` : 'Kantone ansehen', href: kantoneHref }, source: cs });
    else if (a.bab === 'nicht_noetig') babBucket.push({ id: 'bab', icon: 'canton', title: 'Mit deinem Kanton bestätigen', text: `Bitte mit deinem Kanton prüfen. Besonders bei invasiven Methoden wie Akupunktur kann die Regel anders sein. ${babText}`, cta: { label: 'BAB im Detail prüfen', href: '/tools/bab-navigator/' }, secondary: { label: 'BAB verstehen', href: '/regulatorik/berufsausuebungsbewilligung/' }, source: cs });
    else babBucket.push({ id: 'bab', icon: 'canton', title: 'Berufsausübungsbewilligung prüfen', text: babText, cta: { label: 'BAB im Detail prüfen', href: '/tools/bab-navigator/' }, secondary: { label: 'BAB verstehen', href: '/regulatorik/berufsausuebungsbewilligung/' }, source: cs });

    if (a.methods?.includes('arznei')) babBucket.push({ id: 'meds', icon: 'meds', title: 'Arzneimittelabgabe prüfen',
      text: 'Für die Abgabe von Arzneimitteln gelten eigene Regeln: Qualifikation, Status des Produkts und eine kantonale Abgabebewilligung.',
      cta: { label: 'Arzneimittelabgabe', href: '/regulatorik/chinesische-arzneimittel-abgabe/' }, source: src('swissmedicKomplementaer') });

    // 3. Registrierungen
    if (has(a.emr)) done.push({ id: 'emr', icon: 'reg', title: 'EMR', text: 'Laut deiner Angabe anerkannt.' });
    else if (a.emr === 'antrag') next.push({ id: 'emr', icon: 'reg', title: 'EMR-Antrag abschliessen', text: 'Dein Antrag läuft. Das Qualitätslabel gilt jeweils ein Jahr und wird jährlich erneuert.', cta: { label: 'EMR verstehen', href: '/regulatorik/emr/' }, source: src('emrReglement') });
    else regBucket.push({ id: 'emr', icon: 'reg', title: a.emr === 'unbekannt' ? 'EMR-Status zuerst prüfen' : 'EMR-Registrierung prüfen', text: 'EMR ist für viele Zusatzversicherer relevant, ersetzt aber keine kantonale Berufsausübungsbewilligung.', cta: { label: 'EMR verstehen', href: '/regulatorik/emr/' }, source: src('emrReglement') });

    const ascaText = 'ASCA ist ein separates Anerkennungssystem. Ob du es zusätzlich brauchst, hängt von deiner Praxis und den Versicherern ab, mit denen du arbeiten möchtest.';
    if (has(a.asca)) done.push({ id: 'asca', icon: 'reg', title: 'ASCA', text: 'Laut deiner Angabe anerkannt.' });
    else if (a.asca === 'antrag') next.push({ id: 'asca', icon: 'reg', title: 'ASCA-Antrag abschliessen', text: ascaText, cta: { label: 'ASCA verstehen', href: '/regulatorik/asca/' }, source: src('ascaArg') });
    else optional.push({ id: 'asca', icon: 'reg', title: 'ASCA zusätzlich prüfen', text: ascaText, cta: { label: 'ASCA verstehen', href: '/regulatorik/asca/' }, source: src('ascaArg') });

    // 4. Versicherer mit eigenem Verfahren
    if (has(a.egk)) done.push({ id: 'egk', icon: 'insurer', title: 'EGK', text: 'Laut deiner Angabe registriert.' });
    else {
      const egk: ActionItem = { id: 'egk', icon: 'insurer', title: a.egk === 'antrag' ? 'EGK-Registrierung abschliessen' : 'EGK separat prüfen', text: 'Eine EMR-Registrierung bedeutet nicht automatisch, dass du bei EGK registriert bist.', cta: { label: 'EGK-Registrierung', href: '/regulatorik/krankenkassen-anerkennung/#egk' }, source: src('egkTherapeutenstelle') };
      (a.egk === 'antrag' ? next : has(a.emr) ? regBucket : optional).push(egk);
    }
    if (has(a.visana)) done.push({ id: 'visana', icon: 'insurer', title: 'Visana', text: 'Laut deiner Angabe anerkannt.' });
    else {
      const vis: ActionItem = { id: 'visana', icon: 'insurer', title: a.visana === 'antrag' ? 'Visana-Anerkennung abschliessen' : 'Visana separat beantragen', text: 'Visana führt ein eigenes Anerkennungsverfahren und ist nicht einfach über EMR oder ASCA abgedeckt.', cta: { label: 'Visana-Anerkennung', href: '/regulatorik/krankenkassen-anerkennung/#visana' }, source: src('visanaKriterien') };
      (a.visana === 'antrag' ? next : regBucket).push(vis);
    }

    // 5. Abrechnung
    const anyReg = has(a.emr) || has(a.asca);
    if (a.zsr === 'ja') done.push({ id: 'zsr', icon: 'bill', title: 'ZSR-Nummer', text: 'Laut deiner Angabe vorhanden.' });
    else {
      const zsr: ActionItem = { id: 'zsr', icon: 'bill', title: a.zsr === 'antrag' ? 'ZSR-Antrag abschliessen' : 'ZSR klären', text: 'Die ZSR gehört zur Abrechnung und ist nicht dasselbe wie BAB, EMR oder GLN. Sie ist kantonsbezogen.', cta: { label: 'ZSR verstehen', href: '/regulatorik/zsr/' }, secondary: { label: 'GLN, ZSR & NAREG', href: '/regulatorik/gln-zsr-nareg/' }, source: src('sasisZsr') };
      (anyReg && a.zsr !== 'antrag' ? regBucket : next).push(zsr);
    }
    if (a.tariff590 === 'ja') done.push({ id: 'tarif', icon: 'bill', title: 'Abrechnung nach Tarif 590', text: 'Laut deiner Angabe eingerichtet.' });
    else {
      const tarif: ActionItem = { id: 'tarif', icon: 'bill', title: 'Abrechnung nach Tarif 590 einrichten', text: 'Tarif 590 ist die einheitliche Struktur für die Abrechnung mit Zusatzversicherern. Arbeite immer mit der aktuellen Version.', cta: { label: 'Tarif 590', href: '/regulatorik/tarif-590/' }, source: src('odaAmTarif590') };
      (a.zsr === 'ja' ? regBucket : next).push(tarif);
    }
  }

  // Foreign offen: nichts ausser der Abschlussklärung in «Jetzt».
  if (foreignOpen) { const keep = now.filter((i) => i.id === 'intl'); next.unshift(...now.filter((i) => i.id !== 'intl')); now.length = 0; now.push(...keep); }
  // «Jetzt» kompakt halten: max. 3, Rest nach «Danach».
  if (now.length > 3) next.unshift(...now.splice(3));

  const n = now.length;
  const headline = trainee ? 'Beginne zuerst mit deinem Berufsweg.'
    : foreignOpen ? 'Kläre zuerst die Anerkennung deines Abschlusses.'
    : n === 0 ? 'Du bist schon ziemlich weit.'
    : n === 1 ? 'Ein Punkt ist als Nächstes dran.'
    : `${NUM[n] ?? n} Punkte solltest du als Nächstes klären.`;
  const introParts = [
    methods.length || kt ? `Du möchtest${kt ? ` im Kanton ${kt}` : ''} ${methodPhrase} anbieten` : 'Du möchtest als TCM-Therapeut:in arbeiten',
    { ausbildung: 'und bist noch in Ausbildung', zertifikat: 'und hast bereits dein Zertifikat OdA AM', diplom: 'und hast das eidgenössische Diplom', ausland: 'und hast deinen Abschluss im Ausland gemacht', andere: 'und hast einen eigenen Ausbildungsweg' }[qual],
  ];
  const state = (id: string): 'done' | 'todo' | 'optional' =>
    done.some((i) => i.id === id) ? 'done' : [...now, ...next].some((i) => i.id === id) ? 'todo' : 'optional';
  const insurer: 'done' | 'todo' | 'optional' = trainee ? 'optional' : state('egk') === 'done' && state('visana') === 'done' ? 'done' : state('visana') === 'todo' || state('egk') === 'todo' ? 'todo' : 'optional';
  const summary = trainee
    ? [{ label: 'Ausbildung', state: 'todo' as const }, { label: 'Kanton', state: 'todo' as const }, { label: 'Registrierung', state: 'optional' as const }, { label: 'Abrechnung', state: 'optional' as const }]
    : [
        { label: 'Ausbildung', state: qual === 'ausland' ? state('intl') : qual === 'andere' ? 'todo' as const : 'done' as const },
        { label: 'BAB', state: state('bab') },
        { label: 'EMR', state: state('emr') },
        { label: 'ASCA', state: state('asca') },
        { label: 'ZSR', state: state('zsr') },
        { label: 'Versicherer', state: insurer },
        { label: 'Tarif 590', state: state('tarif') },
      ];
  return { headline, intro: introParts.join(' ') + '.', now, next, optional, done, summary };
}

/** Checkliste als Text (lokal, ohne personenbezogene Daten). */
export function planAsText(p: RecognitionPlan): string {
  const block = (h: string, items: ActionItem[], mark: string) => (items.length ? `${h}\n${items.map((i) => `${mark} ${i.title}`).join('\n')}\n` : '');
  return ['Mein TCM.ch Anerkennungs-Check\n', block('Jetzt:', p.now, '□'), block('Danach:', p.next, '□'), block('Kann relevant sein:', p.optional, '○'), block('Bereits erledigt:', p.done, '✓'), 'tcm.ch/tools/anerkennungs-navigator/']
    .filter(Boolean).join('\n');
}

export const STORAGE_KEY = 'tcmch-recognition-navigator-v1';
