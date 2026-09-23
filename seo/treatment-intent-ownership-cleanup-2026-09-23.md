# Treatment-Intent Ownership Cleanup (Phase 2) — 23.09.2026

## A. Executive Summary

13 Cluster auditiert, 6 Seiten editiert, 0 neue URLs, 0 Routen-Änderungen. Drei Intent-Ebenen sauber getrennt: Condition (/beschwerden/), Treatment ("Akupunktur bei X", /wissen/), Local (Phase 1, unangetastet). Grösste Auflösungen: Migräne (Condition-Title gab Treatment-Term ab), Kinderwunsch (Wissen-Artikel auf IVF-Begleitung verengt), Kopfschmerzen (Artikel auf generisches Head-Term verbreitert), Schlaf (GSC-Split dokumentiert und per Ownership fixiert).

## B.-F. Cluster, Evidenz, Entscheidungen

| Cluster | Condition-Query | Condition-Owner | Treatment-Query | Treatment-Owner | GSC-Konkurrenz vorher | Änderung | Erwartung |
|---|---|---|---|---|---|---|---|
| Migräne | migräne | /beschwerden/migraene/ | akupunktur bei migräne (~110, KD15) | /wissen/migraene-tcm-warum-akupunktur-nicht-fuer-jeden/ | Treatment-Queries trafen Condition-Seite (deren Title war "Akupunktur bei Migräne") | REPOSITION beide: Condition-Title → "Migräne – TCM-Behandlung"; Artikel-SEO-Title → "Akupunktur bei Migräne: Wirkung, Evidenz & Grenzen" (H1 bleibt editorial); Condition→Artikel-Link ergänzt | Artikel übernimmt Treatment-SERP, Condition konsolidiert Migräne |
| Kopfschmerzen | kopfschmerzen/spannungskopfschmerzen | jeweilige Beschwerdeseiten | akupunktur kopfschmerzen (~110, KD15) | /wissen/akupunktur-bei-kopfschmerzen/ | Artikel-Title nur "Spannungskopfschmerzen" = generisches Term unbesetzt | REPOSITION: Title/H1 → "Akupunktur bei Kopfschmerzen: Was die Studien zeigen" | Generic-Treatment-Term besetzt; was-hilft-Artikel behält Selbsthilfe-Intent (NO CHANGE) |
| Rücken | rückenschmerzen | /beschwerden/rueckenschmerzen/ | akupunktur rückenschmerzen (~70, KD19) | /wissen/akupunktur-bei-rueckenschmerzen/ | leichter Overlap via secondary_keywords | STRENGTHEN EXISTING (nur CSV: Terms sauber verteilt; Cross-Links bestehen beidseitig); schmerzen-unterer-ruecken bleibt Support (NO CHANGE) | klare Zuordnung ohne Textrisiko |
| Nacken | nackenschmerzen | /beschwerden/nackenschmerzen/ | akupunktur nackenschmerzen | /wissen/akupunktur-bei-nackenschmerzen/ | wie Rücken | STRENGTHEN EXISTING (nur CSV) | wie Rücken |
| Schlaf | schlafprobleme/schlafstörungen | /beschwerden/schlafprobleme/ | akupunktur schlafstörungen (~20) | /wissen/akupunktur-schlafprobleme/ | GSC-Split: Condition ~92 Impr. Pos. ~75 vs. Artikel ~19 Impr. Pos. ~33 | MERGE INTENT WITHOUT REDIRECT (Ownership per CSV: Condition = schlafstörungen/schlafprobleme, Artikel = alle Akupunktur-Varianten); Links bestehen beidseitig (Anchor "Akupunktur bei Schlafproblemen: Studien und Ablauf" via wissen-links) | Artikel (Pos. ~33) übernimmt Treatment-Query komplett |
| Kinderwunsch | kinderwunsch | /beschwerden/kinderwunsch/ | akupunktur kinderwunsch (~110, KD6) | /beschwerden/kinderwunsch/ (bewusst!) | HIGH: beide Seiten breit auf Kinderwunsch-Akupunktur | MERGE INTENT WITHOUT REDIRECT: /beschwerden/kinderwunsch/ = PRIMARY für alle generischen Terms (GSC-stärker, Pos. ~14.9 Krankenkassen-Query); /wissen/kinderwunsch-akupunktur-tcm/ auf IVF-/Behandlungsbegleitung verengt (Title/H1/Meta) | Kannibalisierung high → low; IVF-Longtail bleibt beim Artikel |
| PCOS | pcos | /beschwerden/pcos/ | akupunktur bei pcos | /wissen/pcos-akupunktur-tcm/ | Artikel-Title trug "PCOS" als Head | REPOSITION: Artikel-Title/H1 → "Akupunktur bei PCOS: Wirkung, Evidenz und Grenzen"; Link auf /beschwerden/pcos/ ergänzt | PCOS-Head konsolidiert auf Condition |
| Heuschnupfen | heuschnupfen/allergien | /beschwerden/allergien-heuschnupfen/ | akupunktur heuschnupfen (~210, KD8!) | /wissen/akupunktur-bei-heuschnupfen/ | Artikel verlinkte auf Legacy-Duplikat /beschwerden/heuschnupfen/ | STRENGTHEN EXISTING: Body+Related-Links auf kanonische Beschwerdeseite umgestellt; Ownership per CSV fixiert; Legacy-URL selbst unangetastet | stärkste Treatment-Chance sauber verdrahtet |
| Ischias | ischias | /beschwerden/ischias/ (Condition+Treatment) | akupunktur ischias (~30) | dieselbe Seite | keine | NO CHANGE (FAQ "Hilft Akupunktur bei Ischias?" vorhanden; kein Seitenbau bei ~30/mo); als künftige Chance notiert | Owner bleibt eindeutig |
| Arthrose | arthrose | /beschwerden/arthrose/ (Condition+Treatment) | akupunktur arthrose | dieselbe Seite | keine | NO CHANGE | — |
| Tinnitus | tinnitus | /beschwerden/tinnitus/ | akupunktur tinnitus (~20) | dieselbe Seite | keine konkurrierende Treatment-URL | NO CHANGE | — |
| Wechseljahre | wechseljahre | /beschwerden/wechseljahre/ | akupunktur wechseljahre (~20) | dieselbe Seite | keine | NO CHANGE | — |
| Stress | stress & burnout | /beschwerden/stress-burnout/ | akupunktur stress (~20) | dieselbe Seite | Burnout-Duplikat bereits kanonisiert (unangetastet) | NO CHANGE | — |

## G.-I. Seitenänderungen (Titles/H1 vorher → nachher)

1. /beschwerden/migraene/ — Title: "Akupunktur bei Migräne – TCM-Behandlung | TCM.ch" → "Migräne – TCM-Behandlung | TCM.ch". H1 unverändert.
2. /wissen/migraene-tcm-warum-akupunktur-nicht-fuer-jeden/ — Title: "Migräne und TCM: Warum Akupunktur nicht für jeden funktioniert" → "Akupunktur bei Migräne: Wirkung, Evidenz & Grenzen". H1 bleibt editorial ("Migräne und TCM: Warum Akupunktur nicht für jeden funktioniert."). Meta auf Treatment-Intent geschärft (ehrlicher Angle erhalten).
3. /wissen/akupunktur-bei-kopfschmerzen/ — Title+H1: "Akupunktur bei Spannungskopfschmerzen: Was die Studien zeigen" → "Akupunktur bei Kopfschmerzen: Was die Studien zeigen".
4. /wissen/kinderwunsch-akupunktur-tcm/ — Title: "Akupunktur bei Kinderwunsch und IVF: Ablauf und Zeitpunkt" → "Akupunktur bei IVF & Kinderwunschbehandlung: Zeitpunkt und Ablauf"; H1 analog; Meta auf Behandlungsbegleitung (keine Fruchtbarkeitsversprechen).
5. /wissen/pcos-akupunktur-tcm/ — Title+H1: "PCOS und TCM: Akupunktur, Zyklus und Kinderwunsch" → "Akupunktur bei PCOS: Wirkung, Evidenz und Grenzen".
6. /wissen/akupunktur-bei-heuschnupfen/ — kein Title-Change; nur Links.

## J. Interne Links

- NEU: wissen-links.ts migraene[] → Treatment-Artikel als erster Eintrag (Anchor "Akupunktur bei Migräne: Wirkung, Evidenz und Grenzen") — schliesst die fehlende Condition→Artikel-Kante (vorher 0 Links).
- NEU: PCOS-Artikel → /beschwerden/pcos/ (kontextuell im ersten Abschnitt; vorher 0 Links).
- KORRIGIERT: Heuschnupfen-Artikel Body+Related: /beschwerden/heuschnupfen/ (Legacy-Duplikat, canonicalisiert) → /beschwerden/allergien-heuschnupfen/ (kanonischer Owner). Legacy-Route selbst unverändert.
- Bestätigt vorhanden (keine Änderung): Schlaf, Rücken, Nacken, Kinderwunsch beidseitig verlinkt; Artikel→Therapie (/therapien/akupunktur/) und Artikel→Standorte-Kanten bestehen im Template.

## K. Master-Keyword-Map

16 Zeilen aktualisiert (siehe Notes-Präfix "Treatment-Intent-Cleanup 23.09.2026"). SHARED_INTENT_REVIEW vollständig aufgelöst bei: kinderwunsch (beide Zeilen), pcos-Artikel. Treatment-Artikel jetzt PRIMARY_OWNER ihres Treatment-Intents: migräne-Artikel, kopfschmerzen, rücken, nacken, schlaf, heuschnupfen. Bewusst verbleibende Low-Risk-Overlaps: Condition-Seiten behandeln Akupunktur weiterhin inhaltlich (gewollt, §23); schmerzen-unterer-ruecken bleibt medium-risk Support.

## L. Bewusst unverändert

/wissen/was-hilft-gegen-kopfschmerzen/ (eigener Selbsthilfe-Intent), /wissen/schmerzen-unterer-ruecken/, alle Beschwerden-H1s, Ischias/Arthrose/Tinnitus/Wechseljahre/Stress-Seiten, Burnout-Canonical-Konstrukt, Legacy-Heuschnupfen-Route, Körpersignale/Befunde/TCM-verstehen, Therapie-Seiten, Phase-1-Local-Seiten, Homepage.

## M.-O. Freeze-Ergebnisse

- Tracking: Diff enthält nur Title/H1/Meta-Strings, einen Link-Anchor und zwei Link-Ziele; keine onclick/dataLayer/Form/CTA/wa.me-Änderungen.
- Routen: ADDED 0 / REMOVED 0 / RENAMED 0 (Inventar identisch).
- Sitemap: 437 → 437.
- Canonicals: unverändert (inkl. /beschwerden/heuschnupfen/ → allergien-heuschnupfen).

## P. Build/Audits

Build ok; health-audit 0 Orphans / 0 doppelte Titel / 0 kaputte Referenzen; keine doppelten H1; keine sichtbaren Em-Dashes auf editierten Seiten; Renders geprüft.
