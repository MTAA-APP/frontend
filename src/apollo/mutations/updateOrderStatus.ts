import { gql } from '@apollo/client'

export default gql`
  mutation updateOrderStatus($body: UpdateOrderStatusBody!) {
    updateOrderStatus: publish(body: $body)
      @rest(
        type: "Order"
        method: "PUT"
        path: "/orders/status"
        bodyKey: "body"
      ) {
      id
      status
    }
  }
`
