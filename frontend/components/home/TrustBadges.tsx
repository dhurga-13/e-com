import { Truck, Clock, ShieldCheck } from "lucide-react";

export default function TrustBadges({ className }: { className?: string }) {
  const features = [
    {
      icon: Truck,
      title: "Free Shipping & Return",
      subtitle: "Free shipping on orders over $99",
    },
    {
      icon: Clock,
      title: "Customer Support 24/7",
      subtitle: "Instant access to perfect support",
    },
    {
      icon: ShieldCheck,
      title: "100% Secure Payment",
      subtitle: "We ensure secure payment!",
    },
  ];

  return (
    <div className={`container-main mx-auto px-6 ${className || ""}`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 border border-gray-200 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white divide-y lg:divide-y-0 lg:divide-x divide-gray-100 overflow-hidden w-full my-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group flex items-center justify-center gap-7 px-8 py-10 lg:py-12 hover:bg-gray-50/40 transition-colors duration-300"
          >
            <div className="w-16 h-16 flex items-center justify-center flex-shrink-0 bg-blue-50/80 rounded-full transition-transform duration-300 group-hover:scale-110">
              <feature.icon
                className="w-9 h-9 text-[#2f6bd8]"
                strokeWidth={1.5}
              />
            </div>
            <div className="flex flex-col">
              <h3 className="text-[18px] font-bold text-[#1a1a1a] uppercase tracking-tight">
                {feature.title}
              </h3>
              <p className="text-[15px] text-gray-500 mt-1.5 leading-tight">
                {feature.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
