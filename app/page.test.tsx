import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

const SECTION_IDS = ["home", "services", "towed-vehicle", "release-form", "faq", "contact"];

describe("Home page", () => {
  it("renders every spec section id in order", () => {
    const { container } = render(<Home />);
    for (const id of SECTION_IDS) {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }
  });

  it("uses the same phone number everywhere it appears", () => {
    const { container } = render(<Home />);
    const phoneLinks = container.querySelectorAll('a[href="tel:+13014210953"]');
    expect(phoneLinks.length).toBeGreaterThan(5);
  });

  it("renders the FAQ heading and release form heading", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: "Frequently Asked Questions" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Insurance Vehicle Release Form" })
    ).toBeInTheDocument();
  });
});
