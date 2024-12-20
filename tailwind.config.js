/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'buccaneer': {
          50: '#F7F4F5',
          100: '#F0EAEA',
          200: '#D9CACB',
          300: '#C2A9AB',
          400: '#94696C',
          500: '#66292D',
          600: '#5C2529',
          700: '#3D191B',
          800: '#2E1214',
          900: '#1F0C0E',
        },

        'frangipani': {
          50: '#FFFDFB',
          100: '#FFFBF7',
          200: '#FEF5EB',
          300: '#FDEFDF',
          400: '#FCE4C6',
          500: '#FAD8AE',
          600: '#E1C29D',
          700: '#968268',
          800: '#71614E',
          900: '#4B4134',
        },

        'brown-rust': {
          50: '#FBF7F5',
          100: '#F8EFEB',
          200: '#EDD7CE',
          300: '#E3BFB1',
          400: '#CD8E76',
          500: '#B85E3B',
          600: '#A65535',
          700: '#6E3823',
          800: '#532A1B',
          900: '#371C12',
        },
      },

      spacing: {
        'xs': '0.25rem',
        'sm': '0.50rem',
        'md': '1rem',
        'lg': '2rem',
        'xl': '4rem',

        'icon-sm': '1.5rem',
        'icon-md': '2rem',
        'icon-lg': '3rem',
      }
    },
  },
  plugins: [],
}

