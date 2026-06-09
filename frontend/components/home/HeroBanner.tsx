"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    tag: "SUMMER COLLECTION 2024",
    title: ["SUMMER", "SEASON'S"],
    subtitle: "Up to 50% off on the latest summer styles. Discover fresh arrivals and trending looks.",
    cta: "SHOP NOW",
    bgColor: "#c8dce8",
    image: "/hero/slide1.jpg",
    align: "center",
  },
  {
    id: 2,
    tag: "NEW ARRIVALS",
    title: ["FRESH &", "TRENDY"],
    subtitle: "Explore our new arrivals — handpicked styles to keep you ahead of the fashion curve.",
    cta: "DISCOVER MORE",
    bgColor: "#e8d5c8",
    image: "/hero/slide2.jpg",
    align: "center",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (index: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setTransitioning(false);
    }, 300);
  };

  const next = () => goTo((current + 1) % SLIDES.length);
  const prev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    timerRef.current = setTimeout(next, 5000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const slide = SLIDES[current];

  return (
    <div className="w-full h-[520px] relative overflow-hidden">
      
      {/* Background */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${transitioning ? "opacity-0" : "opacity-100"}`}
        style={{
          backgroundImage: slide.image ? `url(${slide.image})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: slide.bgColor,
        }}
      />
      <div className="absolute inset-0 bg-black/15 z-[1]" />

      {/* Content */}
      <div
        className={`absolute inset-0 z-[2] flex flex-col items-center justify-center text-center px-6 transition-all duration-500 ${
          transitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
        }`}
      >
        <p className="text-white text-[13px] font-semibold tracking-[6px] uppercase mb-4 opacity-90">
          {slide.tag}
        </p>
        <h1 className="text-white font-black leading-[1] mb-6 drop-shadow-sm" style={{ fontSize: "clamp(44px, 6vw, 72px)" }}>
          {slide.title[0]}<br />{slide.title[1]}
        </h1>
        <p className="text-white/90 text-[15px] max-w-[480px] leading-relaxed mb-8">
          {slide.subtitle}
        </p>
        <button
          className="bg-[#1a1a1a] text-white text-[12px] font-bold tracking-[3px] uppercase px-14 py-4 hover:bg-[#1565C0] transition-colors duration-300 cursor-pointer"
          suppressHydrationWarning
        >
          {slide.cta} →
        </button>
      </div>

      {/* Prev Arrow */}
      <button
        onClick={prev}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-[3] w-10 h-10 bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors cursor-pointer backdrop-blur-sm"
        suppressHydrationWarning
      >
        <ChevronLeft size={22} strokeWidth={2.5} />
      </button>

      {/* Next Arrow */}
      <button
        onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-[3] w-10 h-10 bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors cursor-pointer backdrop-blur-sm"
        suppressHydrationWarning
      >
        <ChevronRight size={22} strokeWidth={2.5} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[3] flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              i === current
                ? "w-7 h-3 bg-[#1565C0]"
                : "w-3 h-3 bg-white/60 hover:bg-white"
            }`}
            suppressHydrationWarning
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-6 right-6 z-[3] text-white/70 text-[12px] font-medium tracking-widest">
        0{current + 1} / 0{SLIDES.length}
      </div>
    </div>
  );
}
