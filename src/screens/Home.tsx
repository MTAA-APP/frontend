import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'

import { Box, Button, Text } from 'ui'
import { RootStackParamList } from 'types/stack'

type Props = StackScreenProps<RootStackParamList, 'Home'>

const Home = ({ navigation }: Props) => {
  return (
    <>
      <Box height="75%" width="100%" backgroundColor="black" borderRadius={16} />

      <Box padding="xl" flex={1} flexDirection="column">
        <Text variant="title" marginBottom="m">Lorem Ipsum & Dolor sit amet</Text>

        <Text>Lorem ipsum dolor sit amet.</Text>

        <Button title="Sign In" onPress={() => navigation.push('SignIn')} />
      </Box>
    </>
  )
}

export default Home
