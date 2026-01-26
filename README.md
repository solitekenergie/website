# Solitek

Site vitrine Next.js (App Router) pour Solitek. TypeScript, Tailwind CSS, ESLint, formulaires et contenus prêts à remplir.

## Fonctionnalités
- Pages : accueil, estimateur photovoltaïque, blog, FAQ, contact, mentions légales, politique de confidentialité.
- Estimateur kWc local (aucune donnée stockée) avec hypothèses visibles.
- Formulaire de contact validé par Zod côté API ; point d'extension email dans `lib/email/send.ts` et fallback console.
- Blog statique à partir de `content/blog/*.md`, listing + page détail.
- CI GitHub Actions : `npm ci`, `npm run lint`, `npm run build`.

## Démarrage
```bash
npm install
npm run dev
```

Autres commandes utiles :
```bash
npm run lint
npm run build
```

## Configuration
- Dupliquez `.env.example` en `.env.local` et renseignez `CONTACT_TO_EMAIL`. Laissez `EMAIL_PROVIDER` / `RESEND_API_KEY` vides pour le mode log local.
- Les contenus éditoriaux du blog se trouvent dans `content/blog/`.

## Structure rapide
- `app/` : routes (pages, API contact) et layout global.
- `components/` : header, footer, formulaires.
- `lib/` : logique métier (email, blog, calcul PV, validation).
- `content/blog/` : articles Markdown.
- `.github/workflows/ci.yml` : pipeline CI.
