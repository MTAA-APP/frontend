import React, { useCallback, useMemo } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { FlatList } from 'react-native'
import * as Yup from 'yup'
import { useMutation, useQuery } from '@apollo/client'
import { Field, Formik } from 'formik'
import AppLoading from 'expo-app-loading'

import { RootStackParamList } from 'types/stack'
import { Box, Button, Input, PaymentSelect } from 'ui'
import { TextBlock } from 'components'
import { useContext } from 'hooks'
import { Customer } from 'types/datamodels'
import { Payment } from 'types/enums'
import { PHONE_REGEX } from 'constants/global'

import { GET_CUSTOMER_PROFILE } from 'apollo/queries'
import { UPDATE_CUSTOMER } from 'apollo/mutations'

type Props = StackScreenProps<RootStackParamList, 'CustomerProfile'>

type FormValues = {
  email: string
  firstName: string
  lastName: string
  phone: string
  payment: Payment
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  phone: Yup.string().matches(PHONE_REGEX, 'phone number is not valid'),
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
      payment: data?.customer?.payment || Payment.CASH,
    }),
    [data]
  )

  const onSubmit = useCallback(({ email, ...values }: FormValues) => {
    console.log(values)
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
    <Box flex={1} paddingTop="xxxl">
      <Formik
        {...{ initialValues, onSubmit, validationSchema }}
        validateOnChange
      >
        {({ handleSubmit, setFieldValue }) => (
          <>
            <FlatList
              data={[1]}
              contentContainerStyle={{ paddingHorizontal: 30 }}
              keyExtractor={() => 'customerProfile'}
              renderItem={() => (
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

                  <Field
                    type="text"
                    name="payment"
                    onChange={setFieldValue}
                    component={PaymentSelect}
                  />

                  <TextBlock
                    style={{ marginTop: 16 }}
                    title="Your address"
                    onPress={() => {}}
                    data={
                      !!data?.customer?.address
                        ? [
                            {
                              title: 'Country',
                              text: data?.customer?.address?.country,
                            },
                            {
                              title: 'City',
                              text: data?.customer?.address?.city,
                            },
                            {
                              title: 'Postal code',
                              text: data?.customer?.address?.postalCode,
                            },
                            {
                              title: 'Street',
                              text: data?.customer?.address?.street,
                            },
                          ]
                        : []
                    }
                  />
                </>
              )}
            />

            <Box padding="xl" paddingTop="xs">
              <Button
                style={{ marginTop: 16 }}
                title="Save"
                onPress={handleSubmit}
              />
            </Box>
          </>
        )}
      </Formik>
    </Box>
  )
}

export default React.memo(Profile)
