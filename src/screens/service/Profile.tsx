import React, { useCallback, useMemo } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import * as Yup from 'yup'
import { useMutation, useQuery } from '@apollo/client'
import { Image } from 'react-native'
import { Field, Formik } from 'formik'

import { RootStackParamList } from 'types/stack'
import { Box, Button, Input, Text } from 'ui'

import { GET_SERVICE_PROFILE } from 'apollo/queries'
import { UPDATE_SERVICE } from 'apollo/mutations'

import { Service } from 'types/datamodels'
import AppLoading from 'expo-app-loading'

type Props = StackScreenProps<RootStackParamList, 'ServiceProfile'>

type FormValues = {
  email: string
  name: string
  phone: string
  web: string
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  phone: Yup.string().required(),
})

type QueryType = { getServiceProfile: Service }
type MutationType = { updateService: Service }

const Profile = ({ navigation }: Props) => {

  const { data, loading } = useQuery<QueryType>(GET_SERVICE_PROFILE)
  const [updateService] = useMutation<MutationType>(UPDATE_SERVICE)

  const initialValues: FormValues = useMemo(
    () => ({
      email: data?.getServiceProfile?.email || '',
      name: data?.getServiceProfile?.name || '',
      phone: data?.getServiceProfile?.phone || '',
      web: data?.getServiceProfile?.web || '',
    }),
    [data]
  )

  const onSubmit = useCallback(({ email, ...values }: FormValues) => {
    updateService({ variables: { body: values } })
      .then((res) => console.log('Res', res))
      .catch((err) => console.log('Error', err))
  }, [])

  if (loading) return <AppLoading />

  return (
    <Box flex={1}>
      <Box padding="l" marginTop="xxxl" flex={1}>
        <Text paddingBottom="s" variant="label">Picture</Text>
        <Image
          source={{ uri: data?.getServiceProfile?.picture }}
          style={{
            width: '100%',
            height: '75%'
          }}
          resizeMode="cover"
        />
      </Box>
      <Box padding="xl" >
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
              name="name"
              label="Name"
              component={Input}
            />

            <Field
              type="text"
              name="phone"
              label="Phone"
              component={Input}
            />

            <Field
              type="text"
              name="web"
              label="Web"
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
      </Box>
  )
}

export default Profile
