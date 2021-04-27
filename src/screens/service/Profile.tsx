import React, { useCallback, useMemo } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import * as Yup from 'yup'
import { useMutation, useQuery } from '@apollo/client'
import { FlatList } from 'react-native'
import { Field, Formik } from 'formik'
import AppLoading from 'expo-app-loading'

import { RootStackParamList } from 'types/stack'
import { Box, Button, Input, SelectImage } from 'ui'
import { AddressModal, TextBlock } from 'components'
import { useContext, useFirebase, useModal } from 'hooks'
import { Address, Service } from 'types/datamodels'
import { Role } from 'types/enums'

import { GET_SERVICE_PROFILE } from 'apollo/queries'
import { UPDATE_SERVICE } from 'apollo/mutations'

type Props = StackScreenProps<RootStackParamList, 'ServiceProfile'>

type FormValues = {
  picture: string
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

const Profile = ({ navigation }: Props) => {
  const { show: showSnackbar } = useContext('snackbar')

  const { upload } = useFirebase('profile')
  const { state, show, hide } = useModal<Address>()

  const { data, loading } = useQuery<QueryType>(GET_SERVICE_PROFILE)
  const [updateService] = useMutation<MutationType>(UPDATE_SERVICE)

  const initialValues: FormValues = useMemo(
    () => ({
      picture: data?.service?.picture || '',
      email: data?.service?.email || '',
      name: data?.service?.name || '',
      phone: data?.service?.phone || '',
      web: data?.service?.web || '',
    }),
    [data]
  )

  const handleUpdate = useCallback(
    (values, url?: string) => {
      updateService({ variables: { body: { picture: url, ...values } } })
        .then(() =>
          showSnackbar({
            text: 'Profile data successfully updated.',
            variant: 'success',
          })
        )
        .catch(() =>
          showSnackbar({
            text: 'Failed to update profile data!',
            variant: 'error',
          })
        )
    },
    [updateService]
  )

  const onSubmit = useCallback(
    ({ email, picture, ...values }: FormValues) => {
      if (!!picture && !!data && picture !== data?.service?.picture)
        upload(picture, data?.service?.id, (url: string) =>
          handleUpdate(values, url)
        )
      else handleUpdate(values, data?.service?.picture)
    },
    [upload, handleUpdate, data]
  )

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
              keyExtractor={() => 'serviceProfile'}
              renderItem={() => (
                <>
                  <Field
                    type="text"
                    name="picture"
                    label="Picture"
                    onChange={setFieldValue}
                    component={SelectImage}
                  />

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
                    onPress={() => show(data?.service?.address)}
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

      <AddressModal
        type={Role.SERVICE}
        data={state?.data}
        isVisible={state?.visible}
        onClose={hide}
      />
    </Box>
  )
}

export default React.memo(Profile)
