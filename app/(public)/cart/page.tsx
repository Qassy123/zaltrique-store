"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCartItems, removeFromCart, updateQuantity } from "@/lib/cart";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  function refreshCart() {
    setCart(getCartItems());
  }

  useEffect(() => {
    refreshCart();

    const handlePageShow = () => {
      refreshCart();
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refreshCart();
      }
    };

    window.onpageshow = handlePageShow;
    window.addEventListener("focus", refreshCart);
    window.addEventListener("popstate", refreshCart);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const timer = setInterval(refreshCart, 500);

    return () => {
      window.onpageshow = null;
      window.removeEventListener("focus", refreshCart);
      window.removeEventListener("popstate", refreshCart);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(timer);
    };
  }, []);

  function handleRemove(id: string) {
    removeFromCart(id);
    refreshCart();
  }

  function handleQuantity(id: string, qty: number) {
    updateQuantity(id, qty);
    refreshCart();
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-gray-500">
          Your Basket
        </p>

        <h1 className="mb-10 text-3xl font-bold text-white">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="rounded-xl border border-gray-800 p-8">
            <h2 className="mb-3 text-xl font-semibold text-white">
              Your cart is empty
            </h2>
            <p className="mb-6 text-gray-400">
              Add some products to your cart before checking out.
            </p>

            <Link
              href="/shop"
              className="inline-flex rounded-full border border-gray-600 px-6 py-3 text-sm font-semibold text-white hover:border-white"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-gray-800 p-5"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-400">
                        £{item.price.toFixed(2)} each
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Line total: £
                        {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center rounded-full border border-gray-700">
                        <button
                          type="button"
                          onClick={() =>
                            handleQuantity(item.id, item.quantity - 1)
                          }
                          className="px-4 py-2 text-white hover:text-gray-300"
                        >
                          -
                        </button>

                        <span className="min-w-8 text-center text-white">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            handleQuantity(item.id, item.quantity + 1)
                          }
                          className="px-4 py-2 text-white hover:text-gray-300"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemove(item.id)}
                        className="text-sm font-semibold text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="h-fit rounded-xl border border-gray-800 p-6">
              <h2 className="mb-5 text-xl font-semibold text-white">
                Order Summary
              </h2>

              <div className="mb-3 flex justify-between text-sm text-gray-400">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="mb-6 flex justify-between border-t border-gray-800 pt-5 text-lg text-white">
                <span>Total</span>
                <span className="font-bold">£{totalPrice.toFixed(2)}</span>
              </div>

              <Link
                href="/checkout"
                className="block w-full rounded-full border border-white bg-neutral-950 px-6 py-3 text-center text-sm font-bold text-white shadow-sm transition hover:border-gray-300 hover:bg-neutral-900"
              >
                Go to Checkout
              </Link>

              <Link
                href="/shop"
                className="mt-4 block text-center text-sm text-gray-400 hover:text-white"
              >
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}