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
    <section className="w-full h-full pt-[200px] pb-[100px] px-[100px] inline-flex flex-col justify-start items-start gap-20">
      <div className="self-stretch text-center text-[#2DB180] text-[56px] leading-[56px] font-title font-black uppercase">
        Nos réalisations
      </div>

      {realisations.length === 0 ? (
        <div className="self-stretch text-center text-black/60 text-lg">
          Aucune réalisation disponible pour le moment.
        </div>
      ) : (
        <div className="self-stretch flex flex-col justify-start items-start gap-20">
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
      className="flex-1 min-w-[300px] max-w-[560px] inline-flex flex-col justify-start items-start gap-6 hover:opacity-80 transition-opacity"
    >
      <div className="h-[278.13px] w-full p-10 bg-[#161A1E] overflow-hidden rounded-[8px] flex flex-col justify-end items-center gap-2">
        {image ? (
          <img className="h-full w-full rounded-[6px] object-cover" src={image} alt={title} />
        ) : (
          <div className="h-full w-full rounded-[6px] bg-gradient-to-br from-[#2DB180]/20 to-[#161A1E]/20 flex items-center justify-center">
            <span className="text-white/40 text-sm">Aucune image</span>
          </div>
        )}
      </div>
      <div className="self-stretch flex flex-col justify-start items-start gap-6">
        <div className="self-stretch flex flex-col justify-start items-start gap-4">
          <div className="self-stretch text-[#161A1E] text-[28px] leading-[28px] font-title font-black uppercase">
            {title}
          </div>
          <div className="self-stretch text-[15px] leading-6 font-['Figtree'] font-normal text-black/60 opacity-80">
            {date}
          </div>
        </div>
        <div className="self-stretch text-black text-[18px] leading-[27px] font-['Figtree'] font-normal line-clamp-4">
          {description}
        </div>
      </div>
    </Link>
  );
}
