import { gql } from '@apollo/client'

export default gql`
  mutation serviceSignup($body: SeriviceSigninBody!) {
    serviceSignup: publish(body: $body)
      @rest(
        type: "AuthPayload"
        method: "POST"
        path: "/signup/service"
        bodyKey: "body"
      ) {
      user @type(name: "User") {
        id
        email
        role
      }
      token
    }
  }
`
