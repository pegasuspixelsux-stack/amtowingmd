"use client";

import { useEffect, useState } from "react";
import { BUSINESS, NAV_LINKS } from "@/lib/constants";
import MobileNav from "./MobileNav";

const SCROLL_THRESHOLD = 20;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-hairline bg-white/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="relative mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <span
          className={`font-heading text-xl font-bold transition-colors ${
            scrolled ? "text-charcoal" : "text-white"
          }`}
        >
          {BUSINESS.name}
        </span>
        <nav aria-label="Primary" className="hidden lg:flex lg:items-center lg:gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-fire-red ${
                scrolled ? "text-charcoal" : "text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <a
              href={BUSINESS.phoneLink}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#ffff00] px-5 text-sm font-bold text-black transition hover:bg-[#e6e600]"
            >
              Call A&amp;M Towing Now
            </a>
            <p
              className={`mt-0.5 text-center text-xs transition-colors ${
                scrolled ? "text-charcoal/70" : "text-white/80"
              }`}
            >
              Call {BUSINESS.phone}
            </p>
          </div>
          <MobileNav light={!scrolled} />
        </div>
      </div>
    </header>
  );
}
