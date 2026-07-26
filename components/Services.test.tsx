import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Services from "./Services";

const SERVICE_TITLES = [
  "Emergency Towing",
  "Light Truck Towing",
  "Accident Towing",
  "Classic Car Local Transport",
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
      screen.getByRole("link", { name: "Call A&M Towing Now" })
    ).toHaveAttribute("href", "tel:+13014210953");
    expect(screen.getByText("Call (301) 421-0953")).toBeInTheDocument();
  });
});
