"use client"

import { Cart, PaymentSession } from "@medusajs/medusa"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import StripeWrapper from "./stripe-wrapper"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import { createContext } from "react"

type WrapperProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
  children: React.ReactNode
}

export const StripeContext = createContext(false)

const stripeKey =
  "pk_test_51NnTaCFSZsoFDEdQ9z7qbcfa054A3WKzPJwiaR4NSSPxTsBVSl1kwfxs5DKZ0mUHZ9kZqrYWUBORoxJaQY5WwmP6003nQa6yGa"

export const stripePromise = stripeKey
  ? loadStripe(stripeKey)
  : loadStripe(
      "pk_test_51NnTaCFSZsoFDEdQ9z7qbcfa054A3WKzPJwiaR4NSSPxTsBVSl1kwfxs5DKZ0mUHZ9kZqrYWUBORoxJaQY5WwmP6003nQa6yGa"
    )

const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID

const Wrapper: React.FC<WrapperProps> = ({ cart, children }) => {
  const paymentSession = cart.payment_session as PaymentSession

  const isStripe = paymentSession?.provider_id?.includes("stripe")

  if (isStripe && paymentSession && stripePromise) {
    return (
      <StripeContext.Provider value={true}>
        <StripeWrapper
          paymentSession={paymentSession}
          stripeKey={stripeKey}
          stripePromise={stripePromise}
        >
          {children}
        </StripeWrapper>
      </StripeContext.Provider>
    )
  }

  if (
    paymentSession?.provider_id === "paypal" &&
    paypalClientId !== undefined &&
    cart
  ) {
    return (
      <PayPalScriptProvider
        options={{
          "client-id": "test",
          currency: cart?.region.currency_code.toUpperCase(),
          intent: "authorize",
          components: "buttons",
        }}
      >
        {children}
      </PayPalScriptProvider>
    )
  }

  return <div>{children}</div>
}

export default Wrapper
