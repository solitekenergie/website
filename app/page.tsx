import type { Metadata } from "next";
import { getRealisations } from "@/lib/realisations";
import dynamic from "next/dynamic";

const MissionSection = dynamic(() => import("@/components/sections/MissionSection").then(m => m.MissionSection));
import { ServicesSection } from "@/components/sections/ServicesSection";
import { NeedsSection } from "@/components/sections/NeedsSection";
import { RealisationsSection } from "@/components/sections/RealisationsSection";
import { SuppliersSection } from "@/components/sections/SuppliersSection";
import PrimaryCta from "@/components/ui/PrimaryCta";

export const metadata: Metadata = {
  title: "Solutions énergétiques à Strasbourg | SOLITEK",
  description:
    "SOLITEK à Strasbourg et en Alsace : photovoltaïque, pompe à chaleur, climatisation, ventilation et électricité. Étude gratuite pour votre projet énergétique.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "solutions énergétiques Strasbourg",
    "installateur RGE Strasbourg",
    "panneaux solaires Strasbourg",
    "photovoltaïque Strasbourg",
    "pompe à chaleur Strasbourg",
    "chauffage Strasbourg",
    "climatisation Strasbourg",
    "ventilation Strasbourg",
    "électricité Strasbourg",
    "installateur RGE Alsace",
    "panneaux solaires Alsace",
    "climatisation réversible Alsace",
    "VMC double flux Alsace",
    "borne IRVE Alsace",
    "installation photovoltaïque Alsace",
    "rénovation énergétique Alsace",
    "devis énergétique Strasbourg",
  ],
  openGraph: {
    title: "Solutions énergétiques à Strasbourg | SOLITEK",
    description:
      "SOLITEK à Strasbourg et en Alsace : photovoltaïque, pompe à chaleur, climatisation, ventilation et électricité. Étude gratuite.",
    url: "/",
  },
};

export default async function Home() {
  const realisations = await getRealisations();

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SOLITEK",
    url: "https://www.solitekenergie.fr",
    description: "Installateur RGE à Strasbourg et en Alsace : photovoltaïque, pompe à chaleur, climatisation, ventilation et électricité.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.solitekenergie.fr/blog?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div className="space-y-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <section className="relative isolate left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-black text-white">
        <div className="absolute inset-0 overflow-hidden">
          {/* Vidéo sur tous les formats - pas de poster pour éviter le flash d'image */}
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
                <h1
                  aria-label="Votre partenaire d'avenir énergétique"
                  className="font-title text-[42px] font-black uppercase leading-[1.05] tracking-[-1.1px] text-white sm:text-[56px] sm:tracking-[-1.2px] lg:text-[72px] lg:leading-[72px] lg:tracking-[-1.44px]"
                >
                  <span className="block">Votre partenaire d&apos;avenir</span>
                  {" "}
                  <span className="mt-3 inline-flex items-center rounded-[8px] bg-[rgba(45,177,128,1)] p-6 font-title text-[36px] font-black uppercase leading-[1] tracking-[-1px] text-[#161A1E] sm:text-[48px] sm:tracking-[-1.2px] lg:text-[72px] lg:tracking-[-1.44px]">
                    Énergétique
                  </span>
                </h1>
              </div>
              <div className="space-y-6">
                <p className="font-ui text-sm font-semibold uppercase tracking-wide text-[#1E9A66]">
                  Installateur certifié RGE à Strasbourg et en Alsace
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

      <SuppliersSection />

      <ServicesSection />

      {/* <HighlightSection /> */}

      <NeedsSection />

      <RealisationsSection realisations={realisations} />

      {/* <TestimonialsSection /> */}
    </div>
  );
}
