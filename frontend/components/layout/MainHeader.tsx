"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, Heart, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function MainHeader() {
  const { totalItems: cartTotal, totalPrice } = useCart();
  const { totalItems: wishlistTotal } = useWishlist();

  return (
    <div className="bg-white py-6 shadow-sm">
      <div className="max-w-[1540px] mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Riode Logo"
            width={100}
            height={30}
            priority
          />
        </Link>

        {/* Search Bar (hidden on small screens) */}
        <div className="hidden lg:flex flex-grow max-w-xl mx-8">
          <input
            type="text"
            placeholder="Search product..."
            className="flex-grow px-4 py-3 border border-gray-200 focus:border-blue-500 outline-none transition-all duration-300 text-sm"
            suppressHydrationWarning
          />
          <button
            className="bg-[#1a1a1a] text-white px-5 py-3 flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
            suppressHydrationWarning
          >
            <Search size={20} />
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6 flex-shrink-0">
          {/* Search Icon (mobile only) */}
          <button
            className="lg:hidden text-[#1a1a1a] hover:text-blue-600 transition-colors"
            suppressHydrationWarning
          >
            <Search size={26} strokeWidth={1.5} />
          </button>

          {/* User Icon */}
          <button
            className="text-[#1a1a1a] hover:text-blue-600 transition-colors"
            suppressHydrationWarning
          >
            <User size={26} strokeWidth={1.5} />
          </button>

          {/* Wishlist Icon */}
          <Link href="/wishlist" className="relative">
            <Heart
              size={26}
              strokeWidth={1.5}
              className="text-[#1a1a1a] hover:text-blue-600 transition-colors"
            />
            {wishlistTotal > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#1565C0] text-white text-[10px] font-bold flex items-center justify-center">
                {wishlistTotal}
              </span>
            )}
          </Link>

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative flex items-center gap-2 cursor-pointer"
          >
            <ShoppingCart
              size={26}
              strokeWidth={1.5}
              className="text-[#1a1a1a] hover:text-blue-600 transition-colors"
            />
            {cartTotal > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#1565C0] text-white text-[10px] font-bold flex items-center justify-center">
                {cartTotal}
              </span>
            )}
            <div className="hidden sm:block text-right">
              <p className="text-gray-400 text-xs leading-none">
                Shopping Cart
              </p>
              <p className="text-[#1a1a1a] font-bold text-sm leading-none mt-1">
                ₹{totalPrice.toFixed(2)}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
