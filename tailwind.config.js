module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '440px',

        sm: '640px',
        // => @media (min-width: 640px) { ... }

        ml: '768px',
        // => @media (min-width: 768px) { ... }

        lg: '1024px',
        // => @media (min-width: 1024px) { ... }

        xl: '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      spacing: {
        '1/2': '50%',
        '1/2vh': '50vh',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '2/3vh': '66.66667vh',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.666667%',
        '2/6': '33.333333%',
        '3/6': '50%',
        '4/6': '66.666667%',
        '5/6': '83.333333%',
        '1/7': '14.28571428571429%',
        '1/8': '12.5%',
        '1/12': '8.333333%',
        '2/12': '16.666667%',
        '3/12': '25%',
        '4/12': '33.333333%',
        '5/12': '41.666667%',
        '6/12': '50%',
        '7/12': '58.333333%',
        '8/12': '66.666667%',
        '9/12': '75%',
        '10/12': '83.333333%',
        '11/12': '91.666667%',
        '2xs': '512px',
        xs: '576px',
        sm: '640px',
        md: '768px',
        ml: '900px',
        lg: '1024px',
        xl: '1280px',
        full: '100%',
        auto: 'auto',
        'screen-minus-navbar': 'calc(100vh - 64px)',
      },
      maxWidth: (theme, { breakpoints }) => ({
        ...theme('spacing'),
      }),
      minWidth: (theme, { breakpoints }) => ({
        ...theme('spacing'),
      }),
      minHeight: (theme, { breakpoints }) => ({
        ...theme('spacing'),
      }),
      maxHeight: (theme, { breakpoints }) => ({
        ...theme('spacing'),
      }),
    },
  },
  plugins: [],
}
