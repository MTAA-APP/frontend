import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'

import { Box, Button, Text } from 'ui'
import { RootStackParamList } from 'types/stack'

type Props = StackScreenProps<RootStackParamList, 'Home'>

const Home = ({ navigation }: Props) => {
  return (
    <Box flex={1}>
      <Box
        height="75%"
        flex={1}
        backgroundColor="black"
        borderBottomLeftRadius={18}
        borderBottomRightRadius={18}
      />

      <Box
        flex={1}
        padding="xl"
        justifyContent="space-between"
        flexDirection="column"
      >
        <Box marginBottom="xl">
          <Text variant="title" marginBottom="xl">
            Lorem Ipsum & Dolor sit amet
          </Text>

          <Text>Lorem ipsum dolor sit amet</Text>
        </Box>

        <Button title="Sign In" onPress={() => navigation.push('SignIn')} />
      </Box>
    </Box>
  )
}

export default Home
