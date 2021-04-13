import React, { useCallback } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import { Image } from 'react-native'
import { useMutation } from '@apollo/client'

import { RootStackParamList } from 'types/stack'
import { Box, Text, Input, Button, BottomInfo } from 'ui'
import { useContext } from 'hooks'
import { AuthPayload } from 'types/datamodels'

import { CUSTOMER_SIGNUP } from 'apollo/mutations'

import PLACEHOLDER from 'assets/images/image-placeholder.png'

type Props = StackScreenProps<RootStackParamList, 'CustomerSignUp'>

type FormValues = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirm: string
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(3),
  confirm: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'passwords must match'),
})

const initialValues: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirm: '',
}

// TODO: errors

const Customer = ({ navigation }: Props) => {
  const [signup] = useMutation<{ customerSignup: AuthPayload }>(CUSTOMER_SIGNUP)

  const { login } = useContext('auth')

  const onSubmit = useCallback(({ confirm, ...values }: FormValues) => {
    signup({ variables: { body: values } })
      .then(({ data, errors }) => {
        if (!data?.customerSignup || !!errors) throw Error()
        login(data?.customerSignup?.token)
      })
      .catch((err) => console.log('Error', err))
  }, [])

  return (
    <>
      <Image
        source={PLACEHOLDER}
        style={{
          flex: 1,
          width: '100%',
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        }}
        resizeMode="cover"
      />

      <Box flex={3} padding="xl" justifyContent="space-between">
        <Box marginBottom="m">
          <Text variant="title" marginBottom="xs">
            Customer
          </Text>

          <Text variant="label" paddingBottom="xl">
            Sign up as customer...
          </Text>

          <Formik
            {...{ initialValues, onSubmit, validationSchema }}
            validateOnChange
          >
            {({ handleSubmit }) => (
              <>
                <Field
                  type="text"
                  name="firstName"
                  label="First name"
                  component={Input}
                />

                <Field
                  type="text"
                  name="lastName"
                  label="Last name"
                  component={Input}
                />

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

                <Field
                  secureTextEntry={true}
                  textContentType="password"
                  type="password"
                  name="confirm"
                  label="Confirm password"
                  component={Input}
                />

                <Button title="Sign Up" onPress={handleSubmit} />
              </>
            )}
          </Formik>
        </Box>

        <BottomInfo
          text="I have an account."
          buttonText="Sign in"
          route="SignIn"
        />
      </Box>
    </>
  )
}

export default Customer
