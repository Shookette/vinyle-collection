# --- Build ---
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

# Surcharges optionnelles des valeurs du .env (docker build --build-arg ...).
# Pour une nouvelle variable, pas besoin de l'ajouter ici : la mettre dans
# .env / .env.local suffit, Vite les lit automatiquement.
ARG VITE_DISCOGS_BASE_URL
ARG VITE_DISCOGS_COLLECTIONS

# Les build args vides sont retirés pour ne pas écraser les valeurs du .env
RUN for v in VITE_DISCOGS_BASE_URL VITE_DISCOGS_COLLECTIONS; do \
      eval "[ -z \"\$$v\" ] && unset $v"; \
    done; \
    npm run build

# --- Runtime ---
FROM nginx:1.27-alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
