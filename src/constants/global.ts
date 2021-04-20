import { Status } from 'types/enums'

export const PREFIX = '@MTAA'

export const AUTH_TOKEN = `${PREFIX}/AUTH_TOKEN`

export const NEXT_STATUS = {
  READY: Status.CONFIRMED,
  CONFIRMED: Status.SENT,
  SENT: Status.COMPLETED,
}
