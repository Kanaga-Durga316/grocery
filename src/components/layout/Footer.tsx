import { Logo } from "@/components/Logo";
import { Github, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Logo inHeader={true} />
            <p className="mt-2 text-sm text-muted-foreground">Your one-stop shop for fresh groceries.</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground"><Github size={20} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground"><Twitter size={20} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground"><Instagram size={20} /></Link>
            </div>
            <div className="flex gap-4 text-sm mt-4 md:mt-0">
               <Link href="#" className="text-muted-foreground hover:text-foreground">Terms</Link>
               <Link href="#" className="text-muted-foreground hover:text-foreground">Privacy</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ShopNGo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
