import type { Metadata } from "next";
import MultiStepEstimatorForm from "@/components/forms/MultiStepEstimatorForm";

export const metadata: Metadata = {
  title: "Simulateur Solaire Gratuit à Strasbourg | Estimez vos Économies en 2 min",
  description:
    "Calculez votre production solaire et vos économies en 2 minutes. Simulateur photovoltaïque gratuit pour Strasbourg et l'Alsace, personnalisé selon votre adresse. Sans engagement.",
  keywords: [
    "simulateur panneaux solaires Strasbourg",
    "estimation solaire gratuite Strasbourg",
    "calcul économies photovoltaïque",
    "simulation production solaire Alsace",
    "devis solaire en ligne Strasbourg",
  ],
  openGraph: {
    title: "Simulateur Solaire Gratuit | SOLITEK Alsace",
    description:
      "Estimez votre production solaire et vos économies en 2 minutes, personnalisé selon votre adresse.",
    url: "/estimateur",
  },
};

export default function EstimatorPage() {
  return <MultiStepEstimatorForm />;
}
