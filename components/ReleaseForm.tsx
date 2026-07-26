"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { BUSINESS } from "@/lib/constants";
import EmailReleaseInfo from "./EmailReleaseInfo";

const MAX_FILES = 5;
const SUBMIT_EMAIL = "dcrecycler@gmail.com";

const FIELDS: Array<{
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  span2?: boolean;
}> = [
  { id: "rf-name", name: "fullName", label: "Full Name", required: true, span2: true },
  { id: "rf-phone", name: "phone", label: "Phone Number", type: "tel", required: true },
  { id: "rf-email", name: "email", label: "Email Address", type: "email", required: true },
  { id: "rf-owner", name: "ownerName", label: "Vehicle Owner Name" },
  { id: "rf-year", name: "vehicleYear", label: "Vehicle Year" },
  { id: "rf-make", name: "vehicleMake", label: "Vehicle Make" },
  { id: "rf-model", name: "vehicleModel", label: "Vehicle Model" },
  { id: "rf-vin", name: "vin", label: "VIN" },
  { id: "rf-insurance", name: "insuranceCompany", label: "Insurance Company" },
  { id: "rf-claim", name: "claimNumber", label: "Insurance Claim Number" },
  { id: "rf-registration", name: "registrationNumber", label: "Vehicle Registration Number", span2: true },
];

export default function ReleaseForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (selected.length === 0) return;

    setFiles((current) => {
      const combined = [...current, ...selected];
      if (combined.length > MAX_FILES) {
        setFileError(`You can attach up to ${MAX_FILES} files. Extra files were not added.`);
        return combined.slice(0, MAX_FILES);
      }
      setFileError(null);
      return combined;
    });
  }

  function handleRemoveFile(index: number) {
    setFiles((current) => current.filter((_, i) => i !== index));
    setFileError(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = formRef.current;
    if (!form || !form.checkValidity()) {
      form?.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const lines = FIELDS.map((field) => `${field.label}: ${formData.get(field.name) || "—"}`);
    const notes = formData.get("notes");
    if (notes) {
      lines.push(`Additional Information: ${notes}`);
    }
    if (files.length > 0) {
      lines.push(
        `Attachments (please attach manually before sending): ${files
          .map((file) => file.name)
          .join(", ")}`
      );
    }

    const subject = "Insurance Vehicle Release Form Submission";
    const body = lines.join("\n");
    window.location.href = `mailto:${SUBMIT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setSubmitted(true);
  }

  return (
    <section id="release-form" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
          Insurance Vehicle <br className="md:hidden" />
          Release Form
        </h2>
        <p className="mt-4 text-base text-charcoal/80">
          Your insurance company may need authorization to access and inspect your vehicle.
        </p>
        <p className="mt-2 text-base text-charcoal/80">
          Please contact A&amp;M Repair &amp; Towing if you need help completing the release
          process.
        </p>
        <p className="mt-4 rounded-lg border border-hairline bg-light-gray p-4 text-sm text-charcoal/80">
          Submitting this form does not automatically authorize the release of a vehicle.
          Requests are subject to verification of ownership, required documentation, and
          applicable procedures.
        </p>

        {submitted ? (
          <div
            role="status"
            className="mt-8 rounded-lg border border-hairline bg-light-gray p-6 text-center"
          >
            <p className="text-base text-charcoal">
              Your email app should have opened with the release request pre-filled — attach any
              selected files and hit send to submit it. If your request is urgent, please call{" "}
              {BUSINESS.phone}.
            </p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              {FIELDS.map((field) => (
                <div key={field.id} className={field.span2 ? "sm:col-span-2" : undefined}>
                  <label htmlFor={field.id} className="block text-sm font-medium text-charcoal">
                    {field.label}
                    {field.required ? (
                      <span aria-hidden="true" className="text-fire-red">
                        {" "}
                        *
                      </span>
                    ) : null}
                  </label>
                  <input
                    id={field.id}
                    name={field.name}
                    type={field.type ?? "text"}
                    required={field.required}
                    className="mt-1 block w-full rounded-lg border border-hairline px-3 py-2 text-base text-charcoal focus:border-fire-red focus:outline-none focus:ring-2 focus:ring-fire-red/40"
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label htmlFor="rf-notes" className="block text-sm font-medium text-charcoal">
                  Additional Information
                </label>
                <textarea
                  id="rf-notes"
                  name="notes"
                  rows={4}
                  className="mt-1 block w-full rounded-lg border border-hairline px-3 py-2 text-base text-charcoal focus:border-fire-red focus:outline-none focus:ring-2 focus:ring-fire-red/40"
                />
              </div>
            </div>

            <div>
              <label htmlFor="rf-files" className="block text-sm font-medium text-charcoal">
                Supporting Documents (up to {MAX_FILES})
              </label>
              <input
                id="rf-files"
                name="files"
                type="file"
                multiple
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                disabled={files.length >= MAX_FILES}
                className="mt-1 block w-full text-sm text-charcoal file:mr-4 file:rounded-full file:border-0 file:bg-fire-red file:px-4 file:py-2 file:text-sm file:font-bold file:text-white file:transition hover:file:bg-fire-red-dark disabled:cursor-not-allowed disabled:opacity-60"
              />
              <p className="mt-1 text-xs text-charcoal/60">
                Accepted: images or PDF. For example, a photo ID, vehicle registration, or
                insurance documents.
              </p>
              {fileError ? (
                <p role="alert" className="mt-1 text-xs font-medium text-fire-red">
                  {fileError}
                </p>
              ) : null}
              {files.length > 0 ? (
                <ul className="mt-2 space-y-1">
                  {files.map((file, index) => (
                    <li
                      key={`${file.name}-${index}`}
                      className="flex items-center justify-between gap-2 rounded-lg border border-hairline px-3 py-1.5 text-sm text-charcoal"
                    >
                      <span className="truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        className="flex-shrink-0 text-xs font-medium text-fire-red hover:underline"
                        aria-label={`Remove ${file.name}`}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                required
                className="mt-1 h-5 w-5 flex-shrink-0 rounded border-hairline text-fire-red focus:ring-fire-red"
              />
              <span className="text-sm text-charcoal/80">
                I authorize A&amp;M Repair &amp; Towing to release my vehicle for inspection by
                my insurance company, subject to verification of ownership and required
                documentation.
              </span>
            </label>

            <button
              type="submit"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-fire-red px-8 text-lg font-bold text-white transition hover:bg-fire-red-dark"
            >
              Submit Release Request
            </button>
          </form>
        )}

        <div className="mt-8">
          <EmailReleaseInfo />
        </div>
      </div>
    </section>
  );
}
