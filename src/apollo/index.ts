import { ApolloClient, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { RestLink } from 'apollo-link-rest'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { AUTH_TOKEN } from 'constants/global'
import { API_URL } from '@env'

const restLink = new RestLink({
  uri: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem(AUTH_TOKEN)

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(restLink),
})

export default client
