"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import ProductCard from "@/components/ui/ProductCard";
import { PRODUCTS } from "@/lib/products";

import "swiper/css";
import "swiper/css/pagination";

export default function BestSellers() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted to true after the initial render on the client side
    setMounted(true);
  }, []);

  return (
    <section className="w-full pt-0 pb-16 overflow-hidden">
      <div className="max-w-[1540px] mx-auto px-4 md:px-8">
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
              {PRODUCTS.slice(0, 4).map((product) => (
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
