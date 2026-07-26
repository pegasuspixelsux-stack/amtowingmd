import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

const SECTION_IDS = ["home", "services", "release-form", "faq", "contact"];

describe("Home page", () => {
  it("renders every spec section id in the correct order", () => {
    const { container } = render(<Home />);
    const elements = SECTION_IDS.map((id) => {
      const el = container.querySelector(`#${id}`);
      expect(el).not.toBeNull();
      return el as Element;
    });
    for (let i = 0; i < elements.length - 1; i++) {
      const relation = elements[i].compareDocumentPosition(elements[i + 1]);
      expect(relation & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
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
