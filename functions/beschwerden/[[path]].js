// Catch-all prune for /beschwerden/* on Cloudflare Pages.
//
//   /beschwerden                         -> index, kept (falls through to SPA, 200)
//   /beschwerden/<slug>        (1 seg)   -> 410 unless <slug> is in KEEP
//   /beschwerden/<slug>/<...>  (2+ segs) -> ALWAYS 410 (no nested combo survives)
//
// KEEP is the only set of single-symptom pages that stay live. The slug list is
// the single source of truth in public/beschwerden-keep.js, shared with the SPA
// index (renderBeschwerden) so both never diverge. Slugs MUST match the SPA
// SYMPTOMS[] ids and the /beschwerden entries in public/sitemap.xml.
import "../../public/beschwerden-keep.js";

const KEEP = new Set(globalThis.BESCHWERDEN_KEEP);

// Alte Slugs aus der Vor-Migrations-Site, die Google noch kennt und die heute eine
// inhaltlich passende Seite haben. 301 statt 410, damit die Signale übernommen werden
// statt verloren zu gehen. Ziel MUSS in KEEP stehen, sonst läuft der Redirect ins 410.
const ALIAS = {
  "sodbrennen-reflux": "sodbrennen",
  "blaehbauch": "blaehungen",
  "energiemangel-fatigue": "erschoepfung",
  "naechtliches-schwitzen": "hitzewallungen",
  "geschmacks-geruchsstoerungen": "long-covid",
};

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

  // Alter Slug mit heutigem Pendant -> 301 auf die Seite, die den Inhalt trägt.
  const alias = ALIAS[slug];
  if (alias) {
    return Response.redirect(
      new URL("/beschwerden/" + alias + "/", context.request.url).href,
      301
    );
  }

  return KEEP.has(slug) ? context.next() : gone();
}
