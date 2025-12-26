'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/PageHeader';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/use-auth';
import { OrderHistory } from '@/components/OrderHistory';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AccountPage() {
  const pageHeaderImage = PlaceHolderImages.find(p => p.id === 'page-header-auth')!;
  const { user, loading } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <PageHeader title="My Account" image={pageHeaderImage} />
        <div className="container mx-auto px-4 py-12">
          {loading ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : user ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl">Account Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-semibold">Name</p>
                      <p className="text-muted-foreground">{user.name}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-muted-foreground">{user.email}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Role</p>
                      <p className="text-muted-foreground">{user.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="md:col-span-2">
                <OrderHistory userId={user.id} />
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="font-headline text-2xl">Please Log In</h2>
              <p className="text-muted-foreground mt-2">
                You need to be logged in to view your account details.
              </p>
              <Button asChild className="mt-4">
                <Link href="/login">Login</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
