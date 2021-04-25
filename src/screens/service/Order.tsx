import React, { useCallback } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { useQuery } from '@apollo/client'
import AppLoading from 'expo-app-loading'
import { FlatList, Image, TouchableOpacity } from 'react-native'

import { RootStackParamList } from 'types/stack'
import { Box, Text } from 'ui'
import { OrderDetail, TextBlock } from 'components'
import { formatDate } from 'utils/date'
import { getFullName } from 'utils/functions'
import { Order as OrderType } from 'types/datamodels'
import { makeCall } from 'utils/functions'
import { PAYMENT, STATUS } from 'constants/enums'

import { GET_ORDER } from 'apollo/queries'

import PHONE_ICON from 'assets/icons/phone.png'

type Props = StackScreenProps<RootStackParamList, 'Order'>

type QueryType = { order: OrderType }

const Order = ({ navigation, route: { params } }: Props) => {
  const { data, loading } = useQuery<QueryType>(GET_ORDER, {
    variables: { id: params?.id },
  })

  const handleCall = useCallback(() => makeCall(data?.order?.customer?.phone), [
    data,
  ])

  if (loading || !data) return <AppLoading />

  return (
    <>
      <Box
        flexDirection="row"
        alignItems="center"
        paddingHorizontal="xl"
        paddingTop="xxxl"
      >
        <Box flex={1}>
          <Text variant="subtitle" marginBottom="xs">
            Order for {getFullName(data?.order?.customer)}
          </Text>
          <Text>Email: {data?.order?.customer?.email}</Text>
        </Box>

        {data?.order?.customer?.phone && (
          <TouchableOpacity style={{ marginLeft: 16 }} onPress={handleCall}>
            <Box
              accessible
              backgroundColor="secondary"
              padding="m"
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

      <FlatList
        data={[1]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 30 }}
        keyExtractor={(_, idx) => `${idx}`}
        renderItem={() => (
          <>
            <TextBlock
              title="Order information"
              data={[
                {
                  title: 'Status',
                  text: STATUS[data?.order?.status],
                },
                { title: 'Payment', text: PAYMENT[data?.order?.payment] },
                {
                  title: 'Created at',
                  text: formatDate(data?.order?.createdAt),
                },
              ]}
            />

            {!!data?.order?.customer?.address && (
              <TextBlock
                title="Delivery address"
                data={[
                  {
                    title: 'Country',
                    text: data?.order?.customer?.address?.country,
                  },
                  { title: 'City', text: data?.order?.customer?.address?.city },
                  {
                    title: 'Postal code',
                    text: data?.order?.customer?.address?.postalCode,
                  },
                  {
                    title: 'Street',
                    text: data?.order?.customer?.address?.street,
                  },
                ]}
              />
            )}

            <Box
              marginBottom="xl"
              borderRadius={30}
              paddingVertical="m"
              paddingHorizontal="l"
              backgroundColor="white"
              elevation={4}
            >
              <Text variant="subtitle" marginBottom="m">
                Order summary
              </Text>

              <OrderDetail
                listKey={`info-${params?.id}`}
                items={data?.order?.items}
                total={data?.order?.total}
              />
            </Box>
          </>
        )}
      />
    </>
  )
}

export default Order
