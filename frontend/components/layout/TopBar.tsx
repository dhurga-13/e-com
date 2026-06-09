"use client";

import { useState } from "react";
import { ChevronDown, User } from "lucide-react";

export default function TopBar() {
  const [openCurrency, setOpenCurrency] = useState(false);
  const [openLanguage, setOpenLanguage] = useState(false);

  return (
    <div className="w-full bg-[#f5f5f5] border-b border-gray-200">
      <div className="max-w-[1540px] mx-auto px-8 h-9 flex items-center justify-between text-[12px] text-[#666]">
        
        {/* LEFT */}
        <div className="flex items-center">
          <p>Welcome to Riode store message or remove it!</p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-5">
          {/* Currency */}
          <div className="relative">
            <button
              onClick={() => setOpenCurrency(!openCurrency)}
              className="flex items-center gap-1 cursor-pointer hover:text-[#1565C0] transition-colors"
              suppressHydrationWarning
            >
              USD
              <ChevronDown size={11} strokeWidth={2} />
            </button>
            {openCurrency && (
              <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 shadow-md py-1 z-50 min-w-[80px]">
                <button className="block w-full text-left px-3 py-1 text-[12px] hover:bg-gray-50" suppressHydrationWarning>EUR</button>
                <button className="block w-full text-left px-3 py-1 text-[12px] hover:bg-gray-50" suppressHydrationWarning>USD</button>
              </div>
            )}
          </div>

          {/* Language */}
          <div className="relative">
            <button
              onClick={() => setOpenLanguage(!openLanguage)}
              className="flex items-center gap-1 cursor-pointer hover:text-[#1565C0] transition-colors"
              suppressHydrationWarning
            >
              ENG
              <ChevronDown size={11} strokeWidth={2} />
            </button>
            {openLanguage && (
              <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 shadow-md py-1 z-50 min-w-[80px]">
                <button className="block w-full text-left px-3 py-1 text-[12px] hover:bg-gray-50" suppressHydrationWarning>ENG</button>
                <button className="block w-full text-left px-3 py-1 text-[12px] hover:bg-gray-50" suppressHydrationWarning>FRA</button>
              </div>
            )}
          </div>

          <div className="w-px h-3.5 bg-gray-400" />

          <a href="/contact" className="flex items-center gap-1 hover:text-[#1565C0] transition-colors">
            Contact
          </a>

          <a href="/help" className="flex items-center gap-1 hover:text-[#1565C0] transition-colors">
            Need Help
          </a>

          <a href="/login" className="flex items-center gap-1 hover:text-[#1565C0] transition-colors">
            <User size={13} />
            Sign in / Register
          </a>
        </div>
      </div>
    </div>
  );
}
