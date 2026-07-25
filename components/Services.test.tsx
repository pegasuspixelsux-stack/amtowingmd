import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Services from "./Services";

const SERVICE_TITLES = [
  "Emergency Towing",
  "Light Truck Towing",
  "Accident Towing",
  "Breakdown Assistance",
  "Vehicle Recovery",
  "Local Towing",
];

describe("Services", () => {
  it("renders all six services and the bottom CTA", () => {
    render(<Services />);
    for (const title of SERVICE_TITLES) {
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    }
    expect(
      screen.getByRole("link", { name: "Need Help Now? Call (301) 421-0953" })
    ).toHaveAttribute("href", "tel:+13014210953");
  });
});
