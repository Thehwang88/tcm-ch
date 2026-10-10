# Entscheidungsprojekt: OUCH-Artikel mit tcm.ch-Owner (Stand 10.10.2026)

Status: **offen, Entscheid nötig.** Nichts umgesetzt. Keine Domain-übergreifenden Redirects.

## Ausgangslage (bestätigt)

- ouch.tcm.ch ist eine eigene Codebasis (nicht in diesem Repo) mit eigener Sitemap (54 URLs).
- 19 OUCH-Artikel stehen im GSC-Export vom 10.10. auf "Gefunden – zurzeit nicht indexiert", nie gecrawlt.
  Alle sind live 200, self-canonical, in der OUCH-Sitemap.
- tcm.ch verlinkt keinen dieser 19 Artikel (OUCH-Links auf tcm.ch gehen auf 8 andere Artikel, über
  `src/data/ouch-links.ts`).
- **14 der 19** bedienen dieselbe Patienten-Suchintention wie eine bestehende tcm.ch-Seite mit Owner-Status
  in `seo/master-keyword-url-map.csv`. Die Indexierungs-Routine reicht ouch.tcm.ch bewusst nicht ein.

## Die 14 Überschneidungen

| OUCH-Artikel (Titel) | Live seit | Wörter | tcm.ch-Owner | Owner-Status |
|---|---|---|---|---|
| akupunktur-nebenwirkungen ("Akupunktur Nebenwirkungen: Was wirklich passieren kann") | 31.08. | 586 | /gesundheitsbibliothek/fragen/akupunktur-nebenwirkungen/ | PRIMARY_OWNER |
| akupunktur-schwangerschaft ("… was hilft und was tabu ist") | 31.08. | 566 | /therapien/akupunktur/schwangerschaft/ | PRIMARY_OWNER |
| dinge-die-patienten-fragen ("Tut Akupunktur weh? 15 echte Patientenfragen") | 30.08. | 643 | /gesundheitsbibliothek/fragen/tut-akupunktur-weh/ | PRIMARY_OWNER |
| nadelphobie ("Angst vor Nadeln: Geht Akupunktur trotzdem?") | 30.08. | 562 | /gesundheitsbibliothek/fragen/angst-vor-akupunktur-nadeln/ | PRIMARY_OWNER (selbst nicht indexiert, Prio A) |
| acu-land-nach-der-behandlung ("Müde nach Akupunktur?") | 30.08. | 543 | /gesundheitsbibliothek/fragen/muedigkeit-nach-akupunktur/ | PRIMARY_OWNER |
| elektroakupunktur ("Wirkung, Ablauf und Unterschied zu TENS") | 30.08. | 445 | /therapien/elektroakupunktur/ + /wissen/elektroakupunktur-wirkung/ | live Owner |
| ohrakupunktur-nada ("Was das NADA-Protokoll wirklich kann") | 30.08. | 448 | /therapien/ohrakupunktur/ | live Owner |
| tuina-massage ("Unterschied zur klassischen Massage") | 31.08. | 549 | /therapien/tuina/ | live Owner |
| gua-sha-jugendamt ("Was die roten Striemen bedeuten …") | 06.09. | 359 | /therapien/gua-sha/ | PRIMARY_OWNER |
| moxa-und-der-rauchmelder ("Was ist Moxibustion?") | 06.09. | 317 | /therapien/moxibustion/ | PRIMARY_OWNER |
| schroepfen-kreise ("Was die Flecken bedeuten und wie lange sie bleiben") | 31.08. | 563 | /wissen/schroepfen-wirkung-flecken/ ("schröpfen flecken") + /therapien/schroepfen/ | SECONDARY_SUPPORT / PRIMARY_OWNER |
| was-kostet-tcm ("Tarif, Krankenkasse und Eigenanteil") | 31.08. | 596 | /krankenkassen/ (gepinnter Owner "tcm krankenkasse", sekundär "tcm kosten") | PRIMARY_OWNER |
| pulsdiagnose-28-geschichten ("Was der Puls wirklich verrät") | 30.08. | 551 | /gesundheitsbibliothek/tcm-verstehen/diagnostik/pulsdiagnostik/ | live Owner |
| zungendiagnose-selbstversuch ("Was deine Zunge verrät …") | 30.08. | 262 | /gesundheitsbibliothek/tcm-verstehen/diagnostik/zungendiagnostik/ | live Owner |

Nicht betroffen (eigener Editorial-Winkel, B im Audit): archaik-check-blutegel-bienengift-baunscheidt,
aristolochia-kapitel, dolmetscher-luecke, erstgespraech-bingo, wetter-im-knie.

## Optionen je Artikel

| Option | Was passiert | Vorteil | Nachteil |
|---|---|---|---|
| 1. Differenzieren | OUCH-Artikel behält Meinungs-/Story-Winkel, Titel und Einstieg weg vom Patienten-Ratgeber-Keyword, sichtbarer Link auf den tcm.ch-Owner | beide Seiten bleiben, klare Rollen | redaktioneller Aufwand in OUCH |
| 2. Canonical auf tcm.ch-Owner | `rel=canonical` im OUCH-Artikel zeigt auf die tcm.ch-Seite | Signale gebündelt, Artikel bleibt lesbar | nur sinnvoll, wenn Inhalt weitgehend gleich ist; Cross-Host-Canonical ist ein Hinweis, keine Garantie |
| 3. noindex | Artikel bleibt für Leser:innen, wird nicht indexiert | schnell, risikoarm | OUCH verliert Sichtbarkeit für das Thema |
| 4. Belassen | nichts ändern | kein Aufwand | Konkurrenz um dieselbe Anfrage bleibt, beide Hosts bleiben unindexiert |

Kein Redirect zwischen den Hosts (ausdrücklich ausgeschlossen).

## Empfehlung (zur Entscheidung)

- **Grundsatz:** tcm.ch bleibt Owner aller Patienten-Intentionen. Die Master-Map wird nicht geändert.
- **Option 1** für Artikel mit echtem eigenem Winkel: dinge-die-patienten-fragen, nadelphobie,
  ohrakupunktur-nada, pulsdiagnose-28-geschichten, gua-sha-jugendamt, moxa-und-der-rauchmelder,
  zungendiagnose-selbstversuch.
- **Option 2 oder 3** für Artikel, deren Titel das Owner-Keyword 1:1 bedient: akupunktur-nebenwirkungen,
  akupunktur-schwangerschaft, acu-land-nach-der-behandlung, was-kostet-tcm, tuina-massage,
  elektroakupunktur, schroepfen-kreise. Welche der beiden: nach inhaltlichem Vergleich je Paar.
- Erst nach dem Entscheid: OUCH-Artikel mit eigenem Winkel über `ouchMagRow` von der passenden
  tcm.ch-Seite verlinken (je 1 Link, nur wo thematisch passend).

## Offene Fragen an die Entscheider:innen

1. Welche Rolle soll OUCH haben: eigenständiges Magazin mit eigener Sichtbarkeit oder Markenbühne, die
   Traffic an tcm.ch abgibt?
2. Wer pflegt die OUCH-Codebasis, und wer setzt Canonical/noindex dort um?
3. Soll OUCH eine eigene GSC-Property und Indexierungs-Routine bekommen?

## Entscheidungsprotokoll

| Artikel | Option | Entschieden von | Datum | Umgesetzt |
|---|---|---|---|---|
| (leer) | | | | |
