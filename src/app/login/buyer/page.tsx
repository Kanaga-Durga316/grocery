
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthForm } from "@/components/auth/AuthForm";
import { useAuth } from "@/hooks/use-auth";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Logo } from "@/components/Logo";

export default function BuyerLoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (data: any) => {
    const success = await login(data.email, data.password);
    if (success) {
      router.push("/account");
    }
    return success;
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <Logo />
            <h1 className="text-3xl font-bold font-headline mt-4">Buyer Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <AuthForm mode="login" onSubmit={handleLogin} />
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        <Image
          src="/background/buyer.png"
          alt="Buyer login background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
    </div>
  );
}
