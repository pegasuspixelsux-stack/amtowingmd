import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReleaseForm from "./ReleaseForm";

describe("ReleaseForm", () => {
  it("shows the disclaimer and does not submit when required fields are empty", async () => {
    render(<ReleaseForm />);
    expect(
      screen.getByText(/does not automatically authorize the release of a vehicle/)
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Submit Release Request" }));

    expect(
      screen.queryByText(/Your release request has been received/)
    ).not.toBeInTheDocument();
  });

  it("shows the success message after a valid submission, with no network call", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    render(<ReleaseForm />);

    await userEvent.type(screen.getByLabelText(/Full Name/), "Jane Driver");
    await userEvent.type(screen.getByLabelText(/Phone Number/), "3015551234");
    await userEvent.type(screen.getByLabelText(/Email Address/), "jane@example.com");
    await userEvent.click(
      screen.getByLabelText(/I authorize A&M Repair & Towing to release my vehicle/)
    );
    await userEvent.click(screen.getByRole("button", { name: "Submit Release Request" }));

    expect(
      await screen.findByText(/Your release request has been received/)
    ).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });
});
