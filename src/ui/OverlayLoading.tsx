import React from 'react'
import { ViewStyle } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { useTheme } from '@shopify/restyle'

import Box from './Box'

import { Theme } from 'styles/theme'

type Props = {
  loading: boolean
  style?: ViewStyle
}

const OverlayLoading = ({ loading, style }: Props) => {
  const theme = useTheme<Theme>()

  return loading ? (
    <Box
      position="absolute"
      width="100%"
      height="100%"
      backgroundColor="background"
      alignItems="center"
      justifyContent="center"
      opacity={0.7}
      borderRadius={18}
    >
      <ActivityIndicator
        animating={true}
        size="small"
        color={theme.colors.primary}
      />
    </Box>
  ) : null
}

export default React.memo(OverlayLoading)
