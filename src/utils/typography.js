import Typography from "typography"

const typography = new Typography({
  baseFontSize: '14px',
  bodyFontFamily: [
    '-apple-system', 'BlinkMacSystemFont',
    'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    'sans-serif'
  ],
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    img: {
      marginBottom: 0,
    },
  })
})

export default typography
