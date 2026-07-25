import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import EmergencyCTA from "./EmergencyCTA";

describe("EmergencyCTA", () => {
  it("renders the headline and call CTA", () => {
    render(<EmergencyCTA />);
    expect(
      screen.getByRole("heading", { name: "Vehicle Trouble? Don't Wait. Call Us." })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Call Now — (301) 421-0953" })
    ).toHaveAttribute("href", "tel:+13014210953");
  });
});
