const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "https://cms-production-8fb5.up.railway.app"; //"http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

type StrapiMedia = {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
};

export type Realisation = {
  id: number;
  documentId: string;
  titre: string;
  description: string;
  resume: string;
  slug: string;
  contenu: ContentBlock[];
  imageCouverture?: StrapiMedia;
  videoCouverture?: string;
  afficherControlesVideo: boolean;
  images?: StrapiMedia[];
  misEnAvant: boolean;
  datePublication: string;
  categorie?: {
    titre: string;
    slug: string;
    couleur?: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

type RichTextNode = {
  type: string;
  children?: Array<{ type: string; text?: string; children?: RichTextNode[] }>;
  text?: string;
  level?: number;
};

export type ContentBlock =
  | { __component: "content-blocks.paragraphe"; texte: string | RichTextNode[] }
  | {
      __component: "content-blocks.image";
      // Strapi retourne le champ media (pas image)
      media?: StrapiMedia;
      legende?: string;
      alt?: string;
      alignement?: "gauche" | "centre" | "droite";
      bordureArrondie?: "aucune" | "sm" | "md" | "lg" | "full";
    }
  | { __component: "content-blocks.video"; url: string; afficherControles: boolean }
  | {
      __component: "content-blocks.image-et-texte";
      image?: StrapiMedia;
      texte: string | RichTextNode[];
      positionImage: "gauche" | "droite";
      hauteurImage?: number;
    }
  | {
      __component: "content-blocks.deux-colonnes";
      colonneGauche: string | RichTextNode[];
      colonneDroite: string | RichTextNode[];
    }
  | {
      __component: "content-blocks.galerie";
      images?: StrapiMedia[];
    }
  | { __component: "content-blocks.citation"; texte: string | RichTextNode[]; auteur?: string }
  | {
      __component: "content-blocks.callout";
      titre?: string;
      texte: string | RichTextNode[];
      type: "info" | "warning" | "success";
    }
  | {
      __component: "content-blocks.tech-stack";
      technologies: Array<{ nom: string; icone?: StrapiMedia; description?: string }>;
    };

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${STRAPI_URL}/api${endpoint}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
  }

  const res = await fetch(url, {
    headers,
    ...options,
  });

  // If token auth fails, retry without token (public access)
  if (res.status === 401 && STRAPI_API_TOKEN) {
    const publicRes = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    if (!publicRes.ok) {
      throw new Error(`Strapi API error: ${publicRes.status} ${publicRes.statusText}`);
    }

    return publicRes.json();
  }

  if (!res.ok) {
    throw new Error(`Strapi API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// Pour la liste (page /realisations) : on a besoin uniquement de l'image couverture
export async function getRealisations(): Promise<Realisation[]> {
  try {
    const data = await fetchAPI(
      "/realisations-all?populate[imageCouverture]=true&sort[0]=datePublication:desc&pagination[pageSize]=100",
      {
        next: { revalidate: 60 },
      }
    );
    return data.data || [];
  } catch (error) {
    console.error("Error fetching realisations:", error);
    return [];
  }
}

// Pour la page détail : population profonde des blocs de contenu
export async function getRealisation(slug: string): Promise<Realisation | null> {
  try {
    const data = await fetchAPI(
      `/realisations-all?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[imageCouverture]=true&populate[images]=true&populate[contenu][populate]=*`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!data.data || data.data.length === 0) {
      return null;
    }

    return data.data[0];
  } catch (error) {
    console.error(`Error fetching realisation ${slug}:`, error);
    return null;
  }
}

export async function getRealisationSlugs(): Promise<string[]> {
  try {
    const data = await fetchAPI("/realisations-all?fields[0]=slug&pagination[pageSize]=100", {
      next: { revalidate: 60 },
    });
    return (data.data || []).map((item: { slug: string }) => item.slug);
  } catch (error) {
    console.error("Error fetching realisation slugs:", error);
    return [];
  }
}

export function getStrapiImageUrl(url?: string): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

export function richTextToPlainText(content: string | RichTextNode[] | undefined): string {
  if (!content) return "";
  if (typeof content === "string") return content;

  const extractText = (nodes: RichTextNode[]): string => {
    return nodes
      .map((node) => {
        if (node.text) return node.text;
        if (node.children) return extractText(node.children as RichTextNode[]);
        return "";
      })
      .join("");
  };

  return extractText(content);
}
