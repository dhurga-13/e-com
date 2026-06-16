"use client";

import { usePathname } from "next/navigation";
import TopBar from "./TopBar";
import MainHeader from "./MainHeader";
import Navbar from "./Navbar";

export default function ConditionalHeader() {
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password";

  return (
    <header id="site-header" className="w-full">
      <TopBar />
      {!isAuthPage && (
        <>
          <MainHeader />
          <Navbar />
        </>
      )}
    </header>
  );
}
