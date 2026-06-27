import React from "react";
import StarRating from "@/components/ui/StarRating";
import Image from "next/image";

export default function MiniProductCard({
  product,
}: {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
    rating: number;
    reviews: number;
  };
}) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="w-[84px] h-[100px] bg-gray-100 flex-shrink-0 relative overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="84px"
          quality={90}
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-col">
        <h4 className="text-[14px] font-semibold text-[#1a1a1a] hover:text-[#1565C0] cursor-pointer mb-1 transition-colors leading-snug">
          {product.name}
        </h4>
        <span className="text-[15px] font-bold text-[#1a1a1a] mb-1">
          ₹{product.price.toFixed(2)}
        </span>
        <StarRating
          rating={product.rating}
          reviews={product.reviews}
          className="text-[11px] text-[#f5a623]"
        />
      </div>
    </div>
  );
}
