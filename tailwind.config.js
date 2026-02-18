/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        joyn: {
          orange: '#FD5C1E',
          red: '#D72C0D',
          navy: '#003882',
          blue: '#87ADEF',
          cream: '#FFF8F4',
          dark: '#0D0D0D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'joyn-gradient': 'linear-gradient(135deg, #FD5C1E 0%, #D72C0D 50%, #003882 100%)',
        'joyn-warm': 'linear-gradient(135deg, #FFF8F4 0%, #FFE8DC 100%)',
      }
    },
  },
  plugins: [],
}
