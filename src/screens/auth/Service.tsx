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
import { ServiceCategory } from 'types/enums'

import { SERVICE_SIGNUP } from 'apollo/mutations'

import PLACEHOLDER from 'assets/images/image-placeholder.png'

type Props = StackScreenProps<RootStackParamList, 'ServiceSignUp'>

type FormValues = {
  name: string
  category: ServiceCategory
  email: string
  password: string
  confirm: string
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(3),
  confirm: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'passwords must match'),
})

const initialValues: FormValues = {
  name: '',
  category: ServiceCategory.RESTAURANT,
  email: '',
  password: '',
  confirm: '',
}

// TODO: errors
// TODO: category select

const Service = ({ navigation }: Props) => {
  const [signup] = useMutation<{ serviceSignup: AuthPayload }>(SERVICE_SIGNUP)

  const { login } = useContext('auth')

  const onSubmit = useCallback(({ confirm, ...values }: FormValues) => {
    signup({ variables: { body: values } })
      .then(({ data, errors }) => {
        if (!data?.serviceSignup || !!errors) throw Error()
        login(data?.serviceSignup?.token)
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
            Service
          </Text>

          <Text variant="label" paddingBottom="xl">
            Pick your category and sign up...
          </Text>

          <Formik
            {...{ initialValues, onSubmit, validationSchema }}
            validateOnChange
          >
            {({ handleSubmit }) => (
              <>
                <Field type="text" name="name" label="Name" component={Input} />

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

export default Service
