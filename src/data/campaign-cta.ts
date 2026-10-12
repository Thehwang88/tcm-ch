// Kampagnen-Konfiguration für den schwebenden Geschenk-CTA (mobile Karte / Desktop-Pill), standortbezogen.
// Nur Standorte mit Eintrag und enabled=true erhalten einen Promotions-CTA; alle anderen Seiten behalten die
// reguläre Sticky-Bar (StickyCtaBar.astro) unverändert. Gerendert wird der CTA vom Standort-Hero (HeroLaunchSG),
// der auf der Kampagnenseite die reguläre Sticky-Bar ersetzt (scb-off), nie stapelt.
import { FIRST30, first30State } from './first30';
import { site } from './site';

export interface CampaignCta {
  locationId: string;
  campaignId: string;
  enabled: boolean;
  /** true solange die Edition echte Restkapazität hat (sonst Wartelisten-Variante). */
  available: boolean;
  eyebrow: string; main: string; secondary: string;
  desktopMain: string; desktopSub: string;
  /** Zielformular auf der Seite (Hero-Telefonfeld). */
  targetForm: string;
  /** Mobile: WhatsApp-Deeplink mit vorbereiteter Nachricht; Desktop: Scroll zum Formular. */
  mobile: 'whatsapp' | 'form'; desktop: 'form' | 'whatsapp';
  whatsappHref: string;
  whatsappMessage: string;
}

const WA_MESSAGE = 'Hallo TCM.ch! 🎁 Ich möchte gerne das FIRST 30 Vorweihnachtsgeschenk in St. Gallen anfragen (30 Minuten, CHF 0.–). Ist noch eines verfügbar? Vielen Dank!';
const WA_MESSAGE_WAITLIST = 'Hallo TCM.ch! 🎁 Ich möchte mich für die Warteliste des FIRST 30 Vorweihnachtsgeschenks in St. Gallen vormerken lassen (30 Minuten, CHF 0.–). Vielen Dank!';

export const campaignCtaFor = (locationId: string): CampaignCta | undefined => {
  if (locationId !== 'st-gallen') return undefined;
  const st = first30State();
  if (!st.showCampaign) return undefined;
  const msg = st.soldOut ? WA_MESSAGE_WAITLIST : WA_MESSAGE;
  return {
    locationId, campaignId: FIRST30.offers.first30.id, enabled: true, available: !st.soldOut,
    eyebrow: 'Exklusives Vorweihnachtsgeschenk',
    main: st.soldOut ? 'FIRST 30 Warteliste' : 'Dein FIRST 30 Geschenk',
    secondary: st.soldOut ? `Alle ${st.max} Geschenke vergeben` : '30 Min. · CHF 0.–',
    desktopMain: st.soldOut ? 'FIRST 30 Warteliste' : 'Dein FIRST 30 Geschenk',
    desktopSub: '30 Min · CHF 0.–',
    targetForm: '#offer-form',
    mobile: 'whatsapp', desktop: 'form',
    whatsappHref: `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`,
    whatsappMessage: msg,
  };
};
