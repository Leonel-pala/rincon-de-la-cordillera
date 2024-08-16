import { ThemeProvider } from 'react-bootstrap';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman',
    },
    extend: {
      backgroundPosition: {
        'bottom-70': 'center 70%',
      },
      colors: {
        primary: {
          DEFAULT: '#008458',
          foreground: '#58B194',
          third: '#106347',
        },
        second: {
          DEFAULT: '#D4E9E2',
          foreground: '#ECECEC',
        },
        header: {
          DEFAULT: '#E6E6E6',
          admin: '#46B18E',
        },
        third: {
          DEFAULT: '#003D29',
          foreground: '#ECECEC',
        },
        error: {
          DEFAULT: '#FF0000',
          foreground: '#DAECD5',
        },
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
