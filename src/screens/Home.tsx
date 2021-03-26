import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'

import { RootStackParamList } from 'types/stack'
import { Box, Text } from 'ui'

type Props = StackScreenProps<RootStackParamList, 'Home'>

const Home = ({ navigation }: Props) => (
  <Box
    backgroundColor="mainBackground"
    flex={1}
    justifyContent="center"
    alignItems="center"
  >
    <Text color="mainText">Welcome to our new app Filipe !</Text>
  </Box>
)

export default Home
