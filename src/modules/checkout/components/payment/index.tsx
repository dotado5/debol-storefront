"use client"

import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { RadioGroup } from "@headlessui/react"
import ErrorMessage from "@modules/checkout/components/error-message"
import { Cart } from "@medusajs/medusa"
import { CheckCircleSolid, CreditCard } from "@medusajs/icons"
import { Button, Container, Heading, Text, Tooltip, clx } from "@medusajs/ui"
import { CardElement } from "@stripe/react-stripe-js"
import { StripeCardElementOptions } from "@stripe/stripe-js"
// import { Elements } from "@stripe/react-stripe-js"

import Divider from "@modules/common/components/divider"
import Spinner from "@modules/common/icons/spinner"
import PaymentContainer from "@modules/checkout/components/payment-container"
import { setPaymentMethod } from "@modules/checkout/actions"
import { paymentInfoMap } from "@lib/constants"
import {
  StripeContext,
  // stripePromise,
} from "@modules/checkout/components/payment-wrapper"
import TranslationComponent from "@modules/Translator/component/translation"
import axios from "axios"
import { generateRandomString } from "../shipping"
import Link from "next/link"
import Image from "next/image"

const Payment = ({
  cart,
}: {
  cart: Omit<Cart, "refundable_amount" | "refunded_total"> | null
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardBrand, setCardBrand] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [paymentMethods, setPaymentMethods] = useState<any[]>([])
  const [paidWithEveryPay, setPaidWithEveryPay] = useState(false)
  const [reInitiate, setReInitiate] = useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"

  const isStripe = cart?.payment_session?.provider_id === "stripe"
  const stripeReady = useContext(StripeContext)

  const paymentReady =
    cart?.payment_session && cart?.shipping_methods.length !== 0

  const useOptions: StripeCardElementOptions = useMemo(() => {
    return {
      style: {
        base: {
          fontFamily: "Inter, sans-serif",
          color: "#424270",
          "::placeholder": {
            color: "rgb(107 114 128)",
          },
        },
      },
      classes: {
        base: "pt-3 pb-1 block w-full h-11 px-4 mt-0 bg-ui-bg-field border rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-ui-border-base hover:bg-ui-bg-field-hover transition-all duration-300 ease-in-out",
      },
    }
  }, [])

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const set = async (providerId: string) => {
    setIsLoading(true)
    await setPaymentMethod(providerId)
      .catch((err) => setError(err.toString()))
      .finally(() => {
        if (providerId === "paypal") return
        setIsLoading(false)
      })
  }

  const handleChange = (providerId: string) => {
    setError(null)
    set(providerId)
  }

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    })
  }

  const handleSubmit = () => {
    setIsLoading(true)
    router.push(pathname + "?" + createQueryString("step", "review"), {
      scroll: false,
    })
  }

  useEffect(() => {
    setIsLoading(false)
    setError(null)
  }, [isOpen])

  useEffect(() => {
    const API_username = process.env.NEXT_EVERY_PAY_API_USERNAME
    const API_secret = process.env.NEXT_EVERY_PAY_API_SECRET

    const encodedCredentials = Buffer.from(
      `${API_username}:${API_secret}`
    ).toString("base64")
    setPaidWithEveryPay(true)

    async function initiateEverypay() {
      const url = "https://igw-demo.every-pay.com/api/v4/payments/oneoff"
      const nonceString = await generateRandomString(13)
      const orderReference = await generateRandomString(8)
      // console.log(randomString)

      const options = {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          "Content-Type": "application/json",
        },
      }

      const data = {
        // structured_reference: 5705872,
        payment_description: "example.com 84005a6c",
        account_name: "EUR3D1",
        nonce: nonceString,
        timestamp: new Date(),
        amount: cart?.total && cart.total / 100,
        order_reference: orderReference,
        request_token: true,
        token_agreement: "unscheduled",
        email: cart && cart.email,
        customer_ip: "53.62.137.190",
        customer_url: "https://debol-storefront.vercel.app/",
        locale: "et",
        api_username: "636c0877bfc71ae4",
        preferred_country: "EE",
        billing_city: cart && cart.billing_address.city,
        billing_country: "EE",
        billing_line1: cart && cart.billing_address.address_1,
        billing_line2: null,
        billing_line3: null,
        billing_postcode: 10145,
        billing_state: "EE-37",
        shipping_city: cart && cart.shipping_address?.city,
        shipping_country: "EE",
        shipping_line1: cart && cart.shipping_address?.address_1,
        shipping_line2: null,
        shipping_line3: null,
        shipping_postcode: 10145,
        shipping_state: "EE-37",
        mobile_payment: true,
        token_consent_agreed: true,
        integration_details: {
          integration: "Custom",
          software: "eCommerce",
          version: 2.1,
        },
      }

      axios
        .post(url, data, options)
        .then(async (response) => {
          console.log("paid", paidWithEveryPay)

          console.log("payment", response.data)
          await setPaymentMethods(response.data.payment_methods)
        })
        .catch((error) => {
          console.log("error:" + error)
        })
    }

    if (isOpen) {
      initiateEverypay()
    }
  }, [isOpen, reInitiate, cart, paidWithEveryPay])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const payment_reference = params.get("payment_reference")

    const API_username = process.env.NEXT_EVERY_PAY_API_USERNAME
    const API_secret = process.env.NEXT_EVERY_PAY_API_SECRET
    const encodedCredentials = Buffer.from(
      `${API_username}:${API_secret}`
    ).toString("base64")

    const options = {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        "Content-Type": "application/json",
      },
    }

    const checkUrl = `https://igw-demo.every-pay.com/api/v4/payments/${payment_reference}?api_username=${API_username}&detailed=false`

    axios
      .get(checkUrl, options)
      .then(async (response) => {
        console.log("paid", response.data)
      })
      .catch((error) => {
        console.log("error:" + error)
      })

    if (payment_reference) {
      setPaidWithEveryPay(true)

      console.log(payment_reference)
    } else {
      setPaidWithEveryPay(false)
    }

    console.log(payment_reference, paidWithEveryPay, "everypay")
  }, [paidWithEveryPay])
  // console.log(
  //   stripeReady,
  //   isStripe,
  //   cardComplete,
  //   cart?.payment_session,
  //   stripePromise
  // )

  async function logSomething() {
    console.log(paidWithEveryPay)
  }
  
  return (
    <div className="bg-white">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-3xl-regular gap-x-2 items-baseline",
            {
              "opacity-50 pointer-events-none select-none":
                !isOpen && !paymentReady,
            }
          )}
        >
          <TranslationComponent query={"Payment"} />
          {!isOpen && paymentReady && <CheckCircleSolid />}
        </Heading>
        {!isOpen && paymentReady && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
            >
              <TranslationComponent query={"Edit"} />
            </button>
          </Text>
        )}
      </div>
      <div>
        {cart?.payment_sessions?.length ? (
          <div className={isOpen ? "block" : "hidden"}>
            <RadioGroup
              value={cart.payment_session?.provider_id || ""}
              onChange={(value: string) => handleChange(value)}
            >
              {cart.payment_sessions
                .sort((a, b) => {
                  return a.provider_id > b.provider_id ? 1 : -1
                })
                .map((paymentSession) => {
                  return (
                    <PaymentContainer
                      paymentInfoMap={paymentInfoMap}
                      paymentSession={paymentSession}
                      key={paymentSession.id}
                      selectedPaymentOptionId={
                        paidWithEveryPay
                          ? "every-pay"
                          : cart.payment_session?.provider_id || null
                      }
                    />
                  )
                })}
            </RadioGroup>
            {isStripe && stripeReady && (
              <div className="mt-5 transition-all duration-150 ease-in-out">
                <Text className="txt-medium-plus text-ui-fg-base mb-1">
                  <TranslationComponent query={"Enter your card details:"} />
                </Text>

                <CardElement
                  options={useOptions as StripeCardElementOptions}
                  onChange={(e) => {
                    setCardBrand(
                      e.brand &&
                        e.brand.charAt(0).toUpperCase() + e.brand.slice(1)
                    )
                    setError(e.error?.message || null)
                    setCardComplete(e.complete)
                  }}
                />
                {/* <Elements stripe={stripePromise}></Elements> */}
              </div>
            )}
            <div>
              <h2
                className="mb-2 mt-4 text-sm "
                // onClick={logSomething}
              >
                PAY WITH BANKLINKS
              </h2>
              <div className="grid grid-cols-4 gap-2">
                {paymentMethods.length !== 0 &&
                  paymentMethods
                    .filter((method) => method.country_code === "EE")
                    .map((method, index) => (
                      <Link
                        href={method.payment_link}
                        key={index}
                        className="text-sm flex flex-col items-center border border-black p-2"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setReInitiate(!reInitiate)}
                      >
                        <Image src={method.logo_url} alt={""} />
                        {method.display_name}
                      </Link>
                    ))}
              </div>
            </div>
            <ErrorMessage error={error} />
            <Button
              size="large"
              className="mt-6"
              onClick={handleSubmit}
              isLoading={isLoading}
              disabled={
                (isStripe && !cardComplete) ||
                // !cart.payment_session ||
                !paidWithEveryPay
              }
            >
              <TranslationComponent query={"Continue to review"} />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-16 text-ui-fg-base">
            <Spinner />
          </div>
        )}

        <div className={isOpen ? "hidden" : "block"}>
          {cart && paymentReady && cart.payment_session && (
            <div className="flex items-start gap-x-1 w-full">
              <div className="flex flex-col w-1/3">
                <Text className="txt-medium-plus text-ui-fg-base mb-1">
                  <TranslationComponent query={"Payment method"} />
                </Text>
                <Text className="txt-medium text-ui-fg-subtle">
                  {paymentInfoMap[cart.payment_session.provider_id]?.title ||
                    cart.payment_session.provider_id}
                </Text>
                {process.env.NODE_ENV === "development" &&
                  !Object.hasOwn(
                    paymentInfoMap,
                    cart.payment_session.provider_id
                  ) && (
                    <Tooltip content="You can add a user-friendly name and icon for this payment provider in 'src/modules/checkout/components/payment/index.tsx'" />
                  )}
              </div>
              <div className="flex flex-col w-1/3">
                <Text className="txt-medium-plus text-ui-fg-base mb-1">
                  <TranslationComponent query={"Payment details"} />
                </Text>
                <div className="flex gap-2 txt-medium text-ui-fg-subtle items-center">
                  <Container className="flex items-center h-7 w-fit p-2 bg-ui-button-neutral-hover">
                    {paymentInfoMap[cart.payment_session.provider_id]?.icon || (
                      <CreditCard />
                    )}
                  </Container>
                  <Text>
                    {cart.payment_session.provider_id === "stripe" && cardBrand
                      ? cardBrand
                      : "Another step will appear"}
                  </Text>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Divider className="mt-8" />
    </div>
  )
}

export default Payment

// https://debol-storefront.vercel.app/?order_reference=84005a6c&payment_reference=19eff1c15ea9a2c3d41c413688baa345d38aa078e68490a2d3b637f0a1f7f1c1
