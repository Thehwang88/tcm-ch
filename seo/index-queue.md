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
- NICHT einreichbar (14.09.2026 geprueft): https://tcm.ch/gesundheitsbibliothek/perspektiven/
  hat ein noindex-Tag — GSC lehnt die Anfrage ab ("Durch 'noindex'-Tag ausgeschlossen").
  Erst nach Entfernen des noindex wieder unter "Offen" eintragen.

## Offen

- https://tcm.ch/koerpersignale/kalte-fuesse/
- https://tcm.ch/koerpersignale/kribbeln-im-koerper/
- https://tcm.ch/koerpersignale/metallischer-geschmack-im-mund/
- https://tcm.ch/koerpersignale/druck-auf-den-ohren/
- https://tcm.ch/koerpersignale/kribbeln-im-kopf/
- https://tcm.ch/koerpersignale/zittern-am-ganzen-koerper/
- https://tcm.ch/gesundheitsbibliothek/befunde-werte/leberwerte-erhoeht/
- https://tcm.ch/gesundheitsbibliothek/befunde-werte/ferritin-zu-niedrig/
- https://tcm.ch/gesundheitsbibliothek/befunde-werte/blutdruck-140-90/
- https://tcm.ch/gesundheitsbibliothek/befunde-werte/blutzucker-erhoeht/

- https://tcm.ch/koerpersignale/kribbeln-im-gesicht/
- https://tcm.ch/koerpersignale/schwindel-nach-dem-essen/
- https://tcm.ch/koerpersignale/druck-im-oberbauch/
- https://tcm.ch/koerpersignale/kribbeln-an-der-lippe/
- https://tcm.ch/koerpersignale/beine-kribbeln-nachts/
- https://tcm.ch/koerpersignale/druck-hinter-den-augen/
- https://tcm.ch/koerpersignale/fuss-schlaeft-staendig-ein/
- https://tcm.ch/gesundheitsbibliothek/befunde-werte/tsh-erhoeht/
- https://tcm.ch/gesundheitsbibliothek/befunde-werte/cholesterin-erhoeht/
- https://tcm.ch/gesundheitsbibliothek/befunde-werte/

- https://tcm.ch/team/simon-stueve/
- https://tcm.ch/team/yuna-stueve/
- https://tcm.ch/team/ken-uehara/
- https://tcm.ch/team/markus-muschal/
- https://tcm.ch/team/johann-stueve/
- https://tcm.ch/team/janine-schmieder/
- https://tcm.ch/team/emanuela-pelican/
- https://tcm.ch/team/jiun-lee/
- https://tcm.ch/team/michele-seiler/
- https://tcm.ch/team/kristen-lambertin/
- https://tcm.ch/team/leon-brandon-mueller/
- https://tcm.ch/team/corinna-reinhart/
- https://tcm.ch/team/natalia-goc/
- https://tcm.ch/team/seongsu-kim/
- https://tcm.ch/team/brenda-oviedo/
- https://tcm.ch/therapien/akupunktur/verfahren/
- https://tcm.ch/therapien/akupunktur/schaedelakupunktur/
- https://tcm.ch/therapien/akupunktur/ynsa/
- https://tcm.ch/therapien/akupunktur/bauchakupunktur/
- https://tcm.ch/therapien/akupunktur/laserakupunktur/
- https://tcm.ch/gesundheitsbibliothek/tcm-verstehen/
- https://tcm.ch/gesundheitsbibliothek/tcm-verstehen/methoden/
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
Stand 20.09.2026: Kontingent ist wieder verfuegbar — erste erfolgreiche Einreichungen seit 16.09.
Die Kandidatenliste vom 18.09. ist vollstaendig abgearbeitet (2 eingereicht, 3 waren bereits
indexiert, 3 sind 404). Neue Kandidaten gibt es derzeit nicht: "Gefunden - zurzeit nicht indexiert"
enthaelt fuer tcm.ch nur noch ouch.tcm.ch plus die bereits abgearbeiteten URLs; "Gecrawlt - zurzeit
nicht indexiert" ist veraltet (alle geprueften Seiten sind inzwischen indexiert). physio.ch hat
0 Seiten in beiden Berichten.

KONFLIKT WEITERHIN UNGEKLAERT (seit 16.09.): Die Datei sagt, ouch.tcm.ch sei als Subdomain in
sc-domain:tcm.ch einreichbar; der Aufgaben-Prompt sagt "ouch.tcm.ch gehoert nicht zu diesem
Projekt - nicht einreichen". Die Laeufe vom 16.09., 19.09. und 20.09. haben sie uebersprungen.
Bitte entscheiden und entweder hier loeschen oder den Prompt anpassen.

- https://ouch.tcm.ch/business/
- https://ouch.tcm.ch/insights/holistiq-konkurs-analyse/
- https://ouch.tcm.ch/insights/oyu-zuerich-analyse/
- https://ouch.tcm.ch/insights/placebo-artikel-akupunktur/
- https://ouch.tcm.ch/insights/punk-wellness-tcm-bars/
- https://ouch.tcm.ch/seoul/k-beauty/
- https://ouch.tcm.ch/seoul/reise/


## Offen (physio.ch — eigene GSC-Property)

Andere Domain: nicht in der Property sc-domain:tcm.ch einreichbar — physio.ch-Property öffnen.
ACHTUNG: Das GSC-Tageskontingent gilt pro Google-Konto, NICHT pro Property.
tcm.ch und physio.ch teilen sich also dieselben Anfragen pro Tag (Stand 13.09.2026 erneut verifiziert:
nach 11 Einreichungen ueber beide Properties kam "Kontingent ueberschritten").

Stand 20.09.2026: Kontingent nach 8 Einreichungen (2 tcm.ch + 6 physio.ch) erschoepft.
Folgende URLs sind live und noch nicht indexiert — naechster Lauf zuerst abarbeiten:

- https://physio.ch/ratgeber/belastung-funktion/
- https://physio.ch/ratgeber/treppensteigen-nach-knie-op/
- https://physio.ch/ratgeber/kruecken-nach-knie-op/
- https://physio.ch/ratgeber/muskelaufbau-nach-knie-op/
- https://physio.ch/ratgeber/rollator-richtig-einstellen/
- https://physio.ch/ratgeber/gehtraining-nach-schlaganfall/


## Geplant (noch nicht live)

Stichprobe am 10.09.2026: 404. Diese URLs gehören NICHT unter "Offen", sonst
verbrennt die 09:00-Aufgabe Tageskontingent auf nicht existierende Seiten.
Beim Deploy nach "Offen" verschieben — und gleichzeitig in KS_LINKS in
src/data/koerpersignale-links.ts eintragen, sonst haben sie dasselbe
"Verweisende Seite: nicht gefunden"-Problem wie die ersten 20 Leaves.

- https://tcm.ch/koerpersignale/knie-knackt-ohne-schmerzen/
- https://tcm.ch/koerpersignale/ohr-knackt-beim-schlucken/
- https://tcm.ch/koerpersignale/trockener-mund-nachts/
- https://tcm.ch/koerpersignale/bitterer-geschmack-morgens/
- https://tcm.ch/koerpersignale/schwere-beine-abends/
- https://tcm.ch/koerpersignale/brennende-fuesse-nachts/
- https://tcm.ch/koerpersignale/ein-fuss-kaelter-als-der-andere/
- https://tcm.ch/koerpersignale/rueckenschmerzen-beim-langen-stehen/
- https://tcm.ch/koerpersignale/druck-im-kopf-ohne-kopfschmerzen/

- https://tcm.ch/wissen/erkaeltung-im-anflug/
- https://tcm.ch/wissen/erkaeltung-grippe-allergie/
- https://tcm.ch/wissen/kopfschmerzen-wetterumschwung/
- https://tcm.ch/wissen/muedigkeit-im-herbst/
- https://tcm.ch/wissen/heizungsluft-trockene-schleimhaeute/
- https://tcm.ch/koerpersignale/trockener-husten/
- https://tcm.ch/koerpersignale/verstopfte-nase-ohne-erkaeltung/

## Erledigt

- https://tcm.ch/standorte/zuerich-bellevue/ — 20.09.2026 (manuell)
- https://tcm.ch/koerpersignale/herzklopfen-nach-dem-essen/ — 17.09.2026 (manuell)
- https://tcm.ch/gesundheitsbibliothek/befunde-werte/crp-erhoeht/ — 17.09.2026 (manuell)
- https://tcm.ch/gesundheitsbibliothek/befunde-werte/leukozyten-erhoeht/ — 17.09.2026 (manuell)
- https://physio.ch/ratgeber/physiotherapie-nach-spitalaustritt/ — 20.09.2026 (physio.ch-Property)
- https://physio.ch/ratgeber/nach-op-reha/ — 20.09.2026 (physio.ch-Property)
- https://physio.ch/ratgeber/alltag-mobilitaet/ — 20.09.2026 (physio.ch-Property)
- https://physio.ch/ratgeber/uebungen-wiederaufbau/ — 20.09.2026 (physio.ch-Property)
- https://physio.ch/ratgeber/neurologische-reha/ — 20.09.2026 (physio.ch-Property)
- https://physio.ch/ratgeber/alter-pflege-angehoerige/ — 20.09.2026 (physio.ch-Property)
- https://physio.ch/ratgeber/physio-verstehen/ — 20.09.2026 (physio.ch-Property)
- https://physio.ch/ratgeber/nach-hueft-knie-op/ — 20.09.2026 (physio.ch-Property, bereits indexiert)
- https://physio.ch/en/ — 20.09.2026 (physio.ch-Property, bereits indexiert)
- https://physio.ch/en/physiotherapy-at-home/ — 20.09.2026 (physio.ch-Property, bereits indexiert)
- https://physio.ch/ratgeber/ — 20.09.2026 (physio.ch-Property, bereits indexiert)
- https://physio.ch/einzugsgebiet/uster/ — 20.09.2026 (physio.ch-Property, bereits indexiert)
- https://physio.ch/einzugsgebiet/buelach/ — 20.09.2026 (physio.ch-Property, bereits indexiert)
- https://physio.ch/einzugsgebiet/waedenswil/ — 20.09.2026 (physio.ch-Property, bereits indexiert)
- https://physio.ch/einzugsgebiet/winterthur/ — 20.09.2026 (physio.ch-Property, bereits indexiert)
- https://physio.ch/physiotherapie-in-der-naehe/ — 20.09.2026 (physio.ch-Property, bereits indexiert)
- https://physio.ch/leistungen/post-op-rehabilitation/ — 20.09.2026 (physio.ch-Property, bereits indexiert)
- https://physio.ch/ratgeber/verordnung/ — 20.09.2026 (physio.ch-Property, bereits indexiert)
- https://physio.ch/ratgeber/kosten-krankenkasse/ — 20.09.2026 (physio.ch-Property, bereits indexiert)
- https://tcm.ch/haut/couperose/ — 20.09.2026
- https://tcm.ch/haut/pigmentflecken/ — 20.09.2026
- https://tcm.ch/koerpersignale/augenflimmern/ — 20.09.2026 (war bereits indexiert)
- https://tcm.ch/koerpersignale/herzstolpern-in-ruhe/ — 20.09.2026 (war bereits indexiert)
- https://tcm.ch/koerpersignale/nacken-knackt-beim-drehen/ — 20.09.2026 (war bereits indexiert)
- https://tcm.ch/koerpersignale/trockener-husten/ — 20.09.2026 (war bereits indexiert)
- https://tcm.ch/beschwerden/achillessehnenentzuendung/ — 20.09.2026 (404, Seite existiert nicht; GSC-Anfrage abgelehnt)
- https://tcm.ch/beschwerden/kalkschulter/ — 20.09.2026 (404, Seite existiert nicht — nicht eingereicht)
- https://tcm.ch/haut/profhilo/ — 16.09.2026
- https://tcm.ch/wissen/tcm-naturheilpraktiker-schweiz/ — 16.09.2026
- https://tcm.ch/akupunktur-st-gallen-kosten/ — 16.09.2026 (war bereits indexiert)
- https://tcm.ch/standorte/luzern/kosten/ — 16.09.2026 (war bereits indexiert)
- https://tcm.ch/therapien/akupunktur/schwangerschaft/ — 16.09.2026 (war bereits indexiert)
- https://tcm.ch/therapien/physiotherapie/dry-needling/ — 16.09.2026 (war bereits indexiert)
- https://tcm.ch/therapien/physiotherapie/manuelle-therapie/ — 16.09.2026 (war bereits indexiert)
- https://tcm.ch/wissen/akupunktur-schlafprobleme/ — 16.09.2026 (war bereits indexiert)
- https://tcm.ch/massage-oerlikon/ — 16.09.2026 (war bereits indexiert)
- https://physio.ch/ratgeber/domizil-oder-praxis/ — 16.09.2026 (physio.ch-Property, bereits indexiert)
- https://physio.ch/ratgeber/parkinson-zu-hause/ — 16.09.2026 (physio.ch-Property, bereits indexiert)
- https://physio.ch/ratgeber/physiotherapie-nach-schlaganfall/ — 16.09.2026 (physio.ch-Property, bereits indexiert)

- https://tcm.ch/haut/peeling/ — 15.09.2026
- https://tcm.ch/haut/pigmentflecken/ — 15.09.2026
- https://tcm.ch/haut/polynukleotide/ — 15.09.2026
- https://tcm.ch/haut/rejuran-pdrn/ — 15.09.2026
- https://tcm.ch/haut/skin-booster/ — 15.09.2026
- https://tcm.ch/haut/ultherapy-hifu/ — 15.09.2026
- https://tcm.ch/therapien/hanbang/ — 15.09.2026
- https://tcm.ch/en/knowledge/ — 15.09.2026
- https://tcm.ch/haut/sonnencreme-gesicht/ — 15.09.2026 (war bereits indexiert)
- https://tcm.ch/haut/unreine-haut/ — 15.09.2026 (war bereits indexiert)
- https://tcm.ch/haut/vitamin-c-serum/ — 15.09.2026 (war bereits indexiert)
- https://tcm.ch/beschwerden/asthma/ — 15.09.2026 (war bereits indexiert)
- https://tcm.ch/beschwerden/pms/ — 15.09.2026 (war bereits indexiert)
- https://tcm.ch/beschwerden/zaehneknirschen/ — 15.09.2026 (war bereits indexiert)
- https://tcm.ch/wissen/pcos-akupunktur-tcm/ — 15.09.2026 (war bereits indexiert)
- https://tcm.ch/wissen/tcm-stress-burnout/ — 15.09.2026 (war bereits indexiert)
- https://tcm.ch/wissen/was-bringt-shiatsu-wirkung-ablauf-kosten/ — 15.09.2026 (war bereits indexiert)

- https://tcm.ch/haut/ampoule/ — 14.09.2026
- https://tcm.ch/haut/fruchtsaeurepeeling/ — 14.09.2026
- https://tcm.ch/haut/gesichtsbehandlung/ — 14.09.2026
- https://tcm.ch/haut/gesichtsyoga/ — 14.09.2026
- https://tcm.ch/haut/hyaluronsaeure/ — 14.09.2026
- https://tcm.ch/haut/korean-skincare/ — 14.09.2026
- https://tcm.ch/haut/microneedling-zuhause/ — 14.09.2026
- https://tcm.ch/haut/mitesser/ — 14.09.2026
- https://tcm.ch/haut/nasolabialfalten/ — 14.09.2026
- https://tcm.ch/haut/glass-skin/ — 14.09.2026 (war bereits indexiert)
- https://tcm.ch/haut/k-beauty/ — 14.09.2026 (war bereits indexiert)
- https://physio.ch/ratgeber/domizil-oder-praxis/ — 14.09.2026 (physio.ch-Property, inzwischen indexiert)
- https://physio.ch/ratgeber/parkinson-zu-hause/ — 14.09.2026 (physio.ch-Property, inzwischen indexiert)
- https://physio.ch/ratgeber/physiotherapie-nach-schlaganfall/ — 14.09.2026 (physio.ch-Property, inzwischen indexiert)

- https://tcm.ch/therapien/gua-sha/gesichts-gua-sha/ — 13.09.2026
- https://tcm.ch/therapien/massage/bindegewebsmassage/ — 13.09.2026
- https://tcm.ch/therapien/massage/triggerpunktmassage/ — 13.09.2026
- https://tcm.ch/haut/aknenarben/ — 13.09.2026
- https://tcm.ch/haut/augenringe/ — 13.09.2026
- https://tcm.ch/haut/azelainsaeure/ — 13.09.2026
- https://tcm.ch/haut/doppelkinn/ — 13.09.2026
- https://tcm.ch/haut/falten-gesicht/ — 13.09.2026
- https://physio.ch/ratgeber/domizil-oder-praxis/ — 13.09.2026 (physio.ch-Property)
- https://physio.ch/ratgeber/parkinson-zu-hause/ — 13.09.2026 (physio.ch-Property)
- https://physio.ch/ratgeber/physiotherapie-nach-schlaganfall/ — 13.09.2026 (physio.ch-Property)

- https://tcm.ch/koerpersignale/starkes-schwitzen-ohne-sport/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/koerpersignale/wadenkraempfe-nachts/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/standorte/zuerich/kosten/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/beschwerden/hallux-valgus/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/beschwerden/isg-blockade/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/beschwerden/rhizarthrose/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/beschwerden/nervenschmerzen/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/beschwerden/lymphoedem/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/wissen/dry-needling-vs-akupunktur/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/wissen/faszien-verklebt-was-hilft/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/wissen/akupressurmatte-was-bringt-sie/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/wissen/triggerpunkte-verstehen-loesen/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/wissen/schroepfen-wirkung-flecken/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/wissen/burnout-symptome-erkennen/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/wissen/schmerzen-unterer-ruecken/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/wissen/hexenschuss-was-tun/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/wissen/was-hilft-gegen-kopfschmerzen/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/wissen/akupunktur-geburtsvorbereitung-beckenendlage/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/standorte/luzern/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/akupunktur-tcm-basel/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/standorte/basel/kosten/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/wissen/akupunktur-bei-kopfschmerzen/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/wissen/akupunktur-zum-abnehmen/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/therapien/ohrakupunktur/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/krankenkassen/massage/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/krankenkassen/akupunktur/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/krankenkassen/shiatsu/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/massage-zuerich/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/massage-st-gallen/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/therapien/massage/lymphdrainage/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/therapien/massage/sportmassage/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/therapien/massage/medizinische-massage/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/therapien/massage/fussreflexzonenmassage/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/therapien/massage/schwangerschaftsmassage/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/therapien/massage/klassische-massage/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/therapien/massage/deep-tissue-massage/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/gesundheitsbibliothek/fragen/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/gesundheitsbibliothek/fragen/erster-termin/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/gesundheitsbibliothek/fragen/nach-der-behandlung/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/gesundheitsbibliothek/fragen/sicherheit-nebenwirkungen/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/gesundheitsbibliothek/fragen/kosten-versicherung/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/gesundheitsbibliothek/fragen/akupunktur/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/gesundheitsbibliothek/fragen/schroepfen-methoden/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/gesundheitsbibliothek/fragen/tut-akupunktur-weh/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/gesundheitsbibliothek/fragen/muedigkeit-nach-akupunktur/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/gesundheitsbibliothek/fragen/blaue-flecken-nach-akupunktur/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/gesundheitsbibliothek/fragen/akupunktur-blutverduenner/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/ — 13.09.2026 (war bereits indexiert)
- https://tcm.ch/gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/ — 13.09.2026 (war bereits indexiert)

- https://physio.ch/ — 13.09.2026 (war bereits indexiert)
- https://physio.ch/einzugsgebiet/zuerich-stadt/ — 13.09.2026 (war bereits indexiert)
- https://physio.ch/hausbesuch/ — 13.09.2026 (war bereits indexiert)
- https://physio.ch/einzugsgebiet/ — 13.09.2026 (war bereits indexiert)

- https://tcm.ch/koerpersignale/immer-zur-gleichen-uhrzeit-aufwachen/ — 12.09.2026 (war bereits indexiert)
- https://tcm.ch/koerpersignale/nachtschweiss-ohne-fieber/ — 12.09.2026 (war bereits indexiert)
- https://tcm.ch/koerpersignale/rueckenschmerzen-beim-husten/ — 12.09.2026 (war bereits indexiert)
- https://tcm.ch/koerpersignale/bein-wird-beim-sitzen-taub/ — 12.09.2026 (war bereits indexiert)
- https://tcm.ch/koerpersignale/finger-morgens-steif/ — 12.09.2026 (war bereits indexiert)
- https://tcm.ch/koerpersignale/hand-kribbelt-beim-velofahren/ — 12.09.2026 (war bereits indexiert)
- https://tcm.ch/koerpersignale/schwindel-beim-umdrehen-im-bett/ — 12.09.2026 (war bereits indexiert)
- https://tcm.ch/koerpersignale/herzschlag-im-ohr/ — 12.09.2026 (war bereits indexiert)
- https://tcm.ch/koerpersignale/ — 12.09.2026 (war bereits indexiert)
- https://tcm.ch/koerpersignale/schwindel-beim-aufstehen/ — 12.09.2026
- https://tcm.ch/koerpersignale/finger-schlafen-ein/ — 12.09.2026
- https://tcm.ch/koerpersignale/einzelne-finger-taub/ — 12.09.2026
- https://tcm.ch/koerpersignale/kalte-haende-einseitig/ — 12.09.2026
- https://tcm.ch/koerpersignale/klossgefuehl-im-hals/ — 12.09.2026
- https://tcm.ch/koerpersignale/staendiger-raeusperzwang/ — 12.09.2026
- https://tcm.ch/koerpersignale/zungenbrennen/ — 12.09.2026
- https://tcm.ch/koerpersignale/hitzegefuehl-ohne-fieber/ — 12.09.2026
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
