import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("shows the business name and a working call CTA", () => {
    render(<Header />);
    expect(screen.getByText("A&M Repair & Towing")).toBeInTheDocument();
    const callLinks = screen.getAllByRole("link", { name: /call/i });
    expect(callLinks.length).toBeGreaterThan(0);
    for (const link of callLinks) {
      expect(link).toHaveAttribute("href", "tel:+13014210953");
    }
  });
});
