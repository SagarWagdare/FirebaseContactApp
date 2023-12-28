/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        gray:"#5A5959",
        yellow:"#FFEAAE",
        "dark-yellow":"",
        orange:"",
        red:"#D01C28",
        purple:"#5F00D9"

      }
    },
  },
  plugins: [],
}