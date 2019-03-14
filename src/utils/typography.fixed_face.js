import Typography from 'typography'
import theme from './theme'

const typography = new Typography({
  ...theme,
  bodyFontFamily: ['Roboto'],
  googleFonts: [
    {
      name: 'Roboto',
      styles: [
        '300',
        '400',
        '500',
        '600',
        '700'
      ],
    }
  ]
})

export default typography
