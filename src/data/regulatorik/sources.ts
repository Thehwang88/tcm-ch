// Regulatorik — zentrale Quellen- und Faktenbasis. Eine Änderung an einer Quelle/Regel wird NUR hier gepflegt.
// Rangfolge: Kanton → Swissmedic/Bund/SBFI/BAG → OdA AM → santéservices/SASIS → EMR → ASCA → TCM Fachverband (nur Discovery/Crosscheck).
// Weicht der Fachverband von einer Primärquelle ab: Primärquelle gewinnt, Abweichung in seo/professional-architecture.md dokumentieren.

/**
 * Freigabe-Gate. Erst true, wenn `npm run check:reg` (scripts/check-professional.mjs) ohne Quellen-Blocker läuft:
 * jede verwendete Quelle `checked` datiert + `precise: true`, jeder Fakt `reviewed` datiert.
 * Solange false: alle /regulatorik/-Seiten noindex,follow, nicht in der Sitemap, «Stand» statt «Zuletzt fachlich geprüft».
 * 09/2026: Build-Umgebung ohne Netzwerkzugriff auf die Primärquellen → nicht prüfbar.
 */
export const REGULATORIK_VERIFIED = false;
/** Redaktionsstand (nicht = fachliche Prüfung). */
export const REG_STAND = '2026-09-30';

export type SourceKind = 'cantonal' | 'federal' | 'oda-am' | 'sasis' | 'emr' | 'asca' | 'register' | 'insurer' | 'association';

export interface RegSource {
  org: string;
  title: string;
  url: string;
  kind: SourceKind;
  /** false = Link zeigt (noch) auf Startseite/Kandidat statt auf die konkrete Fachseite → Blocker für Freigabe. */
  precise: boolean;
  /** ISO-Datum der manuellen Prüfung (Link 200 + Inhalt deckt die Aussage); null = offen. */
  checked: string | null;
}

export const SOURCES = {
  zhKomplementaer: { org: 'Kanton Zürich, Gesundheitsdirektion', title: 'Nichtärztliche Komplementärmedizin – Bewilligungen', url: 'https://www.zh.ch/de/gesundheit/gesundheitsberufe/bewilligungen/nichtaerztliche-komplementaermedizin.html', kind: 'cantonal', precise: true, checked: null },
  zhAkupunktur: { org: 'Kanton Zürich, Gesundheitsdirektion', title: 'Merkblatt Akupunktur (PDF)', url: 'https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/gesundheit/gesundheitsberufe/merkblaetter_neu/merkblatt_akupunktur_nov_2023.pdf', kind: 'cantonal', precise: true, checked: null },
  bgbm: { org: 'Schweizerische Eidgenossenschaft (Fedlex)', title: 'Bundesgesetz über den Binnenmarkt (BGBM), SR 943.02', url: 'https://www.fedlex.admin.ch/eli/cc/1996/1738_1738_1738/de', kind: 'federal', precise: true, checked: null },
  sbfiTitel: { org: 'SBFI', title: 'Berufsverzeichnis: Naturheilpraktiker/in mit eidg. Diplom (HFP)', url: 'https://www.sbfi.admin.ch/', kind: 'federal', precise: false, checked: null },
  odaAmHfp: { org: 'OdA AM', title: 'Höhere Fachprüfung Naturheilpraktiker:in – Prüfungsordnung und Wegleitung', url: 'https://www.oda-am.ch/', kind: 'oda-am', precise: false, checked: null },
  odaAmModule: { org: 'OdA AM', title: 'Module M1–M7 und Zertifikat OdA AM', url: 'https://www.oda-am.ch/', kind: 'oda-am', precise: false, checked: null },
  odaAmM7: { org: 'OdA AM', title: 'Modul M7 – Berufspraxis unter Mentorat (inkl. Nachweisformular Berufspraxis)', url: 'https://www.oda-am.ch/', kind: 'oda-am', precise: false, checked: null },
  odaAmTarif590: { org: 'OdA AM', title: 'Tarif 590', url: 'https://www.oda-am.ch/', kind: 'oda-am', precise: false, checked: null },
  sasisZsr: { org: 'santéservices / SASIS AG', title: 'Zahlstellenregister (ZSR)', url: 'https://www.sasis.ch/', kind: 'sasis', precise: false, checked: null },
  refdataGln: { org: 'Stiftung Refdata', title: 'GLN für Personen', url: 'https://www.refdata.ch/', kind: 'register', precise: false, checked: null },
  nareg: { org: 'NAREG', title: 'Nationales Register der Gesundheitsberufe', url: 'https://www.nareg.ch/', kind: 'register', precise: false, checked: null },
  emrReglement: { org: 'EMR ErfahrungsMedizinisches Register', title: 'EMR-Reglement ab 01.01.2026 und Registrierungsbedingungen', url: 'https://www.emr.ch/', kind: 'emr', precise: false, checked: null },
  emrMethoden: { org: 'EMR ErfahrungsMedizinisches Register', title: 'Methodenliste 2026', url: 'https://www.emr.ch/', kind: 'emr', precise: false, checked: null },
  emrWeiterbildung: { org: 'EMR ErfahrungsMedizinisches Register', title: 'Fort- und Weiterbildungsordnung', url: 'https://www.emr.ch/', kind: 'emr', precise: false, checked: null },
  ascaArg: { org: 'Stiftung ASCA', title: 'Allgemeines Anerkennungsreglement (PDF)', url: 'https://asca.ch/wp-content/uploads/2023/12/CGATh_2023_DE.pdf', kind: 'asca', precise: true, checked: null },
  ascaArarg: { org: 'Stiftung ASCA', title: 'Ausführungsreglement (PDF)', url: 'https://asca.ch/wp-content/uploads/2023/12/ReCGATh_2023_DE.pdf', kind: 'asca', precise: true, checked: null },
  ascaMethoden: { org: 'Stiftung ASCA', title: 'Methodenliste und Partnerversicherer', url: 'https://asca.ch/', kind: 'asca', precise: false, checked: null },
  swissmedicKomplementaer: { org: 'Swissmedic', title: 'Komplementär- und Phytoarzneimittel: Abgabe durch Naturheilpraktiker:innen mit eidg. Diplom', url: 'https://www.swissmedic.ch/', kind: 'federal', precise: false, checked: null },
  swissmedicListe3: { org: 'Swissmedic', title: 'Liste III: im Meldeverfahren zugelassene chinesische Arzneimittel ohne Indikation', url: 'https://www.swissmedic.ch/', kind: 'federal', precise: false, checked: null },
  egkTherapeutenstelle: { org: 'EGK-Gesundheitskasse', title: 'EGK-Therapeutenstelle – Registrierung für Therapeut:innen', url: 'https://www.egk.ch/', kind: 'insurer', precise: false, checked: null },
  visanaTherapeuten: { org: 'Visana', title: 'Therapeuten Komplementärmedizin – Anerkennung', url: 'https://www.visana.ch/', kind: 'insurer', precise: false, checked: null },
  visanaKriterien: { org: 'Visana', title: 'Kriterien für die Anerkennung als Therapeut/in Komplementärmedizin', url: 'https://www.visana.ch/', kind: 'insurer', precise: false, checked: null },
  fachverbandKantone: { org: 'TCM Fachverband Schweiz', title: 'Kantone / Berufsausübungsbedingungen (Stand 06.08.2026) – nur Crosscheck', url: 'https://www.tcmfachverband.ch/', kind: 'association', precise: false, checked: null },
} satisfies Record<string, RegSource>;
export type SourceId = keyof typeof SOURCES;

/**
 * Volatile Einzelaussagen (Stunden, Fristen, Gültigkeiten, Listenstatus). Wiederverwendet über mehrere Seiten.
 * `reviewed` = Datum der Prüfung gegen `source`; null = aus Redaktions-Briefing 30.09.2026, noch nicht selbst gegengeprüft.
 */
export interface RegFact { text: string; source: SourceId; reviewed: string | null }
export const FACTS = {
  emrLabelYear: { text: 'Das EMR-Qualitätslabel gilt jeweils für ein Jahr und muss jährlich erneuert werden.', source: 'emrReglement', reviewed: null },
  emrProcedures: { text: 'Das EMR-Reglement unterscheidet ein Verfahren A für Methoden und ein vereinfachtes Verfahren B für bestimmte Berufsabschlüsse und Branchenzertifikate.', source: 'emrReglement', reviewed: null },
  emrZsr: { text: 'Nach erfolgreicher EMR-Zertifizierung wird im aktuellen EMR-Prozess auch eine ZSR-Nummer für die Abrechnung bereitgestellt.', source: 'emrReglement', reviewed: null },
  ascaCpd: { text: 'ASCA verlangt mindestens 16 Stunden Weiterbildung pro Jahr, grundsätzlich ab dem Kalenderjahr nach der Anerkennung.', source: 'ascaArg', reviewed: null },
  m7Name: { text: 'M7 heisst offiziell «Berufspraxis unter Mentorat».', source: 'odaAmM7', reviewed: null },
  m7Hours: { text: 'Für M7 stellt die OdA AM ein Nachweisformular über 800 Stunden Berufspraxis bereit.', source: 'odaAmM7', reviewed: null },
  zsrCanton: { text: 'ZSR-Nummern werden jenem Kanton zugeordnet, in dem die Leistungen erbracht werden. Wer in mehreren Kantonen arbeitet, braucht unter Umständen pro Kanton eine eigene Nummer.', source: 'sasisZsr', reviewed: null },
  zsrViaCert: { text: 'Für Komplementärtherapeut:innen läuft die ZSR-Erstellung im aktuellen Verfahren typischerweise über die jeweilige Zertifizierungsstelle.', source: 'sasisZsr', reviewed: null },
  nhpDispensing: { text: 'Naturheilpraktiker:innen mit eidgenössischem Diplom dürfen bestimmte von Swissmedic bezeichnete, nicht verschreibungspflichtige Arzneimittel der Komplementärmedizin selbstständig abgeben – sofern sie in ihrer Fachrichtung die nötigen Kompetenzen haben.', source: 'swissmedicKomplementaer', reviewed: null },
  retailPermit: { text: 'Für die Abgabe braucht es zusätzlich eine Detailhandelsbewilligung des Domizilkantons.', source: 'swissmedicKomplementaer', reviewed: null },
  liste3: { text: 'Auf der Swissmedic-Liste III (chinesische Arzneimittel ohne Indikation im Meldeverfahren) stand beim Redaktionsstand der Hinweis, dass keine entsprechenden asiatischen Arzneimittel zugelassen sind.', source: 'swissmedicListe3', reviewed: null },
  egkOwn: { text: 'Für die EGK besteht eine eigene Registrierung über die EGK-Therapeutenstelle, mit eigener Therapeutenliste. Die Qualitätsprüfung und jährliche Rezertifizierung erfolgt in Zusammenarbeit mit dem EMR.', source: 'egkTherapeutenstelle', reviewed: null },
  visanaOwn: { text: 'Visana ist nach eigener Angabe keiner Registrierungsstelle wie EMR oder ASCA angeschlossen und anerkennt Therapeut:innen nach eigenen, methodenspezifischen Kriterien.', source: 'visanaTherapeuten', reviewed: null },
  visanaProcess: { text: 'Der Anerkennungsantrag läuft über die Health Insurance Solutions AG im Auftrag von Visana.', source: 'visanaTherapeuten', reviewed: null },
  visanaTerms: { text: 'Laut Visana ist das Anerkennungsverfahren kostenlos, es gibt keine jährliche Anerkennungsgebühr, die Rückmeldung erfolgt üblicherweise innerhalb weniger Wochen, und vor dem Anerkennungsdatum kann nicht rückwirkend abgerechnet werden.', source: 'visanaTherapeuten', reviewed: null },
  visanaDocs: { text: 'Typischerweise verlangt werden passende Ausbildungsnachweise, das Antragsformular, ein Strafregisterauszug (nicht älter als sechs Monate), gegebenenfalls Angaben zur Berufsausübungsbewilligung und das Einverständnis mit den Grundsätzen der Zusammenarbeit.', source: 'visanaKriterien', reviewed: null },
  title: { text: 'Naturheilpraktikerin mit eidg. Diplom / Naturheilpraktiker mit eidg. Diplom – Traditionelle Chinesische Medizin TCM', source: 'sbfiTitel', reviewed: null },
} satisfies Record<string, RegFact>;
export const F = Object.fromEntries(Object.entries(FACTS).map(([k, v]) => [k, v.text])) as Record<keyof typeof FACTS, string>;
