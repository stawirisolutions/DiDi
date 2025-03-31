'use client'

import React, { useState, useEffect } from "react";
import { Stack, styled, Typography, useTheme } from '@mui/material'
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import ContainerOverlay from '@/app/components/container-overlay';
import TopBarSearch from '@/app/layout/main/top-bar-search';
import Sidebar from "./sidebar";
import ProductSlideshow from "./slideshow";
import Discounts from "./dicounts";
import SectionCard from "./sectionsCard";
import RightSidebar from "./rightSidebar";

const TopBanner = () => {
  // Initialize state for random prices
  const [prices, setPrices] = useState([0, 0, 0, 0]);
  const [isClient, setIsClient] = useState(false);
  
  // Products for the discount section
  const discountProducts = ["Coke", "Tank Top", "Tissues", "Badminton Racket"];

  // Generate random prices on client-side only
  useEffect(() => {
    const randomPrices = discountProducts.map(() => 
      parseFloat((Math.random() * 100).toFixed(1))
    );
    setPrices(randomPrices);
    setIsClient(true);
  }, []);


  const discountItems = [
    { name: "Coke", price: 79.1, image: "/images/product-2.jpg" },
    { name: "Tank Top", price: 33.5, image: "/images/product-6.jpg" },
    { name: "Tissues", price: 18.4, image: "/images/product-1.jpg" },
    { name: "Badminton Racket", price: 30.2, image: "/images/product-4.jpg" },
  ];

  const sections = [
    { title: "Gaming", badge: "Hot Deals", image: "/images/product-1.jpg" },
    { title: "Beauty", badge: "Trending", image: "/images/product-3.jpg" },
    { title: "Gaming", badge: "Super Cheap", image: "/images/product-2.jpg" },
    { title: "Electronics", badge: "Shop Now", image: "/images/product-7.jpg" },


  ];
  

  return (
    <div className="flex bg-gray-200 p-0 mt-22">
      <Sidebar/>
      <div className="flex-1 mx-4">
        <div className="grid grid-cols-3 gap-4">
          <ProductSlideshow/>
          <Discounts items={discountItems} /> 
        </div>
        <div className="flex flex-col gap-4 mt-4">
          {/* Categories and Featured Products in a row */}
          <div className="grid grid-cols-3 gap-4"> 
            {/* First Slideshow - Categories (now taking 2/3 of the width) */}
            <div className="col-span-2 flex gap-4 overflow-x-auto justify-start"> 
              {sections.map((section, index) => (
                <SectionCard key={index} {...section} />
              ))}
            </div>
            
            {/* Featured Products Slideshow (now taking 1/3 of the width) */}
            <div className="rounded-lg overflow-hidden h-90 w-full"> 
              <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 2000 }}
                loop={true}
                className="w-full h-full"
              >
                {/* Featured Product 1 */}
                <SwiperSlide>
                <div className="bg-orange-300 text-white p-3 flex flex-col justify-between h-90"> {/* Adjusted to a deeper shade of orange */}
                {/* Top content - more compact */}
                    <div className="flex flex-col items-center">
                      <img src="images/product-1.jpg" alt="Wireless Earbuds" className="w-full h-65 object-cover rounded-lg" /> {/* Smaller image */}
                      <h2 className="text-base font-bold mt-2">Wireless Earbuds</h2> {/* Smaller heading */}
                      <p className="text-xs mt-1">Premium sound</p> {/* Even shorter description */}
                    </div>
                    
                    {/* Additional content - more compact */}
                    <div className="mt-0">
                      <div className="flex justify-between">
                        <button className="bg-white text-orange-500 hover:bg-orange-100 transition-colors px-2 py-0.5 rounded text-xs font-medium"> {/* Smaller buttons */}
                          Details
                        </button>
                        <button className="bg-orange-600 hover:bg-orange-700 transition-colors px-2 py-0.5 rounded text-xs font-medium flex items-center">
                          <span className="mr-1">Add</span> 
                          <span>🛒</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                
                {/* Featured Product 2 */}
                <SwiperSlide>
                  <div className="bg-orange-300 text-white p-3 flex flex-col justify-between h-90">
                    <div className="flex flex-col items-center">
                      <img src="images/product-2.jpg" alt="Smart Watch" className="w-full h-65 object-cover rounded-lg" />
                      <h2 className="text-base font-bold mt-2">Smart Watch</h2>
                      <p className="text-xs mt-1">Fitness tracking</p>
                    </div>
                    
                    <div className="mt-2">
                      <div className="flex justify-between">
                        <button className="bg-white text-orange-500 hover:bg-orange-100 transition-colors px-2 py-0.5 rounded text-xs font-medium">
                          Details
                        </button>
                        <button className="bg-orange-600 hover:bg-orange-700 transition-colors px-2 py-0.5 rounded text-xs font-medium flex items-center">
                          <span className="mr-1">Add</span> 
                          <span>🛒</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                
                {/* Featured Product 3 */}
                <SwiperSlide>
                  <div className="bg-orange-300 text-white p-3 flex flex-col justify-between h-90">
                    <div className="flex flex-col items-center">
                      <img src="images/product-3.jpg" alt="Laptop Backpack" className="w-full h-65 object-cover rounded-lg" />
                      <h2 className="text-base font-bold mt-2">Laptop Backpack</h2>
                      <p className="text-xs mt-1">Stylish & durable</p>
                    </div>
                    
                    <div className="mt-2">
                      <div className="flex justify-between">
                        <button className="bg-white text-orange-500 hover:bg-orange-100 transition-colors px-2 py-0.5 rounded text-xs font-medium">
                          Details
                        </button>
                        <button className="bg-orange-600 hover:bg-orange-700 transition-colors px-2 py-0.5 rounded text-xs font-medium flex items-center">
                          <span className="mr-1">Add</span> 
                          <span>🛒</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                
                {/* Featured Product 4 */}
                <SwiperSlide>
                  <div className="bg-orange-300 text-white p-3 flex flex-col justify-between h-90">
                    <div className="flex flex-col items-center">
                      <img src="images/product-4.jpg" alt="Bluetooth Speaker" className="w-full h-65 object-cover rounded-lg" />
                      <h2 className="text-base font-bold mt-2">BT Speaker</h2>
                      <p className="text-xs mt-1">Powerful sound</p>
                    </div>
                    
                    <div className="mt-2">
                      <div className="flex justify-between">
                        <button className="bg-white text-orange-500 hover:bg-orange-100 transition-colors px-2 py-0.5 rounded text-xs font-medium">
                          Details
                        </button>
                        <button className="bg-orange-600 hover:bg-orange-700 transition-colors px-2 py-0.5 rounded text-xs font-medium flex items-center">
                          <span className="mr-1">Add</span> 
                          <span>🛒</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
      <RightSidebar/>
    </div>
  );

};

export default TopBanner;