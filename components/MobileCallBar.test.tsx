import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import MobileCallBar from "./MobileCallBar";

describe("MobileCallBar", () => {
  it("renders a full-width call link", () => {
    render(<MobileCallBar />);
    expect(
      screen.getByRole("link", { name: /CALL NOW — \(301\) 421-0953/ })
    ).toHaveAttribute("href", "tel:+13014210953");
  });
});
