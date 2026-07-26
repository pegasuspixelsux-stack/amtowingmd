import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import MobileCallBar from "./MobileCallBar";

describe("MobileCallBar", () => {
  it("renders a full-width call link with the phone number in small text below", () => {
    render(<MobileCallBar />);
    expect(
      screen.getByRole("link", { name: /Call A&M Towing Now/ })
    ).toHaveAttribute("href", "tel:+13014210953");
    expect(screen.getByText("Call (301) 421-0953")).toBeInTheDocument();
  });
});
