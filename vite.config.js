import {fileURLToPath, URL} from 'url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import resolveExtensionVue from 'vite-plugin-resolve-extension-vue';

export default defineConfig({
  plugins: [vue(), resolveExtensionVue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
  },
  base: process.env.NODE_ENV === 'production'
      ? '/cryptonomicon/'
      : './',
})
