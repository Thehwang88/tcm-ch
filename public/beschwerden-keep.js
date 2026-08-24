// ── SINGLE SOURCE OF TRUTH ──────────────────────────────────────────────────
// The only /beschwerden slugs that stay live (HTTP 200). Everything else is 410'd.
// Consumed by BOTH:
//   - the DE SPA index (browser): global `window.BESCHWERDEN_KEEP`, used by
//     renderBeschwerden() to show only these cards (no links to 410'd pages)
//   - functions/beschwerden/[[path]].js (Cloudflare): esbuild default-imports
//     this file to build the routing KEEP set
// Slugs MUST match the SPA SYMPTOMS[] ids exactly. Edit ONLY here.
// Assigned to globalThis so it works identically as a classic browser <script>
// (window.BESCHWERDEN_KEEP) and as an ESM side-effect import in the Cloudflare
// function (globalThis.BESCHWERDEN_KEEP). No export/module keywords on purpose.
globalThis.BESCHWERDEN_KEEP = [
  "rueckenschmerzen", "nackenschmerzen", "migraene", "kopfschmerzen",
  "knieschmerzen", "schulterschmerzen", "ischias", "arthrose",
  "sehnenscheidenentzuendung", "fibromyalgie",
  "kinderwunsch", "menstruationsbeschwerden", "pms", "wechseljahre", "schwangerschaftsbeschwerden",
  "stress-burnout", "burnout", "schlafstoerungen", "schlafprobleme", "angststoerungen", "erschoepfung",
  "heuschnupfen", "allergien-heuschnupfen", "verdauungsprobleme", "zyklusbeschwerden", "tinnitus", "gewichtsmanagement",
  "pcos",
  "reizdarm", "blasenentzuendung", "neurodermitis",
  "sinusitis", "sodbrennen", "haarausfall", "endometriose", "inkontinenz",
  "prostata", "akne", "schuppenflechte", "hoersturz", "asthma",
  "haemorrhoiden", "osteoporose", "depressionen", "hashimoto", "rheuma",
  "hitzewallungen", "schwindel", "immunschwaeche", "verstopfung", "kieferschmerzen",
  "guertelrose", "bandscheibenvorfall", "karpaltunnelsyndrom", "fersensporn",
  "polyneuropathie", "hexenschuss", "nesselsucht", "gicht",
  "morbus-crohn", "spinalkanalstenose", "trigeminusneuralgie", "hyperhidrose",
  "colitis-ulcerosa", "tennisarm", "cluster-kopfschmerzen", "fettleber", "restless-legs",
  "gastritis", "rosacea", "hueftschmerzen",
  "aphten", "raynaud-syndrom", "long-covid",
  "lippenherpes", "reizblase", "spannungskopfschmerzen",
  "uebelkeit", "augenmigraene", "bluthochdruck", "blaehungen", "durchblutungsstoerungen",
  "haemorrhoiden", "osteoporose", "depressionen", "hashimoto", "rheuma"
];
