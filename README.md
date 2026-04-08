# SOLITEK - Site vitrine & CMS

Site web professionnel de **SOLITEK**, entreprise spécialisée en installation de panneaux solaires, pompes à chaleur, climatisation, ventilation et électricité en Alsace.

Concu et développé par **[Studio Fief](https://studiofief.com)**.

---

## Stack technique

| Couche | Technologie | Version |
|--------|-------------|---------|
| Framework | Next.js | 16 |
| UI | React | 19 |
| Langage | TypeScript | 5 |
| Styling | Tailwind CSS | 4 |
| CMS | Strapi | 5 |
| Base de données | PostgreSQL (prod) / SQLite (dev) | - |
| Email | Resend | - |
| Hébergement | Railway | - |

## Architecture

```
.
├── app/                    # Pages Next.js (App Router)
│   ├── blog/               # Articles de blog (Strapi + Markdown)
│   ├── contact/            # Page contact + formulaire
│   ├── estimateur/         # Simulateur photovoltaique
│   ├── realisations/       # Projets (Strapi CMS)
│   ├── services/           # Pages services
│   └── api/                # Routes API (contact, estimateur, solar)
├── components/
│   ├── content/            # Rendu des blocs Strapi
│   ├── forms/              # Formulaires (contact, estimateur)
│   ├── layout/             # Header, Footer, Navigation
│   ├── sections/           # Sections réutilisables
│   └── ui/                 # Composants UI (FadeIn, Skeleton)
├── content/blog/           # Articles Markdown (fallback)
├── lib/                    # Logique métier, API Strapi, SEO
├── public/images/          # Images optimisées du site
└── strapi-solitek/         # Instance Strapi (CMS)
    └── src/api/
        ├── article/        # Content type Articles (blog)
        └── realisations/   # Content type Réalisations
```

## Fonctionnalités

- **Simulateur solaire** : estimation de production photovoltaique via Google Solar API
- **Blog hybride** : articles gérés via Strapi CMS avec fallback Markdown
- **Réalisations** : gestion complète via Strapi (texte riche, galeries, vidéos)
- **Formulaire de contact** : validation Zod, envoi email via Resend
- **SEO avancé** : JSON-LD (LocalBusiness, BlogPosting, FAQPage), sitemap, robots.txt
- **Analytics** : Google Tag Manager + GA4 + Clickio CMP
- **Performance** : React Compiler, Turbopack, ISR 60s, images Next.js optimisées

## Installation locale

### Prérequis

- Node.js >= 20
- npm >= 10

### Frontend (Next.js)

```bash
npm install
cp .env.example .env.local  # Configurer les variables d'environnement
npm run dev                  # http://localhost:3000
```

### CMS (Strapi)

```bash
cd strapi-solitek
npm install
cp .env.example .env
npm run develop              # http://localhost:1337/admin
```

### Variables d'environnement requises

**Frontend (.env.local) :**

```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=<token_api_strapi>
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<cle_google>
RESEND_API_KEY=<cle_resend>
```

**Strapi (.env) :**

```
HOST=0.0.0.0
PORT=1337
APP_KEYS=<cles_application>
API_TOKEN_SALT=<salt>
ADMIN_JWT_SECRET=<secret>
JWT_SECRET=<secret>
```

## Déploiement

Le projet est déployé sur **Railway** :

- **Frontend** : build Next.js, démarrage via `next start -H 0.0.0.0 -p $PORT`
- **CMS** : instance Strapi avec PostgreSQL

Le déploiement est automatique sur push vers la branche `main`.

## Administration CMS

Accès admin Strapi : `https://cms-production-8fb5.up.railway.app/admin`

Le CMS permet de gérer :
- **Articles de blog** : rédaction avec blocs dynamiques (texte, images, vidéos, citations, galeries)
- **Réalisations** : projets avec galerie photo, description, technologies

## Licence

**Propriétaire** - Tous droits réservés.

Ce projet est la propriété intellectuelle de **Studio Fief (SASU)**.
Voir le fichier [LICENSE](./LICENSE) pour les conditions complètes.

Toute reproduction, distribution ou utilisation non autorisée est
strictement interdite.

---

Développé par **Studio Fief** | [studiofief.com](https://studiofief.com)
