"use client";

import { useState } from "react";

export default function ComplaintsPage() {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    setLoading(true);
    setStatusMessage("");

    const formData = new FormData(form);

    const data = {
      orderNumber: formData.get("orderNumber"),
      email: formData.get("email"),
      issue: formData.get("issue"),
    };

    const response = await fetch("/api/complaints", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setStatusMessage("Complaint submitted successfully.");
      form.reset();
    } else {
      setStatusMessage("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-semibold text-white mb-8">
        Complaints & Issues
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-gray-800 bg-[#0b0b0b] p-6"
      >
        <input
          name="orderNumber"
          placeholder="Order Number"
          required
          className="w-full rounded-xl border border-gray-800 bg-black px-4 py-3 text-white"
        />

        <input
          name="email"
          type="email"
          placeholder="Your Email"
          required
          className="w-full rounded-xl border border-gray-800 bg-black px-4 py-3 text-white"
        />

        <textarea
          name="issue"
          rows={5}
          placeholder="Describe your issue"
          required
          className="w-full rounded-xl border border-gray-800 bg-black px-4 py-3 text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-full border border-gray-600 px-6 py-3 text-white"
        >
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>

        {statusMessage && (
          <p className="text-sm text-gray-400">{statusMessage}</p>
        )}
      </form>
    </section>
  );
}