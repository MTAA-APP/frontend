import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'

import { Box, Button } from 'ui'
import { RootStackParamList } from 'types/stack'

type Props = StackScreenProps<RootStackParamList, 'Home'>

const Home = ({ navigation }: Props) => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Button title="Click me" onPress={() => console.log('clicked')} />
    </Box>
  )
}

export default Home
