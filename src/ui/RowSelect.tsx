import React, { useMemo } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FlatList } from 'react-native'

import Box from './Box'
import Text from './Text'
import { ServiceCategory } from 'types/enums'
import { SERVICE_CATEGORY } from 'constants/enums'

type Props = {
  items: ServiceCategory[]
  selected?: ServiceCategory
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
              paddingVertical="s"
              paddingHorizontal="l"
              marginRight="s"
              borderRadius={22}
              backgroundColor={item === selected ? 'primary' : 'white'}
            >
              <Text
                fontFamily="Rubik_500Medium"
                color={item === selected ? 'white' : 'title'}
                fontSize={12}
              >
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
