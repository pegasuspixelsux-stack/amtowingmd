import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FAQ from "./FAQ";

describe("FAQ", () => {
  it("renders all six questions, closed by default", () => {
    render(<FAQ />);
    const question = screen.getByRole("button", { name: "Where is my car?" });
    expect(question).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByText(/a representative will help you determine/)
    ).not.toBeInTheDocument();
  });

  it("opens one answer at a time", async () => {
    render(<FAQ />);
    const first = screen.getByRole("button", { name: "Where is my car?" });
    const second = screen.getByRole("button", {
      name: "How can I retrieve my personal belongings from the car?",
    });

    await userEvent.click(first);
    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByText(/a representative will help you determine/)
    ).toBeInTheDocument();

    await userEvent.click(second);
    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(second).toHaveAttribute("aria-expanded", "true");
  });
});
