"use client";

import React from "react";
import { Star } from "lucide-react";

export default function StarRating({
  rating,
  reviews,
  className,
}: {
  rating: number;
  reviews: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-start ${className || ""}`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-[13px] h-[13px] ${
            i < rating ? "text-[#f5a623]" : "text-gray-300"
          }`}
          fill="currentColor"
        />
      ))}
      <span className="text-[11px] text-gray-500 ml-1">({reviews} Reviews)</span>
    </div>
  );
}

