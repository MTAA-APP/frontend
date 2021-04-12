import { gql } from '@apollo/client'

export default gql`
  query getServiceProfile {
    getServiceProfile @rest(type: "Service", path: "/profile/service") {
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
