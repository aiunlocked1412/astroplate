# Project: AIUnlocked Blog

## Project Overview

This project is a blog built with the Astro framework. It uses Tailwind CSS for styling and TypeScript for type-safety. The blog content is written in Markdown and MDX.

The project is based on the "Astroplate" starter template, which provides features like:

*   Multi-author support
*   Search functionality
*   Dark mode
*   Tags and categories for blog posts
*   Contact form
*   Syntax highlighting for code blocks

## Building and Running

The project uses Yarn for package management. The following commands are used for building and running the project:

*   `yarn install`: Installs the project dependencies.
*   `yarn dev`: Starts the development server.
*   `yarn build`: Builds the project for production.
*   `yarn preview`: Previews the production build locally.

## Development Conventions

*   **Formatting:** The project uses Prettier for code formatting. The command `yarn format` can be used to format the entire codebase.
*   **Content:** Blog posts and other content are written in Markdown and MDX files located in the `src/content` directory.
*   **Data:** The `scripts/jsonGenerator.js` script suggests that some data is generated into JSON files. This is a common pattern in static site generators to make data available to the frontend.
*   **Styling:** The project uses Tailwind CSS for styling. The configuration is in `tailwind.config.js`.
*   **Astro Configuration:** The main Astro configuration is in `astro.config.mjs`. This file defines the site's base URL, integrations, and Markdown settings.
