import { gql } from '@apollo/client'

export default gql`
  mutation deleteCart {
    cart @rest(method: "DELETE", path: "/cart") {
      NoContent
    }
  }
`
