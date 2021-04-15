import { createTheme } from '@shopify/restyle'

const palette = {
  black: '#000000',
  white: '#FFFFFF',
  transparent: 'rgba(255, 255, 255, 0)',

  lightGrey: '#FBFBFB',
  grey: '#C3C8D3',
  darkGrey: '#272D2F',
  selected: '#9099B6',

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
    secondary: palette.green,
    label: palette.grey,
    transparent: palette.transparent,
    selected: palette.selected,
  },

  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    ml: 20,
    l: 24,
    xl: 30,
    xxl: 72,
    xxxl: 110,
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
      fontSize: 14,
      lineHeight: 18,
      color: 'label',
    },
    label: {
      fontFamily: 'Rubik_400Regular',
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 15,
      color: 'label',
    },
    button: {
      fontFamily: 'Rubik_500Medium',
      fontWeight: '500',
      fontSize: 18,
      color: 'background',
    },
    error: {
      fontFamily: 'Rubik_400Regular',
      fontWeight: '400',
      fontSize: 12,
      color: 'primary',
    },
    item: {
      fontFamily: 'Rubik_500Medium',
      fontWeight: '500',
      fontSize: 20,
      lineHeight: 26,
      color: 'title',
    },
    order: {
      fontFamily: 'Rubik_500Medium',
      fontWeight: '500',
      fontSize: 18,
      lineHeight: 24,
      color: 'title',
    },
    input: {
      fontFamily: 'Rubik_400Regular',
      fontSize: 15,
    },
  },

  buttonVariants: {
    primary: {
      backgroundColor: 'primary',
    },
  },
})

export type Theme = typeof theme
export default theme
