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
      screen.getByRole("link", { name: "Call A&M Towing Now" })
    ).toHaveAttribute("href", "tel:+13014210953");
    expect(screen.getByText("Call (301) 421-0953")).toBeInTheDocument();
    expect(screen.getByAltText(/flatbed tow truck/i)).toBeInTheDocument();
  });
});
