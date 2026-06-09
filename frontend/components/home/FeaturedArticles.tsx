"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";

const ARTICLES = [
  {
    id: 1,
    image: "/blog/post-1.jpg",
    date: "Nov 22, 2023",
    title: "Exploring Fashion Trends of the Year",
  },
  {
    id: 2,
    image: "/blog/post-2.jpg",
    date: "Dec 10, 2023",
    title: "How to Choose the Perfect Gift",
  },
  {
    id: 3,
    image: "/blog/post-3.jpg",
    date: "Jan 05, 2024",
    title: "Top 10 Tech Gadgets You Need",
  },
  {
    id: 4,
    image: "/blog/post-2.jpg",
    date: "Feb 14, 2024",
    title: "A Guide to Sustainable Fashion",
  },
];

export default function FeaturedArticles() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="w-full pt-0 pb-16 overflow-hidden">
      <div className="max-w-[1540px] mx-auto px-4 md:px-8">
        <h2 className="text-[22px] font-bold text-[#1a1a1a] text-center mb-8">
          Featured Articles
        </h2>

        {mounted && (
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            pagination={{ clickable: true, el: ".swiper-pagination-blog" }}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 20 },
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
          >
            {ARTICLES.map((article) => (
              <SwiperSlide key={article.id}>
                <div className="group cursor-pointer">
                  <div className="aspect-[3/2] w-full bg-gray-100 overflow-hidden rounded-t relative">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={90}
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="pt-5 text-left">
                    <p className="text-[12px] text-gray-500 mb-1">
                      {article.date}
                    </p>
                    <h3 className="text-[16px] font-bold text-[#1a1a1a] hover:text-[#1565C0] transition-colors mb-2">
                      {article.title}
                    </h3>
                    <a
                      href="#"
                      className="text-[13px] font-bold uppercase tracking-widest text-[#1565C0] border-b border-[#1565C0] hover:text-[#1a1a1a] hover:border-[#1a1a1a] transition-all"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div className="swiper-pagination-blog flex justify-center mt-8"></div>
        <style jsx>{`
          .swiper-pagination-blog .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            background: #ccc;
            opacity: 1;
            border-radius: 50%;
            margin: 0 4px !important;
          }
          .swiper-pagination-blog .swiper-pagination-bullet-active {
            background: #2d5eff;
            transform: scale(1.2);
          }
        `}</style>
      </div>
    </section>
  );
}
