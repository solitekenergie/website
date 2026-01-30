/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getRealisation, getRealisationSlugs, getStrapiImageUrl, richTextToPlainText, type ContentBlock } from "@/lib/realisations";

type RichTextNode = {
  type: string;
  children?: Array<{ type: string; text?: string; children?: RichTextNode[] }>;
  text?: string;
  level?: number;
};

function RichText({ content }: { content: string | RichTextNode[] | undefined }) {
  if (!content) return null;
  if (typeof content === "string") {
    return <p className="text-[18px] leading-[27px] text-black whitespace-pre-line">{content}</p>;
  }

  const renderNode = (node: RichTextNode, index: number): React.ReactNode => {
    if (node.text) {
      return node.text;
    }

    if (!node.children) return null;

    const children = node.children.map((child, i) => renderNode(child as RichTextNode, i));

    switch (node.type) {
      case "paragraph":
        return (
          <p key={index} className="text-[18px] leading-[27px] text-black mb-4">
            {children}
          </p>
        );
      case "heading":
        const HeadingTag = `h${node.level || 1}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag key={index} className="text-[24px] font-title font-black uppercase text-[#161A1E] mb-4">
            {children}
          </HeadingTag>
        );
      case "list":
        return (
          <ul key={index} className="list-disc pl-6 mb-4">
            {children}
          </ul>
        );
      case "list-item":
        return <li key={index} className="text-[18px] leading-[27px] text-black">{children}</li>;
      default:
        return <span key={index}>{children}</span>;
    }
  };

  return <div className="space-y-2">{content.map((node, index) => renderNode(node, index))}</div>;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
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
    return { title: "Réalisation non trouvée | Solitek" };
  }

  return {
    title: `${realisation.titre} | Solitek`,
    description: realisation.resume,
  };
}

function renderContentBlock(block: ContentBlock, index: number) {
  switch (block.__component) {
    case "content-blocks.paragraphe":
      return (
        <div key={index} className="prose max-w-none">
          <RichText content={block.texte} />
        </div>
      );

    case "content-blocks.image":
      if (!block.image) return null;
      return (
        <div key={index} className="w-full">
          <img
            src={getStrapiImageUrl(block.image.url)}
            alt={block.image.alternativeText || ""}
            className="w-full rounded-lg"
          />
        </div>
      );

    case "content-blocks.video":
      return (
        <div key={index} className="w-full aspect-video">
          <video
            src={block.url}
            controls={block.afficherControles}
            className="w-full h-full rounded-lg"
            autoPlay={!block.afficherControles}
            loop={!block.afficherControles}
            muted={!block.afficherControles}
          />
        </div>
      );

    case "content-blocks.image-et-texte":
      if (!block.image) return null;
      return (
        <div
          key={index}
          className={`flex gap-8 items-center ${block.positionImage === "droite" ? "flex-row-reverse" : "flex-row"}`}
        >
          <div className="flex-1">
            <img
              src={getStrapiImageUrl(block.image.url)}
              alt={block.image.alternativeText || ""}
              className="w-full rounded-lg"
            />
          </div>
          <div className="flex-1">
            <RichText content={block.texte} />
          </div>
        </div>
      );

    case "content-blocks.deux-colonnes":
      return (
        <div key={index} className="grid grid-cols-2 gap-8">
          <div className="prose max-w-none">
            <RichText content={block.colonneGauche} />
          </div>
          <div className="prose max-w-none">
            <RichText content={block.colonneDroite} />
          </div>
        </div>
      );

    case "content-blocks.galerie":
      if (!block.images || block.images.length === 0) return null;
      return (
        <div key={index} className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {block.images.map((image, imgIndex) => (
            <img
              key={imgIndex}
              src={getStrapiImageUrl(image.url)}
              alt={image.alternativeText || ""}
              className="w-full h-full object-cover rounded-lg aspect-square"
            />
          ))}
        </div>
      );

    case "content-blocks.citation":
      return (
        <blockquote key={index} className="border-l-4 border-[#2DB180] pl-6 py-4 italic">
          <div className="text-[20px] leading-[30px] text-black/80">
            {typeof block.texte === "string" ? block.texte : richTextToPlainText(block.texte)}
          </div>
          {block.auteur && <footer className="text-[16px] text-black/60 mt-2">— {block.auteur}</footer>}
        </blockquote>
      );

    case "content-blocks.callout":
      const bgColors = {
        info: "bg-blue-50 border-blue-200",
        warning: "bg-yellow-50 border-yellow-200",
        success: "bg-green-50 border-green-200",
      };
      return (
        <div key={index} className={`p-6 rounded-lg border-2 ${bgColors[block.type]}`}>
          {block.titre && <h3 className="text-[20px] font-bold mb-2">{block.titre}</h3>}
          <div className="text-[18px] leading-[27px]">
            <RichText content={block.texte} />
          </div>
        </div>
      );

    case "content-blocks.tech-stack":
      if (!block.technologies || block.technologies.length === 0) return null;
      return (
        <div key={index} className="space-y-4">
          <h3 className="text-[24px] font-title font-black uppercase text-[#161A1E]">Technologies utilisées</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {block.technologies.map((tech, techIndex) => (
              <div key={techIndex} className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg">
                {tech.icone && (
                  <img src={getStrapiImageUrl(tech.icone.url)} alt={tech.nom} className="w-12 h-12 object-contain" />
                )}
                <span className="text-[16px] font-semibold text-center">{tech.nom}</span>
                {tech.description && <p className="text-[14px] text-black/60 text-center">{tech.description}</p>}
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default async function RealisationPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await params;
  const realisation = await getRealisation(resolvedParams.slug);

  if (!realisation) {
    notFound();
  }

  return (
    <article className="w-full min-h-screen pt-[150px] pb-[100px] px-[100px]">
      {/* Header */}
      <div className="mb-12">
        <Link
          href="/realisations"
          className="inline-flex items-center gap-2 text-[#2DB180] hover:opacity-80 transition-opacity mb-6"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour aux réalisations
        </Link>

        <div className="space-y-4">
          <h1 className="text-[#2DB180] text-[48px] leading-[48px] font-title font-black uppercase">
            {realisation.titre}
          </h1>
          <div className="flex items-center gap-4 text-black/60">
            <time className="text-[16px]">{formatDate(realisation.datePublication)}</time>
            {realisation.categorie && (
              <>
                <span>•</span>
                <span
                  className="px-3 py-1 rounded-full text-[14px] font-semibold"
                  style={{
                    backgroundColor: realisation.categorie.couleur
                      ? `${realisation.categorie.couleur}20`
                      : "#2DB18020",
                    color: realisation.categorie.couleur || "#2DB180",
                  }}
                >
                  {realisation.categorie.titre}
                </span>
              </>
            )}
          </div>
        </div>

        <p className="mt-6 text-[20px] leading-[30px] text-black/80">{realisation.description}</p>
      </div>

      {/* Cover Image or Video */}
      {realisation.videoCouverture ? (
        <div className="mb-12 w-full aspect-video rounded-xl overflow-hidden">
          <video
            src={realisation.videoCouverture}
            controls={realisation.afficherControlesVideo}
            autoPlay={!realisation.afficherControlesVideo}
            loop={!realisation.afficherControlesVideo}
            muted={!realisation.afficherControlesVideo}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        realisation.imageCouverture && (
          <div className="mb-12 w-full aspect-video rounded-xl overflow-hidden">
            <img
              src={getStrapiImageUrl(realisation.imageCouverture.url)}
              alt={realisation.imageCouverture.alternativeText || realisation.titre}
              className="w-full h-full object-cover"
            />
          </div>
        )
      )}

      {/* Content Blocks */}
      <div className="space-y-8 max-w-4xl">{realisation.contenu?.map((block, index) => renderContentBlock(block, index))}</div>

      {/* Footer Links */}
      <div className="mt-12 pt-8 border-t border-black/10 flex gap-4">
        {realisation.urlProjet && (
          <a
            href={realisation.urlProjet}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#2DB180] text-white rounded-lg hover:bg-[#259869] transition-colors"
          >
            Voir le projet
          </a>
        )}
        {realisation.urlGithub && (
          <a
            href={realisation.urlGithub}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#161A1E] text-white rounded-lg hover:bg-[#2a3139] transition-colors"
          >
            Voir sur GitHub
          </a>
        )}
      </div>
    </article>
  );
}
