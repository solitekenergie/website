# Images nécessaires pour l'estimateur

Les images suivantes doivent être ajoutées dans le dossier `public/images/` pour que l'estimateur fonctionne correctement :

## 1. solar-panel-installation.jpg
**Chemin:** `public/images/solar-panel-installation.jpg`
**Description:** Photo d'un technicien installant des panneaux solaires sur un toit
**Utilisation:** Image affichée sur le côté droit pendant toutes les étapes du formulaire
**Dimensions recommandées:** 1200x800px minimum
**Format:** JPG

## 2. solar-thermal-map.jpg
**Chemin:** `public/images/solar-thermal-map.jpg`
**Description:** Carte thermique aérienne d'un bâtiment montrant les zones d'ensoleillement (style imagerie thermique avec zones orangées/violettes)
**Utilisation:** Image affichée sur la page de résultats avec un sélecteur de mois
**Dimensions recommandées:** 1200x900px minimum
**Format:** JPG

## Notes
- Ces images sont référencées dans les composants suivants :
  - `components/forms/MultiStepEstimatorForm.tsx`
  - `components/forms/estimator-steps/EstimatorResults.tsx`
- Vous pouvez utiliser des images similaires à celles fournies dans les maquettes Figma
- Les images doivent être optimisées pour le web (compression sans perte de qualité)
