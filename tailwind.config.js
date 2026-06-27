/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#ffdbb5',
          300: '#ffbe85',
          400: '#ff9947',
          500: '#ff7714', // Classic saffron
          600: '#e05a00',
          700: '#b84300',
          800: '#913504',
          900: '#732c07',
        },
        turmeric: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15', // Warm turmeric yellow
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
