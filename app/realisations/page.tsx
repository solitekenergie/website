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
    <section className="w-full h-full px-4 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-28 lg:px-20 lg:pb-[100px] lg:pt-[120px] inline-flex flex-col justify-start items-start gap-10 sm:gap-16 lg:gap-20">
      <div className="self-stretch text-center text-[#2DB180] font-title font-black uppercase text-3xl sm:text-4xl lg:text-[56px] lg:leading-[56px]">
        Nos réalisations
      </div>

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
