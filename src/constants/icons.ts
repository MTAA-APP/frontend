import CART_ICON from 'assets/icons/white-cart.png'
import READY_ICON from 'assets/icons/pending.png'
import CONFIRMED_ICON from 'assets/icons/ready.png'
import SENT_ICON from 'assets/icons/confirmed.png'
import COMPLETED_ICON from 'assets/icons/sent.png'
import CASH_ICON from 'assets/icons/cash.png'
import CARD_ICON from 'assets/icons/card.png'
import ONLINE_ICON from 'assets/icons/online.png'

export const STATUS_ICON = {
  WAITING: CART_ICON,
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

export const PAYMENT_ICON = {
  CASH: CASH_ICON,
  CARD: CARD_ICON,
  ONLINE: ONLINE_ICON,
}
