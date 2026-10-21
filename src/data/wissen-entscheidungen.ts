// Entscheidungsfragen-Kohorte (Textpaket 21.10.2026): vier allgemeine Methodenvergleiche
// als eigenständige Entscheidungshilfen vor einer Behandlungsanfrage.
// Gleiches Modell wie wissen-kraeuter.ts (Wissen-Interface, FAQ und Quellen im bodyHtml,
// faqs: [] => kein FAQPage-Schema). KEIN Teil der Akupunktur-bei-Serie.
// Datum bis Release ungesetzt (PUBLISHED_ENTSCHEIDUNGEN_2026_10 in befunde-werte.ts).
// Ownership: Beschwerdebilder bleiben bei /beschwerden/*, Behandlungsentscheidungen je
// Beschwerde bei /wissen/akupunktur-bei-*/; hier nur der allgemeine Methodenvergleich.
import type { Wissen } from './wissen';
import { PUBLISHED_ENTSCHEIDUNGEN_2026_10 } from './befunde-werte';

const REDAKTION = {
  name: 'Redaktion TCM.ch',
  role: 'Redaktionelle Einordnung',
  bio: 'Redaktionelle Einordnung auf Basis der im Artikel verlinkten Quellen. Keine ärztliche Diagnose und keine individuelle Therapieempfehlung.',
};
const DATEN_E = { datePublished: PUBLISHED_ENTSCHEIDUNGEN_2026_10 ?? '', dateModified: PUBLISHED_ENTSCHEIDUNGEN_2026_10 ?? '' };

export const wissenEntscheidungen: Wissen[] = [
  {
    slug: 'akupunktur-oder-physiotherapie',
    title: 'Akupunktur oder Physiotherapie: Was passt zu deinem Ziel?',
    metaDesc: 'Akupunktur oder Physiotherapie: Unterschiede bei Ziel, Ablauf, Evidenz, Verordnung und Kosten in der Schweiz. Sachliche Entscheidungshilfe ohne Methodenrangliste.',
    region: 'Schweizweit',
    excerpt: 'Aktive Rehabilitation oder Nadelbehandlung: Der Vergleich zeigt, welche Fragen die Wahl entscheiden und wann eine Kombination überhaupt infrage kommt.',
    category: 'Therapien verstehen',
    h1: 'Akupunktur oder Physiotherapie: Was passt zu deinem Behandlungsziel?',
    lead: 'Beide Methoden werden bei Schmerzen am Bewegungsapparat eingesetzt, verfolgen aber unterschiedliche Ziele. Die Entscheidung beginnt deshalb nicht bei der Methode, sondern bei dem, was sich ändern soll.',
    readingTime: '5 Min.',
    ctaTitle: 'Passenden Behandlungsweg besprechen',
    ctaText: 'Beschreibe uns dein Ziel und bestehende Befunde. Wir sagen dir offen, ob Akupunktur, Physiotherapie oder zuerst eine ärztliche Abklärung sinnvoll ist.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_E,
    bodyHtml: `<h2>Kurzentscheidung: Behandlungsziel vor Methodenwahl</h2>
<p>Wenn du Kraft, Beweglichkeit oder Belastbarkeit zurückgewinnen willst, etwa nach einer Verletzung, Operation oder längerer Schonung, ist Physiotherapie der primäre Weg. Sie arbeitet mit Befund, Übungen und einem Heimprogramm. Wenn es dir vor allem um Schmerz und Muskelspannung geht und du aktuell kein aktives Training umsetzen kannst oder willst, kann Akupunktur eine Option sein. Beide Methoden schliessen sich nicht aus, keine ist pauschal überlegen. Welche Methode bei einer bestimmten Beschwerde sinnvoll ist, klären die Beschwerde-Seiten und die Artikel der Reihe «Akupunktur bei», zum Beispiel <a href="/wissen/akupunktur-bei-rueckenschmerzen/">Akupunktur bei Rückenschmerzen</a>.</p>
<h2>Aktive Rehabilitation, manuelle Behandlung und Nadelbehandlung unterscheiden</h2>
<p>Physiotherapie ist in der Schweiz ein eidgenössisch geregelter Gesundheitsberuf. Sie umfasst eine eigene Untersuchung, aktive Übungstherapie, manuelle Techniken an Gelenken und Muskulatur sowie Beratung zu Belastung und Alltag. Der wesentliche Hebel ist die aktive Mitarbeit: Was du zwischen den Terminen übst, entscheidet oft mehr als die Sitzung selbst.</p>
<p>Akupunktur ist eine Nadelbehandlung an definierten Punkten. Du liegst in der Regel 20 bis 30 Minuten mit liegenden Nadeln, die Behandlung ist passiv. Sie verändert weder Kraft noch Koordination direkt; ihr Einsatzgebiet ist die Schmerz- und Spannungsmodulation. Dry Needling nutzt zwar ebenfalls Nadeln, folgt aber einer muskulären Logik und gehört in der Schweiz zur Physiotherapie; der Unterschied ist im Artikel <a href="/wissen/dry-needling-vs-akupunktur/">Dry Needling vs. Akupunktur</a> erklärt.</p>
<div class="table-wrap"><table>
<thead><tr><th>Kriterium</th><th>Physiotherapie</th><th>Akupunktur</th></tr></thead>
<tbody>
<tr><td>Typisches Ziel</td><td>Funktion, Kraft, Beweglichkeit, Belastbarkeit</td><td>Schmerz, Muskelspannung, Begleitsymptome</td></tr>
<tr><td>Deine Rolle</td><td>aktiv, mit Heimprogramm</td><td>passiv während der Sitzung</td></tr>
<tr><td>Ablauf einer Sitzung</td><td>Befund, Übungen, manuelle Techniken, meist 25 bis 30 Minuten</td><td>Gespräch, Nadelung, Ruhezeit, meist 30 bis 60 Minuten</td></tr>
<tr><td>Zugang in der Schweiz</td><td>Grundversicherung nur mit ärztlicher Verordnung</td><td>bei entsprechend weitergebildeten Ärzt:innen über die Grundversicherung; bei TCM-Therapeut:innen ohne Verordnung, Beteiligung je nach Zusatzversicherung</td></tr>
<tr><td>Typische Risiken</td><td>vorübergehender Muskelkater, Reizung bei zu hoher Dosierung</td><td>kleine Blutergüsse, Müdigkeit, selten Infektion an der Einstichstelle</td></tr>
</tbody></table></div>
<h2>Welche Beschwerden zuerst medizinisch abgeklärt werden</h2>
<p>Weder Physiotherapie noch Akupunktur ersetzen eine Diagnose. Bei Beschwerden nach einem Unfall, bei Lähmungen, Taubheit, Gefühlsstörungen im Gesässbereich, Fieber, ungewolltem Gewichtsverlust oder nächtlichen Schmerzen, die nicht nachlassen, kommt die ärztliche Abklärung zuerst. Die Übersicht <a href="/gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/">Wann zuerst zum Arzt?</a> nennt die wichtigsten Warnzeichen. Erst mit einer Einordnung lässt sich beurteilen, ob aktive Rehabilitation, Schmerzbehandlung oder beides passt.</p>
<h2>Was die Evidenz hergibt, am Beispiel chronischer Rückenschmerzen</h2>
<p>Für chronische unspezifische Kreuzschmerzen gibt es zu beiden Wegen Cochrane-Übersichten, die jeweils eine Methode gegen Kontrollbedingungen prüfen, nicht die beiden Methoden gegeneinander. Bewegungstherapie reduziert Schmerzen gegenüber keiner Behandlung, üblicher Versorgung oder Placebo wahrscheinlich; der Effekt auf die Funktion ist klein, und die Autor:innen fordern bessere Studien. Für Akupunktur kommt die Übersicht von 2020 je nach Vergleichsgruppe zu unterschiedlichen Ergebnissen: Gegenüber keiner Behandlung war der Schmerz unmittelbar nach der Behandlung klinisch bedeutsam geringer und die Rückenfunktion besser (moderate Verlässlichkeit). Gegenüber Scheinakupunktur fand sich beim Schmerz unmittelbar nach der Behandlung ein kleiner Unterschied zugunsten der Akupunktur, der unter der in der Übersicht verwendeten Schwelle für klinische Bedeutsamkeit lag, bei niedriger Verlässlichkeit; bei der Rückenfunktion zeigte sich gegenüber Schein kein Unterschied, bei sehr niedriger Verlässlichkeit. Gegenüber üblicher Versorgung war der Schmerzunterschied ebenfalls klein und nicht klinisch bedeutsam, die Funktion unmittelbar nach der Behandlung aber besser (niedrige Verlässlichkeit). Keiner dieser Vergleiche sagt etwas über Akupunktur im Verhältnis zur Physiotherapie aus. Das US-Zentrum NCCIH fasst zusammen, dass Akupunktur bei mehreren Schmerzbildern hilfreich sein kann und bei fachgerechter Durchführung relativ wenige Komplikationen berichtet werden. Eine Rangliste lässt sich daraus nicht ableiten: Welche Methode bei dir mehr bringt, hängt vom Beschwerdebild, vom Ziel und von deiner Bereitschaft zu aktivem Training ab.</p>
<h2>Wann eine Kombination erwogen wird</h2>
<p>In der Praxis werden beide Wege oft nacheinander oder parallel genutzt: Akupunktur, um Schmerz und Spannung so weit zu senken, dass Übungen überhaupt möglich sind, und Physiotherapie, um die Funktion aufzubauen. Dass die Kombination mehr bringt als die jeweils besser passende Einzelmethode, ist für die meisten Beschwerden nicht belegt. Eine Kombination ist deshalb eine praktische Entscheidung im Behandlungsplan, kein automatischer Zusatznutzen. Wie Physiotherapie und TCM an gemeinsamen Standorten zusammenarbeiten, beschreibt die Seite <a href="/therapien/physiotherapie/">Physiotherapie</a>.</p>
<h2>Verordnung und Kosten kurz unterschieden</h2>
<p>Physiotherapie wird über die Grundversicherung nur mit ärztlicher Verordnung übernommen, abzüglich Franchise und Selbstbehalt; nach 36 Sitzungen kann der Versicherer eine schriftliche Begründung der Ärztin verlangen. Du darfst die Physiotherapeutin selbst wählen. Bei Akupunktur kommt es darauf an, wer behandelt: Ärztliche Akupunktur gehört nach Angaben des Bundesamts für Gesundheit zu den Leistungen der Grundversicherung, wenn die Ärztin oder der Arzt einen Facharzttitel und eine komplementärmedizinische Weiterbildung hat; dann gelten Franchise und Selbstbehalt. Akupunktur bei nichtärztlichen TCM-Therapeut:innen fällt in den Bereich der Zusatzversicherung, und ob und wie viel beteiligt wird, hängt von deiner Police und von der Anerkennung der Fachperson ab. Eine Deckungszusage für deinen Fall ist das nicht; die Einzelheiten und die Prüfung deiner Police erklärt <a href="/krankenkassen/akupunktur/">Akupunktur und Krankenkasse</a>.</p>
<h2>Welche Fragen du beim ersten Gespräch stellen kannst</h2>
<ul>
<li>Welches konkrete Ziel verfolgen wir in den ersten vier Wochen, und woran merken wir, ob es erreicht ist?</li>
<li>Gibt es Befunde, die zuerst ärztlich eingeordnet werden müssen?</li>
<li>Was muss ich selbst zwischen den Terminen tun?</li>
<li>Wann würdet ihr die Methode wechseln oder ergänzen?</li>
<li>Was kostet die Behandlung, und was übernimmt meine Versicherung?</li>
</ul>
<h2>Häufige Fragen</h2>
<h3>Kann ich Akupunktur und Physiotherapie am selben Tag machen?</h3>
<p>Organisatorisch ist das meist möglich. Sinnvoll ist eine Absprache zwischen den Behandelnden, damit Reize nicht ungeplant addiert werden und klar bleibt, welche Massnahme welche Wirkung hat.</p>
<h3>Brauche ich für Akupunktur eine ärztliche Verordnung?</h3>
<p>Für Akupunktur bei einer TCM-Therapeutin nicht; dort entscheidet deine Zusatzversicherung über eine Beteiligung. Die Verordnung ist bei Physiotherapie die Voraussetzung für die Grundversicherung. Ärztliche Akupunktur rechnet die Ärztin selbst über die Grundversicherung ab, wenn sie die Voraussetzungen erfüllt.</p>
<h3>Was, wenn ich das Heimprogramm nicht schaffe?</h3>
<p>Sag das offen. Physiotherapie ohne Mitarbeit verliert ihren wichtigsten Hebel. Dann kann eine passive Schmerzbehandlung als Zwischenschritt sinnvoller sein, bis Üben wieder möglich ist.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety" target="_blank" rel="noopener">NCCIH: Acupuncture, Effectiveness and Safety (Stand Oktober 2022, Patienteninformation, Volltext)</a></li>
<li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8095030/" target="_blank" rel="noopener">Mu J et al., Cochrane 2020: Acupuncture for chronic nonspecific low back pain, CD013814 (Volltext über PMC; Vergleiche gegen Schein, keine Behandlung und übliche Versorgung)</a></li>
<li><a href="https://www.cochrane.org/evidence/CD009790" target="_blank" rel="noopener">Hayden JA et al., Cochrane 2021: Exercise therapy for chronic low back pain, CD009790 (Zusammenfassung und Abstract)</a></li>
<li><a href="https://physioswiss.ch/profession/patienteninformation/" target="_blank" rel="noopener">Physioswiss: Informationen für Patient:innen (Verordnung, Kostenübernahme, Wahlfreiheit; Merkblätter vom 27.08.2024)</a></li>
<li><a href="https://www.bag.admin.ch/de/arztliche-komplementaermedizin" target="_blank" rel="noopener">BAG: Ärztliche Komplementärmedizin (Leistungen der OKP für ärztliche Akupunktur, Facharzttitel und Weiterbildung nach Art. 4b KLV, nichtärztliche Leistungen in der Zusatzversicherung; abgerufen 21.10.2026)</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/therapien/physiotherapie/', label: 'Physiotherapie', cat: 'Therapie' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/wissen/dry-needling-vs-akupunktur/', label: 'Dry Needling vs. Akupunktur', cat: 'Wissen' },
      { href: '/gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/', label: 'Wann zuerst zum Arzt?', cat: 'Frage' },
    ],
  },
  {
    slug: 'akupunktur-oder-osteopathie',
    title: 'Akupunktur oder Osteopathie: Unterschiede vor der Terminwahl',
    metaDesc: 'Akupunktur oder Osteopathie: Methoden, Ablauf, Evidenz, Qualifikation in der Schweiz und Grenzen im Vergleich. Entscheidungshilfe, welche Fachperson du anfragst.',
    region: 'Schweizweit',
    excerpt: 'Nadeln an Punkten oder manuelle Behandlung mit den Händen: Was die beiden Methoden unterscheidet, wer sie in der Schweiz ausüben darf und wann zuerst eine Abklärung nötig ist.',
    category: 'Therapien verstehen',
    h1: 'Akupunktur oder Osteopathie: Unterschiede vor der Terminwahl',
    lead: 'Beide Methoden werden oft bei Rücken-, Nacken- und Gelenkbeschwerden gesucht. Sie arbeiten aber grundverschieden, und auch die Berufe dahinter sind in der Schweiz unterschiedlich geregelt.',
    readingTime: '5 Min.',
    ctaTitle: 'Eignung der Akupunktur klären',
    ctaText: 'Schildere uns deine Beschwerden und bisherigen Befunde. Wir sagen dir, ob Akupunktur in deiner Situation passt oder ob ein anderer Weg sinnvoller ist.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_E,
    bodyHtml: `<h2>Kurz gesagt</h2>
<p>Osteopathie ist eine manuelle Behandlung: Die Fachperson untersucht und behandelt mit den Händen, durch Dehnen, Mobilisieren und Drucktechniken. Akupunktur reizt definierte Punkte mit feinen Nadeln. Welche Methode zu dir passt, hängt davon ab, ob Beweglichkeit und Gewebespannung oder Schmerz und Begleitsymptome im Vordergrund stehen, und davon, welche Fachperson in deiner Nähe tatsächlich verfügbar und qualifiziert ist. Eine Methode ist der anderen nicht pauschal überlegen.</p>
<h2>Unterschied der Methoden in Alltagssprache</h2>
<p>Osteopath:innen arbeiten ausschliesslich manuell. Sie tasten Gewebe, Gelenke und Bewegungsabläufe ab und behandeln mit Dehnung, Mobilisation und gezieltem Druck. Die Hände sind Untersuchungs- und Behandlungsinstrument zugleich. Akupunkteur:innen stellen ihre Befunde im Gespräch und mit eigenen Untersuchungsmethoden und setzen dann Nadeln an ausgewählten Punkten, die 20 bis 30 Minuten liegen bleiben. Beide Methoden beanspruchen, den Körper in seiner Regulation zu unterstützen; wissenschaftlich belegt ist für beide vor allem ein Nutzen bei bestimmten Schmerzbildern, nicht ein allgemeines Wirkprinzip.</p>
<h2>Was eine Behandlungssitzung praktisch unterscheidet</h2>
<div class="table-wrap"><table>
<thead><tr><th>Kriterium</th><th>Osteopathie</th><th>Akupunktur</th></tr></thead>
<tbody>
<tr><td>Technik</td><td>manuell, mit den Händen</td><td>Nadeln an definierten Punkten</td></tr>
<tr><td>Was du spürst</td><td>Druck, Dehnung, Bewegung der Gelenke</td><td>kurzer Einstich, dumpfes Ziehen am Punkt</td></tr>
<tr><td>Sitzungsdauer</td><td>meist 45 bis 60 Minuten</td><td>meist 30 bis 60 Minuten inklusive Ruhezeit</td></tr>
<tr><td>Typische Risiken</td><td>Muskelkater, vorübergehende Verstärkung; Vorsicht bei Blutverdünnern, sehr schwachen Knochen, Nervenerkrankungen</td><td>kleine Blutergüsse, Müdigkeit; Vorsicht bei Blutverdünnern, Hautinfektionen im Behandlungsbereich</td></tr>
<tr><td>Berufsrecht Schweiz</td><td>eidgenössisch geregelter Gesundheitsberuf, Master of Science FH, kantonale Bewilligung</td><td>Methode, kein eigener Beruf; geschützter Abschluss: Naturheilpraktiker:in mit eidg. Diplom, Fachrichtung TCM (Höhere Fachprüfung); Berufsausübung je nach Kanton bewilligungspflichtig; ärztliche Akupunktur als eigener Weg (Facharzttitel, Weiterbildung, Grundversicherung); EMR/ASCA: Registrierung für die Zusatzversicherung, keine staatliche Zulassung</td></tr>
</tbody></table></div>
<h2>Evidenz pro konkreter Beschwerde statt allgemeiner Sieger</h2>
<p>Der britische NHS nennt Akupunktur als Angebot bei anhaltenden Schmerzen und Migräne und führt Osteopathie als Methode mit Massage- und Dehntechniken bei Verletzungen, Beweglichkeit und Schmerzen auf, ohne sie in die Liste der vom NHS angebotenen Komplementärtherapien aufzunehmen. Das US-Zentrum NCCIH beschreibt für Akupunktur Hinweise auf Nutzen bei chronischen Kreuzschmerzen, Kniearthrose und Migräne, bei meist moderater bis niedriger Verlässlichkeit der Daten. Für Osteopathie liegen in den hier geprüften Patienteninformationen keine Angaben zur Studienlage einzelner Beschwerden vor; eine direkte Vergleichsstudie beider Methoden, die einen allgemeinen Sieger belegen würde, haben wir nicht gefunden. Entscheide deshalb pro Beschwerde: Die Beschwerde-Seiten und die Reihe «Akupunktur bei», etwa <a href="/wissen/akupunktur-bei-nackenschmerzen/">Akupunktur bei Nackenschmerzen</a>, ordnen die Studienlage je Symptom ein.</p>
<h2>Qualifikation, Grenzen und nötige ärztliche Abklärung</h2>
<p>Osteopathie gehört seit dem 1. Februar 2020 zu den sieben Berufen des Gesundheitsberufegesetzes. Wer in eigener fachlicher Verantwortung arbeitet, braucht einen Master of Science in Osteopathie FH oder einen als gleichwertig anerkannten Abschluss und eine Berufsausübungsbewilligung des Kantons; die Fachpersonen sind im Gesundheitsberuferegister eingetragen. Akupunktur ist eine Methode und kein eigener Beruf. Die zugehörige geschützte Berufsqualifikation ist seit 2015 «Naturheilpraktiker:in mit eidgenössischem Diplom, Fachrichtung Traditionelle Chinesische Medizin TCM», erworben über die Höhere Fachprüfung der OdA AM und im Berufsverzeichnis des SBFI geführt. Nicht jede akupunktierende Person hat dieses Diplom; ob und mit welchem Nachweis Akupunktur selbstständig ausgeübt werden darf, regeln die Kantone. Im Kanton Zürich braucht es dafür eine Berufsausübungsbewilligung, für die das OdA-AM-Zertifikat mit Akupunktur-Modul, das eidgenössische Diplom oder eine SRK-Anerkennung eines ausländischen Abschlusses nachzuweisen ist. Ärztliche Akupunktur ist ein eigener Qualifikationsweg mit Facharzttitel und komplementärmedizinischer Weiterbildung. Die Registrierung bei EMR oder ASCA ist davon getrennt: Sie ist keine staatliche Zulassung, sondern die Grundlage dafür, dass Zusatzversicherungen Leistungen beteiligen. Was Abschluss, kantonale Bewilligung und Register im Alltag bedeuten, erklärt <a href="/wissen/tcm-naturheilpraktiker-schweiz/">TCM-Heilpraktiker oder Naturheilpraktiker?</a>. Für beide gilt: Bei Warnzeichen wie Lähmungen, Taubheit, Fieber, ungewolltem Gewichtsverlust oder Beschwerden nach einem Unfall kommt die ärztliche Abklärung zuerst, siehe <a href="/gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/">Wann zuerst zum Arzt?</a>. Mit Blutverdünnern, sehr schwachen Knochen oder Nervenerkrankungen gehören diese Punkte vor jeder manuellen Behandlung ins Gespräch; für Akupunktur ist die Situation unter <a href="/gesundheitsbibliothek/fragen/akupunktur-blutverduenner/">Akupunktur mit Blutverdünnern</a> beschrieben.</p>
<h2>Welche Methode und Fachperson tatsächlich verfügbar ist</h2>
<p>Entscheidend ist am Ende, wen du in deiner Region erreichst. TCM.ch ist auf Methoden der chinesischen Medizin ausgerichtet; ob eine Praxis zusätzlich Osteopathie anbietet, klärst du direkt bei der Anfrage. Umgekehrt ist eine osteopathische Praxis eine gute Adresse, wenn für dich eine manuelle Behandlung im Vordergrund steht. Frag in beiden Fällen nach Ausbildung, Registrierung und danach, wie die Fachperson mit deiner Ärztin zusammenarbeitet.</p>
<h2>Häufige Fragen</h2>
<h3>Übernimmt die Krankenkasse Osteopathie oder Akupunktur?</h3>
<p>Osteopathie und Akupunktur bei nichtärztlichen Fachpersonen fallen in den Bereich der Zusatzversicherung; die Bedingungen hängen von deiner Police und von der Anerkennung der Fachperson ab. Ärztliche Akupunktur bei Ärzt:innen mit Facharzttitel und komplementärmedizinischer Weiterbildung gehört laut Bundesamt für Gesundheit zu den Leistungen der Grundversicherung. Eine Zusage für deinen Fall ist das nicht; die Details stehen unter <a href="/krankenkassen/akupunktur/">Akupunktur und Krankenkasse</a>.</p>
<h3>Kann ich beide Methoden kombinieren?</h3>
<p>Ja, wenn die Behandelnden voneinander wissen. Ein Zusatznutzen der Kombination ist nicht belegt; sinnvoll ist sie vor allem, wenn die Methoden unterschiedliche Ziele verfolgen, etwa Beweglichkeit und Schmerz.</p>
<h3>Woran erkenne ich eine qualifizierte Fachperson?</h3>
<p>Bei Osteopathie an der kantonalen Berufsausübungsbewilligung und dem Registereintrag. Bei Akupunktur am eidgenössischen Diplom (Fachrichtung TCM) oder am OdA-AM-Zertifikat, an der kantonalen Berechtigung, wo eine nötig ist, und für die Versicherung zusätzlich an der EMR- oder ASCA-Registrierung; bei ärztlicher Akupunktur an Facharzttitel und Weiterbildung. Seriöse Fachpersonen sagen dir offen, wenn ihre Methode bei dir wenig Aussicht hat.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://www.nhs.uk/tests-and-treatments/herbal-medicines-and-complementary-therapies/" target="_blank" rel="noopener">NHS: Herbal medicines and complementary therapies (zuletzt geprüft 1. Mai 2026, Patienteninformation, Volltext)</a></li>
<li><a href="https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety" target="_blank" rel="noopener">NCCIH: Acupuncture, Effectiveness and Safety (Stand Oktober 2022, Patienteninformation, Volltext)</a></li>
<li><a href="https://www.bag.admin.ch/de/haeufige-fragen-faq-zum-gesundheitsberufegesetz-gesbg" target="_blank" rel="noopener">BAG: Häufige Fragen zum Gesundheitsberufegesetz GesBG (Osteopathie, Master FH, kantonale Bewilligung, Register)</a></li>
<li><a href="https://www.becc.admin.ch/becc/public/bvz/beruf/show/85834" target="_blank" rel="noopener">SBFI, Berufsverzeichnis: Naturheilpraktiker/in mit eidgenössischem Diplom, Höhere Fachprüfung (genehmigt 28.04.2015; Fachrichtung Traditionelle Chinesische Medizin TCM, Trägerschaft OdA AM)</a></li>
<li><a href="https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/gesundheit/gesundheitsberufe/merkblaetter_neu/merkblatt_akupunktur_nov_2023.pdf" target="_blank" rel="noopener">Kanton Zürich, Gesundheitsdirektion: Merkblatt Akupunktur, Berufsausübungsbewilligung (November 2023, PDF; Nachweise OdA-AM-Zertifikat mit Akupunktur-Modul, eidg. Diplom HFP Fachrichtung TCM oder SRK-Anerkennung)</a></li>
<li><a href="https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/gesundheit/gesundheitsberufe/merkblaetter_neu/merkblatt_nichtaerztliche_alternativ-komplementaermedizin_nov_2023.pdf" target="_blank" rel="noopener">Kanton Zürich, Gesundheitsdirektion: Merkblatt Nichtärztliche Alternativ-/Komplementärmedizin (November 2023, PDF; bewilligungsfreier Bereich, bewilligungspflichtige Titelführung)</a></li>
<li><a href="https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/gesundheit/gesundheitsberufe/merkblaetter_neu/merkblatt_osteopathie_nov_2023.pdf" target="_blank" rel="noopener">Kanton Zürich, Gesundheitsdirektion: Merkblatt Osteopathie, Berufsausübungsbewilligung (November 2023, PDF)</a></li>
<li><a href="https://www.bag.admin.ch/de/arztliche-komplementaermedizin" target="_blank" rel="noopener">BAG: Ärztliche Komplementärmedizin (Leistungen der OKP für ärztliche Akupunktur, Facharzttitel und Weiterbildung nach Art. 4b KLV, nichtärztliche Leistungen in der Zusatzversicherung; abgerufen 21.10.2026)</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/', label: 'Wann zuerst zum Arzt?', cat: 'Frage' },
      { href: '/wissen/akupunktur-oder-physiotherapie/', label: 'Akupunktur oder Physiotherapie', cat: 'Wissen' },
      { href: '/krankenkassen/akupunktur/', label: 'Akupunktur und Krankenkasse', cat: 'Kosten' },
    ],
  },
  {
    slug: 'akupunktur-oder-schroepfen',
    title: 'Akupunktur oder Schröpfen: Was unterscheidet die Behandlung?',
    metaDesc: 'Akupunktur oder Schröpfen: Nadelreiz oder Unterdruck, Hautreaktionen, Eignung und Risiken sachlich verglichen. Ohne Entgiftungsversprechen und ohne Wirksamkeitsrangliste.',
    region: 'Schweizweit',
    excerpt: 'Feine Nadeln oder Saugglocken: Beide Methoden kommen aus der chinesischen Medizin, hinterlassen aber unterschiedliche Spuren und passen zu unterschiedlichen Situationen.',
    category: 'Therapien verstehen',
    h1: 'Akupunktur oder Schröpfen: Was unterscheidet die Behandlung?',
    lead: 'Wer Verspannungen oder Schmerzen am Rücken behandeln lassen will, stösst oft auf beide Methoden. Der praktische Unterschied liegt im Reiz, in den Hautreaktionen danach und in der Frage, wer vorsichtig sein sollte.',
    readingTime: '4 Min.',
    ctaTitle: 'Passende Methode anfragen',
    ctaText: 'Sag uns, worum es dir geht und ob Blutverdünner, Hauterkrankungen oder andere Besonderheiten bestehen. Wir schlagen die passende Methode vor.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_E,
    bodyHtml: `<h2>Kurz gesagt</h2>
<p>Akupunktur setzt einen punktuellen Reiz mit feinen Nadeln, Schröpfen einen flächigen Reiz über Unterdruck in einer Glocke. Nach Schröpfen bleiben meist für Tage sichtbare runde Flecken. Nach Akupunktur können kleine Blutergüsse auftreten; weitere mögliche Nebenwirkungen und seltene Komplikationen erklärt <a href="/gesundheitsbibliothek/fragen/akupunktur-nebenwirkungen/">Akupunktur: Nebenwirkungen</a>. Für beide Methoden ist die Studienlage bei Schmerzen begrenzt und uneinheitlich; keine Methode «entgiftet», und keine ist generell wirksamer. Entscheidend sind dein Behandlungsziel, deine Haut und mögliche Gründe zur Vorsicht.</p>
<h2>Nadelreiz vs. Unterdruck: der praktische Unterschied</h2>
<p>Bei der <a href="/therapien/akupunktur/">Akupunktur</a> werden sterile Einwegnadeln an ausgewählten Punkten gesetzt und bleiben 20 bis 30 Minuten liegen. Der Reiz ist punktuell und kann auch fern vom Beschwerdeort gesetzt werden. Beim <a href="/therapien/schroepfen/">Schröpfen</a> wird in einer Glas-, Kunststoff- oder Bambusglocke ein Unterdruck erzeugt, der Haut und oberflächliches Gewebe anhebt. Die Glocken bleiben einige Minuten stehen oder werden bei der Schröpfmassage geölt über die Haut bewegt. Trockenes Schröpfen verletzt die Haut nicht; beim blutigen Schröpfen wird die Haut vorher angeritzt, das ist eine eigene Methode mit eigenen Anforderungen an Hygiene und Eignung.</p>
<div class="table-wrap"><table>
<thead><tr><th>Kriterium</th><th>Akupunktur</th><th>Schröpfen (trocken)</th></tr></thead>
<tbody>
<tr><td>Reiz</td><td>punktuell, Nadel</td><td>flächig, Unterdruck</td></tr>
<tr><td>Empfinden</td><td>kurzer Einstich, Ziehen oder Schwere am Punkt</td><td>starkes Ziehen der Haut, Wärmegefühl</td></tr>
<tr><td>Hautbild danach</td><td>kleine Blutergüsse an Einstichstellen möglich</td><td>runde rote bis violette Flecken, oft 3 bis 10 Tage sichtbar</td></tr>
<tr><td>Typischer Einsatz</td><td>Schmerz, Spannung, Begleitsymptome, auch fern vom Ort</td><td>flächige Verspannung an Rücken, Nacken, Schultern</td></tr>
<tr><td>Vorsicht bei</td><td>Blutverdünnern, Hautinfektion im Bereich, bestimmten Implantaten</td><td>Blutverdünnern, Gerinnungsstörungen, Hauterkrankungen oder Wunden im Bereich, Krampfadern</td></tr>
</tbody></table></div>
<h2>Hautreaktionen, Empfinden und Eignung unterscheiden</h2>
<p>Die Schröpfflecken sind kein Behandlungserfolg und kein Zeichen von «Schlacken», sondern eine Folge des Unterdrucks auf kleine Gefässe. Sie sind normal, sollten aber berücksichtigt werden, wenn du in den Tagen danach Schultern oder Rücken zeigen willst. Das US-Zentrum NCCIH nennt als berichtete Nebenwirkungen des Schröpfens anhaltende Verfärbungen, Narben, Verbrennungen und Infektionen sowie eine mögliche Verschlechterung von Ekzem oder Schuppenflechte. Bei Akupunktur sind kleine Blutergüsse, Müdigkeit und ein kurzer Schwindel die häufigsten Reaktionen. Was im Einzelnen zu erwarten ist, steht unter <a href="/gesundheitsbibliothek/fragen/schroepfen-nebenwirkungen/">Schröpfen: Nebenwirkungen</a> und <a href="/gesundheitsbibliothek/fragen/akupunktur-nebenwirkungen/">Akupunktur: Nebenwirkungen</a>.</p>
<h2>Keine allgemeine Rangliste der Wirksamkeit</h2>
<p>Für Schröpfen stuft das NCCIH die vorhandene Forschung überwiegend als von niedriger Qualität ein; es gibt Hinweise auf Schmerzlinderung, die Belege sind aber schwach. Eine Übersichtsarbeit zu chronischen Nackenschmerzen aus dem Jahr 2026 fasst neun randomisierte Studien mit 401 Teilnehmenden zusammen und berichtet Vorteile bei Schmerz und Funktion ohne schwere Nebenwirkungen; die Studien sind klein, und die Autor:innen selbst weisen auf methodische Unterschiede hin. Für Akupunktur liegt mehr Forschung vor, mit Hinweisen auf Nutzen bei mehreren Schmerzbildern und einem oft kleinen Unterschied zur Scheinakupunktur. Ein Vergleich, der eine der beiden Methoden allgemein als wirksamer ausweist, existiert nicht. Welche Methode bei einer bestimmten Beschwerde geprüft ist, ordnen die Beschwerde-Seiten ein.</p>
<h2>Wann zuerst Rücksprache nötig ist</h2>
<p>Mit Blutverdünnern oder einer Gerinnungsstörung ist Schröpfen zurückhaltend oder gar nicht angezeigt, blutiges Schröpfen kommt dann nicht infrage; Akupunktur ist meist mit Anpassungen möglich, siehe <a href="/gesundheitsbibliothek/fragen/akupunktur-blutverduenner/">Akupunktur mit Blutverdünnern</a>. Verletzte, entzündete oder von Ekzem betroffene Haut wird bei beiden Methoden ausgespart. Fieber, unklare Schmerzen oder Warnzeichen gehören zuerst ärztlich abgeklärt, siehe <a href="/gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/">Wann zuerst zum Arzt?</a>. Beim Schröpfen zählt zusätzlich, dass die Glocken fachgerecht gereinigt werden; beim blutigen Schröpfen sind Einwegmaterial und Infektionsschutz zwingend.</p>
<h2>Behandlungsziel und konkrete Verfügbarkeit klären</h2>
<p>Für eine flächige Verspannung im Schulter-Nacken-Bereich, bei der du sichtbare Flecken akzeptierst, ist Schröpfen oft der direktere Reiz. Für Beschwerden, die über eine Muskelverspannung hinausgehen, oder wenn du keine sichtbaren Spuren möchtest, ist Akupunktur meist die passendere Wahl. In der Praxis werden beide Methoden häufig in derselben Sitzung kombiniert. Frag bei der Anfrage, ob die Praxis trockenes Schröpfen, Schröpfmassage oder blutiges Schröpfen anbietet und welche Methode zu deinem Ziel passt.</p>
<h2>Häufige Fragen</h2>
<h3>Tut Schröpfen mehr weh als Akupunktur?</h3>
<p>Das Empfinden ist anders: Schröpfen zieht flächig und kann bei starkem Unterdruck unangenehm sein, Akupunktur ist ein kurzer Einstich mit einem Ziehen am Punkt. Beides sollte nicht schmerzhaft sein; sag es, wenn ein Reiz zu stark ist.</p>
<h3>Darf ich nach dem Schröpfen in die Sauna oder zum Sport?</h3>
<p>Am Behandlungstag sind Hitze und intensive Belastung ungünstig, weil die Haut gereizt ist. Was nach einer Behandlung allgemein gilt, steht unter <a href="/gesundheitsbibliothek/fragen/nach-der-behandlung/">Nach der Behandlung</a>.</p>
<h3>Ist blutiges Schröpfen die «stärkere» Variante?</h3>
<p>Es ist eine andere Methode mit höherem Infektions- und Blutungsrisiko, nicht eine stärkere Stufe derselben Behandlung. Sie kommt nur bei geeigneten Personen und unter strengen Hygienebedingungen infrage.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://www.nccih.nih.gov/health/cupping" target="_blank" rel="noopener">NCCIH: Cupping (Stand November 2018, Patienteninformation, Volltext)</a></li>
<li><a href="https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety" target="_blank" rel="noopener">NCCIH: Acupuncture, Effectiveness and Safety (Stand Oktober 2022, Patienteninformation, Volltext)</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/42105092/" target="_blank" rel="noopener">Effect of cupping therapy on chronic neck pain: systematic review and meta-analysis of RCTs. J Back Musculoskelet Rehabil 2026 (Abstract)</a></li>
<li><a href="https://www.nhs.uk/tests-and-treatments/herbal-medicines-and-complementary-therapies/" target="_blank" rel="noopener">NHS: Herbal medicines and complementary therapies (zuletzt geprüft 1. Mai 2026, Patienteninformation, Volltext)</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/therapien/schroepfen/', label: 'Schröpfen', cat: 'Therapie' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/gesundheitsbibliothek/fragen/schroepfen-nebenwirkungen/', label: 'Schröpfen: Nebenwirkungen', cat: 'Frage' },
      { href: '/wissen/schroepfen-wirkung-flecken/', label: 'Schröpfen: Wirkung und Flecken', cat: 'Wissen' },
    ],
  },
  {
    slug: 'tuina-oder-physiotherapie',
    title: 'Tuina oder Physiotherapie: Unterschiede und Ergänzung',
    metaDesc: 'Tuina oder Physiotherapie: manuelle TCM-Behandlung oder aktive Rehabilitation? Was zwei Vergleichsstudien bei chronischen Kreuzschmerzen zeigen und wo die Grenzen liegen.',
    region: 'Schweizweit',
    excerpt: 'Passive manuelle Behandlung oder aktives Training mit Befund: Der Vergleich erklärt, was beide Methoden umfassen und was zwei Vergleichsstudien bei Kreuzschmerzen gezeigt haben.',
    category: 'Therapien verstehen',
    h1: 'Tuina oder Physiotherapie: Unterschiede und mögliche Ergänzung',
    lead: 'Tuina ist die manuelle Behandlung der chinesischen Medizin, Physiotherapie ein eidgenössisch geregelter Beruf mit eigener Diagnostik. Wer beide vergleicht, sollte nicht Massage mit Rehabilitation verwechseln.',
    readingTime: '5 Min.',
    ctaTitle: 'Behandlungsziel und Fachperson klären',
    ctaText: 'Sag uns, ob du Schmerzlinderung, mehr Beweglichkeit oder einen Wiederaufbau nach Verletzung suchst. Wir sagen dir, ob Tuina, Physiotherapie oder zuerst eine ärztliche Abklärung passt.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_E,
    bodyHtml: `<h2>Kurz gesagt</h2>
<p>Tuina ist eine passive manuelle Behandlung mit kräftigen Griff-, Druck- und Mobilisationstechniken. Physiotherapie beginnt mit einem Befund und setzt vor allem auf aktive Übungen, ergänzt um manuelle Techniken und Beratung. Bei chronischen, unspezifischen Kreuzschmerzen haben zwei Vergleichsstudien beide Wege direkt gegeneinander geprüft: Schmerz nahm in allen Gruppen ab, ohne klaren Unterschied; bei der Funktion schnitt in einer der Studien die Physiotherapie nach fünf Monaten besser ab. Für andere Beschwerden gibt es keinen direkten Vergleich.</p>
<h2>Was Tuina und Physiotherapie jeweils umfassen</h2>
<p><a href="/therapien/tuina/">Tuina</a> arbeitet mit Schieben, Greifen, Kneten, Reiben und Mobilisation an Muskulatur, Sehnen und Gelenken. Du liegst oder sitzt, die Fachperson behandelt; dein Beitrag während der Sitzung ist gering. Die Techniken können sanft oder deutlich kräftig sein, Schmerz ist dabei kein Qualitätsmerkmal. <a href="/therapien/physiotherapie/">Physiotherapie</a> umfasst eine eigene Untersuchung, aktive Übungstherapie, Kräftigung, Koordinationstraining, manuelle Therapie und Beratung zu Belastung, Arbeit und Sport. Ein Heimprogramm gehört dazu. In der Schweiz ist Physiotherapie ein eidgenössisch geregelter Beruf; die Grundversicherung übernimmt Behandlungen nur mit ärztlicher Verordnung. Tuina als Leistung nichtärztlicher Therapeut:innen fällt in den Bereich der Zusatzversicherung; ob und wie viel beteiligt wird, hängt von Police und Anerkennung ab, siehe <a href="/krankenkassen/">Krankenkassen und TCM</a>.</p>
<h2>Aktives Training, Rehabilitation und manuelle Behandlung nicht gleichsetzen</h2>
<p>Nicht jede Physiotherapie ist Massage, und Tuina ist keine Rehabilitation. Wer nach einer Operation, einem Unfall oder einer längeren Schonung Kraft und Belastbarkeit zurückgewinnen muss, braucht aktives Training unter Anleitung; das leistet eine passive manuelle Behandlung nicht. Umgekehrt kann Tuina eine Option sein, wenn muskuläre Verspannung und Schmerz im Vordergrund stehen und aktives Üben im Moment nicht möglich ist oder ergänzt werden soll.</p>
<div class="table-wrap"><table>
<thead><tr><th>Kriterium</th><th>Tuina</th><th>Physiotherapie</th></tr></thead>
<tbody>
<tr><td>Charakter</td><td>passiv, manuell</td><td>aktiv, mit Befund und Übungen</td></tr>
<tr><td>Ziel</td><td>Spannung, Schmerz, Beweglichkeit kurzfristig</td><td>Funktion, Kraft, Belastbarkeit, Rückfallprophylaxe</td></tr>
<tr><td>Heimprogramm</td><td>in der Regel keines</td><td>zentraler Bestandteil</td></tr>
<tr><td>Zugang Schweiz</td><td>ohne Verordnung; bei nichtärztlichen Therapeut:innen Beteiligung je nach Zusatzversicherung</td><td>Grundversicherung nur mit ärztlicher Verordnung</td></tr>
<tr><td>Vorsicht bei</td><td>frischen Verletzungen, Knochenbrüchen, Osteoporose, akuten Entzündungen, Gefässproblemen</td><td>bei Warnzeichen zuerst ärztliche Abklärung</td></tr>
</tbody></table></div>
<h2>Direkte Vergleichsforschung: nur für chronische Kreuzschmerzen</h2>
<p>Zwei randomisierte Studien haben Tuina, Physiotherapie und die Kombination bei chronischen unspezifischen Kreuzschmerzen verglichen, mit je 204 Teilnehmenden und sechs Behandlungen über rund zwei Monate. Die erste wurde 2024 aus Guangzhou berichtet, die zweite 2026 aus Singapur mit einer älteren Patientengruppe. Beide gehören zu einem gemeinsamen Studienprogramm mit geteiltem Protokoll und überlappendem Autorenteam; sie zählen deshalb nicht als zwei unabhängige Bestätigungen, sondern als zwei Populationen desselben Vergleichs.</p>
<h2>Kurz- und Langzeitergebnisse, Vergleichsarme und Grenzen getrennt</h2>
<p>In der Studie aus Guangzhou nahm der Schmerz in allen drei Gruppen nach der Behandlung und bis zur Nachkontrolle nach 20 Wochen ab, ohne signifikanten Unterschied zwischen den Gruppen; es wurde ein unerwünschtes Ereignis bei 204 Teilnehmenden berichtet. In der Studie aus Singapur war der Schmerz nach zwei Monaten in allen Gruppen besser; nach fünf Monaten unterschieden sich die Schmerzwerte nicht mehr, bei der Alltagsfunktion schnitten Physiotherapie und Kombination gegenüber Tuina allein etwas besser ab, mit kleinen Effektstärken. Beide Studien hatten keine Placebogruppe, die Behandlungen wurden individuell angepasst, und die Ergebnisse gelten für chronische unspezifische Kreuzschmerzen, nicht für Nacken, Schulter oder akute Beschwerden.</p>
<h2>Wann Physiotherapie bzw. medizinische Abklärung Vorrang hat</h2>
<p>Vorrang hat die Physiotherapie, wenn Rehabilitation, Kraftaufbau oder eine ärztlich verordnete Behandlung im Vordergrund stehen. Vorrang hat die ärztliche Abklärung bei Beschwerden nach einem Unfall, bei Lähmungen, Taubheit, Fieber, nächtlichen Schmerzen oder ungewolltem Gewichtsverlust, siehe <a href="/gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/">Wann zuerst zum Arzt?</a>. Bei Osteoporose, frischen Verletzungen oder Gefässproblemen müssen manuelle Techniken angepasst werden; mögliche Reaktionen beschreibt <a href="/gesundheitsbibliothek/fragen/tuina-nebenwirkungen/">Tuina: Nebenwirkungen</a>. Eine Kombination ist in beiden Studien nicht besser als die jeweils passende Einzelmethode gewesen; sie ist eine praktische Entscheidung, kein belegter Zusatznutzen.</p>
<h2>Häufige Fragen</h2>
<h3>Ist Tuina einfach eine kräftige Massage?</h3>
<p>Tuina nutzt Massagegriffe, arbeitet aber zusätzlich mit Mobilisation und gezielter Punktarbeit nach eigener Befunderhebung. Der Unterschied zur klassischen Massage ist unter <a href="/gesundheitsbibliothek/fragen/schroepfen-methoden/#tuina">Tuina oder klassische Massage</a> erklärt.</p>
<h3>Kann ich mit Physiotherapie-Verordnung zur Tuina?</h3>
<p>Die ärztliche Verordnung gilt für Physiotherapie und deren Abrechnung über die Grundversicherung. Tuina bei TCM-Therapeut:innen wird davon nicht erfasst; eine Beteiligung richtet sich nach deiner Zusatzversicherung.</p>
<h3>Gilt das Studienergebnis auch für Nackenschmerzen?</h3>
<p>Nein. Beide Vergleichsstudien untersuchten ausschliesslich chronische unspezifische Kreuzschmerzen. Für andere Regionen gibt es keinen direkten Vergleich.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/39395482/" target="_blank" rel="noopener">Ma Q et al.: Tuina versus physiotherapy or a combination of both for chronic nonspecific low back pain, RCT. Complement Ther Med 2024 (Abstract)</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/41514247/" target="_blank" rel="noopener">Tan ICC et al.: Effectiveness of tuina and physiotherapy to manage pain for patients with chronic low back pain, pragmatic RCT. BMC Complement Med Ther 2026 (Volltext über PMC; Registrierung ChiMCTR2000004087)</a></li>
<li><a href="https://physioswiss.ch/profession/patienteninformation/" target="_blank" rel="noopener">Physioswiss: Informationen für Patient:innen (Verordnung, Kostenübernahme, Wahlfreiheit; Merkblätter vom 27.08.2024)</a></li>
<li><a href="https://www.bag.admin.ch/de/haeufige-fragen-faq-zum-gesundheitsberufegesetz-gesbg" target="_blank" rel="noopener">BAG: Häufige Fragen zum Gesundheitsberufegesetz GesBG (Physiotherapie als geregelter Gesundheitsberuf)</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/therapien/tuina/', label: 'Tuina Massage', cat: 'Therapie' },
      { href: '/therapien/physiotherapie/', label: 'Physiotherapie', cat: 'Therapie' },
      { href: '/wissen/akupunktur-oder-physiotherapie/', label: 'Akupunktur oder Physiotherapie', cat: 'Wissen' },
      { href: '/gesundheitsbibliothek/fragen/tuina-nebenwirkungen/', label: 'Tuina: Nebenwirkungen', cat: 'Frage' },
    ],
  },
];
