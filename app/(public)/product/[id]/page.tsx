import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AddToCartButton from "./AddToCartButton";
import ProductImageGallery from "./ProductImageGallery";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return (
      <main className="min-h-screen bg-black px-6 py-16 text-white">
        <div className="mx-auto max-w-4xl rounded-xl border border-gray-800 p-8 text-center">
          <h1 className="mb-4 text-3xl font-bold">Product not found</h1>
          <p className="mb-6 text-gray-400">
            This product may have been removed or is no longer available.
          </p>
          <Link
            href="/shop"
            className="inline-block rounded-full border border-gray-600 px-6 py-3 text-sm font-semibold hover:border-white"
          >
            Back to shop
          </Link>
        </div>
      </main>
    );
  }

  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white lg:py-16">
      <section className="mx-auto max-w-6xl">
        <Link
          href="/shop"
          className="mb-8 inline-block text-sm text-gray-400 hover:text-white"
        >
          ← Back to shop
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <ProductImageGallery
            images={productImages}
            productName={product.name}
          />

          <div className="rounded-2xl border border-gray-800 p-6 lg:p-8">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-gray-500">
              Zaltrique Product
            </p>

            <h1 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
              {product.name}
            </h1>

            <p className="mb-6 whitespace-pre-line leading-7 text-gray-300">
              {product.description}
            </p>

            <p className="mb-6 text-3xl font-bold text-white">
              £{product.price.toFixed(2)}
            </p>

            <div className="mb-6">
              <AddToCartButton product={product} />
            </div>

            <div className="mt-4 rounded-xl border border-gray-800 bg-neutral-950 p-5">
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✓ Free UK delivery</li>
                <li>✓ 14-day returns</li>
                <li>✓ Secure checkout with Stripe</li>
                <li>✓ Tracking emailed after dispatch</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}