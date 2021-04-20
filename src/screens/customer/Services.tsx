import React, { useEffect, useCallback, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { FlatList, Image, RefreshControl } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useMutation, useQuery } from '@apollo/client'

import { RootStackParamList } from 'types/stack'
import { Box, NoData, RowSelect, Search, Text } from 'ui'
import { Item } from 'components'
import { useContext } from 'hooks'
import { Service } from 'types/datamodels'
import { ServiceCategory } from 'types/enums'
import { SERVICE_CATEGORY } from 'constants/enums'

import { GET_SERVICES } from 'apollo/queries'
import { DELETE_SERVICE, UPDATE_FAVORITE } from 'apollo/mutations'

import WHITE_STAR_ICON from 'assets/icons/white-star.png'

type Props = StackScreenProps<RootStackParamList, 'Home'>

type QueryType = { services: Service[] }

// TODO: shadows

const Services = ({ navigation }: Props) => {
  const { show } = useContext('snackbar')

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

  const [removeFavorite] = useMutation(DELETE_SERVICE)
  const [addFavorite] = useMutation(UPDATE_FAVORITE)

  const handleRemove = useCallback(
    (id: string) => {
      removeFavorite({ variables: { id } })
        .then(() => {
          show({ text: 'Service removed from favorites', variant: 'success' })
          refetch()
        })
        .catch(() =>
          show({
            text: 'Unable to remove service from favorites!',
            variant: 'error',
          })
        )
    },
    [refetch]
  )

  const handleAdd = useCallback(
    (id: string) => {
      addFavorite({ variables: { body: { id } } })
        .then(() => {
          refetch()
          show({ text: 'Service added to favorites', variant: 'success' })
        })
        .catch(() =>
          show({
            text: 'Unable to add service to favorites!',
            variant: 'error',
          })
        )
    },
    [refetch]
  )

  useEffect(() => {
    const timeout = setTimeout(refetch, 800)
    return () => clearTimeout(timeout)
  }, [search])

  useEffect(() => {
    refetch()
  }, [favorites, category])

  const keyExtractor = useCallback((item) => item?.id, [])

  return (
    <>
      <Box padding="xl" paddingTop="xxxl">
        <Box
          flexDirection="row"
          marginBottom="l"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text variant="title">Services</Text>

          <TouchableOpacity onPress={() => setFavorites(!favorites)}>
            <Box
              accessible
              width={30}
              height={30}
              backgroundColor={favorites ? 'primary' : 'label'}
              borderRadius={8}
              alignItems="center"
              justifyContent="center"
            >
              <Image
                source={WHITE_STAR_ICON}
                style={{
                  height: 12,
                  width: 12,
                }}
                resizeMode="contain"
              />
            </Box>
          </TouchableOpacity>
        </Box>

        <Search value={search} onChangeText={setSearch} />

        <RowSelect
          selected={category}
          handleSelect={(category?: ServiceCategory) =>
            setCategory(category || undefined!)
          }
          items={Object.values(ServiceCategory)}
        />
      </Box>

      <FlatList
        data={data?.services}
        keyExtractor={keyExtractor}
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
            description={SERVICE_CATEGORY[item?.category]}
            picture={item?.picture}
            leftIcon={WHITE_STAR_ICON}
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
