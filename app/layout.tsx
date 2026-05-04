import "./globals.css";
import Link from "next/link";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Zaltrique | Premium UK General Store",
  description:
    "Shop high-quality everyday products with fast UK delivery. Secure checkout, easy returns, and trusted service.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar />

        <main>{children}</main>

        <footer className="border-t border-gray-800 bg-black px-6 py-12">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
            <div>
              <h2 className="mb-3 text-xl font-semibold text-white">
                Zaltrique
              </h2>
              <p className="max-w-xs text-sm leading-6 text-gray-400">
                A premium UK general store for quality everyday products,
                stylish essentials, and trending finds.
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
                Store
              </h3>
              <div className="space-y-3 text-sm text-gray-400">
                <Link href="/shop" className="block hover:text-white">
                  Shop
                </Link>
                <Link href="/about" className="block hover:text-white">
                  About
                </Link>
                <Link href="/reviews" className="block hover:text-white">
                  Reviews
                </Link>
                <Link href="/faq" className="block hover:text-white">
                  FAQ
                </Link>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
                Support
              </h3>
              <div className="space-y-3 text-sm text-gray-400">
                <Link href="/contact" className="block hover:text-white">
                  Contact Us
                </Link>
                <Link href="/complaints" className="block hover:text-white">
                  Complaints
                </Link>
                <Link href="/shipping" className="block hover:text-white">
                  Shipping
                </Link>
                <Link href="/returns" className="block hover:text-white">
                  Returns
                </Link>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
                Legal
              </h3>
              <div className="space-y-3 text-sm text-gray-400">
                <Link href="/terms" className="block hover:text-white">
                  Terms & Conditions
                </Link>
                <Link href="/privacy" className="block hover:text-white">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-gray-900 pt-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Zaltrique. All rights reserved.</p>
            <p>UK delivery only · Secure payments via Stripe</p>
          </div>
        </footer>
      </body>
    </html>
  );
}