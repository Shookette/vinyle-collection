export type CollectionConfig = {
  username: string;
  label: string;
};

export type AppConfig = {
  discogsBaseUrl: string;
  collections: CollectionConfig[];
};

// "laureanne.leneel:Laure-Anne,shookete:Jeremy" -> [{ username, label }, ...]
const parseCollections = (value = ""): CollectionConfig[] =>
  value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [username, ...rest] = entry.split(":");
      const label = rest.join(":").trim();
      return { username: username.trim(), label: label || username.trim() };
    });

export const appConfig: AppConfig = {
  discogsBaseUrl: (import.meta.env.VITE_DISCOGS_BASE_URL || "https://api.discogs.com").replace(/\/+$/, ""),
  collections: parseCollections(import.meta.env.VITE_DISCOGS_COLLECTIONS),
};
