
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, Store } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function LoginPage() {

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center p-4">
      <Image
        src="/background/bs.png"
        alt="Login background image"
        fill
        className="object-cover dark:brightness-[0.5] z-0"
      />
      <div className="absolute inset-0 bg-black/40 z-10" />
      
      <div className="relative z-20 mx-auto w-full max-w-md space-y-8 text-center">
          <Logo />
          <Card className="bg-background/80 backdrop-blur-sm">
              <CardHeader>
                  <CardTitle className="font-headline text-3xl">Login</CardTitle>
                  <CardDescription>Are you a buyer or a seller?</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                  <Button variant="outline" asChild className="h-24 flex-col gap-2 bg-background/50 hover:bg-background/80">
                      <Link href="/login/buyer">
                          <User className="h-8 w-8" />
                          <span>Buyer</span>
                      </Link>
                  </Button>
                  <Button variant="outline" asChild className="h-24 flex-col gap-2 bg-background/50 hover:bg-background/80">
                      <Link href="/login/seller">
                          <Store className="h-8 w-8" />
                          <span>Seller</span>
                      </Link>
                  </Button>
              </CardContent>
          </Card>
          <div className="text-center text-sm text-white">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline font-semibold">
                  Sign up
              </Link>
          </div>
      </div>
    </div>
  );
}
