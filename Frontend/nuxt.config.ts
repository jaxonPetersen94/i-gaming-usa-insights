// nuxt.config.js
export default defineNuxtConfig({
  devtools: { enabled: true },
  googleFonts: {
    families: {
      Avenir: true,
    },
  },
  modules: ['@nuxtjs/google-fonts', '@pinia/nuxt'],
});
