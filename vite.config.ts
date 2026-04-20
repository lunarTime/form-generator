import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
    base: '/form-generator/',
    plugins: [vue(), vueDevTools()],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/assets/styles/variables.scss" as *;`
            }
        }
    },
    build: {
        cssCodeSplit: false,
        rollupOptions: {
            output: {
                assetFileNames: 'assets/styles/[name].[hash].[ext]',
                chunkFileNames: 'assets/js/[name].[hash].js',
                entryFileNames: 'assets/js/[name].[hash].js',
            }
        },
        minify: 'esbuild',
        cssMinify: true
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
