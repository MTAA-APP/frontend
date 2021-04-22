import React, { useCallback, useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { ActivityIndicator } from 'react-native'

import { Box, Button, Text } from 'ui'
import { Order, OrderInfo } from 'types/datamodels'

import { GET_CART_INFO } from 'apollo/queries'
import { useNavigation } from '@react-navigation/core'

type OrderI = Order & {
  items: OrderInfo
}

type QueryType = { cart: OrderI }

const BottomCart = () => {
  const navigation = useNavigation()

  const { data, loading } = useQuery<QueryType>(GET_CART_INFO)

  const isEmpty = useMemo(() => !data?.cart?.id, [data, loading])
  const toCart = useCallback(() => navigation.navigate('Cart'), [navigation])

  return (
    <Box
      borderTopLeftRadius={18}
      borderTopRightRadius={18}
      padding="xl"
      backgroundColor="title"
      elevation={1}
    >
      {loading ? (
        <ActivityIndicator style={{ marginBottom: 16 }} color="#FFF" />
      ) : (
        !isEmpty && (
          <Box marginBottom="m">
            <Text
              fontFamily="Rubik_500Medium"
              color="background"
              fontSize={16}
              marginBottom="xs"
            >
              Order in {data?.cart?.service?.name}
            </Text>
            <Text>
              {data?.cart?.items?.count} items for {data?.cart?.items?.price} €
              in cart
            </Text>
          </Box>
        )
      )}

      <Button
        title={!loading && !isEmpty ? 'Finish order' : 'Show cart'}
        onPress={toCart}
      />
    </Box>
  )
}

export default BottomCart
