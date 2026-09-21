# Health-Library-Welle 21.09.2026 (Welle 4)

## A. Kandidaten & Verdicts

| # | Kandidat | Verdict | Route |
|---|----------|---------|-------|
| 1 | kribbeln-im-gesicht (~320/mo, KD 21) | CREATE | /koerpersignale/kribbeln-im-gesicht/ |
| 2 | schwindel-nach-dem-essen (~170, KD 26) | CREATE | /koerpersignale/schwindel-nach-dem-essen/ |
| 3 | druck-im-oberbauch (~210, KD 24) | CREATE | /koerpersignale/druck-im-oberbauch/ |
| 4 | kribbeln-an-der-lippe (~110, KD 18) | CREATE | /koerpersignale/kribbeln-an-der-lippe/ |
| 5 | beine-kribbeln-nachts (~30) | CREATE | /koerpersignale/beine-kribbeln-nachts/ |
| 6 | druck-hinter-den-augen (~30) | CREATE | /koerpersignale/druck-hinter-den-augen/ |
| 7 | fuss-schlaeft-staendig-ein (~20) | CREATE | /koerpersignale/fuss-schlaeft-staendig-ein/ |
| 8 | tsh-erhoeht (~110) | CREATE | /gesundheitsbibliothek/befunde-werte/tsh-erhoeht/ |
| 9 | cholesterin-erhoeht (~140) | CREATE | /gesundheitsbibliothek/befunde-werte/cholesterin-erhoeht/ |
| 10 | akupunktur-erstverschlimmerung | STOP + STRENGTHEN | (kein neuer URL) |

9 neue Leaf-URLs + Befunde-Hub jetzt indexierbar = 10 neue indexierbare URLs (Maximum, keine Quote; kein Ersatzkandidat nachgeschoben).

## B. STOP-Begründung (Kandidat 10)

`fragen.ts`, Hub `nach-der-behandlung`, besitzt den Erstverschlimmerungs-Intent bereits mit Answer `id: 'erstverschlimmerung'` ("Meine Beschwerden sind nach der Behandlung kurz stärker. Ist das normal?"). Eine eigene Seite wäre Duplikat. Stattdessen STRENGTHEN: Der Begriff «Erstverschlimmerung» wird in der Antwort jetzt explizit genannt (Suchbegriff-Match); Dauer "einen bis zwei Tage" und Eskalationspfad waren bereits vorhanden. Zusätzlich Synonym "Erstverschlimmerung" auf /gesundheitsbibliothek/fragen/nach-der-behandlung/ in der Bibliothekssuche.

## C. Overlap-Audit (Kurzfassung)

- druck-im-oberbauch: abgegrenzt im Text von magendruck-im-liegen (Lage-Muster), voellegefuehl-nach-dem-essen, blaehbauch-am-abend, sodbrennen (Brennen). Risiko low.
- beine-kribbeln-nachts: eigener Abschnitt "Kribbeln ist nicht gleich Restless Legs"; /beschwerden/restless-legs/ bleibt Erkrankungs-Owner.
- druck-hinter-den-augen: augen-lokalisiert; druck-im-kopf-ohne-kopfschmerzen und kopfdruck-beim-buecken bleiben Owner ihrer Muster (kreuzverlinkt).
- fuss-schlaeft-staendig-ein: Wiederholungs-Muster; bein-wird-beim-sitzen-taub und zehen-kribbeln bleiben eigene Owner.
- kribbeln-an-der-lippe vs. kribbeln-im-gesicht: Lippe (Herpes-Prodrom) vs. Gesichtsfläche (Neuro), gegenseitig verlinkt.
- TSH/Cholesterin: kein Erkrankungs-Owner vorhanden (keine Schilddrüsen-/Herz-Kreislauf-Beschwerden-Seite, geprüft). Seiten bleiben Befund-Einordnung; canonicalIntentOwner = [].

## D. Befunde-Umbenennungen

- tsh-erhoeht-ft4-normal → **tsh-erhoeht** (Konstellation "TSH erhöht, fT4 normal" als Abschnitt). Nie eine Prod-Route gehabt → Rename ohne Redirect.
- cholesterin-erhoeht-trotz-gesunder-ernaehrung → **cholesterin-erhoeht** ("trotz gesunder Ernährung" als Abschnitt). Ebenfalls nie live.

Inhaltliche Leitplanken eingehalten: keine Diagnose aus TSH allein, keine Medikamentenhinweise, keine universellen Grenzwerte, kein TCM-Labor-Framing (integrativeContextHtml grenzt explizit ab, steht zuletzt). Keine Quellenlisten (extern nicht verifizierbar in dieser Umgebung; Aussagen entsprechend vorsichtig formuliert — Konvention seit Welle 09/2026).

## E. Hub-Indexierung

Regel aus Phase 1: Hub noindex bis ≥4 publizierte Leaves. Mit tsh-erhoeht + cholesterin-erhoeht sind es 4 (crp, leukozyten, tsh, cholesterin) → `HUB_INDEXABLE = true`. Hub /gesundheitsbibliothek/befunde-werte/ ist neu in Sitemap + Queue.

## F. Interne Verlinkung

Jede neue Seite 3-6 kontextuelle Links (nur verifizierte Ziele). Reziprok ergänzt in bestehenden Einträgen:
zehen-kribbeln → fuss-schlaeft-staendig-ein; herzklopfen-nach-dem-essen → schwindel-nach-dem-essen; magendruck-im-liegen → druck-im-oberbauch; druck-im-kopf-ohne-kopfschmerzen → druck-hinter-den-augen; brennende-fuesse-nachts → beine-kribbeln-nachts; zungenbrennen → kribbeln-an-der-lippe.

## G. Suche & Synonyme

10 neue SYNONYMS-Einträge in gesundheitsbibliothek.ts (inkl. fuß/fuss-Varianten, TSH/fT4/Schilddrüse, LDL/HDL/Blutfette, Erstverschlimmerung auf Fragen-Hub). KS- und Befunde-Einträge laufen automatisch über die bestehenden Such-Loops.

## H. CSV

9 neue PRIMARY_OWNER-Zeilen in master-keyword-url-map.csv mit Overlap-URLs und Notes (Welle 4).

## I. Index-Queue

10 URLs oben unter "## Offen" (9 Leaves + Befunde-Hub), gleicher Commit.

## J. Build & Zahlen

- Sitemap: 419 → **429** URLs (+10, erwartet).
- Bibliothekssuche: 214 → **223** Einträge (+9; Hub ist kein Sucheintrag).
- health-audit: 0 Orphans / 0 doppelte Titel / 0 kaputte Referenzen (453 Seiten, 331 Health).
- Geplante Befunde-Slugs (ferritin, hba1c, nuechternblutzucker, blutdruck-140-90, …) weiterhin ohne Prod-Route (dist geprüft: nur 4 Leaves + Hub).

## K. Validierung

Canonicals korrekt auf allen 10 Seiten; kein robots-noindex auf neuen Seiten; je 1 "—" pro Seite (erlaubter Layout-Kommentar, kein sichtbarer Em-Dash). Puppeteer-Renders 1440/390 auf 3 KS-Samples + beiden Befunden + Hub: Titel/H1 korrekt, kein Overflow, keine Pageerrors.

## L. Red Flags & YMYL

Alle 7 KS-Seiten mit wa-callout-Red-Flags (Notruf 144 bei kribbeln-im-gesicht [Schlaganfall], druck-im-oberbauch [Herzinfarkt-Differenzial], kribbeln-an-der-lippe [Allergie]). Befunde-Seiten mit redFlagsHtml + "kein Beweis"-Abschnitt. Autor durchgehend TCM.ch Fachredaktion, keine erfundenen Reviewer; suggestedReviewerType dokumentiert ärztlichen Review-Bedarf.
