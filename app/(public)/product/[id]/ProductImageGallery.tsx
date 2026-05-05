"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductImageGallery({
  images,
  productName,
}: {
  images: string[];
  productName: string;
}) {
  const safeImages = images.length > 0 ? images : [];
  const [selectedImage, setSelectedImage] = useState(safeImages[0]);

  if (!selectedImage) return null;

  return (
    <div>
      <div className="rounded-2xl border border-gray-800 bg-white p-4 sm:p-6">
        <div className="relative mx-auto aspect-square w-full max-w-[520px]">
          <Image
            src={selectedImage}
            alt={productName}
            fill
            sizes="(max-width: 768px) 90vw, (max-width: 1024px) 70vw, 520px"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {safeImages.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-3">
          {safeImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelectedImage(image)}
              className={`rounded-xl border bg-white p-2 transition ${
                selectedImage === image
                  ? "border-white"
                  : "border-gray-800 hover:border-gray-500"
              }`}
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={image}
                  alt={`${productName} image ${index + 1}`}
                  fill
                  sizes="100px"
                  className="object-contain"
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}