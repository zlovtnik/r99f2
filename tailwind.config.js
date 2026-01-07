/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#1e40af',
        accent: '#f59e0b',
        'bg-dark': '#1f2937',
        'bg-light': '#f9fafb',
      },
    },
  },
  plugins: [],
};
