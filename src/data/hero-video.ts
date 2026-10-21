// Gemeinsames Hero-Video der Standortseiten (hwang.ch-Startseite, Original 1920x1080 aus den Webflow-Assets der
// Praxis Hwang; hier ohne Ton, 25 fps, 20.7 s). Ein Asset für alle Standorte, damit der Browser es zwischen den
// Klinikseiten cacht. Opt-in je Slug wie LSR_SLUGS in standort/Hero.astro; nur operative Standorte (nie planned/review):
// das Netzwerk-Footage darf keinen geplanten Standort als offen erscheinen lassen.
import type { Standort } from './standorte';

export const HERO_VIDEO_SLUGS = new Set([
  'st-gallen', 'basel', 'kreuzlingen', 'frauenfeld', 'rorschach', 'volketswil', 'wil', 'winterthur-marktgasse', 'zuerich-hoengg',
]);
export const heroVideo = (d: Pick<Standort, 'slug' | 'planned' | 'review'>) => HERO_VIDEO_SLUGS.has(d.slug) && !d.planned && !d.review;

/** Generische Bildwelt (kein Foto des jeweiligen Standorts): nie als Praxisfoto in «Über die Praxis» zeigen. */
export const isSymbolbild = (src: string) => /\/(hero-main\.webp|basel-reception\.webp)$/.test(src || '');

export const HERO_VIDEO_BASE = '/videos/hero-praxis/hwang-praxis';
