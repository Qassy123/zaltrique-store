"use client";

import { useEffect, useState } from "react";

type Review = {
  id: string;
  name: string;
  email?: string | null;
  rating: number;
  message: string;
  verified: boolean;
  createdAt: string;
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  async function loadReviews() {
    const response = await fetch("/api/reviews");
    const data = await response.json();

    if (data.reviews) {
      setReviews(data.reviews);
    }
  }

  useEffect(() => {
    loadReviews();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    setLoading(true);
    setStatusMessage("");

    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      rating: formData.get("rating"),
      message: formData.get("message"),
    };

    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setStatusMessage("Review submitted successfully.");
      form.reset();
      await loadReviews();
    } else {
      setStatusMessage("Something went wrong. Please try again.");
    }

    setLoading(false);
  }

  function renderStars(rating: number) {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-10">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-gray-500">
          Customer Feedback
        </p>

        <h1 className="text-4xl font-semibold text-white">Reviews</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-gray-800 bg-[#0b0b0b] p-6"
        >
          <h2 className="text-2xl font-semibold text-white">
            Leave a Review
          </h2>

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

          <select
            name="rating"
            required
            defaultValue=""
            className="w-full rounded-xl border border-gray-800 bg-black px-4 py-3 text-white outline-none focus:border-gray-500"
          >
            <option value="" disabled>
              Select rating
            </option>
            <option value="5">★★★★★ - Excellent</option>
            <option value="4">★★★★☆ - Good</option>
            <option value="3">★★★☆☆ - Average</option>
            <option value="2">★★☆☆☆ - Poor</option>
            <option value="1">★☆☆☆☆ - Bad</option>
          </select>

          <textarea
            name="message"
            rows={5}
            placeholder="Write your feedback"
            required
            className="w-full rounded-xl border border-gray-800 bg-black px-4 py-3 text-white outline-none focus:border-gray-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-full border border-gray-600 px-6 py-3 text-sm font-semibold text-white transition hover:border-white disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>

          {statusMessage && (
            <p className="text-sm text-gray-400">{statusMessage}</p>
          )}
        </form>

        <div className="space-y-4">
          {reviews.length === 0 ? (
            <div className="rounded-2xl border border-gray-800 bg-[#0b0b0b] p-6">
              <p className="text-gray-400">
                No reviews yet. Be the first to leave one.
              </p>
            </div>
          ) : (
            reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-2xl border border-gray-800 bg-[#0b0b0b] p-6"
              >
                <div className="mb-3 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-white">
                      {review.name}
                    </h3>

                    {review.verified && (
                      <p className="mt-1 text-xs text-green-400">
                        ✔ Verified Buyer
                      </p>
                    )}
                  </div>

                  <p className="text-sm text-yellow-400">
                    {renderStars(review.rating)}
                  </p>
                </div>

                <p className="text-gray-300">{review.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}