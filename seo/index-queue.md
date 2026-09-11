# Index-Queue

URLs, für die in der Search Console eine Indexierung beantragt werden soll.

Warum diese Datei: Eine frisch deployte Seite taucht in den GSC-Berichten
("Gefunden – zurzeit nicht indexiert" etc.) erst nach Tagen auf. Bis dahin ist sie für
eine reine GSC-Auswertung unsichtbar. Deshalb wird jede neu gebaute Seite hier
eingetragen, sobald sie live ist.

Regeln:
- Eine URL pro Zeile, absolut, mit abschliessendem Slash.
- Neue Seiten kommen unter "Offen" — direkt beim Deploy, nicht später.
- Die tägliche Aufgabe "tcm.ch — Indexierung beantragen" (09:00) arbeitet die Liste ab,
  bis zu 10 URLs pro Tag (GSC-Tageskontingent), und verschiebt Erledigtes nach unten.
- Ist "Offen" leer, füllt die Aufgabe den Rest des Kontingents aus den GSC-Berichten auf.
- Nicht eintragen: Seiten mit `noindex`, und Seiten, die per Canonical auf eine andere
  URL konsolidieren (aktuell https://tcm.ch/haut/rosacea/).

## Offen

- https://tcm.ch/gesundheitsbibliothek/fragen/
- https://tcm.ch/gesundheitsbibliothek/fragen/erster-termin/
- https://tcm.ch/gesundheitsbibliothek/fragen/nach-der-behandlung/
- https://tcm.ch/gesundheitsbibliothek/fragen/sicherheit-nebenwirkungen/
- https://tcm.ch/gesundheitsbibliothek/fragen/kosten-versicherung/
- https://tcm.ch/gesundheitsbibliothek/fragen/akupunktur/
- https://tcm.ch/gesundheitsbibliothek/fragen/schroepfen-methoden/
- https://tcm.ch/gesundheitsbibliothek/fragen/tut-akupunktur-weh/
- https://tcm.ch/gesundheitsbibliothek/fragen/muedigkeit-nach-akupunktur/
- https://tcm.ch/gesundheitsbibliothek/fragen/blaue-flecken-nach-akupunktur/
- https://tcm.ch/gesundheitsbibliothek/fragen/akupunktur-blutverduenner/
- https://tcm.ch/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/
- https://tcm.ch/gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/
- https://tcm.ch/wissen/erkaeltung-im-anflug/
- https://tcm.ch/wissen/erkaeltung-grippe-allergie/
- https://tcm.ch/wissen/kopfschmerzen-wetterumschwung/
- https://tcm.ch/wissen/muedigkeit-im-herbst/
- https://tcm.ch/wissen/heizungsluft-trockene-schleimhaeute/
- https://tcm.ch/koerpersignale/trockener-husten/
- https://tcm.ch/koerpersignale/verstopfte-nase-ohne-erkaeltung/
- https://tcm.ch/koerpersignale/stinkende-blaehungen/
- https://tcm.ch/koerpersignale/durchfall-am-morgen/
- https://tcm.ch/koerpersignale/kalte-haende-trotz-waerme/
- https://tcm.ch/koerpersignale/schnarchen-jede-nacht/
- https://tcm.ch/koerpersignale/juckreiz-nachts-ohne-ausschlag/
- https://tcm.ch/koerpersignale/haeufiger-harndrang-nachts/
- https://tcm.ch/koerpersignale/ploetzlicher-harndrang-ohne-volle-blase/
- https://tcm.ch/koerpersignale/druckgefuehl-im-unterbauch/
- https://tcm.ch/koerpersignale/bauch-fuehlt-sich-hart-an/
- https://tcm.ch/koerpersignale/magendruck-im-liegen/
- https://tcm.ch/koerpersignale/kribbeln-vom-nacken-in-den-arm/
- https://tcm.ch/koerpersignale/kopfdruck-beim-buecken/
- https://tcm.ch/koerpersignale/herzstolpern-in-ruhe/
- https://tcm.ch/gesundheitsbibliothek/koerper/becken-blase/
- https://tcm.ch/koerpersignale/arm-schlaeft-nachts-ein/
- https://tcm.ch/koerpersignale/voellegefuehl-nach-dem-essen/
- https://tcm.ch/koerpersignale/blaehbauch-am-abend/
- https://tcm.ch/koerpersignale/nacken-morgens-steif/
- https://tcm.ch/koerpersignale/herzklopfen-im-liegen/
- https://tcm.ch/koerpersignale/augenflimmern/
- https://tcm.ch/koerpersignale/zehen-kribbeln/
- https://tcm.ch/koerpersignale/schwindel-beim-buecken/
- https://tcm.ch/beschwerden/kalkschulter/
- https://tcm.ch/beschwerden/achillessehnenentzuendung/
- https://tcm.ch/gesundheitsbibliothek/untersuchungen/nervenleitmessung/
- https://tcm.ch/gesundheitsbibliothek/
- https://tcm.ch/gesundheitsbibliothek/koerper/ruecken/
- https://tcm.ch/gesundheitsbibliothek/koerper/hals-nacken/
- https://tcm.ch/gesundheitsbibliothek/koerper/schulter-arm-hand/
- https://tcm.ch/gesundheitsbibliothek/koerper/kopf/
- https://tcm.ch/gesundheitsbibliothek/koerper/huefte-bein-fuss/
- https://tcm.ch/gesundheitsbibliothek/koerper/bauch-verdauung/
- https://tcm.ch/gesundheitsbibliothek/koerper/schlaf-nervensystem/
- https://tcm.ch/gesundheitsbibliothek/koerper/zyklus-hormone/
- https://tcm.ch/koerpersignale/nacken-knackt-beim-drehen/
- https://tcm.ch/koerpersignale/knie-knackt-ohne-schmerzen/
- https://tcm.ch/koerpersignale/ohr-knackt-beim-schlucken/
- https://tcm.ch/koerpersignale/trockener-mund-nachts/
- https://tcm.ch/koerpersignale/bitterer-geschmack-morgens/
- https://tcm.ch/koerpersignale/schwere-beine-abends/
- https://tcm.ch/koerpersignale/brennende-fuesse-nachts/
- https://tcm.ch/koerpersignale/ein-fuss-kaelter-als-der-andere/
- https://tcm.ch/koerpersignale/rueckenschmerzen-beim-langen-stehen/
- https://tcm.ch/koerpersignale/druck-im-kopf-ohne-kopfschmerzen/
- https://tcm.ch/koerpersignale/immer-zur-gleichen-uhrzeit-aufwachen/
- https://tcm.ch/koerpersignale/nachtschweiss-ohne-fieber/
- https://tcm.ch/koerpersignale/rueckenschmerzen-beim-husten/
- https://tcm.ch/koerpersignale/bein-wird-beim-sitzen-taub/
- https://tcm.ch/koerpersignale/finger-morgens-steif/
- https://tcm.ch/koerpersignale/hand-kribbelt-beim-velofahren/
- https://tcm.ch/koerpersignale/
- https://tcm.ch/koerpersignale/schwindel-beim-umdrehen-im-bett/
- https://tcm.ch/koerpersignale/herzschlag-im-ohr/
- https://tcm.ch/koerpersignale/schwindel-beim-aufstehen/
- https://tcm.ch/koerpersignale/finger-schlafen-ein/
- https://tcm.ch/koerpersignale/einzelne-finger-taub/
- https://tcm.ch/koerpersignale/kalte-haende-einseitig/
- https://tcm.ch/koerpersignale/klossgefuehl-im-hals/
- https://tcm.ch/koerpersignale/staendiger-raeusperzwang/
- https://tcm.ch/koerpersignale/zungenbrennen/
- https://tcm.ch/koerpersignale/hitzegefuehl-ohne-fieber/
- https://tcm.ch/koerpersignale/starkes-schwitzen-ohne-sport/
- https://tcm.ch/koerpersignale/wadenkraempfe-nachts/
- https://tcm.ch/standorte/zuerich/kosten/
- https://tcm.ch/beschwerden/hallux-valgus/
- https://tcm.ch/beschwerden/isg-blockade/
- https://tcm.ch/beschwerden/rhizarthrose/
- https://tcm.ch/beschwerden/nervenschmerzen/
- https://tcm.ch/beschwerden/lymphoedem/
- https://tcm.ch/wissen/dry-needling-vs-akupunktur/
- https://tcm.ch/wissen/faszien-verklebt-was-hilft/
- https://tcm.ch/wissen/akupressurmatte-was-bringt-sie/
- https://tcm.ch/wissen/triggerpunkte-verstehen-loesen/
- https://tcm.ch/wissen/schroepfen-wirkung-flecken/
- https://tcm.ch/wissen/burnout-symptome-erkennen/
- https://tcm.ch/wissen/schmerzen-unterer-ruecken/
- https://tcm.ch/wissen/hexenschuss-was-tun/
- https://tcm.ch/wissen/was-hilft-gegen-kopfschmerzen/
- https://tcm.ch/wissen/akupunktur-geburtsvorbereitung-beckenendlage/
- https://tcm.ch/standorte/luzern/
- https://tcm.ch/akupunktur-tcm-basel/
- https://tcm.ch/standorte/basel/kosten/
- https://tcm.ch/wissen/akupunktur-bei-kopfschmerzen/
- https://tcm.ch/wissen/akupunktur-zum-abnehmen/
- https://tcm.ch/therapien/ohrakupunktur/
- https://tcm.ch/therapien/gua-sha/gesichts-gua-sha/
- https://tcm.ch/krankenkassen/massage/
- https://tcm.ch/krankenkassen/akupunktur/
- https://tcm.ch/krankenkassen/shiatsu/
- https://tcm.ch/massage-zuerich/
- https://tcm.ch/massage-st-gallen/
- https://tcm.ch/therapien/massage/bindegewebsmassage/
- https://tcm.ch/therapien/massage/triggerpunktmassage/
- https://tcm.ch/therapien/massage/lymphdrainage/
- https://tcm.ch/therapien/massage/sportmassage/
- https://tcm.ch/therapien/massage/medizinische-massage/
- https://tcm.ch/therapien/massage/fussreflexzonenmassage/
- https://tcm.ch/therapien/massage/schwangerschaftsmassage/
- https://tcm.ch/therapien/massage/klassische-massage/
- https://tcm.ch/therapien/massage/deep-tissue-massage/

## Geplant (noch nicht live)

(zurzeit leer — die Welle-3-Körpersignale sind deployt und stehen unter "Offen")

## Erledigt

- https://tcm.ch/beschwerden/rotatorenmanschette/ — 10.09.2026 (manuell)
- https://tcm.ch/beschwerden/wadenschmerzen/ — 10.09.2026 (manuell)
- https://tcm.ch/beschwerden/sprunggelenkschmerzen/ — 10.09.2026 (manuell)
- https://tcm.ch/beschwerden/schwere-beine/ — 10.09.2026 (manuell)
- https://tcm.ch/koerpersignale/augenlid-zuckt/ — 10.09.2026
- https://tcm.ch/koerpersignale/ohr-einseitig-verstopft/ — 10.09.2026
- https://tcm.ch/haut/microneedling/ — 02.09.2026
- https://tcm.ch/haut/retinol/ — 02.09.2026
- https://tcm.ch/haut/niacinamid/ — 02.09.2026
- https://tcm.ch/haut/salicylsaeure/ — 02.09.2026
- https://tcm.ch/haut/hydrafacial/ — 02.09.2026
- https://tcm.ch/haut/centella/ — 02.09.2026
- https://tcm.ch/haut/melasma/ — 02.09.2026
- https://tcm.ch/haut/profhilo/ — 02.09.2026
- https://tcm.ch/haut/couperose/ — 02.09.2026
