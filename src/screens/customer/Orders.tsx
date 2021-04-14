import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'

import { RootStackParamList } from 'types/stack'
import { Box, Text } from 'ui'

type Props = StackScreenProps<RootStackParamList, 'MyOrders'>

const Orders = ({ navigation }: Props) => {
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Text>My orders</Text>
    </Box>
  )
}

export default Orders
