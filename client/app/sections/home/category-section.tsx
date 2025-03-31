'use client'

import { Stack, Typography } from "@mui/material";
import ContainerOverlay from "@/app/components/container-overlay";
import Image from "next/image";
import PopUp from "./PopUp";
import { useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
// import IconButton from "@mui/material/IconButton"; 
// import * as MUI from '@mui/material';
import { IconButton } from '@mui/material';
import { useEffect } from 'react';




const products = [
    { id: 1, name: "Wireless Headphones", price: "$199.99", image: "/images/product-1.jpg", description: "High-quality noise-canceling headphones for immersive sound." },
    { id: 2, name: "Smartphone", price: "$899.99", image: "/images/product-2.jpg", description: "Latest-gen smartphone with a stunning display and powerful camera." },
    { id: 3, name: "Gaming Laptop", price: "$1,499.99", image: "/images/product-3.jpg", description: "A high-performance laptop built for gaming and productivity." },
    { id: 4, name: "Sneakers", price: "$79.99", image: "/images/product-4.jpg", description: "Stylish and comfortable sneakers for everyday wear." },
    { id: 5, name: "Smartwatch", price: "$249.99", image: "/images/product-5.jpg", description: "Track your fitness and stay connected with this sleek smartwatch." },
    { id: 6, name: "Coffee Maker", price: "$149.99", image: "/images/product-6.jpg", description: "Brew your favorite coffee effortlessly with this modern coffee maker." },
    { id: 7, name: "Bluetooth Speaker", price: "$99.99", image: "/images/product-7.jpg", description: "Portable Bluetooth speaker with deep bass and crystal-clear sound." },
    { id: 8, name: "LED Monitor", price: "$349.99", image: "/images/product-1.jpg", description: "A stunning 4K LED monitor with ultra-smooth refresh rates." },
    { id: 9, name: "Mechanical Keyboard", price: "$129.99", image: "/images/product-2.jpg", description: "A mechanical keyboard with RGB lighting and tactile switches." },
    { id: 10, name: "Action Camera", price: "$299.99", image: "/images/product-3.jpg", description: "Capture all your adventures with this waterproof action camera." },
    { id: 11, name: "Wireless Headphones", price: "$199.99", image: "/images/product-4.jpg", description: "High-quality noise-canceling headphones for immersive sound." },
    { id: 12, name: "Smartphone", price: "$899.99", image: "/images/product-5.jpg", description: "Latest-gen smartphone with a stunning display and powerful camera." },
    { id: 13, name: "Gaming Laptop", price: "$1,499.99", image: "/images/product-3.jpg", description: "A high-performance laptop built for gaming and productivity." },
    { id: 14, name: "Sneakers", price: "$79.99", image: "/images/product-4.jpg", description: "Stylish and comfortable sneakers for everyday wear." },
    { id: 15, name: "Smartwatch", price: "$249.99", image: "/images/product-5.jpg", description: "Track your fitness and stay connected with this sleek smartwatch." },
    { id: 16, name: "Coffee Maker", price: "$149.99", image: "/images/product-6.jpg", description: "Brew your favorite coffee effortlessly with this modern coffee maker." },
    { id: 17, name: "Bluetooth Speaker", price: "$99.99", image: "/images/product-7.jpg", description: "Portable Bluetooth speaker with deep bass and crystal-clear sound." },
    { id: 18, name: "LED Monitor", price: "$349.99", image: "/images/product-3.jpg", description: "A stunning 4K LED monitor with ultra-smooth refresh rates." },
    { id: 19, name: "Mechanical Keyboard", price: "$129.99", image: "/images/product-4.jpg", description: "A mechanical keyboard with RGB lighting and tactile switches." },
    { id: 20, name: "Action Camera", price: "$299.99", image: "/images/product-2.jpg", description: "Capture all your adventures with this waterproof action camera." },
    { id: 21, name: "Wireless Headphones", price: "$199.99", image: "/images/product-1.jpg", description: "High-quality noise-canceling headphones for immersive sound." },
    { id: 22, name: "Smartphone", price: "$899.99", image: "/images/product-2.jpg", description: "Latest-gen smartphone with a stunning display and powerful camera." },
    { id: 23, name: "Gaming Laptop", price: "$1,499.99", image: "/images/product-3.jpg", description: "A high-performance laptop built for gaming and productivity." },
    { id: 24, name: "Sneakers", price: "$79.99", image: "/images/product-4.jpg", description: "Stylish and comfortable sneakers for everyday wear." },
    { id: 25, name: "Smartwatch", price: "$249.99", image: "/images/product-5.jpg", description: "Track your fitness and stay connected with this sleek smartwatch." },
    { id: 26, name: "Coffee Maker", price: "$149.99", image: "/images/product-6.jpg", description: "Brew your favorite coffee effortlessly with this modern coffee maker." },
    { id: 27, name: "Bluetooth Speaker", price: "$99.99", image: "/images/product-7.jpg", description: "Portable Bluetooth speaker with deep bass and crystal-clear sound." },
    { id: 28, name: "LED Monitor", price: "$349.99", image: "/images/product-6.jpg", description: "A stunning 4K LED monitor with ultra-smooth refresh rates." },
    { id: 29, name: "Mechanical Keyboard", price: "$129.99", image: "/images/product-1.jpg", description: "A mechanical keyboard with RGB lighting and tactile switches." },
    { id: 30, name: "Action Camera", price: "$299.99", image: "/images/product-4.jpg", description: "Capture all your adventures with this waterproof action camera." },
    { id: 31, name: "Wireless Headphones", price: "$199.99", image: "/images/product-1.jpg", description: "High-quality noise-canceling headphones for immersive sound." },
    { id: 32, name: "Smartphone", price: "$899.99", image: "/images/product-2.jpg", description: "Latest-gen smartphone with a stunning display and powerful camera." },
    { id: 33, name: "Gaming Laptop", price: "$1,499.99", image: "/images/product-3.jpg", description: "A high-performance laptop built for gaming and productivity." },
    { id: 34, name: "Sneakers", price: "$79.99", image: "/images/product-4.jpg", description: "Stylish and comfortable sneakers for everyday wear." },
    { id: 35, name: "Smartwatch", price: "$249.99", image: "/images/product-5.jpg", description: "Track your fitness and stay connected with this sleek smartwatch." },
    { id: 36, name: "Coffee Maker", price: "$149.99", image: "/images/product-6.jpg", description: "Brew your favorite coffee effortlessly with this modern coffee maker." },
    { id: 37, name: "Bluetooth Speaker", price: "$99.99", image: "/images/product-7.jpg", description: "Portable Bluetooth speaker with deep bass and crystal-clear sound." },
    { id: 38, name: "LED Monitor", price: "$349.99", image: "/images/product-5.jpg", description: "A stunning 4K LED monitor with ultra-smooth refresh rates." },
    { id: 39, name: "Mechanical Keyboard", price: "$129.99", image: "/images/product-3.jpg", description: "A mechanical keyboard with RGB lighting and tactile switches." },
    { id: 40, name: "Action Camera", price: "$299.99", image: "/images/product-2.jpg", description: "Capture all your adventures with this waterproof action camera." },
    { id: 41, name: "Wireless Headphones", price: "$199.99", image: "/images/product-1.jpg", description: "High-quality noise-canceling headphones for immersive sound." },
    { id: 42, name: "Smartphone", price: "$899.99", image: "/images/product-2.jpg", description: "Latest-gen smartphone with a stunning display and powerful camera." },
    { id: 43, name: "Gaming Laptop", price: "$1,499.99", image: "/images/product-3.jpg", description: "A high-performance laptop built for gaming and productivity." },
    { id: 44, name: "Sneakers", price: "$79.99", image: "/images/product-4.jpg", description: "Stylish and comfortable sneakers for everyday wear." },
    { id: 45, name: "Smartwatch", price: "$249.99", image: "/images/product-5.jpg", description: "Track your fitness and stay connected with this sleek smartwatch." },
    { id: 46, name: "Coffee Maker", price: "$149.99", image: "/images/product-6.jpg", description: "Brew your favorite coffee effortlessly with this modern coffee maker." },
    { id: 47, name: "Bluetooth Speaker", price: "$99.99", image: "/images/product-7.jpg", description: "Portable Bluetooth speaker with deep bass and crystal-clear sound." },
    { id: 48, name: "LED Monitor", price: "$349.99", image: "/images/product-3.jpg", description: "A stunning 4K LED monitor with ultra-smooth refresh rates." },
    { id: 49, name: "Mechanical Keyboard", price: "$129.99", image: "/images/product-4.jpg", description: "A mechanical keyboard with RGB lighting and tactile switches." },
    { id: 50, name: "Action Camera", price: "$299.99", image: "/images/product-5.jpg", description: "Capture all your adventures with this waterproof action camera." },
    { id: 51, name: "Wireless Headphones", price: "$199.99", image: "/images/product-1.jpg", description: "High-quality noise-canceling headphones for immersive sound." },
    { id: 52, name: "Smartphone", price: "$899.99", image: "/images/product-2.jpg", description: "Latest-gen smartphone with a stunning display and powerful camera." },
    { id: 53, name: "Gaming Laptop", price: "$1,499.99", image: "/images/product-3.jpg", description: "A high-performance laptop built for gaming and productivity." },
    { id: 54, name: "Sneakers", price: "$79.99", image: "/images/product-4.jpg", description: "Stylish and comfortable sneakers for everyday wear." },
    { id: 55, name: "Smartwatch", price: "$249.99", image: "/images/product-5.jpg", description: "Track your fitness and stay connected with this sleek smartwatch." },
    { id: 56, name: "Coffee Maker", price: "$149.99", image: "/images/product-6.jpg", description: "Brew your favorite coffee effortlessly with this modern coffee maker." },
    { id: 57, name: "Bluetooth Speaker", price: "$99.99", image: "/images/product-7.jpg", description: "Portable Bluetooth speaker with deep bass and crystal-clear sound." },
    { id: 58, name: "LED Monitor", price: "$349.99", image: "/images/product-6.jpg", description: "A stunning 4K LED monitor with ultra-smooth refresh rates." },
    { id: 59, name: "Mechanical Keyboard", price: "$129.99", image: "/images/product-7.jpg", description: "A mechanical keyboard with RGB lighting and tactile switches." },
    { id: 60, name: "Action Camera", price: "$299.99", image: "/images/product-2.jpg", description: "Capture all your adventures with this waterproof action camera." },
    { id: 61, name: "Wireless Headphones", price: "$199.99", image: "/images/product-1.jpg", description: "High-quality noise-canceling headphones for immersive sound." },
    { id: 62, name: "Smartphone", price: "$899.99", image: "/images/product-2.jpg", description: "Latest-gen smartphone with a stunning display and powerful camera." },
    { id: 63, name: "Gaming Laptop", price: "$1,499.99", image: "/images/product-3.jpg", description: "A high-performance laptop built for gaming and productivity." },
    { id: 64, name: "Sneakers", price: "$79.99", image: "/images/product-4.jpg", description: "Stylish and comfortable sneakers for everyday wear." },
    { id: 65, name: "Smartwatch", price: "$249.99", image: "/images/product-5.jpg", description: "Track your fitness and stay connected with this sleek smartwatch." },
    { id: 66, name: "Coffee Maker", price: "$149.99", image: "/images/product-6.jpg", description: "Brew your favorite coffee effortlessly with this modern coffee maker." },
    { id: 67, name: "Bluetooth Speaker", price: "$99.99", image: "/images/product-7.jpg", description: "Portable Bluetooth speaker with deep bass and crystal-clear sound." },
    { id: 68, name: "LED Monitor", price: "$349.99", image: "/images/product-4.jpg", description: "A stunning 4K LED monitor with ultra-smooth refresh rates." },
    { id: 69, name: "Mechanical Keyboard", price: "$129.99", image: "/images/product-5.jpg", description: "A mechanical keyboard with RGB lighting and tactile switches." },
    { id: 70, name: "Action Camera", price: "$299.99", image: "/images/product-1.jpg", description: "Capture all your adventures with this waterproof action camera." },
    { id: 71, name: "Mechanical Keyboard", price: "$129.99", image: "/images/product-5.jpg", description: "A mechanical keyboard with RGB lighting and tactile switches." },
    { id: 72, name: "Action Camera", price: "$299.99", image: "/images/product-1.jpg", description: "Capture all your adventures with this waterproof action camera." },
    
  ];
  

const CategorySection = () => {

    const [wishlist, setWishlist] = useState<number[]>([]);
    
    // Load from localStorage on initial render
    useEffect(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
            setWishlist(JSON.parse(savedWishlist));
        }
    }, []);
    
    // Save to localStorage whenever wishlist changes
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);
    
    const toggleWishlist = (productId: number) => {
        setWishlist(prevWishlist => {
            if (prevWishlist.includes(productId)) {
                return prevWishlist.filter(id => id !== productId);
            } else {
                return [...prevWishlist, productId];
            }
        });
    };

    const isInWishlist = (productId: number): boolean => {
        return wishlist.includes(productId);
    };

    return (
        <ContainerOverlay fullWidth paddingHorizontal={0} paddingVertical={8} className="max-w-none w-full">
        {/* // <div className="w-full py-8 max-w-none"> */}

            <PopUp />

            {/* Add padding only to the title */}
            <div className="px-4 md:px-6">
                <Typography variant="h4" fontWeight={700} className="text-orange-600">Shop By Category</Typography>
            </div>

            {/* Full-width grid with no horizontal margins */}
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full mt-6">
                {products.map((product) => (

                    <div key={product.id} className="flex flex-col items-center w-full">
                        
                        <div className="w-full aspect-square overflow-hidden relative group">
                            <Image 
                                src={product.image} 
                                alt={product.name} 
                                layout="fill"
                                objectFit="cover"
                                className="transition-transform duration-300 group-hover:scale-125"
                                style={{ borderRadius: '12px' }}
                                />

                             
                            
                            <IconButton
                                onClick={() => toggleWishlist(product.id)}
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    }
                                }}
                                size="small"
                                aria-label="add to wishlist"
                            >
                                {isInWishlist(product.id) ? (
                                    <FavoriteIcon sx={{ color: '#f44336' }} />
                                ) : (
                                    <FavoriteBorderIcon />
                                )}
                            </IconButton>
                            
                        </div>

                        {/* Product info with padding */}
                        <div className="w-full p-3">
                            <Typography variant="body1" fontWeight={600} className="text-center">
                                {product.name}
                            </Typography>

                            <Typography variant="body2" className="text-gray-500 mt-1 text-center">
                                {product.description}
                            </Typography>

                            
                            <Typography variant="h6" fontWeight={700} className="text-orange-600 mt-1 text-center">
                                {product.price}
                            </Typography>


                        </div>
                    </div>
                ))}
            </div>
        </ContainerOverlay>
        // </div>
    );
};

        





export default CategorySection;

