import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from '@shopify/restyle'
import 'react-native-gesture-handler'

import client from './src/apollo'
import Router from './src/Router'
import LoadAssets from './src/components/LoadAssets'

import { AuthProvider } from './src/contexts/AuthContext'

import theme from './src/styles/theme'

const App = () => (
  <ApolloProvider {...{ client }}>
    <ThemeProvider {...{ theme }}>
      <LoadAssets>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </LoadAssets>
    </ThemeProvider>
  </ApolloProvider>
)

export default App
