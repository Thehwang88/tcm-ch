# Index-Queue: Synchronisation Repo ↔ lokale Routine (Stand 10.10.2026)

Ziel: Die 10 A-URLs aus `seo/gsc-not-indexed-audit-2026-10-10.md` (Block "Priorität A" oben in
`## Offen`) sollen von der täglichen Routine tatsächlich zuerst eingereicht werden.
Nichts davon ist automatisiert umgesetzt; lokale Dateien und die Routine sind unverändert.

## Was bestätigt ist

- Routine "tcm.ch + physio.ch — Indexierung beantragen", Cron `0 8 * * *` (08:00 UTC = 10:00 Schweizer
  Sommerzeit), letzter Lauf 10.10.2026, Status erfolgreich.
- Läuft als Cowork-Remote-Session in der Cloud, gebunden an das Gerät "Claude Desktop (Windows)";
  die Search Console wird über die Chrome-Tools auf diesem Rechner bedient.
- Die Anweisung der Routine nennt als Queue `C:\dev\tcm-ch\seo\index-queue.md` (lokaler Clone) und
  verlangt, erledigte URLs nach `## Erledigt` zu verschieben und die Datei zu speichern.
- Die Routine committet und pusht nicht. Die Repo-Datei hat keinen Erledigt-Eintrag nach dem 20.09.2026.
- Die Routine reicht ouch.tcm.ch nicht ein und reserviert ca. 3 von ~11 Tagesanfragen für physio.ch.

## Was offen ist (lokal prüfen)

Ob die Routine die lokale Datei tatsächlich lesen **und schreiben** kann, lässt sich von hier nicht
belegen (Cloud-Session, Zugriff auf `C:\` nur über das gebundene Gerät). Prüfen:

1. Enthält `C:\dev\tcm-ch\seo\index-queue.md` unter `## Erledigt` Einträge nach dem 20.09.2026?
   - **Ja:** Die Routine schreibt lokal. Weiter mit "Sicherer Abgleich".
   - **Nein:** Die Routine kann die Datei nicht zurückschreiben (oder nicht lesen). Dann reicht sie
     vermutlich täglich dieselben obersten URLs ein bzw. füllt aus den GSC-Berichten auf. Die Push-
     Berichte der letzten Läufe zeigen, welche URLs eingereicht wurden. In diesem Fall gilt Variante B.
2. `git -C C:\dev\tcm-ch status` und `git -C C:\dev\tcm-ch log -1 --oneline`: Wie alt ist der lokale
   Stand, ist `seo/index-queue.md` lokal geändert?

## Sicherer Abgleich (Variante A, manuell, nach dem Merge auf main)

Zeitpunkt: nicht zwischen 07:55 und 09:00 UTC (Routine läuft). PowerShell:

```powershell
cd C:\dev\tcm-ch
git status
# 1. Lokalen Queue-Stand sichern (enthält ggf. Erledigt-Vermerke der Routine)
Copy-Item seo\index-queue.md "$env:USERPROFILE\index-queue.local-backup.md"
# 2. Lokale Änderung parken, main holen, Änderung zurückspielen
git stash push -- seo/index-queue.md
git pull origin main
git stash pop
```

Bei einem Konflikt in `seo/index-queue.md`:
- Kopfteil und Block "Priorität A" aus main übernehmen.
- Unter `## Offen` alle URLs entfernen, die lokal schon unter `## Erledigt` stehen.
- `## Erledigt` vollständig aus der lokalen Version übernehmen (nichts verwerfen).
- Prüfen: Die ersten 10 Einträge unter `## Offen` sind die A-URLs.

```powershell
(Get-Content seo\index-queue.md) | Select-String -Pattern '^## Offen' -Context 0,13
```

Optional, damit das Repo den echten Stand zeigt: lokal committen und pushen
(`git add seo/index-queue.md; git commit -m "chore(seo): Index-Queue Erledigt-Stand"; git push origin main`).
Ein Push auf main löst einen Deploy aus; für eine reine Markdown-Änderung unkritisch.

## Variante B (Vorschlag, braucht gesonderte Freigabe)

Die Routine liest die Queue aus dem Repo statt aus `C:\`, z. B. per GitHub-Zugriff der Session, und
meldet erledigte URLs im Bericht; die Erledigt-Pflege erfolgt per Commit auf einem eigenen Branch oder
durch eine Folgesession. Vorteil: eine Quelle der Wahrheit, keine lokalen Kopien. Erfordert eine
Änderung des Routine-Prompts und ggf. Repo-Zugriff der Routine; deshalb hier nur beschrieben.

## Kontrolle nach dem ersten Lauf

Der Bericht des nächsten Laufs muss die A-URLs als "eingereicht" oder "(war bereits indexiert)" nennen.
Fehlen sie, hat die Routine die neue Queue nicht gesehen: Abgleich wiederholen oder Variante B freigeben.
