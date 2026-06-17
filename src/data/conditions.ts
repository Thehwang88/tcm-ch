// ── Single source of truth for the 8 EN condition pages (Astro getStaticPaths). ──
// Each entry pairs an EN slug with the canonical DE Beschwerde slug from the SPA
// (public/index.html SYMPTOMS[]). DE condition URL pattern (SPA parseRoute):
//   /beschwerden/<deSlug>   <->   EN /en/conditions/<slug>   (hreflang pair)
//
// Voice: "you", honest, evidence-aware. No cure claims, no Qi/Yin-Yang, no
// spiritual/energetic language. Same E-E-A-T/medical standard as the DE Wissen
// articles — hedged language, red flags where relevant.

export interface ConditionFaq { q: string; a: string }

export interface Condition {
  slug: string;        // EN URL slug
  deSlug: string;      // DE /beschwerden/<deSlug> (SPA SYMPTOMS id)
  condition: string;   // display name, e.g. "Back Pain"
  keyword: string;     // lowercase search keyword for <meta>, e.g. "back pain"
  summary: string;     // one-line blurb for the index cards
  lead: string;        // hero lead paragraph (hedged intro)
  intro: string[];     // body: what it is + how acupuncture/TCM is used
  howWeTreat: string[];// typical approach at our clinics
  evidence: string;    // honest, evidence-aware paragraph
  redFlags: string[];  // when to see a doctor first
  faqs: ConditionFaq[];// 3 condition-specific Qs (shared insurance FAQ appended in template)
  related: string[];   // 2–3 related EN slugs
}

// Last editorial/clinical review date for MedicalWebPage.lastReviewed (static, no Date.now()).
export const REVIEWED_DATE = '2026-06-09';

// Shared FAQ appended to every condition page (display + FAQPage schema).
export const INSURANCE_FAQ: ConditionFaq = {
  q: 'Is acupuncture covered by my insurance?',
  a: 'Treatment by our EMR-/ASCA-recognised practitioners is typically reimbursed through Swiss supplementary insurance for complementary medicine, not basic insurance. How much you get back depends on your individual policy. Our insurance guide explains the basic-versus-supplementary split in plain English.',
};

export const conditions: Condition[] = [
  {
    slug: 'back-pain',
    deSlug: 'rueckenschmerzen',
    condition: 'Back Pain',
    keyword: 'back pain',
    summary: 'A complementary approach for chronic and non-specific back pain.',
    lead: 'Back pain is one of the most common reasons people try acupuncture. It is often used as a complementary approach alongside movement and medical care — results vary from person to person, and it is not a cure.',
    intro: [
      'Back pain ranges from short-lived muscle strain to long-standing (chronic) lower-back pain that comes and goes for months. Most acute episodes settle on their own; the harder cases are the persistent ones where no single clear cause shows up on imaging.',
      'Acupuncture is frequently used as a complementary approach for non-specific back pain — the everyday kind without a serious underlying condition. The aim is to ease muscle tension and pain so you can stay active, not to replace exercise, physiotherapy or medical treatment. Whether it helps, and how much, differs from person to person.',
    ],
    howWeTreat: [
      'We start by asking what the pain actually stops you doing, screening for warning signs that need a doctor, and checking how you move. Treatment usually combines acupuncture with manual techniques like Tuina and, where it fits, cupping for tight muscles.',
      'Most people come for a short course of sessions rather than one-off treatment, and we reassess as we go. We will also talk about staying active between sessions — inactivity tends to make back pain worse, not better.',
    ],
    evidence: 'Clinical guidelines and Cochrane reviews give a mixed but cautiously positive picture for chronic low-back pain: acupuncture may offer short-term relief for some people, while the evidence for acute back pain is weaker and part of the effect may be non-specific. We do not overstate this — it is a reasonable option to try, not a guaranteed fix.',
    redFlags: [
      'Back pain after a serious fall or accident',
      'Numbness, tingling or weakness in the legs, or loss of bladder or bowel control (seek urgent care)',
      'Unexplained weight loss, fever, or a history of cancer alongside new back pain',
      'Pain that is severe at night or steadily worsening rather than fluctuating',
    ],
    faqs: [
      { q: 'Does acupuncture work for back pain?', a: 'For some people with chronic lower-back pain it offers short-term relief; for others it does little. Reviews of the research are mixed and part of the benefit may be non-specific. It is reasonable to try as a complement to staying active — but we cannot promise it will work for you.' },
      { q: 'How many sessions will I need?', a: 'There is no fixed number. Many people start with a short course of about four to six sessions and we reassess whether it is helping. If you see no change after several treatments, we will say so honestly rather than keep going indefinitely.' },
      { q: 'Does it hurt?', a: 'The needles are very fine and most people feel only a small prick or a dull, heavy sensation. It is usually far more comfortable than the back pain itself. Tell your practitioner if anything feels sharp and they will adjust.' },
    ],
    related: ['neck-pain', 'migraine-headaches', 'stress-burnout'],
  },

  {
    slug: 'neck-pain',
    deSlug: 'nackenschmerzen',
    condition: 'Neck Pain',
    keyword: 'neck pain',
    summary: 'Easing mechanical neck and shoulder tension — and the headaches that follow.',
    lead: 'Neck and shoulder tension is a common reason people try acupuncture, especially with desk work. It is often used as a complementary approach — results vary, and it is not a cure.',
    intro: [
      'Neck pain often comes from sustained posture, stress and long hours at a screen, and frequently travels into the shoulders and up into tension headaches. Most cases are mechanical and not dangerous, though the stiffness can be stubborn and recurring.',
      'Acupuncture and TCM are commonly used as a complementary approach to ease muscular neck and shoulder tension and the headaches that can come with it. The goal is symptom relief and better movement, alongside — not instead of — addressing the underlying habits and any medical care you need.',
    ],
    howWeTreat: [
      'We look at where the tension actually sits, how your neck moves, and what is driving it day to day. Treatment typically combines acupuncture with Tuina massage and cupping for the upper back and shoulders, which many people find directly loosens tight muscles.',
      'Because posture and stress usually feed neck pain, we talk about practical changes between sessions — screen setup, breaks, movement. A short course works better than a single visit for most people.',
    ],
    evidence: 'Research on acupuncture for chronic neck pain is moderate and somewhat positive — several reviews suggest short-term relief for mechanical neck pain, though studies vary in quality and the effects are not dramatic. We treat it as a sensible option to trial, not a certainty.',
    redFlags: [
      'Neck pain after a significant accident or whiplash injury',
      'Numbness, pins and needles or weakness spreading into the arms or hands',
      'Severe headache, fever and a stiff neck together (seek urgent care)',
      'Dizziness, visual changes or unsteadiness alongside the neck pain',
    ],
    faqs: [
      { q: 'Can acupuncture help my desk-job neck pain?', a: 'Often, yes, as short-term relief — many people with mechanical neck and shoulder tension feel looser afterwards. It works best combined with changing what is causing it: screen height, breaks and movement. We are honest that it eases symptoms rather than fixing your posture for you.' },
      { q: 'Do you use massage too?', a: 'Usually. For neck and shoulder tension we often combine acupuncture with Tuina (Chinese therapeutic massage) and cupping of the upper back, which many people find directly releases tight muscles. The exact mix depends on what we find when we examine you.' },
      { q: 'How quickly will I notice a difference?', a: 'Some people feel looser after one or two sessions; others need a short course before anything shifts, and some do not respond at all. We reassess as we go and will not keep treating indefinitely if it is not helping you.' },
    ],
    related: ['back-pain', 'migraine-headaches', 'stress-burnout'],
  },

  {
    slug: 'migraine-headaches',
    deSlug: 'migraene',
    condition: 'Migraine & Headaches',
    keyword: 'migraine',
    summary: 'One of the better-studied uses: reducing how often migraines strike.',
    lead: 'Acupuncture is one of the better-studied uses in this area, often tried as a complementary approach to reduce how often migraines strike. It is not a cure, and results vary.',
    intro: [
      'Migraine is a neurological condition — typically a throbbing, often one-sided headache, sometimes with nausea, light sensitivity or aura — not just a bad headache. Tension-type headaches are different and usually feel like a tight band of pressure. The two can overlap.',
      'Acupuncture is most often used as a preventive, complementary approach for frequent migraines and tension headaches — aiming to reduce how often they happen, rather than to stop an attack in progress. It is used alongside, not instead of, the medication and specialist care many people need.',
    ],
    howWeTreat: [
      'We start by understanding your pattern — frequency, triggers, what you have already tried — and screen for headache features that need a doctor. Treatment is usually a course of acupuncture aimed at prevention, often combined with attention to sleep, stress and neck tension, which commonly feed headaches.',
      'We keep track of whether your headache frequency actually changes over the course, and we are realistic: this is about fewer or milder episodes for some people, not a guaranteed end to migraines.',
    ],
    evidence: 'This is one of the more favourable areas: Cochrane reviews have found acupuncture can reduce the frequency of episodic migraine and tension-type headache, with effects at least comparable to some preventive medications for some patients. Quality still varies and it does not work for everyone — but the evidence here is relatively encouraging.',
    redFlags: [
      "A sudden, severe 'worst-ever' headache that peaks within seconds to minutes (seek emergency care)",
      'Headache with fever, stiff neck, confusion, weakness, slurred speech or vision loss',
      'A clearly new or different headache pattern, especially after age 50',
      'Headache after a head injury, or one that steadily worsens day by day',
    ],
    faqs: [
      { q: 'Is acupuncture proven for migraines?', a: 'The evidence here is relatively good: reviews suggest it can reduce how often episodic migraines occur, sometimes comparably to preventive medication. That said, it does not help everyone and studies vary in quality. We use it as prevention alongside your medical care, not as a replacement for it.' },
      { q: 'Will it stop a migraine I already have?', a: 'We use acupuncture mainly to reduce how often migraines happen over time, not as a rescue treatment during an attack. For the acute attack itself, your prescribed medication is usually the right tool. The two approaches work alongside each other.' },
      { q: 'How long before I know if it is helping?', a: 'Prevention takes time. We would usually look across a course of several weeks and compare your headache frequency before and after, ideally with a simple diary. If there is no meaningful change, we will tell you honestly rather than continue indefinitely.' },
    ],
    related: ['neck-pain', 'sleep-problems', 'stress-burnout'],
  },

  {
    slug: 'sleep-problems',
    deSlug: 'schlafprobleme',
    condition: 'Sleep Problems',
    keyword: 'sleep problems',
    summary: 'A complementary approach for insomnia, alongside good sleep habits.',
    lead: 'Many people try acupuncture for poor sleep, usually as a complementary approach alongside good sleep habits. The evidence is limited and mixed, and it is not a cure for insomnia.',
    intro: [
      'Sleep problems cover trouble falling asleep, waking through the night, or waking too early and feeling unrested. They are often tied up with stress, pain or low mood, and short bouts are normal — it is persistent insomnia that wears people down.',
      'Acupuncture is commonly used as a complementary approach for insomnia, typically aiming to support relaxation and reduce the tension that keeps people wired at night. We are upfront that the evidence is limited, and it works best alongside good sleep habits rather than on its own.',
    ],
    howWeTreat: [
      'We start by understanding your sleep pattern and what is around it — stress, pain, screens, caffeine, shift work. Treatment is usually a course of acupuncture aimed at helping you wind down, and we will often address co-existing issues like neck tension or stress that disrupt sleep.',
      'We also talk through practical sleep habits, because acupuncture on top of poor routines rarely does much. For long-standing insomnia, structured approaches like CBT-I are the best-supported treatment and we will point you to them.',
    ],
    evidence: 'Evidence for acupuncture and insomnia is limited and of variable quality — some studies report improved sleep, but reviews caution that the research is weak and may overstate benefit. For chronic insomnia, cognitive behavioural therapy (CBT-I) has the strongest evidence; we see acupuncture as a possible complement, not a first-line cure.',
    redFlags: [
      'Loud snoring with gasping or pauses in breathing (possible sleep apnoea — see a doctor)',
      'Persistent insomnia alongside low mood, anxiety or hopelessness',
      'Daytime sleepiness severe enough to affect driving or work',
      'Sleep problems starting with a new medication or medical condition',
    ],
    faqs: [
      { q: 'Can acupuncture cure my insomnia?', a: 'No — we would not claim that. Evidence for acupuncture and sleep is limited and mixed. Some people find it helps them relax and sleep better as part of a wider approach; others notice little. For chronic insomnia, CBT-I is the best-supported treatment and worth asking about.' },
      { q: 'How does it help sleep?', a: 'The most likely route is by easing the physical and mental tension that keeps people alert at night, rather than acting like a sedative. That is also why it works better combined with good sleep habits than on its own. Effects vary a lot between individuals.' },
      { q: 'What else should I do?', a: 'Consistent wake times, limiting screens and caffeine late, and getting daylight and movement during the day all matter more than most people expect. For persistent insomnia, ask your doctor about CBT-I — it has the strongest evidence. We are happy to treat alongside these.' },
    ],
    related: ['stress-burnout', 'migraine-headaches', 'digestive-issues'],
  },

  {
    slug: 'stress-burnout',
    deSlug: 'stress-burnout',
    condition: 'Stress & Burnout',
    keyword: 'stress and burnout',
    summary: 'Calming, supportive care for stress — alongside, not instead of, proper help.',
    lead: 'Acupuncture is widely used as a complementary, calming approach for stress. It can be a helpful support, but it is not a treatment for clinical burnout or depression on its own.',
    intro: [
      'Stress is a normal response that becomes a problem when it does not switch off — leaving you tense, poorly rested, irritable or exhausted. Burnout, from chronic work stress, goes further: exhaustion, cynicism and feeling unable to cope. It overlaps with anxiety and depression, which are medical conditions.',
      'Acupuncture is commonly used as a complementary approach to help the body and mind down-shift from a constant state of tension. Many people find the sessions themselves calming. We are clear that it supports stress management rather than treating burnout, anxiety or depression, which need proper medical and psychological care.',
    ],
    howWeTreat: [
      'We start with what stress is actually doing to you — sleep, tension, headaches, gut, mood — and screen for signs that need medical or psychological support. Sessions are calm and unhurried; treatment often combines acupuncture with work on the physical knock-on effects like neck tension and poor sleep.',
      'We are honest about scope. Acupuncture can be a useful part of looking after yourself, but if you are burning out, the bigger levers are usually workload, recovery and sometimes therapy. We will encourage those alongside treatment, not instead of them.',
    ],
    evidence: 'Evidence is mixed: some trials suggest acupuncture may reduce stress and anxiety symptoms in the short term, but the studies are often small and prone to bias, and relaxation effects are hard to separate from the treatment itself. We position it as a supportive, low-risk option — not a substitute for therapy or medical care.',
    redFlags: [
      'Persistent low mood, loss of interest, or feeling hopeless for more than two weeks',
      'Panic attacks, or anxiety that stops you functioning day to day',
      'Any thoughts of harming yourself — seek help urgently (in Switzerland, call 143)',
      'Physical symptoms like chest pain or breathlessness that need medical assessment',
    ],
    faqs: [
      { q: 'Can acupuncture help with stress?', a: 'Many people find the sessions genuinely calming and use them as part of managing stress. The research is mixed and modest, so we present it as a low-risk support rather than a proven treatment. For burnout, anxiety or depression, it should not replace therapy or medical care.' },
      { q: 'Is this a treatment for burnout?', a: 'Not on its own. Acupuncture can help you feel calmer and ease physical knock-on effects like tension and poor sleep, but recovering from burnout usually needs changes to workload and recovery, and sometimes professional support. We will treat alongside those, and say so plainly.' },
      { q: 'What happens in a session?', a: 'It is calm and unhurried. We talk through how stress is affecting you, then use fine needles while you rest quietly, often for around 20 to 30 minutes. Many people find that time itself restful. We may also address related tension or sleep issues.' },
    ],
    related: ['sleep-problems', 'digestive-issues', 'neck-pain'],
  },

  {
    slug: 'digestive-issues',
    deSlug: 'verdauungsprobleme',
    condition: 'Digestive Issues',
    keyword: 'digestive issues',
    summary: 'Complementary support for functional gut symptoms like IBS, after a medical work-up.',
    lead: 'Acupuncture is often tried for functional gut complaints like IBS, usually as a complementary approach. The evidence is limited, and a medical work-up comes first to rule out other causes.',
    intro: [
      'Digestive issues here mean functional complaints — bloating, irregular bowels, cramping, nausea or IBS-type symptoms — where investigations do not show structural disease but the gut still misbehaves, often flaring with stress and diet.',
      'Acupuncture and TCM are commonly used as a complementary approach for these functional symptoms, frequently aiming at the gut–stress connection. Crucially, this is for symptoms a doctor has already assessed — acupuncture is not a way to investigate digestive problems, and persistent gut changes always need proper medical evaluation first.',
    ],
    howWeTreat: [
      'Assuming serious causes have been ruled out, we look at your pattern of symptoms, stress and diet. Treatment is usually a course of acupuncture, often alongside attention to stress and sleep, since these strongly influence functional gut symptoms for many people.',
      'We coordinate with, rather than replace, medical care and dietary approaches. For IBS in particular, dietary strategies and managing stress are central, and we treat as a complement to those.',
    ],
    evidence: 'Evidence is limited and inconsistent. For IBS, some reviews find acupuncture no better than sham, while others report symptom benefit; for nausea, the evidence (especially for certain points) is somewhat stronger. We are honest that this is an area where claims are often overstated, and we treat it cautiously.',
    redFlags: [
      'Blood in the stool, or black, tarry stools',
      'Unintended weight loss, or a persistent change in bowel habit over weeks',
      'Difficulty swallowing, repeated vomiting, or a lump in the abdomen',
      'Symptoms starting after age 50, or a family history of bowel cancer — see a doctor first',
    ],
    faqs: [
      { q: 'Can acupuncture help IBS?', a: 'Possibly, as part of a wider plan — but the evidence is mixed, with some studies showing no benefit over sham. We only treat functional gut symptoms a doctor has already assessed. For IBS, diet and stress management are central, and we work alongside them rather than replacing them.' },
      { q: 'Should I not see my doctor first?', a: 'You should. Persistent or new digestive symptoms need a proper medical work-up to rule out conditions that matter. Acupuncture is not a way to investigate gut problems. Once serious causes are excluded, it can be a reasonable complement for functional symptoms like bloating or IBS.' },
      { q: 'Does it help nausea?', a: 'The evidence for acupuncture and certain points in nausea is somewhat stronger than for other gut symptoms, and some people find it helpful. As always it varies between individuals, and we would use it alongside, not instead of, any medical treatment you have been given.' },
    ],
    related: ['stress-burnout', 'sleep-problems', 'menstrual-issues'],
  },

  {
    slug: 'menstrual-issues',
    deSlug: 'zyklusbeschwerden',
    condition: 'Menstrual & Cycle Issues',
    keyword: 'period pain',
    summary: 'Complementary relief for period pain and cycle complaints.',
    lead: 'Acupuncture is commonly used as a complementary approach for period pain and cycle complaints. The evidence is mixed, and persistent or severe symptoms should be assessed by a doctor first.',
    intro: [
      'Cycle issues here include painful periods (dysmenorrhoea), irregular cycles, PMS and cycle-related symptoms. Some are simply uncomfortable; others point to conditions like endometriosis, fibroids or PCOS that need medical diagnosis.',
      'Acupuncture and TCM are widely used as a complementary approach for period pain and PMS, generally aiming to ease cramping and the surrounding symptoms. We are clear this manages symptoms rather than treating any underlying gynaecological condition, and severe or worsening pain should always be checked medically.',
    ],
    howWeTreat: [
      'We start with your cycle pattern and what the symptoms stop you doing, and we check whether you have had a medical assessment for anything that needs it. Treatment is usually a course of acupuncture timed around your cycle, sometimes alongside work on stress and sleep.',
      'For something like suspected endometriosis or PCOS, we see acupuncture as possible symptom support only — diagnosis and treatment of the underlying condition belong with your doctor or gynaecologist, and we will say so.',
    ],
    evidence: 'For period pain (primary dysmenorrhoea), some reviews suggest acupuncture may reduce pain, though the evidence is low-to-moderate quality and not conclusive. For PMS and broader cycle issues it is weaker still. We present it as a reasonable, low-risk option to try for symptom relief, not an established treatment.',
    redFlags: [
      'Severe period pain that disrupts your life, or pain that is getting worse over time (possible endometriosis)',
      'Very heavy bleeding, bleeding between periods, or bleeding after sex',
      'Periods that suddenly stop or become very irregular, or possible pregnancy with pain',
      'Fever with pelvic pain — seek medical care',
    ],
    faqs: [
      { q: 'Can acupuncture help period pain?', a: 'Some studies suggest it may reduce period-pain intensity, though the evidence is low-to-moderate quality. Many people find it a reasonable, low-risk thing to try for symptom relief. It manages symptoms rather than treating any underlying cause, so persistent or severe pain still needs a medical check.' },
      { q: 'Could my symptoms be something more serious?', a: 'They can be. Severe or worsening period pain, very heavy or irregular bleeding, or bleeding between periods deserve a medical assessment — conditions like endometriosis, fibroids or PCOS need proper diagnosis. We treat symptoms alongside that, never as a substitute for gynaecological care.' },
      { q: 'When in my cycle should I come?', a: 'It varies. For period pain, many people have treatment in the run-up to their period as well as during it; we will usually plan a short course across a cycle or two and reassess. There is no single right schedule — we adapt to your pattern.' },
    ],
    related: ['fertility-support', 'digestive-issues', 'stress-burnout'],
  },

  {
    slug: 'fertility-support',
    deSlug: 'kinderwunsch',
    condition: 'Fertility Support',
    keyword: 'fertility',
    summary: 'Supportive care alongside fertility treatment — honestly, not a fertility cure.',
    lead: 'Acupuncture is popular as a complementary support during fertility treatment. The evidence is genuinely mixed and it does not reliably improve live-birth rates — we are careful not to overpromise.',
    intro: [
      'Fertility is complex and has many causes, in either or both partners. People often look to acupuncture while trying to conceive or during IVF/ICSI, hoping to support the process and manage the considerable stress involved.',
      'We use acupuncture strictly as a complementary support alongside proper fertility care — not as a fertility treatment in its own right. It may help with the stress and wellbeing side of a hard journey; what it cannot do is reliably change whether treatment succeeds, and we will not pretend otherwise.',
    ],
    howWeTreat: [
      'We work around your medical care and timeline, coordinating with whatever your fertility clinic is doing rather than cutting across it. Sessions often focus as much on managing the stress and emotional load of trying to conceive as on anything else, since that burden is real and frequently overlooked.',
      'We will always encourage proper medical investigation for both partners, because the biggest gains usually come from identifying and treating specific causes. Acupuncture sits alongside that as support.',
    ],
    evidence: 'The evidence is mixed and much-debated. Large reviews of acupuncture around IVF have generally not shown a reliable improvement in pregnancy or live-birth rates, though some find a possible benefit and stress reduction is plausible. We are deliberately cautious: we offer it as supportive care, not as something that improves your odds of a baby.',
    redFlags: [
      'If you have been trying to conceive for over a year (or six months if over 35), see a doctor for assessment',
      'Very irregular or absent periods, or known PCOS, endometriosis or thyroid issues',
      'Previous miscarriages, pelvic infections or surgery affecting fertility',
      'Do not delay specialist fertility care in favour of acupuncture — time matters',
    ],
    faqs: [
      { q: 'Does acupuncture improve IVF success?', a: 'The best current evidence does not show a reliable improvement in pregnancy or live-birth rates from acupuncture around IVF. Some studies hint at benefit and many people value the stress relief, but we will not claim it raises your chances. We offer it as supportive care alongside your fertility clinic.' },
      { q: 'Should I do this instead of seeing a fertility clinic?', a: 'No — and we would actively discourage that. Proper medical assessment of both partners is where the real progress comes from, and time matters, especially over 35. Use acupuncture as support around that care, never as a replacement for it.' },
      { q: 'How can it still be worth it?', a: 'Trying to conceive is stressful, and many people find regular acupuncture a calming, supportive space during a hard time. That wellbeing benefit can be valuable in itself. We are simply honest about what it is — support — rather than a way to improve your fertility odds.' },
    ],
    related: ['menstrual-issues', 'stress-burnout', 'sleep-problems'],
  },
];

// URL helpers (used by pages + the hreflang pair map in site.ts).
export const enConditionPath = (slug: string) => `/en/conditions/${slug}/`;
export const deConditionPath = (deSlug: string) => `/beschwerden/${deSlug}`;

// Lookup for cross-linking related conditions.
export const conditionBySlug = (slug: string): Condition | undefined =>
  conditions.find((c) => c.slug === slug);

// ── Shared images: SAME asset the DE Beschwerde page uses (SYMPTOMS[].img in
// public/index.html), keyed by EN slug. English alt for EN SEO/accessibility. ──
export const conditionImages: Record<string, { src: string; alt: string }> = {
  'back-pain':          { src: '/images/img-f7f113048735.webp', alt: 'Patient receiving acupuncture for back pain at a TCM.ch clinic' },
  'neck-pain':          { src: '/images/img-49abc5b4795f.webp', alt: 'Acupuncture and TCM treatment for neck and shoulder tension' },
  'migraine-headaches': { src: '/images/img-fce33d67fc98.webp', alt: 'Acupuncture treatment used for migraine and headaches' },
  'sleep-problems':     { src: '/images/img-a8a0f2e64199.webp', alt: 'Calm TCM treatment setting used for sleep problems' },
  'stress-burnout':     { src: '/images/img-778d4dd19d39.webp', alt: 'Relaxing acupuncture session for stress and burnout' },
  'digestive-issues':   { src: '/images/img-5db981915fc8.webp', alt: 'TCM treatment for functional digestive issues' },
  'menstrual-issues':   { src: '/images/img-c225ce95a903.webp', alt: 'Acupuncture used for menstrual and cycle complaints' },
  'fertility-support':  { src: '/images/img-9f85d23c07b4.webp', alt: 'Supportive TCM care during a fertility journey' },
};
