"use client";

import { useState } from "react";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup(e: any) {
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
      alert("Account created!");
    } else {
      alert(data.error);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <form onSubmit={handleSignup} className="w-full max-w-md space-y-4">
        <input
          placeholder="First Name"
          required
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3"
        />

        <input
          placeholder="Last Name"
          required
          onChange={(e) => setLastName(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3"
        />

        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3"
        />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3"
        />

        <button className="w-full rounded-full border border-gray-600 py-3">
          Sign Up
        </button>
      </form>
    </div>
  );
}
