import { gql } from '@apollo/client'

export default gql`
  mutation createItem($body: CreateItemBody!) {
    createItem: publish(body: $body)
      @rest(type: "Item", method: "POST", path: "/items", bodyKey: "body") {
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
