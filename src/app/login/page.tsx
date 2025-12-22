"use client";

import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, Store } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function LoginPage() {
  const authImage = PlaceHolderImages.find(p => p.id === 'page-header-auth')!;

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto w-[400px] space-y-8 text-center">
            <Logo />
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Login</CardTitle>
                    <CardDescription>Are you a buyer or a seller?</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <Button variant="outline" asChild className="h-24 flex-col gap-2">
                        <Link href="/login/buyer">
                            <User className="h-8 w-8" />
                            <span>Buyer</span>
                        </Link>
                    </Button>
                    <Button variant="outline" asChild className="h-24 flex-col gap-2">
                        <Link href="/login/seller">
                            <Store className="h-8 w-8" />
                            <span>Seller</span>
                        </Link>
                    </Button>
                </CardContent>
            </Card>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline">
                    Sign up
                </Link>
            </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        <Image
          src={authImage.imageUrl}
          alt={authImage.description}
          data-ai-hint={authImage.imageHint}
          fill
          className="object-cover dark:brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
    </div>
  );
}
