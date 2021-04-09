import React from 'react'
import { useTheme } from '@shopify/restyle'
import { TextInput } from 'react-native'

import Box from './Box'
import Text from './Text'

import { Theme } from 'styles/theme'

type Props = {
  label: string
  value: string
  onChangeText: () => void
}

const Input = ({ label, value, onChangeText, ...rest }: Props) => {
  const theme = useTheme<Theme>()

  return (
    <Box {...rest}>
      <Text>{label}</Text>
      <TextInput {...{ value, onChangeText }} />
    </Box>
  )
}

export default Input
