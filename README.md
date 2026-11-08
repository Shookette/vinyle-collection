# Vinyle Collection

Affiche les collections Discogs d'un ou plusieurs utilisateurs.

## Développement

```sh
npm install
npm run dev
```

En local (et sur Firebase Hosting), la configuration est lue depuis `public/config.js`.

## Déploiement Docker (ex : NAS)

L'image sert l'application via nginx. La configuration est générée **au démarrage
du conteneur** à partir des variables d'environnement : pas besoin de rebuilder
l'image pour changer les collections.

| Variable              | Défaut                    | Description                                                                 |
| --------------------- | ------------------------- | --------------------------------------------------------------------------- |
| `DISCOGS_BASE_URL`    | `https://api.discogs.com` | URL de l'API Discogs                                                        |
| `DISCOGS_COLLECTIONS` | _(vide)_                  | Liste `utilisateur:Libellé` séparée par des virgules (libellé facultatif)  |

### Avec docker compose

```sh
docker compose up -d --build
```

Puis ouvrir http://localhost:8080 (voir `docker-compose.yml` pour modifier le port et les variables).

### Avec docker run

```sh
docker build -t vinyle-collection .
docker run -d -p 8080:80 \
  -e DISCOGS_COLLECTIONS="laureanne.leneel:Laure-Anne,shookete:Jeremy" \
  vinyle-collection
```
