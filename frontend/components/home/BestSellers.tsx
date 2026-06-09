"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import ProductCard from "@/components/ui/ProductCard";

import "swiper/css";
import "swiper/css/pagination";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    image: "/products/product-1.jpg",
    name: "Fashionable Leather Backpack",
    category: "Bags",
    price: 120.0,
    oldPrice: 150.0,
    rating: 4,
    reviews: 12,
    badge: "25% OFF" as const,
  },
  {
    id: "p2",
    image: "/products/product-2.jpg",
    name: "Elegant Women's Dress",
    category: "Apparel",
    price: 85.0,
    rating: 5,
    reviews: 25,
    badge: "NEW" as const,
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
    oldPrice: 249.0,
    rating: 4,
    reviews: 15,
  },
];

export default function BestSellers() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted to true after the initial render on the client side
    setMounted(true);
  }, []);

  return (
    <section className="w-full pt-0 pb-16">
      <div className="max-w-[1540px] mx-auto px-8">
        <h2 className="text-[22px] font-bold text-[#1a1a1a] text-center pt-4 mb-8">
          Best Sellers
        </h2>

        <div className="relative">
          {mounted && (
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop={true}
              pagination={{
                clickable: true,
                el: ".swiper-pagination-best-sellers",
              }}
              breakpoints={{
                0: { slidesPerView: 2, spaceBetween: 16 },
                768: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 20 },
              }}
              className="w-full pb-10"
            >
              {DUMMY_PRODUCTS.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          <div className="swiper-pagination-best-sellers flex justify-center mt-4"></div>

          <style jsx>{`
            .swiper-pagination-best-sellers .swiper-pagination-bullet {
              width: 8px;
              height: 8px;
              background: #ccc;
              opacity: 1;
              border-radius: 50%;
              margin: 0 4px !important;
            }
            .swiper-pagination-best-sellers .swiper-pagination-bullet-active {
              background: #2d5eff;
              transform: scale(1.2);
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
