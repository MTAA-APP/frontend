import { createTheme } from '@shopify/restyle'

const palette = {
  black: '#000000',
  white: '#FFFFFF',

  lightGrey: '#FBFBFB',
  grey: '#C3C8D3',
  darkGrey: '#272D2F',

  red: '#F36769',
  green: '#92C255',
}

const theme = createTheme({
  colors: {
    black: palette.black,
    white: palette.white,
    title: palette.darkGrey,
    background: palette.lightGrey,
    primary: palette.red,
    label: palette.grey,
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

  textVariants: {
    title: {
      fontFamily: 'Rubik_500Medium',
      fontWeight: '500',
      fontSize: 36,
      lineHeight: 43,
      color: 'title',
    },
    subtitle: {
      fontFamily: 'Rubik_500Medium',
      fontWeight: '500',
      fontSize: 24,
      lineHeight: 28,
      color: 'title',
    },
    body: {
      fontFamily: 'Rubik_400Regular',
      fontWeight: '400',
      fontSize: 15,
      lineHeight: 19,
      color: 'label',
    },
    label: {
      fontFamily: 'Rubik_400Regular',
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 15,
      color: 'label',
    },
  },
})

export type Theme = typeof theme
export default theme
