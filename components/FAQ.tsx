"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-base text-white/90">
          Here are answers to some of the most common questions from our customers.
        </p>
        <div className="mt-8 divide-y divide-hairline border-y border-hairline">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;
            return (
              <div key={item.question}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-heading text-lg font-bold text-white">
                      {item.question}
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-5 w-5 flex-shrink-0 text-white transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="pb-5 text-sm leading-relaxed text-white/90"
                >
                  {item.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
