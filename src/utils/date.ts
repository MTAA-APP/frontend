import { DateTime } from 'luxon'

export const formatDate = (date: string): string =>
  DateTime.fromISO(date).toUTC().toFormat('dd.MM.yyyy - HH:mm')

export const getTime = (date: string): string =>
  DateTime.fromISO(date).toUTC().toFormat('HH:mm')
