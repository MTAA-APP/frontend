import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'

import { Box, Text } from 'ui'
import { RootStackParamList } from 'types/stack'

type Props = StackScreenProps<RootStackParamList, 'ServiceSignUp'>

const ServiceSignUp = ({ navigation }: Props) => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text>ServiceSignUp</Text>
    </Box>
  )
}

export default ServiceSignUp