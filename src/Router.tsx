import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { Home } from 'screens'
import { Header } from 'components'
import { RootStackParamList } from 'types/stack'

const Stack = createStackNavigator<RootStackParamList>()

const Router = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerTitle: (props) => <Header {...props} />,
        headerStyle: {
          backgroundColor: '#FBFBFB',
          elevation: 0,
          shadowOpacity: 0,
        },
        cardStyle: {
          backgroundColor: '#FBFBFB',
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
)

export default Router
