// Hero-Video der Standortseiten: Poster = Standbild des ersten Video-Frames (kein Standortfoto mehr im Hero). Nach `npm run build`:
//   node scripts/test-hero-video.mjs [dist] [--baseline <dist-von-main>] [--shots docs/qa/hero-video-poster]
//  1. Markup (alle 9 Video-Standorte): Poster-<img> = <video poster> = Video-Standbild, kein /images/-Foto in der Figure,
//     4 Renditionen, muted/playsinline/loop/preload=none; Nicht-Video-Seiten unverändert; Praxisfotos bleiben in «Über die Praxis».
//  2. Poster-Dateien: 1280×720 / 640×360, klein, und pixelnah am ersten Frame der echten Renditionen (ffmpeg + sharp).
//  3. Browser (Chromium, 320/375/390/1280/1440): Stufen initial → vor Wiedergabe → erster bewegter Frame → Wiedergabe;
//     keine schwarzen/weissen Übergänge, Poster ≈ erster Frame (Pixelvergleich), Geometrie konstant (auch gegen Baseline),
//     Reduced-Motion- und Save-Data-Fallback (Poster bleibt, Video spielt nie), LCP-Element/-Zeit gegen Baseline.
// Grenzen: lokaler Server (Range-Requests), Chromium ohne H.264 → es spielt die WebM-Rendition (wie Firefox/Chrome mit VP9);
// mp4-Pfad nur statisch geprüft. Schriften: System-Fallback.
import puppeteer from 'puppeteer'; import http from 'http'; import fs from 'fs'; import path from 'path'; import { execFileSync } from 'child_process';
import sharp from 'sharp';
const args = process.argv.slice(2); const dist = args.find((a) => !a.startsWith('--')) || 'dist';
const baseline = args.includes('--baseline') ? args[args.indexOf('--baseline') + 1] : '';
const shots = args.includes('--shots') ? args[args.indexOf('--shots') + 1] : '';
if (shots) fs.mkdirSync(shots, { recursive: true });
let fails = 0, pass = 0; const ok = (c, m) => { if (c) { pass++; console.log('  ✓ ' + m); } else { fails++; console.log('  ✗ ' + m); } };
const POSTER = '/videos/hero-praxis/hwang-praxis-poster-1280.webp', POSTER_M = '/videos/hero-praxis/hwang-praxis-poster-640.webp';
const VIDEO_SLUGS = ['st-gallen', 'basel', 'kreuzlingen', 'frauenfeld', 'rorschach', 'volketswil', 'wil', 'winterthur-marktgasse', 'zuerich-hoengg'];
const NO_VIDEO = ['zuerich-oerlikon', 'luzern', 'bern', 'winterthur-muenzgasse', 'bottighofen'];
const read = (d, u) => fs.readFileSync(path.join(d, u, 'index.html'), 'utf8');

console.log('1. Markup');
for (const s of VIDEO_SLUGS) {
  const h = read(dist, '/standorte/' + s);
  const figs = h.match(/<figure class="lsr-right lsr-right--video"[^>]*data-hero-video[^>]*>[\s\S]*?<\/figure>/g) || [];
  const fig = figs[0] || '';
  const img = (fig.match(/<img\b[^>]*>/g) || []), v = (fig.match(/<video\b[^>]*>/) || [''])[0];
  ok(figs.length === 1 && img.length === 1 && new RegExp(`src="${POSTER}" srcset="${POSTER_M} 640w, ${POSTER} 1280w"`).test(img[0]) && /loading="eager"/.test(img[0]) && /fetchpriority="high"/.test(img[0]) && /data-hero-poster/.test(img[0]) && /width="1280" height="720"/.test(img[0]), `${s}: Poster-<img> = Video-Standbild (640/1280 srcset, eager, fetchpriority high, 1280×720)`);
  ok(new RegExp(`poster="${POSTER}"`).test(v) && /\bmuted\b/.test(v) && /\bplaysinline\b/.test(v) && /\bloop\b/.test(v) && /preload="none"/.test(v) && !/\bautoplay\b/.test(v) && !/\bcontrols\b/.test(v), `${s}: <video poster> = dasselbe Standbild, muted/playsinline/loop/preload=none, ohne autoplay/controls`);
  ok(!/\/images\//.test(fig) && !/<figcaption/.test(fig) && (fig.match(/<source /g) || []).length === 4 && /hwang-praxis-640\.webm[^>]*media="\(max-width:900px\)"/.test(fig) && /hwang-praxis-1280\.mp4/.test(fig), `${s}: kein Standortfoto in der Hero-Figure, 4 Renditionen erhalten, keine Caption`);
}
{ const sg = read(dist, '/standorte/st-gallen'); const ue = sg.slice(sg.indexOf('Über die Praxis'));
  ok((sg.match(/standort-stgallen(?:-800)?\.webp/g) || []).length >= 1 && /standort-stgallen/.test(ue), 'st-gallen: Praxisfoto bleibt in «Über die Praxis»'); }
for (const s of NO_VIDEO) {
  const f = path.join(dist, 'standorte', s, 'index.html'); if (!fs.existsSync(f)) continue;
  const h = fs.readFileSync(f, 'utf8');
  ok(!/data-hero-video/.test(h) && !/hwang-praxis/.test(h), `${s}: kein Video, kein Video-Poster (Nicht-Video-Seite unverändert)`);
}
if (baseline) for (const s of NO_VIDEO.concat(['zuerich-city'])) {
  const a = path.join(dist, 'standorte', s, 'index.html'), b = path.join(baseline, 'standorte', s, 'index.html'); if (!fs.existsSync(a) || !fs.existsSync(b)) continue;
  // Astro inlined/verlinkt Komponenten-CSS je nach Chunk-Grösse unterschiedlich (inlineStylesheets auto): Style-Blöcke und
  // Stylesheet-Links ausklammern, verglichen wird der Seiteninhalt.
  const strip = (x) => x.replace(/<style>[\s\S]*?<\/style>/g, '').replace(/<link rel="stylesheet"[^>]*>/g, '').replace(/_astro\/[^"']+/g, '').replace(/<lastmod>[^<]*<\/lastmod>/g, '');
  ok(strip(fs.readFileSync(a, 'utf8')) === strip(fs.readFileSync(b, 'utf8')), `${s}: HTML identisch zur Baseline`);
}

console.log('2. Poster-Dateien');
const pf = (p) => path.join(dist, p.slice(1));
for (const [p, w, h, max] of [[POSTER, 1280, 720, 60000], [POSTER_M, 640, 360, 25000]]) {
  const m = await sharp(pf(p)).metadata(); const sz = fs.statSync(pf(p)).size;
  ok(m.width === w && m.height === h && m.format === 'webp' && sz <= max, `${p}: ${m.width}×${m.height} webp, ${sz} B (≤ ${max})`);
}
const tmp = fs.mkdtempSync('/tmp/hero-frame-'); const diff = async (a, b) => { const A = await sharp(a).resize(320, 180).greyscale().raw().toBuffer(), B = await sharp(b).resize(320, 180).greyscale().raw().toBuffer(); let d = 0; for (let i = 0; i < A.length; i++) d += Math.abs(A[i] - B[i]); return d / A.length; };
for (const r of ['1280.webm', '1280.mp4', '640.webm', '640.mp4']) {
  const out = path.join(tmp, r + '.png'); execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', '0', '-i', path.join(dist, 'videos/hero-praxis/hwang-praxis-' + r), '-frames:v', '1', out]);
  const d = await diff(out, pf(r.startsWith('640') ? POSTER_M : POSTER));
  ok(d < 6, `Poster ≈ erster Frame der Rendition ${r} (mittlere Pixeldifferenz ${d.toFixed(2)}/255)`);
}

console.log('3. Browser');
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.webm': 'video/webm', '.mp4': 'video/mp4' };
const serve = (root) => { const srv = http.createServer((q, s) => { let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html'; const f = path.join(root, p); if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { s.statusCode = 404; return s.end(); }
  const size = fs.statSync(f).size, m = /^bytes=(\d*)-(\d*)$/.exec(q.headers.range || ''); s.setHeader('content-type', MIME[path.extname(f)] || 'application/octet-stream'); s.setHeader('accept-ranges', 'bytes');
  if (m) { const a = m[1] ? +m[1] : 0, b = m[2] ? Math.min(+m[2], size - 1) : size - 1; s.statusCode = 206; s.setHeader('content-range', `bytes ${a}-${b}/${size}`); s.setHeader('content-length', b - a + 1); return fs.createReadStream(f, { start: a, end: b }).pipe(s); }
  s.setHeader('content-length', size); fs.createReadStream(f).pipe(s); }); return new Promise((r) => srv.listen(0, '127.0.0.1', () => r({ srv, origin: 'http://127.0.0.1:' + srv.address().port }))); };
const { srv, origin } = await serve(dist);
const base = baseline ? await serve(baseline) : null;
const br = await puppeteer.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium', headless: true, args: ['--no-sandbox', '--no-proxy-server', '--autoplay-policy=no-user-gesture-required'] });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// Ersten bewegten Frame im Moment von «playing» per Canvas abgreifen (vor allen Seitenskripten installiert: Desktop startet direkt nach load).
const FIRST_SNIP = `window.__first=null;addEventListener('DOMContentLoaded',function(){var v=document.querySelector('[data-hero-video] video');if(!v)return;var snap=function(){try{var c=document.createElement('canvas');c.width=320;c.height=180;c.getContext('2d').drawImage(v,0,0,320,180);window.__first={t:v.currentTime,png:c.toDataURL('image/png')};}catch(e){window.__first={err:String(e)};}};v.addEventListener('playing',function(){if(v.requestVideoFrameCallback)v.requestVideoFrameCallback(snap);else requestAnimationFrame(function(){requestAnimationFrame(snap);});},{once:true});});`;
const LCP_SNIP = FIRST_SNIP + `window.__lcp=[];try{new PerformanceObserver((l)=>{for(const e of l.getEntries())window.__lcp.push({t:Math.round(e.startTime),url:e.url||'',tag:e.element?e.element.tagName:'',cls:e.element?String(e.element.className):''});}).observe({type:'largest-contentful-paint',buffered:true});}catch(e){}`;
async function page(o, u, { width, reduced = false, saveData = false, wait = 'load' } = {}) {
  const pg = await br.newPage(); await pg.evaluateOnNewDocument(LCP_SNIP);
  if (saveData) await pg.evaluateOnNewDocument(`Object.defineProperty(navigator,'connection',{get:()=>({saveData:true,effectiveType:'4g'})})`);
  if (reduced) await pg.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await pg.setRequestInterception(true); pg.on('request', (r) => (r.url().startsWith(o) ? r.continue() : r.abort()));
  await pg.setViewport({ width, height: width < 500 ? 844 : 900, isMobile: width < 500, hasTouch: width < 500 });
  await pg.goto(o + u, { waitUntil: wait }); return pg;
}
const figState = (pg) => pg.evaluate(() => { const f = document.querySelector('[data-hero-video]'), v = f.querySelector('video'), i = f.querySelector('img'), r = f.getBoundingClientRect();
  return { rect: [Math.round(r.left), Math.round(r.top + scrollY), Math.round(r.width), Math.round(r.height)], playing: f.classList.contains('is-playing'), paused: v.paused, t: v.currentTime, ready: v.readyState, src: v.currentSrc, vOp: getComputedStyle(v).opacity, vDisp: getComputedStyle(v).display, muted: v.muted, loop: v.loop, pi: v.playsInline, preload: v.preload, imgSrc: i.currentSrc || i.src, imgPos: getComputedStyle(i).objectPosition, vPos: getComputedStyle(v).objectPosition, imgVis: i.getBoundingClientRect().width > 0 }; });
// Ausschnitt immer aus der aktuellen Viewport-Lage der Figure (nach Scrolls exakt, keine Verschiebung durch Smooth-Scroll).
const clipShot = async (pg, _rect, file) => { const r = await pg.evaluate(() => { const b = document.querySelector('[data-hero-video]').getBoundingClientRect(); return { x: b.left + scrollX, y: b.top + scrollY, width: b.width, height: b.height }; }); const buf = await pg.screenshot({ clip: r, captureBeyondViewport: true }); if (file && shots) fs.writeFileSync(path.join(shots, file), buf); return buf; };
const stats = async (buf) => { const { data } = await sharp(buf).greyscale().raw().toBuffer({ resolveWithObject: true }); let s = 0; for (const x of data) s += x; const mean = s / data.length; return mean; };
const bufDiff = async (a, b) => { const A = await sharp(a).resize(160, 90).greyscale().raw().toBuffer(), B = await sharp(b).resize(160, 90).greyscale().raw().toBuffer(); let d = 0; for (let i = 0; i < A.length; i++) d += Math.abs(A[i] - B[i]); return d / A.length; };
const waitPlaying = async (pg) => { try { await pg.waitForFunction(() => document.querySelector('[data-hero-video]').classList.contains('is-playing'), { timeout: 10000 }); return true; } catch (e) { return false; } };
const lcp = (pg) => pg.evaluate(() => (window.__lcp || []).slice(-1)[0] || null);
const geom = {};
for (const [slug, widths] of [['st-gallen', [320, 375, 390, 1280, 1440]], ['basel', [390, 1280]], ['zuerich-hoengg', [375, 1440]]]) {
  for (const w of widths) {
    const u = `/standorte/${slug}/`, tag = `${slug}-${w}`;
    // A: initial (DOM geparst, vor load) · B: vor Wiedergabe (nach load, Video pausiert, unsichtbar)
    const pg = await page(origin, u, { width: w, wait: 'domcontentloaded' });
    const A = await figState(pg); const shotA = await clipShot(pg, A.rect, `${tag}-A-initial.png`); const mA = await stats(shotA);
    await pg.evaluate(() => new Promise((r) => (document.readyState === 'complete' ? r() : addEventListener('load', r, { once: true })))); await sleep(150);
    const B = await figState(pg); const shotB = await clipShot(pg, B.rect, `${tag}-B-vor-wiedergabe.png`); const mB = await stats(shotB);
    ok(A.imgSrc.includes('hwang-praxis-poster') && B.imgSrc.includes('hwang-praxis-poster') && !A.imgSrc.includes('/images/') && A.imgVis, `${tag}: Poster-Bild von Anfang an sichtbar (${A.imgSrc.split('/').pop()}), kein Standortfoto`);
    ok(mA > 40 && mA < 215 && mB > 40 && mB < 215 && (w >= 500 || (await bufDiff(shotA, shotB)) < 3), `${tag}: initial und nach load kein Schwarz/Weiss${w < 500 ? ', Poster unverändert' : ' (Desktop: Video darf nach load bereits laufen)'} (Helligkeit ${mA.toFixed(0)}/${mB.toFixed(0)})`);
    // Desktop: Figure voll im Viewport → Start direkt nach load (Stufe B kann dort schon laufen); Mobil: erst nach dem ersten Scroll.
    ok(A.vOp === '0' && A.rect.join() === B.rect.join() && (w < 500 ? B.paused && B.vOp === '0' : true), `${tag}: Video vor dem ersten Frame unsichtbar (opacity 0)${w < 500 ? ', mobil ohne Scroll pausiert' : ''}, Geometrie unverändert ${B.rect[2]}×${B.rect[3]}`);
    ok(B.imgPos === B.vPos, `${tag}: Bild und Video mit identischem Fokus (${B.imgPos})`);
    // C: erster bewegter Frame (mobil: erster Scroll armiert den Start) · D: Wiedergabe
    // Erster bewegter Frame: Video-Frame im Moment von «playing» per Canvas abgreifen (unabhängig vom CSS-Fade) und direkt
    // danach die Komposition fotografieren (Fade läuft, darf weder dunkel noch hell kippen).
    // Mobil: erster Scroll armiert den Start; die Figure muss im Viewport liegen (mit aktivem Kampagnen-Banner liegt sie unter dem Fold).
    if (w < 500) { await pg.evaluate(() => { scrollTo(0, 1); document.querySelector('[data-hero-video]').scrollIntoView({ block: 'center', behavior: 'instant' }); }); await sleep(300); }
    const played = await waitPlaying(pg);
    const C0 = await figState(pg); const shotC0 = await clipShot(pg, C0.rect, null); const mC0 = await stats(shotC0);
    const first = await pg.evaluate(() => window.__first);
    const firstPng = first && first.png ? Buffer.from(first.png.split(',')[1], 'base64') : null;
    const dFirst = firstPng ? await bufDiff(firstPng, fs.readFileSync(pf(w <= 900 ? POSTER_M : POSTER))) : 99;
    await sleep(400); // Opacity-Übergang .25s
    const C = await figState(pg); const shotC = await clipShot(pg, C.rect, `${tag}-C-erster-frame.png`); const mC = await stats(shotC);
    ok(played && C.vOp === '1' && C.rect.join() === A.rect.join(), `${tag}: Video eingeblendet (is-playing, opacity 1), Geometrie unverändert`);
    // Toleranz wächst mit der Zeit des ersten präsentierten Frames (Kameraschwenk ≈ 40/255 pro Sekunde); ein schwarzer Frame (≈ 99) fällt immer durch.
    ok(firstPng && first.t < 0.5 && dFirst < 6 + first.t * 40, `${tag}: erster bewegter Video-Frame ≈ Poster (Pixeldifferenz ${dFirst.toFixed(1)}/255 bei t=${first && first.t != null ? first.t.toFixed(2) : '–'}s)`);
    // Komposition darf nie schwarz/weiss kippen; die Bildgleichheit Poster ↔ erster Frame prüft die Canvas-Messung oben (fixe Leisten können den Ausschnitt mobil leicht aufhellen).
    ok(mC0 > 40 && mC0 < 215 && mC > 40 && mC < 215, `${tag}: Übergang ohne Schwarz/Weiss-Kippen (Helligkeit Poster ${mA.toFixed(0)} → Start ${mC0.toFixed(0)} → eingeblendet ${mC.toFixed(0)})`);
    await sleep(1500);
    const D = await figState(pg); const shotD = await clipShot(pg, D.rect, `${tag}-D-wiedergabe.png`); const mD = await stats(shotD);
    ok(!D.paused && D.t > 0.5 && D.muted && D.loop && D.pi && D.preload === 'none' && D.src.endsWith(w <= 900 ? 'hwang-praxis-640.webm' : 'hwang-praxis-1280.webm') && mD > 30, `${tag}: läuft (t=${D.t.toFixed(1)}s), muted/loop/playsinline, Rendition ${D.src.split('/').pop()}`);
    const L = await lcp(pg); geom[tag] = { rect: A.rect, lcp: L };
    ok(L && (L.url.includes('hwang-praxis-poster') || (w < 500 && L.tag !== 'VIDEO')), `${tag}: LCP = ${L ? (L.url ? L.url.split('/').pop() : L.tag + '.' + L.cls.slice(0, 20)) : '–'} (${L ? L.t : '–'} ms), nie das Video`);
    await pg.close();
    if (base && slug === 'st-gallen') {
      const pb = await page(base.origin, u, { width: w, wait: 'load' }); await sleep(300);
      const Bb = await figState(pb); const Lb = await lcp(pb);
      ok(Bb.rect.join() === A.rect.join(), `${tag}: Hero-Geometrie identisch zur Baseline (${Bb.rect[2]}×${Bb.rect[3]})`);
      ok(!L || !Lb || L.t <= Lb.t * 1.5 + 250, `${tag}: LCP ${L ? L.t : '–'} ms vs. Baseline ${Lb ? Lb.t : '–'} ms (${Lb && Lb.url ? Lb.url.split('/').pop() : Lb ? Lb.tag : '–'})`);
      await pb.close();
    }
  }
}
console.log('4. Fallbacks');
for (const [label, opt] of [['prefers-reduced-motion', { reduced: true }], ['Save-Data', { saveData: true }]]) {
  for (const w of [390, 1280]) {
    const pg = await page(origin, '/standorte/st-gallen/', { width: w, ...opt }); await pg.evaluate(() => scrollTo(0, 1)); await sleep(2500);
    const S = await figState(pg); const shot = await clipShot(pg, S.rect, `st-gallen-${w}-${label === 'Save-Data' ? 'savedata' : 'reduced-motion'}.png`); const m = await stats(shot);
    ok(S.paused && !S.playing && S.imgVis && S.imgSrc.includes('hwang-praxis-poster') && m > 40 && (label === 'Save-Data' || S.vDisp === 'none') && (S.ready === 0 || S.t === 0), `${label} ${w}px: Video spielt nicht (${label === 'Save-Data' ? 'keine Wiedergabe' : 'display none'}), Poster bleibt stehen, keine Videodaten geladen`);
    await pg.close();
  }
}
await br.close(); srv.close(); if (base) base.srv.close(); fs.rmSync(tmp, { recursive: true, force: true });
console.log(`\n${pass} bestanden, ${fails} fehlgeschlagen`);
process.exit(fails ? 1 : 0);
