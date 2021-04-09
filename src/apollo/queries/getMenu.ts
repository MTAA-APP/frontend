import { gql } from '@apollo/client'

export default gql`
  query getMenu($id: ID!) {
    getMenu(id: $id) @rest(type: "[Item]", path: "/services/{args.id}/menu") {
      id
      name
      picture
      price
      categories
    }
  }
`
