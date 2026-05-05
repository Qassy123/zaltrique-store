"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/";
    } else {
      alert(data.error);
    }
  }

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <section className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-black p-8 shadow-2xl">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-gray-500">
            Welcome back
          </p>

          <h1 className="mb-2 text-3xl font-bold text-white">
            Log in to Zaltrique
          </h1>

          <p className="mb-8 text-sm leading-6 text-gray-400">
            Access your account, view your orders, and track your deliveries.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
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
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Haven&apos;t got an account?{" "}
            <Link href="/signup" className="font-semibold text-white hover:underline">
              Sign up today
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}