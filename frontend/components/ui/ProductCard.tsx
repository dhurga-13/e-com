"use client";

import Image from "next/image";
import React from "react";
import { Heart, ShoppingCart } from "lucide-react"; // Corrected import for ShoppingCart
import StarRating from "@/components/ui/StarRating";
import { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();

  return (
    <Link
      href={`/product/${product.id}`}
      className="group relative flex flex-col bg-white border border-gray-100 hover:shadow-md transition-shadow duration-300 cursor-pointer"
    >
      <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
        {product.image && (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            quality={90}
            className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
          />
        )}

        {product.badge && (
          <span
            className={`absolute top-3 left-3 z-10 px-2 py-1 text-[11px] font-bold text-white rounded-sm ${
              product.badge === "NEW" ? "bg-[#1565C0]" : "bg-[#e53935]"
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Hover Icons (Top Right) */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
            className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-[#1565C0] hover:text-white transition-colors"
            aria-label="Add to Cart"
            suppressHydrationWarning
          >
            <ShoppingCart size={13} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              isWishlisted(product.id)
                ? removeFromWishlist(product.id)
                : addToWishlist(product);
            }}
            className={`w-8 h-8 bg-white rounded-full shadow flex items-center justify-center transition-colors ${
              isWishlisted(product.id)
                ? "text-red-500"
                : "hover:bg-[#1565C0] hover:text-white"
            }`}
            aria-label="Toggle Wishlist"
            suppressHydrationWarning
          >
            <Heart
              size={13}
              className={isWishlisted(product.id) ? "fill-red-500" : ""}
            />
          </button>
        </div>

        {/* Quick View Button (Bottom) */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#1565C0] text-white text-[11px] font-bold tracking-widest uppercase py-3 text-center opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
          Quick View
        </div>
      </div>

      <div className="pt-6 pb-4 pl-4 flex flex-col items-start text-left">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
          {product.category}
        </p>
        <h3 className="text-[14px] font-semibold text-[#1a1a1a] leading-snug mb-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-[15px] font-bold text-[#1a1a1a]">
            ₹{product.price.toFixed(2)}
          </span>
          {product.oldPrice && (
            <span className="text-[13px] text-gray-400 line-through">
              ₹{product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        <StarRating rating={product.rating} reviews={product.reviews} />
      </div>
    </Link>
  );
}
