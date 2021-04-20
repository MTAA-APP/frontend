import React, { useRef } from 'react'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { Image } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import { Box, Text, ActionButton } from 'ui'
import { Status } from 'types/enums'
import { Children } from 'types/global'
import { STATUS_ICON } from 'constants/icons'

import CLOSE_ICON from 'assets/icons/close.png'

type Props = {
  title?: string
  leftIcon: number
  status: Status
  children?: Children
  handlePress: () => void
  handleLeftPress?: () => void
  handleRightPress?: () => void
}

const OrderBox = ({
  title,
  leftIcon,
  status,
  children,
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
            backgroundColor="secondary"
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
            backgroundColor="primary"
            icon={CLOSE_ICON}
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
          borderRadius={30}
          minHeight={85}
          padding="m"
          backgroundColor="white"
          marginHorizontal="xl"
          marginVertical="s"
          elevation={1}
        >
          <Box
            width={53}
            height={53}
            borderRadius={100}
            marginRight="m"
            padding="m"
            backgroundColor="label"
          >
            <Image
              source={STATUS_ICON[status]}
              style={{ flex: 1, width: '100%' }}
              resizeMode="contain"
            />
          </Box>

          <Box flexDirection="column">
            <Text variant="order">{title}</Text>
            {children}
          </Box>
        </Box>
      </TouchableWithoutFeedback>
    </Swipeable>
  )
}

export default OrderBox
