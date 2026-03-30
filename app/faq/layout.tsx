import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Questions sur l'Énergie Solaire & ENR à Strasbourg",
  description:
    "Toutes les réponses à vos questions sur l'installation de panneaux solaires, pompe à chaleur et climatisation à Strasbourg et en Alsace. Aides financières, délais, entretien.",
  alternates: {
    canonical: "/faq",
  },
  keywords: [
    "FAQ panneaux solaires",
    "questions installation photovoltaïque",
    "aides financières panneaux solaires",
    "MaPrimeRénov photovoltaïque",
    "prime autoconsommation photovoltaïque",
    "délai installation solaire",
    "Consuel photovoltaïque",
    "kWc dimensionnement solaire",
    "entretien panneaux solaires",
    "pompe à chaleur compatibilité solaire",
  ],
  openGraph: {
    title: "FAQ Énergie Solaire & ENR | SOLITEK Strasbourg",
    description:
      "Délais, aides financières, dimensionnement, entretien : toutes les réponses sur votre installation solaire ou ENR à Strasbourg et en Alsace.",
    url: "/faq",
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
