import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Image } from 'react-native'
import { BoxProps } from '@shopify/restyle'

import Box from './Box'

import { Theme } from 'styles/theme'

type Props = BoxProps<Theme> & {
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
  ...rest
}: Props) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      ...(side === 'right' ? { marginLeft: -14 } : { marginRight: -14 }),
    }}
  >
    <Box
      {...rest}
      height={variant === 'secondary' ? 85 : 130}
      width={variant === 'secondary' ? 54 : 85}
      borderRadius={30}
      marginVertical="s"
      justifyContent="center"
      alignItems="center"
      {...(side === 'right' ? { marginRight: 'xl' } : { marginLeft: 'xl' })}
    >
      <Image
        source={icon}
        style={{ width: '100%', height: '15%', maxWidth: '55%' }}
        resizeMode="contain"
      />
    </Box>
  </TouchableOpacity>
)

export default ActionButton
