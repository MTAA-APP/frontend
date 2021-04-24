import React, { useCallback, useMemo } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import * as Yup from 'yup'
import { useMutation, useQuery } from '@apollo/client'
import { FlatList, Image } from 'react-native'
import { Field, Formik } from 'formik'
import AppLoading from 'expo-app-loading'

import { RootStackParamList } from 'types/stack'
import { Box, Button, Input, Text } from 'ui'
import { useContext } from 'hooks'
import { Service } from 'types/datamodels'

import { GET_SERVICE_PROFILE } from 'apollo/queries'
import { UPDATE_SERVICE } from 'apollo/mutations'
import { TextBlock } from 'components'

type Props = StackScreenProps<RootStackParamList, 'ServiceProfile'>

type FormValues = {
  email: string
  name: string
  phone: string
  web: string
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  name: Yup.string().required(),
  phone: Yup.string().required(),
  web: Yup.string().required(),
})

type QueryType = { service: Service }
type MutationType = { updateService: Service }

// TODO: picture, address

const Profile = ({ navigation }: Props) => {
  const { show } = useContext('snackbar')

  const { data, loading } = useQuery<QueryType>(GET_SERVICE_PROFILE)
  const [updateService] = useMutation<MutationType>(UPDATE_SERVICE)

  const initialValues: FormValues = useMemo(
    () => ({
      email: data?.service?.email || '',
      name: data?.service?.name || '',
      phone: data?.service?.phone || '',
      web: data?.service?.web || '',
    }),
    [data]
  )

  const onSubmit = useCallback(({ email, ...values }: FormValues) => {
    updateService({ variables: { body: values } })
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
        {({ handleSubmit }) => (
          <>
            <FlatList
              data={[1]}
              contentContainerStyle={{ paddingHorizontal: 30 }}
              keyExtractor={() => 'customerProfile'}
              renderItem={() => (
                <>
                  <Box marginBottom="xl">
                    <Text paddingBottom="m" variant="label">
                      Picture
                    </Text>

                    <Image
                      source={{ uri: data?.service?.picture }}
                      style={{
                        width: '100%',
                        height: 150,
                        borderRadius: 18,
                      }}
                      resizeMode="cover"
                    />
                  </Box>

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
                    name="name"
                    label="Name"
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
                    name="web"
                    label="Website"
                    component={Input}
                  />

                  <TextBlock
                    title="Address"
                    style={{ marginTop: 16 }}
                    onPress={() => console.log('TODO')}
                    data={
                      !!data?.service?.address
                        ? [
                            {
                              title: 'Country',
                              text: data?.service?.address?.country,
                            },
                            {
                              title: 'City',
                              text: data?.service?.address?.city,
                            },
                            {
                              title: 'Postal code',
                              text: data?.service?.address?.postalCode,
                            },
                            {
                              title: 'Street',
                              text: data?.service?.address?.street,
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

export default Profile
