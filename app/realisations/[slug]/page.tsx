/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getRealisation,
  getRealisations,
  getRealisationSlugs,
  getStrapiImageUrl,
  richTextToPlainText,
  type Realisation,
  type ContentBlock,
} from "@/lib/realisations";

type RichTextNode = {
  type: string;
  children?: Array<{ type: string; text?: string; children?: RichTextNode[] }>;
  text?: string;
  level?: number;
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function RichText({ content }: { content: string | RichTextNode[] | undefined }) {
  if (!content) return null;
  if (typeof content === "string") {
    return (
      <p className="font-['Figtree'] text-base leading-relaxed text-black/70 sm:text-lg sm:leading-[27px]">
        {content}
      </p>
    );
  }

  const renderNode = (node: RichTextNode, index: number): React.ReactNode => {
    if (node.text) return node.text;
    if (!node.children) return null;
    const children = node.children.map((child, i) => renderNode(child as RichTextNode, i));
    switch (node.type) {
      case "paragraph":
        return (
          <p key={index} className="font-['Figtree'] text-base leading-relaxed text-black/70 sm:text-lg sm:leading-[27px] mb-4">
            {children}
          </p>
        );
      case "heading":
        const HeadingTag = `h${node.level || 2}` as React.ElementType;
        return (
          <HeadingTag key={index} className="font-title font-black uppercase text-[#161A1E] text-xl sm:text-2xl mb-3 mt-6">
            {children}
          </HeadingTag>
        );
      case "list":
        return (
          <ul key={index} className="list-disc pl-6 mb-4 space-y-1">
            {children}
          </ul>
        );
      case "list-item":
        return (
          <li key={index} className="font-['Figtree'] text-base leading-relaxed text-black/70 sm:text-lg">
            {children}
          </li>
        );
      default:
        return <span key={index}>{children}</span>;
    }
  };

  return <div>{content.map((node, index) => renderNode(node, index))}</div>;
}

const radiusClass: Record<string, string> = {
  aucune: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-xl",
  full: "rounded-full",
};

function renderContentBlock(block: ContentBlock, index: number) {
  switch (block.__component) {
    case "content-blocks.paragraphe":
      return (
        <div key={index}>
          <RichText content={block.texte} />
        </div>
      );

    case "content-blocks.image": {
      const mediaUrl = getStrapiImageUrl(block.media?.url);
      if (!mediaUrl) return null;
      const radius = radiusClass[block.bordureArrondie ?? "aucune"] ?? "rounded-none";
      const alignClass =
        block.alignement === "gauche"
          ? "items-start"
          : block.alignement === "droite"
          ? "items-end"
          : "items-center";
      return (
        <div key={index} className={`flex flex-col ${alignClass}`}>
          <img
            src={mediaUrl}
            alt={block.alt ?? block.media?.alternativeText ?? ""}
            className={`max-w-full h-auto ${radius}`}
          />
          {block.legende && (
            <p className="mt-2 text-center font-['Figtree'] text-sm text-black/40">{block.legende}</p>
          )}
        </div>
      );
    }

    case "content-blocks.video":
      return (
        <div key={index} className="w-full aspect-video overflow-hidden rounded-xl">
          <video
            src={block.url}
            controls={block.afficherControles}
            className="w-full h-full"
            autoPlay={!block.afficherControles}
            loop={!block.afficherControles}
            muted={!block.afficherControles}
          />
        </div>
      );

    case "content-blocks.image-et-texte": {
      const imgUrl = getStrapiImageUrl(block.image?.url);
      if (!imgUrl) return null;
      return (
        <div
          key={index}
          className={`flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-center ${
            block.positionImage === "droite" ? "lg:flex-row-reverse" : ""
          }`}
        >
          <div className="w-full overflow-hidden rounded-xl lg:flex-1">
            <img
              src={imgUrl}
              alt={block.image?.alternativeText ?? ""}
              className="w-full h-auto object-cover"
              style={block.hauteurImage ? { height: block.hauteurImage } : undefined}
            />
          </div>
          <div className="lg:flex-1">
            <RichText content={block.texte} />
          </div>
        </div>
      );
    }

    case "content-blocks.deux-colonnes":
      return (
        <div key={index} className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          <RichText content={block.colonneGauche} />
          <RichText content={block.colonneDroite} />
        </div>
      );

    case "content-blocks.galerie": {
      const images = block.images?.filter((img) => img.url) ?? [];
      if (images.length === 0) return null;
      return (
        <div key={index} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, imgIndex) => (
            <div key={imgIndex} className="aspect-[4/3] overflow-hidden rounded-xl bg-[#161A1E]">
              <img
                src={getStrapiImageUrl(image.url)}
                alt={image.alternativeText ?? ""}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      );
    }

    case "content-blocks.citation":
      return (
        <blockquote key={index} className="border-l-4 border-[#2DB180] pl-6 py-2">
          <p className="font-title text-lg font-semibold italic text-[#161A1E] sm:text-xl lg:text-2xl">
            {typeof block.texte === "string" ? block.texte : richTextToPlainText(block.texte)}
          </p>
          {block.auteur && (
            <footer className="mt-2 font-['Figtree'] text-sm text-black/50">{block.auteur}</footer>
          )}
        </blockquote>
      );

    case "content-blocks.callout": {
      const calloutStyles = {
        info: "bg-blue-50 border-blue-200 text-blue-900",
        warning: "bg-yellow-50 border-yellow-200 text-yellow-900",
        success: "bg-[#2DB180]/10 border-[#2DB180]/30 text-[#161A1E]",
      };
      return (
        <div key={index} className={`rounded-xl border-2 p-6 ${calloutStyles[block.type]}`}>
          {block.titre && (
            <h3 className="font-title font-black uppercase text-lg mb-2">{block.titre}</h3>
          )}
          <RichText content={block.texte} />
        </div>
      );
    }

    case "content-blocks.tech-stack": {
      if (!block.technologies || block.technologies.length === 0) return null;
      return (
        <div key={index} className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {block.technologies.map((tech, techIndex) => (
            <div key={techIndex} className="flex flex-col items-center gap-2 rounded-xl bg-slate-50 p-4">
              {tech.icone && (
                <img src={getStrapiImageUrl(tech.icone.url)} alt={tech.nom} className="w-10 h-10 object-contain" />
              )}
              <span className="font-['Figtree'] text-sm font-semibold text-center text-[#161A1E]">{tech.nom}</span>
              {tech.description && (
                <p className="font-['Figtree'] text-xs text-black/50 text-center">{tech.description}</p>
              )}
            </div>
          ))}
        </div>
      );
    }

    default:
      return null;
  }
}

function AutreProjetCard({ realisation }: { realisation: Realisation }) {
  const coverUrl = getStrapiImageUrl(realisation.imageCouverture?.url);
  return (
    <Link
      href={`/realisations/${realisation.slug}`}
      className="group flex flex-col gap-4 hover:opacity-90 transition-opacity"
    >
      <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#161A1E]">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={realisation.imageCouverture?.alternativeText ?? realisation.titre}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <span className="font-['Figtree'] text-sm text-white/30">Aucune image</span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        {realisation.categorie && (
          <p className="font-['Figtree'] text-xs font-semibold uppercase tracking-widest text-[#2DB180]">
            {realisation.categorie.titre}
          </p>
        )}
        <h3 className="font-title text-lg font-black uppercase text-[#161A1E] sm:text-xl">
          {realisation.titre}
        </h3>
        <p className="font-['Figtree'] text-sm text-black/50">{formatDate(realisation.datePublication)}</p>
      </div>
    </Link>
  );
}

export async function generateStaticParams() {
  const slugs = await getRealisationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const realisation = await getRealisation(resolvedParams.slug);

  if (!realisation) {
    return { title: "Réalisation non trouvée | SOLITEK" };
  }

  const coverUrl = getStrapiImageUrl(realisation.imageCouverture?.url);

  return {
    title: `${realisation.titre} | Réalisations SOLITEK`,
    description: realisation.resume || realisation.description,
    openGraph: {
      title: `${realisation.titre} | SOLITEK`,
      description: realisation.resume || realisation.description,
      images: coverUrl ? [{ url: coverUrl, alt: realisation.titre }] : [],
    },
  };
}

export default async function RealisationPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await params;
  const [realisation, toutesRealisations] = await Promise.all([
    getRealisation(resolvedParams.slug),
    getRealisations(),
  ]);

  if (!realisation) notFound();

  const autresProjets = toutesRealisations
    .filter((r) => r.slug !== resolvedParams.slug)
    .slice(0, 3);

  const coverUrl = getStrapiImageUrl(realisation.imageCouverture?.url);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-[#161A1E] px-4 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-20 lg:pb-24 lg:pt-24">
        <div className="mx-auto max-w-[1440px]">
          <Link
            href="/realisations"
            className="mb-6 inline-flex items-center gap-2 font-['Figtree'] text-sm font-semibold text-[#2DB180] transition-opacity hover:opacity-80"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Nos réalisations
          </Link>

          {realisation.categorie && (
            <p className="mb-4 font-['Figtree'] text-sm font-semibold uppercase tracking-widest text-[#2DB180]">
              {realisation.categorie.titre}
            </p>
          )}

          <h1 className="font-title text-4xl font-black uppercase leading-tight text-white sm:text-5xl lg:text-[72px] lg:leading-[1]">
            {realisation.titre}
          </h1>

          <p className="mt-4 font-['Figtree'] text-sm text-white/40">
            {formatDate(realisation.datePublication)}
          </p>

          {realisation.resume && (
            <p className="mt-6 max-w-[700px] font-['Figtree'] text-base leading-relaxed text-white/70 sm:text-lg">
              {realisation.resume}
            </p>
          )}
        </div>
      </section>

      {/* Image couverture */}
      {coverUrl && (
        <div className="w-full px-4 pt-8 sm:px-8 sm:pt-12 lg:px-20 lg:pt-16">
          <div className="mx-auto max-w-[1440px]">
            <div className="aspect-[16/7] w-full overflow-hidden rounded-xl bg-[#161A1E]">
              <img
                src={coverUrl}
                alt={realisation.imageCouverture?.alternativeText ?? realisation.titre}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Contenu */}
      <section className="w-full px-4 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-14 lg:px-20 lg:pb-[100px] lg:pt-16">
        <div className="mx-auto max-w-[900px]">

          {/* Description longue */}
          {realisation.description && realisation.description !== realisation.resume && (
            <div className="mb-10 sm:mb-14">
              <p className="font-['Figtree'] text-base leading-relaxed text-black/70 sm:text-lg sm:leading-[27px]">
                {realisation.description}
              </p>
            </div>
          )}

          {/* Blocs de contenu Strapi */}
          {realisation.contenu && realisation.contenu.length > 0 && (
            <div className="flex flex-col gap-8 sm:gap-12">
              {realisation.contenu.map((block, index) => renderContentBlock(block, index))}
            </div>
          )}

          {/* Galerie d'images supplémentaires */}
          {realisation.images && realisation.images.length > 0 && (
            <div className="mt-10 sm:mt-14">
              <h2 className="mb-6 font-title text-xl font-black uppercase text-[#161A1E] sm:text-2xl">
                Photos du chantier
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {realisation.images.map((image, imgIndex) => (
                  <div key={imgIndex} className="aspect-[4/3] overflow-hidden rounded-xl bg-[#161A1E]">
                    <img
                      src={getStrapiImageUrl(image.url)}
                      alt={image.alternativeText ?? `Photo ${imgIndex + 1} - ${realisation.titre}`}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Autres projets — uniquement si 3+ autres réalisations disponibles */}
      {autresProjets.length >= 3 && (
        <section className="w-full border-t border-black/10 px-4 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:px-20 lg:pb-[100px] lg:pt-[80px]">
          <div className="mx-auto max-w-[1440px]">
            <h2 className="mb-8 font-title text-2xl font-black uppercase text-[#161A1E] sm:text-3xl lg:text-[40px] sm:mb-10 lg:mb-12">
              Autres projets
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 lg:gap-8">
              {autresProjets.map((projet) => (
                <AutreProjetCard key={projet.documentId} realisation={projet} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#2DB180] px-4 py-12 sm:px-8 sm:py-16 lg:px-20 lg:py-20">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-6 text-center sm:gap-8">
          <h2 className="font-title text-3xl font-black uppercase leading-tight text-white sm:text-4xl lg:text-[56px] lg:leading-[56px]">
            Un projet similaire ?
          </h2>
          <p className="max-w-[560px] font-['Figtree'] text-base leading-relaxed text-white/80 sm:text-lg">
            Décrivez votre installation, nous vous recontactons sous 24h. Devis gratuit, sans engagement.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-title text-sm font-semibold text-[#161A1E] transition-opacity hover:opacity-90 sm:text-base"
          >
            Demander un devis
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
