import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Devis Gratuit | Contactez SOLITEK à Strasbourg, Installateur ENR",
  description:
    "Demandez un devis gratuit à SOLITEK, votre installateur certifié RGE à Strasbourg et en Alsace. Installation panneaux solaires, pompe à chaleur, climatisation, borne IRVE. Réponse sous 24h, sans engagement.",
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
    title: "Demandez un Devis Gratuit | SOLITEK Strasbourg",
    description:
      "Contactez SOLITEK pour un devis gratuit : panneaux solaires, pompe à chaleur, climatisation à Strasbourg et en Alsace. Réponse sous 24h.",
    url: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
