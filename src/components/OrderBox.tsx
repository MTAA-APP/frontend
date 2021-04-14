import React, { useRef } from 'react'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { Image } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import { Box, Text, ActionButton } from 'ui'

import PLACEHOLDER from 'assets/images/image-placeholder.png'
import CROSS_ICON from 'assets/icons/cross.png'

type Props = {
  title?: string
  description?: string
  leftIcon: number
  handlePress: () => void
  handleLeftPress?: () => void
  handleRightPress?: () => void
}

const OrderBox = ({
  title,
  description,
  leftIcon,
  handlePress,
  handleLeftPress,
  handleRightPress,
}: Props) => {
  const ref = useRef<Swipeable>(null)

  return (
    <Swipeable
      ref={ref}
      containerStyle={{ overflow: 'visible' }}
      renderLeftActions={() =>
        !!handleLeftPress && (
          <ActionButton
            variant="secondary"
            side="left"
            icon={leftIcon}
            onPress={() => {
              handleLeftPress()
              ref?.current?.close()
            }}
          />
        )
      }
      renderRightActions={() =>
        !!handleRightPress && (
          <ActionButton
            variant="secondary"
            side="right"
            icon={CROSS_ICON}
            onPress={() => {
              handleRightPress()
              ref?.current?.close()
            }}
          />
        )
      }
    >
      <TouchableWithoutFeedback onPress={handlePress}>
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
      </TouchableWithoutFeedback>
    </Swipeable>
  )
}

export default OrderBox
