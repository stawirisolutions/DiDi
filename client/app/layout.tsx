import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from './providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DiDi",
  description: "Your One Stop Shop",
};

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="en">
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} 
        style={{ 
          background: 'linear-gradient(to bottom,rgb(252, 163, 54) 0%, #ffffff 25%, #ffffff 75%, #ffb366 100%)',
          minHeight: '100vh'
        }}
        suppressHydrationWarning={true}
      >
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}