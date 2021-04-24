import React, { useCallback } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { Image } from 'react-native'

import { BottomInfo, Box, Button, Input, OverlayLoading, Text } from 'ui'
import { useContext, useToggle } from 'hooks'
import { RootStackParamList } from 'types/stack'
import { AuthPayload } from 'types/datamodels'

import { SIGN_IN } from 'apollo/mutations'

import PLACEHOLDER from 'assets/images/image-placeholder.png'
import { ActivityIndicator } from 'react-native-paper'

type Props = StackScreenProps<RootStackParamList, 'SignIn'>

type FormValues = {
  email: string
  password: string
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
})

const initialValues: FormValues = {
  email: '',
  password: '',
}

type MutationProps = { signin: AuthPayload }

const SignIn = ({ navigation }: Props) => {
  const [signin] = useMutation<MutationProps>(SIGN_IN)

  const { login } = useContext('auth')
  const { show } = useContext('snackbar')
  const {
    isVisible: loading,
    show: showLoading,
    hide: hideLoading,
  } = useToggle()

  const onSubmit = useCallback((values: FormValues) => {
    signin({ variables: { body: values } })
      .then(({ data, errors }) => {
        showLoading()
        if (!data?.signin || !!errors) throw Error()
        login(data?.signin?.token)
        show({ text: 'Successfully logged in', variant: 'success' })
      })
      .catch(({ networkError }) => {
        hideLoading()
        if (networkError?.message?.includes('401'))
          show({ text: 'Wrong password!', variant: 'error' })
        else show({ text: 'Account not found!', variant: 'error' })
      })
  }, [])

  return (
    <>
      <Image
        source={PLACEHOLDER}
        style={{
          flex: 1,
          width: '100%',
          borderBottomLeftRadius: 18,
          borderBottomRightRadius: 18,
        }}
        resizeMode="cover"
      />

      <Box
        flex={1}
        padding="xl"
        justifyContent="space-between"
        position="relative"
      >
        <Box marginBottom="m">
          <Text variant="title" marginBottom="xl">
            Sign in
          </Text>

          <Formik
            {...{ initialValues, onSubmit, validationSchema }}
            validateOnChange
          >
            {({ handleSubmit }) => (
              <>
                <Field
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  type="email"
                  name="email"
                  label="Email address"
                  component={Input}
                />

                <Field
                  secureTextEntry={true}
                  textContentType="password"
                  type="password"
                  name="password"
                  label="Password"
                  component={Input}
                />

                <Button
                  style={{ marginTop: 16 }}
                  title="Sign In"
                  onPress={handleSubmit}
                />
              </>
            )}
          </Formik>

          <OverlayLoading loading={loading} />
        </Box>

        <BottomInfo
          text="I don't have an account."
          buttonText="Sign up"
          route="SignUp"
        />
      </Box>
    </>
  )
}

export default SignIn
