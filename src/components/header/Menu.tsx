import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'

import { useContext } from 'hooks'

import BURGER_ICON from 'assets/icons/menu.png'

// TODO: modal

const Menu = () => {
  const navigation = useNavigation()
  const { logout } = useContext('auth')

  return (
    <TouchableOpacity
      onPress={logout}
      style={{
        position: 'relative',
        padding: 8,
        marginRight: 22,
        marginTop: 28,
      }}
    >
      <Image source={BURGER_ICON} style={{ width: 28, height: 17 }} />
    </TouchableOpacity>
  )
}

export default Menu
