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

## Erledigt

- https://tcm.ch/haut/microneedling/ — 02.09.2026
- https://tcm.ch/haut/retinol/ — 02.09.2026
- https://tcm.ch/haut/niacinamid/ — 02.09.2026
- https://tcm.ch/haut/salicylsaeure/ — 02.09.2026
- https://tcm.ch/haut/hydrafacial/ — 02.09.2026
- https://tcm.ch/haut/centella/ — 02.09.2026
- https://tcm.ch/haut/melasma/ — 02.09.2026
- https://tcm.ch/haut/profhilo/ — 02.09.2026
- https://tcm.ch/haut/couperose/ — 02.09.2026
