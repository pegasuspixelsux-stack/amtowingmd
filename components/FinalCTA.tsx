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
