import { gql } from '@apollo/client'

export default gql`
  mutation updateFavorite($body: UpdateFavoriteBody!) {
    updateFavorite: publish(body: $body)
      @rest(method: "PUT", path: "/services/favorite", bodyKey: "body") {
      NoContent
    }
  }
`
