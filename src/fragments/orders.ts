import gql from "graphql-tag";

import { fragmentAddress } from "./address";

export const fragmentOrderEvent = gql`
  fragment OrderEventFragment on OrderEvent {
    id
    amount
    date
    email
    emailType
    message
    quantity
    type
    user {
      id
      email
    }
  }
`;

export const fragmentOrderLine = gql`
  fragment OrderLineFragment on OrderLine {
    id
    isShippingRequired
    productName
    productSku
    quantity
    quantityFulfilled
    unitPrice {
      gross {
        amount
        currency
      }
      net {
        amount
        currency
      }
    }
    thumbnail {
      url
    }
  }
`;
export const fulfillmentFragment = gql`
  ${fragmentOrderLine}
  fragment FulfillmentFragment on Fulfillment {
    id
    lines {
      id
      quantity
      orderLine {
        ...OrderLineFragment
      }
    }
    fulfillmentOrder
    status
    trackingNumber
    warehouse {
      id
      name
    }
  }
`;

export const invoiceFragment = gql`
  fragment InvoiceFragment on Invoice {
    id
    number
    createdAt
    url
    status
  }
`;

export const fragmentOrderDetails = gql`
  ${fragmentAddress}
  ${fragmentOrderEvent}
  ${fragmentOrderLine}
  ${fulfillmentFragment}
  ${invoiceFragment}
  fragment OrderDetailsFragment on Order {
    id
    billingAddress {
      ...AddressFragment
    }
    canFinalize
    created
    customerNote
    events {
      ...OrderEventFragment
    }
    fulfillments {
      ...FulfillmentFragment
    }
    lines {
      ...OrderLineFragment
    }
    number
    paymentStatus
    shippingAddress {
      ...AddressFragment
    }
    shippingMethod {
      id
    }
    shippingMethodName
    shippingPrice {
      gross {
        amount
        currency
      }
    }
    status
    subtotal {
      gross {
        amount
        currency
      }
    }
    total {
      gross {
        amount
        currency
      }
      tax {
        amount
        currency
      }
    }
    actions
    totalAuthorized {
      amount
      currency
    }
    totalCaptured {
      amount
      currency
    }
    user {
      id
      email
    }
    userEmail
    availableShippingMethods {
      id
      name
      price {
        amount
        currency
      }
    }
    discount {
      amount
      currency
    }
    invoices {
      ...InvoiceFragment
    }
  }
`;
