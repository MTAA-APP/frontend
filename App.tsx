import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from '@shopify/restyle'
import 'react-native-gesture-handler'

import client from './src/apollo'
import Router from './src/Router'
import LoadAssets from './src/components/LoadAssets'

import { AuthProvider } from './src/contexts/AuthContext'
import { SnackbarProvider } from './src/contexts/SnackbarContext'

import theme from './src/styles/theme'
// TODO: splash screen

const App = () => (
  <ApolloProvider {...{ client }}>
    <ThemeProvider {...{ theme }}>
      <LoadAssets>
        <AuthProvider>
          <SnackbarProvider>
            <Router />
          </SnackbarProvider>
        </AuthProvider>
      </LoadAssets>
    </ThemeProvider>
  </ApolloProvider>
)

export default App
