# Pinna Codex Build Kit

Deze zelfstandige kit bevat alles om `pinna.design` zonder Lovable en zonder een te kopiëren referentiewebsite in Codex te bouwen.

## Snelste werkwijze

1. Maak of open een Git-repository.
2. Pak deze ZIP uit in de root van de repository.
3. Zorg dat `AGENTS.md` en `MASTER-CODEX-PROMPT.md` in de root staan.
4. Open Codex voor die repository.
5. Plak de inhoud van `PASTE-INTO-CODEX.txt` als taak.
6. Laat Codex de volledige taak uitvoeren.
7. Controleer de gerapporteerde terminalresultaten, tests en screenshots vóór merge of deployment.

Codex werkt het betrouwbaarst met duidelijke repository-instructies, een werkende omgeving en expliciete testcommando’s. Daarom bevat de kit zowel `AGENTS.md` als een uitvoerige mastertaak.

## Belangrijkste bestanden

- `AGENTS.md` — blijvende Codex-instructies
- `MASTER-CODEX-PROMPT.md` — volledige bouwopdracht
- `PASTE-INTO-CODEX.txt` — korte startprompt
- `docs/` — geanonimiseerde researchsynthese, art direction, architectuur, releasecriteria en editing guide
- `seed/` — centrale content, projectdata, typen en designtokens
- `public/` — lokale merk-, project- en procesassets
- `assets-manifest.json` — alle assets met afmetingen en metadata
- `SHA256SUMS.txt` — integriteitscontrole

## Originele ontwerp­richting

De site gebruikt geen externe referentie als template. De eigen richting heet:

**Signal / Structure / Surface**

- Signal: de bezoeker begrijpt onmiddellijk wat Pinna doet.
- Structure: typografie, grid en informatie zijn exact.
- Surface: de projectbeelden en subtiele printkwaliteit leveren karakter.

## Assets

De kit bevat:

- 10 geoptimaliseerde projectcovers
- 40 aanvullende case-studybeelden
- 8 procesbeelden
- origineel Pinna-merk
- originele hero line-field
- favicon
- OG-afbeelding
- mediafallback
- graintexture
- drie contact sheets voor snelle visuele controle

Alle projectbeelden zijn fictieve, originele placeholders. Ze vertegenwoordigen geen echt klantwerk.

## Typografie

Losse fontbestanden zijn bewust niet opgenomen. De Codex-opdracht installeert de OFL-gelicentieerde variabele Instrument Sans via Fontsource en bundelt die lokaal. Vervang dit later door het definitieve gelicentieerde merkfont.

## Geen referentieclone

De research in de kit is volledig teruggebracht tot abstracte ontwerpprincipes. Er staan geen externe studio’s of websites in de uitvoeringsinstructies die Codex moet namaken.
