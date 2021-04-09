import React from 'react'
import { StackHeaderTitleProps } from '@react-navigation/stack'

import { Box, Text } from 'ui'

const Header = ({ children: title }: StackHeaderTitleProps) => {
  return (
    <Box>
      <Text>{title}</Text>
    </Box>
  )
}

export default Header
