import { gql } from '@apollo/client'

export default gql`
  mutation customerSignup($body: CustomerSignupBody!) {
    customerSignup: publish(body: $body)
      @rest(
        type: "AuthPayload"
        method: "POST"
        path: "/signup/customer"
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
