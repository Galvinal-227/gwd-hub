/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        border: '#e5e5e5',
        muted: '#737373',
        surface: '#ffffff',
      },
      backgroundColor: {
        light: '#fafafa',
        dark: '#1a1a1a',
      },
    },
  },
  plugins: [],
}