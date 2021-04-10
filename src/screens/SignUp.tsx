import React, { useCallback } from 'react'
import { StackScreenProps } from '@react-navigation/stack'

import { Box, Button } from 'ui'
import { RootStackParamList } from 'types/stack'

type Props = StackScreenProps<RootStackParamList, 'SignUp'>

const SignUp = ({ navigation }: Props) => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Button title="Customer" onPress={() => navigation.push('CustomerSignUp')} />
      <Button title="Service" onPress={() => navigation.push('ServiceSignUp')} />
    </Box>
  )
}

export default SignUp
