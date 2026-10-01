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

export const CARE_TRUST = 'Kostenlos · unverbindlich · persönlich';
export const CARE_SAFETY =
  'Bei akuten oder schweren Beschwerden wende dich direkt an eine Ärztin oder einen Arzt – im Notfall an die 144.';
