import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <section className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-gray-500">
          Legal
        </p>

        <h1 className="mb-6 text-4xl font-bold">Privacy Policy</h1>

        <div className="space-y-6 text-gray-300">
          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">
              Your Privacy Matters
            </h2>
            <p>
              Zaltrique respects your privacy and is committed to protecting
              your personal information. This policy explains what data we
              collect and how we use it.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">
              Information We Collect
            </h2>
            <p>
              We may collect your name, email address, delivery address, order
              details, and limited payment-related information when you use our
              website.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">
              How We Use Your Information
            </h2>
            <p>
              Your information is used to process orders, provide customer
              support, improve our services, and communicate important updates
              regarding your orders or account.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">
              Data Sharing
            </h2>
            <p>
              We do not sell your personal information to third parties. Your
              data may only be shared with trusted services required to operate
              our store, such as payment providers and delivery services.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">
              Payments & Security
            </h2>
            <p>
              Payment information is handled securely by our payment provider
              (Stripe) and is not stored directly by Zaltrique.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">
              Your Rights
            </h2>
            <p>
              You may request access to your personal data, correction of
              inaccurate information, or deletion of your data at any time.
            </p>

            <Link
              href="/contact"
              className="mt-5 inline-block rounded-full border border-gray-600 px-6 py-3 text-sm font-semibold text-white hover:border-white"
            >
              Contact us
            </Link>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">
              Policy Updates
            </h2>
            <p>
              This Privacy Policy may be updated from time to time. Continued use
              of the website means you accept the latest version.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}