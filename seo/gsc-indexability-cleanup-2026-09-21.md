# GSC-Indexierbarkeits-Cleanup — tcm.ch, 21.09.2026

## A. Executive Summary

Das Audit hat die 266 nicht indexierten URLs vollständig klassifiziert und jede der
429 Sitemap-URLs live geprüft. **Es wurde genau ein echter Bug gefunden**, nicht die
im Auftrag vermutete Menge.

| Vermutung im Auftrag | Befund |
|---|---|
| Trailing-Slash-Normalisierung defekt, Legacy-Prune feuert vor Slash-Normalisierung (Prio 2) | **Trifft nicht zu.** 428 von 428 Nicht-Slash-Routen leiten in genau einem Hop weiter. Null 404, null 410. |
| Zwei 410-URLs stehen in der Sitemap (Prio 1) | **Bestätigt.** Der einzige echte Defekt. |
| Sitemap-Generator hat Logikfehler | **Trifft nicht zu.** Der Generator leitet korrekt aus den gebauten Routen ab. Ihm fehlte nur die Kenntnis der Prune-Regeln. |
| KEEP-Liste und Leaf-Dateien driften auseinander | **Trifft nicht zu.** 104 Slugs, 104 Leaf-Dateien, exakte Deckung. |

Umgesetzt wurde deshalb genau eine Änderung: eine Guardrail im Sitemap-Generator, die
den Build abbricht, sobald eine Route in die Sitemap geriete, die eine Pages Function
mit 410 beantwortet. Keine Redirects erfunden, keine Seite wiederbelebt, keine
Inhalte angefasst.

## B. Ausgangszahlen (GSC-Export 21.09.2026)

| | |
|---|---|
| Indexiert | 442 |
| Nicht indexiert | 266 |

| Grund | Seiten |
|---|---|
| Seite mit Weiterleitung | 94 |
| Alternative Seite mit richtigem kanonischen Tag | 59 |
| Nicht gefunden (404) | 53 |
| Gefunden – zurzeit nicht indexiert | 29 |
| Gecrawlt – zurzeit nicht indexiert | 17 |
| Durch "noindex"-Tag ausgeschlossen | 13 |
| Durch robots.txt-Datei blockiert | 1 |

## C. Beabsichtigte Ausschlüsse — unverändert gelassen

| Gruppe | Anzahl | Begründung |
|---|---|---|
| Weiterleitungen | 94 | Slash-, http- und www-Normalisierung. Live verifiziert. |
| Kanonisierte Parameter-URLs | 59 | Formular-Prefill; kanonisieren korrekt auf die Elternseite. Enthält die drei bewusst konsolidierten Duplikate (schlafstoerungen, burnout, heuschnupfen). |
| Visual-Library noindex | 10 | Patienten-Kommunikationstool, bewusst `noindex,follow`. |
| robots.txt-Parameter-Regel | 1 | `?standort=wil`, Policy vom 10.09.2026, wirkt wie vorgesehen. |
| Bewusste 410-Prunes | ~12 | Stadt-/Doorway-Kombinationen. |

Klassifikation A (unverändert lassen): **166 URLs**.

## D. Tatsächlich gefundene Bugs

**Genau einer.**

Zwei URLs standen in der ausgelieferten Sitemap und lieferten gleichzeitig HTTP 410:

- `https://tcm.ch/beschwerden/achillessehnenentzuendung/`
- `https://tcm.ch/beschwerden/kalkschulter/`

Damit bekam Google zwei widersprüchliche Signale gleichzeitig. Beide URLs tauchten im
Export unter „Gefunden – zurzeit nicht indexiert" auf, was exakt dazu passt.

### Ursache

Nicht der Generator. Die Rekonstruktion:

| Artefakt | URLs | enthält die zwei toten? |
|---|---|---|
| `public/sitemap.xml` im Repo | 338 | nein |
| ausgelieferte `sitemap.xml` live | 429 | **ja** |

Die beiden Leaf-Dateien existieren im heutigen Quellcode nicht mehr und die Slugs
stehen nicht in `beschwerden-keep.js`. Der Generator würde sie heute also gar nicht
mehr aufnehmen. Die ausgelieferte Sitemap stammt aus einem Build, bei dem die Routen
noch gebaut wurden, während die Function sie bereits mit 410 beantwortete.

Bemerkenswert und separat zu beachten: **das im Repo eingecheckte
`public/sitemap.xml` (338 URLs) weicht deutlich von der Live-Sitemap (429) ab.**
Ein generiertes Artefakt, das versioniert wird, driftet zwangsläufig. Empfehlung
weiter unten.

### Fix

`scripts/gen-sitemap.mjs` kennt jetzt die Prune-Regeln und bricht den Build ab, statt
eine widersprüchliche Sitemap zu schreiben. Die Regeln werden aus denselben
Quelldateien gelesen wie in den Functions — `public/beschwerden-keep.js`,
`public/wissen-kill.js` und die ALLOW-Liste in `functions/therapien/[[path]].js` —
damit sie nicht auseinanderlaufen können.

Geprüft wird pro URL:

- `/beschwerden/<slug>/` → Slug muss in `BESCHWERDEN_KEEP` stehen
- `/beschwerden/<a>/<b>/` → immer ungültig (verschachtelte Kombination)
- `/wissen/<slug>/` → Slug darf nicht in `WISSEN_KILL` stehen
- `/therapien/<t>/<x>/` → nur erlaubt, wenn in ALLOW oder unterhalb `/massage/`
- jede URL muss mit Slash enden

Bei Verstoss: Liste auf stderr, `process.exit(1)`.

Verifiziert mit synthetischen dist-Bäumen:

```
kalkschulter in dist          -> EXITCODE=1, Grund korrekt benannt
/therapien/akupunktur/winterthur -> EXITCODE=1, als Doorway erkannt
saubere dist                  -> EXITCODE=0, Sitemap geschrieben
```

## E. Trailing-Slash-Normalisierung

**Kein Bug.** Der Auftrag vermutete, Legacy-Prune-Regeln feuerten vor der generischen
Slash-Normalisierung und lebende Seiten lieferten ohne Slash 404/410.

Gegengeprüft wurde live gegen **jede** der 428 kanonischen Sitemap-Routen (ohne
Startseite): Trailing Slash entfernt, Request mit `redirect: "manual"`.

```
Ergebnis: {"REDIRECT": 428}   Probleme: 0
```

Stichproben aus dem Auftrag einzeln bestätigt:

| URL | Ergebnis |
|---|---|
| `/beschwerden/asthma` | Redirect |
| `/beschwerden/ischias` | Redirect |
| `/beschwerden/pcos` | Redirect |
| `/beschwerden/rotatorenmanschette` | Redirect |

Die im Auftrag gelisteten Nicht-Slash-URLs stehen im GSC-Export korrekt unter
„Seite mit Weiterleitung", nicht unter 404. **Es wurden keine Einzel-Redirects
angelegt** — es gab nichts zu reparieren. Ein Eingriff in die Reihenfolge der
Normalisierung hätte die bewussten 410-Prunes beschädigt.

## F. Sitemap-Verstösse vor dem Fix

Vollständige Live-Prüfung aller 429 URLs (Status, Canonical, Meta-Robots):

```
HTTP-Status : {"200": 427, "410": 2}
noindex     : 0
Fremd-Canonical: 0
Redirects   : 0
ohne Trailing Slash: 0
fremder Host: 0
```

| URL | Status |
|---|---|
| `https://tcm.ch/beschwerden/achillessehnenentzuendung/` | 410 |
| `https://tcm.ch/beschwerden/kalkschulter/` | 410 |

Das sind **alle** Verstösse. 427 von 429 URLs waren bereits sauber.

Verteilung der Sitemap nach Sektion: `/beschwerden` 104 · `/koerpersignale` 62 ·
`/en` 51 · `/wissen` 41 · `/therapien` 37 · `/haut` 35 · `/gesundheitsbibliothek` 31 ·
`/standorte` 21 · `/team` 15 · `/krankenkassen` 4 · Rest 28 Einzelseiten.

## G. Sitemap-Verstösse nach dem Fix

Erwartet nach Rebuild und Deploy: **0**. Die beiden 410-URLs verschwinden, weil ihre
Routen im aktuellen Quellcode gar nicht mehr gebaut werden. Die Guardrail verhindert,
dass eine vergleichbare URL erneut hineingerät.

Verifikation nach dem Deploy siehe Abschnitt P — sie steht noch aus, weil ich den
Build nicht selbst ausführen kann.

## H. Klassifikation der Legacy-URLs

| Klasse | Bedeutung | URLs |
|---|---|---|
| A | Beabsichtigt, unverändert lassen | 166 |
| B | Technischer Fix | 2 |
| C | Exakter Nachfolger vorhanden, 301 | 12 (als Doorway eingestuft, siehe unten) |
| D | Bewusst entfernt, 404/410 behalten | 45 |
| E | Inhalt-/Indexierungsfrage, kein technischer Fehler | 41 |

Vollständige Zeile-für-Zeile-Klassifikation in
`seo/gsc-indexability-cleanup-2026-09-21.csv` (266 Zeilen).

## I. Angelegte Redirects

**Keine.**

Für keine der 53 404-URLs liess sich ein echter semantischer Nachfolger verifizieren.
Die Nicht-Slash-Varianten lebender Seiten, für die der Auftrag Redirects vorsah,
leiten bereits korrekt weiter — ein zusätzlicher Eintrag hätte nur Redundanz
erzeugt oder eine Kette riskiert.

Die fünf am 10.09.2026 angelegten ALIAS-Redirects in
`functions/beschwerden/[[path]].js` bleiben unverändert bestehen
(`sodbrennen-reflux`, `blaehbauch`, `energiemangel-fatigue`,
`naechtliches-schwitzen`, `geschmacks-geruchsstoerungen`).

## J. Bewusst beibehaltene 410er

- Stadt-/Doorway-Kombinationen `/beschwerden/<symptom>/<stadt>` und
  `/therapien/<therapie>/<stadt>` — die Prune-Logik ist gewollt
- `/wissen/`-Stadt-Varianten aus `wissen-kill.js`
- `/beschwerden/achillessehnenentzuendung/` und `/beschwerden/kalkschulter/` —
  410 ist korrekt, nur der Sitemap-Eintrag war falsch
- Infrastruktur-Müll: `/api/anfrage`, `/3c4M2Gc`, `/38Cbzum`, alte SMS- und PDF-Pfade

## K. Korrigierte interne Links

**Keine gefunden, die korrigiert werden mussten.**

Die Sitemap enthält keine Nicht-Slash-, http- oder www-URLs (je 0 von 429). Die
Prüfung der internen Verlinkung auf tote Ziele steht noch aus — sie erfordert einen
Crawl des gebauten `dist`, den ich ohne lokalen Build nicht durchführen kann. Siehe
offene Punkte.

## L. TCM-verstehen — noindex-Entscheidungen

Einzeln beurteilt, alle drei bleiben `noindex,follow`:

| Seite | Entscheid | Begründung |
|---|---|---|
| `/gesundheitsbibliothek/tcm-verstehen/diagnostik/` | noindex behalten | Sektionsseite, Architektur vor Inhalt angelegt |
| `/gesundheitsbibliothek/tcm-verstehen/meridiane-punkte/` | noindex behalten | dito; zusätzlich kollidiert „Meridiane" mit der Stilregel, die energetische Sprache ausschliesst |
| `/gesundheitsbibliothek/tcm-verstehen/muster/` | noindex behalten | dito |

Keine der drei erfüllt aktuell die fünf Freigabekriterien (eigenständige Suchintention,
Nutzen ohne Kinderseiten, klare Ownership in der Keyword-Map, belastbarer interner
Graph, kein Thin-/Kategorie-Footprint). Sie stehen im GSC-Export ausschliesslich
deshalb, weil sie existieren — nicht, weil etwas kaputt ist.

**Einschränkung, die ich offenlegen muss:** ich habe den tatsächlichen Textumfang
dieser drei Seiten in diesem Durchgang nicht gelesen. Der Entscheid stützt sich auf
die dokumentierte Absicht der Sektionsarchitektur. Wenn dort inzwischen substanzieller
Inhalt steht, ist er zu revidieren.

## M. Akupunkturverfahren-Cluster

`/therapien/akupunktur/laserakupunktur/`, `/schaedelakupunktur/`, `/verfahren/`,
`/ynsa/` — alle vier sind in der Sitemap, liefern 200, sind self-canonical und nicht
noindex. Laut der im Auftrag genannten Live-URL-Prüfung inzwischen indexiert.

**Keine Änderung.** Der Export-Eintrag „Gecrawlt – nicht indexiert" ist ein veralteter
Zustand vom 19.09.

## N. OUCH. — getrennt betrachtet

27 URLs im Export gehören zu `ouch.tcm.ch`, davon 25 Artikel unter „Gefunden –
zurzeit nicht indexiert", dazu `/mitmachen/` und `/redaktion/` unter „Gecrawlt".

Da OUCH. eine eigene Publikation auf einer Subdomain ist und nicht Teil der
tcm.ch-Sitemap (429 URLs, 0 fremde Hosts), fällt es nicht unter diesen
Sitemap-Audit. Einstufung: **Google Discovery/Quality Wait, kein technischer Defekt**
auf tcm.ch-Seite.

Der im Auftrag verlangte technische Leicht-Audit von OUCH. (Sitemap-Mitgliedschaft,
robots, Canonical, Orphan-Status) ist **nicht durchgeführt** — er benötigt die
OUCH.-Sitemap und den OUCH.-Quellcode, die in diesem Repository nicht liegen. Offen.

Klar ist immerhin: 25 Artikel gleichzeitig auf „Gefunden, nie gecrawlt" ist das
typische Muster fehlender interner Verlinkung oder fehlender Sitemap-Einbindung auf
der Subdomain selbst — nicht ein Qualitätsurteil über die einzelnen Texte.

## O. Künftige Content-Kandidaten

40 Zeilen der CSV tragen `future_content_candidate = ja`. Es wurde **kein Inhalt
erstellt**, keine Seite wiederbelebt, keine Keyword-Ownership geändert.

Die inhaltliche Vorarbeit dazu liegt bereits in
`claude/beschwerden-404-shortlist-2026-09-10.md` — dort sind die Legacy-Themen bereits
mit Schweizer Suchvolumen, Keyword-Difficulty und einem medizinischen
Ausschlussfilter bewertet. Diese Datei ist der richtige Startpunkt für eine
Content-Entscheidung, nicht die CSV.

## P. Build- und Audit-Ergebnisse

| Prüfung | Ergebnis |
|---|---|
| Alle 429 Sitemap-URLs live geprüft | 427 × 200, 2 × 410 |
| noindex in der Sitemap | 0 |
| Fremd-Canonical in der Sitemap | 0 |
| Redirects in der Sitemap | 0 |
| Nicht-Slash in der Sitemap | 0 |
| Fremder Host in der Sitemap | 0 |
| Slash-Normalisierung, 428 Routen | 428 × Redirect, 0 Fehler |
| Guardrail gegen synthetische dist | greift, Exit 1 |
| Guardrail gegen saubere dist | läuft durch, Exit 0 |

**Noch offen, weil ich es nicht selbst ausführen kann:**

1. `npm run build` gegen den echten Baum — dabei muss die Guardrail durchlaufen und
   die Sitemap ohne die zwei toten URLs herauskommen
2. Deploy, danach Nachmessung der beiden URLs (erwartet: nicht mehr in der Sitemap)
3. Host-Normalisierung `http://`, `http://www.`, `https://www.` → Kettenlänge
   dokumentieren; aus dem Browser heraus nicht messbar, weil Cross-Origin-Redirects
   opak sind
4. Interner Link-Crawl gegen `dist`
5. OUCH.-Technikprüfung

## Empfehlung, die über den Auftrag hinausgeht

`public/sitemap.xml` ist ein generiertes Artefakt und sollte nicht versioniert werden.
Die 91-URL-Differenz zwischen Repo (338) und Live (429) ist genau der Schaden, den
ein eingecheckter Generator-Output anrichtet: niemand weiss, welche Version gilt.
Vorschlag: aus Git entfernen, in `.gitignore` aufnehmen, nur noch `dist/sitemap.xml`
beim Build erzeugen. Das ist eine separate Entscheidung und wurde hier **nicht**
umgesetzt.

## Erfolgskriterien

| Kriterium | Status |
|---|---|
| Beabsichtigte Ausschlüsse bleiben beabsichtigt | erfüllt, 166 URLs unverändert |
| Tote URLs bleiben tot, wo richtig | erfüllt, 45 × 404/410 behalten |
| Lebende Seiten lösen konsistent auf | erfüllt, 428/428 |
| Sitemap enthält nur saubere 200er | nach Rebuild erfüllt |
| Keine widersprüchlichen Signale an Google | nach Rebuild erfüllt |
| Keine dünnen Legacy-Seiten wiederbelebt | erfüllt, 0 erstellt |
| Technische Ausschlüsse von Google-Entscheidungen getrennt | erfüllt, Abschnitte C/N |
