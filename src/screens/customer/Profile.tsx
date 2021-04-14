import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import * as Yup from 'yup'
import { useQuery } from '@apollo/client'

import { RootStackParamList } from 'types/stack'
import { Box, Button, Input, Text } from 'ui'
import { Field, Formik } from 'formik'
import { Customer } from 'types/datamodels'

import { GET_CUSTOMER_PROFILE } from 'apollo/queries'
import AppLoading from 'expo-app-loading'

type Props = StackScreenProps<RootStackParamList, 'CustomerProfile'>

type FormValues = {
  email: string
  firstName: string
  lastName: string
  phone: string
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  phone: Yup.string().required(),
})

type QueryType = { getCustomerProfile: Customer }

const Profile = ({ navigation }: Props) => {

  const onSubmit = (values: FormValues) => { console.log(values) }

  const { data, loading } = useQuery<QueryType>(GET_CUSTOMER_PROFILE)

  const initialValues: FormValues = {
    email: data?.getCustomerProfile?.email||'',
    firstName: data?.getCustomerProfile?.firstName||'',
    lastName: data?.getCustomerProfile?.lastName||'',
    phone: data?.getCustomerProfile?.phone||'',
  }

  if (loading) return <AppLoading />
    return (
    <>
      <Box flex={1} padding="xl" justifyContent="space-between">
        <Box marginTop="xxxl">

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
                  type="firstName"
                  name="firstName"
                  label="First name"
                  component={Input}
                />

                <Field
                  type="lastName"
                  name="lastName"
                  label="Last name"
                  component={Input}
                />

                <Field
                  type="phone"
                  name="phone"
                  label="Phone"
                  component={Input}
                />

                <Button title="Save" onPress={handleSubmit} />
              </>
            )}
            </Formik>
          </Box>
        </Box>
        
    </>
  )
}

export default Profile
