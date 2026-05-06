import { themeTokens } from './src/styles/theme.js'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: themeTokens.colors,
      fontFamily: themeTokens.fontFamily,
      boxShadow: themeTokens.boxShadow,
      borderRadius: themeTokens.borderRadius,
      spacing: themeTokens.spacing,
    },
  },
  plugins: [],
}
