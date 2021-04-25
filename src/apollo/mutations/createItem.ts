import { gql } from '@apollo/client'

export default gql`
  mutation createItem($body: CreateItemBody!) {
    item: publish(body: $body)
      @rest(type: "Item", method: "POST", path: "/items", bodyKey: "body") {
      id
      photo
      name
      description
      price
      categories
      weight
      time
    }
  }
`
