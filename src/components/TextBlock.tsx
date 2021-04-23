import React from 'react'
import { FlatList, ViewStyle } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import { Box, Text } from 'ui'

type Item = {
  title: string
  text?: string
  onPress?: () => void
}

type Props = {
  title: string
  data: Item[]
  onPress?: () => void
  style?: ViewStyle
}

const TextBlock = ({ title, data, onPress, style }: Props) => (
  <Box
    style={style}
    marginBottom="xl"
    borderRadius={30}
    paddingVertical="m"
    paddingHorizontal="l"
    backgroundColor="white"
    elevation={4}
  >
    <TouchableWithoutFeedback onPress={onPress}>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        paddingBottom="s"
      >
        <Text variant="subtitle">{title}</Text>
        <Text variant="label" color="selected">
          press to edit
        </Text>
      </Box>

      <FlatList
        data={data}
        keyExtractor={(item) => item?.title}
        listKey={title}
        renderItem={({ item }) => (
          <Box flex={1} flexDirection="row" paddingVertical="xs">
            <Box flex={2}>
              <Text fontFamily="Rubik_500Medium">{item?.title}</Text>
            </Box>
            <Box flex={4}>
              <Text onPress={item?.onPress}>{item?.text || 'none'}</Text>
            </Box>
          </Box>
        )}
      />
    </TouchableWithoutFeedback>
  </Box>
)

export default React.memo(TextBlock)
