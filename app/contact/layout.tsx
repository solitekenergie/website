import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Devis Gratuit | Contactez SOLITEK, Installateur ENR en Alsace",
  description:
    "Demandez un devis gratuit à SOLITEK, votre installateur certifié RGE en Alsace. Installation panneaux solaires, pompe à chaleur, climatisation, borne IRVE. Réponse sous 24h, sans engagement.",
  keywords: [
    "devis panneaux solaires Alsace",
    "devis pompe à chaleur Alsace",
    "devis installation solaire gratuit",
    "contact installateur RGE Alsace",
    "devis climatisation Alsace",
    "devis borne IRVE Alsace",
  ],
  openGraph: {
    title: "Demandez un Devis Gratuit | SOLITEK Alsace",
    description:
      "Contactez SOLITEK pour un devis gratuit : panneaux solaires, pompe à chaleur, climatisation en Alsace. Réponse sous 24h.",
    url: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
