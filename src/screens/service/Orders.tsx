import React, { useCallback } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { FlatList, RefreshControl } from 'react-native'
import { useMutation, useQuery } from '@apollo/client'

import { RootStackParamList } from 'types/stack'
import { Box, NoData, Text } from 'ui'
import { OrderBox } from 'components'
import { useContext } from 'hooks'
import { keyIdExtractor } from 'utils/functions'
import { formatDate } from 'utils/date'
import { Order } from 'types/datamodels'
import { Status } from 'types/enums'
import { STATUS, PAYMENT } from 'constants/enums'
import { NEXT_STATUS_ICON } from 'constants/icons'
import { NEXT_STATUS } from 'constants/global'

import { GET_ORDERS } from 'apollo/queries'
import { UPDATE_ORDER_STATUS } from 'apollo/mutations'

type Props = StackScreenProps<RootStackParamList, 'Orders'>

type QueryType = { orders: Order[] }
type MutationType = { order: Order }

// TODO: bottom bar

const Orders = ({ navigation }: Props) => {
  const { show } = useContext('snackbar')

  const { data, loading, refetch } = useQuery<QueryType>(GET_ORDERS)
  const [updateStatus] = useMutation<MutationType>(UPDATE_ORDER_STATUS)

  const handleStatusChange = useCallback((id: string, status: Status) => {
    updateStatus({
      variables: { body: { id: id, status: NEXT_STATUS[status] } },
    })
      .then(() => {
        refetch()
        show({
          text: `Order status updated to ${NEXT_STATUS[status]}.`,
          variant: 'success',
        })
      })
      .catch(() =>
        show({
          text: `Something went wrong during status update!`,
          variant: 'error',
        })
      )
  }, [])

  return (
    <>
      <Box paddingTop="xxxl" flex={1}>
        <FlatList
          data={data?.orders}
          keyExtractor={keyIdExtractor}
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
              status={item?.status}
              leftIcon={NEXT_STATUS_ICON[item?.status]}
              handlePress={() => navigation.navigate('Order', { id: item?.id })}
              handleLeftPress={
                item?.status !== Status.COMPLETED
                  ? () => handleStatusChange(item?.id, item?.status)
                  : undefined
              }
              handleRightPress={
                item?.status === Status.READY
                  ? () => console.log('TODO') // TODO: add status
                  : undefined
              }
            >
              <Text variant="label">
                {`${STATUS[item?.status]} - ${PAYMENT[item?.payment]}`}
              </Text>

              <Text variant="label">
                Created at {formatDate(item?.createdAt)}
              </Text>
            </OrderBox>
          )}
        />
      </Box>

      <Box
        backgroundColor="title"
        padding="xl"
        borderTopLeftRadius={18}
        borderTopRightRadius={18}
      >
        <Text>TODO</Text>
      </Box>
    </>
  )
}

export default Orders
