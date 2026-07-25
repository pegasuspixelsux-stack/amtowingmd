# A&M Repair & Towing Website — Design Spec

## Source of truth for content

All business facts, section copy, headlines, CTA text, disclaimers, and the
FAQ content are defined verbatim in the master specification pasted into
this project's `CLAUDE.md`. That document is authoritative for content —
this spec does not restate it. Where a second source (see "Imported
reference" below) offers different wording for the same element, the
master spec's exact wording wins.

Do not invent: street address, hours beyond 24/7, social accounts, extra
phone numbers, pricing, guarantees, certifications, awards, reviews, or
testimonials.

## Imported reference

A Claude Design project (`AM Repair Towing.dc.html`, owned by a different
account, imported via the DesignSync/claude_design MCP at the user's
request) provided a structural and content walkthrough of the same site.
Decisions on how it's used:

- **Content**: master spec text wins verbatim wherever the master spec
  states exact copy (headlines, CTAs, disclaimers, success message, FAQ
  question titles). The imported file's copy is not used where it
  paraphrases the master spec differently.
- **Visual design**: NOT used. The imported file links a "Broadsheet"
  design system — serif type, teal/magenta accent colors, halftone and
  animated CMYK-misregistration print effects. This directly conflicts
  with the master spec's mandated palette and its explicit "no flashy
  effects, no distracting animation, clarity over decoration" requirement
  (a visitor may be mid-emergency). The site is built with the on-brand
  visual system below instead.
- **Structure**: used as a helpful cross-check for section grouping,
  form field set, and FAQ topics, but the master spec's section order
  (Section 30) and exact field list (Section 14) are authoritative where
  they differ. Notably: the master spec lists Vehicle Year, Vehicle Make,
  and Vehicle Model as three separate form fields — used as three fields,
  not combined into one.
- **Hero image**: the imported file animates a 3-photo crossfade carousel.
  Not used — the master spec calls for a single `hero-placeholder.jpg`,
  and the earlier design discussion already ruled out adding extra photo
  slots beyond the hero and about-section images. One static hero image.

## Visual system

**Palette** (extends the master spec's 5 mandated colors):
| Token | Hex | Use |
|---|---|---|
| Fire Red | `#D32F2F` | Primary CTA buttons, emergency band, active states |
| Fire Red Dark | `#B71C1C` | Hover/active state on red buttons |
| Safety Yellow | `#FFC107` | Small accents, badges, signature stripe |
| Charcoal | `#212121` | Headings, body text, footer background |
| Light Gray | `#F5F5F5` | Page background |
| White | `#FFFFFF` | Card surfaces |
| Hairline Gray | `#E3E3E3` | Card borders / dividers on white |

**Type**: Headline face **Barlow Condensed** (weight 700), body face
**Inter**, both loaded via `next/font/google` (no external requests,
self-hosted at build time). Headlines stay mixed case — the spec
disallows excessive uppercase. Body sizes stay generous for mobile
legibility (16px+ base).

**Signature element**: a thin (6–8px) diagonal hazard-stripe rule in
charcoal/safety-yellow — the chevron striping found on a real tow truck's
rear panel — used in exactly two places: the top edge of the Emergency
CTA band, and a slim divider between the Hero and Trust Bar. This is the
one deliberate, trade-appropriate visual flourish; everywhere else stays
plain and restrained per the master spec's "clarity over decoration" rule.

**Buttons**: solid Fire Red, 8px corner radius, minimum 48px tall, bold
white text, subtle lift on hover, visible focus ring. Outline/secondary
variant (white text, white border) for use over the hero photo.

**Cards**: white surface, 8px radius, 1px hairline border, no heavy
shadows.

**Icons**: Lucide React, 24px stroke icons, colored charcoal or fire red
depending on context.

## Component architecture

Matches the master spec's recommended structure (Section 1) —
`src/components/*.tsx`, one component per named section, `src/lib/constants.ts`
for the centralized `BUSINESS` object. Server components by default;
`"use client"` only where interaction is required:

- **Header** — sticky, server-rendered except the mobile nav toggle,
  which is a small client sub-component.
- **FAQ** — client component (accordion open/close state).
- **ReleaseForm** — client component (controlled inputs, validation,
  local success state). No network call — matches the earlier decision
  to keep this UI-only for now; structured so a real submit handler can
  be dropped in later without reshaping the component.
- **MobileCallBar** — plain server component. Fixed positioning is pure
  CSS; no JS/resize-listener state is needed (unlike the imported
  reference's `isMobile` JS approach), so this stays a static element
  hidden above the `md` breakpoint via Tailwind.
- Everything else (Hero, TrustBar, About, Services, EmergencyCTA,
  TowedVehicle, PersonalBelongings, WhyChooseUs, FinalCTA, Footer) is a
  plain server component — static content, no client JS needed.

Responsive behavior throughout uses Tailwind breakpoints (CSS), not a
JS-driven `isMobile` flag — simpler, no hydration mismatch risk, and
consistent with "minimal JavaScript" (master spec Section 27).

## Images

`/public/images/hero-placeholder.jpg` and `/public/images/towing-placeholder.jpg`
only, per the master spec and the earlier decision to skip the roadside/
team placeholder spots for the initial layout. Rendered via `next/image`
with `fill` + a sized wrapper so they stay responsive.

## Out of scope for this pass

- Backend/email wiring for the release form (explicitly deferred).
- Any content, image, or design element not present in the master spec.
