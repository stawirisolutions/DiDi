'use client';

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LoadingProvider } from "./components/loading/LoadingProvider";

interface ProviderProps {
  children: ReactNode;
}

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
  typography: {
    fontFamily: 'var(--font-geist-sans)',
  },
});

export function AppProviders({ children }: ProviderProps) {
  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LoadingProvider>
          {children}
        </LoadingProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}