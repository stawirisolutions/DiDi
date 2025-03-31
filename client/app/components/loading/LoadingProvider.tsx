'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import LogoLoader from './LogoLoader';
// Create a context to manage loading state
interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  showLoader: (message?: string) => void;
  hideLoader: () => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setLoading: () => {},
  showLoader: () => {},
  hideLoader: () => {},
});

export const useLoading = () => useContext(LoadingContext);

interface LoadingProviderProps {
  children: React.ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loaderMessage, setLoaderMessage] = useState('Loading your DiDi shopping experience...');
  
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // This effect will track navigation changes
  useEffect(() => {
    // Show loader for a minimum time to avoid flicker on fast page loads
    const showLoaderWithMinimumTime = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 800); // Show loader for at least 800ms
    };

    showLoaderWithMinimumTime();
    
    // Cleanup function not needed since we manage the state inside
  }, [pathname, searchParams]);

  const showLoader = (message?: string) => {
    if (message) setLoaderMessage(message);
    setIsLoading(true);
  };

  const hideLoader = () => {
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider 
      value={{ 
        isLoading, 
        setLoading: setIsLoading,
        showLoader,
        hideLoader
      }}
    >
      {children}
      {isLoading && <LogoLoader message={loaderMessage} />}
    </LoadingContext.Provider>
  );
};