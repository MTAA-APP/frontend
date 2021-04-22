import React from 'react'
import { FlatList } from 'react-native'

import { Box, Text } from 'ui'

type Item = {
  title: string
  text?: string
  onPress?: () => void
}

type Props = {
  title: string
  data: Item[]
}

const TextBlock = ({ title, data }: Props) => (
  <Box
    marginBottom="xl"
    borderRadius={30}
    paddingVertical="m"
    paddingHorizontal="l"
    backgroundColor="white"
    elevation={4}
  >
    <Text variant="subtitle" marginBottom="s">
      {title}
    </Text>

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
  </Box>
)

export default React.memo(TextBlock)
