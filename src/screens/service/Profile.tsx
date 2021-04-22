import React, { useCallback, useMemo } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import * as Yup from 'yup'
import { useMutation, useQuery } from '@apollo/client'
import { Image } from 'react-native'
import { Field, Formik } from 'formik'
import AppLoading from 'expo-app-loading'
import { ScrollView } from 'react-native-gesture-handler'

import { RootStackParamList } from 'types/stack'
import { Box, Button, Input, Text } from 'ui'
import { useContext } from 'hooks'
import { Service } from 'types/datamodels'

import { GET_SERVICE_PROFILE } from 'apollo/queries'
import { UPDATE_SERVICE } from 'apollo/mutations'

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
    <Box flex={1} padding="xl" paddingTop="xxxl">
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

            <Field type="text" name="name" label="Name" component={Input} />

            <Field
              type="text"
              name="phone"
              label="Phone number"
              component={Input}
            />

            <Field type="text" name="web" label="Website" component={Input} />

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
