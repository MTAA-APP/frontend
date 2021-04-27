import { useContext } from 'react'

import {
  AuthContext,
  AuthContextValue,
  SnackbarContext,
  SnackbarContextValue,
} from 'contexts'

type ContextName = 'auth' | 'snackbar'

export default ((name: ContextName) => {
  return {
    auth: useContext<AuthContextValue>(AuthContext),
    snackbar: useContext<SnackbarContextValue>(SnackbarContext),
  }[name]
}) as ((name: 'auth') => AuthContextValue) &
  ((name: 'snackbar') => SnackbarContextValue)
