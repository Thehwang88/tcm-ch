// Client für moderierte Einreichungen (/community/). Sendet nur an /api/einreichung.
declare global { interface Window { turnstile?: { reset: (el?: Element) => void } } }
document.querySelectorAll<HTMLFormElement>('[data-pro-form]').forEach((form) => {
  const status = form.querySelector<HTMLElement>('.form-status')!;
  const label = form.querySelector<HTMLElement>('.btn-label');
  const show = (state: string, msg: string) => { status.hidden = false; status.dataset.state = state; status.textContent = msg; };
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if ((form.elements.namedItem('website') as HTMLInputElement)?.value) return;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    for (const g of form.querySelectorAll<HTMLElement>('[data-group][data-required]')) {
      if (!g.querySelector('input:checked')) { show('error', 'Bitte mindestens eine Option wählen.'); return; }
    }
    const token = (form.querySelector('[name="cf-turnstile-response"]') as HTMLInputElement | null)?.value || '';
    if (!token) { show('error', 'Bitte bestätige kurz, dass du kein Roboter bist.'); return; }
    const fd = new FormData(form);
    const felder: Record<string, string> = {};
    for (const [k, v] of fd.entries()) {
      if (['website', 'cf-turnstile-response', 'consent_publikation', 'consent_datenschutz'].includes(k)) continue;
      const val = String(v).trim();
      if (!val) continue;
      felder[k] = felder[k] ? `${felder[k]}, ${val}` : val;
    }
    const body = { typ: form.dataset.proForm, felder, consent_publikation: fd.has('consent_publikation'), consent_datenschutz: fd.has('consent_datenschutz'), seite: location.pathname, turnstileToken: token };
    if (label) { label.dataset.orig = label.textContent || ''; label.textContent = 'Wird gesendet…'; }
    try {
      const res = await fetch('/api/einreichung', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        form.reset();
        show('success', 'Danke. Deine Einreichung ist eingegangen und wird geprüft. Veröffentlicht wird erst nach Freigabe.');
        form.querySelectorAll<HTMLInputElement | HTMLButtonElement>('input,select,textarea,button').forEach((el) => { el.disabled = true; });
      } else {
        const map: Record<string, string> = { missing_fields: 'Bitte Name und E-Mail angeben.', missing_consent: 'Bitte beide Einwilligungen bestätigen.', turnstile_failed: 'Sicherheitsprüfung fehlgeschlagen. Bitte erneut versuchen.', too_long: 'Ein Feld ist zu lang.' };
        show('error', map[data?.error] || 'Einreichung konnte nicht gesendet werden. Bitte erneut versuchen.');
      }
    } catch { show('error', 'Verbindungsfehler. Bitte erneut versuchen.'); }
    finally {
      if (label?.dataset.orig) label.textContent = label.dataset.orig;
      try { window.turnstile?.reset(); } catch { /* noop */ }
    }
  });
});
export {};
