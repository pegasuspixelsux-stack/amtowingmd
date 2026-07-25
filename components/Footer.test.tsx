import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("has the #contact id and all quick links", () => {
    const { container } = render(<Footer />);
    expect(container.querySelector("footer#contact")).not.toBeNull();
    for (const label of ["Home", "Services", "Towed Vehicle", "Release Form", "FAQ", "Contact"]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
    expect(screen.getByText("© 2026 A&M Repair & Towing. All Rights Reserved.")).toBeInTheDocument();
  });
});
