// Gesundheitsbibliothek - zentrales Beziehungs-/Taxonomie-Modell (Phase 1).
//
// Die Bibliothek ist eine DISCOVERY-Ebene über den bestehenden Inhalten. Sie erzeugt
// keine neuen Inhalts-URLs für bestehende Seiten und dupliziert keinen Seiteninhalt:
// hier stehen nur Beziehungen und Metadaten (Knowledge-Graph light). Kanonische
// Inhalte bleiben, wo sie sind:
//   Körpersignale  -> /koerpersignale/<slug>/   (koerpersignale.ts)
//   Beschwerden    -> /beschwerden/<slug>/      (symptom-leaves/*.html)
//   Therapien      -> /therapien/<slug>/        (therapie-leaves + eigene Seiten)
//   Visuals        -> /visuals/<slug>/          (visuals.ts, bewusst noindex)
//   Standorte      -> /standorte/<slug>/        (Conversion-Ebene, NICHT Teil der Taxonomie)
//
// Neue URLs in Phase 1: /gesundheitsbibliothek/ (Hub) und
// /gesundheitsbibliothek/koerper/<region>/ (Körperregion-Hubs). Eine Region wird nur
// aufgenommen, wenn genug bestehender Inhalt existiert (Graveyard-Regel: keine
// leeren Hubs). Alle Slugs hier MÜSSEN auf existierende Seiten zeigen - nie raten.
//
// Entity-Typen des Graphen (Phase 1 nutzt body_signal/condition/body_region/therapy/
// diagnostic/visual; location bleibt bewusst Conversion-Layer):
export type LibraryEntityType =
  | 'body_signal' | 'condition' | 'body_region' | 'therapy' | 'diagnostic' | 'visual' | 'location';

import { koerpersignale } from './koerpersignale';
import { visuals, type VisualCategory } from './visuals';
import { fragenHubs, fragen as fragenList } from './fragen';
import { tcmSections, publishedTcmEntities } from './tcm-verstehen';
import { publishedPerspektiven } from './perspektiven';
import { publishedBefundeWerte, KATEGORIE_LABELS } from './befunde-werte';
import { publishedWasJetzt } from './was-jetzt';
import { publishedVerfahrenPages } from './akupunkturverfahren';

/** Referenz auf eine bestehende Seite (Slug im jeweiligen Cluster + Anzeige-Label). */
export interface RegionRef { slug: string; label: string }

export interface Diagnostic {
  id: string;
  name: string;
  /** Rein informativ: was die Schulmedizin in diesem Kontext abklärt. */
  short: string;
  /** Eigene Bibliotheks-Seite, falls vorhanden (z.B. Nervenleitmessung). */
  href?: string;
}

// Untersuchungen & Diagnostik - Phase 1: nur Informationsblöcke auf Hub/Region-Hubs,
// KEINE eigenen Seiten (kein Thin Content, keine Sitemap-Erweiterung). TCM.ch führt
// diese Untersuchungen nicht selbst durch - die Sprache auf den Seiten stellt das klar.
export const DIAGNOSTICS: Diagnostic[] = [
  { id: 'blutuntersuchung', name: 'Blutuntersuchung', short: 'Laborwerte wie Entzündungszeichen, Eisen, Schilddrüse oder Vitamine: häufig der erste Schritt der ärztlichen Abklärung.' },
  { id: 'mrt', name: 'MRI / MRT', short: 'Schichtbilder von Bandscheiben, Gelenken, Nerven und Weichteilen, ganz ohne Röntgenstrahlung.', href: '/gesundheitsbibliothek/untersuchungen/mrt/' },
  { id: 'ekg', name: 'EKG & Langzeit-EKG', short: 'Zeichnet die Herzströme auf: Standard bei Herzstolpern, Herzrasen und zur Blutdruck-Verlaufskontrolle.', href: '/gesundheitsbibliothek/untersuchungen/ekg/' },
  { id: 'grosses-blutbild', name: 'Grosses Blutbild', short: 'Rote und weisse Blutkörperchen plus Blutplättchen: die häufigste Basis-Laboruntersuchung.', href: '/gesundheitsbibliothek/untersuchungen/grosses-blutbild/' },
  { id: 'roentgen', name: 'Röntgen', short: 'Knochen und Gelenkstellung im Bild, etwa bei Arthrose-Verdacht oder nach Stürzen.', href: '/gesundheitsbibliothek/untersuchungen/roentgen/' },
  { id: 'ultraschall', name: 'Ultraschall', short: 'Sehnen, Schleimbeutel, Gefässe und Organe in Echtzeit, schnell und strahlungsfrei.', href: '/gesundheitsbibliothek/untersuchungen/ultraschall/' },
  { id: 'neurologisch', name: 'Neurologische Untersuchung', short: 'Reflexe, Kraft und Sensibilität, geprüft bei Taubheit, Kribbeln oder Schwindel.' },
  { id: 'nlg', name: 'Nervenleitgeschwindigkeit', short: 'Misst, wie schnell ein Nerv leitet: Standard bei Verdacht auf Karpaltunnelsyndrom oder Polyneuropathie.', href: '/gesundheitsbibliothek/untersuchungen/nervenleitmessung/' },
  { id: 'gastroskopie', name: 'Gastroskopie', short: 'Blick in Speiseröhre und Magen, etwa bei anhaltendem Sodbrennen oder Magenbeschwerden.', href: '/gesundheitsbibliothek/untersuchungen/gastroskopie/' },
  { id: 'koloskopie', name: 'Koloskopie', short: 'Darmspiegelung zur Vorsorge und Abklärung: Vorbereitung, Ablauf und Polypenentfernung.', href: '/gesundheitsbibliothek/untersuchungen/koloskopie/' },
  { id: 'ct', name: 'CT (Computertomografie)', short: 'Schnittbilder in Sekunden: stark bei Knochen, Lunge und Notfalldiagnostik.', href: '/gesundheitsbibliothek/untersuchungen/ct/' },
  { id: 'lungenfunktion', name: 'Lungenfunktion (Spirometrie)', short: 'Misst Luftmenge und Luftfluss: der Basistest bei Husten, Atemnot und Asthma-Verdacht.', href: '/gesundheitsbibliothek/untersuchungen/lungenfunktion/' },
  { id: 'echokardiografie', name: 'Echokardiografie', short: 'Der Herzultraschall: Pumpfunktion, Herzklappen und Blutfluss im bewegten Bild.', href: '/gesundheitsbibliothek/untersuchungen/echokardiografie/' },
  { id: 'langzeit-blutdruckmessung', name: '24h-Blutdruckmessung', short: 'Das Blutdruckprofil über Tag und Nacht, aussagekräftiger als Einzelmessungen.', href: '/gesundheitsbibliothek/untersuchungen/langzeit-blutdruckmessung/' },
  { id: 'schlaflabor', name: 'Schlaflabor', short: 'Polysomnografie: Atmung, Sauerstoff, Schlafphasen und Bewegungen über eine ganze Nacht.', href: '/gesundheitsbibliothek/untersuchungen/schlaflabor/' },
  { id: 'eeg', name: 'EEG', short: 'Zeichnet die Hirnströme auf: schmerzfrei, ohne Strahlung, zentral bei Anfalls-Abklärungen.', href: '/gesundheitsbibliothek/untersuchungen/eeg/' },
  { id: 'blutgasanalyse', name: 'Blutgasanalyse', short: 'Sauerstoff, CO2 und Säure-Basen-Haushalt: die Schnellanalyse bei Atem- und Stoffwechselfragen.', href: '/gesundheitsbibliothek/untersuchungen/blutgasanalyse/' },
  { id: 'knochendichtemessung', name: 'Knochendichtemessung (DEXA)', short: 'Misst die Stabilität der Knochen, etwa bei Osteoporose-Risiko, mit sehr wenig Strahlung.', href: '/gesundheitsbibliothek/untersuchungen/knochendichtemessung/' },
  { id: 'allergietest', name: 'Allergietest', short: 'Pricktest, Bluttest und Epikutantest: wie eine Allergie abgeklärt wird.', href: '/gesundheitsbibliothek/untersuchungen/allergietest/' },
  { id: 'hoertest', name: 'Hörtest (Audiometrie)', short: 'Ton- und Sprachaudiometrie: wie das Hören gemessen und eingeordnet wird.', href: '/gesundheitsbibliothek/untersuchungen/hoertest/' },
  { id: 'szintigrafie', name: 'Szintigrafie', short: 'Nuklearmedizin mit Tracer und Gammakamera: zeigt die Funktion von Schilddrüse, Knochen und mehr.', href: '/gesundheitsbibliothek/untersuchungen/szintigrafie/' },
  { id: 'duplexsonografie', name: 'Duplexsonografie', short: 'Der Gefäss-Ultraschall: Venen, Arterien und Blutfluss in Echtzeit.', href: '/gesundheitsbibliothek/untersuchungen/duplexsonografie/' },
  { id: 'belastungs-ekg', name: 'Belastungs-EKG', short: 'EKG unter körperlicher Belastung: wie Herzrhythmus, Puls und Blutdruck auf Anstrengung reagieren.', href: '/gesundheitsbibliothek/untersuchungen/belastungs-ekg/' },
  { id: 'hormontest', name: 'Hormontest', short: 'Es gibt nicht den einen Hormontest: welche Bluttests je nach Fragestellung sinnvoll sein können.', href: '/gesundheitsbibliothek/untersuchungen/hormontest/' },
  { id: 'emg', name: 'EMG (Elektromyografie)', short: 'Untersucht die elektrische Aktivität der Muskeln: bei Muskelschwäche und neurologischen Fragestellungen.', href: '/gesundheitsbibliothek/untersuchungen/emg/' },
  { id: 'stuhlanalyse', name: 'Stuhlanalyse', short: 'Calprotectin, Erreger, verborgenes Blut: welcher Stuhltest welche medizinische Frage beantwortet.', href: '/gesundheitsbibliothek/untersuchungen/stuhlanalyse/' },
  { id: 'h2-atemtest', name: 'H2-Atemtest', short: 'Prüft per Atemluft, ob Milch- oder Fruchtzucker im Dünndarm schlecht aufgenommen wird.', href: '/gesundheitsbibliothek/untersuchungen/h2-atemtest/' },
  { id: 'neurologische-untersuchung', name: 'Neurologische Untersuchung', short: 'Reflexe, Kraft, Gefühl und Koordination: die klinische Basisuntersuchung des Nervensystems.', href: '/gesundheitsbibliothek/untersuchungen/neurologische-untersuchung/' },
  { id: 'helicobacter-test', name: 'Helicobacter-Test', short: 'Atemtest, Stuhltest oder Gewebeprobe: Nachweis von H. pylori und Kontrolle nach der Behandlung.', href: '/gesundheitsbibliothek/untersuchungen/helicobacter-test/' },
  { id: 'zoeliakie-test', name: 'Zöliakie-Test', short: 'Antikörper im Blut und gegebenenfalls Gewebeproben aus dem Dünndarm, unter glutenhaltiger Ernährung.', href: '/gesundheitsbibliothek/untersuchungen/zoeliakie-test/' },
  { id: 'hpv-test', name: 'HPV-Test', short: 'Virusnachweis am Gebärmutterhals, zu unterscheiden vom Pap-Zellbefund.', href: '/gesundheitsbibliothek/untersuchungen/hpv-test/' },
  { id: 'biopsie', name: 'Biopsie', short: 'Gewebeentnahme zur Untersuchung im Labor, wenn ein Bild allein nicht reicht.', href: '/gesundheitsbibliothek/untersuchungen/biopsie/' },
  { id: 'spermiogramm', name: 'Spermiogramm', short: 'Untersuchung der Samenprobe bei Fragen zur männlichen Fruchtbarkeit: Vorbereitung, Werte und Grenzen.', href: '/gesundheitsbibliothek/untersuchungen/spermiogramm/' },
  { id: 'hysteroskopie', name: 'Hysteroskopie', short: 'Gebärmutterspiegelung: wann sie gemacht wird, Ablauf, Schmerzen und was sie zeigen kann.', href: '/gesundheitsbibliothek/untersuchungen/hysteroskopie/' },
  { id: 'lumbalpunktion', name: 'Lumbalpunktion', short: 'Entnahme von Nervenwasser zur neurologischen Abklärung: Ablauf, Nebenwirkungen und Grenzen.', href: '/gesundheitsbibliothek/untersuchungen/lumbalpunktion/' },
  { id: 'leberelastografie', name: 'Leberelastografie', short: 'Messung der Lebersteifigkeit (FibroScan): Vorbereitung, Ergebnis und was es nicht beweist.', href: '/gesundheitsbibliothek/untersuchungen/leberelastografie/' },
  { id: 'urinuntersuchung', name: 'Urinuntersuchung', short: 'Teststreifen, Laboranalyse und Urinkultur: was der Urin zeigen kann und was nicht.', href: '/gesundheitsbibliothek/untersuchungen/urinuntersuchung/' },
  { id: 'laparoskopie', name: 'Laparoskopie', short: 'Bauchspiegelung: Diagnose und Behandlung per Schlüssellochtechnik, Ablauf, Narkose und Erholung.', href: '/gesundheitsbibliothek/untersuchungen/laparoskopie/' },
  { id: 'arthroskopie', name: 'Arthroskopie', short: 'Gelenkspiegelung: Ablauf, Narkoseformen, Risiken und wann sie bei Kniebeschwerden wenig bringt.', href: '/gesundheitsbibliothek/untersuchungen/arthroskopie/' },
  { id: 'kapselendoskopie', name: 'Kapselendoskopie', short: 'Die Kamerakapsel für den Dünndarm: Vorbereitung, Ablauf und was sie nicht kann.', href: '/gesundheitsbibliothek/untersuchungen/kapselendoskopie/' },
  { id: 'bronchoskopie', name: 'Bronchoskopie', short: 'Lungenspiegelung: Gründe, Vorbereitung, Spülung und Gewebeprobe, Risiken.', href: '/gesundheitsbibliothek/untersuchungen/bronchoskopie/' },
  { id: 'laryngoskopie', name: 'Laryngoskopie', short: 'Kehlkopfspiegelung bei Heiserkeit: Varianten von Spiegel bis Endoskop und was sie zeigt.', href: '/gesundheitsbibliothek/untersuchungen/laryngoskopie/' },
  { id: 'eileiterdurchgaengigkeit', name: 'Eileiterdurchgängigkeit (HSG, HyCoSy)', short: 'Eileiter prüfen mit Röntgen (HSG) oder Ultraschall (HyCoSy): Unterschiede, Ablauf und Grenzen.', href: '/gesundheitsbibliothek/untersuchungen/eileiterdurchgaengigkeit/' },
  { id: 'urodynamik', name: 'Urodynamik', short: 'Blasendruckmessung bei Inkontinenz und Entleerungsstörungen: Messungen, Ablauf, Risiken und Grenzen.', href: '/gesundheitsbibliothek/untersuchungen/urodynamik/' },
];

export interface BodyRegion {
  slug: string;              // -> /gesundheitsbibliothek/koerper/<slug>/
  title: string;             // H1
  nav: string;               // kurzes Label für Karten/Chips
  metaDesc: string;
  lead: string;
  /** /koerpersignale/-Slugs (müssen in koerpersignale.ts existieren). */
  signals: string[];
  /** /beschwerden/-Slugs mit Label (müssen als symptom-leaf existieren, nur kanonische Slugs). */
  conditions: RegionRef[];
  /** /therapien/-Slugs mit Label (bestehende Therapieseiten). */
  therapies: RegionRef[];
  /** Visual-Library-Kategorien; gerendert werden nur status:'live'-Visuals. */
  visualCategories: VisualCategory[];
  /** IDs aus DIAGNOSTICS - was ärztlich typischerweise abgeklärt wird. */
  diagnostics: string[];
}

// Kuratierte Regionen. Nur Regionen mit ausreichend bestehendem Inhalt (>= ~10 echte
// Ziele über mehrere Entity-Typen). Bewusst NICHT aufgenommen: Brust, Becken (zu dünn),
// Haut (hat mit /haut/ bereits einen eigenen, etablierten Hub - wird nur verlinkt).
export const BODY_REGIONS: BodyRegion[] = [
  {
    slug: 'kopf',
    title: 'Kopf & Gesicht',
    nav: 'Kopf & Gesicht',
    metaDesc: 'Kopfschmerzen, Migräne, Schwindel, Ohrgeräusche, Kieferbeschwerden: alle Inhalte der Gesundheitsbibliothek zur Region Kopf & Gesicht. Körpersignale, Beschwerden und Behandlungsmöglichkeiten.',
    lead: 'Vom Spannungskopfschmerz über Schwindel beim Umdrehen bis zum Pochen im Ohr: Hier findest du alle Inhalte zur Region Kopf und Gesicht. Signale ohne Diagnose, bekannte Beschwerdebilder und passende Behandlungen.',
    signals: ['schwindel-beim-umdrehen-im-bett', 'schwindel-beim-aufstehen', 'schwindel-beim-buecken', 'druck-im-kopf-ohne-kopfschmerzen', 'kopfdruck-beim-buecken', 'augenflimmern', 'herzschlag-im-ohr', 'ohr-einseitig-verstopft', 'ohr-knackt-beim-schlucken', 'augenlid-zuckt', 'bitterer-geschmack-morgens', 'verstopfte-nase-ohne-erkaeltung'],
    conditions: [
      { slug: 'migraene', label: 'Migräne' }, { slug: 'kopfschmerzen', label: 'Kopfschmerzen' },
      { slug: 'spannungskopfschmerzen', label: 'Spannungskopfschmerzen' }, { slug: 'cluster-kopfschmerzen', label: 'Cluster-Kopfschmerzen' },
      { slug: 'augenmigraene', label: 'Augenmigräne' }, { slug: 'schwindel', label: 'Schwindel' },
      { slug: 'tinnitus', label: 'Tinnitus' }, { slug: 'hoersturz', label: 'Hörsturz' },
      { slug: 'kieferschmerzen', label: 'Kieferschmerzen' }, { slug: 'zaehneknirschen', label: 'Zähneknirschen' },
      { slug: 'trigeminusneuralgie', label: 'Trigeminusneuralgie' }, { slug: 'sinusitis', label: 'Sinusitis' },
      { slug: 'trockene-augen', label: 'Trockene Augen' },
      { slug: 'vestibulaere-migraene', label: 'Vestibuläre Migräne' }, { slug: 'vestibularisneuritis', label: 'Vestibularisneuritis' }, { slug: 'hyperakusis', label: 'Hyperakusis' }, { slug: 'burning-mouth-syndrom', label: 'Burning-Mouth-Syndrom' },
      { slug: 'okzipitalneuralgie', label: 'Okzipitalneuralgie' },
      { slug: 'zervikogener-kopfschmerz', label: 'Zervikogener Kopfschmerz' },
      { slug: 'medikamentenuebergebrauchskopfschmerz', label: 'Medikamentenübergebrauchskopfschmerz' },
    ],
    therapies: [
      { slug: 'akupunktur', label: 'Akupunktur' }, { slug: 'ohrakupunktur', label: 'Ohrakupunktur' },
      { slug: 'gesichtsakupunktur', label: 'Gesichtsakupunktur' }, { slug: 'gua-sha', label: 'Gua Sha' },
    ],
    visualCategories: ['Kiefer'],
    diagnostics: ['neurologisch', 'mrt', 'blutuntersuchung'],
  },
  {
    slug: 'hals-nacken',
    title: 'Hals & Nacken',
    nav: 'Hals & Nacken',
    metaDesc: 'Nackenschmerzen, Knacken beim Drehen, Klossgefühl im Hals: alle Inhalte der Gesundheitsbibliothek zur Region Hals & Nacken. Körpersignale, Beschwerden, Visuals und Behandlungsmöglichkeiten.',
    lead: 'Ein Nacken, der beim Drehen knackt. Ein Kloss im Hals, der nicht verschwindet. Verspannungen, die bis in den Kopf ziehen. Hier ist alles zur Region Hals und Nacken gesammelt.',
    signals: ['nacken-knackt-beim-drehen', 'nacken-morgens-steif', 'kribbeln-vom-nacken-in-den-arm', 'klossgefuehl-im-hals', 'staendiger-raeusperzwang', 'zungenbrennen', 'trockener-mund-nachts', 'trockener-husten'],
    conditions: [
      { slug: 'nackenschmerzen', label: 'Nackenschmerzen' }, { slug: 'schleudertrauma', label: 'Schleudertrauma' },
      { slug: 'spannungskopfschmerzen', label: 'Spannungskopfschmerzen' }, { slug: 'schwindel', label: 'Schwindel' },
      { slug: 'bandscheibenvorfall', label: 'Bandscheibenvorfall' },
      { slug: 'zervikale-radikulopathie', label: 'Zervikale Radikulopathie' },
    ],
    therapies: [
      { slug: 'akupunktur', label: 'Akupunktur' }, { slug: 'tuina', label: 'Tuina' },
      { slug: 'schroepfen', label: 'Schröpfen' }, { slug: 'massage', label: 'Massage' },
      { slug: 'physiotherapie', label: 'Physiotherapie' },
    ],
    visualCategories: ['Nacken'],
    diagnostics: ['neurologisch', 'mrt', 'roentgen'],
  },
  {
    slug: 'schulter-arm-hand',
    title: 'Schulter, Arm & Hand',
    nav: 'Schulter, Arm & Hand',
    metaDesc: 'Eingeschlafene Finger, Frozen Shoulder, Tennisarm, Karpaltunnelsyndrom: alle Inhalte der Gesundheitsbibliothek zu Schulter, Arm und Hand, vom ersten Signal bis zur Behandlung.',
    lead: 'Finger, die nachts einschlafen. Eine Schulter, die nicht mehr über den Kopf will. Kribbeln beim Velofahren. Diese Region sammelt alle Inhalte von der ersten Beobachtung bis zum bekannten Beschwerdebild.',
    signals: ['finger-schlafen-ein', 'einzelne-finger-taub', 'arm-schlaeft-nachts-ein', 'kribbeln-vom-nacken-in-den-arm', 'finger-morgens-steif', 'hand-kribbelt-beim-velofahren', 'kalte-haende-einseitig', 'kalte-haende-trotz-waerme'],
    conditions: [
      { slug: 'schulterschmerzen', label: 'Schulterschmerzen' }, { slug: 'frozen-shoulder', label: 'Frozen Shoulder' },
      { slug: 'rotatorenmanschette', label: 'Rotatorenmanschette' }, { slug: 'tennisarm', label: 'Tennisarm' },
      { slug: 'karpaltunnelsyndrom', label: 'Karpaltunnelsyndrom' }, { slug: 'sehnenscheidenentzuendung', label: 'Sehnenscheidenentzündung' },
      { slug: 'rhizarthrose', label: 'Rhizarthrose' }, { slug: 'kalkschulter', label: 'Kalkschulter' }, { slug: 'raynaud-syndrom', label: 'Raynaud-Syndrom' },
      { slug: 'polyneuropathie', label: 'Polyneuropathie' },
      { slug: 'schnappfinger', label: 'Schnappfinger' }, { slug: 'bizepssehnenentzuendung', label: 'Bizepssehnenentzündung' }, { slug: 'thoracic-outlet-syndrom', label: 'Thoracic-Outlet-Syndrom' },
      { slug: 'tfcc-laesion', label: 'TFCC-Läsion' },
      { slug: 'radialtunnelsyndrom', label: 'Radialtunnelsyndrom' },
      { slug: 'loge-de-guyon-syndrom', label: 'Loge-de-Guyon-Syndrom' },
      { slug: 'ac-gelenkarthrose', label: 'AC-Gelenkarthrose' },
      { slug: 'omarthrose', label: 'Omarthrose' },
      { slug: 'intersektionssyndrom', label: 'Intersektionssyndrom' },
    ],
    therapies: [
      { slug: 'akupunktur', label: 'Akupunktur' }, { slug: 'tuina', label: 'Tuina' },
      { slug: 'physiotherapie', label: 'Physiotherapie' }, { slug: 'dauernadeln', label: 'Dauernadeln' },
    ],
    visualCategories: ['Schulter', 'Arm & Hand'],
    diagnostics: ['nlg', 'ultraschall', 'mrt', 'neurologisch'],
  },
  {
    slug: 'ruecken',
    title: 'Rücken',
    nav: 'Rücken',
    metaDesc: 'Rückenschmerzen, Bandscheibenvorfall, Ischias, Hexenschuss: alle Inhalte der Gesundheitsbibliothek zur Region Rücken. Körpersignale, Beschwerden, Visuals und Behandlungsmöglichkeiten.',
    lead: 'Schmerzen beim Husten, ein Bein, das beim Sitzen taub wird, oder der klassische Hexenschuss: Der Rücken ist die häufigste Beschwerderegion überhaupt. Hier ist alles dazu an einem Ort.',
    signals: ['rueckenschmerzen-beim-husten', 'rueckenschmerzen-beim-langen-stehen', 'bein-wird-beim-sitzen-taub'],
    conditions: [
      { slug: 'rueckenschmerzen', label: 'Rückenschmerzen' }, { slug: 'bandscheibenvorfall', label: 'Bandscheibenvorfall' },
      { slug: 'ischias', label: 'Ischias' }, { slug: 'hexenschuss', label: 'Hexenschuss' },
      { slug: 'isg-blockade', label: 'ISG-Blockade' }, { slug: 'spinalkanalstenose', label: 'Spinalkanalstenose' },
      { slug: 'piriformis-syndrom', label: 'Piriformis-Syndrom' }, { slug: 'osteoporose', label: 'Osteoporose' },
      { slug: 'steissbeinschmerzen', label: 'Steissbeinschmerzen' },
      { slug: 'spondylolisthese', label: 'Wirbelgleiten (Spondylolisthese)' },
      { slug: 'fasettensyndrom', label: 'Fasettensyndrom' },
    ],
    therapies: [
      { slug: 'akupunktur', label: 'Akupunktur' }, { slug: 'tuina', label: 'Tuina' },
      { slug: 'schroepfen', label: 'Schröpfen' }, { slug: 'massage', label: 'Massage' },
      { slug: 'physiotherapie', label: 'Physiotherapie' },
    ],
    visualCategories: ['Rücken'],
    diagnostics: ['mrt', 'roentgen', 'neurologisch'],
  },
  {
    slug: 'bauch-verdauung',
    title: 'Bauch & Verdauung',
    nav: 'Bauch & Verdauung',
    metaDesc: 'Reizdarm, Blähungen, Sodbrennen, Gastritis: alle Inhalte der Gesundheitsbibliothek zur Region Bauch & Verdauung. Beschwerden, Zusammenhänge und Behandlungsmöglichkeiten.',
    lead: 'Ein Bauch, der nach dem Essen rebelliert. Sodbrennen, das nachts wach hält. Eine Verdauung, die ohne klare Ursache unruhig ist. Hier findest du alle Inhalte zur Region Bauch und Verdauung.',
    signals: ['voellegefuehl-nach-dem-essen', 'blaehbauch-am-abend', 'bauch-fuehlt-sich-hart-an', 'stinkende-blaehungen', 'durchfall-am-morgen', 'magendruck-im-liegen', 'druckgefuehl-im-unterbauch', 'bitterer-geschmack-morgens'],
    conditions: [
      { slug: 'verdauungsprobleme', label: 'Verdauungsprobleme' }, { slug: 'reizdarm', label: 'Reizdarm' },
      { slug: 'blaehungen', label: 'Blähungen' }, { slug: 'verstopfung', label: 'Verstopfung' },
      { slug: 'sodbrennen', label: 'Sodbrennen' }, { slug: 'gastritis', label: 'Gastritis' },
      { slug: 'morbus-crohn', label: 'Morbus Crohn' }, { slug: 'colitis-ulcerosa', label: 'Colitis ulcerosa' },
      { slug: 'histaminintoleranz', label: 'Histaminintoleranz' }, { slug: 'uebelkeit', label: 'Übelkeit' },
      { slug: 'haemorrhoiden', label: 'Hämorrhoiden' },
      { slug: 'mikroskopische-kolitis', label: 'Mikroskopische Kolitis' },
      { slug: 'gallensaeurebedingter-durchfall', label: 'Gallensäurebedingter Durchfall' },
    ],
    therapies: [
      { slug: 'akupunktur', label: 'Akupunktur' }, { slug: 'kraeutertherapie', label: 'Kräutertherapie' },
      { slug: 'moxibustion', label: 'Moxibustion' },
    ],
    visualCategories: [],
    diagnostics: ['gastroskopie', 'blutuntersuchung', 'ultraschall'],
  },
  {
    slug: 'huefte-bein-fuss',
    title: 'Hüfte, Bein & Fuss',
    nav: 'Hüfte, Bein & Fuss',
    metaDesc: 'Knieschmerzen, Wadenkrämpfe, schwere Beine, Fersensporn: alle Inhalte der Gesundheitsbibliothek zu Hüfte, Bein und Fuss. Körpersignale, Beschwerden, Visuals und Behandlungsmöglichkeiten.',
    lead: 'Wadenkrämpfe, die nachts wecken. Ein Knie, das knackt. Füsse, die abends brennen. Von der Hüfte bis zur Fusssohle sammelt diese Region alle Inhalte der Bibliothek.',
    signals: ['wadenkraempfe-nachts', 'schwere-beine-abends', 'brennende-fuesse-nachts', 'zehen-kribbeln', 'ein-fuss-kaelter-als-der-andere', 'bein-wird-beim-sitzen-taub', 'knie-knackt-ohne-schmerzen'],
    conditions: [
      { slug: 'hueftschmerzen', label: 'Hüftschmerzen' }, { slug: 'knieschmerzen', label: 'Knieschmerzen' },
      { slug: 'arthrose', label: 'Arthrose' }, { slug: 'plantarfasziitis', label: 'Plantarfasziitis' },
      { slug: 'fersensporn', label: 'Fersensporn' }, { slug: 'hallux-valgus', label: 'Hallux valgus' },
      { slug: 'morton-neurom', label: 'Morton-Neurom' }, { slug: 'achillessehnenentzuendung', label: 'Achillessehnenentzündung' }, { slug: 'sprunggelenkschmerzen', label: 'Sprunggelenkschmerzen' },
      { slug: 'wadenschmerzen', label: 'Wadenschmerzen' }, { slug: 'restless-legs', label: 'Restless Legs' },
      { slug: 'durchblutungsstoerungen', label: 'Durchblutungsstörungen' }, { slug: 'schwere-beine', label: 'Schwere Beine' },
      { slug: 'wassereinlagerungen', label: 'Wassereinlagerungen' },
      { slug: 'patellofemorales-schmerzsyndrom', label: 'Patellofemorales Schmerzsyndrom' }, { slug: 'meniskusriss', label: 'Meniskusriss' }, { slug: 'tarsaltunnelsyndrom', label: 'Tarsaltunnelsyndrom' }, { slug: 'meralgia-paraesthetica', label: 'Meralgia paraesthetica' },
      { slug: 'hallux-rigidus', label: 'Hallux rigidus' }, { slug: 'laeuferknie', label: 'Läuferknie (Iliotibialband-Syndrom)' }, { slug: 'schienbeinkantensyndrom', label: 'Schienbeinkantensyndrom' }, { slug: 'gluteale-tendinopathie', label: 'Gluteale Tendinopathie' }, { slug: 'proximale-hamstring-tendinopathie', label: 'Proximale Hamstring-Tendinopathie' }, { slug: 'adduktorentendinopathie', label: 'Adduktorentendinopathie' }, { slug: 'peronealsehnen-tendinopathie', label: 'Peronealsehnen-Tendinopathie' }, { slug: 'tibialis-posterior-tendinopathie', label: 'Tibialis-posterior-Tendinopathie' }, { slug: 'metatarsalgie', label: 'Metatarsalgie' },
      { slug: 'hueftimpingement', label: 'Hüftimpingement (FAI)' },
      { slug: 'pes-anserinus-bursitis', label: 'Pes-anserinus-Bursitis' },
      { slug: 'haglundferse', label: 'Haglundferse' },
      { slug: 'sesamoiditis', label: 'Sesamoiditis' },
      { slug: 'plica-syndrom-knie', label: 'Plica-Syndrom am Knie' },
      { slug: 'quadrizepssehnen-tendinopathie', label: 'Quadrizepssehnen-Tendinopathie' },
      { slug: 'schnappende-huefte', label: 'Schnappende Hüfte (Coxa saltans)' },
      { slug: 'schambeinentzuendung', label: 'Schambeinentzündung' },
      { slug: 'sprunggelenksarthrose', label: 'Sprunggelenksarthrose' },
    ],
    therapies: [
      { slug: 'akupunktur', label: 'Akupunktur' }, { slug: 'massage', label: 'Massage' },
      { slug: 'physiotherapie', label: 'Physiotherapie' }, { slug: 'schroepfen', label: 'Schröpfen' },
    ],
    visualCategories: ['Hüfte', 'Knie', 'Bein & Fuss'],
    diagnostics: ['roentgen', 'ultraschall', 'mrt'],
  },
  {
    slug: 'schlaf-nervensystem',
    title: 'Schlaf & Nervensystem',
    nav: 'Schlaf & Nervensystem',
    metaDesc: 'Schlafprobleme, nächtliches Aufwachen, Nachtschweiss, Erschöpfung, Stress: alle Inhalte der Gesundheitsbibliothek zu Schlaf und Nervensystem an einem Ort.',
    lead: 'Immer um drei Uhr wach. Nachtschweiss ohne Fieber. Tagsüber erschöpft, abends überdreht. Diese Region sammelt alle Inhalte rund um Schlaf, Stress und Nervensystem.',
    signals: ['immer-zur-gleichen-uhrzeit-aufwachen', 'nachtschweiss-ohne-fieber', 'schnarchen-jede-nacht', 'juckreiz-nachts-ohne-ausschlag', 'herzklopfen-im-liegen', 'herzstolpern-in-ruhe', 'haeufiger-harndrang-nachts', 'trockener-mund-nachts', 'wadenkraempfe-nachts', 'brennende-fuesse-nachts', 'augenlid-zuckt'],
    conditions: [
      { slug: 'schlafprobleme', label: 'Schlafprobleme' }, { slug: 'stress-burnout', label: 'Stress & Burnout' },
      { slug: 'erschoepfung', label: 'Erschöpfung' }, { slug: 'angststoerungen', label: 'Angststörungen' },
      { slug: 'depressionen', label: 'Depressionen' }, { slug: 'restless-legs', label: 'Restless Legs' },
      { slug: 'nervenschmerzen', label: 'Nervenschmerzen' }, { slug: 'polyneuropathie', label: 'Polyneuropathie' },
      { slug: 'fibromyalgie', label: 'Fibromyalgie' }, { slug: 'long-covid', label: 'Long Covid' },
      { slug: 'pppd', label: 'Persistierender postural-perzeptiver Schwindel (PPPD)' },
      { slug: 'essentieller-tremor', label: 'Essentieller Tremor' },
      { slug: 'pots-syndrom', label: 'POTS (posturales Tachykardiesyndrom)' },
      { slug: 'posttraumatische-belastungsstoerung', label: 'Posttraumatische Belastungsstörung (PTBS)' },
      { slug: 'komplexe-ptbs', label: 'Komplexe PTBS' },
    ],
    therapies: [
      { slug: 'akupunktur', label: 'Akupunktur' }, { slug: 'ohrakupunktur', label: 'Ohrakupunktur' },
      { slug: 'ear-seeds', label: 'Ear Seeds' }, { slug: 'dauernadeln', label: 'Dauernadeln' },
    ],
    visualCategories: [],
    diagnostics: ['blutuntersuchung', 'neurologisch'],
  },
  {
    slug: 'becken-blase',
    title: 'Becken & Blase',
    nav: 'Becken & Blase',
    metaDesc: 'Reizblase, häufiger Harndrang, Druckgefühl im Unterbauch, Prostata, Inkontinenz: alle Inhalte der Gesundheitsbibliothek zur Region Becken & Blase an einem Ort.',
    lead: 'Eine Blase, die sich ständig meldet. Nächtliche Toilettengänge, die den Schlaf zerstückeln. Ein Druckgefühl im Unterbauch, das sich schwer einordnen lässt. Diese Region sammelt alle Inhalte rund um Blase, Becken und Urologie, diskret und ehrlich eingeordnet.',
    signals: ['haeufiger-harndrang-nachts', 'ploetzlicher-harndrang-ohne-volle-blase', 'druckgefuehl-im-unterbauch'],
    conditions: [
      { slug: 'reizblase', label: 'Reizblase' }, { slug: 'blasenentzuendung', label: 'Blasenentzündung' },
      { slug: 'inkontinenz', label: 'Inkontinenz' }, { slug: 'prostata', label: 'Prostatabeschwerden' },
      { slug: 'haemorrhoiden', label: 'Hämorrhoiden' },
      { slug: 'pudendusneuralgie', label: 'Pudendusneuralgie' }, { slug: 'beckenbodenverspannung', label: 'Beckenbodenverspannung' },
      { slug: 'rektusdiastase', label: 'Rektusdiastase' },
      { slug: 'symphysenschmerzen-schwangerschaft', label: 'Symphysenschmerzen in der Schwangerschaft' },
      { slug: 'proctalgia-fugax', label: 'Proctalgia fugax' },
      { slug: 'beckenorgansenkung', label: 'Beckenorgansenkung' },
    ],
    therapies: [
      { slug: 'akupunktur', label: 'Akupunktur' }, { slug: 'moxibustion', label: 'Moxibustion' },
      { slug: 'kraeutertherapie', label: 'Kräutertherapie' },
    ],
    visualCategories: [],
    diagnostics: ['ultraschall', 'blutuntersuchung'],
  },
  {
    slug: 'zyklus-hormone',
    title: 'Zyklus & Hormone',
    nav: 'Zyklus & Hormone',
    metaDesc: 'Zyklusbeschwerden, PMS, Endometriose, Wechseljahre, Kinderwunsch: alle Inhalte der Gesundheitsbibliothek zu Zyklus und Hormonen. Beschwerden, Signale und Behandlungsmöglichkeiten.',
    lead: 'Vom unregelmässigen Zyklus über PMS bis zu Wallungen in den Wechseljahren: Hier sind alle Inhalte rund um Zyklus, Hormone und Frauengesundheit gesammelt.',
    signals: ['nachtschweiss-ohne-fieber', 'hitzegefuehl-ohne-fieber', 'starkes-schwitzen-ohne-sport'],
    conditions: [
      { slug: 'zyklusbeschwerden', label: 'Zyklusbeschwerden' }, { slug: 'menstruationsbeschwerden', label: 'Menstruationsbeschwerden' },
      { slug: 'pms', label: 'PMS' }, { slug: 'endometriose', label: 'Endometriose' },
      { slug: 'pcos', label: 'PCOS' }, { slug: 'myome', label: 'Myome' },
      { slug: 'wechseljahre', label: 'Wechseljahre' }, { slug: 'hitzewallungen', label: 'Hitzewallungen' },
      { slug: 'kinderwunsch', label: 'Kinderwunsch' }, { slug: 'hashimoto', label: 'Hashimoto' },
      { slug: 'mastodynie', label: 'Mastodynie' },
      { slug: 'sekundaere-amenorrhoe', label: 'Sekundäre Amenorrhoe' },
    ],
    therapies: [
      { slug: 'akupunktur', label: 'Akupunktur' }, { slug: 'kraeutertherapie', label: 'Kräutertherapie' },
      { slug: 'moxibustion', label: 'Moxibustion' },
    ],
    visualCategories: ['Hormone & Zyklus'],
    diagnostics: ['blutuntersuchung', 'ultraschall'],
  },
];

const regionBySlug = new Map(BODY_REGIONS.map((r) => [r.slug, r]));
export const bodyRegion = (slug: string): BodyRegion | undefined => regionBySlug.get(slug);

// Reverse-Maps: Beschwerde-/Signal-Slug -> Regionen (für datengetriebene Rückverlinkung).
const regionsByCondition = new Map<string, BodyRegion[]>();
const regionsBySignal = new Map<string, BodyRegion[]>();
for (const r of BODY_REGIONS) {
  for (const c of r.conditions) {
    const arr = regionsByCondition.get(c.slug) ?? [];
    arr.push(r); regionsByCondition.set(c.slug, arr);
  }
  for (const s of r.signals) {
    const arr = regionsBySignal.get(s) ?? [];
    arr.push(r); regionsBySignal.set(s, arr);
  }
}
export const regionsForBeschwerde = (slug: string): BodyRegion[] => regionsByCondition.get(slug) ?? [];
export const regionsForSignal = (slug: string): BodyRegion[] => regionsBySignal.get(slug) ?? [];

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Link-Block "Gesundheitsbibliothek" für Beschwerden-Leaves (SpaPage-Bodies), nach dem
 * Muster von ksLinksHtml/hautLinksHtml (bestehende .cl-*-Klassen, kein neues CSS).
 * Verlinkt die passenden Körperregion-Hubs + den Bibliotheks-Hub - das sind die
 * internen Links, die die neuen Hubs aus "Gefunden – nicht indexiert" heben.
 */
export function libraryLinksHtml(beschwerdeSlug: string): string {
  const regions = regionsForBeschwerde(beschwerdeSlug);
  if (!regions.length) return '';
  const chips = regions
    .map((r) => `<a href="/gesundheitsbibliothek/koerper/${r.slug}/" class="cl-chip">${esc(r.nav)}</a>`)
    .join('');
  return (
    `<section class="section cl-related" style="background:var(--surface)">` +
    `<div class="wrap reveal">` +
    `<div class="section-label">Gesundheitsbibliothek</div>` +
    `<h2 class="section-title">Mehr zu dieser Körperregion</h2>` +
    `<p class="section-sub">Signale, Beschwerden und Behandlungsmöglichkeiten der Region, an einem Ort gesammelt.</p>` +
    `<div class="cl-links">${chips}<a href="/gesundheitsbibliothek/" class="cl-chip">Zur Gesundheitsbibliothek</a></div>` +
    `</div></section>`
  );
}

// ---------------------------------------------------------------------------------
// Such-Index (Phase 1: clientseitig, klein). Wird zur Build-Zeit aus den bestehenden
// Datenquellen abgeleitet - kein Inhalt wird dupliziert, nur Titel + URL + Typ.
// Filter-/Suchzustände erzeugen KEINE eigenen URLs (nicht indexierbar by design).
// ---------------------------------------------------------------------------------
export interface SearchEntry { t: string; u: string; g: string; k?: string }

// Kontrollierte Synonyme (URL-Pfad -> Alltagswörter/Varianten). Nur für die Suche -
// NIE eigene Seiten für Synonyme anlegen. Natürliche Begriffe, kein Keyword-Stuffing.
const SYNONYMS: Record<string, string> = {
  '/gesundheitsbibliothek/untersuchungen/h2-atemtest/': 'Atemtest Laktosetest Fruktosetest Laktoseintoleranz Test Wasserstoff-Atemtest',
  '/gesundheitsbibliothek/untersuchungen/neurologische-untersuchung/': 'Neurostatus neurologischer Status Untersuchung beim Neurologen Reflexe testen',
  '/gesundheitsbibliothek/untersuchungen/urinuntersuchung/': 'Urintest Urinprobe Urinstatus Teststreifen Urinkultur Mittelstrahlurin',
  '/koerpersignale/kribbeln-im-ruecken/': 'Kribbeln Rücken Ameisenlaufen Rücken Missempfindung Rücken',
  '/koerpersignale/ohr-juckt-innen/': 'Juckreiz Gehörgang Ohr jucken innen Ohrenjucken',
  '/koerpersignale/kiefer-knackt-beim-oeffnen/': 'Kieferknacken Kiefergelenk knackt Knacken beim Kauen',
  '/koerpersignale/husten-nach-dem-essen/': 'Hustenreiz nach dem Essen Husten beim Essen Verschlucken',
  '/koerpersignale/schmerzen-beim-tiefen-einatmen/': 'Stechen beim Einatmen Schmerzen beim Atmen atemabhängige Schmerzen',
  '/koerpersignale/schmerzen-zwischen-den-schulterblaettern/': 'Schmerzen Schulterblätter BWS Schmerzen oberer Rücken brennen zwischen Schulterblättern',
  '/koerpersignale/magen-knurrt-staendig/': 'Magenknurren Darmgeräusche Bauch gluckert laute Verdauungsgeräusche',
  '/koerpersignale/haende-zittern/': 'Händezittern Handzittern Tremor Hände zittrige Hände essentieller Tremor',
  '/gesundheitsbibliothek/was-jetzt/verstopfung/': 'was tun bei Verstopfung Hausmittel Verstopfung was hilft sofort',
  '/gesundheitsbibliothek/was-jetzt/tinnitus-neu-aufgetreten/': 'neues Ohrgeräusch was tun Tinnitus plötzlich Piepen im Ohr was tun',
  '/gesundheitsbibliothek/was-jetzt/heuschnupfen-akut/': 'was hilft sofort bei Heuschnupfen Pollenallergie akut Tipps',
  '/gesundheitsbibliothek/was-jetzt/fersenschmerzen/': 'was tun bei Fersenschmerzen Ferse schmerzt morgens erste Schritte',
  '/gesundheitsbibliothek/untersuchungen/emg/': 'Elektromyografie EMG Muskelmessung Nadelelektrode EMG Untersuchung',
  '/gesundheitsbibliothek/untersuchungen/stuhlanalyse/': 'Stuhlprobe Stuhltest Calprotectin Stuhlkultur Mikrobiom-Test Blut im Stuhl Test',
  '/beschwerden/venenschwaeche/': 'Venenschwäche chronische venöse Insuffizienz CVI Venenleiden schwache Venen',
  '/beschwerden/diabetes-typ-2/': 'Diabetes Typ 2 Typ-2-Diabetes Diabetes mellitus Typ 2 Zuckerkrankheit Insulinresistenz',
  '/beschwerden/gallensteine/': 'Gallensteine Gallenkolik Cholelithiasis Gallenblase Steine Gallenbeschwerden',
  '/beschwerden/lagerungsschwindel/': 'Lagerungsschwindel BPLS BPPV gutartiger Lagerungsschwindel Drehschwindel beim Umdrehen Epley',
  '/beschwerden/periorale-dermatitis/': 'Periorale Dermatitis Mundrose Ausschlag um den Mund Knötchen um den Mund Stewardessenkrankheit',
  '/beschwerden/seborrhoisches-ekzem/': 'Seborrhoisches Ekzem seborrhoische Dermatitis Schuppen Kopfhaut Rötung Nasenflügel fettige Schuppen',
  '/beschwerden/kreisrunder-haarausfall/': 'Kreisrunder Haarausfall Alopecia areata runde kahle Stellen autoimmuner Haarausfall',
  '/beschwerden/skoliose/': 'Skoliose Wirbelsäulenverkrümmung schiefe Wirbelsäule Cobb-Winkel',
  '/beschwerden/koxarthrose/': 'Koxarthrose Hüftarthrose Coxarthrose Arthrose Hüfte Hüftgelenksarthrose Leistenschmerz',
  '/beschwerden/panikattacken/': 'Panikattacken Panikstörung Panikanfall plötzliche Angst Herzrasen Angstattacke',
  '/beschwerden/nierensteine/': 'Nierensteine Nierenkolik Harnleiterstein Nephrolithiasis Harnsteine Flankenschmerz',
  '/beschwerden/me-cfs/': 'ME/CFS chronisches Fatigue-Syndrom myalgische Enzephalomyelitis CFS Post-Exertional Malaise PEM chronische Erschöpfung Krankheit',
  '/beschwerden/bakerzyste/': 'Bakerzyste Baker-Zyste Poplitealzyste Schwellung Kniekehle Zyste Knie',
  '/beschwerden/niedriger-blutdruck/': 'Niedriger Blutdruck Hypotonie Blutdruck zu niedrig Kreislaufschwäche Schwarzwerden vor Augen',
  '/beschwerden/erektile-dysfunktion/': 'Erektile Dysfunktion Erektionsstörung Potenzprobleme Impotenz Erektionsprobleme',
  '/beschwerden/eierstockzyste/': 'Eierstockzyste Ovarialzyste Zyste Eierstock Unterbauchschmerzen Zyste',
  '/beschwerden/kubitaltunnelsyndrom/': 'Kubitaltunnelsyndrom Sulcus-ulnaris-Syndrom Ulnarisrinne Kribbeln Kleinfinger Ringfinger Ellennerv Musikantenknochen',
  '/beschwerden/vitiligo/': 'Vitiligo Weissfleckenkrankheit weisse Flecken Haut Pigmentstörung Depigmentierung',
  '/beschwerden/scheidentrockenheit/': 'Scheidentrockenheit vaginale Trockenheit trockene Scheide Brennen intim Schmerzen beim Sex Trockenheit',
  '/koerpersignale/druck-auf-der-brust/': 'Druck auf der Brust Engegefühl Brust Brustenge Brustdruck',
  '/koerpersignale/lymphknoten-geschwollen-hals/': 'Lymphknoten geschwollen Hals geschwollene Lymphknoten Knoten am Hals Lymphknotenschwellung',
  '/koerpersignale/appetitlosigkeit/': 'Appetitlosigkeit kein Appetit Appetitverlust kein Hunger',
  '/koerpersignale/belegte-zunge/': 'Belegte Zunge Zungenbelag weisser Belag Zunge gelbe Zunge',
  '/koerpersignale/blaue-flecken-ohne-grund/': 'Blaue Flecken ohne Grund Hämatome ohne Ursache blaue Flecken Beine leicht blaue Flecken',
  '/gesundheitsbibliothek/befunde-werte/folsaeure-zu-niedrig/': 'Folsäure zu niedrig Folsäuremangel Folat niedrig Folatmangel Vitamin B9',
  '/gesundheitsbibliothek/befunde-werte/blut-im-urin/': 'Blut im Urin Hämaturie Haematurie roter Urin Mikrohämaturie',
  '/gesundheitsbibliothek/befunde-werte/leukozyten-im-urin/': 'Leukozyten im Urin weisse Blutkörperchen Urin Leukozyturie',
  '/gesundheitsbibliothek/befunde-werte/eiweiss-im-urin/': 'Eiweiss im Urin Proteinurie Albuminurie Protein im Urin schäumender Urin',
  '/gesundheitsbibliothek/befunde-werte/amh-wert/': 'AMH Anti-Müller-Hormon Eizellreserve ovarielle Reserve AMH niedrig AMH hoch',
  '/gesundheitsbibliothek/befunde-werte/prolaktin-erhoeht/': 'Prolaktin erhöht Hyperprolaktinämie Prolaktin zu hoch Prolaktinom',
  '/gesundheitsbibliothek/befunde-werte/fsh-wert/': 'FSH Wert FSH erhöht FSH niedrig follikelstimulierendes Hormon Zyklustag',
  '/gesundheitsbibliothek/befunde-werte/tpo-antikoerper-erhoeht/': 'TPO Antikörper Anti-TPO TPO-AK erhöht Schilddrüsenantikörper',
  '/gesundheitsbibliothek/befunde-werte/ft3-ft4/': 'fT3 fT4 freies T3 freies T4 freie Schilddrüsenhormone Schilddrüsenwerte',
  '/gesundheitsbibliothek/befunde-werte/transferrinsaettigung/': 'Transferrinsättigung TSAT Transferrin Eisenwert niedrig erhöht',
  '/gesundheitsbibliothek/befunde-werte/homa-index/': 'HOMA Index HOMA-IR HOMA2 Insulinresistenz Nüchterninsulin',
  '/gesundheitsbibliothek/befunde-werte/egfr/': 'eGFR GFR glomeruläre Filtrationsrate Nierenfunktion Nierenfilterleistung',
  '/gesundheitsbibliothek/befunde-werte/cystatin-c/': 'Cystatin C Cystatin-C-Wert Cystatin C erhöht Nierenwert',
  '/gesundheitsbibliothek/untersuchungen/helicobacter-test/': 'Helicobacter Test H. pylori Test Harnstoff-Atemtest Stuhl-Antigentest Magenkeim',
  '/gesundheitsbibliothek/untersuchungen/zoeliakie-test/': 'Zöliakie Test Zöliakie Bluttest Transglutaminase Antikörper Glutenunverträglichkeit Test',
  '/gesundheitsbibliothek/untersuchungen/hpv-test/': 'HPV Test HPV positiv HPV negativ Humane Papillomaviren Gebärmutterhals',
  '/gesundheitsbibliothek/befunde-werte/retikulozyten/': 'Retikulozyten erhöht niedrig Retikulozytenzahl junge rote Blutkörperchen',
  '/gesundheitsbibliothek/befunde-werte/albumin-zu-niedrig/': 'Albumin niedrig Albumin im Blut zu niedrig Hypoalbuminämie Eiweiss im Blut',
  '/gesundheitsbibliothek/befunde-werte/homocystein-erhoeht/': 'Homocystein erhöht Homocystein zu hoch Hyperhomocysteinämie',
  '/gesundheitsbibliothek/befunde-werte/inr-quick/': 'INR Wert Quick Wert Prothrombinzeit Gerinnung Blutverdünner Kontrolle',
  '/gesundheitsbibliothek/befunde-werte/aptt/': 'aPTT PTT verlängert partielle Thromboplastinzeit Gerinnungstest',
  '/gesundheitsbibliothek/befunde-werte/nt-probnp/': 'NT-proBNP BNP erhöht Herzschwäche Laborwert Herzinsuffizienz Marker',
  '/gesundheitsbibliothek/befunde-werte/d-dimere-erhoeht/': 'D-Dimere erhöht D-Dimer Test Thrombose Laborwert',
  '/gesundheitsbibliothek/untersuchungen/biopsie/': 'Biopsie Gewebeprobe Gewebeentnahme Histologie Punktion',
  '/gesundheitsbibliothek/befunde-werte/psa-wert/': 'psa erhöht psa blutwert prostataspezifisches antigen Gesamt-PSA im Befundkontext',
  '/gesundheitsbibliothek/befunde-werte/cortisol-wert/': 'cortisol erhöht cortisol niedrig kortisol wert',
  '/gesundheitsbibliothek/befunde-werte/progesteron-wert/': 'progesteron zu niedrig progesteron blutwert progesteron zyklustag',
  '/gesundheitsbibliothek/befunde-werte/estradiol-wert/': 'estradiol östradiol wert e2 wert östrogen wert nur Laborfrage',
  '/gesundheitsbibliothek/befunde-werte/testosteron-wert/': 'testosteron niedrig testosteron erhöht gesamt testosteron',
  '/gesundheitsbibliothek/befunde-werte/zink-wert/': 'zink blutwert zink im serum zink wert niedrig',
  '/gesundheitsbibliothek/befunde-werte/holotranscobalamin/': 'holo tc holo-tc aktives vitamin b12 holotranscobalamin niedrig',
  '/gesundheitsbibliothek/befunde-werte/vitamin-b6-wert/': 'vitamin b6 erhöht b6 wert plp pyridoxal-5-phosphat',
  '/gesundheitsbibliothek/untersuchungen/spermiogramm/': 'ejakulatanalyse sperma untersuchung samenanalyse',
  '/gesundheitsbibliothek/untersuchungen/hysteroskopie/': 'gebärmutterspiegelung uterusspiegelung',
  '/gesundheitsbibliothek/untersuchungen/lumbalpunktion/': 'liquorentnahme nervenwasser untersuchung spinal tap',
  '/gesundheitsbibliothek/untersuchungen/leberelastografie/': 'leberelastographie fibroscan lebersteifigkeit messen',
  '/gesundheitsbibliothek/fragen/akupunktur-herzschrittmacher/': 'akupunktur schrittmacher elektroakupunktur pacemaker akupunktur defibrillator nur Sicherheit',
  '/gesundheitsbibliothek/fragen/akupunktur-waehrend-chemotherapie/': 'akupunktur chemo sicherheit akupunktur krebstherapie abstimmung',
  '/gesundheitsbibliothek/fragen/akupunktur-diabetes-sicherheit/': 'akupunktur diabetes sicherheit akupunktur diabetiker termin',
  '/gesundheitsbibliothek/untersuchungen/ogtt/': 'oGTT Glukosetoleranztest Zuckerbelastungstest Glukosebelastungstest Schwangerschaftsdiabetes Test',
  '/gesundheitsbibliothek/untersuchungen/mammographie/': 'Mammographie Mammografie Brustkrebs Früherkennung Röntgen Brust Screening',
  '/gesundheitsbibliothek/untersuchungen/pap-abstrich/': 'Pap-Abstrich Pap-Test Krebsabstrich Gebärmutterhalsabstrich Zervixabstrich HPV',
  '/beschwerden/adenomyose/': 'Adenomyose Gebärmutterwand starke Regelschmerzen starke Blutungen',
  '/beschwerden/sibo/': 'SIBO Dünndarmfehlbesiedlung bakterielle Fehlbesiedlung Blähbauch',
  '/beschwerden/laktoseintoleranz/': 'Laktoseintoleranz Milchzucker Laktase Unverträglichkeit Milch',
  '/beschwerden/fruktoseintoleranz/': 'Fruktoseintoleranz Fruktosemalabsorption Fruchtzucker Unverträglichkeit',
  '/beschwerden/zoeliakie/': 'Zöliakie Gluten glutenfrei Glutenunverträglichkeit',
  '/beschwerden/divertikulitis/': 'Divertikulitis Divertikel Divertikulose linker Unterbauch',
  '/beschwerden/gastroparese/': 'Gastroparese verzögerte Magenentleerung Völlegefühl Übelkeit',
  '/beschwerden/funktionelle-dyspepsie/': 'Funktionelle Dyspepsie Reizmagen Oberbauchbeschwerden Magendruck',
  '/beschwerden/vaginismus/': 'Vaginismus Beckenbodenanspannung Schmerzen Penetration Tampon',
  '/beschwerden/vulvodynie/': 'Vulvodynie Vulvaschmerzen Brennen intim chronisch',
  '/beschwerden/dyspareunie/': 'Dyspareunie Schmerzen beim Geschlechtsverkehr Schmerzen beim Sex',
  '/beschwerden/interstitielle-zystitis/': 'Interstitielle Zystitis Blasenschmerzsyndrom Bladder Pain Syndrome Harndrang ohne Infekt',
  '/beschwerden/pmdd/': 'PMDD prämenstruelle dysphorische Störung schweres PMS Zyklus Stimmung',
  '/beschwerden/schilddruesenueberfunktion/': 'Schilddrüsenüberfunktion Hyperthyreose Morbus Basedow Schilddrüse',
  '/beschwerden/morbus-bechterew/': 'Morbus Bechterew axiale Spondyloarthritis entzündlicher Rückenschmerz',
  '/beschwerden/spondylose/': 'Spondylose degenerative Veränderungen Wirbelsäule Verschleiss',
  '/beschwerden/gonarthrose/': 'Gonarthrose Kniearthrose Arthrose Knie Knorpel',
  '/beschwerden/impingement-syndrom/': 'Impingement-Syndrom Schulter Schulterdach Rotatorenmanschette Engpass',
  '/beschwerden/patellaspitzensyndrom/': 'Patellaspitzensyndrom Jumpers Knee Springerknie Patellasehne',
  '/beschwerden/costochondritis/': 'Costochondritis Rippenknorpel Brustbein Brustwandschmerz',
  '/koerpersignale/heiserkeit-ohne-erkaeltung/': 'heiser ohne Erkältung Heiserkeit Stimme weg rauhe Stimme Stimmlippen',
  '/gesundheitsbibliothek/tcm-verstehen/meridiane-punkte/hegu/': 'Hegu LI4 Di4 Hegu-Punkt Akupunkturpunkt Hand',
  '/gesundheitsbibliothek/tcm-verstehen/meridiane-punkte/ren-mai/': 'Ren Mai Konzeptionsgefäss Konzeptionsgefäß ausserordentliche Leitbahn',
  '/gesundheitsbibliothek/untersuchungen/belastungs-ekg/': 'Ergometrie Belastungstest EKG unter Belastung Fahrradergometer',
  '/gesundheitsbibliothek/untersuchungen/hormontest/': 'Hormone testen Hormonstatus Hormonwerte Cortisol Hormonpanel',
  '/beschwerden/schilddruesenunterfunktion/': 'Hypothyreose Schilddrüse Unterfunktion Unterfunktion Schilddrüse Schilddruese',
  '/haut/altersflecken/': 'Pigmentflecken Alter Lentigines Sonnenflecken Handrücken Flecken',
  '/wissen/narbenbehandlung/': 'Narben Narbenmassage Narbenpflege Narbe verhärtet',
  '/koerpersignale/eingerissene-mundwinkel/': 'Mundwinkelrhagaden Faulecken Cheilitis angularis Mundwinkel rissig',
  '/koerpersignale/bruechige-naegel/': 'Nägel splittern Nagelrillen brüchige Fingernägel Naegel bruechig',
  '/koerpersignale/muskelzucken/': 'Faszikulationen Muskelzuckungen Zucken Muskel',
  '/koerpersignale/schmerzen-solarplexus/': 'Solarplexus Druck Magengrube Schmerz Oberbauch Mitte',
  '/koerpersignale/juckreiz-nach-dem-duschen/': 'Juckreiz Duschen aquagener Pruritus Haut juckt nach Wasser',
  '/beschwerden/fazialisparese/': 'Bell Parese Bell-Parese Gesichtslähmung Gesichtslaehmung Facialisparese',
  '/beschwerden/morbus-meniere/': 'Meniere Morbus Meniere Menière Meniere Syndrom Drehschwindel Ohrdruck',
  '/beschwerden/schlafapnoe/': 'Atemaussetzer nachts Atempausen Schlaf obstruktive Schlafapnoe Schnarchen',
  '/beschwerden/lipoedem/': 'Lipödem Lipoedem schmerzhafte Beine Fettverteilung',
  '/beschwerden/rheumatoide-arthritis/': 'chronische Polyarthritis entzündliches Rheuma RA',
  '/beschwerden/crps/': 'Morbus Sudeck komplexes regionales Schmerzsyndrom Sudeck',
  '/beschwerden/interkostalneuralgie/': 'Intercostalneuralgie Nervenschmerz Rippen Nervenschmerzen Brustkorb',
  '/beschwerden/bettnaessen/': 'Bettnässen Enuresis Enuresis nocturna nachts einnässen Kind',
  '/therapien/akupunktur/schaedelakupunktur/': 'Skalpakupunktur scalp acupuncture Kopfhaut Akupunktur',
  '/therapien/akupunktur/ynsa/': 'Yamamoto Akupunktur Yamamoto Neue Schädelakupunktur',
  '/therapien/akupunktur/bauchakupunktur/': 'Abdominalakupunktur abdominal acupuncture Akupunktur Bauch',
  '/therapien/akupunktur/laserakupunktur/': 'Laser Akupunktur Akupunktur ohne Nadeln Lichtakupunktur',
  '/gesundheitsbibliothek/tcm-verstehen/grundlagen/organuhr-leber/': 'Organuhr Leber Zeit 1 bis 3 Uhr aufwachen Leberzeit',
  '/gesundheitsbibliothek/tcm-verstehen/grundlagen/wei-qi/': 'Wei Qi Abwehr Qi Abwehrenergie TCM',
  '/gesundheitsbibliothek/tcm-verstehen/grundlagen/jing/': 'Jing Essenz TCM Niere Essenz vorgeburtlich',
  '/gesundheitsbibliothek/tcm-verstehen/grundlagen/shen/': 'Shen Geist TCM Herz Bewusstsein',
  '/gesundheitsbibliothek/befunde-werte/erythrozyten-erhoeht/': 'rote Blutkörperchen erhöht Erythrozytenzahl hoch Polyglobulie Verdacht',
  '/gesundheitsbibliothek/befunde-werte/haematokrit-niedrig/': 'Hämatokrit zu niedrig HKT niedrig Zellanteil Blut',
  '/gesundheitsbibliothek/befunde-werte/rdw-erhoeht/': 'RDW zu hoch Anisozytose Erythrozytenverteilungsbreite',
  '/gesundheitsbibliothek/befunde-werte/mch-erhoeht/': 'MCH zu hoch HbE erhöht mittlerer Hämoglobingehalt',
  '/gesundheitsbibliothek/befunde-werte/lipoprotein-a-erhoeht/': 'Lp(a) erhöht Lipoprotein klein a hoch Lpa Wert',
  '/gesundheitsbibliothek/befunde-werte/harnstoff-niedrig/': 'Harnstoff zu niedrig Urea niedrig Harnstoffwert tief',
  '/gesundheitsbibliothek/befunde-werte/triglyceride-erhoeht/': 'Triglyceride zu hoch Blutfette erhöht Hypertriglyceridämie',
  '/gesundheitsbibliothek/befunde-werte/ldl-erhoeht/': 'LDL zu hoch LDL Cholesterin erhöht schlechtes Cholesterin',
  '/gesundheitsbibliothek/befunde-werte/hdl-niedrig/': 'HDL zu niedrig gutes Cholesterin niedrig',
  '/gesundheitsbibliothek/befunde-werte/kalium-niedrig/': 'Kalium zu niedrig Hypokaliämie Kaliummangel Blutwert',
  '/gesundheitsbibliothek/befunde-werte/natrium-zu-niedrig/': 'Natrium niedrig Hyponatriämie Natriummangel Blut',
  '/gesundheitsbibliothek/befunde-werte/magnesium-zu-niedrig/': 'Magnesium niedrig Magnesiummangel Blutwert Hypomagnesiämie',
  '/gesundheitsbibliothek/befunde-werte/ck-erhoeht/': 'Kreatinkinase erhöht CK Wert zu hoch Muskelenzym',
  '/gesundheitsbibliothek/befunde-werte/bsg-erhoeht/': 'Blutsenkung erhöht BSG zu hoch Senkung beschleunigt Blutsenkungsgeschwindigkeit',
  '/koerpersignale/harter-oberbauch-ohne-schmerzen/': 'Oberbauch hart gespannt aufgebläht ohne Schmerzen',
  '/gesundheitsbibliothek/tcm-verstehen/meridiane-punkte/akupunkturpunkte/': 'Akupunktur Punkte Punktauswahl Dickdarm 4 Leitbahn Punkte',
  '/gesundheitsbibliothek/was-jetzt/akuter-hexenschuss/': 'was tun bei Hexenschuss Hexenschuss Sofortmassnahmen erste Hilfe Rücken',
  '/gesundheitsbibliothek/was-jetzt/ischias-schmerzen/': 'was tun bei Ischias was hilft bei Ischiasschmerzen',
  '/gesundheitsbibliothek/was-jetzt/nackenschmerzen-nach-dem-schlafen/': 'steifer Nacken was tun Nacken verlegen was hilft',
  '/gesundheitsbibliothek/was-jetzt/migraene-im-anflug/': 'was tun bei Migräne Migräneanfall was hilft schnell',
  '/gesundheitsbibliothek/was-jetzt/voellegefuehl-nach-dem-essen/': 'was hilft bei Völlegefühl was tun bei vollem Bauch',
  '/gesundheitsbibliothek/was-jetzt/blaehbauch-am-abend/': 'was tun bei Blähbauch was hilft bei Blähungen abends',
  '/gesundheitsbibliothek/was-jetzt/muskelverspannungen/': 'was hilft bei Verspannungen verspannte Muskeln lösen was tun',
  '/gesundheitsbibliothek/was-jetzt/knieschmerzen-nach-belastung/': 'was tun bei Knieschmerzen nach Sport Knie schmerzt was hilft',
  '/gesundheitsbibliothek/was-jetzt/schlafprobleme-heute-nacht/': 'kann nicht schlafen was tun was hilft beim Einschlafen',
  '/gesundheitsbibliothek/was-jetzt/leichter-schwindel/': 'was tun bei Schwindel was hilft bei Schwindelgefühl',
  '/gesundheitsbibliothek/befunde-werte/mcv-erhoeht/': 'MCV zu hoch Makrozytose grosser MCV Wert',
  '/gesundheitsbibliothek/befunde-werte/mcv-niedrig/': 'MCV zu niedrig Mikrozytose kleiner MCV Wert',
  '/gesundheitsbibliothek/befunde-werte/erythrozyten-niedrig/': 'rote Blutkörperchen zu niedrig Erythrozytenzahl niedrig',
  '/gesundheitsbibliothek/befunde-werte/leukozyten-niedrig/': 'Leukopenie weisse Blutkörperchen zu niedrig Leukozyten zu niedrig',
  '/gesundheitsbibliothek/befunde-werte/thrombozyten-niedrig/': 'Thrombopenie Thrombozytopenie Blutplättchen zu niedrig',
  '/gesundheitsbibliothek/befunde-werte/harnstoff-erhoeht/': 'Harnstoff zu hoch Urea erhöht Harnstoffwert',
  '/gesundheitsbibliothek/befunde-werte/mchc-niedrig/': 'MCHC zu niedrig niedriger MCHC Wert',
  '/gesundheitsbibliothek/befunde-werte/mchc-erhoeht/': 'MCHC zu hoch hoher MCHC Wert',
  '/gesundheitsbibliothek/befunde-werte/tsh-niedrig/': 'TSH zu niedrig niedriger TSH Wert Schilddrüse Überfunktion Verdacht',
  '/gesundheitsbibliothek/befunde-werte/haematokrit-erhoeht/': 'Hämatokrit zu hoch HKT erhöht Hämokonzentration',
  '/koerpersignale/dumpfes-gefuehl-im-ohr/': 'Wattegefühl Ohr dumpfes Hören Ohr fühlt sich dumpf an',
  '/koerpersignale/kribbeln-im-nacken/': 'Nacken kribbelt Ameisenlaufen Nacken Missempfindung',
  '/koerpersignale/harter-unterbauch/': 'Unterbauch hart gespannt Unterbauch fühlt sich hart an',
  '/koerpersignale/kribbeln-im-mund/': 'Mund kribbelt Kribbeln Gaumen Lippen Zunge',
  '/koerpersignale/taube-zunge/': 'Zunge taub pelzige Zunge Taubheitsgefühl Zunge',
  '/koerpersignale/warmes-gesicht-kalte-haende/': 'heisses Gesicht kalte Finger rotes Gesicht kalte Hände',
  '/koerpersignale/morgens-flacher-bauch-abends-dicker/': 'Bauch abends aufgebläht dicker Bauch am Abend',
  '/gesundheitsbibliothek/befunde-werte/kreatinin-erhoeht/': 'Kreatinin zu hoch Kreatininwert hoch Nierenwert Kreatinin eGFR',
  '/gesundheitsbibliothek/fragen/essen-vor-akupunktur/': 'nüchtern zur Akupunktur vor Akupunktur essen Frühstück Kaffee',
  '/gesundheitsbibliothek/fragen/kleidung-akupunktur/': 'was anziehen Akupunktur ausziehen Kleidung Termin',
  '/gesundheitsbibliothek/fragen/wie-lange-dauert-akupunktur/': 'Dauer Akupunktur Akupunkturbehandlung Termin Dauer Sitzungsdauer',
  '/gesundheitsbibliothek/fragen/wie-viele-akupunkturnadeln/': 'Anzahl Nadeln Akupunktur wie viele Nadeln',
  '/gesundheitsbibliothek/fragen/wie-tief-akupunkturnadeln/': 'wie tief Akupunktur Nadeln gestochen Einstichtiefe',
  '/gesundheitsbibliothek/fragen/angst-vor-akupunktur-nadeln/': 'Nadelangst Akupunktur Angst vor Spritzen Nadelphobie',
  '/gesundheitsbibliothek/fragen/ueberweisung-akupunktur/': 'Überweisung Akupunktur Rezept Verordnung ohne Überweisung',
  '/gesundheitsbibliothek/fragen/wie-oft-akupunktur/': 'wie häufig Akupunktur Abstände Behandlungsfrequenz wie oft',
  '/gesundheitsbibliothek/fragen/wann-wirkt-akupunktur/': 'wann hilft Akupunktur wie schnell wirkt Akupunktur Wirkung merken',
  '/gesundheitsbibliothek/fragen/sport-nach-akupunktur/': 'Training nach Akupunktur Fitness nach Akupunktur Sport machen nach Behandlung',
  '/gesundheitsbibliothek/fragen/schwimmen-nach-akupunktur/': 'Baden nach Akupunktur Schwimmbad Pool Sauna nach Akupunktur',
  '/gesundheitsbibliothek/fragen/alkohol-nach-akupunktur/': 'Wein Bier trinken nach Akupunktur Alkohol nach Behandlung',
  '/gesundheitsbibliothek/fragen/schmerzen-nach-akupunktur-schlimmer/': 'mehr Schmerzen nach Akupunktur stärkere Schmerzen Verschlimmerung nach Akupunktur',
  '/gesundheitsbibliothek/fragen/schroepfen-nebenwirkungen/': 'Schröpfen gefährlich Risiken Schröpfen Cupping Nebenwirkungen',
  '/gesundheitsbibliothek/fragen/tut-schroepfen-weh/': 'ist Schröpfen schmerzhaft Schmerzen beim Schröpfen Cupping Schmerz',
  '/gesundheitsbibliothek/fragen/tuina-nebenwirkungen/': 'Tuina Massage Nebenwirkungen Schmerzen nach Tuina Tuina Risiken',
  '/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/': 'chinesische Kräuter Nebenwirkungen TCM Arzneimittel Wechselwirkungen Kräuter Medikamente',
  '/gesundheitsbibliothek/fragen/tcm-kraeuter-erstverschlimmerung/': 'Verschlimmerung nach TCM Kräutern Kräuter Erstreaktion stärkere Beschwerden',
  '/koerpersignale/herzklopfen-nach-dem-essen/': 'Herzrasen nach dem Essen Puls nach Mahlzeit Palpitationen',
  '/gesundheitsbibliothek/befunde-werte/crp-erhoeht/': 'CRP Wert Entzündungswert C-reaktives Protein Blutwert Entzündung',
  '/gesundheitsbibliothek/befunde-werte/leukozyten-erhoeht/': 'weisse Blutkörperchen erhöht Blutbild Leukozytose',
  '/gesundheitsbibliothek/befunde-werte/tsh-erhoeht/': 'TSH Wert Schilddrüse Schilddrüsenwert fT4 Hypothyreose latent subklinisch',
  '/gesundheitsbibliothek/befunde-werte/cholesterin-erhoeht/': 'LDL HDL Cholesterinwert Blutfette Triglyceride Hypercholesterinämie',
  '/koerpersignale/kribbeln-im-gesicht/': 'Gesicht kribbelt Kribbelgefühl Gesicht taubes Gesicht Wange kribbelt',
  '/koerpersignale/schwindel-nach-dem-essen/': 'schwindlig nach Mahlzeit Kreislauf nach dem Essen',
  '/koerpersignale/druck-im-oberbauch/': 'Oberbauchdruck Druckgefühl Magen Oberbauch Engegefühl',
  '/koerpersignale/kribbeln-an-der-lippe/': 'Lippe kribbelt kribbelnde Lippe taube Lippe Lippenkribbeln',
  '/koerpersignale/beine-kribbeln-nachts/': 'Kribbeln Beine nachts Kribbeln in den Beinen unruhige Beine Ameisenlaufen Beine',
  '/koerpersignale/druck-hinter-den-augen/': 'Augendruck Druckgefühl Auge Stirn Druck hinter dem Auge',
  '/koerpersignale/fuss-schlaeft-staendig-ein/': 'Fuß schläft ein Fuss taub Fuss eingeschlafen Ameisenlaufen Fuss',
  '/gesundheitsbibliothek/fragen/nach-der-behandlung/': 'Erstverschlimmerung Beschwerden stärker nach Behandlung',
  '/koerpersignale/kalte-fuesse/': 'kalte füße füsse immer kalt füße immer kalt kalte Zehen',
  '/koerpersignale/kribbeln-im-koerper/': 'kribbeln am ganzen körper innerliches kribbeln ganzer körper kribbelt',
  '/koerpersignale/metallischer-geschmack-im-mund/': 'Metallgeschmack Geschmack nach Metall metallischer Mundgeschmack',
  '/koerpersignale/druck-auf-den-ohren/': 'Ohrendruck Druckgefühl Ohr beide Ohren Druck Ohr zu',
  '/koerpersignale/kribbeln-im-kopf/': 'Kopfhaut kribbelt Kribbeln Kopfhaut Kribbeln am Kopf',
  '/koerpersignale/zittern-am-ganzen-koerper/': 'Körper zittert Zittern ganzer Körper inneres Zittern',
  '/gesundheitsbibliothek/befunde-werte/leberwerte-erhoeht/': 'Leberwerte zu hoch erhöhte Leberwerte ALT AST GGT Bilirubin',
  '/gesundheitsbibliothek/befunde-werte/ferritin-zu-niedrig/': 'Ferritin niedrig Ferritinwert zu niedrig Eisenspeicher Eisenwert',
  '/gesundheitsbibliothek/befunde-werte/blutdruck-140-90/': 'Blutdruck 140 zu 90 140/90 Blutdruckwert 140 90',
  '/gesundheitsbibliothek/befunde-werte/blutzucker-erhoeht/': 'Blutzucker zu hoch erhöhter Blutzucker Zuckerwert Glukose',
  '/gesundheitsbibliothek/tcm-verstehen/grundlagen/qi/': 'qi chi qi bedeutung was ist qi',
  '/gesundheitsbibliothek/tcm-verstehen/grundlagen/yin-und-yang/': 'yin yang yin und yang yin yang bedeutung yin und yang bedeutung',
  '/gesundheitsbibliothek/tcm-verstehen/grundlagen/organuhr/': 'Organuhr TCM Organuhr chinesische Organuhr Organ Uhr',
  '/gesundheitsbibliothek/tcm-verstehen/grundlagen/fuenf-elemente/': 'fünf Elemente 5 Elemente Wandlungsphasen fünf Wandlungsphasen',
  '/gesundheitsbibliothek/tcm-verstehen/meridiane-punkte/meridiane/': 'Meridian Meridiane TCM Meridiane Leitbahnen',
  '/gesundheitsbibliothek/tcm-verstehen/muster/qi-mangel/': 'Qi-Mangel Qi Mangel TCM Energiemangel TCM',
  '/gesundheitsbibliothek/tcm-verstehen/muster/qi-stagnation/': 'Qi-Stagnation Qi Stagnation Qi-Stauung TCM',
  '/gesundheitsbibliothek/tcm-verstehen/muster/yin-mangel/': 'Yin-Mangel Yin Mangel TCM Yin Schwäche',
  '/gesundheitsbibliothek/tcm-verstehen/muster/yang-mangel/': 'Yang-Mangel Yang Mangel TCM Yang Schwäche',
  '/gesundheitsbibliothek/tcm-verstehen/muster/leber-qi-stagnation/': 'Leber-Qi-Stagnation Leber Qi Stagnation Leber-Qi TCM',
  '/gesundheitsbibliothek/tcm-verstehen/muster/milz-qi-mangel/': 'Milz-Qi-Mangel Milz Qi Mangel Milzschwäche Milz Schwäche TCM',
  '/gesundheitsbibliothek/tcm-verstehen/muster/blut-mangel/': 'Blut-Mangel Blut Mangel TCM Xue Mangel Blutmangel TCM',
  '/gesundheitsbibliothek/tcm-verstehen/muster/blut-stase/': 'Blut-Stase Blutstase Blut Stase Xue Stase Blutstagnation TCM',
  '/gesundheitsbibliothek/tcm-verstehen/muster/feuchtigkeit/': 'Feuchtigkeit TCM Nässe TCM Feuchte Dampness',
  '/gesundheitsbibliothek/tcm-verstehen/muster/hitze/': 'Hitze TCM Hitze-Muster innere Hitze volle Hitze leere Hitze',
  '/gesundheitsbibliothek/tcm-verstehen/muster/kaelte/': 'Kälte TCM Kälte-Muster innere Kälte',
  '/gesundheitsbibliothek/tcm-verstehen/diagnostik/tcm-anamnese/': 'TCM Anamnese TCM Befunderhebung vier diagnostische Methoden Befragen Betrachten Hören Riechen Tasten',
  '/gesundheitsbibliothek/tcm-verstehen/diagnostik/tcm-diagnose/': 'TCM Diagnose Musterdiagnose Musterdifferenzierung Bian Zheng Acht Leitkriterien Ba Gang',
  '/gesundheitsbibliothek/tcm-verstehen/grundlagen/blut/': 'Blut TCM Xue TCM Blut Xue chinesische Medizin',
  '/gesundheitsbibliothek/tcm-verstehen/grundlagen/funktionskreise/': 'TCM Funktionskreise Funktionskreis Zang Fu Zang-Fu TCM Organe',
  '/gesundheitsbibliothek/tcm-verstehen/diagnostik/zungendiagnostik/': 'Zungendiagnostik Zungendiagnose TCM Zunge Zungenbelag',
  '/gesundheitsbibliothek/tcm-verstehen/diagnostik/pulsdiagnostik/': 'Pulsdiagnostik Pulsdiagnose TCM Puls Pulstasten',
  '/gesundheitsbibliothek/fragen/starke-reaktion-nach-akupunktur/': 'heftige Reaktion Verschlechterung nach Akupunktur Erstreaktion',
  '/gesundheitsbibliothek/fragen/akupunktur-nerv-getroffen/': 'Nerv getroffen Stromschlag Gefühl Akupunktur Nervenschädigung elektrisierend',
  '/gesundheitsbibliothek/fragen/akupunktur-nebenwirkungen/': 'Nebenwirkungen Akupunktur Risiken Komplikationen sicher',
  '/gesundheitsbibliothek/befunde-werte/gamma-gt-erhoeht/': 'Gamma GT GGT erhöht Gamma-GT zu hoch Leberenzym',
  '/gesundheitsbibliothek/befunde-werte/nierenwerte-erhoeht/': 'Nierenwerte Kreatinin erhöht eGFR niedrig Nierenfunktion',
  '/gesundheitsbibliothek/befunde-werte/hba1c-erhoeht/': 'HbA1c zu hoch Langzeitblutzucker Langzeitzucker erhöht',
  '/gesundheitsbibliothek/befunde-werte/bilirubin-erhoeht/': 'Bilirubin zu hoch Bilirubinwert Gelbfärbung Ikterus',
  '/gesundheitsbibliothek/befunde-werte/lymphozyten-erhoeht/': 'Lymphozyten zu hoch erhöhte Lymphozyten Lymphozytose Differenzialblutbild',
  '/gesundheitsbibliothek/befunde-werte/neutrophile-erhoeht/': 'Neutrophile zu hoch neutrophile Granulozyten erhöht Neutrophilie',
  '/gesundheitsbibliothek/befunde-werte/thrombozyten-erhoeht/': 'Thrombozyten zu hoch erhöhte Thrombozyten Thrombozytose Blutplättchen',
  '/gesundheitsbibliothek/befunde-werte/harnsaeure-erhoeht/': 'Harnsäure zu hoch erhöhte Harnsäure hoher Harnsäurewert Purine Gicht-Wert',
  '/gesundheitsbibliothek/befunde-werte/ferritin-erhoeht/': 'Ferritin zu hoch hoher Ferritinwert Eisenspeicher erhöht Eisenüberladung',
  '/gesundheitsbibliothek/befunde-werte/kalium-zu-hoch/': 'Kalium erhöht erhöhter Kaliumwert Hyperkaliämie Elektrolyte',
  '/gesundheitsbibliothek/befunde-werte/alkalische-phosphatase-erhoeht/': 'AP erhöht alkalische Phosphatase zu hoch Knochen Gallenwege',
  '/gesundheitsbibliothek/befunde-werte/gpt-alt-erhoeht/': 'GPT erhöht ALT erhöht GPT zu hoch ALT zu hoch ALAT Transaminasen',
  '/gesundheitsbibliothek/befunde-werte/got-ast-erhoeht/': 'GOT erhöht AST erhöht GOT zu hoch AST zu hoch ASAT Transaminasen',
  '/gesundheitsbibliothek/befunde-werte/vitamin-d-zu-niedrig/': 'Vitamin D Mangel Blutwert 25-OH-Vitamin-D niedrig Vitamin D Wert',
  '/gesundheitsbibliothek/befunde-werte/vitamin-b12-zu-niedrig/': 'Vitamin B12 Mangel Blutwert B12 Wert niedrig Cobalamin',
  '/wissen/schroepfmassage/': 'Schröpfmassage Cupping Massage bewegte Schröpfgläser',
  '/wissen/shiatsu-selbstbehandlung/': 'Shiatsu selbst machen Selbstakupressur Shiatsu zu Hause',
  '/gesundheitsbibliothek/befunde-werte/haemoglobin-zu-niedrig/': 'Hämoglobin niedrig Hb Wert zu niedrig niedriger Hämoglobinwert Blutarmut Anämie',
  '/gesundheitsbibliothek/befunde-werte/haemoglobin-zu-hoch/': 'Hämoglobin erhöht Hb Wert zu hoch hoher Hämoglobinwert Polyglobulie',
  '/gesundheitsbibliothek/befunde-werte/monozyten-erhoeht/': 'Monozyten zu hoch erhöhte Monozyten Monozytose',
  '/gesundheitsbibliothek/befunde-werte/eosinophile-erhoeht/': 'Eosinophile zu hoch erhöhte Eosinophile Eosinophilie',
  '/gesundheitsbibliothek/befunde-werte/basophile-erhoeht/': 'Basophile zu hoch erhöhte Basophile Basophilie',
  '/gesundheitsbibliothek/befunde-werte/ldh-erhoeht/': 'LDH zu hoch Laktatdehydrogenase erhöht LDH Wert',
  '/gesundheitsbibliothek/befunde-werte/lipase-erhoeht/': 'Lipase zu hoch Lipase Wert erhöht Bauchspeicheldrüse Wert',
  '/gesundheitsbibliothek/befunde-werte/amylase-erhoeht/': 'Amylase zu hoch Amylase Wert erhöht',
  '/gesundheitsbibliothek/befunde-werte/natrium-zu-hoch/': 'Natrium erhöht erhöhter Natriumwert Hypernatriämie',
  '/gesundheitsbibliothek/befunde-werte/calcium-zu-hoch/': 'Calcium erhöht Kalzium zu hoch Kalzium erhöht Hyperkalzämie',
  '/beschwerden/sodbrennen/': 'Reflux saures Aufstossen',
  '/beschwerden/migraene/': 'Kopfweh Aura',
  '/beschwerden/kopfschmerzen/': 'Kopfweh',
  '/beschwerden/spannungskopfschmerzen/': 'Kopfweh Druck',
  '/beschwerden/karpaltunnelsyndrom/': 'Hand eingeschlafen Kribbeln Taubheit',
  '/beschwerden/verstopfung/': 'Obstipation träger Darm',
  '/beschwerden/blaehungen/': 'Völlegefühl aufgeblähter Bauch',
  '/beschwerden/schwindel/': 'Vertigo Gleichgewicht',
  '/beschwerden/tinnitus/': 'Ohrgeräusch Pfeifen im Ohr',
  '/beschwerden/hexenschuss/': 'Lumbago akuter Kreuzschmerz',
  '/beschwerden/ischias/': 'Ischiasnerv Ausstrahlung Bein',
  '/beschwerden/zaehneknirschen/': 'Bruxismus CMD Kiefer',
  '/beschwerden/kieferschmerzen/': 'CMD Kiefergelenk',
  '/beschwerden/wechseljahre/': 'Menopause Klimakterium Wallungen',
  '/beschwerden/hitzewallungen/': 'Wallungen Schwitzen',
  '/beschwerden/schlafprobleme/': 'Insomnie Einschlafen Durchschlafen Schlafstörungen',
  '/beschwerden/stress-burnout/': 'Erschöpfung ausgebrannt',
  '/beschwerden/reizdarm/': 'IBS Reizdarmsyndrom Bauchschmerzen',
  '/beschwerden/rueckenschmerzen/': 'Kreuzschmerzen unterer Rücken LWS',
  '/beschwerden/nackenschmerzen/': 'HWS steifer Nacken Verspannung',
  '/beschwerden/bandscheibenvorfall/': 'Diskushernie Prolaps',
  '/beschwerden/tennisarm/': 'Ellbogen Epicondylitis',
  '/beschwerden/frozen-shoulder/': 'Schultersteife',
  '/beschwerden/restless-legs/': 'unruhige Beine RLS',
  '/beschwerden/durchblutungsstoerungen/': 'kalte Füsse kalte Hände',
  '/koerpersignale/finger-schlafen-ein/': 'Hand schläft ein Hand eingeschlafen Hand taub nachts kribbelnde Hand Kribbeln taub',
  '/koerpersignale/einzelne-finger-taub/': 'Taubheitsgefühl Kribbeln taube Fingerspitzen',
  '/koerpersignale/finger-morgens-steif/': 'Finger morgens steif morgens geschwollene Finger Morgensteifigkeit Hände',
  '/koerpersignale/herzschlag-im-ohr/': 'Puls im Ohr Pochen pulssynchron',
  '/koerpersignale/klossgefuehl-im-hals/': 'Globusgefühl Enge im Hals',
  '/koerpersignale/wadenkraempfe-nachts/': 'Muskelkrampf Wade',
  '/koerpersignale/nachtschweiss-ohne-fieber/': 'nachts schwitzen',
  '/koerpersignale/trockener-mund-nachts/': 'Mundtrockenheit Xerostomie',
  '/koerpersignale/druck-im-kopf-ohne-kopfschmerzen/': 'Benommenheit dumpfer Kopf Druck im Kopf ohne Schmerzen Kopfdruck ohne Schmerzen Druckgefühl keine Kopfschmerzen',
  '/therapien/akupunktur/': 'Nadeln TCM',
  '/therapien/schroepfen/': 'Cupping Schröpfgläser',
  '/therapien/tuina/': 'chinesische Massage',
  '/therapien/kraeutertherapie/': 'chinesische Kräuter Phytotherapie',
  '/therapien/moxibustion/': 'Moxa Wärmetherapie',
  '/therapien/gua-sha/': 'Schaben Faszien',
  '/beschwerden/kalkschulter/': 'Tendinosis calcarea Kalkdepot Schulter Kalk',
  '/beschwerden/achillessehnenentzuendung/': 'Achillodynie Achillessehne Ferse Sehne',
  '/koerpersignale/arm-schlaeft-nachts-ein/': 'taub Kribbeln eingeschlafen nachts',
  '/koerpersignale/voellegefuehl-nach-dem-essen/': 'schnell satt Magendruck voller Bauch',
  '/koerpersignale/blaehbauch-am-abend/': 'Blähbauch aufgeblähter Bauch Bloating gespannt',
  '/koerpersignale/nacken-morgens-steif/': 'steifer Nacken Morgensteifheit',
  '/koerpersignale/herzklopfen-im-liegen/': 'Herzrasen Palpitationen Herzstolpern nachts',
  '/koerpersignale/augenflimmern/': 'Flimmerskotom Aura Zickzacklinien Sehstörung',
  '/koerpersignale/zehen-kribbeln/': 'Ameisenlaufen taube Zehen Fuss',
  '/koerpersignale/schwindel-beim-buecken/': 'Lagerungsschwindel Drehschwindel',
  '/koerpersignale/haeufiger-harndrang-nachts/': 'nachts oft Wasser lassen nächtlicher Harndrang Nykturie Nocturie',
  '/koerpersignale/ploetzlicher-harndrang-ohne-volle-blase/': 'überaktive Blase Dranginkontinenz ständig auf die Toilette',
  '/koerpersignale/druckgefuehl-im-unterbauch/': 'Schweregefühl Becken Unterleib Druck',
  '/koerpersignale/bauch-fuehlt-sich-hart-an/': 'harter Bauch gespannter Bauch aufgebläht',
  '/koerpersignale/magendruck-im-liegen/': 'Magendrücken nachts Sodbrennen im Liegen Reflux',
  '/koerpersignale/kribbeln-vom-nacken-in-den-arm/': 'Ausstrahlung Arm HWS Nervenwurzel Brennen Schulter',
  '/koerpersignale/kopfdruck-beim-buecken/': 'Druck hinter der Stirn Nebenhöhlen Stirndruck vornüberbeugen',
  '/koerpersignale/herzstolpern-in-ruhe/': 'Extrasystolen Herzaussetzer Extraschläge unregelmässiger Herzschlag',
  '/koerpersignale/stinkende-blaehungen/': 'übel riechende Blähungen Darmgase Schwefel Winde',
  '/koerpersignale/durchfall-am-morgen/': 'weicher Stuhl morgens flüssiger Stuhlgang gastro-kolischer Reflex',
  '/koerpersignale/kalte-haende-trotz-waerme/': 'kalte Finger schlechte Durchblutung Hände',
  '/koerpersignale/schnarchen-jede-nacht/': 'Schnarchen Atemaussetzer Schlafapnoe laut',
  '/koerpersignale/juckreiz-nachts-ohne-ausschlag/': 'Jucken nachts Hautjucken Pruritus trockene Haut',
  '/koerpersignale/trockener-husten/': 'Reizhusten Hustenreiz Husten ohne Auswurf Kratzen im Hals',
  '/koerpersignale/verstopfte-nase-ohne-erkaeltung/': 'Schnupfen Rhinitis Nase zu Dauerschnupfen Nasenspray',
  '/wissen/kopfschmerzen-wetterumschwung/': 'Wetterfühligkeit Föhn Wetterwechsel Luftdruck Kopfweh',
  '/wissen/muedigkeit-im-herbst/': 'Zeitumstellung Winterblues Herbstmüdigkeit Antriebslosigkeit Tageslicht',
  '/wissen/heizungsluft-trockene-schleimhaeute/': 'Heizungsluft trockene Nase trockene Augen spröde Lippen Luftfeuchtigkeit',
  '/wissen/erkaeltung-im-anflug/': 'Erkältung beginnt Halskratzen Frösteln grippaler Infekt',
  '/wissen/erkaeltung-grippe-allergie/': 'Grippe Influenza Allergie Unterschied Schnupfen',
  '/wissen/akupunktur-bei-knieschmerzen/': 'Akupunktur Knieschmerzen Kniearthrose Gonarthrose Arthrose Knie',
  '/wissen/akupunktur-bei-schulterschmerzen/': 'Akupunktur Schulterschmerzen Frozen Shoulder Kalkschulter Impingement',
  '/wissen/akupunktur-bei-wechseljahresbeschwerden/': 'Akupunktur Wechseljahre Hitzewallungen Menopause Wechseljahresbeschwerden',
  '/wissen/akupunktur-bei-menstruationsbeschwerden/': 'Akupunktur Menstruationsbeschwerden Regelschmerzen Dysmenorrhoe PMS',
  '/wissen/akupunktur-bei-tennisarm/': 'Akupunktur Tennisarm Golferarm Epicondylitis Ellenbogen',
  '/wissen/akupunktur-bei-fersensporn/': 'Akupunktur Fersensporn Plantarfasziitis Fersenschmerz',
  '/wissen/akupunktur-bei-kieferschmerzen/': 'Akupunktur Kieferschmerzen CMD Kiefergelenk Zähneknirschen',
  '/wissen/akupunktur-bei-reizdarm/': 'Akupunktur Reizdarm Reizdarmsyndrom Bauchschmerzen Blähungen',
  '/wissen/akupunktur-bei-karpaltunnelsyndrom/': 'Akupunktur Karpaltunnelsyndrom Karpaltunnel Hand kribbeln',
  '/wissen/akupunktur-bei-uebelkeit/': 'Akupunktur Übelkeit Akupressur P6 Neiguan Akupressurband',
  '/wissen/akupunktur-bei-verstopfung/': 'akupunktur verstopfung elektroakupunktur verstopfung',
  '/wissen/akupunktur-bei-prostatitis/': 'akupunktur cpps akupunktur chronische prostatitis akupunktur nichtbakterieller männlicher beckenschmerz',
  '/wissen/akupunktur-bei-angststoerungen/': 'akupunktur angst akupunktur angststörung',
  '/wissen/akupunktur-bei-depressionen/': 'akupunktur depression akupunktur depressive symptome',
  '/wissen/akupunktur-bei-reizblase/': 'akupunktur überaktive blase akupunktur oab',
  '/beschwerden/schnappfinger/': 'Triggerfinger schnellender Finger Tendovaginitis stenosans',
  '/beschwerden/steissbeinschmerzen/': 'Kokzygodynie Steissbein Steißbein Schmerzen beim Sitzen',
  '/beschwerden/tarsaltunnelsyndrom/': 'Tarsaltunnel Fusssohle Brennen Kribbeln Innenknöchel',
  '/beschwerden/meralgia-paraesthetica/': 'Meralgia paresthetica Oberschenkel taub Brennen Aussenseite',
  '/beschwerden/trockene-augen/': 'Sicca Augentrockenheit brennende Augen Fremdkörpergefühl',
  '/beschwerden/bizepssehnenentzuendung/': 'Bizepssehne Bizeps Tendinitis Schulter vorne',
  '/beschwerden/patellofemorales-schmerzsyndrom/': 'Kniescheibe Schmerz hinter der Kniescheibe Schmerz um die Kniescheibe',
  '/beschwerden/pudendusneuralgie/': 'Pudendus Damm Beckenschmerz Sitzen',
  '/beschwerden/beckenbodenverspannung/': 'verspannter Beckenboden überaktiver Beckenboden Beckenschmerzen',
  '/beschwerden/meniskusriss/': 'Meniskus Meniskusschaden Knie verdreht',
  '/beschwerden/thoracic-outlet-syndrom/': 'TOS Halsrippe Arm Kribbeln',
  '/beschwerden/chronischer-husten/': 'Husten länger als acht Wochen langer Husten',
  '/beschwerden/hallux-rigidus/': 'Hallux rigidus Grosszehenarthrose Grosszehengrundgelenk steif',
  '/beschwerden/laeuferknie/': 'Läuferknie Iliotibialband-Syndrom ITBS Knie aussen Laufen',
  '/beschwerden/schienbeinkantensyndrom/': 'Schienbeinkantensyndrom Shin Splints mediales tibiales Stresssyndrom Schienbein',
  '/beschwerden/gluteale-tendinopathie/': 'Gluteale Tendinopathie Glutealsehnen Trochanter Hüfte aussen Seitenliegen',
  '/beschwerden/tfcc-laesion/': 'TFCC Läsion Discus triangularis Handgelenk Kleinfingerseite ulnar',
  '/beschwerden/proximale-hamstring-tendinopathie/': 'Proximale Hamstring-Tendinopathie Sitzbeinhöcker Hamstring-Ansatz',
  '/beschwerden/adduktorentendinopathie/': 'Adduktorentendinopathie Adduktoren Leiste Schambein',
  '/beschwerden/peronealsehnen-tendinopathie/': 'Peronealsehnen Aussenknöchel Schnappen Peroneus Riss Subluxation',
  '/beschwerden/tibialis-posterior-tendinopathie/': 'Tibialis posterior Innenknöchel PTTD',
  '/beschwerden/metatarsalgie/': 'Metatarsalgie Vorfussschmerz Fussballen Spreizfuss',
  '/beschwerden/spondylolisthese/': 'Wirbelgleiten Spondylolisthese Gleitwirbel',
  '/beschwerden/psoriasis-arthritis/': 'Psoriasis-Arthritis Psoriasisarthritis Arthritis psoriatica Schuppenflechte Gelenke',
  '/beschwerden/dyshidrotisches-ekzem/': 'Dyshidrotisches Ekzem Pompholyx Dyshidrose Bläschen Hände Füsse',
  '/beschwerden/kontaktdermatitis/': 'Kontaktdermatitis Kontaktekzem Kontaktallergie',
  '/beschwerden/akne-inversa/': 'Akne inversa Hidradenitis suppurativa Abszesse Achsel Leiste Knoten',
  '/beschwerden/lichen-sclerosus/': 'Lichen sclerosus weisse Hautstellen Genital Juckreiz Vulva',
  '/beschwerden/vestibulaere-migraene/': 'Vestibuläre Migräne Migräneschwindel Schwindelattacken',
  '/beschwerden/vestibularisneuritis/': 'Vestibularisneuritis Neuritis vestibularis Gleichgewichtsnerv Entzündung Drehschwindel',
  '/beschwerden/hyperakusis/': 'Hyperakusis Geräuschüberempfindlichkeit Lärmempfindlichkeit',
  '/beschwerden/burning-mouth-syndrom/': 'Burning-Mouth-Syndrom Mundbrennen Glossodynie Stomatodynie',
  '/beschwerden/okzipitalneuralgie/': 'Okzipitalneuralgie Occipitalneuralgie Hinterkopfschmerz Nervus occipitalis Hinterhauptnerv Nervenblockade ICHD-3 Neuralgie',
  '/beschwerden/zervikogener-kopfschmerz/': 'zervikogener Kopfschmerz cervicogener Kopfschmerz Halswirbelsäule Nacken Kopfschmerz ICHD-3 11.2.1 Provokationstest diagnostische Blockade',
  '/beschwerden/zervikale-radikulopathie/': 'zervikale Radikulopathie Radikulopathie Halswirbelsäule Nervenwurzel HWS eingeklemmter Nerv Nacken-Arm-Schmerz Zervikobrachialgie Foramenstenose',
  '/beschwerden/fasettensyndrom/': 'Fasettensyndrom Facettensyndrom Facettengelenk Fasettengelenk Wirbelgelenkarthrose Spondylarthrose Medial-Branch-Block Radiofrequenz-Denervation Rückenschmerz',
  '/beschwerden/hueftimpingement/': 'Hüftimpingement femoroazetabuläres Impingement FAI Leistenschmerz Hüfte Cam Pincer Labrum Arthroskopie',
  '/beschwerden/pes-anserinus-bursitis/': 'Pes-anserinus-Bursitis Bursitis anserina Knieinnenseite Schleimbeutel Knie Gänsefuss Sehnenansatz Schienbein',
  '/beschwerden/haglundferse/': 'Haglundferse Haglund-Deformität Haglund-Exostose Haglund-Syndrom hinterer Fersenschmerz Fersenhöcker Schuhdruck',
  '/beschwerden/sesamoiditis/': 'Sesamoiditis Sesambein Sesambeinentzündung Grosszehengrundgelenk Vorfussballen Schmerz unter der Grosszehe',
  '/beschwerden/radialtunnelsyndrom/': 'radialtunnelsyndrom radialissyndrom speichennerv nervus radialis posterior interosseus unterarmschmerz ellbogen frohse arkade supinator',
  '/beschwerden/loge-de-guyon-syndrom/': 'loge de guyon syndrom guyon kanal ulnartunnelsyndrom handgelenk ellennerv nervus ulnaris kleinfinger ringfinger kribbeln taubheit ganglion velofahren',
  '/beschwerden/plica-syndrom-knie/': 'plica syndrom knie mediopatellare plica schleimhautfalte synovialfalte knie schnappen klicken schmerz innen kniescheibe vorderer knieschmerz',
  '/beschwerden/quadrizepssehnen-tendinopathie/': 'quadrizepssehnen tendinopathie quadrizepssehne tendinose oberer kniescheibenpol patella sehne knie oben jumpers knee streckapparat belastungsschmerz',
  '/beschwerden/schnappende-huefte/': 'schnappende hüfte coxa saltans snapping hip syndrom hüfte knacken schnappen leiste tractus iliotibialis iliopsoas schleimbeutel',
  '/beschwerden/rektusdiastase/': 'rektusdiastase rectusdiastase diastasis recti abdominis bauchmuskelspalt bauchwand nach schwangerschaft geburt doming linea alba fingertest',
  '/beschwerden/symphysenschmerzen-schwangerschaft/': 'symphysenschmerzen schwangerschaft symphyse schambeinfuge schambein schmerzen schwanger beckengürtelschmerz pelvic girdle pain symphysenlockerung beckengurt',
  '/beschwerden/nummulaeres-ekzem/': 'nummuläres ekzem discoides ekzem nummuläre dermatitis münzförmig juckende herde unterschenkel ringelflechte abgrenzung',
  '/beschwerden/lichen-planus/': 'lichen ruber planus lichen planus knötchenflechte violette knötchen wickham streifen mundschleimhaut oraler lichen planus nagel kopfhaut planopilaris',
  '/beschwerden/notalgia-paraesthetica/': 'notalgia paraesthetica paresthetica juckreiz neben schulterblatt brauner fleck rücken neuropathischer juckreiz hautnerven brustwirbelsäule',
  '/beschwerden/brachioradialer-pruritus/': 'brachioradialer pruritus brachioradial pruritus juckreiz unterarm aussenseite brennen kribbeln eisbeutel zeichen sonne halswirbelsäule c5 c6 neuropathischer juckreiz',
  '/beschwerden/pppd/': 'pppd 3pd persistierender postural-perzeptiver schwindel persistent postural-perceptual dizziness chronischer schwankschwindel funktioneller schwindel phobischer schwankschwindel vestibuläre rehabilitation',
  '/wissen/chinesische-kraeuter-bei-schlafstoerungen/': 'Chinesische Kräuter Schlafstörungen Kräutertherapie Schlaf Einschlafen Durchschlafen',
  '/wissen/chinesische-kraeuter-bei-reizdarm/': 'Chinesische Kräuter Reizdarm Kräutertherapie Reizdarm Tongxie Yaofang',
  '/wissen/chinesische-kraeuter-bei-funktioneller-dyspepsie/': 'Chinesische Kräuter funktionelle Dyspepsie Reizmagen Kräutertherapie Oberbauch',
  '/wissen/chinesische-kraeuter-bei-verstopfung/': 'Chinesische Kräuter Verstopfung Kräutertherapie Verstopfung MaZiRenWan',
  '/wissen/chinesische-kraeuter-bei-regelschmerzen/': 'Chinesische Kräuter Regelschmerzen Kräutertherapie Dysmenorrhö Periode',
  '/wissen/chinesische-kraeuter-bei-allergischem-schnupfen/': 'Chinesische Kräuter Heuschnupfen allergischer Schnupfen Kräutertherapie Pollen Yu Ping Feng San',
  '/wissen/akupunktur-oder-kraeutertherapie/': 'Akupunktur oder Kräuter Methodenvergleich TCM Nadeln oder Rezeptur',
  '/wissen/tcm-granulat-dekokt-tabletten/': 'Granulat Dekokt Tabletten Kapseln Darreichungsform Kräuter Tee',
  '/wissen/chinesische-kraeuter-qualitaet-schweiz/': 'Qualität chinesische Kräuter Zulassung Swissmedic asiatische Arzneimittel',
  '/wissen/chinesische-kraeuter-online-kaufen-oder-verordnen/': 'Chinesische Kräuter online kaufen bestellen Versandapotheke Verordnung',
  // Entscheidungsfragen 21.10.2026
  '/wissen/akupunktur-oder-physiotherapie/': 'Akupunktur oder Physiotherapie Methodenvergleich aktive Rehabilitation Nadeln Verordnung',
  '/wissen/akupunktur-oder-osteopathie/': 'Akupunktur oder Osteopathie Osteopath Vergleich manuelle Behandlung Fachperson',
  '/wissen/akupunktur-oder-schroepfen/': 'Akupunktur oder Schröpfen Vergleich Nadeln Unterdruck Schröpfflecken',
  '/wissen/tuina-oder-physiotherapie/': 'Tuina oder Physiotherapie Vergleich manuelle Behandlung Rehabilitation Kreuzschmerzen',
  '/gesundheitsbibliothek/fragen/akupunktur-metallallergie/': 'Nickelallergie Metallallergie Akupunkturnadeln Edelstahl Nadelmaterial',
  '/gesundheitsbibliothek/fragen/tcm-kraeuter-einnahme/': 'Einnahmeplan TCM Kräuter einnehmen Dosierung Zubereitung Granulat Einnahme',
  '/gesundheitsbibliothek/fragen/tcm-kraeuter-und-pille/': 'Pille hormonelle Verhütung Antibabypille TCM Kräuter Wechselwirkung',
  '/gesundheitsbibliothek/fragen/akupunktur-mit-gelenkprothese/': 'Hüftprothese Knieprothese Gelenkersatz Metallimplantat Schrauben Platten Akupunktur',
  '/gesundheitsbibliothek/fragen/akupunktur-immunsuppression/': 'Immunsuppression Immunsuppressiva Transplantation Biologika Methotrexat Akupunktur',
  '/gesundheitsbibliothek/fragen/akupunktur-nach-operation/': 'Akupunktur nach Operation nach OP Wundheilung Nachsorge Termin',
  '/gesundheitsbibliothek/fragen/tcm-kraeuter-vor-operation/': 'Kräuter vor Operation Narkose Anästhesie absetzen OP-Team',
  '/gesundheitsbibliothek/fragen/akupunktur-nach-lymphknotenentfernung/': 'Lymphknotenentfernung Wächterlymphknoten Achsel Leiste betroffene Seite Nadeln Akupunktur Sicherheit',
  '/gesundheitsbibliothek/fragen/moxibustion-sicherheit/': 'Moxibustion Sicherheit Nebenwirkungen Verbrennung Rauch Moxa Risiken',
  '/gesundheitsbibliothek/fragen/tcm-kraeuter-immunsuppressiva/': 'Kräuter Immunsuppressiva Tacrolimus Ciclosporin Transplantation Wechselwirkung',
  // Artikelpaket 24.10.2026 (Suchhilfe, keine Ownership)
  '/wissen/akupunktur-bei-belastungsinkontinenz/': 'akupunktur belastungsinkontinenz stressinkontinenz elektroakupunktur urinverlust husten niesen',
  '/wissen/akupunktur-bei-rhizarthrose/': 'akupunktur rhizarthrose daumensattelgelenk daumenarthrose daumenschmerzen',
  '/wissen/akupunktur-bei-vulvodynie/': 'akupunktur vulvodynie vulvaschmerzen',
  '/wissen/akupunktur-bei-gastroparese/': 'akupunktur gastroparese magenlähmung diabetische gastroparese',
  '/wissen/akupunktur-bei-crps/': 'akupunktur crps morbus sudeck komplexes regionales schmerzsyndrom',
  '/wissen/akupunktur-bei-erektiler-dysfunktion/': 'akupunktur erektile dysfunktion erektionsstörungen potenzprobleme',
  '/wissen/akupunktur-bei-bettnaessen/': 'akupunktur bettnässen enuresis kinder laserakupunktur',
  '/wissen/schroepfen-oder-massage/': 'Schröpfen oder Massage Vergleich Unterdruck Verspannungen',
  '/wissen/akupunktur-oder-stosswellentherapie-tennisellenbogen/': 'Akupunktur oder Stosswellentherapie Stoßwelle ESWT Tennisarm Tennisellenbogen Vergleich',
  '/gesundheitsbibliothek/fragen/blutspenden-nach-akupunktur/': 'Blutspende Blut spenden nach Akupunktur Wartefrist SRK',
  '/gesundheitsbibliothek/fragen/tcm-kraeuter-leber/': 'Kräuter Leber Leberschaden He Shou Wu Polygonum Leberwerte TCM',
  '/gesundheitsbibliothek/fragen/tcm-kraeuter-bluthochdruck-sicherheit/': 'Kräuter Bluthochdruck Süssholz Lakritz Gan Cao Blutdruck TCM Sicherheit',
  // Neun-Artikel-Paket 21.10.2026 (Suchhilfe, keine Ownership)
  // Cluster-Paket 22.10.2026 (Suchhilfe, keine Ownership)
  '/wissen/chinesische-kraeuter-bei-pms/': 'chinesische kräuter pms tcm prämenstruelles syndrom',
  '/wissen/chinesische-kraeuter-bei-akne/': 'chinesische kräuter akne tcm kräutertherapie',
  '/wissen/chinesische-kraeuter-bei-reflux/': 'chinesische kräuter reflux tcm sodbrennen',
  '/wissen/chinesische-kraeuter-bei-angststoerungen/': 'chinesische kräuter angststörungen tcm generalisierte angststörung angst',
  '/wissen/chinesische-kraeuter-bei-depressionen/': 'chinesische kräuter depressionen tcm depression kräutertherapie',
  '/wissen/chinesische-kraeuter-bei-wiederkehrenden-blasenentzuendungen/': 'chinesische kräuter wiederkehrende blasenentzündungen tcm rezidivierende zystitis blasenentzündung vorbeugen',
  '/wissen/chinesische-kraeuter-bei-copd/': 'chinesische kräuter copd tcm stabile kräutertherapie',
  '/wissen/chinesische-kraeuter-bei-chronischer-sinusitis/': 'chinesische kräuter chronische sinusitis tcm rhinosinusitis kräutertherapie',
  '/wissen/akupunktur-bei-asthma/': 'akupunktur asthma bei stabilem ergänzend',
  '/wissen/akupunktur-bei-funktioneller-dyspepsie/': 'akupunktur funktionelle dyspepsie reizmagen postprandiales distress syndrom',
  '/wissen/akupunktur-bei-spinalkanalstenose/': 'akupunktur spinalkanalstenose lumbale neurogene claudicatio',
  '/wissen/akupunktur-bei-trigeminusneuralgie/': 'akupunktur trigeminusneuralgie elektroakupunktur bei',
  '/wissen/akupunktur-bei-akne/': 'akupunktur akne acne vulgaris gegen',
  '/wissen/akupunktur-bei-schuppenflechte/': 'akupunktur schuppenflechte psoriasis plaque',
  '/wissen/akupunktur-bei-rheumatoider-arthritis/': 'akupunktur rheumatoide arthritis chronische polyarthritis bei rheumatoider',
  '/wissen/akupunktur-bei-reflux/': 'akupunktur reflux gastroösophagealer sodbrennen',
  '/wissen/akupunktur-bei-chronischem-husten/': 'akupunktur chronischer husten bei chronischem refluxhusten',
  '/wissen/akupunktur-bei-lymphoedem/': 'akupunktur lymphödem armlymphödem nach brustkrebs bei',
  '/wissen/akupunktur-bei-post-zoster-neuralgie/': 'akupunktur post zoster neuralgie elektroakupunktur postherpetische nervenschmerzen nach gürtelrose',
  '/wissen/akupunktur-bei-schmerzen-nach-operation/': 'akupunktur postoperative schmerzen akute nach operation schmerzlinderung',
  '/wissen/chinesische-kraeuter-bei-migraene/': 'chinesische kräuter migräne kräutermedizin kräutertherapie vorbeugung',
  '/wissen/chinesische-kraeuter-bei-wechseljahresbeschwerden/': 'chinesische kräuter wechseljahre wechseljahresbeschwerden kräutermedizin menopausale beschwerden',
  '/wissen/chinesische-kraeuter-bei-neurodermitis/': 'chinesische kräuter neurodermitis kräutermedizin atopische dermatitis kräutertherapie atopisches ekzem',
  '/wissen/chinesische-kraeuter-bei-schuppenflechte/': 'chinesische kräuter schuppenflechte kräutermedizin psoriasis vulgaris kräutertherapie plaque',
  '/wissen/chinesische-kraeuter-bei-endometriose/': 'chinesische kräuter endometriose kräutermedizin kräutertherapie schmerzen',
  '/wissen/chinesische-kraeuter-bei-pcos/': 'chinesische kräuter pcos kinderwunsch kräutermedizin fruchtbarkeit kräutertherapie',
  '/wissen/akupunktur-bei-trockenen-augen/': 'akupunktur trockene augen trockenes auge nadelakupunktur dry eye',
  '/wissen/akupunktur-bei-krebsbedingter-fatigue/': 'akupunktur krebsbedingte fatigue cancer related erschöpfung nach krebstherapie',
  '/wissen/akupunktur-bei-copd/': 'akupunktur copd stabile belastungsatemnot',
  '/gesundheitsbibliothek/befunde-werte/ana-antikoerper/': 'ANA positiv antinukleäre Antikörper ANA Titer',
  '/gesundheitsbibliothek/befunde-werte/rheumafaktor/': 'RF Rheumafaktor positiv',
  '/gesundheitsbibliothek/befunde-werte/anti-ccp/': 'CCP ACPA Anti-CCP-Antikörper',
  '/gesundheitsbibliothek/befunde-werte/hla-b27/': 'HLA B27 positiv',
  '/gesundheitsbibliothek/befunde-werte/parathormon/': 'PTH Parathormon erhöht Nebenschilddrüse',
  '/gesundheitsbibliothek/befunde-werte/apolipoprotein-b/': 'ApoB Apo B',
  '/gesundheitsbibliothek/befunde-werte/haptoglobin/': 'Haptoglobin niedrig Hämolyse',
  '/gesundheitsbibliothek/befunde-werte/dheas-wert/': 'DHEA DHEAS DHEA-S',
  '/gesundheitsbibliothek/untersuchungen/laparoskopie/': 'Bauchspiegelung Schlüssellochoperation',
  '/gesundheitsbibliothek/untersuchungen/arthroskopie/': 'Gelenkspiegelung Kniespiegelung',
  '/gesundheitsbibliothek/untersuchungen/kapselendoskopie/': 'Kamerakapsel Videokapsel Dünndarm',
  '/gesundheitsbibliothek/untersuchungen/bronchoskopie/': 'Lungenspiegelung',
  '/gesundheitsbibliothek/untersuchungen/laryngoskopie/': 'Kehlkopfspiegelung Stroboskopie',
  '/gesundheitsbibliothek/untersuchungen/eileiterdurchgaengigkeit/': 'HSG HyCoSy Hysterosalpingografie Eileiter prüfen',
  '/wissen/akupunktur-bei-neurodermitis/': 'akupunktur atopische dermatitis akupunktur atopisches ekzem juckreiz',
  '/wissen/akupunktur-bei-sehnenscheidenentzuendung/': 'akupunktur de quervain akupunktur tendovaginitis',
  '/wissen/akupunktur-bei-achillessehnenbeschwerden/': 'akupunktur achillessehne akupunktur achillodynie',
  '/wissen/akupunktur-bei-wiederkehrenden-blasenentzuendungen/': 'akupunktur wiederkehrende blasenentzündungen akupunktur rezidivierende zystitis vorbeugen',
  '/wissen/akupunktur-bei-restless-legs/': 'akupunktur rls akupunktur unruhige beine',
  '/wissen/akupunktur-bei-fazialisparese/': 'akupunktur bell parese akupunktur periphere fazialisparese',
  '/wissen/akupunktur-bei-nesselsucht/': 'akupunktur urtikaria akupunktur quaddeln',
  '/wissen/akupunktur-bei-aromatasehemmer-gelenkschmerzen/': 'akupunktur aromatasehemmer akupunktur gelenkschmerzen brustkrebs',
  '/wissen/akupunktur-bei-ischias/': 'Akupunktur Ischias Ischiasschmerzen Nervenschmerz Bein ausstrahlend',
  '/wissen/akupunktur-bei-endometriose/': 'Akupunktur Endometriose Unterbauchschmerzen Regelschmerzen Zyklus',
  '/wissen/akupunktur-bei-fibromyalgie/': 'Akupunktur Fibromyalgie Elektroakupunktur Schmerzsyndrom Erschöpfung',
  '/wissen/akupunktur-bei-tinnitus/': 'Akupunktur Tinnitus Ohrgeräusch Pfeifen Rauschen HNO',
  '/wissen/akupunktur-bei-polyneuropathie/': 'Akupunktur Polyneuropathie Nervenschmerzen brennende Füsse Chemotherapie',
  '/wissen/akupunktur-bei-hueftschmerzen/': 'Akupunktur Hüftschmerzen Hüftarthrose Koxarthrose Hüfte',
  '/gesundheitsbibliothek/tcm-verstehen/': 'TCM Begriffe chinesische Medizin Lexikon Qi Yin Yang',
  '/gesundheitsbibliothek/tcm-verstehen/grundlagen/': 'Qi Yin Yang Fünf Elemente Organuhr TCM Ernährung Jing Shen',
  '/gesundheitsbibliothek/tcm-verstehen/muster/': 'Qi-Stagnation Qi-Mangel Leber-Qi Milz-Qi Yin-Mangel Yang-Mangel Blut-Mangel Blut-Stase Feuchtigkeit Hitze Kälte Syndrom',
  '/gesundheitsbibliothek/tcm-verstehen/meridiane-punkte/': 'Meridian Meridiane Akupunkturpunkte Akupressurpunkte Leitbahnen Lungenmeridian Hegu Neiguan',
  '/gesundheitsbibliothek/tcm-verstehen/diagnostik/': 'Zungendiagnose Pulsdiagnose Zungenbelag Anamnese TCM Diagnose',
  '/gesundheitsbibliothek/tcm-verstehen/methoden/': 'Moxa Gua Sha Schröpfen Akupressur Ohrakupunktur Kräuter Methoden Überblick',
  '/gesundheitsbibliothek/koerper/becken-blase/': 'Urologie Blase Unterleib Beckenboden',
  '/gesundheitsbibliothek/untersuchungen/nervenleitmessung/': 'NLG ENG Nervenmessung Nervenleitgeschwindigkeit Elektroneurografie EMG',
  '/gesundheitsbibliothek/koerper/bauch-verdauung/': 'Magen Darm Verdauung',
  '/gesundheitsbibliothek/koerper/hals-nacken/': 'HWS Halswirbelsäule',
  '/gesundheitsbibliothek/koerper/ruecken/': 'LWS Wirbelsäule Kreuz',
  '/gesundheitsbibliothek/koerper/schulter-arm-hand/': 'Ellbogen Handgelenk Finger',
  '/gesundheitsbibliothek/koerper/huefte-bein-fuss/': 'Knie Wade Ferse',
  '/gesundheitsbibliothek/koerper/zyklus-hormone/': 'Frauengesundheit Menstruation Menopause',
  // Trauma-Cluster 27.10.2026 (Draft): nur echte Synonyme/Schreibvarianten
  '/wissen/psychisches-trauma-behandlung/': "Trauma behandeln Traumabehandlung Traumatherapie seelisches Trauma",
  '/beschwerden/posttraumatische-belastungsstoerung/': "PTBS PTSD posttraumatische Belastungsstörung Posttraumatische Belastungsstoerung",
  '/beschwerden/komplexe-ptbs/': "kPTBS KPTBS CPTSD komplexe posttraumatische Belastungsstörung",
  '/wissen/trauma-kindheit-erwachsene/': "Kindheitstrauma belastende Kindheit Missbrauch in der Kindheit Vernachlässigung",
  '/wissen/hilfe-nach-gewalt-sexuellem-missbrauch/': "sexuelle Gewalt sexualisierte Gewalt häusliche Gewalt Übergriff Vergewaltigung Opferhilfe",
  '/wissen/schlafprobleme-nach-trauma/': "Albträume Alpträume Albtraum nach Trauma",
  '/wissen/akupunktur-bei-ptbs/': "Akupunktur PTBS Akupunktur PTSD",
  '/wissen/akupunktur-nach-trauma/': "traumasensible Akupunktur traumasensibel",
  // Bibliothek 26.10.2026 (Draft)
  '/beschwerden/medikamentenuebergebrauchskopfschmerz/': "MÜKS Medikamentenübergebrauch medication overuse headache Kopfschmerz durch Schmerzmittel Schmerzmittelkopfschmerz",
  '/beschwerden/hypermobilitaet/': "überbewegliche Gelenke Hypermobilitätssyndrom Hyperlaxität Hyperlaxitätssyndrom Hypermobility Spectrum Disorder HSD",
  '/beschwerden/schambeinentzuendung/': "Osteitis pubis Ostitis pubis",
  '/beschwerden/sjoegren-syndrom/': "Sjögren Morbus Sjögren Sjögren-Krankheit Sjogren Sjoegren Schögren",
  '/beschwerden/essentieller-tremor/': "essenzieller Tremor Alterstremor familiärer Tremor",
  '/beschwerden/pots-syndrom/': "POTS PoTS posturales Tachykardiesyndrom posturales orthostatisches Tachykardiesyndrom",
  '/beschwerden/mikroskopische-kolitis/': "kollagene Kolitis lymphozytäre Kolitis Kollagenkolitis mikroskopische Colitis",
  '/beschwerden/gallensaeurebedingter-durchfall/': "Gallensäurediarrhoe Gallensäureverlustsyndrom chologene Diarrhoe Gallensäuremalabsorption",
  '/beschwerden/proctalgia-fugax/': "Proktalgia fugax Proktalgie",
  '/beschwerden/beckenorgansenkung/': "Genitalprolaps Descensus Gebärmuttersenkung Blasensenkung Zystozele Scheidensenkung Scheidenvorfall",
  '/gesundheitsbibliothek/befunde-werte/trak-erhoeht/': "TRAK TRAb TSH-Rezeptor-Antikörper TSH-Rezeptor-Autoantikörper",
  '/gesundheitsbibliothek/befunde-werte/calcium-zu-niedrig/': "Calcium erniedrigt Kalzium zu niedrig Kalzium erniedrigt Hypokalzämie",
  '/gesundheitsbibliothek/befunde-werte/gesamt-ige-erhoeht/': "Gesamt-IgE Total-IgE IgE erhöht Immunglobulin E",
  '/gesundheitsbibliothek/untersuchungen/urodynamik/': "Urodynamik Blasendruckmessung Zystometrie Uroflowmetrie",
  // Audit 29.10.2026 (Draft): nur echte Synonyme/Schreibvarianten
  '/beschwerden/ac-gelenkarthrose/': "AC-Gelenksarthrose ACG-Arthrose Akromioklavikulargelenksarthrose Schultereckgelenkarthrose",
  '/beschwerden/omarthrose/': "Schulterarthrose Schultergelenksarthrose Glenohumeralarthrose Arthrose Schultergelenk",
  '/beschwerden/sprunggelenksarthrose/': "Sprunggelenkarthrose OSG-Arthrose Arthrose oberes Sprunggelenk tibiotalare Arthrose",
  '/beschwerden/intersektionssyndrom/': "Intersection Syndrome Intersektionssyndrom Unterarm",
  '/beschwerden/chronische-postoperative-schmerzen/': "chronische Schmerzen nach Operation chronische Schmerzen nach OP chronische postoperative Schmerzen CPSP persistierende postoperative Schmerzen",
  '/beschwerden/mastodynie/': "Mastalgie zyklische Brustschmerzen Brustschmerzen vor der Periode Brustdrüsenschmerzen",
  '/beschwerden/sekundaere-amenorrhoe/': "sekundäre Amenorrhö Amenorrhoe Amenorrhö ausbleibende Periode Periode bleibt aus",
  '/beschwerden/lichen-simplex-chronicus/': "Lichen simplex Neurodermatitis circumscripta lichenifiziertes Ekzem",
};
const withSynonyms = (e: SearchEntry): SearchEntry => {
  const syn = SYNONYMS[e.u];
  return syn ? { ...e, k: e.k ? `${e.k} ${syn}` : syn } : e;
};

export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];
  // Körpersignale: vollständig aus koerpersignale.ts (Fragen als Titel).
  for (const k of koerpersignale) {
    entries.push({ t: k.h1, u: `/koerpersignale/${k.slug}/`, g: 'Körpersignale', k: k.category });
  }
  // Beschwerden: kuratierte Labels aus den Regionen (mit Region als Kontext) ...
  const seen = new Set<string>();
  for (const r of BODY_REGIONS) {
    for (const c of r.conditions) {
      if (seen.has(c.slug)) continue;
      seen.add(c.slug);
      entries.push({ t: c.label, u: `/beschwerden/${c.slug}/`, g: 'Beschwerden', k: r.nav });
    }
  }
  // ... plus ALLE übrigen Leaves (Label = H1 des Leafs, gleiche Ableitung wie
  // beschwerden/[slug].astro). Kanonisierende Duplikat-Slugs bleiben draussen -
  // die Suche soll direkt auf die kanonische Seite führen.
  const MERGED_SLUGS = new Set(['schlafstoerungen', 'burnout', 'heuschnupfen']);
  const leaves = import.meta.glob('./symptom-leaves/*.html', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
  for (const [p, body] of Object.entries(leaves)) {
    const slug = p.split('/').pop()!.replace('.html', '');
    if (seen.has(slug) || MERGED_SLUGS.has(slug)) continue;
    const m = body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    const label = m
      ? m[1].replace(/<[^>]+>/g, '').replace(/\s*TCM\.ch.*$/i, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()
      : slug;
    seen.add(slug);
    entries.push({ t: label, u: `/beschwerden/${slug}/`, g: 'Beschwerden' });
  }
  // Körperregionen (die neuen Hubs).
  for (const r of BODY_REGIONS) {
    entries.push({ t: r.title, u: `/gesundheitsbibliothek/koerper/${r.slug}/`, g: 'Körperregionen' });
  }
  // Therapien (dedupliziert über Regionen).
  const seenTh = new Set<string>();
  for (const r of BODY_REGIONS) {
    for (const th of r.therapies) {
      if (seenTh.has(th.slug)) continue;
      seenTh.add(th.slug);
      entries.push({ t: th.label, u: `/therapien/${th.slug}/`, g: 'Therapien' });
    }
  }
  // Untersuchungen & Diagnostik: nur Einträge mit eigener Seite.
  for (const d of DIAGNOSTICS) {
    if (d.href) entries.push({ t: d.name, u: d.href, g: 'Untersuchungen' });
  }
  // Fragen: Kategorie-Hubs + Standalone-Patientenfragen (kuratiert aus fragen.ts).
  for (const h of fragenHubs) {
    entries.push({ t: h.nav, u: `/gesundheitsbibliothek/fragen/${h.slug}/`, g: 'Fragen', k: h.answers.map((a) => a.q).join(' ').slice(0, 300) });
  }
  for (const f of fragenList) {
    entries.push({ t: f.question, u: `/gesundheitsbibliothek/fragen/${f.slug}/`, g: 'Fragen' });
  }
  // TCM verstehen: Haupt-Hub + Sektions-Hubs (noindex-Sektionen sind wie Visuals
  // suchbar und verlinkbar, nur kein SEO-Ziel). Keine Einträge für ungebaute Leaves.
  entries.push({ t: 'TCM verstehen', u: '/gesundheitsbibliothek/tcm-verstehen/', g: 'TCM verstehen' });
  for (const ts of tcmSections) {
    entries.push({ t: ts.nav, u: `/gesundheitsbibliothek/tcm-verstehen/${ts.slug}/`, g: 'TCM verstehen', k: ts.geplant.join(' ').slice(0, 200) });
  }
  // Foundation-Leaves (Phase 4A): NUR publizierte Entities.
  for (const te of publishedTcmEntities) {
    entries.push({ t: te.nav, u: `/gesundheitsbibliothek/tcm-verstehen/${te.section}/${te.slug}/`, g: 'TCM verstehen', k: te.title.slice(0, 160) });
  }
  // Perspektiven: NUR publizierte Beiträge (Mocks erreichen die Suche nie).
  for (const pe of publishedPerspektiven) {
    entries.push({ t: pe.title, u: `/gesundheitsbibliothek/perspektiven/${pe.slug}/`, g: 'Perspektiven', k: pe.deck.slice(0, 160) });
  }
  // Befunde & Werte: NUR publizierte Beiträge (geplante existieren in Prod nicht).
  for (const bw of publishedBefundeWerte) {
    entries.push({ t: bw.title, u: `/gesundheitsbibliothek/befunde-werte/${bw.slug}/`, g: 'Befunde & Werte', k: `${KATEGORIE_LABELS[bw.category]} ${bw.deck.slice(0, 140)}` });
  }
  // Akupunkturverfahren: nur eigene publizierte Methodenseiten (bestehende
  // Therapien sind über den Therapien-Loop bereits drin; planned nie).
  entries.push({ t: 'Akupunkturverfahren im Überblick', u: '/therapien/akupunktur/verfahren/', g: 'Therapien' });
  for (const av of publishedVerfahrenPages) {
    entries.push({ t: av.label, u: `/therapien/akupunktur/${av.slug}/`, g: 'Therapien', k: av.deck.slice(0, 140) });
  }
  // Was jetzt?: NUR publizierte Beiträge (geplante existieren in Prod nicht).
  for (const wj of publishedWasJetzt) {
    entries.push({ t: wj.title, u: `/gesundheitsbibliothek/was-jetzt/${wj.slug}/`, g: 'Was jetzt?', k: wj.deck.slice(0, 160) });
  }
  // Ratgeber: kuratierte saisonale Wissen-Artikel (Herbstwelle).
  const RATGEBER: Array<{ t: string; u: string }> = [
    { t: 'Erkältung im Anflug: erste 24 Stunden', u: '/wissen/erkaeltung-im-anflug/' },
    { t: 'Erkältung, Grippe oder Allergie?', u: '/wissen/erkaeltung-grippe-allergie/' },
    { t: 'Kopfschmerzen bei Wetterumschwung', u: '/wissen/kopfschmerzen-wetterumschwung/' },
    { t: 'Müdigkeit im Herbst', u: '/wissen/muedigkeit-im-herbst/' },
    { t: 'Heizungsluft & trockene Schleimhäute', u: '/wissen/heizungsluft-trockene-schleimhaeute/' },
  ];
  for (const a of RATGEBER) entries.push({ t: a.t, u: a.u, g: 'Ratgeber' });
  // Kuratierte Methoden-Artikel (nicht saisonal), Gruppe wie die Therapie-Einträge:
  const METHODEN_ARTIKEL: Array<{ t: string; u: string; k?: string }> = [
    { t: 'Schröpfmassage', u: '/wissen/schroepfmassage/' },
    { t: 'Narbenbehandlung', u: '/wissen/narbenbehandlung/' },
    { t: 'Shiatsu-Selbstbehandlung', u: '/wissen/shiatsu-selbstbehandlung/' },
    // Entscheidungsfragen 21.10.2026: allgemeine Methodenvergleiche
    { t: 'Akupunktur oder Physiotherapie', u: '/wissen/akupunktur-oder-physiotherapie/' },
    { t: 'Akupunktur oder Osteopathie', u: '/wissen/akupunktur-oder-osteopathie/' },
    { t: 'Akupunktur oder Schröpfen', u: '/wissen/akupunktur-oder-schroepfen/' },
    { t: 'Tuina oder Physiotherapie', u: '/wissen/tuina-oder-physiotherapie/' },
    // Artikelpaket 24.10.2026: Methodenvergleiche
    { t: 'Schröpfen oder Massage', u: '/wissen/schroepfen-oder-massage/' },
    { t: 'Akupunktur oder Stosswellentherapie beim Tennisellenbogen', u: '/wissen/akupunktur-oder-stosswellentherapie-tennisellenbogen/' },
  ];
  for (const a of METHODEN_ARTIKEL) entries.push({ t: a.t, u: a.u, g: 'Therapien' });
  // Trauma-Cluster 27.10.2026: Wissen-Artikel haben keinen automatischen Sucheintrag, daher kuratiert.
  const TRAUMA_ARTIKEL: Array<{ t: string; u: string; g: string }> = [
    { t: 'Psychisches Trauma: verstehen, Hilfe finden, Behandlung wählen', u: '/wissen/psychisches-trauma-behandlung/', g: 'Ratgeber' },
    { t: 'Belastende Kindheitserfahrungen: Unterstützung im Erwachsenenalter', u: '/wissen/trauma-kindheit-erwachsene/', g: 'Ratgeber' },
    { t: 'Hilfe nach Gewalt und sexuellem Missbrauch', u: '/wissen/hilfe-nach-gewalt-sexuellem-missbrauch/', g: 'Ratgeber' },
    { t: 'Schlafprobleme nach einem Trauma', u: '/wissen/schlafprobleme-nach-trauma/', g: 'Ratgeber' },
    { t: 'Akupunktur bei PTBS: Was ist belegt?', u: '/wissen/akupunktur-bei-ptbs/', g: 'Therapien' },
    { t: 'Akupunktur nach Trauma: Was kann ich vor einer Sitzung klären?', u: '/wissen/akupunktur-nach-trauma/', g: 'Therapien' },
  ];
  for (const a of TRAUMA_ARTIKEL) entries.push({ t: a.t, u: a.u, g: a.g });
  // Visuals: nur live (Visual-Seiten sind bewusst noindex - Verlinkung ist ok, kein SEO-Ziel).
  for (const v of visuals) {
    if (v.status !== 'live') continue;
    entries.push({ t: v.title, u: `/visuals/${v.slug}/`, g: 'Visuals', k: (v.keywords ?? []).slice(0, 6).join(' ') });
  }
  return entries.map(withSynonyms);
}

/** Live-Visuals einer Region (nur status:'live', nie Drafts verlinken). */
export function liveVisualsForRegion(region: BodyRegion) {
  return visuals.filter((v) => v.status === 'live' && region.visualCategories.includes(v.category));
}
