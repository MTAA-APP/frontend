import { gql } from '@apollo/client'

export default gql`
  mutation upsertAddress($body: UpsertAddressBody!) {
    upsertAddress: publish(body: $body)
      @rest(
        type: "Address"
        method: "POST"
        path: "/profile/address"
        bodyKey: "body"
      ) {
      id
      country
      city
      street
      postalCode
    }
  }
`
