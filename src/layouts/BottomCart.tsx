import React from 'react'

import { Box, Button, Text } from 'ui'
import { Children } from 'types/global'

type Props = {
  children: Children
}

const BottomCart = ({ children }: Props) => {
  return (
    <Box position="absolute" padding="xl">
      <Button title="To cart" onPress={() => {}} />
    </Box>
  )
}

export default BottomCart
