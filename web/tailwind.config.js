/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['inter', 'serif'],
      },
      colors: {
        dark: '#000',
        lightDark: '#333533',
        darkBody: '#1f2224',
        darkGray: '#212529',
        smothDark: '#141516',
        darkRed: '#e03131',
        lightRed: '#ff6b6b',
        iconRed: '#f03e3e',
        success: '#37b24d',
        facebook: '#3c5484',
        lighterFacebook: '#7d97cd',
        twitter: '#00acee',
        youtube: '#fd1d1d',
        lightBlue: '#1DA1F2',
        lighertBlue: '#74c0fc',
        lightGray: '#adb5bd',
        grayWhite: '#f1f3f5',
        whiteElphent: '#e4ebf5',
        whiteMilk: '#e6e8ea',
        stars: "#e59819",
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
