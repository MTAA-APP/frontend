import { gql } from '@apollo/client'

export default gql`
  query getCustomerProfile {
    getCustomerProfile @rest(type: "Customer", path: "/profile/customer") {
      email
      firstName
      lastName
      phonr
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
