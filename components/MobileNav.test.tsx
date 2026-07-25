import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MobileNav from "./MobileNav";

describe("MobileNav", () => {
  it("is closed by default and opens the menu on click", async () => {
    render(<MobileNav />);
    expect(screen.getByRole("navigation", { hidden: true })).not.toBeVisible();

    const toggle = screen.getByRole("button", { name: /open menu/i });
    await userEvent.click(toggle);

    expect(screen.getByRole("navigation")).toBeVisible();
    expect(screen.getByRole("link", { name: "FAQ" })).toHaveAttribute("href", "#faq");
  });

  it("closes the menu when a link is clicked", async () => {
    render(<MobileNav />);
    await userEvent.click(screen.getByRole("button", { name: /open menu/i }));
    await userEvent.click(screen.getByRole("link", { name: "Home" }));
    expect(screen.getByRole("navigation", { hidden: true })).not.toBeVisible();
  });
});
