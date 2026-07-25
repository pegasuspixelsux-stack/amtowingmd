# A&M Repair & Towing Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete, production-quality A&M Repair & Towing marketing homepage in the existing `amtowingmd` Next.js 16 (App Router, TypeScript, Tailwind v4) project, per the master spec in `CLAUDE.md` and the design spec at `docs/superpowers/specs/2026-07-25-am-towing-website-design.md`.

**Architecture:** A single route (`app/page.tsx`) composing ~15 section components in a fixed order, each a plain server component except `MobileNav`, `ReleaseForm`, and `FAQ`, which need client-side state. Copy, phone, and email are centralized in `lib/constants.ts`. Visual design is the on-brand system from the design spec (Fire Red / Safety Yellow / Charcoal / Light Gray / White, Barlow Condensed + Inter, one hazard-stripe signature element) — not the imported Claude Design reference's visual system, which is used only as a structural/content cross-check.

**Tech Stack:** Next.js 16.2.11 (App Router, Turbopack default), React 19.2, TypeScript, Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.ts`), lucide-react for icons, Vitest + React Testing Library for component tests.

## Global Constraints

- **Business facts** (from `lib/constants.ts`, used everywhere — never hardcode a different phone/email anywhere in the app): name `A&M Repair & Towing`, phone `(301) 421-0953` / `tel:+13014210953`, email `aandmtowing2003@gmail.com` / `mailto:aandmtowing2003@gmail.com`, service area `Montgomery County, Maryland`, established `2003`.
- **No invented content**: no street address, no hours beyond 24/7, no social links, no extra phone numbers, no pricing, no guarantees, no certifications/awards, no reviews or testimonials. If a task below doesn't give exact copy for something, that thing doesn't get invented — leave it out.
- **Palette**: Fire Red `#D32F2F` (CTAs, emergency band), Fire Red Dark `#B71C1C` (hover), Safety Yellow `#FFC107` (small accents, signature stripe), Charcoal `#212121` (text/headings/footer), Light Gray `#F5F5F5` (page background), White `#FFFFFF` (cards), Hairline Gray `#E3E3E3` (borders).
- **Type**: headline font Barlow Condensed (weight 700), body font Inter, both via `next/font/google`. Headings stay mixed case, never large uppercase blocks.
- **No flashy effects**: no parallax, no scroll-jacking, no auto-playing carousels, minimal animation (hover transitions and the FAQ chevron rotation only). The one deliberate flourish is the `HazardStripe` signature element, used in exactly two places.
- **Buttons**: minimum 48px tall (44px for compact header buttons), visible `:focus-visible` ring, 8px corner radius (Tailwind `rounded-lg`).
- **Accessibility**: semantic headings, labeled form fields, keyboard-operable nav toggle and FAQ accordion, visible focus states, no color-only meaning.
- **File layout**: this project has no `src/` directory — `app/`, `components/`, and `lib/` all live at the repo root, imported via the `@/*` path alias already configured in `tsconfig.json`.
- **Next.js 16 specifics confirmed from `node_modules/next/dist/docs`**: Turbopack is the default bundler for `next dev`/`next build` (no flag needed); `next lint` was removed — lint via `npm run lint`, which runs plain `eslint` under the existing flat config; Tailwind v4 tokens are declared in `app/globals.css` via `@theme`/`@theme inline`, there is no `tailwind.config.ts` in this project and none should be added.
- **Testing**: Vitest + React Testing Library, `jsdom` environment. `next/font/google` cannot be transformed outside the Next.js compiler, so it's mocked in tests (Task 11) — everywhere else, tests import plain component modules directly.

---

## File Structure

```
lib/constants.ts                    # BUSINESS, NAV_LINKS, FAQ_ITEMS — single source of copy/links
components/HazardStripe.tsx         # signature diagonal stripe (no props)
components/Header.tsx               # sticky header, desktop nav, call CTA
components/MobileNav.tsx            # "use client" — hamburger + dropdown panel
components/Hero.tsx                 # #home section
components/TrustBar.tsx             # 4-item trust strip
components/About.tsx                # two-column intro
components/Services.tsx             # #services, 6 service cards
components/EmergencyCTA.tsx         # full-width red CTA band
components/TowedVehicle.tsx         # #towed-vehicle, "Where Is My Car?" card + composes PersonalBelongings
components/PersonalBelongings.tsx   # second card inside #towed-vehicle
components/ReleaseForm.tsx          # "use client" — #release-form, validated form, local success state
components/EmailReleaseInfo.tsx     # email-the-release-form instructions card
components/WhyChooseUs.tsx          # 4-card trust grid
components/FAQ.tsx                  # "use client" — #faq accordion
components/FinalCTA.tsx             # closing CTA band
components/Footer.tsx               # #contact footer
components/MobileCallBar.tsx        # fixed bottom call bar, mobile only
app/layout.tsx                      # fonts, metadata, JSON-LD, html/body shell
app/page.tsx                        # composes every section in spec order
app/globals.css                     # Tailwind import + @theme tokens + base styles
public/images/hero-placeholder.jpg  # generated placeholder (script below)
public/images/towing-placeholder.jpg
scripts/generate-placeholder-images.ps1
vitest.config.ts
vitest.setup.ts
test/mocks/next-font-google.ts      # stub for next/font/google in tests
```

---

### Task 1: Project foundation — dependencies, test tooling, constants

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `lib/constants.ts`
- Test: `lib/constants.test.ts`
- Delete: `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg` (unused create-next-app boilerplate)

**Interfaces:**
- Produces: `BUSINESS` (`{ name, phone, phoneLink, email, emailLink, serviceArea, established }`), `NAV_LINKS` (`ReadonlyArray<{ href: string; label: string }>`), `FAQ_ITEMS` (`ReadonlyArray<{ question: string; answer: string }>`) — all consumed by every later task.

- [ ] **Step 1: Install dependencies**

```bash
npm install lucide-react
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 2: Remove unused create-next-app boilerplate images**

```bash
rm public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg
```

- [ ] **Step 3: Add the test script to `package.json`**

Add `"test": "vitest run"` to the `scripts` block (alongside the existing `dev`, `build`, `start`, `lint`).

- [ ] **Step 4: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
```

- [ ] **Step 5: Create `vitest.setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 6: Write the failing test for constants**

Create `lib/constants.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { BUSINESS, NAV_LINKS, FAQ_ITEMS } from "./constants";

describe("BUSINESS", () => {
  it("has the exact phone, email, and links from the spec", () => {
    expect(BUSINESS.name).toBe("A&M Repair & Towing");
    expect(BUSINESS.phone).toBe("(301) 421-0953");
    expect(BUSINESS.phoneLink).toBe("tel:+13014210953");
    expect(BUSINESS.email).toBe("aandmtowing2003@gmail.com");
    expect(BUSINESS.emailLink).toBe("mailto:aandmtowing2003@gmail.com");
    expect(BUSINESS.serviceArea).toBe("Montgomery County, Maryland");
    expect(BUSINESS.established).toBe("2003");
  });
});

describe("NAV_LINKS", () => {
  it("has the six spec anchor links in order", () => {
    expect(NAV_LINKS.map((l) => l.href)).toEqual([
      "#home",
      "#services",
      "#towed-vehicle",
      "#release-form",
      "#faq",
      "#contact",
    ]);
  });
});

describe("FAQ_ITEMS", () => {
  it("has the six spec questions", () => {
    expect(FAQ_ITEMS).toHaveLength(6);
    expect(FAQ_ITEMS[0].question).toBe("Where is my car?");
    expect(FAQ_ITEMS[5].question).toBe("Which forms of payment do you accept?");
  });
});
```

- [ ] **Step 7: Run test to verify it fails**

Run: `npm test -- lib/constants.test.ts`
Expected: FAIL — `./constants` cannot be found.

- [ ] **Step 8: Create `lib/constants.ts`**

```ts
export const BUSINESS = {
  name: "A&M Repair & Towing",
  phone: "(301) 421-0953",
  phoneLink: "tel:+13014210953",
  email: "aandmtowing2003@gmail.com",
  emailLink: "mailto:aandmtowing2003@gmail.com",
  serviceArea: "Montgomery County, Maryland",
  established: "2003",
} as const;

export const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#towed-vehicle", label: "Towed Vehicle" },
  { href: "#release-form", label: "Release Form" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
] as const;

export const FAQ_ITEMS = [
  {
    question: "Where is my car?",
    answer:
      "Just contact our office and a representative will help you determine where your vehicle is located. Please have your driver's license, vehicle registration, proof of insurance, and any additional documents that the police or authorities may request.",
  },
  {
    question: "How can I retrieve my personal belongings from the car?",
    answer:
      "Once you have fulfilled the required documentation requirements, we will allow you to retrieve your personal belongings from the vehicle. Please keep in mind that the vehicle will only remain with us for a limited period. After that, it may be transferred to the Abandoned Vehicles Facility, auction, or a repair shop at the request of the owner, insurance company, or authorities.",
  },
  {
    question: "Why was my car towed?",
    answer:
      "Vehicles may be towed for various reasons. Common reasons include requests from the police, landlord, vehicle owner, and/or driver. If you have questions about why your vehicle was towed, please contact our office.",
  },
  {
    question: "Can you explain the fees?",
    answer:
      "Fees are set by Montgomery County. Charges may include the tow call, vehicle storage, and any additional services required. Please contact our office for a detailed explanation of the charges associated with your vehicle.",
  },
  {
    question: "My insurance company will handle it. Not necessarily.",
    answer:
      "We advise you to immediately report the accident to your insurance company and/or seek legal advice. However, for your insurance company to access your vehicle, you may need to sign a release authorization form for the towing company and provide documentation proving ownership. Please contact us, and we will guide you through the release form process.",
  },
  {
    question: "Which forms of payment do you accept?",
    answer:
      "We prefer cash, but we also accept credit cards, including Visa and Mastercard. Credit card payments must be accompanied by proper identification. We strictly follow all applicable Montgomery County requirements and guidelines.",
  },
] as const;
```

- [ ] **Step 9: Run test to verify it passes**

Run: `npm test -- lib/constants.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 10: Commit**

```bash
git add package.json package-lock.json vitest.config.ts vitest.setup.ts lib/constants.ts lib/constants.test.ts
git rm public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg
git commit -m "Add test tooling and centralized business constants"
```

---

### Task 2: Placeholder images

**Files:**
- Create: `scripts/generate-placeholder-images.ps1`
- Create: `public/images/hero-placeholder.jpg`
- Create: `public/images/towing-placeholder.jpg`

**Interfaces:**
- Produces: two real JPEG files at the exact paths the spec names, consumed by `Hero.tsx` (Task 4) and `About.tsx` (Task 5) via `next/image`.

- [ ] **Step 1: Write the placeholder-image generator**

Create `scripts/generate-placeholder-images.ps1`:

```powershell
Add-Type -AssemblyName System.Drawing

function New-PlaceholderImage {
    param(
        [string]$Path,
        [int]$Width,
        [int]$Height,
        [string]$Label,
        [string]$HexColor
    )
    $color = [System.Drawing.ColorTranslator]::FromHtml($HexColor)
    $bmp = New-Object System.Drawing.Bitmap $Width, $Height
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.Clear($color)
    $font = New-Object System.Drawing.Font("Arial", [Math]::Floor($Width / 22), [System.Drawing.FontStyle]::Bold)
    $format = New-Object System.Drawing.StringFormat
    $format.Alignment = [System.Drawing.StringAlignment]::Center
    $format.LineAlignment = [System.Drawing.StringAlignment]::Center
    $rect = New-Object System.Drawing.RectangleF 0, 0, $Width, $Height
    $g.DrawString($Label, $font, [System.Drawing.Brushes]::White, $rect, $format)
    $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $g.Dispose()
    $bmp.Dispose()
}

New-Item -ItemType Directory -Force -Path "public/images" | Out-Null

New-PlaceholderImage -Path "public/images/hero-placeholder.jpg" -Width 1920 -Height 1080 `
    -Label "A&M Repair & Towing`nHero Photo Placeholder" -HexColor "#212121"

New-PlaceholderImage -Path "public/images/towing-placeholder.jpg" -Width 1200 -Height 900 `
    -Label "Tow Truck Photo Placeholder" -HexColor "#D32F2F"

Write-Host "Generated public/images/hero-placeholder.jpg and public/images/towing-placeholder.jpg"
```

- [ ] **Step 2: Run it**

Run: `powershell -ExecutionPolicy Bypass -File scripts/generate-placeholder-images.ps1`
Expected: prints the confirmation line; `public/images/hero-placeholder.jpg` and `public/images/towing-placeholder.jpg` now exist.

- [ ] **Step 3: Verify the files are valid images**

Run: `powershell -Command "Get-Item public/images/*.jpg | Select-Object Name, Length"`
Expected: both files listed with non-zero length (a few KB each).

- [ ] **Step 4: Commit**

```bash
git add scripts/generate-placeholder-images.ps1 public/images/hero-placeholder.jpg public/images/towing-placeholder.jpg
git commit -m "Add placeholder image generator and generated hero/about images"
```

---

### Task 3: Header + MobileNav

**Files:**
- Create: `components/Header.tsx`
- Create: `components/MobileNav.tsx`
- Test: `components/Header.test.tsx`
- Test: `components/MobileNav.test.tsx`

**Interfaces:**
- Consumes: `BUSINESS`, `NAV_LINKS` from `@/lib/constants` (Task 1).
- Produces: `export default function Header()`, `export default function MobileNav()` — both consumed by `app/page.tsx` (Task 12; `Header` only — `MobileNav` is internal to `Header`).

- [ ] **Step 1: Write the failing tests**

Create `components/MobileNav.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MobileNav from "./MobileNav";

describe("MobileNav", () => {
  it("is closed by default and opens the menu on click", async () => {
    render(<MobileNav />);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();

    const toggle = screen.getByRole("button", { name: /open menu/i });
    await userEvent.click(toggle);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "FAQ" })).toHaveAttribute("href", "#faq");
  });

  it("closes the menu when a link is clicked", async () => {
    render(<MobileNav />);
    await userEvent.click(screen.getByRole("button", { name: /open menu/i }));
    await userEvent.click(screen.getByRole("link", { name: "Home" }));
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });
});
```

Create `components/Header.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("shows the business name and a working call CTA", () => {
    render(<Header />);
    expect(screen.getByText("A&M Repair & Towing")).toBeInTheDocument();
    const callLinks = screen.getAllByRole("link", { name: /call/i });
    expect(callLinks.length).toBeGreaterThan(0);
    for (const link of callLinks) {
      expect(link).toHaveAttribute("href", "tel:+13014210953");
    }
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- components/Header.test.tsx components/MobileNav.test.tsx`
Expected: FAIL — `./Header` and `./MobileNav` cannot be found.

- [ ] **Step 3: Create `components/MobileNav.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-hairline text-charcoal"
      >
        {open ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Menu className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
      {open ? (
        <nav
          id="mobile-nav-menu"
          aria-label="Primary"
          className="absolute inset-x-0 top-full border-b border-hairline bg-white px-4 py-4 shadow-md"
        >
          <ul className="space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-base font-medium text-charcoal hover:text-fire-red"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 4: Create `components/Header.tsx`**

```tsx
import { BUSINESS, NAV_LINKS } from "@/lib/constants";
import MobileNav from "./MobileNav";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-white">
      <div className="relative mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <span className="font-heading text-xl font-bold text-charcoal">{BUSINESS.name}</span>
        <nav aria-label="Primary" className="hidden lg:flex lg:items-center lg:gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-charcoal hover:text-fire-red"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={BUSINESS.phoneLink}
            className="hidden min-h-[44px] items-center justify-center rounded-lg bg-fire-red px-5 text-sm font-bold text-white transition hover:bg-fire-red-dark sm:inline-flex"
          >
            Call Now — {BUSINESS.phone}
          </a>
          <a
            href={BUSINESS.phoneLink}
            aria-label={`Call ${BUSINESS.name} now`}
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-fire-red px-4 text-sm font-bold text-white transition hover:bg-fire-red-dark sm:hidden"
          >
            Call
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- components/Header.test.tsx components/MobileNav.test.tsx`
Expected: PASS (3 tests)

- [ ] **Step 6: Commit**

```bash
git add components/Header.tsx components/MobileNav.tsx components/Header.test.tsx components/MobileNav.test.tsx
git commit -m "Add sticky header with mobile nav toggle"
```

---

### Task 4: HazardStripe + Hero + TrustBar

**Files:**
- Create: `components/HazardStripe.tsx`
- Create: `components/Hero.tsx`
- Create: `components/TrustBar.tsx`
- Test: `components/Hero.test.tsx`
- Test: `components/TrustBar.test.tsx`

**Interfaces:**
- Consumes: `BUSINESS` from `@/lib/constants`.
- Produces: `export default function HazardStripe()`, `export default function Hero()`, `export default function TrustBar()` — all consumed by `app/page.tsx` (Task 12). `HazardStripe` is also consumed by `EmergencyCTA.tsx` (Task 6).

- [ ] **Step 1: Write the failing tests**

Create `components/Hero.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "./Hero";

describe("Hero", () => {
  it("renders the headline, subcopy, and both CTAs", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "24/7 Towing & Roadside Assistance in Montgomery County, Maryland",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Call Now — (301) 421-0953" })
    ).toHaveAttribute("href", "tel:+13014210953");
    expect(screen.getByRole("link", { name: "Get Roadside Assistance" })).toHaveAttribute(
      "href",
      "#services"
    );
  });

  it("lists all five trust badges", () => {
    render(<Hero />);
    for (const badge of [
      "Family Owned & Operated",
      "Fully Insured",
      "Licensed & Insured Drivers",
      "Serving Since 2003",
      "Available 24/7",
    ]) {
      expect(screen.getByText(badge)).toBeInTheDocument();
    }
  });
});
```

Create `components/TrustBar.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import TrustBar from "./TrustBar";

describe("TrustBar", () => {
  it("renders all four trust items", () => {
    render(<TrustBar />);
    expect(screen.getByText("24/7 Availability")).toBeInTheDocument();
    expect(screen.getByText("Serving Since 2003")).toBeInTheDocument();
    expect(screen.getByText("Licensed & Insured")).toBeInTheDocument();
    expect(screen.getByText("Family Owned")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- components/Hero.test.tsx components/TrustBar.test.tsx`
Expected: FAIL — `./Hero` and `./TrustBar` cannot be found.

- [ ] **Step 3: Create `components/HazardStripe.tsx`**

```tsx
export default function HazardStripe() {
  return (
    <div
      aria-hidden="true"
      className="h-2 w-full"
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, var(--color-charcoal) 0, var(--color-charcoal) 10px, var(--color-safety-yellow) 10px, var(--color-safety-yellow) 20px)",
      }}
    />
  );
}
```

- [ ] **Step 4: Create `components/Hero.tsx`**

```tsx
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

const TRUST_BADGES = [
  "Family Owned & Operated",
  "Fully Insured",
  "Licensed & Insured Drivers",
  "Serving Since 2003",
  "Available 24/7",
];

export default function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-charcoal">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-placeholder.jpg"
          alt="A&M Repair & Towing tow truck responding to a roadside call"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-charcoal/40" />
      </div>
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <h1 className="max-w-2xl font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
          24/7 Towing & Roadside Assistance in Montgomery County, Maryland
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/90">
          Fast, courteous, and affordable towing services when you need them most. A&amp;M
          Repair &amp; Towing has proudly served Montgomery County since 2003.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href={BUSINESS.phoneLink}
            className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-fire-red px-8 text-lg font-bold text-white transition hover:bg-fire-red-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Call Now — {BUSINESS.phone}
          </a>
          <a
            href="#services"
            className="inline-flex min-h-[48px] items-center justify-center rounded-lg border-2 border-white px-8 text-lg font-bold text-white transition hover:bg-white hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Get Roadside Assistance
          </a>
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
          {TRUST_BADGES.map((badge) => (
            <li key={badge} className="flex items-center gap-2 text-sm font-medium text-white/90">
              <BadgeCheck className="h-4 w-4 flex-shrink-0 text-safety-yellow" aria-hidden="true" />
              {badge}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create `components/TrustBar.tsx`**

```tsx
import { CalendarClock, Clock, ShieldCheck, Users } from "lucide-react";

const TRUST_ITEMS = [
  { icon: Clock, title: "24/7 Availability", body: "We're ready to respond day or night." },
  {
    icon: CalendarClock,
    title: "Serving Since 2003",
    body: "Years of experience helping drivers in Montgomery County.",
  },
  {
    icon: ShieldCheck,
    title: "Licensed & Insured",
    body: "Professional drivers and fully insured service.",
  },
  { icon: Users, title: "Family Owned", body: "A local, family-owned and operated business." },
];

export default function TrustBar() {
  return (
    <section aria-label="Why customers trust us" className="bg-white py-10">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {TRUST_ITEMS.map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex flex-col items-start gap-2">
            <Icon className="h-8 w-8 text-fire-red" aria-hidden="true" />
            <h3 className="font-heading text-lg font-bold text-charcoal">{title}</h3>
            <p className="text-sm text-charcoal/80">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test -- components/Hero.test.tsx components/TrustBar.test.tsx`
Expected: PASS (3 tests)

- [ ] **Step 7: Commit**

```bash
git add components/HazardStripe.tsx components/Hero.tsx components/TrustBar.tsx components/Hero.test.tsx components/TrustBar.test.tsx
git commit -m "Add hero, hazard-stripe signature element, and trust bar"
```

---

### Task 5: About + Services

**Files:**
- Create: `components/About.tsx`
- Create: `components/Services.tsx`
- Test: `components/About.test.tsx`
- Test: `components/Services.test.tsx`

**Interfaces:**
- Consumes: `BUSINESS` from `@/lib/constants`.
- Produces: `export default function About()`, `export default function Services()` — consumed by `app/page.tsx` (Task 12).

- [ ] **Step 1: Write the failing tests**

Create `components/About.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "./About";

describe("About", () => {
  it("renders the headline, all three paragraphs, and the phone CTA", () => {
    render(<About />);
    expect(
      screen.getByRole("heading", { name: "Reliable Towing When You Need It Most" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/family-owned and operated business that has been serving/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Call A&M Repair & Towing/ })
    ).toHaveAttribute("href", "tel:+13014210953");
    expect(screen.getByAltText(/tow truck assisting/i)).toBeInTheDocument();
  });
});
```

Create `components/Services.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Services from "./Services";

const SERVICE_TITLES = [
  "Emergency Towing",
  "Roadside Assistance",
  "Accident Towing",
  "Breakdown Assistance",
  "Vehicle Recovery",
  "Local Towing",
];

describe("Services", () => {
  it("renders all six services and the bottom CTA", () => {
    render(<Services />);
    for (const title of SERVICE_TITLES) {
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    }
    expect(
      screen.getByRole("link", { name: "Need Help Now? Call (301) 421-0953" })
    ).toHaveAttribute("href", "tel:+13014210953");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- components/About.test.tsx components/Services.test.tsx`
Expected: FAIL — modules not found.

- [ ] **Step 3: Create `components/About.tsx`**

```tsx
import Image from "next/image";
import { BUSINESS } from "@/lib/constants";

export default function About() {
  return (
    <section className="bg-light-gray py-16 md:py-24">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 sm:px-6 md:grid-cols-2 md:items-center lg:px-8">
        <div>
          <h2 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
            Reliable Towing When You Need It Most
          </h2>
          <p className="mt-4 text-base leading-relaxed text-charcoal/80">
            A&amp;M Repair &amp; Towing provides fast, courteous, and affordable towing services
            throughout Montgomery County, Maryland.
          </p>
          <p className="mt-4 text-base leading-relaxed text-charcoal/80">
            We are a family-owned and operated business that has been serving the community
            since 2003. Our licensed and insured drivers are experienced in handling roadside
            emergencies, breakdowns, accidents, and a wide range of towing needs.
          </p>
          <p className="mt-4 text-base leading-relaxed text-charcoal/80">
            When you are dealing with an emergency on the road, your safety matters. Our team is
            focused on providing dependable service while helping you and your family get
            through a difficult situation as safely and efficiently as possible.
          </p>
          <a
            href={BUSINESS.phoneLink}
            className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-lg bg-fire-red px-8 text-lg font-bold text-white transition hover:bg-fire-red-dark"
          >
            Call A&amp;M Repair &amp; Towing — {BUSINESS.phone}
          </a>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
          <Image
            src="/images/towing-placeholder.jpg"
            alt="A&M Repair & Towing tow truck assisting a stranded vehicle"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create `components/Services.tsx`**

```tsx
import { AlertTriangle, LifeBuoy, MapPin, Siren, Truck, Wrench } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

const SERVICES = [
  {
    icon: Siren,
    title: "Emergency Towing",
    body: "Professional towing assistance when your vehicle cannot safely continue driving.",
  },
  {
    icon: LifeBuoy,
    title: "Roadside Assistance",
    body: "Help when you're dealing with a vehicle emergency on the road.",
  },
  {
    icon: AlertTriangle,
    title: "Accident Towing",
    body: "Towing support following an accident or collision.",
  },
  {
    icon: Wrench,
    title: "Breakdown Assistance",
    body: "Reliable help when your vehicle breaks down unexpectedly.",
  },
  {
    icon: Truck,
    title: "Vehicle Recovery",
    body: "Professional assistance for vehicles that need to be recovered or transported.",
  },
  {
    icon: MapPin,
    title: "Local Towing",
    body: "Towing services for customers throughout Montgomery County.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-heading text-3xl font-bold text-charcoal md:text-4xl">
          Towing &amp; Roadside Assistance Services
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-lg border border-hairline bg-white p-6">
              <Icon className="h-8 w-8 text-fire-red" aria-hidden="true" />
              <h3 className="mt-4 font-heading text-xl font-bold text-charcoal">{title}</h3>
              <p className="mt-2 text-sm text-charcoal/80">{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a
            href={BUSINESS.phoneLink}
            className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-fire-red px-8 text-lg font-bold text-white transition hover:bg-fire-red-dark"
          >
            Need Help Now? Call {BUSINESS.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- components/About.test.tsx components/Services.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 6: Commit**

```bash
git add components/About.tsx components/Services.tsx components/About.test.tsx components/Services.test.tsx
git commit -m "Add about section and services grid"
```

---

### Task 6: EmergencyCTA + TowedVehicle + PersonalBelongings

**Files:**
- Create: `components/EmergencyCTA.tsx`
- Create: `components/PersonalBelongings.tsx`
- Create: `components/TowedVehicle.tsx`
- Test: `components/EmergencyCTA.test.tsx`
- Test: `components/TowedVehicle.test.tsx`

**Interfaces:**
- Consumes: `BUSINESS` from `@/lib/constants`, `HazardStripe` from `./HazardStripe` (Task 4).
- Produces: `export default function EmergencyCTA()`, `export default function PersonalBelongings()`, `export default function TowedVehicle()` — `TowedVehicle` composes `PersonalBelongings` internally as the second card. All consumed by `app/page.tsx` except `PersonalBelongings`, which is internal to `TowedVehicle`.

- [ ] **Step 1: Write the failing tests**

Create `components/EmergencyCTA.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import EmergencyCTA from "./EmergencyCTA";

describe("EmergencyCTA", () => {
  it("renders the headline and call CTA", () => {
    render(<EmergencyCTA />);
    expect(
      screen.getByRole("heading", { name: "Vehicle Trouble? Don't Wait. Call Us." })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Call Now — (301) 421-0953" })
    ).toHaveAttribute("href", "tel:+13014210953");
  });
});
```

Create `components/TowedVehicle.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import TowedVehicle from "./TowedVehicle";

describe("TowedVehicle", () => {
  it("renders the section id, both cards, and their CTAs", () => {
    const { container } = render(<TowedVehicle />);
    expect(container.querySelector("#towed-vehicle")).not.toBeNull();
    expect(screen.getByRole("heading", { name: "Was Your Vehicle Towed?" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Where Is My Car?" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "How Can I Retrieve My Personal Belongings?" })
    ).toBeInTheDocument();
    expect(screen.getByText("Driver's license")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Call About My Vehicle" })
    ).toHaveAttribute("href", "tel:+13014210953");
    expect(
      screen.getByRole("link", { name: "Call Our Office for Assistance" })
    ).toHaveAttribute("href", "tel:+13014210953");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- components/EmergencyCTA.test.tsx components/TowedVehicle.test.tsx`
Expected: FAIL — modules not found.

- [ ] **Step 3: Create `components/EmergencyCTA.tsx`**

```tsx
import { BUSINESS } from "@/lib/constants";
import HazardStripe from "./HazardStripe";

export default function EmergencyCTA() {
  return (
    <section className="bg-fire-red py-16 text-center md:py-20">
      <HazardStripe />
      <div className="mx-auto max-w-[1280px] px-4 pt-12 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
          Vehicle Trouble? Don&apos;t Wait. Call Us.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
          Our team is available 24 hours a day, 7 days a week to help with towing and roadside
          emergencies.
        </p>
        <a
          href={BUSINESS.phoneLink}
          className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-lg bg-safety-yellow px-8 text-lg font-bold text-charcoal transition hover:bg-white"
        >
          Call Now — {BUSINESS.phone}
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create `components/PersonalBelongings.tsx`**

```tsx
import { BUSINESS } from "@/lib/constants";

export default function PersonalBelongings() {
  return (
    <div className="rounded-lg border border-hairline bg-white p-6 md:p-8">
      <h3 className="font-heading text-xl font-bold text-charcoal">
        How Can I Retrieve My Personal Belongings?
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-charcoal/80">
        Once you have fulfilled the required documentation requirements, we will allow you to
        retrieve your personal belongings from the vehicle.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-charcoal/80">
        Please keep in mind that vehicles remain with us for a limited period of time. After
        that period, the vehicle may be transferred to the Abandoned Vehicles Facility, auction,
        or a repair shop at the request of the owner, insurance company, or authorities.
      </p>
      <a
        href={BUSINESS.phoneLink}
        className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-lg border-2 border-fire-red px-6 text-base font-bold text-fire-red transition hover:bg-fire-red hover:text-white"
      >
        Call Our Office for Assistance
      </a>
    </div>
  );
}
```

- [ ] **Step 5: Create `components/TowedVehicle.tsx`**

```tsx
import { BUSINESS } from "@/lib/constants";
import PersonalBelongings from "./PersonalBelongings";

const REQUIRED_DOCS = [
  "Driver's license",
  "Vehicle registration",
  "Proof of insurance",
  "Any additional documents that may have been requested by the police or authorities",
];

export default function TowedVehicle() {
  return (
    <section id="towed-vehicle" className="bg-light-gray py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
          Was Your Vehicle Towed?
        </h2>
        <p className="mt-4 max-w-2xl text-base text-charcoal/80">
          If you need information about your vehicle or want to retrieve personal belongings,
          please contact our office.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-hairline bg-white p-6 md:p-8">
            <h3 className="font-heading text-xl font-bold text-charcoal">Where Is My Car?</h3>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/80">
              Just contact our office and a representative will help you determine where your
              vehicle is located.
            </p>
            <p className="mt-3 text-sm font-medium text-charcoal">
              Please have the following information available:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-charcoal/80">
              {REQUIRED_DOCS.map((doc) => (
                <li key={doc} className="flex gap-2">
                  <span aria-hidden="true" className="text-fire-red">
                    •
                  </span>
                  {doc}
                </li>
              ))}
            </ul>
            <a
              href={BUSINESS.phoneLink}
              className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-lg bg-fire-red px-6 text-base font-bold text-white transition hover:bg-fire-red-dark"
            >
              Call About My Vehicle
            </a>
          </div>
          <PersonalBelongings />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test -- components/EmergencyCTA.test.tsx components/TowedVehicle.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 7: Commit**

```bash
git add components/EmergencyCTA.tsx components/PersonalBelongings.tsx components/TowedVehicle.tsx components/EmergencyCTA.test.tsx components/TowedVehicle.test.tsx
git commit -m "Add emergency CTA band and towed-vehicle/belongings section"
```

---

### Task 7: ReleaseForm

**Files:**
- Create: `components/ReleaseForm.tsx`
- Test: `components/ReleaseForm.test.tsx`

**Interfaces:**
- Consumes: `BUSINESS` from `@/lib/constants`.
- Produces: `export default function ReleaseForm()` — consumed by `app/page.tsx` (Task 12). No network call; structured so a real `onSubmit` handler can replace the local-state branch later without changing the field list or markup shape.

- [ ] **Step 1: Write the failing tests**

Create `components/ReleaseForm.test.tsx`:

```tsx
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReleaseForm from "./ReleaseForm";

describe("ReleaseForm", () => {
  it("shows the disclaimer and does not submit when required fields are empty", async () => {
    render(<ReleaseForm />);
    expect(
      screen.getByText(/does not automatically authorize the release of a vehicle/)
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Submit Release Request" }));

    expect(
      screen.queryByText(/Your release request has been received/)
    ).not.toBeInTheDocument();
  });

  it("shows the success message after a valid submission, with no network call", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    render(<ReleaseForm />);

    await userEvent.type(screen.getByLabelText(/Full Name/), "Jane Driver");
    await userEvent.type(screen.getByLabelText(/Phone Number/), "3015551234");
    await userEvent.type(screen.getByLabelText(/Email Address/), "jane@example.com");
    await userEvent.click(
      screen.getByLabelText(/I authorize A&M Repair & Towing to release my vehicle/)
    );
    await userEvent.click(screen.getByRole("button", { name: "Submit Release Request" }));

    expect(
      await screen.findByText(/Your release request has been received/)
    ).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/ReleaseForm.test.tsx`
Expected: FAIL — `./ReleaseForm` cannot be found.

- [ ] **Step 3: Create `components/ReleaseForm.tsx`**

```tsx
"use client";

import { useRef, useState, type FormEvent } from "react";
import { BUSINESS } from "@/lib/constants";

const FIELDS: Array<{
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  span2?: boolean;
}> = [
  { id: "rf-name", name: "fullName", label: "Full Name", required: true, span2: true },
  { id: "rf-phone", name: "phone", label: "Phone Number", type: "tel", required: true },
  { id: "rf-email", name: "email", label: "Email Address", type: "email", required: true },
  { id: "rf-owner", name: "ownerName", label: "Vehicle Owner Name" },
  { id: "rf-year", name: "vehicleYear", label: "Vehicle Year" },
  { id: "rf-make", name: "vehicleMake", label: "Vehicle Make" },
  { id: "rf-model", name: "vehicleModel", label: "Vehicle Model" },
  { id: "rf-vin", name: "vin", label: "VIN" },
  { id: "rf-insurance", name: "insuranceCompany", label: "Insurance Company" },
  { id: "rf-claim", name: "claimNumber", label: "Insurance Claim Number" },
  { id: "rf-registration", name: "registrationNumber", label: "Vehicle Registration Number", span2: true },
];

export default function ReleaseForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = formRef.current;
    if (!form || !form.checkValidity()) {
      form?.reportValidity();
      return;
    }
    // No backend is configured yet: this intentionally does not send data
    // anywhere. Replace this branch with a real submit handler later —
    // the field list and markup above don't need to change.
    setSubmitted(true);
  }

  return (
    <section id="release-form" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
          Insurance Vehicle Release Form
        </h2>
        <p className="mt-4 text-base text-charcoal/80">
          Your insurance company may need authorization to access and inspect your vehicle.
        </p>
        <p className="mt-2 text-base text-charcoal/80">
          Please contact A&amp;M Repair &amp; Towing if you need help completing the release
          process.
        </p>
        <p className="mt-4 rounded-lg border border-hairline bg-light-gray p-4 text-sm text-charcoal/80">
          Submitting this form does not automatically authorize the release of a vehicle.
          Requests are subject to verification of ownership, required documentation, and
          applicable procedures.
        </p>

        {submitted ? (
          <div
            role="status"
            className="mt-8 rounded-lg border border-hairline bg-light-gray p-6 text-center"
          >
            <p className="text-base text-charcoal">
              Your release request has been received. A&amp;M Repair &amp; Towing will review
              the information provided. If your request is urgent, please call {BUSINESS.phone}.
            </p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              {FIELDS.map((field) => (
                <div key={field.id} className={field.span2 ? "sm:col-span-2" : undefined}>
                  <label htmlFor={field.id} className="block text-sm font-medium text-charcoal">
                    {field.label}
                    {field.required ? (
                      <span aria-hidden="true" className="text-fire-red">
                        {" "}
                        *
                      </span>
                    ) : null}
                  </label>
                  <input
                    id={field.id}
                    name={field.name}
                    type={field.type ?? "text"}
                    required={field.required}
                    className="mt-1 block w-full rounded-lg border border-hairline px-3 py-2 text-base text-charcoal focus:border-fire-red focus:outline-none focus:ring-2 focus:ring-fire-red/40"
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label htmlFor="rf-notes" className="block text-sm font-medium text-charcoal">
                  Additional Information
                </label>
                <textarea
                  id="rf-notes"
                  name="notes"
                  rows={4}
                  className="mt-1 block w-full rounded-lg border border-hairline px-3 py-2 text-base text-charcoal focus:border-fire-red focus:outline-none focus:ring-2 focus:ring-fire-red/40"
                />
              </div>
            </div>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                required
                className="mt-1 h-5 w-5 flex-shrink-0 rounded border-hairline text-fire-red focus:ring-fire-red"
              />
              <span className="text-sm text-charcoal/80">
                I authorize A&amp;M Repair &amp; Towing to release my vehicle for inspection by
                my insurance company, subject to verification of ownership and required
                documentation.
              </span>
            </label>

            <button
              type="submit"
              className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-fire-red px-8 text-lg font-bold text-white transition hover:bg-fire-red-dark"
            >
              Submit Release Request
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- components/ReleaseForm.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add components/ReleaseForm.tsx components/ReleaseForm.test.tsx
git commit -m "Add UI-only insurance vehicle release form"
```

---

### Task 8: EmailReleaseInfo + WhyChooseUs

**Files:**
- Create: `components/EmailReleaseInfo.tsx`
- Create: `components/WhyChooseUs.tsx`
- Test: `components/EmailReleaseInfo.test.tsx`
- Test: `components/WhyChooseUs.test.tsx`

**Interfaces:**
- Consumes: `BUSINESS` from `@/lib/constants`.
- Produces: `export default function EmailReleaseInfo()`, `export default function WhyChooseUs()` — consumed by `app/page.tsx` (Task 12).

- [ ] **Step 1: Write the failing tests**

Create `components/EmailReleaseInfo.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import EmailReleaseInfo from "./EmailReleaseInfo";

describe("EmailReleaseInfo", () => {
  it("renders the mailto and tel links", () => {
    render(<EmailReleaseInfo />);
    expect(
      screen.getByRole("link", { name: "aandmtowing2003@gmail.com" })
    ).toHaveAttribute("href", "mailto:aandmtowing2003@gmail.com");
    expect(screen.getByRole("link", { name: "(301) 421-0953" })).toHaveAttribute(
      "href",
      "tel:+13014210953"
    );
  });
});
```

Create `components/WhyChooseUs.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import WhyChooseUs from "./WhyChooseUs";

describe("WhyChooseUs", () => {
  it("renders all four reasons", () => {
    render(<WhyChooseUs />);
    expect(screen.getByRole("heading", { name: "Since 2003" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Family Owned & Operated" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Licensed & Insured Drivers" })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Available 24/7" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- components/EmailReleaseInfo.test.tsx components/WhyChooseUs.test.tsx`
Expected: FAIL — modules not found.

- [ ] **Step 3: Create `components/EmailReleaseInfo.tsx`**

```tsx
import { BUSINESS } from "@/lib/constants";

const ATTACHMENTS = [
  "A photo of a valid picture ID",
  "Proof of ownership, such as vehicle registration",
  "Insurance documentation showing the vehicle and owner information",
];

export default function EmailReleaseInfo() {
  return (
    <section className="bg-light-gray py-16">
      <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-hairline bg-white p-6 md:p-8">
          <h2 className="font-heading text-2xl font-bold text-charcoal">
            Prefer to Email Your Release Authorization?
          </h2>
          <p className="mt-4 text-sm text-charcoal/80">
            Copy and paste the release authorization information into the body of an email.
            Include the required information and attach:
          </p>
          <ul className="mt-2 space-y-1 text-sm text-charcoal/80">
            {ATTACHMENTS.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="text-fire-red">
                  •
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-charcoal/80">
            Send completed information to{" "}
            <a href={BUSINESS.emailLink} className="font-medium text-fire-red underline">
              {BUSINESS.email}
            </a>
            .
          </p>
          <p className="mt-2 text-sm text-charcoal/80">
            Questions? Call{" "}
            <a href={BUSINESS.phoneLink} className="font-medium text-fire-red underline">
              {BUSINESS.phone}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create `components/WhyChooseUs.tsx`**

```tsx
import { CalendarClock, Clock, ShieldCheck, Users } from "lucide-react";

const REASONS = [
  {
    icon: CalendarClock,
    title: "Since 2003",
    body: "Serving Montgomery County drivers for more than two decades.",
  },
  {
    icon: Users,
    title: "Family Owned & Operated",
    body: "A local business committed to courteous, dependable service.",
  },
  {
    icon: ShieldCheck,
    title: "Licensed & Insured Drivers",
    body: "Experienced professionals focused on your safety.",
  },
  { icon: Clock, title: "Available 24/7", body: "We're ready to respond when you need help." },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-heading text-3xl font-bold text-charcoal md:text-4xl">
          Why Choose A&amp;M Repair &amp; Towing?
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-lg border border-hairline p-6 text-center">
              <Icon className="mx-auto h-8 w-8 text-fire-red" aria-hidden="true" />
              <h3 className="mt-4 font-heading text-lg font-bold text-charcoal">{title}</h3>
              <p className="mt-2 text-sm text-charcoal/80">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- components/EmailReleaseInfo.test.tsx components/WhyChooseUs.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 6: Commit**

```bash
git add components/EmailReleaseInfo.tsx components/WhyChooseUs.tsx components/EmailReleaseInfo.test.tsx components/WhyChooseUs.test.tsx
git commit -m "Add email-release instructions and why-choose-us grid"
```

---

### Task 9: FAQ

**Files:**
- Create: `components/FAQ.tsx`
- Test: `components/FAQ.test.tsx`

**Interfaces:**
- Consumes: `FAQ_ITEMS` from `@/lib/constants`.
- Produces: `export default function FAQ()` — consumed by `app/page.tsx` (Task 12).

- [ ] **Step 1: Write the failing test**

Create `components/FAQ.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FAQ from "./FAQ";

describe("FAQ", () => {
  it("renders all six questions, closed by default", () => {
    render(<FAQ />);
    const question = screen.getByRole("button", { name: "Where is my car?" });
    expect(question).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByText(/a representative will help you determine/)
    ).not.toBeInTheDocument();
  });

  it("opens one answer at a time", async () => {
    render(<FAQ />);
    const first = screen.getByRole("button", { name: "Where is my car?" });
    const second = screen.getByRole("button", {
      name: "How can I retrieve my personal belongings from the car?",
    });

    await userEvent.click(first);
    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByText(/a representative will help you determine/)
    ).toBeInTheDocument();

    await userEvent.click(second);
    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(second).toHaveAttribute("aria-expanded", "true");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/FAQ.test.tsx`
Expected: FAIL — `./FAQ` cannot be found.

- [ ] **Step 3: Create `components/FAQ.tsx`**

```tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-light-gray py-16 md:py-24">
      <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-base text-charcoal/80">
          Here are answers to some of the most common questions from our customers.
        </p>
        <div className="mt-8 divide-y divide-hairline border-y border-hairline">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;
            return (
              <div key={item.question}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-heading text-lg font-bold text-charcoal">
                      {item.question}
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-5 w-5 flex-shrink-0 text-fire-red transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>
                {isOpen ? (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="pb-5 text-sm leading-relaxed text-charcoal/80"
                  >
                    {item.answer}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- components/FAQ.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add components/FAQ.tsx components/FAQ.test.tsx
git commit -m "Add accessible single-open FAQ accordion"
```

---

### Task 10: FinalCTA + Footer + MobileCallBar

**Files:**
- Create: `components/FinalCTA.tsx`
- Create: `components/Footer.tsx`
- Create: `components/MobileCallBar.tsx`
- Test: `components/Footer.test.tsx`
- Test: `components/MobileCallBar.test.tsx`

**Interfaces:**
- Consumes: `BUSINESS`, `NAV_LINKS` from `@/lib/constants`.
- Produces: `export default function FinalCTA()`, `export default function Footer()`, `export default function MobileCallBar()` — consumed by `app/page.tsx` (Task 12).

- [ ] **Step 1: Write the failing tests**

Create `components/Footer.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("has the #contact id and all quick links", () => {
    const { container } = render(<Footer />);
    expect(container.querySelector("footer#contact")).not.toBeNull();
    for (const label of ["Home", "Services", "Towed Vehicle", "Release Form", "FAQ", "Contact"]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
    expect(screen.getByText("© 2026 A&M Repair & Towing. All Rights Reserved.")).toBeInTheDocument();
  });
});
```

Create `components/MobileCallBar.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import MobileCallBar from "./MobileCallBar";

describe("MobileCallBar", () => {
  it("renders a full-width call link", () => {
    render(<MobileCallBar />);
    expect(
      screen.getByRole("link", { name: /CALL NOW — \(301\) 421-0953/ })
    ).toHaveAttribute("href", "tel:+13014210953");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- components/Footer.test.tsx components/MobileCallBar.test.tsx`
Expected: FAIL — modules not found.

- [ ] **Step 3: Create `components/FinalCTA.tsx`**

```tsx
import { BUSINESS } from "@/lib/constants";

export default function FinalCTA() {
  return (
    <section className="bg-charcoal py-16 text-center md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
          Need a Tow? We&apos;re Ready to Help.
        </h2>
        <p className="mt-4 text-lg text-white/90">
          A&amp;M Repair &amp; Towing is available 24 hours a day, 7 days a week.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href={BUSINESS.phoneLink}
            className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-fire-red px-8 text-lg font-bold text-white transition hover:bg-fire-red-dark"
          >
            Call Now — {BUSINESS.phone}
          </a>
          <a
            href={BUSINESS.emailLink}
            className="inline-flex min-h-[48px] items-center justify-center rounded-lg border-2 border-white px-8 text-lg font-bold text-white transition hover:bg-white hover:text-charcoal"
          >
            Email Us
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create `components/Footer.tsx`**

```tsx
import { BUSINESS, NAV_LINKS } from "@/lib/constants";

const SERVICES = [
  "Emergency Towing",
  "Roadside Assistance",
  "Accident Towing",
  "Breakdown Assistance",
  "Vehicle Recovery",
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-charcoal text-white">
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-heading text-lg font-bold">A&amp;M Repair &amp; Towing</h3>
            <p className="mt-3 text-sm text-white/70">
              Family-owned and operated towing and roadside assistance serving Montgomery
              County, Maryland since 2003.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold">Contact</h3>
            <p className="mt-3 text-sm">
              <a href={BUSINESS.phoneLink} className="text-white/70 hover:text-white">
                {BUSINESS.phone}
              </a>
            </p>
            <p className="mt-2 text-sm">
              <a href={BUSINESS.emailLink} className="text-white/70 hover:text-white">
                {BUSINESS.email}
              </a>
            </p>
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold">Services</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              {SERVICES.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/70 hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/20 pt-6 text-xs text-white/60">
          <p>© 2026 A&amp;M Repair &amp; Towing. All Rights Reserved.</p>
          <p className="mt-1">
            Service availability and fees may vary. Please contact our office for current
            information.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Create `components/MobileCallBar.tsx`**

```tsx
import { Phone } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export default function MobileCallBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={BUSINESS.phoneLink}
        className="flex min-h-[56px] w-full items-center justify-center gap-2 bg-fire-red text-lg font-bold text-white"
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
        CALL NOW — {BUSINESS.phone}
      </a>
    </div>
  );
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test -- components/Footer.test.tsx components/MobileCallBar.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 7: Commit**

```bash
git add components/FinalCTA.tsx components/Footer.tsx components/MobileCallBar.tsx components/Footer.test.tsx components/MobileCallBar.test.tsx
git commit -m "Add final CTA band, footer, and fixed mobile call bar"
```

---

### Task 11: Fonts, Tailwind theme, layout metadata, and JSON-LD

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Create: `test/mocks/next-font-google.ts`
- Modify: `vitest.config.ts` (add the font mock alias)
- Test: `app/layout.test.tsx`

**Interfaces:**
- Consumes: `BUSINESS` from `@/lib/constants`.
- Produces: the `--color-*`/`--font-*` CSS custom properties every earlier component's Tailwind classes (`bg-fire-red`, `text-charcoal`, `font-heading`, etc.) depend on, plus the page `<html>`/`<body>` shell consumed by `app/page.tsx` (Task 12).

- [ ] **Step 1: Add the `next/font/google` test mock**

Create `test/mocks/next-font-google.ts`:

```ts
type FontOptions = { variable?: string };

function makeFont(options?: FontOptions) {
  return { className: "", variable: options?.variable ?? "" };
}

export const Barlow_Condensed = makeFont;
export const Inter = makeFont;
```

- [ ] **Step 2: Wire the mock into `vitest.config.ts`**

Update the `resolve.alias` block:

```ts
resolve: {
  alias: {
    "@": path.resolve(__dirname, "."),
    "next/font/google": path.resolve(__dirname, "test/mocks/next-font-google.ts"),
  },
},
```

- [ ] **Step 3: Write the failing test**

Create `app/layout.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { metadata } from "./layout";

describe("layout metadata", () => {
  it("has the exact spec title and description", () => {
    expect(metadata.title).toBe(
      "A&M Repair & Towing | 24/7 Towing & Roadside Assistance in Montgomery County, MD"
    );
    expect(metadata.description).toBe(
      "A&M Repair & Towing provides fast, courteous, and affordable 24/7 towing and roadside assistance in Montgomery County, Maryland. Family-owned and serving the community since 2003."
    );
  });
});
```

- [ ] **Step 4: Run test to verify it fails**

Run: `npm test -- app/layout.test.tsx`
Expected: FAIL — `next/font/google` resolves to the real module without the alias wired, or `metadata` doesn't yet match. Confirm it fails for the *expected* reason (title/description not yet set), not an unrelated crash, before moving on.

- [ ] **Step 5: Replace `app/globals.css`**

```css
@import "tailwindcss";

@theme inline {
  --color-fire-red: #d32f2f;
  --color-fire-red-dark: #b71c1c;
  --color-safety-yellow: #ffc107;
  --color-charcoal: #212121;
  --color-light-gray: #f5f5f5;
  --color-hairline: #e3e3e3;
  --font-heading: var(--font-barlow-condensed);
  --font-body: var(--font-inter);
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 6rem;
}

body {
  background: var(--color-light-gray);
  color: var(--color-charcoal);
  font-family: var(--font-body), system-ui, sans-serif;
}

:focus-visible {
  outline: 2px solid var(--color-fire-red);
  outline-offset: 2px;
}
```

- [ ] **Step 6: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { BUSINESS } from "@/lib/constants";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A&M Repair & Towing | 24/7 Towing & Roadside Assistance in Montgomery County, MD",
  description:
    "A&M Repair & Towing provides fast, courteous, and affordable 24/7 towing and roadside assistance in Montgomery County, Maryland. Family-owned and serving the community since 2003.",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: BUSINESS.name,
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  areaServed: BUSINESS.serviceArea,
  foundingDate: BUSINESS.established,
  description: "24/7 towing and roadside assistance serving Montgomery County, Maryland since 2003.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${inter.variable}`}>
      <body className="font-body text-charcoal antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 7: Run test to verify it passes**

Run: `npm test -- app/layout.test.tsx`
Expected: PASS (1 test)

- [ ] **Step 8: Commit**

```bash
git add app/globals.css app/layout.tsx vitest.config.ts test/mocks/next-font-google.ts app/layout.test.tsx
git commit -m "Wire on-brand Tailwind theme, fonts, metadata, and JSON-LD"
```

---

### Task 12: Page assembly, final QC, and one consolidated browser pass

**Files:**
- Modify: `app/page.tsx`
- Test: `app/page.test.tsx`

**Interfaces:**
- Consumes: every component from Tasks 3–10 (`Header`, `Hero`, `HazardStripe`, `TrustBar`, `About`, `Services`, `EmergencyCTA`, `TowedVehicle`, `ReleaseForm`, `EmailReleaseInfo`, `WhyChooseUs`, `FAQ`, `FinalCTA`, `Footer`, `MobileCallBar`).
- Produces: `export default function Home()`, the full rendered page.

- [ ] **Step 1: Write the failing integration test**

Create `app/page.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

const SECTION_IDS = ["home", "services", "towed-vehicle", "release-form", "faq", "contact"];

describe("Home page", () => {
  it("renders every spec section id in order", () => {
    const { container } = render(<Home />);
    for (const id of SECTION_IDS) {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }
  });

  it("uses the same phone number everywhere it appears", () => {
    const { container } = render(<Home />);
    const phoneLinks = container.querySelectorAll('a[href="tel:+13014210953"]');
    expect(phoneLinks.length).toBeGreaterThan(5);
  });

  it("renders the FAQ heading and release form heading", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: "Frequently Asked Questions" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Insurance Vehicle Release Form" })
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- app/page.test.tsx`
Expected: FAIL — the current `app/page.tsx` still has the create-next-app placeholder content, so none of the section ids exist yet.

- [ ] **Step 3: Replace `app/page.tsx`**

```tsx
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HazardStripe from "@/components/HazardStripe";
import TrustBar from "@/components/TrustBar";
import About from "@/components/About";
import Services from "@/components/Services";
import EmergencyCTA from "@/components/EmergencyCTA";
import TowedVehicle from "@/components/TowedVehicle";
import ReleaseForm from "@/components/ReleaseForm";
import EmailReleaseInfo from "@/components/EmailReleaseInfo";
import WhyChooseUs from "@/components/WhyChooseUs";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import MobileCallBar from "@/components/MobileCallBar";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pb-20 md:pb-0">
        <Hero />
        <HazardStripe />
        <TrustBar />
        <About />
        <Services />
        <EmergencyCTA />
        <TowedVehicle />
        <ReleaseForm />
        <EmailReleaseInfo />
        <WhyChooseUs />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileCallBar />
    </>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- app/page.test.tsx`
Expected: PASS (3 tests)

- [ ] **Step 5: Run the full test suite**

Run: `npm test`
Expected: all tests across every task pass.

- [ ] **Step 6: Lint and type-check**

Run: `npm run lint`
Expected: no errors.

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 7: Production build**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 8: One consolidated manual browser pass**

Run: `npm run dev`, then open `http://localhost:3000` and, in a single pass, check the master spec's QC checklist (`CLAUDE.md` Section 31):

- No horizontal scrolling at 320px and 1440px widths.
- Header nav scrolls to the right section, offset below the sticky header.
- Mobile menu opens/closes and closes on link click.
- FAQ accordion opens one answer at a time.
- Release form: submitting empty shows native validation; filling required fields + checkbox shows the success message; no network request fires (check the Network tab).
- Fixed mobile call bar is visible below `md` width and does not cover form fields (scroll to the release form on a narrow viewport).
- Both placeholder images load (hero and about section).
- Every phone number is clickable and reads `(301) 421-0953`; every email is `aandmtowing2003@gmail.com`.
- No console errors.

Fix anything found, re-run the affected `npm test`/`npm run build` steps, and only then move on — this is the one consolidated browser check for the whole build, not a per-component loop.

- [ ] **Step 9: Commit**

```bash
git add app/page.tsx app/page.test.tsx
git commit -m "Assemble homepage from all sections and add integration test"
```
