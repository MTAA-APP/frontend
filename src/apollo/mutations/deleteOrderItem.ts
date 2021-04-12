import { gql } from '@apollo/client'

export default gql`
  mutation deleteOrderItem($id: ID!) {
    deleteOrderItem(id: $id) @rest(method: "DELETE", path: "/cart/{args.id}") {
      NoContent
    }
  }
`
