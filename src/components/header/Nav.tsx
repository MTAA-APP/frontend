import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Image } from 'react-native'

import { RootStackParamList } from 'types/stack'
import { Box } from 'ui'
import { useContext, useToggle } from 'hooks'
import { Role } from 'types/enums'

import BURGER_ICON from 'assets/icons/menu.png'
import CLOSE_ICON from 'assets/icons/close.png'
import LOGOUT_ICON from 'assets/icons/logout.png'
import HOME_ICON from 'assets/icons/home.png'
import CART_ICON from 'assets/icons/cart.png'
import PROFILE_ICON from 'assets/icons/person.png'
import ORDERS_ICON from 'assets/icons/orders.png'
import ITEMS_ICON from 'assets/icons/items.png'

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
          backgroundColor="title"
          alignItems="center"
          position="absolute"
          padding="s"
          top={-18}
          right={-12}
          zIndex={100}
          elevation={30}
          borderRadius={200}
        >
          <TouchableOpacity style={{ padding: 16 }} onPress={hide}>
            <Image
              source={CLOSE_ICON}
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
              style={{ width: 18, height: 18 }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {user?.role === Role.CUSTOMER && (
            <TouchableOpacity
              style={{ padding: 16 }}
              onPress={() => navigate('Cart')}
            >
              <Image
                source={CART_ICON}
                style={{ width: 18, height: 18 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}

          {user?.role === Role.CUSTOMER && (
            <TouchableOpacity
              style={{ padding: 16 }}
              onPress={() => navigate('MyOrders')}
            >
              <Image
                source={ORDERS_ICON}
                style={{ width: 18, height: 18 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}

          {user?.role === Role.SERVICE && (
            <TouchableOpacity
              style={{ padding: 16 }}
              onPress={() => navigate('MyMenu')}
            >
              <Image
                source={ITEMS_ICON}
                style={{ width: 18, height: 18 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={{ padding: 16 }}
            onPress={() =>
              navigate(
                user?.role === Role.SERVICE
                  ? 'ServiceProfile'
                  : 'CustomerProfile'
              )
            }
          >
            <Image
              source={PROFILE_ICON}
              style={{ width: 18, height: 18 }}
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
