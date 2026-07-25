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
