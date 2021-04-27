import React, { useCallback } from 'react'
import { Image, TouchableHighlight } from 'react-native'
import { FieldProps } from 'formik'

import Box from './Box'
import Text from './Text'
import { Payment } from 'types/enums'
import { PAYMENT } from 'constants/enums'
import { PAYMENT_ICON } from 'constants/icons'

type Props = FieldProps & {
  onChange: (field: string, value: Payment) => void
}

const PaymentSelect = ({ onChange, field: { name, value }, meta }: Props) => {
  const onPress = useCallback((value: Payment) => onChange(name, value), [name])

  return (
    <Box paddingVertical="m">
      <Text variant="label" marginBottom="s">
        Payment method
      </Text>

      <Box flexDirection="row" justifyContent="space-between">
        {Object.values(Payment)?.map((item) => (
          <TouchableHighlight
            key={item}
            onPress={() => onPress(item)}
            style={{ width: '31%', borderRadius: 18 }}
          >
            <Box
              borderRadius={18}
              backgroundColor={item === value ? 'selected' : 'label'}
              elevation={4}
              height={100}
              paddingHorizontal="m"
              paddingVertical="l"
              justifyContent="space-between"
              alignItems="center"
            >
              <Image
                source={PAYMENT_ICON[item]}
                style={{ width: '40%', height: '40%' }}
                resizeMode="contain"
              />
              <Text fontFamily="Rubik_500Medium" fontSize={14} color="white">
                {PAYMENT[item]}
              </Text>
            </Box>
          </TouchableHighlight>
        ))}
      </Box>
    </Box>
  )
}

export default React.memo(PaymentSelect)
