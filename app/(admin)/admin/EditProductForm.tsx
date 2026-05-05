"use client";

import { useState } from "react";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images: string[];
};

export default function EditProductForm({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "");
    const description = String(formData.get("description") || "");
    const price = Number(formData.get("price"));

    setLoading(true);

    try {
      let images = product.images?.length ? product.images : [product.image];

      if (imageFiles.length > 0) {
        if (imageFiles.length > 5) {
          alert("You can upload a maximum of 5 images");
          return;
        }

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

        images = uploadedImages;
      }

      const res = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          price,
          image: images[0],
          images,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || "Update failed");
      }

      alert("Product updated ✅");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-3 mr-3 rounded-full border border-gray-600 px-4 py-2 text-sm font-semibold text-white hover:border-white"
      >
        Edit
      </button>
    );
  }

  return (
    <form onSubmit={handleUpdate} className="mt-4 space-y-3 rounded-lg border border-gray-800 p-4">
      <input
        name="name"
        defaultValue={product.name}
        required
        className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-white"
      />

      <textarea
        name="description"
        defaultValue={product.description}
        required
        className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-white"
      />

      <input
        name="price"
        type="number"
        step="0.01"
        defaultValue={product.price}
        required
        className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-white"
      />

      <div>
        <label className="mb-2 block text-sm text-gray-400">
          Replace images optional, max 5
        </label>

        <input
          type="file"
          accept="image/*"
          multiple
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
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full border border-white px-5 py-2 text-sm font-semibold text-white hover:bg-white hover:text-black disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save changes"}
        </button>

        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-full border border-gray-600 px-5 py-2 text-sm font-semibold text-white hover:border-white"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}