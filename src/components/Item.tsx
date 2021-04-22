import React, { useRef } from 'react'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { Image, TouchableWithoutFeedback } from 'react-native'

import { Box, Text, ActionButton } from 'ui'
import { Children } from 'types/global'

import PLACEHOLDER from 'assets/images/image-placeholder.png'
import DELETE_ICON from 'assets/icons/delete.png'
import STAR_ICON from 'assets/icons/star.png'

type Props = {
  variant?: 'primary' | 'secondary'
  title: string
  description?: string
  picture?: string
  leftIcon?: number
  handlePress: () => void
  handleLeftPress?: () => void
  handleRightPress?: () => void
  children?: Children
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
  children,
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
            icon={leftIcon || STAR_ICON}
            backgroundColor="secondary"
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
            backgroundColor="primary"
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
          alignItems="center"
          minHeight={128}
          borderRadius={30}
          backgroundColor="white"
          marginHorizontal="xl"
          marginVertical="s"
          elevation={4}
          position="relative"
        >
          <Box flex={1} height="100%" padding="l" flexDirection="column">
            <Text variant="item" marginBottom="xs">
              {title}
            </Text>

            {!!description && <Text marginBottom="m">{description}</Text>}

            {children}
          </Box>

          <Image
            source={picture ? { uri: picture } : PLACEHOLDER}
            style={{
              width: 130,
              height: variant === 'secondary' ? '80%' : '100%',
              borderRadius: 30,
              marginRight: variant === 'secondary' ? -10 : 0,
            }}
            resizeMode={variant === 'secondary' ? 'center' : 'cover'}
          />
        </Box>
      </TouchableWithoutFeedback>
    </Swipeable>
  )
}

export default Item
