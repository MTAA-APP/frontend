import React from 'react'
import { TouchableOpacity } from 'react-native'

import Box from './Box'
import Text from './Text'

type Props = {
  title: string
  onPress: () => void
  style?: {}
}

const Button = ({ title, onPress, ...rest }: Props) => (
  <TouchableOpacity {...{ onPress, ...rest }}>
    <Box
      accessible
      paddingVertical="m"
      paddingHorizontal="xxl"
      borderRadius={50}
      alignItems="center"
      justifyContent="center"
      backgroundColor="primary"
    >
      <Text variant="button">{title}</Text>
    </Box>
  </TouchableOpacity>
)

export default Button
