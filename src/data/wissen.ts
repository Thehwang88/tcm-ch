// ── Single source of truth for migrated Wissen articles (Astro static pages). ──
// Route: src/pages/wissen/[slug].astro (getStaticPaths). Phase 4 pilot: ONLY the
// migraene evergreen article. City-variant doorway articles are NOT migrated.
// Schema (shared template): MedicalWebPage + Person(author) + FAQPage, with the
// reviewedBy + lastReviewed E-E-A-T upgrade applied to ALL articles via the template.
export interface WissenFaq { q: string; a: string }
export interface WissenRelated { href: string; label: string; cat: string }
export interface WissenAuthor { name: string; role: string; bio: string }
export interface Wissen {
  slug: string; title: string; metaDesc: string; category: string; h1: string; lead: string;
  readingTime: string; author: WissenAuthor; reviewerName: string;
  datePublished: string; dateModified: string; lastReviewed: string;
  bodyHtml: string; faqs: WissenFaq[]; related: WissenRelated[];
}
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
    "reviewerName": "Dr. med. TCM",
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
  }
];
export const wissenBySlug = (slug: string): Wissen | undefined => wissen.find((w) => w.slug === slug);
