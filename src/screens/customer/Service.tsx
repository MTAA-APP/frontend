import React, { useCallback, useEffect, useMemo } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { FlatList, Image } from 'react-native'
import { useQuery } from '@apollo/client'
import AppLoading from 'expo-app-loading'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { RootStackParamList } from 'types/stack'
import { Box, Text, Button } from 'ui'
import { Service } from 'types/datamodels'
import { makeCall, openUrl } from 'utils/functions'
import { DAY } from 'constants/enums'

import { GET_SERVICE } from 'apollo/queries'

import PHONE_ICON from 'assets/icons/phone.png'
import { SERVICE_CATEGORY } from 'constants/enums'
import { BottomCart, TextBlock } from 'components'
import { getTime } from 'utils/date'

type Props = StackScreenProps<RootStackParamList, 'Service'>

type QueryType = { service: Service }

const ServiceDetail = ({ navigation, route: { params } }: Props) => {
  const { data, loading, error } = useQuery<QueryType>(GET_SERVICE, {
    variables: { id: params?.id },
  })

  const handleCall = useCallback(() => makeCall(data?.service?.phone), [data])
  const handleWeb = useCallback(() => openUrl(data?.service?.web), [data])

  const openingHours = useMemo(
    () =>
      data?.service?.openingHours?.map((item) => ({
        title: DAY[item?.day],
        text: `${getTime(item?.from)} - ${getTime(item?.to)}`,
      })),
    [data]
  )

  useEffect(() => {
    if (!loading && (!data || !!error)) navigation.navigate('Services')
  }, [loading])

  if (loading || !data) return <AppLoading />

  return (
    <>
      <Box flex={1} position="relative">
        <Image
          source={{ uri: data?.service?.picture }}
          style={{
            flex: 1,
            width: '100%',
          }}
          resizeMode="cover"
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          backgroundColor="label"
          opacity={0.5}
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
          style={{ flex: 1 }}
          onPress={() => navigation.navigate('Menu', { id: params?.id })}
        />

        {data?.service?.phone && (
          <TouchableOpacity style={{ marginLeft: 16 }} onPress={handleCall}>
            <Box
              accessible
              backgroundColor="secondary"
              padding="ml"
              borderRadius={50}
            >
              <Image
                source={PHONE_ICON}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />
            </Box>
          </TouchableOpacity>
        )}
      </Box>

      <Box flex={2}>
        <Box padding="xl" paddingBottom="l">
          <Text variant="title">{data?.service?.name}</Text>
          <Text marginBottom="xs">{data?.service?.description}</Text>
          <Text variant="label">
            Category: {SERVICE_CATEGORY[data?.service?.category]}
          </Text>
        </Box>

        <FlatList
          data={[1]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 10 }}
          keyExtractor={(_, idx) => `${idx}`}
          renderItem={() => (
            <>
              <Box paddingHorizontal="xl">
                <TextBlock
                  title="Contact"
                  data={[
                    { title: 'Email', text: data?.service?.email },
                    {
                      title: 'Website',
                      text: data?.service?.web,
                      onPress: handleWeb,
                    },
                    { title: 'Phone', text: data?.service?.phone },
                  ]}
                />

                {!!data?.service?.address && (
                  <TextBlock
                    title="Address"
                    data={[
                      {
                        title: 'Country',
                        text: data?.service?.address?.country,
                      },
                      { title: 'City', text: data?.service?.address?.city },
                      {
                        title: 'Postal code',
                        text: data?.service?.address?.postalCode,
                      },
                      { title: 'Street', text: data?.service?.address?.street },
                    ]}
                  />
                )}

                {!!openingHours?.length && (
                  <TextBlock title="Opening Hours" data={openingHours} />
                )}
              </Box>
            </>
          )}
        />
      </Box>

      <BottomCart />
    </>
  )
}

export default ServiceDetail
