import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, inHeader = false }: { className?: string; inHeader?: boolean }) {
  const wrapperClasses = cn(
    "flex items-center gap-2",
    inHeader ? "text-foreground" : "text-primary-foreground",
    className
  );
  const textClasses = cn(
    "font-headline font-bold",
    inHeader ? "text-2xl md:text-3xl" : "text-4xl"
  );
  const logoClasses = cn(
    "fill-current",
    inHeader ? "h-8 w-8 text-blue-500" : "h-10 w-10 text-blue-400"
  );

  return (
    <Link href="/" className={wrapperClasses}>
      <svg
        className={logoClasses}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="BuyBee Logo"
      >
        <path
          d="M7.5 19.5C8.32843 19.5 9 18.8284 9 18C9 17.1716 8.32843 16.5 7.5 16.5C6.67157 16.5 6 17.1716 6 18C6 18.8284 6.67157 19.5 7.5 19.5Z"
          fill="black"
        />
        <path
          d="M16.5 19.5C17.3284 19.5 18 18.8284 18 18C18 17.1716 17.3284 16.5 16.5 16.5C15.6716 16.5 15 17.1716 15 18C15 18.8284 15.6716 19.5 16.5 19.5Z"
          fill="black"
        />
        <path
          d="M17.8 14.25H6.85714C6.26938 14.25 5.8 14.7194 5.8 15.3071V15.5C5.8 16.0304 6.22386 16.4543 6.75429 16.4543H17.8C18.3304 16.4543 18.7543 16.0304 18.7543 15.5V15.3071C18.7543 14.7194 18.2849 14.25 17.8 14.25Z"
          fill="currentColor"
        />
        <path
          d="M5.5 12L7 14.25H17L18.5 12C18.9 11.4 19 10.8 19 10.2C19 8.43269 17.5673 7 15.8 7H8.2C6.43269 7 5 8.43269 5 10.2C5 10.8 5.1 11.4 5.5 12Z"
          fill="currentColor"
        />
        <path
          d="M8.27051 4.298C8.59858 3.52553 9.49755 2.50893 10.8354 2.06732C11.121 1.96879 11.4231 1.91602 11.7333 1.91602C12.7844 1.91602 13.7846 2.45524 14.4923 3.32408C15.1965 4.1878 15.5 5.25272 15.5 6.33333V7H8.5V6.33333C8.5 5.61747 8.35626 4.93049 8.27051 4.298Z"
          stroke="black"
          strokeWidth="1.5"
        />
      </svg>

      <span className={textClasses}>BuyBee</span>
    </Link>
  );
}
