// Netzwerkweite klinische Leitung (Inhaberbestätigung 12.10.2026): EINE Person, EIN Datensatz,
// gerendert auf allen DE- und EN-Standortseiten (data-driven, Legacy-Leaves, Luzern/Bern, EN).
// Bewusst NICHT über therapeuten[].standorte[]: dieses Array markiert lokal behandelnde
// Therapeut:innen (DE Team.astro, EN Practitioners.astro) und bleibt davon getrennt.
// Status-/Betreiber-Regeln (siehe clinicalLeadCopy): kein Behandlungs- oder Buchungsversprechen pro
// Standort, keine Eröffnung impliziert, keine fachliche Aufsicht über eigenständige Partnerpraxen.
// Kein eigenes Schema: das Person-Profil existiert bereits unter /team/<slug>/.
import { clinics, type ClinicStatus } from './locations';
import { getTherapeut, getPublicTherapistProfile, type PublicTherapeut } from './therapeuten';
import { locationContent } from './en/locations-content';

export const CLINICAL_LEAD_SLUG = 'seongsu-kim';

export const clinicalLead = (): PublicTherapeut => {
  const t = getTherapeut(CLINICAL_LEAD_SLUG);
  if (!t) throw new Error(`clinical-lead.ts: Profil ${CLINICAL_LEAD_SLUG} fehlt in therapeuten.ts`);
  return getPublicTherapistProfile(t);
};

export interface ClinicalLeadContext {
  id: string;
  name: string;
  status: ClinicStatus;
  /** Eigenständige Betreiberin/Partnerpraxis (clinic.betreiber oder EN partnerClinic). */
  operator?: string;
  /** Die Person ist an diesem Standort auch lokal behandelnd (therapeuten[].standorte[]). */
  treatsHere: boolean;
}

export const clinicalLeadContext = (id: string): ClinicalLeadContext | undefined => {
  const c = clinics.find((x) => x.id === id);
  if (!c) return undefined;
  const lead = getTherapeut(CLINICAL_LEAD_SLUG);
  return {
    id, name: c.name, status: c.status,
    operator: c.betreiber?.name ?? locationContent[id]?.partnerClinic,
    treatsHere: !!lead?.standorte?.includes(id),
  };
};

export interface ClinicalLeadCopy {
  label: string; name: string; role: string; text: string; note: string; cta: string; href: string;
  /** Kein Portrait, wenn die Person auf derselben Seite bereits als lokale Therapeut:in (Teamkarte) erscheint. */
  img?: { src: string; alt: string };
}

export const clinicalLeadCopy = (lang: 'de' | 'en', ctx: ClinicalLeadContext): ClinicalLeadCopy => {
  const p = clinicalLead();
  const localCard = ctx.treatsHere && ctx.status === 'operational';
  const img = !localCard && p.bild ? { src: p.bild, alt: lang === 'de' ? `${p.name}, Senior Clinical Lead TCM.ch` : `${p.name}, Senior Clinical Lead, TCM.ch` } : undefined;
  const base = { name: p.name, role: 'Senior Clinical Lead · TCM.ch', href: `/team/${p.slug}/`, img };
  if (lang === 'de') {
    const note = localCard
      ? `Behandelt in ${ctx.name} auch selbst; sein Profil steht oben im Team. Die netzwerkweite Rolle kommt dazu.`
      : ctx.status === 'review'
      ? `Hinweis zum TCM.ch Netzwerk: Der Betriebsstatus von ${ctx.name} ist in Prüfung. Hier ist kein Behandlungsteam vor Ort bestätigt; Termine mit ihm sind an diesem Standort nicht möglich.`
      : ctx.status === 'planned'
      ? `Hinweis zum TCM.ch Netzwerk: ${ctx.name} ist noch nicht eröffnet. Hier gibt es noch kein Behandlungsteam vor Ort; beschrieben ist die netzwerkweite klinische Leitung.`
      : ctx.operator
      ? `${ctx.operator} ist eine eigenständig geführte Partnerpraxis. Behandlung und fachliche Verantwortung vor Ort liegen beim Praxisteam; diese Rolle bezieht sich auf das TCM.ch Netzwerk.`
      : `Die Behandlung in ${ctx.name} übernimmt das Praxisteam vor Ort; seine Rolle gilt netzwerkweit.`;
    return {
      ...base,
      label: 'Klinische Leitung · TCM.ch Netzwerk',
      text: 'Seongsu Kim begleitet als Senior Clinical Lead die klinische Qualität und fachliche Weiterentwicklung unserer Standorte. Er bringt über 17 Jahre klinische Erfahrung in koreanischer Medizin und TCM mit.',
      note, cta: 'Profil ansehen',
    };
  }
  const note = localCard
    ? `Also treats patients in ${ctx.name} himself; his profile is listed with the practitioners above. The network-wide role comes on top of that.`
    : ctx.status === 'review'
    ? `TCM.ch network information: the operating status of ${ctx.name} is under review. No on-site clinical team is confirmed here, and appointments with him are not available at this location.`
    : ctx.status === 'planned'
    ? `TCM.ch network information: ${ctx.name} is not open yet. There is no on-site clinical team here; this describes network-wide clinical leadership.`
    : ctx.operator
    ? `${ctx.operator} is an independently run partner practice. Treatment and clinical responsibility on site rest with the practice team; this role refers to the TCM.ch network.`
    : `Treatment in ${ctx.name} is provided by the local practice team; his role is network-wide.`;
  return {
    ...base,
    label: 'Clinical lead · TCM.ch network',
    text: 'Seongsu Kim supports clinical quality and professional development across the TCM.ch network, bringing more than 17 years of clinical experience in Korean medicine and TCM.',
    note, cta: 'View profile (German)',
  };
};

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** DE-Block als HTML-String (data-driven Template, Legacy-Leaves, Luzern/Bern). Styles: .cl-lead* in public/home.css. */
export const clinicalLeadHtml = (id: string): string => {
  const ctx = clinicalLeadContext(id);
  if (!ctx) return '';
  const c = clinicalLeadCopy('de', ctx);
  return (
    `<section class="section cl-lead-sec" id="clinical-lead" data-clinical-lead="${ctx.status}" aria-labelledby="cl-lead-h"><div class="wrap">` +
    `<div class="cl-lead${c.img ? '' : ' cl-lead--noimg'}">` +
    (c.img ? `<div class="cl-lead-media"><img src="${c.img.src}" alt="${esc(c.img.alt)}" width="630" height="840" loading="lazy" decoding="async" class="cl-lead-img"></div>` : '') +
    `<div class="cl-lead-body"><h2 id="cl-lead-h" class="cl-lead-label">${esc(c.label)}</h2>` +
    `<div class="cl-lead-name">${esc(c.name)}</div><div class="cl-lead-role">${esc(c.role)}</div>` +
    `<p class="cl-lead-text">${esc(c.text)}</p><p class="cl-lead-note">${esc(c.note)}</p>` +
    `<a class="cl-lead-cta" href="${c.href}">${esc(c.cta)} <span aria-hidden="true">→</span></a>` +
    `</div></div></div></section>`
  );
};
