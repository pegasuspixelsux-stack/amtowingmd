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
