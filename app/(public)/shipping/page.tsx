import Link from "next/link";

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <section className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-gray-500">
          Delivery Information
        </p>

        <h1 className="mb-6 text-4xl font-bold">Shipping</h1>

        <div className="space-y-6 text-gray-300">
          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">
              UK Delivery Only
            </h2>
            <p>
              Zaltrique currently delivers within the United Kingdom only. We do
              not currently offer international shipping.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">
              Delivery Method
            </h2>
            <p>
              Orders are shipped using Royal Mail or another suitable UK courier
              depending on the product and delivery requirements.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">
              Estimated Delivery Times
            </h2>
            <p>
              Estimated delivery is usually 3 to 7 working days after your order
              has been processed and dispatched.
            </p>
            <p className="mt-3">
              During busy periods, delivery may take slightly longer.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">
              Tracking
            </h2>
            <p>
              Once your order has been shipped, you will receive a shipping email
              with your tracking details.
            </p>
            <p className="mt-3">
              If Royal Mail tracking is available, you can also view it from your
              account order history page.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">
              Need Help?
            </h2>
            <p>
              If you have a question about your delivery, please contact us and
              include your order number.
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