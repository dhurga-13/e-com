import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import MainHeader from "@/components/layout/MainHeader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Riode | Modern Online Shopping",
  description: "Discover premium products with an exceptional shopping experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full" suppressHydrationWarning>
      <body className="w-full m-0 p-0 overflow-x-hidden" suppressHydrationWarning>
        <div className="page-wrapper flex flex-col min-h-screen">
          <header id="site-header" className="w-full">
            <TopBar />
            <MainHeader />
            <Navbar />
          </header>
          <main className="w-full m-0 p-0 overflow-x-hidden">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
