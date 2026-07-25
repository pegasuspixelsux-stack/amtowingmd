export const BUSINESS = {
  name: "A&M Repair & Towing",
  phone: "(301) 421-0953",
  phoneLink: "tel:+13014210953",
  email: "aandmtowing2003@gmail.com",
  emailLink: "mailto:aandmtowing2003@gmail.com",
  serviceArea: "Montgomery County, Maryland",
  established: "2003",
} as const;

export const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#towed-vehicle", label: "Towed Vehicle" },
  { href: "#release-form", label: "Release Form" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
] as const;

export const FAQ_ITEMS = [
  {
    question: "Where is my car?",
    answer:
      "Just contact our office and a representative will help you determine where your vehicle is located. Please have your driver's license, vehicle registration, proof of insurance, and any additional documents that the police or authorities may request.",
  },
  {
    question: "How can I retrieve my personal belongings from the car?",
    answer:
      "Once you have fulfilled the required documentation requirements, we will allow you to retrieve your personal belongings from the vehicle. Please keep in mind that the vehicle will only remain with us for a limited period. After that, it may be transferred to the Abandoned Vehicles Facility, auction, or a repair shop at the request of the owner, insurance company, or authorities.",
  },
  {
    question: "Why was my car towed?",
    answer:
      "Vehicles may be towed for various reasons. Common reasons include requests from the police, landlord, vehicle owner, and/or driver. If you have questions about why your vehicle was towed, please contact our office.",
  },
  {
    question: "Can you explain the fees?",
    answer:
      "Fees are set by Montgomery County. Charges may include the tow call, vehicle storage, and any additional services required. Please contact our office for a detailed explanation of the charges associated with your vehicle.",
  },
  {
    question: "My insurance company will handle it. Not necessarily.",
    answer:
      "We advise you to immediately report the accident to your insurance company and/or seek legal advice. However, for your insurance company to access your vehicle, you may need to sign a release authorization form for the towing company and provide documentation proving ownership. Please contact us, and we will guide you through the release form process.",
  },
  {
    question: "Which forms of payment do you accept?",
    answer:
      "We prefer cash, but we also accept credit cards, including Visa and Mastercard. Credit card payments must be accompanied by proper identification. We strictly follow all applicable Montgomery County requirements and guidelines.",
  },
] as const;
