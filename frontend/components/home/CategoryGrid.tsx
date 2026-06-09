import React from "react";
import Image from "next/image";

const categories = [
  { label: "For Men's", image: "/categories/category-1.jpg" },
  { label: "Accessories", image: "/categories/category-2.jpg" },
  { label: "Fashionable Women's", image: "/categories/category-3.jpg" },
  { label: "Cosmetic", image: "/categories/category-4.jpg" },
];

export default function CategoryGrid() {
  return (
    <section className="w-full">
      <div className="container-main mx-auto px-6 py-0">
        <h2 className="text-[22px] font-bold text-[#1a1a1a] text-center mb-8">
          Our Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c) => (
            <div
              key={c.label}
              className="relative rounded-xl overflow-hidden cursor-pointer group"
            >
              <div className="aspect-[3/4] w-full h-full bg-gray-100 relative">
                <Image
                  src={c.image}
                  alt={c.label}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-white py-3 px-4 transition-colors duration-300 group-hover:bg-[#1565C0]">
                <p className="text-[14px] font-semibold text-[#1a1a1a] text-center transition-colors duration-300 group-hover:text-white">
                  {c.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
