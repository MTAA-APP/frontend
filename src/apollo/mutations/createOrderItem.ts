import { gql } from '@apollo/client'

export default gql`
  mutation createOrderItem($body: CreateOrderItemBody!) {
    orderItem: publish(body: $body)
      @rest(type: "OrderItem", method: "POST", path: "/cart", bodyKey: "body") {
      id
      amount
      item @type(name: "Item") {
        id
      }
    }
  }
`
