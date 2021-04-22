import { gql } from '@apollo/client'

export default gql`
  query getService($id: ID!) {
    service(id: $id) @rest(type: "Service", path: "/services/{args.id}") {
      id
      email
      name
      description
      picture
      phone
      web
      category
      openingHours @type(name: "[OpeningHour]") {
        day
        from
        to
      }
      address @type(name: "Address") {
        country
        city
        street
        postalCode
      }
    }
  }
`
