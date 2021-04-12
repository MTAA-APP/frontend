import { useContext } from 'react'

import { AuthContext, AuthContextValue } from 'contexts'

type ContextName = 'auth'

export default ((name: ContextName) => {
  return {
    auth: useContext<AuthContextValue>(AuthContext),
  }[name]
}) as (name: 'auth') => AuthContextValue
