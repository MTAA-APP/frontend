import React, { useCallback, useMemo } from 'react'
import { Modal } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'
import { Field, Formik } from 'formik'
import * as Yup from 'yup'

import { Box, Button, Input, Select } from 'ui'
import { Item } from 'types/datamodels'
import { ItemCategory } from 'types/enums'
import { SelectItem } from 'types/global'
import { ITEM_CATEGORY } from 'constants/enums'
import { ScrollView } from 'react-native-gesture-handler'

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

// TODO: picture

const ItemModal = ({ isVisible, data, onClose }: Props) => {
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

  const onSubmit = useCallback((values: FormValues) => {
    console.log(values)
  }, [])

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
                  title="Add item"
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
