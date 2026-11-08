# Vinyle Collection

Affiche les collections Discogs d'un ou plusieurs utilisateurs.

## Développement

```sh
npm install
npm run dev
```

## Configuration

La configuration passe par des variables d'environnement Vite (préfixe `VITE_`),
**injectées au moment du build**. Les valeurs par défaut sont dans `.env`.
Pour les surcharger sans les commiter, créer un `.env.local` (ignoré par git).

| Variable                   | Description                                                                |
| -------------------------- | -------------------------------------------------------------------------- |
| `VITE_DISCOGS_BASE_URL`    | URL de l'API Discogs (défaut : `https://api.discogs.com`)                  |
| `VITE_DISCOGS_COLLECTIONS` | Liste `utilisateur:Libellé` séparée par des virgules (libellé facultatif) |

Pour ajouter une variable : la déclarer dans `.env` et dans `src/vite-env.d.ts`,
puis l'utiliser via `import.meta.env.VITE_...`.

## Déploiement Docker (ex : NAS)

L'image est construite avec les valeurs du `.env` / `.env.local`, puis servie par nginx.
Changer une valeur nécessite de reconstruire l'image.

### Avec docker compose

```sh
docker compose up -d --build
```

Puis ouvrir http://localhost:8080. Les `build.args` de `docker-compose.yml` permettent
de surcharger les valeurs du `.env`.

### Avec docker build

```sh
docker build -t vinyle-collection \
  --build-arg VITE_DISCOGS_COLLECTIONS="laureanne.leneel:Laure-Anne,shookete:Jeremy" .
docker run -d -p 8080:80 vinyle-collection
```
