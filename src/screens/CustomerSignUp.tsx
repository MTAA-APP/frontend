import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'

import { Box, Text } from 'ui'
import { RootStackParamList } from 'types/stack'

type Props = StackScreenProps<RootStackParamList, 'CustomerSignUp'>

const CustomerSignUp = ({ navigation }: Props) => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text>CustomerSignUp</Text>
    </Box>
  )
}

export default CustomerSignUp
