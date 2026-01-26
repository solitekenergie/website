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
      <Header />
      <main className="flex w-full flex-1 flex-col pb-16">{children}</main>
      <Footer />
    </div>
  );
}
