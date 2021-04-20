import { gql } from '@apollo/client'

export default gql`
  query getCustomerProfile {
    customer @rest(type: "Customer", path: "/profile/customer") {
      email
      firstName
      lastName
      phone
      payment
      address @type(name: "Address") {
        id
        country
        city
        street
        postalCode
      }
    }
  }
`
