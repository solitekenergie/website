/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { getRealisations, getStrapiImageUrl } from "@/lib/realisations";

export const metadata = {
  title: "Nos réalisations | Solitek",
  description: "Découvrez nos projets et réalisations en énergie solaire photovoltaïque",
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

      <section className="w-full px-4 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-20 lg:pb-[100px] lg:pt-[100px] flex flex-col gap-10 sm:gap-16 lg:gap-20">

      {realisations.length === 0 ? (
        <div className="self-stretch text-center text-black/60 text-lg">
          Aucune réalisation disponible pour le moment.
        </div>
      ) : (
        <div className="self-stretch flex flex-col justify-start items-start gap-10 sm:gap-16 lg:gap-20">
          {Array.from({ length: Math.ceil(realisations.length / 3) }).map((_, rowIndex) => (
            <div key={rowIndex} className="self-stretch inline-flex flex-wrap justify-start items-start gap-6">
              {realisations.slice(rowIndex * 3, (rowIndex + 1) * 3).map((realisation) => (
                <Card
                  key={realisation.documentId}
                  slug={realisation.slug}
                  image={getStrapiImageUrl(realisation.imageCouverture?.url)}
                  title={realisation.titre}
                  date={formatDate(realisation.datePublication)}
                  description={realisation.resume}
                />
              ))}
            </div>
          ))}
        </div>
      )}
      </section>
    </div>
  );
}

type CardProps = {
  slug: string;
  image: string;
  title: string;
  date: string;
  description: string;
};

function Card({ slug, image, title, date, description }: CardProps) {
  return (
    <Link
      href={`/realisations/${slug}`}
      className="w-full sm:flex-1 sm:min-w-[280px] sm:max-w-[560px] inline-flex flex-col justify-start items-start gap-4 sm:gap-6 hover:opacity-80 transition-opacity"
    >
      <div className="h-[220px] sm:h-[260px] lg:h-[280px] w-full overflow-hidden rounded-[8px] bg-[#161A1E]">
        {image ? (
          <img className="h-full w-full rounded-[6px] object-cover" src={image} alt={title} />
        ) : (
          <div className="h-full w-full rounded-[6px] bg-gradient-to-br from-[#2DB180]/20 to-[#161A1E]/20 flex items-center justify-center">
            <span className="text-white/40 text-sm">Aucune image</span>
          </div>
        )}
      </div>
      <div className="self-stretch flex flex-col justify-start items-start gap-4 sm:gap-6">
        <div className="self-stretch flex flex-col justify-start items-start gap-2 sm:gap-4">
          <div className="self-stretch text-[#161A1E] font-title font-black uppercase text-xl sm:text-2xl lg:text-[28px] lg:leading-[28px]">
            {title}
          </div>
          <div className="self-stretch text-sm sm:text-[15px] leading-6 font-['Figtree'] font-normal text-black/60">
            {date}
          </div>
        </div>
        <div className="self-stretch text-black text-sm sm:text-base lg:text-[18px] lg:leading-[27px] font-['Figtree'] font-normal line-clamp-4">
          {description}
        </div>
      </div>
    </Link>
  );
}
