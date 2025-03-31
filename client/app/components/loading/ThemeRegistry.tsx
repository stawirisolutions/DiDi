'use client'

import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create a theme instance that matches your brand colors
const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(252, 163, 54)', // Matching your gradient orange
    },
    secondary: {
      main: '#ffb366', // Lighter orange from gradient
    },
  },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}