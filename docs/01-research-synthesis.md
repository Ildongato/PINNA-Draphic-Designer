# Research synthesis — current premium design-portfolio patterns

Checked July 2026. This document deliberately omits studio names, URLs and screenshots. It contains only transferable principles so the Pinna website remains original and Codex has no site to imitate.

## 1. Work-first hierarchy

The strongest graphic-design portfolios treat the work as the main interface rather than placing it inside decorative UI.

Transferable rules:

- project imagery is large, borderless and dimensionally stable
- titles, disciplines and years sit outside the media
- the first meaningful scroll reveals substantial work, not sales sections
- visual variety comes from the projects, not from changing component styles
- project order is authored and understandable

## 2. Typography as permanent identity

Project artwork changes from case to case. Typography, spacing and information hierarchy create continuity.

Transferable rules:

- use one carefully tuned primary grotesk rather than an arbitrary font collection
- make display line breaks intentional at every breakpoint
- use compact metadata without sacrificing contrast
- keep body copy calm, sentence case and limited to a readable measure
- let alignment and spacing create character before adding effects
- retain clear fallback behaviour during font loading

## 3. Structured information can feel premium

High-end sites do not need to hide practical information. Clear project labels, dates, categories, deliverables and contact details can become part of the composition.

Transferable rules:

- capabilities are an editorial index, not a grid of marketing cards
- project descriptions are specific and concise
- contact information is direct and always reachable
- navigation labels use familiar language
- visual hierarchy separates primary work from supporting information

## 4. Authored grids outperform random layouts

Irregularity feels sophisticated only when it is composed. Random masonry and runtime-shuffled layouts weaken rhythm and make responsive behaviour unpredictable.

Transferable rules:

- use a shared 12-column desktop grid
- assign project spans and offsets in data
- preserve semantic order
- reduce complexity at tablet widths
- art-direct mobile independently as a one-column editorial sequence
- test the actual visual field at named viewport sizes

## 5. One signature motif is enough

Distinctive portfolios usually have one ownable interface idea rather than a different effect in every section.

For Pinna, that motif is the original line field and vertical-spine mark.

Transferable rules:

- repeat the motif with restraint
- let it support hierarchy rather than cover content
- keep the base version as DOM/SVG
- allow only a small pointer response on fine-pointer devices
- make the static version look complete

## 6. Motion should explain continuity

Premium motion is directional, brief and purposeful.

Transferable rules:

- reveal stable media without changing layout geometry
- use motion to confirm menu, copy and route states
- use cover-to-project continuity as progressive enhancement
- avoid scroll hijacking, endless inertia and long pinned scenes
- remove motion when it does not improve comprehension
- design reduced-motion states rather than merely disabling CSS

## 7. Case studies need editorial rhythm

A project page should not be a repeated stack of identical cards.

Transferable rules:

- combine full-width systems, portrait applications, details and spreads
- vary grid spans and whitespace while retaining common alignment lines
- pair concise explanation with visual evidence
- keep captions small but legible
- end with a substantial next-project preview
- ensure direct project URLs work independently from transitions

## 8. Minimalism is operational discipline

Minimal design is not an empty screen or a lack of content. It is the removal of elements that do not improve hierarchy, orientation or meaning.

Transferable rules:

- no decorative gradients, glass panels or generic rounded cards
- no fake statistics, awards, testimonials or client walls
- no loading screen for assets below the fold
- no UI component simply because a library provides it
- no interaction that requires explanation
- no content hidden until JavaScript succeeds

## 9. Technical calm is visible quality

Visitors perceive loading stability, scroll control, focus behaviour and clear routing as part of the design.

Transferable rules:

- reserve media geometry before loading
- render primary content on the server
- use native scrolling
- use local assets
- give eager/high fetch priority only to confirmed above-the-fold media
- make keyboard and touch behaviour first-class
- fail gracefully when an image, animation or browser API is unavailable

## 10. Pinna synthesis

The final direction is not a collage of examples. It is one original system:

**Signal / Structure / Surface**

- **Signal:** immediate positioning and clear navigation
- **Structure:** exact typography, grid and information
- **Surface:** colourful project artwork, paper-like restraint and the Pinna line field

The result should feel quiet, sharp and memorable because every decision is controlled—not because every element moves.
