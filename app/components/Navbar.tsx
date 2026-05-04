"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getCartItems } from "@/lib/cart";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  function updateCartCount() {
    const items = getCartItems();
    const count = items.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  }

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }

    updateCartCount();

    window.addEventListener("focus", updateCartCount);
    window.addEventListener("pageshow", updateCartCount);
    window.addEventListener("storage", updateCartCount);

    const interval = setInterval(updateCartCount, 500);

    return () => {
      window.removeEventListener("focus", updateCartCount);
      window.removeEventListener("pageshow", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
      clearInterval(interval);
    };
  }, []);

  function closeMenu() {
    setMenuOpen(false);
    updateCartCount();
  }

  const cartText = cartCount > 0 ? `Cart (${cartCount})` : "Cart";

  return (
    <nav className="border-b border-gray-800 bg-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" onClick={closeMenu} className="flex items-center gap-3">
          <Image
            src="/images/zaltrique-logo.png"
            alt="Zaltrique logo"
            width={42}
            height={42}
            style={{ height: "auto" }}
            className="rounded-sm"
          />
          <span className="text-xl font-semibold tracking-wide text-white">
            Zaltrique
          </span>
        </Link>

        <div className="hidden items-center gap-6 text-sm text-white md:flex">
          <Link href="/shop" className="hover:text-gray-300">
            Shop
          </Link>
          <Link href="/about" className="hover:text-gray-300">
            About
          </Link>
          <Link href="/reviews" className="hover:text-gray-300">
            Reviews
          </Link>
          <Link href="/contact" className="hover:text-gray-300">
            Contact
          </Link>
          <Link href="/faq" className="hover:text-gray-300">
            FAQ
          </Link>
        </div>

        <div className="hidden items-center gap-4 text-sm text-white md:flex">
          <Link href="/cart" className="hover:text-gray-300">
            {cartText}
          </Link>

          {user ? (
            <Link href="/account" className="hover:text-gray-300">
              Account
            </Link>
          ) : (
            <Link href="/login" className="hover:text-gray-300">
              Login
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-md border border-gray-700 px-3 py-2 text-sm font-semibold text-white md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-gray-800 px-6 py-5 md:hidden">
          <div className="flex flex-col gap-4 text-sm text-white">
            <Link href="/shop" onClick={closeMenu} className="hover:text-gray-300">
              Shop
            </Link>

            <Link href="/about" onClick={closeMenu} className="hover:text-gray-300">
              About
            </Link>

            <Link
              href="/reviews"
              onClick={closeMenu}
              className="hover:text-gray-300"
            >
              Reviews
            </Link>

            <Link
              href="/contact"
              onClick={closeMenu}
              className="hover:text-gray-300"
            >
              Contact
            </Link>

            <Link href="/faq" onClick={closeMenu} className="hover:text-gray-300">
              FAQ
            </Link>

            <div className="my-2 border-t border-gray-800" />

            <Link href="/cart" onClick={closeMenu} className="hover:text-gray-300">
              {cartText}
            </Link>

            {user ? (
              <Link
                href="/account"
                onClick={closeMenu}
                className="hover:text-gray-300"
              >
                Account
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={closeMenu}
                className="hover:text-gray-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}