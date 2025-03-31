import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react';
// import RandomPopup from "./PopUp";

const RightSidebar = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Slideshow data
  const slides = [
    {
      id: 1,
      imageUrl: "/images/product-6.jpg",
      title: "Special Offers",
      link: "/offers"
    },
    {
      id: 2,
      imageUrl: "/images/product-5.jpg",
      title: "New Arrivals",
      link: "/new-arrivals"
    },
    {
      id: 3,
      imageUrl: "/images/product-4.jpg",
      title: "Flash Sale",
      link: "/flash-sale"
    },
    {
      id: 4,
      imageUrl: "/images/product-3.jpg",
      title: "Flash Sale",
      link: "/flash-sale"
    },
    {
      id: 5,
      imageUrl: "/images/product-2.jpg",
      title: "Flash Sale",
      link: "/flash-sale"
    }
  ];

  // Auto-rotate slides every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="w-full max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Slideshow Section - Only appears at the top */}
      <div className="w-full h-80 relative">
        {slides.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`absolute inset-0 w-full h-full transition-all duration-1000 transform ${
              index === currentSlide 
                ? "opacity-100 translate-x-0" 
                : index < currentSlide 
                  ? "opacity-0 -translate-x-full" 
                  : "opacity-0 translate-x-full"
            }`}
          >
            <div className="relative w-full h-full">
              <Image 
                src={slide.imageUrl} 
                alt={slide.title}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-blue-500 bg-opacity-30 text-white p-1">
                <h3 className="text-xs font-medium text-center">{slide.title}</h3>
              </div>
            </div>
          </div>
        ))}
        
        {/* Indicators */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1 z-20">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-1 h-1 rounded-full ${
                index === currentSlide ? "bg-white" : "bg-gray-400 bg-opacity-60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* User Profile Section */}
      <div className="text-center py-3 px-4">
        <div className="mx-auto w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-2">
          <Image 
            src="/images/icon-5359554_1280.webp" 
            alt="Profile" 
            width={40} 
            height={40}
            className="rounded-full"
          />
        </div>
        <p className="font-bold text-gray-800">Hello Customer!!</p>
      </div>
      
      {/* Register/Store links */}
      <div className="flex justify-center text-sm mb-4">
        <Link href="/register" className="text-blue-500">Register</Link>
        <span className="mx-2 text-gray-400">|</span>
        <Link href="/open-store" className="text-blue-500">Open a Store</Link>
      </div>
      
      {/* Login Prompt */}
      <div className="px-4 mb-4">
        <p className="text-sm text-gray-600 text-center mb-2">
          Log in to Didi for a better experience
        </p>
        <button className="w-full bg-orange-500 text-white py-2 rounded text-sm font-medium">
          Log in now
        </button>
      </div>
      
      {/* Icons Section */}
      <div className="grid grid-cols-4 gap-1 px-2 py-3">
        {[
          { icon: "🛒", label: "Shopping Cart" },
          { icon: "❤️", label: "Wishlist" },
          { icon: "🏪", label: "Visited Stores" },
          { icon: "👣", label: "Footprints" },
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-lg mb-1">{item.icon}</div>
            <span className="text-xs text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;