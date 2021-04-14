import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { FlatList, RefreshControl } from 'react-native'
import { useQuery } from '@apollo/client'

import { RootStackParamList } from 'types/stack'
import { Box, NoData } from 'ui'
import { OrderBox } from 'components'
import { Order } from 'types/datamodels'

import { GET_ORDERS } from 'apollo/queries'

import READY_ICON from 'assets/icons/ready.png'

type Props = StackScreenProps<RootStackParamList, 'Orders'>

type QueryType = { getOrders: Order[] }

// TODO: bottom bar

const Orders = ({ navigation }: Props) => {
  const { data, loading, refetch } = useQuery<QueryType>(GET_ORDERS)

  return (
    <Box paddingTop="xxxl" flex={1}>
      <FlatList
        data={data?.getOrders}
        keyExtractor={(item) => item?.id}
        contentContainerStyle={{ paddingBottom: 30 }}
        refreshing={loading}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
        ListEmptyComponent={
          <NoData loading={loading} text="You have no orders yet." />
        }
        renderItem={({ item }) => (
          <OrderBox
            title={item?.customer?.email}
            description="Lorem ipsum dolor sit amet"
            leftIcon={READY_ICON}
            handleLeftPress={() => console.log('left')}
            handleRightPress={() => console.log('right')}
          />
        )}
      />
    </Box>
  )
}

export default Orders
