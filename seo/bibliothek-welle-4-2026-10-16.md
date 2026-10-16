# Bibliothek Welle 4 (16.10.2026): 34 Seiten, Draft

Basis: `main` 8f2dfabcb32b63632dcc831435bc65a048dce987. Branch `content/wave-34-beschwerden-wissen-befunde`. Status: Draft, nicht gemergt, nicht deployt.

Redaktion ohne Autor:in oder Reviewer. Kohorten-Konstante `PUBLISHED_WELLE_4_2026_10` (src/data/befunde-werte.ts) bleibt `undefined` bis zum Release; Wissen, Befunde und Untersuchungen geben bis dahin kein `datePublished` aus. Beschwerden-Leaves tragen kein Datum. Kein FAQPage-/Question-Schema für die Kohorte (Beschwerden: `NO_FAQ_SCHEMA` in `src/pages/beschwerden/[slug].astro`; übrige Templates rendern FAQ nur als HTML).

## Beschwerden

### /beschwerden/schnappfinger/

Title: Schnappfinger: Ursachen, Abklärung und Behandlung

Quellen:

- NHS: Trigger finger: https://www.nhs.uk/conditions/trigger-finger/
- Donati et al. 2024: From diagnosis to rehabilitation of trigger finger, BMC Musculoskeletal Disorders: https://pubmed.ncbi.nlm.nih.gov/39716186/

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /beschwerden/sehnenscheidenentzuendung/ («Schnappfinger»)
- /koerpersignale/finger-morgens-steif/ («schnellender Finger»)

### /beschwerden/steissbeinschmerzen/

Title: Steissbeinschmerzen: Ursachen, Sitzen und Behandlung

Quellen:

- NHS: Tailbone (coccyx) pain: https://www.nhs.uk/conditions/tailbone-coccyx-pain/
- Foye 2017: Coccydynia: Tailbone Pain, Physical Medicine and Rehabilitation Clinics of North America: https://pubmed.ncbi.nlm.nih.gov/28676363/

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /beschwerden/isg-blockade/ («Steissbeinschmerzen»)
- /beschwerden/piriformis-syndrom/ («Kokzygodynie»)

### /beschwerden/tarsaltunnelsyndrom/

Title: Tarsaltunnelsyndrom: Kribbeln und Brennen an der Fusssohle

Quellen:

- Sha 2024: Tarsal Tunnel Syndrome, a comprehensive review, Iowa Orthopaedic Journal: https://pubmed.ncbi.nlm.nih.gov/39811161/
- MedlinePlus: Tarsal tunnel syndrome: https://medlineplus.gov/ency/article/000792.htm

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /beschwerden/nervenschmerzen/ («Tarsaltunnelsyndrom»)
- /beschwerden/polyneuropathie/ («Tarsaltunnelsyndrom»)
- /koerpersignale/zehen-kribbeln/ («Tarsaltunnelsyndrom»)

### /beschwerden/meralgia-paraesthetica/

Title: Meralgia paraesthetica: Brennen am äusseren Oberschenkel

Quellen:

- Solomons et al. 2022: Meralgia Paresthetica, Current Pain and Headache Reports: https://pubmed.ncbi.nlm.nih.gov/35622311/
- Kesserwani 2021: Meralgia Paresthetica, a case report with an update on anatomy, pathology, and therapy, Cureus: https://pubmed.ncbi.nlm.nih.gov/33880277/

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /beschwerden/nervenschmerzen/ («Meralgia paraesthetica»)
- /koerpersignale/bein-wird-beim-sitzen-taub/ («Meralgia paraesthetica»)

### /beschwerden/trockene-augen/

Title: Trockene Augen: Ursachen, Abklärung und Behandlung

Quellen:

- NHS: Dry eyes: https://www.nhs.uk/conditions/dry-eyes/
- Jones et al. 2025: TFOS DEWS III, Management and Therapy, American Journal of Ophthalmology: https://pubmed.ncbi.nlm.nih.gov/40467022/
- Kim et al. 2018: Optimizing acupuncture treatment for dry eye syndrome, a systematic review, BMC Complementary and Alternative Medicine: https://pubmed.ncbi.nlm.nih.gov/29724255/

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /koerpersignale/augenlid-zuckt/ («trockene Augen»)
- /koerpersignale/druck-hinter-den-augen/ («Ein gestörter Tränenfilm»)

### /beschwerden/bizepssehnenentzuendung/

Title: Bizepssehnenentzündung: Schmerz vorne an der Schulter

Quellen:

- AAOS OrthoInfo: Biceps Tendinitis: https://orthoinfo.aaos.org/en/diseases--conditions/biceps-tendinitis/
- McDevitt et al. 2024: Physical therapy interventions for biceps tendinopathy, a scoping review, Brazilian Journal of Physical Therapy: https://pubmed.ncbi.nlm.nih.gov/38219522/

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /beschwerden/impingement-syndrom/ («Bizepssehnenentzündung»)
- /beschwerden/schulterschmerzen/ («lange Bizepssehne»)

### /beschwerden/patellofemorales-schmerzsyndrom/

Title: Patellofemorales Schmerzsyndrom: Schmerz hinter der Kniescheibe

Quellen:

- van der Heijden et al. 2015: Exercise for treating patellofemoral pain syndrome, Cochrane Database of Systematic Reviews: https://pubmed.ncbi.nlm.nih.gov/25603546/
- Collins et al. 2018: Consensus statement on exercise therapy and physical interventions for patellofemoral pain, British Journal of Sports Medicine: https://pubmed.ncbi.nlm.nih.gov/29925502/

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /beschwerden/knieschmerzen/ («patellofemorales Schmerzsyndrom»)
- /beschwerden/patellaspitzensyndrom/ («patellofemorales Schmerzsyndrom»)

### /beschwerden/pudendusneuralgie/

Title: Pudendusneuralgie: Nervenschmerz im Becken verstehen

Quellen:

- NHS: Pudendal neuralgia: https://www.nhs.uk/conditions/pudendal-neuralgia/
- Labat et al. 2008: Diagnostic criteria for pudendal neuralgia by pudendal nerve entrapment (Nantes criteria), Neurourology and Urodynamics: https://pubmed.ncbi.nlm.nih.gov/17828787/

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /beschwerden/prostata/ («Pudendusneuralgie»)
- /beschwerden/vulvodynie/ («Reizung des Pudendusnervs»)

### /beschwerden/beckenbodenverspannung/

Title: Beckenbodenverspannung: wenn der Beckenboden nicht loslässt

Quellen:

- Torosis et al. 2024: A Treatment Algorithm for High-Tone Pelvic Floor Dysfunction, Obstetrics and Gynecology: https://pubmed.ncbi.nlm.nih.gov/38387036/
- Afyouni et al. 2025: Urologic manifestations of nonrelaxing pelvic floor dysfunction, Current Urology Reports: https://pubmed.ncbi.nlm.nih.gov/41094314/
- Frawley et al. 2021: ICS report on the terminology for pelvic floor muscle assessment, Neurourology and Urodynamics: https://pubmed.ncbi.nlm.nih.gov/33844342/

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /beschwerden/dyspareunie/ («Beckenbodenanspannung»)
- /beschwerden/vaginismus/ («überaktiven Beckenboden»)
- /koerpersignale/druckgefuehl-im-unterbauch/ («Beckenbodenverspannung»)

### /beschwerden/meniskusriss/

Title: Meniskusriss: Symptome, Abklärung und wann operieren

Quellen:

- Siemieniuk et al. 2017: Arthroscopic surgery for degenerative knee arthritis and meniscal tears, a clinical practice guideline, BMJ: https://pubmed.ncbi.nlm.nih.gov/28490431/
- Kise et al. 2016: Exercise therapy versus arthroscopic partial meniscectomy for degenerative meniscal tear, BMJ: https://pubmed.ncbi.nlm.nih.gov/27440192/
- Englund et al. 2008: Incidental meniscal findings on knee MRI in middle-aged and elderly persons, New England Journal of Medicine: https://pubmed.ncbi.nlm.nih.gov/18784100/
- van der Graaf et al. 2022: Arthroscopic partial meniscectomy versus physical therapy for traumatic meniscal tears in a young study population, British Journal of Sports Medicine: https://pubmed.ncbi.nlm.nih.gov/35676079/

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /beschwerden/bakerzyste/ («Meniskusschäden»)
- /beschwerden/knieschmerzen/ («Meniskusriss»)
- /gesundheitsbibliothek/untersuchungen/mrt/ («Meniskusriss»)

### /beschwerden/thoracic-outlet-syndrom/

Title: Thoracic-Outlet-Syndrom: Kribbeln, Schwere und kalte Hand

Quellen:

- NHS: Thoracic outlet syndrome: https://www.nhs.uk/conditions/thoracic-outlet-syndrome/
- Panther et al. 2022: Thoracic outlet syndrome, a review, Journal of Shoulder and Elbow Surgery: https://pubmed.ncbi.nlm.nih.gov/35963513/

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /koerpersignale/arm-schlaeft-nachts-ein/ («Thoracic-Outlet-Syndrom»)
- /koerpersignale/kribbeln-vom-nacken-in-den-arm/ («Thoracic-Outlet-Syndrom»)

### /beschwerden/chronischer-husten/

Title: Chronischer Husten: Ursachen und Abklärung ab acht Wochen

Quellen:

- Morice et al. 2020: ERS guidelines on the diagnosis and treatment of chronic cough in adults and children, European Respiratory Journal: https://pubmed.ncbi.nlm.nih.gov/31515408/
- NHS: Cough: https://www.nhs.uk/conditions/cough/
- Lee et al. 2025: Acupuncture-related therapy for chronic cough, a systematic review and meta-analysis, Integrative Medicine Research: https://pubmed.ncbi.nlm.nih.gov/39944112/

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /koerpersignale/husten-nach-dem-essen/ («chronischem Husten»)
- /koerpersignale/trockener-husten/ («chronischer Husten»)

## Wissen (Akupunktur-Entscheidung)

### /wissen/akupunktur-bei-neurodermitis/

Title: Akupunktur bei Neurodermitis: was Studien zeigen | TCM.ch

Quellen:

- Park et al. 2021: Acupuncture in mild to moderate atopic dermatitis, randomized sham-controlled trial, BMC Complementary Medicine and Therapies: https://pubmed.ncbi.nlm.nih.gov/33926433/
- Rotter et al. 2022: Acupuncture and osteopathic medicine for atopic dermatitis, three-armed randomized trial, Clinical and Experimental Dermatology: https://pubmed.ncbi.nlm.nih.gov/35875898/
- NCCIH: Acupuncture, effectiveness and safety: https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /beschwerden/neurodermitis/ («Akupunktur bei Neurodermitis»)
- /koerpersignale/juckreiz-nachts-ohne-ausschlag/ («Akupunktur bei Neurodermitis»)

### /wissen/akupunktur-bei-sehnenscheidenentzuendung/

Title: Akupunktur bei Sehnenscheidenentzündung: Studienlage | TCM.ch

Quellen:

- Hadianfard et al. 2014: Efficacy of acupuncture versus local methylprednisolone acetate injection in De Quervain's tenosynovitis, randomized controlled trial: https://pubmed.ncbi.nlm.nih.gov/24929455/
- Qin et al. 2024: Systematic review and meta-analysis of acupuncture for De Quervain's tenosynovitis, Postgraduate Medical Journal: https://pubmed.ncbi.nlm.nih.gov/38932434/
- NCCIH: Acupuncture, effectiveness and safety: https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /beschwerden/sehnenscheidenentzuendung/ («Akupunktur bei Sehnenscheidenentzündung»)
- /wissen/akupunktur-bei-karpaltunnelsyndrom/ («Akupunktur bei Sehnenscheidenentzündung»)

### /wissen/akupunktur-bei-achillessehnenbeschwerden/

Title: Akupunktur bei Achillessehnenbeschwerden: Studien | TCM.ch

Quellen:

- Zhang et al. 2013: Acupuncture for chronic Achilles tendinopathy, randomized controlled study, Chinese Journal of Integrative Medicine: https://pubmed.ncbi.nlm.nih.gov/23263998/
- Hawks et al. 2023: Insertional Achilles tendinopathy and adjunct electroacupuncture, randomized controlled trial, Medical Acupuncture: https://pubmed.ncbi.nlm.nih.gov/37095788/
- NCCIH: Acupuncture, effectiveness and safety: https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /beschwerden/achillessehnenentzuendung/ («Akupunktur bei Achillessehnenbeschwerden»)
- /therapien/elektroakupunktur/ («Akupunktur bei Achillessehnenbeschwerden»)
- /wissen/akupunktur-bei-fersensporn/ («Akupunktur bei Achillessehnenbeschwerden»)

### /wissen/akupunktur-bei-wiederkehrenden-blasenentzuendungen/

Title: Akupunktur bei wiederkehrenden Blasenentzündungen | TCM.ch

Quellen:

- Ots, Gold et al. 2024: Segmental acupuncture for prevention of recurrent urinary tract infections, randomised clinical trial, International Urogynecology Journal: https://pubmed.ncbi.nlm.nih.gov/39060726/
- NCCIH: Acupuncture, effectiveness and safety: https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /beschwerden/blasenentzuendung/ («Akupunktur bei wiederkehrenden Blasenentzündungen»)
- /wissen/akupunktur-bei-reizblase/ («Akupunktur bei wiederkehrenden Blasenentzündungen»)

### /wissen/akupunktur-bei-restless-legs/

Title: Akupunktur bei Restless Legs: Leitlinie und Studien | TCM.ch

Quellen:

- Winkelman et al. 2025: Treatment of restless legs syndrome and periodic limb movement disorder, AASM clinical practice guideline, Journal of Clinical Sleep Medicine: https://pubmed.ncbi.nlm.nih.gov/39324694/
- Cui et al. 2008: Acupuncture for restless legs syndrome, Cochrane Database of Systematic Reviews: https://pubmed.ncbi.nlm.nih.gov/18843716/
- Guan et al. 2024: He Tiao Du Ren An Shen acupuncture for restless leg syndrome, randomized trial, Medicine: https://pubmed.ncbi.nlm.nih.gov/39331896/
- NCCIH: Acupuncture, effectiveness and safety: https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /beschwerden/restless-legs/ («Akupunktur bei Restless Legs»)
- /koerpersignale/beine-kribbeln-nachts/ («Akupunktur bei Restless Legs»)

### /wissen/akupunktur-bei-fazialisparese/

Title: Akupunktur bei Fazialisparese: was belegt ist | TCM.ch

Quellen:

- Chen et al. 2010: Acupuncture for Bell's palsy, Cochrane Database of Systematic Reviews: https://pubmed.ncbi.nlm.nih.gov/20687071/
- Li et al. 2024: Electroacupuncture with intermittent wave stimulation for chronic Bell's palsy, randomized controlled trial, Postgraduate Medical Journal: https://pubmed.ncbi.nlm.nih.gov/38134327/
- NCCIH: Acupuncture, effectiveness and safety: https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /beschwerden/fazialisparese/ («Akupunktur bei Fazialisparese»)
- /therapien/elektroakupunktur/ («Akupunktur bei Fazialisparese»)

### /wissen/akupunktur-bei-nesselsucht/

Title: Akupunktur bei Nesselsucht: Studie und Grenzen | TCM.ch

Quellen:

- Zheng et al. 2023: Efficacy of acupuncture for chronic spontaneous urticaria, randomized controlled trial, Annals of Internal Medicine: https://pubmed.ncbi.nlm.nih.gov/37956431/
- Correction: Efficacy of acupuncture for chronic spontaneous urticaria, Annals of Internal Medicine 2024: https://pubmed.ncbi.nlm.nih.gov/38109741/
- NCCIH: Acupuncture, effectiveness and safety: https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /beschwerden/nesselsucht/ («Akupunktur bei Nesselsucht»)
- /koerpersignale/juckreiz-nachts-ohne-ausschlag/ («Akupunktur bei Nesselsucht»)

### /wissen/akupunktur-bei-aromatasehemmer-gelenkschmerzen/

Title: Akupunktur bei Gelenkschmerzen durch Aromatasehemmer | TCM.ch

Quellen:

- Hershman et al. 2018: Effect of acupuncture vs sham acupuncture or waitlist control on joint pain related to aromatase inhibitors, JAMA: https://jamanetwork.com/journals/jama/fullarticle/2687355
- Hershman et al. 2022: Comparison of acupuncture vs sham acupuncture or waiting list control for aromatase inhibitor-related joint pain, 52-week results, JAMA Network Open: https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2798317
- NCCIH: Acupuncture, effectiveness and safety: https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /gesundheitsbibliothek/fragen/akupunktur-waehrend-chemotherapie/ («Akupunktur bei Gelenkschmerzen durch Aromatasehemmer»)
- /wissen/akupunktur-bei-polyneuropathie/ («Akupunktur bei Gelenkschmerzen durch Aromatasehemmer»)

## Befunde & Werte

### /gesundheitsbibliothek/befunde-werte/ana-antikoerper/

Title: ANA positiv: Antinukleäre Antikörper verstehen | TCM.ch

Quellen:

- MedlinePlus: ANA (Antinuclear Antibody) Test: https://medlineplus.gov/lab-tests/ana-antinuclear-antibody-test/
- MedlinePlus: Antinuclear antibody panel: https://medlineplus.gov/ency/article/003535.htm

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /beschwerden/rheuma/ («antinukleäre Antikörper (ANA)»)
- /gesundheitsbibliothek/befunde-werte/crp-erhoeht/ («ANA»)

### /gesundheitsbibliothek/befunde-werte/rheumafaktor/

Title: Rheumafaktor positiv oder erhöht: Einordnung | TCM.ch

Quellen:

- MedlinePlus: Rheumatoid Factor (RF) Test: https://medlineplus.gov/lab-tests/rheumatoid-factor-rf-test/
- MedlinePlus: CCP Antibody Test: https://medlineplus.gov/lab-tests/ccp-antibody-test/

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /beschwerden/rheumatoide-arthritis/ («der Rheumafaktor»)
- /gesundheitsbibliothek/befunde-werte/bsg-erhoeht/ («Rheumafaktor»)
- /gesundheitsbibliothek/befunde-werte/crp-erhoeht/ («Rheumafaktor»)

### /gesundheitsbibliothek/befunde-werte/anti-ccp/

Title: Anti-CCP-Antikörper positiv: Einordnung | TCM.ch

Quellen:

- MedlinePlus: CCP Antibody Test: https://medlineplus.gov/lab-tests/ccp-antibody-test/
- MedlinePlus: Rheumatoid Factor (RF) Test: https://medlineplus.gov/lab-tests/rheumatoid-factor-rf-test/

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /beschwerden/rheuma/ («Anti-CCP-Antikörper»)
- /beschwerden/rheumatoide-arthritis/ («Anti-CCP»)
- /gesundheitsbibliothek/befunde-werte/bsg-erhoeht/ («Anti-CCP»)

### /gesundheitsbibliothek/befunde-werte/hla-b27/

Title: HLA-B27 positiv: Einordnung des Befunds | TCM.ch

Quellen:

- MedlinePlus: HLA-B27 antigen: https://medlineplus.gov/ency/article/003551.htm
- NHS: Ankylosing spondylitis: https://www.nhs.uk/conditions/ankylosing-spondylitis/

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /beschwerden/morbus-bechterew/ («HLA-B27-Befund»)
- /beschwerden/rueckenschmerzen/ («HLA-B27»)

### /gesundheitsbibliothek/befunde-werte/parathormon/

Title: Parathormon erhöht oder niedrig: PTH verstehen | TCM.ch

Quellen:

- MedlinePlus: Parathyroid Hormone (PTH) Test: https://medlineplus.gov/lab-tests/parathyroid-hormone-pth-test/
- MedlinePlus: Parathyroid hormone (PTH) blood test: https://medlineplus.gov/ency/article/003690.htm

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /gesundheitsbibliothek/befunde-werte/calcium-zu-hoch/ («Parathormon»)
- /gesundheitsbibliothek/befunde-werte/vitamin-d-zu-niedrig/ («Parathormon (PTH)»)

### /gesundheitsbibliothek/befunde-werte/apolipoprotein-b/

Title: Apolipoprotein B (ApoB) erhöht: Einordnung | TCM.ch

Quellen:

- MedlinePlus: Apolipoprotein B: https://medlineplus.gov/ency/article/003502.htm

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /gesundheitsbibliothek/befunde-werte/ldl-erhoeht/ («Apolipoprotein B»)
- /gesundheitsbibliothek/befunde-werte/lipoprotein-a-erhoeht/ («ApoB»)

### /gesundheitsbibliothek/befunde-werte/haptoglobin/

Title: Haptoglobin niedrig oder erhöht: Einordnung | TCM.ch

Quellen:

- MedlinePlus: Haptoglobin (HP) Test: https://medlineplus.gov/lab-tests/haptoglobin-hp-test/
- MedlinePlus: Haptoglobin blood test: https://medlineplus.gov/ency/article/003634.htm

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /gesundheitsbibliothek/befunde-werte/ldh-erhoeht/ («Haptoglobin»)
- /gesundheitsbibliothek/befunde-werte/retikulozyten/ («das Haptoglobin»)

### /gesundheitsbibliothek/befunde-werte/dheas-wert/

Title: DHEA-S erhöht oder niedrig: Wert einordnen | TCM.ch

Quellen:

- MedlinePlus: DHEA Sulfate Test: https://medlineplus.gov/lab-tests/dhea-sulfate-test/
- MedlinePlus: DHEA-sulfate test: https://medlineplus.gov/ency/article/003717.htm

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /beschwerden/pcos/ («DHEA-S-Wert»)
- /gesundheitsbibliothek/befunde-werte/testosteron-wert/ («DHEA-S»)

## Untersuchungen

### /gesundheitsbibliothek/untersuchungen/laparoskopie/

Title: Laparoskopie: Ablauf und Erholung bei Bauchspiegelung | TCM.ch

Quellen:

- NHS: Laparoscopy (keyhole surgery): https://www.nhs.uk/tests-and-treatments/laparoscopy/

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /beschwerden/endometriose/ («Bauchspiegelung (Laparoskopie)»)
- /gesundheitsbibliothek/untersuchungen/hysteroskopie/ («Bauchspiegelung»)

### /gesundheitsbibliothek/untersuchungen/arthroskopie/

Title: Arthroskopie: Gelenkspiegelung, Ablauf und Grenzen | TCM.ch

Quellen:

- NHS: Arthroscopy: https://www.nhs.uk/tests-and-treatments/arthroscopy/
- Siemieniuk et al. 2017: Arthroscopic surgery for degenerative knee arthritis and meniscal tears, BMJ: https://pubmed.ncbi.nlm.nih.gov/28490431/

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /beschwerden/knieschmerzen/ («Arthroskopie»)
- /gesundheitsbibliothek/untersuchungen/mrt/ («Gelenkspiegelung»)

### /gesundheitsbibliothek/untersuchungen/kapselendoskopie/

Title: Kapselendoskopie: Dünndarm mit der Kamerakapsel | TCM.ch

Quellen:

- MedlinePlus: Capsule endoscopy: https://medlineplus.gov/ency/article/007642.htm

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /gesundheitsbibliothek/untersuchungen/gastroskopie/ («Kapselendoskopie»)
- /gesundheitsbibliothek/untersuchungen/koloskopie/ («Kamerakapsel»)

### /gesundheitsbibliothek/untersuchungen/bronchoskopie/

Title: Bronchoskopie: Lungenspiegelung, Ablauf und Vorbereitung | TCM.ch

Quellen:

- MedlinePlus: Bronchoscopy: https://medlineplus.gov/ency/article/003857.htm

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /beschwerden/copd/ («Lungenspiegelung»)
- /gesundheitsbibliothek/untersuchungen/lungenfunktion/ («Bronchoskopie»)

### /gesundheitsbibliothek/untersuchungen/laryngoskopie/

Title: Laryngoskopie: Kehlkopfspiegelung bei Heiserkeit | TCM.ch

Quellen:

- MedlinePlus: Laryngoscopy and nasolaryngoscopy: https://medlineplus.gov/ency/article/007507.htm

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /koerpersignale/heiserkeit-ohne-erkaeltung/ («Laryngoskopie»)
- /koerpersignale/klossgefuehl-im-hals/ («Kehlkopfspiegelung»)

### /gesundheitsbibliothek/untersuchungen/eileiterdurchgaengigkeit/

Title: Eileiter prüfen: HSG und HyCoSy im Vergleich | TCM.ch

Quellen:

- Leeds Teaching Hospitals NHS Trust: Hysterosalpingography (HSG), Information for patients: https://flipbooks.leedsth.nhs.uk/LN004389.pdf
- Leeds Teaching Hospitals NHS Trust: Hysterosalpingo Contrast Sonography (HyCoSy): https://www.leedsth.nhs.uk/patients/resources/hysterosalpingo-contrast-sonography-hycosy/

Inbound (kontextuell, Bestandsseiten; Hub-, Regions- und Suchregistrierungen nicht mitgezählt):

- /gesundheitsbibliothek/untersuchungen/hysteroskopie/ («HSG oder HyCoSy»)
- /gesundheitsbibliothek/untersuchungen/spermiogramm/ («Prüfung der Eileiterdurchgängigkeit»)

## Ownership-Übertragungen (Artikel 13 bis 19 des Auftrags)

| Condition-Owner (bleibt) | Akupunktur-Entscheidung neu | übertragener Alias |
|---|---|---|
| /beschwerden/neurodermitis/ | /wissen/akupunktur-bei-neurodermitis/ | akupunktur neurodermitis |
| /beschwerden/sehnenscheidenentzuendung/ | /wissen/akupunktur-bei-sehnenscheidenentzuendung/ | akupunktur sehnenscheidenentzündung |
| /beschwerden/achillessehnenentzuendung/ | /wissen/akupunktur-bei-achillessehnenbeschwerden/ | (kein Alias in der Map, Intent neu zugeordnet) |
| /beschwerden/blasenentzuendung/ | /wissen/akupunktur-bei-wiederkehrenden-blasenentzuendungen/ | keiner (generischer Begriff nicht übertragen, siehe Review-Korrekturen) |
| /beschwerden/restless-legs/ | /wissen/akupunktur-bei-restless-legs/ | akupunktur restless legs |
| /beschwerden/fazialisparese/ | /wissen/akupunktur-bei-fazialisparese/ | (kein Alias in der Map, Intent neu zugeordnet) |
| /beschwerden/nesselsucht/ | /wissen/akupunktur-bei-nesselsucht/ | akupunktur nesselsucht (urtikaria) |
| /gesundheitsbibliothek/fragen/akupunktur-waehrend-chemotherapie/ | /wissen/akupunktur-bei-aromatasehemmer-gelenkschmerzen/ | enge Abgrenzung, kein Alias |

Auf den sieben Beschwerden-Seiten wurden die Akupunktur-Passagen gekürzt und verlinkt, nicht gelöscht; unbelegte Sitzungs- und Wirkangaben («acht bis zwölf Sitzungen üblich», «stärkt die Abwehrkraft», «8 bis 10 Sitzungen, Akupunktur als Basis») wurden neutralisiert. Map: Alias aus `secondary_keywords` entfernt, Wissen-URL in `supporting_urls`, Notiz ergänzt. Guards: je ein Synonym-Guard pro Akupunktur-Intent, Synonym-Guards für neue Owner, dazu Langzeit-EKG, Differentialblutbild und myofasziales Schmerzsyndrom gemäss Auftrag.

## Bewusst nicht angelegt

Langzeit-EKG (EKG-Seite), Calprotectin (Stuhlanalyse, Guard bestand), Differentialblutbild (grosses Blutbild), myofasziales Schmerzsyndrom (Triggerpunkt-Artikel), keine weiteren Migräne-, Kinderwunsch-, Schlaf-, Rücken-, Kniearthrose-, Frozen-Shoulder- oder CMD-Akupunkturvarianten. Keine Konflikte in Map, Guards, Konflikt- und Unowned-Liste gefunden; die Konfliktdoku blieb unverändert.

## QA (Stand Commit 3, lokal gebaut)

- Build: ok. Sitemap 822 URLs (Basis 788, +34). dist: 846 Seiten (Basis 812, +34), 0 entfernt, 73 bestehende Seiten geändert (verlinkende Seiten, Hubs, Regionen, Bibliothekssuche, Wissen-Hub, Sitemap), keine `/en/`-Seite geändert.
- Gates: health-audit 0 Fehler (A-Z 166/166, Wissen-Serie 36, Ownership-Gate 0), check-i18n --strict 0 failures, test-en-analytics 47/47, check-kontakt-formular 0, test-kontakt-formular ok (API gemockt, keine echte Anfrage), check-clinic-status 0, check-standort-ux 0, check-first30 0, check-professional 0.
- Kohortenprüfung (34 URLs): Title eindeutig, Meta vorhanden, genau eine H1, Canonical selbstreferenzierend, kein noindex, 3 sichtbare FAQs je Seite (102), kein FAQPage-/Question-Schema, kein datePublished, Quellenblock sichtbar, keine Em-Dashes/ß/Platzhalter/Qi-Begriffe im Haupttext, alle Linkziele gültig, mindestens zwei kontextuelle Inbound-Links aus Bestandsseiten.
- Overflow (Puppeteer, statischer dist-Server): 34 × 390 px und 34 × 1440 px, dazu 320 px je Layoutfamilie (Beschwerde, Wissen, Befund, Untersuchung): 72 Prüfungen, 0 Overflow, 0 JS-Fehler.
- CSVs: Map 828 Zeilen à 21 Spalten, Guards 197 à 5 (bestehende Leerzeile 170 unverändert; nach Review 201, siehe unten), Konflikte 36 à 8, Unowned 7 à 12; mit csv-Parser geprüft.

## Abweichungen

- Umfang: Beschwerden 466 bis 582 Wörter Haupttext (plus Kurzantwort), Wissen 515 bis 573, Befunde 316 bis 394, Untersuchungen 397 bis 497. Unter der Zielspanne, bewusst nicht aufgefüllt; jede Seite beantwortet ihre Frage mit Grenzen, Warnzeichen, FAQ und Quellen.
- Beschwerden-Vorlage: geteilte Leaf-Vorlage übernommen. Kohortenspezifisch angepasst: Meta-Pille «Ärztliche Abklärung zuerst» statt «Häufig behandelt», USP ohne Prozentangabe zur Zusatzversicherung, Methodenblock «Was ergänzend infrage kommt» statt «Diese Behandlungen helfen». Unverändert aus der Vorlage: H1-Zusatz «TCM.ch Behandlung Schweiz», «Kostenlos & unverbindlich» unter den bestehenden Kontaktwegen, Regionalblock.
- Untersuchungen: kein Buchungs-CTA im Inhalt; die globale mobile Sticky-Leiste («Termin abklären», WhatsApp, Anrufen) aus LayoutDe erscheint wie auf allen bestehenden Untersuchungsseiten. Nicht angefasst (globales Layout).
- Meralgia paraesthetica: NINDS und Cleveland Clinic waren nicht abrufbar; Zweitquelle ist ein Fallbericht mit Literaturübersicht (Cureus 2021).

## Review-Korrekturen (16.10.2026, Commit 5)

Aliasse (Map, Guards, Bibliothekssuche, Beschwerden-Hub):

- Patellofemorales Schmerzsyndrom: «Läuferknie» entfernt (auf /beschwerden/knieschmerzen/ als Iliotibialband-Syndrom beschrieben), keiner anderen Seite zugeordnet. «Chondropathia patellae» nicht reserviert. Neu: «schmerz um die kniescheibe». Sichtbarer Bestandstext auf /beschwerden/sehnenscheidenentzuendung/ («Patellasehne (Läuferknie)») auf Patellaspitzensyndrom korrigiert und verlinkt.
- Wiederkehrende Blasenentzündungen: Primär «akupunktur wiederkehrende blasenentzündungen», dazu «akupunktur rezidivierende zystitis», «akupunktur blasenentzündung vorbeugen». Generische Begriffe («akupunktur blasenentzündung», «akupunktur harnwegsinfekt», «akupunktur zystitis») weder übernommen noch neu zugeordnet; Condition-Intent, Akutinfekt und Warnzeichen bleiben bei /beschwerden/blasenentzuendung/.
- Neurodermitis: «akupunktur ekzem» ersetzt durch «akupunktur atopisches ekzem» / «akupunktur atopische dermatitis»; andere Ekzemformen bleiben eigenständig.
- Weitere Gleichsetzungen entfernt: «Tendovaginitis stenosans» (umfasst De Quervain), «Sicca-Syndrom» (Sjögren-Kontext), «Gesichtslähmung» im Wissen-Artikel (zentrale Ursachen), «Halsrippe» (Ursache), «Reizhusten» / «husten seit wochen» (Körpersignal bzw. andere Zeitgrenze), «Steissbeinprellung» (Ursache), «stroboskopie» und «hsg» ohne Kontext, Symptomphrasen («brennen fusssohle», «oberschenkel aussen taub», «beckenschmerz beim sitzen», «unruhige beine»). Als reine Suchhilfe bleiben Sicca, Steissbeinprellung und die bestehenden Bestandsaliasse der Owner im Index.

Guards: Die gemeinsame Untersuchungszeile ist in fünf Zeilen mit je genau einer kanonischen Owner-URL aufgeteilt (Laparoskopie, Arthroskopie, Bronchoskopie, Laryngoskopie, Kapselendoskopie). Guards jetzt 201 Zeilen à 5 Spalten, Zeilenenden je Zeile erhalten, mit csv-Parser geprüft; alle Welle-4-Owner-URLs existieren im Build, keine «+»-Werte (zwei ältere «+»-Zeilen ausserhalb von Welle 4 unverändert).

Anker: Die fünf Condition-Owner mit Akupunktur-Ankern (Neurodermitis, Nesselsucht, Restless Legs, Sehnenscheidenentzündung, Blasenentzündung) tragen jetzt Zustands- und Abklärungsanker; die Akupunktur-Anker liegen nur bei den Wissen-Artikeln. Achillessehne und Fazialisparese waren bereits neutral. Bidirektionale Links unverändert.

Nesselsucht-Korrektur: PubMed (E-utilities) bestätigt PMID 37956431 (DOI 10.7326/M23-1043, Ann Intern Med 2023;176(12):1617-1624) und die Korrektur PMID 38109741 (DOI 10.7326/L23-0469, Ann Intern Med 2024;177(2):268, online 19.12.2023). Crossref-Metadaten und der Korrekturtext (über OpenAlex, Verlagsseite gibt 403) zeigen: Im Abschnitt Statistische Analyse stand «Effektgrösse 4», richtig ist 0,4 (Fallzahlplanung). Ergebnisse, Effektgrössen unter der MCID, Nebenwirkungen und Grenzen sind nicht betroffen. Der interne Satz zur «nicht einsehbaren» Korrektur ist aus dem Patiententext entfernt; die Quellenangabe nennt jetzt den Inhalt («betrifft die Fallzahlplanung im Methodenteil»). Kein inhaltlicher Release-Blocker aus der Korrektur.

QA nach Review: Build ok (Sitemap 822, dist 846). Alle Gates wie oben 0 Fehler (test-kontakt-formular 630/0, API gemockt). Kohortenprüfung 34 URLs: 0 Befunde. Map 828 à 21 Spalten. Kein Layout geändert, Overflow-Prüfung nicht wiederholt.

## Medizinische Prüfung vor Release (16.10.2026, Commit 6)

Geprüft gegen die Originalquellen (Volltext, wo frei verfügbar; sonst nur Aussagen aus dem Abstract). Keine ärztliche Freigabe behauptet; geprüft wurde die Quellentreue. Unbelegte Details wurden gestrichen oder enger formuliert.

| Seite | Konkrete Aussage | Quelle und Fundstelle | Ergebnis | Änderung oder verbleibende Frage |
|---|---|---|---|---|
| /beschwerden/chronischer-husten/ | Hustenkontrolltherapie «logopädisch» empfohlen | Morice 2020 (ERS), Volltext PMC6942543, Question 7 | Zu eng: Empfehlung bedingt, Physiotherapie oder Logopädie, erfahrene Fachpersonen | «schlägt einen Versuch vor, durch erfahrene Fachpersonen der Physiotherapie oder Logopädie» |
| /beschwerden/chronischer-husten/ | Medikamente gegen Nervenüberempfindlichkeit «in ausgewählten Fällen» | ERS Question 6 (Morphin niedrig dosiert, Gabapentin/Pregabalin bei refraktärem Husten Erwachsener) | Belegt | Als «Versuch erwägen, Nutzen und Nebenwirkungen wägt die Fachärztin ab» formuliert; keine Wirkstoffe oder Dosen genannt |
| /beschwerden/chronischer-husten/ | Hustenreiz durch «Sprechen oder Lachen» | ERS Abstract/Volltext nennt kalte Luft, Parfum, Rauch, Bleichmittel | Nicht belegt | Gestrichen |
| /beschwerden/chronischer-husten/ | Reflux «auch ohne typisches Sodbrennen» | ERS Volltext: nicht saurer Reflux als mögliche Ursache | Enger | «Rückfluss aus dem Magen, nicht nur in Form von Sodbrennen» |
| /beschwerden/chronischer-husten/ | Übersicht 2025: 30 Studien «meist aus China» | Lee 2025, Volltext PMC11815682, Results | Falsch: alle Studien aus China; auch Kinder eingeschlossen | «alle aus China», «Ursachen wie Altersgruppen sehr unterschiedlich» |
| /beschwerden/chronischer-husten/ | Warnzeichen Heiserkeit > 3 Wochen, Nachtschweiss, Raucherhusten, hohes Fieber | NHS Cough (Urgent/Non-urgent advice) | In zitierten Quellen nicht belegt | Liste auf NHS-Warnzeichen reduziert (Bluthusten, Atemnot/Brustschmerz, rasch schlimmer, Gewichtsverlust, Immunschwäche); NHS-Link auf neue URL /symptoms/cough/ |
| /beschwerden/meniskusriss/, /gesundheitsbibliothek/untersuchungen/arthroskopie/ | BMJ-Leitlinie rät «fast immer» von Arthroskopie ab | Siemieniuk 2017, Volltext PMC5426368, «What you need to know» und Definition | Belegt, Geltungsbereich fehlte | Ausnahmen ergänzt: objektiv blockiertes Knie, Sportverletzungen Jüngerer, schwere Knieverletzungen |
| /beschwerden/meniskusriss/ | Traumatische Risse 18 bis 45 Jahre: frühe Teilentfernung nicht besser; 4 von 10 später operiert | van der Graaf 2022, Volltext PMC9304087, Abstract und Methods | Belegt (41 %), aber nur isolierte Risse ohne Arthrose | Population präzisiert; «nähbare Risse und Blockaden werden häufig operiert» ersetzt durch: in der Studie ausgeschlossen, Orthopädie entscheidet |
| /beschwerden/meniskusriss/ | Degenerativ: 140 Personen, 35 bis 60, 12 Wochen Training gleichwertig | Kise 2016, Abstract | Belegt | Keine |
| /beschwerden/meniskusriss/ | FAQ «heilt schlecht im Innenbereich» | Keine der Quellen | Nicht belegt | Ersetzt durch «hängt von Art und Lage ab; Beschwerden besserten sich in den Studien auch ohne frühe Operation» |
| /wissen/akupunktur-bei-aromatasehemmer-gelenkschmerzen/ | Effekt «moderat» | Hershman 2018 Abstract (JAMA): 0,92 bzw. 0,96 Punkte, klinisch bedeutsam vorab 2 Punkte, «uncertain clinical importance» | Zu positiv | «klein, unter der vorab festgelegten Schwelle, klinische Bedeutung unsicher» (Kurzantwort, Lead, Excerpt) |
| /wissen/akupunktur-bei-aromatasehemmer-gelenkschmerzen/ | 52 Wochen rund ein Punkt, Funktionstests ohne Unterschied | Hershman 2022, Volltext PMC9652759 | Belegt | Keine |
| /wissen/akupunktur-bei-aromatasehemmer-gelenkschmerzen/ | «Schwere Nebenwirkungen nicht berichtet» | 2018 nur Abstract verfügbar (Bluterguss Grad 1) | Nicht prüfbar | Gestrichen |
| /wissen/akupunktur-bei-aromatasehemmer-gelenkschmerzen/ | Lymphödemarm, bestrahlte Haut, Blutbild | Keine der Quellen | Nicht belegt | Gestrichen; Vorabklärung neutral mit dem Onkologie-Team |
| /wissen/akupunktur-bei-aromatasehemmer-gelenkschmerzen/ | «Bewegung, Schmerzmittel, Präparatwechsel» | Hershman 2022 Discussion: Bewegung und Medikamente untersucht, gemischte Ergebnisse | Präparatwechsel nicht belegt | «untersucht, gemischte Ergebnisse; Onkologie-Team entscheidet»; keine Gleichsetzung mit Krebsbehandlung (Satz «Akupunktur behandelt den Krebs nicht» bleibt) |
| /wissen/akupunktur-bei-restless-legs/ | AASM: keine Empfehlung zu Akupunktur | Winkelman 2025, Volltext PMC11701286: «insufficient and inconclusive evidence» | Belegt | Keine |
| /wissen/akupunktur-bei-restless-legs/ | Eisenwerte inkl. Ferritin und Transferrinsättigung, morgens; Alkohol, Koffein, Medikamente, Schlafapnoe | AASM Good Practice Statements 1 und 2 | Belegt | Keine |
| /wissen/akupunktur-bei-restless-legs/ | «Nimm Eisen nicht auf eigene Faust ein»; Grenzwerte «weichen von üblichen ab» | AASM: Eisenwerte bestimmen die Wahl der Eisengabe; eigene Schwellen | Eigenständige Handlungsanweisung, Vergleich nicht belegt | Ohne Imperativ und ohne Vergleich: «Laborwerte bestimmen mit, ob und wie Eisen gegeben wird; das entscheidet die Ärztin»; keine Dosierung, keine Aussage zur Schweizer Praxis |
| /wissen/akupunktur-bei-restless-legs/ | Guan 2024 «tägliche Sitzungen» | Guan 2024 Abstract | Ungenau | «an sechs Tagen pro Woche» |
| /gesundheitsbibliothek/befunde-werte/parathormon/ | Auslegung immer mit Calcium; Normbereich-PTH kann bei hohem Calcium unpassend sein | MedlinePlus PTH Test und Encyclopedia 003690 | Belegt | Keine |
| /gesundheitsbibliothek/befunde-werte/parathormon/ | Erhöhtes PTH mit «niedrigem oder normalem» Calcium; Vitamin-D-Mangel «häufiger Grund»; bei Nierenerkrankung «häufig»; Urin-Calcium, Knochendichte, Endokrinologie | MedlinePlus: sekundär = hohes PTH mit niedrigem Calcium; Vitamin D, Niere als mögliche Ursachen; CKD-Überwachung | Teils nicht belegt | Auf Quellenaussagen reduziert; Interpretation mit Calcium, Nierenfunktion (Kreatinin, eGFR) und Vitamin D; keine Diagnose aus Einzelwert; Präparate nur nach ärztlicher Entscheidung |
| /gesundheitsbibliothek/befunde-werte/dheas-wert/ | Alters-, geschlechts- und laborabhängige Bereiche | MedlinePlus Encyclopedia 003717 (Normal Results) | Belegt | Keine Zahlen übernommen |
| /gesundheitsbibliothek/befunde-werte/dheas-wert/ | Niedriger Wert im Alter «keine Erklärung für Lustlosigkeit» | MedlinePlus: altersbedingt niedriges DHEAS kann mit verminderter Lust einhergehen | Widerspricht der Quelle | «meist altersbedingt; ob Beschwerden wie verminderte Lust damit zusammenhängen, klärt die Ärztin» |
| /gesundheitsbibliothek/befunde-werte/dheas-wert/ | Tumoren «selten», «Speicherform», «schnell zunehmend», Bildgebung, PCOS-FAQ | MedlinePlus: Nebennierentumor, selten Eierstocktumor; Symptomliste ohne Zeitangabe | Teils nicht belegt | Auf Quellenaussagen reduziert; DHEA-Präparate weiterhin keine Empfehlung (MedlinePlus: keine verlässliche Evidenz, mögliche Nebenwirkungen) |

Ergebnis: Keine wesentliche Aussage benötigt nach der Korrektur eine offene ärztliche Entscheidung. Kein inhaltlicher Release-Blocker.

## Release (16.10.2026, Commit 6)

Veröffentlichungsdatum: `PUBLISHED_WELLE_4_2026_10 = '2026-10-16'` (Go-Live-Tag Europe/Zurich). Ältere Kohorten-Konstanten unverändert. Das Datum erscheint nur über die vorgesehenen Templates: Wissen und Untersuchungen mit datePublished und dateModified, Befunde mit datePublished (Template setzt dateModified nur bei updatedAt), Beschwerden ohne Datum. Keine Reviewer, keine medizinische Freigabe im Schema.

Lokale Prüfungen auf dem Release-Stand (in diesem Schritt tatsächlich ausgeführt):

- Build ok: Sitemap 822 URLs (main 788, +34), dist 846 Seiten (+34), 0 entfernt. Build-Diff gegen main 8f2dfabc: 72 bestehende Seiten geändert (verlinkende Seiten, Hubs, Suche, Bestandstext Sehnenscheidenentzündung), keine `/en/`-Seite, SG und Formular-CSS byte-identisch.
- Gates: health-audit 0 Fehler, check-i18n --strict 0 failures, test-en-analytics 47/47, check-kontakt-formular 0, check-clinic-status 0, check-standort-ux 0, check-first30 0, check-professional 0. test-kontakt-formular (API gemockt): zwei Läufe 629/1 bei paralleler Rechenlast (Rand-Farbprüfung der SG-Formularkachel direkt nach dem Laden, CSS-Übergang 0,15 s), dritter Lauf 630/0; main 630/0; SG-HTML und Formular-CSS unverändert.
- Kohortenprüfung 34 URLs: 0 Befunde (Title eindeutig, Meta, eine H1, Canonical, indexierbar, 3 FAQs, kein FAQPage-/Question-Schema, Datumsfelder wie erwartet, Quellen, keine Em-Dashes/ß/Platzhalter/Qi-Begriffe, alle Linkziele gültig, mindestens zwei Inbound-Links aus Bestandsseiten).
- Overflow 34 × 390/1440 px plus 320 px je Layoutfamilie: 72 Prüfungen, 0 Overflow, 0 JS-Fehler. Geänderte Passagen (8 Stellen) bei 390 und 1440 px als Screenshot geprüft; kein Layout geändert, daher keine zusätzliche 320-px-Prüfung.
- CSVs: Map 828 à 21 Spalten, Guards 201 à 5; Welle-4-Owner-URLs einzeln und im Build vorhanden.

Separater UX-Punkt (nicht in diesem PR): Auf Untersuchungsseiten erscheint die globale mobile Sticky-Leiste aus LayoutDe («Termin abklären», WhatsApp, Anrufen), obwohl die Seiten selbst keinen Buchungs-CTA haben. Unverändert gelassen.
