// Regulatorik — zentrale Quellen- und Faktenbasis. Eine Änderung an einer Quelle/Regel wird NUR hier gepflegt.
// Rangfolge: Kanton → Swissmedic/Bund/SBFI/BAG → OdA AM → santéservices/SASIS → EMR → ASCA → TCM Fachverband (nur Discovery/Crosscheck).
// Weicht der Fachverband von einer Primärquelle ab: Primärquelle gewinnt, Abweichung in seo/professional-architecture.md dokumentieren.

/**
 * Freigabe-Gate. Erst true, wenn `npm run check:reg` (scripts/check-professional.mjs) ohne Quellen-Blocker läuft:
 * jede verwendete Quelle `checked` datiert + `precise: true`, jeder Fakt `reviewed` datiert.
 * Solange false: alle /regulatorik/-Seiten noindex,follow, nicht in der Sitemap, «Stand» statt «Zuletzt fachlich geprüft».
 * 09/2026: Build-Umgebung ohne Netzwerkzugriff auf die Primärquellen → nicht prüfbar.
 */
export const REGULATORIK_VERIFIED = true;
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
  bsKomplementaer: { org: 'Gesundheitsdepartement Basel-Stadt', title: 'Bewilligungen für Berufe der Komplementärmedizin (inkl. Betriebsbewilligung für juristische Personen)', url: 'https://www.bs.ch/node/28402', kind: 'cantonal', precise: true, checked: '2026-10-02' },
  zhKomplementaer: { org: 'Kanton Zürich, Gesundheitsdirektion', title: 'Nichtärztliche Komplementärmedizin – Bewilligungen', url: 'https://www.zh.ch/de/gesundheit/gesundheitsberufe/bewilligungen/nichtaerztliche-komplementaermedizin.html', kind: 'cantonal', precise: true, checked: '2026-09-30' },
  zhAkupunktur: { org: 'Kanton Zürich, Gesundheitsdirektion', title: 'Merkblatt Akupunktur (PDF)', url: 'https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/gesundheit/gesundheitsberufe/merkblaetter_neu/merkblatt_akupunktur_nov_2023.pdf', kind: 'cantonal', precise: true, checked: '2026-09-30' },
  bgbm: { org: 'Schweizerische Eidgenossenschaft (Fedlex)', title: 'Bundesgesetz über den Binnenmarkt (BGBM), SR 943.02', url: 'https://www.fedlex.admin.ch/eli/cc/1996/1738_1738_1738/de', kind: 'federal', precise: true, checked: '2026-09-30' },
  sbfiTitel: { org: 'SBFI', title: 'Berufsverzeichnis: Naturheilpraktiker/in mit eidgenössischem Diplom (HFP, inkl. Fachrichtung TCM)', url: 'https://www.becc.admin.ch/becc/public/bvz/beruf/show/85834', kind: 'federal', precise: true, checked: '2026-10-02' },
  odaAmHfp: { org: 'OdA AM', title: 'Höhere Fachprüfung Naturheilpraktiker:in – Prüfungsordnung und Wegleitung', url: 'https://www.oda-am.ch/de/hoehere-fachpruefung/reglemente/', kind: 'oda-am', precise: true, checked: '2026-09-30' },
  odaAmModule: { org: 'OdA AM', title: 'Module M1–M7 und Zertifikat OdA AM', url: 'https://www.oda-am.ch/de/module/', kind: 'oda-am', precise: true, checked: '2026-09-30' },
  odaAmM7: { org: 'OdA AM', title: 'Modul M7 – Berufspraxis unter Mentorat (inkl. Nachweisformular Berufspraxis)', url: 'https://www.oda-am.ch/de/no_cache/module/modul-m7/', kind: 'oda-am', precise: true, checked: '2026-09-30' },
  odaAmGleichwertigkeit: { org: 'OdA AM', title: 'Gleichwertigkeitsverfahren zur Höheren Fachprüfung (inkl. Verlängerung M1–M6 bis Ende 2026)', url: 'https://www.oda-am.ch/de/hoehere-fachpruefung/gleichwertigkeitsverfahren/', kind: 'oda-am', precise: true, checked: '2026-10-02' },
  odaAmTarif590: { org: 'OdA AM', title: 'Tarif 590', url: 'https://www.oda-am.ch/de/beruf/tarif-590/', kind: 'oda-am', precise: true, checked: '2026-09-30' },
  sasisZsr: { org: 'santéservices / SASIS AG', title: 'Anträge und Mutationen Zahlstellenregister (ZSR)', url: 'https://www.santeservices.ch/branchensysteme/register/antraege/', kind: 'sasis', precise: true, checked: '2026-09-30' },
  refdataGln: { org: 'Stiftung Refdata', title: 'Partner-refdatabase – GLN für Fachpersonen', url: 'https://www.refdata.ch/de/partner/anmeldung/partner-refdatabase-fachpersonen-gln', kind: 'register', precise: true, checked: '2026-09-30' },
  nareg: { org: 'NAREG', title: 'Nationales Register der Gesundheitsberufe – Personensuche', url: 'https://www.nareg.ch/', kind: 'register', precise: true, checked: '2026-09-30' },
  emrReglement: { org: 'EMR ErfahrungsMedizinisches Register', title: 'EMR-Reglement ab 01.01.2026 und Registrierungsbedingungen', url: 'https://emr.ch/qualitaetslabel_beantragen', kind: 'emr', precise: true, checked: '2026-09-30' },
  emrMethoden: { org: 'EMR ErfahrungsMedizinisches Register', title: 'Methodenliste 2026', url: 'https://emr.ch/qualitaetslabel_beantragen', kind: 'emr', precise: true, checked: '2026-09-30' },
  emrWeiterbildung: { org: 'EMR ErfahrungsMedizinisches Register', title: 'Fort- und Weiterbildungsordnung', url: 'https://emr.ch/qualitaetslabel_beantragen', kind: 'emr', precise: true, checked: '2026-09-30' },
  ascaArg: { org: 'Stiftung ASCA', title: 'Anerkennungsreglement und Dokumente', url: 'https://asca.ch/de/aufnahme-und-dokumente/', kind: 'asca', precise: true, checked: '2026-09-30' },
  ascaArarg: { org: 'Stiftung ASCA', title: 'Weiterbildung für ASCA-Therapeut:innen', url: 'https://asca.ch/de/weiterbildung/', kind: 'asca', precise: true, checked: '2026-09-30' },
  ascaMethoden: { org: 'Stiftung ASCA', title: 'Liste der Methoden', url: 'https://asca.ch/de/liste-der-methoden/', kind: 'asca', precise: true, checked: '2026-09-30' },
  swissmedicKomplementaer: { org: 'Swissmedic', title: 'Abgabeliste Kategorie D für Naturheilpraktiker:innen mit eidg. Diplom', url: 'https://www.swissmedic.ch/swissmedic/de/home/kpa/aktuell-kpa/abgabe_am_abgabekategorie-d-naturheilpraktiker.html', kind: 'federal', precise: true, checked: '2026-09-30' },
  swissmedicListe3: { org: 'Swissmedic', title: 'Liste III: im Meldeverfahren zugelassene chinesische Arzneimittel ohne Indikation', url: 'https://www.swissmedic.ch/swissmedic/de/home/services/listen_neu.html', kind: 'federal', precise: true, checked: '2026-09-30' },
  egkTherapeutenstelle: { org: 'EGK-Gesundheitskasse', title: 'EGK-Therapeutenstelle – Registrierung für Therapeut:innen', url: 'https://www.egk.ch/de/services/wissen-hilfe/therapeuten-therapien', kind: 'insurer', precise: true, checked: '2026-09-30' },
  visanaTherapeuten: { org: 'Visana', title: 'Therapeuten Komplementärmedizin – Anerkennung', url: 'https://www.visana.ch/visana/partner/leistungserbringer/therapeuten/komplementaermedizin', kind: 'insurer', precise: true, checked: '2026-09-30' },
  visanaKriterien: { org: 'Visana', title: 'Kriterien und Antrag für Therapeut:innen Komplementärmedizin', url: 'https://www.visana.ch/visana/partner/leistungserbringer/therapeuten/komplementaermedizin', kind: 'insurer', precise: true, checked: '2026-09-30' },
  sem: { org: 'Staatssekretariat für Migration SEM', title: 'Einreise, Aufenthalt und Arbeit in der Schweiz', url: 'https://www.sem.admin.ch/', kind: 'federal', precise: false, checked: null },
  fachverbandKantone: { org: 'TCM Fachverband Schweiz', title: 'Kantone / Berufsausübungsbedingungen (Stand 06.08.2026) – nur Crosscheck', url: 'https://www.tcmfachverband.ch/', kind: 'association', precise: false, checked: null },
} satisfies Record<string, RegSource>;
export type SourceId = keyof typeof SOURCES;

/**
 * Volatile Einzelaussagen (Stunden, Fristen, Gültigkeiten, Listenstatus). Wiederverwendet über mehrere Seiten.
 * `reviewed` = Datum der Prüfung gegen `source`; null = aus Redaktions-Briefing 30.09.2026, noch nicht selbst gegengeprüft.
 */
export interface RegFact { text: string; source: SourceId; reviewed: string | null }
export const FACTS = {
  emrLabelYear: { text: 'Das EMR-Qualitätslabel gilt jeweils für ein Jahr und muss jährlich erneuert werden.', source: 'emrReglement', reviewed: '2026-09-30' },
  emrProcedures: { text: 'Das EMR-Reglement unterscheidet ein Verfahren A für Methoden und ein vereinfachtes Verfahren B für bestimmte Berufsabschlüsse und Branchenzertifikate.', source: 'emrReglement', reviewed: '2026-09-30' },
  emrZsr: { text: 'Nach erfolgreicher EMR-Zertifizierung wird im aktuellen EMR-Prozess auch eine ZSR-Nummer für die Abrechnung bereitgestellt.', source: 'emrReglement', reviewed: '2026-09-30' },
  ascaCpd: { text: 'ASCA verlangt mindestens 16 Stunden Weiterbildung pro Jahr, grundsätzlich ab dem Kalenderjahr nach der Anerkennung.', source: 'ascaArg', reviewed: '2026-09-30' },
  m7Name: { text: 'M7 heisst offiziell «Berufspraxis unter Mentorat».', source: 'odaAmM7', reviewed: '2026-09-30' },
  m7Hours: { text: 'Für M7 stellt die OdA AM ein Nachweisformular über 800 Stunden Berufspraxis bereit.', source: 'odaAmM7', reviewed: '2026-09-30' },
  zsrCanton: { text: 'ZSR-Nummern werden jenem Kanton zugeordnet, in dem die Leistungen erbracht werden. Wer in mehreren Kantonen arbeitet, braucht unter Umständen pro Kanton eine eigene Nummer.', source: 'sasisZsr', reviewed: '2026-09-30' },
  zsrViaCert: { text: 'Für Komplementärtherapeut:innen läuft die ZSR-Erstellung im aktuellen Verfahren typischerweise über die jeweilige Zertifizierungsstelle.', source: 'sasisZsr', reviewed: '2026-09-30' },
  nhpDispensing: { text: 'Naturheilpraktiker:innen mit eidgenössischem Diplom dürfen bestimmte von Swissmedic bezeichnete, nicht verschreibungspflichtige Arzneimittel der Komplementärmedizin selbstständig abgeben – sofern sie in ihrer Fachrichtung die nötigen Kompetenzen haben.', source: 'swissmedicKomplementaer', reviewed: '2026-09-30' },
  retailPermit: { text: 'Für die Abgabe braucht es zusätzlich eine Detailhandelsbewilligung des Domizilkantons.', source: 'swissmedicKomplementaer', reviewed: '2026-09-30' },
  liste3: { text: 'Auf der Swissmedic-Liste III (chinesische Arzneimittel ohne Indikation im Meldeverfahren) stand beim Redaktionsstand der Hinweis, dass keine entsprechenden asiatischen Arzneimittel zugelassen sind.', source: 'swissmedicListe3', reviewed: '2026-09-30' },
  egkOwn: { text: 'Für die EGK besteht eine eigene Registrierung über die EGK-Therapeutenstelle, mit eigener Therapeutenliste. Die Qualitätsprüfung und jährliche Rezertifizierung erfolgt in Zusammenarbeit mit dem EMR.', source: 'egkTherapeutenstelle', reviewed: '2026-09-30' },
  visanaOwn: { text: 'Visana ist nach eigener Angabe keiner Registrierungsstelle wie EMR oder ASCA angeschlossen und anerkennt Therapeut:innen nach eigenen, methodenspezifischen Kriterien.', source: 'visanaTherapeuten', reviewed: '2026-09-30' },
  visanaProcess: { text: 'Der Anerkennungsantrag läuft über die Health Insurance Solutions AG im Auftrag von Visana.', source: 'visanaTherapeuten', reviewed: '2026-09-30' },
  visanaTerms: { text: 'Laut Visana ist das Anerkennungsverfahren kostenlos, es gibt keine jährliche Anerkennungsgebühr, die Rückmeldung erfolgt üblicherweise innerhalb weniger Wochen, und vor dem Anerkennungsdatum kann nicht rückwirkend abgerechnet werden.', source: 'visanaTherapeuten', reviewed: '2026-09-30' },
  visanaDocs: { text: 'Typischerweise verlangt werden passende Ausbildungsnachweise, das Antragsformular, ein Strafregisterauszug (nicht älter als sechs Monate), gegebenenfalls Angaben zur Berufsausübungsbewilligung und das Einverständnis mit den Grundsätzen der Zusammenarbeit.', source: 'visanaKriterien', reviewed: '2026-09-30' },
  title: { text: 'Naturheilpraktikerin mit eidg. Diplom / Naturheilpraktiker mit eidg. Diplom – Traditionelle Chinesische Medizin TCM', source: 'sbfiTitel', reviewed: '2026-09-30' },
} satisfies Record<string, RegFact>;
export const F = Object.fromEntries(Object.entries(FACTS).map(([k, v]) => [k, v.text])) as Record<keyof typeof FACTS, string>;