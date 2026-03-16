import type { Metadata } from "next";
import { listPosts } from "@/lib/blog";
import { getRealisations } from "@/lib/realisations";
import { MissionSection } from "@/components/sections/MissionSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { HighlightSection } from "@/components/sections/HighlightSection";
import { NeedsSection } from "@/components/sections/NeedsSection";
import { RealisationsSection } from "@/components/sections/RealisationsSection";
import { SuppliersSection } from "@/components/sections/SuppliersSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { AssetProbe } from "@/components/debug/AssetProbe";
import PrimaryCta from "@/components/ui/PrimaryCta";

export const metadata: Metadata = {
  title: "SOLITEK | Installateur solaire, pompe à chaleur & ENR en Alsace",
  description:
    "SOLITEK, installateur certifié RGE en Alsace : installation panneaux solaires photovoltaïques, pompe à chaleur, climatisation réversible, VMC et borne IRVE. Simulation gratuite en 2 minutes.",
  keywords: [
    "installateur panneaux solaires Alsace",
    "installation photovoltaïque Alsace",
    "pompe à chaleur Alsace",
    "climatisation Alsace",
    "installateur RGE Alsace",
    "devis solaire gratuit",
    "énergie renouvelable maison Alsace",
    "autoconsommation photovoltaïque",
    "simulation panneaux solaires",
  ],
  openGraph: {
    title: "SOLITEK | Installateur solaire, pompe à chaleur & ENR en Alsace",
    description:
      "Installation panneaux solaires, pompe à chaleur, climatisation et borne IRVE en Alsace. Devis gratuit et simulation en ligne.",
    url: "/",
  },
};

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[]>>;
}) {
  const [, realisations] = await Promise.all([listPosts(), getRealisations()]);
  const resolvedParams = (await searchParams) ?? {};
  const debugParam = Array.isArray(resolvedParams.debugAssets)
    ? resolvedParams.debugAssets[0]
    : resolvedParams.debugAssets;
  const debugAssets = debugParam === "1";

  return (
    <div className="space-y-0">
      <section className="relative isolate left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-black text-white">
        <div className="absolute inset-0 overflow-hidden">
          {/* Vidéo sur tous les formats — pas de poster pour éviter le flash d'image */}
          <video
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/55 to-black/90" />
        <div className="relative flex min-h-[calc(100vh-80px)] items-center py-12">
          <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 xl:px-[80px]">
            <div className="flex flex-col gap-12">
              <div className="max-w-[603px] space-y-[13px]">
                <h1 className="font-title text-[42px] font-black uppercase leading-[1.05] tracking-[-1.1px] text-white sm:text-[56px] sm:tracking-[-1.2px] lg:text-[72px] lg:leading-[72px] lg:tracking-[-1.44px]">
                  <span className="block">Votre partenaire</span>
                  <span className="block">d’avenir</span>
                </h1>
                <span className="inline-flex items-center rounded-[8px] bg-[rgba(45,177,128,1)] p-6 font-title text-[36px] font-black uppercase leading-[1] tracking-[-1px] text-[#161A1E] sm:text-[48px] sm:tracking-[-1.2px] lg:text-[72px] lg:tracking-[-1.44px]">
                  Énergétique
                </span>
              </div>
              <div className="space-y-6">
                <p className="font-['Figtree'] text-sm font-semibold uppercase tracking-widest text-[#2DB180]">
                  Installateur certifié RGE en Alsace
                </p>
                <p className="font-title text-[18px] font-normal leading-[24px] tracking-[-0.3px] text-white/80 sm:text-[20px] lg:text-[22px]">
                  Panneaux solaires · Pompe à chaleur · Climatisation · Ventilation · Électricité
                </p>
                <PrimaryCta href="/estimateur" className="shadow-lg relative z-30">
                  Mon estimation gratuite
                </PrimaryCta>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MissionSection />

      <ServicesSection />

      {/* <HighlightSection /> */}

      <NeedsSection />

      <RealisationsSection realisations={realisations} />

      {debugAssets ? (
        <div className="px-4 py-8">
          <h2 className="text-lg font-semibold">Asset probe (debugAssets=1)</h2>
          <p className="text-sm text-slate-600">Vérifie le chargement des images locales (mission + services).</p>
          <AssetProbe
            sources={[
              { src: "/images/mission-installation-01.jpg", label: "Mission 1" },
              { src: "/images/mission-panneaux-02.jpg", label: "Mission 2" },
              { src: "/images/mission-detail-technique-03.jpg", label: "Mission 3" },
              { src: "/images/mission-technicien-04.jpg", label: "Mission 4" },
              { src: "/images/mission-toiture-05.jpg", label: "Mission 5" },
              { src: "/images/services-photovoltaique.jpg", label: "Service Photovoltaïque" },
              { src: "/images/services-chauffage.jpg", label: "Service Chauffage" },
              { src: "/images/services-climatisation.jpg", label: "Service Climatisation" },
              { src: "/images/services-ventilation.jpg", label: "Service Ventilation" },
              { src: "/images/services-electricite.jpg", label: "Service Electricité" },
              { src: "/images/services-entretien.jpg", label: "Service Entretien" },
            ]}
          />
        </div>
      ) : null}

      <SuppliersSection />

      {/* <TestimonialsSection /> */}
    </div>
  );
}
