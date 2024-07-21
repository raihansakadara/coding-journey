// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@vite-pwa/nuxt'],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Tutorial Lucia Auth',
      display: 'standalone',
      background_color: '#ffffff',
      short_name: 'lucia',
      lang: 'en',
      scope: '/',
      start_url: '/signin',
      theme_color: '#ffffff',
    },
  },
})
