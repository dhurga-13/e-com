import React from "react";
import Image from "next/image";

export default function PromoBanners() {
  return (
    <section className="w-full py-0">
      <div className="max-w-[1540px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Banner 1 */}
          <div className="relative w-full aspect-[2/1] bg-gray-200 overflow-hidden group cursor-pointer">
            <Image
              src="/banners/banner-1.jpg"
              alt="Men's Sportswear"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/5" />
            <div className="absolute inset-0 flex flex-col justify-center p-10 md:p-14">
              <span className="text-[14px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                New Arrivals
              </span>
              <h3 className="text-[26px] md:text-[32px] font-bold text-[#1a1a1a] mb-4 leading-tight">
                Men's
                <br />
                Sportswear
              </h3>
              <a
                href="#"
                className="inline-block text-[13px] font-bold text-[#1a1a1a] uppercase tracking-widest border-b-2 border-[#1a1a1a] pb-1 hover:text-[#1565C0] hover:border-[#1565C0] transition-colors w-max"
              >
                Shop Now
              </a>
            </div>
          </div>

          {/* Banner 2 */}
          <div className="relative w-full aspect-[2/1] bg-gray-200 overflow-hidden group cursor-pointer">
            <Image
              src="/banners/banner-2.jpg"
              alt="Women's Dresses"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/5" />
            <div className="absolute inset-0 flex flex-col justify-center items-end text-right p-10 md:p-14">
              <span className="text-[14px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                Top Rated
              </span>
              <h3 className="text-[26px] md:text-[32px] font-bold text-[#1a1a1a] mb-4 leading-tight">
                Women's
                <br />
                Dresses
              </h3>
              <a
                href="#"
                className="inline-block text-[13px] font-bold text-[#1a1a1a] uppercase tracking-widest border-b-2 border-[#1a1a1a] pb-1 hover:text-[#1565C0] hover:border-[#1565C0] transition-colors w-max"
              >
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
