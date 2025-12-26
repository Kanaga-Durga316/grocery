import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, inHeader = false }: { className?: string; inHeader?: boolean }) {
  const wrapperClasses = cn(
    "flex items-center gap-2 text-foreground",
    className
  );
  const textClasses = cn(
    "font-headline font-bold",
    inHeader ? "text-2xl md:text-3xl" : "text-4xl"
  );
  const logoClasses = cn(
    "fill-current",
    inHeader ? "h-8 w-8" : "h-10 w-10"
  );

  return (
    <Link href="/" className={wrapperClasses}>
       <svg
        className={logoClasses}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="ShopNGo Logo"
      >
        <path d="M22 26H50L46 46H24L22 26Z" fill="#4CAF50"/>
        <path d="M18 20H54" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 26L24 46" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M50 26L46 46" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 46H46" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="27" cy="50" r="2" fill="black"/>
        <circle cx="43" cy="50" r="2" fill="black"/>
        <path d="M36 12C36 8.68629 33.3137 6 30 6C26.6863 6 24 8.68629 24 12C24 14.35 25.2133 16.4167 27 17.6667V22H33V17.6667C34.7867 16.4167 36 14.35 36 12Z" fill="#F9A825"/>
        <path d="M10 28H16" stroke="black" strokeWidth="3" strokeLinecap="round"/>
        <path d="M12 34H18" stroke="black" strokeWidth="3" strokeLinecap="round"/>
        <path d="M14 40H20" stroke="black" strokeWidth="3" strokeLinecap="round"/>
      </svg>
      <span className={textClasses}>ShopNGo</span>
    </Link>
  );
}
