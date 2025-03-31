'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';

import { ReactNode } from 'react';

interface VendorLayoutProps {
  children: ReactNode;
}

export default function VendorLayout({ children }: VendorLayoutProps) {

   // Use client-side only rendering to avoid hydration issues
   const [isMounted, setIsMounted] = useState(false);

   useEffect(() => {
     setIsMounted(true);
   }, []);
 
   // Return a simple loading state while not mounted
   if (!isMounted) {
     return null; // or a loading spinner
   }
 
   // Once mounted, render the full layout


  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar navigation */}
      <aside className="w-64 bg-white border-r hidden md:block">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Vendor Portal</h2>
        </div>
        <nav className="p-4">
          <VendorNavigation />
        </nav>
      </aside>
      
      {/* Mobile header with navigation */}
      <div className="md:hidden w-full bg-white border-b p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Vendor Portal</h2>
          <button className="p-2">
            {/* Hamburger icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}

// Navigation component - client component for active state
function VendorNavigation() {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard/vendor' },
    { name: 'Products', path: '/dashboard/vendor/products' },
    { name: 'Orders', path: '/dashboard/vendor/orders' },
    { name: 'Profile', path: '/dashboard/vendor/profile' },
  ];
  
  return (
    <ul className="space-y-2">
      {navItems.map((item) => {
        const isActive = 
          item.path === '/dashboard/vendor' 
            ? pathname === '/dashboard/vendor'
            : pathname.startsWith(item.path);
            
        return (
          <li key={item.path}>
            <Link 
              href={item.path}
              className={`block p-2 rounded-md ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}