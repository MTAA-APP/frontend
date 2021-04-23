import React, { useCallback } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { FlatList, RefreshControl, Image, TouchableOpacity } from 'react-native'
import { useMutation, useQuery } from '@apollo/client'
import AppLoading from 'expo-app-loading'

import { RootStackParamList } from 'types/stack'
import { Box, NoData, Text } from 'ui'
import { BottomCart, Item } from 'components'
import { useContext } from 'hooks'
import { keyIdExtractor } from 'utils/functions'
import { Item as ItemData, OrderItem } from 'types/datamodels'
import { ITEM_CATEGORY } from 'constants/enums'

import { GET_CART_INFO, GET_MENU } from 'apollo/queries'
import { CREATE_ORDER_ITEM } from 'apollo/mutations'

import CART_ICON from 'assets/icons/white-cart.png'

type Props = StackScreenProps<RootStackParamList, 'Menu'>

type QueryType = { menu: ItemData[] }
type MutationType = { orderItem: OrderItem }

const Menu = ({ navigation, route: { params } }: Props) => {
  const { show } = useContext('snackbar')

  const [addItem] = useMutation<MutationType>(CREATE_ORDER_ITEM)
  const { data, loading, refetch } = useQuery<QueryType>(GET_MENU, {
    variables: { id: params?.id },
  })

  const showDetail = useCallback(
    (id: string) => () => navigation.navigate('ItemDetail', { id }),
    [navigation]
  )

  const handleAdd = useCallback((id: string) => {
    addItem({
      variables: { body: { id } },
      refetchQueries: [{ query: GET_CART_INFO }],
    })
      .then(() => show({ text: 'Item added to cart.', variant: 'success' }))
      .catch(() => show({ text: 'Cannot add item to cart!', variant: 'error' }))
  }, [])

  if (loading) return <AppLoading />

  return (
    <>
      <Box paddingTop="xxxl" flex={1}>
        <FlatList
          data={data?.menu}
          keyExtractor={keyIdExtractor}
          contentContainerStyle={{ paddingBottom: 30 }}
          refreshing={loading}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refetch} />
          }
          ListEmptyComponent={
            <NoData loading={loading} text="No items in menu." />
          }
          renderItem={({ item }) => (
            <Item
              variant="secondary"
              title={item?.name}
              description={ITEM_CATEGORY[item?.categories?.[0]]}
              picture={item?.picture}
              handlePress={showDetail(item?.id)}
            >
              <Box
                style={{ marginLeft: -24, marginBottom: -24 }}
                flexDirection="row"
              >
                <TouchableOpacity
                  onPress={(e) => {
                    handleAdd(item?.id)
                    e.stopPropagation()
                  }}
                >
                  <Box
                    accessible
                    height={40}
                    backgroundColor="primary"
                    paddingVertical="s"
                    paddingHorizontal="l"
                    borderBottomLeftRadius={30}
                    borderTopRightRadius={30}
                    flexDirection="row"
                    alignItems="center"
                  >
                    <Image
                      source={CART_ICON}
                      style={{ height: '100%', width: 15 }}
                      resizeMode="contain"
                    />

                    <Text
                      color="background"
                      marginLeft="m"
                      fontFamily="Rubik_500Medium"
                    >
                      {item?.price?.toFixed(2)} €
                    </Text>
                  </Box>
                </TouchableOpacity>
              </Box>
            </Item>
          )}
        />
      </Box>

      <BottomCart />
    </>
  )
}

export default Menu
