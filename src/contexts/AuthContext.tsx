import React, { createContext, useMemo, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ApolloQueryResult, useQuery } from '@apollo/client'

import client from 'apollo'
import { User } from 'types/datamodels'
import { Children } from 'types/global'
import { AUTH_TOKEN } from 'constants/global'

import { GET_ME } from 'apollo/queries'

type Refetch = Promise<ApolloQueryResult<{ getMe: User }>>

export type AuthContextValue = {
  user?: User
  isLogged: boolean
  loading: boolean
  login: (token: string) => Refetch
  logout: () => Refetch
}

type Props = {
  children: Children
}

export const AuthContext = createContext<AuthContextValue>(undefined!)

export const AuthProvider = ({ children }: Props) => {
  const { data, loading, error, refetch } = useQuery<{ getMe: User }>(GET_ME, {
    fetchPolicy: 'network-only',
  })

  const login = useCallback(async (token: string) => {
    await AsyncStorage.setItem(AUTH_TOKEN, token)
    return refetch()
  }, [])

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem(AUTH_TOKEN)
    await client.clearStore()
    return await refetch()
  }, [client])

  const value = useMemo(
    () => ({
      user: data?.getMe,
      isLogged: !!data?.getMe && !error,
      loading,
      login,
      logout,
    }),
    [data, error, loading, login, logout]
  )

  return <AuthContext.Provider {...{ value }}>{children}</AuthContext.Provider>
}
