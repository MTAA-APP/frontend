import { gql } from '@apollo/client'

export default gql`
  mutation updateOrderPay($body: UpdateOrderPayBody!) {
    order: publish(body: $body)
      @rest(method: "PUT", path: "/cart/pay", bodyKey: "body") {
      NoContent
    }
  }
`
