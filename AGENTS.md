# AGENTS.md — Pinna.design

## Mission

Build an original, production-grade portfolio for an independent graphic-design practice.

The result must be clearer, more refined and more technically reliable than a typical award-site experiment. Premium quality comes from typography, composition, media scale, content and restraint—not from maximum animation.

Read before editing:

- `docs/01-research-synthesis.md`
- `docs/02-design-direction.md`
- `docs/03-architecture.md`
- `docs/04-release-acceptance.md`
- `docs/05-editing-guide.md`
- `assets-manifest.json`
- `seed/site.ts`
- `seed/projects.ts`
- `seed/types.ts`
- `seed/design-tokens.css`

## Commands

Use pnpm when available.

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
```

Create missing scripts when necessary.

Do not finish while build, typecheck or required tests fail.

## Stack

Use stable production releases:

- Next.js 16.2.x or the latest stable patched Next.js 16.x
- React 19.2
- TypeScript strict
- App Router
- CSS Modules and global CSS tokens
- `@fontsource-variable/instrument-sans` for a self-hosted Instrument Sans variable face, plus a robust system-font fallback
- Playwright
- `@axe-core/playwright`
- Vitest where useful

Do not add Tailwind, shadcn, a component library, GSAP, Lenis, Three.js, WebGL or another animation framework in a new build. Do not enable experimental Next.js View Transition flags.

## Architecture

- Server Components by default.
- Client Components only for genuine interaction.
- Native document scrolling.
- No custom wheel handling.
- No all-assets preloader.
- Local typed content.
- Static project-route generation.
- Explicit image dimensions.
- A persistent root-level route-transition overlay using the Web Animations API as optional progressive enhancement.
- All essential content visible without animation.

## Design rules

- Preserve the supplied original Pinna mark and placeholder artwork.
- Interface palette: `#050505` and `#F4F3EE`.
- Project artwork supplies colour.
- Use predominantly square geometry.
- No glassmorphism, decorative gradients, pill navigation, generic cards, fake awards, testimonials or video-production language.
- Work images are large surfaces, not thumbnails inside boxes.
- Titles and metadata sit outside media.
- Use Instrument Sans initially and a system monospace for short metadata.
- Body text is at least 16px on the smallest viewport.
- Long copy is sentence case and readable.
- Use authored 12-column desktop placement and a separately designed one-column mobile flow.

## Motion rules

Allowed:

- one-time mask reveals
- subtle image scale within a stable crop
- mobile-menu transition
- small pointer response in the line field
- cover-to-project continuity through the persistent route-transition overlay
- short control feedback

Not allowed:

- scroll hijacking
- smooth-scroll libraries
- content starting invisible before JavaScript
- wrapper-size animation
- elastic motion
- heavy blur
- continuous movement behind copy
- pointer-dependent essential information
- runtime-random layouts

Reduced-motion mode shows final states immediately.

## Accessibility

Target WCAG 2.2 AA.

Include:

- skip link
- semantic landmarks
- logical headings
- visible focus
- focus not obscured
- keyboard project navigation
- accessible menu
- Escape and focus restoration
- useful alt text
- no hover-only information
- 24×24 minimum pointer target; 44×44 preferred
- reflow at narrow widths and zoom
- reduced motion

## Performance

Targets:

- LCP ≤ 2.5s
- INP ≤ 200ms
- CLS ≤ 0.1

Use:

- local media
- explicit dimensions
- accurate `sizes`
- `loading="eager"` / `fetchPriority="high"` only for genuinely above-the-fold media
- never use Next.js 16’s deprecated `priority` image prop
- use `preload` only for one confirmed image LCP and never together with `loading` or `fetchPriority`
- lazy loading below the fold
- one pointer RAF maximum
- cleanup of observers and listeners
- no WebGL

## Verification

Test:

- 1440×900
- 1280×800
- 1024×768
- 768×1024
- 430×932
- 390×844
- 360×800
- keyboard only
- reduced motion
- slow loading
- direct project URL
- browser back
- media failure

For media wrappers, compare bounds before and after image load. Width and height may differ by no more than one CSS pixel.

Report exactly what changed and what was tested. Do not claim unverified results.
