// Configuration par défaut (dev local et Firebase Hosting).
// En Docker, ce fichier est régénéré au démarrage du conteneur à partir
// des variables d'environnement (voir docker/40-generate-config.sh).
window.__APP_CONFIG__ = {
  discogsBaseUrl: "https://api.discogs.com",
  collections: [
    { username: "laureanne.leneel", label: "Laure-Anne" },
    { username: "shookete", label: "Jeremy" },
  ],
};
