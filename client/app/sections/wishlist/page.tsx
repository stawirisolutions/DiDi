'use client'

import React, { useState, useEffect } from 'react';
import { Typography, Container, Grid, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import { Delete, ArrowBack, ImportExport } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/app/components/loading/LoadingProvider';



// Add proper TypeScript interfaces
interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image?: string;
}

// Simulated products data - in a real app, you'd likely fetch this from an API
const allProducts: WishlistItem[] = [
  { id: 1, name: "Wireless Headphones", price: 199.99, image: "/headphones.jpg" },
  { id: 2, name: "Smartphone", price: 899.99, image: "/smartphone.jpg" },
  { id: 3, name: "Gaming Laptop", price: 1499.99, image: "/laptop.jpg" },
  // Add more products as needed
];


export default function WishlistPage() {
  const router = useRouter();
  const { showLoader, hideLoader } = useLoading();
  
  // Wishlist state management
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [wishlistCount, setWishlistCount] = useState<number>(0);

  useEffect(() => {
    // Load wishlist from localStorage
    const loadWishlist = () => {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        try {
          const parsedWishlist = JSON.parse(savedWishlist);
          // Ensure we're getting an array of IDs
          if (Array.isArray(parsedWishlist)) {
            // Check if first item is a number (array of IDs) or object with id property
            if (parsedWishlist.length === 0 || typeof parsedWishlist[0] === 'number') {
              setWishlist(parsedWishlist);
            } else if (typeof parsedWishlist[0] === 'object' && parsedWishlist[0] !== null) {
              // If it's an array of objects, extract the IDs
              setWishlist(parsedWishlist.map((item: { id: number }) => item.id));
            } else {
              setWishlist([]);
            }
          } else {
            console.error('Wishlist format not recognized');
            setWishlist([]);
          }
        } catch (error) {
          console.error('Error parsing wishlist data:', error);
          setWishlist([]);
        }
      } else {
        setWishlist([]);
      }
      
      // Update the wishlist count
      updateWishlistCount();
    };

    loadWishlist();
    
    // Define event listeners
    const handleWishlistUpdate = () => {
      updateWishlistCount();
    };
    
    // Set up event listeners
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    window.addEventListener('focus', updateWishlistCount);
    
    return () => {
      // Clean up event listeners
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
      window.removeEventListener('focus', updateWishlistCount);
    };
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const updateWishlistCount = () => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        const wishlistArray = JSON.parse(savedWishlist);
        setWishlistCount(Array.isArray(wishlistArray) ? wishlistArray.length : 0);
      } catch (error) {
        console.error('Error parsing wishlist count:', error);
        setWishlistCount(0);
      }
    } else {
      setWishlistCount(0);
    }
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prevWishlist => {
      // If product is in wishlist, remove it
      if (prevWishlist.includes(productId)) {
        return prevWishlist.filter(id => id !== productId);
      } 
      // Otherwise, add it
      else {
        return [...prevWishlist, productId];
      }
    });
    
    // Create and dispatch a custom event
    const wishlistUpdatedEvent = new Event('wishlistUpdated');
    window.dispatchEvent(wishlistUpdatedEvent);
    
    // Return true if added, false if removed (for UI feedback if needed)
    return !isInWishlist(productId);
  };

  const isInWishlist = (productId: number): boolean => {
    return wishlist.includes(productId);
  };

  // Filter all products to only show those in the wishlist
  const wishlistItems = allProducts.filter(product => isInWishlist(product.id));
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back button */}
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => {
          showLoader('Returning to home page...', 'mall');
          router.push('/');
        }} 
        sx={{ 
          mb: 2,
          backgroundColor: 'green',
          color: 'white',
          '&:hover': {
            backgroundColor: 'darkgreen',
          }
        }}
        variant="contained"
      >
        Back to Home
      </Button>
      
      <Typography variant="h4" component="h1" gutterBottom className='text-black text-semi-bold'>
        My Wishlist
      </Typography>
      
      {wishlistItems.length === 0 ? (
        <Typography className='text-black'>Your wishlist is empty. Browse products and add items you like!</Typography>
      ) : (
        <Grid container spacing={3}>
          {wishlistItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.image || "/placeholder.jpg"}
                  alt={item.name}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "/placeholder.jpg";
                    console.log(`Failed to load image: ${item.image}`);
                  }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${item.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    component={Link} 
                    href={`/product/${item.id}`}
                    onClick={() => showLoader('Loading product details...', 'bag')}
                  >
                    View Details
                  </Button>
                  <Button 
                    size="small"
                    onClick={() => {
                      showLoader('Adding to cart...', 'cart');
                      // Simulate adding to cart
                      setTimeout(() => {
                        hideLoader();
                        // Here you would add your actual "add to cart" logic
                      }, 1500);
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button 
                    size="small" 
                    color="error" 
                    startIcon={<Delete />}
                    onClick={() => toggleWishlist(item.id)}
                  >
                    Remove
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}