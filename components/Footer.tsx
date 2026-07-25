import { BUSINESS, NAV_LINKS } from "@/lib/constants";

const SERVICES = [
  "Emergency Towing",
  "Light Truck Towing",
  "Accident Towing",
  "Breakdown Assistance",
  "Vehicle Recovery",
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-charcoal pb-20 text-white md:pb-0">
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-heading text-lg font-bold">A&amp;M Repair &amp; Towing</h3>
            <p className="mt-3 text-sm text-white/70">
              Family-owned and operated towing and light truck services serving Montgomery
              County, Maryland since 2003.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold">Contact</h3>
            <p className="mt-3 text-sm">
              <a href={BUSINESS.phoneLink} className="text-white/70 hover:text-white">
                {BUSINESS.phone}
              </a>
            </p>
            <p className="mt-2 text-sm">
              <a href={BUSINESS.emailLink} className="text-white/70 hover:text-white">
                {BUSINESS.email}
              </a>
            </p>
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold">Services</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              {SERVICES.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/70 hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/20 pt-6 text-xs text-white/60">
          <p>© 2026 A&amp;M Repair &amp; Towing. All Rights Reserved.</p>
          <p className="mt-1">
            Service availability and fees may vary. Please contact our office for current
            information.
          </p>
        </div>
      </div>
    </footer>
  );
}
