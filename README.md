# mars’up — démo interactive

Prototype de **mars’up**, plateforme sociale et sportive pour étudiants et jeunes adultes à Marseille :
site vitrine, application mobile navigable (inscription, vérification d’identité, matching, activités,
messagerie, carte, événements, notifications, IA mars’up, profil, confidentialité) et tableau de bord
administrateur. Tout tient dans une page HTML statique, sans dépendance.

## Structure

- `src/` — sources découpées (styles, site, données, écrans de l’app, admin)
- `build.sh` — assemble `src/` en `index.html` (page autonome) et `artifact.html` (corps seul)
- `index.html` — page déployée (GitHub Pages / Vercel)
- `logo-mark.png`, `logo-full.png` — logo détouré

## Lancer en local

```bash
sh build.sh
python -m http.server 5190
```

Puis ouvrir http://localhost:5190.

## Déploiement

Site statique : Vercel sert `index.html` à la racine, aucune configuration nécessaire.
