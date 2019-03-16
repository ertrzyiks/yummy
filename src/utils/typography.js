import Typography from 'typography'

const typography = new Typography({
  baseFontSize: '16px',
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
    ul: {
      marginBottom: 0,
    },
    'p:last-child': {
      marginBottom: 0,
    },
    'li:last-child': {
      marginBottom: 0,
    }
  })
})

export default typography
