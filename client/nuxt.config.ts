// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  ssr: false,

  runtimeConfig: {
    public: {
      apiBase: "http://localhost:3001",
    },
  },
});
