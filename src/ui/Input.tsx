import React, { useCallback } from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { FieldProps } from 'formik'
import { useTheme } from '@shopify/restyle'

import Box from './Box'
import Text from './Text'

import { Theme } from 'styles/theme'

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
  const theme = useTheme<Theme>()

  const onChangeText = useCallback(onChange(name), [])

  return (
    <Box marginBottom="m">
      <Text variant="label">{label}</Text>

      <TextInput
        {...{ value, onChangeText, ...rest }}
        style={{
          ...theme.textVariants.input,
          color: theme.colors.title,
          borderBottomColor: '#E2E3E5',
          borderStyle: 'solid',
          borderBottomWidth: 1,
          paddingVertical: 4,
        }}
      />

      {!!errors[name] && (
        <Text variant="error" marginTop="xs">
          {errors[name]}
        </Text>
      )}
    </Box>
  )
}

export default Input
