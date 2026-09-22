# GSC-Audit-Paket — tcm.ch, Stand 21.09.2026

Export aus Google Search Console, Property `sc-domain:tcm.ch` (Domain-Property, umfasst
also auch die Subdomains `www.tcm.ch` und `ouch.tcm.ch`).
Letzte GSC-Datenaktualisierung: 18.09.2026.

## Ausgangslage

| | Seiten |
|---|---|
| **Indexiert** | **442** |
| **Nicht indexiert** | **266** (7 Gründe) |

Zum Vergleich der Stand elf Tage vorher (10.09.2026): 255 indexiert, 291 nicht indexiert.
Die indexierte Seitenzahl hat sich in elf Tagen also fast verdoppelt.

## Dateien

| Datei | Zeilen |
|---|---|
| `alle-nicht-indexierten-seiten.csv` | 266 — alle Gründe zusammen, Spalten: Grund, URL, Zuletzt gecrawlt, Host |
| `seite-mit-weiterleitung.csv` | 94 |
| `alternative-seite-mit-richtigem-kanonischen-tag.csv` | 59 |
| `nicht-gefunden-404.csv` | 53 |
| `gefunden-zurzeit-nicht-indexiert.csv` | 29 |
| `gecrawlt-zurzeit-nicht-indexiert.csv` | 17 |
| `durch-noindex-tag-ausgeschlossen.csv` | 13 |
| `durch-robots-txt-datei-blockiert.csv` | 1 |

Die vier grössten Dateien stammen aus dem offiziellen GSC-CSV-Export. Die drei kleinen
(`gecrawlt`, `gefunden`, `robots`) wurden aus der GSC-Oberfläche abgelesen; bei diesen
dreien fehlt teilweise das Crawl-Datum.

## Verteilung nach Host

| Host | Seiten |
|---|---|
| tcm.ch | 230 |
| ouch.tcm.ch | 27 |
| www.tcm.ch | 9 |

## Kontext, der für die Beurteilung nötig ist

Ohne diese Punkte wird ein Audit zu falschen Schlüssen kommen:

**1. „Seite mit Weiterleitung" (94) ist fast vollständig gewollt.**
Die Site nutzt Trailing-Slash-URLs als kanonische Form. Jede Nicht-Slash-Variante
(`/beschwerden/migraene` → `/beschwerden/migraene/`) wird von Cloudflare normalisiert und
taucht hier auf. Dazu kommen `http://` und `www.`-Varianten, die per Zone-Redirect-Rule auf
`https://tcm.ch` gehen. Diese Zahl wächst automatisch mit jeder neuen Seite. Kein Handlungsbedarf.

**2. „Alternative Seite mit richtigem kanonischen Tag" (59) sind überwiegend Parameter-URLs.**
Vorbefüllte Formular-Links der Art `/?standort=wil`, `/en/contact/?beschwerde=Back Pain`,
`/en/contact/?therapie=Gua Sha`. Sie kanonisieren korrekt auf die Elternseite.
Seit 10.09.2026 sind `?standort=`, `?beschwerde=` und `?therapie=` in der robots.txt
gesperrt, die Zahl sollte also mittelfristig sinken.
Ausserdem enthalten: drei bewusst konsolidierte Duplikate —
`schlafstoerungen` → `schlafprobleme`, `burnout` → `stress-burnout`,
`heuschnupfen` → `allergien-heuschnupfen`.

**3. „Durch robots.txt blockiert" (1) ist die direkte Folge dieser robots.txt-Änderung.**
`https://tcm.ch/?standort=wil` — funktioniert wie vorgesehen.

**4. „Durch noindex ausgeschlossen" (13) — zehn davon sind Absicht, drei nicht geklärt.**
Die zehn `/visuals/`-URLs sind ein internes Patienten-Kommunikationstool und bewusst
`noindex,follow` (so im Repo dokumentiert). **Offen und prüfenswert sind die drei
`/gesundheitsbibliothek/tcm-verstehen/`-Seiten** (meridiane-punkte, muster, diagnostik) —
ob deren noindex beabsichtigt ist, ist nicht dokumentiert.

**5. „Nicht gefunden (404)" (53) zerfällt in drei Gruppen.**
- ~36 alte `/beschwerden/<slug>`-URLs aus der Vor-Migrations-Site. Bewusst nicht
  wiederhergestellt; eine Auswahl davon wurde nach Semrush-Prüfung gezielt neu gebaut.
- ~7 `/therapien/<therapie>/<stadt>`-Doorway-Kombinationen und ~4 gekillte `/wissen/`-URLs.
  Diese werden von Cloudflare-Pages-Functions absichtlich mit **410 Gone** beantwortet.
- Legacy-Müll: `/3c4M2Gc`, `/38Cbzum` (alte Bitly-Shortcodes), `/api/anfrage`
  (Formular-Endpoint, inzwischen per robots.txt gesperrt),
  `www.tcm.ch/Dhyana/Datenschutzerklaerung.pdf`, `www.tcm.ch/SMS/online.html`.

**6. `ouch.tcm.ch` (27 Seiten) ist eine eigene Publikation.**
Das Online-Magazin OUCH. liegt auf einer Subdomain, die in dieser Domain-Property
mitgezählt wird. 25 der 29 „Gefunden – nicht indexiert" sind OUCH.-Artikel. Für ein
Audit der Hauptsite gehören sie getrennt betrachtet.

**7. Nur vier tcm.ch-Seiten stehen wirklich auf „Gefunden – nicht indexiert".**
`/beschwerden/achillessehnenentzuendung/`, `/beschwerden/kalkschulter/`,
`/haut/couperose/`, `/haut/pigmentflecken/`.

## Nach Abzug des Erwarteten

Von 266 nicht indexierten Seiten sind rund 153 strukturell gewollt (Weiterleitungen und
kanonisierte Parameter-URLs), etwa 11 absichtliche 410-Prunes und 10 absichtliche
noindex-Seiten. Die Menge, bei der sich eine Prüfung wirklich lohnt, ist deutlich kleiner
als die Gesamtzahl vermuten lässt.

## Sinnvolle Fragen an ein Audit

1. Sind unter den 36 toten `/beschwerden/`-Slugs welche mit relevantem Schweizer
   Suchvolumen und Behandlungsabsicht, die neu gebaut werden sollten?
2. Ist der noindex auf den drei `/gesundheitsbibliothek/tcm-verstehen/`-Seiten Absicht?
3. Die vier `/therapien/akupunktur/`-Unterseiten (schaedelakupunktur, laserakupunktur,
   ynsa, verfahren) wurden am 19.09. gecrawlt und nicht indexiert — zu dünn, zu ähnlich
   zueinander, oder einfach noch zu jung?
4. Warum bleiben 25 OUCH.-Artikel auf „Gefunden – nicht indexiert"? Fehlende interne
   Verlinkung von tcm.ch, fehlende Sitemap-Einbindung oder Qualitätseinschätzung?
5. Lohnt sich für die ~11 bewusst mit 410 beantworteten Doorway-URLs weiterhin der
   410-Status, oder wäre eine 301 auf die jeweilige Elternseite besser?

## Hinweis zur Zahlenlogik

GSC zählt in den Drilldowns „betroffene Seiten", der CSV-Export listet Beispiel-URLs.
Bei dieser Property stimmen beide überein (266 = 266), das ist nicht immer so.
