"use client";

import { useState } from "react";
import { addToCart } from "@/lib/cart";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addToCart(product);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  }

  return (
    <button
      onClick={handleAddToCart}
      className={`rounded-full px-8 py-3 text-sm font-semibold transition ${
        added
          ? "border border-green-500 text-green-400"
          : "border border-gray-600 text-white hover:border-white"
      }`}
    >
      {added ? "Added ✓" : "Add to Cart"}
    </button>
  );
}