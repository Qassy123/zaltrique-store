"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (stored) {
      const parsedUser = JSON.parse(stored);
      setUser(parsedUser);
      setFirstName(parsedUser.firstName || "");
      setLastName(parsedUser.lastName || "");
      setEmail(parsedUser.email || "");
    }
  }, []);

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!user) return;

    const res = await fetch("/api/auth/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user.id,
        firstName,
        lastName,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      setPassword("");
      alert("Account updated successfully");
    } else {
      alert(data.error || "Failed to update account");
    }
  }

  function handleLogout() {
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
        <div className="rounded-xl border border-gray-800 p-6">
          <p className="mb-4 text-gray-300">You are not logged in.</p>

          <a
            href="/login"
            className="inline-block rounded-full border border-gray-600 px-6 py-3 text-sm font-semibold hover:border-white"
          >
            Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-16 text-white">
      <p className="mb-2 text-sm uppercase tracking-[0.3em] text-gray-500">
        Account
      </p>

      <h1 className="mb-8 text-3xl font-semibold">My Account</h1>

      <div className="mb-10 rounded-xl border border-gray-800 p-6">
        <h2 className="mb-4 text-xl font-semibold">Account Details</h2>

        <p className="mb-2 text-gray-300">
          <strong>Name:</strong> {user.firstName} {user.lastName}
        </p>

        <p className="text-gray-300">
          <strong>Email:</strong> {user.email}
        </p>
      </div>

      <div className="mb-10 rounded-xl border border-gray-800 p-6">
        <h2 className="mb-4 text-xl font-semibold">Your Orders</h2>

        <p className="mb-5 text-gray-300">
          View your order history, payment status, shipping status, and Royal
          Mail tracking.
        </p>

        <Link
          href="/account/orders"
          className="inline-block rounded-full border border-gray-600 px-6 py-3 text-sm font-semibold hover:border-white"
        >
          View My Orders
        </Link>
      </div>

      <form
        onSubmit={handleUpdate}
        className="space-y-4 rounded-xl border border-gray-800 p-6"
      >
        <h2 className="mb-4 text-xl font-semibold">Update Details</h2>

        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
          required
          className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-white"
        />

        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last name"
          required
          className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-white"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          required
          className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-white"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="New password optional"
          className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-white"
        />

        <button
          type="submit"
          className="rounded-full border border-gray-600 px-6 py-3 font-semibold hover:border-white"
        >
          Save Changes
        </button>
      </form>

      <button
        onClick={handleLogout}
        className="mt-6 rounded-full border border-red-500 px-6 py-3 font-semibold text-red-400 hover:border-red-400 hover:text-red-300"
      >
        Logout
      </button>
    </section>
  );
}