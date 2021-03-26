import { createTheme } from '@shopify/restyle'

const palette = {
  black: '#0B0B0B',
  white: '#F0F2F3',
}

const theme = createTheme({
  colors: {
    mainBackground: palette.black,
    mainText: palette.white,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
})

export type Theme = typeof theme
export default theme
