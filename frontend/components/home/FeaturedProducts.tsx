"use client";

import React, { useState } from "react";
import ProductCard from "@/components/ui/ProductCard";

const TABS = ["All", "Best Sellers", "New", "Popular"];

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    image: "/products/product-1.jpg",
    name: "Fashionable Leather Backpack",
    category: "Bags",
    price: 120.0,
    rating: 4,
    reviews: 12,
  },
  {
    id: "p2",
    image: "/products/product-2.jpg",
    name: "Elegant Women's Dress",
    category: "Apparel",
    price: 85.0,
    rating: 5,
    reviews: 25,
  },
  {
    id: "p3",
    image: "/products/product-3.jpg",
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 60.0,
    rating: 4,
    reviews: 8,
  },
  {
    id: "p4",
    image: "/products/product-4.jpg",
    name: "Classic Men's Watch",
    category: "Accessories",
    price: 199.0,
    rating: 4,
    reviews: 15,
  },
  {
    id: "p5",
    image: "/products/product-5.jpg",
    name: "Stylish Sunglasses",
    category: "Accessories",
    price: 45.0,
    rating: 3,
    reviews: 7,
  },
];

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
          {DUMMY_PRODUCTS.slice(0, 5).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
