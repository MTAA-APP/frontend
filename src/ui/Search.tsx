import React from 'react'
import { Image, TextInput } from 'react-native'
import { useTheme } from '@shopify/restyle'

import Box from './Box'

import { Theme } from 'styles/theme'

import SEARCH_ICON from 'assets/icons/search.png'

type Props = {
  onChangeText: (value: string) => void
}

const Search = ({ onChangeText }: Props) => {
  const theme = useTheme<Theme>()

  return (
    <Box height={24} flexDirection="row" marginBottom="xl">
      <Image
        source={SEARCH_ICON}
        style={{
          height: 24,
          width: 24,
          marginRight: 16,
        }}
        resizeMode="contain"
      />

      <TextInput
        style={{
          flex: 1,
          color: theme.colors.title,
          borderBottomColor: '#DBDCDD',
          borderStyle: 'solid',
          borderBottomWidth: 1,
        }}
      />
    </Box>
  )
}

export default Search
