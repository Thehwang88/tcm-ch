// Single source of truth for migrated Wissen articles (Astro static pages).
// Phase 4: 3 genuine standalone articles. 34 city-variant doorway articles are 410'd
// (functions/wissen/[[path]].js + public/wissen-kill.js), NOT migrated.
// Schema: MedicalWebPage + Person(author) + FAQPage + BreadcrumbList + reviewedBy + lastReviewed.
export interface WissenFaq { q: string; a: string }
export interface WissenRelated { href: string; label: string; cat: string }
export interface WissenAuthor { name: string; role: string; bio: string }
export interface Wissen { slug: string; title: string; metaDesc: string; category: string; h1: string; lead: string; readingTime: string; author: WissenAuthor; reviewerName: string; datePublished: string; dateModified: string; lastReviewed: string; bodyHtml: string; faqs: WissenFaq[]; related: WissenRelated[]; }
export const wissen: Wissen[] = [
  {
    "slug": "migraene-tcm-warum-akupunktur-nicht-fuer-jeden",
    "title": "Migräne und TCM: Warum Akupunktur nicht für jeden funktioniert",
    "metaDesc": "Ein ehrlicher Bericht aus drei Jahren Migräne-Behandlung in unseren TCM-Kliniken: bei wem Akupunktur hilft, bei wem nicht – und was die Studienlage dazu sagt.",
    "category": "Beschwerden verstehen",
    "h1": "Migräne und TCM: Warum Akupunktur nicht für jeden funktioniert.",
    "lead": "Ein ehrlicher Bericht aus drei Jahren Migräne-Behandlungen in unseren TCM-Kliniken. Bei wem es funktioniert. Bei wem nicht. Und was wir Patientinnen heute anders sagen als früher.",
    "readingTime": "11 Min.",
    "author": {
      "name": "Barbara Meier",
      "role": "TCM-Therapeutin · EMR & ASCA zertifiziert · Praxis St. Gallen",
      "bio": "Barbara behandelt seit über zwölf Jahren Patientinnen mit Akupunktur, Tuina und Schröpfen. Schwerpunkte: chronische Schmerzen, Kopfschmerzen, Migräne und stressbedingte Beschwerden. Ausbildung in der Schweiz mit Weiterbildungen in Chengdu und Shanghai. Arbeitet eng mit Neurologen und Gynäkologinnen in der Ostschweiz zusammen."
    },
    "reviewerName": "Dr. med. Barbara Hainich",
    "datePublished": "2026-05-26",
    "dateModified": "2026-05-26",
    "lastReviewed": "2026-05-26",
    "bodyHtml": "<h2>Was dieser Artikel ehrlich macht.</h2>\r\n  <p>Wenn du Migräne hast, hast du wahrscheinlich schon vieles probiert. Triptane. Magnesium. Schlaftracker. Vielleicht Botox. Und jetzt überlegst du, ob Akupunktur hilft. Das ist eine berechtigte Frage, und eine, die wir in unseren Praxen jede Woche hören.</p>\r\n  <p>Wir behandeln seit drei Jahren regelmässig Migräne-Patientinnen. In dieser Zeit haben wir gelernt: bei manchen Menschen reduziert sich die Attacken-Frequenz dramatisch. Bei anderen passiert ehrlich gesagt fast nichts. Das hat Gründe, und wir schreiben sie in diesem Artikel auf.</p>\r\n  <p>Wenn du nach 11 Minuten weisst, ob ein Termin bei uns für dich Sinn macht, hat der Artikel seinen Zweck erfüllt.</p>\r\n\r\n  <div class=\"wa-callout\">\r\n    <div class=\"wa-callout-label\">In Kürze</div>\r\n    <p>Akupunktur funktioniert bei episodischer Migräne mit klaren Triggern oft sehr gut, 8 bis 12 Sitzungen reduzieren die Attacken-Frequenz bei vielen messbar. Bei chronischer Migräne (15+ Tagen pro Monat) sind die Ergebnisse durchwachsen. Bei Aura-Migräne hilft TCM begleitend, ersetzt aber keine neurologische Abklärung. Sitzung CHF 130–160, EMR/ASCA-anerkannt.</p>\r\n  </div>\r\n\r\n  <h2>Warum die Studienlage uns nicht reicht.</h2>\r\n  <p>Es gibt Cochrane-Reviews, die Akupunktur bei Migräne empfehlen. Wir kennen sie. Aber wir behandeln keine Studien, wir behandeln Menschen. Und was wir in unseren Praxen sehen, ist nuancierter als jede Meta-Analyse.</p>\r\n  <p>Was wir tatsächlich sehen: ein klares Muster, wer profitiert und wer nicht. Darüber schreiben wir hier, basierend auf rund 90 Migräne-Patientinnen, die wir über mehrere Behandlungszyklen begleitet haben.</p>\r\n\r\n  <h2>Bei wem Akupunktur in unserer Praxis konstant funktioniert.</h2>\r\n\r\n  <h3>1. Episodische Migräne, 4–10 Tage pro Monat</h3>\r\n  <p>Das ist die Gruppe mit den klarsten Erfolgen. Patientinnen, die zwischen den Attacken normal funktionieren, deren Auslöser bekannt sind (Stress, Schlafmangel, Zyklus), und die nicht täglich Schmerzmittel brauchen. Hier sehen wir nach 8 bis 12 Sitzungen oft eine Halbierung der Attacken-Frequenz. Bei einigen mehr.</p>\r\n\r\n  <h3>2. Menstruelle Migräne</h3>\r\n  <p>Wenn die Attacken klar an den Zyklus gekoppelt sind, ist Akupunktur eine unserer stärksten Karten. Wir arbeiten meist zyklusbegleitend über drei Monate. Viele Patientinnen kommen danach für Erhaltungssitzungen alle 4 bis 6 Wochen und bleiben stabil.</p>\r\n\r\n  <h3>3. Migräne mit muskulärer Komponente</h3>\r\n  <p>Patientinnen, bei denen die Attacken aus dem Nacken-Schulter-Bereich starten. Verspannungen, schlechte Bildschirm-Haltung, klassisch bei HSG-Studierenden und Bürojobs. Hier kombinieren wir Akupunktur mit Tuina und sehen oft schnelle Effekte, manchmal schon nach 3 bis 4 Sitzungen.</p>\r\n\r\n  <h3>4. Patientinnen, die mit Triptanen reduzieren wollen</h3>\r\n  <p>Wenn jemand 10+ Triptane pro Monat braucht, droht ein Übergebrauch-Kopfschmerz. Wir begleiten dann den Reduktionsprozess. Wichtig: das machen wir nie allein, sondern in Absprache mit dem Neurologen oder der Hausärztin.</p>\r\n\r\n  <div class=\"wa-pullquote\">\"Akupunktur ist bei episodischer Migräne mit klaren Triggern eine sehr gute Option. Bei chronischer Migräne mit 20 Schmerztagen im Monat sind wir ehrlich: wir helfen oft, aber wir lösen das Problem selten allein.\"</div>\r\n\r\n  <h2>Bei wem Akupunktur in unserer Praxis oft nicht reicht.</h2>\r\n  <p>Das schreiben wir bewusst auf. Wenn du in einer dieser Gruppen bist, lohnt sich ein offenes Gespräch mit uns, und vielleicht parallel mit deiner Neurologin.</p>\r\n  <ul>\r\n    <li><strong>Chronische Migräne (15+ Kopfschmerztage pro Monat über 3 Monate)</strong>, wir sehen Linderung, aber selten eine echte Umkehr. Hier braucht es meist ein Multimodal-Konzept: Neurologie, eventuell CGRP-Antikörper, Schlafmedizin, dazu TCM als Ergänzung.</li>\r\n    <li><strong>Migräne mit Aura ohne neurologische Abklärung</strong>, wir behandeln nicht, bevor das geklärt ist. Aura kann harmlos sein. Manchmal nicht. Bitte zum Neurologen zuerst.</li>\r\n    <li><strong>Schmerzmittel-Übergebrauchs-Kopfschmerz</strong>, solange täglich Schmerzmittel laufen, ist eine echte Verbesserung mit Akupunktur unrealistisch. Wir behandeln dann erst nach oder während der Pause, abgestimmt mit dem Arzt.</li>\r\n    <li><strong>Migräne als Symptom anderer Erkrankungen</strong>, Schilddrüse, Bluthochdruck, depressive Episoden, Schlafapnoe. Wenn das nicht angegangen wird, sind unsere Behandlungen Symptom-Kosmetik.</li>\r\n    <li><strong>Sekundäre Kopfschmerzen</strong>, nach Trauma, mit Sehstörungen, mit neurologischen Ausfällen. Das ist nicht TCM-Terrain. Das ist Notfall- oder Neurologie-Terrain.</li>\r\n  </ul>\r\n\r\n  <h2>Was wir Patientinnen heute anders sagen als vor drei Jahren.</h2>\r\n  <p>Vor drei Jahren haben wir „kommen Sie zu zehn Sitzungen, dann schauen wir\" gesagt. Heute sagen wir das anders.</p>\r\n  <p>Heute sagen wir: <strong>nach vier Sitzungen sehen wir, ob du zu der Gruppe gehörst, bei der es funktioniert.</strong> Wenn du dann gar keine Veränderung spürst, weniger Attacken, kürzere Attacken, weniger Triptan-Bedarf, irgendetwas, dann hören wir auf. Du sparst Geld, wir sparen dir falsche Hoffnung.</p>\r\n  <p>Und wir sagen offener: bei chronischer Migräne sind wir Ergänzung, nicht Lösung. Wer mit der Erwartung kommt, dass Akupunktur 25 Schmerztage im Monat in 5 verwandelt, wird enttäuscht. Wer mit der Erwartung kommt, dass wir die Tage besser machen und parallel mit der Neurologie an der Frequenz arbeiten, den können wir gut begleiten.</p>\r\n\r\n  <h2>Wie ein Behandlungszyklus konkret aussieht.</h2>\r\n  <ul>\r\n    <li><strong>Sitzung 1 (60 Min)</strong>, ausführliche Anamnese, Trigger-Analyse, Schmerztagebuch wenn vorhanden, erste Behandlung. Wir besprechen, was wir realistisch erwarten.</li>\r\n    <li><strong>Sitzungen 2–4 (45 Min, wöchentlich)</strong>, Aufbauphase. Hier sehen wir, ob dein System auf Akupunktur reagiert.</li>\r\n    <li><strong>Zwischenbilanz nach Sitzung 4</strong>, ehrliches Gespräch. Reduktion sichtbar? Weitermachen. Keine Veränderung? Wir sagen es.</li>\r\n    <li><strong>Sitzungen 5–10 (alle 1–2 Wochen)</strong>, Stabilisierungsphase. Hier kommen die meisten Effekte.</li>\r\n    <li><strong>Erhaltung</strong>, danach reichen meist Sitzungen alle 4 bis 6 Wochen.</li>\r\n  </ul>\r\n  <p>Mehr zur Methode selbst auf unserer Seite zu <a href=\"/therapien/akupunktur\">Akupunktur</a>. Wenn deine Migräne mit Nacken-Themen zusammenhängt, ergänzen wir oft mit <a href=\"/beschwerden/rueckenschmerzen\">Rücken- und Nackenbehandlung</a>.</p>\r\n\r\n  <h2>Was es kostet, und was die Kasse zahlt.</h2>\r\n  <p>Erstanamnese 60 Minuten: CHF 160. Folgesitzungen 45 Minuten: CHF 130. Ein typischer Migräne-Zyklus kostet brutto zwischen CHF 1'200 und CHF 1'600 über 8 bis 12 Sitzungen.</p>\r\n  <p>Wir sind <strong>EMR- und ASCA-anerkannt</strong>. Mit Zusatzversicherung für Komplementärmedizin zahlst du netto meist nur 10 bis 25 Prozent selbst. Details welche Kasse was übernimmt auf der <a href=\"/wissen\">Krankenkassen-Seite</a>.</p>\r\n  <p>Die Grundversicherung zahlt Akupunktur bei Migräne nicht. Auch wenn manche Hausärzte das anders darstellen.</p>\r\n\r\n  <h2>Wenn du jetzt überlegst, einen Termin zu machen.</h2>\r\n  <p>Schreib uns kurz, wie deine Migräne aussieht: wie viele Tage im Monat, mit oder ohne Aura, welche Medikamente, wie lange schon. Wir sagen dir dann offen, ob ein Termin bei uns Sinn macht, oder ob wir dich zuerst zu jemand anderem schicken würden.</p>\r\n  <p>Wir antworten meist innerhalb einer Stunde während der Öffnungszeiten. Termine in St. Gallen, Frauenfeld, Zürich und unseren anderen <a href=\"/wissen\">Standorten</a> meist innerhalb von 7 bis 10 Tagen.</p>\r\n</div>",
    "faqs": [
      {
        "q": "Wie viele Sitzungen brauche ich, bis ich etwas spüre?+",
        "a": "Bei den meisten Patientinnen sehen wir nach 3 bis 4 Sitzungen erste Veränderungen, entweder kürzere Attacken, weniger intensiv, oder seltener. Wenn nach 4 Sitzungen gar nichts passiert, sagen wir dir ehrlich, dass es bei dir wahrscheinlich nicht funktioniert."
      },
      {
        "q": "Kann ich Akupunktur und Triptane parallel nutzen?+",
        "a": "Ja. Akupunktur ersetzt deine Akutmedikation nicht, sie soll dafür sorgen, dass du weniger davon brauchst. Wenn du täglich Triptane nimmst, sprechen wir vorher mit deiner Neurologin, weil dann ein Übergebrauchs-Kopfschmerz im Raum steht."
      },
      {
        "q": "Hilft Akupunktur bei einer akuten Migräne-Attacke?+",
        "a": "Manchmal, aber nicht zuverlässig. Akupunktur ist primär präventiv. In der Attacke selbst sind die meisten Patientinnen zu lichtempfindlich, um eine Sitzung durchzustehen. Wir behandeln meist zwischen den Attacken."
      },
      {
        "q": "Was ist mit Migräne in der Schwangerschaft?+",
        "a": "Hier ist Akupunktur eine der wenigen sicheren Optionen, weil viele Migräne-Medikamente in der Schwangerschaft nicht erlaubt sind. Wir behandeln das regelmässig, vermeiden bestimmte Punkte und stimmen mit deiner Gynäkologin ab."
      },
      {
        "q": "Brauche ich vorher eine neurologische Abklärung?+",
        "a": "Bei erstmaligen oder neu auftretenden Kopfschmerzen: ja. Bei langjähriger, klar diagnostizierter Migräne: nicht zwingend. Bei Migräne mit Aura ohne vorherige Abklärung verlangen wir das. Wir wollen sicher sein, dass wir nichts übersehen."
      }
    ],
    "related": [
      {
        "href": "/beschwerden/migraene",
        "label": "Migräne",
        "cat": "Beschwerde"
      },
      {
        "href": "/beschwerden/kopfschmerzen",
        "label": "Kopfschmerzen",
        "cat": "Beschwerde"
      },
      {
        "href": "/therapien/akupunktur",
        "label": "Akupunktur",
        "cat": "Therapie"
      }
    ]
  },
  {
    "slug": "krankenkasse-tcm-was-wirklich-uebernommen-wird-2026",
    "title": "Krankenkasse und TCM: Was wirklich übernommen wird (Stand 2026)",
    "metaDesc": "Welche Schweizer Zusatzversicherungen TCM und Akupunktur übernehmen – mit konkreten Prozentsätzen, Jahreslimiten und Praxisbeispielen (Stand 2026).",
    "category": "TCM in der Schweiz",
    "h1": "Krankenkasse und TCM: Was wirklich übernommen wird (Stand 2026).",
    "lead": "Welche Zusatzversicherungen zahlen. Wie viel pro Sitzung. Was unsere Patientinnen am häufigsten falsch verstehen. Ein klarer Überblick, ohne Marketing-Sprech, mit echten Zahlen aus dem Praxisalltag.",
    "readingTime": "10 Min.",
    "author": {
      "name": "Corinna Reinhart",
      "role": "TCM-Therapeutin · EMR & ASCA zertifiziert · Praxis St. Gallen",
      "bio": "Corinna behandelt seit über zehn Jahren Patientinnen und Patienten mit Akupunktur, Tuina und chinesischer Kräutertherapie. Sie kennt die Abrechnungssysteme aller grossen Schweizer Zusatzversicherungen aus dem Praxisalltag und ist bei TCM.ch für die Schulung neuer Therapeutinnen im Bereich EMR-Compliance verantwortlich."
    },
    "reviewerName": "Dr. med. Barbara Hainich",
    "datePublished": "2026-05-27",
    "dateModified": "2026-05-27",
    "lastReviewed": "2026-05-27",
    "bodyHtml": "<h2>Was du als Erstes wissen musst.</h2>\r\n  <p>Wir hören diesen Satz jede Woche mehrmals: „Ich dachte, das zahlt meine Krankenkasse.\" Manchmal stimmt das. Manchmal nicht. Und der Unterschied liegt fast immer in einem einzigen Wort: <strong>Zusatzversicherung</strong>.</p>\r\n  <p>Die Schweizer Grundversicherung (KVG) zahlt Akupunktur und andere TCM-Methoden nicht, ausser sie wird von einem schulmedizinisch tätigen Arzt mit FMH-Titel durchgeführt. Das betrifft uns in der Praxis kaum. Was wir behandeln, läuft über die Zusatzversicherung (VVG).</p>\r\n  <p>Die gute Nachricht: rund 70 Prozent unserer Patientinnen haben eine solche Zusatzversicherung, oft ohne es zu wissen. Die schlechte: die Bedingungen sind unübersichtlich, und jede Kasse macht es ein bisschen anders.</p>\r\n\r\n  <div class=\"wa-callout\">\r\n    <div class=\"wa-callout-label\">In Kürze</div>\r\n    <p>TCM wird in der Schweiz fast ausschliesslich über Zusatzversicherungen für Komplementärmedizin abgerechnet. Typisch sind 75 bis 90 Prozent Rückerstattung pro Sitzung, mit einem Jahresmaximum zwischen CHF 1'000 und CHF 5'000 je nach Modell. Voraussetzung: EMR- oder ASCA-Anerkennung der Praxis. Wir sind beides. Grundversicherung zahlt nicht.</p>\r\n  </div>\r\n\r\n  <h2>Was die Grundversicherung wirklich zahlt, und was nicht.</h2>\r\n  <p>Kurzfassung: bei uns in der Regel nichts. Die KVG-Grundversicherung übernimmt Akupunktur nur, wenn:</p>\r\n  <ul>\r\n    <li>sie von einem Arzt mit eidg. Diplom durchgeführt wird</li>\r\n    <li>dieser Arzt einen Fähigkeitsausweis Akupunktur-TCM (ASA) hat</li>\r\n    <li>und es eine medizinische Indikation gibt</li>\r\n  </ul>\r\n  <p>Das trifft in der Schweiz auf eine kleine Gruppe von Ärzten zu. Unsere Therapeutinnen sind keine Ärzte mit FMH-Titel, sondern eidgenössisch diplomierte Naturheilpraktikerinnen mit Fachrichtung TCM. Das ist eine völlig andere Berufskategorie, fachlich oft mit deutlich mehr TCM-Stunden, aber abrechnungstechnisch nicht über Grundversicherung.</p>\r\n\r\n  <h2>Was deine Zusatzversicherung wahrscheinlich zahlt.</h2>\r\n  <p>Hier wird es relevant. Die meisten grossen Schweizer Krankenkassen bieten Zusatzversicherungen für Komplementärmedizin an. Die Konditionen variieren, aber das Grundmuster sieht so aus:</p>\r\n\r\n  <h3>Concordia (Natura, Diversa)</h3>\r\n  <p>Übernimmt 75 Prozent der Kosten pro Sitzung, bis CHF 3'000 pro Jahr je nach Modell. Voraussetzung: EMR- oder ASCA-Anerkennung der Therapeutin. Wir sind in beiden Registern eingetragen.</p>\r\n\r\n  <h3>Helsana (Completa, Sana)</h3>\r\n  <p>Übernimmt 75 Prozent, bis CHF 3'000 jährlich bei Completa, weniger bei Sana. Akzeptiert EMR. Eine der unkompliziertesten Kassen in der Abrechnung.</p>\r\n\r\n  <h3>Swica (Optima, Completa Praeventa)</h3>\r\n  <p>Bei Optima 90 Prozent, bis CHF 2'000 jährlich. Bei Completa Praeventa höhere Limiten. Verlangt EMR-Anerkennung.</p>\r\n\r\n  <h3>Sanitas (Classic, Jump, Vital Privat)</h3>\r\n  <p>Je nach Modell 75 bis 90 Prozent, mit Jahreslimiten zwischen CHF 1'000 und CHF 5'000. EMR und ASCA werden akzeptiert.</p>\r\n\r\n  <h3>CSS (myFlex, Alternativ, Premium)</h3>\r\n  <p>Beim Modell Alternativ üblicherweise 90 Prozent, hohe Jahreslimiten. Bei myFlex modular gestaltbar, also abhängig davon, was du gewählt hast.</p>\r\n\r\n  <h3>Visana, KPT, Sympany, Atupri, ÖKK</h3>\r\n  <p>Alle bieten Komplementärmedizin-Zusätze. Konditionen ähnlich wie oben, meist zwischen 70 und 90 Prozent Rückerstattung. Wir empfehlen: <a href=\"/wissen\">unsere Krankenkassen-Übersicht</a> oder direkt bei deiner Kasse anrufen.</p>\r\n\r\n  <div class=\"wa-pullquote\">\"Der häufigste Fehler ist nicht, dass Patientinnen keine Zusatzversicherung haben. Sondern dass sie eine haben, und sie nicht nutzen, weil sie denken, TCM sei nicht abgedeckt.\"</div>\r\n\r\n  <h2>EMR und ASCA, was diese Zeichen bedeuten.</h2>\r\n  <p>Wenn du auf der Webseite einer TCM-Praxis „EMR\" oder „ASCA\" liest, sind das die zwei wichtigsten Qualitätssiegel der Schweizer Komplementärmedizin. Sie bedeuten:</p>\r\n  <ul>\r\n    <li><strong>EMR (Erfahrungsmedizinisches Register)</strong>, strenge Kriterien für Ausbildung, Praxis, Hygiene, Weiterbildung. Wird von praktisch allen Schweizer Zusatzversicherungen akzeptiert.</li>\r\n    <li><strong>ASCA (Schweizerische Stiftung für Komplementärmedizin)</strong>, vergleichbar in den Anforderungen, leicht andere Schwerpunkte. Ebenfalls breit akzeptiert.</li>\r\n  </ul>\r\n  <p>Ohne mindestens eines dieser Siegel zahlt deine Zusatzversicherung in der Regel nicht. Wenn dir eine Praxis sagt „das ist nicht so wichtig\", ist das ein Warnsignal. Es ist sehr wichtig.</p>\r\n  <p>Wir bei TCM.ch sind bei beiden Registern aktiv, bei jeder Therapeutin in jeder Praxis. Das ist nicht selbstverständlich, sondern erfordert kontinuierliche Weiterbildung und Audits.</p>\r\n\r\n  <h2>Konkrete Beispielrechnung aus unserer Praxis.</h2>\r\n  <p>Ein typischer Behandlungszyklus für chronische Rückenschmerzen, 10 Sitzungen bei uns in St. Gallen:</p>\r\n  <ul>\r\n    <li>Erstanamnese 60 Min: <strong>CHF 160</strong></li>\r\n    <li>9 Folgesitzungen à 45 Min: <strong>9 × CHF 130 = CHF 1'170</strong></li>\r\n    <li>Total brutto: <strong>CHF 1'330</strong></li>\r\n  </ul>\r\n  <p>Mit Helsana Completa (75 Prozent Rückerstattung): du zahlst netto <strong>CHF 333</strong>, die Kasse erstattet CHF 997.</p>\r\n  <p>Mit Swica Optima (90 Prozent): du zahlst netto <strong>CHF 133</strong>, die Kasse erstattet CHF 1'197.</p>\r\n  <p>Ohne Zusatzversicherung: du zahlst die vollen CHF 1'330 selbst.</p>\r\n  <p>Wichtig: das ist eine Modellrechnung. Selbstbehalt und Franchise greifen bei Zusatzversicherungen meist nicht, aber Jahreslimiten schon. Wer im selben Jahr bereits Physiotherapie und Homöopathie über Komplementärmedizin abgerechnet hat, kann ans Limit kommen.</p>\r\n\r\n  <h2>Wie die Abrechnung bei uns konkret abläuft.</h2>\r\n  <p>Wir machen das so unkompliziert wie möglich:</p>\r\n  <ul>\r\n    <li><strong>Du bezahlst nach jeder Sitzung</strong>, bei uns per TWINT, Karte oder Rechnung.</li>\r\n    <li><strong>Du bekommst eine Quittung mit Tarmed-konformer Aufstellung</strong> inklusive EMR-/ASCA-Nummer, Therapie-Code, ZSR-Nummer.</li>\r\n    <li><strong>Du reichst die Quittung bei deiner Kasse ein</strong>, meist online über die App oder das Kundenportal.</li>\r\n    <li><strong>Die Kasse erstattet dir direkt zurück</strong>, typisch innerhalb von 2 bis 4 Wochen.</li>\r\n  </ul>\r\n  <p>Wir machen keine direkte Verrechnung mit der Kasse, weil das im VVG-Bereich selten möglich und für dich oft sogar nachteilig ist. Du behältst die Kontrolle.</p>\r\n\r\n  <h2>Die fünf häufigsten Missverständnisse, die wir hören.</h2>\r\n\r\n  <h3>1. „Mein Hausarzt hat gesagt, das wird übernommen.\"</h3>\r\n  <p>Manchmal. Aber bitte nie ungeprüft. Ruf vor der ersten Sitzung kurz bei deiner Kasse an oder schau in deine Police. „Komplementärmedizin\" muss explizit drinstehen.</p>\r\n\r\n  <h3>2. „Akupunktur ist doch jetzt offiziell anerkannt.\"</h3>\r\n  <p>Ja und nein. Ärztliche Akupunktur ist seit 2017 in der Grundversicherung, aber nur, wenn ein Arzt mit FMH-Titel und Fähigkeitsausweis sie durchführt. Das betrifft etwa zwei Prozent der Akupunktur-Behandlungen in der Schweiz. Die anderen 98 Prozent laufen weiter über Zusatz.</p>\r\n\r\n  <h3>3. „Ich habe doch eine Zusatzversicherung.\"</h3>\r\n  <p>Nicht jede Zusatzversicherung deckt Komplementärmedizin. Spital-Zusätze (allgemein/halbprivat/privat) decken in der Regel keine ambulante Akupunktur. Du brauchst spezifisch eine Komplementärmedizin- oder Alternativmedizin-Zusatzversicherung.</p>\r\n\r\n  <h3>4. „Die Sitzungen sind teuer.\"</h3>\r\n  <p>Mit Zusatzversicherung zahlst du oft weniger Selbstbehalt für eine Akupunktursitzung als für einen Restaurantbesuch. Ohne, ja, dann ist es ein bewusster Entscheid. Wir sagen das vorher, nie nachher.</p>\r\n\r\n  <h3>5. „Ich wechsle einfach kurz die Zusatzversicherung.\"</h3>\r\n  <p>Ein Wechsel der Zusatzversicherung ist schwieriger als der Grundversicherungswechsel. Mit Gesundheitsfragen, möglichen Vorbehalten, Wartefristen. Wer mit 45 erstmals eine Komplementärmedizin-Zusatzversicherung abschliessen will, bekommt sie nicht immer. Falls du eine hast und sie nutzt, sehr gut. Falls du keine hast, die Entscheidung sollte aus einer Gesamtperspektive heraus getroffen werden, nicht wegen einer Akupunktur-Serie.</p>\r\n\r\n  <h2>Wann sich TCM auch ohne Zusatzversicherung lohnt.</h2>\r\n  <p>Wir sehen regelmässig Patientinnen, die selbst zahlen. Meist in einer dieser Situationen:</p>\r\n  <ul>\r\n    <li>Akuter Behandlungsbedarf, der nicht warten kann, z. B. starke Zyklusschmerzen vor einer wichtigen Lebensphase</li>\r\n    <li>Schmerzmittel-Reduktion bei chronischen Beschwerden, wo CHF 1'500 für 10 Sitzungen langfristig billiger sind als jahrelange Pharmakologie</li>\r\n    <li>Kinderwunsch-Begleitung, wo eine IVF-Runde CHF 8'000 kostet und ein paralleler Akupunktur-Zyklus für CHF 1'200 die Erfolgsquote messbar verbessern kann</li>\r\n  </ul>\r\n  <p>Wir helfen dir, ehrlich einzuschätzen, ob sich der Selbstzahler-Weg lohnt, oder ob du erst einen anderen Weg gehen solltest.</p>\r\n\r\n  <h2>Wenn du jetzt einen Termin willst.</h2>\r\n  <p>Schreib uns vorher, welche Kasse und welches Modell du hast. Wir sagen dir, ob es wahrscheinlich übernommen wird. Wir kennen die häufigsten Konstellationen auswendig und sparen dir den Anruf bei der Kasse, wenn die Antwort klar ist.</p>\r\n  <p>Termine in <a href=\"/wissen\">allen unseren Standorten</a> meist innerhalb von 7 bis 10 Tagen. Bei Fragen zur Abrechnung selbst hilft auch unsere <a href=\"/wissen\">Krankenkassen-Übersicht</a> auf der Webseite.</p>\r\n</div>",
    "faqs": [
      {
        "q": "Übernimmt die Grundversicherung Akupunktur bei euch?+",
        "a": "Nein. Die Grundversicherung übernimmt Akupunktur nur, wenn ein Arzt mit FMH-Titel und ASA-Fähigkeitsausweis sie durchführt. Unsere Therapeutinnen sind eidgenössisch diplomierte Naturheilpraktikerinnen, eine andere Berufskategorie. Abrechnung läuft über Zusatzversicherung."
      },
      {
        "q": "Wie finde ich heraus, ob meine Zusatzversicherung TCM deckt?+",
        "a": "Suche in deiner Police nach den Begriffen \"Komplementärmedizin\" oder \"Alternativmedizin\". Wenn sie auftauchen und EMR oder ASCA erwähnt sind, wird unsere Behandlung höchstwahrscheinlich übernommen. Im Zweifel: kurz anrufen oder uns die Police schicken."
      },
      {
        "q": "Brauche ich eine ärztliche Verordnung?+",
        "a": "Bei den meisten Zusatzversicherungen nein. Einige verlangen sie ab einer bestimmten Anzahl Sitzungen pro Jahr. Wir sagen dir vorher, wenn das in deinem Fall relevant ist."
      },
      {
        "q": "Was, wenn meine Kasse die Erstattung verweigert?+",
        "a": "Das passiert sehr selten, wenn vorher geklärt wurde. Falls doch: meist liegt es an einer fehlenden Information auf der Quittung. Wir stellen eine korrigierte Version aus. Bei echten Streitfällen unterstützen wir mit Belegen, ist aber in den letzten Jahren bei uns nicht vorgekommen."
      },
      {
        "q": "Lohnt sich eine neue Zusatzversicherung wegen TCM?+",
        "a": "Selten allein deswegen. Zusatzversicherungen für Komplementärmedizin kosten je nach Alter CHF 30 bis 80 pro Monat. Wenn du ohnehin regelmässig komplementärmedizinische Leistungen nutzt, rechnet es sich oft. Für eine einmalige Akupunktur-Serie meist nicht."
      }
    ],
    "related": [
      {
        "href": "/krankenkassen",
        "label": "Krankenkasse & TCM",
        "cat": "Übersicht"
      },
      {
        "href": "/standorte",
        "label": "Alle Standorte",
        "cat": "TCM.ch"
      },
      {
        "href": "/therapien/akupunktur",
        "label": "Akupunktur",
        "cat": "Therapie"
      }
    ]
  },
  {
    "slug": "akupunktur-in-meiner-naehe-schweiz",
    "title": "Akupunktur in meiner Nähe: Alle Standorte in der Deutschschweiz",
    "metaDesc": "TCM-Praxen von Zürich bis St. Gallen: welche Praxis zu welcher Beschwerde passt, was es kostet und wie schnell du einen Termin in deiner Nähe bekommst.",
    "category": "TCM in der Schweiz",
    "h1": "Akupunktur in meiner Nähe: Alle Standorte in der Deutschschweiz.",
    "lead": "Elf TCM-Praxen von Zürich bis St. Gallen. Wo wir behandeln, wer dort arbeitet, und wie du in unter einer Minute den nächsten Termin in deiner Nähe findest.",
    "readingTime": "8 Min.",
    "author": {
      "name": "Corinna Reinhart",
      "role": "TCM-Therapeutin · EMR & ASCA zertifiziert · Mitgründerin TCM.ch",
      "bio": "Corinna ist Mitgründerin von TCM.ch und hat die meisten Standorte mit aufgebaut. Sie behandelt seit über zehn Jahren in der Deutschschweiz mit Schwerpunkten in Frauengesundheit, Kinderwunsch und chronischen Schmerzen. Ausbildung in der Schweiz, klinische Vertiefung in Hangzhou und Peking."
    },
    "reviewerName": "Dr. med. Barbara Hainich",
    "datePublished": "2026-05-27",
    "dateModified": "2026-05-27",
    "lastReviewed": "2026-05-27",
    "bodyHtml": "<h2>„Akupunktur in meiner Nähe\", die häufigste Frage.</h2>\r\n  <p>Die häufigste Frage, die wir per WhatsApp bekommen: „Habt ihr eine Praxis bei mir in der Nähe?\" Hier ist die ehrliche Übersicht. Wir behandeln an elf Standorten in der Deutschschweiz. Wenn du in einer dieser Städte oder im Umkreis von etwa 20 Kilometern wohnst, gibt es eine Praxis, die für dich gut erreichbar ist.</p>\r\n\r\n  <div class=\"wa-callout\">\r\n    <div class=\"wa-callout-label\">In Kürze</div>\r\n    <p>Elf TCM.ch-Standorte: Zürich, Winterthur, Baden, Aarau, Luzern, Zug, St. Gallen, Frauenfeld, Kreuzlingen, Schaffhausen, Chur. Alle Therapeutinnen EMR/ASCA-zertifiziert. Sitzung CHF 130–160. Krankenkasse zahlt mit Zusatzversicherung meist 75–90%. Termin meist in 24–48 Stunden über WhatsApp.</p>\r\n  </div>\r\n\r\n  <h2>Standorte nach Region.</h2>\r\n\r\n  <h3>Region Zürich</h3>\r\n  <ul>\r\n    <li><a href=\"/standorte/zuerich\"><strong>Zürich</strong></a>, Stadt Zürich, alle Spezialgebiete, Mo–Sa, Abendtermine</li>\r\n    <li><a href=\"/standorte/winterthur-muenzgasse\"><strong>Winterthur</strong></a>, Westen Zürichs, Schwerpunkt Bürobeschwerden & Kinderwunsch</li>\r\n    <li><a href=\"/standorte/baden\"><strong>Baden</strong></a>, Aargau, gut erreichbar aus Limmattal und Brugg</li>\r\n  </ul>\r\n\r\n  <h3>Zentralschweiz</h3>\r\n  <ul>\r\n    <li><a href=\"/standorte/luzern\"><strong>Luzern</strong></a>, Stadt Luzern, alle Bereiche, Abendtermine</li>\r\n    <li><a href=\"/standorte/zug\"><strong>Zug</strong></a>, speziell für Berufstätige aus Banking, Crypto und Pharma</li>\r\n  </ul>\r\n\r\n  <h3>Aargau / Mittelland</h3>\r\n  <ul>\r\n    <li><a href=\"/standorte/aarau\"><strong>Aarau</strong></a>, Kanton Aargau, Schwerpunkt Schmerz und Stressmedizin</li>\r\n  </ul>\r\n\r\n  <h3>Ostschweiz</h3>\r\n  <ul>\r\n    <li><a href=\"/standorte/st-gallen\"><strong>St. Gallen</strong></a>, Stadt St. Gallen, breites Spektrum, HSG-Patientinnen</li>\r\n    <li><a href=\"/standorte/frauenfeld\"><strong>Frauenfeld</strong></a>, unsere Hauptpraxis, alle Bereiche, längste Öffnungszeiten</li>\r\n    <li><a href=\"/standorte/kreuzlingen\"><strong>Kreuzlingen</strong></a>, Bodensee, Schwerpunkt Frauengesundheit & Kinderwunsch</li>\r\n    <li><a href=\"/standorte/schaffhausen\"><strong>Schaffhausen</strong></a>, Region Schaffhausen, gut erreichbar aus dem Klettgau</li>\r\n  </ul>\r\n\r\n  <h3>Graubünden</h3>\r\n  <ul>\r\n    <li><a href=\"/standorte/chur\"><strong>Chur</strong></a>, Kanton Graubünden, einzige TCM-Praxis im Bündner Rheintal</li>\r\n  </ul>\r\n\r\n  <div class=\"wa-pullquote\">\"Wir sind bewusst nicht überall, sondern dort, wo wir Therapeutinnen mit echter Erfahrung haben. Eine Praxis ohne gute Therapeutin ist nur eine Adresse, kein Standort.\"</div>\r\n\r\n  <h2>Wie du den richtigen Standort findest.</h2>\r\n  <p>Drei einfache Regeln:</p>\r\n  <ul>\r\n    <li><strong>Wähle den Standort mit der kürzesten Strecke</strong>, nicht den prominentesten. Akupunktur funktioniert nur, wenn du regelmässig kommst. 30 Minuten Anfahrt mehr pro Sitzung bedeuten oft, dass nach drei Wochen Schluss ist.</li>\r\n    <li><strong>Wenn deine Beschwerde spezifisch ist, wähle nach Spezialgebiet.</strong> Kinderwunsch in Kreuzlingen, Migräne in St. Gallen, Stress in Zug oder Zürich, das macht einen Unterschied.</li>\r\n    <li><strong>Bei Unsicherheit: WhatsApp.</strong> Wir empfehlen ehrlich den passenden Standort, auch wenn das manchmal nicht der nächste ist.</li>\r\n  </ul>\r\n\r\n  <h2>Was an allen Standorten gleich ist.</h2>\r\n  <ul>\r\n    <li>Alle Therapeutinnen sind EMR- und ASCA-zertifiziert</li>\r\n    <li>Gleiche Preise: CHF 160 Erstanamnese (60 Min), CHF 130 Folgesitzung (45 Min)</li>\r\n    <li>Krankenkassen-Abrechnung über alle gängigen Zusatzversicherungen (Helsana, Swica, CSS, Sanitas, Concordia und andere)</li>\r\n    <li>Termine in der Regel 24–48 Stunden über WhatsApp</li>\r\n    <li>Akut-Slots täglich für Patientinnen mit Schmerzen, Migräne, Schlafstörungen</li>\r\n    <li>Ehrliche Zwischenbilanz nach 4 Sitzungen, wenn es nicht wirkt, sagen wir das</li>\r\n  </ul>\r\n\r\n  <h2>Standorte, an denen wir bewusst nicht sind, und warum.</h2>\r\n  <p>Wir haben uns lange überlegt, ob wir in Basel, Bern, Genf oder ins Tessin gehen. Bisher: nein. Der Grund ist einfach: wir hatten dort keine Therapeutin, die unserem Qualitätsanspruch genügt und die wir persönlich kennen. Lieber elf gute Standorte als zwanzig durchschnittliche.</p>\r\n  <p>Wenn du in Basel oder Bern wohnst und nach guter TCM suchst: ehrlicher Rat, frag bei der EMR-Therapeutendatenbank nach lokalen Empfehlungen. Wir können dort nicht für die Qualität bürgen.</p>\r\n\r\n  <h2>Was du bei der ersten Anfrage angeben solltest.</h2>\r\n  <ul>\r\n    <li>Deine Hauptbeschwerde (was bringt dich zu uns)</li>\r\n    <li>Wie lange das schon geht</li>\r\n    <li>Wo du wohnst (PLZ reicht)</li>\r\n    <li>Drei Tageszeiten, die für Termine passen würden</li>\r\n    <li>Falls relevant: bisherige Diagnosen oder Therapien</li>\r\n  </ul>\r\n  <p>Mit diesen Infos können wir dir innert ein bis zwei Stunden den passenden Standort, die passende Therapeutin und konkrete Slots vorschlagen.</p>\r\n\r\n  <p>Mehr zu unserer Methode auf der <a href=\"/therapien/akupunktur\">Akupunktur-Seite</a>. Wenn du nach Beschwerdebild suchst, hilft die <a href=\"/wissen\">Beschwerden-Übersicht</a>.</p>\r\n</div>",
    "faqs": [
      {
        "q": "Habt ihr eine Praxis in meiner Stadt?+",
        "a": "Wir sind in elf Städten der Deutschschweiz: Zürich, Winterthur, Baden, Aarau, Luzern, Zug, St. Gallen, Frauenfeld, Kreuzlingen, Schaffhausen, Chur. Wenn du im Umkreis von 20 km wohnst, gibt es eine Praxis, die gut erreichbar ist."
      },
      {
        "q": "Habt ihr auch Praxen in Basel, Bern oder im Tessin?+",
        "a": "Nein. Wir sind bewusst nicht überall. Wir gehen nur dorthin, wo wir Therapeutinnen mit echter Erfahrung haben. Für Basel/Bern empfehlen wir die EMR-Therapeutendatenbank."
      },
      {
        "q": "Welche Krankenkassen-Zusatzversicherungen zahlen?+",
        "a": "Alle gängigen Komplementärmedizin-Zusatzversicherungen, Helsana, Swica, CSS, Sanitas, Concordia und andere. Meist 75–90% Rückerstattung bei unseren EMR/ASCA-zertifizierten Therapeutinnen."
      },
      {
        "q": "Wie wähle ich den richtigen Standort?+",
        "a": "Drei Regeln: kürzeste Strecke gewinnt, bei spezifischer Beschwerde nach Spezialgebiet wählen, bei Unsicherheit über WhatsApp fragen. Wir empfehlen ehrlich."
      },
      {
        "q": "Sind alle Praxen gleich gut?+",
        "a": "Im Grundniveau ja, alle Therapeutinnen sind EMR/ASCA-zertifiziert, alle nutzen das gleiche Behandlungsprotokoll. Spezialisierungen unterscheiden sich. Frag uns bei spezifischen Beschwerden gezielt."
      }
    ],
    "related": [
      {
        "href": "/standorte",
        "label": "Alle Standorte",
        "cat": "TCM.ch"
      },
      {
        "href": "/standorte/zuerich-oerlikon",
        "label": "Zürich Oerlikon",
        "cat": "Standort"
      },
      {
        "href": "/therapien/akupunktur",
        "label": "Akupunktur",
        "cat": "Therapie"
      }
    ]
  }
];
export const wissenBySlug = (slug: string): Wissen | undefined => wissen.find((w) => w.slug === slug);
