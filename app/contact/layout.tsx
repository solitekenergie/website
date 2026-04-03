import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Devis énergie à Strasbourg",
  description:
    "Demandez un devis gratuit pour des panneaux solaires, une pompe à chaleur ou une climatisation à Strasbourg. Réponse rapide sous 24h.",
  alternates: {
    canonical: "/contact",
  },
  keywords: [
    "devis panneaux solaires Strasbourg",
    "devis pompe à chaleur Strasbourg",
    "devis installation solaire gratuit",
    "contact installateur RGE Strasbourg",
    "devis climatisation Strasbourg",
    "devis panneaux solaires Alsace",
    "devis pompe à chaleur Alsace",
  ],
  openGraph: {
    title: "Devis énergie à Strasbourg | SOLITEK",
    description:
      "Demandez un devis gratuit pour des panneaux solaires, une pompe à chaleur ou une climatisation à Strasbourg.",
    url: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
