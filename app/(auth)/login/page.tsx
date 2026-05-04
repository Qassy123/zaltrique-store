"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: any) {
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
      alert("Logged in!");

      // TEMP: store user locally (we upgrade this later)
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "/";
    } else {
      alert(data.error);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <form onSubmit={handleLogin} className="w-full max-w-md space-y-4">
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
          Login
        </button>
      </form>
    </div>
  );
}