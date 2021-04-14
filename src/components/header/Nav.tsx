import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Image } from 'react-native'

import { RootStackParamList } from 'types/stack'
import { Box } from 'ui'
import { useContext, useToggle } from 'hooks'
import { Role } from 'types/enums'

import BURGER_ICON from 'assets/icons/menu.png'
import CROSS_ICON from 'assets/icons/cross.png'
import LOGOUT_ICON from 'assets/icons/logout.png'
import HOME_ICON from 'assets/icons/home.png'

const Menu = () => {
  const navigation = useNavigation()

  const { user, logout } = useContext('auth')
  const { isVisible, show, hide } = useToggle()

  const navigate = useCallback(
    (route: keyof RootStackParamList) => {
      navigation.navigate(route)
      hide()
    },
    [navigation]
  )

  return (
    <Box position="relative" style={{ marginRight: 22, marginTop: 28 }}>
      {isVisible && (
        <Box
          backgroundColor="selected"
          alignItems="center"
          position="absolute"
          padding="s"
          top={-18}
          right={-12}
          zIndex={100}
          elevation={20}
          borderRadius={200}
        >
          <TouchableOpacity
            style={{ padding: 16, marginBottom: 4 }}
            onPress={hide}
          >
            <Image
              source={CROSS_ICON}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ padding: 16 }}
            onPress={() =>
              navigate(user?.role === Role.SERVICE ? 'Orders' : 'Services')
            }
          >
            <Image
              source={HOME_ICON}
              style={{ width: 16, height: 18 }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity style={{ padding: 16 }} onPress={logout}>
            <Image
              source={LOGOUT_ICON}
              style={{ width: 18, height: 18 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </Box>
      )}

      <TouchableOpacity onPress={show} style={{ padding: 8 }}>
        <Image source={BURGER_ICON} style={{ width: 28, height: 17 }} />
      </TouchableOpacity>
    </Box>
  )
}

export default Menu
