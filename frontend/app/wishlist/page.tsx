"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingCart, Heart } from "lucide-react";

import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

import TopBar from "@/components/layout/TopBar"; // Re-added import
import MainHeader from "@/components/layout/MainHeader"; // Re-added import
import Navbar from "@/components/layout/Navbar"; // Re-added import

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="w-full">
      <main className="w-full min-h-[60vh] py-12">
        <div className="max-w-[1540px] mx-auto px-8">
          {/* title row */}
          <div className="mb-8 pb-6 border-b border-gray-200 flex items-center justify-between">
            <h1 className="text-[28px] font-black text-[#1a1a1a]">
              My Wishlist
            </h1>
            <span className="text-[14px] text-gray-500">
              {items.length} items
            </span>
          </div>

          {items.length === 0 ? (
            // empty state
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Heart size={64} className="text-gray-200" />
              <p className="text-[20px] font-bold text-gray-400">
                Your wishlist is empty
              </p>
              <p className="text-[14px] text-gray-400">
                Browse our products and add items you love
              </p>
              <Link
                href="/"
                className="bg-[#1565C0] text-white px-8 py-3 text-[14px] font-bold hover:bg-[#0D47A1] transition-colors"
              >
                CONTINUE SHOPPING
              </Link>
            </div>
          ) : (
            // wishlist table
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#f5f5f5]">
                  <th className="px-4 py-4 text-left text-[12px] font-bold text-gray-500 uppercase tracking-widest w-[40%]">
                    PRODUCT
                  </th>
                  <th className="px-4 py-4 text-left text-[12px] font-bold text-gray-500 uppercase tracking-widest w-[20%]">
                    PRICE
                  </th>
                  <th className="px-4 py-4 text-left text-[12px] font-bold text-gray-500 uppercase tracking-widest w-[20%]">
                    STATUS
                  </th>
                  <th className="px-4 py-4 text-left text-[12px] font-bold text-gray-500 uppercase tracking-widest w-[20%]">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-[72px] h-[72px] bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] text-gray-400 uppercase tracking-widest">
                            {item.category}
                          </span>
                          <span className="text-[14px] font-semibold text-[#1a1a1a] hover:text-[#1565C0] cursor-pointer">
                            {item.name}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[15px] font-bold text-[#1a1a1a]">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-4">
                      <span className="bg-green-100 text-green-700 text-[11px] font-semibold px-3 py-1 rounded-full">
                        In Stock
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => addToCart(item)}
                          className="flex items-center gap-2 bg-[#1565C0] text-white text-[12px] font-bold px-4 py-2.5 hover:bg-[#0D47A1] transition-colors cursor-pointer"
                        >
                          <ShoppingCart size={13} /> ADD TO CART
                        </button>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="w-9 h-9 border border-gray-200 flex items-center justify-center hover:border-red-400 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
