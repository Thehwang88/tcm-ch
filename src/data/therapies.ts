// ── Single source of truth for the 11 EN therapy pages (Astro getStaticPaths). ──
// Each entry pairs an EN slug with the canonical DE Therapie slug from the SPA
// (public/index.html THERAPIES[]). DE therapy URL pattern (SPA buildRoute):
//   /therapien/<deSlug>   <->   EN /en/therapies/<slug>   (hreflang pair)
//
// Voice: "you", honest, evidence-aware. No cure claims, no Qi/Yin-Yang, no
// meridian/energetic/spiritual language. Same medical standard as the DE Wissen
// articles and the EN condition pages — hedged language, complementary framing.

export interface TherapyFaq { q: string; a: string }

export interface Therapy {
  slug: string;        // EN URL slug
  deSlug: string;      // DE /therapien/<deSlug> (SPA THERAPIES id)
  name: string;        // H1 / display name, e.g. "Cupping"
  titleTerm: string;   // SEO term for <title>, e.g. "Cupping Therapy"
  keyword: string;     // lowercase search keyword for <meta>
  summary: string;     // one-line blurb for the index cards
  lead: string;        // hero lead paragraph (hedged intro)
  whatItIs: string[];  // body: what it is + how it's done
  whatToExpect: string[]; // what a session is like
  usedFor: string;     // hedged "typically used for" paragraph
  evidence: string;    // honest, evidence-aware paragraph
  conditions: string[];// EN condition slugs it commonly supports (cross-link)
  faqs: TherapyFaq[];  // 2–3 therapy-specific Qs (shared insurance FAQ appended)
  related: string[];   // 2–3 related EN therapy slugs
}

// Last editorial/clinical review date for MedicalWebPage.lastReviewed (static).
export const REVIEWED_DATE = '2026-06-09';

// Shared FAQ appended to every therapy page (display + FAQPage schema).
export const INSURANCE_FAQ: TherapyFaq = {
  q: 'Is this covered by my insurance?',
  a: 'Treatment by our EMR-/ASCA-recognised practitioners is typically reimbursed through Swiss supplementary insurance for complementary medicine, not basic insurance. How much you get back depends on your individual policy. Our insurance guide explains the basic-versus-supplementary split in plain English.',
};

export const therapies: Therapy[] = [
  {
    slug: 'acupuncture',
    deSlug: 'akupunktur',
    name: 'Acupuncture',
    titleTerm: 'Acupuncture',
    keyword: 'acupuncture',
    summary: 'The best-known TCM treatment — fine needles at specific points, used as a complementary approach.',
    lead: 'Acupuncture is the best-known treatment in Traditional Chinese Medicine. It is used as a complementary approach for a range of complaints, most often pain — results vary from person to person, and it is not a cure.',
    whatItIs: [
      'Acupuncture involves placing very fine, sterile single-use needles at specific points on the body. It is one of the more researched complementary therapies, and in Switzerland it is widely covered through supplementary insurance when delivered by EMR-/ASCA-recognised practitioners.',
      'A typical course is a series of short sessions rather than a single visit. We use it as a complement to — not a replacement for — exercise, medication and the medical care you need, and we are honest that how much it helps differs from person to person.',
    ],
    whatToExpect: [
      'Your first appointment starts with a thorough conversation about your symptoms and history. The practitioner then places around 8 to 20 thin needles; most people feel only a small prick or a dull, heavy sensation rather than pain.',
      'The needles usually stay in for 20 to 30 minutes while you rest. Many people find this part relaxing. Tell your practitioner if anything feels sharp and they will adjust.',
    ],
    usedFor: 'People most often try acupuncture for musculoskeletal pain such as back and neck pain, for migraine and tension headaches, and as supportive care for sleep, stress and fertility journeys. The evidence is stronger in some of these areas than others.',
    evidence: 'Acupuncture is among the better-studied complementary therapies. Reviews are most encouraging for chronic pain and for reducing the frequency of migraine and tension-type headache; for many other uses the evidence is weaker or mixed, and part of the effect may be non-specific. We treat it as a reasonable option to try, not a guaranteed fix.',
    conditions: ['back-pain', 'neck-pain', 'migraine-headaches', 'sleep-problems', 'stress-burnout', 'fertility-support'],
    faqs: [
      { q: 'Does acupuncture hurt?', a: 'The needles are very fine and most people feel only a small prick or a dull, heavy ache as they go in. It is usually far more comfortable than people expect. Sharp or lasting pain is not normal — tell your practitioner and they will adjust or reposition the needle.' },
      { q: 'How many sessions will I need?', a: 'There is no fixed number. Many people start with a short course of about six to ten sessions and we reassess whether it is helping. If you notice no change after several treatments, we will say so honestly rather than keep going indefinitely.' },
      { q: 'Is acupuncture safe?', a: 'When performed by a trained practitioner with sterile single-use needles, serious side effects are rare. Minor bruising or brief light-headedness can happen. Tell us if you are pregnant, take blood thinners, or have a bleeding disorder so we can adapt the treatment.' },
    ],
    related: ['electroacupuncture', 'cupping', 'tuina-massage'],
  },

  {
    slug: 'cupping',
    deSlug: 'schroepfen',
    name: 'Cupping',
    titleTerm: 'Cupping Therapy',
    keyword: 'cupping therapy',
    summary: 'Suction cups to ease tight muscles and improve local circulation — often combined with acupuncture.',
    lead: 'Cupping uses suction cups on the skin to ease muscular tension. It is commonly used as a complementary approach for tight backs, necks and shoulders — results vary, and it is not a cure.',
    whatItIs: [
      'In cupping, glass or silicone cups are placed on the skin and a vacuum is created, gently drawing the tissue up. The aim is to loosen tight muscles and increase local blood flow. The cups can be left in place or, with a little oil, moved across the skin as a massage.',
      'It is often combined with acupuncture or Tuina rather than used alone. We use it as a complement to staying active and to any medical care you need, not as a substitute for them.',
    ],
    whatToExpect: [
      'After a short conversation about where the tension sits, the practitioner applies several cups, usually across the back, neck or shoulders, for around 10 to 20 minutes. You feel a firm pulling sensation that most people find tolerable and often relieving.',
      'Cupping commonly leaves round, bruise-like marks. These are not painful and usually fade over several days to a week. Tell us beforehand if you would prefer to avoid visible marks.',
    ],
    usedFor: 'Cupping is most often used for muscular tension and stiffness in the back, neck and shoulders, and is sometimes added when treating tension headaches that stem from a tight neck. It targets muscular symptoms rather than any underlying disease.',
    evidence: 'The research on cupping is limited and of modest quality. Some studies suggest short-term relief for neck and back pain, but the effects are hard to separate from general massage and attention. We present it as a low-risk option that many people find directly loosens tight muscles, not as an established treatment.',
    conditions: ['back-pain', 'neck-pain', 'migraine-headaches', 'stress-burnout'],
    faqs: [
      { q: 'What are the round marks after cupping?', a: 'The circular marks are caused by the suction drawing blood toward the skin surface. They are not bruises in the usual sense and are generally not painful. They typically fade within a few days to a week. If you would rather avoid them, let us know and we can keep the suction lighter.' },
      { q: 'Does cupping hurt?', a: 'Most people feel a firm pulling or tightness rather than pain, and many find it relieving over tense muscles. If a cup feels too strong, tell your practitioner and they will reduce the suction. It should not be sharply painful.' },
      { q: 'Who should avoid cupping?', a: 'We avoid or adapt cupping if you take blood thinners, have a bleeding disorder, fragile or inflamed skin in the area, or are pregnant. Tell us about your medical history beforehand so we can decide whether it is suitable for you.' },
    ],
    related: ['acupuncture', 'tuina-massage', 'gua-sha'],
  },

  {
    slug: 'tuina-massage',
    deSlug: 'tuina',
    name: 'Tuina Massage',
    titleTerm: 'Tuina Massage',
    keyword: 'tuina massage',
    summary: 'A firm, medical-style Chinese massage for muscular tension and stiffness.',
    lead: 'Tuina is a firm, therapeutic Chinese massage. It is used as a complementary, hands-on approach for muscular tension and stiffness — results vary, and it is not a cure.',
    whatItIs: [
      'Tuina (literally "push and grasp") is a hands-on Chinese massage that uses pressing, kneading and rolling techniques along the muscles, together with gentle joint mobilisation. Unlike a purely relaxing massage, it is applied with a clear therapeutic aim and can be quite firm.',
      'We use it on its own or alongside acupuncture, as a complement to movement and any medical care you need. How much it helps, and for how long, differs from person to person.',
    ],
    whatToExpect: [
      'After discussing where the tension sits and how you move, the practitioner works on the affected areas with firm pressure, kneading and stretching. Some tenderness over tight spots is normal and usually feels like a "good" ache.',
      'A session typically lasts 45 to 60 minutes. Sharp pain is not the goal — tell your practitioner if the pressure is too strong and they will ease off.',
    ],
    usedFor: 'Tuina is most often used for back, neck and shoulder tension, stiffness from posture or overuse, and tension headaches linked to a tight neck. It is also sometimes used to support functional digestive complaints. It addresses muscular and functional symptoms, not underlying disease.',
    evidence: 'Good-quality research specifically on Tuina is limited. Massage in general has reasonable evidence for short-term relief of muscular and low-back pain, and many people find Tuina directly eases tension. We are honest that the specific evidence is thin and present it as a sensible, low-risk complement.',
    conditions: ['back-pain', 'neck-pain', 'digestive-issues', 'stress-burnout'],
    faqs: [
      { q: 'How is Tuina different from a relaxing massage?', a: 'Tuina is applied with a therapeutic aim — easing specific areas of tension and stiffness — and tends to be firmer and more targeted than a spa massage. It often forms part of a wider TCM treatment alongside acupuncture, rather than being purely for relaxation, though many people still find it calming.' },
      { q: 'Does Tuina hurt?', a: 'It can be firm, and some tenderness over tight muscles is normal and usually feels relieving. It should not be sharply painful. Tell your practitioner if the pressure is too much and they will adjust — more pressure is not necessarily better.' },
      { q: 'How many sessions will I need?', a: 'There is no set number. Many people start with a short course and we reassess as we go. For tension driven by posture or stress, we will also talk about what you can change between sessions, since massage alone rarely fixes the underlying cause.' },
    ],
    related: ['acupuncture', 'cupping', 'shiatsu'],
  },

  {
    slug: 'chinese-herbal-medicine',
    deSlug: 'kraeutertherapie',
    name: 'Chinese Herbal Medicine',
    titleTerm: 'Chinese Herbal Medicine',
    keyword: 'chinese herbal medicine',
    summary: 'Individually prescribed herbal formulas, used as a complement for longer-term complaints.',
    lead: 'Chinese herbal medicine uses individually prescribed plant-based formulas. It is used as a complementary approach, mainly for longer-term complaints — results vary, and it is not a cure.',
    whatItIs: [
      'A practitioner prescribes a formula, usually a combination of several plant-based ingredients, tailored to your symptoms and history. It commonly comes as granules dissolved in hot water, as a tea, or as tablets. It is the second main pillar of TCM after acupuncture.',
      'We use only quality-controlled herbs from suppliers that test for contaminants, and we check for interactions with any conventional medicines you take. Herbal medicine is a complement to medical care, not a replacement, and your prescription is reviewed and adjusted over time.',
    ],
    whatToExpect: [
      'The first appointment is a detailed consultation about your symptoms, health history and current medication. From this the practitioner puts together an individual formula and explains how to prepare and take it.',
      'You then take the formula daily at home. We review how you are getting on after a few weeks and adjust the prescription. Tell us about any new symptoms or medication changes between visits.',
    ],
    usedFor: 'Herbal medicine is most often used for longer-standing, fluctuating complaints — functional digestive issues, sleep problems, cycle-related symptoms and fertility support — where ongoing, adjustable treatment suits the problem. It is used alongside, not instead of, any medical work-up these need.',
    evidence: 'The evidence base is uneven: some formulas have supportive trials for specific complaints, but quality varies and many products are poorly studied. Safety also matters — herbs can interact with medication. We prescribe cautiously, check interactions, and are honest that this is a complement with limited proof rather than a proven cure.',
    conditions: ['digestive-issues', 'sleep-problems', 'menstrual-issues', 'fertility-support', 'stress-burnout'],
    faqs: [
      { q: 'Are Chinese herbs safe?', a: 'They are not automatically safe just because they are natural. Herbs can have effects and interact with medication, so a proper consultation matters. We use quality-controlled herbs tested for contaminants and check your formula against any medicines you take. Tell us your full medical history and what else you are taking.' },
      { q: 'Will the herbs interact with my medication?', a: 'They can, which is exactly why we ask what you take before prescribing — blood thinners, antidepressants and immune-suppressing drugs are particular examples. We screen for known interactions and will avoid or adjust a formula where needed. Never stop a prescribed medicine to take herbs without talking to your doctor.' },
      { q: 'How do I take the formula and how long for?', a: 'Most people take granules dissolved in hot water once or twice a day; tablets and teas are alternatives. Short-term complaints may need a few weeks, longer-standing ones several months with regular adjustments. We reassess as we go and stop if it is not helping.' },
    ],
    related: ['acupuncture', 'moxibustion', 'tuina-massage'],
  },

  {
    slug: 'moxibustion',
    deSlug: 'moxibustion',
    name: 'Moxibustion',
    titleTerm: 'Moxibustion',
    keyword: 'moxibustion',
    summary: 'A warming therapy using mugwort heat over specific points, often paired with acupuncture.',
    lead: 'Moxibustion is a warming therapy that applies gentle heat over specific points using mugwort. It is used as a complementary approach, often alongside acupuncture — results vary, and it is not a cure.',
    whatItIs: [
      'Moxibustion uses dried, compressed mugwort (moxa) that is warmed over or near acupuncture points so the heat penetrates the tissue. It can be applied with a moxa stick held above the skin, or placed on top of an acupuncture needle.',
      'It is usually combined with acupuncture rather than used alone, and is applied as a complement to — not a replacement for — the medical care you need. The heat should feel pleasantly warm, never hot enough to burn.',
    ],
    whatToExpect: [
      'The practitioner holds or positions warming moxa over selected points until the area feels comfortably warm, moving on before it becomes too hot. You should feel a soothing warmth rather than any burning.',
      'Burning mugwort has a distinctive herbal smell, and the room is ventilated; smoke-free moxa can be used if you prefer. The treatment is usually painless and many people find it relaxing.',
    ],
    usedFor: 'Moxibustion is traditionally used for complaints associated with feeling cold or run-down, and is often applied as supportive care around fertility, cycle-related symptoms and digestive complaints. One of its better-known uses is helping turn a breech baby late in pregnancy, which should only be done under qualified guidance.',
    evidence: 'The evidence is limited and mixed. The most-studied use — moxibustion for breech presentation — has some supportive but inconclusive trials and should only be done with professional supervision. For most other uses the research is weak. We present it as a gentle, low-risk complement, not a proven treatment.',
    conditions: ['fertility-support', 'menstrual-issues', 'digestive-issues', 'stress-burnout'],
    faqs: [
      { q: 'Does moxibustion burn the skin?', a: 'It should not. The heat is applied carefully and the point is changed as soon as it feels too warm, so you feel a comfortable warmth rather than burning. With correct technique, skin burns do not occur. Tell your practitioner immediately if any spot feels too hot.' },
      { q: 'What is the smell during treatment?', a: 'Burning mugwort has a strong, herbal, slightly smoky smell that can linger briefly in clothing. We ventilate the room well and can use smoke-free moxa if you are sensitive to it or prefer to avoid the smell.' },
      { q: 'Is moxibustion safe in pregnancy?', a: 'Moxa over a specific point is sometimes used from around week 32 to encourage a breech baby to turn, and this use is reasonably studied. Other uses in pregnancy should only be done by an experienced TCM practitioner, never self-applied. Always tell us if you are pregnant.' },
    ],
    related: ['acupuncture', 'chinese-herbal-medicine', 'tuina-massage'],
  },

  {
    slug: 'electroacupuncture',
    deSlug: 'elektroakupunktur',
    name: 'Electroacupuncture',
    titleTerm: 'Electroacupuncture',
    keyword: 'electroacupuncture',
    summary: 'Acupuncture with a gentle electric pulse added to the needles, often used for chronic pain.',
    lead: 'Electroacupuncture adds a gentle electric pulse to acupuncture needles. It is used as a complementary approach, most often for chronic and nerve-related pain — results vary, and it is not a cure.',
    whatItIs: [
      'Electroacupuncture is a variation of acupuncture in which a small device connects pairs of needles and passes a mild, low-level electric current between them. The aim is to add a steady, controlled stimulation on top of the needling.',
      'It is often used when standard acupuncture has not given enough relief, particularly for persistent pain. As with all our treatments, it is a complement to — not a replacement for — the medical care you need.',
    ],
    whatToExpect: [
      'After the needles are placed, the practitioner attaches fine clips and gradually increases the current to a level that feels like a comfortable tingling or rhythmic pulsing. It is adjusted to your comfort and should never be painful.',
      'The current usually runs for around 15 to 30 minutes while you rest. Tell your practitioner if the sensation becomes too strong and they will turn it down.',
    ],
    usedFor: 'Electroacupuncture is most often used for chronic pain, nerve-related pain and stubborn musculoskeletal complaints such as long-standing back, neck and joint pain that have not responded well to standard acupuncture. It is used for symptom relief, not to treat the underlying cause.',
    evidence: 'There is moderate evidence that electroacupuncture can help with some chronic and post-operative pain, and it is one of the more studied acupuncture variations for pain. Quality still varies and it does not work for everyone. We use it as a reasonable option to trial for persistent pain, not a certainty.',
    conditions: ['back-pain', 'neck-pain', 'migraine-headaches'],
    faqs: [
      { q: 'Can I feel the electric current?', a: 'Yes — most people feel a light tingling or a gentle rhythmic pulsing. The strength is set individually and should always feel comfortable, never painful. If it becomes too strong, tell your practitioner and they will reduce it immediately.' },
      { q: 'Who should not have electroacupuncture?', a: 'We avoid it if you have a pacemaker or implanted defibrillator, and use caution with epilepsy, in pregnancy, and over certain areas such as the chest. Tell us about any implanted devices or medical conditions beforehand so we can decide whether it is suitable.' },
      { q: 'How is it different from a TENS machine?', a: 'A TENS unit sends current through pads on the skin surface, while electroacupuncture delivers it through needles placed at specific points, so the stimulation is more targeted and deeper. Both aim at pain relief; we choose electroacupuncture when needle-based treatment fits your situation.' },
    ],
    related: ['acupuncture', 'cupping', 'tuina-massage'],
  },

  {
    slug: 'facial-acupuncture',
    deSlug: 'gesichtsakupunktur',
    name: 'Facial Acupuncture',
    titleTerm: 'Facial Acupuncture',
    keyword: 'facial acupuncture',
    summary: 'A natural, needle-based facial treatment — gentle, with modest and gradual effects.',
    lead: 'Facial acupuncture (cosmetic acupuncture) uses fine needles in the face as a natural alternative to injectables. Effects are modest and gradual, and we are careful not to overpromise.',
    whatItIs: [
      'Facial acupuncture places very fine needles at points on the face and body. The idea is to stimulate local circulation and the skin’s own response. It is marketed as a natural alternative to injectables such as Botox or fillers, but it works differently and does not give the same results.',
      'We are upfront that any effects are subtle and build gradually over a course of sessions. It is a cosmetic-leaning treatment, not a medical or anti-ageing cure, and we will not claim dramatic or lasting change.',
    ],
    whatToExpect: [
      'After a short consultation, the practitioner places many very fine needles across the face and sometimes the body. Most people feel only small pricks. The needles stay in while you rest, usually for around 30 to 40 minutes.',
      'Mild redness or the occasional tiny spot at a needle site is common and usually settles within an hour; small bruises are possible and fade over a few days. People who want visible results usually come for a course rather than a one-off.',
    ],
    usedFor: 'Facial acupuncture is used cosmetically, for skin appearance, tone and facial tension, and some people choose it as a gentler, substance-free option. It is sometimes combined with body acupuncture for stress or sleep. We do not present it as a treatment for any medical skin condition.',
    evidence: 'The evidence for facial acupuncture is very limited — mostly small studies of low quality — so we cannot promise specific cosmetic results. Any effect tends to be subtle and gradual, and it is not comparable to injectables. We offer it as a low-risk, natural option for those who want it, while being honest about how little is proven.',
    conditions: ['stress-burnout', 'sleep-problems', 'migraine-headaches'],
    faqs: [
      { q: 'Is facial acupuncture an alternative to Botox?', a: 'Not directly. It is a natural, substance-free option that some people prefer, but it works differently and does not produce the same results as Botox or fillers. Any effects are subtle and gradual. We are honest that it is not a like-for-like replacement.' },
      { q: 'Will I have marks afterwards?', a: 'Mild redness or small dots at needle sites are common and usually fade within an hour. Occasional small bruises can happen because the face is well supplied with tiny blood vessels, and these settle over a few days. Let us know if you have an event coming up.' },
      { q: 'How many sessions before I see anything?', a: 'Any change tends to be gradual and modest, so people usually do a course of sessions rather than expecting a single visit to make a difference. Results vary a lot between individuals, and we will be honest if it does not seem to be doing much for you.' },
    ],
    related: ['acupuncture', 'acupressure', 'gua-sha'],
  },

  {
    slug: 'acupressure',
    deSlug: 'akupressur',
    name: 'Acupressure',
    titleTerm: 'Acupressure',
    keyword: 'acupressure',
    summary: 'Needle-free point stimulation by finger pressure — gentle, and suitable for the needle-averse.',
    lead: 'Acupressure stimulates the same points as acupuncture using finger pressure instead of needles. It is a gentle, complementary approach — results vary, and it is not a cure.',
    whatItIs: [
      'Acupressure works on the same points as acupuncture, but the practitioner applies focused pressure with the fingers or hands rather than inserting needles. This makes it gentle and needle-free, which suits people who are anxious about needles.',
      'It is a low-risk complement to medical care, not a replacement for it. We can also show you a few points to press yourself at home, as a supplement to in-clinic treatment.',
    ],
    whatToExpect: [
      'After discussing your symptoms, the practitioner applies steady, focused pressure to selected points, often around the head, neck, hands or back. You feel a firm but tolerable pressure, and many people find it immediately relaxing.',
      'A session is calm and fully clothed, typically lasting 30 to 45 minutes. Tell your practitioner if any pressure feels too strong and they will ease off.',
    ],
    usedFor: 'Acupressure is most often used for tension headaches, nausea, mild stress and sleep difficulties, and as a gentle option for children, during pregnancy, or for anyone wary of needles. It is used for symptom relief rather than to treat an underlying condition.',
    evidence: 'Evidence is limited but there are reasonable signals in a few areas — particularly acupressure for nausea, and some support for tension headaches and sleep. Effects are generally gentler than acupuncture. We offer it as a low-risk option, especially where needles are unwelcome, without overstating what it can do.',
    conditions: ['migraine-headaches', 'sleep-problems', 'stress-burnout', 'digestive-issues'],
    faqs: [
      { q: 'How is acupressure different from acupuncture?', a: 'Acupressure uses finger pressure on the same points where acupuncture uses needles. It is gentler, needle-free and does not break the skin, which makes it a good option for people who are anxious about needles, as well as for children and during pregnancy. The effect is usually milder than acupuncture.' },
      { q: 'Can I do acupressure at home?', a: 'Yes — we are happy to show you a few simple points to press for things like tension headaches, nausea or stress. Self-acupressure is a useful supplement, though treatment with a practitioner is usually more thorough. It is best used alongside, not instead of, any medical care you need.' },
      { q: 'Is acupressure safe in pregnancy?', a: 'It is popular in pregnancy, particularly for nausea, and is generally low-risk. Certain points are avoided, so it is best done by, or learned from, a trained practitioner. Always let us know you are pregnant so we can adapt the treatment.' },
    ],
    related: ['acupuncture', 'tuina-massage', 'shiatsu'],
  },

  {
    slug: 'shiatsu',
    deSlug: 'shiatsu',
    name: 'Shiatsu',
    titleTerm: 'Shiatsu Massage',
    keyword: 'shiatsu massage',
    summary: 'A calming, fully clothed Japanese pressure therapy, often used for stress and tension.',
    lead: 'Shiatsu is a Japanese, fully clothed pressure therapy. It is used as a calming, complementary approach, often for stress and tension — results vary, and it is not a cure.',
    whatItIs: [
      'Shiatsu (Japanese for "finger pressure") is a hands-on therapy in which the practitioner applies rhythmic pressure with thumbs, palms and sometimes elbows, along with gentle stretches. It comes from the same roots as Chinese massage but developed its own style in Japan.',
      'You stay fully clothed throughout, and treatment is often on a mat or a couch. We use it as a calming complement to medical care, not as a substitute for it.',
    ],
    whatToExpect: [
      'Wear loose, comfortable clothing. After a short conversation, the practitioner works methodically over the body with steady pressure and slow stretches. Most people find it deeply relaxing rather than painful.',
      'A session usually lasts around 60 minutes. Let your practitioner know if any pressure feels too firm and they will adjust.',
    ],
    usedFor: 'Shiatsu is most often used for stress, general tension and sleep difficulties, and as supportive, calming care for back and neck tension. Many people value it simply as restful time. It supports wellbeing rather than treating any specific medical condition.',
    evidence: 'High-quality evidence for Shiatsu is sparse. The most reasonable claim is that, like other forms of touch and relaxation, it can help people feel calmer and less tense in the short term. We present it honestly as a low-risk, supportive treatment for stress and tension, not a proven medical therapy.',
    conditions: ['stress-burnout', 'sleep-problems', 'back-pain', 'neck-pain'],
    faqs: [
      { q: 'What do I wear for Shiatsu?', a: 'You stay fully clothed for the whole treatment, so loose, comfortable clothing in a soft fabric is ideal — avoid stiff jeans. Treatment is usually on a padded mat or a couch. There is no oil and no need to undress.' },
      { q: 'How is Shiatsu different from Tuina?', a: 'Both use pressure along the body and share common roots, but Shiatsu is the Japanese tradition — often slower and more rhythmic, frequently on a mat — while Tuina is the Chinese style, often firmer and on a couch with added joint mobilisation. Which suits you is partly personal preference.' },
      { q: 'What is Shiatsu good for?', a: 'People most often come for stress, general tension and sleep difficulties, and many simply value it as restful, calming time. It supports wellbeing rather than treating a specific medical condition, and we are honest that the evidence is limited.' },
    ],
    related: ['tuina-massage', 'acupressure', 'acupuncture'],
  },

  {
    slug: 'gua-sha',
    deSlug: 'gua-sha',
    name: 'Gua Sha',
    titleTerm: 'Gua Sha Therapy',
    keyword: 'gua sha',
    summary: 'Gentle scraping over the skin with a smooth tool to ease muscular tension.',
    lead: 'Gua sha uses a smooth-edged tool to stroke the skin and underlying muscle. It is used as a complementary approach for muscular tension — results vary, and it is not a cure.',
    whatItIs: [
      'Gua sha (literally "scraping") involves stroking a smooth-edged tool firmly over oiled skin, usually on the back, neck or shoulders. The aim is to ease muscular tension and increase local blood flow in the area being worked.',
      'It is the body-treatment form practised in clinic, and is distinct from the very light facial gua sha sold for skincare. We use it as a complement to staying active and to any medical care you need.',
    ],
    whatToExpect: [
      'After a little oil is applied, the practitioner strokes the tool firmly along the muscle in short, repeated passes. You feel a strong scraping pressure that most people find tolerable and often relieving over tight areas.',
      'Gua sha usually brings up temporary red or purplish marks where it is applied. These are not painful and typically fade within a few days. Tell us beforehand if you would rather avoid visible marks.',
    ],
    usedFor: 'Gua sha is most often used for muscular tension and stiffness in the neck, shoulders and upper back, and is sometimes added when a tight neck is feeding tension headaches. It targets muscular symptoms rather than any underlying disease.',
    evidence: 'The evidence for gua sha is limited and of low quality, though a few small studies suggest short-term relief for neck and back tension. The effect is hard to separate from massage in general. We present it as a low-risk option that many people find loosens tight muscles, not an established treatment.',
    conditions: ['neck-pain', 'back-pain', 'migraine-headaches'],
    faqs: [
      { q: 'Why does gua sha leave red marks?', a: 'The firm scraping draws blood toward the skin surface, producing temporary red or purplish marks called "sha". They are expected, generally not painful, and usually fade within a few days. If you would prefer to avoid them, tell your practitioner and they can work more gently.' },
      { q: 'Is the clinic treatment the same as facial gua sha?', a: 'No. The body gua sha we use in clinic is firmer and aimed at muscular tension, whereas the facial gua sha sold for skincare is very light and cosmetic. They share a tool shape but are quite different in pressure and purpose.' },
      { q: 'Does gua sha hurt?', a: 'Most people feel a strong scraping pressure that is tolerable and often relieving over tight muscles, rather than sharp pain. Tell your practitioner if it feels too intense and they will lighten the pressure. It should not be painful afterwards beyond mild tenderness.' },
    ],
    related: ['cupping', 'tuina-massage', 'acupuncture'],
  },

  {
    slug: 'physiotherapy',
    deSlug: 'physiotherapie',
    name: 'Physiotherapy',
    titleTerm: 'Physiotherapy',
    keyword: 'physiotherapy',
    summary: 'Movement-based, evidence-led rehab for pain and injury — well combined with TCM.',
    lead: 'Physiotherapy is movement-based, evidence-led treatment for pain, injury and recovery. We offer it as part of an integrated approach, and it pairs well with acupuncture and manual therapy.',
    whatItIs: [
      'Physiotherapy assesses how you move and uses exercise, manual techniques and education to help you recover from pain or injury and regain function. Unlike most of our other treatments, it is a mainstream, well-evidenced part of conventional healthcare.',
      'At our clinics it sits naturally alongside acupuncture and manual therapy, so a course can combine hands-on relief with the active rehab that drives longer-term recovery. It complements, and does not replace, your medical care.',
    ],
    whatToExpect: [
      'Your first appointment is an assessment: what the problem stops you doing, how you move, and where the limitations are. From there you get a treatment and exercise plan tailored to your goals.',
      'Sessions typically combine hands-on work with exercises you practise between visits — and the home exercises matter, since active rehab is usually what drives recovery rather than passive treatment alone.',
    ],
    usedFor: 'Physiotherapy is used for musculoskeletal pain and injury — back and neck pain, joint and sports injuries, post-operative recovery and rehabilitation. It is the active, movement-based counterpart to the hands-on relief that acupuncture and massage can provide.',
    evidence: 'Physiotherapy is a core, evidence-based part of conventional care, with good support for exercise-based rehabilitation in back pain, neck pain and many injuries. We are clear about scope: it works best as active treatment you take part in, and we combine it with TCM where that adds value rather than offering one as a substitute for the other.',
    conditions: ['back-pain', 'neck-pain'],
    faqs: [
      { q: 'Can I combine physiotherapy with acupuncture?', a: 'Yes — that is one of the advantages of treating both at the same clinic. Acupuncture and manual therapy can ease pain and tension, while physiotherapy builds the strength and movement that support longer-term recovery. We coordinate the two so they complement rather than duplicate each other.' },
      { q: 'Do I have to do exercises at home?', a: 'For most problems, yes — the home exercises are usually what drives lasting recovery, while in-clinic treatment supports the process. We keep the plan realistic and tailored to your goals, and adjust it as you progress. Passive treatment alone rarely achieves as much.' },
      { q: 'Is physiotherapy covered differently from TCM?', a: 'Often, yes. Physiotherapy can be covered through basic insurance with a medical referral, whereas TCM treatments are typically reimbursed through supplementary insurance. Cover depends on your policy and situation — we can talk through what applies to you, and our insurance guide explains the split.' },
    ],
    related: ['acupuncture', 'tuina-massage', 'electroacupuncture'],
  },
];

// URL helpers (used by pages + the hreflang pair map in site.ts).
export const enTherapyPath = (slug: string) => `/en/therapies/${slug}`;
export const deTherapyPath = (deSlug: string) => `/therapien/${deSlug}`;

// Lookup for cross-linking related therapies.
export const therapyBySlug = (slug: string): Therapy | undefined =>
  therapies.find((t) => t.slug === slug);

// Reverse lookup: therapies that commonly support a given EN condition slug.
// Used by the condition pages to link back to relevant therapies.
export const therapiesForCondition = (conditionSlug: string): Therapy[] =>
  therapies.filter((t) => t.conditions.includes(conditionSlug));

// ── Shared images: SAME asset the DE therapy showcase uses (home grid in
// public/index.html, matched by therapy), keyed by EN slug. English alt. ──
// NOTE: the DE SPA has no dedicated electroacupuncture image, so it reuses the
// acupuncture photo (electroacupuncture = acupuncture + a gentle current).
export const therapyImages: Record<string, { src: string; alt: string }> = {
  'acupuncture':             { src: '/images/img-c69a8f9ce7f8.webp', alt: 'Fine acupuncture needles placed at points on the body' },
  'cupping':                 { src: '/images/img-a288825ba14a.webp', alt: 'Cupping therapy cups applied to the back' },
  'tuina-massage':           { src: '/images/img-2a8cecc37898.webp', alt: 'Tuina, a firm therapeutic Chinese massage' },
  'chinese-herbal-medicine': { src: '/images/img-14a8b7c52ade.webp', alt: 'Dried herbs used in Chinese herbal medicine' },
  'moxibustion':             { src: '/images/moxibustion-hero.webp',  alt: 'Burning moxa (mugwort) used in moxibustion therapy' },
  'electroacupuncture':      { src: '/images/img-c69a8f9ce7f8.webp', alt: 'Acupuncture needles, as used in electroacupuncture' },
  'facial-acupuncture':      { src: '/images/img-f7c771cf39ed.webp', alt: 'Facial (cosmetic) acupuncture treatment' },
  'acupressure':             { src: '/images/img-5bf9460e0ca5.webp', alt: 'Acupressure, needle-free finger-pressure point stimulation' },
  'shiatsu':                 { src: '/images/img-7149f50cc917.webp', alt: 'Shiatsu, a Japanese pressure therapy' },
  'gua-sha':                 { src: '/images/img-0e38a23a362e.webp', alt: 'Gua sha, scraping technique over the skin' },
  'physiotherapy':           { src: '/images/img-6a11d6de445a.webp', alt: 'Physiotherapy, movement-based rehabilitation' },
};
