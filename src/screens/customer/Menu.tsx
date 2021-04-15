import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { FlatList, RefreshControl } from 'react-native'
import { useQuery } from '@apollo/client'
import AppLoading from 'expo-app-loading'

import { RootStackParamList } from 'types/stack'
import { Box, NoData, Text } from 'ui'
import { Item } from 'components'
import { Item as ItemData } from 'types/datamodels'

import { GET_MENU } from 'apollo/queries'

type Props = StackScreenProps<RootStackParamList, 'Menu'>

type QueryType = { menu: ItemData[] }

// TODO: search

const Menu = ({ navigation, route: { params } }: Props) => {
  const { data, loading, error, refetch } = useQuery<QueryType>(GET_MENU, {
    variables: { id: params?.id },
  })

  if (loading) return <AppLoading />

  return (
    <Box paddingTop="xxxl" flex={1}>
      <FlatList
        data={data?.menu}
        keyExtractor={(item) => item?.id}
        contentContainerStyle={{ paddingBottom: 30 }}
        refreshing={loading}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
        ListEmptyComponent={<NoData loading={loading} text="No items found." />}
        renderItem={({ item }) => (
          <Item
            variant="secondary"
            title={item?.name}
            picture={item?.picture}
            handlePress={() =>
              navigation.navigate('ItemDetail', { id: item?.id })
            }
          />
        )}
      />
    </Box>
  )
}

export default Menu
