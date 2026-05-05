"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Account created! Please log in.");
      window.location.href = "/login";
    } else {
      alert(data.error);
    }
  }

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <section className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-black p-8 shadow-2xl">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-gray-500">
            Join Zaltrique
          </p>

          <h1 className="mb-2 text-3xl font-bold text-white">
            Create your account
          </h1>

          <p className="mb-8 text-sm leading-6 text-gray-400">
            Sign up to track orders, save your details, and manage deliveries.
          </p>

          <form onSubmit={handleSignup} className="space-y-4">
            <input
              placeholder="First name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-xl border border-gray-800 bg-neutral-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-gray-500"
            />

            <input
              placeholder="Last name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded-xl border border-gray-800 bg-neutral-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-gray-500"
            />

            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-800 bg-neutral-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-gray-500"
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-800 bg-neutral-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-gray-500"
            />

            <button className="w-full rounded-full border border-white px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black">
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-white hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}