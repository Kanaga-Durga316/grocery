import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/contexts/CartProvider';
import { AuthProvider } from '@/contexts/AuthProvider';

export const metadata: Metadata = {
  title: 'BuyBee',
  description: 'Online Grocery, Food Delivery & E-commerce',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&family=Belleza&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased h-full flex flex-col">
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
