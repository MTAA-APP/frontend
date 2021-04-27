import React, { useCallback, useMemo } from 'react'
import { Modal } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'
import { Field, Formik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { ScrollView } from 'react-native-gesture-handler'

import { Box, Button, Input } from 'ui'
import { useContext } from 'hooks'
import { Address } from 'types/datamodels'
import { Role } from 'types/enums'

import { UPSERT_ADDRESS } from 'apollo/mutations'
import { GET_CUSTOMER_PROFILE, GET_SERVICE_PROFILE } from 'apollo/queries'

type Props = {
  type: Role
  isVisible: boolean
  data: Address
  onClose: () => void
}

type FormValues = {
  country: string
  city: string
  postalCode: string
  street: string
}

const validationSchema = Yup.object().shape({
  country: Yup.string().required(),
  city: Yup.string().required(),
  postalCode: Yup.string().required(),
  street: Yup.string().required(),
})

const AddressModal = ({ type, isVisible, data, onClose }: Props) => {
  const { show } = useContext('snackbar')

  const [upsertAddress] = useMutation(UPSERT_ADDRESS)

  const initialValues: FormValues = useMemo(
    () => ({
      country: data?.country || '',
      city: data?.city || '',
      postalCode: data?.postalCode || '',
      street: data?.street || '',
    }),
    [data]
  )

  const onSubmit = useCallback(
    (values: FormValues) => {
      upsertAddress({
        variables: { body: { id: data?.id || '', ...values } },
        refetchQueries: [
          {
            query:
              type === Role.CUSTOMER
                ? GET_CUSTOMER_PROFILE
                : GET_SERVICE_PROFILE,
          },
        ],
      })
        .then(() => {
          show({
            text: 'Address successfully updated.',
            variant: 'success',
          })
          onClose()
        })
        .catch(() =>
          show({
            text: 'Failed to update address!',
            variant: 'error',
          })
        )
    },
    [upsertAddress]
  )

  return (
    <GestureRecognizer onSwipeDown={onClose}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
        onDismiss={onClose}
      >
        <Box
          flex={1}
          padding="xl"
          paddingTop="m"
          marginTop="xxl"
          backgroundColor="title"
          borderTopLeftRadius={18}
          borderTopRightRadius={18}
        >
          <Box
            backgroundColor="label"
            width={72}
            height={6}
            borderRadius={20}
            alignSelf="center"
            marginBottom="xl"
          />
          <Formik
            {...{ initialValues, onSubmit, validationSchema }}
            validateOnChange
          >
            {({ handleSubmit }) => (
              <>
                <ScrollView>
                  <Field
                    variant="secondary"
                    type="text"
                    name="country"
                    label="Country"
                    component={Input}
                  />

                  <Field
                    variant="secondary"
                    type="text"
                    name="city"
                    label="City"
                    component={Input}
                  />

                  <Field
                    variant="secondary"
                    type="text"
                    name="postalCode"
                    label="Postal Code"
                    component={Input}
                  />

                  <Field
                    variant="secondary"
                    type="text"
                    name="street"
                    label="Street"
                    component={Input}
                  />
                </ScrollView>

                <Button
                  style={{ marginTop: 16 }}
                  title="Save Address"
                  onPress={handleSubmit}
                />
              </>
            )}
          </Formik>
        </Box>
      </Modal>
    </GestureRecognizer>
  )
}

export default React.memo(AddressModal)
