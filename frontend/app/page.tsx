import HeroBanner from "@/components/home/HeroBanner";
import TrustBadges from "@/components/home/TrustBadges";
import CategoryGrid from "@/components/home/CategoryGrid";
import BestSellers from "@/components/home/BestSellers";
import PromoBanners from "@/components/home/PromoBanners";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import SummerSaleBanner from "@/components/home/SummerSaleBanner";
import FeaturedArticles from "@/components/home/FeaturedArticles";
import BrandLogos from "@/components/home/BrandLogos";
import FooterProductColumns from "@/components/home/FooterProductColumns";

export default function Home() {
  return (
    <>
      <section className="w-full" id="hero-section">
        <HeroBanner />
      </section>

      <section id="trust-badges-section">
        <TrustBadges />
      </section>

      <section id="categories-section">
        <CategoryGrid />
      </section>

      <section id="best-sellers-section" className="mb-10">
        <BestSellers />
      </section>

      <section id="promo-banners-section" className="mb-10">
        <PromoBanners />
      </section>

      <section id="featured-products-section" className="mb-10">
        <FeaturedProducts />
      </section>

      <section id="summer-sale-section">
        <SummerSaleBanner />
      </section>

      <section id="featured-articles-section" className="mb-10">
        <FeaturedArticles />
      </section>

      <section id="brand-logos-section" className="mb-10">
        <BrandLogos />
      </section>

      <section id="footer-product-columns" className="mb-10">
        <FooterProductColumns />
      </section>
    </>
  );
}
