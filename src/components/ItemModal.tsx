import React, { useCallback, useMemo } from 'react'
import { Modal } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'
import { Field, Formik } from 'formik'
import * as Yup from 'yup'
import { ScrollView } from 'react-native-gesture-handler'
import { useMutation } from '@apollo/client'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

import { Box, Button, Input, Select, SelectImage } from 'ui'
import { Item } from 'types/datamodels'
import { useContext, useFirebase } from 'hooks'
import { ItemCategory } from 'types/enums'
import { SelectItem } from 'types/global'
import { ITEM_CATEGORY } from 'constants/enums'

import { CREATE_ITEM } from 'apollo/mutations'
import { GET_ITEMS } from 'apollo/queries'

type Props = {
  isVisible: boolean
  data: Item
  onClose: () => void
}

type FormValues = {
  picture: string
  name: string
  price: string
  categories: ItemCategory
  weight: string
  time: string
  description: string
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(3),
  price: Yup.number().required(),
  weight: Yup.number(),
  time: Yup.number(),
  description: Yup.string(),
})

type MutationType = { item: Item }

const ItemModal = ({ isVisible, data, onClose }: Props) => {
  const { show } = useContext('snackbar')

  const [createItem] = useMutation<MutationType>(CREATE_ITEM)
  const { upload } = useFirebase('items')

  const initialValues: FormValues = useMemo(
    () => ({
      picture: data?.picture || '',
      name: data?.name || '',
      price: data?.price?.toString() || '0',
      categories: data?.categories?.[0] || ItemCategory.PIZZA,
      weight: data?.weight?.toString() || '0',
      time: data?.time?.toString() || '0',
      description: data?.description || '',
    }),
    [data]
  )

  const itemCategory: SelectItem[] = useMemo(
    () =>
      Object.values(ItemCategory)?.map((item) => ({
        label: ITEM_CATEGORY[item],
        value: item,
      })),
    []
  )

  const handleUpdate = useCallback(
    (values, url?: string) => {
      createItem({
        variables: {
          body: {
            id: data?.id || '',
            name: values?.name,
            price: +values?.price,
            time: +values?.time,
            weight: +values?.weight,
            picture: url || '',
            description: values?.description,
            categories: [values?.categories],
          },
        },
        refetchQueries: [{ query: GET_ITEMS }],
      })
        .then(() => {
          show({
            text: 'Item information saved.',
            variant: 'success',
          })
          onClose()
        })
        .catch(() =>
          show({
            text: 'Failed to update item information!',
            variant: 'error',
          })
        )
    },
    [createItem, onClose, data]
  )

  const onSubmit = ({ picture, ...values }: FormValues) => {
    if (!!picture && picture !== data?.picture)
      upload(picture, data?.id || uuidv4(), (url: string) =>
        handleUpdate(values, url)
      )
    else handleUpdate(values, data?.picture)
  }

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
            {({ handleSubmit, setFieldValue }) => (
              <>
                <ScrollView>
                  <Field
                    type="text"
                    name="picture"
                    label="Picture"
                    aspect={[4, 3]}
                    onChange={setFieldValue}
                    component={SelectImage}
                  />

                  <Field
                    variant="secondary"
                    type="text"
                    name="name"
                    label="Name"
                    component={Input}
                  />

                  <Field
                    variant="secondary"
                    keyboardType="numeric"
                    type="text"
                    name="price"
                    label="Price"
                    component={Input}
                  />

                  <Field
                    variant="secondary"
                    name="categories"
                    label="Category"
                    items={itemCategory}
                    component={Select}
                  />

                  <Field
                    variant="secondary"
                    keyboardType="numeric"
                    type="numeric"
                    name="weight"
                    label="Weight"
                    component={Input}
                  />

                  <Field
                    variant="secondary"
                    keyboardType="numeric"
                    type="numeric"
                    name="time"
                    label="Cooking time"
                    component={Input}
                  />

                  <Field
                    variant="secondary"
                    multiline
                    minHeight={150}
                    textAlignVertical="top"
                    type="text"
                    name="description"
                    label="Description"
                    component={Input}
                  />
                </ScrollView>

                <Button
                  style={{ marginTop: 16 }}
                  title="Save item"
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

export default React.memo(ItemModal)
