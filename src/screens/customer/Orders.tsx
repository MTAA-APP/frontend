import React, { useCallback, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { FlatList, RefreshControl, Image } from 'react-native'
import { useQuery } from '@apollo/client'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { RootStackParamList } from 'types/stack'
import { Box, NoData, Text } from 'ui'
import { OrderBox } from 'components'
import { keyIdExtractor } from 'utils/functions'
import { formatDate } from 'utils/date'
import { Order, OrderInfo } from 'types/datamodels'
import { PAYMENT, STATUS } from 'constants/enums'

import { GET_MY_ORDERS } from 'apollo/queries'

import ARROW_ICON from 'assets/icons/arrow-down.png'

type Props = StackScreenProps<RootStackParamList, 'MyOrders'>

type OrderI = Order & { total: OrderInfo }
type QueryType = { orders: OrderI[] }

const Orders = ({ navigation }: Props) => {
  const [selected, setSelected] = useState<string>()

  const { data, loading, refetch } = useQuery<QueryType>(GET_MY_ORDERS)

  const select = useCallback(
    (id: string) => () => setSelected((prev) => (prev === id ? undefined : id)),
    []
  )

  return (
    <Box paddingTop="xxxl" flex={1}>
      <FlatList
        data={data?.orders}
        extraData={selected}
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
            title={item?.service?.name}
            status={item?.status}
            handlePress={() => {}}
          >
            <Text variant="label">
              {`${STATUS[item?.status]} - ${PAYMENT[item?.payment]}`}
            </Text>

            <Text variant="label" marginBottom="s">
              Created at {formatDate(item?.createdAt)}
            </Text>

            {selected === item?.id && (
              <Box
                paddingVertical="s"
                marginBottom="s"
                style={{ marginLeft: -69 }}
              >
                <FlatList
                  listKey={`detail-${item?.id}`}
                  data={item?.items}
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
                          <Text textAlign="right">{item?.total?.count}x</Text>
                        </Box>
                        <Box flex={2}>
                          <Text textAlign="right">
                            {item?.total?.price?.toFixed(2)} €
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  )}
                  renderItem={({ item }) => (
                    <Box flexDirection="row" marginBottom="xs">
                      <Box flex={4}>
                        <Text fontFamily="Rubik_500Medium">
                          {item?.item?.name}
                        </Text>
                      </Box>
                      <Box flex={1} paddingHorizontal="s">
                        <Text textAlign="right">{item?.amount}x</Text>
                      </Box>
                      <Box flex={2}>
                        <Text textAlign="right">
                          {item?.item?.price?.toFixed(2)} €
                        </Text>
                      </Box>
                    </Box>
                  )}
                />
              </Box>
            )}

            <Box
              style={{ marginRight: -16, marginBottom: -16 }}
              flexDirection="row"
              justifyContent="flex-end"
            >
              <TouchableOpacity onPress={select(item?.id)}>
                <Box
                  height={40}
                  backgroundColor="primary"
                  paddingVertical="s"
                  paddingHorizontal="l"
                  borderTopLeftRadius={30}
                  borderBottomRightRadius={30}
                  alignItems="center"
                  flexDirection="row"
                >
                  <Text
                    marginRight="s"
                    color="background"
                    fontFamily="Rubik_500Medium"
                  >
                    {selected === item?.id ? 'close' : 'open'} detail
                  </Text>

                  <Image
                    source={ARROW_ICON}
                    style={{
                      width: 10,
                      height: 6,
                      ...(selected === item?.id && {
                        transform: [{ scaleY: -1 }],
                      }),
                    }}
                    resizeMode="contain"
                  />
                </Box>
              </TouchableOpacity>
            </Box>
          </OrderBox>
        )}
      />
    </Box>
  )
}

export default Orders
