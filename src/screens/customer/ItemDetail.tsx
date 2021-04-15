import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { useQuery } from '@apollo/client'
import AppLoading from 'expo-app-loading'
import { Image } from 'react-native'

import { RootStackParamList } from 'types/stack'
import { Box, Text } from 'ui'
import { Item } from 'types/datamodels'

import { GET_ITEM } from 'apollo/queries'

type Props = StackScreenProps<RootStackParamList, 'ItemDetail'>

type QueryType = { item: Item }

// TODO: add to cart

const ItemDetail = ({ navigation, route: { params } }: Props) => {
  const { data, loading, error } = useQuery<QueryType>(GET_ITEM, {
    variables: { id: params?.id },
  })

  if (loading) return <AppLoading />

  return (
    <>
      <Box padding="xl" paddingTop="xxxl">
        <Text variant="title" marginBottom="l">
          {data?.item?.name}
        </Text>

        <Box flexDirection="row">
          <Text variant="title" color="primary" fontSize={50} lineHeight={56}>
            {data?.item?.price}
          </Text>
          <Text marginLeft="s" variant="subtitle" color="primary">
            €
          </Text>
        </Box>
      </Box>

      <Box flex={1}>
        <Image
          source={{ uri: data?.item?.picture }}
          style={{
            height: '100%',
            width: '100%',
          }}
          resizeMode="contain"
        />
      </Box>

      <Box flex={1} padding="xl">
        <Text>{data?.item?.description}</Text>
      </Box>
    </>
  )
}

export default ItemDetail
