"use client";

import { useState } from "react";

export default function AddProductForm() {
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");

    if (imageFiles.length === 0) {
      alert("Please upload at least 1 image");
      return;
    }

    if (imageFiles.length > 5) {
      alert("You can upload a maximum of 5 images");
      return;
    }

    setLoading(true);

    try {
      const uploadedImages: string[] = [];

      for (const file of imageFiles) {
        const uploadData = new FormData();
        uploadData.append("file", file);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        const uploadJson = await uploadRes.json();

        if (!uploadJson.secure_url) {
          throw new Error("Image upload failed");
        }

        uploadedImages.push(uploadJson.secure_url);
      }

      const productRes = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          price: parseFloat(price as string),
          image: uploadedImages[0],
          images: uploadedImages,
        }),
      });

      const productJson = await productRes.json();

      if (!productJson.success) {
        throw new Error(productJson.error || "Product creation failed");
      }

      alert("Product added successfully ✅");
      form.reset();
      setImageFiles([]);
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

      <div>
        <label className="mb-2 block text-sm text-gray-400">
          Product images (up to 5)
        </label>

        <input
          type="file"
          accept="image/*"
          multiple
          required
          onChange={(e) => {
            const files = Array.from(e.target.files || []);

            if (files.length > 5) {
              alert("You can upload a maximum of 5 images");
              e.target.value = "";
              setImageFiles([]);
              return;
            }

            setImageFiles(files);
          }}
          className="w-full text-white"
        />

        {imageFiles.length > 0 && (
          <p className="mt-2 text-sm text-gray-400">
            {imageFiles.length} image{imageFiles.length === 1 ? "" : "s"} selected
          </p>
        )}
      </div>

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