/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      variants: {
        extend: {
          scale: ['checked'],
          borderWidth: ['focus']
        }
      },
      colors: {
        'blue': 'rgba(70, 134, 229, 1)',
        'bg-blue':'rgba(70, 134, 229, 0.25)',
        'bg-gray': '#727272',
        'border': 'rgba(0, 0, 30, 0.6)',
        'borderGray': '#B6B6B6'
      },
      fontFamily: {
        'poppins': ['poppins', 'serif']
      },
      backgroundImage: {
        'building': "url('/src/assets/background.png')",
        'gradientBlue': "linear-gradient(115deg, #5efce8, #736efe)"
      }
    },
  },
  plugins: [],
}

