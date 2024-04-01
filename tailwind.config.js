const plugin = require('tailwindcss/plugin')
const withMT = require("@material-tailwind/react/utils/withMT");
const flexCenterBaseStyles = {
  display: 'flex',
  'justify-content': 'center',
  'align-items': 'center',
}

module.exports =withMT({
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors:{
      'white':"#ffffff",
      'header':'#191919',
      'font':'#A7A7A7',
      'connect':'#CFFF8B',
      'btn':'##252A1E',
      'card':'#303030',
      'line':'#595959',
      'layer':'#454545',
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
   
    extend: {
      fontFamily: {
        pix: "'Press Start 2P'",
      },
      fontSize:{
         bd:'1.4rem',
      },
      padding:{
        '18rem': '4.5rem',
        '19rem': '4.75rem',
        '20rem': '5rem',
      },
      paddingTop:{
        '18rem': '4.5rem',
        '19rem': '4.75rem',
        '20rem': '5rem',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.flex-row-center': flexCenterBaseStyles,
        '.flex-col-center': { ...flexCenterBaseStyles, 'flex-direction': 'column' },
      })
    }),
  ],
});
