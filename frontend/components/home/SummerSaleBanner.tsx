import React from "react";

export default function SummerSaleBanner() {
  return (
    <section className="w-full py-0 mt-8 mb-16">
      <div className="relative w-full h-[400px] md:h-[500px] bg-gray-900 overflow-hidden flex items-center justify-center text-center px-6">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-[#2d5eff]/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Content */}
        <div className="relative z-10 max-w-2xl">
          <h4 className="text-[14px] font-bold text-white uppercase tracking-[4px] mb-4">
            End Of Season
          </h4>
          <h2 className="text-[40px] md:text-[60px] font-extrabold text-white leading-none mb-6">
            Summer Sale
          </h2>
          <h3 className="text-[24px] md:text-[32px] font-bold text-white mb-8">
            Up To <span className="text-yellow-400">50% Off</span>
          </h3>
          <a
            href="/sale"
            className="inline-block bg-white text-[#1a1a1a] text-[13px] font-bold uppercase tracking-[2px] px-10 py-4 hover:bg-[#1a1a1a] hover:text-white transition-colors duration-300"
          >
            Shop Now
          </a>
        </div>
      </div>
    </section>
  );
}

