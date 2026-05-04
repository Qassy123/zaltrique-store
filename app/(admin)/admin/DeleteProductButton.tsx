"use client";

import { useState } from "react";

export default function DeleteProductButton({
  id,
}: {
  id: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this product?")) return;

    setLoading(true);

    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      window.location.reload();
    } else {
      alert("Failed to delete");
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="mt-2 text-sm text-red-400 hover:text-red-600"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}