import { describe, expect, it } from "vitest";
import { metadata } from "./layout";

describe("layout metadata", () => {
  it("has the exact spec title and description", () => {
    expect(metadata.title).toBe(
      "A&M Repair & Towing | 24/7 Towing & Roadside Assistance in Montgomery County, MD"
    );
    expect(metadata.description).toBe(
      "A&M Repair & Towing provides fast, courteous, and affordable 24/7 towing and roadside assistance in Montgomery County, Maryland. Family-owned and serving the community since 2003."
    );
  });
});
