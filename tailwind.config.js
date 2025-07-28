/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#071a12',
        foreground: '#f0fdf4',
        primary: {
          DEFAULT: '#071a12',     // Deep emerald green
          light: '#0c3528',       // Lighter shade for hover states
          dark: '#04120c',        // Darker shade for active states
          foreground: '#f0fdf4',  // Text color on primary
        },
        accent: {
          DEFAULT: '#14532d',     // Dark green
          light: '#1a7a40',
          dark: '#0f3d1f',
          foreground: '#f0fdf4',  // Text color on accent
        },
        text: {
          primary: '#f0fdf4',     // Soft white
          secondary: '#d1fae5',   // Muted green-white
        },
        trust: {
          DEFAULT: '#d1b86a',     // Soft gold for trusted elements
          light: '#e8d9a9',
          dark: '#b39a4d',
          foreground: '#1a1a1a',  // Text color on trust elements
        },
        border: 'rgba(240, 253, 244, 0.1)',
        input: 'rgba(240, 253, 244, 0.05)',
        ring: '#14532d',
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        arabic: ['Amiri', 'serif'],
      },
      backgroundImage: {
        'geometric-pattern': "url('/images/geometric-pattern.svg')",
        'crescent-moon': "url('/images/crescent-moon.svg')",
      },
      boxShadow: {
        'glow': '0 0 15px rgba(16, 185, 129, 0.3)',
        'glow-lg': '0 0 25px rgba(16, 185, 129, 0.4)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
