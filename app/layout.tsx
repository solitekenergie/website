import type { Metadata } from "next";
import { Figtree, Montserrat } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "900"],
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
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex w-full flex-1 flex-col pb-16">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
