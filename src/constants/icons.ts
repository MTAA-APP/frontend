import READY_ICON from 'assets/icons/pending.png'
import CONFIRMED_ICON from 'assets/icons/ready.png'
import SENT_ICON from 'assets/icons/confirmed.png'
import COMPLETED_ICON from 'assets/icons/sent.png'

export const STATUS_ICON = {
  READY: READY_ICON,
  CONFIRMED: CONFIRMED_ICON,
  SENT: SENT_ICON,
  COMPLETED: COMPLETED_ICON,
}

export const NEXT_STATUS_ICON = {
  READY: CONFIRMED_ICON,
  CONFIRMED: SENT_ICON,
  SENT: COMPLETED_ICON,
}
