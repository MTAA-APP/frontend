import { gql } from '@apollo/client'

export default gql`
  query getServices(
    $favorites: Boolean
    $search: String
    $category: ServiceCategory
  ) {
    services(favorites: $favorites, search: $search, category: $category)
      @rest(type: "Service", path: "/services?{args}") {
      id
      name
      picture
      category
      customers
    }
  }
`
