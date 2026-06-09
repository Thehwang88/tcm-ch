// Catch-all prune for /beschwerden/* on Cloudflare Pages.
//
//   /beschwerden                         -> index, kept (falls through to SPA, 200)
//   /beschwerden/<slug>        (1 seg)   -> 410 unless <slug> is in KEEP
//   /beschwerden/<slug>/<...>  (2+ segs) -> ALWAYS 410 (no nested combo survives)
//
// KEEP is the only set of single-symptom pages that stay live. Slugs MUST match
// the SPA SYMPTOMS[] ids exactly (public/index.html). Keep this in sync with the
// /beschwerden entries left in public/sitemap.xml.

const KEEP = new Set([
  "rueckenschmerzen", "nackenschmerzen", "migraene", "kopfschmerzen",
  "knieschmerzen", "schulterschmerzen", "ischias", "arthrose",
  "sehnenscheidenentzuendung", "fibromyalgie",
  "kinderwunsch", "menstruationsbeschwerden", "pms", "wechseljahre", "schwangerschaftsbeschwerden",
  "stress-burnout", "burnout", "schlafstoerungen", "angststoerungen", "erschoepfung",
  "heuschnupfen", "allergien-heuschnupfen", "verdauungsprobleme", "tinnitus", "gewichtsmanagement",
]);

function gone() {
  return new Response(
    "<!doctype html><meta charset=utf-8><title>Seite entfernt</title><p>Diese Seite existiert nicht mehr.",
    { status: 410, headers: { "content-type": "text/html; charset=utf-8" } }
  );
}

export async function onRequest(context) {
  // params.path: undefined/'' for /beschwerden, string[] for deeper paths.
  const raw = context.params.path;
  const segments = Array.isArray(raw) ? raw : (raw ? [raw] : []);

  // /beschwerden index -> keep (SPA renders the symptom overview).
  if (segments.length === 0) return context.next();

  // Nested /beschwerden/<symptom>/<stadt>(/...) -> always gone, no exceptions.
  if (segments.length >= 2) return gone();

  // Single /beschwerden/<slug> -> keep only the curated set.
  const slug = decodeURIComponent(segments[0]).toLowerCase();
  return KEEP.has(slug) ? context.next() : gone();
}
