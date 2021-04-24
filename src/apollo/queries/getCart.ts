import { gql } from '@apollo/client'

export default gql`
  query getCart {
    cart @rest(type: "Order", path: "/cart") {
      id
      payment
      status
      createdAt
      completedAt
      items @type(name: "OrderItem") {
        id
        amount
        item @type(name: "Item") {
          name
          picture
          price
          categories
        }
      }
      customer @type(name: "Customer") {
        payment
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
