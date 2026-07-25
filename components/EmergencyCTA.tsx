import { BUSINESS } from "@/lib/constants";
import HazardStripe from "./HazardStripe";

export default function EmergencyCTA() {
  return (
    <section className="bg-fire-red text-center">
      <HazardStripe />
      <div className="mx-auto max-w-[1280px] px-4 pb-16 pt-12 sm:px-6 md:pb-20 lg:px-8">
        <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
          Vehicle Trouble? Don&apos;t Wait. Call Us.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
          Our team is available 24 hours a day, 7 days a week to help with towing
          emergencies.
        </p>
        <a
          href={BUSINESS.phoneLink}
          className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-lg bg-safety-yellow px-8 text-lg font-bold text-charcoal transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Call Now — {BUSINESS.phone}
        </a>
      </div>
    </section>
  );
}
