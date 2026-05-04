import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <section className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-gray-500">
          Legal
        </p>

        <h1 className="mb-6 text-4xl font-bold">Terms & Conditions</h1>

        <div className="space-y-6 text-gray-300">
          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">
              Agreement To Our Terms
            </h2>
            <p>
              By using Zaltrique, browsing our website, or placing an order, you
              agree to these Terms & Conditions. Please read them carefully
              before making a purchase.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">
              Product Information
            </h2>
            <p>
              All products listed on our website are subject to availability. We
              aim to keep product descriptions, images, prices, and details as
              accurate as possible.
            </p>
            <p className="mt-3">
              We reserve the right to update prices, descriptions, images, and
              product details at any time.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">Orders</h2>
            <p>
              When placing an order, you agree that all information provided is
              accurate, complete, and up to date.
            </p>
            <p className="mt-3">
              If incorrect delivery details are provided, this may delay or
              prevent delivery.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">Payments</h2>
            <p>
              Payments must be completed before an order is processed. Orders may
              be cancelled if payment cannot be verified or if suspicious payment
              activity is detected.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">Shipping</h2>
            <p>
              Zaltrique currently ships within the United Kingdom only. Delivery
              times are estimates and may vary depending on courier service,
              product availability, and busy periods.
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
              Returns & Refunds
            </h2>
            <p>
              Returns and refunds are handled according to our Returns & Refunds
              policy. Please review this before requesting a return.
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
              Delivery Delays
            </h2>
            <p>
              We are not responsible for delays caused by couriers, incorrect
              delivery details, weather, strikes, customs checks, or other
              circumstances outside our control.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">
              Updates To These Terms
            </h2>
            <p>
              These terms may be updated at any time. Continued use of the
              website means you accept the latest version of these Terms &
              Conditions.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">
              Contact Us
            </h2>
            <p>
              If you have any questions about these Terms & Conditions, please
              contact us through our contact page.
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