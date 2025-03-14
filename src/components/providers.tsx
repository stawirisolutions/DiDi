'use client'

import React, { ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import ThemeProvider from '@/utils/theme';
import { SessionProvider } from 'next-auth/react';
import { SnackbarProvider } from 'notistack';
import NextTopLoader from 'nextjs-toploader';
import { PRIMARY_COLOR } from '@/config';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <SessionProvider>
        <NextTopLoader color={PRIMARY_COLOR.main} showSpinner={false} />
        <AppRouterCacheProvider>
            <ThemeProvider>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </SessionProvider>
    </SnackbarProvider>
  )
}

export default Providers