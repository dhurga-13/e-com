"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Home,
  ShoppingCart,
  Heart,
  Minus,
  Plus,
  Check,
  Shield,
  Truck,
} from "lucide-react";

import { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

import StarRating from "@/components/ui/StarRating";

export default function ProductDetailClient({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(product?.image || "");
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();

  const tabLabels: Record<string, string> = {
    description: "Description",
    additional: "Additional Information",
    "size-guide": "Size Guide",
    reviews: `Reviews (${product.reviews})`,
  };

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="w-full bg-[#f5f5f5] border-b border-gray-200 py-3">
        <div className="max-w-[1540px] mx-auto px-4 md:px-8 flex items-center gap-2 text-[13px] text-gray-500">
          <Link href="/">
            <Home size={13} />
          </Link>
          <ChevronRight size={13} />
          <Link href="/" className="hover:text-[#1565C0]">
            Products
          </Link>
          <ChevronRight size={13} />
          <span className="text-[#1a1a1a] font-medium">Detail</span>
          <div className="ml-auto hidden sm:flex items-center gap-4">
            <Link
              href="/"
              className="text-[13px] text-gray-500 hover:text-[#1565C0]"
            >
              &larr; Prev
            </Link>
            <Link
              href="/"
              className="text-[13px] text-gray-500 hover:text-[#1565C0]"
            >
              Next &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="w-full py-10 bg-white">
        <div className="max-w-[1540px] mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-6 md:gap-10 items-start">
          {/* Thumbnail Column */}
          <div className="flex flex-row md:flex-col gap-3 w-full md:w-[88px] flex-shrink-0 order-2 md:order-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {[product.image, product.image, product.image, product.image].map(
              (img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 md:w-[88px] md:h-[88px] border-2 cursor-pointer overflow-hidden rounded-sm transition-colors flex-shrink-0 ${
                    selectedImage === img
                      ? "border-[#1565C0]"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </div>
              ),
            )}
          </div>

          {/* Main Image */}
          <div
            className="w-full flex-1 relative bg-[#f5f5f5] rounded-sm overflow-hidden order-1 md:order-2"
            style={{ aspectRatio: "1" }}
          >
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-contain p-6"
            />
            {product.badge && (
              <span
                className={`absolute top-4 left-4 z-10 px-3 py-1 text-[12px] font-bold text-white ${
                  product.badge === "NEW" ? "bg-[#1565C0]" : "bg-[#e53935]"
                }`}
              >
                {product.badge}
              </span>
            )}
          </div>

          {/* Info Column */}
          <div className="w-full md:w-[420px] flex-shrink-0 flex flex-col order-3">
            <h1 className="text-2xl md:text-[28px] font-bold text-[#1a1a1a] leading-tight mb-2">
              {product.name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-gray-500 mb-3 pb-3 border-b border-gray-200">
              <span>
                SKU:{" "}
                <span className="font-semibold text-[#1a1a1a]">12345670</span>
              </span>
              <span>
                BRAND:{" "}
                <span className="font-semibold text-[#1a1a1a]">
                  The Northland
                </span>
              </span>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl md:text-[32px] font-bold text-[#c8232c]">
                ${product.price.toFixed(2)}
              </span>
              {product.oldPrice && (
                <span className="text-[16px] text-gray-400 line-through">
                  ${product.oldPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-200">
              <StarRating rating={product.rating} reviews={product.reviews} />
              <span className="text-[13px] text-gray-500">
                ( {product.reviews} Reviews )
              </span>
            </div>

            <p className="text-[14px] text-gray-600 leading-relaxed mb-6 pb-6 border-b border-gray-200">
              {product.description}
            </p>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-[14px] font-semibold text-[#1a1a1a] w-[60px]">
                Color:
              </span>
              <select
                className="border border-gray-300 text-[13px] px-3 py-2 pr-8 bg-white cursor-pointer focus:outline-none focus:border-[#1565C0] w-full sm:w-[200px]"
                suppressHydrationWarning
              >
                <option>Choose an Option</option>
              </select>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-[14px] font-semibold text-[#1a1a1a] w-[60px]">
                Size:
              </span>
              <select
                className="border border-gray-300 text-[13px] px-3 py-2 pr-8 bg-white cursor-pointer focus:outline-none focus:border-[#1565C0] w-full sm:w-[200px]"
                suppressHydrationWarning
              >
                <option>Choose an Option</option>
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-2 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center border border-gray-300 flex-shrink-0">
                <button
                  suppressHydrationWarning
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-9 h-11 flex items-center justify-center cursor-pointer hover:bg-gray-100 border-r border-gray-300"
                >
                  <Minus size={14} />
                </button>
                <div className="w-12 h-11 flex items-center justify-center text-[15px] font-semibold">
                  {qty}
                </div>
                <button
                  suppressHydrationWarning
                  onClick={() => setQty((q) => q + 1)}
                  className="w-9 h-11 flex items-center justify-center cursor-pointer hover:bg-gray-100 border-l border-gray-300"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                suppressHydrationWarning
                onClick={() => {
                  for (let i = 0; i < qty; i++) addToCart(product);
                }}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#f5f5f5] text-[#1a1a1a] border border-gray-300 text-[14px] font-semibold px-8 h-11 hover:bg-[#1565C0] hover:text-white hover:border-[#1565C0] transition-colors whitespace-nowrap"
              >
                <ShoppingCart size={16} /> Add to Cart
              </button>

              <button
                suppressHydrationWarning
                onClick={() =>
                  isWishlisted(product.id)
                    ? removeFromWishlist(product.id)
                    : addToWishlist(product)
                }
                className={`w-11 h-11 border flex items-center justify-center transition-colors ${
                  isWishlisted(product.id)
                    ? "border-red-400 text-red-500 bg-red-50"
                    : "border-gray-300 text-gray-600 hover:border-[#1565C0] hover:text-[#1565C0]"
                }`}
              >
                <Heart
                  size={18}
                  className={isWishlisted(product.id) ? "fill-red-500" : ""}
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="w-full mt-16 border-t border-gray-200">
        <div className="max-w-[1540px] mx-auto px-4 md:px-8">
          <div className="flex border-b border-gray-200 overflow-x-auto no-scrollbar">
            {Object.keys(tabLabels).map((tab) => (
              <button
                suppressHydrationWarning
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-[15px] font-semibold cursor-pointer transition-colors border-b-2 -mb-[2px] whitespace-nowrap ${
                  activeTab === tab
                    ? "border-[#1a1a1a] text-[#1a1a1a]"
                    : "border-transparent text-gray-500 hover:text-[#1a1a1a]"
                }`}
              >
                {tabLabels[tab]}
              </button>
            ))}
          </div>

          <div className="py-10">
            {activeTab === "description" && (
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-16">
                <div>
                  <h3 className="text-[20px] font-bold text-[#1a1a1a] mb-4">
                    Features
                  </h3>
                  <p className="text-[14px] text-gray-600 leading-relaxed mb-6">
                    {product.description}
                  </p>
                  <div className="flex flex-col gap-3 mb-10">
                    {product.details.map((detail, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 text-[14px] text-gray-600"
                      >
                        <Check
                          size={15}
                          className="text-[#1565C0] mt-0.5 flex-shrink-0"
                        />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-[20px] font-bold text-[#1a1a1a] mb-4 mt-8">
                    Specifications
                  </h3>
                  <div className="w-full">
                    {[
                      { label: "Material", value: product.details[0] },
                      { label: "Claimed Size", value: product.details[1] },
                      { label: "Recommended Use", value: product.details[2] },
                      { label: "Manufacturer", value: "Riode Brand" },
                    ].map((row, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-[120px_1fr] sm:grid-cols-[200px_1fr] border-b border-gray-100"
                      >
                        <div className="py-3 text-[14px] font-semibold text-[#1a1a1a]">
                          {row.label}
                        </div>
                        <div className="py-3 text-[14px] text-gray-600">
                          {row.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-[20px] font-bold text-[#1a1a1a] mb-4">
                    Video Description
                  </h3>
                  <div
                    className="relative w-full bg-gray-200 rounded-sm overflow-hidden cursor-pointer"
                    style={{ aspectRatio: "16/9" }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 bg-black bg-opacity-70 rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[18px] border-l-white ml-1"></div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                    <div className="flex items-center gap-3 border border-gray-200 rounded-sm p-4">
                      <Shield
                        size={32}
                        className="text-gray-400 flex-shrink-0"
                      />
                      <div>
                        <p className="text-[14px] font-bold text-[#1a1a1a]">
                          2 year warranty
                        </p>
                        <p className="text-[12px] text-gray-500">
                          Guarantee with no doubt
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 border border-gray-200 rounded-sm p-4">
                      <Truck
                        size={32}
                        className="text-gray-400 flex-shrink-0"
                      />
                      <div>
                        <p className="text-[14px] font-bold text-[#1a1a1a]">
                          Free shipping
                        </p>
                        <p className="text-[12px] text-gray-500">
                          On orders over $50.00
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "additional" && (
              <p className="text-[14px] text-gray-500">
                Additional information will appear here.
              </p>
            )}
            {activeTab === "size-guide" && (
              <p className="text-[14px] text-gray-500">
                Size guide will appear here.
              </p>
            )}
            {activeTab === "reviews" && (
              <p className="text-[14px] text-gray-500">
                Reviews will appear here.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
