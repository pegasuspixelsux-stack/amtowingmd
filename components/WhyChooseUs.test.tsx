import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import WhyChooseUs from "./WhyChooseUs";

describe("WhyChooseUs", () => {
  it("renders all four reasons", () => {
    render(<WhyChooseUs />);
    expect(screen.getByRole("heading", { name: "Since 2003" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Family Owned & Operated" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Licensed & Insured Drivers" })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Available 24/7" })).toBeInTheDocument();
  });
});
