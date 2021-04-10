import React, { useCallback } from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { FieldProps } from 'formik'

import Box from './Box'
import Text from './Text'

type Props = FieldProps &
  TextInputProps & {
    label: string
  }

const Input = ({
  label,
  field: { name, value, onChange },
  form: { errors },
  meta,
  ...rest
}: Props) => {
  const onChangeText = useCallback(onChange(name), [])

  return (
    <Box marginBottom="xl">
      <Text variant="label" marginBottom="m">
        {label}
      </Text>

      <TextInput
        {...{ value, onChangeText, ...rest }}
        style={{
          borderBottomColor: '#ccc',
          borderStyle: 'solid',
          borderBottomWidth: 2,
        }}
      />

      {!!errors[name] && <Text variant="error">{errors[name]}</Text>}
    </Box>
  )
}

export default Input
