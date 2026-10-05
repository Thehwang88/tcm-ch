export interface BeschwerdeFaq { q: string; a: string }
export interface BeschwerdeLink { slug: string; label: string }
export interface Beschwerde { slug: string; name: string; title: string; metaDesc: string; conditionName: string; lead: string; bodyHtml: string; faqs: BeschwerdeFaq[]; related: BeschwerdeLink[]; therapies: BeschwerdeLink[]; }
export const REVIEWED_DATE = '2026-06-09';
export const beschwerden: Beschwerde[] = [
  {
    "slug": "rueckenschmerzen",
    "name": "Rückenschmerzen",
    "title": "Rückenschmerzen mit TCM behandeln",
    "metaDesc": "Rückenschmerzen TCM Schweiz – Akupunktur, Tuina & Schröpfen bei Kreuzlingen, Frauenfeld, Winterthur. Termin in 24h möglich.",
    "conditionName": "Rückenschmerzen",
    "lead": "Häufig bei Verspannungen, Bandscheibenproblemen und chronischen Beschwerden.",
    "bodyHtml": "<h2>Was sind Rückenschmerzen?</h2><p>Rückenschmerzen betreffen fast jeden Menschen irgendwann im Leben – sie sind in der Schweiz einer der häufigsten Gründe für Arztbesuche und Arbeitsausfälle. Die Ursachen sind vielfältig: Von einfachen Muskelverspannungen bis zu Bandscheibenvorfällen, von Wirbelgelenkarthrose bis zu psychosomatischen Faktoren. Eine genaue Einordnung hilft, die richtige Behandlung zu finden.</p><h2>Drei häufige Ursachengruppen</h2><p><strong>1. Muskuläre Rückenschmerzen</strong> – die häufigste Form. Fehlhaltungen, Bewegungsmangel, Stress und einseitige Belastungen führen zu chronischen Verspannungen. Der Schmerz ist diffus, oft beidseitig, und bessert sich mit Bewegung.</p><p><strong>2. Bandscheibenbeschwerden</strong> – Bandscheibenvorwölbung oder -vorfall drücken auf Nerven. Typisch: einseitiger, ausstrahlender Schmerz ins Bein (Ischias) oder den Arm. → </p><p><strong>3. Wirbelgelenkarthrose (Spondylarthrose)</strong> – Verschleiss der kleinen Wirbelgelenke. Typisch: Morgensteifigkeit, die sich im Laufe des Tages bessert, Anlaufschmerz, Wetterfühligkeit.</p><h2>Häufige Symptome</h2><div class=\"cp-sx-grid\"><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schmerzen im Lenden- und Kreuzbereich (unterer Rücken)</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Morgensteifigkeit – bessert sich nach Bewegung</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Ausstrahlende Schmerzen ins Gesäss oder Bein (Ischias)</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schmerzzunahme beim Sitzen, Heben oder Bücken</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Muskelverspannungen und -verhärtungen</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schmerzen nach langem Stehen oder Gehen</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Kribbeln oder Taubheit im Bein/Fuss</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Eingeschränkte Beweglichkeit beim Drehen oder Bücken</div></div><h2>Mögliche Ursachen</h2><ul><li><strong>Fehlhaltung und Bewegungsmangel:</strong> Langes Sitzen mit rundem Rücken schwächt die Tiefenmuskulatur und belastet Bandscheiben und Gelenke chronisch.</li><li><strong>Stress und psychosomatische Faktoren:</strong> Emotionale Belastungen erhöhen die Muskelspannung und senken die Schmerzschwelle – oft völlig unterschätzt.</li><li><strong>Übergewicht:</strong> Erhöht die mechanische Belastung aller Wirbelstrukturen erheblich.</li><li><strong>Einseitige Belastungen:</strong> Berufliche Fehlbelastungen (Pflege, Handwerk, Bildschirmarbeit) summieren sich über Jahre.</li><li><strong>Degenerativer Verschleiss:</strong> Bandscheiben und Wirbelgelenke verschleissen mit dem Alter – muss aber nicht zwingend Schmerzen verursachen.</li></ul><h2>Wann ärztlich abklären?</h2><ul><li><strong>Sofort Notaufnahme:</strong> Blasen- oder Darmstörungen + Rückenschmerzen = mögliches Cauda-equina-Syndrom</li><li><strong>Dringend:</strong> Zunehmende Lähmung im Bein, Fussheberparese</li><li><strong>Zeitnah:</strong> Taubheit, Kribbeln im Bein das nicht besser wird; Schmerzen nach Sturz oder Unfall</li><li><strong>Empfohlen:</strong> Bei chronischen Beschwerden über mehr als 6 Wochen ohne Besserung</li></ul><h2>Behandlungsmöglichkeiten</h2><ul><li><strong>Bewegung:</strong> Die wirksamste Einzelmassnahme. Schwimmen, Nordic Walking, gezieltes Rückentraining.</li><li><strong>Physiotherapie:</strong> Manuelle Therapie, Muskelkräftigung, Haltungskorrektur.</li><li><strong>Schmerzmedikamente:</strong> NSAIDs bei akutem Schub – kurzfristig wirksam, nicht zur Dauertherapie.</li><li><strong>Wärme/Kälte:</strong> Wärme bei Muskelverspannungen, Kälte bei akuten Entzündungen.</li><li><strong>TCM:</strong> Akupunktur, Tuina, Schröpfen – besonders effektiv bei muskulären und chronischen Schmerzen.</li></ul><h2>Kann TCM bei Rückenschmerzen unterstützen?</h2><p>Akupunktur ist bei chronischen Rückenschmerzen eine der am besten belegten komplementärmedizinischen Methoden. Die WHO listet Rückenschmerzen als anerkannte Indikation. Eine grosse Metaanalyse (Acupuncture Trialists' Collaboration, 2018) zeigte anhaltende Überlegenheit von Akupunktur gegenüber Scheinbehandlung und Warteliste.</p><p>Welche Methode oder Kombination passt, hängt von Ursache und Verlauf ab und wird individuell festgelegt.</p><ul><li><strong>Akupunktur</strong> entspannt Muskulatur, fördert Durchblutung und hemmt Schmerzreize</li><li><strong>Tuina</strong> mobilisiert Wirbelsäule und Iliosakralgelenk durch gezielte Handgriffe</li><li><strong>Schröpfen</strong> löst Faszienverklebungen und verbessert lokale Durchblutung</li><li><strong>Moxibustion</strong> wärmt bei Kälte-Schmerzen und chronischer Erschöpfung</li></ul><p><em>Bei akuten Notfällen (Lähmungen, Blasenstörungen) zuerst zum Arzt. TCM ist ergänzend zur schulmedizinischen Diagnostik.</em></p>",
    "faqs": [
      {
        "q": "Hilft Akupunktur bei Rückenschmerzen?",
        "a": "Akupunktur wird traditionell bei Verspannungen und Rückenbeschwerden eingesetzt, häufig kombiniert mit Schröpfen oder Tuina."
      },
      {
        "q": "Was hilft schnell bei akuten Rückenschmerzen?",
        "a": "Bei akuten Beschwerden wie Hexenschuss werden oft mehrere Sitzungen zeitnah angesetzt. Was passt, klärt dein Therapeut individuell."
      },
      {
        "q": "Übernimmt die Krankenkasse die Behandlung?",
        "a": "Bei EMR-/ASCA-Therapeuten beteiligen sich viele Zusatzversicherungen. Die Grundversicherung nicht."
      },
      {
        "q": "Wie viele Behandlungen brauche ich?",
        "a": "Hängt davon ab, ob die Beschwerden akut oder chronisch sind. Wird individuell festgelegt."
      },
      {
        "q": "Welche Methode ist bei Rückenschmerzen die richtige?",
        "a": "Das hängt von Ursache und Verlauf ab. Häufig ist es eine Kombination aus Akupunktur, Schröpfen und Tuina."
      }
    ],
    "related": [
      {
        "slug": "spinalkanalstenose",
        "label": "Spinalkanalstenose"
      },
      {
        "slug": "hexenschuss",
        "label": "Hexenschuss"
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
        "slug": "stress-burnout",
        "label": "Stress & Burnout"
      }
    ],
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
      }
    ]
  },
  {
    "slug": "nackenschmerzen",
    "name": "Nackenschmerzen",
    "title": "Nackenschmerzen & Verspannungen – TCM Behandlung",
    "metaDesc": "Nackenschmerzen TCM Schweiz – Akupunktur & Schröpfen in Winterthur, Zürich, Frauenfeld. Termin in 24h möglich.",
    "conditionName": "Nackenschmerzen",
    "lead": "Bei Verspannungen, Blockaden und Kopfschmerzen durch den Nacken.",
    "bodyHtml": "<h2>Nackenschmerzen und Verspannungen</h2><p>Nackenschmerzen gehören zu den häufigsten Beschwerden im Arbeitsalltag. Langes Sitzen am Bildschirm, Stress und schlechte Körperhaltung führen zu chronischen Verspannungen, die sich bis in den Kopf und die Schultern ausbreiten können.</p><h2>TCM-Ansatz bei Nackenbeschwerden</h2><p>In der TCM werden Nackenschmerzen oft mit Blockierungen im Gallenblasen- und Dreifachen-Erwärmer-Meridian verbunden. Die Behandlung kombiniert Akupunktur, Schröpfen und Tuina-Massage gezielt in diesem Bereich.</p><ul><li>Akupunktur entspannt die Trapezius- und Nackenmuskulatur</li><li>Schröpfen löst tief sitzende Muskelverhärtungen</li><li>Tuina mobilisiert die Halswirbelsäule sanft und effektiv</li></ul><h2>Ergebnisse</h2><p>Patienten berichten oft schon nach der ersten Sitzung von deutlicher Erleichterung. Begleitende Kopfschmerzen verschwinden meist nach 3–4 Behandlungen.</p>",
    "faqs": [],
    "related": [
      {
        "slug": "spannungskopfschmerzen",
        "label": "Spannungskopfschmerzen"
      },
      {
        "slug": "kieferschmerzen",
        "label": "Kieferschmerzen"
      },
      {
        "slug": "schwindel",
        "label": "Schwindel"
      },
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      },
      {
        "slug": "stress-burnout",
        "label": "Stress & Burnout"
      }
    ],
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
      }
    ]
  },
  {
    "slug": "migraene",
    "name": "Migräne",
    "title": "Migräne mit TCM behandeln – natürlich und nachhaltig",
    "metaDesc": "Migräne TCM Schweiz – Akupunktur gegen Migräne in Zürich, Winterthur, Basel. Wissenschaftlich anerkannt. Termin anfragen.",
    "conditionName": "Migräne",
    "lead": "Wenn Migräne häufiger wird oder Medikamente nicht mehr ausreichen.",
    "bodyHtml": "<h2>Was ist Migräne?</h2><p>Migräne ist eine der häufigsten neurologischen Erkrankungen – weltweit betrifft sie etwa 15 % der Bevölkerung, Frauen dreimal häufiger als Männer. Sie ist deutlich mehr als ein starker Kopfschmerz: Migräne ist eine komplexe Gehirnerkrankung mit wiederkehrenden Attacken, die den Alltag teils vollständig lahmlegen können.</p><p>Viele Betroffene kennen Vorboten (Prodromalphase), Aura und die eigentliche Schmerzphase mit Übelkeit, Licht- und Lärmempfindlichkeit. Nach der Attacke folgt oft eine Erschöpfungsphase (Postdromalphase) von mehreren Stunden.</p><h2>Migräne vs. normale Kopfschmerzen</h2><p>Nicht jeder Kopfschmerz ist Migräne. Die wichtigsten Unterscheidungsmerkmale:</p><div class=\"cp-sx-grid\"><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Einseitiger, pulsierender oder hämmernder Schmerz</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Mittlere bis starke Intensität (Alltag stark eingeschränkt)</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Übelkeit oder Erbrechen</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Überempfindlichkeit gegenüber Licht und Lärm</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Aura: Sehstörungen, Kribbeln, Sprach­probleme (bei ~30%)</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Dauer: 4–72 Stunden ohne Behandlung</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Körperliche Aktivität verschlimmert den Schmerz</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Vorboten (Stimmungsveränderung, Hunger, Gähnen)</div></div><h2>Mögliche Auslöser (Trigger)</h2><ul><li><strong>Stress und Entspannung danach:</strong> Viele Betroffene bekommen Migräne am Wochenende nach stressiger Woche.</li><li><strong>Schlafmangel oder -übermaß:</strong> Unregelmässiger Schlaf destabilisiert das Gehirn.</li><li><strong>Hormonelle Schwankungen:</strong> Menstruationsmigräne ist ein häufiges Phänomen bei Frauen.</li><li><strong>Bestimmte Nahrungsmittel:</strong> Rotwein, Käse, Schokolade, Koffeinentzug können Auslöser sein.</li><li><strong>Sinnesreize:</strong> Grelles Licht, starke Gerüche, laute Geräusche.</li><li><strong>Wetterveränderungen:</strong> Viele Betroffene reagieren empfindlich auf Föhn oder Druckwechsel.</li></ul><h2>Wann ärztlich abklären lassen?</h2><p>Folgende Warnsignale erfordern sofortige ärztliche Abklärung:</p><ul><li>Erstmaliger, sehr starker Kopfschmerz («schlimmster Kopfschmerz meines Lebens»)</li><li>Kopfschmerz mit Fieber, Nackensteifigkeit oder Hautausschlag</li><li>Neurologische Ausfälle: Lähmungen, Sehverlust, Sprachprobleme</li><li>Kopfschmerz nach Kopfverletzung</li><li>Starke Zunahme der Attackenfrequenz ohne erklärbaren Grund</li></ul><h2>Welche Behandlungsmöglichkeiten gibt es?</h2><ul><li><strong>Akutmedikamente:</strong> Triptane, NSAIDs und Ergotamine können eine akute Migräneattacke kupieren.</li><li><strong>Prophylaxe:</strong> Betablocker, Antidepressiva oder neuere CGRP-Antikörper reduzieren Attackenfrequenz.</li><li><strong>Nicht-medikamentöse Prophylaxe:</strong> Akupunktur, Biofeedback, regelmässiger Schlaf, Ausdauersport.</li><li><strong>Lebensstilanpassung:</strong> Trigger-Identifikation durch Migränetagebuch, Stressmanagement.</li></ul><h2>Kann TCM bei Migräne unterstützen?</h2><p>Akupunktur gehört zu den bestuntersuchten komplementärmedizinischen Methoden bei Migräne. Die Cochrane Collaboration (2016) stellte in einem systematischen Review fest, dass Akupunktur zur Migräneprophylaxe wirksam ist – mindestens vergleichbar mit Prophylaxemedikamenten, bei geringeren Nebenwirkungen.</p><p>In der TCM wird Migräne oft dem <strong>Leber-Yang-Hochschlagen</strong> oder einem <strong>Qi-Stau</strong> zugeordnet. Die Behandlung zielt auf die Regulation des Qi-Flusses im Gallenblasen- und Lebersystem ab.</p><ul><li>Reduktion der Attackenfrequenz und -intensität</li><li>Verkürzung der Attackendauer</li><li>Verbesserung der Lebensqualität zwischen den Attacken</li><li>Kräutertherapie unterstützt die Behandlung und stabilisiert das Nervensystem</li></ul><p><em>Wichtig: Bei häufiger Migräne (mehr als 4 Attacken/Monat) bitte zuerst neurologische Abklärung und Diagnose sicherstellen. TCM als Ergänzung, nicht als Ersatz.</em></p><h2>Migräne und dein Alltag</h2><p>Migräne ist eine chronische Erkrankung, die das Leben massiv beeinflussen kann. Berufliche Einschränkungen, soziale Rückzüge, das Gefühl des «Unsichtbarseins» der Erkrankung – das kennen viele Betroffene. Eine gute Prophylaxe und ein besseres Verständnis der eigenen Trigger können die Lebensqualität erheblich verbessern.</p>",
    "faqs": [
      {
        "q": "Wie unterscheidet sich Migräne von normalem Kopfschmerz?",
        "a": "Migräne ist einseitig, pulsierend, mittel bis stark intensiv und dauert 4–72 Stunden. Übelkeit, Licht- und Lärmempfindlichkeit sind typisch. Spannungskopfschmerzen sind beidseitig, drückend und weniger intensiv. Bei wiederkehrenden starken Kopfschmerzen ist eine Diagnose beim Arzt oder Neurologen wichtig."
      },
      {
        "q": "Wie viele Akupunktursitzungen sind bei Migräne nötig?",
        "a": "Zur Prophylaxe empfehlen wir eine Serie von 10 Sitzungen über 6–8 Wochen. Viele Patienten berichten nach dieser Zeit von einem deutlichen Rückgang der Attackenfrequenz. Für dauerhafte Wirkung ist eine Auffrischung alle 3–6 Monate sinnvoll."
      },
      {
        "q": "Ist Akupunktur bei Migräne wissenschaftlich belegt?",
        "a": "Ja. Die Cochrane Collaboration bestätigte die Wirksamkeit von Akupunktur zur Migräneprophylaxe in mehreren systematischen Reviews. Die Wirkung ist mindestens vergleichbar mit medikamentöser Prophylaxe – bei besserer Verträglichkeit."
      },
      {
        "q": "Kann die Zusatzversicherung die Kosten übernehmen?",
        "a": "Viele Schweizer Zusatzversicherungen übernehmen Akupunktur bei anerkannten Therapeuten (EMR, ASCA). Kläre das vorab mit deiner Kasse – wir helfen dir gerne dabei."
      },
      {
        "q": "Was tun während einer akuten Migräneattacke?",
        "a": "Bei einer akuten Attacke hilft Rückzug in einen dunklen, ruhigen Raum und frühzeitige Einnahme von Akutmedikamenten (Triptane auf Rezept). Akupunktur ist primär zur Prophylaxe geeignet, nicht zur Akutbehandlung einer laufenden Attacke."
      }
    ],
    "related": [
      {
        "slug": "spannungskopfschmerzen",
        "label": "Spannungskopfschmerzen"
      },
      {
        "slug": "trigeminusneuralgie",
        "label": "Trigeminusneuralgie"
      },
      {
        "slug": "nackenschmerzen",
        "label": "Nackenschmerzen"
      },
      {
        "slug": "stress-burnout",
        "label": "Stress & Burnout"
      }
    ],
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
      }
    ]
  },
  {
    "slug": "kopfschmerzen",
    "name": "Kopfschmerzen",
    "title": "Kopfschmerzen – Typen, Ursachen & TCM Behandlung",
    "metaDesc": "Kopfschmerzen TCM Schweiz – Akupunktur bei Spannungskopfschmerz und Migräne: Prophylaxe und Frequenzreduktion. Praxen in Zürich, Winterthur, Frauenfeld.",
    "conditionName": "Kopfschmerzen",
    "lead": "Spannungskopfschmerz, Migräne und andere Typen – Ursachen erkennen und gezielt behandeln.",
    "bodyHtml": "<h2>Die wichtigsten Kopfschmerztypen</h2><p><strong>Spannungskopfschmerz (häufigster Typ, ~70 %)</strong><br>Beidseitiger, drückender oder ziehender Schmerz – wie ein enger Reifen um den Kopf. Auslöser: Stress, Muskelverspannungen im Nacken, Schlafmangel, Flüssigkeitsmangel. Keine Übelkeit, kein Erbrechen. Körperliche Aktivität verschlimmert nicht.</p><p><strong>Migräne (~15 % der Bevölkerung)</strong><br>Einseitiger, pulsierender Schmerz mit mittlerer bis starker Intensität. Übelkeit, Licht- und Lärmempfindlichkeit typisch. Dauer 4–72 Stunden. Körperliche Aktivität verschlimmert. → </p><p><strong>Cluster-Kopfschmerz (selten, ~0.1 %)</strong><br>Extrem starker, einseitiger Schmerz hinter dem Auge – kurz (15–180 min), aber in Clusterphasen täglich. Tränende Augen, verstopfte Nase. Betroffene meist Männer. Sofortige Diagnose empfohlen.</p><h2>Häufige Symptome</h2><div class=\"cp-sx-grid\"><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Drückender, ziehender Schmerz beidseitig (Spannungskopfschmerz)</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Einseitiger, pulsierender Schmerz mit Übelkeit (Migräne)</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schmerz im Nacken und Hinterkopf, Verspannungen</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Überempfindlichkeit gegen Licht oder Lärm</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Kopfschmerz nach schlechtem Schlaf oder Koffeinentzug</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Stirndruck bei Sinusproblemen oder Erkältung</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Kopfschmerz durch Bildschirmarbeit und Haltung</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Morgendliche Kopfschmerzen (mögliches Schlafsyndrom)</div></div><h2>Typische Auslöser</h2><ul><li><strong>Stress und psychische Anspannung:</strong> Häufigster Auslöser für Spannungskopfschmerz – Entspannung nach Stress («Wochenendkopfschmerz») ebenfalls typisch.</li><li><strong>Schlafstörungen:</strong> Zu wenig oder zu viel Schlaf destabilisiert das Gehirn und löst Kopfschmerzen aus.</li><li><strong>Flüssigkeitsmangel:</strong> Schon leichte Dehydratation kann Kopfschmerzen verursachen.</li><li><strong>Verspannungen im Nacken:</strong> Muskeln im Hals-Nacken-Bereich projizieren Schmerzen in den Kopf.</li><li><strong>Hormonelle Schwankungen:</strong> Menstruationskopfschmerz, Pille, Wechseljahre.</li><li><strong>Nahrungsmittel und Substanzen:</strong> Koffein, Alkohol (Rotwein), Nikotin, bestimmte Käsesorten oder Schokolade.</li><li><strong>Medikamenten-Übergebrauch:</strong> Zu häufige Einnahme von Schmerzmitteln führt zum Rebound-Kopfschmerz.</li></ul><h2>Wann sofort zum Arzt?</h2><ul><li><strong>Sofort:</strong> «Schlimmster Kopfschmerz meines Lebens» – mögliche Subarachnoidalblutung</li><li><strong>Sofort:</strong> Kopfschmerz + Fieber + Nackensteifigkeit – mögliche Meningitis</li><li><strong>Sofort:</strong> Kopfschmerz + Lähmung, Sprachprobleme, Sehverlust – möglicher Schlaganfall</li><li><strong>Dringend:</strong> Erstmaliger starker Kopfschmerz nach dem 50. Lebensjahr</li><li><strong>Zeitnah:</strong> Mehr als 15 Kopfschmerztage/Monat; häufige Schmerzmitteleinnahme</li></ul><h2>Behandlungsmöglichkeiten</h2><ul><li><strong>Schmerzmittel:</strong> Ibuprofen, Paracetamol, Aspirin – akut wirksam, aber bei Übergebrauch kontraproduktiv.</li><li><strong>Triptane:</strong> Bei Migräne – gezielt und wirksam in der Attacke.</li><li><strong>Prophylaxe bei Migräne:</strong> Betablocker, CGRP-Antikörper, Topiramat, Amitriptylin.</li><li><strong>Stressmanagement:</strong> Biofeedback, MBSR, Entspannungsverfahren.</li><li><strong>TCM:</strong> Akupunktur, Kräutertherapie – zur Prophylaxe und Frequenzreduktion.</li></ul><h2>Kann TCM bei Kopfschmerzen unterstützen?</h2><p>Akupunktur ist bei Kopfschmerzen einer der am besten untersuchten komplementärmedizinischen Ansätze. Der Cochrane Review (2016) bestätigte Wirksamkeit bei Migräne-Prophylaxe und episodischem Spannungskopfschmerz – signifikant besser als keine Behandlung und vergleichbar mit medikamentöser Prophylaxe.</p><p>In der TCM werden Kopfschmerzen je nach Typ unterschiedlichen Meridianstörungen zugeordnet: <strong>Leber-Yang-Hochschlagen</strong> bei Migräne, <strong>Qi-Stauung im Gallenblasen-Meridian</strong> bei Schläfenkopfschmerz, <strong>Milz-Qi-Mangel</strong> bei Spannungskopfschmerz durch Erschöpfung.</p><ul><li><strong>Akupunktur</strong> reguliert Serotoninhaushalt, entspannt Nackenmuskulatur und moduliert Schmerzpfade</li><li><strong>Kräuterformeln</strong> stabilisieren das Nervensystem und reduzieren Schubfrequenz</li><li><strong>Stressreduktion</strong> durch Akupunktur bricht den Stress-Kopfschmerz-Kreislauf</li></ul>",
    "faqs": [
      {
        "q": "Was ist der Unterschied zwischen Kopfschmerzen und Migräne?",
        "a": "Spannungskopfschmerz ist beidseitig, drückend, ohne Übelkeit, wird durch Bewegung nicht verschlimmert. Migräne ist meist einseitig, pulsierend, mit Übelkeit/Lichtempfindlichkeit, wird durch Bewegung schlimmer, dauert 4–72 Stunden. → Mehr unter: Migräne"
      },
      {
        "q": "Wann entstehen Rebound-Kopfschmerzen?",
        "a": "Wenn Schmerzmittel mehr als 10–15x/Monat eingenommen werden, entsteht ein medikamenteninduzierter Dauerkopfschmerz. Die Therapie: Entzug unter ärztlicher Begleitung, danach Prophylaxe. Akupunktur kann diesen Prozess unterstützen."
      },
      {
        "q": "Wie hilft Akupunktur bei Kopfschmerzen?",
        "a": "Akupunktur reguliert Neurotransmitter (Serotonin, Endorphine), entspannt die Nackenmuskulatur und moduliert Schmerzpfade im Gehirn. Für die Prophylaxe sind 10–12 Sitzungen über 6–8 Wochen typisch."
      },
      {
        "q": "Kann die Zusatzversicherung die Kosten übernehmen?",
        "a": "Viele Schweizer Zusatzversicherungen erstatten Akupunktur bei EMR/ASCA-anerkannten Therapeuten. Informiere dich vorab bei deiner Kasse."
      }
    ],
    "related": [
      {
        "slug": "spannungskopfschmerzen",
        "label": "Spannungskopfschmerzen"
      },
      {
        "slug": "kieferschmerzen",
        "label": "Kieferschmerzen"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      },
      {
        "slug": "stress-burnout",
        "label": "Stress & Burnout"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "kraeutertherapie",
        "label": "Kräutertherapie"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      }
    ]
  },
  {
    "slug": "knieschmerzen",
    "name": "Knieschmerzen",
    "title": "Knieschmerzen: Ursache abklären und gezielt begleitend entlasten",
    "metaDesc": "Knieschmerzen Schweiz – Schmerzen beim Treppensteigen, Sport, Gehen: Orthopädie einordnen. Akupunktur und Schröpfen begleitend bei Knieschmerzen – gut untersucht.",
    "conditionName": "Knieschmerzen",
    "lead": "Knie schmerzt beim Treppensteigen, Sport oder im Alltag – Ursache einordnen, gezielt begleitend entlasten.",
    "bodyHtml": "<h2>Knieschmerzen – wenn jede Treppe zur Überlegung wird</h2><p>Treppensteigen schmerzt. Aufstehen nach langem Sitzen auch. Beim Sport zieht es im Knie, nach dem Sport schwillt es leicht an. <strong>Knieschmerzen</strong> treffen den Alltag direkt – und werden von vielen zu lange hingenommen, weil «es schon besser wird».</p><p>TCM kann keine Kniestruktur verändern. Was gut untersucht begleitend möglich ist: Schmerz reduzieren, die Muskelketten um das Knie entlasten und die Rehaphase nach orthopädischer Behandlung unterstützen.</p><h2>Typische Beschwerden</h2><div class=\"cp-sx-grid\"><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schmerz beim Treppensteigen – besonders bergab</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Anlaufschmerz – erste Schritte nach dem Sitzen</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schmerz bei Kniebeugen oder beim Hocken</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schwellung oder Wärme nach Belastung</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Instabilitätsgefühl beim Gehen</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Knacken oder Reiben im Knie</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schmerz beim Schlafen auf der Seite (Knie aufeinander)</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Laufen oder Sport eingeschränkt</div></div><h2>Häufige Ursachen</h2><ul><li><strong>Kniescheibenprobleme (Patellofemorale Schmerzsyndrom):</strong> Schmerz unter oder um die Kniescheibe – häufig bei jungen aktiven Menschen.</li><li><strong>Iliotibialband-Syndrom:</strong> Läuferknie – Schmerz aussen am Knie, besonders beim Bergabgehen.</li><li><strong>Bursitis:</strong> Schleimbeutelentzündung – Schwellung und Druckschmerz.</li><li><strong>Kniearthrose:</strong> Knorpelabnutzung – schleichend, Anlaufschmerz, Morgensteifigkeit.</li><li><strong>Muskeldysbalance:</strong> Schwacher M. vastus medialis, enge Hamstrings – häufig bei Büroarbeiter:innen.</li></ul><h2>Wann orthopädisch?</h2><ul><li>Starke Schwellung nach Trauma – sofort</li><li>Instabilität oder Blockierungen</li><li>Kein Ansprechen auf konservative Therapie nach 4–6 Wochen</li></ul><h2>TCM begleitend</h2><h3>TCM-Einordnung</h3><p>Knieschmerz entsteht oft aus dem Zusammenspiel von lokaler Gelenk-/Knorpelreizung und muskulärer Dysbalance in der Oberschenkel-Wade-Kette. Akupunktur entlang der Kniepunkte (SP 9, SP 10, ST 35, GB 34) ist in mehreren RCTs positiv belegt – Cochrane-Review für Kniearthrose zeigt moderate positive Evidenz. Schröpfen entlastet die Oberschenkelfaszie.</p><h3>TCM-Diagnostik</h3><ul><li>Schmerzlokalisation: innen, aussen, vorne, hinter Kniescheibe?</li><li>Anlauf- oder Belastungsschmerz?</li><li>Sport und Aktivitätsniveau</li><li>Orthopädischer Befund bekannt?</li><li>Physiotherapie parallel?</li></ul><h3>Wie wir dich begleiten</h3><ul><li><strong>Akupunktur</strong> – SP 9, SP 10, ST 35, ST 36, GB 34; lokal und systemisch; Schmerzmodulation</li><li><strong>Schröpfen</strong> – M. quadriceps und IT-Band; Faszienentlastung</li><li><strong>Tuina</strong> – Oberschenkel- und Wadenmuskelketten; Kompensationsmuster lösen</li></ul><h3>Wann TCM sinnvoll sein kann</h3><ul><li>Bei muskulärer Ursache oder Kniescheibenproblematik</li><li>Bei Kniearthrose als Schmerzbegleitung</li><li>In der Rehaphase nach Knieoperation</li><li>Als Ergänzung zur Physiotherapie</li></ul>",
    "faqs": [],
    "related": [
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      },
      {
        "slug": "stress-burnout",
        "label": "Stress & Burnout"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      },
      {
        "slug": "schroepfen",
        "label": "Schröpfen"
      }
    ]
  },
  {
    "slug": "schulterschmerzen",
    "name": "Schulterschmerzen",
    "title": "Schulterschmerzen: Ursache einordnen und gezielt begleitend entlasten",
    "metaDesc": "Schulterschmerzen Schweiz – Schmerzen beim Heben, Seitenschlafen, Schulterbelastung: Orthopädie einordnen. Akupunktur und Schröpfen begleitend bei Schulterschmerzen.",
    "conditionName": "Schulterschmerzen",
    "lead": "Schulter schmerzt beim Heben, Schlafen, Arbeiten – Ursache abklären, gezielt begleitend entlasten.",
    "bodyHtml": "<h2>Schulterschmerzen – wenn die Schulter bei jeder Bewegung meldet</h2><p>Den Arm über den Kopf heben – und die Schulter zieht. Nachts auf der Seite liegen – der Schmerz weckt dich auf. Eine schwere Tasche tragen – und die Schulter braucht danach Tage. <strong>Schulterschmerzen</strong> sind so allgegenwärtig, dass viele sie hinnehmen – bis der Schlaf darunter leidet oder die Arbeit unmöglich wird.</p><p>Hinter dem Begriff stecken verschiedene Strukturen: Muskeln, Sehnen, Schleimbeutel, Gelenk. TCM begleitet den Schmerz – ohne Diagnose zu ersetzen, ohne Struktur zu «reparieren».</p><h2>Typische Beschwerden</h2><div class=\"cp-sx-grid\"><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schmerz beim Heben des Arms – besonders über 90°</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Nachtschmerz – auf der betroffenen Seite liegen nicht möglich</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schmerz beim Rückwärtsstrecken des Arms</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Druckempfindlichkeit am Schulterrand oder Arm</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Ausstrahlung in Oberarm oder Nacken</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Muskelschwäche oder Kraftverlust</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Knacken oder Reiben beim Bewegen</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Verspannter Trapezius als Dauerbegleiter</div></div><h2>Häufige Ursachen</h2><ul><li><strong>Impingement-Syndrom:</strong> Sehne oder Schleimbeutel werden unter Akromion eingeklemmt – häufigste Ursache.</li><li><strong>Rotatorenmanschetten-Tendinopathie:</strong> Überlastungsreaktion der Schultersehnen ohne Riss.</li><li><strong>Schleimbeutelentzündung (Bursitis):</strong> Oft kombiniert mit Impingement.</li><li><strong>Verspannung aus dem Nacken:</strong> M. trapezius, M. levator scapulae – Nacken-Schulter-Übertragung sehr häufig.</li><li><strong>Instabilität:</strong> Hypermobile Schulter – besonders bei Sportlern.</li></ul><h2>Wann orthopädisch abklären?</h2><ul><li>Schmerzen über 4 Wochen ohne Besserung</li><li>Muskelschwäche oder plötzlicher Kraftverlust</li><li>Trauma vorausgegangen</li></ul><h2>TCM begleitend</h2><h3>TCM-Einordnung</h3><p>Schulterschmerzen entstehen durch Kombination: lokale Sehnen-/Muskelreizung und kompensatorische Überlastung aus Nacken und oberem Rücken. M. trapezius, M. levator scapulae und M. infraspinatus bilden Triggerpunkte, die in die Schulter ausstrahlen. Schröpfen und Akupunktur entlasten diese Muskelketten direkt.</p><h3>TCM-Diagnostik</h3><ul><li>Schmerzlokalisation: vorne, seitlich, hinten?</li><li>Nachtschmerz vorhanden?</li><li>Trauma oder schleichender Beginn?</li><li>Orthopädischer Befund bekannt?</li><li>Physiotherapie parallel?</li></ul><h3>Wie wir dich begleiten</h3><ul><li><strong>Akupunktur</strong> – LI 15, SJ 14, SI 9/10, GB 21; lokale und Fernpunkte; endogene Schmerzmodulation</li><li><strong>Schröpfen</strong> – M. trapezius, M. infraspinatus, Schulterblatt-Umfeld; Faszienentlastung</li><li><strong>Tuina</strong> – Nacken-Schulter-Übergang; Kompensationsmuster adressieren</li></ul><h3>Wann TCM sinnvoll sein kann</h3><ul><li>Bei muskulär-bedingten Schulterschmerzen</li><li>Bei Nachtschmerz als Hauptbeschwerde</li><li>Als Ergänzung zur Physiotherapie</li><li>In der Rehaphase nach Infiltration oder Operation</li></ul>",
    "faqs": [],
    "related": [
      {
        "slug": "nackenschmerzen",
        "label": "Nackenschmerzen"
      },
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      },
      {
        "slug": "schroepfen",
        "label": "Schröpfen"
      }
    ]
  },
  {
    "slug": "ischias",
    "name": "Ischias",
    "title": "Ischiasschmerz: Einordnen und gezielt begleitend entlasten",
    "metaDesc": "Ischias Ischiasschmerz Schweiz – Ausstrahlung ins Bein, Sitzschmerz, N. ischiadicus: Orthopädie und Neurologie zuerst. Akupunktur begleitend bei Ischias gut belegt.",
    "conditionName": "Ischias",
    "lead": "Rückenschmerz mit Ausstrahlung ins Bein – Ursache abklären, Schmerz und Spannung begleitend entlasten.",
    "bodyHtml": "<h2>Ischias – wenn der Schmerz ins Bein zieht</h2><p>Hinsetzen tut weh. Aufstehen auch. Beim Niesen fährt der Schmerz wie ein Blitz ins Bein. Der <strong>Ischiasschmerz</strong> ist unverkennbar – er folgt einer Linie, die präzise durch Gesäss, Oberschenkel und Unterschenkel zieht, manchmal bis in den Fuss.</p><p>TCM kann den Nerv nicht «heilen» und keinen Bandscheibenvorfall beheben. Was gut belegt begleitend möglich ist: Schmerzintensität reduzieren, Schutzspannungen in Gesäss- und Rückenmuskulatur entlasten und den Nachtschlaf verbessern – alles messbare Beiträge zur Erholung.</p><h2>Typische Beschwerden</h2><div class=\"cp-sx-grid\"><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Tiefer Rückenschmerz – lumbosakral oder Steissbein</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schmerz zieht durch Gesäss und Oberschenkel</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Kribbeln oder Taubheit im Bein oder Fuss</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schmerzverstärkung beim Sitzen – langer Stuhl unerträglich</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schmerz beim Husten, Niesen, Pressen</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Besserung beim Gehen – schlechter beim Stehen und Sitzen</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schlafprobleme durch Lagerungsschmerz</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schonhaltung und Gangveränderung</div></div><h2>Häufige Ursachen</h2><ul><li><strong>Bandscheibenvorfall L4/L5 oder L5/S1:</strong> Häufigste Ursache beim Erwachsenen.</li><li><strong>Piriformis-Syndrom:</strong> M. piriformis komprimiert N. ischiadicus im Gesäss – oft ohne Bandscheibenbefund.</li><li><strong>Spinalstenose:</strong> Einengung des Spinalkanals – typisch bei Älteren, schleichend.</li><li><strong>ISG-Blockierung:</strong> Iliosakralgelenk als häufig übersehene Ischias-Quelle.</li></ul><h2>Orthopädische / neurologische Behandlung</h2><ul><li><strong>Konservativ:</strong> Bewegung, Physiotherapie, NSAID, Muskelrelaxantien.</li><li><strong>Epidurale Infiltration:</strong> Bei starker Radikulopathie.</li><li><strong>OP:</strong> Nur bei Cauda-equina oder therapieresistentem Verlauf über 6 Wochen.</li></ul><h2>TCM begleitend</h2><h3>TCM-Einordnung</h3><p>Ischiasschmerz hat zwei Komponenten: Nervenreizschmerz (radikulär) und sekundäre Muskelschutzspannung (Paravertebralmuskulatur, M. piriformis, Hamstrings). TCM setzt an der zweiten Komponente an: Akupunktur entlang des Nervenverlaufs, Piriformis-Triggerpunktnadelung, Gate-Control und opioidmedierte Schmerzhemmung.</p><h3>TCM-Diagnostik</h3><ul><li>Ausstrahlungsmuster: genau welche Linie?</li><li>Taubheit oder Schwäche im Bein?</li><li>Orthopädischer Befund (MRT vorhanden?)</li><li>Schmerzverhalten: beim Sitzen, Gehen, Liegen?</li><li>Stressniveau als Verstärker</li></ul><h3>Wie wir dich begleiten</h3><ul><li><strong>Akupunktur</strong> – entlang Ausstrahlungsmuster (GB 30, BL 36, BL 37, BL 40, BL 57); Piriformis-Triggerpunktnadelung; endogene Schmerzhemmung</li><li><strong>Tuina</strong> – Paravertebralmuskulatur L4–S1, Piriformis, Hamstrings</li><li><strong>Schröpfen</strong> – Rücken- und Gesässfaszie; Durchblutungsförderung</li></ul><h3>Wann TCM sinnvoll sein kann</h3><ul><li>Bei subakutem Ischias (ab Woche 2) als Ergänzung zur Physiotherapie</li><li>Bei Piriformis-Syndrom ohne Bandscheibenbefund</li><li>Bei Lagerungsschmerz und Schlafstörungen</li><li>Nie als Ersatz für neurologische Abklärung bei Lähmungszeichen</li></ul>",
    "faqs": [],
    "related": [
      {
        "slug": "spinalkanalstenose",
        "label": "Spinalkanalstenose"
      },
      {
        "slug": "hexenschuss",
        "label": "Hexenschuss"
      },
      {
        "slug": "bandscheibenvorfall",
        "label": "Bandscheibenvorfall"
      },
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      },
      {
        "slug": "stress-burnout",
        "label": "Stress & Burnout"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      },
      {
        "slug": "schroepfen",
        "label": "Schröpfen"
      }
    ]
  },
  {
    "slug": "arthrose",
    "name": "Arthrose",
    "title": "Arthrose – Gelenkschmerzen mit TCM behandeln",
    "metaDesc": "Arthrose TCM Schweiz – Akupunktur & Tuina bei Knie-, Hüft- und Handarthrose. Schmerzlinderung und verbesserte Beweglichkeit. Praxen in Zürich, Winterthur, Frauenfeld.",
    "conditionName": "Arthrose",
    "lead": "Gelenkschmerzen, Steifheit und eingeschränkte Beweglichkeit durch Knorpelverschleiss.",
    "bodyHtml": "<h2>Was ist Arthrose?</h2><p>Arthrose ist die häufigste Gelenkerkrankung überhaupt: In der Schweiz sind schätzungsweise 1 Million Menschen betroffen, weltweit über 500 Millionen. Sie entsteht durch den fortschreitenden Abbau des Gelenkknorpels, der als Stossdämpfer zwischen den Knochenenden wirkt. Wenn der Knorpel dünner wird, reiben Knochen aufeinander – es entstehen Entzündungen, Schmerzen und Verformungen.</p><p>Arthrose betrifft am häufigsten <strong>Knie (Gonarthrose)</strong>, <strong>Hüfte (Coxarthrose)</strong>, <strong>Hände (Fingergelenke, Daumensattelgelenk)</strong> und die <strong>Wirbelsäule (Spondylarthrose)</strong>. Sie ist eine chronisch fortschreitende Erkrankung, die aber in ihrer Entwicklung beeinflusst werden kann.</p><h2>Häufige Symptome</h2><div class=\"cp-sx-grid\"><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Gelenkschmerzen bei Belastung und im späteren Stadium auch in Ruhe</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Morgensteifigkeit (meist kürzer als 30 Minuten)</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Anlaufschmerz – Schmerzen nach längerer Ruhe beim ersten Bewegen</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Eingeschränkte Beweglichkeit und Flexibilität</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Knacken, Reiben oder Knirschen im Gelenk</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Sichtbare Schwellung oder Verformung des Gelenks</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Wetterfühligkeit – Schmerzzunahme bei Kälte und Feuchte</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Muskelschwäche um das betroffene Gelenk</div></div><h2>Mögliche Ursachen und Risikofaktoren</h2><ul><li><strong>Alter:</strong> Knorpel regeneriert sich mit dem Alter schlechter – Arthrose ist keine Krankheit des Alters, aber Alter ist ein Risikofaktor.</li><li><strong>Übergewicht:</strong> Jedes Extra-Kilogramm belastet das Kniegelenk mit dem 4–6-fachen beim Gehen – Übergewicht beschleunigt den Knorpelabbau erheblich.</li><li><strong>Mechanische Überlastung:</strong> Sportverletzungen, berufliche Fehlbelastungen oder einseitige Bewegungsmuster schädigen den Knorpel.</li><li><strong>Genetische Veranlagung:</strong> Arthrose in der Familie erhöht das persönliche Risiko deutlich.</li><li><strong>Frühere Gelenkschäden:</strong> Kreuzbandrisse, Meniskusschäden oder Knochenbrüche erhöhen das Arthroserisiko.</li><li><strong>TCM-Perspektive:</strong><strong>Bi-Syndrom</strong> (Wind-Kälte-Feuchte-Blockierung der Meridiane) und geschwächtes Nieren-Qi gelten als Grundlagen von Gelenkbeschwerden.</li></ul><h2>Wann ärztlich abklären lassen?</h2><ul><li>Bei plötzlicher, starker Gelenkschwellung (mögliche Entzündung oder Verletzung)</li><li>Zur Erstdiagnose: Röntgenaufnahme zur Beurteilung des Knorpelzustands</li><li>Zur Abgrenzung von Rheuma oder anderen Gelenkerkrankungen</li><li>Bei rascher Verschlechterung oder unklaren Symptomen</li></ul><h2>Welche Behandlungsmöglichkeiten gibt es?</h2><ul><li><strong>Bewegung:</strong> Regelmässige, gelenkschonende Bewegung (Schwimmen, Rad, Spazieren) ist die wirksamste Massnahme zur Verlangsamung der Arthrose.</li><li><strong>Physiotherapie:</strong> Muskelkräftigung um das Gelenk reduziert die Belastung des Knorpels erheblich.</li><li><strong>Schmerzmedikamente:</strong> NSAIDs (Ibuprofen, Diclofenac) helfen akut – langfristige Einnahme belastet jedoch Magen und Nieren.</li><li><strong>Hyaluronsäure-Injektionen:</strong> Können die Gelenkflüssigkeit verbessern und Schmerzen lindern.</li><li><strong>Gelenkersatz (Endoprothese):</strong> Bei schwerem Gelenkverschleiss als letzte Option.</li><li><strong>TCM:</strong> Akupunktur, Tuina und Kräutertherapie zur Schmerzlinderung und Entzündungshemmung.</li></ul><h2>Kann TCM bei Arthrose unterstützen?</h2><p>Arthrose ist eine der am besten untersuchten Indikationen für Akupunktur. Mehrere hochwertige Studien – darunter eine grosse Metaanalyse im Journal of Pain (2018) – zeigen, dass Akupunktur bei Kniearthrose Schmerzen signifikant reduziert und die Funktion verbessert, verglichen mit Schein-Akupunktur oder keiner Behandlung.</p><p>In der TCM wird Arthrose als <strong>Bi-Syndrom</strong> (Wind-Kälte-Feuchte-Blockierung) behandelt. Ziel ist die Verbesserung des Qi- und Blutflusses in den betroffenen Meridianen.</p><ul><li><strong>Akupunktur</strong> reduziert Schmerzsignale, hemmt lokale Entzündungsmarker und verbessert die Gelenkbeweglichkeit</li><li><strong>Tuina</strong> mobilisiert das Gelenk sanft und verbessert die Durchblutung der gelenknahen Strukturen</li><li><strong>Moxibustion</strong> wärmt und nährt bei kälteverstärkten Arthrosebeschweden</li><li><strong>Kräuterformeln</strong> wie Du Huo Ji Sheng Wan stärken Nieren und Leber als Träger von Knochen und Sehnen</li></ul><p><em>TCM kann Schmerzen lindern und Beweglichkeit verbessern – aber den Knorpelabbau nicht umkehren. Als ergänzende Therapie zu Bewegung und Physiotherapie ist sie besonders wirksam.</em></p><h2>Arthrose und Lebensqualität</h2><p>Arthrose beeinträchtigt nicht nur die Bewegungsfreiheit – sie nimmt Unabhängigkeit, Hobby und Lebensfreude. Viele Betroffene reduzieren aus Schmerzangst die Bewegung, was die Situation verschlimmert. TCM hilft, den Schmerzkreislauf zu durchbrechen und mehr Mobilität zu erhalten.</p>",
    "faqs": [
      {
        "q": "Kann Arthrose geheilt werden?",
        "a": "Nein – Arthrose ist eine chronisch fortschreitende Erkrankung, und einmal abgebauter Knorpel regeneriert sich nicht vollständig. Mit der richtigen Behandlung (Bewegung, Physiotherapie, TCM) kann die Progression jedoch verlangsamt und die Lebensqualität erheblich verbessert werden."
      },
      {
        "q": "Hilft Akupunktur bei Kniearthrose?",
        "a": "Ja – mehrere hochwertige Studien belegen, dass Akupunktur Schmerzen bei Kniearthrose signifikant reduziert. Die Wirkung ist stärker als bei Schein-Akupunktur und vergleichbar mit NSAIDs – ohne deren Nebenwirkungen. Eine Serie von 8–12 Sitzungen ist typisch."
      },
      {
        "q": "Wie unterscheidet sich Arthrose von Rheuma?",
        "a": "Arthrose ist eine degenerative Verschleisserkrankung ohne primäre Entzündungsursache. Rheumatoide Arthritis ist eine Autoimmunerkrankung mit systemischer Entzündung, die symmetrisch mehrere Gelenke betrifft. Die Abgrenzung ist wichtig – bitte ärztliche Diagnose."
      },
      {
        "q": "Kann ich mit Arthrose Sport treiben?",
        "a": "Unbedingt – aber gelenkschonend. Schwimmen, Aquafitness, Radfahren und Nordic Walking sind ideal. Kniehocken, Sprünge und Sportarten mit starken Richtungswechseln sollten gemieden werden. Bewegung ist eine der wirksamsten Arthrose-Therapien."
      },
      {
        "q": "Kann die Zusatzversicherung die Kosten übernehmen?",
        "a": "Viele Schweizer Zusatzversicherungen erstatten TCM-Behandlungen bei anerkannten Therapeuten (EMR, ASCA). Informiere dich vorab bei deiner Kasse."
      }
    ],
    "related": [
      {
        "slug": "spinalkanalstenose",
        "label": "Spinalkanalstenose"
      },
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "nackenschmerzen",
        "label": "Nackenschmerzen"
      },
      {
        "slug": "stress-burnout",
        "label": "Stress & Burnout"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      },
      {
        "slug": "moxibustion",
        "label": "Moxibustion"
      }
    ]
  },
  {
    "slug": "sehnenscheidenentzuendung",
    "name": "Sehnenscheidenentzündung",
    "title": "Sehnenscheidenentzündung: Schmerzen und Einschränkung gezielt begleitend entlasten",
    "metaDesc": "Sehnenscheidenentzündung Schweiz – Tendinitis, Tenosynovitis: Orthopädie zuerst. Akupunktur begleitend bei Sehnenschmerzen, Spannung und Regeneration.",
    "conditionName": "Sehnenscheidenentzündung",
    "lead": "Schmerzende, reizende Sehnenscheide – orthopädisch einordnen, gezielt begleitend entlasten.",
    "bodyHtml": "<h2>Sehnenscheidenentzündung – wenn jede Bewegung zieht</h2><p>Tippen, Greifen, Schreiben – und plötzlich zieht ein Schmerz durch Handgelenk oder Finger. <strong>Sehnenscheidenentzündungen</strong> entstehen typischerweise durch repetitive Belastung: Büroarbeit, Sport, handwerkliche Tätigkeiten. Die Entzündung macht die Sehnenscheide rau und schmerzhaft – jede Bewegung reibt.</p><p>TCM «heilt» keine Sehnenstruktur. Was begleitend praxisnah möglich ist: lokale Durchblutungsförderung im Sehnenumfeld, Spannungsreduktion in der Umgebungsmuskulatur und Faszienentlastung durch Schröpfen.</p><h2>Typische Beschwerden</h2><div class=\"cp-sx-grid\"><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Ziehender Schmerz bei Bewegung</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Morgensteifigkeit – besser nach Aufwärmen</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schwellung entlang der Sehnenscheide</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Reiben oder Knirschen bei Bewegung (Krepitation)</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Druckempfindlichkeit entlang der Sehne</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Bewegungseinschränkung und Kraftverlust</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Wiederkehrende Beschwerden bei Belastung</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schnappender Finger (trigger finger) bei Fingersehnenscheide</div></div><h2>Häufige Lokalisationen</h2><ul><li><strong>Handgelenk / Daumen:</strong> De-Quervain-Tendovaginitis – Mütter, Büroarbeit.</li><li><strong>Finger:</strong> Schnappfinger (Tendovaginitis stenosans).</li><li><strong>Schulter:</strong> Rotatorenmanschette, Bizepssehnenscheide.</li><li><strong>Knie:</strong> Patellasehne (Läuferknie).</li><li><strong>Achillessehne:</strong> Sport, Laufen.</li></ul><h2>Wann orthopädisch?</h2><ul><li>Starke Schwellung oder Funktionsverlust</li><li>Kein Ansprechen auf Ruhigstellung und Kühlung</li><li>Chronischer Verlauf über 6 Wochen</li></ul><h2>TCM begleitend</h2><h3>TCM-Einordnung</h3><p>Sehnenscheidenentzündung entsteht durch Hypoxie und Mikrozirkulationsstörung in der Sehnenscheide – reduzierter Blutfluss durch Überbelastung. Akupunktur verbessert lokale Mikrozirkulation, Schröpfen löst Faszien-Adhäsionen und Tuina arbeitet die Muskelketten, die die Sehne belasten.</p><h3>TCM-Diagnostik</h3><ul><li>Lokalisation und Verlauf</li><li>Belastungskontext: Büro, Sport, handwerklich?</li><li>Wärme- oder Kältepräferenz</li><li>Morgensteifigkeit vs. Belastungsschmerz</li><li>Orthopädische Behandlung aktuell?</li></ul><h3>Wie wir dich begleiten</h3><ul><li><strong>Akupunktur / Trockennadelung</strong> – direkt an Triggerpunkten im Sehnenumfeld; Mikrozirkulation</li><li><strong>Schröpfen</strong> – Faszienentlastung im Spannungsumfeld der Sehne</li><li><strong>Tuina</strong> – Muskelketten entlasten, die die betroffene Sehne belasten</li><li><strong>Nur nach akuter Phase</strong> – keine Behandlung bei aktiver Entzündung mit Wärme</li></ul><h3>Wann TCM sinnvoll sein kann</h3><ul><li>Ab Abklingen der akuten Entzündungsphase</li><li>Bei chronischer oder rezidivierender Sehnenscheidenentzündung</li><li>Begleitend zur Physiotherapie</li><li>Bei Muskelketten-Kompensation als Ursache</li></ul>",
    "faqs": [],
    "related": [
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      },
      {
        "slug": "stress-burnout",
        "label": "Stress & Burnout"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      },
      {
        "slug": "schroepfen",
        "label": "Schröpfen"
      }
    ]
  },
  {
    "slug": "fibromyalgie",
    "name": "Fibromyalgie",
    "title": "Fibromyalgie: Einordnen und Schmerz, Schlaf sowie Alltag begleitend entlasten",
    "metaDesc": "Fibromyalgie Schweiz – diffuse Schmerzen, Erschöpfung, Schlafstörungen: Rheumatologie zuerst. TCM begleitend bei Schmerzbelastung, Schlaf und Alltagsqualität.",
    "conditionName": "Fibromyalgie",
    "lead": "Diffuse Schmerzen, Erschöpfung, Schlafstörungen – rheumatologisch einordnen, begleitend entlasten.",
    "bodyHtml": "<h2>Fibromyalgie – diffus, real und chronisch</h2><p><strong>Fibromyalgie</strong> betrifft ca. 2–4 % der Bevölkerung, Frauen deutlich häufiger. Die Schmerzen sind weit verteilt, wandern, haben keine strukturelle Ursache – und werden von vielen Betroffenen zunächst nicht ernst genommen. Das ändert sich. Die Neurobiologie ist klar: zentrale Schmerzsensibilisierung, veränderte Schmerzverarbeitung im Rückenmark und Gehirn.</p><p>TCM kann Teilaspekte begleitend ansprechen: Schlafverbesserung, Reduktion vegetativer Überaktivierung, lokale Spannungsentlastung. Was sie nicht kann: zentrale Schmerzsensibilisierung kausal behandeln oder Schmerzfreiheit versprechen.</p><h2>Typische Beschwerden</h2><div class=\"cp-sx-grid\"><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Diffuse, wandernde Schmerzen – Muskeln, Gelenke, Haut</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Druckempfindlichkeit an Triggerpunkten</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Morgensteifigkeit</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Nicht-erholsamer Schlaf</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Erschöpfung – trotz Ruhe</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Brain Fog und Konzentrationsprobleme</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Stressverstärkte Schmerzen</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Verdauungsbeschwerden (Reizdarm häufig begleitend)</div></div><h2>Wann rheumatologisch / schmerzmedizinisch?</h2><ul><li>Diagnose noch nicht gestellt – andere Ursachen ausschliessen</li><li>Multimodales Schmerzprogramm beginnen</li><li>Starke Zustandsverschlechterung</li></ul><h2>Multimodale Behandlung</h2><ul><li><strong>Sport:</strong> Aerobe Ausdauerbelastung – wichtigste evidenzbasierte Massnahme.</li><li><strong>Psychotherapie:</strong> Schmerzbewältigung, Stressmanagement.</li><li><strong>Medikamente:</strong> Duloxetin, Pregabalin, Amitriptylin – begrenzte Wirkung.</li><li><strong>Schlaftherapie:</strong> Schlafarchitektur verbessern – zentral.</li></ul><h2>TCM begleitend</h2><h3>TCM-Einordnung</h3><p>Fibromyalgie-Schmerz entsteht durch zentrale Sensibilisierung – das Schmerzverarbeitungssystem ist dauerhaft übererregt. Chronischer Stress und Schlafmangel verstärken diesen Mechanismus. TCM setzt an der vegetativen Entlastung und Schlafverbesserung an – messbare Beiträge zur Schmerzschwelle.</p><h3>TCM-Diagnostik</h3><ul><li>Schmerzmuster: Lokalisation, Wanderung, Tagesgang?</li><li>Schlafqualität: nicht-erholsamer Schlaf als Hauptthema?</li><li>Stresskomponente und emotionale Belastung</li><li>Verdauungsbegleitung: Reizdarm-Symptome?</li><li>Kälte- oder Wärmeempfinden</li></ul><h3>Wie wir dich begleiten</h3><ul><li><strong>Akupunktur</strong> – zentrale Schmerzhemmung (endogene Opioide), Schlafverbesserung, vegetative Entlastung</li><li><strong>Sanfte Tuina</strong> – lokale Spannungsreduktion; vorsichtig bei Hyperalgesie – Druck individuell anpassen</li><li><strong>Kräuterformeln</strong> – nur nach rheumatologischer Freigabe; Interaktionen mit Duloxetin/Pregabalin prüfen</li></ul><h3>Wann TCM sinnvoll sein kann</h3><ul><li>Begleitend zum multimodalen Schmerzprogramm</li><li>Bei Schlafstörungen als dominantem Begleitthema</li><li>Bei stressverstärkten Schmerzphasen</li><li>Als Ergänzung zu Sport- und Psychotherapie</li></ul>",
    "faqs": [],
    "related": [
      {
        "slug": "schlafstoerungen",
        "label": "Schlafstörungen"
      },
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      }
    ]
  },
  {
    "slug": "kinderwunsch",
    "name": "Kinderwunsch",
    "title": "Akupunktur bei Kinderwunsch | Begleitung bei IVF & natürlichem Zyklus",
    "metaDesc": "Akupunktur als ruhige Begleitung auf dem Weg zum Wunschkind. Was die Forschung zeigt, wie eine Behandlung abläuft und wann eine ärztliche Abklärung wichtig ist.",
    "conditionName": "Kinderwunsch",
    "lead": "Unterstützung der Fertilität – natürlich oder begleitend zur Behandlung.",
    "bodyHtml": "<h2>Was Akupunktur in dieser Phase leisten kann</h2><p>Der am besten belegte Beitrag von Akupunktur beim Kinderwunsch liegt im Bereich Stress, Anspannung und Schlaf. Eine Kinderwunsch-Behandlung, besonders eine künstliche Befruchtung, ist psychisch fordernd. Viele Patientinnen beschreiben Akupunktur als die eine Stunde, in der sie zur Ruhe kommen. Eine bessere Stressregulation ersetzt keinen medizinischen Effekt, aber sie verbessert das Erleben einer ohnehin belastenden Zeit spürbar.</p><p>Darüber hinaus wird Akupunktur in der Reproduktionsmedizin häufig begleitend zur In-vitro-Fertilisation eingesetzt, etwa rund um den Embryotransfer. Ob sie die Chancen messbar erhöht, ist wissenschaftlich umstritten. Wir versprechen dir deshalb keine höheren Erfolgsraten. Wir bieten dir eine fundierte, schonende Begleitung an, deren Grenzen wir klar benennen.</p><h2>Wann Frauen und Paare zu uns kommen</h2><p>Typische Situationen, in denen Akupunktur als Begleitung sinnvoll sein kann:</p><ul><li>Begleitend zu einer IVF- oder IUI-Behandlung, oft in Absprache mit dem Kinderwunschzentrum</li><li>Bei unerfülltem Kinderwunsch ohne klaren medizinischen Befund, zusätzlich zur ärztlichen Abklärung</li><li>Bei starkem Stress, Schlafproblemen oder innerer Anspannung während der Kinderwunschzeit</li><li>Bei Zyklusbeschwerden, die parallel ärztlich abgeklärt werden</li></ul><p>In allen Fällen gilt: Die medizinische Diagnostik gehört zuerst zur Gynäkologin oder ins Kinderwunschzentrum. Akupunktur kommt ergänzend dazu, nicht davor.</p><h2>Wie eine Behandlung bei uns abläuft</h2><p>Beim ersten Termin nehmen wir uns Zeit für deine Geschichte: bisherige Behandlungen, Zyklus, Befunde, Belastung. Daraus entsteht ein individueller Plan. Eine Behandlung dauert rund 45 bis 60 Minuten. Die feinen Nadeln werden an definierten Punkten gesetzt, danach ruhst du entspannt.</p><p>Wenn du dich in reproduktionsmedizinischer Behandlung befindest, stimmen wir die Termine auf deinen Zyklus und deine IVF-Schritte ab. Viele Patientinnen kommen über mehrere Wochen ein- bis zweimal pro Woche. Die genaue Frequenz besprechen wir gemeinsam und passen sie laufend an.</p><h2>Was die Forschung zeigt</h2><p>Hier bleiben wir bewusst nüchtern. Die Datenlage zu Akupunktur und künstlicher Befruchtung ist gemischt und wird unter Fachleuten weiter diskutiert.</p><p>Eine grosse, hochwertige randomisierte Studie, 2018 im Fachjournal JAMA veröffentlicht, fand keinen Unterschied bei der Lebendgeburtenrate zwischen echter und scheinbarer Akupunktur. Auch mehrere Meta-Analysen kommen zum Schluss, dass sich aus der vorhandenen Literatur kein klarer Vorteil für die Lebendgeburtenrate ableiten lässt. Andere Übersichtsarbeiten berichten von verbesserten klinischen Schwangerschaftsraten, wenn Akupunktur rund um Eizellentnahme und Embryotransfer erfolgt, stufen diese Evidenz aber als von niedriger Qualität ein.</p><p>Das bedeutet konkret: Ein gesicherter, klar messbarer Effekt auf die Geburtenrate ist nicht belegt. Belegt und unstrittig ist die gute Verträglichkeit, ernsthafte Nebenwirkungen sind bei sachgerechter Durchführung selten. Wer Akupunktur als unterstützende Begleitung versteht, trifft eine vertretbare Wahl. Wer sich davon eine garantierte Steigerung der Erfolgschancen erhofft, sollte die Studienlage kennen.</p><h2>Wann du ärztlich abklären solltest</h2><p>Akupunktur ersetzt keine reproduktionsmedizinische Abklärung. Bitte wende dich an deine Ärztin oder ein Kinderwunschzentrum, wenn:</p><ul><li>ihr seit zwölf Monaten ungeschützten Geschlechtsverkehr habt, ohne dass eine Schwangerschaft eintritt (ab 35 Jahren bereits nach sechs Monaten)</li><li>starke Unterbauchschmerzen, ungewöhnliche Blutungen oder ausbleibende Periode auftreten</li><li>bekannte Erkrankungen wie Endometriose, PCOS oder Schilddrüsenstörungen im Raum stehen</li><li>nach mehreren Behandlungszyklen weiterhin kein Erfolg eintritt</li></ul><p>Diese Abklärung ist die Grundlage. Begleitende Akupunktur baut darauf auf.</p><h2>Kosten und Krankenkasse</h2><p>Akupunktur durch anerkannte Therapeutinnen wird in der Schweiz in der Regel über die Zusatzversicherung für Komplementärmedizin abgedeckt. Ob und in welcher Höhe deine Kasse zahlt, hängt von deinem Vertrag ab. Kläre die Deckung vor Behandlungsbeginn direkt mit deiner Versicherung ab. Gern erklären wir dir beim Erstkontakt, worauf du achten solltest.</p>",
    "faqs": [
      {
        "q": "Erhöht Akupunktur meine Chance auf eine Schwangerschaft?",
        "a": "Ein klar messbarer Effekt auf die Lebendgeburtenrate ist wissenschaftlich nicht belegt. Wir versprechen keine höheren Erfolgsraten. Gut belegt ist hingegen, dass viele Patientinnen Stress und Anspannung während der Kinderwunschzeit als geringer erleben. So verstehen wir Akupunktur: als verträgliche Begleitung."
      },
      {
        "q": "Ab wann sollte ich mit der Akupunktur beginnen?",
        "a": "Es gibt kein festes Schema. Manche starten früh in der Kinderwunschphase, andere begleitend zu einer geplanten IVF. Wenn eine künstliche Befruchtung ansteht, beginnen viele einige Wochen vorher. Den passenden Zeitpunkt legen wir gemeinsam fest und stimmen ihn mit deiner Behandlung ab."
      },
      {
        "q": "Kann ich Akupunktur und IVF gleichzeitig machen?",
        "a": "Ja, das ist der häufigste Fall. Akupunktur ersetzt die reproduktionsmedizinische Behandlung nicht, sondern begleitet sie. Wir stimmen die Termine auf deinen Zyklus und deine IVF-Schritte ab und arbeiten bei Bedarf mit deinem Kinderwunschzentrum zusammen."
      },
      {
        "q": "Tut Akupunktur weh?",
        "a": "Die verwendeten Nadeln sind sehr fein, deutlich dünner als bei einer Blutentnahme. Die meisten spüren beim Setzen höchstens ein kurzes Ziehen oder Kribbeln. Danach liegen viele entspannt und kommen zur Ruhe. Ernsthafte Nebenwirkungen sind bei fachgerechter Durchführung selten."
      },
      {
        "q": "Wie viele Sitzungen brauche ich?",
        "a": "Das hängt von deiner Situation ab. Viele Patientinnen kommen über mehrere Wochen ein- bis zweimal pro Woche, besonders rund um IVF-Termine. Eine feste Zahl nennen wir nicht pauschal. Beim Erstgespräch schätzen wir einen realistischen Rahmen ein und passen ihn im Verlauf an."
      }
    ],
    "related": [
      {
        "slug": "stress-burnout",
        "label": "Stress & Burnout"
      },
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      }
    ],
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
      }
    ]
  },
  {
    "slug": "menstruationsbeschwerden",
    "name": "Menstruationsbeschwerden",
    "title": "Menstruationsbeschwerden & Regelschmerzen – TCM Behandlung",
    "metaDesc": "Menstruationsbeschwerden TCM Schweiz – Akupunktur & Moxibustion bei Regelschmerzen, Dysmenorrhoe & Menstruationskrämpfen. Praxen in Zürich, Winterthur, Frauenfeld.",
    "conditionName": "Menstruationsbeschwerden",
    "lead": "Regelschmerzen, Krämpfe und Unwohlsein vor und während der Menstruation.",
    "bodyHtml": "<h2>Was sind Menstruationsbeschwerden?</h2><p>Menstruationsschmerzen – medizinisch Dysmenorrhoe genannt – sind krampfartige Schmerzen im Unterleib, die unmittelbar vor oder während der Regelblutung auftreten. Sie sind eine der häufigsten gynäkologischen Beschwerden und betreffen schätzungsweise 50–90 % aller Frauen im gebärfähigen Alter, bei 10–20 % in schwerem Ausmass.</p><p>Man unterscheidet die <strong>primäre Dysmenorrhoe</strong> (ohne organische Ursache, typischerweise ab der ersten Periode) von der <strong>sekundären Dysmenorrhoe</strong> (durch Erkrankungen wie Endometriose, Myome oder Entzündungen verursacht).</p><h2>Häufige Symptome</h2><div class=\"cp-sx-grid\"><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Krampfartige Unterleibsschmerzen zu Beginn der Regel</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Ziehende Schmerzen in Rücken und Oberschenkeln</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Übelkeit, manchmal Erbrechen</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Durchfall oder Verstopfung</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Kopfschmerzen und Migräne</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Erschöpfung und allgemeines Unwohlsein</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Starke Blutung (Menorrhagie)</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schmerzen, die Alltag und Arbeits­fähigkeit einschränken</div></div><h2>Mögliche Ursachen</h2><ul><li><strong>Prostaglandine:</strong> Bei der primären Dysmenorrhoe lösen erhöhte Prostaglandin-Spiegel starke Gebärmutterkontraktionen aus, die Schmerzen und Krämpfe verursachen.</li><li><strong>Endometriose:</strong> Gebärmutterschleimhaut ausserhalb der Gebärmutter – eine häufige, oft spät diagnostizierte Ursache starker Regelschmerzen.</li><li><strong>Myome:</strong> Gutartige Muskelknoten in der Gebärmutter können Schmerzen und starke Blutungen verursachen.</li><li><strong>Hormonschwankungen:</strong> Ungleichgewicht von Östrogen und Progesteron beeinflusst die Qualität der Schleimhautablösung.</li><li><strong>TCM-Perspektive:</strong> «Blut-Stase» und Kälte im Uterus gelten als Hauptursachen für Dysmenorrhoe.</li></ul><h2>Wann gynäkologisch abklären lassen?</h2><ul><li>Bei sehr starken Schmerzen, die mit Schmerzmitteln kaum behandelbar sind</li><li>Bei auffällig starker Blutung (Menorrhagie) oder unregelmässigem Zyklus</li><li>Bei Schmerzen auch ausserhalb der Menstruation</li><li>Bei Verdacht auf Endometriose, Myome oder Entzündung</li><li>Bei neu auftretenden, veränderten Schmerzen</li></ul><h2>Welche Behandlungsmöglichkeiten gibt es?</h2><ul><li><strong>Schmerzmittel (NSAIDs):</strong> Ibuprofen, Naproxen oder Diclofenac hemmen Prostaglandinbildung und lindern Krämpfe effektiv.</li><li><strong>Hormonelle Verhütung:</strong> Die Pille reduziert Schmerzen durch Hemmung des Eisprungs und Verringerung der Schleimhaut.</li><li><strong>Wärme:</strong> Wärmflasche oder Heizkissen entspannen die Gebärmutter und lindern Krämpfe.</li><li><strong>TCM:</strong> Akupunktur, Moxibustion und Kräutertherapie zeigen gute Resultate bei primärer Dysmenorrhoe.</li></ul><h2>Kann TCM bei Menstruationsbeschwerden unterstützen?</h2><p>Menstruationsschmerzen gehören zu den am besten untersuchten Indikationen für Akupunktur. Ein systematischer Review (Cochrane, 2016) fand, dass Akupunktur signifikant wirksamer war als Schmerzmittel oder Wärme bei der Behandlung primärer Dysmenorrhoe.</p><p>In der TCM werden Menstruationsschmerzen oft durch <strong>Kälte im Uterus</strong> oder <strong>Qi- und Blut-Stase</strong> erklärt – Blockaden, die den freien Abfluss des Menstrualblutes behindern und Krämpfe verursachen.</p><ul><li><strong>Akupunktur</strong> löst Blockaden, fördert die Durchblutung und reguliert Prostaglandinspiegel</li><li><strong>Moxibustion</strong> wärmt den Uterus und löst Kältekrämpfe</li><li><strong>Kräuterformeln</strong> wie Wen Jing Tang verbessern die Blutqualität und Gebärmutterdurchblutung</li></ul><p><em>TCM sollte bei sekundärer Dysmenorrhoe immer begleitend zur schulmedizinischen Diagnose und Behandlung eingesetzt werden.</em></p><h2>Menstruationsbeschwerden und Lebensqualität</h2><p>Starke Menstruationsschmerzen werden oft verharmlost – «das ist eben so». Dabei schränken sie viele Frauen monatlich erheblich ein. Du verdienst Unterstützung, die diese Beschwerden ernst nimmt und konkrete Hilfe bietet.</p>",
    "faqs": [
      {
        "q": "Sind starke Regelschmerzen normal?",
        "a": "Leichte Krämpfe zu Beginn der Menstruation sind häufig und normal. Starke Schmerzen, die Schmerzmittel erfordern oder den Alltag einschränken, sind nicht normal und sollten untersucht werden – mögliche Ursachen sind Endometriose, Myome oder Hormonstörungen."
      },
      {
        "q": "Wie schnell wirkt Akupunktur bei Menstruationsschmerzen?",
        "a": "Viele Patientinnen berichten bereits ab dem zweiten oder dritten Behandlungszyklus von deutlicher Linderung. Für optimale Ergebnisse empfehlen wir 3–4 Sitzungen pro Zyklus in den ersten 2–3 Zyklen."
      },
      {
        "q": "Kann ich Akupunktur während der Menstruation bekommen?",
        "a": "Grundsätzlich ja – manche Therapeuten behandeln während der Menstruation mit spezifischen Akupunkturpunkten, andere bevorzugen die Behandlung in den Wochen davor. Dein Therapeut wird den optimalen Zeitpunkt mit dir besprechen."
      },
      {
        "q": "Was ist der Unterschied zwischen Menstruationsbeschwerden und Endometriose?",
        "a": "Endometriose ist eine chronische Erkrankung, die oft stärkere Schmerzen über die Periode hinaus verursacht. Die Diagnose erfordert eine Laparoskopie. Wenn deine Schmerzen sehr stark sind oder auch ausserhalb der Periode auftreten, bitte gynäkologische Abklärung."
      },
      {
        "q": "Kann die Zusatzversicherung die Kosten übernehmen?",
        "a": "Viele Schweizer Zusatzversicherungen erstatten TCM-Behandlungen bei anerkannten Therapeuten (EMR, ASCA). Informiere dich vorab bei deiner Kasse."
      }
    ],
    "related": [
      {
        "slug": "pms",
        "label": "PMS"
      },
      {
        "slug": "kinderwunsch",
        "label": "Kinderwunsch"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "moxibustion",
        "label": "Moxibustion"
      },
      {
        "slug": "kraeutertherapie",
        "label": "Kräutertherapie"
      }
    ]
  },
  {
    "slug": "pms",
    "name": "PMS",
    "title": "PMS – Prämenstruelles Syndrom mit TCM behandeln",
    "metaDesc": "PMS TCM Schweiz – Akupunktur & Kräutertherapie bei Prämenstruellem Syndrom: Stimmungsschwankungen, Blähungen, Brustspannen. Praxen in Zürich, Winterthur, Frauenfeld.",
    "conditionName": "PMS",
    "lead": "Stimmungsschwankungen, Blähungen und Erschöpfung vor der Menstruation.",
    "bodyHtml": "<h2>Was ist PMS?</h2><p>Das Prämenstruelle Syndrom (PMS) ist eine Kombination körperlicher und emotionaler Beschwerden, die in der Lutealphase (zweite Zyklushälfte) auftreten und mit Einsetzen der Menstruation verschwinden. PMS betrifft schätzungsweise 50–80 % aller Frauen im gebärfähigen Alter in unterschiedlicher Intensität.</p><p>Eine besonders schwere Form ist das <strong>Prämenstruelle Dysphorische Syndrom (PMDS)</strong>, das starke Stimmungseinbrüche und depressive Episoden verursacht und als eigenständige Erkrankung gilt.</p><h2>Häufige Symptome</h2><div class=\"cp-sx-grid\"><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Stimmungsschwankungen, Reizbarkeit, Weinerlichkeit</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Blähungen, Wassereinlagerungen (Gewichtszunahme)</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Brustspannen und -schmerzen</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Kopfschmerzen und Migräne</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Erschöpfung und Energiemangel</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Konzentrations- und Schlafprobleme</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Heisshunger (besonders auf Süsses)</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Rückenschmerzen und Unterleibskrämpfe</div></div><h2>Mögliche Ursachen</h2><ul><li><strong>Hormonschwankungen:</strong> Der natürliche Abfall von Östrogen und Progesteron in der Lutealphase beeinflusst Neurotransmitter wie Serotonin, GABA und Dopamin.</li><li><strong>Serotoninmangel:</strong> Frauen mit PMS reagieren empfindlicher auf den hormonellen Serotoninrückgang vor der Menstruation.</li><li><strong>Stress und Schlafmangel:</strong> Verstärken PMS-Symptome erheblich.</li><li><strong>Ernährung:</strong> Hoher Zuckerkonsum, Koffein und Alkohol können PMS-Symptome verschlimmern.</li><li><strong>TCM-Perspektive:</strong><strong>Leber-Qi-Stauung</strong> und Milz-Schwäche gelten als zentrale PMS-Ursachen – Anspannung blockiert den freien Energiefluss.</li></ul><h2>Wann abklären lassen?</h2><ul><li>Bei stark ausgeprägten Stimmungseinbrüchen (Verdacht auf PMDS)</li><li>Wenn PMS-Symptome den Alltag, Beruf oder Beziehungen dauerhaft beeinträchtigen</li><li>Bei Begleiterkrankungen wie Depression, Angststörungen oder Schilddrüsenproblemen</li><li>Wenn körperliche Symptome sehr stark ausgeprägt sind (mögliche hormonelle Störung)</li></ul><h2>Welche Behandlungsmöglichkeiten gibt es?</h2><ul><li><strong>Lebensstil:</strong> Regelmässige Bewegung, Schlafhygiene, Reduktion von Zucker, Koffein und Alkohol.</li><li><strong>Ernährungsergänzung:</strong> Magnesium, Vitamin B6 und Calcium können PMS-Symptome lindern.</li><li><strong>Hormonelle Therapie:</strong> Die Pille kann PMS durch Unterdrückung des Zyklus verbessern.</li><li><strong>Antidepressiva (SSRIs):</strong> Bei schwerem PMS oder PMDS oft wirksam.</li><li><strong>TCM:</strong> Akupunktur und Kräutertherapie bieten einen ganzheitlichen Ansatz ohne Nebenwirkungen.</li></ul><h2>Kann TCM bei PMS unterstützen?</h2><p>In der TCM gilt PMS als typisches Zeichen von <strong>Leber-Qi-Stauung</strong>: Der natürliche Energiefluss wird durch Stress, Anspannung und Überarbeitung blockiert. Kurz vor der Menstruation – wenn der Körper zusätzlich mit dem Zykluswandel beschäftigt ist – bricht dieser Stau durch und verursacht die bekannten PMS-Symptome.</p><p>Studien zeigen positive Effekte von Akupunktur auf PMS-Beschwerden – insbesondere auf Stimmungssymptome, Brustspannen und Kopfschmerzen.</p><ul><li><strong>Akupunktur</strong> löst die Leber-Qi-Stauung, reguliert Serotonin und Stimmung</li><li><strong>Kräuterformeln</strong> wie Xiao Yao San (Freie-Wanderer-Formel) gelten als Klassiker bei PMS</li><li><strong>Moxibustion und Tuina</strong> unterstützen die Entspannung der Unterleibsregion</li></ul><p><em>Bei schwerem PMS oder PMDS bitte zuerst ärztliche oder psychologische Abklärung – TCM als Ergänzung, nicht als Ersatz.</em></p><h2>PMS und Lebensqualität</h2><p>PMS wird oft als «weibliches Problem» abgetan. Dabei kann es Beziehungen, Berufsleben und Selbstwahrnehmung erheblich beeinflussen. Eine gezielte Behandlung – körperlich und emotional – macht einen realen Unterschied.</p>",
    "faqs": [
      {
        "q": "Was ist der Unterschied zwischen PMS und PMDS?",
        "a": "PMS umfasst körperliche und leichte emotionale Beschwerden vor der Regel. PMDS (Prämenstruelles Dysphorisches Syndrom) ist eine schwerwiegendere Form mit ausgeprägten Stimmungseinbrüchen, Angst oder Depressionen, die als eigenständige Erkrankung gilt und oft medizinische Behandlung erfordert."
      },
      {
        "q": "Wann treten PMS-Symptome typischerweise auf?",
        "a": "PMS-Beschwerden beginnen in der Regel 1–2 Wochen vor der Menstruation und verschwinden mit Einsetzen der Blutung. Treten Symptome auch ausserhalb dieser Phase auf, kann eine andere Ursache vorliegen."
      },
      {
        "q": "Wie viele Akupunktursitzungen brauche ich bei PMS?",
        "a": "Eine Serie von 6–8 Sitzungen über 2–3 Zyklen ist typisch. Oft empfehlen wir 2 Sitzungen pro Zyklus – eine in der Zyklusmitte und eine 1 Woche vor der erwarteten Menstruation. Viele Frauen bemerken schon nach dem ersten Behandlungszyklus Verbesserungen."
      },
      {
        "q": "Kann ich bei PMS etwas selbst tun?",
        "a": "Ja: Ausdauerbewegung, Schlafregulation, Reduktion von Zucker, Koffein und Alkohol helfen nachweislich. Magnesium und Vitamin B6 können ergänzend wirken. TCM gibt dir zusätzlich ein individuell abgestimmtes Kräuterpräparat mit auf den Weg."
      },
      {
        "q": "Kann die Zusatzversicherung die Kosten übernehmen?",
        "a": "Viele Schweizer Zusatzversicherungen übernehmen TCM-Behandlungen bei EMR/ASCA-anerkannten Therapeuten. Informiere dich vorab bei deiner Kasse – wir helfen dir gerne."
      }
    ],
    "related": [
      {
        "slug": "menstruationsbeschwerden",
        "label": "Menstruationsbeschwerden"
      },
      {
        "slug": "stress-burnout",
        "label": "Stress & Burnout"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "kraeutertherapie",
        "label": "Kräutertherapie"
      },
      {
        "slug": "moxibustion",
        "label": "Moxibustion"
      }
    ]
  },
  {
    "slug": "wechseljahre",
    "name": "Wechseljahre",
    "title": "Wechseljahre: Perimenopausale Beschwerden einordnen und gezielt begleiten",
    "metaDesc": "Wechseljahre Schweiz – Hitzewallungen, Schlafstörungen, Unruhe: Gynäkologie zuerst. TCM begleitend bei klimakterischen Beschwerden und Alltagsqualität.",
    "conditionName": "Wechseljahre",
    "lead": "Hitzewallungen, Schlafprobleme, innere Unruhe, Erschöpfung – gynäkologisch begleitet, begleitend entlasten.",
    "bodyHtml": "<h2>Wechseljahre – eine Lebensphase, keine Erkrankung</h2><p>Die <strong>Perimenopause</strong> ist biologisch. Der Östrogenmangel senkt die Thermoregulationsschwelle im Hypothalamus – Hitzewallungen entstehen. Schlaf leidet unter nächtlichen Schweissen und vegetativer Überaktivierung. Diese Phase dauert bei vielen Frauen 4–10 Jahre.</p><p>TCM «reguliert» keine Hormone. Was mehrere Studien zeigen: Akupunktur reduziert Häufigkeit und Intensität von Hitzewallungen mesbar – verglichen mit Warte-Kontrolle. Das ist realistisch und gut eingeordnet.</p><h2>Typische Beschwerden</h2><div class=\"cp-sx-grid\"><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Hitzewallungen – tagsüber und nachts</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Nachtschweis und Schlafdurchbrüche</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schlafstörungen – Einschlafen und Durchschlafen</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Innere Unruhe und Reizbarkeit</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Erschöpfung trotz Ruhe</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Gelenk- und Muskelbeschwerden</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Scheidentrockenheit und urogenitale Beschwerden</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Konzentrationsprobleme</div></div><h2>Wann gynäkologisch?</h2><ul><li>Starke Beschwerden – MHT prüfen; sehr wirksam</li><li>Unregelmässige Blutungen – abklären</li><li>Urogenitale Atrophie – lokale Östrogene sehr wirksam</li></ul><h2>TCM begleitend</h2><h3>TCM-Einordnung</h3><p>Wechseljahrbeschwerden sind in der TCM ein Nieren-Yin-/Yang-Mangel-Muster – modern: Östrogenmangel senkt hypothalamische Thermoregulationsschwelle; vegetative Überaktivierung; Schlafarchitektur-Störung durch Progesteron-Wegfall. Akupunktur reguliert über Opioid-Mechanismen den hypothalamischen Thermo-Setpoint.</p><h3>TCM-Diagnostik</h3><ul><li>Hitzewallungen: Häufigkeit, Auslöser, Tageszeit?</li><li>Schlafmuster: Einschlafen, Nachtschweis, Frühmorgenwachen?</li><li>Emotionale Situation: Unruhe, Reizbarkeit, Stimmung?</li><li>Kälte-/Wärmeempfinden allgemein</li><li>MHT und gynäkologische Therapie</li></ul><h3>Wie wir dich begleiten</h3><ul><li><strong>Akupunktur</strong> – Hitzewallungen, Schlaf, vegetative Entlastung; Nieren- und Herz-Punkte; opioid-mediierter Mechanismus bei Hitzewallungen belegt</li><li><strong>Kräuterformeln</strong> – Liu Wei Di Huang Wan (Nieren-Yin-Mangel, Trockenheit, Hitze), Zhi Bai Di Huang Wan (Hitzewallungen, Nachtschweis) – individuell; nach gynäkologischer Absprache</li><li><strong>MHT-Kompatibilität</strong> – TCM begleitend zu MHT möglich; keine Interaktionen bei Akupunktur</li></ul><h3>Wann TCM sinnvoll sein kann</h3><ul><li>Bei Hitzewallungen als Hauptbeschwerde</li><li>Bei Schlafstörungen durch Nachtschweis und Unruhe</li><li>Wenn MHT nicht gewünscht oder kontraindiziert ist</li><li>Als Ergänzung zu MHT</li></ul>",
    "faqs": [],
    "related": [
      {
        "slug": "hyperhidrose",
        "label": "Starkes Schwitzen"
      },
      {
        "slug": "schlafstoerungen",
        "label": "Schlafstörungen"
      },
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "kraeutertherapie",
        "label": "Kräutertherapie"
      }
    ]
  },
  {
    "slug": "schwangerschaftsbeschwerden",
    "name": "Schwangerschaftsbeschwerden",
    "title": "Schwangerschaftsbeschwerden: Gezielt lindern und sicher begleiten",
    "metaDesc": "Akupunktur in der Schwangerschaft Schweiz – Übelkeit, Rückenschmerzen, Schlafprobleme, Erschöpfung. Schwangerschaftsangepasste TCM-Begleitung in der ganzen Schweiz.",
    "conditionName": "Schwangerschaftsbeschwerden",
    "lead": "Übelkeit, Rückenschmerzen, Erschöpfung – Akupunktur in der Schwangerschaft.",
    "bodyHtml": "<h2>Schwangerschaftsbeschwerden – wenn der Körper unter Druck steht</h2><p>Schwangerschaft ist keine Krankheit – aber sie ist eine ausserordentliche körperliche Belastung. Das Kreislaufsystem, das Hormonsystem, die Muskulatur und das Nervensystem werden gleichzeitig neu kalibriert. Viele Beschwerden, die dabei entstehen, sind normal – aber nicht zwingend auszuhalten.</p><p>Akupunktur in der Schwangerschaft ist gut untersucht und wird von vielen Gynäkologen und Hebammen ergänzend empfohlen – besonders bei Übelkeit im ersten Trimester, Rückenschmerzen und Schlafproblemen.</p><h2>Typische Beschwerden, die wir begleiten</h2><div class=\"cp-sx-grid\"><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schwangerschaftsübelkeit – 1. Trimester, teils bis weit darüber</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Rückenschmerzen – Lendenwirbelsäule, Sakrum, ISG</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schlafprobleme – zunehmend im 2. und 3. Trimester</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Erschöpfung und Müdigkeit – besonders 1. Trimester</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Wassereinlagerungen in Beinen und Händen</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Verspannungen in Nacken und Schultern</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Innere Unruhe und Schlafanspannung</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Verdauungsprobleme, Sodbrennen, Blähungen</div></div><h2>Wann sofort zur Gynäkologin / Hebamme?</h2><ul><li>Blutungen – immer sofort</li><li>Starke oder ungewöhnliche Schmerzen</li><li>Schwerer Schwindel oder Ohnmachtsgefühl</li><li>Verminderte Kindsbewegung</li><li>Gesichtsschwellung, starke Kopfschmerzen, Sehstörungen (Präeklampsie-Zeichen)</li><li>Jede Veränderung, die sich ungewohnt anfühlt</li></ul><h2>TCM in der Schwangerschaft</h2><h3>Wie wir die Situation einordnen</h3><p>Schwangerschaftsbeschwerden entstehen durch die massive hormonelle Umstellung, den erhöhten Kreislaufdruck, die veränderte Statik und das wachsende System-Update namens Baby. TCM setzt gezielt und sanft an den jeweiligen Beschwerdemustern an – mit schwangerschaftsangepassten Techniken und ohne verbotene Punkte.</p><h3>Was wir in der Praxis erheben</h3><ul><li>Schwangerschaftswoche und bisheriger Verlauf</li><li>Hauptbeschwerden: Übelkeit, Rücken, Schlaf, Erschöpfung?</li><li>Trigger und Tageszeitmuster</li><li>Schlafqualität und Lagerungssituation</li><li>Verdauung, Kreislauf, Wassereinlagerungen</li></ul><h3>Wie wir behandeln</h3><ul><li><strong>Schwangerschaftsangepasste Akupunktur</strong> – unter Ausschluss kontraindizierter Punkte, trimestergerecht</li><li><strong>Akupressur</strong> – besonders bei Übelkeit (Pe 6 / Nei Guan), selbst anwendbar</li><li><strong>Moxibustion</strong> – bei ausgewählten Indikationen, keine Routineanwendung</li><li><strong>Sanfte Tuina</strong> am Rücken und Becken – Linderung bei Lendenwirbelsäulenbeschwerden</li><li><strong>Lagerungs- und Alltagsempfehlungen</strong> – praxisnah und umsetzbar</li></ul><h3>Wann TCM in der Schwangerschaft sinnvoll ist</h3><ul><li>Bei anhaltender Schwangerschaftsübelkeit im 1. Trimester</li><li>Bei Rücken- und Beckenbeschwerden im 2. und 3. Trimester</li><li>Bei Schlafstörungen und innerer Unruhe</li><li>Wenn schulmedizinisch alles abgeklärt ist, Beschwerden aber bestehen</li></ul>",
    "faqs": [],
    "related": [
      {
        "slug": "menstruationsbeschwerden",
        "label": "Menstruationsbeschwerden"
      },
      {
        "slug": "schlafstoerungen",
        "label": "Schlafstörungen"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "moxibustion",
        "label": "Moxibustion"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      }
    ]
  },
  {
    "slug": "stress-burnout",
    "name": "Stress & Burnout",
    "title": "Stress & Burnout – TCM Behandlung in der Schweiz",
    "metaDesc": "Stress Burnout TCM Schweiz – Akupunktur & Kräuter gegen Erschöpfung und Stress. Praxen in Zürich, Winterthur, Frauenfeld, Kreuzlingen.",
    "conditionName": "Stress & Burnout",
    "lead": "Dauerhaft erschöpft, gereizt oder innerlich angespannt.",
    "bodyHtml": "<h2>Was ist chronischer Stress?</h2><p>Kurzfristiger Stress ist normal und oft sogar nützlich – er mobilisiert Energiereserven und schärft die Konzentration. Problematisch wird es, wenn der Körper dauerhaft im Alarmzustand bleibt: Chronischer Stress belastet Herz-Kreislauf-System, Immunsystem, Hormonhaushalt und Psyche. In der modernen Gesellschaft ist er eine der häufigsten Ursachen für körperliche Beschwerden.</p><p>Schätzungsweise leiden 30–40 % der Erwerbstätigen in der Schweiz regelmässig unter erheblichem Arbeitsstress. Die Übergänge von Stress zu Burnout sind fliessend.</p><h2>Häufige Symptome</h2><div class=\"cp-sx-grid\"><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Innere Anspannung und Nervosität</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schlafprobleme – Einschlafen oder Durchschlafen</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Muskelverspannungen, besonders Nacken und Schultern</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Konzentrations- und Gedächtnissprobleme</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Reizbarkeit und Ungeduld</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Verdauungsprobleme (Reizdarm, Magenschmerzen)</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Kopfschmerzen und Migräne</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Herzrasen oder Druckgefühl auf der Brust</div></div><h2>Mögliche Ursachen</h2><ul><li><strong>Arbeitsdruck:</strong> Hohe Erwartungen, Zeitdruck, Überstunden und fehlendes Abschalten sind typische Auslöser.</li><li><strong>Beziehungs- und Familienstress:</strong> Konflikte, Pflegeaufgaben oder familiäre Krisen belasten das Nervensystem chronisch.</li><li><strong>Finanzielle Sorgen:</strong> Dauerhafter wirtschaftlicher Druck aktiviert die Stressachse kontinuierlich.</li><li><strong>Digitale Überstimulation:</strong> Ständige Erreichbarkeit und Informationsflut hinterlassen das Nervensystem ohne echte Ruhephasen.</li><li><strong>Fehlende Regeneration:</strong> Zu wenig Schlaf, Sport und soziale Verbundenheit reduzieren die Stressresilienz.</li></ul><h2>Wann ärztlich oder psychologisch abklären lassen?</h2><ul><li>Bei anhaltender Erschöpfung, die sich auch nach Erholung nicht bessert (Verdacht auf Burnout)</li><li>Bei Herzrhythmusstörungen, starkem Blutdruckanstieg oder körperlichen Alarmsymptomen</li><li>Bei Anzeichen von Depression oder Angststörungen</li><li>Wenn Stress den Alltag dauerhaft stark einschränkt</li></ul><h2>Welche Behandlungsmöglichkeiten gibt es?</h2><ul><li><strong>Psychotherapie / Coaching:</strong> Kognitive Verhaltenstherapie und Stressmanagement-Techniken adressieren Ursachen und Denkmuster.</li><li><strong>Entspannungsverfahren:</strong> Mindfulness, Yoga, Atemübungen und Autogenes Training regulieren das Nervensystem.</li><li><strong>Sport:</strong> Regelmässige Ausdauerbewegung ist eine der wirksamsten Interventionen gegen chronischen Stress.</li><li><strong>TCM:</strong> Akupunktur und Kräutertherapie unterstützen die körperliche Stressreaktion und fördern Regeneration.</li></ul><h2>Kann TCM bei Stress unterstützen?</h2><p>In der TCM wird chronischer Stress als <strong>Leber-Qi-Stauung</strong> und <strong>Erschöpfung des Nieren-Yin</strong> verstanden. Anspannung blockiert den Energiefluss, «innere Hitze» entsteht, Schlaf und Verdauung leiden. Die Behandlung zielt auf Lösung der Blockaden und Nährung der erschöpften Körpersysteme ab.</p><ul><li><strong>Akupunktur</strong> aktiviert das parasympathische Nervensystem, senkt Cortisol und fördert Entspannung</li><li><strong>Kräuterformeln</strong> stärken das Qi, beruhigen den Geist und unterstützen die Schlafregulation</li><li><strong>Tuina-Massage</strong> löst körperliche Verspannungen und verbessert den Energiefluss</li><li><strong>Moxibustion</strong> wärmt und nährt bei Kältegefühl und Erschöpfung durch Dauerstress</li></ul><p><em>TCM ist kein Ersatz für psychotherapeutische Unterstützung bei schweren Belastungen – aber eine wertvolle körperliche Ergänzung zur Stressbewältigung.</em></p><h2>Stress und dein Alltag</h2><p>Chronischer Stress ist unsichtbar, aber seine Auswirkungen sind real: Beziehungen leiden, Kreativität nimmt ab, der Körper sendet Warnsignale. Viele Betroffene warten zu lange, bis sie Hilfe suchen. Eine frühzeitige Regulation – körperlich und psychisch – ist eine Investition in langfristige Gesundheit.</p>",
    "faqs": [
      {
        "q": "Was ist der Unterschied zwischen Stress und Burnout?",
        "a": "Stress ist eine kurzfristige Reaktion auf Belastungen. Burnout ist das Resultat von chronischem, unverarbeitetem Stress – mit tiefer Erschöpfung, emotionaler Distanz und Leistungseinbruch. Burnout erfordert oft professionelle psychologische oder ärztliche Begleitung."
      },
      {
        "q": "Wie wirkt Akupunktur gegen Stress?",
        "a": "Akupunktur stimuliert das parasympathische Nervensystem (Ruhenerv), senkt messbar den Cortisolspiegel und fördert die Ausschüttung von Endorphinen und GABA. Viele Patienten berichten nach der ersten Sitzung von tiefer Entspannung."
      },
      {
        "q": "Wie viele Sitzungen brauche ich bei chronischem Stress?",
        "a": "Für erste Verbesserungen sind oft 4–6 Sitzungen ausreichend. Bei chronischem Stress oder Burnout empfehlen wir eine Serie von 8–12 Behandlungen über 8–10 Wochen, kombiniert mit Kräutertherapie."
      },
      {
        "q": "Kann die Zusatzversicherung die Kosten übernehmen?",
        "a": "Viele Schweizer Zusatzversicherungen übernehmen Akupunktur und TCM bei anerkannten Therapeuten (EMR, ASCA). Kläre das vorab mit deiner Kasse – wir helfen dir dabei."
      },
      {
        "q": "Was kann ich selbst gegen Stress tun?",
        "a": "Regelmässige Bewegung, ausreichend Schlaf, digitale Pausen und soziale Verbundenheit sind die wirksamsten Selbsthilfemassnahmen. TCM kann die Regeneration körperlich unterstützen – und Kräuterformeln die Resilienz stärken."
      }
    ],
    "related": [
      {
        "slug": "verdauungsprobleme",
        "label": "Verdauungsprobleme"
      },
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      }
    ],
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
      }
    ]
  },
  {
    "slug": "burnout",
    "name": "Burnout & Erschöpfungssyndrom",
    "title": "Burnout & Erschöpfungssyndrom: Professionell begleiten und körperlich entlasten",
    "metaDesc": "Burnout Schweiz – anhaltende Erschöpfung, Überlastung: Psychiatrie und Psychotherapie zuerst. TCM begleitend bei Schlaf, körperlicher Anspannung und Regeneration.",
    "conditionName": "Burnout & Erschöpfungssyndrom",
    "lead": "Anhaltende Erschöpfung, Überlastung, innere Leere – professionell begleiten, körperlich entlasten.",
    "bodyHtml": "<h2>Burnout – wenn der Körper die Rechnung präsentiert</h2><p>Die Erschöpfung, die beim <strong>Burnout</strong> entsteht, ist anders als normale Müdigkeit: Sie verschwindet nicht nach dem Wochenende. Schlafen hilft nicht mehr richtig. Der Körper trägt die Anspannung weiter, auch wenn der Kopf ausschalten möchte.</p><p>TCM setzt an dieser körperlichen Ebene an: Schlaf verbessern, vegetative Anspannung lösen, die körperliche Erholungsfähigkeit unterstützen. Was sie nicht kann: die berufliche oder emotionale Ursache bearbeiten. Das bleibt Aufgabe der Psychotherapie.</p><h2>Typische Beschwerden</h2><div class=\"cp-sx-grid\"><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Anhaltende Erschöpfung – nicht erholt aufwachen</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Einschlaf- und Durchschlafprobleme</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Körperliche Anspannung – Nacken, Schultern, Kiefer</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Innere Unruhe trotz äusserer Ruhe</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Emotionale Flachheit oder Reizbarkeit</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Konzentrationsprobleme und Brain Fog</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Körperliche Beschwerden ohne Befund</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Rückzug und Antriebsmangel</div></div><h2>Wann sofort professionelle Hilfe?</h2><ul><li>Suizidgedanken – sofort 143</li><li>Handlungsunfähigkeit im Alltag</li><li>Verdacht auf Depression – psychiatrische Einordnung</li><li>Keine Besserung nach Erholung</li></ul><h2>TCM begleitend</h2><h3>TCM-Einordnung</h3><p>Chronische Überlastung hält den Sympathikus dauerhaft aktiviert – Kortisol bleibt erhöht, Herzfrequenzvariabilität sinkt, Schlafarchitektur verschlechtert sich. Der Körper verliert die Fähigkeit zur parasympathischen Erholung. Akupunktur aktiviert gezielt den Vagus und kann diese Balance begleitend verschieben.</p><h3>TCM-Diagnostik</h3><ul><li>Schlafmuster: Ein-, Durchschlafen, Traumqualität?</li><li>Körperliche Spannungslokalisation: Nacken, Kiefer, Brust?</li><li>Verdauung: Appetit, Blähungen, Verstopfung?</li><li>Emotionale Situation und Stressniveau</li><li>Psychotherapeutische Begleitung vorhanden?</li></ul><h3>Wie wir dich begleiten</h3><ul><li><strong>Akupunktur</strong> – parasympathische Aktivierung, Schlafverbesserung, Spannungsreduktion; Herz- und Nierenpunkte klassisch</li><li><strong>Kräuterformeln</strong> – Gui Pi Tang (Erschöpfung, Schlaf, mentale Belastung), Suan Zao Ren Tang (Schlaflosigkeit, Unruhe) – nach psychiatrischer Absprache</li><li><strong>Keine Aktivierungsversprechen</strong> – Pacing und Erholung als Alltagsempfehlung</li></ul><h3>Wann TCM sinnvoll sein kann</h3><ul><li>Bei körperlicher Erschöpfung und Schlafstörungen als Hauptthema</li><li>Begleitend zur Psychotherapie</li><li>In der Stabilisierungsphase nach akuter Krise</li><li>Bei vegetativer Anspannung ohne psychischen Notfall</li></ul>",
    "faqs": [],
    "related": [
      {
        "slug": "schlafstoerungen",
        "label": "Schlafstörungen"
      },
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "kraeutertherapie",
        "label": "Kräutertherapie"
      }
    ]
  },
  {
    "slug": "schlafstoerungen",
    "name": "Schlafstörungen",
    "title": "Schlafstörungen: Ursachen erkennen, gezielt behandeln und wieder schlafen",
    "metaDesc": "Schlafstörungen behandeln Schweiz – Akupunktur bei Einschlaf- und Durchschlafproblemen, Kräutertherapie, TCM. Praxen in Zürich, Winterthur, Frauenfeld und der ganzen Schweiz.",
    "conditionName": "Schlafstörungen",
    "lead": "Ein- und Durchschlafprobleme, unruhiger Schlaf – Akupunktur und TCM helfen.",
    "bodyHtml": "<h2>Schlafstörungen – warum sie entstehen und was dagegen zu tun ist</h2><p><strong>Schlafstörungen</strong> (Insomnien) sind keine Schwäche, sondern oft das Ergebnis von Nervensystem-Überlastung, chronischem Stress und gestörten Erholungsmustern. Wenn der Körper abends nicht abschalten kann, liegt das meist daran, dass das Stresssystem tagsüber dauerhaft aktiviert war.</p><p>TCM betrachtet Schlaf als Regenerationsprozess, der dann gestört ist, wenn Körper und Nervensystem am Abend nicht abschalten können – ein realistisches, praxisnahes Verständnis.</p><h2>Typische Beschwerden</h2><div class=\"cp-sx-grid\"><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Einschlafprobleme – Gedankenkreisen, Anspannung, innere Unruhe</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Durchschlafstörungen – mehrfaches Erwachen, schwer wieder einschlafen</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Frühes Erwachen – 3–5 Uhr, nicht mehr einschlafen</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Unruhige Nächte, lebhafte oder belastende Träume</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Müdigkeit trotz ausreichend langer Schlafdauer</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Erschöpfung und Konzentrationsprobleme tagsüber</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Gereiztheit und reduzierte Stresstoleranz</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Herzklopfen oder innere Unruhe beim Einschlafen</div></div><h2>Häufige Auslöser</h2><ul><li><strong>Stress und Überlastung:</strong> Häufigster Auslöser – das Stresssystem bleibt auch abends aktiv.</li><li><strong>Grübeln und Sorgen:</strong> Kognitive Übererregung verhindert Abschalten.</li><li><strong>Hormonelle Faktoren:</strong> Zyklusbedingt, perimenopausell, schilddrüsenbedingt.</li><li><strong>Schmerzen und körperliche Beschwerden:</strong> Unterbrechen Schlafphasen.</li><li><strong>Bildschirm und Rhythmusstörungen:</strong> Blaulicht, unregelmässige Schlafzeiten.</li><li><strong>Stimulanzien:</strong> Koffein, Alkohol – oft als Schlafhilfe missbraucht.</li></ul><h2>Wann ärztlich abklären?</h2><ul><li>Schnarchen mit Atemaussetzern – Schlafapnoe-Abklärung (Schlaflabor)</li><li>Starke Tagesmüdigkeit trotz ausreichend Schlaf</li><li>Depressive Symptome oder schwere psychische Belastung</li><li>Anhaltende Schlafprobleme über mehr als 4 Wochen</li></ul><h2>Schulmedizinische Behandlung</h2><ul><li><strong>Kognitive Verhaltenstherapie für Insomnie (KVT-I):</strong> Goldstandard – wirksamer als Schlafmittel langfristig.</li><li><strong>Schlafhygiene:</strong> Rhythmus, Raumtemperatur, Bildschirmverzicht.</li><li><strong>Schlafmittel:</strong> Nur kurzzeitig – keine Langzeitlösung.</li><li><strong>Schlafapnoe-Therapie (CPAP):</strong> Bei nachgewiesener Apnoe.</li></ul><h2>TCM – hier besonders wirksam</h2><h3>Wie wir die Situation einordnen</h3><p>In der TCM werden Schlafstörungen nach Muster unterschieden: Einschlafprobleme oft durch Leber-Qi-Stauung und vegetative Übererregung, Durchschlafstörungen durch Herz-Yin-Mangel oder Hitze-Störungen, frühes Erwachen durch Leber- oder Gallenblasenmuster. Modern formuliert: Nervensystem-Überlastung, chronische Erschöpfung und Stressachsen-Dysregulation.</p><h3>Was wir in der Praxis erheben</h3><ul><li>Einschlafen, Durchschlafen oder frühes Erwachen?</li><li>Grübeln, Anspannung, Herzrasen beim Einschlafen?</li><li>Stressniveau und emotionale Belastung tagsüber</li><li>Verdauung und Abendessen – Einfluss auf Schlafqualität</li><li>Wärme-/Kälteempfinden, Schweissneigung nachts</li><li>Energielevel morgens und tagsüber</li></ul><h3>Wie wir behandeln</h3><ul><li><strong>Akupunktur</strong> – senkt vegetative Erregbarkeit, reguliert Stressachse, verbessert Schlafqualität</li><li><strong>Kräuterformeln</strong> wie Suan Zao Ren Tang – klassisch bei Schlafstörungen, gut belegt</li><li><strong>Moxibustion</strong> bei kälteassoziierten Schlafstörungen und Erschöpfung</li><li><strong>Tuina am Rücken und Nacken</strong> – Entspannung vor dem Schlafen</li><li><strong>Abend-Empfehlungen</strong> – alltagstaugliche Rituale zur Schlafvorbereitung</li></ul><h3>Wann TCM bei Schlafstörungen besonders sinnvoll ist</h3><ul><li>Bei stressbedingten Einschlaf- und Durchschlafproblemen</li><li>Bei innerer Unruhe und vegetativer Überlastung</li><li>Als Ergänzung zu KVT-I und Schlafhygiene</li><li>Wenn Schlafmittel vermieden oder abgesetzt werden sollen</li></ul>",
    "faqs": [
      {
        "q": "Hilft TCM bei Schlafstörungen?",
        "a": "Die TCM kann Ein- und Durchschlafprobleme begleitend angehen, oft mit Akupunktur und, wenn passend, chinesischen Kräutern. Studien deuten auf eine beruhigende Wirkung hin, ein Erfolg lässt sich aber nicht versprechen. Wir schauen dabei auf Schlafrhythmus, Stress und Alltag statt nur auf das einzelne Symptom."
      },
      {
        "q": "Wie geht die TCM bei Schlafproblemen vor?",
        "a": "Statt nur den Schlaf zu betrachten, nehmen wir Stress, Verdauung und Tagesrhythmus mit in den Blick. Behandelt wird meist mit Akupunktur, ergänzend mit Kräutern und Hinweisen zu Abendroutine und Bildschirmzeit. Ziel ist, den Schlaf über mehrere Wochen ruhiger werden zu lassen."
      },
      {
        "q": "Wie viele Sitzungen brauche ich bei Schlafstörungen?",
        "a": "Das ist individuell und hängt davon ab, wie lange die Probleme schon bestehen. Häufig sind es mehrere Sitzungen über einige Wochen, oft etwa einmal pro Woche. Nach den ersten Terminen bespricht deine Therapeutin mit dir, wie es weitergeht und ob eine Anpassung sinnvoll ist."
      },
      {
        "q": "Übernimmt die Krankenkasse die Behandlung?",
        "a": "Bei EMR- oder ASCA-anerkannten Therapeutinnen beteiligen sich viele Zusatzversicherungen mit 80 bis 100 Prozent. Die Grundversicherung deckt es nicht. Prüfe am besten vorab deine Police oder frag uns direkt, wir sagen dir dann, worauf du bei der Abrechnung und der Wahl einer anerkannten Therapeutin achten solltest."
      },
      {
        "q": "Ist Akupunktur bei Schlafstörungen sicher?",
        "a": "Bei fachgerechter Anwendung mit sterilen Einwegnadeln gilt Akupunktur als risikoarm. Möglich sind selten kleine blaue Flecken an der Einstichstelle. Anhaltende oder plötzlich starke Schlafprobleme solltest du zusätzlich ärztlich abklären lassen, da eine körperliche Ursache dahinterstecken kann. Die TCM ersetzt diese Abklärung nicht."
      }
    ],
    "related": [
      {
        "slug": "stress-burnout",
        "label": "Stress & Burnout"
      },
      {
        "slug": "menstruationsbeschwerden",
        "label": "Menstruationsbeschwerden"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "kraeutertherapie",
        "label": "Kräutertherapie"
      },
      {
        "slug": "moxibustion",
        "label": "Moxibustion"
      }
    ]
  },
  {
    "slug": "angststoerungen",
    "name": "Angststörungen",
    "title": "Angststörungen – Nervensystem unterstützen mit TCM",
    "metaDesc": "Angststörungen TCM Schweiz – Akupunktur zur Nervenregulation, Schlafverbesserung und Stressabbau. Begleitend zur Psychotherapie. Praxen in Zürich, Winterthur, Frauenfeld.",
    "conditionName": "Angststörungen",
    "lead": "Anhaltende Angst und Sorge, die den Alltag beeinträchtigen – das Nervensystem begleiten.",
    "bodyHtml": "<h2>Was sind Angststörungen?</h2><p>Angst ist eine normale menschliche Reaktion auf Gefahr. Problematisch wird sie, wenn die Angst unverhältnismässig, anhaltend und unkontrollierbar ist – und wenn sie das tägliche Leben einschränkt. Angststörungen sind eine der häufigsten psychischen Erkrankungen: Weltweit betreffen sie etwa 15 % der Menschen.</p><p>Die häufigsten Formen sind die <strong>Generalisierte Angststörung</strong> (GAD – anhaltende, schwer kontrollierbare Sorgen), <strong>Panikstörung</strong> (plötzliche intensive Angstepisoden), <strong>soziale Angststörung</strong> und spezifische Phobien.</p><p><em>Wichtig: Diese Seite bietet Orientierung. Angststörungen erfordern professionelle psychologische oder psychiatrische Begleitung – TCM ist eine ergänzende Unterstützung, kein Ersatz.</em></p><h2>Häufige Begleitsymptome</h2><div class=\"cp-sx-grid\"><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Anhaltende Sorgegedanken, die schwer zu kontrollieren sind</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Körperliche Anspannung, Muskelverspannungen</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Herzrasen, Kurzatmigkeit, Schwindel</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schwitzen, Zittern, Taubheitsgefühl</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schlafstörungen durch Grübeln</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Konzentrations- und Gedächtnissprobleme</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Reizbarkeit und emotionale Erschöpfung</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Vermeidungsverhalten – Situationen werden gemieden</div></div><h2>Mögliche Auslöser und Verstärker</h2><ul><li><strong>Stress und Überlastung:</strong> Chronischer Alltagsstress ist der häufigste Verstärker von Angstsymptomen.</li><li><strong>Schlafmangel:</strong> Schlechter Schlaf destabilisiert die emotionale Regulationsfähigkeit erheblich.</li><li><strong>Koffein und Substanzen:</strong> Koffein, Alkohol und bestimmte Medikamente können Angstsymptome verstärken.</li><li><strong>Frühere Erfahrungen:</strong> Traumata und belastende Kindheitserlebnisse erhöhen die Vulnerabilität.</li><li><strong>Körperliche Erkrankungen:</strong> Schilddrüsenüberfunktion, Herzrhythmusstörungen und andere Erkrankungen können Angstsymptome imitieren.</li></ul><h2>Wann professionelle Unterstützung suchen?</h2><ul><li>Wenn Angst den Alltag, Beruf oder Beziehungen beeinträchtigt</li><li>Wenn Vermeidungsverhalten zunimmt</li><li>Bei Panikattacken – medizinische Abklärung zum Ausschluss körperlicher Ursachen</li><li>Wenn Schlaf dauerhaft gestört und Erschöpfung chronisch ist</li><li>Wenn Gedanken über Selbstverletzung auftreten – sofort Hilfe suchen</li></ul><h2>Behandlungsmöglichkeiten</h2><ul><li><strong>Psychotherapie (KVT):</strong> Kognitive Verhaltenstherapie ist die wirksamste Therapie bei Angststörungen – direkt an Gedanken und Verhaltensmustern arbeitend.</li><li><strong>Medikamente:</strong> SSRIs (Antidepressiva) und Benzodiazepine (kurzfristig) – in Absprache mit Psychiater.</li><li><strong>Entspannungsverfahren:</strong> MBSR, progressive Muskelentspannung, Atemübungen reduzieren die körperliche Anspannung.</li><li><strong>Bewegung:</strong> Regelmässige Ausdauerbewegung hat nachgewiesene angstlösende Wirkung.</li><li><strong>TCM:</strong> Begleitend – Regulation des Nervensystems, Verbesserung von Schlaf und körperlicher Anspannung.</li></ul><h2>Wie kann TCM das Nervensystem unterstützen?</h2><p>TCM behandelt keine psychische Erkrankung direkt – sie kann jedoch das körperliche Substrat von Angstzuständen begleiten: Anspannung, Schlafprobleme, Herzrasen und Erschöpfung.</p><p>In der TCM wird anhaltende Angst und Sorge oft mit einem <strong>Herz-Qi-Mangel</strong>, einem unruhigen <strong>Shen (Geist)</strong> oder einer <strong>Leber-Qi-Stauung</strong> assoziiert.</p><ul><li><strong>Akupunktur</strong> aktiviert das parasympathische Nervensystem, senkt Cortisol und fördert Entspannung</li><li><strong>Kräuterformeln</strong> wie Gui Pi Tang oder An Shen Ding Zhi Wan beruhigen den Geist (Shen) und stärken das Herz-Qi</li><li><strong>Schlafförderung</strong> durch Akupunktur unterbricht den Angst-Schlafmangel-Kreislauf</li></ul><p><em>TCM ist kein Ersatz für Psychotherapie oder psychiatrische Betreuung bei Angststörungen. Sie kann als körperliche Begleitung wertvolle Unterstützung bieten.</em></p><h2>Angststörungen und Lebensqualität</h2><p>Angststörungen sind behandelbare Erkrankungen – kein Charakterfehler und keine Schwäche. Viele Betroffene leiden jahrelang ohne Diagnose. Mit der richtigen Kombination aus Psychotherapie, körperlicher Aktivität und begleitender Unterstützung ist eine deutliche Verbesserung möglich.</p>",
    "faqs": [
      {
        "q": "Behandelt TCM Angststörungen?",
        "a": "TCM behandelt Angststörungen nicht direkt – das ist Aufgabe der Psychotherapie. TCM kann jedoch körperliche Begleitsymptome wie Anspannung, Schlafprobleme und Erschöpfung unterstützen und das Nervensystem regulieren."
      },
      {
        "q": "Was ist der Unterschied zwischen normaler Angst und einer Angststörung?",
        "a": "Normale Angst ist eine angemessene Reaktion auf reale Bedrohungen und vergeht. Eine Angststörung ist unverhältnismässig, anhaltend und schwer zu kontrollieren – sie beeinträchtigt den Alltag dauerhaft. Wenn du unsicher bist, ob du eine Angststörung hast: Gespräch mit Hausarzt oder Psychiater."
      },
      {
        "q": "Kann Akupunktur Panikattacken behandeln?",
        "a": "Panikattacken erfordern zuerst eine medizinische Abklärung. Akupunktur kann das vegetative Nervensystem regulieren und das allgemeine Anspannungsniveau senken – was die Häufigkeit von Panikattacken reduzieren kann. Kein Ersatz für KVT oder psychiatrische Betreuung."
      },
      {
        "q": "Welche TCM-Kräuter werden bei Angstzuständen eingesetzt?",
        "a": "Gui Pi Tang (Stärkt Herz und Milz, beruhigt den Geist) und An Shen Ding Zhi Wan sind klassische Formeln bei Unruhe und Schlafproblemen. Die genaue Formel wird individuell abgestimmt – nie selbst medizieren."
      },
      {
        "q": "Kann die Zusatzversicherung die Kosten übernehmen?",
        "a": "Viele Schweizer Zusatzversicherungen erstatten TCM-Behandlungen bei EMR/ASCA-anerkannten Therapeuten. Informiere dich vorab."
      }
    ],
    "related": [
      {
        "slug": "hyperhidrose",
        "label": "Starkes Schwitzen"
      },
      {
        "slug": "stress-burnout",
        "label": "Stress & Burnout"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "kraeutertherapie",
        "label": "Kräutertherapie"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      }
    ]
  },
  {
    "slug": "erschoepfung",
    "name": "Erschöpfung",
    "title": "Erschöpfung: Anhaltende Müdigkeit abklären und Erholung gezielt begleitend unterstützen",
    "metaDesc": "Erschöpfung Schweiz – bleierne Müdigkeit, kein Energie trotz Schlaf: Hausarzt zuerst. Akupunktur und Moxibustion begleitend bei Erschöpfung und Regenerationsdefizit.",
    "conditionName": "Erschöpfung",
    "lead": "Bleierne Müdigkeit trotz Schlaf, kein Energie – Ursache abklären, Erholung begleitend unterstützen.",
    "bodyHtml": "<h2>Erschöpfung – wenn Ausschlafen nicht mehr hilft</h2><p>Neun Stunden geschlafen – und morgens schon wieder müde. Kaffee bringt kurz etwas, dann die Wand. Nachmittags ein Einbruch, den man kaum überbrücken kann. <strong>Erschöpfung</strong> ist nicht Faulheit. Sie ist ein Signal, das ernst genommen werden muss – medizinisch eingeordnet und begleitet.</p><p>TCM kann keine Erschöpfung «beheben». Was konkret begleitend möglich ist: Schlafqualität verbessern, vegetative Erholungsfähigkeit fördern und in der Erholungsphase nach Infekten oder Belastungsphasen unterstützen.</p><h2>Typische Beschwerden</h2><div class=\"cp-sx-grid\"><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Bleierne Müdigkeit – auch nach ausreichend Schlaf</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Einbruch am Nachmittag – Leistung bricht ein</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Konzentrationsprobleme und Brain Fog</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Körperliche Schwäche bei einfachen Aufgaben</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Kältegefühl und reduzierte Widerstandsfähigkeit</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schlecht einschlafen trotz Müdigkeit</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Erholung nach Anstrengung dauert ungewöhnlich lang</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Emotionale Flachheit und Rückzugstendenzen</div></div><h2>Häufige Ursachen – immer abklären</h2><ul><li><strong>Eisenmangel / Ferritinmangel:</strong> Häufigste behebbare Ursache.</li><li><strong>Schilddrüsenunterfunktion:</strong> TSH prüfen – sehr häufig unterschätzt.</li><li><strong>Vitamin-D-Mangel:</strong> Besonders in Wintermonaten.</li><li><strong>Schlafapnoe:</strong> Häufig unerkannt – Screening sinnvoll.</li><li><strong>Depression:</strong> Erschöpfung ist Leitsymptom – psychiatrisch einordnen.</li><li><strong>Post-infektiös:</strong> Nach Grippe, EBV – wochenlange Erholung normal.</li></ul><h2>TCM begleitend</h2><h3>TCM-Einordnung</h3><p>Erschöpfung ist in der TCM ein Milz-Qi- und Nieren-Yang-Muster – modern: mitochondriale Energieproduktion eingeschränkt, HPA-Achsen-Dysregulation nach Langzeitstress, Schlafarchitektur-Störung. Bu Zhong Yi Qi Tang ist die meistuntersuchte TCM-Erschöpfungsformel – belegt bei Post-Chemo-Fatigue und allgemeiner Erschöpfung.</p><h3>TCM-Diagnostik</h3><ul><li>Labor: Ferritin, Schilddrüse, B12, Vitamin D abgeklärt?</li><li>Schlafqualität und Erholungsgefühl</li><li>Kälte- oder Wärmeassoziation</li><li>Stressbelastung und Lebensstil</li></ul><h3>Wie wir dich begleiten</h3><ul><li><strong>Akupunktur</strong> – ST 36, SP 6, BL 23; Erschöpfungsprotokoll; Schlafverbesserung</li><li><strong>Moxibustion</strong> – bei kälteassoziierter tiefer Erschöpfung; ST 36, Ren 4</li><li><strong>Bu Zhong Yi Qi Tang</strong> – nach ärztlicher Freigabe; gut untersucht</li></ul><h3>Wann TCM sinnvoll sein kann</h3><ul><li>Nach Post-Infekt-Erschöpfung (EBV, Grippe) – Erholungsphase</li><li>Bei stressbedingtem Regenerationsdefizit</li><li>Bei Schlafmangel als Hauptverstärker</li><li>Immer erst nach Laborabklärung</li></ul>",
    "faqs": [],
    "related": [
      {
        "slug": "schlafstoerungen",
        "label": "Schlafstörungen"
      },
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "moxibustion",
        "label": "Moxibustion"
      },
      {
        "slug": "kraeutertherapie",
        "label": "Kräutertherapie"
      }
    ]
  },
  {
    "slug": "heuschnupfen",
    "name": "Heuschnupfen",
    "title": "Heuschnupfen – Pollenallergie ganzheitlich begleiten",
    "metaDesc": "Heuschnupfen TCM Schweiz – Akupunktur & Kräutertherapie bei allergischer Rhinitis: Symptomlinderung und Immunmodulation. Praxen in Zürich, Winterthur, Frauenfeld.",
    "conditionName": "Heuschnupfen",
    "lead": "Saisonale Pollenallergie mit Niesen, Augenjucken und Erschöpfung.",
    "bodyHtml": "<h2>Was ist Heuschnupfen?</h2><p>Heuschnupfen – medizinisch <strong>saisonale allergische Rhinitis</strong> – ist eine der häufigsten Allergieerkrankungen: In der Schweiz leiden schätzungsweise 1,5 Millionen Menschen daran. Das Immunsystem reagiert auf harmlose Pollen überschiessend mit einer IgE-vermittelten Entzündungsreaktion – Histamin und andere Botenstoffe werden freigesetzt und verursachen die typischen Symptome.</p><p>Die Hauptsaisons in der Schweiz: <strong>Hasel und Erle</strong> (Januar–März), <strong>Birke</strong> (März–April), <strong>Gräser</strong> (Mai–Juli), <strong>Wermut/Beifuss</strong> (Juli–September). Viele Betroffene reagieren auf mehrere Pollen gleichzeitig.</p><h2>Häufige Symptome</h2><div class=\"cp-sx-grid\"><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Wiederholt Niesen – oft in Schüben</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Laufende, juckende oder verstopfte Nase</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Juckende, gerötete, tränende Augen (allergische Konjunktivitis)</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Kratzen im Rachen oder Gaumen</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Erschöpfung und Konzentrationsprobleme</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schlafstörungen durch verstopfte Nase</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Kopfdruck und Schwere</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Bei Kreuzreaktionen: Mundjucken nach bestimmten Nahrungsmitteln</div></div><h2>Häufige Auslöser und Kreuzreaktionen</h2><ul><li><strong>Baumblütenpollen:</strong> Hasel, Erle, Birke – frühe Saison. Kreuzreaktionen häufig mit Äpfeln, Nüssen und rohem Kernobst.</li><li><strong>Gräser- und Getreidepollen:</strong> Häufigster Auslöser in der Schweiz. Mai bis Juli – Hauptbelastungszeit.</li><li><strong>Kräuterpollen:</strong> Beifuss, Ambrosia – Spätsommer. Ambrosia ist besonders potent.</li><li><strong>Innendust-Mischung:</strong> Hausstaubmilben und Tierhaare verursachen ganzjährige (perenniale) allergische Rhinitis.</li><li><strong>Luftverschmutzung:</strong> Verstärkt die allergische Reaktion erheblich – besonders in Städten.</li></ul><h2>Wann abklären lassen?</h2><ul><li>Zur Allergenidentifikation: Pricktest oder spezifisches IgE beim Allergologen</li><li>Bei Verdacht auf allergisches Asthma: Pfeifgeräusche, Atemnot, Engegefühl</li><li>Wenn Antihistaminika keine ausreichende Wirkung zeigen</li><li>Zur Abklärung einer Hyposensibilisierung (SCIT/SLIT) – einzige kausale Therapie</li></ul><h2>Was kann helfen?</h2><ul><li><strong>Antihistaminika:</strong> Cetirizin, Loratadin, Bilastin – reduzieren Niesen, Jucken und Fliessen effektiv.</li><li><strong>Nasenkortikoide:</strong> Lokal wirkende Kortisonnasenpräparate – sehr wirksam bei Dauersymptomen.</li><li><strong>Hyposensibilisierung (SIT):</strong> Einzige kausal wirksame Therapie – Allergenextrakt über 3 Jahre aufgebaut.</li><li><strong>Pollenfilter und Hygiene:</strong> Pollenflugdaten nutzen, Fenster zu Stosszeiten schliessen, nach draussen duschen.</li><li><strong>TCM:</strong> Ergänzend – Symptomlinderung in der Saison und Immunmodulation langfristig.</li></ul><h2>Kann TCM bei Heuschnupfen unterstützen?</h2><p>In der TCM wird allergische Rhinitis als Zeichen einer <strong>geschwächten Lungen-Wei-Qi (Schutzenergie)</strong> und einer <strong>Milz-Schwäche</strong> betrachtet – das Immunsystem reagiert übermässig auf äussere Einflüsse, weil die innere Abwehr nicht ausreichend stabilisiert ist.</p><ul><li><strong>Akupunktur</strong> moduliert die Immunreaktion, senkt die Histaminausschüttung und lindert Nasenschleimhautentzündung</li><li><strong>Kräuterformeln</strong> wie Yu Ping Feng San (Jade-Windschutz-Formel) stärken das Wei-Qi und reduzieren die Überempfindlichkeit – idealerweise 4–6 Wochen vor der Saison begonnen</li><li><strong>Saisonale Behandlung</strong> in der akuten Pollensaison zur Symptomreduktion</li></ul><p><em>TCM ist keine Allergen-Immuntherapie – sie kann Symptome lindern und die Belastungsphase verbessern, aber nicht die Allergie selbst beseitigen.</em></p><h2>Heuschnupfen und Lebensqualität</h2><p>Heuschnupfen klingt harmlos – aber wer wochenlang schläft, arbeitet und lebt mit dauerndem Niesen, Jucken und Erschöpfung weiss: Er kann die Lebensqualität erheblich beeinträchtigen. Konzentration, Schlaf und Leistungsfähigkeit leiden in der Pollensaison messbar. Eine ganzheitliche Strategie aus schulmedizinischer Symptomkontrolle und TCM-Immunmodulation kann die Saison deutlich erträglicher machen.</p>",
    "faqs": [
      {
        "q": "Wann ist der beste Zeitpunkt für eine TCM-Behandlung bei Heuschnupfen?",
        "a": "Idealerweise 4–6 Wochen vor der erwarteten Pollensaison mit einer Kräuterformel (Yu Ping Feng San) beginnen und präventiv Akupunktur machen. In der akuten Saison hilft Akupunktur zur Symptomlinderung. Eine Kombination ist wirksamer als nur während der Symptome zu behandeln."
      },
      {
        "q": "Kann Akupunktur Heuschnupfen heilen?",
        "a": "Nein – Akupunktur heilt keine Allergie. Sie kann jedoch die Symptome in der Pollensaison deutlich lindern und das Immunsystem langfristig stabilisieren. Studien zeigen messbare Verbesserungen bei Symptomscores und Medikamentenbedarf."
      },
      {
        "q": "Was ist eine Hyposensibilisierung und sollte ich sie machen?",
        "a": "Die Hyposensibilisierung (spezifische Immuntherapie, SIT) ist die einzige kausal wirksame Therapie bei Allergie. Über 3 Jahre werden steigende Mengen des Allergenextrakts verabreicht – das Immunsystem lernt Toleranz. Sehr wirksam, aber zeitintensiv. Entscheidung mit Allergologen."
      },
      {
        "q": "Sind Antihistaminika und TCM kombinierbar?",
        "a": "Ja – Antihistaminika und TCM lassen sich gut kombinieren. TCM kann den Antihistaminika-Bedarf reduzieren und die Restbeschwerden behandeln. Bitte informiere deinen TCM-Therapeuten über alle Medikamente."
      },
      {
        "q": "Kann die Zusatzversicherung die Kosten übernehmen?",
        "a": "Viele Schweizer Zusatzversicherungen erstatten TCM-Behandlungen bei EMR/ASCA-anerkannten Therapeuten. Informiere dich vorab bei deiner Kasse."
      }
    ],
    "related": [
      {
        "slug": "stress-burnout",
        "label": "Stress & Burnout"
      },
      {
        "slug": "kopfschmerzen",
        "label": "Kopfschmerzen"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "kraeutertherapie",
        "label": "Kräutertherapie"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      }
    ]
  },
  {
    "slug": "allergien-heuschnupfen",
    "name": "Allergien & Heuschnupfen",
    "title": "Allergien & Heuschnupfen: Saisonale Reizsymptome erkennen und gezielt begleiten",
    "metaDesc": "Akupunktur bei Heuschnupfen Schweiz – Allergien, laufende Nase, juckende Augen, saisonale Beschwerden. TCM-Begleitung bei Heuschnupfen in der ganzen Schweiz.",
    "conditionName": "Allergien & Heuschnupfen",
    "lead": "Heuschnupfen, saisonale Reizsymptome – Akupunktur als begleitende Unterstützung.",
    "bodyHtml": "<h2>Heuschnupfen und Allergien – wenn die Pollensaison zum Problem wird</h2><p><strong>Heuschnupfen</strong> ist eine IgE-vermittelte Überempfindlichkeitsreaktion auf Pollen, Gräser oder andere Allergene. Das Immunsystem reagiert überschiessend auf harmlose Substanzen – die Schleimhäute entzünden sich, die Nase läuft, die Augen jucken. Saisonale Belastungsspitzen (März bis August je nach Pollen) machen Alltag und Schlaf zur Herausforderung.</p><p>TCM und Akupunktur können die Beschwerdelast der Pollensaison begleitend reduzieren – nicht als Ersatz für Antihistaminika, aber als wirksame Ergänzung.</p><h2>Typische Symptome</h2><div class=\"cp-sx-grid\"><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Häufiges Niesen – in Serie, saisonbedingt</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Laufende oder verstopfte Nase</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Juckende, tränende, gerötete Augen</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Druckgefühl in Stirn und Nebenhöhlen</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Juckreiz an Gaumen, Rachen, Ohren</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Saisonale Erschöpfung und Müdigkeit</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Reizbarkeit und Konzentrationsprobleme</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schlafprobleme durch Nasenatmungsbehinderung</div></div><h2>Häufige Auslöser</h2><ul><li><strong>Baumblüte:</strong> Birke, Hasel, Erle – Hauptbelastung März–Mai.</li><li><strong>Gräserpollen:</strong> Juni–August – häufigste Pollenallergie der Schweiz.</li><li><strong>Kräuterpollen:</strong> Beifuss, Ambrosia – Juli–Oktober.</li><li><strong>Hausstaub:</strong> Ganzjährig – Milbenallergene.</li><li><strong>Kreuzreaktionen:</strong> Bestimmte Lebensmittel können bei Pollenallergikern reagieren.</li></ul><h2>Wann ärztlich / allergologisch abklären?</h2><ul><li>Bei Atemnot oder Engegefühl in der Brust – immer sofort</li><li>Bei ganzjährigen oder unklaren Beschwerden</li><li>Bei schwerer Alltagsbeeinträchtigung durch Allergie</li><li>Bei Verdacht auf Asthma oder allergisches Asthma</li><li>Zur Spezifischen Immuntherapie (SIT) – langfristig wirksam</li></ul><h2>Schulmedizinische Behandlung</h2><ul><li><strong>Antihistaminika:</strong> H1-Blocker – rasche Symptomlinderung.</li><li><strong>Kortison-Nasenspray:</strong> Wirksam gegen nasale Allergiebeschwerden.</li><li><strong>Augentropfen:</strong> Antiallergische Tropfen bei Augensymptomen.</li><li><strong>Spezifische Immuntherapie (SIT/SCIT/SLIT):</strong> Desensibilisierung – langfristig kurativer Ansatz.</li><li><strong>Allergenkarenz:</strong> Exposition reduzieren, Pollenradar nutzen, Wohnraumfilter.</li></ul><h2>TCM begleitend – substanzieller Ansatz</h2><h3>Wie wir die Situation einordnen</h3><p>In der TCM wird Heuschnupfen als saisonale Reaktion auf eine erhöhte Schleimhautreizlage betrachtet – verstärkt durch Schlafmangel, Stress und vegetative Überlastung. TCM setzt an der Schleimhautregulation, der Nasennebenhöhlenentlastung und der allgemeinen Reizbarkeit an.</p><h3>Was wir in der Praxis erheben</h3><ul><li>Saisonverlauf – wann Beginn, welche Trigger?</li><li>Nase, Augen, Nebenhöhlen – Schwerpunkt der Beschwerden</li><li>Schlafqualität in der Pollensaison</li><li>Erschöpfung, Müdigkeit und Reizbarkeit</li><li>Verdauung und allgemeine Belastbarkeit</li></ul><h3>Wie wir behandeln</h3><ul><li><strong>Gezielte Akupunktur</strong> an Nasennebenhöhlen- und Augenpunkten – reduziert Schleimhautreizung und Juckreiz</li><li><strong>Präsaisonale Behandlung</strong> – 4–6 Wochen vor Pollenstart zur Vorbereitung</li><li><strong>Kräuterformeln</strong> wie Xin Yi San oder Bi Yuan Wan – bei Nasenverstopfung und Schleimhautreizung</li><li><strong>Alltagsempfehlungen</strong> zu Pollenzeiten, Schlaf und Nasenpflege</li></ul><h3>Wann TCM besonders sinnvoll ist</h3><ul><li>Bei wiederkehrendem, saisonalem Heuschnupfen</li><li>Bei unzureichender Wirkung von Antihistaminika allein</li><li>Begleitend zur Immuntherapie</li><li>Wenn Erschöpfung und Schlaf zusätzlich belasten</li></ul>",
    "faqs": [],
    "related": [
      {
        "slug": "stress-burnout",
        "label": "Stress & Burnout"
      },
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "kraeutertherapie",
        "label": "Kräutertherapie"
      },
      {
        "slug": "moxibustion",
        "label": "Moxibustion"
      }
    ]
  },
  {
    "slug": "verdauungsprobleme",
    "name": "Verdauungsprobleme",
    "title": "Verdauungsprobleme mit TCM behandeln",
    "metaDesc": "Verdauungsprobleme TCM Schweiz – Reizdarm, Blähungen & Unverträglichkeiten ganzheitlich behandeln. Praxen in Zürich, Winterthur, Rorschach.",
    "conditionName": "Verdauungsprobleme",
    "lead": "Reizdarm, Blähungen, Unverträglichkeiten ohne klare Ursache.",
    "bodyHtml": "<h2>Wenn der Darm aus dem Gleichgewicht gerät</h2><p>Blähungen, Reizdarm, Durchfall, Verstopfung oder Nahrungsmittelunverträglichkeiten – Verdauungsprobleme schränken die Lebensqualität massiv ein. Oft finden konventionelle Untersuchungen keine klare Ursache. TCM sieht diese Beschwerden als Störung der Milz-Magen-Energie und behandelt sie ganzheitlich.</p><h2>TCM bei Verdauungsbeschwerden</h2><ul><li>Akupunktur reguliert die Darmmotilität und reduziert Entzündungen</li><li>Kräuterformeln – individuell auf dein Beschwerdebild abgestimmt – stärken die Verdauungskraft</li><li>Moxibustion wärmt bei Kälteschmerzen und Darmkrämpfen</li><li>Ernährungsberatung nach TCM-Prinzipien</li></ul>",
    "faqs": [],
    "related": [
      {
        "slug": "morbus-crohn",
        "label": "Morbus Crohn"
      },
      {
        "slug": "stress-burnout",
        "label": "Stress & Burnout"
      },
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      }
    ],
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
      }
    ]
  },
  {
    "slug": "tinnitus",
    "name": "Tinnitus",
    "title": "Tinnitus – Symptome, Ursachen & TCM Begleitung",
    "metaDesc": "Tinnitus TCM Schweiz – Akupunktur & Kräutertherapie bei Tinnitus: Intensität reduzieren, Stress behandeln. Praxen in Zürich, Winterthur, Frauenfeld.",
    "conditionName": "Tinnitus",
    "lead": "Pfeifen, Rauschen oder Klingeln ohne äussere Ursache – akut und chronisch.",
    "bodyHtml": "<h2>Was ist Tinnitus?</h2><p>Tinnitus bezeichnet die Wahrnehmung von Geräuschen – Pfeifen, Klingeln, Rauschen, Summen oder Zischen – ohne entsprechende äussere Schallquelle. Er ist keine Erkrankung, sondern ein Symptom, das viele unterschiedliche Ursachen haben kann. Schätzungsweise 15 % der Bevölkerung in der Schweiz leiden unter Tinnitus, für 1–3 % ist er stark belastend.</p><p>Man unterscheidet <strong>akuten Tinnitus</strong> (unter 3 Monate) und <strong>chronischen Tinnitus</strong> (über 3 Monate). Der akute Tinnitus reagiert deutlich besser auf Behandlung.</p><h2>Häufige Symptome</h2><div class=\"cp-sx-grid\"><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Pfeifen, Klingeln, Summen oder Rauschen ohne äussere Ursache</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Einseitig oder beidseitig – Lautstärke variabel</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Kontinuierlich oder intermittierend</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Oft begleitet von Schlafstörungen und Konzentrationsproblemen</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Stressverstärkung: Tinnitus lauter bei Anspannung und Erschöpfung</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Kombination mit Hörminderung (z.B. nach Hörsturz)</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schwindel bei Morbus Menière</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Psychische Belastung: Angst, Depressivität bei chronischem Verlauf</div></div><h2>Mögliche Ursachen</h2><ul><li><strong>Lärm und akustisches Trauma:</strong> Konzerte, Knall, Arbeitslärm – Haarzellen im Innenohr werden geschädigt.</li><li><strong>Hörsturz:</strong> Plötzlicher einseitiger Hörverlust oft mit gleichzeitigem Tinnitus. → </li><li><strong>Stress und psychische Belastung:</strong> Einer der häufigsten Auslöser und Verstärker – Tinnitus und Stress bedingen sich gegenseitig.</li><li><strong>Altersbedingter Hörverlust (Presbyakusis):</strong> Das Gehirn kompensiert fehlende Frequenzen durch Eigensignale.</li><li><strong>Morbus Menière:</strong> Endolymph-Druckstörung im Innenohr mit Tinnitus, Schwindel und fluktuierendem Hörverlust.</li><li><strong>Nacken- und Kieferprobleme:</strong> Myofasziale Spannungen, CMD, HWS-Blockierungen können Tinnitus auslösen.</li><li><strong>Medikamente:</strong> Aspirin in hohen Dosen, bestimmte Antibiotika, Schleifendiuretika.</li></ul><h2>Wann zum HNO-Arzt?</h2><ul><li><strong>Sofort:</strong> Plötzlicher einseitiger Tinnitus mit Hörminderung – möglicher Hörsturz</li><li><strong>Zeitnah:</strong> Neu aufgetretener Tinnitus ohne offensichtliche Ursache</li><li><strong>Bei Begleitsymptomen:</strong> Schwindel, Hörminderung, Druckgefühl im Ohr</li><li><strong>Bei starker Belastung:</strong> Wenn Tinnitus Schlaf, Arbeit oder Alltag massiv beeinträchtigt</li></ul><h2>Behandlungsmöglichkeiten</h2><ul><li><strong>Akuter Tinnitus:</strong> Kortison (IV oder oral) und durchblutungsfördernde Infusionen in der Akutphase.</li><li><strong>Tinnitus Retraining Therapy (TRT):</strong> Habituation durch Geräuschtherapie und Counseling.</li><li><strong>Hörgeräte:</strong> Bei begleitender Hörminderung verbessernd.</li><li><strong>Stressmanagement:</strong> Entspannungsverfahren, Biofeedback, MBSR reduzieren die Tinnituswahrnehmung.</li><li><strong>TCM:</strong> Akupunktur und Kräutertherapie begleitend – besonders bei stressbedingtem und chronischem Tinnitus.</li></ul><h2>Kann TCM bei Tinnitus unterstützen?</h2><p>In der TCM wird Tinnitus als Symptom einer <strong>Nierenenergie-Schwäche</strong> (die Niere «öffnet sich» im Ohr) oder einer <strong>Leber-Feuer-Aufstiege</strong> (durch Stress und emotionale Belastung) verstanden. Beide Muster sind häufig – und oft kombiniert.</p><ul><li><strong>Akupunktur</strong> reguliert das Nervensystem, reduziert Stress und verbessert die Durchblutung im Innenohr-Bereich</li><li><strong>Kräuterformeln</strong> wie Er Long Zuo Ci Wan stärken Nieren-Yin und werden klassisch bei Tinnitus eingesetzt</li><li><strong>Stressreduktion</strong> durch Akupunktur unterbricht den Tinnitus-Stress-Kreislauf</li></ul><p><em>TCM verspricht keine Heilung des Tinnitus – sie kann jedoch die Intensität, Frequenz und den emotionalen Umgang verbessern. Bei akutem Tinnitus zuerst HNO-Arzt.</em></p><h2>Tinnitus und Lebensqualität</h2><p>Chronischer Tinnitus ist mehr als ein Geräusch – er kann Schlaf, Konzentration und emotionale Balance dauerhaft belasten. Viele Betroffene berichten von einem Kreislauf aus Tinnitus, Stress und Schlafproblemen. Ein ganzheitlicher Ansatz, der Nervensystem und Hörverarbeitung gleichermassen anspricht, kann spürbare Erleichterung bringen.</p>",
    "faqs": [
      {
        "q": "Kann Tinnitus von alleine verschwinden?",
        "a": "Akuter Tinnitus (unter 3 Monate) kann spontan abklingen oder auf Behandlung ansprechen. Chronischer Tinnitus (über 3 Monate) ist in der Regel dauerhaft – jedoch lässt sich die Wahrnehmung und Belastung durch Habituation, TCM und Stressmanagement deutlich reduzieren."
      },
      {
        "q": "Wie hängen Tinnitus und Stress zusammen?",
        "a": "Stress verstärkt die Tinnitus-Wahrnehmung erheblich – und der Tinnitus selbst verursacht Stress. Diesen Kreislauf zu unterbrechen ist therapeutisch zentral. Akupunktur, Entspannungsverfahren und Schlafhygiene helfen dabei nachweislich."
      },
      {
        "q": "Was ist der Unterschied zwischen Tinnitus und Hörsturz?",
        "a": "Hörsturz ist ein plötzlicher Hörverlust auf einem Ohr – oft begleitet von Tinnitus und Schwindel. Er ist ein medizinischer Notfall. Tinnitus ohne Hörverlust kann viele andere Ursachen haben. → Mehr unter: Hörsturz"
      },
      {
        "q": "Wie viele Akupunktursitzungen brauche ich bei Tinnitus?",
        "a": "Bei chronischem Tinnitus empfehlen wir eine Serie von 10–12 Sitzungen über 8–10 Wochen. Kräuterformeln können ergänzend eingesetzt werden. Erste Verbesserungen zeigen sich oft nach 4–6 Sitzungen."
      },
      {
        "q": "Kann die Zusatzversicherung die Kosten übernehmen?",
        "a": "Viele Schweizer Zusatzversicherungen erstatten TCM-Behandlungen bei EMR/ASCA-anerkannten Therapeuten. Informiere dich vorab bei deiner Kasse."
      }
    ],
    "related": [
      {
        "slug": "kieferschmerzen",
        "label": "Kieferschmerzen"
      },
      {
        "slug": "stress-burnout",
        "label": "Stress & Burnout"
      },
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "kraeutertherapie",
        "label": "Kräutertherapie"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      }
    ]
  },
  {
    "slug": "gewichtsmanagement",
    "name": "Gewichtsmanagement",
    "title": "Gewichtsmanagement: Essverhalten, Stress und Körpergewicht nachhaltig begleiten",
    "metaDesc": "Gewichtsmanagement Schweiz – Akupunktur bei Übergewicht: Essverhalten regulieren, Heisshunger reduzieren, Stress und Lebensrhythmus begleiten. TCM ganzheitlich.",
    "conditionName": "Gewichtsmanagement",
    "lead": "Nachhaltige Gewichtsregulation – Essverhalten, Stress und Lebensrhythmus begleiten.",
    "bodyHtml": "<h2>Gewichtsmanagement – warum schnelle Lösungen selten funktionieren</h2><p>Gewicht ist selten nur eine Frage der Kalorienbilanz. Chronischer Stress erhöht Kortisol – und Kortisol fördert Fetteinlagerung und Heisshunger auf kalorienreiche Nahrung. Schlafmangel senkt Leptin (Sättigungshormon) und erhöht Ghrelin (Hungerhormon). Emotionales Essen hat oft eine vegetative Komponente, die sich durch reine Willenskraft nicht auflösen lässt.</p><p>TCM setzt an diesen Begleitfaktoren an – nicht an der Waage direkt. Die Akupunktur «verbrennt kein Fett». Sie kann aber dabei unterstützen, Stressreaktionen zu reduzieren, Essrituale zu stabilisieren und den Schlaf zu verbessern – Faktoren, die Gewicht real beeinflussen.</p><h2>Typische Muster</h2><div class=\"cp-sx-grid\"><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Heisshunger unter Stress – auf Süsses, Salziges, Schnelles</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Emotionales Essen – als Entspannungs- oder Trostreaktion</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Fehlende Sättigung nach den Mahlzeiten</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Energieeinbrüche am Nachmittag – greifen nach Süssem</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Träge Verdauung, Blähungen, Völlegefühl</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schlechter Schlaf – Gewichtszunahme trotz gleichem Essen</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Jojo-Muster – Erfolge halten nicht an</div><div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Gewichtszunahme in Stressphasen</div></div><h2>Wann ärztlich abklären?</h2><ul><li>Starke, ungewollte Gewichtszunahme ohne erkennbare Ursache</li><li>Verdacht auf Schilddrüsenunterfunktion – TSH-Kontrolle</li><li>Hormonelle Erkrankungen (PCOS, Cushing, Insulinresistenz)</li><li>Verdacht auf Essstörung – immer professionelle Einordnung</li></ul><h2>TCM begleitend</h2><h3>Wie wir die Situation einordnen</h3><p>Gewichtsprobleme werden in der TCM häufig im Zusammenhang mit geschwächter Milz-Magen-Funktion (Verdauung), Leber-Qi-Stauung (Stress) und Feuchtigkeit-Ansammlung betrachtet – ohne esoterischen Hauptanspruch. Modern: Stress, Schlaf und Verdauungsrhythmus sind real beeinflussbar.</p><h3>Was wir in der Praxis erheben</h3><ul><li>Hunger- und Sättigungsmuster im Tagesverlauf</li><li>Esssituationen und emotionale Trigger</li><li>Stressniveau und Alltagsbelastung</li><li>Verdauung, Blähungen, Rhythmus</li><li>Schlafqualität und Energieverlauf</li></ul><h3>Wie wir begleiten</h3><ul><li><strong>Akupunktur</strong> – Stressreduktion, Verdauungsbegleitung, Schlafverbesserung als indirekte Gewichtseinflüsse</li><li><strong>Kräuterformeln</strong> – bei Verdauungsschwäche und Feuchtigkeit-Mustern individuell</li><li><strong>Ernährungs- und Rhythmusimpulse</strong> nach TCM-Prinzipien – als Ergänzung zu Ernährungsberatung</li></ul><p><em>TCM ersetzt keine Ernährungsberatung oder Bewegungsprogramm. Sie begleitet die inneren Faktoren – Stress, Schlaf, Verdauung – die Gewicht real mitbeeinflussen.</em></p>",
    "faqs": [],
    "related": [
      {
        "slug": "schlafstoerungen",
        "label": "Schlafstörungen"
      },
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "kraeutertherapie",
        "label": "Kräutertherapie"
      },
      {
        "slug": "moxibustion",
        "label": "Moxibustion"
      }
    ]
  },
  {
    "slug": "fazialisparese",
    "name": "Fazialisparese",
    "title": "Fazialisparese: Gesichtslähmung richtig einordnen und begleiten",
    "metaDesc": "Fazialisparese und Bell-Parese: Symptome, dringende Abklärung, Augenschutz und Behandlung. TCM.ch erklärt, wann Akupunktur ergänzend infrage kommen kann.",
    "conditionName": "Fazialisparese",
    "lead": "Plötzlich hängt eine Gesichtshälfte oder das Auge lässt sich nicht richtig schliessen. Eine neue Gesichtslähmung gehört zuerst medizinisch abgeklärt.",
    "bodyHtml": "<h2>Was ist eine Fazialisparese?</h2> <p>Bei einer <strong>Fazialisparese</strong> ist der Gesichtsnerv beeinträchtigt. Dadurch können Muskeln einer Gesichtshälfte plötzlich schwächer werden oder sich kaum noch bewegen. Mundwinkel und Augenlid können hängen, das Auge lässt sich möglicherweise nicht vollständig schliessen, und auch Geschmack, Tränenfluss oder Geräuschempfindlichkeit können verändert sein.</p><p>Eine häufige Form ist die sogenannte <strong>idiopathische Fazialisparese oder Bell-Parese</strong>. Sie wird erst dann angenommen, wenn andere Ursachen der Gesichtslähmung ausgeschlossen wurden. Deshalb sollte eine neu aufgetretene Gesichtsschwäche nicht selbst diagnostiziert werden.</p><h2>Typische Beschwerden</h2> <div class=\"cp-sx-grid\"> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Plötzlich hängender Mundwinkel auf einer Seite</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Ein Auge lässt sich nicht vollständig schliessen</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schwierigkeiten beim Lächeln, Pfeifen oder Stirnrunzeln</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Veränderter Geschmack</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Trockenes oder tränendes Auge</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Empfindlichkeit gegenüber lauten Geräuschen</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Beschwerden beim Essen oder Trinken</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schmerzen im Bereich hinter oder um das Ohr möglich</div> </div><h2>Neue Gesichtslähmung: zuerst medizinisch abklären</h2> <p>Eine plötzlich hängende Gesichtshälfte kann auch bei einem Schlaganfall auftreten. Besonders wenn zusätzlich ein Arm schwach wird, Sprache auffällig ist, Sehstörungen, starke Kopfschmerzen, Gleichgewichtsstörungen oder andere neurologische Symptome auftreten, ist eine sofortige Notfallabklärung notwendig.</p><p>Auch eine isolierte neue Fazialisparese sollte möglichst früh ärztlich beurteilt werden. Bei einer Bell-Parese kann eine früh begonnene Kortisonbehandlung die Heilungschancen verbessern. Kann das Auge nicht vollständig geschlossen werden, muss die Hornhaut vor Austrocknung und Verletzung geschützt werden.</p><h2>Mögliche Ursachen</h2> <ul> <li><strong>Bell-Parese:</strong> häufigste periphere Fazialisparese ohne eindeutig nachweisbare Ursache.</li> <li><strong>Infektionen:</strong> unter anderem Gürtelrose im Ohrbereich oder Borreliose können den Gesichtsnerv betreffen.</li> <li><strong>Entzündliche oder neurologische Erkrankungen:</strong> müssen abhängig vom klinischen Bild ausgeschlossen werden.</li> <li><strong>Verletzungen oder Eingriffe:</strong> können den Gesichtsnerv direkt beeinträchtigen.</li> <li><strong>Zentrale neurologische Ursachen:</strong> beispielsweise ein Schlaganfall müssen bei entsprechenden Zeichen dringend ausgeschlossen werden.</li> </ul><h2>Wie wird eine Fazialisparese behandelt?</h2> <p>Die Behandlung richtet sich nach der Ursache. Bei einer typischen Bell-Parese stehen die frühe medizinische Behandlung und der Schutz des betroffenen Auges im Vordergrund. Bei länger anhaltender Schwäche können spezialisierte Gesichtsrehabilitation, Physiotherapie oder Logopädie sinnvoll sein.</p><p>Bei unvollständiger Erholung können Bewegungen ungewollt miteinander gekoppelt sein. Diese sogenannten Synkinesien sollten gezielt durch erfahrene Fachpersonen behandelt werden.</p><h2>Kann Akupunktur ergänzend eingesetzt werden?</h2> <p>Akupunktur wird bei Fazialisparesen ergänzend angeboten. Die wissenschaftliche Datenlage reicht jedoch nicht aus, um daraus einen Ersatz für die frühe medizinische Behandlung abzuleiten. Vor allem in den ersten Tagen haben ärztliche Diagnostik, Augenschutz und eine gegebenenfalls zeitkritische medikamentöse Behandlung Vorrang.</p><p>Wenn die Diagnose feststeht und die medizinische Behandlung läuft, kann Akupunktur bei einzelnen Betroffenen als ergänzende symptomorientierte Massnahme besprochen werden. Ziel ist dabei nicht, eine Regeneration des Nervs zu versprechen, sondern Beschwerden während des Verlaufs unterstützend zu begleiten.</p><h2>Wann wir nicht zuerst behandeln</h2> <ul> <li>Neu aufgetretene Gesichtslähmung ohne ärztliche Diagnose</li> <li>Zusätzliche Arm- oder Beinschwäche</li> <li>Sprach-, Seh- oder Bewusstseinsstörungen</li> <li>Starke Kopfschmerzen mit neurologischen Ausfällen</li> <li>Rotes, schmerzhaftes oder gefährdetes Auge bei fehlendem Lidschluss</li> </ul>",
    "faqs": [
      {
        "q": "Ist eine Fazialisparese dasselbe wie ein Schlaganfall?",
        "a": "Nein. Eine periphere Fazialisparese wie die Bell-Parese betrifft den Gesichtsnerv. Eine Gesichtslähmung kann aber auch bei einem Schlaganfall auftreten. Deshalb sollte eine plötzlich neue Gesichtsschwäche medizinisch beurteilt werden, besonders wenn weitere neurologische Symptome dazukommen."
      },
      {
        "q": "Warum ist der Augenschutz bei Fazialisparese wichtig?",
        "a": "Wenn das Auge nicht vollständig geschlossen werden kann, trocknet die Hornhaut leichter aus und kann verletzt werden. Ärztlich empfohlene Augentropfen, Salben oder Schutzmassnahmen können deshalb wichtig sein."
      },
      {
        "q": "Wann sollte eine Bell-Parese behandelt werden?",
        "a": "Möglichst früh. Bei einer typischen Bell-Parese kann eine früh begonnene Kortisonbehandlung sinnvoll sein. Eine neue Gesichtslähmung sollte deshalb nicht erst mehrere Tage beobachtet werden, bevor sie abgeklärt wird."
      },
      {
        "q": "Kann Akupunktur eine Fazialisparese heilen?",
        "a": "Das lässt sich nicht versprechen. Die Datenlage zu Akupunktur bei Fazialisparese ist begrenzt. Sie kann nach medizinischer Abklärung ergänzend besprochen werden, ersetzt aber weder die Diagnose noch eine zeitkritische ärztliche Behandlung."
      },
      {
        "q": "Wie lange dauert die Erholung?",
        "a": "Das ist individuell und hängt unter anderem von Ursache und Schweregrad ab. Viele Bell-Paresen bessern sich über Wochen bis Monate. Bei ausbleibender oder unvollständiger Erholung ist eine spezialisierte Verlaufskontrolle sinnvoll."
      }
    ],
    "related": [
      {
        "slug": "trigeminusneuralgie",
        "label": "Trigeminusneuralgie"
      },
      {
        "slug": "hoersturz",
        "label": "Hörsturz"
      },
      {
        "slug": "guertelrose",
        "label": "Gürtelrose"
      },
      {
        "slug": "nervenschmerzen",
        "label": "Nervenschmerzen"
      },
      {
        "slug": "polyneuropathie",
        "label": "Polyneuropathie"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "morbus-meniere",
    "name": "Morbus Menière",
    "title": "Morbus Menière: Drehschwindel, Hörverlust und Tinnitus",
    "metaDesc": "Morbus Menière: anfallsartiger Drehschwindel, Hörminderung, Tinnitus und Ohrdruck. Diagnose und Behandlung gehören in HNO-Hand, TCM kann ergänzend begleiten.",
    "conditionName": "Morbus Menière",
    "lead": "Wiederkehrender Drehschwindel zusammen mit Hörveränderungen, Tinnitus oder Druck im Ohr braucht eine genaue HNO-Abklärung.",
    "bodyHtml": "<h2>Was ist Morbus Menière?</h2> <p><strong>Morbus Menière</strong> ist eine Erkrankung des Innenohrs. Typisch sind wiederkehrende Anfälle von Drehschwindel zusammen mit Hörminderung, Ohrgeräuschen und einem Druck- oder Völlegefühl im betroffenen Ohr.</p><p>Die Beschwerden können sehr belastend sein, weil Schwindelattacken oft plötzlich auftreten. Zwischen den Attacken können Gleichgewicht und Hörvermögen unterschiedlich stark beeinträchtigt bleiben.</p><h2>Typische Beschwerden</h2> <div class=\"cp-sx-grid\"> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Anfallsartiger Drehschwindel</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schwankendes Hörvermögen</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Tinnitus auf dem betroffenen Ohr</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Druck oder Völlegefühl im Ohr</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Übelkeit während einer Schwindelattacke</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Unsicherheit beim Gehen</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Erschöpfung nach stärkeren Attacken</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Alltagsangst vor einer unerwarteten nächsten Attacke</div> </div><h2>Nicht jeder Schwindel ist Morbus Menière</h2> <p>Drehschwindel hat viele mögliche Ursachen. Häufiger als Morbus Menière sind beispielsweise gutartiger Lagerungsschwindel, Kreislaufprobleme oder vestibuläre Migräne. Ein plötzlicher Hörverlust kann wiederum andere Ursachen haben und sollte zeitnah HNO-ärztlich beurteilt werden.</p><p>Die Diagnose Morbus Menière wird deshalb nicht allein anhand eines einzelnen Symptoms gestellt. Entscheidend sind Verlauf, Hörprüfung und die fachärztliche Beurteilung.</p><h2>Wie wird Morbus Menière behandelt?</h2> <p>Es gibt derzeit keine Behandlung, die Morbus Menière zuverlässig heilt. Ziel der konventionellen Therapie ist deshalb, Schwindelattacken zu kontrollieren, Hörprobleme zu begleiten und die Auswirkungen der Erkrankung im Alltag zu reduzieren.</p><ul> <li><strong>Medikamente:</strong> können während akuter Schwindel- und Übelkeitsphasen eingesetzt werden.</li> <li><strong>Hörversorgung:</strong> bei bleibender Hörminderung können Hörhilfen sinnvoll sein.</li> <li><strong>Vestibuläre Rehabilitation:</strong> kann bei anhaltender Gleichgewichtsunsicherheit unterstützen.</li> <li><strong>Tinnitus-Begleitung:</strong> kann helfen, die Belastung durch Ohrgeräusche zu reduzieren.</li> <li><strong>Weitere HNO-Verfahren:</strong> kommen bei schweren, schwer kontrollierbaren Verläufen infrage.</li> </ul><h2>Was kann im Alltag helfen?</h2> <p>Ein geregelter Tagesablauf, ausreichender Schlaf und ein bewusster Umgang mit individuellen Auslösern können hilfreich sein. Ernährung, Salz, Koffein, Alkohol und Stress werden häufig diskutiert. Pauschale Verbote sind jedoch nicht für jede Person gleich sinnvoll. Änderungen sollten bei ausgeprägten Beschwerden mit der behandelnden Fachperson abgestimmt werden.</p><p>Während oder kurz vor einer Schwindelattacke sollten Tätigkeiten vermieden werden, bei denen ein Sturz besonders gefährlich wäre.</p><h2>Kann TCM bei Morbus Menière unterstützen?</h2> <p>Akupunktur wird bei Schwindel, Übelkeit, Stress und begleitenden Beschwerden eingesetzt. Für Morbus Menière selbst ist die wissenschaftliche Evidenz jedoch nicht stark genug, um Akupunktur als Ersatz für HNO-Diagnostik und etablierte Behandlung zu betrachten.</p><p>Bei gesicherter Diagnose kann eine ergänzende Behandlung symptomorientiert geplant werden. Im Vordergrund stehen dabei Beschwerden wie Übelkeit, Verspannung, Stress oder das subjektive Belastungserleben. Ein Fortschreiten einer Innenohrerkrankung lässt sich durch Akupunktur nicht zuverlässig verhindern.</p><h2>Wann rasch medizinisch abklären?</h2> <ul> <li>Plötzlicher neuer Hörverlust</li> <li>Neue neurologische Symptome wie Lähmung, Doppelbilder oder Sprachstörung</li> <li>Schwindel mit Bewusstseinsstörung</li> <li>Erstmals sehr starker oder ungewöhnlicher Schwindel</li> <li>Anhaltendes Erbrechen oder deutliche Austrocknung</li> </ul>",
    "faqs": [
      {
        "q": "Was ist typisch für Morbus Menière?",
        "a": "Typisch ist die Kombination aus wiederkehrenden Drehschwindelattacken, Hörminderung, Tinnitus und Druck- oder Völlegefühl im betroffenen Ohr."
      },
      {
        "q": "Ist jeder Schwindel mit Tinnitus Morbus Menière?",
        "a": "Nein. Sowohl Schwindel als auch Tinnitus haben viele mögliche Ursachen. Für eine Menière-Diagnose braucht es eine gezielte HNO-ärztliche Abklärung."
      },
      {
        "q": "Kann Morbus Menière geheilt werden?",
        "a": "Es gibt derzeit keine sichere Heilung. Die Behandlung zielt darauf, Attacken und Begleitbeschwerden zu kontrollieren und Hör- sowie Gleichgewichtsfunktion möglichst gut zu unterstützen."
      },
      {
        "q": "Kann Akupunktur bei Morbus Menière helfen?",
        "a": "Akupunktur kann ergänzend zur Behandlung einzelner Beschwerden diskutiert werden. Die Evidenz reicht jedoch nicht aus, um die HNO-Behandlung oder medizinische Verlaufskontrollen zu ersetzen."
      },
      {
        "q": "Was ist bei plötzlichem Hörverlust zu tun?",
        "a": "Ein plötzlich neu aufgetretener Hörverlust sollte zeitnah HNO-ärztlich abgeklärt werden und nicht zunächst ausschliesslich komplementär behandelt werden."
      }
    ],
    "related": [
      {
        "slug": "schwindel",
        "label": "Schwindel"
      },
      {
        "slug": "tinnitus",
        "label": "Tinnitus"
      },
      {
        "slug": "hoersturz",
        "label": "Hörsturz"
      },
      {
        "slug": "uebelkeit",
        "label": "Übelkeit"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "schlafapnoe",
    "name": "Schlafapnoe",
    "title": "Schlafapnoe: Atemaussetzer im Schlaf erkennen und behandeln",
    "metaDesc": "Schlafapnoe: Schnarchen, Atemaussetzer und Tagesmüdigkeit richtig einordnen. Schlafdiagnostik und etablierte Therapie haben Vorrang vor TCM.",
    "conditionName": "Schlafapnoe",
    "lead": "Lautes Schnarchen mit beobachteten Atempausen und ausgeprägter Tagesmüdigkeit sollte schlafmedizinisch abgeklärt werden.",
    "bodyHtml": "<h2>Was ist Schlafapnoe?</h2> <p>Bei einer <strong>Schlafapnoe</strong> kommt es während des Schlafs wiederholt zu Atemaussetzern oder deutlich eingeschränkter Atmung. Die häufigste Form ist die obstruktive Schlafapnoe, bei der die oberen Atemwege im Schlaf wiederholt zusammenfallen oder sich verengen.</p><p>Betroffene merken die Atemaussetzer oft selbst nicht. Hinweise kommen deshalb häufig von Partnerinnen oder Partnern, die lautes Schnarchen, Atempausen oder plötzliches Luftschnappen beobachten.</p><h2>Typische Beschwerden</h2> <div class=\"cp-sx-grid\"> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Lautes, unregelmässiges Schnarchen</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Beobachtete Atemaussetzer im Schlaf</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Luftschnappen oder abruptes Erwachen</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Ausgeprägte Tagesmüdigkeit</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Morgendliche Kopfschmerzen</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Konzentrationsprobleme</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Unruhiger, wenig erholsamer Schlaf</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Reizbarkeit oder reduzierte Leistungsfähigkeit</div> </div><h2>Warum Schlafapnoe abgeklärt werden sollte</h2> <p>Unbehandelte Schlafapnoe betrifft nicht nur die Schlafqualität. Wiederholte Atemstörungen und Sauerstoffschwankungen belasten den Körper und sind mit gesundheitlichen Risiken verbunden. Auch das Unfallrisiko kann steigen, wenn ausgeprägte Tagesschläfrigkeit besteht.</p><p>Eine Diagnose lässt sich nicht allein durch Schnarchen stellen. Nicht jeder schnarchende Mensch hat Schlafapnoe, und nicht jede Schlafapnoe wird gleich deutlich bemerkt.</p><h2>Wie wird Schlafapnoe festgestellt?</h2> <p>Die Abklärung erfolgt durch eine Schlafuntersuchung. Je nach Situation kann zunächst eine Messung zu Hause erfolgen oder eine Untersuchung im Schlaflabor notwendig sein. Dabei werden beispielsweise Atmung, Sauerstoffsättigung und Herzfrequenz während des Schlafs erfasst.</p><p>Mehr zum Ablauf findest du auf unserer Seite zum <a href=\"/gesundheitsbibliothek/untersuchungen/schlaflabor/\">Schlaflabor</a>.</p><h2>Wie wird obstruktive Schlafapnoe behandelt?</h2> <p>Die passende Behandlung hängt von Ursache und Schweregrad ab.</p><ul> <li><strong>CPAP-Therapie:</strong> hält die Atemwege während des Schlafs durch positiven Luftdruck offen und ist eine wichtige Behandlung bei vielen Betroffenen.</li> <li><strong>Gewichtsmanagement:</strong> kann bei Übergewicht einen relevanten Einfluss haben.</li> <li><strong>Alkohol und sedierende Faktoren:</strong> können Atemwegsprobleme während des Schlafs verstärken.</li> <li><strong>Unterkieferprotrusionsschiene:</strong> kann bei ausgewählten Betroffenen sinnvoll sein.</li> <li><strong>HNO- oder kieferchirurgische Verfahren:</strong> kommen nur bei passenden anatomischen Voraussetzungen infrage.</li> </ul><h2>Welche Rolle hat TCM?</h2> <p>Akupunktur kann Schlafqualität, Stress oder muskuläre Begleitbeschwerden als komplementärer Ansatz adressieren. Sie öffnet jedoch keinen mechanisch kollabierenden Atemweg und ersetzt weder Schlafdiagnostik noch CPAP oder andere notwendige Therapien.</p><p>Bei bestätigter Schlafapnoe sollte eine TCM-Behandlung deshalb ausschliesslich ergänzend verstanden werden. Das Ziel ist nicht, Atemaussetzer ohne objektive Kontrolle als behoben zu betrachten.</p><h2>Wann ärztlich abklären?</h2> <ul> <li>Beobachtete Atemaussetzer im Schlaf</li> <li>Starkes Schnarchen plus ausgeprägte Tagesmüdigkeit</li> <li>Einschlafen beim Autofahren oder in anderen gefährlichen Situationen</li> <li>Wiederholtes nächtliches Luftschnappen</li> <li>Schlafprobleme zusammen mit schwer einstellbarem Bluthochdruck oder relevanten Herz-Kreislauf-Erkrankungen</li> </ul>",
    "faqs": [
      {
        "q": "Ist starkes Schnarchen automatisch Schlafapnoe?",
        "a": "Nein. Schnarchen ist häufig und kann ohne Schlafapnoe auftreten. Atemaussetzer, ausgeprägte Tagesmüdigkeit und Luftschnappen erhöhen jedoch den Verdacht und sollten abgeklärt werden."
      },
      {
        "q": "Wie wird Schlafapnoe diagnostiziert?",
        "a": "Mit einer Schlafmessung. Je nach Situation erfolgt sie zu Hause oder im Schlaflabor. Dabei werden unter anderem Atmung, Sauerstoff und weitere Schlafparameter beurteilt."
      },
      {
        "q": "Was ist CPAP?",
        "a": "CPAP ist eine Atemtherapie mit positivem Luftdruck. Eine Maske hält die oberen Atemwege während des Schlafs offen und verhindert dadurch bei vielen Betroffenen wiederkehrende Atemwegsverschlüsse."
      },
      {
        "q": "Kann Akupunktur CPAP ersetzen?",
        "a": "Nein. Akupunktur kann eine notwendige Behandlung der Atemwegsobstruktion nicht ersetzen. Sie kann höchstens ergänzend bei anderen Beschwerden eingesetzt werden."
      },
      {
        "q": "Wann sollte Schnarchen abgeklärt werden?",
        "a": "Besonders wenn Atempausen beobachtet werden, starke Tagesmüdigkeit besteht, nächtliches Luftschnappen auftritt oder das Schnarchen sehr ausgeprägt und unregelmässig ist."
      }
    ],
    "related": [
      {
        "slug": "schlafprobleme",
        "label": "Schlafprobleme"
      },
      {
        "slug": "bluthochdruck",
        "label": "Bluthochdruck"
      },
      {
        "slug": "erschoepfung",
        "label": "Erschöpfung"
      },
      {
        "slug": "kopfschmerzen",
        "label": "Kopfschmerzen"
      },
      {
        "slug": "gewichtsmanagement",
        "label": "Gewichtsmanagement"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "lipoedem",
    "name": "Lipödem",
    "title": "Lipödem: Beschwerden erkennen und sinnvoll behandeln",
    "metaDesc": "Lipödem: schmerzhafte, symmetrische Fettverteilung an Beinen oder Armen. Abgrenzung zu Lymphödem und Übergewicht, Behandlung und ergänzende TCM.",
    "conditionName": "Lipödem",
    "lead": "Schmerzhafte, symmetrisch vermehrte Fettverteilung an Beinen oder Armen ist nicht automatisch Übergewicht und sollte fachlich eingeordnet werden.",
    "bodyHtml": "<h2>Was ist ein Lipödem?</h2> <p>Das <strong>Lipödem</strong> ist eine chronische Erkrankung des Unterhautfettgewebes, die überwiegend Frauen betrifft. Typisch ist eine symmetrische, disproportionierte Fettvermehrung vor allem an Beinen, Hüften oder Armen. Häufig kommen Druckschmerz, Schweregefühl und eine Neigung zu blauen Flecken hinzu.</p><p>Ein Lipödem ist nicht dasselbe wie Übergewicht und auch nicht dasselbe wie ein Lymphödem. Die Abgrenzung ist wichtig, weil sich Behandlung und Verlauf unterscheiden.</p><h2>Typische Beschwerden</h2> <div class=\"cp-sx-grid\"> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Symmetrisch kräftigere Beine oder Arme</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Füsse oder Hände meist relativ ausgespart</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Druck- und Berührungsschmerz</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schwere- oder Spannungsgefühl</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Leichte Entstehung blauer Flecken</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Zunahme der Beschwerden im Tagesverlauf möglich</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Belastung beim längeren Stehen oder Gehen</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Psychische Belastung durch Körperform und Schmerzen</div> </div><h2>Lipödem, Lymphödem oder Übergewicht?</h2> <p>Bei einem Lymphödem steht eine Störung des Lymphabflusses mit Flüssigkeitseinlagerung im Vordergrund. Beim Lipödem ist das Fettgewebe selbst krankhaft verändert. Übergewicht kann zusätzlich vorhanden sein, erklärt das typische Lipödem-Muster aber nicht vollständig.</p><p>Deshalb sollte bei unklaren Beinschwellungen oder ausgeprägter Disproportion eine fachkundige Untersuchung erfolgen, bevor eine Behandlung begonnen wird.</p><h2>Wie wird ein Lipödem behandelt?</h2> <p>Es gibt keine einfache Einzelmassnahme, die ein Lipödem beseitigt. Die Behandlung richtet sich nach Beschwerden und Alltagseinschränkung.</p><ul> <li><strong>Kompression:</strong> kann Schmerzen, Schweregefühl und Alltagseinschränkungen reduzieren.</li> <li><strong>Bewegung:</strong> unterstützt Fitness, Muskelpumpe und allgemeine Gesundheit.</li> <li><strong>Gewichtsmanagement:</strong> ist relevant, wenn zusätzlich Übergewicht besteht, auch wenn das Lipödem dadurch nicht einfach verschwindet.</li> <li><strong>Hautpflege und Selbstmanagement:</strong> gehören bei entsprechenden Beschwerden zur langfristigen Betreuung.</li> <li><strong>Liposuktion:</strong> kann bei ausgewählten schweren Verläufen nach spezialisierter Beurteilung infrage kommen.</li> </ul><h2>Kann TCM beim Lipödem unterstützen?</h2> <p>Für eine Veränderung des krankhaft vermehrten Fettgewebes durch Akupunktur oder andere TCM-Verfahren gibt es keine ausreichende wissenschaftliche Grundlage. Eine TCM-Behandlung sollte deshalb nicht mit dem Versprechen verbunden werden, ein Lipödem zu entfernen oder dessen Ursache zu beheben.</p><p>Ergänzend können bei einzelnen Patientinnen Beschwerden wie muskuläre Spannung, Stress, Schlafprobleme oder begleitende Schmerzen behandelt werden. Dabei sollte die etablierte Versorgung mit Kompression, Bewegung und gegebenenfalls spezialisierter Gefäss- oder Lymphologie weitergeführt werden.</p><h2>Wann medizinisch abklären?</h2> <ul> <li>Neu aufgetretene oder deutlich zunehmende Beinschwellung</li> <li>Einseitige Schwellung, Rötung, Überwärmung oder starke Schmerzen</li> <li>Unklare Schwellung von Füssen oder Händen</li> <li>Atemnot zusammen mit Beinschwellung</li> <li>Unsicherheit, ob Lipödem, Lymphödem, venöse Erkrankung oder eine andere Ursache vorliegt</li> </ul>",
    "faqs": [
      {
        "q": "Ist Lipödem einfach Übergewicht?",
        "a": "Nein. Ein Lipödem ist eine eigenständige Erkrankung mit typischer symmetrischer Fettverteilung und häufig Schmerzen oder Druckempfindlichkeit. Übergewicht kann zusätzlich bestehen."
      },
      {
        "q": "Was ist der Unterschied zwischen Lipödem und Lymphödem?",
        "a": "Beim Lipödem steht krankhaft verändertes Fettgewebe im Vordergrund. Beim Lymphödem sammelt sich Flüssigkeit durch eine Störung des Lymphabflusses. Beide können teilweise ähnliche Beschwerden verursachen."
      },
      {
        "q": "Hilft Abnehmen gegen Lipödem?",
        "a": "Eine Gewichtsreduktion kann bei zusätzlichem Übergewicht die allgemeine Gesundheit und Belastung verbessern. Das typische Lipödem-Gewebe verschwindet dadurch jedoch nicht zwangsläufig."
      },
      {
        "q": "Kann Akupunktur Lipödem beseitigen?",
        "a": "Dafür gibt es keine belastbare Evidenz. Akupunktur sollte nicht als Methode zum Entfernen des Lipödem-Fettgewebes angeboten werden. Sie kann allenfalls ergänzend bei Begleitbeschwerden eingesetzt werden."
      },
      {
        "q": "Welche Behandlung ist bei Lipödem üblich?",
        "a": "Je nach Beschwerden gehören Kompression, Bewegung, Gewichtsmanagement bei zusätzlichem Übergewicht, Hautpflege und bei ausgewählten schweren Fällen spezialisierte operative Verfahren zu den Optionen."
      }
    ],
    "related": [
      {
        "slug": "lymphoedem",
        "label": "Lymphödem"
      },
      {
        "slug": "wassereinlagerungen",
        "label": "Wassereinlagerungen"
      },
      {
        "slug": "schwere-beine",
        "label": "Schwere Beine"
      },
      {
        "slug": "durchblutungsstoerungen",
        "label": "Durchblutungsstörungen"
      },
      {
        "slug": "gewichtsmanagement",
        "label": "Gewichtsmanagement"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "rheumatoide-arthritis",
    "name": "Rheumatoide Arthritis",
    "title": "Rheumatoide Arthritis: Entzündung behandeln, Beschwerden begleiten",
    "metaDesc": "Rheumatoide Arthritis: entzündliche Gelenkerkrankung mit Schmerzen, Schwellung und Morgensteifigkeit. DMARD-Therapie hat Vorrang, TCM nur ergänzend.",
    "conditionName": "Rheumatoide Arthritis",
    "lead": "Rheumatoide Arthritis ist eine entzündliche Autoimmunerkrankung. Eine frühe rheumatologische Behandlung schützt Gelenke und Funktion.",
    "bodyHtml": "<h2>Was ist rheumatoide Arthritis?</h2> <p>Die <strong>rheumatoide Arthritis</strong> ist eine chronisch-entzündliche Autoimmunerkrankung. Das Immunsystem greift Strukturen in und um die Gelenke an. Dadurch entstehen Schwellung, Schmerzen und ausgeprägte Steifigkeit. Ohne wirksame Behandlung kann die Entzündung Gelenke dauerhaft schädigen.</p><p>Sie unterscheidet sich grundlegend von einer Arthrose. Arthrose ist primär eine degenerative Gelenkerkrankung. Rheumatoide Arthritis ist dagegen eine systemische Entzündungserkrankung und gehört rheumatologisch behandelt.</p><h2>Typische Beschwerden</h2> <div class=\"cp-sx-grid\"> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Geschwollene, schmerzhafte Gelenke</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Ausgeprägte Morgensteifigkeit</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Häufig symmetrischer Gelenkbefall</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Beschwerden an Finger- und Handgelenken</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Erschöpfung und reduzierte Belastbarkeit</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schubweiser Verlauf möglich</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Kraftverlust oder eingeschränkte Funktion</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Allgemeines Krankheitsgefühl während aktiver Entzündung</div> </div><h2>Warum eine frühe Diagnose wichtig ist</h2> <p>Bei rheumatoider Arthritis reicht reine Schmerzbehandlung nicht aus. Entscheidend ist, die Entzündungsaktivität möglichst früh zu kontrollieren. Dafür werden krankheitsmodifizierende Medikamente eingesetzt, sogenannte DMARDs. Sie können den Verlauf bremsen und Gelenkschäden vorbeugen.</p><p>Schmerzmittel allein erfüllen diese Aufgabe nicht. Auch eine komplementäre Behandlung kann eine wirksame rheumatologische Basistherapie nicht ersetzen.</p><h2>Wie wird rheumatoide Arthritis behandelt?</h2> <ul> <li><strong>DMARDs:</strong> bilden die Grundlage der krankheitsmodifizierenden Therapie.</li> <li><strong>Biologika und weitere zielgerichtete Medikamente:</strong> können bei entsprechender Krankheitsaktivität eingesetzt werden.</li> <li><strong>Kortison:</strong> wird abhängig von Situation und Therapiestrategie insbesondere kurzfristig verwendet.</li> <li><strong>Physio- und Ergotherapie:</strong> unterstützen Beweglichkeit, Kraft und Alltag.</li> <li><strong>Bewegung:</strong> bleibt auch bei entzündlich-rheumatischen Erkrankungen wichtig und wird an Krankheitsaktivität und Funktion angepasst.</li> </ul><h2>Kann TCM ergänzend unterstützen?</h2> <p>Akupunktur kann bei chronischen Schmerzen und muskulären Begleitbeschwerden als ergänzende Massnahme eingesetzt werden. Sie ist bei rheumatoider Arthritis jedoch keine krankheitsmodifizierende Therapie und verhindert nicht zuverlässig Gelenkschäden.</p><p>Eine sinnvolle komplementäre Begleitung setzt deshalb voraus, dass die rheumatologische Behandlung weitergeführt wird. Medikamente sollten wegen einer TCM-Behandlung niemals selbstständig reduziert oder abgesetzt werden.</p><p>Bei stark entzündeten, heissen oder deutlich geschwollenen Gelenken behandeln wir nicht aggressiv lokal. Die medizinische Kontrolle der Entzündungsaktivität steht im Vordergrund.</p><h2>Wann rasch abklären?</h2> <ul> <li>Neu auftretende anhaltende Gelenkschwellungen</li> <li>Mehrere schmerzhaft geschwollene Gelenke gleichzeitig</li> <li>Lange Morgensteifigkeit zusammen mit Gelenkschwellung</li> <li>Fieber oder ausgeprägtes Krankheitsgefühl bei immunsuppressiver Therapie</li> <li>Plötzlich sehr heisses, stark schmerzendes Einzelgelenk</li> </ul>",
    "faqs": [
      {
        "q": "Was ist der Unterschied zwischen Arthrose und rheumatoider Arthritis?",
        "a": "Arthrose ist vor allem eine degenerative Gelenkerkrankung. Rheumatoide Arthritis ist eine Autoimmunerkrankung mit systemischer Gelenkentzündung und braucht eine krankheitsmodifizierende rheumatologische Behandlung."
      },
      {
        "q": "Warum sind DMARDs wichtig?",
        "a": "DMARDs behandeln nicht nur Schmerzen, sondern können die Krankheitsaktivität bremsen und Gelenkschäden verhindern oder reduzieren. Deshalb bilden sie einen zentralen Bestandteil der Behandlung."
      },
      {
        "q": "Kann Akupunktur DMARDs ersetzen?",
        "a": "Nein. Akupunktur ist keine krankheitsmodifizierende Behandlung der rheumatoiden Arthritis. Sie kann höchstens ergänzend bei einzelnen Beschwerden eingesetzt werden."
      },
      {
        "q": "Darf man trotz rheumatoider Arthritis Sport machen?",
        "a": "Bewegung ist grundsätzlich wichtig. Art und Intensität sollten an Krankheitsaktivität, Gelenkzustand und persönliche Belastbarkeit angepasst werden. Physiotherapie kann dabei unterstützen."
      },
      {
        "q": "Soll ich Medikamente vor einer Akupunkturbehandlung absetzen?",
        "a": "Nein. Rheumamedikamente sollten nicht wegen Akupunktur eigenständig verändert oder abgesetzt werden. Änderungen gehören mit der behandelnden Ärztin oder dem behandelnden Arzt besprochen."
      }
    ],
    "related": [
      {
        "slug": "rheuma",
        "label": "Rheuma"
      },
      {
        "slug": "arthrose",
        "label": "Arthrose"
      },
      {
        "slug": "fibromyalgie",
        "label": "Fibromyalgie"
      },
      {
        "slug": "erschoepfung",
        "label": "Erschöpfung"
      },
      {
        "slug": "osteoporose",
        "label": "Osteoporose"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      }
    ]
  },
  {
    "slug": "crps",
    "name": "CRPS",
    "title": "CRPS: komplexes regionales Schmerzsyndrom verstehen und behandeln",
    "metaDesc": "CRPS oder Morbus Sudeck: starke Schmerzen, Überempfindlichkeit, Schwellung und Bewegungsprobleme. Frühzeitige multidisziplinäre Behandlung ist entscheidend.",
    "conditionName": "Komplexes regionales Schmerzsyndrom (CRPS)",
    "lead": "CRPS kann nach Verletzung oder Operation entstehen und braucht eine koordinierte Schmerz- und Rehabilitationstherapie.",
    "bodyHtml": "<h2>Was ist CRPS?</h2> <p>Das <strong>komplexe regionale Schmerzsyndrom</strong>, kurz CRPS und früher häufig Morbus Sudeck genannt, ist eine komplexe Schmerzerkrankung. Sie entwickelt sich meist nach einer Verletzung, Operation oder Immobilisation einer Extremität. Die Schmerzen und Veränderungen können deutlich stärker sein, als aufgrund der ursprünglichen Verletzung zu erwarten wäre.</p><p>CRPS betrifft häufig Hand, Arm, Fuss oder Bein. Neben Schmerz können Hautfarbe, Temperatur, Schwellung, Berührungsempfindlichkeit und Beweglichkeit verändert sein.</p><h2>Typische Beschwerden</h2> <div class=\"cp-sx-grid\"> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Anhaltender starker Schmerz</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Extreme Berührungsempfindlichkeit</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Brennender oder neuropathischer Schmerz</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schwellung der betroffenen Region</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Veränderte Hautfarbe oder Hauttemperatur</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Steifigkeit und eingeschränkte Bewegung</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Verändertes Schwitzen möglich</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schwierigkeit, die betroffene Extremität normal zu benutzen</div> </div><h2>Warum frühe Rehabilitation wichtig ist</h2> <p>Bei CRPS besteht die Gefahr, dass Schmerz, Schonhaltung und Bewegungsvermeidung sich gegenseitig verstärken. Eine spezialisierte Behandlung versucht deshalb, Funktion und normale Nutzung des betroffenen Körperteils schrittweise zu fördern.</p><p>Zu aggressive Belastung kann Beschwerden verstärken. Gleichzeitig ist vollständiges dauerhaftes Schonverhalten meist ebenfalls ungünstig. Deshalb sollte die Rehabilitation individuell durch erfahrene Fachpersonen gesteuert werden.</p><h2>Wie wird CRPS behandelt?</h2> <p>Die Behandlung ist meist multidisziplinär und kann mehrere Bereiche kombinieren:</p><ul> <li><strong>Physiotherapie und Rehabilitation:</strong> zur schrittweisen Verbesserung von Bewegung und Funktion.</li> <li><strong>Desensibilisierung:</strong> kann helfen, extreme Berührungsempfindlichkeit zu reduzieren.</li> <li><strong>Schmerztherapie:</strong> Medikamente werden je nach Schmerztyp individuell eingesetzt.</li> <li><strong>Ergo- und Alltagstherapie:</strong> unterstützt die Wiederaufnahme normaler Tätigkeiten.</li> <li><strong>Psychologische Schmerztherapie:</strong> kann helfen, mit chronischem Schmerz umzugehen und Rehabilitation zu unterstützen.</li> <li><strong>Spezialisierte Verfahren:</strong> können bei schweren Verläufen in Schmerzkliniken geprüft werden.</li> </ul><h2>Kann Akupunktur bei CRPS eingesetzt werden?</h2> <p>Die wissenschaftliche Grundlage für Akupunktur speziell bei CRPS ist begrenzt. Sie sollte deshalb nicht an die Stelle einer spezialisierten Schmerz- und Rehabilitationstherapie treten.</p><p>Bei einzelnen Patientinnen und Patienten kann eine sehr vorsichtige ergänzende Behandlung erwogen werden, wenn das Behandlungsteam dies sinnvoll findet und Berührungsreize toleriert werden. Bei ausgeprägter Allodynie behandeln wir nicht aggressiv direkt in die schmerzhafte Region.</p><p>Ziel einer ergänzenden Behandlung wäre ausschliesslich Symptomunterstützung, etwa bei begleitender Muskelspannung oder allgemeinem Schmerzmanagement. Eine Normalisierung des komplexen Krankheitsprozesses kann nicht versprochen werden.</p><h2>Wann ärztlich oder schmerzmedizinisch abklären?</h2> <ul> <li>Ungewöhnlich starke, anhaltende Schmerzen nach Verletzung oder Operation</li> <li>Zunehmende Berührungsempfindlichkeit</li> <li>Deutliche Farb- oder Temperaturunterschiede einer Extremität</li> <li>Schwellung zusammen mit zunehmender Bewegungseinschränkung</li> <li>Fortschreitender Funktionsverlust</li> </ul>",
    "faqs": [
      {
        "q": "Ist CRPS dasselbe wie Morbus Sudeck?",
        "a": "Morbus Sudeck ist eine ältere Bezeichnung, die häufig für CRPS verwendet wurde. Heute spricht man meist vom komplexen regionalen Schmerzsyndrom."
      },
      {
        "q": "Wie entsteht CRPS?",
        "a": "Häufig beginnt CRPS nach einer Verletzung oder Operation. Warum manche Menschen die Erkrankung entwickeln und andere nicht, ist nicht vollständig geklärt."
      },
      {
        "q": "Warum ist Bewegung trotz Schmerzen wichtig?",
        "a": "Ziel ist keine aggressive Belastung, sondern eine kontrollierte, schrittweise Wiederherstellung von Funktion. Dauerhafte Bewegungsvermeidung kann langfristig zusätzliche Einschränkungen fördern."
      },
      {
        "q": "Kann Akupunktur CRPS heilen?",
        "a": "Dafür gibt es keine ausreichende Evidenz. Akupunktur kann höchstens ergänzend und vorsichtig im Rahmen eines umfassenden Behandlungsplans eingesetzt werden."
      },
      {
        "q": "Wer behandelt CRPS?",
        "a": "Häufig arbeiten Schmerzmedizin, Physiotherapie, Ergotherapie, Haus- oder Fachärzte und bei Bedarf psychologische Schmerztherapie zusammen."
      }
    ],
    "related": [
      {
        "slug": "nervenschmerzen",
        "label": "Nervenschmerzen"
      },
      {
        "slug": "polyneuropathie",
        "label": "Polyneuropathie"
      },
      {
        "slug": "fibromyalgie",
        "label": "Fibromyalgie"
      },
      {
        "slug": "guertelrose",
        "label": "Gürtelrose"
      },
      {
        "slug": "erschoepfung",
        "label": "Erschöpfung"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "interkostalneuralgie",
    "name": "Interkostalneuralgie",
    "title": "Interkostalneuralgie: Nervenschmerz zwischen den Rippen",
    "metaDesc": "Interkostalneuralgie: brennender oder stechender Nervenschmerz entlang der Rippen. Brustschmerz zuerst sicher abklären, danach gezielt behandeln.",
    "conditionName": "Interkostalneuralgie",
    "lead": "Bandförmiger, brennender Schmerz entlang der Rippen kann von Interkostalnerven kommen. Neuer Brustschmerz sollte trotzdem zuerst medizinisch eingeordnet werden.",
    "bodyHtml": "<h2>Was ist eine Interkostalneuralgie?</h2> <p>Eine <strong>Interkostalneuralgie</strong> ist ein neuropathischer Schmerz im Verlauf eines oder mehrerer Nerven zwischen den Rippen. Der Schmerz kann vom Rücken seitlich um den Brustkorb bis nach vorne ziehen und teilweise auch den oberen Bauchbereich betreffen.</p><p>Typisch sind brennende, stechende, elektrische oder bandförmige Schmerzen. Gleichzeitig können Kribbeln, Taubheit oder eine ausgeprägte Berührungsempfindlichkeit auftreten.</p><h2>Typische Beschwerden</h2> <div class=\"cp-sx-grid\"> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Bandförmiger Schmerz entlang einer Rippe</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Brennender oder stechender Nervenschmerz</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schmerz vom Rücken Richtung Brustkorb</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Kribbeln oder Taubheitsgefühl</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Überempfindlichkeit der Haut</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Verstärkung bei Husten oder Niesen möglich</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Schmerz bei tiefem Atemzug oder Bewegung möglich</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Einseitiges, klar begrenztes Schmerzband möglich</div> </div><h2>Brustschmerz zuerst sicher einordnen</h2> <p>Schmerzen im Brustkorb dürfen nicht allein aufgrund ihres Charakters als Interkostalneuralgie eingestuft werden. Herz, Lunge, Rippen, Brustwirbelsäule, Speiseröhre und andere Strukturen können ähnliche Beschwerden verursachen.</p><p>Neue, starke oder unerklärte Brustschmerzen sollten deshalb medizinisch abgeklärt werden, bevor eine reine Nerven- oder Muskelbehandlung begonnen wird.</p><h2>Mögliche Ursachen</h2> <ul> <li><strong>Gürtelrose:</strong> der betroffene Nerv kann während und nach der Infektion starke neuropathische Schmerzen verursachen.</li> <li><strong>Operationen am Brustkorb:</strong> können Interkostalnerven reizen oder verletzen.</li> <li><strong>Verletzungen:</strong> beispielsweise Rippenverletzungen oder andere Traumata.</li> <li><strong>Nervenkompression:</strong> kann durch Wirbelsäulen- oder Gewebeveränderungen entstehen.</li> <li><strong>Unklare Ursache:</strong> nicht immer lässt sich ein eindeutiger Auslöser finden.</li> </ul><h2>Wie wird Interkostalneuralgie behandelt?</h2> <p>Die Therapie richtet sich nach der Ursache. Bei neuropathischem Schmerz kommen andere Medikamente infrage als bei rein muskulären Beschwerden. Physiotherapie kann sinnvoll sein, wenn Bewegungsapparat oder Schutzspannung mitbeteiligt sind. Bei bestimmten Verläufen können spezialisierte Schmerzverfahren oder Nervenblockaden geprüft werden.</p><p>Besteht eine zugrunde liegende Erkrankung wie Gürtelrose, muss diese entsprechend behandelt werden.</p><h2>Kann TCM ergänzend helfen?</h2> <p>Nach medizinischer Abklärung kann Akupunktur bei chronischen Schmerz- und Spannungsmustern ergänzend eingesetzt werden. Dabei unterscheiden wir zwischen neuropathischem Schmerz und sekundärer Muskelspannung im Bereich von Rücken und Brustkorb.</p><p>Bei klar neuropathischen Beschwerden sollte keine Heilung des geschädigten Nervs versprochen werden. Die Behandlung ist symptomorientiert und ersetzt keine diagnostische Abklärung von Brustschmerzen.</p><p>Stark empfindliche oder akut entzündete Bereiche werden nicht aggressiv lokal behandelt.</p><h2>Wann sofort medizinische Hilfe?</h2> <ul> <li>Brustschmerz mit Atemnot</li> <li>Druck oder Enge im Brustkorb</li> <li>Brustschmerz mit kaltem Schweiss, Übelkeit oder Kreislaufproblemen</li> <li>Ausstrahlung in Arm, Schulter, Rücken oder Kiefer bei neuem Brustschmerz</li> <li>Plötzlich deutlich erschwerte Atmung</li> <li>Neurologische Ausfälle oder starke allgemeine Verschlechterung</li> </ul>",
    "faqs": [
      {
        "q": "Wie fühlt sich Interkostalneuralgie an?",
        "a": "Häufig wird der Schmerz als brennend, stechend, elektrisch oder bandförmig entlang einer Rippe beschrieben. Kribbeln, Taubheit und Berührungsempfindlichkeit können dazukommen."
      },
      {
        "q": "Kann Interkostalneuralgie beim Atmen wehtun?",
        "a": "Ja. Bewegung des Brustkorbs, tiefe Atemzüge, Husten oder Niesen können die Beschwerden verstärken. Das ist jedoch nicht spezifisch und sollte bei neuen Brustschmerzen medizinisch eingeordnet werden."
      },
      {
        "q": "Kann Gürtelrose Interkostalneuralgie verursachen?",
        "a": "Ja. Herpes Zoster betrifft häufig Nerven am Brustkorb und kann auch nach Abheilung des Ausschlags länger anhaltende Nervenschmerzen hinterlassen."
      },
      {
        "q": "Kann Akupunktur Interkostalneuralgie behandeln?",
        "a": "Nach ärztlicher Abklärung kann Akupunktur ergänzend bei Schmerz und muskulären Begleitspannungen eingesetzt werden. Eine Heilung eines geschädigten Nervs kann nicht versprochen werden."
      },
      {
        "q": "Wann ist Brustschmerz ein Notfall?",
        "a": "Bei neuem starken Brustschmerz, Atemnot, Engegefühl, Kreislaufproblemen oder typischer Ausstrahlung sollte sofort medizinische Hilfe gesucht werden."
      }
    ],
    "related": [
      {
        "slug": "nervenschmerzen",
        "label": "Nervenschmerzen"
      },
      {
        "slug": "guertelrose",
        "label": "Gürtelrose"
      },
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "spinalkanalstenose",
        "label": "Spinalkanalstenose"
      },
      {
        "slug": "fibromyalgie",
        "label": "Fibromyalgie"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      }
    ]
  },
  {
    "slug": "bettnaessen",
    "name": "Bettnässen",
    "title": "Bettnässen bei Kindern: Ursachen, Abklärung und Behandlung",
    "metaDesc": "Bettnässen oder Enuresis bei Kindern: häufig, behandelbar und kein Grund für Schuld. Wann abklären, was hilft und welche Rolle Akupunktur ergänzend haben kann.",
    "conditionName": "Nächtliche Enuresis",
    "lead": "Nächtliches Bettnässen ist bei Kindern häufig. Wichtig sind eine druckfreie Haltung, altersgerechte Abklärung und bewährte Behandlungsmöglichkeiten.",
    "bodyHtml": "<h2>Was bedeutet Bettnässen?</h2> <p><strong>Bettnässen</strong> oder nächtliche Enuresis bedeutet, dass ein Kind im Schlaf wiederholt unwillkürlich Urin verliert. Bei jüngeren Kindern gehört nächtliche Blasenkontrolle noch zur normalen Entwicklung. Erst mit zunehmendem Alter wird wiederholtes Bettnässen medizinisch relevanter.</p><p>Wichtig: Bettnässen ist kein Fehlverhalten. Kinder machen das nicht absichtlich und sollten weder beschämt noch bestraft werden.</p><h2>Welche Muster gibt es?</h2> <p>Man unterscheidet unter anderem Kinder, die nachts noch nie über längere Zeit trocken waren, von Kindern, die nach einer längeren trockenen Phase erneut einnässen. Zusätzlich ist wichtig, ob tagsüber Beschwerden bestehen.</p><div class=\"cp-sx-grid\"> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Nasse Nächte trotz altersgerechter Toilettennutzung tagsüber</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Sehr tiefer Schlaf und fehlendes Erwachen bei voller Blase</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Gelegentlich mehrere Einnässereignisse pro Nacht</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Erneutes Bettnässen nach längerer trockener Phase</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Zusätzlicher Harndrang tagsüber möglich</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Verstopfung kann gleichzeitig auftreten</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Psychische Belastung oder Schamgefühl möglich</div> <div class=\"cp-sx-item\"><span class=\"cp-sx-dot\"></span>Belastung bei Übernachtungen, Lagern oder Schulreisen</div> </div><h2>Was kann dahinterstecken?</h2> <p>Bei vielen Kindern entwickelt sich die nächtliche Blasenkontrolle einfach später. Vererbung, nächtliche Urinproduktion, Blasenkapazität und die Fähigkeit, bei voller Blase aufzuwachen, spielen zusammen.</p><p>Auch Verstopfung kann Bettnässen verstärken. Bei plötzlich neu aufgetretenem Bettnässen oder zusätzlichen Symptomen muss ausserdem geprüft werden, ob beispielsweise Harnwegsprobleme, Diabetes, Schlafprobleme oder andere Ursachen vorliegen.</p><h2>Was hilft bei Bettnässen?</h2> <p>Die Behandlung richtet sich nach Alter, Häufigkeit, Begleitsymptomen und Belastung des Kindes.</p><ul> <li><strong>Normales Trinken tagsüber:</strong> Kinder sollten nicht durch übermässiges Einschränken von Flüssigkeit dehydriert werden.</li> <li><strong>Regelmässige Toilettengänge:</strong> einschliesslich Toilettengang vor dem Schlafen.</li> <li><strong>Positive Unterstützung:</strong> belohnt wird Mitarbeit, nicht eine trockene Nacht, die das Kind nicht vollständig kontrollieren kann.</li> <li><strong>Enuresis-Alarm:</strong> gehört zu den etablierten Behandlungsoptionen und trainiert das Erwachen bei beginnendem Einnässen.</li> <li><strong>Desmopressin:</strong> kann bei ausgewählten Kindern ärztlich eingesetzt werden, besonders wenn eine schnelle oder kurzfristige Verbesserung wichtig ist.</li> <li><strong>Behandlung von Verstopfung oder Tagesbeschwerden:</strong> falls vorhanden.</li> </ul><h2>Wann sollte ein Kind ärztlich abgeklärt werden?</h2> <ul> <li>Bettnässen beginnt plötzlich nach längerer trockener Phase</li> <li>Schmerzen oder Brennen beim Wasserlassen</li> <li>Ausgeprägter Harndrang oder Einnässen auch tagsüber</li> <li>Sehr starker Durst oder auffällig grosse Urinmengen</li> <li>Wiederkehrende Harnwegsinfekte</li> <li>Ausgeprägte Verstopfung</li> <li>Lautes Schnarchen oder Verdacht auf Schlafapnoe</li> <li>Bettnässen belastet Kind oder Familie deutlich</li> </ul><h2>Kann Akupunktur bei Bettnässen eingesetzt werden?</h2> <p>Akupunktur und Akupressur werden bei Enuresis eingesetzt, die wissenschaftliche Datenlage ist aber deutlich weniger etabliert als für Enuresis-Alarm und Desmopressin. Deshalb sollte eine TCM-Behandlung nicht anstelle einer pädiatrischen Abklärung oder bewährter Behandlungsmöglichkeiten erfolgen.</p><p>Wenn Eltern eine ergänzende Behandlung wünschen, muss sie kindgerecht, freiwillig und ohne Druck erfolgen. Je nach Alter und Akzeptanz können auch nicht-invasive Methoden wie Akupressur besprochen werden. Ein Kind sollte nie für nasse Nächte verantwortlich gemacht werden.</p><h2>Unser wichtigster Grundsatz</h2> <p>Das Ziel ist nicht nur ein trockenes Bett. Das Kind soll sich sicher fühlen und verstehen, dass Bettnässen eine behandelbare Entwicklungs- oder Gesundheitsfrage ist und kein persönliches Versagen.</p>",
    "faqs": [
      {
        "q": "Ab welchem Alter ist Bettnässen auffällig?",
        "a": "Nächtliche Blasenkontrolle entwickelt sich bei Kindern unterschiedlich. Bei wiederholtem Bettnässen ab dem Schulalter oder bei deutlicher Belastung lohnt sich eine ärztliche Besprechung. Auch jüngere Kinder können untersucht werden, wenn zusätzliche Beschwerden bestehen."
      },
      {
        "q": "Sollte man ein Kind für trockene Nächte belohnen?",
        "a": "Besser ist es, Verhalten zu belohnen, das das Kind selbst kontrollieren kann, zum Beispiel Toilettengang vor dem Schlafen oder aktive Mitarbeit beim Alarmtraining. Strafen und Beschämung sollten vermieden werden."
      },
      {
        "q": "Was ist ein Enuresis-Alarm?",
        "a": "Ein Enuresis-Alarm erkennt beginnende Nässe und weckt das Kind. Über die Zeit soll das Kind lernen, bei voller Blase früher aufzuwachen. Die Behandlung braucht Geduld und Unterstützung der Familie."
      },
      {
        "q": "Was ist Desmopressin?",
        "a": "Desmopressin ist ein verschreibungspflichtiges Medikament, das die nächtliche Urinproduktion reduzieren kann. Anwendung und Flüssigkeitsregeln müssen genau nach ärztlicher Anweisung erfolgen."
      },
      {
        "q": "Hilft Akupunktur gegen Bettnässen?",
        "a": "Die Evidenz ist weniger klar als für etablierte Behandlungen wie Alarmtraining und Desmopressin. Akupunktur oder Akupressur können höchstens ergänzend nach pädiatrischer Abklärung besprochen werden."
      }
    ],
    "related": [
      {
        "slug": "reizblase",
        "label": "Reizblase"
      },
      {
        "slug": "inkontinenz",
        "label": "Inkontinenz"
      },
      {
        "slug": "blasenentzuendung",
        "label": "Blasenentzündung"
      },
      {
        "slug": "schlafprobleme",
        "label": "Schlafprobleme"
      },
      {
        "slug": "verstopfung",
        "label": "Verstopfung"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "akupressur",
        "label": "Akupressur"
      }
    ]
  },
  {
    "slug": "schilddruesenunterfunktion",
    "name": "Schilddrüsenunterfunktion",
    "title": "Schilddrüsenunterfunktion: Symptome, Werte & ergänzende TCM",
    "metaDesc": "Müdigkeit, Frieren, Gewichtszunahme? Wie eine Schilddrüsenunterfunktion abgeklärt und behandelt wird und welche ergänzende Rolle TCM spielen kann.",
    "conditionName": "Hypothyreose",
    "lead": "Müdigkeit, Frieren, trockene Haut oder Gewichtszunahme werden häufig mit der Schilddrüse verbunden. Das Problem: Diese Beschwerden sind unspezifisch und kommen auch bei vielen anderen Ursachen vor. Ob tatsächlich eine Schilddrüsenunterfunktion besteht, lässt sich deshalb nicht anhand der Symptome allein feststellen.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "hashimoto",
        "label": "Hashimoto"
      },
      {
        "slug": "eisenmangel",
        "label": "Eisenmangel"
      },
      {
        "slug": "schlafprobleme",
        "label": "Schlafprobleme"
      },
      {
        "slug": "erschoepfung",
        "label": "Erschöpfung"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "hashimoto",
    "name": "Hashimoto",
    "title": "",
    "metaDesc": "",
    "conditionName": "Hashimoto-Thyreoiditis",
    "lead": "",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "schilddruesenunterfunktion",
        "label": "Schilddrüsenunterfunktion"
      },
      {
        "slug": "erschoepfung",
        "label": "Erschöpfung"
      }
    ],
    "therapies": []
  },
  {
    "slug": "venenschwaeche",
    "name": "Venenschwäche",
    "title": "Venenschwäche: Symptome, Diagnose & was wirklich hilft",
    "metaDesc": "Schwere oder geschwollene Beine können auf eine Venenschwäche hinweisen. Symptome, Duplex-Ultraschall, Behandlung und wann plötzlich einseitige Beschwerden dringend sind.",
    "conditionName": "Chronische venöse Insuffizienz",
    "lead": "Die Beine werden gegen Abend schwer, die Knöchel schwellen an oder sichtbare Venen nehmen zu. Solche Beschwerden können bei einer chronischen Venenschwäche auftreten. Sie beweisen sie aber nicht: Schwere Beine und Wassereinlagerungen haben auch andere mögliche Ursachen.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "schwere-beine",
        "label": "Schwere Beine"
      },
      {
        "slug": "wassereinlagerungen",
        "label": "Wassereinlagerungen"
      },
      {
        "slug": "durchblutungsstoerungen",
        "label": "Durchblutungsstörungen"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "diabetes-typ-2",
    "name": "Diabetes Typ 2",
    "title": "Diabetes Typ 2: Symptome, Diagnose & Behandlung verstehen",
    "metaDesc": "Typ-2-Diabetes entwickelt sich oft schleichend. Wie die Diagnose gestellt wird, warum Behandlung und Kontrollen zentral sind und wo TCM ergänzend begleiten kann.",
    "conditionName": "Diabetes mellitus Typ 2",
    "lead": "Diabetes Typ 2 ist eine chronische Stoffwechselerkrankung, bei der die Wirkung des Insulins nicht mehr ausreicht und der Blutzucker dauerhaft erhöht bleibt.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "gewichtsmanagement",
        "label": "Gewichtsmanagement"
      },
      {
        "slug": "fettleber",
        "label": "Fettleber"
      },
      {
        "slug": "polyneuropathie",
        "label": "Polyneuropathie"
      },
      {
        "slug": "bluthochdruck",
        "label": "Bluthochdruck"
      },
      {
        "slug": "erschoepfung",
        "label": "Erschöpfung"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "gallensteine",
    "name": "Gallensteine",
    "title": "Gallensteine: Symptome, Kolik & wann es dringend wird",
    "metaDesc": "Viele Gallensteine machen nie Beschwerden. Woran du eine Gallenkolik erkennst, wie abgeklärt wird und wann Fieber oder Gelbsucht ein Alarmzeichen sind.",
    "conditionName": "Cholelithiasis",
    "lead": "Gallensteine sind Ablagerungen in der Gallenblase oder den Gallenwegen. Viele bleiben ein Zufallsbefund ohne Beschwerden – andere verursachen heftige, krampfartige Oberbauchschmerzen.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "fettleber",
        "label": "Fettleber"
      },
      {
        "slug": "verdauungsprobleme",
        "label": "Verdauungsprobleme"
      },
      {
        "slug": "uebelkeit",
        "label": "Übelkeit"
      },
      {
        "slug": "sodbrennen",
        "label": "Sodbrennen &amp; Reflux"
      },
      {
        "slug": "blaehungen",
        "label": "Blähungen"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "lagerungsschwindel",
    "name": "Lagerungsschwindel",
    "title": "Lagerungsschwindel (BPLS): Ursache, Manöver & Verlauf",
    "metaDesc": "Kurzer Drehschwindel beim Umdrehen oder Aufrichten? Wie gutartiger Lagerungsschwindel entsteht, wie Lagerungsmanöver wie Epley helfen und wann abklären.",
    "conditionName": "Benigner paroxysmaler Lagerungsschwindel (BPLS)",
    "lead": "Beim gutartigen Lagerungsschwindel lösen bestimmte Kopf- und Lagewechsel kurze, heftige Drehschwindel-Attacken aus – unangenehm, aber meist gut behandelbar.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "schwindel",
        "label": "Schwindel"
      },
      {
        "slug": "nackenschmerzen",
        "label": "Nackenschmerzen"
      },
      {
        "slug": "tinnitus",
        "label": "Tinnitus"
      },
      {
        "slug": "uebelkeit",
        "label": "Übelkeit"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "periorale-dermatitis",
    "name": "Periorale Dermatitis",
    "title": "Periorale Dermatitis: Ursachen, Abgrenzung & Behandlung",
    "metaDesc": "Rötung und Knötchen um den Mund? Wie die periorale Dermatitis entsteht, warum Kosmetik und Kortison eine Rolle spielen und wie sie behandelt wird.",
    "conditionName": "Periorale Dermatitis",
    "lead": "Die periorale Dermatitis zeigt sich mit Rötungen und kleinen Knötchen um den Mund – oft bei sonst gepflegter Haut und häufig durch zu viel Pflege unterhalten.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "rosacea",
        "label": "Rosacea"
      },
      {
        "slug": "akne",
        "label": "Akne"
      },
      {
        "slug": "neurodermitis",
        "label": "Neurodermitis"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "seborrhoisches-ekzem",
    "name": "Seborrhoisches Ekzem",
    "title": "Seborrhoisches Ekzem: Schuppen, Rötung & was hilft",
    "metaDesc": "Schuppende Rötungen an Kopfhaut, Augenbrauen oder Nasenflügeln? Was hinter dem seborrhoischen Ekzem steckt, wie es behandelt wird und wovon es abzugrenzen ist.",
    "conditionName": "Seborrhoische Dermatitis",
    "lead": "Das seborrhoische Ekzem ist eine chronisch-wiederkehrende Hautentzündung mit fettigen Schuppen und Rötung – bevorzugt an Kopfhaut, Augenbrauen und Nasenflügeln.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "schuppenflechte",
        "label": "Schuppenflechte"
      },
      {
        "slug": "neurodermitis",
        "label": "Neurodermitis"
      },
      {
        "slug": "akne",
        "label": "Akne"
      },
      {
        "slug": "haarausfall",
        "label": "Haarausfall"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "kreisrunder-haarausfall",
    "name": "Kreisrunder Haarausfall",
    "title": "Kreisrunder Haarausfall (Alopecia areata): Was dahintersteckt",
    "metaDesc": "Plötzlich runde kahle Stellen? Alopecia areata ist eine autoimmune Form des Haarausfalls. Verlauf, dermatologische Abklärung und realistische Erwartungen.",
    "conditionName": "Alopecia areata",
    "lead": "Beim kreisrunden Haarausfall (Alopecia areata) entstehen plötzlich scharf begrenzte, runde kahle Stellen – eine immunologisch bedingte Erkrankung mit sehr unterschiedlichem Verlauf.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "haarausfall",
        "label": "Haarausfall"
      },
      {
        "slug": "stress-burnout",
        "label": "Stress &amp; Burnout"
      },
      {
        "slug": "schilddruesenunterfunktion",
        "label": "Schilddrüsenunterfunktion"
      },
      {
        "slug": "neurodermitis",
        "label": "Neurodermitis"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "skoliose",
    "name": "Skoliose",
    "title": "Skoliose: Wirbelsäulenverkrümmung erkennen & behandeln",
    "metaDesc": "Skoliose ist eine dreidimensionale Verkrümmung der Wirbelsäule. Wie sie erkannt wird, was Physiotherapie, Korsett oder OP leisten und wo TCM begleiten kann.",
    "conditionName": "Skoliose",
    "lead": "Skoliose bezeichnet eine dreidimensionale Verkrümmung und Verdrehung der Wirbelsäule – von leichten, oft harmlosen Formen bis zu behandlungsbedürftigen Verläufen im Wachstum.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "nackenschmerzen",
        "label": "Nackenschmerzen"
      },
      {
        "slug": "spondylose",
        "label": "Spondylose"
      },
      {
        "slug": "morbus-bechterew",
        "label": "Morbus Bechterew"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "tuina",
        "label": "Tuina"
      }
    ]
  },
  {
    "slug": "koxarthrose",
    "name": "Koxarthrose",
    "title": "Koxarthrose: Hüftarthrose erkennen, behandeln & bewegen",
    "metaDesc": "Leistenschmerz, Anlaufschmerz, steife Hüfte? Wie Hüftarthrose diagnostiziert wird, warum Bewegung zentral bleibt und wie Akupunktur ergänzend begleiten kann.",
    "conditionName": "Koxarthrose (Hüftarthrose)",
    "lead": "Koxarthrose ist die Arthrose des Hüftgelenks: Der Gelenkknorpel verändert sich über Jahre, typisch sind Leistenschmerz, Anlaufschmerz und zunehmende Steifigkeit.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "hueftschmerzen",
        "label": "Hüftschmerzen"
      },
      {
        "slug": "arthrose",
        "label": "Arthrose"
      },
      {
        "slug": "gonarthrose",
        "label": "Gonarthrose"
      },
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "isg-blockade",
        "label": "ISG-Blockade"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "tuina",
        "label": "Tuina"
      }
    ]
  },
  {
    "slug": "panikattacken",
    "name": "Panikattacken",
    "title": "Panikattacken: Symptome verstehen & wirksame Hilfe finden",
    "metaDesc": "Herzrasen, Atemnot, Todesangst aus dem Nichts? Was bei einer Panikattacke passiert, wann körperliche Ursachen abgeklärt gehören und welche Behandlung hilft.",
    "conditionName": "Panikattacken",
    "lead": "Eine Panikattacke ist eine plötzliche Welle intensiver Angst mit heftigen Körpersymptomen – beängstigend, aber behandelbar.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "angststoerungen",
        "label": "Angststörungen"
      },
      {
        "slug": "stress-burnout",
        "label": "Stress &amp; Burnout"
      },
      {
        "slug": "schlafstoerungen",
        "label": "Schlafstörungen"
      },
      {
        "slug": "depressionen",
        "label": "Depressionen"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "nierensteine",
    "name": "Nierensteine",
    "title": "Nierensteine: Kolik erkennen, abklären & vorbeugen",
    "metaDesc": "Wellenartige Flankenschmerzen bis in die Leiste? Wie Nierensteine entstehen, wann die Kolik ein Notfall ist und was nach der Akutphase hilft.",
    "conditionName": "Nephrolithiasis",
    "lead": "Nierensteine sind Ablagerungen aus Mineralsalzen in Niere und Harnwegen. Gerät ein Stein in den Harnleiter, kann eine äusserst schmerzhafte Kolik entstehen.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "blasenentzuendung",
        "label": "Blasenentzündung"
      },
      {
        "slug": "prostata",
        "label": "Prostatabeschwerden"
      },
      {
        "slug": "reizblase",
        "label": "Reizblase"
      },
      {
        "slug": "gicht",
        "label": "Gicht"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "me-cfs",
    "name": "ME/CFS",
    "title": "ME/CFS: Chronisches Fatigue-Syndrom verstehen & begleiten",
    "metaDesc": "ME/CFS ist mehr als Müdigkeit: Kernmerkmal ist die Verschlechterung nach Belastung (PEM). Wie die Erkrankung eingeordnet wird und was bei der Begleitung zählt.",
    "conditionName": "Myalgische Enzephalomyelitis / Chronisches Fatigue-Syndrom",
    "lead": "ME/CFS ist eine komplexe chronische Multisystemerkrankung. Ihr Kernmerkmal: Schon geringe Anstrengung kann die Beschwerden Stunden bis Tage später deutlich verschlechtern.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "erschoepfung",
        "label": "Erschöpfung"
      },
      {
        "slug": "long-covid",
        "label": "Long Covid"
      },
      {
        "slug": "schlafstoerungen",
        "label": "Schlafstörungen"
      },
      {
        "slug": "fibromyalgie",
        "label": "Fibromyalgie"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "bakerzyste",
    "name": "Bakerzyste",
    "title": "Bakerzyste: Schwellung in der Kniekehle richtig einordnen",
    "metaDesc": "Spannungsgefühl oder Schwellung in der Kniekehle? Was eine Bakerzyste ist, warum oft das Kniegelenk dahintersteckt und wann die Wade zum Warnzeichen wird.",
    "conditionName": "Baker-Zyste (Poplitealzyste)",
    "lead": "Eine Bakerzyste ist eine flüssigkeitsgefüllte Aussackung in der Kniekehle – meist Folge eines gereizten Kniegelenks, etwa bei Arthrose oder Meniskusproblemen.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "knieschmerzen",
        "label": "Knieschmerzen"
      },
      {
        "slug": "gonarthrose",
        "label": "Gonarthrose"
      },
      {
        "slug": "arthrose",
        "label": "Arthrose"
      },
      {
        "slug": "wadenschmerzen",
        "label": "Wadenschmerzen"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "tuina",
        "label": "Tuina"
      }
    ]
  },
  {
    "slug": "niedriger-blutdruck",
    "name": "Niedriger Blutdruck",
    "title": "Niedriger Blutdruck (Hypotonie): Ursachen & was hilft",
    "metaDesc": "Schwindel, Schwäche, Schwarzwerden vor den Augen? Wann niedriger Blutdruck harmlos ist, welche Ursachen dahinterstecken können und wann abklären lassen.",
    "conditionName": "Hypotonie",
    "lead": "Ein niedriger Blutdruck ist bei vielen Menschen normal und harmlos – macht er aber Schwindel, Schwäche oder Ohnmachtsneigung, lohnt sich ein genauer Blick.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "schwindel",
        "label": "Schwindel"
      },
      {
        "slug": "erschoepfung",
        "label": "Erschöpfung"
      },
      {
        "slug": "bluthochdruck",
        "label": "Bluthochdruck"
      },
      {
        "slug": "durchblutungsstoerungen",
        "label": "Durchblutungsstörungen"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "erektile-dysfunktion",
    "name": "Erektile Dysfunktion",
    "title": "Erektile Dysfunktion: Ursachen, Abklärung & Behandlung",
    "metaDesc": "Erektionsprobleme sind häufig und behandelbar. Welche körperlichen und psychischen Ursachen mitspielen, warum das Herz mitgedacht wird und wo TCM begleiten kann.",
    "conditionName": "Erektile Dysfunktion",
    "lead": "Von erektiler Dysfunktion spricht man, wenn eine für den Geschlechtsverkehr ausreichende Erektion über längere Zeit nicht zustande kommt oder gehalten werden kann – ein häufiges, gut abklärbares Thema.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "prostata",
        "label": "Prostatabeschwerden"
      },
      {
        "slug": "stress-burnout",
        "label": "Stress &amp; Burnout"
      },
      {
        "slug": "diabetes-typ-2",
        "label": "Diabetes Typ 2"
      },
      {
        "slug": "bluthochdruck",
        "label": "Bluthochdruck"
      },
      {
        "slug": "schlafstoerungen",
        "label": "Schlafstörungen"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "eierstockzyste",
    "name": "Eierstockzyste",
    "title": "Eierstockzyste: Wann harmlos, wann abklären?",
    "metaDesc": "Eierstockzysten sind häufig und oft harmlos. Welche Formen es gibt, welche Beschwerden möglich sind und wann plötzliche Unterbauchschmerzen ein Notfall sind.",
    "conditionName": "Ovarialzyste",
    "lead": "Zysten an den Eierstöcken sind häufig, entstehen oft im normalen Zyklus und bilden sich meist von selbst zurück – entscheidend ist die gynäkologische Einordnung.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "pcos",
        "label": "PCOS"
      },
      {
        "slug": "zyklusbeschwerden",
        "label": "Zyklusbeschwerden"
      },
      {
        "slug": "menstruationsbeschwerden",
        "label": "Menstruationsbeschwerden"
      },
      {
        "slug": "myome",
        "label": "Myome"
      },
      {
        "slug": "endometriose",
        "label": "Endometriose"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "kubitaltunnelsyndrom",
    "name": "Kubitaltunnelsyndrom",
    "title": "Kubitaltunnelsyndrom: Kribbeln in Ring- & Kleinfinger",
    "metaDesc": "Kribbeln in Ring- und Kleinfinger, besonders bei gebeugtem Ellbogen? Wie die Einengung des Ulnarisnervs erkannt und behandelt wird – und was du selbst tun kannst.",
    "conditionName": "Kubitaltunnelsyndrom (Sulcus-ulnaris-Syndrom)",
    "lead": "Beim Kubitaltunnelsyndrom ist der Ellennerv (Nervus ulnaris) an der Innenseite des Ellbogens eingeengt – typisch sind Kribbeln und Taubheit in Ring- und Kleinfinger.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "karpaltunnelsyndrom",
        "label": "Karpaltunnelsyndrom"
      },
      {
        "slug": "nervenschmerzen",
        "label": "Nervenschmerzen"
      },
      {
        "slug": "tennisarm",
        "label": "Tennisarm &amp; Golferarm"
      },
      {
        "slug": "nackenschmerzen",
        "label": "Nackenschmerzen"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "tuina",
        "label": "Tuina"
      }
    ]
  },
  {
    "slug": "vitiligo",
    "name": "Vitiligo",
    "title": "Vitiligo: Weisse Hautflecken verstehen & einordnen",
    "metaDesc": "Scharf begrenzte weisse Flecken auf der Haut? Was bei Vitiligo passiert, wie die Pigmentstörung abgeklärt wird und welche Behandlungen es gibt.",
    "conditionName": "Vitiligo",
    "lead": "Bei Vitiligo verliert die Haut stellenweise ihr Pigment: Es entstehen scharf begrenzte weisse Flecken – körperlich meist harmlos, für viele Betroffene aber belastend.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "haarausfall",
        "label": "Haarausfall"
      },
      {
        "slug": "neurodermitis",
        "label": "Neurodermitis"
      },
      {
        "slug": "hashimoto",
        "label": "Hashimoto"
      },
      {
        "slug": "schuppenflechte",
        "label": "Schuppenflechte"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "scheidentrockenheit",
    "name": "Scheidentrockenheit",
    "title": "Scheidentrockenheit: Ursachen & was wirklich hilft",
    "metaDesc": "Trockenheit, Brennen oder Schmerzen beim Sex? Welche Ursachen hinter Scheidentrockenheit stecken, was Befeuchtungsmittel und Hormone leisten und wann abklären.",
    "conditionName": "Vaginale Trockenheit",
    "lead": "Scheidentrockenheit ist häufig und gut behandelbar – besonders in den Wechseljahren, nach der Geburt oder unter bestimmten Medikamenten.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "wechseljahre",
        "label": "Wechseljahre"
      },
      {
        "slug": "dyspareunie",
        "label": "Dyspareunie"
      },
      {
        "slug": "hitzewallungen",
        "label": "Hitzewallungen"
      },
      {
        "slug": "zyklusbeschwerden",
        "label": "Zyklusbeschwerden"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "adenomyose",
    "name": "Adenomyose",
    "title": "Adenomyose: Beschwerden verstehen & TCM begleitend nutzen",
    "metaDesc": "Adenomyose kann starke Regelschmerzen und Blutungen verursachen. Erfahre, wann ärztliche Abklärung wichtig ist und wie TCM Beschwerden ergänzend begleiten kann.",
    "conditionName": "Adenomyose",
    "lead": "Starke Regelschmerzen, Druck im Unterbauch und starke Blutungen können bei Adenomyose den Alltag erheblich belasten.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "endometriose",
        "label": "Endometriose"
      },
      {
        "slug": "myome",
        "label": "Myome"
      },
      {
        "slug": "menstruationsbeschwerden",
        "label": "Menstruationsbeschwerden"
      },
      {
        "slug": "zyklusbeschwerden",
        "label": "Zyklusbeschwerden"
      },
      {
        "slug": "eisenmangel",
        "label": "Eisenmangel"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "kraeutertherapie",
        "label": "Kräutertherapie"
      },
      {
        "slug": "moxibustion",
        "label": "Moxibustion"
      }
    ]
  },
  {
    "slug": "sibo",
    "name": "SIBO",
    "title": "SIBO: Symptome, Abklärung & TCM-Begleitung",
    "metaDesc": "SIBO kann Blähbauch, Bauchschmerzen und veränderten Stuhlgang verursachen. Diagnose, Behandlung und Möglichkeiten einer ergänzenden TCM-Begleitung.",
    "conditionName": "SIBO (Dünndarmfehlbesiedlung)",
    "lead": "Starker Blähbauch nach dem Essen, Bauchschmerzen und wechselnde Verdauung können zu einer Dünndarmfehlbesiedlung passen.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "reizdarm",
        "label": "Reizdarm"
      },
      {
        "slug": "blaehungen",
        "label": "Blähungen"
      },
      {
        "slug": "verdauungsprobleme",
        "label": "Verdauungsprobleme"
      },
      {
        "slug": "verstopfung",
        "label": "Verstopfung"
      },
      {
        "slug": "gastritis",
        "label": "Gastritis"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "kraeutertherapie",
        "label": "Kräutertherapie"
      },
      {
        "slug": "moxibustion",
        "label": "Moxibustion"
      }
    ]
  },
  {
    "slug": "laktoseintoleranz",
    "name": "Laktoseintoleranz",
    "title": "Laktoseintoleranz: Symptome, Test & Umgang im Alltag",
    "metaDesc": "Laktoseintoleranz verursacht häufig Blähungen, Bauchschmerzen oder Durchfall nach Milchprodukten. Diagnose, Alltagstipps und ergänzende TCM-Begleitung.",
    "conditionName": "Laktoseintoleranz",
    "lead": "Wenn Milchprodukte regelmässig Blähungen, Bauchkrämpfe oder Durchfall auslösen, kann eine Laktoseintoleranz dahinterstecken.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "verdauungsprobleme",
        "label": "Verdauungsprobleme"
      },
      {
        "slug": "blaehungen",
        "label": "Blähungen"
      },
      {
        "slug": "reizdarm",
        "label": "Reizdarm"
      },
      {
        "slug": "histaminintoleranz",
        "label": "Histaminintoleranz"
      },
      {
        "slug": "sibo",
        "label": "SIBO"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "kraeutertherapie",
        "label": "Kräutertherapie"
      }
    ]
  },
  {
    "slug": "fruktoseintoleranz",
    "name": "Fruktoseintoleranz",
    "title": "Fruktoseintoleranz: Symptome, Test & Ernährung",
    "metaDesc": "Fruktosemalabsorption kann Blähungen, Bauchschmerzen und Durchfall verursachen. Erfahre mehr über Diagnose, Ernährung und ergänzende TCM-Begleitung.",
    "conditionName": "Fruktosemalabsorption",
    "lead": "Beschwerden nach Obst, Säften oder fruktosereichen Lebensmitteln können zu einer Fruktosemalabsorption passen.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "laktoseintoleranz",
        "label": "Laktoseintoleranz"
      },
      {
        "slug": "reizdarm",
        "label": "Reizdarm"
      },
      {
        "slug": "blaehungen",
        "label": "Blähungen"
      },
      {
        "slug": "verdauungsprobleme",
        "label": "Verdauungsprobleme"
      },
      {
        "slug": "sibo",
        "label": "SIBO"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "kraeutertherapie",
        "label": "Kräutertherapie"
      }
    ]
  },
  {
    "slug": "zoeliakie",
    "name": "Zöliakie",
    "title": "Zöliakie: Symptome, Diagnose & glutenfreie Ernährung",
    "metaDesc": "Zöliakie ist eine Autoimmunerkrankung durch Gluten. Symptome, Diagnostik, glutenfreie Ernährung und die klaren Grenzen komplementärer TCM-Begleitung.",
    "conditionName": "Zöliakie",
    "lead": "Zöliakie ist keine gewöhnliche Unverträglichkeit: Gluten löst eine Autoimmunreaktion im Dünndarm aus.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "eisenmangel",
        "label": "Eisenmangel"
      },
      {
        "slug": "verdauungsprobleme",
        "label": "Verdauungsprobleme"
      },
      {
        "slug": "blaehungen",
        "label": "Blähungen"
      },
      {
        "slug": "reizdarm",
        "label": "Reizdarm"
      },
      {
        "slug": "laktoseintoleranz",
        "label": "Laktoseintoleranz"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "divertikulitis",
    "name": "Divertikulitis",
    "title": "Divertikulitis: Symptome, Behandlung & Zeit nach dem Schub",
    "metaDesc": "Divertikulitis verursacht häufig Schmerzen im linken Unterbauch. Wann ärztliche Behandlung nötig ist und wann komplementäre Begleitung infrage kommt.",
    "conditionName": "Divertikulitis",
    "lead": "Akute Divertikulitis gehört medizinisch abgeklärt. Komplementäre Behandlung kommt erst nach der Akutphase infrage.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "verdauungsprobleme",
        "label": "Verdauungsprobleme"
      },
      {
        "slug": "verstopfung",
        "label": "Verstopfung"
      },
      {
        "slug": "blaehungen",
        "label": "Blähungen"
      },
      {
        "slug": "reizdarm",
        "label": "Reizdarm"
      },
      {
        "slug": "gastritis",
        "label": "Gastritis"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "gastroparese",
    "name": "Gastroparese",
    "title": "Gastroparese: Symptome, Ursachen & begleitende Behandlung",
    "metaDesc": "Gastroparese führt zu verzögerter Magenentleerung, früher Sättigung und Übelkeit. Medizinische Abklärung und ergänzende symptomorientierte TCM-Begleitung.",
    "conditionName": "Gastroparese",
    "lead": "Frühe Sättigung, Übelkeit und langes Völlegefühl können bei einer verzögerten Magenentleerung auftreten.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "uebelkeit",
        "label": "Übelkeit"
      },
      {
        "slug": "verdauungsprobleme",
        "label": "Verdauungsprobleme"
      },
      {
        "slug": "gastritis",
        "label": "Gastritis"
      },
      {
        "slug": "funktionelle-dyspepsie",
        "label": "Funktionelle Dyspepsie (Reizmagen)"
      },
      {
        "slug": "blaehungen",
        "label": "Blähungen"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "funktionelle-dyspepsie",
    "name": "Funktionelle Dyspepsie (Reizmagen)",
    "title": "Funktionelle Dyspepsie & Reizmagen: Beschwerden verstehen",
    "metaDesc": "Reizmagen bzw. funktionelle Dyspepsie: Völlegefühl, frühe Sättigung und Oberbauchbeschwerden verstehen und Behandlungsmöglichkeiten kennenlernen.",
    "conditionName": "Funktionelle Dyspepsie",
    "lead": "Völlegefühl, frühe Sättigung oder Oberbauchdruck trotz unauffälliger Untersuchungen können zu einer funktionellen Dyspepsie passen.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "gastritis",
        "label": "Gastritis"
      },
      {
        "slug": "verdauungsprobleme",
        "label": "Verdauungsprobleme"
      },
      {
        "slug": "reizdarm",
        "label": "Reizdarm"
      },
      {
        "slug": "blaehungen",
        "label": "Blähungen"
      },
      {
        "slug": "sibo",
        "label": "SIBO"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "kraeutertherapie",
        "label": "Kräutertherapie"
      }
    ]
  },
  {
    "slug": "vaginismus",
    "name": "Vaginismus",
    "title": "Vaginismus: Schmerzen verstehen & Behandlungsmöglichkeiten",
    "metaDesc": "Vaginismus kann Penetration schmerzhaft oder unmöglich machen. Ursachen, medizinische Abklärung, Beckenbodentherapie und ergänzende TCM-Begleitung.",
    "conditionName": "Vaginismus",
    "lead": "Wenn sich der Beckenboden bei Penetration unwillkürlich anspannt, können Untersuchung, Tampon oder Geschlechtsverkehr schwierig oder schmerzhaft werden.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "dyspareunie",
        "label": "Dyspareunie"
      },
      {
        "slug": "vulvodynie",
        "label": "Vulvodynie"
      },
      {
        "slug": "zyklusbeschwerden",
        "label": "Zyklusbeschwerden"
      },
      {
        "slug": "endometriose",
        "label": "Endometriose"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "vulvodynie",
    "name": "Vulvodynie",
    "title": "Vulvodynie: chronische Vulvaschmerzen verstehen",
    "metaDesc": "Vulvodynie verursacht anhaltende Schmerzen oder Brennen im Vulvabereich. Diagnostik, Behandlung und mögliche ergänzende TCM-Begleitung.",
    "conditionName": "Vulvodynie",
    "lead": "Brennen, Stechen oder Berührungsschmerz im Vulvabereich kann bestehen, obwohl äusserlich wenig zu sehen ist.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "vaginismus",
        "label": "Vaginismus"
      },
      {
        "slug": "dyspareunie",
        "label": "Dyspareunie"
      },
      {
        "slug": "endometriose",
        "label": "Endometriose"
      },
      {
        "slug": "zyklusbeschwerden",
        "label": "Zyklusbeschwerden"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "dyspareunie",
    "name": "Dyspareunie",
    "title": "Dyspareunie: Schmerzen beim Geschlechtsverkehr abklären",
    "metaDesc": "Schmerzen beim Geschlechtsverkehr haben unterschiedliche Ursachen. Erfahre mehr über gynäkologische Abklärung, Beckenboden und ergänzende TCM-Begleitung.",
    "conditionName": "Dyspareunie",
    "lead": "Schmerzen beim Geschlechtsverkehr sind häufig, aber nicht etwas, das einfach ausgehalten werden muss.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "vaginismus",
        "label": "Vaginismus"
      },
      {
        "slug": "vulvodynie",
        "label": "Vulvodynie"
      },
      {
        "slug": "endometriose",
        "label": "Endometriose"
      },
      {
        "slug": "adenomyose",
        "label": "Adenomyose"
      },
      {
        "slug": "wechseljahre",
        "label": "Wechseljahre"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "interstitielle-zystitis",
    "name": "Interstitielle Zystitis",
    "title": "Interstitielle Zystitis: Blasenschmerzsyndrom verstehen",
    "metaDesc": "Interstitielle Zystitis kann Harndrang, Blasendruck und Schmerzen ohne klassischen Infekt verursachen. Abklärung und ergänzende Behandlungsmöglichkeiten.",
    "conditionName": "Interstitielle Zystitis / Bladder Pain Syndrome",
    "lead": "Starker Harndrang und Blasenschmerz trotz wiederholt fehlendem Infektnachweis können zu einem Blasenschmerzsyndrom passen.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "reizblase",
        "label": "Reizblase"
      },
      {
        "slug": "blasenentzuendung",
        "label": "Blasenentzündung"
      },
      {
        "slug": "inkontinenz",
        "label": "Inkontinenz"
      },
      {
        "slug": "vulvodynie",
        "label": "Vulvodynie"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "pmdd",
    "name": "PMDD",
    "title": "PMDD: wenn Beschwerden vor der Periode sehr stark werden",
    "metaDesc": "PMDD verursacht ausgeprägte psychische und körperliche Beschwerden vor der Menstruation. Diagnose, Behandlung und ergänzende TCM-Begleitung.",
    "conditionName": "Prämenstruelle dysphorische Störung (PMDD)",
    "lead": "PMDD ist deutlich mehr als gewöhnliches PMS und kann Stimmung, Beziehungen und Alltag jeden Monat massiv beeinträchtigen.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "pms",
        "label": "PMS"
      },
      {
        "slug": "zyklusbeschwerden",
        "label": "Zyklusbeschwerden"
      },
      {
        "slug": "menstruationsbeschwerden",
        "label": "Menstruationsbeschwerden"
      },
      {
        "slug": "depressionen",
        "label": "Depressionen"
      },
      {
        "slug": "angststoerungen",
        "label": "Angststörungen"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "schilddruesenueberfunktion",
    "name": "Schilddrüsenüberfunktion",
    "title": "Schilddrüsenüberfunktion: Symptome, Ursachen & Behandlung",
    "metaDesc": "Hyperthyreose kann Herzrasen, Gewichtsverlust und Unruhe verursachen. Ursachen wie Morbus Basedow gehören medizinisch behandelt; TCM höchstens ergänzend.",
    "conditionName": "Schilddrüsenüberfunktion (Hyperthyreose)",
    "lead": "Bei einer Schilddrüsenüberfunktion produziert der Körper zu viele Schilddrüsenhormone – das gehört medizinisch abgeklärt und behandelt.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "hashimoto",
        "label": "Hashimoto"
      },
      {
        "slug": "schilddruesenunterfunktion",
        "label": "Schilddrüsenunterfunktion"
      },
      {
        "slug": "schlafstoerungen",
        "label": "Schlafstörungen"
      },
      {
        "slug": "stress-burnout",
        "label": "Stress &amp; Burnout"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "morbus-bechterew",
    "name": "Morbus Bechterew",
    "title": "Morbus Bechterew: Rückenschmerz & ergänzende Behandlung",
    "metaDesc": "Morbus Bechterew verursacht entzündliche Rückenbeschwerden. Rheumatologische Behandlung bleibt zentral; TCM kann Schmerzen ergänzend begleiten.",
    "conditionName": "Axiale Spondyloarthritis / Morbus Bechterew",
    "lead": "Rückenschmerz, der in Ruhe schlechter und durch Bewegung besser wird, kann bei entzündlichen Wirbelsäulenerkrankungen auftreten.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "isg-blockade",
        "label": "ISG-Blockade"
      },
      {
        "slug": "rheuma",
        "label": "Rheuma"
      },
      {
        "slug": "rheumatoide-arthritis",
        "label": "Rheumatoide Arthritis"
      },
      {
        "slug": "spinalkanalstenose",
        "label": "Spinalkanalstenose"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "tuina",
        "label": "Tuina"
      }
    ]
  },
  {
    "slug": "spondylose",
    "name": "Spondylose",
    "title": "Spondylose: Verschleiss der Wirbelsäule richtig einordnen",
    "metaDesc": "Spondylose beschreibt degenerative Veränderungen der Wirbelsäule. Symptome, Abklärung, Bewegung und ergänzende TCM-Schmerzbehandlung.",
    "conditionName": "Spondylose",
    "lead": "Verschleiss im Röntgenbild bedeutet nicht automatisch Schmerz – entscheidend ist, ob Befund und Beschwerden zusammenpassen.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "nackenschmerzen",
        "label": "Nackenschmerzen"
      },
      {
        "slug": "arthrose",
        "label": "Arthrose"
      },
      {
        "slug": "spinalkanalstenose",
        "label": "Spinalkanalstenose"
      },
      {
        "slug": "bandscheibenvorfall",
        "label": "Bandscheibenvorfall"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "tuina",
        "label": "Tuina"
      },
      {
        "slug": "schroepfen",
        "label": "Schröpfen"
      }
    ]
  },
  {
    "slug": "gonarthrose",
    "name": "Gonarthrose",
    "title": "Gonarthrose: Kniearthrose behandeln & Schmerzen lindern",
    "metaDesc": "Gonarthrose ist Arthrose des Kniegelenks. Bewegung, Physiotherapie und medizinische Behandlung stehen im Zentrum; Akupunktur kann Schmerzen ergänzend lindern.",
    "conditionName": "Kniearthrose (Gonarthrose)",
    "lead": "Anlaufschmerz, Belastungsschmerz und zunehmende Steifigkeit können zu einer Kniearthrose passen.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "knieschmerzen",
        "label": "Knieschmerzen"
      },
      {
        "slug": "arthrose",
        "label": "Arthrose"
      },
      {
        "slug": "rheuma",
        "label": "Rheuma"
      },
      {
        "slug": "patellaspitzensyndrom",
        "label": "Patellaspitzensyndrom"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "tuina",
        "label": "Tuina"
      }
    ]
  },
  {
    "slug": "impingement-syndrom",
    "name": "Impingement-Syndrom",
    "title": "Impingement-Syndrom der Schulter: Ursachen & Behandlung",
    "metaDesc": "Schulterschmerz beim Heben des Arms kann zu einem Impingement-Syndrom passen. Diagnose, Physiotherapie und ergänzende Akupunktur.",
    "conditionName": "Schulter-Impingement",
    "lead": "Wenn der Arm beim seitlichen oder oberen Anheben schmerzt, können gereizte Sehnen und Schleimbeutel beteiligt sein.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "schulterschmerzen",
        "label": "Schulterschmerzen"
      },
      {
        "slug": "rotatorenmanschette",
        "label": "Rotatorenmanschette"
      },
      {
        "slug": "kalkschulter",
        "label": "Kalkschulter"
      },
      {
        "slug": "frozen-shoulder",
        "label": "Frozen Shoulder"
      },
      {
        "slug": "schleimbeutelentzuendung",
        "label": "Schleimbeutelentzündung"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "tuina",
        "label": "Tuina"
      }
    ]
  },
  {
    "slug": "patellaspitzensyndrom",
    "name": "Patellaspitzensyndrom",
    "title": "Patellaspitzensyndrom: Knieschmerz bei Sport & Belastung",
    "metaDesc": "Patellaspitzensyndrom verursacht belastungsabhängige Schmerzen unter der Kniescheibe. Trainingssteuerung, Physiotherapie und ergänzende Schmerzbehandlung.",
    "conditionName": "Patellaspitzensyndrom",
    "lead": "Schmerz direkt unter der Kniescheibe beim Springen, Laufen oder Treppensteigen kann von der Patellasehne kommen.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "knieschmerzen",
        "label": "Knieschmerzen"
      },
      {
        "slug": "gonarthrose",
        "label": "Gonarthrose"
      },
      {
        "slug": "sehnenscheidenentzuendung",
        "label": "Sehnenscheidenentzündung"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "tuina",
        "label": "Tuina"
      }
    ]
  },
  {
    "slug": "costochondritis",
    "name": "Costochondritis",
    "title": "Costochondritis: Schmerzen am Brustkorb richtig einordnen",
    "metaDesc": "Costochondritis kann druckabhängige Schmerzen am Brustbein verursachen. Brustschmerz muss jedoch zuerst sicher medizinisch eingeordnet werden.",
    "conditionName": "Costochondritis",
    "lead": "Schmerzen an den Übergängen zwischen Rippen und Brustbein können vom Bewegungsapparat kommen – Brustschmerz darf trotzdem nie vorschnell selbst diagnostiziert werden.",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "interkostalneuralgie",
        "label": "Interkostalneuralgie"
      },
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "schulterschmerzen",
        "label": "Schulterschmerzen"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "nervenschmerzen",
    "name": "Nervenschmerzen",
    "title": "",
    "metaDesc": "",
    "conditionName": "Nervenschmerzen",
    "lead": "",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "polyneuropathie",
        "label": "Polyneuropathie"
      },
      {
        "slug": "crps",
        "label": "CRPS"
      },
      {
        "slug": "interkostalneuralgie",
        "label": "Interkostalneuralgie"
      },
      {
        "slug": "fazialisparese",
        "label": "Fazialisparese"
      },
      {
        "slug": "trigeminusneuralgie",
        "label": "Trigeminusneuralgie"
      }
    ],
    "therapies": []
  },
  {
    "slug": "guertelrose",
    "name": "Gürtelrose",
    "title": "",
    "metaDesc": "",
    "conditionName": "Gürtelrose",
    "lead": "",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "nervenschmerzen",
        "label": "Nervenschmerzen"
      },
      {
        "slug": "interkostalneuralgie",
        "label": "Interkostalneuralgie"
      },
      {
        "slug": "fazialisparese",
        "label": "Fazialisparese"
      },
      {
        "slug": "polyneuropathie",
        "label": "Polyneuropathie"
      }
    ],
    "therapies": []
  },
  {
    "slug": "reizblase",
    "name": "Reizblase",
    "title": "",
    "metaDesc": "",
    "conditionName": "Reizblase",
    "lead": "",
    "bodyHtml": "",
    "faqs": [],
    "related": [
      {
        "slug": "blasenentzuendung",
        "label": "Blasenentzündung"
      },
      {
        "slug": "inkontinenz",
        "label": "Inkontinenz"
      },
      {
        "slug": "bettnaessen",
        "label": "Bettnässen"
      },
      {
        "slug": "prostata",
        "label": "Prostatabeschwerden"
      }
    ],
    "therapies": []
  }
];
export const beschwerdeBySlug = (slug: string): Beschwerde | undefined => beschwerden.find((b) => b.slug === slug);
