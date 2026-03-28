/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0a0e1a',
          secondary: '#0d1117',
          dark: '#080c14',
          darkest: '#06080f',
        },
        blue: {
          accent: '#0ea5e9',
          deep: '#1d4ed8',
          muted: '#3b82f6',
          dim: '#1e40af',
        },
        text: {
          primary: '#f8fafc',
          secondary: '#94a3b8',
          muted: '#64748b',
          dim: '#475569',
          darkest: '#334155',
        },
      },
    },
  },
  plugins: [],
};
