import { gql } from '@apollo/client'

export default gql`
  query getMyOrders {
    orders @rest(type: "[Order]", path: "/orders/history") {
      id
      status
      payment
      createdAt
      completedAt
      total
      service @type(name: "Service") {
        name
      }
      items @type(name: "[OrderItem]") {
        amount
        total
        item @type(name: "Item") {
          name
          price
        }
      }
    }
  }
`
