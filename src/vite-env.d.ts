/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DISCOGS_BASE_URL?: string;
  readonly VITE_DISCOGS_COLLECTIONS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
