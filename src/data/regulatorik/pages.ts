// Regulatorik-Leaves. Volatile Fakten kommen aus FACTS (sources.ts) – nie hier duplizieren.
// Answer-first: Kurzantwort → Details → Nächster Schritt → FAQ → offizielle Quellen.
import { F, SOURCES, type SourceId } from './sources';

export interface RegPage {
  slug: string;
  nav: string;
  title: string;
  metaDesc: string;
  h1: string;
  lead: string;
  short: string;
  bodyHtml: string;
  faq: { q: string; a: string }[];
  cta: { title: string; text?: string; label: string; href: string; commercial?: boolean };
  ouch?: { label: string; url: string };
  sources: SourceId[];
  facts: string[];
  lastReviewed: string;
  reviewIntervalMonths: number;
}

const OUCH = 'https://ouch.tcm.ch/insights';
const R = '2026-09-30';
const NOT_VERIFIED = 'Aktuell konnten wir dafür keine eindeutige offizielle Angabe verifizieren.';

export const REG_PAGES: RegPage[] = [
  {
    slug: 'berufsausuebungsbewilligung', nav: 'BAB',
    title: 'Berufsausübungsbewilligung TCM: Was gilt in deinem Kanton?',
    metaDesc: 'Brauchst du als TCM-Therapeut:in eine Berufsausübungsbewilligung? Warum Kanton, Methode und Qualifikation entscheidend sind.',
    h1: 'Berufsausübungsbewilligung für TCM: Erst den Kanton prüfen.',
    lead: 'Brauche ich eine Berufsausübungsbewilligung? Bei TCM gibt es darauf keine einzige Schweizer Ja-oder-Nein-Antwort. Entscheidend sind dein Kanton, deine Qualifikation und teilweise sogar die konkrete Methode, die du anbieten möchtest.',
    short: 'Ob du eine Berufsausübungsbewilligung (BAB) brauchst, hängt vom Kanton ab – und teilweise von der konkreten Methode. Akupunktur kann anders geregelt sein als Tuina oder andere nichtinvasive Methoden. Weder das eidgenössische Diplom noch EMR oder ASCA sind selbst eine BAB.',
    bodyHtml: `
<h2>Es gibt nicht die eine Schweizer TCM-Bewilligung</h2>
<p>Der eidgenössische Berufsabschluss ist national. Die Berufsausübung wird jedoch kantonal geregelt. Deshalb können zwei Therapeut:innen mit vergleichbarer Ausbildung in unterschiedlichen Kantonen unterschiedliche administrative Voraussetzungen haben.</p>
<p>Und selbst innerhalb eines Kantons kann Akupunktur anders geregelt sein als nichtinvasive TCM-Methoden.</p>
<div class="pro-callout"><strong>Kanton + Methode + Qualifikation = zuerst prüfen.</strong><p>«TCM» allein ist als Antwort zu ungenau.</p></div>
<h2>Akupunktur ist ein gutes Beispiel</h2>
<p>Akupunktur ist invasiv. Deshalb behandeln mehrere Kantone die Methode regulatorisch anders als Tuina, Diätetik oder andere nichtinvasive Verfahren. Die chinesische Arzneitherapie berührt zusätzlich das Heilmittelrecht (siehe <a href="/regulatorik/chinesische-arzneimittel-abgabe/">Arzneimittelabgabe</a>).</p>
<p>Ein Beispiel ist der Kanton Zürich: Die Gesundheitsdirektion führt für Akupunktur ein eigenes Merkblatt, getrennt von der übrigen nichtärztlichen Komplementärmedizin. Welche Voraussetzungen dort konkret gelten, liest du im aktuellen Merkblatt nach (Quelle unten). Wichtig: Aus Zürich lässt sich nichts für andere Kantone ableiten.</p>
<h2>Was du vor einer Praxiseröffnung prüfen solltest</h2>
<ol>
<li>In welchem Kanton arbeitest du?</li>
<li>Welche Methode möchtest du ausüben?</li>
<li>Welchen Berufsabschluss besitzt du?</li>
<li>Arbeitest du in eigener fachlicher Verantwortung?</li>
<li>Befindest du dich noch im M7?</li>
<li>Gibt es eine kantonale Melde- oder Bewilligungspflicht?</li>
<li>Planst du Arzneimittelabgabe?</li>
<li>Arbeitest du über eine Einzelpraxis oder eine juristische Person (AG/GmbH)?</li>
</ol>
<p>Punkt 8 ist ein eigenes Thema: Ob eine Praxisgesellschaft zusätzlich eine Betriebsbewilligung braucht, ist kantonal sehr unterschiedlich. Diese Seite ist bei uns in Vorbereitung, bis wir die kantonalen Regeln verglichen haben.</p>
<h2>EMR ist keine BAB</h2>
<p>Eine <a href="/regulatorik/emr/">EMR</a>- oder <a href="/regulatorik/asca/">ASCA</a>-Registrierung ersetzt keine kantonale Berufsausübungsbewilligung. Ebenso ist das <a href="/regulatorik/oda-am/">eidgenössische Diplom</a> nicht selbst die BAB – es ist ein Berufsabschluss, den Kantone in ihren Voraussetzungen berücksichtigen können.</p>
<h2>Du wechselst den Kanton?</h2>
<p>Dann fängst du nicht zwingend bei null an. Das Binnenmarktgesetz (BGBM) sieht grundsätzlich vor, dass eine kantonale Bewilligung in anderen Kantonen berücksichtigt wird. Wie das konkrete Verfahren im neuen Kanton aussieht, prüfst du dort.</p>
<h2>Zeitpunkt</h2>
<p><strong>Klär die Bewilligung, bevor du einen langfristigen Mietvertrag unterschreibst – nicht nachdem die Praxis eingerichtet ist.</strong></p>`,
    faq: [
      { q: 'Brauche ich mit eidgenössischem Diplom noch eine BAB?', a: 'Das hängt vom Kanton ab. Das eidgenössische Diplom ist ein Berufsabschluss, keine Berufsausübungsbewilligung. Ob und wie dein Kanton eine Bewilligung verlangt, siehst du im Kanton-Navigator und bei der kantonalen Behörde.' },
      { q: 'Kann ich mit dem Zertifikat OdA AM bereits arbeiten?', a: 'Das hängt vom Kanton und deiner Tätigkeit ab. Das Zertifikat OdA AM ist nicht das eidgenössische Diplom. Einige Kantone kennen Regeln für die Zeit im M7, andere nicht – prüfe die kantonale Primärquelle.' },
      { q: 'Brauche ich EMR für die BAB?', a: 'Nicht pauschal. BAB und EMR sind getrennte Systeme mit unterschiedlichen Aufgaben. Welche Nachweise dein Kanton verlangt, legt die kantonale Behörde fest.' },
      { q: 'Gilt meine BAB auch in einem anderen Kanton?', a: 'Nicht automatisch. Das Binnenmarktgesetz erleichtert die Anerkennung einer bestehenden kantonalen Bewilligung, das Verfahren läuft aber im neuen Kanton.' },
      { q: 'Brauche ich im M7 eine BAB?', a: 'Das hängt vom Kanton ab. Gerade für die Berufspraxis unter Mentorat gibt es kantonal unterschiedliche Regeln.' },
    ],
    cta: { title: 'Was gilt in deinem Kanton?', text: 'Der Navigator bündelt die kantonalen Regeln mit Link zur zuständigen Stelle.', label: 'Zu den Regeln in deinem Kanton', href: '/regulatorik/kantone/' },
    ouch: { label: 'Die Kantons-Lotterie', url: `${OUCH}/kantons-lotterie/` },
    sources: ['zhKomplementaer', 'zhAkupunktur', 'bgbm'],
    facts: [], lastReviewed: R, reviewIntervalMonths: 3,
  },
  {
    slug: 'oda-am', nav: 'OdA AM',
    title: 'OdA AM: Zertifikat, M7 & eidgenössisches Diplom erklärt',
    metaDesc: 'Was macht die OdA AM? Module M1–M7, Zertifikat OdA AM, Mentorat, Höhere Fachprüfung und eidgenössisches Diplom TCM verständlich erklärt.',
    h1: 'OdA AM: Vom Ausbildungsweg zum eidgenössischen Diplom.',
    lead: 'M1 bis M7, Zertifikat OdA AM und Höhere Fachprüfung gehören zum selben Berufsweg – sind aber nicht dasselbe. Hier siehst du, an welcher Stelle welcher Begriff relevant wird.',
    short: 'Die OdA AM ist Trägerin der Höheren Fachprüfung (HFP) für Naturheilpraktiker:innen. Der Weg führt über die Module M1–M6 zum Zertifikat OdA AM, dann über M7 (Berufspraxis unter Mentorat) zur HFP und zum eidgenössischen Diplom. Das Zertifikat ist nicht das Diplom – und das Diplom ist keine Berufsausübungsbewilligung.',
    bodyHtml: `
<h2>Was ist die OdA AM?</h2>
<p>Die Organisation der Arbeitswelt Alternativmedizin Schweiz (OdA AM) ist die Trägerschaft der Höheren Fachprüfung für Naturheilpraktiker:innen. Sie ist keine staatliche Gesundheitsbehörde und erteilt keine Berufsausübungsbewilligungen. Sie definiert den Bildungs- und Prüfungsweg, akkreditiert Bildungsanbieter und Mentoratspersonen und führt die Prüfung durch.</p>
<h2>Der Weg auf einen Blick</h2>
<div class="b2-tablewrap"><table><thead><tr><th>Schritt</th><th>Was es ist</th></tr></thead><tbody>
<tr><td>M1–M6</td><td>Ausbildungsmodule mit Modulabschlüssen bei akkreditierten Bildungsanbietern</td></tr>
<tr><td>Zertifikat OdA AM</td><td>Dokumentiert den abgeschlossenen Ausbildungsstand</td></tr>
<tr><td>M7</td><td>Berufspraxis unter Mentorat</td></tr>
<tr><td>HFP</td><td>Höhere Fachprüfung</td></tr>
<tr><td>Eidg. Diplom</td><td>Geschützter eidgenössischer Titel</td></tr>
</tbody></table></div>
<h2>M1 bis M6</h2>
<p>Die Module decken unterschiedliche Kompetenzbereiche ab – von Grundlagen über die fachrichtungsspezifische Ausbildung bis zur Praxisorganisation. Massgebend sind die aktuellen Modulbeschreibungen der OdA AM, nicht die Modulübersicht einer einzelnen Schule.</p>
<h2>Zertifikat OdA AM</h2>
<p>Du hast das Zertifikat OdA AM. Bist du jetzt diplomiert? Nein. Das Zertifikat dokumentiert einen wichtigen Ausbildungsstand und ist ein Schritt auf dem Weg zur HFP. Es ist <strong>nicht</strong> das eidgenössische Diplom.</p>
<h2>M7: Jetzt beginnt die Berufspraxis.</h2>
<p>M7 trägt offiziell den Namen «Berufspraxis unter Mentorat». Hier wendest du deine bisher erworbenen Kompetenzen in der realen Praxistätigkeit an und wirst von einer akkreditierten Mentoratsperson begleitet.</p>
<p>${F.m7Hours} Massgebend ist die aktuell geltende OdA-AM-Richtlinie.</p>
<p>Ob du während M7 im eigenen Namen behandeln darfst, regelt nicht die OdA AM, sondern dein Kanton.</p>
<h2>Höhere Fachprüfung und eidgenössisches Diplom</h2>
<p>Mit bestandener HFP erhältst du den geschützten eidgenössischen Titel. In der Fachrichtung TCM lautet er: <strong>${F.title}</strong>. Der Abschluss gehört zur höheren Berufsbildung. Zulassung, Prüfungsteile und Termine stehen in der aktuellen Prüfungsordnung und Wegleitung.</p>
<h2>Und die Berufsausübung?</h2>
<p>Das eidgenössische Diplom ist ein Berufsabschluss. Ob und mit welcher Bewilligung du in einem Kanton arbeiten darfst, entscheidet der Kanton. Mehr dazu unter <a href="/regulatorik/berufsausuebungsbewilligung/">Berufsausübungsbewilligung</a>. Registrierungen bei <a href="/regulatorik/emr/">EMR</a> oder <a href="/regulatorik/asca/">ASCA</a> sind wiederum eine eigene Ebene.</p>`,
    faq: [
      { q: 'Ist das Zertifikat OdA AM das eidgenössische Diplom?', a: 'Nein. Das Zertifikat dokumentiert den Ausbildungsstand. Das eidgenössische Diplom erhältst du erst mit bestandener Höherer Fachprüfung.' },
      { q: 'Was ist M7?', a: 'M7 heisst «Berufspraxis unter Mentorat»: Du arbeitest in der Praxis und wirst von einer akkreditierten Mentoratsperson begleitet. Umfang und Nachweise legt die aktuelle OdA-AM-Richtlinie fest.' },
      { q: 'Ist die OdA AM eine Behörde?', a: 'Nein. Sie ist Trägerin der Höheren Fachprüfung. Berufsausübungsbewilligungen erteilen die Kantone.' },
      { q: 'Darf ich mit dem eidgenössischen Diplom überall arbeiten?', a: 'Nicht automatisch. Die Berufsausübung regeln die Kantone. Prüfe die Voraussetzungen deines Kantons.' },
      { q: 'Wo finde ich eine Mentoratsperson?', a: 'Die OdA AM akkreditiert Mentoratspersonen. Anbieter wie die TCM.ch Akademie bieten M7-Begleitung an; offizielle Voraussetzungen legt die OdA AM fest.' },
    ],
    cta: { title: 'M7 & Mentoring bei TCM.ch', text: 'Eigenes Angebot von TCM.ch – nicht die offizielle OdA-AM-Stelle. Wir begleiten dich durch die Berufspraxis unter Mentorat.', label: 'M7 & Mentoring bei TCM.ch', href: '/akademie/', commercial: true },
    sources: ['odaAmHfp', 'odaAmModule', 'odaAmM7', 'sbfiTitel'],
    facts: ['m7Name', 'm7Hours', 'title'], lastReviewed: R, reviewIntervalMonths: 6,
  },
  {
    slug: 'emr', nav: 'EMR',
    title: 'EMR Registrierung TCM: Voraussetzungen & Ablauf',
    metaDesc: 'EMR für TCM-Therapeut:innen: Registrierung, Methodenliste, Qualitätslabel, Weiterbildung, ZSR und der Unterschied zu BAB und ASCA.',
    h1: 'EMR: Was die Registrierung bedeutet – und was nicht.',
    lead: 'EMR begegnet dir spätestens dann, wenn Zusatzversicherungen ins Spiel kommen. Trotzdem ist das Qualitätslabel weder Berufsbewilligung noch allgemeine Zahlungsgarantie.',
    short: 'Das EMR ist ein privates Registrierungssystem mit Qualitätslabel für Therapeut:innen der Erfahrungsmedizin. Das Label gilt ein Jahr und wird jährlich erneuert. Viele Versicherer nutzen EMR-Daten – eine Kostenübernahme garantiert es trotzdem nicht, und eine kantonale Bewilligung ersetzt es nicht.',
    bodyHtml: `
<h2>Was ist EMR?</h2>
<p>Das ErfahrungsMedizinische Register (EMR) prüft, ob Therapeut:innen seine Qualitätskriterien erfüllen, und vergibt dafür ein Qualitätslabel. Registriert wirst du für eine Methode oder einen Berufsabschluss – nicht für «TCM allgemein». Massgebend sind das EMR-Reglement (gültig ab 01.01.2026) und die Methodenliste 2026.</p>
<h2>Verfahren A und B</h2>
<p>${F.emrProcedures}</p>
<p>Praktisch heisst das: Mit einem anerkannten Berufsabschluss wie dem eidgenössischen Diplom kann der Weg einfacher sein als bei einer Registrierung über einzelne Methoden. Welches Verfahren für dich gilt, steht in den aktuellen Registrierungsbedingungen.</p>
<h2>Was prüft EMR?</h2>
<ul class="b2-check-list"><li>Ausbildung gemäss Methodenliste bzw. Berufsabschluss</li><li>guter Leumund</li><li>Berufshaftpflichtversicherung</li><li>praktische Erfahrung</li><li>Fort- und Weiterbildung</li><li>Einhaltung des Berufskodex</li></ul>
<h2>Wie lange gilt das Qualitätslabel?</h2>
<p>${F.emrLabelYear} Für die Erneuerung weist du unter anderem deine Fort- und Weiterbildung nach.</p>
<h2>Weiterbildung</h2>
<p>Den genauen Stundenumfang regelt die aktuelle Fort- und Weiterbildungsordnung des EMR. ${NOT_VERIFIED} Übernimm deshalb keine Stundenzahl aus älteren Dokumenten, sondern lies die aktuelle Ordnung.</p>
<h2>Was passiert mit der ZSR?</h2>
<p>${F.emrZsr} Das heisst nicht, dass jede ZSR-Konstellation gleich funktioniert – etwa bei mehreren Kantonen. Details unter <a href="/regulatorik/zsr/">ZSR-Nummer</a>.</p>
<h2>Was EMR nicht bedeutet</h2>
<ul><li>keine kantonale Berufsausübungsbewilligung</li><li>kein eidgenössisches Diplom</li><li>keine Aussage über Wirksamkeit oder Behandlungserfolg</li><li>keine garantierte Vergütung durch Versicherer – und keine automatische Anerkennung bei Versicherern mit eigenem Verfahren (z. B. EGK, Visana)</li><li>kein Ersatz für kantonale Regeln</li></ul>`,
    faq: [
      { q: 'Wie lange ist eine EMR-Registrierung gültig?', a: 'Das Qualitätslabel gilt jeweils ein Jahr und wird jährlich erneuert. Die Erneuerung setzt unter anderem den Nachweis von Fort- und Weiterbildung voraus.' },
      { q: 'Zahlt die Zusatzversicherung automatisch, wenn ich EMR-registriert bin?', a: 'Nein. Viele Versicherer nutzen EMR-Daten, entscheiden aber nach ihrem eigenen Produkt und ihren Bedingungen.' },
      { q: 'Ersetzt EMR die kantonale Bewilligung?', a: 'Nein. EMR und BAB sind getrennte Systeme. Ob du eine BAB brauchst, entscheidet dein Kanton.' },
      { q: 'Bekomme ich über EMR eine ZSR-Nummer?', a: 'Im aktuellen EMR-Prozess wird nach erfolgreicher Zertifizierung auch eine ZSR-Nummer bereitgestellt. Bei mehreren Kantonen können separate Nummern nötig sein.' },
      { q: 'Wie viele Weiterbildungsstunden verlangt EMR?', a: 'Das regelt die aktuelle Fort- und Weiterbildungsordnung des EMR. Wir nennen hier bewusst keine Zahl, solange wir sie nicht in der aktuellen Fassung geprüft haben.' },
    ],
    cta: { title: 'EMR und ASCA vergleichen', text: 'Was Registrierungen für die Zusatzversicherung bedeuten – und was nicht.', label: 'EMR, ASCA & Krankenkassen', href: '/regulatorik/krankenkassen-anerkennung/' },
    ouch: { label: 'Das EMR/ASCA-Labyrinth', url: `${OUCH}/emr-asca-labyrinth/` },
    sources: ['emrReglement', 'emrMethoden', 'emrWeiterbildung'],
    facts: ['emrProcedures', 'emrLabelYear', 'emrZsr'], lastReviewed: R, reviewIntervalMonths: 6,
  },
  {
    slug: 'asca', nav: 'ASCA',
    title: 'ASCA Anerkennung TCM: Voraussetzungen & Weiterbildung',
    metaDesc: 'ASCA für TCM-Therapeut:innen: Anerkennungsverfahren, Methodenliste, Weiterbildung, Versicherer und Unterschied zu EMR und BAB.',
    h1: 'ASCA: Anerkennung ist mehr als ein Eintrag auf einer Liste.',
    lead: 'ASCA ist eines der etablierten Anerkennungssysteme der Schweizer Komplementärmedizin. Entscheidend ist aber nicht einfach «ASCA ja oder nein», sondern für welche Methode du anerkannt bist und welche aktuellen Anforderungen dafür gelten.',
    short: 'Die Stiftung ASCA anerkennt Therapeut:innen methodenbezogen nach ihren Reglementen und ihrer Methodenliste. Nach der Anerkennung gilt eine jährliche Weiterbildungspflicht von mindestens 16 Stunden. Eine ASCA-Anerkennung ist weder Berufsausübungsbewilligung noch Kostengarantie.',
    bodyHtml: `
<h2>Was ist ASCA?</h2>
<p>Die Stiftung ASCA führt ein Anerkennungssystem für Therapeut:innen der Komplementär- und Alternativmedizin. Grundlage sind das Allgemeine Anerkennungsreglement, das Ausführungsreglement und die Methodenliste.</p>
<h2>Methoden</h2>
<p>Anerkannt wirst du für eine konkrete Methode der ASCA-Methodenliste. Welche TCM-Methoden dort mit welchen Ausbildungsanforderungen geführt werden, übernimmst du direkt aus der aktuellen Methodenliste – nicht aus älteren Sekundärartikeln.</p>
<h2>Anerkennungsverfahren</h2>
<ol><li>Methode bestimmen.</li><li>Aktuelle Anforderungen der Methodenliste prüfen.</li><li>Diplome und Ausbildungsnachweise vorbereiten.</li><li>Gesuch einreichen.</li><li>ASCA prüft das Dossier.</li><li>Nach der Anerkennung: laufende Weiterbildungspflicht.</li></ol>
<h2>Weiterbildung</h2>
<p>${F.ascaCpd}</p>
<p>Bist du Mitglied eines Berufsverbands mit ASCA-Vereinbarung, können die Weiterbildungsregeln des Verbands massgebend sein.</p>
<h2>ASCA und Versicherer</h2>
<p>ASCA arbeitet mit Partnerversicherern zusammen. Anerkennung heisst trotzdem nicht automatische Kostenübernahme: Versicherungsprodukt, Methode und aktuelle Bedingungen bleiben entscheidend. Einzelne Versicherer wie EGK oder Visana haben zudem eigene Verfahren. Mehr dazu unter <a href="/regulatorik/krankenkassen-anerkennung/">Krankenkassen & Anerkennung</a>.</p>
<h2>EMR oder ASCA?</h2>
<p>Keines ist pauschal «besser». Es sind separate Systeme. Relevant sind deine Methode, deine berufliche Situation, die Versicherer deiner Patient:innen und die aktuellen Anerkennungsbedingungen. Siehe auch <a href="/regulatorik/emr/">EMR</a>.</p>
<h2>Was ASCA nicht ersetzt</h2>
<ul><li>keine kantonale <a href="/regulatorik/berufsausuebungsbewilligung/">Berufsausübungsbewilligung</a></li><li>kein eidgenössisches Diplom</li><li>keine automatische <a href="/regulatorik/zsr/">ZSR-Nummer</a></li><li>keine Kostengutsprache einer beliebigen Zusatzversicherung</li></ul>`,
    faq: [
      { q: 'Wie viele Weiterbildungsstunden verlangt ASCA?', a: 'Mindestens 16 Stunden pro Jahr, grundsätzlich ab dem Kalenderjahr nach der Anerkennung. Bei Verbänden mit ASCA-Vereinbarung können Verbandsregeln massgebend sein.' },
      { q: 'Gilt eine ASCA-Anerkennung für alle TCM-Methoden?', a: 'Nein. Die Anerkennung ist methodenbezogen. Massgebend ist die aktuelle ASCA-Methodenliste.' },
      { q: 'Ist ASCA dasselbe wie EMR?', a: 'Nein. Beide sind eigenständige Organisationen mit eigenen Reglementen und Verfahren.' },
      { q: 'Bezahlt die Zusatzversicherung mit ASCA automatisch?', a: 'Nein. Der Versicherer entscheidet nach Produkt und Bedingungen.' },
      { q: 'Ersetzt ASCA die kantonale Bewilligung?', a: 'Nein. Ob du eine Berufsausübungsbewilligung brauchst, entscheidet dein Kanton.' },
    ],
    cta: { title: 'Was zahlt die Zusatzversicherung?', text: 'Registrierung, Methode, Produkt: wie die vier Faktoren zusammenspielen.', label: 'EMR, ASCA & Krankenkassen', href: '/regulatorik/krankenkassen-anerkennung/' },
    ouch: { label: 'Das EMR/ASCA-Labyrinth', url: `${OUCH}/emr-asca-labyrinth/` },
    sources: ['ascaArg', 'ascaArarg', 'ascaMethoden'],
    facts: ['ascaCpd'], lastReviewed: R, reviewIntervalMonths: 6,
  },
  {
    slug: 'zsr', nav: 'ZSR',
    title: 'ZSR-Nummer für TCM-Therapeut:innen: Antrag & Bedeutung',
    metaDesc: 'Was ist eine ZSR-Nummer für TCM-Therapeut:innen? Abrechnung, Kantonsbezug, mehrere Standorte und Unterschied zu EMR, ASCA und GLN.',
    h1: 'ZSR: Die Nummer für den Abrechnungsprozess.',
    lead: 'Die ZSR-Nummer begegnet dir spätestens auf der Rechnung. Sie ist aber weder Berufsdiplom noch Berufsausübungsbewilligung noch Qualitätslabel.',
    short: 'Die ZSR-Nummer identifiziert dich als Leistungserbringer:in im Zahlstellenregister von santéservices/SASIS und vereinfacht die Abrechnung mit Versicherern. Sie ist kantonsbezogen: Arbeitest du in mehreren Kantonen, kann pro Kanton eine eigene Nummer nötig sein. Für Komplementärtherapeut:innen läuft der Weg typischerweise über die Zertifizierungsstelle.',
    bodyHtml: `
<h2>Was ist die ZSR?</h2>
<p>Das Zahlstellenregister (ZSR) wird von santéservices/SASIS geführt. Die ZSR-Nummer dient der vereinfachten Leistungsabrechnung und gehört auf die entsprechenden Rechnungen.</p>
<div class="pro-callout"><strong>Kantonsbezug</strong><p>${F.zsrCanton}</p></div>
<h2>Wie bekommst du als TCM-Therapeut:in eine ZSR?</h2>
<p>${F.zsrViaCert} Beim EMR etwa wird nach erfolgreicher Zertifizierung auch eine ZSR-Nummer bereitgestellt (siehe <a href="/regulatorik/emr/">EMR</a>). Es gibt also nicht das eine Antragsformular, das alle gleich ausfüllen. Massgebend sind die aktuellen Angaben von santéservices/SASIS und deiner Zertifizierungsstelle.</p>
<h2>Was die ZSR nicht ist</h2>
<ul>
<li><strong>Nicht die GLN:</strong> Die GLN ist ein eindeutiger Personenidentifikator. Mehr unter <a href="/regulatorik/gln-zsr-nareg/">GLN, ZSR & NAREG</a>.</li>
<li><strong>Nicht die BAB:</strong> Ob du arbeiten darfst, regelt der Kanton (<a href="/regulatorik/berufsausuebungsbewilligung/">Berufsausübungsbewilligung</a>).</li>
<li><strong>Nicht EMR oder ASCA:</strong> Eine Registrierung kann Teil des Weges zur ZSR sein, erfüllt aber eine andere Funktion.</li>
</ul>
<h2>Und auf der Rechnung?</h2>
<p>Die ZSR ist eine der Angaben, die eine Rechnung nach <a href="/regulatorik/tarif-590/">Tarif 590</a> enthält. Ob der Versicherer bezahlt, entscheidet weiterhin sein Produkt.</p>`,
    faq: [
      { q: 'Was ist eine ZSR-Nummer?', a: 'Eine Nummer im Zahlstellenregister von santéservices/SASIS. Sie identifiziert dich als Leistungserbringer:in und vereinfacht die Abrechnung mit Versicherern.' },
      { q: 'Brauche ich für jeden Kanton eine eigene ZSR?', a: 'Möglicherweise. ZSR-Nummern sind dem Kanton zugeordnet, in dem du Leistungen erbringst. Bei mehreren Kantonen können separate Nummern nötig sein.' },
      { q: 'Wie beantrage ich als TCM-Therapeut:in eine ZSR?', a: 'Für Komplementärtherapeut:innen läuft das typischerweise über die Zertifizierungsstelle. Die aktuellen Schritte nennen santéservices/SASIS und deine Zertifizierungsstelle.' },
      { q: 'Ist ZSR dasselbe wie GLN?', a: 'Nein. Die GLN ist ein eindeutiger Identifikator, die ZSR dient der Abrechnung und ist kantonsbezogen.' },
      { q: 'Darf ich mit einer ZSR-Nummer in jedem Kanton arbeiten?', a: 'Nein. Die ZSR sagt nichts darüber, ob du arbeiten darfst. Das regelt der Kanton.' },
    ],
    cta: { title: 'Wie rechnest du ab?', text: 'Rechnungsstandard, Tarifpositionen und aktuelle Versionen.', label: 'Tarif 590 verstehen', href: '/regulatorik/tarif-590/' },
    sources: ['sasisZsr', 'emrReglement'],
    facts: ['zsrCanton', 'zsrViaCert', 'emrZsr'], lastReviewed: R, reviewIntervalMonths: 6,
  },
  {
    slug: 'gln-zsr-nareg', nav: 'GLN',
    title: 'GLN, ZSR & NAREG: Welche Nummer brauchst du als TCM-Therapeut?',
    metaDesc: 'GLN, ZSR und NAREG verständlich erklärt: Welche Funktion die Nummern und Register für TCM-Therapeut:innen in der Schweiz haben.',
    h1: 'GLN, ZSR, NAREG: Drei Begriffe, drei verschiedene Aufgaben.',
    lead: 'Du hast eine GLN, eine ZSR und findest dich vielleicht zusätzlich in einem Berufsregister. Das sieht nach drei Varianten derselben Sache aus. Ist es aber nicht.',
    short: 'Die GLN ist ein eindeutiger Identifikator für deine Person. Die ZSR-Nummer dient der Abrechnung mit Versicherern und ist kantonsbezogen. NAREG ist ein nationales Register der Gesundheitsberufe. Keines davon ist eine Berufsausübungsbewilligung oder ein Qualitätslabel.',
    bodyHtml: `
<h2>GLN</h2>
<p>Die GLN (Global Location Number) identifiziert dich eindeutig – über Systeme und Organisationen hinweg. Sie ist kein Qualitätssiegel und keine Bewilligung.</p>
<h2>ZSR</h2>
<p>Die ZSR-Nummer gehört zum Abrechnungssystem mit den Versicherern. ${F.zsrCanton} Details unter <a href="/regulatorik/zsr/">ZSR-Nummer</a>.</p>
<h2>NAREG und Register</h2>
<p>NAREG ist das nationale Register der Gesundheitsberufe. Register dieser Art können Angaben zu Ausbildung, Beruf und Bewilligungen sichtbar machen. Ob und wie TCM-Fachpersonen darin erscheinen, hängt vom Register und vom jeweiligen Beruf ab. ${NOT_VERIFIED} Prüfe die Registerabdeckung direkt beim Register.</p>
<h2>Vereinfacht auf einen Blick</h2>
<div class="b2-tablewrap"><table><thead><tr><th></th><th>GLN</th><th>ZSR</th><th>BAB</th><th>EMR/ASCA</th></tr></thead><tbody>
<tr><td>Identifikation</td><td>✓</td><td></td><td></td><td></td></tr>
<tr><td>Abrechnung</td><td></td><td>✓</td><td></td><td></td></tr>
<tr><td>Berufsausübung</td><td></td><td></td><td>✓</td><td></td></tr>
<tr><td>Qualitätslabel</td><td></td><td></td><td></td><td>✓</td></tr>
</tbody></table></div>
<p class="b2-note">Vereinfachte Orientierung, keine vollständige rechtliche Matrix.</p>
<h2>Was brauchst du wirklich?</h2>
<p>Nicht «möglichst viele Nummern», sondern die richtige Reihenfolge: zuerst klären, ob du im Kanton arbeiten darfst (<a href="/regulatorik/berufsausuebungsbewilligung/">BAB</a>), dann Registrierung (<a href="/regulatorik/emr/">EMR</a>/<a href="/regulatorik/asca/">ASCA</a>), dann Abrechnung (ZSR, <a href="/regulatorik/tarif-590/">Tarif 590</a>).</p>`,
    faq: [
      { q: 'Ist die GLN eine Berufsausübungsbewilligung?', a: 'Nein. Die GLN ist ein Identifikator. Die Berufsausübung regelt der Kanton.' },
      { q: 'Ist die GLN dasselbe wie die ZSR?', a: 'Nein. Die GLN identifiziert dich eindeutig; die ZSR dient der Abrechnung und ist kantonsbezogen.' },
      { q: 'Muss ich als TCM-Therapeut:in im NAREG stehen?', a: 'Das lässt sich nicht pauschal sagen. Die Registerabdeckung hängt vom Beruf ab. Prüfe sie direkt beim Register.' },
      { q: 'Welche Nummer gehört auf die Rechnung?', a: 'Für die Abrechnung mit Zusatzversicherern ist die ZSR-Nummer relevant. Welche Angaben eine Rechnung sonst enthält, regelt der Tarif-590-Standard.' },
    ],
    cta: { title: 'Wie kommst du zur ZSR?', label: 'ZSR-Nummer erklärt', href: '/regulatorik/zsr/' },
    sources: ['refdataGln', 'sasisZsr', 'nareg'],
    facts: ['zsrCanton'], lastReviewed: R, reviewIntervalMonths: 6,
  },
  {
    slug: 'tarif-590', nav: 'Tarif 590',
    title: 'Tarif 590 TCM: Leistungen richtig abrechnen',
    metaDesc: 'Tarif 590 für TCM-Therapeut:innen: Rechnungsstandard, Tarifpositionen, Zusatzversicherung und was du bei der Abrechnung beachten musst.',
    h1: 'Tarif 590: So wird Komplementärmedizin einheitlich abgerechnet.',
    lead: 'Tarif 590 ist kein Behandlungstarif im Sinn eines vorgeschriebenen Stundenpreises. Er schafft eine gemeinsame Struktur, damit komplementärmedizinische Leistungen gegenüber Zusatzversicherern einheitlich bezeichnet und abgerechnet werden können.',
    short: 'Tarif 590 ist die gemeinsame Leistungs- und Abrechnungsstruktur für Komplementärmedizin im Zusatzversicherungsbereich (VVG). Er legt fest, wie Leistungen bezeichnet und abgerechnet werden – nicht, dass ein Versicherer bezahlt. Arbeite immer mit der aktuellen Version.',
    bodyHtml: `
<h2>Was ist Tarif 590?</h2>
<p>Der Tarif 590 ist die schweizweit gültige Liste ambulanter komplementärmedizinischer Leistungen im Bereich der Zusatzversicherung (VVG). Laut OdA AM umfasst er über 100 Tarifpositionen für einzelne Methoden und Verrichtungen.</p>
<p>Seit <strong>1. Januar 2018</strong> ist die Abrechnung komplementärmedizinischer Leistungen nach Tarif 590 verbindlich. Das einheitliche Rechnungsformular ist seit <strong>1. April 2018</strong> obligatorisch.</p>
<h2>Was gilt 2026?</h2>
<p>Seit <strong>1. Januar 2022</strong> akzeptieren die Krankenversicherer gemäss OdA AM nur noch Rechnungen bzw. Rückforderungsbelege, die dem aktuellen Rechnungsstandard entsprechen. Die OdA AM weist deshalb auf die Nutzung einer professionellen Software-Lösung hin.</p>
<p>Für 2026 stellt die OdA AM separate aktuelle Tarifunterlagen bereit für Naturheilpraktiker:innen mit eidgenössischem Diplom bzw. Zertifikat OdA AM sowie Unterlagen für EMR und ASCA. Arbeite deshalb immer mit der aktuellen Fassung und nicht mit einer lokal gespeicherten alten Tarifliste.</p>
<h2>Ist der Preis vorgeschrieben?</h2>
<p>Tarifposition und Behandlungspreis sind nicht dasselbe. Tarif 590 strukturiert, <em>welche</em> Leistung du abrechnest. Er ist keine pauschale Vorgabe dafür, welchen Stundenpreis jede Praxis verlangen muss. Für die konkrete Rechnungsstellung gelten die aktuellen Tarifunterlagen und die Regeln des jeweiligen Versicherers.</p>
<h2>Was gehört auf die Rechnung?</h2>
<ul class="b2-check-list"><li>Rechnung im aktuellen Tarif-590-Standard</li><li>passende Tarifziffern gemäss aktueller Version</li><li>notwendige Angaben zu dir als Leistungserbringer:in</li><li>deine <a href="/regulatorik/zsr/">ZSR-Nummer</a></li><li>eine Software-/Abrechnungslösung, die den aktuellen Rechnungsstandard korrekt erzeugt</li></ul>
<p>Visana bestätigt beispielsweise für ihre anerkannten Komplementärtherapeut:innen ausdrücklich die Abrechnung über eine Softwarelösung und das standardisierte Formular nach Tarif 590. Welche Software du verwendest, bleibt dir überlassen, solange sie die aktuellen Anforderungen erfüllt.</p>
<div class="pro-callout"><strong>Speichere keine Tarifliste von vor drei Jahren und arbeite einfach weiter damit.</strong><p>Prüfe bei Änderungen deiner Rechnungsvorlagen immer zuerst die aktuelle Version bei OdA AM bzw. santéservices/SASIS.</p></div>
<h2>Tarif 590 ist keine Kostengutsprache</h2>
<p>Eine formal korrekte Rechnung bedeutet nicht automatisch, dass die Zusatzversicherung bezahlt. Entscheidend bleiben Versicherungsprodukt, anerkannte Methode und Anerkennungsstatus der behandelnden Person. Mehr unter <a href="/regulatorik/krankenkassen-anerkennung/">Krankenkassen & Anerkennung</a>.</p>`,
    faq: [
      { q: 'Schreibt Tarif 590 meinen Stundenpreis vor?', a: 'Tarif 590 ist in erster Linie eine Leistungs- und Abrechnungsstruktur. Welche Preisregeln gelten, steht in den aktuellen Tarif-590-Unterlagen.' },
      { q: 'Brauche ich eine ZSR-Nummer für Tarif-590-Rechnungen?', a: 'Die ZSR ist eine der Angaben auf der Rechnung an Zusatzversicherer. Details unter ZSR-Nummer.' },
      { q: 'Muss ich eine bestimmte Software nutzen?', a: 'Nicht zwingend eine bestimmte. Die Lösung muss den aktuellen Standard korrekt erfüllen.' },
      { q: 'Zahlt der Versicherer, wenn die Rechnung korrekt ist?', a: 'Nicht automatisch. Die Übernahme hängt vom Produkt und den Bedingungen des Versicherers ab.' },
      { q: 'Wo finde ich die aktuelle Version?', a: 'Bei der OdA AM (Tarif-590-Unterlagen). Prüfe sie regelmässig.' },
    ],
    cta: { title: 'Wer bezahlt am Ende?', label: 'EMR, ASCA & Krankenkassen', href: '/regulatorik/krankenkassen-anerkennung/' },
    sources: ['odaAmTarif590', 'sasisZsr', 'visanaTherapeuten'],
    facts: [], lastReviewed: R, reviewIntervalMonths: 6,
  },
  {
    slug: 'krankenkassen-anerkennung', nav: 'Versicherer',
    title: 'EMR, ASCA & Krankenkassen: Wer bezahlt TCM?',
    metaDesc: 'Bedeutet EMR oder ASCA automatisch Kostenübernahme? Wie Zusatzversicherung, Methode, Therapeut:in und Versicherungsprodukt bei TCM zusammenspielen.',
    h1: 'EMR anerkannt – zahlt die Krankenkasse jetzt automatisch?',
    lead: 'Nein. Eine Registrierung kann eine wichtige Voraussetzung sein, aber sie ist keine allgemeine Zahlungsgarantie. In der Zusatzversicherung entscheidet am Ende das konkrete Versicherungsprodukt.',
    short: 'Nein. EMR oder ASCA können wichtige Voraussetzungen sein, aber Versicherer legen ihre Anerkennungsregeln selbst fest. Einige arbeiten eng mit Registrierungsstellen zusammen, andere – etwa Visana – führen ein eigenes Anerkennungsverfahren. Auch EGK hat eine eigene Therapeutenregistrierung.',
    bodyHtml: `
<p>Diese Seite behandelt nichtärztliche TCM-Therapeut:innen im Bereich der Zusatzversicherung (VVG). Ärztliche Komplementärmedizin ist ein eigener Kontext. Für Patient:innen erklärt TCM.ch das Thema unter <a href="/krankenkassen/">Krankenkasse & TCM</a>.</p>
<h2>Warum EMR und ASCA trotzdem wichtig sind</h2>
<p><a href="/regulatorik/emr/">EMR</a> und <a href="/regulatorik/asca/">ASCA</a> sind übergreifende Registrierungs- und Qualitätssysteme. Verschiedene Versicherer berücksichtigen sie bei ihren Entscheiden. Eine automatische, universelle Kostenübernahme folgt daraus nicht.</p>
<p>EMR und ASCA decken einen grossen Teil der Registrierungslandschaft ab. Einzelne Versicherer haben jedoch eigene Anerkennungsverfahren. Besonders EGK und Visana solltest du separat prüfen.</p>
<h2 id="egk">EGK: separate Registrierung</h2>
<p>${F.egkOwn}</p>
<p>Deine EMR-Registrierung ist dafür relevant, ersetzt die EGK-Registrierung aber nicht.</p>
<p><a class="b2-link" href="${SOURCES.egkTherapeutenstelle.url}" rel="noopener" target="_blank">Zur offiziellen EGK-Therapeutenregistrierung</a></p>
<h2 id="visana">Visana: eigenes Anerkennungsverfahren</h2>
<p>${F.visanaOwn} ${F.visanaProcess}</p>
<p>Die Voraussetzungen sind methodenspezifisch – für Akupunktur können andere Abschlüsse anerkannt sein als für Tui-Na/An-Mo oder Phytotherapie TCM. Die genauen Kriterien je Methode stehen in den aktuellen Visana-Unterlagen.</p>
<p>${F.visanaDocs}</p>
<p>${F.visanaTerms}</p>
<p><a class="b2-link" href="${SOURCES.visanaKriterien.url}" rel="noopener" target="_blank">Zu den offiziellen Visana-Anerkennungskriterien</a></p>
<h2>Auf einen Blick</h2>
<div class="b2-tablewrap"><table><thead><tr><th>System</th><th>Eigene Registrierung?</th><th>Wofür relevant?</th></tr></thead><tbody>
<tr><td>EMR</td><td>Ja</td><td>Qualitätslabel / Register</td></tr>
<tr><td>ASCA</td><td>Ja</td><td>Qualitätslabel / Anerkennung</td></tr>
<tr><td>EGK</td><td>Ja, EGK-Therapeutenstelle</td><td>EGK-Anerkennung</td></tr>
<tr><td>Visana</td><td>Ja</td><td>Visana-Anerkennung</td></tr>
<tr><td>BAB</td><td>Kanton</td><td>Berufsausübung</td></tr>
<tr><td>ZSR</td><td>Abrechnungssystem</td><td>Leistungserbringer-/Abrechnungsidentifikation</td></tr>
</tbody></table></div>
<p class="b2-note">Kein System gilt automatisch für alle Versicherer.</p>
<h2>Dein Abschluss allein reicht nicht immer</h2>
<p>Du hast ein Zertifikat OdA AM oder ein eidgenössisches Diplom. Das kann eine wichtige Voraussetzung erfüllen. Ob du bei einem bestimmten Versicherer abrechnen kannst, hängt trotzdem von dessen eigenen Anerkennungskriterien und der konkreten Methode ab.</p>
<h2>So gehst du praktisch vor</h2>
<ol><li>Methode exakt bestimmen.</li><li>Berufs-/Ausbildungsabschluss prüfen.</li><li>EMR-/ASCA-Status prüfen.</li><li>Prüfen, ob der Versicherer zusätzlich eine eigene Registrierung verlangt.</li><li>EGK separat kontrollieren.</li><li>Visana separat kontrollieren.</li><li>Anerkennungsdatum dokumentieren.</li><li>Erst danach gegenüber Patient:innen kommunizieren, welche Versicherer dich anerkennen.</li></ol>
<h2>Was du Patient:innen sagen solltest</h2>
<p>Selbst beim gleichen Versicherer können Produkte unterschiedliche Bedingungen haben. Nicht: «Wird von der Krankenkasse bezahlt.»</p>
<div class="pro-callout"><strong>Besser:</strong><p>«Unsere entsprechend registrierten Leistungen können je nach Zusatzversicherung übernommen werden. Bitte prüfe deine individuelle Deckung bei deinem Versicherer.»</p></div>`,
    faq: [
      { q: 'Bin ich mit EMR und ASCA bei allen Zusatzversicherern anerkannt?', a: 'Nein. EMR und ASCA decken einen grossen Teil der Registrierungslandschaft ab, einzelne Versicherer haben aber eigene Verfahren. EGK und Visana solltest du separat prüfen.' },
      { q: 'Reicht EMR für die EGK?', a: 'Nicht automatisch. Für die EGK gibt es eine eigene Registrierung über die EGK-Therapeutenstelle; die Qualitätsprüfung erfolgt in Zusammenarbeit mit dem EMR.' },
      { q: 'Wie werde ich bei Visana anerkannt?', a: 'Über einen eigenen Antrag nach den methodenspezifischen Visana-Kriterien. Visana ist keiner Registrierungsstelle wie EMR oder ASCA angeschlossen.' },
      { q: 'Kann ich rückwirkend bei Visana abrechnen?', a: 'Laut Visana nicht vor dem Anerkennungsdatum. Stell den Antrag deshalb früh.' },
      { q: 'Zahlt die Grundversicherung nichtärztliche TCM?', a: 'Für nichtärztliche Therapeut:innen ist in der Regel die Zusatzversicherung relevant. Ärztliche Komplementärmedizin ist ein eigener Kontext.' },
      { q: 'Was sage ich Patient:innen zur Kostenübernahme?', a: 'Keine Zusage. Hinweis auf mögliche Übernahme je nach Zusatzversicherung und Empfehlung, die individuelle Deckung vorab zu prüfen.' },
    ],
    cta: { title: 'Wie rechnest du korrekt ab?', label: 'Tarif 590 verstehen', href: '/regulatorik/tarif-590/' },
    ouch: { label: 'Das EMR/ASCA-Labyrinth', url: `${OUCH}/emr-asca-labyrinth/` },
    sources: ['emrReglement', 'ascaArg', 'ascaMethoden', 'egkTherapeutenstelle', 'visanaTherapeuten', 'visanaKriterien'],
    facts: ['egkOwn', 'visanaOwn', 'visanaProcess', 'visanaDocs', 'visanaTerms'], lastReviewed: R, reviewIntervalMonths: 3,
  },
  {
    slug: 'chinesische-arzneimittel-abgabe', nav: 'Arzneimittel',
    title: 'Chinesische Arzneimittel abgeben: Was gilt für TCM-Therapeut:innen?',
    metaDesc: 'Dürfen TCM-Naturheilpraktiker chinesische Arzneimittel selbst abgeben? Swissmedic-Regeln, eidg. Diplom und kantonale Detailhandelsbewilligung erklärt.',
    h1: 'Chinesische Arzneimittel: Das eidgenössische Diplom allein reicht nicht.',
    lead: 'Die Frage «Darf ich als TCM-Therapeut Kräuter abgeben?» klingt einfach. Rechtlich musst du aber mindestens Ausbildung, Arzneimittelstatus und kantonale Abgabebewilligung auseinanderhalten.',
    short: 'Naturheilpraktiker:innen mit eidgenössischem Diplom dürfen bestimmte von Swissmedic bezeichnete, nicht verschreibungspflichtige Arzneimittel der Komplementärmedizin abgeben – wenn sie in ihrer Fachrichtung die nötigen Kompetenzen haben. Zusätzlich braucht es eine Detailhandelsbewilligung des Domizilkantons. Und das konkrete Produkt muss einen passenden Status haben.',
    bodyHtml: `
<h2>Wer darf grundsätzlich abgeben?</h2>
<p>${F.nhpDispensing}</p>
<h2>Zusätzlich brauchst du den Kanton</h2>
<div class="pro-callout"><strong>Diplom ≠ Abgabebewilligung.</strong><p>${F.retailPermit} Das eidgenössische Diplom ersetzt sie nicht.</p></div>
<h2>Die Swissmedic-Listen</h2>
<p>Swissmedic führt Listen der Arzneimittel, die Naturheilpraktiker:innen mit eidgenössischem Diplom abgeben dürfen (Listen I, II und III). Wir reproduzieren sie hier bewusst nicht – sie ändern sich. Massgebend ist immer die aktuelle Fassung bei Swissmedic.</p>
<h2>Speziell: chinesische Arzneimittel</h2>
<p>Liste III betrifft chinesische Arzneimittel ohne Indikation im Meldeverfahren. ${F.liste3} Prüfe den aktuellen Stand vor jeder Entscheidung direkt bei Swissmedic.</p>
<h2>Was das nicht heisst</h2>
<p>Nicht: «Chinesische Arzneimittel sind in der Schweiz verboten.» Und auch nicht: «TCM-Therapeut:innen dürfen keine chinesischen Arzneimittel abgeben.» Beides wäre falsch. Arzneimittel können unterschiedliche Zulassungs- und Abgabewege haben – entscheidend ist der Status des konkreten Produkts.</p>
<h2>Wenn deine Praxis chinesische Arzneimittel einsetzen will</h2>
<ol><li>Fachkompetenz prüfen (Abschluss, Fachrichtung).</li><li>Das konkrete Produkt prüfen.</li><li>Den Swissmedic-Status des Produkts prüfen.</li><li>Die kantonale Abgabeberechtigung prüfen.</li><li>Bezugs- und Abgabeprozess dokumentieren.</li></ol>
<p>Die Berufsausübung selbst regelt dein Kanton: <a href="/regulatorik/berufsausuebungsbewilligung/">Berufsausübungsbewilligung</a> und <a href="/regulatorik/kantone/">Kanton-Navigator</a>.</p>`,
    faq: [
      { q: 'Darf ich mit eidgenössischem Diplom chinesische Arzneimittel abgeben?', a: 'Nur im Rahmen der Swissmedic-Regeln für bezeichnete Arzneimittel, mit den nötigen Kompetenzen in deiner Fachrichtung und mit einer Detailhandelsbewilligung des Domizilkantons. Entscheidend ist zudem der Status des konkreten Produkts.' },
      { q: 'Sind chinesische Arzneimittel in der Schweiz verboten?', a: 'Nein. Es gibt unterschiedliche Zulassungs- und Abgabewege. Prüfe den Status des konkreten Produkts bei Swissmedic.' },
      { q: 'Brauche ich eine kantonale Bewilligung für die Abgabe?', a: 'Ja, grundsätzlich eine Detailhandelsbewilligung des Domizilkantons. Die Voraussetzungen legt der Kanton fest.' },
      { q: 'Was steht auf der Swissmedic-Liste III?', a: 'Sie betrifft chinesische Arzneimittel ohne Indikation im Meldeverfahren. Den aktuellen Stand prüfst du direkt bei Swissmedic.' },
      { q: 'Darf ich ohne eidgenössisches Diplom abgeben?', a: 'Die Swissmedic-Regel für die selbstständige Abgabe knüpft an das eidgenössische Diplom an. Andere Konstellationen prüfst du bei Swissmedic und deinem Kanton.' },
    ],
    cta: { title: 'Was gilt in deinem Kanton?', label: 'Zum Kanton-Navigator', href: '/regulatorik/kantone/' },
    sources: ['swissmedicKomplementaer', 'swissmedicListe3'],
    facts: ['nhpDispensing', 'retailPermit', 'liste3'], lastReviewed: R, reviewIntervalMonths: 3,
  },
];

export const regHref = (slug: string) => `/regulatorik/${slug}/`;
export const KANTONE_PAGE = {
  title: 'TCM Bewilligung nach Kanton: Schweizer BAB-Navigator',
  metaDesc: 'Welche Bewilligung brauchst du als TCM-Therapeut:in in Zürich, Bern, Thurgau, Basel und den anderen Kantonen? Schweizer Überblick mit offiziellen Quellen.',
  h1: 'Was gilt für TCM in deinem Kanton?',
  lead: 'Die Berufsausübung ist in der Schweiz nicht überall gleich geregelt. Wähle deinen Kanton und prüfe Bewilligung, Mentorat und zuständige Behörde.',
  short: 'Jeder Kanton regelt die Berufsausübung selbst. Unterschiede gibt es unter anderem bei der Bewilligungs- oder Meldepflicht, bei Akupunktur, beim eidgenössischen Diplom, beim Zertifikat OdA AM, beim M7 und bei Sprachvoraussetzungen. Wir zeigen Angaben erst, wenn sie gegen die kantonale Primärquelle geprüft sind.',
  sources: ['zhKomplementaer', 'zhAkupunktur', 'bgbm', 'fachverbandKantone'] as SourceId[],
  faq: [
    { q: 'Gilt die Regel aus Zürich auch in anderen Kantonen?', a: 'Nein. Jeder Kanton regelt die Berufsausübung selbst. Aus einem Kanton lässt sich nichts für einen anderen ableiten.' },
    { q: 'Woher stammen die Angaben?', a: 'Aus den offiziellen Seiten der kantonalen Behörden. Die Übersicht des TCM Fachverbands Schweiz nutzen wir nur zum Abgleich; bei Abweichungen gilt die kantonale Quelle.' },
    { q: 'Warum stehen bei einigen Kantonen noch keine Details?', a: 'Weil wir Angaben erst veröffentlichen, wenn sie gegen die aktuelle kantonale Primärquelle geprüft sind.' },
    { q: 'Wie oft werden die Angaben geprüft?', a: 'Kantonale Angaben mindestens alle drei Monate, bei Hinweisen auf Änderungen früher.' },
  ],
};