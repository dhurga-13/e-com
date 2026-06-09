import React from "react";
import { Headphones, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#222] text-[#999] text-[14px]">
      {/* Top Newsletter Section */}
      <div className="border-b border-gray-700">
        <div className="max-w-[1540px] mx-auto px-8 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-left">
              <h4 className="text-[20px] font-bold text-white mb-2">Subscribe To Our Newsletter</h4>
              <p className="text-[14px]">Get all the latest information on Events, Sales and Offers.</p>
            </div>
            <div className="flex-1 w-full max-w-md lg:max-w-xl">
              <form className="flex w-full h-[50px]">
                <input suppressHydrationWarning
                  type="email"
                  placeholder="Email address here..."
                  className="flex-1 px-4 bg-[#333] border border-[#444] text-[#999] placeholder-gray-500 focus:outline-none focus:border-[#2d5eff] transition-colors"
                />
                <button suppressHydrationWarning
                  type="submit"
                  className="px-8 bg-[#2d5eff] text-white font-bold uppercase tracking-widest text-[13px] hover:bg-[#254fdb] transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Widgets */}
      <div className="max-w-[1540px] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* About */}
          <div>
            <h3 className="text-white text-[24px] font-extrabold mb-6">RIODE</h3>
            <p className="leading-relaxed mb-6">
              Riode eCommerce Template is an excellent and modern template to build an amazing e-store.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center hover:text-white hover:border-[#2d5eff] hover:bg-[#2d5eff] transition-all">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center hover:text-white hover:border-[#2d5eff] hover:bg-[#2d5eff] transition-all">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center hover:text-white hover:border-[#2d5eff] hover:bg-[#2d5eff] transition-all">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center hover:text-white hover:border-[#2d5eff] hover:bg-[#2d5eff] transition-all">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-[16px] font-bold text-white uppercase tracking-wide mb-6">
              Customer Service
            </h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="hover:text-[#2d5eff] transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-[#2d5eff] transition-colors">Track Your Order</a></li>
              <li><a href="#" className="hover:text-[#2d5eff] transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-[#2d5eff] transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-[#2d5eff] transition-colors">Dashboard</a></li>
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h4 className="text-[16px] font-bold text-white uppercase tracking-wide mb-6">
              My Account
            </h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="hover:text-[#2d5eff] transition-colors">Sign In</a></li>
              <li><a href="#" className="hover:text-[#2d5eff] transition-colors">View Cart</a></li>
              <li><a href="#" className="hover:text-[#2d5eff] transition-colors">My Wishlist</a></li>
              <li><a href="#" className="hover:text-[#2d5eff] transition-colors">Track My Order</a></li>
              <li><a href="#" className="hover:text-[#2d5eff] transition-colors">Help</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[16px] font-bold text-white uppercase tracking-wide mb-6">
              Contact Info
            </h4>
            <ul className="flex flex-col gap-5">
              <li className="flex gap-4">
                <MapPin size={20} className="text-[#2d5eff] shrink-0" />
                <span className="leading-relaxed">123 Street Name, City, England</span>
              </li>
              <li className="flex gap-4">
                <Headphones size={20} className="text-[#2d5eff] shrink-0" />
                <div className="flex flex-col">
                  <span>(123) 456-7890</span>
                  <span>(123) 456-7891</span>
                </div>
              </li>
              <li className="flex gap-4 items-center">
                <Mail size={20} className="text-[#2d5eff] shrink-0" />
                <a href="mailto:mail@riode.com" className="hover:text-[#2d5eff] transition-colors">
                  mail@riode.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-6">
        <div className="max-w-[1540px] mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-center md:text-left">
            Riode eCommerce © 2024. All Rights Reserved
          </p>
          <div className="flex items-center gap-2">
            {/* Dummy Payment Icons */}
            <div className="w-10 h-6 bg-[#333] rounded flex items-center justify-center text-[10px] text-white">VISA</div>
            <div className="w-10 h-6 bg-[#333] rounded flex items-center justify-center text-[10px] text-white">MC</div>
            <div className="w-10 h-6 bg-[#333] rounded flex items-center justify-center text-[10px] text-white">PP</div>
            <div className="w-10 h-6 bg-[#333] rounded flex items-center justify-center text-[10px] text-white">AMEX</div>
          </div>
        </div>
      </div>
    </footer>
  );
}


