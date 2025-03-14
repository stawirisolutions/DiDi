import BecomeVendor from "@/sections/home/become-vendor";
import CategorySection from "@/sections/home/category-section";
import PopularServices from "@/sections/home/popular-services";
import TopBanner from "@/sections/home/top-banner";
import TopRatedVendors from "@/sections/home/top-rated-vendors";
import TrendingProducts from "@/sections/home/trending-products";

export default function Home() {
  return (
    <>
      <TopBanner />
      <CategorySection />
      <TrendingProducts />
      <BecomeVendor />
      <PopularServices />
      <TopRatedVendors />
    </>
  );
}
