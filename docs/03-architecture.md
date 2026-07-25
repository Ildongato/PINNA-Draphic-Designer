# Technical architecture

## Required stack

Use stable production releases, not canary or preview packages.

- Next.js 16.2.x App Router or the latest stable patched 16.x release available in the environment
- React 19.2
- TypeScript in strict mode
- CSS Modules plus one global token/reset stylesheet
- `@fontsource-variable/instrument-sans` for a self-hosted Instrument Sans variable face, with a robust system fallback
- Persistent root-layout transition overlay using the Web Animations API as progressive enhancement
- IntersectionObserver for one-time media reveals
- Playwright
- `@axe-core/playwright`
- Vitest and React Testing Library where component tests add value

Do not introduce:

- Tailwind in a new build
- shadcn or another component library
- GSAP
- Lenis
- Three.js
- WebGL
- a second animation library
- an external CMS in the first version
- remote placeholder images

## Rendering model

- Use Server Components by default.
- Use Client Components only for menu state, copy-email, reveal observer, pointer line-field response and route-transition overlay state.
- Keep all project data local and typed.
- Generate project routes statically.
- Use `next/image` with explicit dimensions and accurate `sizes`.
- Use a same-size SVG fallback on media error.
- Render every essential content block in the initial HTML.

## Suggested source tree

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    not-found.tsx
    sitemap.ts
    robots.ts
    work/[slug]/
      page.tsx
  components/
    layout/
      SiteHeader.tsx
      MobileMenu.tsx
      SiteFooter.tsx
    hero/
      Hero.tsx
      PinnaField.tsx
    work/
      WorkGrid.tsx
      ProjectCard.tsx
      ProjectMedia.tsx
      ProjectMeta.tsx
    project/
      ProjectHero.tsx
      ProjectGallery.tsx
      ProjectDetails.tsx
      NextProject.tsx
    content/
      PracticeSection.tsx
      ProcessGrid.tsx
      ServicesIndex.tsx
      ContactSection.tsx
    interaction/
      Reveal.tsx
      ProjectTransitionLink.tsx
      CopyEmail.tsx
  data/
    site.ts
    projects.ts
    types.ts
  lib/
    media.ts
    project-transition.ts
  styles/
    utilities.css
    component modules

tests/
  e2e/
  unit/
```

## Progressive-enhancement rule

The server-rendered HTML and CSS must be complete.

JavaScript may add:

- reveal classes
- menu state
- pointer response
- copy confirmation
- route-transition enhancement

JavaScript may not be required for:

- reading project information
- seeing media
- scrolling
- navigating projects
- accessing contact information

## Project-route continuity

Do not enable Next.js experimental View Transition configuration.

Implement a persistent `ProjectTransitionProvider` inside the root layout. The provider owns a fixed overlay that survives App Router navigation.

On an enhanced project-card click:

1. Respect normal modified clicks, external targets and keyboard/browser conventions.
2. Skip enhancement when reduced motion is requested.
3. Prefetch the target route.
4. Read the selected media bounds and clone the same local image into the provider overlay.
5. Animate the fixed clone with the Web Animations API from the exact bounds to the viewport project-hero geometry.
6. Navigate through `router.push()` while the overlay remains mounted in the persistent root layout.
7. Let the destination hero signal readiness through a provider callback or a scoped custom event.
8. Crossfade the overlay into the destination hero, then remove it and restore normal focus/scroll behaviour.
9. Use a short hard timeout so navigation and cleanup can never remain blocked.
10. On any error, clear the overlay and navigate normally.

Direct routes, browser back/forward, reduced motion and JavaScript failure must remain correct without this enhancement.

## Media stability

Every image wrapper receives synchronous width, height and `aspect-ratio`.

Measure in Playwright before and after load. The difference must be no more than one CSS pixel.

The reveal may animate:

- an internal image scale
- a mask
- opacity
- metadata translation

It may not animate:

- wrapper width
- wrapper height
- grid tracks
- section height

## Pointer field

Use at most one requestAnimationFrame loop.

- Write pointer values into refs or CSS custom properties.
- Do not set React state on each frame.
- Stop when the component is offscreen.
- Stop when the document is hidden.
- Disable for coarse pointers and reduced motion.

## Performance budget

- Initial JavaScript target: under 150KB compressed where practical.
- No all-assets loader.
- Only genuinely above-the-fold media may use eager loading and high fetch priority.
- Do not use Next.js 16’s deprecated `priority` image prop. Use `preload` only for one confirmed image LCP, and never combine it with `loading` or `fetchPriority`.
- Lower Work and gallery media lazy-load.
- LCP target: 2.5 seconds or better.
- INP target: 200 milliseconds or better.
- CLS target: 0.1 or better.
