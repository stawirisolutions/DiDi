'use client'

import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import Image from 'next/image'; 


interface LogoLoaderProps {
  message?: string;
}

const LogoLoader: React.FC<LogoLoaderProps> = ({ 
  message = 'Loading your DiDi shopping experience...'
}) => {
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
      }}
    >
      {/* Logo with animation */}
      <Box
        sx={{
          animation: 'pulse 1.5s infinite',
          '@keyframes pulse': {
            '0%': {
              transform: 'scale(1)',
              opacity: 1
            },
            '50%': {
              transform: 'scale(1.1)',
              opacity: 0.8
            },
            '100%': {
              transform: 'scale(1)',
              opacity: 1
            }
          }
        }}
      >

        <Image
          src="/images/logo.png"
          alt="DiDi Logo"
          width={160}  // Set appropriate width
          height={80}  // Set appropriate height
          priority     // Loads the image immediately as it's important
          style={{
            objectFit: 'contain'
          }}
        />

      </Box>
      
      {/* Circular progress under the logo */}
      <CircularProgress 
        size={60} 
        sx={{ 
          color: 'rgb(252, 163, 54)',
          mt: 2,
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          },
        }}
      />
      
      {/* Loading message */}
      <Typography 
        variant="h6" 
        sx={{ 
          mt: 2, 
          color: 'rgb(252, 163, 54)', 
          fontFamily: 'var(--font-geist-sans)',
          fontWeight: 500,
          textAlign: 'center',
          maxWidth: '80%',
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default LogoLoader;