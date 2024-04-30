/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        verdePrincipal: "#214E34",
        laranjaPrincipal: "#E59949",
        verdeMaisEscuro: "#193B28"
      },
      padding:{
        xGeralPc: "100px",
        xGeralMobile: "20px",
        yGeralPc: "60px",
        yGeralMobile: "12px"
      },
      width: {
        larguraFotoSlide: "22vw",
        larguraFotoSlideMobile: "80vw"
      },
      height: {
        alturaFotoSlide: "300px",
        alturaFotoSlideMobile: "200px"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

