import { CalendarClock, Clock, ShieldCheck, Users } from "lucide-react";

const TRUST_ITEMS = [
  { icon: Clock, title: "24/7 Availability", body: "We're ready to respond day or night." },
  {
    icon: CalendarClock,
    title: "Serving Since 2003",
    body: "Years of experience helping drivers in Montgomery County.",
  },
  {
    icon: ShieldCheck,
    title: "Licensed & Insured",
    body: "Professional drivers and fully insured service.",
  },
  { icon: Users, title: "Family Owned", body: "A local, family-owned and operated business." },
];

export default function TrustBar() {
  return (
    <section aria-label="Why customers trust us" className="py-10">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {TRUST_ITEMS.map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex flex-col items-start gap-2">
            <Icon className="h-8 w-8 text-[#ffff00]" aria-hidden="true" />
            <h3 className="font-heading text-lg font-bold text-white">{title}</h3>
            <p className="text-sm text-white/90">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
