import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "./Hero";

describe("Hero", () => {
  it("renders the headline, subcopy, and both CTAs", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "24/7 Towing & Roadside Assistance in Montgomery County, Maryland",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Call Now — (301) 421-0953" })
    ).toHaveAttribute("href", "tel:+13014210953");
    expect(screen.getByRole("link", { name: "Get Roadside Assistance" })).toHaveAttribute(
      "href",
      "#services"
    );
  });

  it("lists all five trust badges", () => {
    render(<Hero />);
    for (const badge of [
      "Family Owned & Operated",
      "Fully Insured",
      "Licensed & Insured Drivers",
      "Serving Since 2003",
      "Available 24/7",
    ]) {
      expect(screen.getByText(badge)).toBeInTheDocument();
    }
  });
});
