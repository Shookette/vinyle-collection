#!/bin/sh
# Génère /usr/share/nginx/html/config.js à partir des variables d'environnement.
# Exécuté automatiquement par l'entrypoint de l'image nginx officielle.
#
#   DISCOGS_BASE_URL     URL de l'API Discogs (défaut : https://api.discogs.com)
#   DISCOGS_COLLECTIONS  Liste "utilisateur:Libellé" séparée par des virgules
#                        ex : "laureanne.leneel:Laure-Anne,shookete:Jeremy"
#                        (si le libellé est omis, le nom d'utilisateur est utilisé)
set -eu

CONFIG_FILE="/usr/share/nginx/html/config.js"
BASE_URL="${DISCOGS_BASE_URL:-https://api.discogs.com}"
COLLECTIONS="${DISCOGS_COLLECTIONS:-}"

json_escape() {
  printf '%s' "$1" | sed -e 's/\\/\\\\/g' -e 's/"/\\"/g'
}

trim() {
  printf '%s' "$1" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//'
}

entries=""
OLD_IFS="$IFS"
IFS=','
for entry in $COLLECTIONS; do
  entry="$(trim "$entry")"
  [ -z "$entry" ] && continue
  case "$entry" in
    *:*) username="${entry%%:*}"; label="${entry#*:}" ;;
    *)   username="$entry";       label="$entry" ;;
  esac
  username="$(trim "$username")"
  label="$(trim "$label")"
  [ -z "$label" ] && label="$username"
  entries="${entries}    { \"username\": \"$(json_escape "$username")\", \"label\": \"$(json_escape "$label")\" },
"
done
IFS="$OLD_IFS"

if [ -z "$entries" ]; then
  echo "40-generate-config.sh: WARNING - DISCOGS_COLLECTIONS est vide, aucune collection ne sera affichée" >&2
fi

cat > "$CONFIG_FILE" <<JS
window.__APP_CONFIG__ = {
  "discogsBaseUrl": "$(json_escape "$BASE_URL")",
  "collections": [
${entries}  ]
};
JS

echo "40-generate-config.sh: config.js généré ($CONFIG_FILE)"
