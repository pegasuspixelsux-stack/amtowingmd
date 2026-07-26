import Image from "next/image";

const TICKER_IMAGES = [
  {
    src: "/images/ticker/IMG_9023-scaled-1-1024x768.jpg",
    alt: "A&M Repair & Towing red Ford tow truck",
  },
  {
    src: "/images/ticker/IMG_9027-scaled-1-1024x768.jpg",
    alt: "A&M Repair & Towing red International flatbed tow truck",
  },
  {
    src: "/images/ticker/IMG_9106-1024x768.jpeg",
    alt: "A&M Repair & Towing black Ford wrecker truck",
  },
  {
    src: "/images/ticker/IMG_9104-scaled-1-e1687557117429-1024x768.jpg",
    alt: "A&M Repair & Towing tow trucks in the yard",
  },
  {
    src: "/images/ticker/IMG_9019-e1687557149893-1024x768.jpeg",
    alt: "A&M Repair and Towing logo decal on a service truck door",
  },
];

// Duplicated so the -50% translateX loop in globals.css (.animate-ticker)
// wraps seamlessly onto an identical copy of itself.
const TICKER_ITEMS = [...TICKER_IMAGES, ...TICKER_IMAGES];

export default function EmergencyCTA() {
  return (
    <section className="relative h-64 overflow-hidden bg-charcoal md:h-96">
      <div className="animate-ticker flex h-full w-max">
        {TICKER_ITEMS.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className="relative h-full w-[50vw] flex-shrink-0 md:w-[33vw]"
          >
            <Image src={image.src} alt={image.alt} fill sizes="50vw" className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
