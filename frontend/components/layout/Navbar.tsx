"use client";

import { ChevronDown, Tag } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/", hasDropdown: true },
  { label: "Categories", href: "/categories", hasDropdown: true },
  { label: "Products", href: "/products", hasDropdown: true },
  { label: "Pages", href: "/pages", hasDropdown: true },
  { label: "Elements", href: "/elements", hasDropdown: true },
  { label: "Blog", href: "/blog", hasDropdown: true },
  { label: "About Us", href: "/about", hasDropdown: false },
];

export default function Navbar() {
  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="max-w-[1540px] mx-auto px-8 flex items-center justify-between">
        
        {/* Left nav */}
        <div className="flex items-center">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`relative px-4 py-3.5 text-[14px] font-medium cursor-pointer flex items-center gap-1 transition-colors ${
                item.label === "Home" ? "text-[#1565C0]" : "text-[#1a1a1a] hover:text-[#1565C0]"
              }`}
            >
              {item.label}
              {item.hasDropdown && <ChevronDown size={13} strokeWidth={2} className="opacity-70" />}
              {item.label === "Home" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1565C0]" />
              )}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-5">
          <a
            href="/deals"
            className="flex items-center gap-1.5 text-[14px] font-medium text-[#1a1a1a] hover:text-[#1565C0] cursor-pointer transition-colors"
          >
            <Tag size={15} color="#1565C0" />
            Special Offers
          </a>
          <a
            href="#"
            className="text-[14px] font-semibold text-[#1a1a1a] hover:text-[#1565C0] cursor-pointer transition-colors"
          >
            Buy Riode!
          </a>
        </div>
      </div>
    </div>
  );
}
