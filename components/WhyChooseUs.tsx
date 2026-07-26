import { CalendarClock, Clock, ShieldCheck, Users } from "lucide-react";

const REASONS = [
  {
    icon: CalendarClock,
    title: "Since 2003",
    body: "Serving Montgomery County drivers for more than two decades.",
  },
  {
    icon: Users,
    title: "Family Owned & Operated",
    body: "A local business committed to courteous, dependable service.",
  },
  {
    icon: ShieldCheck,
    title: "Licensed & Insured Drivers",
    body: "Experienced professionals focused on your safety.",
  },
  { icon: Clock, title: "Available 24/7", body: "We're ready to respond when you need help." },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-heading text-3xl font-bold text-white md:text-4xl">
          Why Choose <br className="md:hidden" />
          A&amp;M Repair &amp; Towing?
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group rounded-lg border border-hairline p-6 text-center transition-colors duration-300 hover:bg-white active:bg-white"
            >
              <Icon className="mx-auto h-8 w-8 text-[#ffff00]" aria-hidden="true" />
              <h3 className="mt-4 font-heading text-lg font-bold text-white transition-colors duration-300 group-hover:text-charcoal group-active:text-charcoal">
                {title}
              </h3>
              <p className="mt-2 text-sm text-white/90 transition-colors duration-300 group-hover:text-charcoal/80 group-active:text-charcoal/80">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
