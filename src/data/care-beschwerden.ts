// CARE-Adapter fuer den Beschwerden-Cluster (Sprint #1C).
// Die Beschwerden-Leaves sind captured HTML in der SpaPage-Welt (home.css,
// .btn-primary/.btn-secondary, Inline-Form via public/home.js). Die geteilten
// CARE-Komponenten (ArticleCta/TerminForm/StickyCta) sind LayoutDe-Komponenten
// und greifen hier stilistisch nicht. Dieser Adapter bleibt bewusst duenn:
// Copy/Tracking kommen zentral aus src/data/care.ts, Styles nutzen nur
// bestehende Tokens + bestehende Button-Klassen (keine neue Visual-Sprache,
// zentral reskinnbar), und er wird EINMAL im Template eingehaengt - nie in
// einzelnen Artikeln.
import { careClickJs, CARE_TRUST, CARE_SAFETY, CARE_PERSON } from './care';

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** CARE-Bridge-Sektion (vor der bestehenden Inline-Kontakt-Sektion eingefuegt).
 *  data-care-sticky markiert die Seite fuer die CARE-Variante der sitewide
 *  StickyCtaBar. Das Inline-Script pflegt nur die vordefinierte CTA-Position
 *  in das bestehende Formular - nie Nutzertext. */
export function careBeschwerdenHtml(topic: string): string {
  const onclick = careClickJs('beschwerde', 'article');
  return `<section class="section" data-care-sticky="beschwerde" style="padding:36px 0;background:var(--bg)"><div class="wrap reveal"><div style="background:var(--blue-light);border:1px solid rgba(45,155,111,.25);border-radius:16px;padding:24px;max-width:860px">`
    + `<div style="display:flex;align-items:center;gap:14px"><img src="${CARE_PERSON.portrait}" alt="${CARE_PERSON.portraitAlt}" width="56" height="56" loading="lazy" decoding="async" style="flex-shrink:0;width:56px;height:56px;border-radius:50%;object-fit:cover"><div>`
    + `<div style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--blue-dark);margin-bottom:6px">TCM.ch Care</div>`
    + `<div style="font-family:var(--font-sans);font-weight:800;font-size:20px;color:var(--black);margin-bottom:6px">${CARE_PERSON.heading}</div>`
    + `</div></div>`
    + `<p style="font-size:15.5px;color:var(--mid);line-height:1.55;margin:0 0 16px">${CARE_PERSON.body}</p>`
    + `<div style="display:flex;flex-wrap:wrap;gap:12px"><a class="btn-primary" href="#kontakt" data-care-cta="article" onclick="${onclick}">Anliegen schildern</a><a class="btn-secondary" href="/standorte/">Praxis finden</a></div>`
    + `<div style="font-size:13px;font-weight:600;color:var(--blue-dark);margin-top:14px">${CARE_TRUST}</div>`
    + `<div style="font-size:12.5px;color:var(--muted);line-height:1.5;margin-top:6px">${CARE_SAFETY}</div>`
    + `</div></div></section>`
    + `<script>(function(){if(window.__careCtaPos)return;window.__careCtaPos=1;document.addEventListener('click',function(e){var el=e.target&&e.target.closest?e.target.closest('[data-care-cta]'):null;if(!el)return;var pos=el.getAttribute('data-care-cta')||'';var h=document.querySelector('input[name="cta_pos"]');if(h)h.value=pos;var qd=document.querySelector('input[name="quelle_detail"]');if(qd){if(!qd.dataset.base)qd.dataset.base=qd.value;qd.value=qd.dataset.base+(pos?' · CTA: '+pos:'');}});})();</script>`;
}

/** Strukturierte Lead-Herkunft als hidden inputs im bestehenden Inline-Formular.
 *  public/home.js serialisiert alle benannten Felder in den /api/anfrage-Payload;
 *  das Backend kennt formular/quelle_detail bereits. Ueberlebt geloeschten
 *  Prefill-Text, haengt direkt an der von prefillForm() injizierten quelle. */
export function injectCareFormMeta(body: string, topic: string, path: string): string {
  return body.replace(
    /(<input type="hidden" name="quelle" value="[^"]*">)/,
    `$1<input type="hidden" name="formular" value="TCM.ch CARE – Beschwerde"><input type="hidden" name="quelle_detail" value="${esc(`Beschwerde: ${topic} · Seite: ${path}/`)}"><input type="hidden" name="cta_pos" value="">`,
  );
}
