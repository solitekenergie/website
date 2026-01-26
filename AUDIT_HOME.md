## Audit Home — alignement maquette Figma

### Images & assets
- Vérifié `public/images`: `mission-*.jpg`, `services-*.jpg` présents. Renommage effectué `services-entretien..jpg` → `services-entretien.jpg` pour supprimer le 404.
- Tous les chemins dans le code utilisent `/images/...`. Page de vérif ajoutée : `app/debug-images/page.tsx` affiche toutes les images locales (supprimable après vérification visuelle).

### Sections auditées

#### Hero (app/page.tsx)
- Typo : Montserrat 72/72 -1.44 (lg) pour le H1, CTA `Mon estimation` fond blanc texte #161A1E, texte secondaire Montserrat 24/24 -0.48 (lg). Alignements via `max-w-[1440px]` et `px-4/8/80` cohérents avec le header.
- Fond vidéo `hero.mp4` + poster `hero-panels.jpg` OK.
- Conformité : OK desktop.

#### Mission (components/sections/MissionSection.tsx)
- Wrapper : `pb-[60px]`, bloc texte `pt-[100px] pb-[80px] px-[80px]` gap 24, centre.
- Titre : Montserrat 56 font-black uppercase line-height 78.4, couleur #161A1E.
- Paragraphe : largeur 800, Figtree 18/27, centré.
- Slider : viewport `w-[1240px] h-[412px] overflow-hidden inline-flex justify-center items-center`, track `inline-flex gap-4` (~1900px) centré, images fixes avec `flex-none`, `rounded-[4px]`, padding 32 sur la carte centrale, crop des 1ère/5e assuré.
- Conformité : OK après vérif.

#### Services (components/sections/ServicesSection.tsx)
- Wrapper : `px-20 pt-[100px] pb-[100px]` gap 48.
- Titres : section `Nos Services` Montserrat 32/44.8 uppercase #161A1E. Cartes titres Montserrat 56/56 uppercase blanc ; sous-texte Montserrat 24/24 blanc ; CTA Figtree 16/22.4 bold fond blanc texte #161A1E.
- Cartes : radius 12px, padding 80/48, hauteurs fixes (500px pour Photovoltaïque, 600px pour les autres), backgrounds linéaire + overlay + image locale (`services-*.jpg`). Layouts inline-flex gap 24 respectés.
- Texte final : Titre Montserrat 32/44.8 uppercase #161A1E ; corps Figtree 18/27 noir.
- Conformité : OK avec images locales corrigées.

### Corrections réalisées
- Renommage asset : `public/images/services-entretien..jpg` → `public/images/services-entretien.jpg`.
- Ajout page de debug visuelle : `app/debug-images/page.tsx` pour vérifier le chargement des images locales.

### Tests
- `npm run lint`
- `npm run build`
