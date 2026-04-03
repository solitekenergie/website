import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ énergie à Strasbourg",
  description:
    "Réponses sur les panneaux solaires, la pompe à chaleur, la climatisation, les aides, les délais et l'entretien à Strasbourg et en Alsace.",
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
    title: "FAQ énergie à Strasbourg | SOLITEK",
    description:
      "Toutes les réponses sur les panneaux solaires, la pompe à chaleur, la climatisation et les aides à Strasbourg.",
    url: "/faq",
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
