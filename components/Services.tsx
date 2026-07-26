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
    <section id="services" className="py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-heading text-3xl font-bold text-white md:text-4xl">
          Towing &amp; Light <br className="md:hidden" />
          Truck Services
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group rounded-lg border border-white p-6 transition-colors duration-300 hover:bg-white active:bg-white"
            >
              <Icon className="h-8 w-8 text-[#ffff00]" aria-hidden="true" />
              <h3 className="mt-4 font-heading text-xl font-bold text-white transition-colors duration-300 group-hover:text-charcoal group-active:text-charcoal">
                {title}
              </h3>
              <p className="mt-2 text-sm text-white/90 transition-colors duration-300 group-hover:text-charcoal/80 group-active:text-charcoal/80">
                {body}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a
            href={BUSINESS.phoneLink}
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#ffff00] px-8 text-lg font-bold text-black transition hover:bg-[#e6e600]"
          >
            Call A&amp;M Towing Now
          </a>
          <p className="mt-1 text-xs text-white/80">Call {BUSINESS.phone}</p>
        </div>
      </div>
    </section>
  );
}
