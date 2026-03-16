import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Questions sur l'Énergie Solaire & ENR en Alsace",
  description:
    "Toutes les réponses à vos questions sur l'installation de panneaux solaires photovoltaïques, les aides financières (MaPrimeRénov, TVA réduite, prime autoconsommation), les délais, le Consuel et l'entretien en Alsace.",
  keywords: [
    "FAQ panneaux solaires",
    "questions installation photovoltaïque",
    "aides financières panneaux solaires",
    "MaPrimeRénov photovoltaïque",
    "prime autoconsommation 2024",
    "délai installation solaire",
    "Consuel photovoltaïque",
    "kWc dimensionnement solaire",
    "entretien panneaux solaires",
    "pompe à chaleur compatibilité solaire",
  ],
  openGraph: {
    title: "FAQ Énergie Solaire & ENR | SOLITEK Alsace",
    description:
      "Délais, aides financières, dimensionnement, entretien : toutes les réponses sur votre installation solaire ou ENR en Alsace.",
    url: "/faq",
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
