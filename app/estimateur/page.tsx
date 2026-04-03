import type { Metadata } from "next";
import MultiStepEstimatorForm from "@/components/forms/MultiStepEstimatorForm";

export const metadata: Metadata = {
  title: "Simulateur solaire à Strasbourg",
  description:
    "Estimez votre production solaire et vos économies à Strasbourg en 2 minutes. Simulation gratuite selon votre adresse, sans engagement.",
  alternates: {
    canonical: "/estimateur",
  },
  keywords: [
    "simulateur panneaux solaires Strasbourg",
    "estimation solaire gratuite Strasbourg",
    "calcul économies photovoltaïque",
    "simulation production solaire Alsace",
    "devis solaire en ligne Strasbourg",
  ],
  openGraph: {
    title: "Simulateur solaire à Strasbourg | SOLITEK",
    description:
      "Estimez votre production solaire et vos économies à Strasbourg en 2 minutes selon votre adresse.",
    url: "/estimateur",
  },
};

export default function EstimatorPage() {
  return <MultiStepEstimatorForm />;
}
