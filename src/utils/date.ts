import { DateTime } from 'luxon'

export const formatDate = (date: string): string =>
  DateTime.fromISO(date).toFormat('dd.MM.yyyy - HH:mm')

export const getTime = (date: string): string =>
  DateTime.fromISO(date).toFormat('HH:mm')
