import Link from "next/link";

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <section className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-gray-500">
          Customer Support
        </p>

        <h1 className="mb-6 text-4xl font-bold">Returns & Refunds</h1>

        <div className="space-y-6 text-gray-300">
          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">
              Our Returns Policy
            </h2>
            <p>
              At Zaltrique, we want you to be fully satisfied with your
              purchase. If something is not right, you can request a return
              within 14 days from the date of delivery.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">
              Return Conditions
            </h2>
            <p>
              Items must be unused, in their original condition, and in their
              original packaging.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">
              How To Start A Return
            </h2>
            <p>
              To start a return, please contact us through the Contact page and
              include your order number, email address, and reason for return.
            </p>

            <Link
              href="/contact"
              className="mt-5 inline-block rounded-full border border-gray-600 px-6 py-3 text-sm font-semibold text-white hover:border-white"
            >
              Contact us
            </Link>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">Refunds</h2>
            <p>
              Once your return is approved and received, we will process your
              refund within 5 to 7 business days. Your bank or payment provider
              may take additional time to show the refund in your account.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">
              Shipping Costs
            </h2>
            <p>
              Shipping costs are non-refundable unless the item is faulty,
              damaged, or incorrect.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">
              Damaged Or Incorrect Items
            </h2>
            <p>
              If you receive a damaged or incorrect item, please contact us as
              soon as possible so we can help resolve the issue quickly.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}