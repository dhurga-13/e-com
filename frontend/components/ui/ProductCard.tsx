import Image from "next/image";
import React from "react";
import { Heart, ShoppingCart } from "lucide-react";
import StarRating from "@/components/ui/StarRating";

export default function ProductCard({
  product,
}: {
  product: {
    id: string;
    image: string;
    name: string;
    category: string;
    price: number;
    oldPrice?: number;
    rating: number;
    reviews: number;
    badge?: "NEW" | "25% OFF";
  };
}) {
  const { image, name, category, price, oldPrice, rating, reviews, badge } =
    product;

  return (
    <div className="group relative bg-white border border-transparent rounded hover:border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
        {image && (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            quality={90}
            className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
          />
        )}

        {badge && (
          <span
            className={`absolute top-3 left-3 px-2 py-1 text-[11px] font-bold text-white rounded-sm z-10 ${
              badge === "NEW" ? "bg-[#1565C0]" : "bg-[#e53935]"
            }`}
          >
            {badge}
          </span>
        )}

        {/* Hover Icons (Top Right) */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            suppressHydrationWarning
            className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow text-gray-600 hover:text-[#1565C0] transition-colors"
            aria-label="Add to Wishlist"
          >
            <Heart size={16} />
          </button>
          <button
            suppressHydrationWarning
            className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow text-gray-600 hover:text-[#1565C0] transition-colors"
            aria-label="Add to Cart"
          >
            <ShoppingCart size={16} />
          </button>
        </div>

        {/* Quick View Button (Bottom) */}
        <button
          suppressHydrationWarning
          className="absolute bottom-0 left-0 right-0 bg-[#1565C0] text-white text-[11px] font-bold tracking-widest uppercase py-3 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10"
        >
          Quick View
        </button>
      </div>

      <div className="pt-6 pb-4 pl-4 flex flex-col items-start text-left">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
          {category}
        </p>
        <h3 className="text-[14px] font-semibold text-[#1a1a1a] leading-snug mb-2">
          {name}
        </h3>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-[15px] font-bold text-[#1a1a1a]">
            ${price.toFixed(2)}
          </span>
          {oldPrice && (
            <span className="text-[13px] text-gray-400 line-through">
              ${oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        <StarRating rating={rating} reviews={reviews} />
      </div>
    </div>
  );
}
