import { describe, expect, it } from "vitest";
import { BUSINESS, NAV_LINKS, FAQ_ITEMS } from "./constants";

describe("BUSINESS", () => {
  it("has the exact phone, email, and links from the spec", () => {
    expect(BUSINESS.name).toBe("A&M Repair & Towing");
    expect(BUSINESS.phone).toBe("(301) 421-0953");
    expect(BUSINESS.phoneLink).toBe("tel:+13014210953");
    expect(BUSINESS.email).toBe("aandmtowing2003@gmail.com");
    expect(BUSINESS.emailLink).toBe("mailto:aandmtowing2003@gmail.com");
    expect(BUSINESS.serviceArea).toBe("Montgomery County, Maryland");
    expect(BUSINESS.established).toBe("2003");
  });
});

describe("NAV_LINKS", () => {
  it("has the five spec anchor links in order", () => {
    expect(NAV_LINKS.map((l) => l.href)).toEqual([
      "#home",
      "#services",
      "#release-form",
      "#faq",
      "#contact",
    ]);
  });
});

describe("FAQ_ITEMS", () => {
  it("has the six spec questions", () => {
    expect(FAQ_ITEMS).toHaveLength(6);
    expect(FAQ_ITEMS[0].question).toBe("Where is my car?");
    expect(FAQ_ITEMS[5].question).toBe("Which forms of payment do you accept?");
  });
});
