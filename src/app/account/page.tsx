import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/PageHeader";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AccountPage() {
  const pageHeaderImage = PlaceHolderImages.find(p => p.id === 'page-header-auth')!;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <PageHeader title="My Account" image={pageHeaderImage} />
        <div className="container mx-auto px-4 py-12">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Welcome to your account page.</p>
              <Separator />
              <p className="text-muted-foreground">Order history and profile settings will be available here soon.</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
