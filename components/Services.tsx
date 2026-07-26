import { AlertTriangle, LifeBuoy, MapPin, Siren, Truck, Wrench } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

const SERVICES = [
  {
    icon: Siren,
    title: "Emergency Towing",
    body: "Professional towing assistance when your vehicle cannot safely continue driving.",
  },
  {
    icon: LifeBuoy,
    title: "Light Truck Towing",
    body: "Dedicated towing service for light trucks and pickups.",
  },
  {
    icon: AlertTriangle,
    title: "Accident Towing",
    body: "Towing support following an accident or collision.",
  },
  {
    icon: Wrench,
    title: "Classic Car Local Transport",
    body: "Careful, local transport for classic and collector vehicles.",
  },
  {
    icon: Truck,
    title: "Vehicle Recovery",
    body: "Professional assistance for vehicles that need to be recovered or transported.",
  },
  {
    icon: MapPin,
    title: "Local Towing",
    body: "Towing services for customers throughout Montgomery County.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-heading text-3xl font-bold text-charcoal md:text-4xl">
          Towing &amp; Light Truck Services
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-lg border border-hairline bg-white p-6">
              <Icon className="h-8 w-8 text-fire-red" aria-hidden="true" />
              <h3 className="mt-4 font-heading text-xl font-bold text-charcoal">{title}</h3>
              <p className="mt-2 text-sm text-charcoal/80">{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a
            href={BUSINESS.phoneLink}
            className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-fire-red px-8 text-lg font-bold text-white transition hover:bg-fire-red-dark"
          >
            Need Help Now? Call {BUSINESS.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
