import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-background">{children}</main>
      <Footer />
    </div>
  );
}
