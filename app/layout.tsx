import type { Metadata } from "next";
import { Figtree, Montserrat } from "next/font/google";
import RootLayoutClient from "@/components/layout/RootLayoutClient";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "900"],
  variable: "--font-title",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-ui",
});

export const metadata: Metadata = {
  title: "Solitek | Solutions solaires et photovoltaïques",
  description:
    "Solitek vous aide à estimer votre installation photovoltaïque, à comprendre les enjeux énergétiques et à contacter nos équipes.",
  keywords: [
    "solaire",
    "photovoltaïque",
    "estimateur solaire",
    "installateur solaire",
    "énergie renouvelable",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${montserrat.variable} ${figtree.variable} antialiased bg-slate-50 text-slate-900 font-title`}
      >
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
