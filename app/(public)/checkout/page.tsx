"use client";

import { useEffect, useState } from "react";
import { CartItem, getCartItems } from "@/lib/cart";

type User = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
};

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const userFullName = user
    ? [user.firstName, user.lastName]
        .filter((name) => name && name !== "undefined")
        .join(" ")
    : "";

  function refreshCheckoutCart() {
    setItems(getCartItems());
  }

  useEffect(() => {
    refreshCheckoutCart();

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    window.addEventListener("pageshow", refreshCheckoutCart);
    window.addEventListener("focus", refreshCheckoutCart);

    return () => {
      window.removeEventListener("pageshow", refreshCheckoutCart);
      window.removeEventListener("focus", refreshCheckoutCart);
    };
  }, []);

  const subtotal = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  function isValidUKPostcode(postcode: string) {
    const regex = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;
    return regex.test(postcode.trim());
  }

  async function handleCheckout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const fullName = formData.get("fullName") as string;
    const addressLine1 = formData.get("addressLine1") as string;
    const addressLine2 = formData.get("addressLine2") as string;
    const city = formData.get("city") as string;
    const postcode = formData.get("postcode") as string;

    if (!isValidUKPostcode(postcode)) {
      alert("Please enter a valid UK postcode.");
      return;
    }

    const latestItems = getCartItems();

    if (latestItems.length === 0) {
      alert("Your cart is empty.");
      setItems([]);
      return;
    }

    setLoading(true);

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: latestItems,
        email,
        fullName,
        addressLine1,
        addressLine2,
        city,
        postcode,
        country: "United Kingdom",
        user,
      }),
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Stripe checkout could not start.");
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-8">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-gray-500">
          Secure checkout
        </p>
        <h1 className="text-3xl font-bold text-white">Checkout</h1>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-white/10 p-6 text-white">
          <p className="mb-4 text-gray-300">Your cart is empty.</p>

          <a
            href="/shop"
            className="inline-block rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
          >
            Continue Shopping
          </a>
        </div>
      ) : (
        <form onSubmit={handleCheckout} className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {user && (
              <div className="rounded-xl border border-gray-800 p-4 text-sm text-gray-300">
                Checking out as{" "}
                <span className="font-semibold text-white">
                  {userFullName || user.email}
                </span>
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Email address
              </label>
              <input
                name="email"
                type="email"
                required
                defaultValue={user?.email || ""}
                className="w-full rounded-xl border border-gray-800 bg-black px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Full Name
              </label>
              <input
                name="fullName"
                required
                defaultValue={userFullName}
                className="w-full rounded-xl border border-gray-800 bg-black px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Address Line 1
              </label>
              <input
                name="addressLine1"
                required
                className="w-full rounded-xl border border-gray-800 bg-black px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Address Line 2 optional
              </label>
              <input
                name="addressLine2"
                className="w-full rounded-xl border border-gray-800 bg-black px-4 py-3 text-white"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  City
                </label>
                <input
                  name="city"
                  required
                  className="w-full rounded-xl border border-gray-800 bg-black px-4 py-3 text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Postcode
                </label>
                <input
                  name="postcode"
                  required
                  placeholder="SW1A 1AA"
                  className="w-full rounded-xl border border-gray-800 bg-black px-4 py-3 text-white"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Country
              </label>
              <input
                value="United Kingdom"
                disabled
                className="w-full rounded-xl border border-gray-800 bg-neutral-950 px-4 py-3 text-gray-400"
              />
            </div>
          </div>

          <div className="h-fit rounded-xl border border-gray-800 p-6">
            <h2 className="mb-5 text-xl font-semibold text-white">
              Order Summary
            </h2>

            <div className="mb-6 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-4 border-b border-gray-800 pb-4 text-sm text-white last:border-b-0"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="mt-1 text-gray-400">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <span>£{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between border-t border-white/10 pt-6 text-lg text-white">
              <span>Total</span>
              <span className="font-bold">£{subtotal.toFixed(2)}</span>
            </div>

            <button
              type="submit"
              disabled={loading || items.length === 0}
              className="mt-8 w-full rounded-full border border-white/20 py-3 font-semibold text-white transition hover:bg-white hover:text-black disabled:opacity-50"
            >
              {loading ? "Redirecting..." : "Pay with Stripe"}
            </button>

            <p className="mt-4 text-center text-xs text-gray-500">
              Secure payment powered by Stripe.
            </p>
          </div>
        </form>
      )}
    </section>
  );
}