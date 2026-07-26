import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import EmergencyCTA from "./EmergencyCTA";

describe("EmergencyCTA", () => {
  it("renders a duplicated, looping set of the ticker images and drops the old CTA copy", () => {
    render(<EmergencyCTA />);
    expect(screen.getAllByAltText(/red Ford tow truck/i)).toHaveLength(2);
    expect(screen.getAllByAltText(/red International flatbed tow truck/i)).toHaveLength(2);
    expect(screen.getAllByAltText(/black Ford wrecker truck/i)).toHaveLength(2);
    expect(screen.getAllByAltText(/tow trucks in the yard/i)).toHaveLength(2);
    expect(screen.getAllByAltText(/logo decal on a service truck door/i)).toHaveLength(2);
    expect(screen.queryByText(/Vehicle Trouble/)).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Call Now/ })).not.toBeInTheDocument();
  });

  it("drives the ticker motion with a CSS animation class, not JS state", () => {
    const { container } = render(<EmergencyCTA />);
    expect(container.querySelector(".animate-ticker")).not.toBeNull();
  });
});
