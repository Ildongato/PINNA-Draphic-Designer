# MASTER CODEX TASK — BUILD PINNA.DESIGN

You are Codex working inside the repository that contains this kit.

Build the complete website now.

This is an original design. Do not browse for a website to clone. Do not recreate another studio’s exact layout or interaction. The research file explains general design principles only.

## First actions

1. Read `AGENTS.md`.
2. Read every file in `docs/`.
3. Read `assets-manifest.json`.
4. Read `seed/site.ts`, `seed/projects.ts`, `seed/types.ts` and `seed/design-tokens.css`.
5. Inspect the repository, its current framework, source tree, dependencies and scripts.

If the repository is empty or does not contain a valid application, scaffold a new Next.js application in the repository root.

If an application already exists, inspect it first. Retain only code that meets this specification. Remove obsolete, duplicated or conflicting components and styles.

Do not ask questions before producing a complete first implementation. The supplied business information and project content are intentionally temporary and centrally replaceable.

---

# 1. Product objective

Create a production-grade portfolio for `pinna.design`, an independent graphic-design practice.

The finished website must feel:

- minimal
- editorial
- exact
- confident
- contemporary
- visually distinctive
- internationally credible
- technically calm
- worth a bespoke €20,000+ engagement

The website must not feel:

- like a template
- like a SaaS landing page
- like an animation demo
- like a film-production website
- like a generic agency homepage
- like a collection of small cards

The work is the principal visual material.

The interface should increase the perceived value of the work without competing with it.

---

# 2. Required technology

Use stable production releases, never canary or preview versions.

Use:

- Next.js 16.2.x or the latest stable patched Next.js 16.x available
- React 19.2
- TypeScript in strict mode
- App Router
- CSS Modules
- one global token/reset stylesheet
- `@fontsource-variable/instrument-sans` as the self-hosted initial variable font
- a robust system-font fallback
- system monospace for short labels only
- a persistent root-layout project-transition overlay using the Web Animations API as progressive enhancement
- IntersectionObserver for one-time reveals
- Playwright
- `@axe-core/playwright`
- Vitest and React Testing Library where component tests are useful

Do not introduce:

- Tailwind
- shadcn
- Material UI
- Chakra
- another component library
- GSAP
- Lenis
- locomotive-scroll
- Three.js
- WebGL
- another motion library
- an external CMS
- remote placeholder imagery
- stock photography
- an all-assets loading screen
- experimental Next.js View Transition flags

Use native document scrolling.

Use native CSS transitions, keyframes and the Web Animations API only where necessary.

---

# 3. Repository preparation

Move or copy the supplied seed files into the real source structure:

- `seed/site.ts` → `src/data/site.ts`
- `seed/projects.ts` → `src/data/projects.ts`
- `seed/types.ts` → `src/data/types.ts`
- adapt `seed/design-tokens.css` into the global stylesheet

Keep all supplied assets under `public/`.

Do not rename asset paths unless the project data is updated consistently.

Install `@fontsource-variable/instrument-sans` as a production dependency.

Create or normalize these scripts:

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint .",
  "typecheck": "tsc --noEmit",
  "test": "vitest run",
  "test:e2e": "playwright test"
}
```

Use pnpm when available.

Set up:

- strict TypeScript
- sensible ESLint configuration
- import aliases such as `@/*`
- Playwright with Chromium, WebKit and Firefox projects where environment support allows
- axe integration
- a test server configuration that uses the production build where practical

Do not hide type or lint errors through broad ignores.

---

# 4. Information architecture

Create these routes:

- `/`
- `/work/[slug]`
- custom not-found state

Homepage order:

1. Skip link
2. Fixed header
3. Hero
4. Work introduction
5. Selected Work grid
6. Practice
7. Behind the Work
8. Services
9. Contact
10. Footer

Project-page order:

1. Header
2. Project hero
3. Project statement and metadata
4. Editorial gallery
5. Deliverables
6. Next project
7. Footer

Do not add:

- blog
- testimonials
- pricing
- awards
- client-logo wall
- FAQ
- newsletter
- video
- showreel
- autoplay media
- fake statistics

---

# 5. Original design concept

Use the supplied design direction:

**Signal / Structure / Surface**

The Pinna identity is expressed through:

- **Signal:** the message is understood quickly.
- **Structure:** the grid and hierarchy are exact.
- **Surface:** project images and print-like texture provide character.

Use the supplied original Pinna mark and line field.

Interface colours:

```css
--ink: #050505;
--paper: #f4f3ee;
--paper-pure: #ffffff;
```

Project artwork supplies colour.

Do not add a separate interface accent colour unless required for focus contrast. Prefer `currentColor` and explicit outlines.

Use square or nearly square geometry.

Do not use:

- decorative gradients
- glass effects
- large shadows
- rounded cards
- pill-shaped navigation
- generic floating badges
- default dashboard components

---

# 6. Typography

Install `@fontsource-variable/instrument-sans` and import the Latin variable CSS needed for weights 400–700 and the width axis. This self-hosts the typeface through the application bundle. Keep a robust system fallback and do not add unlicensed font files. Load only the required subset/axis CSS and verify that no faux bold or italic is synthesized.

Apply globally:

```css
font-kerning: normal;
font-optical-sizing: auto;
font-synthesis: none;
text-rendering: optimizeLegibility;
```

Use a system monospace stack for years, counts and short technical labels only.

Display typography:

- large and responsive with `clamp()`
- tight but readable line-height
- intentionally art-directed line breaks
- `text-wrap: balance`
- no automatic shrink-to-fit JavaScript
- no more than three lines in the primary hero statement where possible

Body typography:

- at least 16px at 360px viewport width
- generally 17–19px on desktop
- line-height between 1.45 and 1.65
- maximum measure between 55 and 70 characters
- sentence case
- `text-wrap: pretty`

Metadata:

- 11–14px depending on viewport
- compact
- sufficient contrast
- never rendered as pills

The wordmark `pinna.design` remains text and remains visible during font loading.

Use fluid tokens similar to:

```css
--step--1: clamp(0.72rem, 0.68rem + 0.18vw, 0.82rem);
--step-0: clamp(1rem, 0.96rem + 0.2vw, 1.125rem);
--step-1: clamp(1.25rem, 1.08rem + 0.7vw, 1.75rem);
--step-2: clamp(1.75rem, 1.35rem + 1.55vw, 3rem);
--step-3: clamp(2.65rem, 1.65rem + 4vw, 6rem);
--step-4: clamp(4rem, 1.8rem + 8.8vw, 11.5rem);
```

Inspect every major line break at the required viewport sizes. Do not assume a fluid font size alone produces good typography.

---

# 7. Global layout

Desktop uses a shared 12-column grid.

Use:

```css
--page-x: clamp(18px, 2.8vw, 56px);
--grid-gap: clamp(12px, 1.35vw, 24px);
--section-space: clamp(112px, 15vw, 240px);
--section-space-small: clamp(72px, 9vw, 144px);
```

Do not place the Work section inside a narrow `max-width` container.

Long copy may use a readable text measure, but visual sections remain full width.

Support:

- safe-area insets
- `100svh` and `100dvh`
- narrow screens down to 320 CSS pixels
- no horizontal overflow
- browser zoom
- text zoom
- orientation change

Use CSS Grid for primary composition and normal document flow for section layout.

Avoid absolute positioning for large content structures unless the containing block has stable dimensions and the composition has a normal-flow mobile alternative.

---

# 8. Header

Create a fixed header aligned to the global grid.

Desktop:

- wordmark left
- Work, Practice and Contact right
- transparent background by default
- readable over paper and ink sections
- theme controlled explicitly with section state or IntersectionObserver
- no reliance on `mix-blend-mode` for essential legibility

Mobile:

- wordmark left
- Menu button right
- Menu target at least 44×44 CSS pixels
- fullscreen paper/ink menu
- Escape closes
- focus is trapped
- focus returns to trigger
- page scroll is locked and reliably restored

Navigation links use normal anchor semantics.

Add a working skip-to-content link.

Use `scroll-margin-top` for anchored sections and focused content.

Header transitions:

- use short opacity/colour transitions
- never disappear between theme states
- do not obscure focus indicators
- maintain a clear z-index system

---

# 9. Hero

Use a full first viewport on off-white paper.

Required content:

- eyebrow: `Independent graphic design practice`
- headline: `Clear systems. Distinctive forms.`
- supporting sentence from `site.ts`
- disciplines line
- availability/location microcopy
- original Pinna line field
- subtle scroll cue

Composition:

- not a centred marketing hero
- headline aligned to the 12-column grid
- line field occupies a substantial right or lower visual zone
- generous negative space
- hierarchy understandable immediately
- no visual object covers essential copy

A suggested desktop grid:

- eyebrow: columns 1–4 near the top content line
- headline: columns 1–8 in the lower-left region
- supporting copy: columns 9–12 or an offset readable block
- line field: columns 6–12, behind no essential copy
- discipline and status labels aligned to the lower grid

On mobile:

- place the line field between or below the text groups
- keep the headline readable without crop
- keep the first screen visually rich but not crowded
- avoid relying on viewport height to fit every element exactly

## Pinna line field

Create a React SVG component based on `/brand/pinna-field.svg`.

Use the supplied structure as an original Pinna asset.

Enhancement for fine pointers:

- track pointer position relative to the field
- update CSS variables or SVG transforms through one requestAnimationFrame loop
- maximum visual displacement around 6–10px
- line groups may respond with slightly different factors
- do not update React state every frame
- stop updates when the field is offscreen
- stop updates when the document is hidden

Touch:

- no pointer dependency
- static composition or extremely slow CSS-only breathing movement
- no drag interaction

Reduced motion:

- static final field

Do not use canvas or WebGL.

---

# 10. Work introduction

Transition from paper to near-black through normal document flow.

Do not build a long pinned cinematic scene.

Use a clean section boundary or a very short sticky threshold only when completely stable.

Include:

- `Selected work`
- date range `2024—2026`
- project count
- one concise line explaining that the projects are temporary concept studies

Do not animate the entire page background through a long scroll scrub.

A short colour transition when the section enters is sufficient.

The boundary may use the Pinna mark, a horizontal rule or a typographic count, but it must not look like a loading state.

---

# 11. Selected Work grid

This is the core of the homepage.

Section styling:

```css
background: #050505;
color: #f4f3ee;
padding-inline: clamp(14px, 1.4vw, 28px);
padding-block: clamp(110px, 14vh, 180px) clamp(150px, 20vh, 280px);
```

Desktop at 1024px and above:

```css
display: grid;
grid-template-columns: repeat(12, minmax(0, 1fr));
column-gap: clamp(12px, 1.35vw, 24px);
row-gap: clamp(110px, 11vw, 190px);
align-items: start;
```

Use the placement data from `projects.ts`.

Do not randomize.

Do not use JavaScript masonry.

Do not use `grid-auto-flow: dense` when it changes semantic order.

At 1440px:

- normal project covers are substantial visual surfaces
- at least three large projects appear in the first Work viewport
- the field approaches both viewport edges
- no card looks like a thumbnail

Tablet:

- two-column authored grid
- reduced offsets
- each project fills its column
- preserve semantic order

Mobile below 768px:

- one semantic column
- page padding 18–22px
- width from project data, approximately 82–100%
- intentional left/right alignment
- vertical gap approximately 90–145px
- no hover-only information
- no transforms that cause overflow

## Project card

A ProjectCard is a real link.

Structure:

- stable ProjectMedia
- title
- discipline
- year

Do not add card chrome.

No border.

No background panel.

No shadow.

No rounded rectangle.

Title and metadata sit outside media.

Hover on fine pointers:

- image scales internally from 1 to no more than 1.02
- metadata moves no more than 4–6px
- optional underline or rule response
- no custom cursor required
- card dimensions remain unchanged

Focus:

- clear and visible
- image and title receive one coherent focus state
- focus does not depend on colour alone

Use project title, discipline and year to create a concise accessible name.

---

# 12. Stable ProjectMedia component

Build one reusable media component.

The final wrapper geometry exists before image loading.

Use explicit width, height and aspect ratio from data.

Equivalent structure:

```tsx
<figure
  className={styles.media}
  style={{
    aspectRatio: `${width} / ${height}`,
    backgroundColor: dominantColor,
  }}
>
  <Image
    src={resolvedSource}
    alt={alt}
    width={width}
    height={height}
    sizes={sizes}
    loading={eager ? "eager" : "lazy"}
    fetchPriority={eager ? "high" : "auto"}
  />
  <span className={styles.reveal} aria-hidden="true" />
</figure>
```

Rules:

- `inline-size: 100%`
- `overflow: clip` or hidden
- image absolutely fills wrapper
- `object-fit: cover`
- wrapper never changes dimensions on load
- cached images reveal correctly
- failure swaps to `/brand/media-fallback.svg`
- no broken-image icon
- only genuinely above-the-fold covers may use `loading="eager"` and `fetchPriority="high"`
- lower covers and galleries lazy-load
- accurate `sizes` on every image
- do not use the deprecated Next.js `priority` image prop
- if performance testing identifies one unambiguous image LCP, `preload` may be used for that single image instead of `loading`/`fetchPriority`, never in combination

Do not create a smaller skeleton than the final frame.

The dominant background colour is the loading placeholder.

Reveal behaviour:

- content remains visible if observer or JavaScript fails
- enhancement may add a mask after hydration
- image may begin at scale 1.04
- image settles to 1 over roughly 700–900ms
- wrapper remains scale 1
- metadata follows slightly later
- reveal happens once

A safe progressive pattern is:

1. server renders the final visible state
2. a tiny client enhancer marks only upcoming in-view elements as revealable
3. the enhancer applies the initial masked state and schedules the reveal in the same or next frame
4. failure leaves the element visible

Reduced motion:

- final state immediately

Create a branded fallback path that preserves the same geometry.

---

# 13. Practice section

Return to off-white paper.

Use:

- label: `Practice`
- headline: `Clarity with character.`
- body from `site.ts`
- availability/location
- no portrait or fake team photograph

Composition:

- large statement across several grid columns
- body offset into a readable column
- not centred
- generous negative space
- strong relationship between headline and body

This section should clarify the working philosophy without becoming a long manifesto.

Use one or two sentences about systems, identity and visual direction. Avoid empty claims such as “we are passionate about creating unique experiences.”

---

# 14. Behind the Work

Use the supplied assets under `/images/process/`.

Create an authored contact-sheet section.

Desktop:

- 12-column composition
- six to eight images
- different aspect ratios
- small captions
- no carousel
- no drag interaction
- restrained overlap only when readable

Mobile:

- clean vertical sequence
- no overlap
- captions visible
- logical reading order

Animation:

- simple one-time reveal
- no continuous parallax required
- content visible without JavaScript

Do not use all images at exactly the same width.

Treat the process assets as visual evidence of typography, grids, colour and material—not as decorative filler.

---

# 15. Services

Present the supplied services as a typographic index.

Use one row per service with:

- index number
- service name
- optional short descriptor only when useful

Do not use icons.

Do not use cards.

Do not use an accordion unless there is real additional content.

Use hairlines and spacing to organize the list.

Desktop may use two aligned columns; mobile remains a clear single-column sequence.

---

# 16. Contact and footer

Use a clear on-page contact section rather than hiding contact inside a modal.

Content:

- large line: `Let’s make something people remember.`
- email: `hello@pinna.design`
- availability
- location placeholder
- social links

Email behaviour:

- email remains a normal `mailto:` link
- add a separate copy control
- announce copied status through an accessible live region
- copied state resolves after roughly 1.2 seconds
- no generic toast

Footer:

- wordmark
- current year
- social links
- small temporary-project disclaimer when appropriate
- minimal
- no decorative 3D object

Replace placeholder `#` social links with disabled or clearly non-navigation placeholders until real URLs are supplied. Do not create links that unexpectedly reload the page.

---

# 17. Project routes

Create all routes from local project data.

Use `generateStaticParams`.

Use dynamic metadata.

Direct loading must work without transition state.

## Project hero

- large cover filling the visual field
- near-full viewport
- stable dimensions
- title and metadata clearly separated from the image or placed on a guaranteed-contrast surface
- no video controls
- no browser-frame mockup around the primary image

Do not place white text over a bright cover unless a tested contrast layer guarantees legibility.

Prefer a separate title/meta band when the cover palette is unpredictable.

## Project information

Use:

- summary as large statement
- description in readable measure
- year
- discipline
- sector
- deliverables

On wide screens, metadata may be sticky.

Do not make the sticky element taller than the viewport.

Disable stickiness on narrow screens.

## Gallery

Use all four supplied assets in a varied editorial sequence:

1. full-width system study
2. portrait application beside or after readable copy
3. full-width detail crop
4. wide editorial spread

Create variation through grid spans and whitespace, not card styling.

Captions are small and aligned to the same grid.

Do not repeat the cover as every gallery image.

Keep every gallery wrapper dimensionally stable.

## Deliverables

Use a compact typographic list.

Do not exaggerate fictional outcomes.

## Next project

Use the next item in project order.

Show:

- label
- next title
- large preview
- real link

Keep the preview substantial.

Ensure the final project links back to the first project.

---

# 18. Project-route continuity

Do not enable `experimental.viewTransition` or rely on experimental Next.js transition integration.

Build a production-safe transition as progressive enhancement through a persistent client provider mounted in the root layout.

Suggested components:

- `ProjectTransitionProvider`
- `ProjectTransitionLink`
- `ProjectTransitionOverlay`
- `useProjectTransition`
- a destination-hero readiness hook

The provider must remain mounted while App Router pages change.

Enhanced project-card click flow:

1. Preserve normal browser behaviour for modified clicks, new tabs, downloads and external links.
2. Skip the enhancement when reduced motion is requested.
3. Prefetch the target route.
4. Decode the selected local cover when necessary.
5. Read the clicked media bounds.
6. Render a fixed overlay clone in the persistent provider using the same image, crop and border radius.
7. Animate the clone through the Web Animations API from the exact source bounds to the project-hero viewport geometry.
8. Start `router.push()` while the overlay remains above the changing route.
9. The destination project hero reports readiness to the provider.
10. Crossfade the overlay into the destination hero and remove it.
11. Move focus to the project page’s main heading or main region without producing a visible scroll jump.
12. Clear every temporary style, timer and pending state.

Fail-safe requirements:

- navigation proceeds even when image decoding fails
- a maximum timeout prevents a stuck overlay
- any rejected animation clears state and navigates normally
- direct project URLs work independently
- browser back/forward works independently
- reduced-motion navigation is immediate or uses a brief root fade
- no second loader
- no blank frame
- no duplicate-image flash
- no global scroll lock after completion
- only one transition may run at a time

Visual direction:

- duration around 600–850ms
- restrained custom ease
- no bounce
- no page-wide wipe
- no pre-transition shrinking
- the selected cover expands cleanly into the project hero

Do not wait for every gallery asset. Only source cover and destination hero readiness matter.

---

# 19. Motion system

Use these timing families:

```css
--duration-micro: 180ms;
--duration-control: 280ms;
--duration-reveal: 620ms;
--duration-route: 820ms;
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
```

Allowed motion categories:

- reveal
- continuity
- navigation feedback
- subtle ambient line-field response

Do not add arbitrary decorative motion.

Never animate long body copy character by character.

Avoid blur animation.

Avoid height and width animation where transform or opacity is sufficient.

Do not add scroll-linked transforms required for understanding.

Do not create perpetual ticker text or marquee motion.

Reduced motion:

- remove ambient line-field motion
- skip the project-transition overlay
- show reveal final states
- retain all structure and navigation

---

# 20. Accessibility

Target WCAG 2.2 AA.

Implement:

- `lang="en"` initially
- skip link
- semantic header, nav, main, sections and footer
- logical heading hierarchy
- useful link labels
- visible `:focus-visible`
- focused items never hidden behind the fixed header
- `scroll-margin-top`
- minimum 24×24 CSS-pixel targets
- 44×44 preferred for navigation and icon controls
- no hover-only content
- no drag-only interaction
- mobile-menu semantics, focus trap, Escape and restoration
- meaningful project alt text
- decorative assets use empty alt text
- live region for copied status
- reduced-motion support
- text zoom and reflow
- sufficient text and non-text contrast

Run axe in Playwright.

Resolve critical and serious violations.

Manually verify keyboard focus order. Automated testing alone is insufficient.

---

# 21. SEO and metadata

Add:

- title and description from `site.ts`
- canonical metadata base
- Open Graph image from `/brand/og-image.webp`
- favicon from `/brand/favicon.svg`
- dynamic project titles and descriptions
- semantic project URLs
- sitemap
- robots metadata
- custom not-found page
- JSON-LD for a ProfessionalService or appropriate design practice only when every included detail is factual

Do not add fake review, award or rating schema.

Do not invent a postal address.

Use `[CITY, COUNTRY]` only in visible temporary content and clearly centralize it for replacement.

---

# 22. Performance

Target:

- LCP ≤ 2.5 seconds
- INP ≤ 200 milliseconds
- CLS ≤ 0.1

Requirements:

- server-render primary content
- no global preloader
- no all-project eager loading
- high fetch priority only for the genuine LCP/above-the-fold media; keep all other media lazy
- explicit image dimensions
- accurate image `sizes`
- local WebP assets
- dynamic imports only for genuinely optional client interaction
- no WebGL
- no smooth-scroll dependency
- no React state update on every pointer frame
- one pointer RAF maximum
- disconnect observers
- remove listeners
- pause line-field response while hidden or offscreen
- no continuous background animation on mobile
- prevent layout thrashing

Do not add a heavy web-vitals dashboard to the user-facing application.

Use Lighthouse or browser tooling during verification when available, but do not optimize to a synthetic score at the expense of design clarity.

---

# 23. Testing

Create Playwright tests for:

1. homepage renders
2. hero copy is visible
3. header links work
4. all project cards are links
5. every project route loads
6. direct project route loads
7. mobile-menu keyboard flow
8. copy-email state
9. browser back from a project
10. next project
11. no horizontal overflow at required mobile sizes
12. reduced-motion mode
13. image-failure fallback
14. media-wrapper stability
15. no critical axe violations

## Media-stability test

Throttle or delay image requests.

Record each media wrapper’s `getBoundingClientRect()` before and after image completion.

Width and height differences may not exceed one CSS pixel.

The test should cover at least:

- one portrait cover
- one landscape cover
- one square cover
- one gallery image

## Viewports

Test:

- 1440×900
- 1280×800
- 1024×768
- 768×1024
- 430×932
- 390×844
- 360×800

Capture at least:

- homepage desktop
- Work desktop
- homepage mobile
- project desktop
- project mobile

Store screenshots under a test-output or artifacts directory ignored by production builds.

## Keyboard test

Verify:

- skip link
- header navigation
- mobile menu
- project cards
- copy control
- project route
- next project

## Failure test

Intercept one image request and fail it.

Confirm:

- fallback appears
- geometry remains stable
- no broken-image icon appears
- accessible text remains meaningful

---

# 24. Visual QA

At 1440×900:

- hero statement is immediately readable
- line field is substantial but secondary to the message
- the first Work viewport contains at least three large covers
- Work approaches both viewport edges
- project metadata sits outside media
- there are no small framed thumbnails

At 1024×768:

- project media remains substantial
- typography does not collide with the header
- grid remains intentional
- no cover becomes an arbitrary short rectangle

At 768×1024:

- the two-column or tablet composition reads deliberately
- offsets do not create excessive gaps
- labels remain legible

At 390×844 and 360×800:

- one-column editorial sequence
- covers use approximately 82–100% of available width
- no horizontal overflow
- no hover dependency
- menu and contact are easy to operate
- display text does not clip

Project pages:

- hero is stable and legible
- title/meta contrast is reliable
- gallery has varied rhythm
- sticky metadata does not overlap content
- next project is obvious

---

# 25. Implementation sequence

Follow this order:

1. Inspect repository.
2. Scaffold or repair application.
3. Establish tokens and typography.
4. Build the server-rendered static homepage.
5. Build stable ProjectMedia.
6. Build Selected Work grid.
7. Build project routes.
8. Add mobile menu and contact interaction.
9. Add progressive reveal enhancement.
10. Add the persistent project-transition overlay enhancement.
11. Add tests.
12. Run lint.
13. Run typecheck.
14. Run unit tests.
15. Run Playwright tests.
16. Run production build.
17. Fix all confirmed failures.
18. Remove obsolete files and code.
19. Rerun affected tests.
20. Produce final summary.

Do not stop after scaffolding.

Do not leave TODO blocks for required features.

Do not claim a test passed unless it was run.

When an ambitious effect is unstable, remove or simplify it. A clean stable solution is the intended premium result.

---

# 26. Final response

Report:

- architecture created
- design direction implemented
- routes created
- key components created
- supplied assets used
- accessibility work
- performance work
- tests run and exact results
- production-build result
- remaining limitations, if any

The release standard is a complete, calm and memorable graphic-design portfolio—not the maximum possible number of effects.
