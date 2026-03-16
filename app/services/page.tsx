import type { Metadata } from 'next';
import Link from 'next/link';
import PrimaryCta from '@/components/ui/PrimaryCta';

export const metadata: Metadata = {
  title: "Nos Services | Photovoltaïque, PAC, Climatisation, VMC, Électricité en Alsace",
  description:
    "Découvrez tous les services SOLITEK en Alsace : installation panneaux solaires photovoltaïques, pompe à chaleur, climatisation réversible, VMC double flux, électricité NF C 15-100 et borne IRVE. Installateur certifié RGE.",
  keywords: [
    "installation panneaux solaires Alsace",
    "photovoltaïque maison Alsace",
    "pompe à chaleur air eau Alsace",
    "climatisation réversible Alsace",
    "VMC double flux Alsace",
    "borne recharge IRVE Alsace",
    "électricien RGE Alsace",
    "entretien panneaux solaires Alsace",
    "MaPrimeRénov pompe à chaleur",
    "autoconsommation solaire Alsace",
  ],
  openGraph: {
    title: "Nos Services | SOLITEK Alsace",
    description:
      "Panneaux solaires, pompe à chaleur, climatisation, VMC, électricité et entretien en Alsace. Installateur certifié RGE.",
    url: "/services",
  },
};

type Service = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  points: string[];
  imageLeft: boolean;
  cta: { href: string; label: string };
};

const services: Service[] = [
  {
    id: 'photovoltaique',
    title: 'Photovoltaïque',
    tagline: 'Produisez votre propre énergie',
    description:
      "Installation clé en main : de l'étude personnalisée au raccordement Enedis, SOLITEK gère tout. Micro-onduleurs AP System, suivi de production en temps réel, garantie 25 ans.",
    image: '/images/services-photovoltaique.jpg',
    points: ['Simulation de production offerte', 'Démarches administratives & Consuel', 'Prime autoconsommation & TVA réduite', 'Suivi de rendement en temps réel'],
    imageLeft: false,
    cta: { href: '/estimateur', label: 'Simuler mon installation' },
  },
  {
    id: 'chauffage',
    title: 'Chauffage',
    tagline: 'Confort thermique, facture réduite',
    description:
      "Pompes à chaleur air/eau et air/air Atlantic, Daikin, Airwell. Étude thermique gratuite, installation certifiée RGE, éligible MaPrimeRénov.",
    image: '/images/services-chauffage.jpg',
    points: ['PAC air/eau et air/air', 'Marques Atlantic, Daikin, Airwell', 'Installateur RGE certifié', 'Éligible MaPrimeRénov\''],
    imageLeft: true,
    cta: { href: '/contact', label: 'Demander un devis' },
  },
  {
    id: 'climatisation',
    title: 'Climatisation',
    tagline: 'Fraîcheur en été, chaleur en hiver',
    description:
      "Systèmes réversibles mono et multi-split Daikin, Atlantic, Airwell. Faible consommation, installation rapide, mise en service incluse.",
    image: '/images/services-climatisation.jpg',
    points: ['Climatisation réversible (chaud/froid)', 'Mono-split et multi-split', 'Haut COP, faible consommation', 'Mise en service incluse'],
    imageLeft: false,
    cta: { href: '/contact', label: 'Demander un devis' },
  },
  {
    id: 'ventilation',
    title: 'Ventilation',
    tagline: 'Un air sain dans chaque pièce',
    description:
      "VMC double flux avec récupération de chaleur jusqu'à 90 %. Idéal pour les constructions neuves et les rénovations, pour un air sain et des économies d'énergie garanties.",
    image: '/images/services-ventilation.jpg',
    points: ['VMC simple flux et double flux', 'Récupération de chaleur jusqu\'à 90 %', 'Prévention humidité et moisissures', 'Norme RT2020 / RE2020'],
    imageLeft: true,
    cta: { href: '/contact', label: 'Demander un devis' },
  },
  {
    id: 'electricite',
    title: 'Électricité',
    tagline: 'Installations aux normes, sans compromis',
    description:
      "Mise aux normes NF C 15-100, tableaux électriques, bornes IRVE pour véhicule électrique. Certificat de conformité fourni à chaque intervention.",
    image: '/images/services-electricite.jpg',
    points: ['Mise aux normes NF C 15-100', 'Bornes de recharge IRVE (P1/P2)', 'Tableaux et disjoncteurs', 'Certificat de conformité inclus'],
    imageLeft: false,
    cta: { href: '/contact', label: 'Demander un devis' },
  },
  {
    id: 'entretien',
    title: 'Entretien & Nettoyage',
    tagline: 'Vos installations à 100 % de leur capacité',
    description:
      "Un panneau encrassé perd jusqu'à 20 % de production. Contrat annuel : nettoyage, contrôle onduleurs, câblage et fixations. Rapport d'intervention systématique.",
    image: '/images/services-entretien.jpg',
    points: ['Nettoyage professionnel des modules', 'Contrôle onduleurs & câblage', 'Contrat de maintenance annuel', 'Rapport d\'intervention inclus'],
    imageLeft: true,
    cta: { href: '/contact', label: 'Demander un devis' },
  },
];

export default function ServicesPage() {
  return (
    <div className="relative">
      {/* Hero intro */}
      <section className="bg-[#161A1E] px-4 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-20 lg:pb-24 lg:pt-24">
        <div className="mx-auto max-w-[1440px]">
          <p className="mb-4 font-['Figtree'] text-sm font-semibold uppercase tracking-widest text-[#2DB180]">
            Nos expertises
          </p>
          <h1 className="font-title text-4xl font-black uppercase leading-tight text-white sm:text-5xl lg:text-[72px] lg:leading-[1]">
            Nos Services
          </h1>
          <p className="mt-6 max-w-[600px] font-['Figtree'] text-base leading-relaxed text-white/70 sm:text-lg">
               SOLITEK couvre l&apos;ensemble de vos besoins énergétiques avec une expertise locale et des partenaires de confiance.
          </p>
        </div>
      </section>

      {/* Sections services */}
      <div>
        {services.map((service, i) => (
          <section
            key={service.id}
            id={service.id}
            className={`scroll-mt-20 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
          >
            <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-8 sm:py-20 lg:px-20 lg:py-24">
              <div
                className={`flex flex-col gap-10 lg:gap-16 ${
                  service.imageLeft ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } lg:items-center`}
              >
                {/* Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <div className="lg:flex-1">
                  <div className="overflow-hidden rounded-2xl shadow-xl">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-[280px] w-full object-cover sm:h-[380px] lg:h-[480px]"
                    />
                  </div>
                </div>

                {/* Texte */}
                <div className="flex flex-col gap-6 lg:flex-1">
                  <div>
                    <p className="mb-2 font-['Figtree'] text-sm font-semibold uppercase tracking-widest text-[#2DB180]">
                      {service.tagline}
                    </p>
                    <h2 className="font-title text-3xl font-black uppercase leading-tight text-[#161A1E] sm:text-4xl lg:text-[48px] lg:leading-tight">
                      {service.title}
                    </h2>
                  </div>

                  <p className="font-['Figtree'] text-base leading-relaxed text-slate-600 sm:text-lg">
                    {service.description}
                  </p>

                  {/* Points clés */}
                  <ul className="flex flex-col gap-3">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#2DB180]/15">
                          <svg className="h-3 w-3 text-[#2DB180]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="font-['Figtree'] text-sm font-medium text-slate-700 sm:text-base">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2">
                    <PrimaryCta href={service.cta.href}>
                      {service.cta.label}
                    </PrimaryCta>
                  </div>
                </div>
              </div>
            </div>

            {/* Séparateur */}
            {i < services.length - 1 && (
              <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-20">
                <div className="h-px bg-slate-200" />
              </div>
            )}
          </section>
        ))}
      </div>

      {/* CTA bas de page */}
      <section className="bg-[#2DB180] px-4 py-16 sm:px-8 sm:py-20 lg:px-20 lg:py-24">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-6 text-center">
          <h2 className="font-title text-3xl font-black uppercase leading-tight text-white sm:text-4xl lg:text-[48px]">
            Un projet en tête ?
          </h2>
          <p className="max-w-[500px] font-['Figtree'] text-base leading-relaxed text-white/70 sm:text-lg">
            Obtenez une estimation personnalisée en moins de 2 minutes, sans engagement.
          </p>
          <PrimaryCta href="/estimateur">
            Mon estimation gratuite
          </PrimaryCta>
        </div>
      </section>
    </div>
  );
}
