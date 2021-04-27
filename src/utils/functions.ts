import { Linking } from 'react-native'
import { Customer } from 'types/datamodels'

export const makeCall = (phoneNumber?: string) =>
  phoneNumber && Linking.openURL(`tel:${phoneNumber}`)

export const openUrl = (url?: string) => url && Linking.openURL(url)

export const keyIdExtractor = (item: any): string => item?.id

export const getFullName = (data?: Customer): string =>
  `${data?.firstName} ${data?.lastName}`
