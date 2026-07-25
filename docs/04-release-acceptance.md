# Release acceptance criteria

A release is not approved when any critical item fails.

## Build and code

- Production build passes.
- TypeScript strict checks pass.
- ESLint passes.
- Required tests pass.
- No console errors or React warnings.
- No broken asset requests.
- No duplicated homepage or legacy styles remain.
- Project and site content are centralized.
- Direct project URLs work.

## Visual

- The website looks original to Pinna.
- No section resembles a generic SaaS template.
- The hero communicates the practice immediately.
- Colour comes from artwork rather than interface effects.
- Project covers are substantial and borderless.
- Typography remains readable at every required breakpoint.
- There are no accidental line breaks, clipping or overlap.
- There is no horizontal overflow.
- Mobile is intentionally composed.

## Required viewports

- 1440×900
- 1280×800
- 1024×768
- 768×1024
- 430×932
- 390×844
- 360×800

## Work grid

At 1440px:

- Covers feel like primary visual surfaces.
- At least three substantial projects are visible in the first Work viewport.
- Metadata sits outside media.
- The grid approaches the viewport edges.

At mobile widths:

- Covers occupy approximately 82–100% of available width.
- There is no hover-dependent information.
- Project order remains logical.

## Motion

- Native scroll is always controllable.
- There is no scroll hijacking.
- There is no smooth-scroll library.
- No content remains hidden when animation initialization fails.
- Reveals do not change wrapper geometry.
- View transitions are enhancement only.
- Reduced-motion mode is complete.

## Accessibility

Target WCAG 2.2 AA:

- semantic landmarks
- logical headings
- skip link
- visible focus
- focus not obscured
- keyboard navigation
- minimum 24×24 targets, 44×44 preferred
- meaningful alt text
- no hover-only information
- accessible mobile menu
- copy status announced
- reflow and zoom support
- reduced motion respected

## Media loading

Under throttled loading:

- wrappers have final dimensions before image completion
- before/after width and height differ by no more than one pixel
- errors show a same-size fallback
- no broken-image icon appears
- media causes no layout shift

## Routes

- Every Work card opens.
- Direct `/work/:slug` loads.
- Browser back works.
- Next project works.
- View-transition failure still navigates.
- There is no second loader or blank intermediate page.

## Performance

- LCP ≤ 2.5s target
- INP ≤ 200ms target
- CLS ≤ 0.1 target
- one pointer RAF at most
- no WebGL
- no continuously running animation while offscreen
- only critical assets are eager
