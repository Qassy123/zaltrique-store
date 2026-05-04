import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="mb-2 text-sm uppercase tracking-[0.3em] text-gray-500">
        Browse Collection
      </p>

      <h1 className="mb-10 text-3xl font-semibold text-white">Shop</h1>

      {products.length === 0 && (
        <p className="text-gray-400">No products yet.</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group rounded-2xl border border-[#1f2937] p-4 transition hover:border-gray-500"
          >
            <div className="mb-4 flex h-44 w-full items-center justify-center overflow-hidden rounded-xl bg-white p-3">
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

            <h3 className="mb-1 font-semibold text-white">{product.name}</h3>

            <p className="mb-2 line-clamp-2 text-sm text-gray-400">
              {product.description}
            </p>

            <p className="text-sm font-semibold text-white">
              £{product.price.toFixed(2)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}