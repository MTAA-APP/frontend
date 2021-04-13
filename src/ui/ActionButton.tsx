import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Image } from 'react-native'

import Box from './Box'

type Props = {
  side?: 'left' | 'right'
  variant?: 'primary' | 'secondary'
  icon: number
  onPress: () => void
}

const ActionButton = ({
  side = 'left',
  variant = 'primary',
  icon,
  onPress,
}: Props) => (
  <TouchableOpacity
    {...onPress}
    style={{
      ...(side === 'right' ? { marginLeft: -14 } : { marginRight: -14 }),
    }}
  >
    <Box
      accessible
      height={variant === 'secondary' ? 85 : 130}
      width={variant === 'secondary' ? 54 : 85}
      borderRadius={16}
      backgroundColor="label"
      marginVertical="s"
      justifyContent="center"
      alignItems="center"
      padding={variant === 'secondary' ? 'ml' : 'xl'}
      {...(side === 'right' ? { marginRight: 'xl' } : { marginLeft: 'xl' })}
    >
      <Image
        source={icon}
        style={{ width: '100%', height: '100%' }}
        resizeMode="contain"
      />
    </Box>
  </TouchableOpacity>
)

export default ActionButton
