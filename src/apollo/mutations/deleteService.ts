import { gql } from '@apollo/client'

export default gql`
  mutation deleteService($id: ID!) {
    deleteService(id: $id)
      @rest(method: "DELETE", path: "/services/{args.id}") {
      NoContent
    }
  }
`
