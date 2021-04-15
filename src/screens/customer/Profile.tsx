import React, { useCallback, useMemo } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import * as Yup from 'yup'
import { useMutation, useQuery } from '@apollo/client'
import { Field, Formik } from 'formik'
import AppLoading from 'expo-app-loading'

import { RootStackParamList } from 'types/stack'
import { Box, Button, Input, Text } from 'ui'
import { Customer } from 'types/datamodels'

import { GET_CUSTOMER_PROFILE } from 'apollo/queries'
import { UPDATE_CUSTOMER } from 'apollo/mutations'

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
type MutationType = { updateCustomer: Customer }

const Profile = ({ navigation }: Props) => {
  const { data, loading } = useQuery<QueryType>(GET_CUSTOMER_PROFILE)
  const [updateCustomer] = useMutation<MutationType>(UPDATE_CUSTOMER)

  const initialValues: FormValues = useMemo(
    () => ({
      email: data?.getCustomerProfile?.email || '',
      firstName: data?.getCustomerProfile?.firstName || '',
      lastName: data?.getCustomerProfile?.lastName || '',
      phone: data?.getCustomerProfile?.phone || '',
    }),
    [data]
  )

  const onSubmit = useCallback(({ email, ...values }: FormValues) => {
    updateCustomer({ variables: { body: values } })
      .then((res) => console.log('Res', res))
      .catch((err) => console.log('Error', err))
  }, [])

  if (loading) return <AppLoading />

  return (
    <Box padding="xl" marginTop="xxxl">
      <Formik
        {...{ initialValues, onSubmit, validationSchema }}
        validateOnChange
      >
        {({ handleSubmit }) => (
          <>
            <Field
              keyboardType="email-address"
              textContentType="emailAddress"
              editable={false}
              type="email"
              name="email"
              label="Email address"
              component={Input}
            />

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

            <Field type="text" name="phone" label="Phone" component={Input} />

            <Button
              style={{ marginTop: 16 }}
              title="Save"
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
    </Box>
  )
}

export default Profile
