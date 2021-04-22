import { Linking } from 'react-native'

export const makeCall = (phoneNumber?: string) =>
  phoneNumber && Linking.openURL(`tel:${phoneNumber}`)

export const openUrl = (url?: string) => url && Linking.openURL(url)

export const keyIdExtractor = (item: any): string => item?.id
