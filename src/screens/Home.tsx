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
            Lorem Ipsum & Dolor sit amet
          </Text>

          <Text>Lorem ipsum dolor sit amet</Text>
        </Box>

        <Button title="Enter" onPress={() => navigation.push('SignIn')} />
      </Box>
    </>
  )
}

export default Home
