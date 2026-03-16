/* eslint-disable @next/next/no-img-element */
import { getRealisations, getFirstImageUrl } from "@/lib/realisations";
import { RealisationsGrid } from "@/components/sections/RealisationsGrid";

export const metadata = {
  title: "Nos Réalisations | Installations Solaires & ENR en Alsace",
  description: "Découvrez les réalisations SOLITEK en Alsace : installations photovoltaïques, pompes à chaleur, climatisation et VMC. Photos et détails de chaque chantier réalisé en Bas-Rhin et Haut-Rhin.",
  keywords: [
    "réalisations panneaux solaires Alsace",
    "chantiers photovoltaïque Alsace",
    "installation solaire maison Strasbourg",
    "référence installateur RGE Alsace",
    "photos installation panneaux solaires",
    "projets pompe à chaleur Alsace",
  ],
  openGraph: {
    title: "Nos Réalisations | SOLITEK Alsace",
    description: "Installations photovoltaïques, pompes à chaleur, climatisation et VMC réalisées par SOLITEK en Alsace. Découvrez nos chantiers en photos.",
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

  const cards = realisations.map((r) => ({
    slug: r.slug,
    image: getFirstImageUrl(r),
    title: r.titre,
    date: formatDate(r.datePublication),
    description: r.resume,
  }));

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-[#161A1E] px-4 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-20 lg:pb-24 lg:pt-24">
        <div className="mx-auto max-w-[1440px]">
          <p className="mb-4 font-['Figtree'] text-sm font-semibold uppercase tracking-widest text-[#2DB180]">
            Nos projets
          </p>
          <h1 className="font-title text-4xl font-black uppercase leading-tight text-white sm:text-5xl lg:text-[72px] lg:leading-[1]">
            Nos réalisations
          </h1>
          <p className="mt-6 max-w-[600px] font-['Figtree'] text-base leading-relaxed text-white/70 sm:text-lg">
            Découvrez les installations réalisées par SOLITEK en Alsace : photovoltaïque, chauffage, climatisation et plus.
          </p>
        </div>
      </section>

      <section className="w-full px-4 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-20 lg:pb-[100px] lg:pt-[100px]">
        <div className="mx-auto max-w-[1440px]">
          <RealisationsGrid cards={cards} />
        </div>
      </section>
    </div>
  );
}
