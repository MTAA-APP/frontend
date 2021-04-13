import React from 'react'
import { Image } from 'react-native'

import Box from './Box'
import Text from './Text'

import EMPTY_ICON from 'assets/icons/empty.png'
import AppLoading from 'expo-app-loading'

type Props = {
  text?: string
  loading?: boolean
}

const NoData = ({ text, loading = true }: Props) =>
  loading ? (
    <AppLoading />
  ) : (
    <Box flex={1} justifyContent="center" alignItems="center" padding="xl">
      <Image
        source={EMPTY_ICON}
        style={{ width: 35, height: 34, marginBottom: 10 }}
        resizeMode="contain"
      />

      <Text variant="body" textAlign="center" style={{ maxWidth: '40%' }}>
        {text}
      </Text>
    </Box>
  )

export default NoData
