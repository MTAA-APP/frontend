import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

import Box from './Box'

type Props = {
  side?: 'left' | 'right'
  onPress: () => void
}

const ActionButton = ({ side = 'left', onPress }: Props) => (
  <TouchableOpacity
    {...onPress}
    style={{
      ...(side === 'left' ? { marginRight: -14 } : { marginLeft: -14 }),
      overflow: 'visible',
    }}
  >
    <Box
      accessible
      height={130}
      width={85}
      borderRadius={16}
      backgroundColor="selected"
      marginVertical="s"
      {...(side === 'left' ? { marginLeft: 'xl' } : { marginRight: 'xl' })}
    />
  </TouchableOpacity>
)

export default ActionButton
