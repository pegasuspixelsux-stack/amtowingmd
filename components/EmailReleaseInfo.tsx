import { BUSINESS } from "@/lib/constants";

const ATTACHMENTS = [
  "A photo of a valid picture ID",
  "Proof of ownership, such as vehicle registration",
  "Insurance documentation showing the vehicle and owner information",
];

export default function EmailReleaseInfo() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-hairline bg-white/35 p-6 md:p-8">
          <h2 className="font-heading text-2xl font-bold text-white">
            Prefer to Email Your Release Authorization?
          </h2>
          <p className="mt-4 text-sm text-white/90">
            Copy and paste the release authorization information into the body of an email.
            Include the required information and attach:
          </p>
          <ul className="mt-2 space-y-1 text-sm text-white/90">
            {ATTACHMENTS.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="text-white">
                  •
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-white/90">
            Send completed information to{" "}
            <a href={BUSINESS.emailLink} className="font-medium text-white underline">
              {BUSINESS.email}
            </a>
            .
          </p>
          <p className="mt-2 text-sm text-white/90">
            Questions? Call{" "}
            <a href={BUSINESS.phoneLink} className="font-medium text-white underline">
              {BUSINESS.phone}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
