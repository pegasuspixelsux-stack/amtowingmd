import { Phone } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export default function MobileCallBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 bg-fire-red md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={BUSINESS.phoneLink}
        className="flex min-h-[56px] w-full flex-col items-center justify-center gap-0.5 bg-fire-red py-1 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <span className="flex items-center gap-2 text-lg font-bold">
          <Phone className="h-5 w-5" aria-hidden="true" />
          Call A&amp;M Towing Now
        </span>
        <span className="text-xs font-normal text-white/80">Call {BUSINESS.phone}</span>
      </a>
    </div>
  );
}
