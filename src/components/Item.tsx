import React, { useRef } from 'react'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { Image } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import { Box, Text, ActionButton } from 'ui'

import PLACEHOLDER from 'assets/images/image-placeholder.png'
import DELETE_ICON from 'assets/icons/delete.png'

type Props = {
  variant?: 'primary' | 'secondary'
  title: string
  description?: string
  picture?: string
  leftIcon: number
  handlePress: () => void
  handleLeftPress?: () => void
  handleRightPress?: () => void
}

const Item = ({
  variant = 'primary',
  title,
  description,
  picture,
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
            side="right"
            icon={DELETE_ICON}
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
      </TouchableWithoutFeedback>
    </Swipeable>
  )
}

export default Item
