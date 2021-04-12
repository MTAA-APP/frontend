import React from 'react'
import { StackHeaderTitleProps } from '@react-navigation/stack'

import { Text } from 'ui'

const Title = ({ children: title }: StackHeaderTitleProps) => (
  <Text marginTop="xl" variant="subtitle" textAlign="center">
    {title}
  </Text>
)

export default Title
