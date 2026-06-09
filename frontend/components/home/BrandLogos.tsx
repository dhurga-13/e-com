"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

import "swiper/css";

const BRANDS = [
  { id: 1, name: "Brand 1", image: "/brands/brand-1.png" },
  { id: 2, name: "Brand 2", image: "/brands/brand-2.png" },
  { id: 3, name: "Brand 3", image: "/brands/brand-3.png" },
  { id: 4, name: "Brand 4", image: "/brands/brand-4.png" },
  { id: 5, name: "Brand 5", image: "/brands/brand-5.png" },
  { id: 6, name: "Brand 6", image: "/brands/brand-6.png" },
];

const ALL_BRANDS = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS]; // Duplicate for continuous loop effect

export default function BrandLogos() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="w-full py-12 border-t border-b border-gray-100 bg-white overflow-hidden">
      <div className="max-w-[1540px] mx-auto px-4 md:px-8">
        {mounted && (
          <Swiper
            modules={[Autoplay]}
            loop={true}
            speed={8000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 20 }, // Adjusted spaceBetween
              640: { slidesPerView: 3, spaceBetween: 30 }, // Adjusted spaceBetween
              768: { slidesPerView: 4, spaceBetween: 40 }, // Adjusted spaceBetween
              1024: { slidesPerView: 5, spaceBetween: 50 }, // Adjusted spaceBetween
              1280: { slidesPerView: 6, spaceBetween: 60 }, // Adjusted spaceBetween
            }}
            allowTouchMove={false}
            className="brand-swiper flex items-center"
          >
            {ALL_BRANDS.map((brand, index) => (
              <SwiperSlide
                key={index} // Use index as key for duplicated static array
                className="flex justify-center items-center"
              >
                <div className="relative h-12 w-24 sm:w-32 group-hover:opacity-100 transition-opacity duration-300 grayscale group-hover:grayscale-0">
                  {" "}
                  {/* Adjusted width for mobile */}
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    sizes="(max-width: 768px) 33vw, 15vw"
                    quality={90}
                    className="object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <style jsx global>{`
          .brand-swiper .swiper-wrapper {
            transition-timing-function: linear !important;
          }
        `}</style>
      </div>
    </section>
  );
}
