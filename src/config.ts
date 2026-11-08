export type CollectionConfig = {
  username: string;
  label: string;
};

export type AppConfig = {
  discogsBaseUrl: string;
  collections: CollectionConfig[];
};

declare global {
  interface Window {
    __APP_CONFIG__?: Partial<AppConfig>;
  }
}

const runtimeConfig = window.__APP_CONFIG__ ?? {};

export const appConfig: AppConfig = {
  discogsBaseUrl: (runtimeConfig.discogsBaseUrl || "https://api.discogs.com").replace(/\/+$/, ""),
  collections: runtimeConfig.collections ?? [],
};
