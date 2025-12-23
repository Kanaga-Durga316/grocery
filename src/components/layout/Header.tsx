
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import {
  Menu as MenuIcon,
  Search,
  ShoppingCart,
  User as UserIcon,
  X,
  Home,
  ShoppingBasket,
  LogIn,
  LogOut,
  LayoutDashboard,
  Utensils,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Grocery", icon: ShoppingBasket },
  { href: "/food", label: "Food", icon: Utensils },
];

export function Header() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const MobileNavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
        pathname === href && "bg-muted text-primary"
      )}
      onClick={() => {
        setIsMobileMenuOpen(false);
        onClick?.();
      }}
    >
      {children}
    </Link>
  );
  
  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo inHeader={true} />
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname.startsWith(href) && href !== '/' || pathname === href ? "text-foreground" : "text-foreground/60"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex relative">
            <Input type="search" placeholder="Search products..." className="w-full md:w-[200px] lg:w-[300px] pr-8" />
            <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>

          <Button asChild variant="ghost" size="icon" className="relative">
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>
          
          <div className="hidden md:flex">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <UserIcon className="h-5 w-5" />
                    <span className="sr-only">User Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/account">
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>My Account</span>
                    </Link>
                  </DropdownMenuItem>
                  {user.role === 'Admin' && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Admin Panel</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {user.role === 'Seller' && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Seller Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="ghost">
                <Link href="/login">
                  Login
                </Link>
              </Button>
            )}
          </div>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-4 text-lg font-medium p-4">
                <div className="flex justify-between items-center mb-4">
                  <Logo inHeader={true} />
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                {navLinks.map(({ href, label, icon: Icon }) => (
                  <MobileNavLink key={href} href={href}>
                    <Icon className="h-5 w-5" />
                    {label}
                  </MobileNavLink>
                ))}
                <Separator className="my-2" />
                {user ? (
                  <>
                    <MobileNavLink href="/account">
                      <UserIcon className="h-5 w-5" />
                      My Account
                    </MobileNavLink>
                    {user.role === 'Admin' && (
                      <MobileNavLink href="/admin">
                        <LayoutDashboard className="h-5 w-5" />
                        Admin Panel
                      </MobileNavLink>
                    )}
                    {user.role === 'Seller' && (
                        <MobileNavLink href="/admin">
                            <LayoutDashboard className="h-5 w-5" />
                            <span>Seller Dashboard</span>
                        </MobileNavLink>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <LogOut className="h-5 w-5" />
                      Log Out
                    </button>
                  </>
                ) : (
                  <MobileNavLink href="/login">
                    <LogIn className="h-5 w-5" />
                    Login / Sign Up
                  </MobileNavLink>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
