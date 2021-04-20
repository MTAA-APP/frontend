import React from 'react'
import { FieldProps } from 'formik'
import { useTheme } from '@shopify/restyle'
import { Picker } from '@react-native-picker/picker'

import Box from './Box'
import Text from './Text'
import { SelectItem } from 'types/global'

import { Theme } from 'styles/theme'

type Props = FieldProps & {
  label: string
  variant: 'primary' | 'secondary'
  items: SelectItem[]
}

const Select = ({
  label,
  variant = 'primary',
  items,
  field: { name, value, onChange },
  form: { errors },
  meta,
  ...rest
}: Props) => {
  const theme = useTheme<Theme>()

  return (
    <Box marginBottom="m">
      <Text variant="label">{label}</Text>

      <Box
        style={{
          borderBottomColor: '#E2E3E5',
          borderStyle: 'solid',
          borderBottomWidth: 1,
        }}
      >
        <Picker
          {...rest}
          selectedValue={value}
          onValueChange={onChange(name)}
          style={{
            height: 40,
            color:
              theme.colors[variant === 'secondary' ? 'background' : 'title'],
          }}
        >
          {items?.map((item: SelectItem) => (
            <Picker.Item
              key={item?.value}
              label={item?.label}
              value={item?.value}
            />
          ))}
        </Picker>
      </Box>

      {!!errors[name] && (
        <Text variant="error" marginTop="xs">
          {errors[name]}
        </Text>
      )}
    </Box>
  )
}

export default Select
