import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AddToCartButton from "./AddToCartButton";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
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

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <section className="mx-auto max-w-6xl">
        <Link
          href="/shop"
          className="mb-8 inline-block text-sm text-gray-400 hover:text-white"
        >
          ← Back to shop
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* IMAGE */}
          <div className="rounded-2xl border border-gray-800 bg-white p-6">
            <div className="relative h-[420px] w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex flex-col justify-center rounded-2xl border border-gray-800 p-6">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-gray-500">
              Zaltrique Product
            </p>

            <h1 className="mb-4 text-4xl font-bold text-white">
              {product.name}
            </h1>

            <p className="mb-6 leading-8 text-gray-300">
              {product.description}
            </p>

            <p className="mb-6 text-3xl font-bold text-white">
              £{product.price.toFixed(2)}
            </p>

            <div className="mb-6">
              <AddToCartButton product={product} />
            </div>

            {/* 🔥 TRUST SECTION */}
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