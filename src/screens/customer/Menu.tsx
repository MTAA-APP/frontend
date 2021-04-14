import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'

import { RootStackParamList } from 'types/stack'
import { Box, Text } from 'ui'

type Props = StackScreenProps<RootStackParamList, 'Menu'>

const Menu = ({ navigation, route: { params } }: Props) => {
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Text>Service menu</Text>
      <Text variant="label">{params?.id}</Text>
    </Box>
  )
}

export default Menu
