import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  });

  return (
    <>
      <section className="min-h-[75vh]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-gray-400">
              Premium General Store
            </p>

            <h1 className="mb-6 text-5xl font-bold leading-tight text-white md:text-7xl">
              Discover quality products with a luxury touch.
            </h1>

            <p className="mb-8 max-w-xl text-lg leading-8 text-gray-300">
              Zaltrique brings together carefully selected everyday products,
              stylish essentials, and trending finds in one simple premium
              store.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-full border border-gray-600 px-8 py-3 text-sm font-semibold text-white transition hover:border-white"
              >
                Shop Now
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-gray-600 px-8 py-3 text-sm font-semibold text-white transition hover:border-white"
              >
                About Zaltrique
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="rounded-3xl border border-gray-800 bg-[#0b0b0b] p-8 shadow-2xl">
              <Image
                src="/images/zaltrique-logo.png"
                alt="Zaltrique logo"
                width={500}
                height={500}
                className="rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-gray-500">
              Latest arrivals
            </p>
            <h2 className="text-3xl font-semibold text-white">
              Featured Products
            </h2>
          </div>

          <Link
            href="/shop"
            className="text-sm font-semibold text-gray-300 hover:text-white"
          >
            View all products →
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="rounded-2xl border border-gray-800 bg-[#0b0b0b] p-8 text-center">
            <h3 className="mb-2 text-xl font-semibold text-white">
              No products yet
            </h3>
            <p className="text-gray-400">
              Add products from the admin dashboard and they will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group rounded-2xl border border-gray-800 bg-[#0b0b0b] p-4 transition hover:border-gray-500"
              >
                <div className="mb-4 flex h-48 items-center justify-center overflow-hidden rounded-xl bg-white p-3">
                  <div className="relative h-full w-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-contain transition duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>

                <h3 className="mb-2 text-lg font-medium text-white">
                  {product.name}
                </h3>

                <p className="mb-3 line-clamp-2 text-sm text-gray-400">
                  {product.description}
                </p>

                <p className="font-semibold text-white">
                  £{product.price.toFixed(2)}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}