import React, { useCallback, useMemo } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { useMutation, useQuery } from '@apollo/client'
import { FlatList, Image, RefreshControl, TouchableOpacity } from 'react-native'

import { RootStackParamList } from 'types/stack'
import { Box, Button, NoData, Text } from 'ui'
import { Item, TextBlock } from 'components'
import { keyIdExtractor } from 'utils/functions'
import { Order } from 'types/datamodels'

import { GET_CART } from 'apollo/queries'
import { ITEM_CATEGORY, PAYMENT } from 'constants/enums'

import ADD_ICON from 'assets/icons/add.png'
import REMOVE_ICON from 'assets/icons/remove.png'
import AppLoading from 'expo-app-loading'
import { formatDate } from 'utils/date'
import { UPDATE_ORDER_PAY } from 'apollo/mutations'
import { useContext } from 'hooks'

type Props = StackScreenProps<RootStackParamList, 'Cart'>

type QueryType = { cart: Order }

// TODO: add service and summary

const Cart = ({ navigation }: Props) => {
  const { show } = useContext('snackbar')

  const [finishOrder] = useMutation(UPDATE_ORDER_PAY)
  const { data, loading, refetch } = useQuery<QueryType>(GET_CART)

  const handleFinish = useCallback(() => {
    finishOrder({ variables: { body: {} } })
      .then(() => {
        show({ text: 'Thank you for your order.', variant: 'success' })
        refetch()
        navigation.navigate('Orders')
      })
      .catch(() => show({ text: 'Something went wrong!', variant: 'error' }))
  }, [])

  if (loading || !data) return <AppLoading />

  return (
    <Box flex={1} paddingTop="xxxl">
      <FlatList
        data={[1]}
        showsVerticalScrollIndicator={false}
        keyExtractor={() => `cart-${data?.cart?.id}`}
        renderItem={() => (
          <>
            <FlatList
              data={data?.cart?.items}
              keyExtractor={keyIdExtractor}
              listKey={data?.cart?.id}
              refreshing={loading}
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={refetch} />
              }
              ListEmptyComponent={
                <NoData loading={loading} text="No items in cart." />
              }
              renderItem={({ item }) => (
                <Item
                  title={item?.item?.name}
                  variant="secondary"
                  description={ITEM_CATEGORY[item?.item?.categories?.[0]]}
                  picture={item?.item?.picture}
                  handlePress={() => {}}
                >
                  <Box
                    style={{ marginLeft: -24, marginBottom: -24 }}
                    flexDirection="row"
                    alignItems="center"
                  >
                    <TouchableOpacity>
                      <Box
                        accessible
                        height={40}
                        backgroundColor="primary"
                        paddingVertical="s"
                        paddingLeft="l"
                        paddingRight="m"
                        borderBottomLeftRadius={30}
                        flexDirection="row"
                      >
                        <Image
                          source={REMOVE_ICON}
                          style={{ height: '100%', width: 15 }}
                          resizeMode="contain"
                        />
                      </Box>
                    </TouchableOpacity>

                    <TouchableOpacity>
                      <Box
                        accessible
                        height={40}
                        backgroundColor="secondary"
                        paddingVertical="s"
                        paddingRight="l"
                        paddingLeft="m"
                        borderTopRightRadius={30}
                        flexDirection="row"
                      >
                        <Image
                          source={ADD_ICON}
                          style={{ height: '100%', width: 15 }}
                          resizeMode="contain"
                        />
                      </Box>
                    </TouchableOpacity>

                    <Text
                      color="title"
                      marginLeft="m"
                      fontFamily="Rubik_500Medium"
                    >
                      {item?.amount}x {item?.item?.price?.toFixed(2)}€
                    </Text>
                  </Box>
                </Item>
              )}
            />

            {!!data?.cart && (
              <Box padding="xl">
                <TextBlock
                  title="Order Information"
                  data={[
                    { title: 'Payment', text: PAYMENT[data?.cart?.payment] },
                    {
                      title: 'Created At',
                      text: formatDate(data?.cart?.createdAt),
                    },
                  ]}
                />
              </Box>
            )}
          </>
        )}
      />

      <Box padding="xl">
        {!!data?.cart ? (
          <Button title="Finish and Pay" onPress={handleFinish} />
        ) : (
          <Button
            title="Show Services"
            onPress={() => navigation.navigate('Services')}
          />
        )}
      </Box>
    </Box>
  )
}

export default Cart
