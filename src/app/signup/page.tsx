"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthForm } from "@/components/auth/AuthForm";
import { useAuth } from "@/hooks/use-auth";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Logo } from "@/components/Logo";

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const authImage = PlaceHolderImages.find(p => p.id === 'page-header-auth')!;

  const handleSignup = async (data: any) => {
    const success = await signup(data.name, data.email, data.password);
    if (success) {
      router.push("/account");
    }
    return success;
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto w-[400px] space-y-6">
            <div className="flex justify-center">
                <Logo />
            </div>
            <AuthForm mode="signup" onSubmit={handleSignup} />
            <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
                >
                Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
                >
                Privacy Policy
                </Link>
                .
            </p>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline">
                Log in
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
          className="h-full w-full object-cover dark:brightness-[0.7]"
        />
         <div className="absolute inset-0 bg-black/30" />
      </div>
    </div>
  );
}
