import React, { useCallback, useMemo } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { useMutation, useQuery } from '@apollo/client'
import { FlatList, Image, RefreshControl, TouchableOpacity } from 'react-native'
import AppLoading from 'expo-app-loading'

import { RootStackParamList } from 'types/stack'
import { Box, Button, NoData, Text } from 'ui'
import { Item, OrderDetail, TextBlock } from 'components'
import { useContext } from 'hooks'
import { keyIdExtractor } from 'utils/functions'
import { formatDate } from 'utils/date'
import { Order } from 'types/datamodels'
import { ITEM_CATEGORY, PAYMENT } from 'constants/enums'

import { GET_CART, GET_CART_INFO } from 'apollo/queries'
import {
  CREATE_ORDER_ITEM,
  DELETE_ORDER_ITEM,
  UPDATE_ORDER_PAY,
} from 'apollo/mutations'

import ADD_ICON from 'assets/icons/add.png'
import REMOVE_ICON from 'assets/icons/remove.png'

type Props = StackScreenProps<RootStackParamList, 'Cart'>

type QueryType = { cart: Order }

const Cart = ({ navigation }: Props) => {
  const { show } = useContext('snackbar')

  const { data, loading, refetch } = useQuery<QueryType>(GET_CART)
  const [finishOrder] = useMutation(UPDATE_ORDER_PAY)
  const [removeItem] = useMutation(DELETE_ORDER_ITEM)
  const [addItem] = useMutation(CREATE_ORDER_ITEM)

  const handleFinish = useCallback(() => {
    finishOrder({ variables: { body: {} } })
      .then(() => {
        show({ text: 'Thank you for your order.', variant: 'success' })
        refetch()
        navigation.navigate('Orders')
      })
      .catch(() => show({ text: 'Something went wrong!', variant: 'error' }))
  }, [finishOrder])

  const handleRemove = useCallback(
    (id: string) => {
      removeItem({
        variables: { id },
        refetchQueries: [{ query: GET_CART_INFO }, { query: GET_CART }],
      })
        .then(() =>
          show({ text: 'Item removed from cart.', variant: 'success' })
        )
        .catch(() =>
          show({ text: 'Cannot remove item from cart!', variant: 'error' })
        )
    },
    [removeItem]
  )

  const handleAdd = useCallback(
    (id: string) => {
      addItem({
        variables: { body: { id } },
        refetchQueries: [{ query: GET_CART_INFO }, { query: GET_CART }],
      })
        .then(() => show({ text: 'Item added to cart.', variant: 'success' }))
        .catch(() =>
          show({ text: 'Cannot add item to cart!', variant: 'error' })
        )
    },
    [addItem]
  )

  if (loading || !data) return <AppLoading />

  return (
    <Box flex={1} paddingTop="xxxl">
      <FlatList
        data={[1]}
        refreshing={loading}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
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
                >
                  <Box
                    style={{ marginLeft: -24, marginBottom: -24 }}
                    flexDirection="row"
                    alignItems="center"
                  >
                    <TouchableOpacity onPress={() => handleRemove(item?.id)}>
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

                    <TouchableOpacity onPress={() => handleAdd(item?.item?.id)}>
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

            {!!data?.cart?.id && (
              <Box padding="xl">
                <Box
                  marginBottom="xl"
                  borderRadius={30}
                  paddingVertical="m"
                  paddingHorizontal="l"
                  backgroundColor="white"
                  elevation={4}
                >
                  <Text variant="subtitle" marginBottom="m">
                    Order summary
                  </Text>

                  <OrderDetail
                    listKey={`info-${data?.cart?.id}`}
                    items={data?.cart?.items}
                    total={data?.cart?.total}
                  />
                </Box>

                <TextBlock
                  title="Order information"
                  data={[
                    {
                      title: 'Service',
                      text: data?.cart?.service?.name,
                      onPress: () =>
                        navigation.navigate('Service', {
                          id: data?.cart?.service?.id || '',
                        }),
                    },
                    {
                      title: 'Payment',
                      text: PAYMENT[data?.cart?.owner?.payment || 'ONLINE'],
                    },
                    {
                      title: 'Created At',
                      text: formatDate(data?.cart?.createdAt),
                    },
                  ]}
                />

                <TextBlock
                  title="Delivery address"
                  onPress={() => navigation.navigate('CustomerProfile')}
                  data={
                    !!data?.cart?.owner?.address
                      ? [
                          {
                            title: 'Country',
                            text: data?.cart?.owner?.address?.country,
                          },
                          {
                            title: 'City',
                            text: data?.cart?.owner?.address?.city,
                          },
                          {
                            title: 'Postal code',
                            text: data?.cart?.owner?.address?.postalCode,
                          },
                          {
                            title: 'Street',
                            text: data?.cart?.owner?.address?.street,
                          },
                        ]
                      : []
                  }
                />
              </Box>
            )}
          </>
        )}
      />

      <Box padding="xl" paddingTop="xs">
        {!!data?.cart?.id ? (
          !!data?.cart?.owner?.address ? (
            <Button title="Finish and Pay" onPress={handleFinish} />
          ) : (
            <Button
              title="Add address"
              onPress={() => navigation.navigate('CustomerProfile')}
            />
          )
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
