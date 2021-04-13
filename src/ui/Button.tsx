import React from 'react'
import {
  createRestyleComponent,
  createVariant,
  VariantProps,
} from '@shopify/restyle'

import Text from './Text'

import { Theme } from 'styles/theme'
import { TouchableOpacity } from 'react-native-gesture-handler'

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
  TouchableOpacity
)

const Button = ({ title, onPress, variant = 'primary', ...rest }: Props) => (
  <Wrapper {...{ onPress, variant, ...rest }}>
    <Text variant="button">{title}</Text>
  </Wrapper>
)

export default Button
