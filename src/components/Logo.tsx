import Link from "next/link";
import { Leaf } from "lucide-react";
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
  const leafClasses = cn(
    inHeader ? "h-6 w-6" : "h-8 w-8"
  );

  return (
    <Link href="/" className={wrapperClasses}>
      <Leaf className={leafClasses} />
      <span className={textClasses}>GrocerEase</span>
    </Link>
  );
}
