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
    fontSize: {
      xs: '1rem', // 10px
      sm: '1.2rem', // 12px
      smd: '1.4rem', // 14px
      base: '1.5rem', // 15px
      xl: 'calc(1.7rem * var(--font-heading-scale))',
      '2xl': 'calc(2rem * var(--font-heading-scale))',
      '3xl': 'calc(3rem * var(--font-heading-scale))',
      '4xl': 'calc(4rem * var(--font-heading-scale))',
      '5xl': 'calc(5rem * var(--font-heading-scale))',
    },
    extend: {
      fontFamily: {
        heading: 'var(--font-heading-family)',
      },
      fontSize: {
        // Custom Heading Sizes for Mobile
        hxl: 'calc(5rem * var(--font-heading-scale))', // Custom class for extra large heading
        h0: 'calc(4rem * var(--font-heading-scale))', // Custom class for large heading
        h1: 'calc(3rem * var(--font-heading-scale))', // h1 size
        h2: 'calc(2rem * var(--font-heading-scale))', // h2 size
        h3: 'calc(1.7rem * var(--font-heading-scale))', // h3 size
        h4: 'calc(1.5rem * var(--font-heading-scale))', // h4 size
        h5: 'calc(1.2rem * var(--font-heading-scale))', // h5 size
        h6: 'calc(1rem * var(--font-heading-scale))',  // h6 size
      },
    },
    color: {
      black: '#000000',
    },
  },
  plugins: [
    
  ],
};
