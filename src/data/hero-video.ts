// Gemeinsames Hero-Video der Standortseiten (hwang.ch-Startseite, Original 1920x1080 aus den Webflow-Assets der
// Praxis Hwang; hier ohne Ton, 25 fps, 20.7 s). Ein Asset für alle Standorte, damit der Browser es zwischen den
// Klinikseiten cacht. Opt-in je Slug wie LSR_SLUGS in standort/Hero.astro; nur operative Standorte (nie planned/review):
// das Netzwerk-Footage darf keinen geplanten Standort als offen erscheinen lassen.
// Einzige Ausnahme: /standorte/zuerich-city/ (keine Standort-Daten, bindet HeroMedia direkt ein; Inhaber-Freigabe 30.10.2026).
import type { Standort } from './standorte';

export const HERO_VIDEO_SLUGS = new Set([
  'st-gallen', 'basel', 'kreuzlingen', 'frauenfeld', 'rorschach', 'volketswil', 'wil', 'winterthur-marktgasse', 'zuerich-hoengg',
]);
export const heroVideo = (d: Pick<Standort, 'slug' | 'planned' | 'review'>) => HERO_VIDEO_SLUGS.has(d.slug) && !d.planned && !d.review;

/** Generische Bildwelt (kein Foto des jeweiligen Standorts): nie als Praxisfoto in «Über die Praxis» zeigen. */
export const isSymbolbild = (src: string) => /\/(hero-main\.webp|basel-reception\.webp)$/.test(src || '');

export const HERO_VIDEO_BASE = '/videos/hero-praxis/hwang-praxis';
/** Poster = Standbild des ERSTEN Frames des Videos (ffmpeg -ss 0, identisch in allen Renditionen): Fallback-<img> (LCP) und
 *  <video poster>, damit der Übergang Poster → bewegtes Bild nahtlos ist (kein Wechsel vom Standortfoto). Standortfotos bleiben
 *  in «Über die Praxis». Erzeugt mit sharp aus dem 1280er-Frame (1280×720 q82, 640×360 q80). */
export const HERO_VIDEO_POSTER = {
  src: `${HERO_VIDEO_BASE}-poster-1280.webp`,
  srcset: `${HERO_VIDEO_BASE}-poster-640.webp 640w, ${HERO_VIDEO_BASE}-poster-1280.webp 1280w`,
  width: 1280, height: 720,
  alt: 'Symbolbild: Behandlung in einer TCM.ch Praxis (Standbild aus dem Praxisvideo)',
} as const;
