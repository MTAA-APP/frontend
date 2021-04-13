import React from 'react'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { Image } from 'react-native'

import { Box, Text, ActionButton } from 'ui'

import PLACEHOLDER from 'assets/images/image-placeholder.png'
import CROSS_ICON from 'assets/icons/cross.png'
import READY_ICON from 'assets/icons/ready.png'

type Props = {
  title?: string
  description?: string
}

const OrderBox = ({ title, description }: Props) => {
  return (
    <Swipeable
      containerStyle={{ overflow: 'visible' }}
      renderLeftActions={() => (
        <ActionButton
          variant="secondary"
          side="left"
          icon={READY_ICON}
          onPress={() => console.log('close')}
        />
      )}
      renderRightActions={() => (
        <ActionButton
          variant="secondary"
          side="right"
          icon={CROSS_ICON}
          onPress={() => console.log('close')}
        />
      )}
    >
      <Box
        flex={1}
        flexDirection="row"
        borderRadius={16}
        minHeight={85}
        padding="m"
        backgroundColor="white"
        marginHorizontal="xl"
        marginVertical="s"
        elevation={5}
      >
        <Image
          source={PLACEHOLDER}
          style={{
            width: 53,
            height: 53,
            borderRadius: 100,
            marginRight: 16,
          }}
          resizeMode="cover"
        />

        <Box flexDirection="column">
          <Text variant="order">{title}</Text>
          <Text variant="label">{description}</Text>
        </Box>
      </Box>
    </Swipeable>
  )
}

export default OrderBox
