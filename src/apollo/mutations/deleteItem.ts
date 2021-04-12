import { gql } from '@apollo/client'

export default gql`
  mutation deleteItem($id: ID!) {
    deleteItem(id: $id) @rest(method: "DELETE", path: "/items/{args.id}") {
      NoContent
    }
  }
`
