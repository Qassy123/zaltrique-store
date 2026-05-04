"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  email: string | null;
  total: number;
  createdAt: string;
  status: string;
  trackingCode: string | null;
  paymentStatus: string;
  fullName: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  postcode: string | null;
  country: string | null;
  orderItems: OrderItem[];
};

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export default function AccountOrdersPage() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      setLoading(false);
      return;
    }

    const parsedUser = JSON.parse(savedUser) as User;
    setUser(parsedUser);

    async function loadOrders() {
      try {
        const res = await fetch("/api/orders/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: parsedUser.id,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Failed to load orders.");
          return;
        }

        setOrders(data.orders || []);
      } catch {
        setError("Something went wrong loading your orders.");
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-black px-6 py-12 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-gray-400">Loading your orders...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-black px-6 py-12 text-white">
        <div className="mx-auto max-w-5xl rounded-xl border border-gray-800 p-8">
          <h1 className="mb-4 text-3xl font-bold">Your Orders</h1>
          <p className="mb-6 text-gray-400">
            Please log in to view your order history.
          </p>
          <Link
            href="/login"
            className="inline-block rounded-full border border-gray-600 px-6 py-3 text-sm font-semibold hover:border-white"
          >
            Log in
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Your Orders</h1>
            <p className="mt-2 text-gray-500">
              View your Zaltrique order history and tracking details.
            </p>
          </div>

          <Link
            href="/account"
            className="rounded-lg border border-gray-600 px-6 py-3 text-center text-sm font-semibold hover:border-white"
          >
            Back to account
          </Link>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-500 p-4 text-red-400">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="rounded-xl border border-gray-800 p-8">
            <h2 className="mb-2 text-xl font-semibold">No orders yet</h2>
            <p className="mb-6 text-gray-400">
              When you place an order, it will appear here.
            </p>
            <Link
              href="/shop"
              className="inline-block rounded-full border border-gray-600 px-6 py-3 text-sm font-semibold hover:border-white"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const royalMailTrackingUrl = order.trackingCode
                ? `https://www.royalmail.com/track-your-item#/tracking-results/${order.trackingCode}`
                : null;

              return (
                <div
                  key={order.id}
                  className="rounded-xl border border-gray-800 bg-black p-6"
                >
                  <div className="mb-6 flex flex-col gap-4 border-b border-gray-800 pb-6 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="mb-1 text-sm text-gray-500">Order ID</p>
                      <h2 className="break-all text-lg font-semibold text-white">
                        {order.id}
                      </h2>
                      <p className="mt-2 text-sm text-gray-400">
                        Placed on{" "}
                        {new Date(order.createdAt).toLocaleDateString("en-GB")}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-xl font-bold text-white">
                        £{order.total.toFixed(2)}
                      </p>
                      <p className="mt-2 text-sm capitalize text-gray-300">
                        Payment: {order.paymentStatus}
                      </p>
                      <p className="text-sm capitalize text-gray-300">
                        Status: {order.status}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        Items ordered
                      </h3>

                      <div className="space-y-3">
                        {order.orderItems.map((item) => (
                          <div
                            key={item.id}
                            className="rounded-xl border border-gray-800 bg-neutral-950 p-4"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="text-base font-semibold text-white">
                                  {item.name}
                                </p>
                                <p className="mt-1 text-sm text-gray-400">
                                  Quantity: {item.quantity}
                                </p>
                                <p className="mt-1 text-sm text-gray-400">
                                  Price each: £{item.price.toFixed(2)}
                                </p>
                              </div>

                              <p className="text-base font-semibold text-white">
                                £{(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        Delivery
                      </h3>

                      <div className="rounded-xl border border-gray-800 bg-neutral-950 p-4 text-sm text-gray-300">
                        <p>{order.fullName}</p>
                        <p>{order.addressLine1}</p>
                        {order.addressLine2 && <p>{order.addressLine2}</p>}
                        <p>
                          {order.city}
                          {order.postcode ? `, ${order.postcode}` : ""}
                        </p>
                        <p>{order.country || "United Kingdom"}</p>
                      </div>

                      <div className="mt-4">
                        {royalMailTrackingUrl && order.trackingCode ? (
                          <div className="rounded-xl border border-gray-800 bg-neutral-950 p-4">
                            <p className="text-sm text-gray-500">
                              Tracking code
                            </p>

                            <p className="mt-1 break-all text-base font-semibold tracking-wide text-white">
                              {order.trackingCode}
                            </p>

                            <a
                              href={royalMailTrackingUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-4 inline-flex items-center justify-center rounded-lg border border-gray-600 bg-black px-5 py-3 text-sm font-bold text-white transition hover:border-white"
                            >
                              Track with Royal Mail
                            </a>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-400">
                            Tracking will appear here once your order has been
                            shipped.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}