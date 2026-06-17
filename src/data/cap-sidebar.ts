// Appends a "see all" link after the secondary sidebar list (Hilft bei /
// Passende Therapien). The list is visually capped to 5 rows via CSS on desktop
// only; on mobile/tablet the full list shows and the link is hidden. No-op if the
// container is absent.
function endOfDiv(html: string, i: number): number {
  const rx = /<div\b|<\/div>/g; rx.lastIndex = i; let d = 0; let m: RegExpExecArray | null;
  while ((m = rx.exec(html))) { if (m[0] === '</div>') { d--; if (d === 0) return m.index + 6; } else d++; }
  return -1;
}
export function appendSidebarAllLink(html: string, containerId: string, href: string, label: string): string {
  const open = html.indexOf(`<div id="${containerId}">`);
  if (open < 0) return html;
  const end = endOfDiv(html, open);
  if (end < 0) return html;
  const link = `<a href="${href}" class="sidebar-all-link">${label} →</a>`;
  return html.slice(0, end) + link + html.slice(end);
}
