/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
        },
      },
      boxShadow: {
        card: "0 10px 25px -10px rgba(0,0,0,.15)",
      },
      borderRadius: {
        xl: "14px",
      },
    },
  },
  plugins: [],
};