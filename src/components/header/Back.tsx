import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Image } from 'react-native'

import ARROW_BACK_ICON from 'assets/icons/arrow-back.png'

const Back = () => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={navigation.goBack}
      style={{
        padding: 8,
        marginLeft: 22,
        marginTop: 28,
        zIndex: 50,
      }}
    >
      <Image source={ARROW_BACK_ICON} style={{ width: 9, height: 17 }} />
    </TouchableOpacity>
  )
}

export default Back
