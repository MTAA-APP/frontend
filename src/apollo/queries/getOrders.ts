import { gql } from '@apollo/client'

export default gql`
  query getOrders {
    getOrders @rest(type: "[Order]", path: "/orders") {
      id
      status
      payment
      createdAt
      completedAt
      customer @type(name: "Customer") {
        email
        firstName
        lastName
      }
      items @type(name: "[OrderItem]") {
        count
        price
      }
    }
  }
`