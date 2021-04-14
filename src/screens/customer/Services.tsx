import React, { useEffect, useCallback, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { FlatList, Image, RefreshControl } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useMutation, useQuery } from '@apollo/client'

import { RootStackParamList } from 'types/stack'
import { Box, NoData, RowSelect, Search, Text } from 'ui'
import { Item } from 'components'
import { Service } from 'types/datamodels'
import { ServiceCategory } from 'types/enums'

import { GET_SERVICES } from 'apollo/queries'
import { DELETE_SERVICE, UPDATE_FAVORITE } from 'apollo/mutations'

import STAR_ICON from 'assets/icons/star.png'

type Props = StackScreenProps<RootStackParamList, 'Home'>

type QueryType = { getServices: Service[] }

// TODO: shadows

const Services = ({ navigation }: Props) => {
  const [favorites, setFavorites] = useState<boolean>(false)
  const [search, setSearch] = useState<string>(undefined!)
  const [category, setCategory] = useState<ServiceCategory>(undefined!)

  const { data, loading, refetch } = useQuery<QueryType>(GET_SERVICES, {
    variables: {
      ...(!!favorites && { favorites }),
      ...(!!search && { search }),
      ...(!!category && { category }),
    },
  })

  const [removeService] = useMutation(DELETE_SERVICE)
  const [addService] = useMutation(UPDATE_FAVORITE)

  const handleRemove = useCallback((id: string) => {
    removeService({ variables: { id } })
      .then(() => refetch())
      .catch((err) => console.log('Error', err))
  }, [])

  const handleAdd = useCallback((id: string) => {
    // TODO: fix
    addService({ variables: { body: id } })
      .then(() => refetch())
      .catch((err) => console.log('Error', err))
  }, [])

  useEffect(() => {
    const timeout = setTimeout(refetch, 800)
    return () => clearTimeout(timeout)
  }, [search])

  useEffect(() => {
    refetch()
  }, [favorites, category])

  return (
    <>
      <Box padding="xl" paddingTop="xxxl">
        <Box
          flexDirection="row"
          marginBottom="xl"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text variant="title">Services</Text>

          <TouchableOpacity onPress={() => setFavorites(!favorites)}>
            <Box
              accessible
              width={30}
              height={30}
              backgroundColor={favorites ? 'primary' : 'selected'}
              borderRadius={8}
              alignItems="center"
              justifyContent="center"
            >
              <Image
                source={STAR_ICON}
                style={{
                  height: 16,
                  width: 16,
                }}
                resizeMode="contain"
              />
            </Box>
          </TouchableOpacity>
        </Box>

        <Search
          value={search}
          onChangeText={(value: string) => setSearch(value)}
        />

        <RowSelect
          selected={category}
          handleSelect={(category?: ServiceCategory) =>
            setCategory(category || undefined!)
          }
          items={Object.values(ServiceCategory)}
        />
      </Box>

      <FlatList
        data={data?.getServices}
        keyExtractor={(item) => item?.id}
        contentContainerStyle={{ paddingBottom: 30 }}
        refreshing={loading}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
        ListEmptyComponent={
          <NoData loading={loading} text="No services found." />
        }
        renderItem={({ item }) => (
          <Item
            title={item?.name}
            description={item?.description}
            picture={item?.picture}
            leftIcon={STAR_ICON}
            handlePress={() => navigation.navigate('Service', { id: item?.id })}
            {...(item?.customers?.length
              ? {
                  handleRightPress: () => handleRemove(item?.id),
                }
              : {
                  handleLeftPress: () => handleAdd(item?.id),
                })}
          />
        )}
      />
    </>
  )
}

export default Services
