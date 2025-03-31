import { Badge, IconButton } from '@mui/material';
import { FavoriteBorder } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useLoading } from '@/app/components/loading/LoadingProvider';


function NavbarWishlistButton() {
  const router = useRouter();
  const [wishlistCount, setWishlistCount] = useState(0);
  const { showLoader, hideLoader } = useLoading();

  
  useEffect(() => {
    const updateWishlistCount = () => {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        const wishlistArray = JSON.parse(savedWishlist);
        setWishlistCount(wishlistArray.length);
      } else {
        setWishlistCount(0);
      }
    };

    
    updateWishlistCount();
    window.addEventListener('focus', updateWishlistCount);
    
    return () => {
      window.removeEventListener('focus', updateWishlistCount);
    };
  }, []);
  
  return (
    <Badge 
    badgeContent={wishlistCount} 
    color='primary'
    invisible={wishlistCount === 0}
  >
    <IconButton 
      size='small' 
      onClick={() => {
        showLoader('Loading your wishlist...');
        router.push('/sections/wishlist');
      }}
    >
      <FavoriteBorder fontSize='large' />
      My Wishlist
    </IconButton>
  </Badge>
  );
}

export default NavbarWishlistButton;