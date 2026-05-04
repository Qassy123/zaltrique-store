import Link from "next/link";

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <section className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-gray-500">
          Help Centre
        </p>

        <h1 className="mb-6 text-4xl font-bold">
          Frequently Asked Questions
        </h1>

        <div className="space-y-6 text-gray-300">
          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">
              How long does delivery take?
            </h2>
            <p>
              Delivery typically takes 3 to 7 working days within the UK after
              your order has been processed and dispatched.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">
              Can I return an item?
            </h2>
            <p>
              Yes. You have 14 days from delivery to request a return, provided
              the item is unused, in its original condition, and in original
              packaging.
            </p>

            <Link
              href="/returns"
              className="mt-5 inline-block rounded-full border border-gray-600 px-6 py-3 text-sm font-semibold text-white hover:border-white"
            >
              View returns policy
            </Link>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">
              How can I track my order?
            </h2>
            <p>
              Once your order has been shipped, you will receive an email with
              tracking details. If Royal Mail tracking is available, you can also
              view tracking from your account order history.
            </p>

            <Link
              href="/account/orders"
              className="mt-5 inline-block rounded-full border border-gray-600 px-6 py-3 text-sm font-semibold text-white hover:border-white"
            >
              View my orders
            </Link>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">
              Do you ship internationally?
            </h2>
            <p>
              No. Zaltrique currently ships within the United Kingdom only.
            </p>

            <Link
              href="/shipping"
              className="mt-5 inline-block rounded-full border border-gray-600 px-6 py-3 text-sm font-semibold text-white hover:border-white"
            >
              View shipping information
            </Link>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">
              How do I contact support?
            </h2>
            <p>
              You can reach us through the Contact page. Please include your
              order number if your message is about an existing order.
            </p>

            <Link
              href="/contact"
              className="mt-5 inline-block rounded-full border border-gray-600 px-6 py-3 text-sm font-semibold text-white hover:border-white"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}