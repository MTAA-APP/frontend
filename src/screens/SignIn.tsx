import React, { useCallback, useMemo } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'

import { Box, Button, Input, Text } from 'ui'
import { RootStackParamList } from 'types/stack'

type Props = StackScreenProps<RootStackParamList, 'SignIn'>

type FormValues = {
  email: string
  password: string
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(3),
})

const SignIn = ({ navigation }: Props) => {
  const initialValues: FormValues = useMemo(
    () => ({
      email: '',
      password: '',
    }),
    []
  )

  const onSubmit = useCallback((values: FormValues) => {
    console.log(values)
  }, [])

  return (
    <Box flex={1}>
      <Box
        height="50%"
        flex={1}
        backgroundColor="black"
        borderBottomLeftRadius={18}
        borderBottomRightRadius={18}
      />

      <Box
        flex={1}
        flexDirection="column"
        padding="xl"
        justifyContent="space-between"
      >
        <Box marginBottom="xl">
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

                <Button title="Sign In" onPress={handleSubmit} />
              </>
            )}
          </Formik>
        </Box>

        <Text textAlign="center" marginBottom="xl">
          I don't have an account.
          <Text onPress={() => navigation.push('SignUp')}> Sign up</Text>
        </Text>
      </Box>
    </Box>
  )
}

export default SignIn
