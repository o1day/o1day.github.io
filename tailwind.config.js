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
          100: '#EFEAEA',
          200: '#D8C9CB',
          300: '#C1A9AB',
          400: '#92696C',
          500: '#63282D',
          600: '#592429',
          700: '#3B181B',
          800: '#2D1214',
          900: '#1E0C0E',
        },

        'frangipani': {
          50: '#FFFDFB',
          100: '#FFFBF7',
          200: '#FEF5EB',
          300: '#FDEFDE',
          400: '#FCE4C6',
          500: '#FAD8AD',
          600: '#E1C29C',
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

        'raw-sienna': {
          50: '#FCF8F6',
          100: '#F9F1EC',
          200: '#F1DBD0',
          300: '#E8C6B3',
          400: '#D69B7A',
          500: '#C57041',
          600: '#B1653B',
          700: '#764327',
          800: '#59321D',
          900: '#3B2214',
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

