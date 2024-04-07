export default defineNuxtConfig({
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],
  devtools: { enabled: true },
  googleFonts: {
    families: {
      Avenir: true,
    },
  },
  modules: ['@nuxtjs/google-fonts', '@pinia/nuxt'],
});
