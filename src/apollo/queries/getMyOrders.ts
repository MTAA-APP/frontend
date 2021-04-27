import { gql } from '@apollo/client'

export default gql`
  query getMyOrders {
    orders @rest(type: "Order", path: "/orders/history") {
      id
      status
      payment
      createdAt
      completedAt
      total
      service @type(name: "Service") {
        id
        name
      }
      items @type(name: "OrderItem") {
        id
        amount
        total
        item @type(name: "Item") {
          id
          name
          price
        }
      }
    }
  }
`
