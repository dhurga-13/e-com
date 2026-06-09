"use client";
import { useState, useEffect } from "react";
import {
  Search,
  Phone,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { NAV_ITEMS } from "./Navbar";

export default function MainHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsSticky(window.scrollY > 40);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

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
        <div className="max-w-[1540px] mx-auto px-4 md:px-8 py-4 flex items-center gap-4 md:gap-6">
          {/* Mobile Menu Toggle */}
          <button
            suppressHydrationWarning
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-1 text-gray-700 hover:text-[#1565C0] transition-colors"
            aria-label="Toggle Menu"
          >
            <Menu size={24} />
          </button>

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
          <div className="hidden sm:block flex-1 min-w-0">
            {/* Single unified border wrapper */}
            <div className="relative flex items-center h-[50px] border-2 border-white rounded-[3px] bg-white">
              {/* Text input — takes remaining space */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="flex-1 min-w-0 h-full px-4 md:px-8 pr-12 md:pr-16 text-[14px] md:text-[18px] text-gray-700 placeholder-gray-400 outline-none bg-transparent"
                id="header-search-input"
                suppressHydrationWarning
              />

              {/* Search icon inside the box */}
              <button
                suppressHydrationWarning
                className="absolute inset-y-0 right-4 md:right-6 flex items-center text-gray-400 hover:text-[#1565C0] transition-colors cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-3 md:gap-5 flex-shrink-0">
            {/* Mobile Search Trigger */}
            <button
              suppressHydrationWarning
              className="sm:hidden text-gray-600 hover:text-[#1565C0] transition-colors"
              aria-label="Search"
            >
              <Search size={22} />
            </button>

            {/* Phone */}
            <a
              href="tel:0800123456"
              className="hidden xl:flex items-center gap-3"
            >
              <Phone size={28} color="#1565C0" strokeWidth={1.5} />
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
                className="w-6 h-6 text-[#444] group-hover:text-[#1565C0] transition-colors"
                strokeWidth={1.5}
              />
            </button>

            {/* Cart */}
            <div className="flex items-center gap-2.5 cursor-pointer group">
              <div className="relative">
                <ShoppingBag
                  strokeWidth={1.5}
                  className="w-[26px] h-[26px] text-[#444] group-hover:text-[#1565C0] transition-colors"
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

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-[150] lg:hidden transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`absolute top-0 left-0 w-full max-w-[300px] h-full bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <span className="text-[18px] font-bold text-[#1a1a1a] uppercase tracking-wider">
              Navigation
            </span>
            <button
              suppressHydrationWarning
              onClick={() => setIsMenuOpen(false)}
              className="p-2 -mr-2 text-gray-500 hover:text-red-500 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-5">
            {/* Mobile Search */}
            <div className="relative mb-8">
              <input
                type="text"
                suppressHydrationWarning
                placeholder="Search products..."
                className="w-full h-11 px-4 pr-10 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1565C0]"
              />
              <Search
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between py-3.5 border-b border-gray-50 text-[15px] font-semibold text-[#1a1a1a] hover:text-[#1565C0] transition-colors"
                >
                  {item.label}
                  <ChevronRight className="w-4 h-4 opacity-30" />
                </a>
              ))}
            </nav>

            {/* Contact Info in Menu */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">
                Contact Us
              </p>
              <a href="tel:0800123456" className="flex items-center gap-3 mb-4">
                <Phone className="w-[18px] h-[18px] text-[#1565C0]" />
                <span className="text-sm font-bold">0(800) 123-456</span>
              </a>
              <div className="flex gap-4">
                <Heart className="w-5 h-5 text-gray-400" />
                <ShoppingBag className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isSticky && <div className="h-[132px]" />}
    </>
  );
}
