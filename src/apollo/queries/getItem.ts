import { gql } from '@apollo/client'

export default gql`
  query getItem($id: ID!) {
    getItem(id: $id) @rest(type: "Item", path: "/items/{args.id}") {
      id
      name
      description
      picture
      price
      weight
      time
      categories
    }
  }
`
