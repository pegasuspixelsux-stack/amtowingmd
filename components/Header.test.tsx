import { afterEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Header from "./Header";

function setScrollY(value: number) {
  Object.defineProperty(window, "scrollY", { value, configurable: true, writable: true });
}

describe("Header", () => {
  afterEach(() => {
    setScrollY(0);
  });

  it("shows the business name and a working call CTA", () => {
    render(<Header />);
    expect(screen.getByText("A&M Repair & Towing")).toBeInTheDocument();
    const callLinks = screen.getAllByRole("link", { name: /call/i });
    expect(callLinks.length).toBeGreaterThan(0);
    for (const link of callLinks) {
      expect(link).toHaveAttribute("href", "tel:+13014210953");
    }
  });

  it("starts transparent with white text before scrolling", () => {
    render(<Header />);
    const brand = screen.getByText("A&M Repair & Towing");
    expect(brand).toHaveClass("text-white");
    expect(brand).not.toHaveClass("text-charcoal");
  });

  it("switches to a blurred white background with dark text after scrolling", () => {
    render(<Header />);

    setScrollY(100);
    fireEvent.scroll(window);

    const brand = screen.getByText("A&M Repair & Towing");
    expect(brand).toHaveClass("text-charcoal");
    expect(brand).not.toHaveClass("text-white");
  });
});
