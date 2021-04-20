import React, { useEffect, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { FlatList, RefreshControl } from 'react-native'
import { useQuery } from '@apollo/client'

import { RootStackParamList } from 'types/stack'
import { Box, Button, NoData, Search } from 'ui'
import { Item, ItemModal } from 'components'
import { useModal } from 'hooks'
import { Item as ItemType } from 'types/datamodels'

import { GET_ITEMS } from 'apollo/queries'

type Props = StackScreenProps<RootStackParamList, 'MyMenu'>

type QueryType = { items: ItemType[] }

const Menu = ({ navigation }: Props) => {
  const [search, setSearch] = useState<string>(undefined!)

  const { state, show, hide } = useModal<ItemType>()

  const { data, loading, refetch } = useQuery<QueryType>(GET_ITEMS, {
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
      <Box paddingHorizontal="xl" paddingTop="xxxl">
        <Search
          value={search}
          onChangeText={(value: string) => setSearch(value)}
        />
      </Box>

      <FlatList
        data={data?.items}
        keyExtractor={(item) => item?.id}
        contentContainerStyle={{ paddingBottom: 30 }}
        refreshing={loading}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
        ListEmptyComponent={<NoData loading={loading} text="No items found." />}
        renderItem={({ item }) => (
          <Item
            title={item?.name}
            variant="secondary"
            description="CATEGORY"
            picture={item?.picture}
            handlePress={() => show(item)}
          />
        )}
      />

      <ItemModal data={state?.data} isVisible={state?.visible} onClose={hide} />

      <Box
        padding="xl"
        backgroundColor="title"
        borderTopLeftRadius={18}
        borderTopRightRadius={18}
      >
        <Button title="Add item" onPress={show} />
      </Box>
    </>
  )
}

export default Menu
