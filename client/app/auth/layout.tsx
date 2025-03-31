'use client';

import React from 'react';
import Logo from '../components/logo';

interface AUTH_LAYOUT_PROPS {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AUTH_LAYOUT_PROPS) {
  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-center gap-10 p-6 md:p-12'>
      <Logo />
      <div className='w-full md:w-2/3 lg:w-1/2 xl:w-2/5 p-6 border border-gray-300 rounded-lg shadow-sm'>
        {children}
      </div>
    </div>
  );
}