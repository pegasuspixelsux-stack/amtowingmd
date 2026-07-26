import Image from "next/image";
import { BUSINESS } from "@/lib/constants";

export default function About() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 sm:px-6 md:grid-cols-2 md:items-center lg:px-8">
        <div>
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            Reliable Towing <br className="md:hidden" />
            When You Need It Most
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/90">
            A&amp;M Repair &amp; Towing provides fast, courteous, and affordable towing services
            throughout Montgomery County, Maryland.
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/90">
            We are a family-owned and operated business that has been serving the community
            since 2003. Our licensed and insured drivers are experienced in handling
            emergencies, breakdowns, accidents, and a wide range of towing needs.
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/90">
            When you are dealing with an emergency on the road, your safety matters. Our team is
            focused on providing dependable service while helping you and your family get
            through a difficult situation as safely and efficiently as possible.
          </p>
          <div className="mt-6 flex flex-col items-center">
            <a
              href={BUSINESS.phoneLink}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#ffff00] px-8 text-lg font-bold text-black transition hover:scale-[1.2] hover:bg-[#e6e600]"
            >
              Call A&amp;M Towing Now
            </a>
            <p className="mt-1 text-xs text-white/80">Call {BUSINESS.phone}</p>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
          <Image
            src="/images/tow_truck.jpg"
            alt="Flatbed tow truck ready for a night-time recovery call"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
