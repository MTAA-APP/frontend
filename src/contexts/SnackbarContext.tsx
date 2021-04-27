import React, { createContext, useState, useMemo, useCallback } from 'react'
import { Snackbar } from 'react-native-paper'
import { useTheme } from '@shopify/restyle'

import { Children } from 'types/global'

import { Theme } from 'styles/theme'

type Props = {
  children: Children
}

type Options = {
  text: string
  variant: 'success' | 'error'
}

export type SnackbarContextValue = {
  show: (options: Options) => void
}

export const SnackbarContext = createContext<SnackbarContextValue>(undefined!)

export const SnackbarProvider = ({ children }: Props) => {
  const theme = useTheme<Theme>()

  const [options, setOptions] = useState<Options>(undefined!)

  const show = useCallback((options: Options) => setOptions(options), [])

  const hide = useCallback(() => setOptions(undefined!), [])

  const value = useMemo(
    () => ({
      show,
    }),
    [show]
  )

  return (
    <SnackbarContext.Provider {...{ value }}>
      {children}

      <Snackbar
        style={{
          borderRadius: 30,
          backgroundColor: theme.colors[options?.variant],
        }}
        visible={!!options}
        onDismiss={hide}
        duration={4000}
      >
        {options?.text}
      </Snackbar>
    </SnackbarContext.Provider>
  )
}
