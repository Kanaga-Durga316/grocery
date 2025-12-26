

"use client";

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/contexts/CartProvider';
import { AuthProvider } from '@/contexts/AuthProvider';
import { useState, useEffect } from 'react';
import { SplashScreen } from '@/components/SplashScreen';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500); // Simulate loading for 2.5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" className="h-full dark">
      <head>
        <title>ShopNGo - Online Grocery, Food Delivery & E-commerce</title>
        <meta name="description" content="ShopNGo - Online Grocery, Food Delivery & E-commerce" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&family=Belleza&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased h-full flex flex-col">
        {loading ? (
           <SplashScreen onFinished={() => setLoading(false)} />
        ) : (
          <FirebaseClientProvider>
            <AuthProvider>
              <CartProvider>{children}</CartProvider>
            </AuthProvider>
          </FirebaseClientProvider>
        )}
        <Toaster />
      </body>
    </html>
  );
}
