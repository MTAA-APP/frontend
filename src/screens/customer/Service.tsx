import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { Image } from 'react-native'
import { useQuery } from '@apollo/client'
import AppLoading from 'expo-app-loading'

import { RootStackParamList } from 'types/stack'
import { Box, Text, Button } from 'ui'
import { Service } from 'types/datamodels'

import { GET_SERVICE } from 'apollo/queries'

type Props = StackScreenProps<RootStackParamList, 'Service'>

type QueryType = { service: Service }

const ServiceDetail = ({ navigation, route: { params } }: Props) => {
  const { data, loading, error } = useQuery<QueryType>(GET_SERVICE, {
    variables: { id: params?.id },
  })

  if (loading) return <AppLoading />

  return (
    <>
      <Box flex={1}>
        <Image
          source={{ uri: data?.service?.picture }}
          style={{
            flex: 1,
            width: '100%',
          }}
          resizeMode="cover"
        />

        <Button
          title="Show menu"
          onPress={() => navigation.navigate('Menu', { id: params?.id })}
        />
      </Box>

      <Box flex={2} padding="xl" paddingTop="xxl">
        <Text variant="title">{data?.service?.name}</Text>
        <Text marginBottom="xl">{data?.service?.description}</Text>

        <Text variant="subtitle" marginBottom="m">
          Opening Hours
        </Text>
        <Box
          borderRadius={16}
          padding="m"
          backgroundColor="white"
          elevation={5}
        ></Box>
      </Box>
    </>
  )
}

export default ServiceDetail
