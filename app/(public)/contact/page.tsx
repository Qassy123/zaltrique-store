"use client";

import { useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    setLoading(true);
    setStatusMessage("");

    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setStatusMessage("Message sent successfully.");
      form.reset();
    } else {
      setStatusMessage("Something went wrong. Please try again.");
    }

    setLoading(false);
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-10">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-gray-500">
          Get in touch
        </p>

        <h1 className="text-4xl font-semibold text-white">Contact Us</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-gray-800 bg-[#0b0b0b] p-6"
      >
        <input
          name="name"
          type="text"
          placeholder="Your name"
          required
          className="w-full rounded-xl border border-gray-800 bg-black px-4 py-3 text-white outline-none focus:border-gray-500"
        />

        <input
          name="email"
          type="email"
          placeholder="Your email"
          required
          className="w-full rounded-xl border border-gray-800 bg-black px-4 py-3 text-white outline-none focus:border-gray-500"
        />

        <textarea
          name="message"
          rows={5}
          placeholder="Your message"
          required
          className="w-full rounded-xl border border-gray-800 bg-black px-4 py-3 text-white outline-none focus:border-gray-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-full border border-gray-600 px-6 py-3 text-sm font-semibold text-white transition hover:border-white disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {statusMessage && (
          <p className="text-sm text-gray-400">{statusMessage}</p>
        )}
      </form>
    </section>
  );
}