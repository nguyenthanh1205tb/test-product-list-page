/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      spacing: {
        13: '3.25rem',
        15: '3.75rem',
        114: '24rem',
        120: '28rem',
        128: '32rem',
        144: '36rem',
      },
      screens: {
        xs: '425px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@headlessui/tailwindcss')({ prefix: 'hl' })],
};
