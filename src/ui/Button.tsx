import React from 'react'
import {
  createRestyleComponent,
  createVariant,
  VariantProps,
} from '@shopify/restyle'
import { TouchableOpacity } from 'react-native-gesture-handler'

import Text from './Text'

import { Theme } from 'styles/theme'

type Variant = VariantProps<Theme, 'buttonVariants'>

type Props = Variant & {
  title: string
  onPress: () => void
  style?: {}
}

const variant = createVariant({
  themeKey: 'buttonVariants',
  defaults: {
    width: '100%',
    paddingVertical: 'm',
    paddingHorizontal: 'xxl',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
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
