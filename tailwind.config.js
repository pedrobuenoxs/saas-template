/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./server/**/*.jsx", // Include server-side React components
    "./server/**/*.tsx", // Include TypeScript components in the server folder
    "./server/views/**/*.ejs", // Include EJS templates for server rendering
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
