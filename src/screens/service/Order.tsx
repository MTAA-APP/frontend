import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'

import { RootStackParamList } from 'types/stack'
import { Box, Text } from 'ui'

type Props = StackScreenProps<RootStackParamList, 'Order'>

const Order = ({ navigation, route: { params } }: Props) => {
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Text>Order detail</Text>
      <Text variant="label">{params?.id}</Text>
    </Box>
  )
}

export default Order
