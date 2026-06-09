"use client";
import { useState, useEffect } from "react";
import { Search, Phone, Heart, ShoppingBag } from "lucide-react";

export default function MainHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsSticky(window.scrollY > 40);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`w-full bg-white z-[120] transition-shadow duration-300 ${
          isSticky
            ? "fixed top-0 left-0 right-0 shadow-md border-b border-gray-200"
            : "relative border-b border-gray-200"
        }`}
        id="main-header"
      >
        <div className="max-w-[1540px] mx-auto px-8 py-4 flex items-center gap-6">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-3 flex-shrink-0"
            id="header-logo"
          >
            <div className="w-9 h-9 bg-[#1565C0] rotate-45 rounded-[3px] flex-shrink-0" />
            <span className="text-[24px] font-black text-[#1a1a1a] tracking-wider">
              RIODE
            </span>
          </a>

          {/* ── Search Bar ── */}
          <div className="flex-1 min-w-0">
            {/* Single unified border wrapper */}
            <div className="relative flex items-center h-[50px] border-2 border-white rounded-[3px] bg-white">
              {/* Text input — takes remaining space */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 min-w-0 h-full px-8 pr-16 text-[18px] text-gray-700 placeholder-gray-400 outline-none bg-transparent"
                id="header-search-input"
                suppressHydrationWarning
              />

              {/* Search icon inside the box */}
              <button
                className="absolute inset-y-0 right-6 flex items-center text-gray-400 hover:text-[#1565C0] transition-colors cursor-pointer"
                aria-label="Search"
                suppressHydrationWarning
              >
                <Search size={32} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-5 flex-shrink-0">
            {/* Phone */}
            <a
              href="tel:0800123456"
              className="hidden xl:flex items-center gap-3"
            >
              <Phone size={30} color="#1565C0" strokeWidth={1.5} />
              <div className="flex flex-col">
                <span className="text-[11px] text-gray-500 leading-tight">
                  Call Us Now:
                </span>
                <span className="text-[15px] font-bold text-[#1a1a1a] leading-tight">
                  0(800) 123-456
                </span>
              </div>
            </a>

            <span className="hidden xl:block w-px h-8 bg-gray-200" />

            {/* Wishlist */}
            <button className="group" suppressHydrationWarning>
              <Heart
                size={24}
                strokeWidth={1.5}
                className="text-[#444] group-hover:text-[#1565C0] transition-colors"
              />
            </button>

            {/* Cart */}
            <div className="flex items-center gap-2.5 cursor-pointer group">
              <div className="relative">
                <ShoppingBag
                  size={26}
                  strokeWidth={1.5}
                  className="text-[#444] group-hover:text-[#1565C0] transition-colors"
                />
                <span className="absolute -top-2 -right-2 w-[18px] h-[18px] rounded-full bg-[#1565C0] text-white text-[10px] font-bold flex items-center justify-center leading-none">
                  2
                </span>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-[11px] text-gray-400 leading-tight">
                  Shopping Cart:
                </span>
                <span className="text-[14px] font-bold text-[#1a1a1a] leading-tight">
                  $0.00
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isSticky && <div className="h-[132px]" />}
    </>
  );
}
