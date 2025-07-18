## Requirements
- [Node.js](https://nodejs.org/)

## Features
- [Astro](https://astro.build/)
- [PostCSS](https://postcss.org/)

## Build Process

### Initial Setup
- Install build process dependencies by running `npm ci` from the project root

### Development
- Watch files and rebuild on change by running `npm run dev` from the project root
- Starts a local server that automatically reloads connected browsers

### Production
- Create an optimized build by running `npm run build` from the project root
- Run before deploying to a production environment

## Static Files
- The contents of `public` will be copied to the build root
- Store images within `public/assets` to have them available to build process tools

## Astro
- Store partials within `src/layouts` and `src/components`

## PostCSS
- [postcss-preset-env](https://preset-env.cssdb.org/)
