import React from 'react'
import 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { ThemeProvider } from '@shopify/restyle'
import theme from './src/styles/theme'

import { Home } from './src/screens'
import { RootStackParamList } from './src/types/stack'

const Stack = createStackNavigator<RootStackParamList>()

const App = () => (
  <ThemeProvider theme={theme}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  </ThemeProvider>
)

export default App
