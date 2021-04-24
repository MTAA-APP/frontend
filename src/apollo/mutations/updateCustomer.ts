import { gql } from '@apollo/client'

export default gql`
  mutation updateCustomer($body: UpdateCustomerBody!) {
    updateCustomer: publish(body: $body)
      @rest(
        type: "Customer"
        method: "PUT"
        path: "/profile/customer"
        bodyKey: "body"
      ) {
      id
      firstName
      lastName
      phone
      payment
    }
  }
`
