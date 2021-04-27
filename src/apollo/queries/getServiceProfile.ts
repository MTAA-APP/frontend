import { gql } from '@apollo/client'

export default gql`
  query getServiceProfile {
    service @rest(type: "Service", path: "/profile/service") {
      id
      picture
      email
      name
      phone
      web
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
