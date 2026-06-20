import type { Metadata } from "next";
import "./globals.css";
import ConditionalHeader from "@/components/layout/ConditionalHeader";
import ConditionalFooter from "@/components/layout/ConditionalFooter";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import AuthProvider from "@/components/providers/SessionProvider";

export const metadata: Metadata = {
  title: "Riode — eCommerce",
  description: "Riode eCommerce Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="w-full overflow-x-hidden"
      suppressHydrationWarning
    >
      <body
        className="w-full m-0 p-0 overflow-x-hidden"
        suppressHydrationWarning
      >
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <div className="page-wrapper flex flex-col min-h-screen min-w-0">
                <ConditionalHeader />
                <main className="w-full m-0 p-0 overflow-x-hidden">
                  {children}
                </main>
                <ConditionalFooter />
              </div>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
