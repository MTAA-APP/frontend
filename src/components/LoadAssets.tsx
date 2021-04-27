import React from 'react'
import AppLoading from 'expo-app-loading'
import {
  useFonts,
  Rubik_400Regular,
  Rubik_500Medium,
} from '@expo-google-fonts/rubik'

import { Children } from 'types/global'

type Props = {
  children: Children
}

const LoadAssets = ({ children }: Props) => {
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
  })

  return fontsLoaded ? children : <AppLoading />
}

export default LoadAssets
