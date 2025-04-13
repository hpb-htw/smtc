import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    root: "./",
    base:"./",
    mode: "production",
    build: {
        lib: {
            entry: {
                "index":resolve(__dirname, "./lib/index.js"),
                "syntax-highlight": resolve(__dirname, "./lib/syntax-highlight.js"),
            },
            cssFileName: "demo",
            name: "demo"
        },
        outDir: "docs/lib",
        emptyOutDir: true,
        sourcemap: true
    },
})
