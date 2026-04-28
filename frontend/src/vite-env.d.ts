/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_LOGO_DEV_PUBLISHABLE_KEY: string;
  // add more env vars here when you actually use them
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}