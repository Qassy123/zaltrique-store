import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <section className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-gray-500">
          Our Brand
        </p>

        <h1 className="mb-6 text-4xl font-bold">About Zaltrique</h1>

        <div className="space-y-6 text-gray-300">
          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">
              Premium Everyday Products
            </h2>
            <p>
              Zaltrique is a modern UK general store focused on delivering
              stylish, practical, and reliable products for everyday life.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">
              Our Mission
            </h2>
            <p>
              Our goal is simple: to bring together trending, useful, and
              carefully selected items in one clean and premium shopping
              experience.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">
              Carefully Selected
            </h2>
            <p>
              We aim to choose products that combine function, design, and value,
              so you can shop with confidence.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">
              Built For A Smooth Experience
            </h2>
            <p>
              Whether you are looking for everyday essentials or something new,
              Zaltrique is built to make shopping smooth, simple, and enjoyable.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">
              UK Focused
            </h2>
            <p>
              We currently serve customers within the United Kingdom, with secure
              checkout, order confirmation emails, and tracking updates when
              orders are dispatched.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="rounded-full border border-gray-600 px-6 py-3 text-sm font-semibold text-white hover:border-white"
              >
                Shop products
              </Link>

              <Link
                href="/shipping"
                className="rounded-full border border-gray-600 px-6 py-3 text-sm font-semibold text-white hover:border-white"
              >
                Shipping info
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}