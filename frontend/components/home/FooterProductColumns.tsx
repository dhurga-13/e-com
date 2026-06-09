import React from "react";
import MiniProductCard from "@/components/ui/MiniProductCard";

const DUMMY = [
  {
    id: "1",
    name: "Fashionable Backpack",
    image: "/products/product-1.jpg",
    price: 120,
    rating: 4,
    reviews: 5,
  },
  {
    id: "2",
    name: "Leather Shoes",
    image: "/products/product-2.jpg",
    price: 95,
    rating: 5,
    reviews: 12,
  },
  {
    id: "3",
    name: "Women's Dress",
    image: "/products/product-3.jpg",
    price: 85,
    rating: 4,
    reviews: 2,
  },
];

export default function FooterProductColumns() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-[1540px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-[16px] font-bold text-[#1a1a1a] uppercase mb-6 pb-3 border-b border-gray-200">
              Sale Products
            </h3>
            <div className="flex flex-col gap-5">
              {DUMMY.map((p) => (
                <MiniProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-[#1a1a1a] uppercase mb-6 pb-3 border-b border-gray-200">
              Latest Products
            </h3>
            <div className="flex flex-col gap-5">
              {DUMMY.map((p) => (
                <MiniProductCard key={p.id + "b"} product={p} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-[#1a1a1a] uppercase mb-6 pb-3 border-b border-gray-200">
              Best of the Week
            </h3>
            <div className="flex flex-col gap-5">
              {DUMMY.map((p) => (
                <MiniProductCard key={p.id + "c"} product={p} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-[#1a1a1a] uppercase mb-6 pb-3 border-b border-gray-200">
              Popular
            </h3>
            <div className="flex flex-col gap-5">
              {DUMMY.map((p) => (
                <MiniProductCard key={p.id + "d"} product={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
