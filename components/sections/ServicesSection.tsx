import Link from 'next/link';
import { FadeIn } from '@/components/ui/FadeIn';

type ServiceCardProps = {
  title: string;
  description: string;
  image: string;
  href: string;
  className?: string;
  alt: string;
  bgPosition?: string;
};

const cardBackground = (image: string, bgPosition = "center") => ({
  backgroundImage: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.75) 100%), url('" + image + "')",
  backgroundSize: "cover",
  backgroundPosition: bgPosition,
});

const fullWidthCardClassName = "h-[350px] sm:h-[400px] lg:h-[500px]";
const splitRowCardClassName = "h-[350px] sm:h-[400px] lg:h-full";

function ServiceCard({ title, description, image, href, className, alt, bgPosition }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={`${className ?? ""} flex w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-lg bg-cover px-6 py-8 sm:gap-6 sm:rounded-xl sm:px-12 sm:py-10 lg:px-20 lg:py-12`}
      style={cardBackground(image, bgPosition)}
    >
      <div className="flex w-full max-w-[603px] flex-col items-center justify-end gap-8 text-center sm:gap-12">
        <h3 className="w-full text-center font-title text-3xl font-black uppercase leading-tight text-white sm:text-4xl sm:leading-tight lg:text-[56px] lg:leading-[56px]">
          {title}
        </h3>
        <div className="flex flex-col items-center justify-start gap-4 sm:gap-6">
          <p className="text-center font-title text-lg font-normal leading-tight text-white sm:text-xl lg:text-2xl lg:leading-6">{description}</p>
          <div className="inline-flex h-12 items-center justify-center gap-2 rounded bg-white px-6 py-2 transition-opacity hover:opacity-90 sm:h-14">
            <span className="font-ui text-sm font-bold leading-tight text-[#161A1E] sm:text-base sm:leading-[22.4px]">
              En savoir plus
            </span>
          </div>
        </div>
      </div>
      <span className="sr-only">{alt}</span>
    </Link>
  );
}

export function ServicesSection() {
  return (
    <section className="inline-flex h-full w-full flex-col items-start justify-start gap-8 px-4 pb-12 pt-12 sm:gap-10 sm:px-8 sm:pb-16 sm:pt-16 lg:gap-12 lg:px-20 lg:pb-[100px] lg:pt-[100px]">
      <FadeIn className="flex flex-col items-start justify-start gap-6 self-stretch">
        <h2 className="flex flex-col justify-end font-title text-2xl font-bold uppercase leading-tight text-[#1E9A66] sm:text-3xl sm:leading-[44.8px] lg:text-[32px]">
          Nos Services
        </h2>
      </FadeIn>

      <div className="flex flex-col items-stretch justify-start gap-4 self-stretch sm:gap-6">
        <FadeIn className="self-stretch">
          <ServiceCard
            title="Photovoltaïque"
            description="Installation clé en main avec SOLITEK : visite technique gratuite, étude personnalisée, démarches administratives et suivi de production en temps réel."
            image="/images/solitek-panneaux-solaires-toiture-maison-alsacienne.jpg"
            href="/services#photovoltaique"
            alt="Maison alsacienne équipée de panneaux solaires sur toiture"
            bgPosition="center 55%"
            className={fullWidthCardClassName}
          />
        </FadeIn>

        <FadeIn className="self-stretch" delay={100}>
          <div className="flex w-full flex-col items-stretch justify-start gap-4 sm:gap-6 lg:h-[600px] lg:flex-row">
            <ServiceCard
              title="Chauffage"
              description="Chauffage performant et économique : PAC dernière génération Atlantic, Daikin, Airwell. Accompagnement 100 % gratuit et humain."
              image="/images/solitek-pompe-chaleur-air-eau-atlantic-terrasse.jpg"
              href="/services#chauffage"
              alt="Pompe à chaleur air-eau Atlantic installée en extérieur"
              bgPosition="60% center"
              className={`${splitRowCardClassName} flex-1`}
            />
            <ServiceCard
              title="Climatisation"
              description="Confort optimal été comme hiver. Solutions performantes et économiques, installation clé en main à Strasbourg."
              image="/images/solitek-climatisation-reversible-split-mural-interieur.jpg"
              href="/services#climatisation"
              alt="Climatisation réversible split mural installée en intérieur"
              bgPosition="70% center"
              className={`${splitRowCardClassName} flex-1`}
            />
          </div>
        </FadeIn>

        <FadeIn className="self-stretch" delay={200}>
          <div className="flex w-full flex-col items-stretch justify-start gap-4 sm:gap-6 lg:h-[600px] lg:flex-row">
            <ServiceCard
              title="Ventilation"
              description="Air sain toute l'année. VMC double flux avec récupération de chaleur jusqu'à 90 %."
              image="/images/solitek-installation-vmc-double-flux-alsace.jpg"
              href="/services#ventilation"
              alt="Système de ventilation résidentielle"
              bgPosition="center 60%"
              className={`${splitRowCardClassName} flex-1`}
            />
            <ServiceCard
              title="Électricité"
              description="Mise aux normes NF C 15-100, bornes IRVE, tableaux. Certificat de conformité fourni à chaque intervention."
              image="/images/solitek-electricien-tableau-electrique-mise-aux-normes.jpg"
              href="/services#electricite"
              alt="Électricien intervenant sur un tableau électrique"
              bgPosition="65% center"
              className={`${splitRowCardClassName} flex-1`}
            />
          </div>
        </FadeIn>

        <FadeIn className="self-stretch" delay={300}>
          <ServiceCard
            title="Entretien & Nettoyage"
            description="Un panneau encrassé perd jusqu'à 20 % de production. Contrat annuel, rapport d'intervention inclus."
            image="/images/solitek-entretien-nettoyage-panneaux-solaires.jpg"
            href="/services#entretien"
            alt="Prestations d'entretien et nettoyage"
            className={fullWidthCardClassName}
          />
        </FadeIn>
      </div>

      {/* <div className="inline-flex flex-col items-start justify-start gap-6 self-stretch pb-12 pt-8 sm:pb-[60px] sm:pt-12 lg:flex-row lg:gap-[300px] lg:pb-[60px] lg:pt-[60px]">
        <h3 className="flex flex-col justify-end font-title text-2xl font-bold uppercase leading-tight text-[#161A1E] sm:text-3xl sm:leading-[44.8px] lg:text-[32px]">
          Titre
        </h3>
        <div className="flex-1 font-ui text-base font-normal leading-relaxed text-black sm:text-lg sm:leading-[27px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec elit nec diam efficitur auctor. Praesent eros
          est, laoreet in ornare vitae, volutpat quis velit. Quisque condimentum finibus nisl vel viverra. Nunc sed lectus
          sem. Aenean non lacus ac lacus dictum tincidunt. Duis risus ligula, porttitor a orci vel, consequat feugiat
          nibh. Phasellus blandit aliquet lacus, lobortis facilisis tellus viverra quis. Sed neque purus, auctor vel
          lobortis nec, blandit id lorem. Quisque aliquet egestas cursus. Nulla porttitor justo ac urna pretium, quis
          suscipit ante sodales. Ut sed velit quam. Phasellus et mattis ipsum. Ut a libero vehicula, molestie magna
          convallis, malesuada lectus. Sed quis pulvinar arcu. Proin blandit libero vitae diam facilisis fringilla. Nullam
          dictum risus mauris, ullamcorper porta mauris sagittis non.
        </div>
      </div> */}
    </section>
  );
}
