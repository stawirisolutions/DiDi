'use client';

import React from 'react';
import TopBar from "./layout/main/top-bar";
import Footer from "./layout/main/footer";
import TopBanner from "@/app/sections/home/top-banner";
import CategorySection from "@/app/sections/home/category-section";
// import FeaturedProducts from "@/app/sections/home/featured-products";
// import PopularServices from "@/app/sections/home/popular-services";
// import BecomeVendor from "@/app/sections/home/become-vendor";

interface ClientHomePageProps {
  userAgent?: string | null;  // Updated to accept null as well
}

export default function ClientHomePage({ userAgent }: ClientHomePageProps) {
  return (
    <div>
      <TopBar />
      <TopBanner />
      <CategorySection />

      <Footer />
      {/* You can use the userAgent data here if needed */}
    </div>
  );
}