import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <section className="mx-auto max-w-3xl rounded-xl border border-gray-800 p-8 text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-gray-500">
          Order confirmed
        </p>

        <h1 className="mb-4 text-3xl font-bold">Payment successful</h1>

        <p className="mx-auto mb-8 max-w-xl text-gray-300">
          Thank you for your order. Your payment has been received, and your
          confirmation email should arrive shortly.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/account/orders"
            className="rounded-full border border-white px-6 py-3 text-sm font-semibold text-white hover:bg-white hover:text-black"
          >
            View my orders
          </Link>

          <Link
            href="/shop"
            className="rounded-full border border-gray-600 px-6 py-3 text-sm font-semibold text-white hover:border-white"
          >
            Continue shopping
          </Link>
        </div>
      </section>
    </main>
  );
}