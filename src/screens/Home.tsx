import React, { useCallback } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'

import { Box, Button, Input } from 'ui'
import { RootStackParamList } from 'types/stack'

type Props = StackScreenProps<RootStackParamList, 'Home'>

type FormValues = {
  email: string
  password: string
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(3),
})

const Home = ({ navigation }: Props) => {
  const initialValues: FormValues = {
    email: '',
    password: '',
  }

  const onSubmit = useCallback((values: FormValues) => {
    console.log(values)
  }, [])

  return (
    <Formik {...{ initialValues, onSubmit, validationSchema }} validateOnChange>
      {({ handleSubmit }) => (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Field
            keyboardType="email-address"
            textContentType="emailAddress"
            type="email"
            name="email"
            label="Email"
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
        </Box>
      )}
    </Formik>
  )
}

export default Home
