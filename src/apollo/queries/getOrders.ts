import { gql } from '@apollo/client'

export default gql`
  query getOrders {
    orders @rest(type: "Order", path: "/orders") {
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
      items {
        count
        price
      }
    }
  }
`
