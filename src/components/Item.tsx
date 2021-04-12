import React from 'react'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { Image } from 'react-native'

import { Box, Text, ActionButton } from 'ui'

import PLACEHOLDER from 'assets/images/image-placeholder.png'

type Props = {
  variant?: 'primary' | 'secondary'
  title: string
  description?: string
  picture?: string
}

const Item = ({ variant = 'primary', title, description, picture }: Props) => {
  return (
    <Swipeable
      containerStyle={{ overflow: 'visible' }}
      renderLeftActions={() => (
        <ActionButton side="left" onPress={() => console.log('close')} />
      )}
      renderRightActions={() => (
        <ActionButton side="right" onPress={() => console.log('close')} />
      )}
    >
      <Box
        flex={1}
        flexDirection="row"
        borderRadius={16}
        height={130}
        backgroundColor="white"
        marginHorizontal="xl"
        marginVertical="s"
        elevation={5}
      >
        <Box flex={1} padding="m" flexDirection="column">
          <Text variant="item" marginBottom="xs">
            {title}
          </Text>

          {!!description && <Text>{description}</Text>}
        </Box>

        <Image
          source={PLACEHOLDER}
          style={{
            width: 130,
            height: '100%',
            borderRadius: 16,
          }}
          resizeMode="cover"
        />
      </Box>
    </Swipeable>
  )
}

export default Item
