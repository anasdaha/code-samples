import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  compressHTML: false,
  build: {
    format: 'file',
  },
  devToolbar: {
    enabled: false,
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
      cssCodeSplit: true,
      minify: false,
      rollupOptions: {
        output: {
          entryFileNames: 'assets/script.js',
          assetFileNames: ({ name }) =>
            name?.endsWith('.css')
              ? name.includes('cascade')
                ? 'assets/cascade.css'
                : 'assets/all.css'
              : 'assets/[name][extname]'
        }
      }
    },
    css: {
      transformer: 'lightningcss',
    }
  }
});
