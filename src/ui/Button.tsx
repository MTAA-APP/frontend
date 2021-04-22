import React from 'react'
import { TouchableOpacity, ViewStyle } from 'react-native'

import Box from './Box'
import Text from './Text'

type Props = {
  title: string
  onPress?: () => void
  style?: ViewStyle
  condensed?: boolean
}

const Button = ({ title, onPress, condensed, ...props }: Props) => (
  <TouchableOpacity {...{ onPress, ...props }}>
    <Box
      accessible
      flex={1}
      paddingVertical={condensed ? 's' : 'll'}
      paddingHorizontal={condensed ? 'm' : 'xxl'}
      borderRadius={50}
      alignItems="center"
      justifyContent="center"
      backgroundColor="primary"
    >
      <Text variant="button" fontSize={condensed ? 14 : 18}>
        {title}
      </Text>
    </Box>
  </TouchableOpacity>
)

export default React.memo(Button)
