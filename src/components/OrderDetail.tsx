import React from 'react'
import { FlatList } from 'react-native'

import { Box, Text } from 'ui'
import { OrderInfo, OrderItem } from 'types/datamodels'
import { keyIdExtractor } from 'utils/functions'

type Props = {
  listKey: string
  items: OrderItem[]
  total: OrderInfo
}

const OrderDetail = ({ listKey, items, total }: Props) => {
  return (
    <FlatList
      listKey={listKey}
      data={items}
      keyExtractor={keyIdExtractor}
      ListFooterComponent={() => (
        <Box paddingTop="s">
          <Box
            borderTopColor="label"
            borderTopWidth={1}
            borderStyle="dashed"
            borderRadius={1}
            flexDirection="row"
            paddingTop="s"
          >
            <Box flex={4}>
              <Text fontFamily="Rubik_500Medium">Total</Text>
            </Box>
            <Box flex={1} paddingHorizontal="s">
              <Text textAlign="right">{total?.count}x</Text>
            </Box>
            <Box flex={2}>
              <Text textAlign="right">{total?.price?.toFixed(2)} €</Text>
            </Box>
          </Box>
        </Box>
      )}
      renderItem={({ item }) => (
        <Box flexDirection="row" marginBottom="xs">
          <Box flex={4}>
            <Text fontFamily="Rubik_500Medium">{item?.item?.name}</Text>
          </Box>
          <Box flex={1} paddingHorizontal="s">
            <Text textAlign="right">{item?.amount}x</Text>
          </Box>
          <Box flex={2}>
            <Text textAlign="right">{item?.item?.price?.toFixed(2)} €</Text>
          </Box>
        </Box>
      )}
    />
  )
}

export default OrderDetail
