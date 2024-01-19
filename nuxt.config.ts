// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    apiSecretBearer: '',
    public: {
      apiSecretBearer: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGU5NDkxM2U1N2NlNjI2YWQxNWU3N2M3NjAwNzI5OSIsInN1YiI6IjY1YTNjNmEzMzk1NDlhMDEzMjEwYmM0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-ovIJ3QOG-Q3Pw-a85xpxHRCdEVHsBqPZmUmXbSaVe8',
    },
  },
  modules: ['@nuxtjs/google-fonts'],
  googleFonts: {
    useStylesheet: true,
    families: {
      Inter: '400..700',
    }
  }
})
