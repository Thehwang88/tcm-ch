// Professional ecosystem (B2B) — architecture registry for code.
// READ · LEARN · WORK · CONNECT · BUILD · TRADE & MATCH · GROW · CONTRIBUTE
//
// Topic-level planning lives in seo/professional-topic-map.csv (source of truth for planned
// topics); the architecture is documented in seo/professional-architecture.md.
// RULE: only 'live' layers are linked as indexable destinations. 'scaffold_noindex' layers have
// a real, noindex routing page (no listings). 'planned' layers have NO route yet.

export type ProStatus =
  | 'live' | 'scaffold_noindex' | 'planned' | 'blocked'
  | 'editorial_only' | 'tool_candidate' | 'data_candidate';

export type LayerId =
  | 'akademie' | 'karriere' | 'praxiswissen' | 'partner'
  | 'branche' | 'regulatorik' | 'daten' | 'tools'
  | 'verzeichnis' | 'jobs' | 'weiterbildungen' | 'marktplatz' | 'community';

export type Pillar = 'read' | 'learn' | 'work' | 'connect' | 'build' | 'trade' | 'grow' | 'contribute';

export interface ProLayer {
  id: LayerId;
  label: string;
  href: string;
  /** Die eine Frage, die diese Ebene beantwortet (Owner-Grenze). */
  question: string;
  owns: string[];
  notOwner: string[];
  status: ProStatus;
  pillar: Pillar;
  /** true = Angebot von TCM.ch selbst; false = neutrale Branchen-Infrastruktur. */
  tcmOffer: boolean;
}

export const PRO_LAYERS: ProLayer[] = [
  { id: 'akademie', label: 'Akademie', href: '/akademie/', status: 'live', pillar: 'learn', tcmOffer: true,
    question: 'Wie lerne ich und entwickle mich beruflich weiter – mit TCM.ch?',
    owns: ['M7 / Mentorat von TCM.ch', 'Praktikum / Hospitation', 'Weiterbildung von TCM.ch', 'Business-Mentoring als Angebot'],
    notOwner: ['externe Kurse (→ Weiterbildungen)', 'neutrale Mentor:innen-Suche (→ Verzeichnis)', 'Jobs'] },
  { id: 'karriere', label: 'Karriere bei TCM.ch', href: '/karriere/', status: 'live', pillar: 'work', tcmOffer: true,
    question: 'Wie kann ich bei TCM.ch arbeiten?',
    owns: ['Arbeiten bei TCM.ch', 'TCM.ch Therapeut:innen-Rollen', 'TCM.ch Standortleitung', 'TCM.ch internationale Rekrutierung'],
    notOwner: ['generischer Stellenmarkt (→ Jobs, sobald live)', 'Lohn-Referenz (→ Branche)', 'Unternehmertum (→ Partner)'] },
  { id: 'praxiswissen', label: 'Praxiswissen', href: '/praxiswissen/', status: 'live', pillar: 'build', tcmOffer: false,
    question: 'Wie führe ich eine Praxis erfolgreich?',
    owns: ['Eröffnung', 'Kosten & Zahlen', 'Patientengewinnung', 'Auslastung', 'Kennzahlen', 'Standortwahl', 'angestellt vs. selbstständig', 'Übernahme/Verkauf (informativ, geplant)'],
    notOwner: ['Regeln im Detail (→ Regulatorik)', 'Partnerangebot (→ Partner)', 'Inserate (→ Marktplatz)'] },
  { id: 'partner', label: 'Partner', href: '/partner/', status: 'live', pillar: 'grow', tcmOffer: true,
    question: 'Soll ich meine Praxis mit TCM.ch aufbauen oder ausbauen?',
    owns: ['Partnerschaft mit TCM.ch', 'lokales Unternehmermodell', 'Partner-Ökonomie', 'Nachfolge-Gespräch mit TCM.ch (/partner/praxisnachfolge/, geplant)'],
    notOwner: ['neutrale Praxisverkaufs-Inserate (→ Marktplatz)', 'externe Praxispartner-Suche (→ Marktplatz)', 'Stadt-Partnerseiten (nie öffentlich)'] },
  { id: 'jobs', label: 'Jobs', href: '/jobs/', status: 'scaffold_noindex', pillar: 'work', tcmOffer: false,
    question: 'Welche TCM-Stellen gibt es in der Schweiz?',
    owns: ['TCM Jobs Schweiz (Owner-Wechsel von /karriere/ sobald echte Inserate live)', 'Stellen externer Praxen (moderiert)', 'Einstiegs- und Praktikumsstellen'],
    notOwner: ['Arbeiten bei TCM.ch (→ Karriere)', 'Arbeitsmarkt-Analyse (→ OUCH / Branche)'] },
  { id: 'verzeichnis', label: 'Verzeichnis', href: '/verzeichnis/', status: 'scaffold_noindex', pillar: 'connect', tcmOffer: false,
    question: 'Wer ist in der Schweizer TCM-Branche tätig?',
    owns: ['Fachpersonen-Profile (opt-in)', 'Kliniken', 'Mentor:innen (neutral)', 'Schulen (nur verifiziert)'],
    notOwner: ['Rankings', 'Patienten-Therapeut:innensuche (→ Standorte)', 'TCM.ch Mentoring-Angebot (→ Akademie)'] },
  { id: 'weiterbildungen', label: 'Weiterbildungen', href: '/weiterbildungen/', status: 'scaffold_noindex', pillar: 'learn', tcmOffer: false,
    question: 'Welche Kurse und Veranstaltungen gibt es in der Branche?',
    owns: ['externe Kurse', 'Kongresse', 'Workshops', 'Webinare', 'Fachveranstaltungen'],
    notOwner: ['TCM.ch-eigene Kurse & M7 (→ Akademie)'] },
  { id: 'marktplatz', label: 'Marktplatz', href: '/marktplatz/', status: 'scaffold_noindex', pillar: 'trade', tcmOffer: false,
    question: 'Wo finde ich Praxis, Raum, Nachfolge, Praxispartner oder Vertretung?',
    owns: ['Praxisverkauf / Nachfolge (neutral)', 'Praxisräume', 'Praxisgesuche', 'Praxispartner gesucht', 'Vertretung'],
    notOwner: ['Nachfolge-Gespräch mit TCM.ch (→ Partner)', 'Partnerschaft mit TCM.ch (→ Partner)', 'Jobs (→ Jobs)', 'Kurse (→ Weiterbildungen)'] },
  { id: 'community', label: 'Mitmachen', href: '/community/', status: 'scaffold_noindex', pillar: 'contribute', tcmOffer: false,
    question: 'Wie kann ich mich beteiligen?',
    owns: ['moderierte Einreichungen', 'Expertise teilen', 'Branchendaten beitragen (geplant)'],
    notOwner: ['Forum / Kommentare / Messaging (bewusst nicht gebaut)'] },
  { id: 'branche', label: 'Branche', href: '/branche/', status: 'live', pillar: 'read', tcmOffer: false,
    question: 'Wie funktionieren Beruf und Markt TCM in der Schweiz?',
    owns: ['Berufsbild', 'Arbeitsmarkt-Referenz', 'Praxisformen', 'Bildungslandschaft', 'Interviews'],
    notOwner: ['Meinung/Kritik (→ OUCH)', 'Jobs', 'Anmeldung M7 (→ Akademie)'] },
  { id: 'regulatorik', label: 'Regulatorik', href: '/regulatorik/', status: 'live', pillar: 'read', tcmOffer: false,
    question: 'Welche Regeln, Register und Bewilligungen gelten?',
    owns: ['BAB', 'EMR', 'ASCA', 'OdA AM', 'ZSR', 'Kanton-Navigator'],
    notOwner: ['Patienten-Kassenfragen (→ /krankenkassen/)', 'Kritik (→ OUCH)'] },
  { id: 'daten', label: 'Daten', href: '/daten/', status: 'planned', pillar: 'read', tcmOffer: false,
    question: 'Wie sieht der Markt tatsächlich aus?',
    owns: ['TCM.ch-Netzwerkdaten mit Methodik', 'Branchenreport', 'Benchmark-Beiträge'],
    notOwner: ['Schätzungen als Landesdurchschnitt'] },
  { id: 'tools', label: 'Tools', href: '/tools/', status: 'planned', pillar: 'build', tcmOffer: false,
    question: 'Hilf mir, etwas zu entscheiden oder zu berechnen.',
    owns: ['Navigatoren', 'Checklisten', 'Entscheidungsrechner'],
    notOwner: ['Praxisrechner (bleibt /praxiswissen/)', 'Rechts-/Steuerberatung'] },
];

export const layer = (id: LayerId) => PRO_LAYERS.find((l) => l.id === id)!;
/** Verlinkbar = echte Route vorhanden (indexierbar oder noindex-Gerüst). */
export const isLinkable = (l: ProLayer) => l.status === 'live' || l.status === 'scaffold_noindex';

/** Navigationseintrag. `planned: true` = Route existiert noch nicht → wird als «bald» ohne Link
 *  gerendert (nie ein toter Link). check-professional.mjs prüft: nicht-geplante hrefs sind gebaut,
 *  geplante nicht — beim Launch einer Route hier `planned` entfernen. */
export interface NavItem { label: string; href: string; planned?: true; accent?: true }
export interface NavGroup { id: string; label: string; items: NavItem[] }

/** Header «Für Fachpersonen»: nur Kategorien/Hubs, nie Einzelartikel. */
export const PRO_NAV_OVERVIEW: NavItem = { label: 'Übersicht', href: '/fachpersonen/' };
export const PRO_NAV: NavGroup[] = [
  { id: 'arbeiten', label: 'Arbeiten & Lernen', items: [
    { label: 'Jobs', href: '/jobs/' }, { label: 'Karriere bei TCM.ch', href: '/karriere/' },
    { label: 'Akademie', href: '/akademie/' }, { label: 'Weiterbildungen', href: '/weiterbildungen/' }] },
  { id: 'praxis', label: 'Praxis', items: [
    { label: 'Praxiswissen', href: '/praxiswissen/' }, { label: 'Tools & Rechner', href: '/tools/', planned: true },
    { label: 'Regulatorik', href: '/regulatorik/' }] },
  { id: 'netzwerk', label: 'Netzwerk', items: [
    { label: 'Verzeichnis', href: '/verzeichnis/' }, { label: 'Marktplatz', href: '/marktplatz/' }, { label: 'Community', href: '/community/' }] },
  { id: 'wachstum', label: 'Wachstum', items: [
    { label: 'Partner werden', href: '/partner/', accent: true }, { label: 'Praxisnachfolge', href: '/partner/praxisnachfolge/' }] },
  { id: 'branche', label: 'Branche', items: [
    { label: 'Branchenwissen', href: '/branche/' }, { label: 'Daten & Benchmarks', href: '/daten/', planned: true }] },
  { id: 'zuweiser', label: 'Für Zuweiser', items: [{ label: 'Online-Zuweisung', href: '/zuweisen/' }] },
];

/** /fachpersonen/ Control Center: vollständige Karte des Ökosystems. */
export const PRO_MAP: NavGroup[] = [
  { id: 'arbeiten', label: 'Arbeiten', items: [
    { label: 'Jobs finden', href: '/jobs/' }, { label: 'Karriere bei TCM.ch', href: '/karriere/' },
    { label: 'Berufseinstieg', href: '/karriere/berufseinstieg/' }, { label: 'Standortleitung', href: '/karriere/standortleitung/' },
    { label: 'Aus dem Ausland in die Schweiz', href: '/branche/tcm-international-schweiz/' }] },
  { id: 'lernen', label: 'Lernen', items: [
    { label: 'Akademie', href: '/akademie/' }, { label: 'M7 Mentorat', href: '/akademie/#interesse' },
    { label: 'Weiterbildungen', href: '/weiterbildungen/' }, { label: 'Mentor:in finden', href: '/verzeichnis/#mentoren' }] },
  { id: 'praxis', label: 'Praxis führen', items: [
    { label: 'Praxiswissen', href: '/praxiswissen/' }, { label: 'Praxisrechner', href: '/praxiswissen/praxisrechner/' },
    { label: 'Tools', href: '/tools/', planned: true }, { label: 'Regulatorik', href: '/regulatorik/' },
    { label: 'BAB / EMR / ASCA', href: '/regulatorik/berufsausuebungsbewilligung/' }] },
  { id: 'vernetzen', label: 'Vernetzen', items: [
    { label: 'Fachpersonen-Verzeichnis', href: '/verzeichnis/#therapeuten' }, { label: 'Kliniken', href: '/verzeichnis/#kliniken' },
    { label: 'Mentor:in werden', href: '/community/#mentor' }, { label: 'Community', href: '/community/' }] },
  { id: 'marktplatz', label: 'Marktplatz', items: [
    { label: 'Praxis verkaufen / Nachfolge', href: '/marktplatz/#praxisverkauf' }, { label: 'Praxis übernehmen', href: '/marktplatz/#praxisgesuche' },
    { label: 'Praxisräume', href: '/marktplatz/#praxisraeume' }, { label: 'Praxispartner', href: '/marktplatz/#praxispartner' },
    { label: 'Vertretungen', href: '/marktplatz/#vertretung' }] },
  { id: 'wachsen', label: 'Wachsen', items: [
    { label: 'TCM.ch Partner', href: '/partner/', accent: true }, { label: 'Partnermodell', href: '/partner/modell/' },
    { label: 'Praxisnachfolge mit TCM.ch', href: '/partner/praxisnachfolge/' }] },
  { id: 'branche', label: 'Branche verstehen', items: [
    { label: 'Branchenwissen', href: '/branche/' }, { label: 'Organisationen & Register', href: '/branche/organisationen/' },
    { label: 'Daten', href: '/daten/', planned: true },
    { label: 'Benchmarks', href: '/daten/praxis-benchmark/', planned: true }, { label: 'Reports', href: '/daten/', planned: true },
    { label: 'Interviews', href: '/branche/interviews/', planned: true }] },
  { id: 'zuweisen', label: 'Zuweisen', items: [{ label: 'Online-Zuweisung', href: '/zuweisen/' }] },
];

/** Lebenszyklus der Fachperson — von erstem Interesse bis Praxisübergabe. */
export type LifecycleId =
  | 'ausbildung' | 'praktikum' | 'm7' | 'berufseinstieg' | 'anstellung' | 'senior'
  | 'selbststaendigkeit' | 'eigene_praxis' | 'wachstum' | 'partnerschaft' | 'nachfolge';

export interface LifecycleStage { id: LifecycleId; label: string; question: string; layer: LayerId; href?: string }

export const LIFECYCLE_STAGES: LifecycleStage[] = [
  { id: 'ausbildung', label: 'Ausbildung', question: 'Wie komme ich in den Beruf?', layer: 'akademie', href: '/akademie/#weg' },
  { id: 'praktikum', label: 'Praktikum', question: 'Wie sieht der Praxisalltag wirklich aus?', layer: 'akademie', href: '/akademie/#interesse' },
  { id: 'm7', label: 'M7 / Mentorat', question: 'Wer begleitet mich nach dem Abschluss?', layer: 'akademie', href: '/akademie/#interesse' },
  { id: 'berufseinstieg', label: 'Berufseinstieg', question: 'Wie finde ich meine erste Stelle?', layer: 'karriere', href: '/karriere/berufseinstieg/' },
  { id: 'anstellung', label: 'Anstellung', question: 'Wo kann ich als Therapeut:in arbeiten?', layer: 'karriere', href: '/karriere/' /* → /jobs/ sobald echte Inserate live */ },
  { id: 'senior', label: 'Senior / Standortleitung', question: 'Wie übernehme ich Verantwortung?', layer: 'karriere', href: '/karriere/standortleitung/' },
  { id: 'selbststaendigkeit', label: 'Selbstständigkeit', question: 'Angestellt bleiben oder selbstständig werden?', layer: 'praxiswissen', href: '/praxiswissen/tcm-selbststaendig-oder-angestellt/' },
  { id: 'eigene_praxis', label: 'Eigene Praxis', question: 'Wie eröffne ich eine Praxis, und was kostet sie?', layer: 'praxiswissen', href: '/praxiswissen/tcm-praxis-eroeffnen/' },
  { id: 'wachstum', label: 'Wachstum / Team', question: 'Wann stelle ich ein, wann baue ich aus?', layer: 'praxiswissen', href: '/praxiswissen/tcm-praxis-auslastung/' },
  { id: 'partnerschaft', label: 'TCM.ch Partnerschaft', question: 'Will ich das System nicht allein bauen?', layer: 'partner', href: '/partner/' },
  { id: 'nachfolge', label: 'Praxisnachfolge', question: 'Was passiert mit meiner Praxis, wenn ich aufhöre?', layer: 'partner', href: '/partner/praxisnachfolge/' },
];

/** Cluster-Taxonomie (IDs = Spalte `cluster` in seo/professional-topic-map.csv). */
export const PRO_CLUSTERS: Record<string, { layer: LayerId | 'gateway' | 'ouch'; label: string }> = {
  'gateway': { layer: 'gateway', label: 'Gateway' },
  'akademie-bildung': { layer: 'akademie', label: 'Lernen & Mentorat' },
  'karriere-anstellung': { layer: 'karriere', label: 'Karriere bei TCM.ch' },
  'karriere-lohn': { layer: 'branche', label: 'Lohn & Einkommen (Referenz)' },
  'praxis-hub': { layer: 'praxiswissen', label: 'Praxiswissen Hub' },
  'praxis-gruendung': { layer: 'praxiswissen', label: 'Gründung' },
  'praxis-zahlen': { layer: 'praxiswissen', label: 'Zahlen' },
  'praxis-wachstum': { layer: 'praxiswissen', label: 'Patienten & Wachstum' },
  'praxis-betrieb': { layer: 'praxiswissen', label: 'Betrieb & Organisation' },
  'praxis-nachfolge': { layer: 'praxiswissen', label: 'Übernahme & Nachfolge' },
  'partner-modell': { layer: 'partner', label: 'Partnerschaft' },
  'branche-beruf': { layer: 'branche', label: 'Beruf & Markt' },
  'branche-organisationen': { layer: 'branche', label: 'Organisationen' },
  'branche-bildung': { layer: 'branche', label: 'Bildungslandschaft' },
  'branche-interviews': { layer: 'branche', label: 'Interviews' },
  'regulatorik-register': { layer: 'regulatorik', label: 'Register & Anerkennung' },
  'regulatorik-kantone': { layer: 'regulatorik', label: 'Kantone' },
  'daten-benchmarks': { layer: 'daten', label: 'Benchmarks & Berichte' },
  'tools-navigatoren': { layer: 'tools', label: 'Navigatoren & Rechner' },
  'jobs-markt': { layer: 'jobs', label: 'Stellenmarkt' },
  'verzeichnis-profile': { layer: 'verzeichnis', label: 'Verzeichnis' },
  'weiterbildung-kurse': { layer: 'weiterbildungen', label: 'Kurse & Veranstaltungen' },
  'marktplatz-praxis': { layer: 'marktplatz', label: 'Praxis, Räume, Nachfolge' },
  'marktplatz-zusammenarbeit': { layer: 'marktplatz', label: 'Praxispartner & Vertretung' },
  'community-beitrag': { layer: 'community', label: 'Beteiligung & Beiträge' },
};

// Content-model extras for professional articles (Praxiswissen today, Branche later).
export type { ExpertQuote, InterviewRef, FirstPartyObservation, SourceLink, ProfessionalContentExtras } from './contributions';
