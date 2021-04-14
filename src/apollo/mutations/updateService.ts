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
      firstName
      lastName
      phone
      payment
    }
  }
`
