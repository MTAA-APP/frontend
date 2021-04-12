import React from 'react'
import { TouchableRipple } from 'react-native-paper'
import {
  createRestyleComponent,
  createVariant,
  VariantProps,
} from '@shopify/restyle'

import Text from './Text'

import { Theme } from 'styles/theme'

type Variant = VariantProps<Theme, 'buttonVariants'>

type Props = Variant & {
  title: string
  onPress: () => void
}

const variant = createVariant({
  themeKey: 'buttonVariants',
  defaults: {
    paddingVertical: 'm',
    paddingHorizontal: 's',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'm',
  },
})

const Wrapper = createRestyleComponent<Variant, Theme>(
  [variant],
  TouchableRipple
)

const Button = ({ title, onPress, variant = 'primary', ...rest }: Props) => (
  <Wrapper {...{ onPress, variant, ...rest }}>
    <Text variant="button">{title}</Text>
  </Wrapper>
)

export default Button
