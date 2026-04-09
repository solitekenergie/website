import type { Metadata } from 'next';
import Image from 'next/image';
import PrimaryCta from '@/components/ui/PrimaryCta';
import { FadeIn } from '@/components/ui/FadeIn';

export const metadata: Metadata = {
  title: "Services énergie à Strasbourg",
  description:
    "Panneaux solaires, pompe à chaleur, climatisation, ventilation et électricité à Strasbourg. Étude gratuite et installation certifiée RGE.",
  alternates: {
    canonical: "/services",
  },
  keywords: [
    "installation panneaux solaires Strasbourg",
    "photovoltaïque maison Strasbourg",
    "pompe à chaleur Strasbourg",
    "climatisation réversible Strasbourg",
    "VMC double flux Strasbourg",
    "électricien RGE Strasbourg",
    "installation panneaux solaires Alsace",
    "pompe à chaleur Alsace",
    "borne recharge IRVE Strasbourg",
    "autoconsommation solaire Strasbourg",
  ],
  openGraph: {
    title: "Services énergie à Strasbourg | SOLITEK",
    description:
      "Panneaux solaires, pompe à chaleur, climatisation, ventilation et électricité à Strasbourg. Étude gratuite et installation certifiée RGE.",
    url: "/services",
  },
};

type Service = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  imagePosition?: string;
  points: string[];
  imageLeft: boolean;
  cta: { href: string; label: string };
};

const services: Service[] = [
  {
    id: 'photovoltaique',
    title: 'Photovoltaïque',
    tagline: 'Installation photovoltaïque clé en main avec SOLITEK',
    description:
      "Chez Solitek, nous faisons bien plus que poser des panneaux solaires : nous vous accompagnons à chaque étape, avec expertise et proximité. De la visite technique gratuite à la réalisation du devis personnalisé, en passant par l'étude complète et le suivi administratif, notre engagement est de rendre votre projet simple, transparent et 100 % adapté à vos besoins. Nous mettons notre expertise et notre passion au service de votre transition énergétique, pour que votre installation solaire soit fiable, durable et performante aujourd'hui comme demain.",
    image: '/images/solitek-installation-photovoltaique-carport-solaire-alsace.jpg',
    imagePosition: 'center 45%',
    points: [
      'Étude personnalisée et gratuite : conseils experts, simulation de production offerte et visite technique sans engagement',
      'Accompagnement administratif complet : démarches Consuel, raccordement Enedis, aides et primes à l\'autoconsommation',
      'Technologie haut de gamme : micro-onduleurs AP System, onduleur centralisé avec optimiseur, solution de stockage, optimisation, suivi de production en temps réel, garantie 25 ans',
      'Suivi humain et réactif après installation : votre contact SoliTek reste disponible pour optimiser le rendement et répondre à toutes vos questions',
    ],
    imageLeft: false,
    cta: { href: '/estimateur', label: 'Simuler mon installation' },
  },
  {
    id: 'chauffage',
    title: 'Chauffage',
    tagline: 'Confort thermique, facture réduite',
    description:
      "Passez à un chauffage performant, économique et respectueux de l'environnement avec Solitek, votre fidèle partenaire Grand Est. Nous transformons votre projet en solution clé en main, simple, avec un accompagnement 100 % gratuit et humain, du premier conseil à l'installation.",
    image: '/images/solitek-pompe-chaleur-air-eau-atlantic-terrasse.jpg',
    imagePosition: '60% center',
    points: [
      'Des technologies haut de gamme avec des pompes à chaleur dernière génération de chez Atlantic, Daikin, Airwell ou d\'autres',
      'Ballon thermodynamique performant pour des économies d\'énergie immédiates',
      'Étude et devis gratuits : visite technique personnalisée, conseils sur-mesure et simulation de performance sans aucun engagement',
      'Accompagnement complet : démarches administratives, subventions, etc.',
      'Suivi humain et réactif après installation : un interlocuteur dédié reste à vos côtés pour optimiser vos performances et répondre à toutes vos questions',
      'Installateur RGE certifié',
      'Éligible MaPrimeRénov\'',
    ],
    imageLeft: true,
    cta: { href: '/contact', label: 'Demander un devis' },
  },
  {
    id: 'climatisation',
    title: 'Climatisation',
    tagline: 'Votre expert local à Strasbourg',
    description:
      "Profitez d'un confort optimal été comme hiver avec Solitek, votre expert local à Strasbourg. Nous vous proposons des solutions de climatisation performantes, économiques et parfaitement adaptées à votre logement. Avec Solitek, choisissez la tranquillité, la performance et un accompagnement de proximité.",
    image: '/images/solitek-climatisation-reversible-split-mural-interieur.jpg',
    imagePosition: 'center',
    points: [
      'Étude et devis 100 % gratuits : conseils sur-mesure, sans engagement',
      'Installation clé en main : on s\'occupe de tout de A à Z',
      'Équipement fiable et performant : confort immédiat, consommation maîtrisée',
      'Suivi réactif et humain : un interlocuteur disponible après installation',
      'Climatisation réversible (chaud/froid)',
      'Mono-split et multi-split',
      'Haut COP, faible consommation',
      'Mise en service incluse',
    ],
    imageLeft: false,
    cta: { href: '/contact', label: 'Demander un devis' },
  },
  {
    id: 'ventilation',
    title: 'Ventilation',
    tagline: 'Un air sain dans chaque pièce',
    description:
      "VMC double flux avec récupération de chaleur jusqu'à 90 %. Idéal pour les constructions neuves et les rénovations, pour un air sain et des économies d'énergie garanties.",
    image: '/images/solitek-ventilation-composants-vmc.jpg',
    imagePosition: 'center',
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
    image: '/images/solitek-electricien-tableau-electrique-mise-aux-normes.jpg',
    imagePosition: '65% center',
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
    image: '/images/solitek-entretien-nettoyage-panneaux-solaires.jpg',
    points: ['Nettoyage professionnel des modules', 'Contrôle onduleurs & câblage', 'Contrat de maintenance annuel', 'Rapport d\'intervention inclus'],
    imageLeft: true,
    cta: { href: '/contact', label: 'Demander un devis' },
  },
];

const serviceCtaClassName =
  "h-[58px] rounded-full !border-transparent !bg-[#2DB180] px-8 text-[17px] !text-white shadow-[0_18px_40px_rgba(45,177,128,0.32)] transition-all hover:-translate-y-0.5 hover:!bg-[#26A072] focus-visible:outline-[#2DB180]";

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title,
      description: s.description,
      provider: {
        "@type": "LocalBusiness",
        name: "SOLITEK",
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Alsace",
      },
    },
  })),
};

export default function ServicesPage() {
  return (
    <div className="relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }} />
      {/* Hero intro */}
      <section className="bg-[#161A1E] px-4 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-20 lg:pb-24 lg:pt-24">
        <div className="mx-auto max-w-[1440px]">
          <p className="mb-4 font-ui text-sm font-semibold uppercase tracking-wide text-[#1E9A66]">
            Nos expertises
          </p>
          <h1 className="font-title text-4xl font-black uppercase leading-tight text-white sm:text-5xl lg:text-[72px] lg:leading-[1]">
            Nos Services
          </h1>
          <p className="mt-6 max-w-[600px] font-ui text-base leading-relaxed text-white/70 sm:text-lg">
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
              <FadeIn
                className={`flex flex-col gap-10 lg:gap-16 ${
                  service.imageLeft ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } lg:items-center`}
              >
                {/* Image */}
                <div className="lg:flex-1">
                  <div className="relative h-[280px] overflow-hidden rounded-2xl bg-[#161A1E] shadow-xl sm:h-[380px] lg:h-[480px]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      style={service.imagePosition ? { objectPosition: service.imagePosition } : undefined}
                    />
                  </div>
                </div>

                {/* Texte */}
                <div className="flex flex-col gap-6 lg:flex-1">
                  <div>
                    <p className="mb-2 font-ui text-sm font-semibold uppercase tracking-wide text-[#1E9A66]">
                      {service.tagline}
                    </p>
                    <h2 className="font-title text-3xl font-black uppercase leading-tight text-[#161A1E] sm:text-4xl lg:text-[48px] lg:leading-tight">
                      {service.title}
                    </h2>
                  </div>

                  <p className="font-ui text-base leading-relaxed text-slate-600 sm:text-lg">
                    {service.description}
                  </p>

                  {/* Points clés */}
                  <ul className="flex flex-col gap-3">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#2DB180]/15">
                          <svg className="h-3 w-3 text-[#1E9A66]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="font-ui text-sm font-medium text-slate-700 sm:text-base">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2">
                    <PrimaryCta href={service.cta.href} className={serviceCtaClassName}>
                      {service.cta.label}
                    </PrimaryCta>
                  </div>
                </div>
              </FadeIn>
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
          <p className="max-w-[500px] font-ui text-base leading-relaxed text-white/70 sm:text-lg">
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
