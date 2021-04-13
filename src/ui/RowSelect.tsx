import React, { useMemo } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FlatList } from 'react-native'

import Box from './Box'
import Text from './Text'
import { ServiceCategory } from 'types/enums'
import { SERVICE_CATEGORY } from 'constants/enums'

type Props = {
  items: ServiceCategory[]
  selected: ServiceCategory | undefined
  handleSelect: (category?: ServiceCategory) => void
}

const RowSelect = ({ items, selected, handleSelect }: Props) => {
  const data = useMemo(() => [undefined, ...items], [items])

  return (
    <Box>
      <FlatList
        data={data}
        horizontal
        scrollToOverflowEnabled
        showsHorizontalScrollIndicator={false}
        style={{ overflow: 'visible' }}
        keyExtractor={(index) => `${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelect(item)}>
            <Box
              accessible
              paddingVertical="xs"
              paddingHorizontal="m"
              borderRadius={16}
              marginRight="s"
              backgroundColor={item === selected ? 'selected' : 'label'}
            >
              <Text color="title" fontSize={10}>
                {item ? SERVICE_CATEGORY[item] : 'All'}
              </Text>
            </Box>
          </TouchableOpacity>
        )}
      />
    </Box>
  )
}

export default RowSelect
