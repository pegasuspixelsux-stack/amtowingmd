import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import EmailReleaseInfo from "./EmailReleaseInfo";

describe("EmailReleaseInfo", () => {
  it("renders the mailto and tel links", () => {
    render(<EmailReleaseInfo />);
    expect(
      screen.getByRole("link", { name: "aandmtowing2003@gmail.com" })
    ).toHaveAttribute("href", "mailto:aandmtowing2003@gmail.com");
    expect(screen.getByRole("link", { name: "(301) 421-0953" })).toHaveAttribute(
      "href",
      "tel:+13014210953"
    );
  });
});
