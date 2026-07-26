import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReleaseForm from "./ReleaseForm";

describe("ReleaseForm", () => {
  it("nests the email-release instructions inside this section", () => {
    render(<ReleaseForm />);
    expect(
      screen.getByRole("heading", { name: "Prefer to Email Your Release Authorization?" })
    ).toBeInTheDocument();
  });

  it("shows the disclaimer and does not submit when required fields are empty", async () => {
    render(<ReleaseForm />);
    expect(
      screen.getByText(/does not automatically authorize the release of a vehicle/)
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Submit Release Request" }));

    expect(
      screen.queryByText(/Your email app should have opened/)
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
      await screen.findByText(/Your email app should have opened/)
    ).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it("lists up to 5 attached files with no error", async () => {
    render(<ReleaseForm />);
    const files = Array.from({ length: 5 }, (_, i) => new File(["x"], `doc-${i}.pdf`, { type: "application/pdf" }));

    await userEvent.upload(screen.getByLabelText(/Supporting Documents/), files);

    for (const file of files) {
      expect(screen.getByText(file.name)).toBeInTheDocument();
    }
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("caps attachments at 5 and shows an error when more are selected", async () => {
    render(<ReleaseForm />);
    const files = Array.from({ length: 6 }, (_, i) => new File(["x"], `doc-${i}.pdf`, { type: "application/pdf" }));

    await userEvent.upload(screen.getByLabelText(/Supporting Documents/), files);

    for (const file of files.slice(0, 5)) {
      expect(screen.getByText(file.name)).toBeInTheDocument();
    }
    expect(screen.queryByText("doc-5.pdf")).not.toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent(/up to 5/i);
  });

  it("removes an attached file when its remove button is clicked", async () => {
    render(<ReleaseForm />);
    const files = [
      new File(["x"], "id-photo.jpg", { type: "image/jpeg" }),
      new File(["x"], "registration.pdf", { type: "application/pdf" }),
    ];

    await userEvent.upload(screen.getByLabelText(/Supporting Documents/), files);
    expect(screen.getByText("id-photo.jpg")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /remove id-photo\.jpg/i }));

    expect(screen.queryByText("id-photo.jpg")).not.toBeInTheDocument();
    expect(screen.getByText("registration.pdf")).toBeInTheDocument();
  });
});
