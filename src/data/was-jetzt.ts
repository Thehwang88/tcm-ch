// Was jetzt?: Daten-Layer für /gesundheitsbibliothek/was-jetzt/
//
// INTENT-ABGRENZUNG innerhalb der Gesundheitsbibliothek (nicht verwischen):
// - Körpersignale:      "Ich bemerke etwas."
// - Beschwerden:        "Ich kenne oder vermute das Problem."
// - Befunde & Werte:    "Ein Test/Bericht sagt etwas."
// - Was jetzt?:         "Was kann ich jetzt sicher selbst tun?"
// - Therapien:          "Welche professionelle Behandlung gibt es?"
// - Fragen:             "Konkrete Behandlungsfrage."
// - Wissen:             "Thema verstehen."
// - Perspektiven:       "Wie TCM.ch klinisch entscheidet."
// - TCM verstehen:      "TCM-Begriffe/Modelle verstehen."
//
// Dieses Cluster besitzt NUR den Handlungs-Intent (sofortige Selbsthilfe,
// was vermeiden, wann abklären, wann professionelle Behandlung). Es ist keine
// zweite Beschwerden-Bibliothek, kein Hausmittel-Lexikon, keine DIY-Verordnung.
//
// STRENGER SEITEN-TEST (Publikation nur bei mind. 4 von 5):
// 1. klarer handlungsorientierter Such-Intent
// 2. Antwort unterscheidet sich substanziell von Beschwerden-/Signal-Seite
// 3. echter Selbstmanagement-Nutzen
// 4. natürliche interne Links zu bestehenden Knoten
// 5. realer SEO- oder Navigationswert
// Sonst: Selbsthilfe-Abschnitt auf der Owner-Seite ergänzen statt neuer URL.
//
// Kräuter: KEIN Selbsthilfe-Feld (bewusst kein herbsHtml). Chinesische
// Kräutertherapie ist ein professioneller Behandlungsweg; Erwähnungen
// verlinken auf /therapien/kraeutertherapie/.

export type SelfCareTool =
  | 'movement'
  | 'nutrition'
  | 'acupressure'
  | 'heat-cold'
  | 'sleep'
  | 'stress'
  | 'ergonomics'
  | 'rest-recovery';

export const TOOL_LABELS: Record<SelfCareTool, string> = {
  movement: 'Bewegung',
  nutrition: 'Ernährung',
  acupressure: 'Akupressur',
  'heat-cold': 'Wärme & Kälte',
  sleep: 'Schlaf',
  stress: 'Stress & Entspannung',
  ergonomics: 'Alltag & Ergonomie',
  'rest-recovery': 'Ruhe & Erholung',
};

// low-risk: Selbsthilfe unproblematisch. needs-caution: Selbsthilfe ok, aber
// mit klaren Abklärungs-Hinweisen. medical-first: nur als Triage-/Weiterleitungs-
// Seite zulässig (in Phase 1 nicht vorgesehen).
export type SelfCareSafety = 'low-risk' | 'needs-caution' | 'medical-first';

export interface WasJetztLink {
  href: string;
  label: string;
}

export interface WasJetztEntry {
  slug: string;
  title: string;
  status: 'planned' | 'draft' | 'published';
  indexable: boolean;
  deck: string;
  // Kannibalisierungs-Leitplanken (Pflicht pro Eintrag):
  primaryPurpose: string;
  // Bestehende URL(s), die den Erkrankungs-/Signal-Intent besitzen. Leeres Array
  // NUR wenn kein Owner existiert; Begründung in overlapNotes. Keine URLs erfinden.
  canonicalIntentOwner: string[];
  overlapNotes: string;
  // Welche Selbsthilfe-Dimensionen der künftige Artikel nutzt. Nur relevante
  // Blöcke: KEIN Pflicht-Raster über alle Tools hinweg.
  selfCareTools: SelfCareTool[];
  safetyLevel: SelfCareSafety;
  suggestedReviewerType: string;
  // Nur verifizierte, existierende URLs:
  relatedSignals?: WasJetztLink[];
  relatedConditions?: WasJetztLink[];
  relatedFindings?: WasJetztLink[];
  relatedTherapies?: WasJetztLink[];
  relatedDiagnostics?: WasJetztLink[];
  relatedVisuals?: WasJetztLink[];
  // Phase 2 (Inhalt): alle Blöcke optional, bleiben in Phase 1 leer.
  shortAnswerHtml?: string;          // Kurzantwort
  doNowHtml?: string;                // Was du jetzt tun kannst
  avoidHtml?: string;                // Was du besser vermeiden solltest
  movementHtml?: string;             // optionale Module: nur wo relevant
  nutritionHtml?: string;
  acupressureHtml?: string;          // max. 1-2 einfache Punkte, ersetzt keine Abklärung
  heatColdHtml?: string;
  sleepHtml?: string;
  stressHtml?: string;
  ergonomicsHtml?: string;
  whenToSeekCareHtml?: string;       // Wann ärztlich abklären
  notBetterHtml?: string;            // Wenn es nicht besser wird
  professionalTreatmentHtml?: string; // Wann professionelle Behandlung sinnvoll sein kann
  sources?: { label: string; url?: string }[];
  publishedAt?: string;
  updatedAt?: string;
}

// Hub bleibt noindex,follow bis mindestens 4 wirklich publizierte, hochwertige
// Beiträge existieren.
export const HUB_INDEXABLE = true;

export const wasJetzt: WasJetztEntry[] = [
  {
    slug: 'akuter-hexenschuss',
    title: 'Was tun bei akutem Hexenschuss?',
    status: 'published',
    indexable: true,
    deck: 'Erste Schritte bei akutem Hexenschuss: was jetzt hilft, was du vermeiden solltest und wann eine Abklärung wichtig ist.',
    primaryPurpose: 'Sofort-Handlungs-Intent bei akutem Hexenschuss; keine Erklärung der Erkrankung.',
    canonicalIntentOwner: ['/beschwerden/hexenschuss/'],
    overlapNotes: 'Erkrankungs-Intent gehört /beschwerden/hexenschuss/. Diese Seite bleibt bei Sofortmassnahmen/Verhalten und delegiert Ursachen, Diagnose und Behandlung an den Owner.',
    selfCareTools: ['movement', 'heat-cold', 'rest-recovery'],
    safetyLevel: 'needs-caution',
    suggestedReviewerType: 'Fachliche Review (TCM-Therapeut:in + ärztlich bei Red Flags)',
    publishedAt: '2026-09-26',
    updatedAt: '2026-09-26',
    shortAnswerHtml: `<p>Beim akuten Hexenschuss ist der stechende Schmerz im unteren Rücken meist heftig, aber in der Regel nicht gefährlich. Das Wichtigste jetzt: in Bewegung bleiben, so gut es geht, eine erträgliche Position finden und Wärme nutzen. Strikte Bettruhe verzögert die Erholung eher. Bei Taubheit im Genitalbereich, Lähmungszeichen oder Problemen mit Blase oder Darm gilt: sofort ärztlich abklären.</p>`,
    doNowHtml: `<p>Such dir zuerst eine Position, in der der Schmerz erträglich ist; vielen hilft die Stufenlagerung (Rückenlage, Unterschenkel auf einen Stuhl). Bleib darin aber nicht stundenlang liegen: Steh regelmässig vorsichtig auf und geh ein paar Schritte, auch wenn es zieht. Kurze, häufige Bewegungseinheiten sind besser als Schonung am Stück. Atme beim Aufrichten ruhig weiter und stütz dich ab, statt ruckartig hochzukommen.</p><p>Plane für die ersten ein bis zwei Tage bewusst weniger ein und wechsle zwischen kurzen Ruhephasen und leichter Bewegung. Nachts hilft vielen die Seitenlage mit einem Kissen zwischen den Knien.</p>`,
    avoidHtml: `<p>Strikte Bettruhe über Tage, schweres Heben, ruckartiges Drehen und die Angst vor jeder Bewegung. Der Rücken ist beim Hexenschuss in aller Regel nicht beschädigt, auch wenn es sich so anfühlt; komplette Schonung hält den Teufelskreis aus Schmerz und Verspannung eher aufrecht.</p>`,
    movementHtml: `<p>Sanft und im schmerzarmen Bereich: langsames Gehen auf ebenem Boden, vorsichtiges Becken-Kippen im Liegen, Positionswechsel etwa alle 20 bis 30 Minuten. Kein Dehnen mit Gewalt, keine Übungen, die in den scharfen Schmerz hineingehen.</p>`,
    heatColdHtml: `<p>Wärme ist beim Hexenschuss meist angenehmer als Kälte: Wärmflasche, Kirschkernkissen oder eine warme Dusche entspannen die verkrampfte Muskulatur. 15 bis 20 Minuten am Stück reichen, mit Pausen dazwischen. Wenn dir Wärme nicht guttut, lass sie weg; sie ist Unterstützung, keine Pflicht.</p>`,
    whenToSeekCareHtml: `<p>Sofort medizinisch abklären lassen: Taubheitsgefühl im Genital- oder Gesässbereich, neue Lähmung oder deutliche Schwäche in einem Bein, Probleme beim Wasserlassen oder Stuhlgang, Fieber, starke Schmerzen nach einem Sturz oder Unfall sowie zunehmende Schmerzen trotz Ruhe. Auch neu ausstrahlende Schmerzen ins Bein mit Kribbeln oder Taubheit gehören beurteilt. Im Notfall gilt in der Schweiz Telefon 144.</p>`,
    notBetterHtml: `<p>Ein unkomplizierter Hexenschuss bessert sich meist innert weniger Tage deutlich. Wenn nach etwa einer Woche keine spürbare Besserung eintritt, die Schmerzen zunehmen oder immer wiederkehren, lohnt sich eine fachliche Beurteilung; Ursachen und Behandlungswege erklärt die Seite <a href="/beschwerden/hexenschuss/">Hexenschuss</a>.</p>`,
    professionalTreatmentHtml: `<p>Wenn die akute Phase abklingt, aber Verspannung und Restschmerz bleiben, kann professionelle Behandlung sinnvoll sein. <a href="/therapien/akupunktur/">Akupunktur</a> kann bei Rückenschmerzen als ergänzende Behandlung eingesetzt werden und wird bei TCM.ch häufig mit manuellen Techniken kombiniert; sie ersetzt bei Warnzeichen keine ärztliche Abklärung.</p>`,
    relatedConditions: [
      { href: '/beschwerden/hexenschuss/', label: 'Hexenschuss' },
      { href: '/beschwerden/rueckenschmerzen/', label: 'Rückenschmerzen' },
    ],
    relatedTherapies: [{ href: '/therapien/akupunktur/', label: 'Akupunktur' }],
  },
  {
    slug: 'ischias-schmerzen',
    title: 'Was tun bei Ischias-Schmerzen?',
    status: 'published',
    indexable: true,
    deck: 'Was bei Ischias-Schmerzen jetzt sinnvoll ist, welche Bewegungen helfen können und wann du ärztlich abklären solltest.',
    primaryPurpose: 'Handlungs-Intent bei Ischias-Beschwerden; die Erkrankungsseite bleibt Owner für Ursachen und Behandlung.',
    canonicalIntentOwner: ['/beschwerden/ischias/'],
    overlapNotes: 'Erkrankungs-Intent gehört /beschwerden/ischias/. Kein Reha-Programm, keine Physio-Ersatzinhalte (Grenze zu physio.ch beachten).',
    selfCareTools: ['movement', 'heat-cold', 'ergonomics'],
    safetyLevel: 'needs-caution',
    suggestedReviewerType: 'Fachliche Review (TCM-Therapeut:in + ärztlich bei Red Flags)',
    publishedAt: '2026-09-26',
    updatedAt: '2026-09-26',
    shortAnswerHtml: `<p>Bei Ischias-Schmerzen zieht der Schmerz vom unteren Rücken oder Gesäss ins Bein. Jetzt helfen erträgliche Bewegung, entlastende Positionen und Geduld: Viele Reizungen beruhigen sich über Tage bis Wochen. Neue Taubheit, Schwäche im Bein oder Probleme mit Blase oder Darm sind dagegen Warnzeichen für eine rasche Abklärung.</p>`,
    doNowHtml: `<p>Wechsle regelmässig die Position und bleib im schmerzarmen Rahmen in Bewegung: kurze Gehstrecken sind meist besser als langes Sitzen oder Liegen. Zum Entlasten hilft vielen die Stufenlagerung oder die Seitenlage mit leicht angezogenen Knien. Beobachte, welche Bewegungen den Schmerz ins Bein verstärken, und meide genau diese vorerst, ohne dich komplett stillzulegen.</p>`,
    avoidHtml: `<p>Langes Sitzen am Stück, schweres Heben mit rundem Rücken, intensives Dehnen ins ausstrahlende Ziehen hinein und Bettruhe über mehrere Tage. Verzichte auch auf Selbstdiagnosen wie Bandscheibenvorfall: Ausstrahlende Schmerzen haben mehrere mögliche Ursachen.</p>`,
    movementHtml: `<p>Kurze, häufige Spaziergänge, lockeres Auf-der-Stelle-Gehen und sanfte Positionswechsel. Wenn eine Bewegung den Schmerz zentralisiert (weniger Bein, mehr Rücken), ist das meist ein gutes Zeichen; nimmt die Ausstrahlung zu, brich ab.</p>`,
    heatColdHtml: `<p>Probier aus, was dir guttut: Wärme entspannt die Gesäss- und Rückenmuskulatur, manche empfinden in der akuten Reizphase auch kurze Kälteanwendungen als angenehm. Beides jeweils 15 bis 20 Minuten, nie direkt auf der Haut.</p>`,
    ergonomicsHtml: `<p>Beim Sitzen: Hüften leicht höher als die Knie, regelmässig aufstehen (etwa alle 30 Minuten), das Portemonnaie nicht in der Gesässtasche. Beim Heben: nah am Körper, aus den Beinen.</p>`,
    whenToSeekCareHtml: `<p>Rasch ärztlich abklären lassen: neue oder zunehmende Taubheit, Schwäche im Bein oder Fuss (z.B. Fuss hebt nicht mehr richtig), Taubheit im Genital- oder Gesässbereich, Probleme beim Wasserlassen oder Stuhlgang, Fieber oder Schmerzen nach einem Unfall. Bei solchen Zeichen nicht abwarten; im Notfall Telefon 144.</p>`,
    notBetterHtml: `<p>Wenn die Ausstrahlung nach zwei bis vier Wochen nicht deutlich nachlässt, stärker wird oder immer wiederkehrt, gehört die Ursache fachlich beurteilt. Was hinter Ischias-Beschwerden stecken kann und wie behandelt wird, erklärt die Seite <a href="/beschwerden/ischias/">Ischias</a>; den Nervenverlauf zeigt das <a href="/visuals/ischias/">Ischias-Visual</a>.</p>`,
    professionalTreatmentHtml: `<p>Nach der Abklärung kann je nach Befund Physiotherapie, medizinische Behandlung oder eine ergänzende Methode sinnvoll sein. <a href="/therapien/akupunktur/">Akupunktur</a> kann bei ausstrahlenden Rücken-Bein-Schmerzen als ergänzende Behandlung eingesetzt werden; sie ersetzt weder Diagnostik noch eine notwendige Reha.</p>`,
    relatedConditions: [
      { href: '/beschwerden/ischias/', label: 'Ischias' },
      { href: '/beschwerden/bandscheibenvorfall/', label: 'Bandscheibenvorfall' },
    ],
    relatedVisuals: [{ href: '/visuals/ischias/', label: 'Visual: Verlauf des Ischiasnervs' }],
    relatedTherapies: [{ href: '/therapien/akupunktur/', label: 'Akupunktur' }],
  },
  {
    slug: 'nackenschmerzen-nach-dem-schlafen',
    title: 'Was tun bei Nackenschmerzen nach dem Schlafen?',
    status: 'published',
    indexable: true,
    deck: 'Steifer Nacken am Morgen: was jetzt hilft, worauf du beim Schlafen achten kannst und wann mehr dahinterstecken kann.',
    primaryPurpose: 'Handlungs-Intent für den akuten Morgen-Nacken; Signal- und Erkrankungsseiten bleiben Owner der Einordnung.',
    canonicalIntentOwner: ['/koerpersignale/nacken-morgens-steif/', '/beschwerden/nackenschmerzen/'],
    overlapNotes: 'Einordnungs-Intent gehört dem Körpersignal nacken-morgens-steif und /beschwerden/nackenschmerzen/. Diese Seite bleibt bei Sofortmassnahmen, Schlafumgebung und Alltag.',
    selfCareTools: ['movement', 'heat-cold', 'sleep', 'ergonomics'],
    safetyLevel: 'low-risk',
    suggestedReviewerType: 'Fachliche Review (TCM-Therapeut:in)',
    publishedAt: '2026-09-26',
    updatedAt: '2026-09-26',
    shortAnswerHtml: `<p>Ein steifer, schmerzender Nacken nach dem Aufwachen ist meist eine Kombination aus ungünstiger Schlafposition und verspannter Muskulatur und bessert sich oft im Tagesverlauf. Sanfte Bewegung und Wärme helfen jetzt am meisten; das Kissen ist der wichtigste Hebel für die nächsten Nächte.</p>`,
    doNowHtml: `<p>Beweg den Nacken gleich nach dem Aufstehen vorsichtig in alle schmerzarmen Richtungen: langsames Drehen, Neigen, Schulterkreisen, jeweils ohne in den scharfen Schmerz zu ziehen. Eine warme Dusche auf Nacken und Schultern lockert zusätzlich. Über den Tag: regelmässige Mini-Pausen statt stundenlanger Fixhaltung am Bildschirm.</p>`,
    avoidHtml: `<p>Ruckartiges „Einrenken", kräftiges Selbst-Massieren in den akuten Schmerz hinein und den Nacken den ganzen Tag komplett stillhalten. Auch ein dickes zusätzliches Kissen als Sofortlösung macht es oft schlimmer.</p>`,
    movementHtml: `<p>Alle ein bis zwei Stunden eine Minute bewegen: Kinn sanft Richtung Brust, Ohr Richtung Schulter, langsame Drehungen. Die Bewegung darf ziehen, aber nicht stechen.</p>`,
    heatColdHtml: `<p>Wärme ist beim verspannten Nacken meist die richtige Wahl: Wärmflasche, Kirschkernkissen oder warme Dusche, 15 bis 20 Minuten. Kälte ist hier selten hilfreich.</p>`,
    sleepHtml: `<p>Prüfe dein Kissen: In Rücken- und Seitenlage soll die Halswirbelsäule gerade liegen, nicht abgeknickt. Bauchlage mit verdrehtem Kopf ist die häufigste vermeidbare Ursache. Ein Zimmer ohne Zugluft auf Nackenhöhe hilft zusätzlich.</p>`,
    ergonomicsHtml: `<p>Bildschirm auf Augenhöhe, Telefon nicht zwischen Ohr und Schulter klemmen, Tasche regelmässig die Seite wechseln lassen.</p>`,
    whenToSeekCareHtml: `<p>Ärztlich abklären lassen: Nackenschmerzen mit Fieber und Nackensteifigkeit (Kinn lässt sich nicht zur Brust bringen), nach einem Sturz oder Unfall, mit Ausstrahlung in den Arm samt Taubheit oder Schwäche, mit starken Kopfschmerzen oder wenn die Beschwerden über Wochen zunehmen. Solche Zeichen gehören nicht in die Selbsthilfe.</p>`,
    notBetterHtml: `<p>Wacht dein Nacken über Wochen immer wieder steif auf, lohnt sich die Einordnung des Musters unter <a href="/koerpersignale/nacken-morgens-steif/">Nacken morgens steif</a> und bei anhaltenden Beschwerden die Seite <a href="/beschwerden/nackenschmerzen/">Nackenschmerzen</a>.</p>`,
    professionalTreatmentHtml: `<p>Bei hartnäckigen Verspannungen kann professionelle Behandlung sinnvoll sein: <a href="/therapien/tuina/">Tuina</a> arbeitet gezielt an verspannter Nackenmuskulatur, <a href="/therapien/akupunktur/">Akupunktur</a> kann bei Nackenschmerzen ergänzend eingesetzt werden. Beides ersetzt bei Warnzeichen keine ärztliche Beurteilung.</p>`,
    relatedSignals: [{ href: '/koerpersignale/nacken-morgens-steif/', label: 'Nacken morgens steif' }],
    relatedConditions: [{ href: '/beschwerden/nackenschmerzen/', label: 'Nackenschmerzen' }],
    relatedVisuals: [{ href: '/visuals/nacken-ausstrahlung/', label: 'Visual: Ausstrahlung vom Nacken' }],
    relatedTherapies: [{ href: '/therapien/tuina/', label: 'Tuina' }],
  },
  {
    slug: 'migraene-im-anflug',
    title: 'Was tun bei Migräne im Anflug?',
    status: 'published',
    indexable: true,
    deck: 'Wenn sich eine Migräne ankündigt: was in der Frühphase helfen kann, was du vermeiden solltest und wann ärztliche Hilfe nötig ist.',
    primaryPurpose: 'Handlungs-Intent für die Frühphase einer Migräne-Attacke; die Erkrankungsseite bleibt Owner.',
    canonicalIntentOwner: ['/beschwerden/migraene/'],
    overlapNotes: 'Erkrankungs-Intent gehört /beschwerden/migraene/. Keine Medikamenten-Empfehlungen; Akutmedikation ist ärztliches Terrain.',
    selfCareTools: ['rest-recovery', 'stress', 'acupressure'],
    safetyLevel: 'needs-caution',
    suggestedReviewerType: 'Fachliche Review (TCM-Therapeut:in + ärztlich bei Red Flags)',
    publishedAt: '2026-09-26',
    updatedAt: '2026-09-26',
    shortAnswerHtml: `<p>Wenn sich eine Migräne ankündigt, zählt vor allem eines: früh reagieren. Reize reduzieren, wenn möglich einen ruhigen, dunklen Ort aufsuchen und trinken. Deine ärztlich verordnete Akutmedikation nimmst du so ein, wie sie dir verschrieben wurde; diese Seite ersetzt keine Medikamenten-Beratung.</p>`,
    doNowHtml: `<p>Zieh dich, wenn irgendwie möglich, aus der aktuellen Situation zurück: Licht dimmen oder abdunkeln, Lärm reduzieren, Bildschirm weg. Trink ein grosses Glas Wasser, iss eine Kleinigkeit, falls du lange nichts gegessen hast, und versuch, dich hinzulegen oder wenigstens hinzusetzen. Viele Betroffene wissen aus Erfahrung, was ihnen in dieser Phase hilft; folge deinem erprobten Muster früh statt spät.</p><p>Ein abgedunkelter, ruhiger Raum und der Versuch zu schlafen sind für viele die wirksamste Sofortmassnahme. Auch 20 bis 30 Minuten Ruhe mit geschlossenen Augen können den Verlauf mildern.</p>`,
    avoidHtml: `<p>Weitermachen wie bisher und hoffen, dass es von allein verschwindet, ist bei Migräne selten eine gute Strategie. Vermeide zusätzlich grelles Licht, Alkohol und jetzt noch intensiven Sport. Ändere verschriebene Medikamente nicht selbstständig und kombiniere nicht auf eigene Faust.</p>`,
    acupressureHtml: `<p>Manche Betroffene empfinden sanften Druck auf den Punkt zwischen Daumen und Zeigefinger (Hegu) oder an den Schläfen als lindernd: mit dem Daumen 1 bis 2 Minuten ruhig kreisend drücken. Das ist ein einfacher Selbsthilfe-Versuch, keine Behandlung und kein Ersatz für deine Akutstrategie. In der Schwangerschaft auf Hegu verzichten.</p>`,
    stressHtml: `<p>Langsame, verlängerte Ausatmung (z.B. 4 Sekunden ein, 6 Sekunden aus) über einige Minuten kann das überreizte Nervensystem beruhigen. Kein Leistungsanspruch: Es geht ums Runterfahren, nicht um Technik.</p>`,
    whenToSeekCareHtml: `<p>Sofort medizinisch abklären lassen (Telefon 144): ein schlagartig einsetzender Vernichtungskopfschmerz, Kopfschmerz mit Lähmung, Sprachstörung, Sehverlust, hohem Fieber oder Nackensteifigkeit sowie ein Kopfschmerz, der sich völlig anders anfühlt als deine bekannte Migräne. Neu aufgetretene Migräne-artige Kopfschmerzen gehören grundsätzlich einmal ärztlich beurteilt.</p>`,
    notBetterHtml: `<p>Wenn Attacken häufiger werden, länger dauern oder deine Akutstrategie nicht mehr greift, besprich das ärztlich. Hintergründe, Auslöser und Behandlungsmöglichkeiten erklärt die Seite <a href="/beschwerden/migraene/">Migräne</a>.</p>`,
    professionalTreatmentHtml: `<p>Zur Vorbeugung zwischen den Attacken kann <a href="/therapien/akupunktur/">Akupunktur</a> bei Migräne als ergänzende Behandlung eingesetzt werden; die Studienlage ist hier vergleichsweise gut untersucht, ersetzt aber keine neurologische Betreuung bei häufigen oder schweren Attacken.</p>`,
    relatedConditions: [{ href: '/beschwerden/migraene/', label: 'Migräne' }],
    relatedTherapies: [{ href: '/therapien/akupunktur/', label: 'Akupunktur' }],
  },
  {
    slug: 'voellegefuehl-nach-dem-essen',
    title: 'Was tun bei Völlegefühl nach dem Essen?',
    status: 'published',
    indexable: true,
    deck: 'Praktische Schritte bei Völlegefühl: was jetzt entlastet, welche Essgewohnheiten helfen und wann eine Abklärung sinnvoll ist.',
    primaryPurpose: 'Handlungs-Intent; das gleichnamige Körpersignal bleibt Owner der Einordnung ("was bedeutet das?").',
    canonicalIntentOwner: ['/koerpersignale/voellegefuehl-nach-dem-essen/'],
    overlapNotes: 'ACHTUNG: identischer Slug wie das Körpersignal. Höchstes internes Kannibalisierungs-Risiko der Welle; Publikation nur, wenn der Handlungsteil den Seiten-Test (4/5) klar besteht, sonst Selbsthilfe-Abschnitt im Körpersignal ergänzen. /beschwerden/verdauungsprobleme/ bleibt Owner des Erkrankungs-Intents.',
    selfCareTools: ['nutrition', 'movement'],
    safetyLevel: 'low-risk',
    suggestedReviewerType: 'Fachliche Review (TCM-Therapeut:in)',
    publishedAt: '2026-09-26',
    updatedAt: '2026-09-26',
    shortAnswerHtml: `<p>Gegen akutes Völlegefühl nach dem Essen helfen meist einfache Dinge: ein langsamer Spaziergang, aufrecht bleiben statt hinlegen, warme ungesüsste Getränke und beim nächsten Mal kleinere, langsamer gegessene Portionen. Hält das Völlegefühl über Wochen an oder kommen Warnzeichen dazu, gehört es abgeklärt.</p>`,
    doNowHtml: `<p>Steh auf und geh 10 bis 15 Minuten gemütlich: Leichte Bewegung unterstützt die Magenentleerung besser als Liegen. Bleib danach aufrecht sitzen. Ein warmer Tee (z.B. Fenchel oder Kamille) empfinden viele als entlastend. Öffne beengende Kleidung am Bauch.</p>`,
    avoidHtml: `<p>Direkt nach dem Essen hinlegen, hastig Nachtisch oder Kaffee nachschieben, kohlensäurereiche Getränke in Menge und der Griff zu Verdauungsschnaps: Alkohol verzögert die Magenentleerung eher.</p>`,
    movementHtml: `<p>Der klassische Verdauungsspaziergang ist tatsächlich sinnvoll: 10 bis 20 Minuten in ruhigem Tempo. Kein intensiver Sport mit vollem Magen.</p>`,
    nutritionHtml: `<p>Fürs nächste Mal: langsamer essen, gründlich kauen, kleinere Portionen, sehr fettige und sehr süsse Mahlzeiten am Abend reduzieren. Beobachte ohne Dogma, nach welchen Mahlzeiten es dir regelmässig schwer wird.</p>`,
    whenToSeekCareHtml: `<p>Ärztlich abklären lassen: Völlegefühl mit ungewolltem Gewichtsverlust, Schluckbeschwerden, wiederholtem Erbrechen, Blut im Stuhl oder schwarzem Stuhl, starken Schmerzen, neu aufgetretenem und anhaltendem Völlegefühl ab etwa 50 Jahren oder wenn du bereits nach kleinen Mengen ungewöhnlich schnell satt bist.</p>`,
    notBetterHtml: `<p>Tritt das Völlegefühl über Wochen nach den meisten Mahlzeiten auf, hilft zuerst die Einordnung des Musters unter <a href="/koerpersignale/voellegefuehl-nach-dem-essen/">Völlegefühl nach dem Essen</a> (Ursachen und Abklärungswege) und bei anhaltenden Verdauungsbeschwerden die Seite <a href="/beschwerden/verdauungsprobleme/">Verdauungsprobleme</a>.</p>`,
    professionalTreatmentHtml: `<p>Bei abgeklärten funktionellen Verdauungsbeschwerden kann TCM ergänzend eingesetzt werden, etwa mit <a href="/therapien/akupunktur/">Akupunktur</a> oder <a href="/therapien/tuina/">Tuina</a>-Bauchbehandlungen; ein Heilversprechen ist damit nicht verbunden.</p>`,
    relatedSignals: [{ href: '/koerpersignale/voellegefuehl-nach-dem-essen/', label: 'Völlegefühl nach dem Essen' }],
    relatedConditions: [{ href: '/beschwerden/verdauungsprobleme/', label: 'Verdauungsprobleme' }],
  },
  {
    slug: 'blaehbauch-am-abend',
    title: 'Was tun bei Blähbauch am Abend?',
    status: 'published',
    indexable: true,
    deck: 'Was gegen den abendlichen Blähbauch hilft: einfache Schritte für heute Abend und Gewohnheiten für die nächsten Tage.',
    primaryPurpose: 'Handlungs-Intent; das gleichnamige Körpersignal bleibt Owner der Einordnung.',
    canonicalIntentOwner: ['/koerpersignale/blaehbauch-am-abend/'],
    overlapNotes: 'Identischer Slug wie das Körpersignal (gleiches Risiko wie voellegefuehl-nach-dem-essen; Seiten-Test streng anwenden). /beschwerden/blaehungen/ und /beschwerden/reizdarm/ bleiben Owner der Erkrankungs-Intents.',
    selfCareTools: ['nutrition', 'movement', 'stress'],
    safetyLevel: 'low-risk',
    suggestedReviewerType: 'Fachliche Review (TCM-Therapeut:in)',
    publishedAt: '2026-09-26',
    updatedAt: '2026-09-26',
    shortAnswerHtml: `<p>Gegen den akuten Blähbauch am Abend helfen Bewegung, Wärme und Entlastung: ein kurzer Spaziergang, eine Wärmflasche, lockere Kleidung und ein leichteres, früheres Abendessen an den Folgetagen. Halten die Beschwerden an oder kommen Schmerzen und Warnzeichen dazu, gehört die Ursache abgeklärt.</p>`,
    doNowHtml: `<p>Geh nach dem Abendessen 10 bis 20 Minuten spazieren statt direkt aufs Sofa. Eine Wärmflasche auf dem Bauch entspannt, ebenso ruhiges tiefes Atmen in den Bauch. Winde zurückhalten muss nicht sein: Abgang von Luft entlastet. Iss an den nächsten Abenden bewusst kleiner, langsamer und früher.</p>`,
    avoidHtml: `<p>Spätes, grosses und sehr fettiges Abendessen, hastiges Essen nebenbei, viel Kohlensäure und Süssstoffe (Sorbit, Xylit) am Abend. Verzichte auf Selbstexperimente mit strengen Auslass-Diäten über Wochen ohne fachliche Begleitung.</p>`,
    movementHtml: `<p>Leichte Bewegung nach dem Essen und tagsüber regelmässig aufstehen; langes Sitzen staut den Bauch zusätzlich.</p>`,
    nutritionHtml: `<p>Typische Abend-Auslöser sind grosse Rohkostmengen, Hülsenfrüchte, Kohl, Zwiebeln und kohlensäurereiche Getränke; das ist individuell verschieden. Ein einfaches Ess-Beschwerde-Tagebuch über ein bis zwei Wochen zeigt Muster zuverlässiger als jede Pauschalregel.</p>`,
    stressHtml: `<p>Gegessen wird oft so, wie der Tag war: Wer abends angespannt und schnell isst, schluckt mehr Luft. Ein paar ruhige Atemzüge vor dem Essen und Essen ohne Bildschirm sind unspektakulär, aber wirksam.</p>`,
    whenToSeekCareHtml: `<p>Ärztlich abklären lassen: Blähbauch mit starken oder zunehmenden Schmerzen, Fieber, Blut im Stuhl, ungewolltem Gewichtsverlust, anhaltendem Erbrechen, deutlich verändertem Stuhlgang über Wochen oder wenn der Bauch dauerhaft aufgetrieben bleibt statt über Nacht abzuschwellen.</p>`,
    notBetterHtml: `<p>Kehrt der Blähbauch fast jeden Abend wieder, hilft die Einordnung des Musters unter <a href="/koerpersignale/blaehbauch-am-abend/">Blähbauch am Abend</a>; bei anhaltenden Beschwerden übernehmen die Seiten <a href="/beschwerden/blaehungen/">Blähungen</a> und <a href="/beschwerden/reizdarm/">Reizdarm</a>.</p>`,
    professionalTreatmentHtml: `<p>Bei abgeklärten funktionellen Darmbeschwerden kann TCM ergänzend eingesetzt werden; <a href="/therapien/akupunktur/">Akupunktur</a> wird bei Reizdarm-Beschwerden als komplementäre Option genutzt. Eine chinesische <a href="/therapien/kraeutertherapie/">Kräutertherapie</a> gehört in professionelle Hände, nicht in die Selbstmedikation.</p>`,
    relatedSignals: [{ href: '/koerpersignale/blaehbauch-am-abend/', label: 'Blähbauch am Abend' }],
    relatedConditions: [
      { href: '/beschwerden/blaehungen/', label: 'Blähungen' },
      { href: '/beschwerden/reizdarm/', label: 'Reizdarm' },
    ],
  },
  {
    slug: 'muskelverspannungen',
    title: 'Was tun bei Muskelverspannungen?',
    status: 'published',
    indexable: true,
    deck: 'Verspannte Muskeln lösen: was du selbst tun kannst, was Verspannungen verstärkt und wann Behandlung sinnvoll ist.',
    primaryPurpose: 'Handlungs-Intent bei muskulären Verspannungen; kein Erkrankungs-Explainer, kein Therapie-Ersatz.',
    canonicalIntentOwner: [],
    overlapNotes: 'Kein bestehender Owner: keine Beschwerden-Seite zu Muskelverspannungen (geprüft). Nächste Nachbarn /beschwerden/nackenschmerzen/ und /beschwerden/rueckenschmerzen/ besitzen ihre regionalen Intents; diese Seite bleibt generisch-handlungsorientiert und delegiert regionale Beschwerden dorthin. Kein Physio-Ersatzcontent (physio.ch-Grenze).',
    selfCareTools: ['movement', 'heat-cold', 'stress', 'ergonomics'],
    safetyLevel: 'low-risk',
    suggestedReviewerType: 'Fachliche Review (TCM-Therapeut:in)',
    publishedAt: '2026-09-26',
    updatedAt: '2026-09-26',
    shortAnswerHtml: `<p>Verspannte Muskeln brauchen vor allem drei Dinge: Bewegung, Wärme und weniger Dauerhaltung. Lockere Aktivität ist wirksamer als Schonung, Wärme entspannt, und regelmässige Haltungswechsel verhindern, dass sich die Spannung immer wieder neu aufbaut. Bei Taubheit, Schwäche oder nächtlich zunehmenden Schmerzen gehört mehr Diagnostik dazu.</p>`,
    doNowHtml: `<p>Beweg den verspannten Bereich bewusst und sanft durch: Schulterkreisen, langsames Kopfdrehen, lockeres Gehen. Leg dir Wärme auf (Wärmflasche, warmes Bad) und unterbrich lange Sitz- oder Stehphasen etwa alle 30 Minuten für eine Minute Bewegung. Sanftes Ausstreichen der Muskulatur ist in Ordnung; grobes Drücken auf den Schmerzpunkt nicht.</p>`,
    avoidHtml: `<p>Tagelange Schonhaltung, aggressives Dehnen oder Massieren in den Schmerz hinein, „Einrenken"-Versuche und der Dauergriff zu Schmerzgels als einziger Massnahme.</p>`,
    movementHtml: `<p>Regelmässigkeit schlägt Intensität: täglich mehrmals kurz bewegen statt einmal pro Woche intensiv. Für Nacken und Schultern reichen einfache Mobilisationsübungen im schmerzfreien Bereich.</p>`,
    heatColdHtml: `<p>Wärme ist bei Verspannungen fast immer die richtige Wahl: 15 bis 20 Minuten lokal, gern mehrmals täglich. Kälte ist eher bei frischen Verletzungen sinnvoll, nicht bei Verspannung.</p>`,
    stressHtml: `<p>Muskeltonus folgt der Anspannung im Kopf: Kiefer lockern, Schultern bewusst fallen lassen, ein paar Minuten verlängert ausatmen. Wer dauerhaft unter Strom steht, verspannt schneller wieder; Stressregulation gehört deshalb zur Prävention.</p>`,
    ergonomicsHtml: `<p>Bildschirm auf Augenhöhe, Unterarme aufgelegt, Füsse am Boden, und die beste Sitzposition ist die nächste: Wechsel ist wichtiger als die perfekte Haltung.</p>`,
    whenToSeekCareHtml: `<p>Ärztlich abklären lassen: Verspannungen mit Taubheit, Kribbeln oder Schwäche in Arm oder Bein, nach einem Unfall, mit Fieber, mit nächtlich zunehmenden Schmerzen, mit ungewolltem Gewichtsverlust oder wenn ein umschriebener Punkt über Wochen konstant schmerzt.</p>`,
    notBetterHtml: `<p>Bleiben die Verspannungen trotz Selbsthilfe über Wochen bestehen oder kehren sie sofort zurück, lohnt sich eine fachliche Beurteilung; die regionalen Beschwerdebilder erklären <a href="/beschwerden/nackenschmerzen/">Nackenschmerzen</a> und <a href="/beschwerden/rueckenschmerzen/">Rückenschmerzen</a>.</p>`,
    professionalTreatmentHtml: `<p>Hartnäckige Verspannungen sind ein Kerngebiet der manuellen Behandlung: <a href="/therapien/tuina/">Tuina</a> und <a href="/therapien/massage/">medizinische Massage</a> arbeiten direkt an Muskulatur und Faszien, <a href="/therapien/akupunktur/">Akupunktur</a> kann ergänzend eingesetzt werden, auch in Kombination.</p>`,
    relatedConditions: [
      { href: '/beschwerden/nackenschmerzen/', label: 'Nackenschmerzen' },
      { href: '/beschwerden/rueckenschmerzen/', label: 'Rückenschmerzen' },
    ],
    relatedTherapies: [
      { href: '/therapien/tuina/', label: 'Tuina' },
      { href: '/therapien/massage/', label: 'Massage' },
    ],
  },
  {
    slug: 'knieschmerzen-nach-belastung',
    title: 'Was tun bei Knieschmerzen nach Belastung?',
    status: 'published',
    indexable: true,
    deck: 'Knie schmerzt nach Sport oder Belastung: was jetzt sinnvoll ist, wie du weiter belastest und wann eine Abklärung wichtig ist.',
    primaryPurpose: 'Handlungs-Intent nach Belastung; die Erkrankungsseite bleibt Owner für Ursachen und Behandlung.',
    canonicalIntentOwner: ['/beschwerden/knieschmerzen/'],
    overlapNotes: 'Erkrankungs-Intent gehört /beschwerden/knieschmerzen/. Kein Reha-/Trainingsprogramm (physio.ch-Grenze); Belastungssteuerung nur als breite, sichere Orientierung.',
    selfCareTools: ['movement', 'heat-cold', 'rest-recovery'],
    safetyLevel: 'needs-caution',
    suggestedReviewerType: 'Fachliche Review (TCM-Therapeut:in + ärztlich bei Red Flags)',
    publishedAt: '2026-09-26',
    updatedAt: '2026-09-26',
    shortAnswerHtml: `<p>Schmerzt das Knie nach Sport oder ungewohnter Belastung, sind Entlastung mit Augenmass, Kühlung in den ersten Stunden und danach schrittweise Rückkehr zur Aktivität meist der richtige Weg. Ein dickes, überwärmtes oder instabiles Knie und Schmerzen nach einem Verdrehtrauma gehören dagegen untersucht.</p>`,
    doNowHtml: `<p>Reduziere die auslösende Belastung für einige Tage, ohne das Bein komplett stillzulegen: Alltag ja, der auslösende Sport vorerst nein. Leg das Bein zwischendurch hoch. In den ersten 24 bis 48 Stunden kannst du 15 Minuten kühlen (nicht direkt auf die Haut), danach empfinden viele Wärme als angenehmer. Sanftes Durchbewegen ohne Belastung (Sitzen, Bein pendeln lassen) hält das Gelenk geschmeidig.</p><p>Gönn dem Knie nach ungewohnter Belastung 48 bis 72 Stunden relative Ruhe, bevor du wieder steigerst. Schlaf und Pausentage sind Teil des Trainings, nicht dessen Gegenteil.</p>`,
    avoidHtml: `<p>Durchtrainieren nach dem Motto „geht schon", ebenso komplette Ruhigstellung über Wochen. Keine tiefen Hocksprünge, keine Belastungstests am schmerzenden Knie, keine Schmerzmittel-Dauereinnahme, um weiter trainieren zu können.</p>`,
    movementHtml: `<p>Zurück zur Belastung in Stufen: erst schmerzfreier Alltag, dann Velo oder Schwimmen, dann Laufen, zuletzt Stop-and-Go-Sport. Nimmt der Schmerz bei einer Stufe wieder zu, geh eine zurück. Ein strukturiertes Aufbauprogramm gehört in physiotherapeutische Hände.</p>`,
    heatColdHtml: `<p>Frisch nach Belastung eher kühlen, ab dem zweiten oder dritten Tag eher Wärme; entscheidend ist, was dein Knie als angenehm meldet.</p>`,
    whenToSeekCareHtml: `<p>Untersuchen lassen: deutliche Schwellung oder Erguss, Überwärmung und Rötung, Instabilität oder Wegknicken, Blockaden (Knie lässt sich nicht strecken), Schmerzen nach Verdrehen oder Sturz, Fieber sowie nächtliche Ruheschmerzen. Bei Verdacht auf eine frische Verletzung nicht weitertrainieren.</p>`,
    notBetterHtml: `<p>Kehrt der Schmerz bei jeder Belastung wieder oder hält er über zwei bis drei Wochen an, gehört die Ursache fachlich beurteilt; mögliche Hintergründe erklären <a href="/beschwerden/knieschmerzen/">Knieschmerzen</a> und bei älteren Gelenken <a href="/beschwerden/arthrose/">Arthrose</a>.</p>`,
    professionalTreatmentHtml: `<p>Nach der Abklärung kann je nach Ursache Physiotherapie, Trainingsanpassung oder eine ergänzende Behandlung sinnvoll sein. <a href="/therapien/akupunktur/">Akupunktur</a> kann bei Kniebeschwerden, etwa bei Arthrose, als ergänzende Behandlung eingesetzt werden.</p>`,
    relatedConditions: [
      { href: '/beschwerden/knieschmerzen/', label: 'Knieschmerzen' },
      { href: '/beschwerden/arthrose/', label: 'Arthrose' },
    ],
    relatedTherapies: [{ href: '/therapien/akupunktur/', label: 'Akupunktur' }],
  },
  {
    slug: 'schlafprobleme-heute-nacht',
    title: 'Was tun bei Schlafproblemen heute Nacht?',
    status: 'published',
    indexable: true,
    deck: 'Wenn du jetzt nicht schlafen kannst: was in dieser Nacht hilft, was du lassen solltest und wann Schlafprobleme abgeklärt gehören.',
    primaryPurpose: 'Akut-Handlungs-Intent ("heute Nacht"); die Erkrankungsseite bleibt Owner für chronische Schlafprobleme.',
    canonicalIntentOwner: ['/beschwerden/schlafprobleme/'],
    overlapNotes: 'Erkrankungs-Intent gehört /beschwerden/schlafprobleme/ (Canonical, schlafstoerungen kanonisiert dorthin). Diese Seite bleibt bei der Akut-Situation; kein Schlafmittel-Content.',
    selfCareTools: ['sleep', 'stress', 'rest-recovery'],
    safetyLevel: 'low-risk',
    suggestedReviewerType: 'Fachliche Review (TCM-Therapeut:in)',
    publishedAt: '2026-09-26',
    updatedAt: '2026-09-26',
    shortAnswerHtml: `<p>Wenn du jetzt wach liegst: Druck rausnehmen. Steh nach gefühlten 20 bis 30 Minuten Wachliegen auf, mach bei gedämpftem Licht etwas Ruhiges und geh erst bei Schläfrigkeit zurück ins Bett. Nicht auf die Uhr schauen, Bildschirm weglassen. Eine einzelne schlechte Nacht ist kein Gesundheitsrisiko; dauerhafte Schlafprobleme gehören dagegen angeschaut.</p>`,
    doNowHtml: `<p>Verlass das Schlafzimmer, wenn das Gedankenkarussell läuft: lieber 20 Minuten lesen im Sessel als zwei Stunden Grübeln im Bett. Halt das Licht warm und gedämpft. Notier kreisende Gedanken stichwortartig auf einen Zettel, das entlastet den Kopf. Atme mit verlängerter Ausatmung (4 ein, 6 aus), bis der Körper ruhiger wird.</p><p>Nach einer schlechten Nacht: normal aufstehen, Tageslicht tanken, den Tag nicht komplett umbauen. Der Schlafdruck der nächsten Nacht arbeitet für dich.</p>`,
    avoidHtml: `<p>Auf die Uhr schauen und Stunden rechnen, Handy und Mails im Bett, Alkohol als Einschlafhilfe (er verschlechtert die zweite Nachthälfte), Koffein am Abend und der Vorsatz, den Schlaf jetzt erzwingen zu wollen: Genau der Druck hält wach.</p>`,
    sleepHtml: `<p>Fürs Grundsätzliche: möglichst konstante Aufstehzeit (auch nach schlechten Nächten), Bett nur für Schlaf, kühles dunkles Zimmer, Koffein nach dem Mittag meiden und tagsüber höchstens kurz (unter 30 Minuten) schlafen.</p>`,
    stressHtml: `<p>Ein einfaches Abendritual signalisiert dem Nervensystem Feierabend: gleiche Abfolge, gedimmtes Licht, kein „noch schnell etwas erledigen" direkt vor dem Zubettgehen. Entspannungstechniken wirken über Wochen der Übung, nicht auf Knopfdruck.</p>`,
    whenToSeekCareHtml: `<p>Ärztlich abklären lassen: lautes Schnarchen mit Atemaussetzern, ausgeprägte Tagesschläfrigkeit (etwa Sekundenschlaf am Steuer), unruhige Beine, die am Einschlafen hindern, Schlafprobleme mit gedrückter Stimmung oder Ängsten sowie jede Schlafstörung, die dich über Monate begleitet. Schlafmittel sind ärztliches Terrain, keine Selbsthilfe.</p>`,
    notBetterHtml: `<p>Bestehen die Probleme länger als etwa einen Monat in mehreren Nächten pro Woche, gehört das Muster fachlich angeschaut; Ursachen und Behandlungswege erklärt die Seite <a href="/beschwerden/schlafprobleme/">Schlafprobleme</a>. Wachst du auffällig oft zur selben Zeit auf, findest du die Einordnung unter <a href="/koerpersignale/immer-zur-gleichen-uhrzeit-aufwachen/">Immer zur gleichen Uhrzeit aufwachen</a>.</p>`,
    professionalTreatmentHtml: `<p>Bei anhaltenden Schlafproblemen kann <a href="/therapien/akupunktur/">Akupunktur</a> als ergänzende Behandlung eingesetzt werden, oft kombiniert mit Stressregulation; sie ersetzt keine Abklärung von Schlafapnoe oder depressiven Erkrankungen.</p>`,
    relatedSignals: [{ href: '/koerpersignale/immer-zur-gleichen-uhrzeit-aufwachen/', label: 'Immer zur gleichen Uhrzeit aufwachen' }],
    relatedConditions: [{ href: '/beschwerden/schlafprobleme/', label: 'Schlafprobleme' }],
    relatedTherapies: [{ href: '/therapien/akupunktur/', label: 'Akupunktur' }],
  },
  {
    slug: 'leichter-schwindel',
    title: 'Was tun bei leichtem Schwindel?',
    status: 'published',
    indexable: true,
    deck: 'Leichter Schwindel ohne Alarmzeichen: was du jetzt tun kannst, was du beobachten solltest und wann ärztliche Abklärung nötig ist.',
    primaryPurpose: 'Handlungs-Intent bei leichtem, nicht alarmierendem Schwindel; die Erkrankungsseite bleibt Owner.',
    canonicalIntentOwner: ['/beschwerden/schwindel/'],
    overlapNotes: 'Erkrankungs-Intent gehört /beschwerden/schwindel/; die Lage-Schwindel-Körpersignale (beim Aufstehen, beim Umdrehen im Bett, beim Bücken) behalten ihre Einordnungs-Intents. Abgrenzung "leicht" vs. abklärungsbedürftig muss redaktionell sehr sauber werden (needs-caution).',
    selfCareTools: ['rest-recovery', 'movement'],
    safetyLevel: 'needs-caution',
    suggestedReviewerType: 'Fachliche Review (TCM-Therapeut:in + ärztlich bei Red Flags)',
    publishedAt: '2026-09-26',
    updatedAt: '2026-09-26',
    shortAnswerHtml: `<p>Bei leichtem Schwindel gilt zuerst: hinsetzen oder festhalten, ruhig atmen, etwas trinken. Häufige harmlose Auslöser sind schnelles Aufstehen, Flüssigkeitsmangel oder ein langer Tag ohne Essen. Plötzlicher heftiger Schwindel oder Schwindel mit neurologischen Zeichen ist dagegen ein Notfall.</p>`,
    doNowHtml: `<p>Setz oder leg dich hin, bis das Gefühl abklingt; halt dich beim Aufstehen fest und steh in Etappen auf (erst sitzen, kurz warten, dann stehen). Trink ein grosses Glas Wasser und iss eine Kleinigkeit, falls die letzte Mahlzeit lange her ist. Fixier mit den Augen einen ruhigen Punkt. Verzichte auf Autofahren und Leitern, bis der Schwindel vollständig weg ist.</p><p>Nach einer Schwindel-Episode kurz sitzen bleiben und dem Kreislauf Zeit geben. Regelmässige Mahlzeiten, genug Flüssigkeit und ausreichend Schlaf senken die Wahrscheinlichkeit einer Wiederholung.</p>`,
    avoidHtml: `<p>Ruckartige Kopf- und Lagewechsel, heisse lange Bäder direkt nach dem Schwindel, Alkohol sowie das Ignorieren von wiederholtem Schwindel nach dem Motto „wird schon nichts sein". Ändere keine Blutdruck- oder anderen Medikamente selbstständig, auch wenn du sie als Auslöser vermutest; sprich das ärztlich an.</p>`,
    movementHtml: `<p>Wenn der Schwindel abgeklungen ist: normal bewegen. Wer aus Angst vor Schwindel jede Bewegung meidet, verstärkt Unsicherheit und Gangunsicherheit eher. Beim Lagerungsschwindel gibt es wirksame Manöver; sie gehören aber zuerst in fachliche Anleitung.</p>`,
    whenToSeekCareHtml: `<p>Notfall (Telefon 144): plötzlicher heftiger Schwindel mit Lähmung, Sprach- oder Sehstörung, Doppelbildern, heftigen Kopfschmerzen, Brustschmerz oder Ohnmacht. Zeitnah abklären lassen: wiederholte Schwindel-Episoden, Schwindel mit neuer Hörminderung oder Ohrgeräusch, nach einem Sturz mit Kopfanprall, bei Herzerkrankungen sowie Stürze durch Schwindel bei älteren Menschen.</p>`,
    notBetterHtml: `<p>Kehrt der Schwindel wieder, hilft die Einordnung des Musters: <a href="/koerpersignale/schwindel-beim-aufstehen/">Schwindel beim Aufstehen</a> (Kreislauf) oder <a href="/koerpersignale/schwindel-beim-umdrehen-im-bett/">Schwindel beim Umdrehen im Bett</a> (Lagerungsschwindel). Bei anhaltenden Beschwerden übernimmt die Seite <a href="/beschwerden/schwindel/">Schwindel</a>.</p>`,
    professionalTreatmentHtml: `<p>Nach der Abklärung kann je nach Ursache gezieltes Gleichgewichtstraining, medizinische Behandlung oder eine ergänzende Methode sinnvoll sein; <a href="/therapien/akupunktur/">Akupunktur</a> wird bei funktionellen Schwindelbeschwerden ergänzend eingesetzt, ersetzt aber nie die Abklärung neuer Schwindelsymptome.</p>`,
    relatedSignals: [
      { href: '/koerpersignale/schwindel-beim-aufstehen/', label: 'Schwindel beim Aufstehen' },
      { href: '/koerpersignale/schwindel-beim-umdrehen-im-bett/', label: 'Schwindel beim Umdrehen im Bett' },
    ],
    relatedConditions: [{ href: '/beschwerden/schwindel/', label: 'Schwindel' }],
  },
];

export const publishedWasJetzt = wasJetzt.filter((w) => w.status === 'published');
