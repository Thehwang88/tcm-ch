// ── EN localisation of the DE Standort pages (Wave 1). German is authoritative. ──
// Facts (address, hours, status, partner operator, catchment, prices) come ONLY from
// src/data/locations.ts / src/data/standorte.ts; this file carries the idiomatic English
// copy and the per-location cross-links. No invented hours, therapists, availability or reviews.
// Images: reuse of DE assets only (standorte.ts hero / praxisBilder, DE leaf heroes).

export interface LocationFaq { q: string; a: string }
export interface LocationContent {
  /** Hero lead (plain, 1 sentence) + sub (facts: address, partner, status). */
  lead: string;
  sub: string;
  /** "About this clinic" paragraphs (HTML allowed for EN internal links). */
  about: string[];
  /** Catchment sentence; areas come from clinics[].areaServed where possible. */
  area?: string;
  faqs: LocationFaq[];
  /** Hero image override (DE asset reuse). Falls back to standorte.ts hero or locationImages. */
  hero?: { src: string; alt: string; caption: string; symbolic?: boolean };
  /** Curated nearby EN location slugs (DE nearby filtered to clinics with an EN page). */
  nearby?: string[];
  /** Independent partner clinic without a betreiber record in locations.ts (display label only; schema unchanged). */
  partnerClinic?: string;
}

const SESSION_PRICE = 'A follow-up session is typically around CHF 130 to 160, billed under the recognised tariff 590 by treatment time. The first consultation takes longer because of the case history and costs accordingly more. We tell you the exact amount before your appointment.';
const INSURANCE = 'Not through basic insurance. Reimbursement may be available through Swiss supplementary insurance, depending on your policy, treatment and the individual practitioner\'s recognition. We tell you which recognition (EMR/ASCA) the treating practitioner holds and check your cover with you before any costs arise.';
const SESSIONS = 'For acute complaints it is usually clear after four to six sessions whether the treatment is helping. Chronic issues tend to need eight to twelve sessions. We start with one or two appointments a week and give you an honest interim assessment after four sessions.';
const PARTNER_FAQ = (practice: string, street: string, phone: string): LocationFaq => ({
  q: 'What does "partner practice in the TCM.ch network" mean?',
  a: `The practice at ${street} is run by ${practice}. TCM.ch is the network behind it: you request appointments through TCM.ch, we coordinate the request and answer questions about costs and insurance. You are treated by the practitioners of ${practice}; you can also reach the practice directly on ${phone}.`,
});
const BOOK_FAQ = (name: string): LocationFaq => ({
  q: `How do I get an appointment in ${name}?`,
  a: 'Fill in the form on this page, message us on WhatsApp or email termine@tcm.ch. We get back to you personally with a suggested time. You can write in English or German.',
});

export const locationContent: Record<string, LocationContent> = {
  basel: {
    lead: 'Our Basel clinic at Steinenvorstadt 73, in the middle of the city centre: the same approach and the same methods as at our other locations.',
    sub: 'Reimbursement may be available through supplementary insurance, depending on your policy. Requests are welcome in English or German.',
    about: [
      'Our Basel clinic is at Steinenvorstadt 73. Treatment follows the same principle as at every TCM.ch location: plenty of time per appointment and a clear diagnostic process.',
      'At your first appointment we take time to listen, look at any existing findings and carry out a TCM assessment. Only then do we decide whether acupuncture, cupping, Tuina or a herbal prescription makes sense, and in which order. If we think we cannot help you, we say so and point you elsewhere.',
      'Requests are possible in English or German. Being able to describe your symptoms precisely matters, especially during the case history.',
      'Reimbursement may be available through Swiss supplementary insurance, depending on your policy, treatment and the individual practitioner\'s recognition. We work it out with you beforehand; see our <a href="/en/health-insurance-acupuncture/">insurance guide</a>.',
    ],
    area: 'The clinic is easy to reach from Grossbasel and Kleinbasel, from Gundeli, St. Johann, St. Alban and Bachletten, and from Riehen, Allschwil, Binningen, Münchenstein, Birsfelden and Reinach. From Weil am Rhein, Lörrach and Grenzach-Wyhlen on the German side and Saint-Louis, Hégenheim and Mulhouse on the French side, the Basel city centre is often closer than the next larger centre at home.',
    faqs: [
      { q: 'Where exactly are you in Basel?', a: 'Our clinic is at Steinenvorstadt 73, 4051 Basel, in the middle of the city centre.' },
      BOOK_FAQ('Basel'),
      { q: 'What does acupuncture cost in Basel?', a: SESSION_PRICE },
      { q: 'Does my health insurance pay for the treatment?', a: INSURANCE },
      { q: 'Do you treat cross-border commuters from Germany and France?', a: 'Yes. What matters is not where you live but how you are insured. If you work in Switzerland and have Swiss basic insurance, you can take out Swiss supplementary insurance for complementary medicine and claim through it. If you are insured in Germany or France, you pay us directly and submit the invoice to your insurer; whether it reimburses anything depends on your tariff. Send us your details beforehand and we tell you what to expect.' },
    ],
    hero: { src: '/images/basel-reception.webp', alt: 'Illustrative image: reception area of a TCM.ch clinic', caption: 'Illustrative image', symbolic: true },
    nearby: ['zuerich-oerlikon', 'winterthur-marktgasse', 'zuerich-hoengg'],
  },

  kreuzlingen: {
    lead: 'Personal TCM that takes you seriously.',
    sub: 'Praxis Hwang at Romanshornerstrasse 1 is a partner practice in the TCM.ch network. We coordinate your request through TCM.ch.',
    about: [
      'If you are looking for TCM in Kreuzlingen, you will find Praxis Hwang at Romanshornerstrasse 1, a partner practice in the TCM.ch network. Praxis Hwang runs the practice; TCM.ch is the network behind it. You request appointments through TCM.ch, we coordinate the request and answer questions about costs and insurance.',
      'The range includes acupuncture, Tuina, cupping, gua sha, moxibustion, electroacupuncture and individually composed herbal prescriptions. A TCM practice is only as good as the people in it; the practitioners\' public register entries are linked on the German page.',
    ],
    area: 'The practice is close for all of Kreuzlingen, from the town centre via Egelshofen and Kurzrickenbach to Bernrain, and a short trip from Tägerwilen, Bottighofen, Münsterlingen, Lengwil, Altnau and Ermatingen. Konstanz is just across the border: treatment takes place in Switzerland, and any reimbursement runs through a Swiss supplementary insurance policy.',
    faqs: [
      PARTNER_FAQ('Praxis Hwang', 'Romanshornerstrasse 1', '+41 79 837 46 81'),
      { q: 'What does a treatment cost in Kreuzlingen?', a: SESSION_PRICE + ' Herbal prescriptions are billed separately by formula.' },
      { q: 'Does health insurance cover the treatment?', a: INSURANCE },
      { q: 'How many sessions will I need?', a: SESSIONS },
      { q: 'How do I get there?', a: 'By train to Kreuzlingen or Kreuzlingen Hafen station, then on to Romanshornerstrasse 1. The practice is happy to advise on parking.' },
      { q: 'Can I come from Konstanz?', a: 'Yes. Treatment takes place in Switzerland; reimbursement, where available, runs through a Swiss supplementary insurance policy, so cross-border commuters with Swiss supplementary cover submit the invoice like everyone else. Without Swiss supplementary insurance you pay yourself, at the same tariffs.' },
    ],
    nearby: ['frauenfeld', 'wil', 'st-gallen'],
  },

  frauenfeld: {
    lead: 'Time to listen before we treat.',
    sub: 'Praxis Hwang at Rheinstrasse 25 is a partner practice in the TCM.ch network: practitioners trained and experienced in Switzerland and South Korea. We coordinate your request through TCM.ch.',
    about: [
      'Acupuncture in Frauenfeld: Praxis Hwang at Rheinstrasse 25 is a partner practice in the TCM.ch network. Alongside acupuncture, the range includes Tuina, cupping, gua sha, moxibustion, electroacupuncture, medical massage and individually composed herbal prescriptions.',
      'Praxis Hwang runs the practice; TCM.ch is the network behind it. You request appointments through TCM.ch, we coordinate the request and answer questions about costs and insurance. Treatment takes place at Rheinstrasse 25 in Frauenfeld.',
    ],
    area: 'The practice is close for the whole town, from the centre via Kurzdorf, Oberkirch and Herten to Erzenholz, and a short trip from Felben-Wellhausen, Matzingen, Stettfurt, Pfyn, Müllheim and Aadorf. Weinfelden, Amriswil, Eschlikon and the Wil area are also well connected.',
    faqs: [
      PARTNER_FAQ('Praxis Hwang', 'Rheinstrasse 25', '+41 79 837 46 81'),
      { q: 'What does a treatment cost in Frauenfeld?', a: SESSION_PRICE + ' Herbal prescriptions are billed separately by formula.' },
      { q: 'Does health insurance cover the treatment?', a: INSURANCE },
      { q: 'How many sessions will I need?', a: SESSIONS },
      { q: 'How do I reach the practice by public transport?', a: 'By train to Frauenfeld station (SBB and the Frauenfeld–Wil line), then on to Rheinstrasse 25.' },
      { q: 'Is parking available near the practice?', a: 'According to Praxis Hwang there is parking in the immediate vicinity. If you are running late, let the practice know.' },
    ],
    nearby: ['kreuzlingen', 'wil', 'winterthur-marktgasse'],
  },

  rorschach: {
    lead: 'Your TCM clinic with calm and experience.',
    sub: 'Our team looks after you on site, with experience from Switzerland and South Korea, plenty of time and every method we know.',
    about: [
      'Our Rorschach clinic lies directly on the eastern shore of Lake Constance, easy to reach from the whole Rhine valley, Appenzell and the St. Gallen region. We offer the full range of Traditional Chinese Medicine: acupuncture, cupping, Tuina massage, Chinese herbal medicine, moxibustion and electroacupuncture. Practitioner recognition (EMR/ASCA) is checked for you before the first appointment.',
    ],
    area: 'Our patients come from Rorschach, Rorschacherberg, Goldach and the Lake Constance region, from Arbon, Horn, Steinach, Tübach and Mörschwil, from the Rhine valley (Heiden, Walzenhausen, Berneck, Au, Thal, Altstätten) and from nearby Vorarlberg.',
    faqs: [
      { q: 'Where exactly are you in Rorschach?', a: 'Our clinic is at Pestalozzistrasse 11, 9400 Rorschach, close to the lake shore.' },
      BOOK_FAQ('Rorschach'),
      { q: 'Does health insurance cover the treatment?', a: INSURANCE },
      { q: 'How many sessions will I need?', a: SESSIONS },
    ],
    nearby: ['st-gallen', 'kreuzlingen', 'wil'],
  },

  volketswil: {
    lead: 'Here you get time, not a standard solution.',
    sub: 'Our team looks after you on site, with experience from Switzerland and South Korea, plenty of time and every method we know.',
    about: [
      'Our Volketswil clinic is centrally located in the Zürcher Oberland, easy to reach from the whole Glattal and the Uster/Dübendorf area. We offer the full range of Traditional Chinese Medicine: acupuncture, cupping, Tuina massage, Chinese herbal medicine, moxibustion and electroacupuncture. Practitioner recognition (EMR/ASCA) is checked for you before the first appointment.',
    ],
    area: 'Our patients come from all parts of Volketswil (Zentrum, Gutenswil, Hegnau, Kindhausen) and from Uster, Dübendorf, Schwerzenbach, Greifensee, Wangen-Brüttisellen, Pfäffikon ZH and Mönchaltorf.',
    faqs: [
      { q: 'Where exactly are you in Volketswil?', a: 'Our clinic is at Lindenstrasse 2/1, 8604 Volketswil.' },
      BOOK_FAQ('Volketswil'),
      { q: 'Does health insurance cover the treatment?', a: INSURANCE },
      { q: 'How many sessions will I need?', a: SESSIONS },
    ],
    nearby: ['zuerich-oerlikon', 'winterthur-marktgasse', 'zuerich-hoengg'],
  },

  wil: {
    lead: 'Medical TCM, personal and unhurried.',
    sub: 'Our team looks after you on site, with experience from Switzerland and South Korea, plenty of time and every method we know.',
    about: [
      'Our Wil clinic at Obere Bahnhofstrasse 35 lies in the heart of the Fürstenland, easy to reach from the whole Toggenburg, Thurgau and the St. Gallen region. We offer the full range of Traditional Chinese Medicine: acupuncture, cupping, Tuina massage, Chinese herbal medicine, moxibustion and electroacupuncture. Practitioner recognition (EMR/ASCA) is checked for you before the first appointment.',
    ],
    area: 'Our patients come from all parts of Wil (town centre, Bronschhofen, Rossrüti, Schwarzenbach) and from Uzwil, Flawil, Bütschwil, Münchwilen TG, Sirnach, Niederuzwil and Henau.',
    faqs: [
      { q: 'Where exactly are you in Wil?', a: 'Our clinic is at Obere Bahnhofstrasse 35, 9500 Wil, a short walk from the station.' },
      BOOK_FAQ('Wil'),
      { q: 'Does health insurance cover the treatment?', a: INSURANCE },
      { q: 'How many sessions will I need?', a: SESSIONS },
    ],
    nearby: ['st-gallen', 'frauenfeld', 'kreuzlingen'],
  },

  'winterthur-muenzgasse': {
    lead: 'We listen before we reach for a needle.',
    sub: 'Acupuncture, Tuina, cupping and Chinese herbal medicine at Münzgasse 2, in the heart of the old town. Our second Winterthur clinic is a few minutes\' walk away at the <a href="/en/locations/winterthur-marktgasse/">Marktgasse</a>.',
    about: [
      'Our TCM clinic at Münzgasse 2 lies in the heart of Winterthur\'s old town, with acupuncture, cupping, Tuina massage and Chinese herbal medicine. Our second Winterthur clinic, the <a href="/en/locations/winterthur-marktgasse/">Marktgasse location</a>, is a few minutes\' walk away.',
    ],
    area: 'The old town is easy to reach from every district of Winterthur (Oberwinterthur, Töss, Wülflingen, Seen, Veltheim, Mattenbach) and from Wiesendangen, Pfungen, Neftenbach, Elgg, Illnau-Effretikon and Brütten.',
    faqs: [
      { q: 'Can I book an appointment at Münzgasse 2?', a: 'Whether and from when appointments are possible at Münzgasse 2 has not been confirmed. We are happy to take your request anyway and suggest a suitable practice in Winterthur, for example at Marktgasse 78.' },
      { q: 'Does health insurance cover the treatment?', a: INSURANCE },
    ],
    hero: { src: '/images/standort-winterthur-muenzgasse.jpg', alt: 'TCM.ch practice Winterthur Münzgasse', caption: 'Münzgasse 2, Winterthur' },
    nearby: ['winterthur-marktgasse', 'frauenfeld', 'volketswil'],
  },

  'winterthur-marktgasse': {
    lead: 'Drop in, and work out calmly what helps you.',
    sub: 'A TCM clinic with experienced practitioners, central in Winterthur\'s old town: acupuncture, herbal medicine and prevention.',
    about: [
      'Our clinic at Marktgasse 78 lies directly in the old town. We offer methods of Traditional Chinese Medicine such as acupuncture, cupping, Tuina massage, Chinese herbal medicine, moxibustion and electroacupuncture.',
      'Besides Marktgasse 78 we list <a href="/en/locations/winterthur-muenzgasse/">Münzgasse 2</a> as a second Winterthur address; its status is shown on that page.',
    ],
    area: 'Marktgasse is easy to reach from every district of Winterthur (Veltheim, Töss, Oberwinterthur, Seen, Wülflingen, Mattenbach, Hegi) and from Seuzach, Wiesendangen, Elsau, Neftenbach, Pfungen, Brütten, Hettlingen and Illnau-Effretikon.',
    faqs: [
      { q: 'Where exactly are you in Winterthur?', a: 'Our clinic is at Marktgasse 78, 8400 Winterthur, in the old town.' },
      BOOK_FAQ('Winterthur'),
      { q: 'Does health insurance cover the treatment?', a: INSURANCE },
      { q: 'How many sessions will I need?', a: SESSIONS },
    ],
    hero: { src: '/images/standort-winterthur.jpg', alt: 'TCM.ch practice Winterthur Marktgasse', caption: 'Marktgasse 78, Winterthur' },
    nearby: ['winterthur-muenzgasse', 'frauenfeld', 'zuerich-oerlikon'],
  },

  'zuerich-hoengg': {
    lead: 'TCM with time, calm and real listening.',
    sub: 'Praxis Hwang at Limmattalstrasse 340 is a partner practice in the TCM.ch network. We coordinate your request through TCM.ch.',
    about: [
      'Praxis Hwang Zürich Höngg at Limmattalstrasse 340 in district 10 is a partner practice in the TCM.ch network: Praxis Hwang runs the practice, and through TCM.ch you request appointments and clarify questions about costs and insurance. The range includes acupuncture, cupping, Tuina massage and Chinese herbal medicine.',
      'Part of our network for acupuncture and TCM in Zürich: today in Höngg and <a href="/en/locations/zuerich-oerlikon/">Oerlikon</a>; a city-centre location is planned.',
    ],
    area: 'The practice is close for Höngg, Wipkingen, Affoltern, Albisrieden, district 5 and the Limmattal, and a short trip from Schlieren, Dietikon, Regensdorf and Engstringen.',
    faqs: [
      PARTNER_FAQ('Praxis Hwang', 'Limmattalstrasse 340', '+41 79 837 46 81'),
      BOOK_FAQ('Zürich Höngg'),
      { q: 'Does health insurance cover the treatment?', a: INSURANCE },
      { q: 'How many sessions will I need?', a: SESSIONS },
    ],
    nearby: ['zuerich-oerlikon', 'volketswil', 'winterthur-marktgasse'],
  },

  'zuerich-oerlikon': {
    lead: 'Acupuncture and TCM in Oerlikon: today at the partner practice, after the opening also at Ohmstrasse 14.',
    sub: 'The new clinic near Oerlikon station is in preparation. Until it opens, our partner practice Praxis Hwang at Schulstrasse 3 in Oerlikon is there for you.',
    about: [
      'Our new clinic at Ohmstrasse 14 in Zürich Oerlikon is in preparation; the planned date is shown above and is not yet finally confirmed. We describe location and access in detail once the clinic has opened. Appointments now: partner practice Praxis Hwang, Schulstrasse 3, 8050 Zürich.',
      'Planned is the range of Traditional Chinese Medicine: acupuncture, TCM consultation, cupping, Tuina massage, Chinese herbal medicine, moxibustion and electroacupuncture. Our sister location is in <a href="/en/locations/zuerich-hoengg/">Höngg</a>.',
    ],
    area: 'The new clinic is close for Oerlikon, Seebach, Schwamendingen, Affoltern and districts 11/12, and quick to reach from the Glattal: Wallisellen, Opfikon, Kloten, Bassersdorf, Rümlang and Regensdorf.',
    faqs: [
      { q: 'Where do I find TCM in Oerlikon?', a: 'Our new clinic is being set up at Ohmstrasse 14, a few minutes\' walk from Oerlikon station. Until it opens, our partner practice Praxis Hwang at Schulstrasse 3 treats you.' },
      { q: 'Which treatments will the Oerlikon location offer?', a: 'Planned are acupuncture and TCM consultation, plus further methods such as cupping or herbal medicine depending on the team. We confirm the final range at the opening; feel free to ask on WhatsApp.' },
      { q: 'Does health insurance cover the treatment in Oerlikon?', a: INSURANCE },
      { q: 'How quickly can I get an appointment in Oerlikon?', a: 'At Ohmstrasse 14 we allocate appointments from the opening; the form on this page puts you on the list. For an appointment before the opening, choose the partner practice Praxis Hwang at Schulstrasse 3 in the form.' },
    ],
    hero: { src: '/images/standort-oerlikon.png', alt: 'TCM.ch clinic Zürich Oerlikon', caption: 'Ohmstrasse 14, Zürich Oerlikon' },
    nearby: ['zuerich-hoengg', 'winterthur-marktgasse', 'volketswil'],
  },

  'st-gallen': {
    lead: 'Acupuncture and TCM in the centre of St. Gallen, with time for a thorough assessment.',
    sub: 'Our clinic at Oberer Graben 22 in the city centre. Requests are welcome in English or German.',
    about: [
      'Our St. Gallen clinic at Oberer Graben 22 lies in the city centre; the Oberer Graben bus stop is right outside. We offer acupuncture, cupping, Tuina massage, Chinese herbal medicine and related methods. Practitioner recognition (EMR/ASCA) is checked for you before the first appointment.',
    ],
    area: 'Our patients come from St. Gallen and from Gaiserwald, Wittenbach, Mörschwil, Goldach, Eggersriet, Gossau, Herisau, Teufen and Speicher.',
    faqs: [
      { q: 'Where exactly are you in St. Gallen?', a: 'Our clinic is at Oberer Graben 22, 9000 St. Gallen, in the city centre.' },
      BOOK_FAQ('St. Gallen'),
      { q: 'Does health insurance cover the treatment?', a: INSURANCE },
      { q: 'How many sessions will I need?', a: SESSIONS },
    ],
    hero: { src: '/images/standort-stgallen.jpg', alt: 'TCM.ch clinic St. Gallen', caption: 'Oberer Graben 22, St. Gallen' },
    nearby: ['rorschach', 'wil', 'kreuzlingen'],
  },

  bottighofen: {
    lead: 'TCM Pelican in Bottighofen: an independent partner clinic in the TCM.ch network, on Lake Constance near Kreuzlingen.',
    sub: 'Hauptstrasse 34, 8598 Bottighofen. TCM Pelican is an independent practice; TCM.ch coordinates your request.',
    about: [
      'TCM Pelican at Hauptstrasse 34 in Bottighofen is an independent practice and partner clinic in the TCM.ch network, on the Swiss shore of Lake Constance near Kreuzlingen. Acupuncture and Tuina are offered by an EMR-recognised naturopathic practitioner with the OdA certificate in Traditional Chinese Medicine. You request appointments through TCM.ch or directly with the practice.',
    ],
    area: 'Our patients come from Bottighofen, Kreuzlingen, Münsterlingen, Tägerwilen, Altnau, Konstanz and Frauenfeld.',
    faqs: [
      { q: 'What does "partner clinic" mean?', a: 'TCM Pelican is an independent practice and partner in the TCM.ch network. You are treated by TCM Pelican; TCM.ch coordinates requests and answers questions about costs and insurance.' },
      { q: 'Where exactly are you in Bottighofen?', a: 'TCM Pelican is at Hauptstrasse 34, 8598 Bottighofen.' },
      BOOK_FAQ('Bottighofen'),
      { q: 'Does health insurance cover the treatment?', a: INSURANCE },
    ],
    partnerClinic: 'TCM Pelican',
    hero: { src: '/images/bottighofen-hero.webp', alt: 'TCM Pelican practice in Bottighofen', caption: 'Hauptstrasse 34, Bottighofen' },
    nearby: ['kreuzlingen', 'frauenfeld', 'rorschach'],
  },

  luzern: {
    lead: 'A TCM.ch clinic for Lucerne and Central Switzerland is in preparation.',
    sub: 'Not open yet. Register your interest now and we contact you as soon as appointments are possible.',
    about: [
      'TCM.ch is preparing a location in Lucerne. Address, team and opening hours are published here once they are confirmed; we do not announce anything before that. In the meantime you can register your interest for Lucerne or request an appointment at one of our open clinics.',
    ],
    area: 'The planned clinic is intended for Lucerne and the surrounding municipalities: Kriens, Emmen, Emmenbrücke, Horw, Ebikon, Littau and Meggen.',
    faqs: [
      { q: 'When does the Lucerne clinic open?', a: 'The opening is planned for 2027. We publish the address and the exact date once they are confirmed.' },
      { q: 'Can I already get treatment somewhere?', a: 'Yes. Send us your request and we suggest the nearest open TCM.ch clinic, or put you on the list for Lucerne.' },
      { q: 'Does health insurance cover the treatment?', a: INSURANCE },
    ],
    hero: { src: '/images/hero-main.webp', alt: 'Illustrative image: treatment at a TCM.ch clinic', caption: 'Illustrative image', symbolic: true },
    nearby: ['zuerich-hoengg', 'zuerich-oerlikon', 'basel'],
  },

  bern: {
    lead: 'A TCM.ch clinic for Bern is in preparation.',
    sub: 'Not open yet. Register your interest now and we contact you as soon as appointments are possible.',
    about: [
      'TCM.ch is preparing a location in Bern. Address, team and opening hours are published here once they are confirmed; we do not announce dates before that. In the meantime you can register your interest for Bern or request an appointment at one of our open clinics.',
    ],
    area: 'The planned clinic is intended for Bern and the surrounding municipalities: Köniz, Ostermundigen, Ittigen, Zollikofen, Muri bei Bern and Worb.',
    faqs: [
      { q: 'When does the Bern clinic open?', a: 'There is no confirmed date yet. We publish the address and date once they are confirmed.' },
      { q: 'Can I already get treatment somewhere?', a: 'Yes. Send us your request and we suggest the nearest open TCM.ch clinic, or put you on the list for Bern.' },
      { q: 'Does health insurance cover the treatment?', a: INSURANCE },
    ],
    hero: { src: '/images/hero-main.webp', alt: 'Illustrative image: treatment at a TCM.ch clinic', caption: 'Illustrative image', symbolic: true },
    nearby: ['basel', 'luzern', 'zuerich-hoengg'],
  },
};

/** Default therapy set (DE slugs) for clinics without a standorte.ts entry; mapped to EN therapies by deSlug. */
export const DEFAULT_THERAPIES = ['akupunktur', 'schroepfen', 'tuina', 'kraeutertherapie', 'moxibustion', 'elektroakupunktur'];
/** Default condition set (DE slugs) for clinics without a standorte.ts entry. */
export const DEFAULT_CONDITIONS = ['rueckenschmerzen', 'nackenschmerzen', 'migraene', 'schlafprobleme', 'stress-burnout', 'kinderwunsch'];
