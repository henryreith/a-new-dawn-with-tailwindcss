/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: [
    './layout/*.liquid',
    './templates/*.liquid',
    './templates/customers/*.liquid',
    './sections/*.liquid',
    './snippets/*.liquid',
  ],
  theme: {
    screens: {
      sm: '320px',
      md: '750px',
      lg: '990px',
      xlg: '1200px',
      pageMaxWidth: '1300px',
    },
    extend: {
      fontFamily: {
        heading: 'var(--font-heading-family)',
      },
    },
    color: {
      black: '#000000',
    },
  },
  plugins: [],
};
