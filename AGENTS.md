# AI Unlocked Blog - Agent Guidelines

## Commands

- `yarn dev` - Start development server (runs jsonGenerator first)
- `yarn build` - Build for production (runs jsonGenerator first)
- `yarn check` - Run Astro type checking
- `yarn format` - Format code with Prettier
- `yarn generate-json` - Generate JSON from markdown content

## Code Style

- Use TypeScript with strict mode enabled
- Import aliases: `@/components/*`, `@/shortcodes/*`, `@/helpers/*`, `@/partials/*`, `@/*`
- Astro components use `.astro` extension, React components use `.tsx`
- Follow Prettier configuration (astro and tailwind plugins)
- Dark theme is primary - always use `dark:` variants for text colors
- Use `text-gray-800 dark:text-gray-100` for main text, never `text-black`
- Components auto-imported from shortcodes directory
- Handle missing types with declaration files when needed

## File Structure

- Content in `/src/content/` with markdown files
- Components in `/src/layouts/components/`
- Styles in `/src/styles/` with TailwindCSS
- Config files in `/src/config/`

## Important Notes

- This is a Thai AI education website (aiunlockinnovations.com)
- Always check dark mode contrast for text colors
- Use `prose dark:prose-invert` for markdown content styling
