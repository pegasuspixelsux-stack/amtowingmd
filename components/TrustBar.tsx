import { CalendarClock, Clock, ShieldCheck, Users } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: Clock,
    title: "24/7 Availability",
    body: "Breakdowns and accidents don't wait for business hours, and neither do we. Call any time, day or night, and a driver will be dispatched to you.",
  },
  {
    icon: CalendarClock,
    title: "Serving Since 2003",
    body: "For over 20 years we've helped drivers throughout Montgomery County get back on the road, building a reputation for fast, dependable service call after call.",
  },
  {
    icon: ShieldCheck,
    title: "Licensed & Insured",
    body: "Our drivers are fully licensed and insured, so your vehicle is handled by trained professionals and protected from the moment we arrive until drop-off.",
  },
  {
    icon: Users,
    title: "Family Owned",
    body: "We're a local, family-owned and operated business, not a call center. When you reach out, you're talking to neighbors who care about getting it right.",
  },
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
