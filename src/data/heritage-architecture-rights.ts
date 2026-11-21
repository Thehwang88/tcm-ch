/**
 * Wonnam Temple architectural photography from the VM Space feature.
 * User confirmed permission for TCM.ch web use without on-page attribution (2026-11-21).
 * Images remain the work of the original photographer; permissions are not ownership.
 * VM Space feature: https://vmspace.com/eng/report/report_view.html?base_seq=MjkxMw==
 *
 * We currently reference verified original remote image URLs, not missing local files.
 * Prefer rehosting optimized copies under the licensed /images/heritage paths once
 * the approved source image files are available, to avoid third-party hotlink failures.
 */
export const architecturePhotoRightsConfirmed = true as boolean;
export const vmSpaceArticle = 'https://vmspace.com/eng/report/report_view.html?base_seq=MjkxMw==';

export const licensedArchitecturePhotos = {
  hanokAndModern: {
    intendedLocalSrc: '/images/heritage/wonnam-hanok-modern.webp',
    originalReferenceUrl: 'https://vmspace.com/ActiveFile/spacem.org/board_img/37390037465de96055f51a.jpg',
    alt: 'Historisches koreanisches Hanok und zeitgenössischer Glasbau des Wonnam-Tempels in Seoul',
    label: 'Seoul: Tradition und Moderne',
  },
  circleSanctuary: {
    intendedLocalSrc: '/images/heritage/wonnam-circle-sanctuary.webp',
    originalReferenceUrl: 'https://vmspace.com/ActiveFile/spacem.org/board_img/192787166865de95d141f9c.jpg',
    alt: 'Grosser kreisförmiger Ausschnitt im minimalistischen Innenraum des Wonnam-Tempels in Seoul',
    label: 'Kreis als Symbol der Kontinuität',
  },
  timberCorridor: {
    intendedLocalSrc: '/images/heritage/wonnam-timber-corridor.webp',
    originalReferenceUrl: 'https://vmspace.com/ActiveFile/spacem.org/board_img/63390240265de9635d2ddf.jpg',
    alt: 'Lichtdurchfluteter gebogener Innenraum mit Holzwand im Wonnam-Tempel',
    label: 'Licht, Ruhe und moderne Architektur',
  },
  contemporaryFacade: {
    intendedLocalSrc: '/images/heritage/wonnam-facade.webp',
    originalReferenceUrl: 'https://vmspace.com/ActiveFile/spacem.org/board_img/115279735165de96133d29e.jpg',
    alt: 'Moderne Glasfassade des Wonnam-Tempels, eingerahmt durch traditionelle Holztüren',
    label: 'Architektur im Wandel',
  },
} as const;
