import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { Image } from 'react-native'

import { RootStackParamList } from 'types/stack'
import { Box, Button, Text } from 'ui'

import PLACEHOLDER from 'assets/images/image-placeholder.png'

type Props = StackScreenProps<RootStackParamList, 'Home'>

const Home = ({ navigation }: Props) => {
  return (
    <>
      <Image
        source={PLACEHOLDER}
        style={{
          flex: 2,
          width: '100%',
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        }}
        resizeMode="cover"
      />

      <Box flex={1} padding="xl" justifyContent="space-between">
        <Box marginBottom="xl">
          <Text variant="title" marginBottom="m">
            Pasto
          </Text>

          <Text variant="subtitle">Order your favorite food...</Text>
        </Box>

        <Button title="Enter" onPress={() => navigation.push('SignIn')} />
      </Box>
    </>
  )
}

export default Home
