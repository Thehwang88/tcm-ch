// Artikelpaket 24.10.2026: drei Termin- und Sicherheitsfragen im bestehenden Fragen-Modell
// (Frage-Interface aus fragen.ts). Eigene Datei wie fragen-entscheidungen.ts; fragen.ts hängt
// das Array an. cohort: 'artikel-2026-10-24' => Schema-Daten aus PUBLISHED_ARTIKEL_2026_10_24
// (befunde-werte.ts), bis zum Release ungesetzt; kein FRAGEN_DATEN-Erbe.
// Kurzantwort zuerst; drei Anschlussfragen und Quellen sichtbar im bodyHtml; kein FAQPage-Schema.
// Ownership: allgemeine Kräuter-Nebenwirkungen bleiben bei tcm-kraeuter-nebenwirkungen, Laborwerte
// bei /gesundheitsbibliothek/befunde-werte/leberwerte-erhoeht/, Bluthochdruck bei /beschwerden/bluthochdruck/.
import type { Frage } from './fragen';

const REDAKTION_P = { name: 'Redaktion TCM.ch', role: 'Redaktionelle Einordnung auf Basis der verlinkten Quellen' };

export const fragenArtikel24: Frage[] = [
  {
    slug: 'blutspenden-nach-akupunktur',
    question: 'Darf ich nach einer Akupunktur Blut spenden?',
    title: 'Blutspenden nach Akupunktur: Was gilt in der Schweiz?',
    metaDesc: 'Blut spenden nach Akupunktur: Blutspende SRK Schweiz nennt eine Wartefrist von vier Monaten. Was du dem Blutspendedienst angibst und wer über Ausnahmen entscheidet.',
    deck: 'Wer regelmässig Blut spendet, sollte eine Akupunktur mit dem Spendetermin abstimmen. Über die Spendetauglichkeit entscheidet der Blutspendedienst, nicht die Praxis.',
    kurz: '<p>Die öffentliche Kriterienliste von Blutspende SRK Schweiz nennt nach einer Akupunktur-Behandlung eine Wartefrist von vier Monaten. Begründet wird sie damit, dass eine Entzündung oder Infektion ausgeschlossen werden soll. Ob in deinem Fall etwas anderes gilt, entscheidet dein regionaler Blutspendedienst. Plane deshalb Spende und Akupunktur so, dass du die Frage vorher klären kannst.</p>',
    bodyHtml: `<h2>Was die Liste von Blutspende SRK Schweiz sagt</h2>
<p>Blutspende SRK Schweiz führt auf ihrer Website eine Liste von Gründen, die eine Spende vorübergehend ausschliessen. Dort steht als grundsätzlicher, vorübergehender Ausschlussgrund: Wer in den letzten vier Monaten ein neues Piercing oder eine Tätowierung bekommen oder eine Akupunktur-Behandlung erhalten hat, für den gilt eine Wartefrist von vier Monaten, damit eine Entzündung oder Infektion ausgeschlossen werden kann (Stand der Abfrage: 24. Oktober 2026).</p>
<p>Diese Frist ist eine Vorsichtsregel. Sie bedeutet nicht, dass nach einer Akupunktur eine Infektion vermutet wird.</p>
<h2>Wer über Ausnahmen entscheidet</h2>
<p>Ob es Ausnahmen gibt, etwa je nach Art der Behandlung oder der behandelnden Fachperson, legt die öffentliche Liste nicht dar. Ausführlichere Vorschriften veröffentlicht Blutspende SRK Schweiz in einer eigenen Dokumentensammlung; diese Seite stützt sich nur auf die öffentliche Liste. Über deine Spendetauglichkeit entscheidet dein regionaler Blutspendedienst. Frag dort nach, bevor du eine Spende planst.</p>
<p>Regeln aus anderen Ländern lassen sich nicht auf die Schweiz übertragen. Was in Deutschland, Grossbritannien oder anderswo gilt, ist für deine Spende hier nicht massgebend.</p>
<h2>Was du beim Blutspendedienst angeben solltest</h2>
<ul>
<li>das Datum der letzten Akupunktur-Behandlung,</li>
<li>welche Verfahren angewendet wurden, zum Beispiel Akupunktur, Elektroakupunktur oder blutiges Schröpfen,</li>
<li>wer behandelt hat, falls der Dienst danach fragt.</li>
</ul>
<p>Halte diese Angaben am besten schon vor dem Spendetermin bereit. Bei Unklarheit hilft dir deine Praxis mit den Behandlungsdaten.</p>
<h2>Spende und Behandlung planen</h2>
<p>Wenn du regelmässig spendest und eine Akupunktur-Serie beginnen möchtest, sprich die Reihenfolge vorher ab. Eine Spende vor Beginn der Behandlung lässt sich oft leichter einplanen als eine Pause mitten in einer Serie. Wann genau du wieder spenden darfst, sagt dir der Blutspendedienst.</p>
<h2>Häufige Fragen</h2>
<h3>Gelten sterile Einmalnadeln automatisch als Ausnahme?</h3>
<p>Nein, nicht automatisch. Die öffentliche Liste von Blutspende SRK Schweiz nennt dazu keine Ausnahme. Ob für dich etwas anderes gilt, entscheidet der Blutspendedienst.</p>
<h3>Was muss ich beim Blutspendedienst angeben?</h3>
<p>Datum und Art der Behandlung. Beantworte die Fragen im Spendefragebogen vollständig, auch wenn die Behandlung harmlos verlaufen ist.</p>
<h3>Gilt die Regel überall gleich?</h3>
<p>Nein. Jedes Land hat eigene Vorschriften. Für eine Spende in der Schweiz zählen die Regeln von Blutspende SRK Schweiz und die Auskunft deines regionalen Dienstes.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://www.blutspende.ch/de/spenderinfos/spende-check/ausschlusskriterien" target="_blank" rel="noopener">Blutspende SRK Schweiz: Ausschlusskriterien (Spende-Check; Wartefrist von vier Monaten nach Akupunktur-Behandlung; abgerufen 24. Oktober 2026)</a></li>
<li><a href="https://vorschriften.blutspende.ch/de/downloads" target="_blank" rel="noopener">Blutspende SRK Schweiz: Vorschriften für die Blutspende (Dokumentensammlung; Einzeldokument zu Ausnahmen bei Akupunktur nicht eingesehen)</a></li>
</ul>`,
    ctaTitle: 'Behandlungsdaten für den Spendedienst',
    ctaText: 'Wenn du für den Blutspendedienst Datum und Art deiner Behandlung brauchst, frag in deiner Praxis nach. Über die Spende selbst entscheidet der Blutspendedienst.',
    ctaLabel: 'Anfrage senden',
    cohort: 'artikel-2026-10-24',
    autor: REDAKTION_P,
    verwandt: [
      { href: '/gesundheitsbibliothek/fragen/nach-der-behandlung/', label: 'Was gilt nach der Behandlung?' },
      { href: '/gesundheitsbibliothek/fragen/akupunktur-nebenwirkungen/', label: 'Welche Nebenwirkungen hat Akupunktur?' },
      { href: '/gesundheitsbibliothek/fragen/sicherheit-nebenwirkungen/', label: 'Alle Fragen zu Sicherheit & Nebenwirkungen' },
    ],
    mehr: [
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
    ],
  },
  {
    slug: 'tcm-kraeuter-leber',
    question: 'Können TCM-Kräuter die Leber schädigen?',
    title: 'Können TCM-Kräuter die Leber schädigen?',
    metaDesc: 'Leberschäden durch chinesische Kräuter sind selten, aber für einzelne Präparate gut dokumentiert. Bekannte Beispiele, Warnzeichen und was du mitbringst.',
    deck: 'Natürlich heisst nicht leberschonend. Für einzelne chinesische Arzneimittel sind Leberschäden gut beschrieben. Was das für deine Rezeptur bedeutet und wann du sofort ärztlich abklären lassen solltest.',
    kurz: '<p>Ja, das ist möglich, aber selten. Von den vielen chinesischen Arzneimitteln sind nur wenige mit klinisch relevanten Leberschäden in Verbindung gebracht worden. Ein gut dokumentiertes Beispiel ist Polygonum multiflorum, auch He Shou Wu oder Fo-Ti genannt. Zusätzlich können falsch deklarierte oder verunreinigte Produkte ein Risiko sein. Entscheidend sind deshalb die genaue Rezeptur, die Produktqualität, deine übrigen Medikamente und das rasche Handeln bei Warnzeichen.</p>',
    bodyHtml: `<h2>Was über Leberschäden durch chinesische Kräuter bekannt ist</h2>
<p>Die US-Datenbank LiverTox zu arzneimittelbedingten Leberschäden hält fest: Von den mehr als 7000 chinesischen Arzneimitteln sind nur wenige mit klinisch deutlichen Leberschäden in Verbindung gebracht worden. Häufig genannt werden unter anderem Jin Bu Huan, Ma Huang (Ephedra) und Shou Wu Pian. Manche verursachen Schäden bei hohen Konzentrationen, einige auch bei empfohlener Dosierung. Viele Präparate sind Mischungen, deren Zusammensetzung trotz gleichem Namen stark schwanken kann.</p>
<p>LiverTox beschreibt auch Probleme bei der Kennzeichnung: Produkte können falsch deklariert oder mit Giftstoffen, Metallen oder sogar herkömmlichen Arzneimitteln verunreinigt sein. Warum Herkunft und Prüfung der Kräuter wichtig sind, erklärt der Artikel <a href="/wissen/chinesische-kraeuter-qualitaet-schweiz/">Qualität und Zulassung chinesischer Kräuter</a>.</p>
<h2>Ein Beispiel: Polygonum multiflorum</h2>
<p>Polygonum multiflorum, auch bekannt als He Shou Wu, Shou Wu Pian oder Fo-Ti, ist in zahlreichen Berichten mit akuten Leberschäden in Verbindung gebracht worden, teils schwer und sogar tödlich. Eine Fallserie beschrieb 18 sonst gesunde Menschen mit Leberschäden nach der Einnahme. Die Beschwerden begannen im Median nach 27 Tagen, in einer Spanne von einem Tag bis 120 Tagen. Häufig waren Müdigkeit, Appetitlosigkeit und Gelbsucht. Nach dem Absetzen und unterstützender Behandlung erholten sich alle.</p>
<p>Solche Fallberichte zeigen, dass ein Risiko besteht. Sie sagen nichts darüber, wie häufig Leberschäden bei einer bestimmten Rezeptur auftreten, und sie gelten nicht für jedes chinesische Kraut.</p>
<h2>Was du vor einer Einnahme mitbringen solltest</h2>
<ul>
<li>den genauen Namen und die Bestandteile der Rezeptur,</li>
<li>alle Medikamente, Nahrungsergänzungen und andere pflanzliche Mittel, die du nimmst,</li>
<li>bekannte Lebererkrankungen und frühere auffällige Leberwerte,</li>
<li>deinen üblichen Alkoholkonsum.</li>
</ul>
<p>Wie Wechselwirkungen und Nebenwirkungen allgemein eingeordnet werden, steht unter <a href="/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/">Nebenwirkungen von TCM-Kräutern</a>.</p>
<p>Wer bereits eine Fettleber hat und über Kräuter nachdenkt, findet die Studienlage und die Vorsichtspunkte unter <a href="/wissen/chinesische-kraeuter-bei-fettleber/">Chinesische Kräuter bei Fettleber</a>.</p><h2>Warnzeichen: sofort ärztlich abklären</h2>
<p>Gelbe Haut oder gelbe Augen, dunkler Urin, heller Stuhl, starker Juckreiz, ungewohnte Müdigkeit, Appetitlosigkeit oder Schmerzen im rechten Oberbauch während einer Kräutereinnahme gehören sofort ärztlich abgeklärt. Nimm die Kräuter bis zur Klärung nicht weiter ein und informiere die verordnende Fachperson. Bring Packungen, Reste der Kräuter und die Rezeptur mit; sie helfen, das auslösende Mittel zu bestimmen.</p>
<p>Ein einzelner erhöhter Laborwert ist noch keine Diagnose. Was erhöhte Leberwerte bedeuten können, erklärt die Seite <a href="/gesundheitsbibliothek/befunde-werte/leberwerte-erhoeht/">Leberwerte erhöht</a>. Ob und wann Kontrollen nötig sind, entscheidet die Ärztin oder der Arzt.</p>
<h2>Häufige Fragen</h2>
<h3>Ist natürlich automatisch leberschonend?</h3>
<p>Nein. Chinesische Kräuter sind wirksame Arzneimittel. Für einzelne Präparate sind Leberschäden gut dokumentiert, auch bei empfohlener Dosierung.</p>
<h3>Was soll ich zum Gespräch mitbringen?</h3>
<p>Die genaue Rezeptur oder Packung, eine vollständige Liste deiner Medikamente und Nahrungsergänzungen und Angaben zu früheren Leberwerten oder Lebererkrankungen.</p>
<h3>Sind normale frühere Leberwerte eine Garantie?</h3>
<p>Nein. In der Fallserie traten die Leberschäden erst Tage bis Monate nach Beginn der Einnahme auf. Achte deshalb während der ganzen Einnahme auf Warnzeichen.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://www.ncbi.nlm.nih.gov/books/NBK548589/" target="_blank" rel="noopener">LiverTox: Chinese and other Asian Herbal Medicines. National Institute of Diabetes and Digestive and Kidney Diseases, 2022. PMID 31643904. (PubMed-Zusammenfassung des Kapitels)</a></li>
<li><a href="https://www.ncbi.nlm.nih.gov/books/NBK548795/" target="_blank" rel="noopener">LiverTox: Polygonum Multiflorum. National Institute of Diabetes and Digestive and Kidney Diseases, 2020. PMID 31644102. (PubMed-Zusammenfassung des Kapitels)</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/24559819/" target="_blank" rel="noopener">Dong H et al. Eighteen cases of liver injury following ingestion of Polygonum multiflorum. Complementary Therapies in Medicine, 2014. PMID 24559819. (PubMed-Abstract)</a></li>
<li><a href="https://www.nhs.uk/conditions/jaundice/" target="_blank" rel="noopener">NHS. Jaundice. (Patienteninformation, Volltext)</a></li>
</ul>`,
    ctaTitle: 'Bei Verdacht zuerst ärztlich abklären',
    ctaText: 'Bei Warnzeichen geh zuerst zur Ärztin oder zum Arzt. Für eine geplante Kräutertherapie bring deine Medikamentenliste mit; wir besprechen die Rezeptur und ihre Bestandteile.',
    ctaLabel: 'Anfrage senden',
    cohort: 'artikel-2026-10-24',
    autor: REDAKTION_P,
    verwandt: [
      { href: '/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/', label: 'Welche Nebenwirkungen haben TCM-Kräuter?' },
      { href: '/gesundheitsbibliothek/fragen/tcm-kraeuter-einnahme/', label: 'Was gehört auf den Einnahmeplan?' },
      { href: '/gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/', label: 'Wann sollte ich zuerst zum Arzt?' },
    ],
    mehr: [
      { href: '/therapien/kraeutertherapie/', label: 'Chinesische Kräutertherapie', cat: 'Therapie' },
      { href: '/gesundheitsbibliothek/befunde-werte/leberwerte-erhoeht/', label: 'Leberwerte erhöht', cat: 'Befund' },
      { href: '/wissen/chinesische-kraeuter-qualitaet-schweiz/', label: 'Qualität und Zulassung chinesischer Kräuter', cat: 'Wissen' },
    ],
  },
  {
    slug: 'tcm-kraeuter-bluthochdruck-sicherheit',
    question: 'Worauf muss ich bei TCM-Kräutern mit Bluthochdruck achten?',
    title: 'TCM-Kräuter bei Bluthochdruck: Worauf musst du achten?',
    metaDesc: 'Bluthochdruck und chinesische Kräuter: Warum Süssholz den Blutdruck erhöhen kann und weshalb Rezeptur und Medikamente gemeinsam geprüft werden.',
    deck: 'Bei bekanntem Bluthochdruck gehört jede Kräuterrezeptur vor der Einnahme geprüft. Ein gut belegtes Beispiel ist Süssholz. Es geht um Sicherheit, nicht um eine pflanzliche Blutdrucktherapie.',
    kurz: '<p>Einzelne Bestandteile chinesischer Rezepturen können den Blutdruck beeinflussen. Am besten belegt ist das für Süssholz (Gan Cao): Der Inhaltsstoff Glycyrrhizin kann den Blutdruck erhöhen und das Kalium im Blut senken, schon in vergleichsweise kleinen Mengen. Nicht jede Rezeptur enthält Süssholz, und es gibt keine allgemein sichere Menge. Lass deine Rezeptur deshalb zusammen mit deinen Blutdruckmedikamenten prüfen und setze keine Medikamente ab.</p>',
    bodyHtml: `<h2>Süssholz: das bekannteste Beispiel</h2>
<p>Süssholzwurzel, in der chinesischen Medizin Gan Cao genannt, enthält Glycyrrhizin. Nach dem US-Gesundheitsinstitut NCCIH kann dieser Stoff schwere Nebenwirkungen wie Herzrhythmusstörungen verursachen, vor allem bei grossen Mengen oder langer Einnahme. Schon kleine Mengen wurden bei Menschen mit Bluthochdruck, mit hohem Salzkonsum oder mit Herz- oder Nierenerkrankungen mit schweren Nebenwirkungen in Verbindung gebracht.</p>
<p>Eine Auswertung von 18 Studien mit 337 Teilnehmenden fand nach regelmässiger Einnahme von mindestens 100 mg Glycyrrhizinsäure pro Tag einen Anstieg des oberen Blutdruckwerts um im Mittel rund 5 mmHg und des unteren um rund 3 mmHg. Das Kalium im Blut sank. Je höher die Tagesmenge, desto stärker stieg der Blutdruck. In einer kleinen Studie mit 28 gesunden jungen Erwachsenen stieg der zu Hause gemessene obere Blutdruckwert bereits bei 100 mg Glycyrrhizinsäure pro Tag über zwei Wochen um rund 3 mmHg.</p>
<h2>Was nicht für alle Kräuter gilt</h2>
<p>Nicht jede chinesische Rezeptur enthält Süssholz, und die Menge in einer Rezeptur ist sehr unterschiedlich. Eine allgemein sichere Menge lässt sich nicht nennen; die Studie von 2024 stellt sogar die bisher angenommene Grenze infrage. Ob deine Rezeptur betroffen ist, kann nur anhand der genauen Zusammensetzung beurteilt werden.</p>
<h2>Weitere bekannte Beispiele</h2>
<ul>
<li>Ephedra, chinesisch Ma Huang: Nach NCCIH wurde Ephedra schon in eher niedrigen Mengen und bei kurzer Einnahme mit Bluthochdruck, Herzinfarkt und Schlaganfall in Verbindung gebracht. In den USA sind Nahrungsergänzungsmittel mit Ephedra-Alkaloiden seit 2004 verboten.</li>
<li>Ginseng: Nach NCCIH ist unklar, ob Ginseng mit bestimmten Blutdruckmedikamenten wie Kalziumkanalblockern wechselwirkt. Diese Unsicherheit ist ein Grund für die Prüfung, kein Beleg für eine Gefahr.</li>
</ul>
<h2>Was du tun solltest</h2>
<ul>
<li>Bring deine Rezeptur oder Packung und die Liste deiner Medikamente zum Gespräch mit.</li>
<li>Sag, ob du Bluthochdruck hast, wie gut er eingestellt ist und ob Herz- oder Nierenerkrankungen bekannt sind.</li>
<li>Setze Blutdruckmedikamente nie wegen einer Kräutertherapie ab und ändere die Dosis nicht selbst.</li>
<li>Informiere deine Ärztin oder deinen Arzt über die Kräuter; ob Blutdruck- oder Blutkontrollen nötig sind, entscheidet die ärztliche Seite.</li>
</ul>
<p>Was bei Bluthochdruck allgemein gilt und wann sofort Hilfe nötig ist, steht auf der Seite <a href="/beschwerden/bluthochdruck/">Bluthochdruck</a>. Allgemeine Wechselwirkungen erklärt <a href="/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/">Nebenwirkungen von TCM-Kräutern</a>.</p>
<h2>Häufige Fragen</h2>
<h3>Kann eine Rezeptur den Blutdruck erhöhen?</h3>
<p>Ja, das ist möglich, wenn sie zum Beispiel Süssholz enthält. Wie stark, hängt von der Menge und von dir ab.</p>
<h3>Gilt das für alle Kräuter?</h3>
<p>Nein. Es betrifft bestimmte Bestandteile. Deshalb zählt die genaue Zusammensetzung deiner Rezeptur, nicht die Bezeichnung «TCM-Kräuter».</p>
<h3>Reicht es, wenn ich selbst messe?</h3>
<p>Selbst messen ist hilfreich, ersetzt aber nicht die Prüfung der Rezeptur und die ärztliche Betreuung. Melde auffällige Werte deiner Ärztin oder deinem Arzt.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://www.nccih.nih.gov/health/licorice-root" target="_blank" rel="noopener">NCCIH. Licorice Root: Usefulness and Safety. (Patienteninformation, Volltext)</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/28660884/" target="_blank" rel="noopener">Penninkilampi R et al. The association between consistent licorice ingestion, hypertension and hypokalaemia: a systematic review and meta-analysis. Journal of Human Hypertension, 2017. PMID 28660884. (PubMed-Abstract)</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/38246526/" target="_blank" rel="noopener">af Geijerstam P et al. A low dose of daily licorice intake affects renin, aldosterone, and home blood pressure in a randomized crossover trial. American Journal of Clinical Nutrition, 2024. PMID 38246526. (PubMed-Abstract)</a></li>
<li><a href="https://www.nccih.nih.gov/health/ephedra" target="_blank" rel="noopener">NCCIH. Ephedra. (Patienteninformation, Volltext)</a></li>
<li><a href="https://www.nccih.nih.gov/health/providers/digest/herb-drug-interactions-science" target="_blank" rel="noopener">NCCIH. Herb-Drug Interactions: What the Science Says. (Fachinformation, Volltext)</a></li>
</ul>`,
    ctaTitle: 'Rezeptur und Medikamente gemeinsam prüfen',
    ctaText: 'Bring deine Rezeptur und die Liste deiner Blutdruckmedikamente mit. Wir prüfen die Bestandteile; deine Medikamente nimmst du weiter nach ärztlichem Plan.',
    ctaLabel: 'Anfrage senden',
    cohort: 'artikel-2026-10-24',
    autor: REDAKTION_P,
    verwandt: [
      { href: '/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/', label: 'Welche Nebenwirkungen haben TCM-Kräuter?' },
      { href: '/gesundheitsbibliothek/fragen/tcm-kraeuter-einnahme/', label: 'Was gehört auf den Einnahmeplan?' },
      { href: '/gesundheitsbibliothek/befunde-werte/blutdruck-140-90/', label: 'Blutdruck 140/90: Was bedeutet der Wert?' },
    ],
    mehr: [
      { href: '/beschwerden/bluthochdruck/', label: 'Bluthochdruck', cat: 'Beschwerde' },
      { href: '/therapien/kraeutertherapie/', label: 'Chinesische Kräutertherapie', cat: 'Therapie' },
    ],
  },
];
