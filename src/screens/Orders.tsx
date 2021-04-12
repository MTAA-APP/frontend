import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'

import { Box, Text } from 'ui'
import { RootStackParamList } from 'types/stack'

type Props = StackScreenProps<RootStackParamList, 'Orders'>

const Orders = ({ navigation }: Props) => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text>Orders</Text>
    </Box>
  )
}

export default Orders
