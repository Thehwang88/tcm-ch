// TCM.ch CARE (Sprint #1/#1B): EIN Event-Pattern und EINE Copy-Basis fuer alle
// Patienten-Cluster. Tracking nur via dataLayer (GTM ist kanonisch, kein
// gtag-Doppelversand); Parameter sind vordefinierte Metadaten, nie PII/Freitext.
export type CareContentType =
  | 'koerpersignal'
  | 'beschwerde'
  | 'patientenfrage'
  | 'was_jetzt'
  | 'wissen'
  | 'tcm_verstehen';

export const careClickJs = (contentType: CareContentType, pos: 'article' | 'sticky') =>
  `window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'hilfeerhalten_click',quelle:'${contentType}_care',content_type:'${contentType}',cta_position:'${pos}',source_path:location.pathname})`;

// Menschliches Gesicht von CARE (Sprint "Frag Yuna"). EINE Quelle fuer Name,
// Portrait und Default-Copy; CARE bleibt die Marke, Yuna ist der Kontakt.
// Portrait = bestehender, bereits sitewide genutzter Concierge-Avatar
// (256x256, ~3 KB) - kein neues Asset, keine neue Bildsprache.
export const CARE_PERSON = {
  name: 'Yuna',
  portrait: '/images/yuna-concierge.webp',
  portraitAlt: 'Yuna vom TCM.ch Care Team',
  heading: 'Frag Yuna.',
  body: 'Du bist dir unsicher, was als Nächstes sinnvoll ist? Über TCM.ch Care helfen wir dir kostenlos und unverbindlich, den passenden nächsten Schritt zu finden – ob ärztliche Abklärung, TCM, Physiotherapie oder eine andere Anlaufstelle sinnvoll ist.',
  eyebrowWithName: 'TCM.ch Care · Frag Yuna',
} as const;

export const CARE_TRUST = 'Kostenlos · unverbindlich · persönlich';
export const CARE_SAFETY =
  'Bei akuten oder schweren Beschwerden wende dich direkt an eine Ärztin oder einen Arzt – im Notfall an die 144.';
