// /qr/<id>-google-review-qr.png — Download des QR-Codes (1024 px, schwarz/weiss, Ruhezone 4).
// Beim Build lokal erzeugt; nur fuer Standorte mit verifiziertem reviewUrl (sonst keine Datei).
import type { APIRoute } from 'astro';
import QRCode from 'qrcode';
import { REVIEW_LOCATIONS, QR_OPTIONS } from '../../data/google-reviews';

export function getStaticPaths() {
  return REVIEW_LOCATIONS.filter((l) => !!l.reviewUrl).map((l) => ({ params: { id: l.id }, props: { url: l.reviewUrl } }));
}

export const GET: APIRoute = async ({ props }) => {
  const png = await QRCode.toBuffer(props.url as string, { type: 'png', width: 1024, ...QR_OPTIONS });
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
