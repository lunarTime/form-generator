import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
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
                assetFileNames: 'assets/styles/[name].[ext]'
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
