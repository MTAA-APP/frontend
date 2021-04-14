import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Image, TextInput } from 'react-native'
import { useTheme } from '@shopify/restyle'

import Box from './Box'

import { Theme } from 'styles/theme'

import SEARCH_ICON from 'assets/icons/search.png'
import CROSS_ICON from 'assets/icons/cross.png'

type Props = {
  value: string
  onChangeText: (value: string) => void
}

const Search = ({ value, onChangeText }: Props) => {
  const theme = useTheme<Theme>()

  return (
    <Box height={24} flexDirection="row" marginBottom="xl" position="relative">
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
        onChangeText={(value: string) => onChangeText(value)}
        value={value}
        style={{
          flex: 1,
          color: theme.colors.title,
          borderBottomColor: '#DBDCDD',
          borderStyle: 'solid',
          paddingBottom: 5,
          borderBottomWidth: 1,
        }}
      />

      {!!value && (
        <Box position="absolute" right={0} bottom={8}>
          <TouchableOpacity onPress={() => onChangeText(undefined!)}>
            <Image
              source={CROSS_ICON}
              style={{
                height: 10,
                width: 10,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </Box>
      )}
    </Box>
  )
}

export default Search
