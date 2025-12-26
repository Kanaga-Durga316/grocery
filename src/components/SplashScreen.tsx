
"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';

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
        <Logo />
        <p className="font-body text-lg text-neutral-800 mt-2">Everything You Need, On the Go</p>
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
