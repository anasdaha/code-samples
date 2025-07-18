## Requirements
- [Node.js](https://nodejs.org/)

## Features
- [Astro](https://astro.build/)
- [LightningCSS](https://lightningcss.dev/)

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

## Project Structure
- `src/pages`: Contains the main pages of the project.
- `src/components`: Contains reusable components like `Accordion.astro`, `Alert.astro`, `CascadeHeader.astro`, etc.
- `src/scripts`: Contains JavaScript/TypeScript files for additional functionality.
- `src/styles`: Contains CSS files for styling the components and pages.
- `public/assets`: Contains static assets like images and JSON files.

## Additional Information
- The project uses `astro.config.mjs` for Astro configuration.
- TypeScript is configured using `tsconfig.json`.
- Environment variables can be defined in `env.d.ts`.
