// TCM.ch · TCM 360° Entdeckertage St. Gallen (fortlaufendes Angebot für Neupatient:innen in Buchungsrunden, nur
// /standorte/st-gallen/). EINZIGE Quelle für Angebotsschalter, Freigaben, Kapazitäts-/Fristanzeige und Aktions-Texte.
// Buchungsrunden (Start, Ende, reservierte Termine, Status): src/data/tcm360-runden.json. Das Team pflegt die Datei ohne Änderung
// der Anwendungslogik; wirksam wird sie erst mit einem neuen Build/Deploy (Push auf main). Kein Admin-Dashboard.
// Angebots-IDs/Terminarten bleiben die des gemeinsamen Kontaktformulars (src/data/kontakt-angebote.mjs: TCM_CHECKIN,
// ERSTTERMIN_BEHANDLUNG); die Kampagne wird als Feld «kampagne» (KAMPAGNEN.sg_tcm360_herbst_2026) plus «runde» (Buchungsrunde)
// mitgesendet und serverseitig als «TCM 360°-Check» klassifiziert. Der reguläre kostenlose 30-Minuten-Check-in bleibt
// unverändert (Texte, Versand, Tracking, OneDoc).
//
// Betrieb (Team) · Ablauf docs/cro/10-tcm360-entdeckertage-sg.md:
//   offerActive   MANUELLER Schalter. false = kein Kampagnen-Markup im Build (regulärer SG-Hero, reguläre Sticky-Bar).
//                 Darf nur mit allen approvals=true gesetzt werden (Gate scripts/check-herbst-sg.mjs).
//   approvals     Format (5-Themen-Kurzcheck, Zungen-/Pulsdiagnostik, Fragen, Praxis-Einblick; ca. 20 Min., werberechtlich
//                 geprüft), Kapazität/Personal (separat reservierte 360°-Termine), Claims, Datenschutz. Fehlt eine Freigabe
//                 → Angebot NICHT BEREIT, kein Markup.
//   Runden        Aktuelle Runde = status «offen» und jetzt innerhalb start…ende → «Aktuelle Buchungsrunde bis <Ende>».
//                 Keine aktuelle, aber eine bestätigte spätere Runde (status offen/geplant, start > jetzt) → «Nächste
//                 Buchungsrunde ab <Start>». Sonst neutral, ohne Verfügbarkeitszusage: «360°-Termine auf Anfrage». Der Client prüft dieselben Regeln
//                 mit der aktuellen Uhrzeit (eine beendete Runde kippt ohne Rebuild in den neutralen Status; nie ein Reset).
//   Kapazität     «Spezielle 360°-Termine – begrenzte Kapazität» NUR mit reservierteTermine der aktuellen Runde;
//                 «Noch X 360°-Termine verfügbar» NUR mit verlässlicher Live-Restzahl (live.remaining, verifiedAt ≤ 24 h).
//                 Runde ausgebucht (bestätigte ≥ reservierte) → ehrlicher Hinweis, Anfrage für reguläre Termine bleibt.
//   Nie: Countdown-Resets, Zufallszahlen, erfundene Buchungs-Hinweise, CHF-Vergleichswerte, Blink-/Puls-Warnungen,
//        Aussagen, das Angebot ende endgültig, solange es weitergeführt wird.
// Vorschau (nur lokale Review-/QA-Builds): HERBST_SG_PREVIEW=active|soldout|live|between|next (Kontingent-Modus simuliert) | anfrage.
// Produktion setzt das nie.
import { KAMPAGNEN } from './kontakt-angebote.mjs';
import rundenJson from './tcm360-runden.json';

export const HERBST_SG = {
  id: 'sg_tcm360_herbst_2026' as const,
  label: KAMPAGNEN.sg_tcm360_herbst_2026.label,
  standortId: 'st-gallen',
  stadt: 'St. Gallen',
  /** Manueller Angebotsschalter. Inhaber-Freigabe zum Launch 21.10.2026 (docs/cro/10 §1). */
  offerActive: true,
  /** Buchungsmodus (Inhaber-Entscheid 21.10.2026):
   *  'anfrage'    = Anfrage-Modus: 360°-Termine nur als unverbindliche Anfrage; KEINE Rundenfrist als «offen für bestätigte
   *                 Termine», keine Kapazitäts-/Restzahl-Texte, Rundenzeile immer neutral («360°-Termine auf Anfrage ·
   *                 unverbindlich»). Erlaubt ohne capacityConfirmed. Runden-ID wird intern zur Messung zugeordnet.
   *  'kontingent' = verifiziertes Kontingent (capacityConfirmed + reservierteTermine): Rundenfrist und Kapazitätstext sichtbar. */
  bookingMode: 'anfrage' as 'anfrage' | 'kontingent',
  // Jede Freigabe nur mit Beleg (Name, Datum, Quelle) in docs/cro/10 §1; nie, um das Gate zu erfüllen.
  approvals: {
    /** Inhaber-Freigabe 21.10.2026: kommerzielles Angebot, Format ca. 20 Min. (Kurzcheck mit Fokus auf das Hauptanliegen,
     *  Zungen-/Pulsdiagnostik, Fragen, Praxis-Einblick), ohne Behandlung. Keine unabhängige werberechtliche Prüfung; das Gate
     *  verbietet Diagnose-/Garantie-/Knappheits-Claims im Wortlaut. */
    formatConfirmed: true,
    /** Separat reservierte 360°-Termine und Personal je Runde (reservierteTermine in tcm360-runden.json). Beleg: OFFEN →
     *  Launch im Anfrage-Modus (bookingMode 'anfrage'), keine Kapazitätsaussagen. */
    capacityConfirmed: false,
    /** Inhaber-Freigabe des Patienten-Wortlauts 21.10.2026 + automatisiertes Gate (keine medizinischen Untersuchungs-/
     *  Diagnose-Claims, keine Dringlichkeits-/Preisvergleichs-Muster, neutraler Status ohne Verfügbarkeitszusage). */
    claimsReviewed: true,
    /** Prüfung 21.10.2026 gegen die Datenschutzerklärung (Ziff. 2 Kontaktformular-Daten, Ziff. 3 Zweck Terminanfrage,
     *  Resend-Versand, Turnstile, Ziff. 7 GA4/GTM nur nach Einwilligung via CookieYes): kampagne/runde/utm sind Zuordnungs-
     *  daten der Anfrage in derselben Mail; keine Gesundheits- oder Kontaktdaten an GTM/GA4/Ads. Keine Textänderung nötig. */
    privacyReviewed: true,
  },
  /** Vorgeschlagene Dauer des 360°-Termins (ca. 20 Min.), NUR angezeigt mit approvals.formatConfirmed. */
  dauerMin: 20,
  /** Live-Verfügbarkeit aus dem Buchungssystem (nur mit verlässlicher Synchronisation; derzeit keine OneDoc-API). */
  live: { remaining: null as number | null, verifiedAt: '' as string },
} as const;

export type RundeStatus = 'geplant' | 'offen' | 'beendet';
export interface Runde { id: string; start: string; ende: string; status: RundeStatus; reservierteTermine: number | null; bestaetigteBuchungen: number | null; verifiziertAm: string; verifiziertVon: string; hinweis: string }
export const RUNDEN: Runde[] = (rundenJson as { runden: Runde[] }).runden;

export type HerbstMode = 'off' | 'active' | 'soldout';
export type RundeKind = 'aktuell' | 'naechste' | 'keine';
export interface HerbstState {
  /** true = Kampagnen-Markup wird gerendert (active oder soldout). */
  show: boolean;
  mode: HerbstMode;
  soldOut: boolean;
  preview: string;
  ready: boolean;
  /** 'anfrage' = nur unverbindliche Anfragen, keine Kapazitäts-/Fristaussagen; 'kontingent' = verifiziertes Kontingent. */
  bookingMode: 'anfrage' | 'kontingent';
  /** Aktuelle Buchungsrunde (Build-Zeit); '' = keine. Der Client setzt das Feld «runde» mit derselben Logik. */
  rundeId: string;
  rundeKind: RundeKind;
  /** Geprüfte Runden-/Statuszeile (z. B. «Aktuelle Buchungsrunde bis 31.10.2026», «Neue 360°-Termine verfügbar»). */
  rundeText: string;
  /** Kapazitätszeile: nur verifiziert ('' = keine). */
  scarcity: string;
  scarcityKind: 'live' | 'quota' | 'none';
  /** Angezeigte Dauer ('' solange das Format nicht freigegeben ist). */
  dauerText: string;
  /** Runden für das Client-Skript (gleiche Regeln zur Laufzeit). */
  rundenClient: { id: string; start: number; ende: number; status: RundeStatus; soldOut: boolean; quota: boolean; hinweis: string }[];
}

const ms = (iso: string) => new Date(iso).getTime();
const DAY = 24 * 60 * 60 * 1000;
/** dd.mm.yyyy in Europe/Zurich. */
export const fmtDate = (iso: string) => new Intl.DateTimeFormat('de-CH', { timeZone: 'Europe/Zurich', day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(iso));
/** Ohne laufende/bestätigte Runde: keine Verfügbarkeitszusage, nur die unverbindliche Anfrage. */
export const NEUTRAL_TEXT = '360°-Termine auf Anfrage · unverbindlich';
export const rundeSoldOut = (r: Runde) => r.reservierteTermine != null && r.bestaetigteBuchungen != null && r.bestaetigteBuchungen >= r.reservierteTermine;

/** Aktuelle / nächste Runde nach denselben Regeln wie das Client-Skript (HerbstSheetSG). */
export const pickRunde = (runden: Runde[], now: number): { kind: RundeKind; runde: Runde | null } => {
  const cur = runden.find((r) => r.status === 'offen' && now >= ms(r.start) && now <= ms(r.ende));
  if (cur) return { kind: 'aktuell', runde: cur };
  const next = runden.filter((r) => (r.status === 'offen' || r.status === 'geplant') && ms(r.start) > now).sort((a, b) => ms(a.start) - ms(b.start))[0];
  return next ? { kind: 'naechste', runde: next } : { kind: 'keine', runde: null };
};

export const herbstState = (): HerbstState => {
  const preview = (typeof process !== 'undefined' && process.env.HERBST_SG_PREVIEW) || '';
  const now = Date.now();
  const A = HERBST_SG.approvals;
  // Kapazitäts-Freigabe nur im Kontingent-Modus nötig; im Anfrage-Modus gibt es keine Kapazitätsaussage.
  const anfrage = HERBST_SG.bookingMode === 'anfrage' && !preview || preview === 'anfrage';
  const ready = A.formatConfirmed && A.claimsReviewed && A.privacyReviewed && (A.capacityConfirmed || HERBST_SG.bookingMode === 'anfrage');
  let show = HERBST_SG.offerActive && ready;
  let runden: Runde[] = RUNDEN;
  let live = { remaining: HERBST_SG.live.remaining as number | null, verifiedAt: HERBST_SG.live.verifiedAt as string };
  let dauerText = A.formatConfirmed ? `ca. ${HERBST_SG.dauerMin} Minuten` : '';
  if (preview) {
    show = true;
    const iso = (t: number) => new Date(t).toISOString();
    const base: Runde = { id: 'runde-vorschau', start: iso(now - DAY), ende: iso(now + 9 * DAY), status: 'offen', reservierteTermine: 20, bestaetigteBuchungen: 3, verifiziertAm: 'Vorschau', verifiziertVon: 'Vorschau', hinweis: '' };
    runden = [base];
    if (preview === 'soldout') runden = [{ ...base, bestaetigteBuchungen: 20 }];
    if (preview === 'live') { live = { remaining: 7, verifiedAt: iso(now - 60 * 60 * 1000) }; dauerText = `ca. ${HERBST_SG.dauerMin} Minuten`; }
    if (preview === 'between') runden = [{ ...base, ende: iso(now - 60 * 60 * 1000), status: 'beendet' }];
    if (preview === 'next') runden = [{ ...base, ende: iso(now - 60 * 60 * 1000), status: 'beendet' }, { ...base, id: 'runde-vorschau-2', start: iso(now + 3 * DAY), ende: iso(now + 12 * DAY), status: 'geplant', bestaetigteBuchungen: null }];
    if (preview === 'anfrage') { runden = [{ ...base, reservierteTermine: null, bestaetigteBuchungen: null, verifiziertAm: '', verifiziertVon: '' }]; dauerText = `ca. ${HERBST_SG.dauerMin} Minuten`; }
  }
  const { kind, runde } = pickRunde(runden, now);
  const liveOk = !anfrage && live.remaining != null && !!live.verifiedAt && now - ms(live.verifiedAt) <= DAY && now - ms(live.verifiedAt) >= 0;
  const soldOut = !anfrage && show && kind === 'aktuell' && ((liveOk && (live.remaining as number) <= 0) || rundeSoldOut(runde!));
  const mode: HerbstMode = !show ? 'off' : soldOut ? 'soldout' : 'active';
  // Anfrage-Modus: nie eine Runde als «offen für bestätigte Termine» bewerben → immer neutraler Status.
  const rundeText = !show ? '' : anfrage ? NEUTRAL_TEXT : kind === 'aktuell' ? (runde!.hinweis || `Aktuelle Buchungsrunde bis ${fmtDate(runde!.ende)}`)
    : kind === 'naechste' ? (runde!.hinweis || `Nächste Buchungsrunde ab ${fmtDate(runde!.start)}`) : NEUTRAL_TEXT;
  const scarcityKind = !show || anfrage || soldOut || kind !== 'aktuell' ? 'none' : liveOk && (live.remaining as number) > 0 ? 'live' : runde!.reservierteTermine != null ? 'quota' : 'none';
  const scarcity = scarcityKind === 'live' ? `Noch ${live.remaining} 360°-Termine verfügbar`
    : scarcityKind === 'quota' ? 'Spezielle 360°-Termine – begrenzte Kapazität' : '';
  return { show, mode, soldOut, preview, ready, bookingMode: anfrage ? 'anfrage' : 'kontingent', rundeId: kind === 'aktuell' ? runde!.id : '', rundeKind: kind, rundeText, scarcity, scarcityKind, dauerText,
    rundenClient: runden.map((r) => ({ id: r.id, start: ms(r.start), ende: ms(r.ende), status: r.status, soldOut: rundeSoldOut(r), quota: r.reservierteTermine != null, hinweis: r.hinweis || '' })) };
};

/** Launch-Copy (verbindlich, docs/cro/10). Keine Dauer ausser bei freigegebenem Format; keine medizinischen Untersuchungs-Claims. */
export const HERBST_COPY = {
  name: 'TCM 360° Entdeckertage',
  eyebrow: 'St. Gallen · TCM 360° Entdeckertage',
  subtitle: 'Exklusiv in St. Gallen · für Neupatientinnen und Neupatienten',
  headline: 'Lerne deinen Körper aus Sicht der TCM besser kennen.',
  offer: 'Dein persönlicher TCM 360°-Check – CHF 0.–',
  support: 'Entdecke die Traditionelle Chinesische Medizin bei einem persönlichen Kennenlerntermin. Wir betrachten wichtige Aspekte deines Wohlbefindens aus Sicht der TCM, geben dir einen Einblick in die traditionelle Zungen- und Pulsdiagnostik und beantworten deine Fragen.',
  reassurance: 'Kostenlos · Unverbindlich · Keine Behandlungspflicht',
  /** Die vier Bausteine (Desktop-Modal). */
  components: [
    { t: 'Persönlicher TCM-Konstitutionscheck', d: 'Kurze, strukturierte Orientierung zu Schlaf und Erholung, Stress und Wohlbefinden, Energie und Müdigkeit, Verdauung und Körpergefühl, Schmerzen und Bewegung. Dein Hauptanliegen steht im Vordergrund.' },
    { t: 'Traditionelle Zungen- und Pulsdiagnostik', d: 'Einblick in die traditionelle Betrachtung von Zunge und Puls durch eine qualifizierte Fachperson und ihre Rolle innerhalb der TCM.' },
    { t: 'Frag den TCM-Experten', d: 'Deine Fragen zu Akupunktur, chinesischer Kräutertherapie, Tuina-Massage, Ablauf, Ersttermin, Kosten und Zusatzversicherung.' },
    { t: 'Exklusiver Praxis-Einblick', d: 'Kurze Vorstellung der Praxis St. Gallen und der Behandlungsmöglichkeiten, wenn möglich mit den anwesenden Fachpersonen.' },
  ],
  /** Kompakte Vorteile (Sheet). */
  benefits: ['Persönlicher TCM-Konstitutionscheck', 'Zungen- und Pulsdiagnostik', 'Antworten auf deine TCM-Fragen', 'Praxis kennenlernen'],
  noTreatment: 'Keine Akupunktur, Massage oder andere Behandlung inbegriffen. Keine Behandlungspflicht.',
  boundary: '360° steht für die ganzheitliche Sicht der TCM: ein kurzer, auf dein Hauptanliegen fokussierter Kurzcheck, keine umfassende medizinische Untersuchung. Er ersetzt keine ärztliche Diagnostik und dient der persönlichen Orientierung aus Sicht der TCM.',
  bannerEyebrow: 'St. Gallen · Herbst Special',
  bannerH: 'TCM 360°-Check für CHF 0.–',
  bannerSub: 'Ganzheitlicher TCM-Kurzcheck, Zungen- & Pulsdiagnostik und persönliche Fragen.',
  bannerCta: 'Gratis 360°-Termin anfragen',
  bannerCtaSoldout: 'Termin anfragen',
  sheetLabel: 'St. Gallen Special',
  sheetH: 'Dein TCM 360°-Termin',
  sheetSub: 'Kostenloser ganzheitlicher TCM-Kurzcheck – persönlich und unverbindlich.',
  sheetHSoldout: 'Termin in St. Gallen anfragen',
  sheetSubSoldout: 'Die 360°-Termine der aktuellen Buchungsrunde sind vergeben.',
  tileCheckin: 'Gratis TCM 360°-Check',
  tileCheckinD: 'Ganzheitlicher TCM-Kurzcheck, Zungen- und Pulsdiagnostik, deine Fragen und ein Einblick in die Praxis.',
  tileBehandlung: 'Direkt zur Erstbehandlung',
  submitCheckin: 'Gratis 360°-Termin anfragen',
  submitBehandlung: 'Erstbehandlung anfragen',
  stickyPrimary: 'Gratis 360°-Check',
  stickyPrimarySoldout: 'Termin anfragen',
  rundeNote: 'Die Entdeckertage laufen in Buchungsrunden mit separat reservierten 360°-Terminen. Der reguläre kostenlose TCM-Check-in (30 Minuten) bleibt in St. Gallen unabhängig davon anfragbar.',
  soldOutNote: 'Die separat reservierten 360°-Termine dieser Buchungsrunde sind vergeben. Du kannst weiterhin einen Ersttermin mit Behandlung oder den regulären kostenlosen TCM-Check-in anfragen, Termin nach Verfügbarkeit.',
  okCheckin: 'Deine Anfrage: Gratis TCM 360°-Check in St. Gallen (Entdeckertage). Wir rufen dich zur Terminvereinbarung zurück.',
} as const;
