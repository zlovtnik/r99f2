/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50', // Medium Sea Green - Headers, Logos
        secondary: '#AED581', // Light Green - Accents, Icons
        accent: '#FFA726', // Soft Orange - CTAs, Buttons
        neutral: {
          dark: '#616161', // Slate Gray - Text, Borders
          light: '#F1F8E9', // Pale Green - Backgrounds, Cards
          alt: '#F5F5DC', // Beige - Highlights, Hover
        },
        'bg-dark': '#1f2937',
        'bg-light': '#f9fafb',
      },
    },
  },
  plugins: [],
};
