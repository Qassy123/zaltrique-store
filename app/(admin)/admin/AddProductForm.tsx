"use client";

import { useState } from "react";

export default function AddProductForm() {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");

    if (!imageFile) {
      alert("Please upload an image");
      return;
    }

    setLoading(true);

    try {
      // 1. Upload image to Cloudinary
      const uploadData = new FormData();
      uploadData.append("file", imageFile);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const uploadJson = await uploadRes.json();

      if (!uploadJson.secure_url) {
        throw new Error("Image upload failed");
      }

      const imageUrl = uploadJson.secure_url;

      // 2. Create product in DB
      const productRes = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          price: parseFloat(price as string),
          image: imageUrl,
        }),
      });

      const productJson = await productRes.json();

      if (!productJson.success) {
        throw new Error("Product creation failed");
      }

      alert("Product added successfully ✅");
      form.reset();
      setImageFile(null);

      // refresh page so product shows instantly
      window.location.reload();

    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        placeholder="Product name"
        required
        className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-white"
      />

      <textarea
        name="description"
        placeholder="Product description"
        required
        className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-white"
      />

      <input
        name="price"
        type="number"
        step="0.01"
        placeholder="Price"
        required
        className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-white"
      />

      {/* FILE UPLOAD */}
      <input
        type="file"
        accept="image/*"
        required
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        className="w-full text-white"
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-full border border-gray-600 px-6 py-3 font-semibold hover:border-white disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Add Product"}
      </button>
    </form>
  );
}