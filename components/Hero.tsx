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
          alt="A&M Repair & Towing tow truck responding to a service call"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-charcoal/40" />
      </div>
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <h1 className="max-w-2xl font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
          24/7 Towing & Light Truck Services in Montgomery County, Maryland
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
            Get Light Truck Towing
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
