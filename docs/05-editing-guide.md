# Editing guide

## Replace temporary information

Edit:

- `src/data/site.ts`
- `src/data/projects.ts`

Replace:

- `[CITY, COUNTRY]`
- placeholder social URLs
- temporary project descriptions
- placeholder project names when required

## Replace project images

Keep each path stable where possible:

```text
public/images/projects/<slug>/cover.webp
public/images/projects/<slug>/system.webp
public/images/projects/<slug>/application.webp
public/images/projects/<slug>/detail.webp
public/images/projects/<slug>/spread.webp
```

When replacing an asset:

1. update width and height in project data
2. update alt text
3. preserve a deliberate crop
4. use WebP or AVIF
5. keep the media fallback
6. rerun media-stability tests

## Replace placeholder copy

All current projects are fictional design studies. Do not present them as commissioned client work.

When real work is inserted:

- describe the problem and design decision specifically
- avoid unsupported outcome claims
- name collaborators accurately
- include deliverables that were actually supplied
- retain concise project summaries for scanning

## Typography

The initial build should install `@fontsource-variable/instrument-sans` and import only the Latin variable weight/width CSS required by the site. Keep the declared system fallback and do not add unlicensed font binaries.

The final licensed brand font may replace it later. Font files are deliberately not included in this kit.

When replacing the typeface:

- self-host WOFF2
- configure the correct weights or variable axes
- disable faux synthesis
- test fallback and loading behaviour
- retest every display line break
- verify punctuation, numerals and diacritics
