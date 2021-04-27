import React, { useCallback } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { Image, TouchableHighlight } from 'react-native'
import { FieldProps } from 'formik'

import Box from './Box'
import Text from './Text'

import PLACEHOLDER from 'assets/images/image-placeholder.png'

type Props = FieldProps & {
  aspect: [number, number]
  onChange: (field: string, value: string) => void
}

const SelectImage = ({
  onChange,
  field: { name, value },
  aspect = [16, 9],
}: Props) => {
  const onSelect = useCallback((value: string) => onChange(name, value), [name])

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: aspect,
      quality: 1,
    })

    if (!result?.cancelled) onSelect(result?.uri)
  }

  return (
    <Box marginBottom="xl">
      <Text paddingBottom="s" variant="label">
        Picture
      </Text>

      <TouchableHighlight style={{ borderRadius: 18 }} onPress={pickImage}>
        <Image
          source={!!value ? { uri: value } : PLACEHOLDER}
          style={{
            width: '100%',
            height: 200,
            borderRadius: 18,
          }}
          resizeMode="cover"
        />
      </TouchableHighlight>
    </Box>
  )
}

export default SelectImage
