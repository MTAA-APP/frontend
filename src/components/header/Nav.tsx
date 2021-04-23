import React, { useCallback, useMemo } from 'react'
import { useNavigation } from '@react-navigation/native'
import { FlatList, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

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

type NavItem = {
  icon: number
  route: keyof RootStackParamList
  visible: boolean
}

const Nav = () => {
  const navigation = useNavigation()

  const { user, logout } = useContext('auth')
  const { isVisible, show, hide } = useToggle()

  const isService: boolean = useMemo(() => user?.role === Role.SERVICE, [user])
  const keyExtractor = useCallback((_, idx: number) => `nav-${idx}`, [])

  const navigate = useCallback(
    (route: keyof RootStackParamList) => () => {
      navigation.navigate(route)
      hide()
    },
    [navigation]
  )

  const navItems: NavItem[] = useMemo(
    () => [
      {
        icon: HOME_ICON,
        route: isService ? 'Orders' : 'Services',
        visible: true,
      },
      { icon: CART_ICON, route: 'Cart', visible: !isService },
      { icon: ORDERS_ICON, route: 'MyOrders', visible: !isService },
      { icon: ITEMS_ICON, route: 'MyMenu', visible: isService },
      {
        icon: PROFILE_ICON,
        route: isService ? 'ServiceProfile' : 'CustomerProfile',
        visible: true,
      },
    ],
    [user]
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
          borderRadius={200}
          zIndex={1000}
        >
          <TouchableOpacity style={{ padding: 16 }} onPress={hide}>
            <Image
              source={CLOSE_ICON}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <FlatList
            data={navItems}
            keyExtractor={keyExtractor}
            renderItem={({ item }) =>
              item.visible ? (
                <TouchableOpacity
                  onPress={navigate(item.route)}
                  style={{ width: 50, height: 50, padding: 16 }}
                >
                  <Image
                    accessible
                    source={item.icon}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ) : null
            }
          />

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

export default React.memo(Nav)
