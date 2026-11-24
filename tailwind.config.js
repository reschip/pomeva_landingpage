/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        citrus: {
          coral: '#FF786B',
          coralDeep: '#C94437',
          orange: '#FFB45E',
          orangeDeep: '#B86214',
          lemon: '#F5D86E',
          offwhite: '#F9F4E9',
          sand: '#F2EAD8',
          graphite: '#252A29',
          graphiteSoft: '#313736',
          muted: '#555D5B',
          mutedLight: '#C9C4B8',
        },
      },
    },
  },
  plugins: [],
}
