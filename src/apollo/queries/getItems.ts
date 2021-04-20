import { gql } from '@apollo/client'

export default gql`
  query getItems($search: String) {
    items(search: $search) @rest(type: "[Item]", path: "/items?{args}") {
      id
      name
      picture
      price
      categories
    }
  }
`
