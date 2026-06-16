"use client";

import React, { useState } from "react";
import ProductCard from "@/components/ui/ProductCard";
import { PRODUCTS } from "@/lib/products";

const TABS = ["All", "Best Sellers", "New", "Popular"];

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <section className="w-full pt-0 pb-16">
      <div className="max-w-[1540px] mx-auto px-4 md:px-8">
        <h2 className="text-[22px] font-bold text-[#1a1a1a] text-center mb-6">
          Our Featured
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {PRODUCTS.slice(0, 5).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
