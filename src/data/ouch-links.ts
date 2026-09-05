// Dezente Rücklink-Zeile ins OUCH.-Magazin (ouch.tcm.ch): "AUS DEM MAGAZIN."-Eyebrow
// + Zeile mit Pfeil. Interne Subdomain — normale rel-Attribute, kein nofollow.
export const OUCH_MAG = 'https://ouch.tcm.ch';

export function ouchMagRow(href: string, label: string): string {
  return `<div class="ouch-mag-row" style="border-top:1px solid var(--border,#e6e6e6);padding-top:22px;margin-top:36px"><div style="font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#8a919c;margin-bottom:7px">Aus dem Magazin.</div><a href="${href}" style="display:inline-flex;align-items:center;gap:7px;font-size:15.5px;font-weight:600;color:var(--blue,#2D9B6F);text-decoration:none">${label}<span aria-hidden="true">→</span></a></div>`;
}
