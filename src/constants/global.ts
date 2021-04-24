import { Status } from 'types/enums'

export const PREFIX = '@MTAA'

export const AUTH_TOKEN = `${PREFIX}/AUTH_TOKEN`

export const NEXT_STATUS = {
  READY: Status.CONFIRMED,
  CONFIRMED: Status.SENT,
  SENT: Status.COMPLETED,
}

export const PHONE_REGEX: RegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
