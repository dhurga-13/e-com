"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, CircleHelp, MapPin, User } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

interface DropdownProps {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

function Dropdown({ label, options, selected, onSelect }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        suppressHydrationWarning
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-[14px] font-normal text-[#4b5563] cursor-pointer"
        aria-expanded={open}
        aria-label={label}
        id={`topbar-dropdown-${label.toLowerCase()}`}
      >
        {selected}
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1 min-w-[100px] bg-white border border-[#e5e5e5] rounded shadow-lg z-[100] py-1 animate-fade-in text-[#666]">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onSelect(option);
                setOpen(false);
              }}
              className={`block w-full text-left px-4 py-1.5 text-[12px] font-medium transition-colors duration-150 cursor-pointer ${
                option === selected
                  ? "text-[#2d5eff] bg-[#f0f4ff]"
                  : "text-[#666] hover:text-[#2d5eff] hover:bg-[#f8f9fc]"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TopBar() {
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("ENG");
  
  const { data: session } = useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div
      className="hidden md:block w-full bg-white border-b border-[#e5e5e5]"
      id="topbar"
    >
      <div className="max-w-[1540px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-[50px]">
          {/* Left — Welcome Message */}
          <p
            className="text-[13px] font-normal text-[#4b5563] pr-4"
            id="topbar-welcome"
          >
            Welcome to Riode store message or remove it!
          </p>

          {/* Right — Utility Links */}
          <div className="flex items-center h-full justify-end">
            {/* Currency Dropdown */}
            <div className="px-3 border-r border-[#ddd]">
              <Dropdown
                label="Currency"
                options={["USD", "EUR"]}
                selected={currency}
                onSelect={setCurrency}
              />
            </div>

            {/* Language Dropdown */}
            <div className="px-5 border-r border-[#ddd]">
              <Dropdown
                label="Language"
                options={["ENG", "FRA"]}
                selected={language}
                onSelect={setLanguage}
              />
            </div>

            {/* Contact */}
            <a
              href="/contact"
              className="group flex items-center gap-2 text-[13px] font-normal text-[#4b5563] px-5 border-r border-[#ddd]"
              id="topbar-contact"
            >
              <MapPin
                className="w-[19px] h-[19px] text-[#334155]"
                strokeWidth={1.8}
              />
              Contact
            </a>

            {/* Need Help */}
            <a
              href="/help"
              className="group flex items-center gap-2 text-[13px] font-normal text-[#4b5563] px-5 border-r border-[#ddd]"
              id="topbar-help"
            >
              <CircleHelp
                className="w-[19px] h-[19px] text-[#334155]"
                strokeWidth={1.8}
              />
              Need Help
            </a>

            {/* User Account / Logout */}
            <div className="flex items-center gap-2 text-[13px] font-normal text-[#4b5563] pl-5">
              <User
                className="w-[19px] h-[19px] text-[#334155]"
                strokeWidth={1.7}
              />
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-black uppercase tracking-tight">
                    {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-[11px] font-bold uppercase hover:text-red-600 transition-colors border-l border-gray-300 pl-3"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hover:text-black transition-colors"
                >
                  Sign in / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
