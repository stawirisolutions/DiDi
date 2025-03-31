'use client'

import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { ShoppingBag, ShoppingCart, LocalMall } from '@mui/icons-material';

interface ShoppingLoaderProps {
  message?: string;
  variant?: 'bag' | 'cart' | 'mall';
}

const ShoppingLoader: React.FC<ShoppingLoaderProps> = ({ 
  message = 'Loading your DiDi shopping experience...', 
  variant = 'cart' 
}) => {
  // Select icon based on variant
  const getIcon = () => {
    switch (variant) {
      case 'bag':
        return <ShoppingBag sx={{ fontSize: 40, color: 'rgb(252, 163, 54)', animation: 'bounce 1s infinite' }} />;
      case 'mall':
        return <LocalMall sx={{ fontSize: 40, color: 'rgb(252, 163, 54)', animation: 'bounce 1s infinite' }} />;
      case 'cart':
      default:
        return <ShoppingCart sx={{ fontSize: 40, color: 'rgb(252, 163, 54)', animation: 'bounce 1s infinite' }} />;
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(5px)',
        zIndex: 9999,
        gap: 2,
        '@keyframes bounce': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
      }}
    >
      {getIcon()}
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress 
          size={60} 
          sx={{ 
            color: 'rgb(252, 163, 54)',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 'bold',
              fontSize: '16px',
              color: 'rgb(252, 163, 54)',
            }}
          >
            DiDi
          </Typography>
        </Box>
      </Box>
      <Typography 
        variant="h6" 
        sx={{ 
          mt: 2, 
          color: 'rgb(252, 163, 54)', 
          fontFamily: 'var(--font-geist-sans)',
          fontWeight: 500 
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default ShoppingLoader;