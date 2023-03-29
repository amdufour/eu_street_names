import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte';
import preprocess from 'svelte-preprocess';
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const filePath = dirname(fileURLToPath(import.meta.url))
const sassPath = `${filePath}/src/`

// https://vitejs.dev/config/
export default defineConfig({
  base: "/eu_street_names/",
  plugins: [
    svelte({
      preprocess: preprocess({
        scss: {
          prependData: `@import '${sassPath}styles.scss';`
        }
      })
    })
  ],
})
