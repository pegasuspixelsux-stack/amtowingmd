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
    <section id="towed-vehicle" className="py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
          Was Your Vehicle Towed?
        </h2>
        <p className="mt-4 max-w-2xl text-base text-white/90">
          If you need information about your vehicle or want to retrieve personal belongings,
          please contact our office.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-hairline bg-white/35 p-6 md:p-8">
            <h3 className="font-heading text-xl font-bold text-white">Where Is My Car?</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/90">
              Just contact our office and a representative will help you determine where your
              vehicle is located.
            </p>
            <p className="mt-3 text-sm font-medium text-white">
              Please have the following information available:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-white/90">
              {REQUIRED_DOCS.map((doc) => (
                <li key={doc} className="flex gap-2">
                  <span aria-hidden="true" className="text-white">
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
