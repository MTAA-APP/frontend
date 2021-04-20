import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { Image } from 'react-native'

import { BottomInfo, Box, Text } from 'ui'
import { RootStackParamList } from 'types/stack'

import PLACEHOLDER from 'assets/images/image-placeholder.png'
import { TouchableOpacity } from 'react-native-gesture-handler'

type Props = StackScreenProps<RootStackParamList, 'SignUp'>

type RoleBoxProps = {
  text: string
  onPress: () => void
}

const RoleBox = ({ text, onPress }: RoleBoxProps) => (
  <Box flex={1} marginVertical="m">
    <TouchableOpacity
      onPress={onPress}
      style={{ width: '100%', height: '100%' }}
    >
      <Image
        source={PLACEHOLDER}
        style={{
          flex: 1,
          width: '100%',
          borderRadius: 16,
          marginBottom: 8,
        }}
        resizeMode="cover"
      />
      <Text>{text}</Text>
    </TouchableOpacity>
  </Box>
)

const SignUp = ({ navigation }: Props) => {
  return (
    <Box
      flex={1}
      padding="xxl"
      paddingBottom="xl"
      justifyContent="space-between"
    >
      <Box marginBottom="xl">
        <Text textAlign="center" variant="title" marginBottom="xs">
          Sign Up
        </Text>

        <Text variant="label" textAlign="center">
          Choose your role.
        </Text>
      </Box>

      <Box flex={1} marginBottom="xl">
        <RoleBox
          text="Sign up as a Customer and make your life easier when ordering food."
          onPress={() => navigation.navigate('CustomerSignUp')}
        />

        <RoleBox
          text="Sign up as Service and offer your services more efficiently."
          onPress={() => navigation.navigate('ServiceSignUp')}
        />
      </Box>

      <BottomInfo
        text="I have an account."
        buttonText="Sign in"
        route="SignIn"
      />
    </Box>
  )
}

export default SignUp
