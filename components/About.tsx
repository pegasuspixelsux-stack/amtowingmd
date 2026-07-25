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
            since 2003. Our licensed and insured drivers are experienced in handling
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
