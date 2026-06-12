export interface StandortFaq { q: string; a: string }
export interface StandortLink { slug: string; label: string }
export interface Standort { slug: string; name: string; region: string; canton: string; title: string; metaDesc: string; open: boolean; openingNote: string; address: string; phone: string; hours: string; hoursISO: string[]; geo: { lat: number; lng: number } | null; lead: string; bodyHtml: string; therapies: StandortLink[]; nearby: StandortLink[]; beschwerden: StandortLink[]; faqs: StandortFaq[]; }
export const REVIEWED_DATE = '2026-06-10';
export const standorte: Standort[] = [
  {
    "slug": "kreuzlingen",
    "name": "Kreuzlingen",
    "region": "Bodenseeregion",
    "canton": "Thurgau",
    "title": "TCM Kreuzlingen – Akupunktur, Tuina & TCM-Klinik am Bodensee",
    "metaDesc": "TCM Kreuzlingen, Akupunktur, Schröpfen, Tuina & chinesische Kräuter in der Bodenseeregion. Termin oft innert 24h. Auch für Patient:innen aus Konstanz. Zusatzversicherung.",
    "open": true,
    "openingNote": "",
    "address": "Romanshornerstrasse 1, 8280 Kreuzlingen",
    "phone": "+41 77 523 61 22",
    "hours": "Mo–Fr 7:30–19:30 Uhr, Sa 7:30–16:30 Uhr",
    "hoursISO": [
      "Mo-Fr 07:30-19:30",
      "Sa 07:30-16:30"
    ],
    "geo": {
      "lat": 47.65,
      "lng": 9.175
    },
    "lead": "TCM Kreuzlingen: Akupunktur, Tuina und Kräuter im Herzen der Bodenseeregion. Auch grenznahe Patient:innen aus Konstanz willkommen.",
    "bodyHtml": "<h2>TCM Kreuzlingen, Akupunktur, Tuina & TCM-Klinik am Bodensee</h2><p>Unsere <strong>TCM-Praxis Kreuzlingen</strong> an der Hauptstrasse liegt im Zentrum der Bodenseeregion, grenznah zu Konstanz und mit guter Anbindung an den ganzen Thurgau. Wir bieten das vollständige Spektrum der Traditionellen Chinesischen Medizin: <strong>Akupunktur</strong>, <strong>Schröpfen</strong>, <strong>Tuina-Massage</strong>, <strong>chinesische Kräutertherapie</strong>, Moxibustion und Elektroakupunktur. Alle Therapeut:innen sind EMR- und ASCA-anerkannt.</p><h2>Einzugsgebiet – Patient:innen aus Kreuzlingen, Konstanz und Umgebung</h2><p>Zu unseren Patient:innen zählen Menschen aus allen Stadtteilen Kreuzlingens: <strong>Innenstadt</strong>, <strong>Egelshofen</strong>, <strong>Kurzrickenbach</strong> und <strong>Bernrain</strong>. Aus den umliegenden Thurgauer Gemeinden, Tägerwilen, Bottighofen, Münsterlingen, Lengwil, Altnau, sowie aus dem grenznahen <strong>Konstanz</strong>, Meersburg und der Region Bodensee kommen Patient:innen regelmässig zu uns.</p><h2>Anfahrt zur TCM-Praxis Kreuzlingen</h2><h3>Mit dem Zug & ÖV</h3><p><strong>Bahnhof Kreuzlingen</strong> und <strong>Bahnhof Kreuzlingen Hafen</strong> in wenigen Gehminuten erreichbar. S-Bahn-Linie S14 sowie Verbindungen nach Konstanz, Romanshorn und Schaffhausen. Mehrere Buslinien (Stadtbus Kreuzlingen) halten in der Nähe.</p><h3>Mit dem Auto & Parken</h3><p>Anfahrt über A7 (Ausfahrt Kreuzlingen). Parkmöglichkeiten in der Nähe: <strong>Parkhaus Stadthaus</strong>, <strong>Parkhaus Bärenplatz</strong>, Parkhaus Karussell.</p>",
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "schroepfen",
        "label": "Schröpfen"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      },
      {
        "slug": "kraeutertherapie",
        "label": "Kräutertherapie"
      },
      {
        "slug": "moxibustion",
        "label": "Moxibustion"
      },
      {
        "slug": "elektroakupunktur",
        "label": "Elektroakupunktur"
      }
    ],
    "nearby": [
      {
        "slug": "frauenfeld",
        "label": "Frauenfeld"
      },
      {
        "slug": "wil",
        "label": "Wil"
      },
      {
        "slug": "st-gallen",
        "label": "St. Gallen"
      }
    ],
    "beschwerden": [
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "nackenschmerzen",
        "label": "Nackenschmerzen"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      },
      {
        "slug": "schlafstoerungen",
        "label": "Schlafstörungen"
      },
      {
        "slug": "stress-burnout",
        "label": "Stress & Burnout"
      }
    ],
    "faqs": [
      {
        "q": "Wo befindet sich die TCM-Praxis Kreuzlingen?",
        "a": "Unsere TCM-Praxis Kreuzlingen liegt zentral an der Hauptstrasse, nahe Bahnhof Kreuzlingen und in unmittelbarer Nähe zur Grenze nach Konstanz."
      },
      {
        "q": "Wie schnell bekomme ich einen Termin in Kreuzlingen?",
        "a": "In den meisten Fällen innerhalb von 24 Stunden. WhatsApp-Anfrage genügt, Antwort meist innert 30 Minuten."
      },
      {
        "q": "Behandeln Sie auch Patient:innen aus Konstanz und Deutschland?",
        "a": "Ja. Wir betreuen viele grenznahe Patient:innen aus Konstanz, Meersburg und der Bodenseeregion. Akupunktur und TCM sind in der Schweiz von Zusatzversicherungen anerkannt."
      },
      {
        "q": "Welche Behandlungen werden in Kreuzlingen angeboten?",
        "a": "Akupunktur, Schröpfen, Tuina-Massage, Moxibustion, chinesische Kräutertherapie, Gua Sha und Elektroakupunktur: das vollständige TCM-Spektrum."
      },
      {
        "q": "Übernimmt die Krankenkasse die Kosten?",
        "a": "Akupunktur und TCM werden von vielen Zusatzversicherungen übernommen. Alle Therapeut:innen sind EMR- und ASCA-anerkannt."
      },
      {
        "q": "Wie sieht ein Erstbesuch aus?",
        "a": "Der Erstbesuch dauert 60–75 Minuten und umfasst ausführliche Anamnese, Zungen- und Pulsdiagnostik sowie die erste Behandlung."
      },
      {
        "q": "Welche Sprachen sprechen Sie?",
        "a": "Deutsch, Englisch, Mandarin. Weitere Sprachen auf Anfrage."
      },
      {
        "q": "Wie komme ich zur Praxis?",
        "a": "Bahnhof Kreuzlingen in wenigen Gehminuten erreichbar. S-Bahn S14 sowie zahlreiche Buslinien halten in unmittelbarer Nähe. Parkplätze in der Innenstadt verfügbar."
      }
    ]
  },
  {
    "slug": "frauenfeld",
    "name": "Frauenfeld",
    "region": "Thurgau",
    "canton": "Thurgau",
    "title": "TCM Frauenfeld – Akupunktur, Tuina & TCM-Klinik im Thurgau",
    "metaDesc": "TCM Frauenfeld, Akupunktur, Schröpfen, Tuina & chinesische Kräuter in der Thurgauer Kantonshauptstadt. Bahnhofstrasse, Termin oft innert 24h. Zusatzversicherung.",
    "open": true,
    "openingNote": "",
    "address": "Rheinstrasse 25, 8500 Frauenfeld",
    "phone": "+41 77 523 61 22",
    "hours": "Mo–Fr 7:30–19:30 Uhr, Sa 7:30–16:30 Uhr",
    "hoursISO": [
      "Mo-Fr 07:30-19:30",
      "Sa 07:30-16:30"
    ],
    "geo": {
      "lat": 47.5567,
      "lng": 8.8983
    },
    "lead": "TCM Frauenfeld: Akupunktur, Tuina und chinesische Kräuter in der Thurgauer Kantonshauptstadt. Bahnhofstrasse, Termin oft innert 24h.",
    "bodyHtml": "<h2>TCM Frauenfeld, Akupunktur, Tuina & TCM-Klinik in der Kantonshauptstadt</h2><p>Unsere <strong>TCM-Praxis Frauenfeld</strong> an der Bahnhofstrasse liegt im Herzen der Thurgauer Kantonshauptstadt, wenige Gehminuten vom Hauptbahnhof entfernt. Wir bieten das vollständige Spektrum der Traditionellen Chinesischen Medizin: <strong>Akupunktur</strong>, <strong>Schröpfen</strong>, <strong>Tuina-Massage</strong>, <strong>chinesische Kräutertherapie</strong>, Moxibustion und Elektroakupunktur. Alle Therapeut:innen sind EMR- und ASCA-anerkannt.</p><h2>Einzugsgebiet – Patient:innen aus Frauenfeld und dem ganzen Thurgau</h2><p>Zu unseren Patient:innen zählen Menschen aus allen Stadtteilen Frauenfelds: <strong>Innenstadt</strong>, <strong>Kurzdorf</strong>, <strong>Oberkirch</strong>, <strong>Herten</strong> und <strong>Erzenholz</strong>. Aus umliegenden Thurgauer Gemeinden wie Matzingen, Stettfurt, Felben-Wellhausen, Müllheim, Pfyn, Aadorf, Eschlikon, Weinfelden und Amriswil kommen Patient:innen regelmässig zu uns. Die zentrale Lage an der Bahnhofstrasse macht uns für den ganzen Kanton erreichbar.</p><h2>Anfahrt zur TCM-Praxis Frauenfeld</h2><h3>Mit dem Zug & ÖV</h3><p><strong>Hauptbahnhof Frauenfeld</strong> in wenigen Gehminuten erreichbar. S-Bahn-Linien S30 (Winterthur–Frauenfeld–Romanshorn) und S35 sowie IR-Verbindungen halten im HB Frauenfeld. Frauenfeld-Wil-Bahn (FWB) ergänzt das Netz.</p><h3>Mit dem Auto & Parken</h3><p>Anfahrt über A7 (Ausfahrt Frauenfeld-West oder Frauenfeld-Ost). Parkmöglichkeiten in der Nähe: <strong>Parkhaus Marktplatz</strong>, <strong>Parkhaus Promenade</strong>, Parkhaus Bahnhof.</p>",
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "schroepfen",
        "label": "Schröpfen"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      },
      {
        "slug": "kraeutertherapie",
        "label": "Kräutertherapie"
      },
      {
        "slug": "moxibustion",
        "label": "Moxibustion"
      },
      {
        "slug": "elektroakupunktur",
        "label": "Elektroakupunktur"
      }
    ],
    "nearby": [
      {
        "slug": "kreuzlingen",
        "label": "Kreuzlingen"
      },
      {
        "slug": "winterthur-muenzgasse",
        "label": "Winterthur Münzgasse"
      },
      {
        "slug": "wil",
        "label": "Wil"
      }
    ],
    "beschwerden": [
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "nackenschmerzen",
        "label": "Nackenschmerzen"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      },
      {
        "slug": "schlafstoerungen",
        "label": "Schlafstörungen"
      },
      {
        "slug": "stress-burnout",
        "label": "Stress & Burnout"
      }
    ],
    "faqs": [
      {
        "q": "Wo befindet sich die TCM-Praxis Frauenfeld?",
        "a": "Unsere TCM-Praxis Frauenfeld liegt zentral an der Bahnhofstrasse, wenige Gehminuten vom Hauptbahnhof Frauenfeld entfernt."
      },
      {
        "q": "Wie schnell bekomme ich einen Termin in Frauenfeld?",
        "a": "In den meisten Fällen innerhalb von 24 Stunden. WhatsApp-Anfrage genügt, Antwort meist innert 30 Minuten."
      },
      {
        "q": "Welche TCM-Behandlungen werden in Frauenfeld angeboten?",
        "a": "Akupunktur, Schröpfen, Tuina-Massage, Moxibustion, chinesische Kräutertherapie, Gua Sha und Elektroakupunktur: das vollständige TCM-Spektrum."
      },
      {
        "q": "Übernimmt die Krankenkasse die Kosten?",
        "a": "Akupunktur und TCM werden von vielen Zusatzversicherungen übernommen. Alle Therapeut:innen sind EMR- und ASCA-anerkannt."
      },
      {
        "q": "Wie sieht ein Erstbesuch aus?",
        "a": "Der Erstbesuch dauert 60–75 Minuten: ausführliche Anamnese, Zungen- und Pulsdiagnostik, erste Behandlung."
      },
      {
        "q": "Gibt es Parkplätze in der Nähe?",
        "a": "Parkhaus Marktplatz, Parkhaus Promenade und Parkhaus Bahnhof in wenigen Gehminuten erreichbar."
      },
      {
        "q": "Welche Sprachen sprechen Sie?",
        "a": "Deutsch, Englisch, Mandarin. Weitere Sprachen auf Anfrage."
      },
      {
        "q": "Behandeln Sie Kinder und Schwangere?",
        "a": "Ja. Wir haben Erfahrung mit sanfter TCM in der Schwangerschaft, Kinderwunsch-Begleitung sowie Akupressur und Tuina bei Kindern."
      }
    ]
  },
  {
    "slug": "winterthur-muenzgasse",
    "name": "Winterthur Münzgasse",
    "region": "Region Zürich",
    "canton": "Zürich",
    "title": "TCM Winterthur Münzgasse – Akupunktur, Tuina & TCM-Klinik",
    "metaDesc": "TCM Winterthur Münzgasse, Akupunktur, Schröpfen, Tuina & chinesische Kräuter in der Altstadt. Münzgasse 2, 4 Min. vom Bahnhof. Termin oft innert 24h. Zusatzversicherung.",
    "open": true,
    "openingNote": "",
    "address": "Münzgasse 2, 8400 Winterthur",
    "phone": "+41 77 523 61 22",
    "hours": "Mo–Fr 7:30–19:30 Uhr, Sa 7:30–16:30 Uhr",
    "hoursISO": [
      "Mo-Fr 07:30-19:30",
      "Sa 07:30-16:30"
    ],
    "geo": {
      "lat": 47.4998,
      "lng": 8.729
    },
    "lead": "TCM Winterthur – Akupunktur, Schröpfen, Tuina & chinesische Kräuter im Zentrum. Münzgasse 2, 4 Gehminuten vom Bahnhof. Termin oft innert 24h.",
    "bodyHtml": "<h2>TCM Winterthur, Akupunktur, Tuina & TCM-Klinik im Stadtzentrum</h2><p>Unsere <strong>TCM-Praxis Winterthur</strong> an der Münzgasse 2 liegt im Herzen der Altstadt, wenige Gehminuten vom Hauptbahnhof entfernt. Wir bieten das vollständige Spektrum der Traditionellen Chinesischen Medizin: <strong>Akupunktur</strong>, <strong>Schröpfen</strong>, <strong>Tuina-Massage</strong>, <strong>chinesische Kräutertherapie</strong>, Moxibustion und Elektroakupunktur. Alle Therapeut:innen sind EMR- und ASCA-anerkannt.</p><h2>Einzugsgebiet – Patient:innen aus ganz Winterthur und Umgebung</h2><p>Zu unseren Patient:innen zählen Menschen aus allen Stadtkreisen Winterthurs: <strong>Altstadt</strong>, <strong>Oberwinterthur</strong>, <strong>Töss</strong>, <strong>Wülflingen</strong>, <strong>Seen</strong>, <strong>Veltheim</strong> und <strong>Mattenbach</strong>. Aus umliegenden Gemeinden wie Wiesendangen, Pfungen, Neftenbach, Elgg, Illnau-Effretikon und Brütten kommen Patient:innen regelmässig zu uns. Die zentrale Lage an der Münzgasse macht uns für die ganze Region erreichbar.</p><h2>Anfahrt zur TCM-Praxis Winterthur</h2><h3>Mit dem Zug & ÖV</h3><p><strong>Hauptbahnhof Winterthur</strong>, 4 Gehminuten zur Praxis. S-Bahn-Linien S7, S8, S11, S12, S29, S30, S35 sowie alle IC- und IR-Verbindungen halten im HB Winterthur.</p><h3>Mit dem Auto & Parken</h3><p>Anfahrt über A1 (Ausfahrt Winterthur-Töss oder Winterthur-Wülflingen). Parkmöglichkeiten in der Nähe: <strong>Parkhaus Neumarkt</strong> (3 Min. Fussweg), <strong>Parkhaus Untertor</strong> (4 Min.), Parkhaus Theater (6 Min.). Die Altstadt ist weitgehend Fussgängerzone.</p>",
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "schroepfen",
        "label": "Schröpfen"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      },
      {
        "slug": "kraeutertherapie",
        "label": "Kräutertherapie"
      },
      {
        "slug": "moxibustion",
        "label": "Moxibustion"
      },
      {
        "slug": "elektroakupunktur",
        "label": "Elektroakupunktur"
      }
    ],
    "nearby": [
      {
        "slug": "frauenfeld",
        "label": "Frauenfeld"
      },
      {
        "slug": "zuerich-oerlikon",
        "label": "Zürich Oerlikon"
      },
      {
        "slug": "volketswil",
        "label": "Volketswil"
      }
    ],
    "beschwerden": [
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "nackenschmerzen",
        "label": "Nackenschmerzen"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      },
      {
        "slug": "schlafstoerungen",
        "label": "Schlafstörungen"
      },
      {
        "slug": "stress-burnout",
        "label": "Stress & Burnout"
      }
    ],
    "faqs": [
      {
        "q": "Wo befindet sich die TCM-Praxis Winterthur?",
        "a": "Unsere TCM-Praxis Winterthur liegt an der Münzgasse 2, 8400 Winterthur – mitten in der Altstadt, 4 Gehminuten vom Hauptbahnhof Winterthur entfernt."
      },
      {
        "q": "Wie schnell bekomme ich einen Termin in Winterthur?",
        "a": "In den meisten Fällen können wir innerhalb von 24 Stunden einen Termin anbieten. Schreib uns per WhatsApp oder ruf an, die Antwort kommt meist innerhalb von 30 Minuten."
      },
      {
        "q": "Welche TCM-Behandlungen bieten Sie in Winterthur an?",
        "a": "Akupunktur, Schröpfen, Tuina-Massage, Moxibustion, chinesische Kräutertherapie, Elektroakupunktur, Gesichtsakupunktur, Akupressur und Gua Sha: das vollständige TCM-Spektrum unter einem Dach."
      },
      {
        "q": "Übernimmt die Krankenkasse die Kosten in Winterthur?",
        "a": "Akupunktur und TCM-Therapien werden von vielen Zusatzversicherungen (Komplementärmedizin) übernommen. Unsere Therapeut:innen sind EMR- und ASCA-anerkannt. Eine kurze Bestätigung deiner Kasse empfehlen wir vor dem Erstbesuch."
      },
      {
        "q": "Wie sieht ein Erstbesuch in der TCM-Praxis Winterthur aus?",
        "a": "Der Erstbesuch dauert 60–75 Minuten und umfasst ein ausführliches Gespräch, Zungen- und Pulsdiagnostik sowie die erste Behandlung. Lockere Kleidung und kein voller Magen werden empfohlen."
      },
      {
        "q": "Gibt es Parkplätze bei der TCM-Praxis Winterthur?",
        "a": "Mehrere öffentliche Parkhäuser in fussläufiger Distanz: Parkhaus Neumarkt (3 Min.), Parkhaus Untertor (4 Min.), Parkhaus Theater (6 Min.). Anreise mit ÖV empfohlen, Hauptbahnhof Winterthur in 4 Gehminuten."
      },
      {
        "q": "Welche Sprachen werden in der Praxis gesprochen?",
        "a": "Deutsch, Englisch und Mandarin. Weitere Sprachen auf Anfrage."
      },
      {
        "q": "Behandeln Sie Kinder und Schwangere?",
        "a": "Ja. Wir haben spezielle Erfahrung mit TCM in der Schwangerschaft, Kinderwunsch-Begleitung sowie sanfter Akupressur und Tuina bei Kindern."
      }
    ]
  },
  {
    "slug": "winterthur-marktgasse",
    "name": "Winterthur Marktgasse",
    "region": "Region Zürich",
    "canton": "Zürich",
    "title": "TCM Winterthur Marktgasse – Akupunktur & TCM in der Altstadt",
    "metaDesc": "TCM Winterthur Marktgasse, Akupunktur, Schröpfen, Tuina & chinesische Kräuter mitten in der Altstadt. Marktgasse 78, beim Stadthaus. Termin oft innert 24h. Zusatzversicherung.",
    "open": true,
    "openingNote": "",
    "address": "Marktgasse 78, 8400 Winterthur",
    "phone": "+41 77 523 61 22",
    "hours": "Mo–Fr 7:30–19:30 Uhr, Sa 7:30–16:30 Uhr",
    "hoursISO": [
      "Mo-Fr 07:30-19:30",
      "Sa 07:30-16:30"
    ],
    "geo": {
      "lat": 47.4992,
      "lng": 8.7281
    },
    "lead": "TCM Winterthur Marktgasse – Akupunktur, Schröpfen, Tuina & chinesische Kräuter mitten in der Altstadt. Marktgasse 78, wenige Gehminuten vom Bahnhof. Termin oft innert 24h.",
    "bodyHtml": "<h2>TCM Winterthur Marktgasse, Akupunktur & TCM mitten in der Altstadt</h2><p>Unsere zweite <strong>TCM-Praxis in Winterthur</strong> liegt an der <strong>Marktgasse 78</strong>, direkt in der Altstadt und nur wenige Gehminuten vom Hauptbahnhof. Du erhältst hier das vollständige Spektrum der Traditionellen Chinesischen Medizin: <strong>Akupunktur</strong>, <strong>Schröpfen</strong>, <strong>Tuina-Massage</strong>, <strong>chinesische Kräutertherapie</strong>, Moxibustion und Elektroakupunktur. Alle Therapeut:innen sind EMR- und ASCA-anerkannt.</p><h2>Zwei Standorte in Winterthur</h2><p>Mit der Marktgasse 78 ergänzen wir unsere bestehende Praxis an der Münzgasse. So findest du in der Winterthurer Altstadt zwei gut erreichbare Anlaufstellen für TCM, wähle einfach den Standort, der für dich am bequemsten liegt.</p><h2>Einzugsgebiet</h2><p>Zu uns kommen Patient:innen aus allen Stadtkreisen Winterthurs – Altstadt, Oberwinterthur, Töss, Wülflingen, Seen, Veltheim und Mattenbach – sowie aus den umliegenden Gemeinden im Tösstal und Zürcher Oberland.</p><h2>Anfahrt zur Marktgasse 78</h2><h3>Mit dem Zug & ÖV</h3><p><strong>Hauptbahnhof Winterthur</strong> in wenigen Gehminuten. Vom Bahnhof führt der Weg direkt in die Fussgängerzone der Altstadt.</p><h3>Mit dem Auto & Parken</h3><p>Anfahrt über die A1 (Ausfahrt Winterthur). Parkmöglichkeiten in der Nähe: Parkhaus Altstadt und Parkhaus Untertor. Die Altstadt ist weitgehend Fussgängerzone.</p>",
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "schroepfen",
        "label": "Schröpfen"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      },
      {
        "slug": "kraeutertherapie",
        "label": "Kräutertherapie"
      },
      {
        "slug": "moxibustion",
        "label": "Moxibustion"
      },
      {
        "slug": "elektroakupunktur",
        "label": "Elektroakupunktur"
      }
    ],
    "nearby": [
      {
        "slug": "winterthur-muenzgasse",
        "label": "Winterthur Münzgasse"
      },
      {
        "slug": "frauenfeld",
        "label": "Frauenfeld"
      },
      {
        "slug": "zuerich-oerlikon",
        "label": "Zürich Oerlikon"
      }
    ],
    "beschwerden": [
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "nackenschmerzen",
        "label": "Nackenschmerzen"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      },
      {
        "slug": "schlafstoerungen",
        "label": "Schlafstörungen"
      },
      {
        "slug": "stress-burnout",
        "label": "Stress & Burnout"
      }
    ],
    "faqs": [
      {
        "q": "Wo befindet sich die TCM-Praxis Winterthur Marktgasse?",
        "a": "Du findest uns an der Marktgasse 78, 8400 Winterthur – mitten in der Altstadt, wenige Gehminuten vom Hauptbahnhof Winterthur entfernt."
      },
      {
        "q": "Wie schnell bekomme ich einen Termin?",
        "a": "In den meisten Fällen innerhalb von 24 Stunden. Schreib uns per WhatsApp oder ruf an, die Antwort kommt meist innerhalb von 30 Minuten."
      },
      {
        "q": "Welche TCM-Behandlungen bietet ihr an der Marktgasse an?",
        "a": "Akupunktur, Schröpfen, Tuina-Massage, Moxibustion, chinesische Kräutertherapie, Elektroakupunktur, Gesichtsakupunktur, Akupressur und Gua Sha: das vollständige TCM-Spektrum."
      },
      {
        "q": "Übernimmt die Krankenkasse die Kosten?",
        "a": "Akupunktur und TCM-Therapien werden von vielen Zusatzversicherungen (Komplementärmedizin) übernommen. Unsere Therapeut:innen sind EMR- und ASCA-anerkannt. Eine kurze Bestätigung deiner Kasse empfehlen wir vor dem Erstbesuch."
      },
      {
        "q": "Was ist der Unterschied zur Praxis an der Münzgasse?",
        "a": "Beide Praxen liegen in der Winterthurer Altstadt und bieten dasselbe TCM-Spektrum. Die Marktgasse 78 ist unser zweiter Standort in Winterthur – wähle einfach, was für dich besser erreichbar ist."
      },
      {
        "q": "Gibt es Parkplätze in der Nähe?",
        "a": "Mehrere öffentliche Parkhäuser in fussläufiger Distanz, darunter Parkhaus Altstadt und Parkhaus Untertor. Anreise mit ÖV empfohlen, Hauptbahnhof Winterthur in wenigen Gehminuten."
      },
      {
        "q": "Welche Sprachen werden gesprochen?",
        "a": "Deutsch, Englisch und Mandarin. Weitere Sprachen auf Anfrage."
      },
      {
        "q": "Behandelt ihr auch Kinder und Schwangere?",
        "a": "Ja. Wir haben Erfahrung mit TCM in der Schwangerschaft, Kinderwunsch-Begleitung sowie sanfter Akupressur und Tuina bei Kindern."
      }
    ]
  },
  {
    "slug": "volketswil",
    "name": "Volketswil",
    "region": "Zürcher Oberland",
    "canton": "Zürich",
    "title": "TCM Volketswil – Akupunktur, Tuina & TCM-Klinik im Zürcher Oberland",
    "metaDesc": "TCM Volketswil, Akupunktur, Schröpfen, Tuina & chinesische Kräuter im Zürcher Oberland. Auch für Patient:innen aus Uster, Dübendorf, Greifensee. Termin oft innert 24h.",
    "open": true,
    "openingNote": "",
    "address": "Lindenstrasse 2/1, 8604 Volketswil",
    "phone": "+41 77 523 61 22",
    "hours": "Mo–Fr 7:30–19:30 Uhr, Sa 7:30–16:30 Uhr",
    "hoursISO": [
      "Mo-Fr 07:30-19:30",
      "Sa 07:30-16:30"
    ],
    "geo": {
      "lat": 47.3923,
      "lng": 8.697
    },
    "lead": "TCM Volketswil: Akupunktur, Tuina und chinesische Kräuter im Zürcher Oberland. Ruhig gelegen, optimal für Uster, Dübendorf und Greifensee.",
    "bodyHtml": "<h2>TCM Volketswil, Akupunktur, Tuina & TCM-Klinik im Zürcher Oberland</h2><p>Unsere <strong>TCM-Praxis Volketswil</strong> liegt zentral im Zürcher Oberland, gut erreichbar aus dem ganzen Glattal und der Region Uster/Dübendorf. Wir bieten das vollständige Spektrum der Traditionellen Chinesischen Medizin: <strong>Akupunktur</strong>, <strong>Schröpfen</strong>, <strong>Tuina-Massage</strong>, <strong>chinesische Kräutertherapie</strong>, Moxibustion und Elektroakupunktur. Alle Therapeut:innen sind EMR- und ASCA-anerkannt.</p><h2>Einzugsgebiet – Patient:innen aus dem Zürcher Oberland und Glattal</h2><p>Zu unseren Patient:innen zählen Menschen aus Volketswil und allen Ortsteilen, <strong>Zentrum</strong>, <strong>Gutenswil</strong>, <strong>Hegnau</strong> und <strong>Kindhausen</strong>. Aus umliegenden Gemeinden wie Uster, Dübendorf, Schwerzenbach, Greifensee, Wangen-Brüttisellen, Pfäffikon ZH und Mönchaltorf kommen Patient:innen regelmässig zu uns.</p><h2>Anfahrt zur TCM-Praxis Volketswil</h2><h3>Mit dem Zug & ÖV</h3><p>Bahnhof Schwerzenbach (S-Bahn S9) in wenigen Minuten mit Bus erreichbar. Bus-Linien 740, 747 und 757 verbinden Volketswil mit Uster, Dübendorf und Schwerzenbach.</p><h3>Mit dem Auto & Parken</h3><p>Anfahrt über A53 (Ausfahrt Volketswil) oder A1. Direkt bei der Praxis verfügbare <strong>kostenlose Parkplätze</strong>. Volkiland mit grossem Parkhaus in unmittelbarer Nähe.</p>",
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "schroepfen",
        "label": "Schröpfen"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      },
      {
        "slug": "kraeutertherapie",
        "label": "Kräutertherapie"
      },
      {
        "slug": "moxibustion",
        "label": "Moxibustion"
      },
      {
        "slug": "elektroakupunktur",
        "label": "Elektroakupunktur"
      }
    ],
    "nearby": [
      {
        "slug": "zuerich-oerlikon",
        "label": "Zürich Oerlikon"
      },
      {
        "slug": "winterthur-muenzgasse",
        "label": "Winterthur Münzgasse"
      },
      {
        "slug": "zuerich-city",
        "label": "Zürich City"
      }
    ],
    "beschwerden": [
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "nackenschmerzen",
        "label": "Nackenschmerzen"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      },
      {
        "slug": "schlafstoerungen",
        "label": "Schlafstörungen"
      },
      {
        "slug": "stress-burnout",
        "label": "Stress & Burnout"
      }
    ],
    "faqs": [
      {
        "q": "Wo befindet sich die TCM-Praxis Volketswil?",
        "a": "Unsere TCM-Praxis Volketswil liegt zentral im Zürcher Oberland, gut erreichbar aus Volketswil, Uster, Dübendorf und der Region Glattal."
      },
      {
        "q": "Wie schnell bekomme ich einen Termin?",
        "a": "In den meisten Fällen innerhalb von 24 Stunden. WhatsApp-Anfrage, Antwort meist innert 30 Minuten."
      },
      {
        "q": "Welche TCM-Behandlungen werden angeboten?",
        "a": "Akupunktur, Schröpfen, Tuina-Massage, Moxibustion, chinesische Kräutertherapie, Gua Sha und Elektroakupunktur."
      },
      {
        "q": "Übernimmt die Krankenkasse die Kosten?",
        "a": "Akupunktur und TCM werden von vielen Zusatzversicherungen übernommen. Alle Therapeut:innen sind EMR- und ASCA-anerkannt."
      },
      {
        "q": "Wie sieht ein Erstbesuch aus?",
        "a": "Der Erstbesuch dauert 60–75 Minuten: Anamnese, Zungen- und Pulsdiagnostik, erste Behandlung."
      },
      {
        "q": "Gibt es Parkplätze?",
        "a": "Ja, kostenlose Parkplätze direkt bei der Praxis sowie beim Volkiland in unmittelbarer Nähe."
      },
      {
        "q": "Welche Sprachen sprechen Sie?",
        "a": "Deutsch, Englisch, Mandarin. Weitere Sprachen auf Anfrage."
      },
      {
        "q": "Behandeln Sie Kinder und Schwangere?",
        "a": "Ja. Wir haben Erfahrung mit sanfter TCM in der Schwangerschaft, Kinderwunsch-Begleitung sowie Akupressur und Tuina bei Kindern."
      }
    ]
  },
  {
    "slug": "zuerich-hoengg",
    "name": "Zürich Höngg",
    "region": "Zürich",
    "canton": "Zürich",
    "title": "TCM Zürich Höngg – Akupunktur, Tuina & TCM-Klinik im Kreis 10",
    "metaDesc": "TCM Zürich Höngg, Akupunktur, Schröpfen, Tuina & chinesische Kräuter im Kreis 10. Tram 13/17, ruhige Lage. Termin oft innert 24h. Zusatzversicherung.",
    "open": true,
    "openingNote": "",
    "address": "Limmattalstrasse 340, 8049 Zürich",
    "phone": "+41 77 523 61 22",
    "hours": "Mo–Fr 7:30–19:30 Uhr, Sa 7:30–16:30 Uhr",
    "hoursISO": [
      "Mo-Fr 07:30-19:30",
      "Sa 07:30-16:30"
    ],
    "geo": {
      "lat": 47.404,
      "lng": 8.497
    },
    "lead": "TCM Zürich Höngg: Akupunktur, Tuina und chinesische Kräuter im Kreis 10. Ruhige Praxislage mit guter ÖV-Anbindung.",
    "bodyHtml": "<h2>TCM Zürich Höngg, Akupunktur, Tuina & TCM-Klinik im Kreis 10</h2><p>Unsere <strong>TCM-Praxis Zürich Höngg</strong> liegt im ruhigen Kreis 10, gut erreichbar mit Tram und Bus aus der ganzen Stadt Zürich. Wir bieten das vollständige Spektrum der Traditionellen Chinesischen Medizin: <strong>Akupunktur</strong>, <strong>Schröpfen</strong>, <strong>Tuina-Massage</strong>, <strong>chinesische Kräutertherapie</strong>, Moxibustion und Elektroakupunktur. Alle Therapeut:innen sind EMR- und ASCA-anerkannt.</p><h2>Einzugsgebiet – Patient:innen aus Höngg, Wipkingen und ganz Zürich</h2><p>Zu unseren Patient:innen zählen Menschen aus <strong>Höngg</strong>, <strong>Wipkingen</strong>, <strong>Affoltern</strong>, <strong>Albisrieden</strong>, dem Kreis 5 und der Region Limmattal. Auch aus Schlieren, Dietikon, Regensdorf und Engstringen kommen Patient:innen regelmässig zu uns.</p><h2>Anfahrt zur TCM-Praxis Zürich Höngg</h2><h3>Mit Tram & Bus</h3><p><strong>Tram 13 und 17</strong> sowie <strong>Bus 38 und 46</strong> halten in unmittelbarer Nähe. Vom Zürich HB in ca. 15 Minuten erreichbar. Bahnhof Wipkingen (S-Bahn) in 10 Gehminuten.</p><h3>Mit dem Auto & Parken</h3><p>Anfahrt über A1H (Hardturm-Wipkingen). Strassenparkplätze (blaue Zone, gebührenpflichtig) sowie Parkmöglichkeiten beim Migros Höngg.</p>",
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "schroepfen",
        "label": "Schröpfen"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      },
      {
        "slug": "kraeutertherapie",
        "label": "Kräutertherapie"
      },
      {
        "slug": "moxibustion",
        "label": "Moxibustion"
      },
      {
        "slug": "elektroakupunktur",
        "label": "Elektroakupunktur"
      }
    ],
    "nearby": [
      {
        "slug": "zuerich-city",
        "label": "Zürich City"
      },
      {
        "slug": "zuerich-oerlikon",
        "label": "Zürich Oerlikon"
      },
      {
        "slug": "volketswil",
        "label": "Volketswil"
      }
    ],
    "beschwerden": [
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "nackenschmerzen",
        "label": "Nackenschmerzen"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      },
      {
        "slug": "schlafstoerungen",
        "label": "Schlafstörungen"
      },
      {
        "slug": "stress-burnout",
        "label": "Stress & Burnout"
      }
    ],
    "faqs": [
      {
        "q": "Wo befindet sich die TCM-Praxis Zürich Höngg?",
        "a": "Unsere TCM-Praxis Zürich Höngg liegt im Kreis 10, gut erreichbar mit Tram 13, 17 und mehreren Buslinien."
      },
      {
        "q": "Wie schnell bekomme ich einen Termin?",
        "a": "In den meisten Fällen innerhalb von 24 Stunden. WhatsApp-Anfrage, Antwort meist innert 30 Minuten."
      },
      {
        "q": "Welche TCM-Behandlungen werden angeboten?",
        "a": "Akupunktur, Schröpfen, Tuina-Massage, Moxibustion, chinesische Kräutertherapie, Gua Sha und Elektroakupunktur."
      },
      {
        "q": "Übernimmt die Krankenkasse die Kosten?",
        "a": "Akupunktur und TCM werden von vielen Zusatzversicherungen übernommen. Alle Therapeut:innen sind EMR- und ASCA-anerkannt."
      },
      {
        "q": "Wie sieht ein Erstbesuch aus?",
        "a": "Der Erstbesuch dauert 60–75 Minuten: Anamnese, Zungen- und Pulsdiagnostik, erste Behandlung."
      },
      {
        "q": "Gibt es Parkplätze in Höngg?",
        "a": "Strassenparkplätze (gebührenpflichtig) sowie Parkmöglichkeiten beim Migros Höngg verfügbar. Anreise mit Tram/Bus empfohlen."
      },
      {
        "q": "Welche Sprachen sprechen Sie?",
        "a": "Deutsch, Englisch, Mandarin. Weitere Sprachen auf Anfrage."
      },
      {
        "q": "Behandeln Sie Kinder und Schwangere?",
        "a": "Ja. Wir haben Erfahrung mit sanfter TCM in der Schwangerschaft, Kinderwunsch sowie Akupressur und Tuina bei Kindern."
      }
    ]
  },
  {
    "slug": "zuerich-oerlikon",
    "name": "Zürich Oerlikon",
    "region": "Zürich",
    "canton": "Zürich",
    "title": "TCM Zürich Oerlikon – Akupunktur, Tuina & TCM-Klinik in Zürich Nord",
    "metaDesc": "TCM Zürich Oerlikon, Akupunktur, Schröpfen, Tuina & chinesische Kräuter in Zürich Nord. Bahnhof Oerlikon, S-Bahn-Knoten, Termin oft innert 24h. Zusatzversicherung.",
    "open": true,
    "openingNote": "",
    "address": "Schulstrasse 3, 8050 Zürich",
    "phone": "+41 77 523 61 22",
    "hours": "Mo–Fr 7:30–19:30 Uhr, Sa 7:30–16:30 Uhr",
    "hoursISO": [
      "Mo-Fr 07:30-19:30",
      "Sa 07:30-16:30"
    ],
    "geo": {
      "lat": 47.4117,
      "lng": 8.5478
    },
    "lead": "TCM Zürich Oerlikon: Akupunktur, Tuina und chinesische Kräuter in Zürich Nord. Direkt am S-Bahn-Knoten Oerlikon. Ideal für Berufstätige.",
    "bodyHtml": "<h2>TCM Zürich Oerlikon, Akupunktur, Tuina & TCM-Klinik in Zürich Nord</h2><p>Unsere <strong>TCM-Praxis Zürich Oerlikon</strong> liegt im Kreis 11, direkt erreichbar vom <strong>Bahnhof Zürich Oerlikon</strong>, einem der grössten S-Bahn-Knoten der Schweiz. Ideal für Berufstätige und Pendler:innen. Wir bieten das vollständige Spektrum der Traditionellen Chinesischen Medizin: <strong>Akupunktur</strong>, <strong>Schröpfen</strong>, <strong>Tuina-Massage</strong>, <strong>chinesische Kräutertherapie</strong>, Moxibustion und Elektroakupunktur. Alle Therapeut:innen sind EMR- und ASCA-anerkannt.</p><h2>Einzugsgebiet – Patient:innen aus ganz Zürich Nord und dem Glattal</h2><p>Zu unseren Patient:innen zählen Menschen aus <strong>Oerlikon</strong>, <strong>Seebach</strong>, <strong>Schwamendingen</strong>, <strong>Affoltern</strong> und dem Kreis 11/12. Auch aus dem <strong>Glattal</strong>, Wallisellen, Opfikon, Kloten, Bassersdorf, Rümlang und Regensdorf, kommen Patient:innen regelmässig zu uns. Die zentrale Lage am Bahnhof Oerlikon macht uns für ganz Zürich Nord und das Zürcher Unterland erreichbar.</p><h2>Anfahrt zur TCM-Praxis Zürich Oerlikon</h2><h3>Mit dem Zug & ÖV</h3><p><strong>Bahnhof Zürich Oerlikon</strong> in wenigen Gehminuten. S-Bahn S2, S5, S6, S7, S8, S9, S14, S15, S16, S19, S21, S24 sowie IC- und IR-Verbindungen halten in Oerlikon. <strong>Tram 10, 11, 14</strong> sowie zahlreiche Buslinien (Linie 32, 61, 62, 63, 75) ergänzen das Netz.</p><h3>Mit dem Auto & Parken</h3><p>Anfahrt über A1 (Ausfahrt Zürich-Affoltern oder Zürich-Seebach). Parkmöglichkeiten: <strong>Parkhaus Hallenstadion</strong>, <strong>Parkhaus Oerlikon</strong>, Parkhaus Sternen Oerlikon.</p>",
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "schroepfen",
        "label": "Schröpfen"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      },
      {
        "slug": "kraeutertherapie",
        "label": "Kräutertherapie"
      },
      {
        "slug": "moxibustion",
        "label": "Moxibustion"
      },
      {
        "slug": "elektroakupunktur",
        "label": "Elektroakupunktur"
      }
    ],
    "nearby": [
      {
        "slug": "zuerich-city",
        "label": "Zürich City"
      },
      {
        "slug": "zuerich-hoengg",
        "label": "Zürich Höngg"
      },
      {
        "slug": "winterthur-muenzgasse",
        "label": "Winterthur Münzgasse"
      }
    ],
    "beschwerden": [
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "nackenschmerzen",
        "label": "Nackenschmerzen"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      },
      {
        "slug": "schlafstoerungen",
        "label": "Schlafstörungen"
      },
      {
        "slug": "stress-burnout",
        "label": "Stress & Burnout"
      }
    ],
    "faqs": [
      {
        "q": "Wo befindet sich die TCM-Praxis Zürich Oerlikon?",
        "a": "Unsere TCM-Praxis Zürich Oerlikon liegt im Kreis 11, direkt erreichbar vom Bahnhof Oerlikon (S-Bahn-Knoten Zürich Nord)."
      },
      {
        "q": "Wie schnell bekomme ich einen Termin?",
        "a": "In den meisten Fällen innerhalb von 24 Stunden. WhatsApp-Anfrage, Antwort meist innert 30 Minuten."
      },
      {
        "q": "Welche TCM-Behandlungen werden angeboten?",
        "a": "Akupunktur, Schröpfen, Tuina-Massage, Moxibustion, chinesische Kräutertherapie, Gua Sha und Elektroakupunktur."
      },
      {
        "q": "Übernimmt die Krankenkasse die Kosten?",
        "a": "Akupunktur und TCM werden von vielen Zusatzversicherungen übernommen. Alle Therapeut:innen sind EMR- und ASCA-anerkannt."
      },
      {
        "q": "Wie sieht ein Erstbesuch aus?",
        "a": "Der Erstbesuch dauert 60–75 Minuten: Anamnese, Zungen- und Pulsdiagnostik, erste Behandlung."
      },
      {
        "q": "Gibt es Parkplätze in Oerlikon?",
        "a": "Parkhaus Hallenstadion und Parkhaus Oerlikon in wenigen Gehminuten. Anreise mit ÖV stark empfohlen, Bahnhof Oerlikon ist einer der grössten S-Bahn-Knoten der Schweiz."
      },
      {
        "q": "Welche Sprachen sprechen Sie?",
        "a": "Deutsch, Englisch, Mandarin. Weitere Sprachen auf Anfrage."
      },
      {
        "q": "Behandeln Sie Kinder und Schwangere?",
        "a": "Ja. Wir haben Erfahrung mit sanfter TCM in der Schwangerschaft, Kinderwunsch sowie Akupressur und Tuina bei Kindern."
      }
    ]
  },
  {
    "slug": "zuerich-city",
    "name": "Zürich City",
    "region": "Zürich City",
    "canton": "Zürich",
    "title": "TCM Zürich City – Akupunktur, Tuina & TCM-Klinik | Flagship",
    "metaDesc": "TCM Zürich City Flagship, Akupunktur, Schröpfen, Tuina & chinesische Kräuter im Herzen Zürichs. Bahnhofstrasse, grösstes TCM-Team. Termin oft innert 24h.",
    "open": false,
    "openingNote": "Eröffnung 2028",
    "address": "Eröffnung 2028",
    "phone": "+41 77 523 61 22",
    "hours": "",
    "hoursISO": [],
    "geo": {
      "lat": 47.3769,
      "lng": 8.5417
    },
    "lead": "TCM Zürich City Flagship: Akupunktur, Tuina und chinesische Kräuter im Herzen Zürichs. Grösstes TCM-Team, vollständiges Therapie-Spektrum.",
    "bodyHtml": "",
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "schroepfen",
        "label": "Schröpfen"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      },
      {
        "slug": "kraeutertherapie",
        "label": "Kräutertherapie"
      },
      {
        "slug": "moxibustion",
        "label": "Moxibustion"
      },
      {
        "slug": "elektroakupunktur",
        "label": "Elektroakupunktur"
      }
    ],
    "nearby": [
      {
        "slug": "zuerich-hoengg",
        "label": "Zürich Höngg"
      },
      {
        "slug": "zuerich-oerlikon",
        "label": "Zürich Oerlikon"
      },
      {
        "slug": "volketswil",
        "label": "Volketswil"
      }
    ],
    "beschwerden": [
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "nackenschmerzen",
        "label": "Nackenschmerzen"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      },
      {
        "slug": "schlafstoerungen",
        "label": "Schlafstörungen"
      },
      {
        "slug": "stress-burnout",
        "label": "Stress & Burnout"
      }
    ],
    "faqs": []
  },
  {
    "slug": "basel",
    "name": "Basel",
    "region": "Basel",
    "canton": "Basel-Stadt",
    "title": "TCM Basel – Akupunktur, Tuina & TCM-Klinik im Dreiländereck",
    "metaDesc": "TCM Basel, Akupunktur, Schröpfen, Tuina & chinesische Kräuter im Dreiländereck. Auch für Patient:innen aus Deutschland und Frankreich. Termin oft innert 24h.",
    "open": false,
    "openingNote": "Eröffnung 2028",
    "address": "Eröffnung 2028",
    "phone": "+41 77 523 61 22",
    "hours": "",
    "hoursISO": [],
    "geo": {
      "lat": 47.5596,
      "lng": 7.5886
    },
    "lead": "TCM Basel: Akupunktur, Tuina und chinesische Kräuter im Herzen Basels. Mehrsprachiges Team für Patient:innen aus der Schweiz, Deutschland und Frankreich.",
    "bodyHtml": "",
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "schroepfen",
        "label": "Schröpfen"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      },
      {
        "slug": "kraeutertherapie",
        "label": "Kräutertherapie"
      },
      {
        "slug": "moxibustion",
        "label": "Moxibustion"
      },
      {
        "slug": "elektroakupunktur",
        "label": "Elektroakupunktur"
      }
    ],
    "nearby": [
      {
        "slug": "wil",
        "label": "Wil"
      },
      {
        "slug": "st-gallen",
        "label": "St. Gallen"
      },
      {
        "slug": "rorschach",
        "label": "Rorschach"
      }
    ],
    "beschwerden": [
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "nackenschmerzen",
        "label": "Nackenschmerzen"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      },
      {
        "slug": "schlafstoerungen",
        "label": "Schlafstörungen"
      },
      {
        "slug": "stress-burnout",
        "label": "Stress & Burnout"
      }
    ],
    "faqs": []
  },
  {
    "slug": "st-gallen",
    "name": "St. Gallen",
    "region": "Ostschweiz",
    "canton": "St. Gallen",
    "title": "TCM St. Gallen – Medizinische Akupunktur | TCM.ch Partnerklinik",
    "metaDesc": "TCM St. Gallen, Akupunktur von Ärzt:innen & Therapeut:innen. Geprüfte Partnerklinik des TCM.ch Netzwerks. Termin in 24–48h. Krankenkasse anerkannt (EMR/ASCA).",
    "open": true,
    "openingNote": "",
    "address": "Oberer Graben 22, 9000 St. Gallen",
    "phone": "+41 77 523 61 22",
    "hours": "Mo–Sa 7:30–19:30 Uhr, So 8:00–17:00 Uhr",
    "hoursISO": [
      "Mo-Sa 07:30-19:30",
      "So 08:00-17:00"
    ],
    "geo": {
      "lat": 47.4244,
      "lng": 9.3767
    },
    "lead": "Geprüfte TCM-Partnerklinik in St. Gallen, Akupunktur durch Ärzt:innen und erfahrene Therapeut:innen. Vollständiges TCM-Spektrum für die ganze Ostschweiz.",
    "bodyHtml": "<h2>TCM & Akupunktur in St. Gallen – schnell einen Termin finden</h2><p>Du suchst eine wirksame Behandlung für Schmerzen, Stress oder chronische Beschwerden in St. Gallen? Unsere Partnerklinik ist Teil des TCM.ch Netzwerks und verbindet klassische TCM mit moderner medizinischer Diagnostik. Besonders wichtig: Bei uns arbeiten auch Ärzt:innen, die auf Akupunktur spezialisiert sind – das ermöglicht eine präzisere Behandlung und schnellere Fortschritte. Viele Patient:innen aus St. Gallen erhalten innerhalb von 24–48 Stunden einen Termin.</p><h2>Dein TCM Team in St. Gallen</h2><p>Erfahrene Therapeut:innen und qualifizierte Ärzt:innen arbeiten hier Hand in Hand. Alle Behandlungen folgen klaren Standards des TCM.ch Netzwerks.</p><div style=\"display:grid;grid-template-columns:1fr;gap:16px;margin:20px 0;max-width:300px\"><div style=\"background:#fff;border:1px solid #e5e5e5;border-radius:14px;overflow:hidden;display:flex;flex-direction:column\"><img width=\"1120\" height=\"746\" loading=\"lazy\" decoding=\"async\" src=\"/images/img-440b0d6748dc.webp\" alt=\"Corinna Reinhart\" style=\"width:100%;aspect-ratio:3/4;object-fit:cover;object-position:center top;display:block\"><div style=\"padding:14px 16px\"><div style=\"font-size:14px;font-weight:700;color:#0d0d0d;margin-bottom:3px\">Corinna Reinhart</div><div style=\"font-size:11.5px;font-weight:600;color:#2D9B6F;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px\">TCM-Therapeutin &amp; Pflegefachfrau</div><div style=\"font-size:12.5px;color:#888;line-height:1.55\">Schulmedizinische Ausbildung kombiniert mit jahrelanger TCM-Erfahrung. Spezialisiert auf medizinische Akupunktur und ganzheitliche Schmerztherapie.</div></div></div></div>",
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "schroepfen",
        "label": "Schröpfen"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      },
      {
        "slug": "kraeutertherapie",
        "label": "Kräutertherapie"
      },
      {
        "slug": "moxibustion",
        "label": "Moxibustion"
      },
      {
        "slug": "elektroakupunktur",
        "label": "Elektroakupunktur"
      }
    ],
    "nearby": [
      {
        "slug": "rorschach",
        "label": "Rorschach"
      },
      {
        "slug": "wil",
        "label": "Wil"
      },
      {
        "slug": "kreuzlingen",
        "label": "Kreuzlingen"
      }
    ],
    "beschwerden": [
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "nackenschmerzen",
        "label": "Nackenschmerzen"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      },
      {
        "slug": "schlafstoerungen",
        "label": "Schlafstörungen"
      },
      {
        "slug": "stress-burnout",
        "label": "Stress & Burnout"
      }
    ],
    "faqs": [
      {
        "q": "Wo befindet sich die TCM-Praxis St. Gallen?",
        "a": "Unsere TCM-Partnerklinik St. Gallen liegt zentral an der Multergasse, wenige Gehminuten vom Hauptbahnhof St. Gallen entfernt."
      },
      {
        "q": "Wie schnell bekomme ich einen Termin?",
        "a": "In den meisten Fällen innerhalb von 24–48 Stunden. WhatsApp-Anfrage, Antwort meist innert 30 Minuten."
      },
      {
        "q": "Werde ich von einer Ärztin oder einem Therapeuten behandelt?",
        "a": "In St. Gallen arbeiten erfahrene TCM-Therapeut:innen und Ärzt:innen mit Akupunktur-Spezialisierung Hand in Hand, für besonders fundierte Diagnostik und Behandlung."
      },
      {
        "q": "Welche TCM-Behandlungen werden angeboten?",
        "a": "Akupunktur, Schröpfen, Tuina-Massage, Moxibustion, chinesische Kräutertherapie, Gua Sha und Elektroakupunktur: das vollständige TCM-Spektrum."
      },
      {
        "q": "Übernimmt die Krankenkasse die Kosten?",
        "a": "Akupunktur und TCM werden von vielen Zusatzversicherungen übernommen. Alle Therapeut:innen sind EMR- und ASCA-anerkannt."
      },
      {
        "q": "Wie sieht ein Erstbesuch aus?",
        "a": "Der Erstbesuch dauert 60–75 Minuten: ausführliche Anamnese inkl. BODYMAP™-Diagnostik, Zungen- und Pulsdiagnostik, erste Behandlung."
      },
      {
        "q": "Gibt es Parkplätze in St. Gallen?",
        "a": "Parkhaus Brühltor, Parkhaus Burggraben, Parkhaus Spisertor in fussläufiger Distanz. Anreise mit ÖV stark empfohlen."
      },
      {
        "q": "Behandeln Sie auch Patient:innen aus Appenzell und Vorarlberg?",
        "a": "Ja. Wir betreuen Patient:innen aus dem ganzen Kanton St. Gallen sowie aus Appenzell, dem Rheintal und dem grenznahen Vorarlberg."
      }
    ]
  },
  {
    "slug": "rorschach",
    "name": "Rorschach",
    "region": "Bodenseeregion",
    "canton": "St. Gallen",
    "title": "TCM Rorschach – Akupunktur, Tuina & TCM-Klinik am Bodensee",
    "metaDesc": "TCM Rorschach, Akupunktur, Schröpfen, Tuina & chinesische Kräuter direkt am Bodensee. Patient:innen aus Rorschach, Arbon, Heiden, St. Gallen. Termin oft innert 24h.",
    "open": true,
    "openingNote": "",
    "address": "Pestalozzistrasse 11, 9400 Rorschach",
    "phone": "+41 77 523 61 22",
    "hours": "Mo–Fr 7:30–19:30 Uhr, Sa 7:30–16:30 Uhr",
    "hoursISO": [
      "Mo-Fr 07:30-19:30",
      "Sa 07:30-16:30"
    ],
    "geo": {
      "lat": 47.4783,
      "lng": 9.4894
    },
    "lead": "TCM Rorschach, Akupunktur, Tuina & chinesische Kräuter direkt am Bodensee. Ideal für Patient:innen aus dem Rheintal und Appenzell.",
    "bodyHtml": "<h2>TCM Rorschach, Akupunktur, Tuina & TCM-Klinik am Bodensee</h2><p>Unsere <strong>TCM-Praxis Rorschach</strong> liegt direkt am Bodensee-Ostufer, gut erreichbar aus dem ganzen Rheintal, dem Appenzellerland und der Region St. Gallen. Wir bieten das vollständige Spektrum der Traditionellen Chinesischen Medizin: <strong>Akupunktur</strong>, <strong>Schröpfen</strong>, <strong>Tuina-Massage</strong>, <strong>chinesische Kräutertherapie</strong>, Moxibustion und Elektroakupunktur. Alle Therapeut:innen sind EMR- und ASCA-anerkannt.</p><h2>Einzugsgebiet – Patient:innen aus dem Bodensee-Ostufer und Rheintal</h2><p>Zu unseren Patient:innen zählen Menschen aus <strong>Rorschach</strong>, <strong>Rorschacherberg</strong>, <strong>Goldach</strong> und der Bodensee-Region. Auch aus den umliegenden Gemeinden, Arbon, Horn, Steinach, Tübach, Mörschwil, sowie aus dem <strong>Rheintal</strong> (Heiden, Walzenhausen, Berneck, Au, Thal, Altstätten) und dem grenznahen <strong>Vorarlberg</strong> kommen Patient:innen regelmässig zu uns.</p><h2>Anfahrt zur TCM-Praxis Rorschach</h2><h3>Mit dem Zug & ÖV</h3><p><strong>Bahnhof Rorschach</strong> und <strong>Bahnhof Rorschach Hafen</strong> in wenigen Gehminuten. S-Bahn S4 (St. Gallen–Rorschach), S5, S7 sowie Direktverbindungen nach St. Gallen, Romanshorn und Chur. Auch per Schiff über den Bodensee erreichbar.</p><h3>Mit dem Auto & Parken</h3><p>Anfahrt über A1 (Ausfahrt Rorschach). Parkmöglichkeiten: Parkhaus Bahnhof, Parkplätze am Hafen.</p>",
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "schroepfen",
        "label": "Schröpfen"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      },
      {
        "slug": "kraeutertherapie",
        "label": "Kräutertherapie"
      },
      {
        "slug": "moxibustion",
        "label": "Moxibustion"
      },
      {
        "slug": "elektroakupunktur",
        "label": "Elektroakupunktur"
      }
    ],
    "nearby": [
      {
        "slug": "st-gallen",
        "label": "St. Gallen"
      },
      {
        "slug": "kreuzlingen",
        "label": "Kreuzlingen"
      },
      {
        "slug": "wil",
        "label": "Wil"
      }
    ],
    "beschwerden": [
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "nackenschmerzen",
        "label": "Nackenschmerzen"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      },
      {
        "slug": "schlafstoerungen",
        "label": "Schlafstörungen"
      },
      {
        "slug": "stress-burnout",
        "label": "Stress & Burnout"
      }
    ],
    "faqs": [
      {
        "q": "Wo befindet sich die TCM-Praxis Rorschach?",
        "a": "Unsere TCM-Praxis Rorschach liegt zentral an der Hauptstrasse, wenige Gehminuten vom Bahnhof Rorschach und direkt am Bodensee."
      },
      {
        "q": "Wie schnell bekomme ich einen Termin?",
        "a": "In den meisten Fällen innerhalb von 24 Stunden. WhatsApp-Anfrage, Antwort meist innert 30 Minuten."
      },
      {
        "q": "Welche TCM-Behandlungen werden angeboten?",
        "a": "Akupunktur, Schröpfen, Tuina-Massage, Moxibustion, chinesische Kräutertherapie, Gua Sha und Elektroakupunktur."
      },
      {
        "q": "Übernimmt die Krankenkasse die Kosten?",
        "a": "Akupunktur und TCM werden von vielen Zusatzversicherungen übernommen. Alle Therapeut:innen sind EMR- und ASCA-anerkannt."
      },
      {
        "q": "Wie sieht ein Erstbesuch aus?",
        "a": "Der Erstbesuch dauert 60–75 Minuten: Anamnese, Zungen- und Pulsdiagnostik, erste Behandlung."
      },
      {
        "q": "Gibt es Parkplätze?",
        "a": "Parkhaus Bahnhof Rorschach und Parkplätze am Hafen in unmittelbarer Nähe. Anreise mit ÖV empfohlen."
      },
      {
        "q": "Welche Sprachen sprechen Sie?",
        "a": "Deutsch, Englisch, Mandarin. Weitere Sprachen auf Anfrage."
      },
      {
        "q": "Behandeln Sie auch Patient:innen aus Vorarlberg?",
        "a": "Ja. Wir betreuen viele grenznahe Patient:innen aus dem Rheintal, Heiden, Walzenhausen und dem österreichischen Vorarlberg."
      }
    ]
  },
  {
    "slug": "wil",
    "name": "Wil",
    "region": "Fürstenland",
    "canton": "St. Gallen",
    "title": "TCM Wil SG – Akupunktur, Tuina & TCM-Klinik im Fürstenland",
    "metaDesc": "TCM Wil SG, Akupunktur, Schröpfen, Tuina & chinesische Kräuter im Fürstenland. Patient:innen aus Wil, Uzwil, Flawil, Frauenfeld. Termin oft innert 24h.",
    "open": true,
    "openingNote": "",
    "address": "Obere Bahnhofstrasse 35, 9500 Wil",
    "phone": "+41 77 523 61 22",
    "hours": "Mo–Fr 7:30–19:30 Uhr, Sa 7:30–16:30 Uhr",
    "hoursISO": [
      "Mo-Fr 07:30-19:30",
      "Sa 07:30-16:30"
    ],
    "geo": {
      "lat": 47.4625,
      "lng": 9.0467
    },
    "lead": "TCM Wil SG, Akupunktur, Tuina & chinesische Kräuter im Herzen des Fürstenlandes. Optimal für Patient:innen aus Wil, Uzwil, Flawil und Frauenfeld.",
    "bodyHtml": "<h2>TCM Wil SG, Akupunktur, Tuina & TCM-Klinik im Fürstenland</h2><p>Unsere <strong>TCM-Praxis Wil</strong> an der Marktgasse liegt im Herzen des Fürstenlandes, gut erreichbar aus dem ganzen Toggenburg, dem Thurgau und der Region St. Gallen. Wir bieten das vollständige Spektrum der Traditionellen Chinesischen Medizin: <strong>Akupunktur</strong>, <strong>Schröpfen</strong>, <strong>Tuina-Massage</strong>, <strong>chinesische Kräutertherapie</strong>, Moxibustion und Elektroakupunktur. Alle Therapeut:innen sind EMR- und ASCA-anerkannt.</p><h2>Einzugsgebiet – Patient:innen aus dem Fürstenland und der Ostschweiz</h2><p>Zu unseren Patient:innen zählen Menschen aus Wil und allen Stadtteilen: <strong>Innenstadt</strong>, <strong>Bronschhofen</strong>, <strong>Rossrüti</strong>, <strong>Schwarzenbach</strong>. Auch aus den umliegenden Gemeinden, <strong>Uzwil</strong>, <strong>Flawil</strong>, <strong>Bütschwil</strong>, <strong>Münchwilen TG</strong>, <strong>Sirnach</strong>, <strong>Niederuzwil</strong>, <strong>Henau</strong>, kommen Patient:innen regelmässig zu uns. Die zentrale Lage macht uns für das ganze Fürstenland und das untere Toggenburg erreichbar.</p><h2>Anfahrt zur TCM-Praxis Wil</h2><h3>Mit dem Zug & ÖV</h3><p><strong>Hauptbahnhof Wil SG</strong> in wenigen Gehminuten. S-Bahn-Linien S5, S8, S35 sowie IC- und IR-Verbindungen halten in Wil. Auch Frauenfeld-Wil-Bahn (FWB) verbindet Wil mit dem Thurgau.</p><h3>Mit dem Auto & Parken</h3><p>Anfahrt über A1 (Ausfahrt Wil). Parkmöglichkeiten in der Nähe: <strong>Parkhaus Untere Bahnhofstrasse</strong>, <strong>Parkhaus Hofplatz</strong>, Parkhaus Stadtweier.</p>",
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "schroepfen",
        "label": "Schröpfen"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      },
      {
        "slug": "kraeutertherapie",
        "label": "Kräutertherapie"
      },
      {
        "slug": "moxibustion",
        "label": "Moxibustion"
      },
      {
        "slug": "elektroakupunktur",
        "label": "Elektroakupunktur"
      }
    ],
    "nearby": [
      {
        "slug": "st-gallen",
        "label": "St. Gallen"
      },
      {
        "slug": "frauenfeld",
        "label": "Frauenfeld"
      },
      {
        "slug": "kreuzlingen",
        "label": "Kreuzlingen"
      }
    ],
    "beschwerden": [
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "nackenschmerzen",
        "label": "Nackenschmerzen"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      },
      {
        "slug": "schlafstoerungen",
        "label": "Schlafstörungen"
      },
      {
        "slug": "stress-burnout",
        "label": "Stress & Burnout"
      }
    ],
    "faqs": [
      {
        "q": "Wo befindet sich die TCM-Praxis Wil?",
        "a": "Unsere TCM-Praxis Wil liegt zentral an der Marktgasse, wenige Gehminuten vom Hauptbahnhof Wil SG entfernt."
      },
      {
        "q": "Wie schnell bekomme ich einen Termin?",
        "a": "In den meisten Fällen innerhalb von 24 Stunden. WhatsApp-Anfrage, Antwort meist innert 30 Minuten."
      },
      {
        "q": "Welche TCM-Behandlungen werden angeboten?",
        "a": "Akupunktur, Schröpfen, Tuina-Massage, Moxibustion, chinesische Kräutertherapie, Gua Sha und Elektroakupunktur."
      },
      {
        "q": "Übernimmt die Krankenkasse die Kosten?",
        "a": "Akupunktur und TCM werden von vielen Zusatzversicherungen übernommen. Alle Therapeut:innen sind EMR- und ASCA-anerkannt."
      },
      {
        "q": "Wie sieht ein Erstbesuch aus?",
        "a": "Der Erstbesuch dauert 60–75 Minuten: Anamnese, Zungen- und Pulsdiagnostik, erste Behandlung."
      },
      {
        "q": "Gibt es Parkplätze in Wil?",
        "a": "Parkhaus Untere Bahnhofstrasse, Parkhaus Hofplatz, Parkhaus Stadtweier in fussläufiger Distanz."
      },
      {
        "q": "Welche Sprachen sprechen Sie?",
        "a": "Deutsch, Englisch, Mandarin. Weitere Sprachen auf Anfrage."
      },
      {
        "q": "Behandeln Sie Kinder und Schwangere?",
        "a": "Ja. Wir haben Erfahrung mit sanfter TCM in der Schwangerschaft, Kinderwunsch sowie Akupressur und Tuina bei Kindern."
      }
    ]
  }
];
export const standortBySlug = (slug: string): Standort | undefined => standorte.find((s) => s.slug === slug);
