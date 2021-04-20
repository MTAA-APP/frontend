import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { Image } from 'react-native'
import { useQuery } from '@apollo/client'
import AppLoading from 'expo-app-loading'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

import { RootStackParamList } from 'types/stack'
import { Box, Text, Button } from 'ui'
import { Service } from 'types/datamodels'

import { GET_SERVICE } from 'apollo/queries'

import PHONE_ICON from 'assets/icons/phone.png'

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
      </Box>

      <Box
        flexDirection="row"
        paddingHorizontal="xl"
        justifyContent="space-between"
        style={{ marginTop: -25 }}
      >
        <Button
          title="Show menu"
          onPress={() => navigation.navigate('Menu', { id: params?.id })}
        />

        <TouchableOpacity style={{ marginLeft: 16 }}>
          <Box
            accessible
            backgroundColor="secondary"
            padding="m"
            borderRadius={50}
          >
            <Image
              source={PHONE_ICON}
              style={{ width: 21, height: 21 }}
              resizeMode="contain"
            />
          </Box>
        </TouchableOpacity>
      </Box>

      <Box flex={2} padding="xl">
        <Text variant="title">{data?.service?.name}</Text>
        <Text marginBottom="xl">{data?.service?.description}</Text>

        <Text variant="subtitle" marginBottom="m">
          Opening Hours
        </Text>

        <Box
          borderRadius={16}
          padding="m"
          backgroundColor="white"
          elevation={1}
        ></Box>
      </Box>
    </>
  )
}

export default ServiceDetail
