import { describe, expect, it, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  afterEach(() => cleanup());
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
