import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    root: "./",
    base:"./",
    mode: "production",
    build: {
        outDir: "www",
        emptyOutDir: true,
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'index.html'),
                syntaxHighlight: resolve(__dirname, 'syntax-highlight.html'),
                minifyCode: resolve(__dirname, 'minify-code.html')
            }
        }
    },
})
