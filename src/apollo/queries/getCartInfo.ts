import { gql } from '@apollo/client'

export default gql`
  query getCartInfo {
    cart @rest(type: "Order", path: "/cart/info") {
      id
      items {
        count
        price
      }
      service @type(name: "Service") {
        id
        name
      }
    }
  }
`
