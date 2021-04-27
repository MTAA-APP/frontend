import React, { useCallback } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { RootStackParamList } from 'types/stack'
import Box from './Box'
import Text from './Text'

type Props = {
  text: string
  buttonText: string
  route: keyof RootStackParamList
}

const BottomInfo = ({ text, buttonText, route }: Props) => {
  const navigation = useNavigation()

  const handlePress = useCallback(() => navigation.navigate(route), [route])

  return (
    <Box flexDirection="row" justifyContent="center">
      <Text variant="label">{text} </Text>

      <TouchableOpacity onPress={handlePress}>
        <Text variant="label" color="selected">
          {buttonText}
        </Text>
      </TouchableOpacity>
    </Box>
  )
}

export default React.memo(BottomInfo)
