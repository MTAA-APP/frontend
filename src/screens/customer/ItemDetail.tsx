import React, { useCallback } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { useMutation, useQuery } from '@apollo/client'
import { Image, FlatList } from 'react-native'
import AppLoading from 'expo-app-loading'

import { RootStackParamList } from 'types/stack'
import { Box, Button, Text } from 'ui'
import { useContext } from 'hooks'
import { Item, OrderItem } from 'types/datamodels'
import { ITEM_CATEGORY } from 'constants/enums'

import { GET_CART_INFO, GET_ITEM } from 'apollo/queries'
import { CREATE_ORDER_ITEM } from 'apollo/mutations'

import MEAL_ICON from 'assets/icons/meal.png'
import WEIGHT_ICON from 'assets/icons/weight.png'
import TIME_ICON from 'assets/icons/time.png'

type Props = StackScreenProps<RootStackParamList, 'ItemDetail'>

type QueryType = { item: Item }
type MutationType = { orderItem: OrderItem }

const ItemDetail = ({ navigation, route: { params } }: Props) => {
  const { show } = useContext('snackbar')

  const [addItem] = useMutation<MutationType>(CREATE_ORDER_ITEM)
  const { data, loading } = useQuery<QueryType>(GET_ITEM, {
    variables: { id: params?.id },
  })

  const handleAdd = useCallback(() => {
    addItem({
      variables: { body: { id: params?.id } },
      refetchQueries: [{ query: GET_CART_INFO }],
    })
      .then(() => show({ text: 'Item added to cart.', variant: 'success' }))
      .catch(() => show({ text: 'Cannot add item to cart!', variant: 'error' }))
  }, [])

  if (loading || !data) return <AppLoading />

  return (
    <Box flex={1} justifyContent="space-between" paddingTop="xxl">
      <FlatList
        data={[1]}
        showsVerticalScrollIndicator={false}
        keyExtractor={() => `item-detail-${params?.id}`}
        renderItem={() => (
          <>
            <Box padding="xl">
              <Text
                variant="title"
                marginBottom="s"
                fontSize={45}
                lineHeight={45}
              >
                {data?.item?.name}
              </Text>

              <Box flexDirection="row">
                <Text
                  variant="title"
                  color="primary"
                  fontSize={50}
                  lineHeight={56}
                >
                  {data?.item?.price}
                </Text>
                <Text
                  marginLeft="s"
                  variant="subtitle"
                  color="primary"
                  fontSize={30}
                  lineHeight={40}
                >
                  €
                </Text>
              </Box>
            </Box>

            <Image
              source={{ uri: data?.item?.picture }}
              style={{
                height: 250,
                width: '100%',
              }}
              resizeMode="contain"
            />

            <Box padding="xl" marginTop="s">
              <Box flexDirection="row" justifyContent="space-around">
                <Box height={20}>
                  <Image
                    source={MEAL_ICON}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="contain"
                  />
                  <Text
                    marginTop="s"
                    fontSize={15}
                    color="title"
                    fontFamily="Rubik_500Medium"
                  >
                    {ITEM_CATEGORY[data?.item?.categories?.[0]]}
                  </Text>
                </Box>

                <Box height={20}>
                  <Image
                    source={TIME_ICON}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="contain"
                  />
                  <Text
                    marginTop="s"
                    fontSize={15}
                    color="title"
                    fontFamily="Rubik_500Medium"
                  >
                    {data?.item?.time || 'N/A'} min
                  </Text>
                </Box>

                <Box height={20}>
                  <Image
                    source={WEIGHT_ICON}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="contain"
                  />
                  <Text
                    marginTop="s"
                    fontSize={15}
                    color="title"
                    fontFamily="Rubik_500Medium"
                  >
                    {data?.item?.weight || 'N/A'} g
                  </Text>
                </Box>
              </Box>
            </Box>

            <Box padding="xl">
              <Text>{data?.item?.description}</Text>
            </Box>
          </>
        )}
      />
      <Box padding="xl">
        <Button title="Add to cart" onPress={handleAdd} />
      </Box>
    </Box>
  )
}

export default ItemDetail
