import React, { useMemo } from 'react'
import { useTheme } from '@shopify/restyle'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AppLoading from 'expo-app-loading'

import { RootStackParamList } from 'types/stack'
import { Title, Nav, Back } from 'components'
import { useContext } from 'hooks'
import { Role } from 'types/enums'
import {
  Home,
  SignIn,
  SignUp,
  CustomerSignUp,
  ServiceSignUp,
  Services,
  Orders,
  Service,
  Menu,
  Cart,
  CustomerProfile,
  Order,
  MyOrders,
  MyMenu,
  ServiceProfile,
  ItemDetail,
} from 'screens'

import { Theme } from 'styles/theme'

const Stack = createStackNavigator<RootStackParamList>()

// TODO: headers
// TODO: protected routes
// TODO: config routes
// TODO: add ids to BE and FE

const Router = () => {
  const { isLogged, loading, user } = useContext('auth')

  const theme = useTheme<Theme>()

  const screenOptionsStyle = useMemo(
    () => ({
      headerTransparent: true,
      headerStyle: {
        backgroundColor: theme.colors.transparent,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTitleContainerStyle: {
        left: 0,
        right: 0,
      },
      cardStyle: {
        backgroundColor: theme.colors.background,
      },
    }),
    []
  )

  if (loading) return <AppLoading />

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        headerMode="screen"
        screenOptions={{
          headerTitle: (props) => <Title {...props} />,
          headerLeft: () => <Back />,
          headerRight: () => <Nav />,
          ...screenOptionsStyle,
        }}
      >
        {isLogged ? (
          user?.role === Role.SERVICE ? (
            <>
              <Stack.Screen
                name="Orders"
                component={Orders}
                options={{ headerLeft: () => false }}
              />

              <Stack.Screen
                name="Order"
                component={Order}
                options={{ headerTitle: () => false }}
              />

              <Stack.Screen
                name="MyMenu"
                component={MyMenu}
                options={{ headerLeft: () => false, title: 'My Menu' }}
              />

              <Stack.Screen
                name="ServiceProfile"
                component={ServiceProfile}
                options={{ headerLeft: () => false, title: 'Profile' }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Services"
                component={Services}
                options={{ headerLeft: () => false, headerTitle: () => false }}
              />

              <Stack.Screen
                name="Service"
                component={Service}
                options={{ headerTitle: () => false }}
              />

              <Stack.Screen name="Menu" component={Menu} />

              <Stack.Screen
                name="ItemDetail"
                component={ItemDetail}
                options={{ headerTitle: () => false }}
              />

              <Stack.Screen name="Cart" component={Cart} />

              <Stack.Screen
                name="MyOrders"
                component={MyOrders}
                options={{ headerLeft: () => false, title: 'My Orders' }}
              />

              <Stack.Screen
                name="CustomerProfile"
                component={CustomerProfile}
                options={{ headerLeft: () => false, title: 'Profile' }}
              />
            </>
          )
        ) : (
          <>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="CustomerSignUp"
              component={CustomerSignUp}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ServiceSignUp"
              component={ServiceSignUp}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router
