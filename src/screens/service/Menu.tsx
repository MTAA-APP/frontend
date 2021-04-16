import React, { useEffect, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { FlatList, Image, RefreshControl } from 'react-native'
import { useMutation, useQuery } from '@apollo/client'

import { RootStackParamList } from 'types/stack'
import { Box, NoData, Search, Text } from 'ui'
import { GET_MENU } from 'apollo/queries'
import { Item as ItemType }  from 'types/datamodels'

import WHITE_STAR_ICON from 'assets/icons/white-star.png'
import { Item } from 'components'

type Props = StackScreenProps<RootStackParamList, 'MyMenu'>

type QueryType = { getMenu: ItemType[] }

const Menu = ({ navigation }: Props) => {

  const [search, setSearch] = useState<string>(undefined!)

  const { data, loading, refetch } = useQuery<QueryType>(GET_MENU, {
    variables: {
      ...(!!search && { search }),
    },
  })

  useEffect(() => {
    const timeout = setTimeout(refetch, 800)
    return () => clearTimeout(timeout)
  }, [search])

  return (
  <>
      <Box padding="xl" paddingTop="xxxl">
        <Box
          flexDirection="row"
          marginBottom="l"
          justifyContent="space-between"
          alignItems="center"
        >

        </Box>

        <Search
          value={search}
          onChangeText={(value: string) => setSearch(value)}
        />

      </Box>

      <FlatList
        data={data?.getMenu}
        keyExtractor={(item) => item?.id}
        contentContainerStyle={{ paddingBottom: 30 }}
        refreshing={loading}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
        ListEmptyComponent={
          <NoData loading={loading} text="No items found." />
        }
        renderItem={({ item }) => (
          <Item
            title={item?.name}
            description="CATEGORY"
            picture={item?.picture}
            leftIcon={WHITE_STAR_ICON}
            handlePress={() => navigation.navigate('ItemDetail', { id: item?.id })}
          />
        )}
      />
    </>
  )
}

export default Menu
