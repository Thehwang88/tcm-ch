// Site-wide config shared by the Astro EN shell.
export const site = {
  name: 'TCM.ch',
  url: 'https://tcm.ch',
  email: 'termine@tcm.ch',
  whatsapp: '41775236122',
  ogImage: 'https://tcm.ch/og-image.jpg',
  // Cloudflare Turnstile public sitekey (same as the DE SPA forms).
  turnstileSitekey: '0x4AAAAAADf8GZzWnvFzYvmx',
};

// The 12 TCM.ch clinics (id = DE SPA standort slug, label = display name).
export const standorte = [
  { id: 'zuerich-city', label: 'Zürich City' },
  { id: 'zuerich-hoengg', label: 'Zürich Höngg' },
  { id: 'zuerich-oerlikon', label: 'Zürich Oerlikon' },
  { id: 'winterthur-marktgasse', label: 'Winterthur Marktgasse' },
  { id: 'winterthur-muenzgasse', label: 'Winterthur Münzgasse' },
  { id: 'volketswil', label: 'Volketswil' },
  { id: 'frauenfeld', label: 'Frauenfeld' },
  { id: 'kreuzlingen', label: 'Kreuzlingen' },
  { id: 'st-gallen', label: 'St. Gallen' },
  { id: 'rorschach', label: 'Rorschach' },
  { id: 'wil', label: 'Wil' },
  { id: 'basel', label: 'Basel' },
];

// ── ONE shared route-pair map (DE path -> EN path). Used for hreflang on both
// systems and for the DE/EN language switcher. Extend as routes get ported.
export const PAIR_MAP: Record<string, string> = {
  '/': '/en/',
  '/kontakt': '/en/contact',
  '/krankenkassen/': '/en/health-insurance-acupuncture',
};

// Reverse lookup (EN -> DE) derived from PAIR_MAP.
export const PAIR_MAP_EN: Record<string, string> = Object.fromEntries(
  Object.entries(PAIR_MAP).map(([de, en]) => [en, de]),
);
