import type { Metadata } from "next";
import { getRealisations, getFirstImageUrl } from "@/lib/realisations";
import { ContentGrid } from "@/components/sections/ContentGrid";

export const metadata: Metadata = {
  title: "Réalisations en Alsace",
  description: "Découvrez les réalisations SOLITEK en Alsace en solaire, chauffage et climatisation, avec le savoir-faire appliqué sur chaque chantier.",
  alternates: {
    canonical: "/realisations",
  },
  keywords: [
    "réalisations panneaux solaires Strasbourg",
    "chantiers photovoltaïque Strasbourg",
    "installation solaire maison Strasbourg",
    "réalisations panneaux solaires Alsace",
    "référence installateur RGE Strasbourg",
    "projets pompe à chaleur Strasbourg",
  ],
  openGraph: {
    title: "Réalisations en Alsace | SOLITEK",
    description: "Découvrez les réalisations SOLITEK en Alsace en solaire, chauffage et climatisation.",
    url: "/realisations",
  },
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function RealisationsPage() {
  const realisations = await getRealisations();

  // misEnAvant = true → apparaît en tête de liste
  const sorted = [
    ...realisations.filter((r) => r.misEnAvant),
    ...realisations.filter((r) => !r.misEnAvant),
  ];

  const REALISATION_CATEGORIES = [
    "Photovoltaique",
    "Chauffage",
    "Climatisation",
    "Ventilation",
    "Electricite",
    "Entretien",
  ];

  const cards = sorted.map((r) => ({
    slug: r.slug,
    image: getFirstImageUrl(r),
    title: r.titre,
    date: formatDate(r.datePublication),
    description: r.extrait,
    featured: r.misEnAvant,
    category: r.categorie,
  }));

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-[#161A1E] px-4 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-20 lg:pb-24 lg:pt-24">
        <div className="mx-auto max-w-[1440px]">
          <p className="mb-4 font-ui text-sm font-semibold uppercase tracking-wide text-[#1E9A66]">
            Nos projets
          </p>
          <h1 className="font-title text-4xl font-black uppercase leading-tight text-white sm:text-5xl lg:text-[72px] lg:leading-[1]">
            Nos réalisations
          </h1>
          <p className="mt-6 max-w-[600px] font-ui text-base leading-relaxed text-white/70 sm:text-lg">
            Découvrez les installations réalisées par SOLITEK en Alsace et le savoir-faire déployé sur chaque chantier.
          </p>
        </div>
      </section>

      <section className="w-full px-4 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-20 lg:pb-[100px] lg:pt-[100px]">
        <div className="mx-auto max-w-[1440px]">
          <ContentGrid
            cards={cards}
            basePath="/realisations"
            categories={REALISATION_CATEGORIES}
            emptyMessage="Aucune réalisation disponible pour le moment."
          />
        </div>
      </section>
    </div>
  );
}
