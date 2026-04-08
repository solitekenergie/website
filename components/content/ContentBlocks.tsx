import Image from "next/image";
import { getStrapiImageUrl, richTextToPlainText, type ContentBlock } from "@/lib/realisations";

type RichTextNode = {
  type: string;
  children?: Array<{ type: string; text?: string; children?: RichTextNode[] }>;
  text?: string;
  level?: number;
};

export function RichText({ content }: { content: string | RichTextNode[] | undefined }) {
  if (!content) return null;
  if (typeof content === "string") {
    return (
      <p className="font-ui text-base leading-relaxed text-black/70 sm:text-lg sm:leading-[27px]">
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
          <p key={index} className="font-ui text-base leading-relaxed text-black/70 sm:text-lg sm:leading-[27px] mb-4">
            {children}
          </p>
        );
      case "heading": {
        const HeadingTag = `h${node.level || 2}` as React.ElementType;
        return (
          <HeadingTag key={index} className="font-title font-black uppercase text-[#161A1E] text-xl sm:text-2xl mb-3 mt-6">
            {children}
          </HeadingTag>
        );
      }
      case "list":
        return (
          <ul key={index} className="list-disc pl-6 mb-4 space-y-1">
            {children}
          </ul>
        );
      case "list-item":
        return (
          <li key={index} className="font-ui text-base leading-relaxed text-black/70 sm:text-lg">
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

export function renderContentBlock(block: ContentBlock, index: number) {
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
      const radius = radiusClass[block.bordureArrondie ?? "lg"] ?? "rounded-xl";
      const alignClass =
        block.alignement === "gauche"
          ? "items-start"
          : block.alignement === "droite"
          ? "items-end"
          : "items-center";
      return (
        <div key={index} className={`flex flex-col ${alignClass}`}>
          <div className="relative w-full aspect-[16/9]">
            <Image
              src={mediaUrl}
              alt={block.alt ?? block.media?.alternativeText ?? ""}
              fill
              sizes="(max-width: 900px) 100vw, 900px"
              className={`object-contain ${radius}`}
            />
          </div>
          {block.legende && (
            <p className="mt-2 text-center font-ui text-sm text-black/40">{block.legende}</p>
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
          <div className="relative w-full overflow-hidden rounded-xl lg:flex-1" style={{ minHeight: block.hauteurImage || "300px" }}>
            <Image
              src={imgUrl}
              alt={block.image?.alternativeText ?? ""}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
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
            <div key={imgIndex} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#161A1E]">
              <Image
                src={getStrapiImageUrl(image.url)}
                alt={image.alternativeText ?? ""}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 hover:scale-105"
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
            <footer className="mt-2 font-ui text-sm text-black/50">{block.auteur}</footer>
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
                <Image src={getStrapiImageUrl(tech.icone.url)} alt={tech.nom} width={40} height={40} className="object-contain" />
              )}
              <span className="font-ui text-sm font-semibold text-center text-[#161A1E]">{tech.nom}</span>
              {tech.description && (
                <p className="font-ui text-xs text-black/50 text-center">{tech.description}</p>
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
