import { gql } from '@apollo/client'

export default gql`
  mutation signin($body: SigninBody!) {
    signin: publish(body: $body)
      @rest(
        type: "AuthPayload"
        method: "POST"
        path: "/signin"
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
