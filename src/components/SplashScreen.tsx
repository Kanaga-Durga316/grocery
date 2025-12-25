
"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const BeeLogo = () => (
  <svg
    width="120"
    height="120"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Wings */}
    <motion.path
      d="M40 30 C20 10, 20 50, 40 50"
      fill="white"
      stroke="black"
      strokeWidth="2"
      initial={{ rotate: -10, transformOrigin: '40px 40px' }}
      animate={{ rotate: [0, -15, 0], transition: { duration: 1, repeat: Infinity, ease: "easeInOut" } }}
    />
    <motion.path
      d="M60 30 C80 10, 80 50, 60 50"
      fill="white"
      stroke="black"
      strokeWidth="2"
      initial={{ rotate: 10, transformOrigin: '60px 40px' }}
      animate={{ rotate: [0, 15, 0], transition: { duration: 1, repeat: Infinity, ease: "easeInOut" } }}
    />
    {/* Body */}
    <path d="M50 45 C70 45, 80 60, 80 75 C80 90, 65 100, 50 100 C35 100, 20 90, 20 75 C20 60, 30 45, 50 45 Z" fill="hsl(45, 100%, 50%)" />
    <path d="M24 65 H 76" stroke="black" strokeWidth="4" />
    <path d="M22 78 H 78" stroke="black" strokeWidth="4" />
    <path d="M26 91 H 74" stroke="black" strokeWidth="4" />

    {/* Eyes and Smile */}
    <circle cx="40" cy="60" r="3" fill="black" />
    <circle cx="60" cy="60" r="3" fill="black" />
    <path d="M45 70 Q50 75, 55 70" stroke="black" strokeWidth="2" fill="none" />

    {/* Shopping Bag */}
    <motion.g initial={{ rotate: 0 }} animate={{ rotate: [-2, 2, -2], transition: { duration: 1.5, repeat: Infinity, ease: 'linear' } }} transform-origin="50px 75px">
        <path d="M 40 85 L 35 98 H 65 L 60 85 Z" fill="white" stroke="black" strokeWidth="2" />
        <path d="M45 85 Q 50 80, 55 85" stroke="black" strokeWidth="2" fill="none"/>
    </motion.g>
  </svg>
);


export function SplashScreen({ onFinished }: { onFinished: () => void }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(onFinished, 2400);
    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-white"
      initial={{ opacity: 1 }}
      animate={isMounted ? { opacity: 1 } : { opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
        className="flex flex-col items-center justify-center"
      >
        <BeeLogo />
        <h1 className={cn("font-headline text-6xl font-bold text-black mt-4")}>BuyBee</h1>
        <p className="font-body text-lg text-neutral-800 mt-2">Everything You Need, Just a Buzz Away.</p>
      </motion.div>
      <div className="absolute bottom-16">
         <div className="w-16 h-1.5 bg-black/10 rounded-full overflow-hidden">
             <motion.div
                className="h-full bg-blue-500 rounded-full"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
             />
         </div>
      </div>
    </motion.div>
  );
}
