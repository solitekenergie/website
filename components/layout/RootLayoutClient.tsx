"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isEstimateur = pathname === "/estimateur";

  useEffect(() => {
    if (isEstimateur) {
      document.body.style.backgroundColor = "#ffffff";
    } else {
      document.body.style.backgroundColor = "#f8fafc";
    }
  }, [isEstimateur]);

  if (isEstimateur) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[#2DB180] focus:px-6 focus:py-3 focus:font-ui focus:text-sm focus:font-bold focus:text-white focus:outline-none"
      >
        Aller au contenu principal
      </a>
      <Header />
      <main id="main-content" className="flex w-full flex-1 flex-col">{children}</main>
      <Footer />
    </div>
  );
}
