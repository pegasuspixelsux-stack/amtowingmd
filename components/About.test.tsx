import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "./About";

describe("About", () => {
  it("renders the headline, all three paragraphs, and the phone CTA", () => {
    render(<About />);
    expect(
      screen.getByRole("heading", { name: "Reliable Towing When You Need It Most" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/family-owned and operated business that has been serving/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Call A&M Repair & Towing/ })
    ).toHaveAttribute("href", "tel:+13014210953");
    expect(screen.getByAltText(/tow truck assisting/i)).toBeInTheDocument();
  });
});
