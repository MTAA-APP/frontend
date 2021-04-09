import { gql } from '@apollo/client'

export default gql`
  query getMe {
    getMe @rest(type: "User", path: "/me") {
      id
      email
      role
    }
  }
`
