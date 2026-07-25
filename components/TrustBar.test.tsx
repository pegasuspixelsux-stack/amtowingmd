import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import TrustBar from "./TrustBar";

describe("TrustBar", () => {
  it("renders all four trust items", () => {
    render(<TrustBar />);
    expect(screen.getByText("24/7 Availability")).toBeInTheDocument();
    expect(screen.getByText("Serving Since 2003")).toBeInTheDocument();
    expect(screen.getByText("Licensed & Insured")).toBeInTheDocument();
    expect(screen.getByText("Family Owned")).toBeInTheDocument();
  });
});
