import React, { useCallback, useMemo } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import * as Yup from 'yup'
import { useMutation, useQuery } from '@apollo/client'
import { Field, Formik } from 'formik'
import AppLoading from 'expo-app-loading'

import { RootStackParamList } from 'types/stack'
import { Box, Button, Input } from 'ui'
import { Customer } from 'types/datamodels'

import { GET_CUSTOMER_PROFILE } from 'apollo/queries'
import { UPDATE_CUSTOMER } from 'apollo/mutations'
import { useContext } from 'hooks'

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
  phone: Yup.string(),
})

type QueryType = { customer: Customer }
type MutationType = { updateCustomer: Customer }

const Profile = ({ navigation }: Props) => {
  const { show } = useContext('snackbar')

  const { data, loading } = useQuery<QueryType>(GET_CUSTOMER_PROFILE)
  const [updateCustomer] = useMutation<MutationType>(UPDATE_CUSTOMER)

  const initialValues: FormValues = useMemo(
    () => ({
      email: data?.customer?.email || '',
      firstName: data?.customer?.firstName || '',
      lastName: data?.customer?.lastName || '',
      phone: data?.customer?.phone || '',
    }),
    [data]
  )

  const onSubmit = useCallback(({ email, ...values }: FormValues) => {
    updateCustomer({ variables: { body: values } })
      .then(() =>
        show({ text: 'Profile data successfully updated.', variant: 'success' })
      )
      .catch(() =>
        show({ text: 'Failed to update profile data!', variant: 'error' })
      )
  }, [])

  if (loading) return <AppLoading />

  return (
    <Box padding="xl" paddingTop="xxxl">
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

            <Field
              type="text"
              name="phone"
              label="Phone number"
              component={Input}
            />

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

export default React.memo(Profile)
