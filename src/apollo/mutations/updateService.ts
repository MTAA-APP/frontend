import { gql } from '@apollo/client'

export default gql`
  mutation updateService($body: UpdateServiceBody!) {
    updateService: publish(body: $body)
      @rest(
        type: "Service"
        method: "PUT"
        path: "/profile/service"
        bodyKey: "body"
      ) {
      id
      picture
      name
      phone
      web
    }
  }
`
