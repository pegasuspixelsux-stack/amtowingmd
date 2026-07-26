import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import TowedVehicle from "./TowedVehicle";

describe("TowedVehicle", () => {
  it("renders the section id, both cards, and their CTAs", () => {
    const { container } = render(<TowedVehicle />);
    expect(container.querySelector("#towed-vehicle")).not.toBeNull();
    expect(screen.getByRole("heading", { name: "Was Your Vehicle Towed?" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Where Is My Car?" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "How Can I Retrieve My Personal Belongings?" })
    ).toBeInTheDocument();
    expect(screen.getByText("Driver's license")).toBeInTheDocument();
    const callButtons = screen.getAllByRole("link", { name: "Call A&M Towing Now" });
    expect(callButtons).toHaveLength(2);
    for (const link of callButtons) {
      expect(link).toHaveAttribute("href", "tel:+13014210953");
    }
  });
});
