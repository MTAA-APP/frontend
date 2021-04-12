import React, { useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { TouchableRipple } from 'react-native-paper'
import { FlatList } from 'react-native'
import { useQuery } from '@apollo/client'
import AppLoading from 'expo-app-loading'

import { RootStackParamList } from 'types/stack'
import { Box, RowSelect, Text } from 'ui'
import { Item } from 'components'
import { Service } from 'types/datamodels'
import { ServiceCategory } from 'types/enums'

import { GET_SERVICES } from 'apollo/queries'

type Props = StackScreenProps<RootStackParamList, 'Home'>

type QueryVariables = {
  favorites?: boolean
  search?: string
  category?: ServiceCategory
}

// TODO: filters

const Services = ({ navigation }: Props) => {
  const [variables, setVariables] = useState<QueryVariables>({
    favorites: false,
  })

  const handleChange = (newVariables: QueryVariables) => {
    setVariables({ ...variables, ...newVariables })
  }

  const { data, loading, refetch } = useQuery<{ getServices: Service[] }>(
    GET_SERVICES,
    {}
  )

  if (loading) return <AppLoading />

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

          <TouchableRipple
            onPress={() => handleChange({ favorites: !variables?.favorites })}
          >
            <Box
              accessible
              width={30}
              height={30}
              backgroundColor={variables?.favorites ? 'selected' : 'label'}
              borderRadius={8}
            />
          </TouchableRipple>
        </Box>

        <RowSelect
          selected={variables.category}
          handleSelect={(category: ServiceCategory | undefined) =>
            handleChange({ category })
          }
          items={Object.values(ServiceCategory)}
        />
      </Box>

      <FlatList
        data={data?.getServices}
        keyExtractor={(item) => item?.id}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <Item
            title={item?.name}
            description={item?.description}
            picture={item?.picture}
          />
        )}
      />
    </>
  )
}

export default Services
