"use client";

import { useState } from "react";

type Props = {
  orderId: string;
  currentStatus: string;
  currentTrackingCode?: string | null;
};

export default function UpdateOrderTrackingForm({
  orderId,
  currentStatus,
  currentTrackingCode,
}: Props) {
  const [status, setStatus] = useState(currentStatus || "pending");
  const [trackingCode, setTrackingCode] = useState(currentTrackingCode || "");
  const [loading, setLoading] = useState(false);

  const trackingUrl = trackingCode
    ? `https://www.royalmail.com/track-your-item#/tracking-results/${trackingCode}`
    : "";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    const response = await fetch("/api/orders/update-tracking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId,
        status,
        trackingCode,
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Order updated successfully");
      window.location.reload();
    } else {
      alert(data.error || "Failed to update order");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 rounded-lg border border-gray-800 p-3">
      <p className="mb-3 font-semibold">Order Tracking</p>

      <div className="mb-3">
        <label className="mb-1 block text-sm text-gray-400">Status</label>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-black px-3 py-2 text-white"
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="mb-1 block text-sm text-gray-400">
          Royal Mail Tracking Code
        </label>
        <input
          value={trackingCode}
          onChange={(event) => setTrackingCode(event.target.value)}
          placeholder="e.g. AA123456789GB"
          className="w-full rounded-lg border border-gray-700 bg-black px-3 py-2 text-white"
        />
      </div>

      {trackingUrl && (
        <a
          href={trackingUrl}
          target="_blank"
          rel="noreferrer"
          className="mb-3 block text-sm text-blue-400 hover:text-blue-300"
        >
          Open Royal Mail tracking link
        </a>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded-full border border-gray-600 px-5 py-2 text-sm font-semibold hover:border-white disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Tracking"}
      </button>
    </form>
  );
}