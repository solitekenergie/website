import type { Schema, Struct } from '@strapi/strapi';

export interface ContentBlocksCallout extends Struct.ComponentSchema {
  collectionName: 'components_content_blocks_callouts';
  info: {
    description: "Bo\u00EEte d'information mise en \u00E9vidence";
    displayName: 'Callout';
    icon: 'exclamation-circle';
  };
  attributes: {
    texte: Schema.Attribute.Blocks & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<
      ['info', 'avertissement', 'succes', 'citation', 'technique']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'info'>;
  };
}

export interface ContentBlocksCitation extends Struct.ComponentSchema {
  collectionName: 'components_content_blocks_citations';
  info: {
    description: 'Citation avec auteur';
    displayName: 'Citation';
    icon: 'quote-right';
  };
  attributes: {
    auteur: Schema.Attribute.String;
    texte: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface ContentBlocksDeuxColonnes extends Struct.ComponentSchema {
  collectionName: 'components_content_blocks_deux_colonnes';
  info: {
    description: 'Contenu sur deux colonnes';
    displayName: 'Deux Colonnes';
    icon: 'columns';
  };
  attributes: {
    colonneDroite: Schema.Attribute.Blocks & Schema.Attribute.Required;
    colonneGauche: Schema.Attribute.Blocks & Schema.Attribute.Required;
  };
}

export interface ContentBlocksGalerie extends Struct.ComponentSchema {
  collectionName: 'components_content_blocks_galeries';
  info: {
    description: "Galerie d'images";
    displayName: 'Galerie';
    icon: 'images';
  };
  attributes: {
    disposition: Schema.Attribute.Enumeration<['grille2', 'grille3', 'ligne']> &
      Schema.Attribute.DefaultTo<'grille2'>;
    hauteur: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 1000;
          min: 200;
        },
        number
      > &
      Schema.Attribute.DefaultTo<500>;
    images: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
    largeur: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 2000;
          min: 200;
        },
        number
      >;
  };
}

export interface ContentBlocksImage extends Struct.ComponentSchema {
  collectionName: 'components_content_blocks_images';
  info: {
    description: 'Image avec options de taille et alignement';
    displayName: 'Image';
    icon: 'picture';
  };
  attributes: {
    alignement: Schema.Attribute.Enumeration<['gauche', 'centre', 'droite']> &
      Schema.Attribute.DefaultTo<'centre'>;
    alt: Schema.Attribute.String;
    bordureArrondie: Schema.Attribute.Enumeration<
      ['aucune', 'petit', 'moyen', 'grand']
    > &
      Schema.Attribute.DefaultTo<'aucune'>;
    hauteurPersonnalisee: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 2000;
          min: 100;
        },
        number
      >;
    largeurPersonnalisee: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 2000;
          min: 100;
        },
        number
      >;
    legende: Schema.Attribute.String;
    media: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    typeTaille: Schema.Attribute.Enumeration<
      ['auto', 'petit', 'moyen', 'grand', 'pleineLargeur', 'personnalise']
    > &
      Schema.Attribute.DefaultTo<'auto'>;
  };
}

export interface ContentBlocksImageEtTexte extends Struct.ComponentSchema {
  collectionName: 'components_content_blocks_image_textes';
  info: {
    description: 'Image combin\u00E9e avec du texte';
    displayName: 'Image et Texte';
    icon: 'layer-group';
  };
  attributes: {
    hauteurImage: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 1000;
          min: 200;
        },
        number
      > &
      Schema.Attribute.DefaultTo<400>;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    largeurImage: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 2000;
          min: 200;
        },
        number
      >;
    positionImage: Schema.Attribute.Enumeration<
      ['gauche', 'droite', 'haut', 'bas']
    > &
      Schema.Attribute.DefaultTo<'gauche'>;
    texte: Schema.Attribute.Blocks & Schema.Attribute.Required;
  };
}

export interface ContentBlocksParagraphe extends Struct.ComponentSchema {
  collectionName: 'components_content_blocks_paragraphes';
  info: {
    description: 'Bloc de texte riche';
    displayName: 'Paragraphe';
    icon: 'align-left';
  };
  attributes: {
    texte: Schema.Attribute.Blocks & Schema.Attribute.Required;
  };
}

export interface ContentBlocksTechStack extends Struct.ComponentSchema {
  collectionName: 'components_content_blocks_tech_stacks';
  info: {
    description: 'Liste de technologies utilis\u00E9es';
    displayName: 'Tech Stack';
    icon: 'code';
  };
  attributes: {
    technologies: Schema.Attribute.Component<'elements.technologie', true>;
    titre: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Technologies utilis\u00E9es'>;
  };
}

export interface ContentBlocksVideo extends Struct.ComponentSchema {
  collectionName: 'components_content_blocks_videos';
  info: {
    description: 'Vid\u00E9o Mux ou externe';
    displayName: 'Vid\u00E9o';
    icon: 'play';
  };
  attributes: {
    afficherControles: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    autoplay: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    legendeVideo: Schema.Attribute.String;
    playbackId: Schema.Attribute.String;
    urlVideo: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsTechnologie extends Struct.ComponentSchema {
  collectionName: 'components_elements_technologies';
  info: {
    description: 'Une technologie avec ic\u00F4ne';
    displayName: 'Technologie';
    icon: 'cog';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icone: Schema.Attribute.Media<'images'>;
    nom: Schema.Attribute.String & Schema.Attribute.Required;
    tailleIcone: Schema.Attribute.Enumeration<['petit', 'moyen', 'grand']> &
      Schema.Attribute.DefaultTo<'moyen'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'content-blocks.callout': ContentBlocksCallout;
      'content-blocks.citation': ContentBlocksCitation;
      'content-blocks.deux-colonnes': ContentBlocksDeuxColonnes;
      'content-blocks.galerie': ContentBlocksGalerie;
      'content-blocks.image': ContentBlocksImage;
      'content-blocks.image-et-texte': ContentBlocksImageEtTexte;
      'content-blocks.paragraphe': ContentBlocksParagraphe;
      'content-blocks.tech-stack': ContentBlocksTechStack;
      'content-blocks.video': ContentBlocksVideo;
      'elements.technologie': ElementsTechnologie;
    }
  }
}
