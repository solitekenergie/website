# Estimateur Solaire - Documentation

## Vue d'ensemble

La page estimateur a été complètement refaite selon le design Figma fourni. Elle propose un parcours en 8 étapes pour collecter les informations nécessaires au calcul du potentiel solaire d'un logement.

## Structure des fichiers

### Composants principaux

1. **MultiStepEstimatorForm.tsx** (`components/forms/MultiStepEstimatorForm.tsx`)
   - Composant principal qui gère la navigation entre les étapes
   - Gère l'état global du formulaire
   - Affiche la barre de progression
   - Layout en 2 colonnes (formulaire + image)

2. **Étapes du formulaire** (`components/forms/estimator-steps/`)
   - `Step1Address.tsx` - Saisie et sélection de l'adresse avec autocomplétion
   - `Step2Consumption.tsx` - Profil de consommation (kWh ou €)
   - `Step3Household.tsx` - Nombre de personnes dans le foyer
   - `Step4Presence.tsx` - Profil de présence
   - `Step5Surface.tsx` - Surface habitable en m²
   - `Step6Heating.tsx` - Type de chauffage principal
   - `Step7HotWater.tsx` - Type d'eau chaude sanitaire
   - `Step8Equipment.tsx` - Équipements supplémentaires

3. **Résultats** (`components/forms/estimator-steps/EstimatorResults.tsx`)
   - Affichage du potentiel solaire calculé
   - Intégration avec l'API PVGIS pour les données d'irradiation
   - Calcul des économies et ROI

### Configuration

4. **Page estimateur** (`app/estimateur/page.tsx`)
   - Point d'entrée de la fonctionnalité
   - Utilise le composant MultiStepEstimatorForm

5. **Layout spécial** (`components/layout/RootLayoutClient.tsx`)
   - Masque le header et footer uniquement sur la page /estimateur
   - Applique un fond blanc au lieu du fond slate-50

## Design & Typographie

Le design suit exactement les spécifications Figma :

### Polices
- **Titre principal** : Montserrat Black (900) - 56px
- **Sous-titre** : Montserrat Medium (500) - 18px
- **Titres d'étapes** : Montserrat Semibold (600) - 32px

### Couleurs
- **Vert principal** : #5CB88F
- **Fond** : Blanc (#FFFFFF)
- **Texte** : Slate-900 (#0F172A)

### Barre de progression
- Hauteur : 8px (h-2)
- Couleur de remplissage : #5CB88F
- Fond : Slate-200
- Affichage du pourcentage : multiples de 10% (10%, 20%, ... 100%)

## Fonctionnalités

### Étape 1 : Adresse
- **Autocomplétion** : Utilise l'API adresse.gouv.fr
- **Carte interactive** : Affiche la position sur OpenStreetMap
- **Validation** : L'adresse doit être sélectionnée dans les suggestions

### Étape 2 : Consommation
- **Deux modes** : kWh ou €
- **Mode €** : Champ supplémentaire pour le prix TTC/kWh
- **Validation** : Valeurs numériques positives obligatoires

### Étapes 3-8
- **Interface simple** : Boutons de sélection clairs
- **Navigation** : Bouton retour + bouton suivant
- **Persistance** : Les données sont conservées lors de la navigation

### Page de résultats
- **API PVGIS** : Calcul d'irradiation précis selon les coordonnées
- **Métriques affichées** :
  - Heures d'ensoleillement par an
  - Économies totales sur 25 ans
  - Réduction annuelle en €
  - Taux de rentabilité vs livret A
- **Carte thermique** : Avec sélecteur de mois (simulation visuelle)
- **CTA** : Bouton "Faire un devis" redirigeant vers /contact

## API & Intégrations

### API adresse.gouv.fr
```
GET https://api-adresse.data.gouv.fr/search/?q={query}&limit=5
```
Utilisée pour l'autocomplétion des adresses françaises.

### API PVGIS (JRC)
```
GET https://re.jrc.ec.europa.eu/api/v5_2/PVcalc?lat={lat}&lon={lon}&peakpower=1&loss=14&outputformat=json
```
Utilisée pour obtenir les données d'irradiation solaire précises selon la localisation.

## Images requises

Deux images doivent être ajoutées dans `public/images/` :

1. **solar-panel-installation.jpg**
   - Image d'un technicien installant des panneaux solaires
   - Visible pendant toutes les étapes du formulaire
   - Dimensions : 1200x800px minimum

2. **solar-thermal-map.jpg**
   - Carte thermique aérienne d'un bâtiment
   - Visible sur la page de résultats
   - Dimensions : 1200x900px minimum

Voir `public/images/ESTIMATOR_IMAGES_NEEDED.md` pour plus de détails.

## Calcul du potentiel solaire

### Formule de base
```
kWc recommandé = (Consommation annuelle × Taux de couverture) / Irradiation locale
```

### Ajustements
- **Taux de couverture** : 70% par défaut (optimal pour le ROI)
- **Équipements** :
  - Voiture électrique : +2500 kWh/an
  - Piscine : +1500 kWh/an
  - Climatisation : +1000 kWh/an
- **Prix électricité** : 0.20€/kWh par défaut

### Hypothèses
- Durée de vie : 25 ans
- Pertes système : 14%
- ROI comparé à un livret A : 1.7%

## Navigation sans Header/Footer

La page `/estimateur` est affichée en plein écran sans navigation :
- Pas de Header
- Pas de Footer
- Fond blanc au lieu de slate-50
- Layout géré par `RootLayoutClient.tsx`

## Prochaines étapes

### Améliorations possibles
1. **Validation avancée** : Ajouter des messages d'erreur plus détaillés
2. **Sauvegarde locale** : Sauvegarder la progression dans localStorage
3. **Google Solar API** : Alternative à PVGIS pour des données encore plus précises
4. **Animation** : Transitions entre les étapes
5. **Analytics** : Tracking des abandons par étape
6. **A/B Testing** : Tester différents ordres d'étapes

### Intégration CRM
- Les données collectées doivent être envoyées à votre CRM
- Modifier la fonction `handleQuoteRequest()` dans EstimatorResults.tsx
- Actuellement redirige vers /contact

## Support & Maintenance

### Tests recommandés
1. Tester avec différentes adresses françaises
2. Vérifier les calculs avec des valeurs extrêmes
3. Tester sur mobile (responsive design)
4. Vérifier la navigation arrière/avant du navigateur
5. Tester avec une connexion lente (API timeout)

### Compatibilité
- Next.js 16.1+
- React 19.2+
- Tailwind CSS 4+
- Navigateurs modernes (Chrome, Firefox, Safari, Edge)

## Contact

Pour toute question sur l'implémentation, consultez les composants dans :
- `components/forms/MultiStepEstimatorForm.tsx`
- `components/forms/estimator-steps/*.tsx`
