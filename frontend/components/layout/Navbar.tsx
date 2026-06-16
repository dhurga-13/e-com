"use client";
import { useState } from "react";
import Link from "next/link";

import { ChevronDown, Tag, Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  hasDropdown: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", hasDropdown: true },
  { label: "Categories", href: "/categories", hasDropdown: true },
  { label: "Products", href: "/products", hasDropdown: true },
  { label: "Pages", href: "/pages", hasDropdown: true },
  { label: "Elements", href: "/elements", hasDropdown: true },
  { label: "Blog", href: "/blog", hasDropdown: true },
  { label: "About Us", href: "/about", hasDropdown: false },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="max-w-[1540px] mx-auto px-4 md:px-8 flex items-center justify-between h-12">
        {/* Mobile Hamburger Button (visible on small screens) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 lg:hidden text-[#1a1a1a] hover:text-[#1565C0] transition-colors focus:outline-none"
          aria-label="Toggle mobile navigation"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation (hidden on small screens) */}
        <div className="hidden lg:flex items-center justify-between w-full overflow-x-auto no-scrollbar">
          {/* Left nav */}
          <div className="flex items-center whitespace-nowrap">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`relative px-4 py-3.5 text-[14px] font-medium cursor-pointer flex items-center gap-1 transition-colors ${
                  item.label === "Home"
                    ? "text-[#1565C0]"
                    : "text-[#1a1a1a] hover:text-[#1565C0]"
                }`}
              >
                {item.label}
                {item.hasDropdown && (
                  <ChevronDown
                    size={13}
                    strokeWidth={2}
                    className="opacity-70"
                  />
                )}
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

      {/* Mobile Menu Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] lg:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={`fixed top-0 left-0 w-[280px] h-full bg-white shadow-2xl transition-transform duration-300 ease-in-out z-[70] ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <span className="font-black text-lg">NAVIGATION</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-400 hover:text-black focus:outline-none"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col p-6 gap-5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[15px] font-bold text-[#1a1a1a] hover:text-[#1565C0]"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-5">
              <Link
                href="/deals"
                className="flex items-center gap-2 text-[15px] font-bold text-[#1a1a1a] hover:text-[#1565C0]"
                onClick={() => setIsMenuOpen(false)}
              >
                <Tag size={18} color="#1565C0" />
                Special Offers
              </Link>
              <Link
                href="#"
                className="text-[15px] font-bold text-[#1a1a1a] hover:text-[#1565C0]"
                onClick={() => setIsMenuOpen(false)}
              >
                Buy Riode!
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
