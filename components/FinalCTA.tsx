import { BUSINESS } from "@/lib/constants";

export default function FinalCTA() {
  return (
    <section className="py-16 text-center md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
          Need a Tow? <br className="md:hidden" />
          We&apos;re Ready to Help.
        </h2>
        <p className="mt-4 text-lg text-white/90">
          A&amp;M Repair &amp; Towing is available 24 hours a day, 7 days a week.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:items-start">
          <div className="flex flex-col items-center">
            <a
              href={BUSINESS.phoneLink}
              className="inline-flex w-56 min-h-[44px] items-center justify-center rounded-full bg-[#ffff00] px-4 text-sm font-bold text-black transition hover:bg-[#e6e600]"
            >
              Call A&amp;M Towing Now
            </a>
            <p className="mt-1 text-xs text-white/80">Call {BUSINESS.phone}</p>
          </div>
          <a
            href={BUSINESS.emailLink}
            className="inline-flex w-56 min-h-[44px] items-center justify-center rounded-full border-2 border-white px-4 text-sm font-bold text-white transition hover:bg-white hover:text-charcoal"
          >
            Email Us
          </a>
        </div>
      </div>
    </section>
  );
}
