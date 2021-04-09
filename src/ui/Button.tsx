import React from 'react'
import { useTheme } from '@shopify/restyle'
import { BaseButton } from 'react-native-gesture-handler'

import Box from './Box'
import Text from './Text'
import { Theme } from 'styles/theme'

type Props = {
  title: string
  onPress: () => void
}

const Button = ({ title, onPress, ...rest }: Props) => {
  const theme = useTheme<Theme>()

  return (
    <BaseButton {...{ onPress, ...rest }}>
      <Box accessible>
        <Text>{title}</Text>
      </Box>
    </BaseButton>
  )
}

export default Button
