/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './src/pages/admin/**/*.{astro,html,js,ts}',
    './src/layouts/AdminLayout.astro',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}
