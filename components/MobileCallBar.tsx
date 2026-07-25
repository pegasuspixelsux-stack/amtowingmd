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
        className="flex min-h-[56px] w-full items-center justify-center gap-2 bg-fire-red text-lg font-bold text-white"
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
        CALL NOW — {BUSINESS.phone}
      </a>
    </div>
  );
}
