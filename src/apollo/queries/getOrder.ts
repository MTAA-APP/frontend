import { gql } from '@apollo/client'

export default gql`
  query getOrder($id: ID!) {
    getOrder(id: $id) @rest(type: "Order", path: "/orders/{args.id}") {
      id
      status
      payment
      createdAt
      completedAt
      items @type(name: "[OrderItem]") {
        id
        amount
        item @type(name: "Item") {
          name
          price
          time
          categories
        }
      }
      customer @type(name: "Customer") {
        id
        email
        firstName
        lastName
        phone
        address @type(name: "Address") {
          country
          city
          street
          postalCode
        }
      }
    }
  }
`
